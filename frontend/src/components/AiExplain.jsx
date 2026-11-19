import { useState } from "react";
import { Sparkles, Lightbulb, AlertTriangle, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { explainLesson } from "../services/ai";
import "../styles/AiExplain.css";

// "Explain simply" panel. The backend returns JSON in a fixed shape (title, simpleExplanation,
// analogy, keyPoints, workedExample, commonMistake, checkQuestion), so each part can be rendered
// in its own place instead of showing one block of free text.
export default function AiExplain({ lessonId }) {
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [picked, setPicked] = useState(null);

  async function handleExplain(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setPicked(null);

    try {
      setResult(await explainLesson(lessonId, focus.trim()));
    } catch (err) {
      setResult(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const q = result && result.checkQuestion;

  return (
    <section className="ai-panel">
      <div className="ai-head">
        <span className="ai-head-icon"><Sparkles size={20} /></span>
        <div>
          <div className="ai-title">Explain it simply</div>
          <div className="ai-sub">An AI tutor explains this lesson for a 15-year-old, using only the lesson's own notes.</div>
        </div>
      </div>

      <form className="ai-form" onSubmit={handleExplain}>
        <input
          className="ai-input"
          value={focus}
          maxLength={120}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="Optional: what part is confusing? e.g. oxidation numbers"
          aria-label="What part is confusing (optional)"
        />
        <button className="ai-btn" type="submit" disabled={loading}>
          {loading ? <><Loader2 size={16} className="ai-spin" /> Thinking…</> : <><Sparkles size={16} /> Explain</>}
        </button>
      </form>

      {error && <div className="ai-error" role="alert">{error}</div>}

      {result && (
        <div className="ai-result">
          <h3 className="ai-result-title">{result.title}</h3>
          <p className="ai-text">{result.simpleExplanation}</p>

          <p className="ai-analogy"><Lightbulb size={16} /> {result.analogy}</p>

          <div className="ai-block">
            <div className="ai-block-label">Remember</div>
            <ul className="ai-list">
              {result.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="ai-block">
            <div className="ai-block-label">Worked example</div>
            <p className="ai-text"><b>{result.workedExample.problem}</b></p>
            <ol className="ai-list">
              {result.workedExample.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <p className="ai-answer">Answer: {result.workedExample.answer}</p>
          </div>

          <div className="ai-mistake">
            <AlertTriangle size={16} /> <span><b>Common mistake:</b> {result.commonMistake}</span>
          </div>

          <div className="ai-block">
            <div className="ai-block-label">Quick check</div>
            <p className="ai-text"><b>{q.question}</b></p>
            <div className="ai-options">
              {q.options.map((opt, i) => {
                const chosen = picked === i;
                const state = picked === null ? "" : i === q.correctIndex ? "right" : chosen ? "wrong" : "";
                return (
                  <button
                    key={i}
                    type="button"
                    className={`ai-option ${state}`}
                    disabled={picked !== null}
                    onClick={() => setPicked(i)}
                  >
                    <span className="ai-option-letter">{String.fromCharCode(65 + i)}</span> {opt}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <p className={`ai-feedback ${picked === q.correctIndex ? "right" : "wrong"}`}>
                {picked === q.correctIndex ? <CheckCircle2 size={16} /> : <XCircle size={16} />} {q.why}
              </p>
            )}
          </div>

          <div className="ai-note">AI-generated from the lesson notes. Check it against your lesson and textbook.</div>
        </div>
      )}
    </section>
  );
}
