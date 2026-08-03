import { useEffect, useMemo, useState } from "react";
import { Trophy, Search, X, CheckCircle2, XCircle, ArrowRight, Pencil, Trash2 } from "lucide-react";
import "../styles/ReactionLog.css";
import valencyLogo from "../assets/valency-logo.svg";
import { getAttempts, formatSubmittedOn, updateAttempt, deleteAttempt } from "../services/attempts";

export default function ReactionLog({ onBack, onTakeQuiz, darkMode = true }) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState(null);

  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState(false);

  const [deleting, setDeleting] = useState(null);
  const [deletingBusy, setDeletingBusy] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getAttempts()
      .then((data) => {
        if (!cancelled) setAttempts(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return attempts;
    return attempts.filter((a) => a.assessment.toLowerCase().includes(q));
  }, [attempts, query]);

  function startEdit(attempt) {
    setEditing(attempt);
    setEditValue(attempt.assessment);
    setEditError(false);
  }

  async function handleEditSave() {
    const trimmed = editValue.trim();
    if (!trimmed || savingEdit) return;

    setSavingEdit(true);
    setEditError(false);

    try {
      const updated = await updateAttempt(editing._id, {
        assessment: trimmed,
        score: editing.score,
        scorePct: editing.scorePct,
        breakdown: editing.breakdown,
      });
      setAttempts((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
      setEditing(null);
    } catch {
      setEditError(true);
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeleteConfirm() {
    if (deletingBusy) return;

    setDeletingBusy(true);
    setDeleteError(false);

    try {
      await deleteAttempt(deleting._id);
      setAttempts((prev) => prev.filter((a) => a._id !== deleting._id));
      setDeleting(null);
    } catch {
      setDeleteError(true);
    } finally {
      setDeletingBusy(false);
    }
  }

  return (
    <div className={darkMode ? "rl-root" : "rl-root light"}>
      {/* Topbar */}
      <div className="rl-topbar">
        <div className="rl-top-left">
          <div className="rl-logo-area">
            <img className="rl-logo-img" src={valencyLogo} alt="Valency" />
            <div>
              <div className="rl-logo-sub">LEARN • BOND • MASTER</div>
            </div>
          </div>
          <div className="rl-divider" />
          <div className="rl-page-title">
            <span className="rl-page-title-icon">🏆</span>
            <span>Reaction Log</span>
          </div>
        </div>
        <button className="rl-back-btn" onClick={onBack}>
          ← Back to Home
        </button>
      </div>

      <div className="rl-content">
        <div className="rl-heading-row">
          <div className="rl-heading-icon">
            <Trophy size={20} />
          </div>
          <h1 className="rl-heading-title">Reaction Log</h1>
          <span className="rl-beta-badge">BETA</span>
        </div>

        

        {!loading && !loadError && attempts.length > 0 && (
          <div className="rl-toolbar">
            <div className="rl-search">
              <Search size={16} />
              <input
                placeholder="Quick search by assessment…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="rl-empty">
            <p className="rl-empty-sub">Loading your reaction log…</p>
          </div>
        ) : loadError ? (
          <div className="rl-empty">
            <div className="rl-empty-icon">
              <Trophy size={48} />
            </div>
            <h2 className="rl-empty-title">Couldn't load your reaction log</h2>
            <p className="rl-empty-sub">
              Something went wrong reaching the server. Make sure you're
              signed in and try again.
            </p>
          </div>
        ) : attempts.length === 0 ? (
          <div className="rl-empty">
            <div className="rl-empty-glow" />
            <div className="rl-empty-icon">
              <Trophy size={48} />
            </div>

            <div className="rl-empty-eyebrow">Your progress</div>
            <h2 className="rl-empty-title">No reactions logged yet</h2>
            <p className="rl-empty-sub">
              Take a Weekly Test and your score, submission time, and a full
              question-by-question report will show up here.
            </p>

            <button className="rl-empty-cta" onClick={onTakeQuiz}>
              Take a Weekly Test <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="rl-table-wrap">
            <table className="rl-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Assessment</th>
                  <th>Submitted On</th>
                  <th>Score</th>
                  <th>Report</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a._id}>
                    <td>{i + 1}</td>
                    <td className="rl-td-assessment">{a.assessment}</td>
                    <td>{formatSubmittedOn(a.createdAt)}</td>
                    <td>
                      <span className={`rl-score-chip ${a.scorePct >= 60 ? "good" : "low"}`}>
                        {a.score}
                      </span>
                    </td>
                    <td>
                      <button className="rl-view-btn" onClick={() => setViewing(a)}>
                        View
                      </button>
                    </td>
                    <td>
                      <div className="rl-actions-cell">
                        <button
                          className="rl-icon-btn"
                          title="Rename this attempt"
                          onClick={() => startEdit(a)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="rl-icon-btn danger"
                          title="Delete this attempt"
                          onClick={() => { setDeleting(a); setDeleteError(false); }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="rl-no-match">
                      No reactions match “{query}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewing && (
        <div className="rl-modal-backdrop" onClick={() => setViewing(null)}>
          <div className="rl-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rl-modal-close" onClick={() => setViewing(null)}>
              <X size={18} />
            </button>

            <h2 className="rl-modal-title">{viewing.assessment}</h2>
            <p className="rl-modal-meta">
              {formatSubmittedOn(viewing.createdAt)} &nbsp;·&nbsp; Score: {viewing.score}
            </p>

            <div className="rl-modal-breakdown">
              {viewing.breakdown.map((b, i) => (
                <div key={i} className={`rl-breakdown-row ${b.correct ? "correct" : "wrong"}`}>
                  {b.correct ? (
                    <CheckCircle2 size={18} className="rl-breakdown-icon correct" />
                  ) : (
                    <XCircle size={18} className="rl-breakdown-icon wrong" />
                  )}
                  <div>
                    <div className="rl-breakdown-q">{b.question}</div>
                    <div className="rl-breakdown-a">
                      Your answer: <strong>{b.chosen}</strong>
                      {!b.correct && (
                        <>
                          {" "}
                          · Correct answer: <strong>{b.correctAnswer}</strong>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="rl-modal-backdrop" onClick={() => !savingEdit && setEditing(null)}>
          <div className="rl-modal rl-modal-small" onClick={(e) => e.stopPropagation()}>
            <button className="rl-modal-close" onClick={() => setEditing(null)} disabled={savingEdit}>
              <X size={18} />
            </button>

            <h2 className="rl-modal-title">Rename attempt</h2>
            <p className="rl-modal-meta">
              {formatSubmittedOn(editing.createdAt)} &nbsp;·&nbsp; Score: {editing.score}
            </p>

            <input
              className="rl-edit-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              disabled={savingEdit}
              maxLength={120}
              autoFocus
            />

            {editError && (
              <p className="rl-modal-error">Couldn't save that — check your connection and try again.</p>
            )}

            <div className="rl-modal-actions">
              <button className="rl-btn-secondary" onClick={() => setEditing(null)} disabled={savingEdit}>
                Cancel
              </button>
              <button className="rl-btn-primary" onClick={handleEditSave} disabled={savingEdit || !editValue.trim()}>
                {savingEdit ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="rl-modal-backdrop" onClick={() => !deletingBusy && setDeleting(null)}>
          <div className="rl-modal rl-modal-small" onClick={(e) => e.stopPropagation()}>
            <button className="rl-modal-close" onClick={() => setDeleting(null)} disabled={deletingBusy}>
              <X size={18} />
            </button>

            <h2 className="rl-modal-title">Delete this attempt?</h2>
            <p className="rl-modal-meta">
              {deleting.assessment} — {formatSubmittedOn(deleting.createdAt)}. This can't be undone.
            </p>

            {deleteError && (
              <p className="rl-modal-error">Couldn't delete that — check your connection and try again.</p>
            )}

            <div className="rl-modal-actions">
              <button className="rl-btn-secondary" onClick={() => setDeleting(null)} disabled={deletingBusy}>
                Cancel
              </button>
              <button className="rl-btn-danger" onClick={handleDeleteConfirm} disabled={deletingBusy}>
                {deletingBusy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
