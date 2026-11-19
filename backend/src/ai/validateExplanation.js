// STRUCTURED OUTPUTS: never trust the model's JSON, even when a schema was requested.
// This works like isValidBreakdown in attempts.controller.js: check every type, then build a
// NEW object that contains only the allowed fields, so extra keys from the model are dropped.

function text(value, max) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

function textList(value, min, max, itemMax) {
  if (!Array.isArray(value) || value.length < min || value.length > max) return null;
  const items = value.map((v) => text(v, itemMax));
  return items.every((v) => v !== null) ? items : null;
}

// Returns { ok: true, value } with a cleaned copy, or { ok: false, reason }.
function validateExplanation(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { ok: false, reason: "not an object" };
  }

  const title = text(data.title, 120);
  const simpleExplanation = text(data.simpleExplanation, 900);
  const analogy = text(data.analogy, 400);
  const keyPoints = textList(data.keyPoints, 3, 5, 200);
  const commonMistake = text(data.commonMistake, 400);

  const we = data.workedExample;
  const workedExample =
    we && typeof we === "object"
      ? {
          problem: text(we.problem, 400),
          steps: textList(we.steps, 2, 6, 300),
          answer: text(we.answer, 300),
        }
      : null;

  const cq = data.checkQuestion;
  const checkQuestion =
    cq && typeof cq === "object"
      ? {
          question: text(cq.question, 300),
          options: textList(cq.options, 4, 4, 160),
          correctIndex: Number.isInteger(cq.correctIndex) ? cq.correctIndex : null,
          why: text(cq.why, 300),
        }
      : null;

  if (!title) return { ok: false, reason: "title" };
  if (!simpleExplanation) return { ok: false, reason: "simpleExplanation" };
  if (!analogy) return { ok: false, reason: "analogy" };
  if (!keyPoints) return { ok: false, reason: "keyPoints (3-5 short strings)" };
  if (!commonMistake) return { ok: false, reason: "commonMistake" };
  if (!workedExample || !workedExample.problem || !workedExample.steps || !workedExample.answer) {
    return { ok: false, reason: "workedExample" };
  }
  if (
    !checkQuestion ||
    !checkQuestion.question ||
    !checkQuestion.options ||
    new Set(checkQuestion.options).size !== 4 ||
    checkQuestion.correctIndex === null ||
    checkQuestion.correctIndex < 0 ||
    checkQuestion.correctIndex > 3 ||
    !checkQuestion.why
  ) {
    return { ok: false, reason: "checkQuestion (4 different options, correctIndex 0-3)" };
  }

  return { ok: true, value: { title, simpleExplanation, analogy, keyPoints, workedExample, commonMistake, checkQuestion } };
}

module.exports = { validateExplanation };
