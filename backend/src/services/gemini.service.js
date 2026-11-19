// Thin wrapper around the Gemini REST API. The API key is read from the environment on the
// server only. It is never sent to the browser and never logged.

// Models are tried in this order. Google retires and overloads models from time to time (for
// example gemini-2.5-flash is closed to new keys), so there is always a fallback. Override the
// list with GEMINI_MODELS="model-a,model-b" in backend/.env.
const DEFAULT_MODELS = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
const TIMEOUT_MS = 12000;

class AiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "AiError";
    this.status = status; // HTTP status we should answer with
  }
}

// Wait before retrying an overloaded model (overridable so tests do not have to wait).
const retryDelayMs = () => Number(process.env.GEMINI_RETRY_DELAY_MS ?? 1000);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function modelList() {
  const raw = process.env.GEMINI_MODELS || process.env.GEMINI_MODEL || "";
  const fromEnv = raw.split(",").map((m) => m.trim()).filter(Boolean);
  return fromEnv.length > 0 ? fromEnv : DEFAULT_MODELS;
}

// One request to one model. `busy` marks a temporary problem (overload, rate limit, timeout);
// `overloaded` (HTTP 429/503) is worth one quick retry on the same model. Every failure can
// still move on to the next model in the list.
async function callModel(model, apiKey, { system, contents, schema }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: 0.3, // low = consistent, factual answers
          maxOutputTokens: 2048,
          responseMimeType: "application/json", // structured output ...
          responseSchema: schema, //                ... in exactly this shape
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });
  } catch (err) {
    const timedOut = err.name === "AbortError";
    console.error(`Gemini call to ${model} ${timedOut ? "timed out" : "could not connect"}`);
    return { error: new AiError(timedOut ? "The AI took too long to answer." : "Could not reach the AI service.", timedOut ? 504 : 502), busy: timedOut };
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    // Log the status and the provider's error message for debugging (the API key is never part of
    // it). Nothing from the provider's body is forwarded to the browser.
    const detail = await res.json().then((b) => (b && b.error && b.error.message) || "").catch(() => "");
    console.error(`Gemini request failed with HTTP ${res.status} (model ${model}): ${String(detail).slice(0, 300)}`);
    return {
      error: new AiError("The AI service returned an error.", 502),
      busy: [429, 500, 502, 503, 504].includes(res.status),
      overloaded: [429, 503].includes(res.status),
    };
  }

  const data = await res.json().catch(() => null);
  const candidate = data && data.candidates && data.candidates[0];
  const raw = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0] && candidate.content.parts[0].text;

  if (!raw) {
    console.error(`Gemini model ${model} returned no answer`);
    return { error: new AiError("The AI returned no answer.", 502), busy: false };
  }

  try {
    return { value: JSON.parse(raw) };
  } catch {
    console.error(`Gemini model ${model} returned text that was not valid JSON`);
    return { error: new AiError("The AI returned an answer that was not valid JSON.", 502), busy: false };
  }
}

// Ask Gemini for JSON that matches `schema`. Returns the parsed object.
async function generateJson(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AiError("AI explain is not configured on the server.", 503);

  let sawBusy = false;
  let lastError = null;

  for (const model of modelList()) {
    let result = await callModel(model, apiKey, request);
    if (result.overloaded) {
      await sleep(retryDelayMs());
      result = await callModel(model, apiKey, request);
    }
    if (result.value !== undefined) return result.value;
    lastError = result.error;
    sawBusy = sawBusy || result.busy;
  }

  // Every model failed. If any of them was only busy, tell the student to try again soon.
  if (sawBusy) throw new AiError("The AI is busy right now. Please try again in a moment.", 503);
  throw lastError || new AiError("The AI service returned an error.", 502);
}

module.exports = { generateJson, AiError };
