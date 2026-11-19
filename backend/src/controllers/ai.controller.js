const { LESSONS } = require('../ai/lessonContext');
const { SYSTEM_PROMPT, RESPONSE_SCHEMA, buildContents } = require('../ai/prompt');
const { validateExplanation } = require('../ai/validateExplanation');
const { generateJson, AiError } = require('../services/gemini.service');

const MAX_ATTEMPTS = 2; // one retry if the model's JSON fails validation

// The focus is optional free text from the student, so keep it short and plain.
function cleanFocus(value) {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.length <= 120 ? cleaned : null;
}

async function explainLesson(req, res, next) {
  try {
    const { lessonId, focus } = req.body || {};

    const lesson = typeof lessonId === 'string' && Object.hasOwn(LESSONS, lessonId) ? LESSONS[lessonId] : null;
    if (!lesson) {
      return res.status(400).json({ message: 'Unknown lesson.' });
    }

    const cleanedFocus = cleanFocus(focus);
    if (cleanedFocus === null) {
      return res.status(400).json({ message: 'Focus must be text of at most 120 characters.' });
    }

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      const raw = await generateJson({
        system: SYSTEM_PROMPT,
        contents: buildContents(lesson, cleanedFocus),
        schema: RESPONSE_SCHEMA,
      });

      const result = validateExplanation(raw);
      if (result.ok) {
        return res.json({ explanation: result.value, lesson: lesson.title, attempts: attempt });
      }

      console.warn(`AI answer failed validation (attempt ${attempt}): ${result.reason}`);
    }

    // Invalid output is never sent to the student.
    return res.status(502).json({ message: 'The AI gave an invalid answer. Please try again.' });
  } catch (err) {
    if (err instanceof AiError) {
      return res.status(err.status).json({ message: err.message });
    }
    return next(err);
  }
}

module.exports = { explainLesson };
