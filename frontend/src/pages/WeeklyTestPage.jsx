import { useState, useEffect, useRef, useMemo } from "react";
import "../styles/WeeklyTestPage.css";
import { addAttempt } from "../services/attempts";

// ─── Question banks (real JEE/NEET-style content per topic) ───────────────
const QUESTION_BANKS = {
  1: [
    { q: "Oxidation is best defined as:", options: ["Loss of electrons", "Gain of electrons", "Loss of protons", "Gain of protons"], correct: 0, why: "Modern electronic theory defines oxidation as electron loss — regardless of whether oxygen is involved." },
    { q: "In Zn + Cu²⁺ → Zn²⁺ + Cu, which species is reduced?", options: ["Zn", "Cu²⁺", "Zn²⁺", "Cu"], correct: 1, why: "Cu²⁺ gains two electrons to become Cu, so Cu²⁺ is the species being reduced." },
    { q: "What is the oxidation number of Mn in KMnO₄?", options: ["+2", "+4", "+6", "+7"], correct: 3, why: "K is +1, each O is −2 (×4 = −8). For the compound to be neutral, Mn must be +7." },
    { q: "A reducing agent is a substance that:", options: ["Gets oxidized, losing electrons to reduce another species", "Gets reduced, gaining electrons", "Remains chemically unchanged", "Is always a pure metal"], correct: 0, why: "The reducing agent donates electrons and is itself oxidized in the process." },
    { q: "Which of these is a genuine redox reaction?", options: ["NaOH + HCl → NaCl + H₂O", "2Na + Cl₂ → 2NaCl", "BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl", "AgNO₃ + NaCl → AgCl + NaNO₃"], correct: 1, why: "Only 2Na + Cl₂ → 2NaCl involves a change in oxidation states (Na: 0→+1, Cl: 0→−1); the others are acid-base or double-displacement reactions." },
    { q: "In a disproportionation reaction:", options: ["The same element is simultaneously oxidized and reduced", "Two different elements swap electrons", "No oxidation state changes at all", "Only reduction takes place"], correct: 0, why: "Disproportionation is a special redox reaction where one species acts as both oxidizing and reducing agent — like Cl₂ in cold NaOH." },
    { q: "What is the oxidation state of oxygen in H₂O₂?", options: ["−2", "−1", "0", "+1"], correct: 1, why: "In peroxides, the O–O bond means oxygen is assigned −1 instead of its usual −2." },
    { q: "Which method balances redox equations using separate oxidation and reduction half-reactions?", options: ["Ion-electron (half-reaction) method", "Hit-and-trial method", "Direct combination method", "Valence bond method"], correct: 0, why: "The ion-electron method splits the overall reaction into half-reactions, balances atoms and charge in each, then combines them." },
  ],
  2: [
    { q: "According to Boyle's Law, at constant temperature, the pressure and volume of a fixed amount of gas are related as:", options: ["P ∝ V", "P ∝ 1/V", "P ∝ T", "P ∝ n"], correct: 1, why: "Boyle's Law states that at constant temperature, pressure is inversely proportional to volume (PV = constant)." },
    { q: "Charles' Law relates the volume of a gas to its:", options: ["Pressure, at constant temperature", "Absolute temperature, at constant pressure", "Number of moles, at constant volume", "Molar mass, at constant pressure"], correct: 1, why: "Charles' Law states that at constant pressure, volume is directly proportional to absolute temperature (V/T = constant)." },
    { q: "The ideal gas equation is written as:", options: ["PV = nRT", "PT = nRV", "PV = nR/T", "P/V = nRT"], correct: 0, why: "The ideal gas equation combines Boyle's, Charles', and Avogadro's laws into PV = nRT, where R is the universal gas constant." },
    { q: "Standard Temperature and Pressure (STP) is defined as:", options: ["25°C and 1 atm", "0°C and 1 atm", "0°C and 2 atm", "100°C and 1 atm"], correct: 1, why: "STP corresponds to 0°C (273.15 K) and 1 atmosphere, at which 1 mole of an ideal gas occupies 22.4 L." },
    { q: "Graham's Law of Diffusion states that the rate of diffusion of a gas is:", options: ["Directly proportional to its molar mass", "Inversely proportional to the square root of its molar mass", "Independent of its molar mass", "Directly proportional to the square root of its molar mass"], correct: 1, why: "Graham's Law: rate of diffusion ∝ 1/√M — lighter gases diffuse faster than heavier ones." },
    { q: "Dalton's Law of Partial Pressures applies to:", options: ["A single pure gas only", "A mixture of non-reacting gases", "Liquids only", "Solids at high pressure"], correct: 1, why: "Dalton's Law states that the total pressure of a mixture of non-reacting gases equals the sum of their individual partial pressures." },
    { q: "Avogadro's Law states that equal volumes of all gases, at the same temperature and pressure, contain:", options: ["Equal masses", "Equal number of molecules", "Equal densities", "Equal molar masses"], correct: 1, why: "Avogadro's Law: equal volumes of ideal gases at the same T and P contain the same number of molecules, regardless of chemical nature." },
    { q: "The compressibility factor (Z = PV/nRT) for a real gas deviating from ideal behavior can be:", options: ["Equal to 1 only", "Greater than or less than 1", "Always greater than 1", "Always less than 0"], correct: 1, why: "For an ideal gas Z = 1 always. Real gases show Z > 1 (dominant repulsive forces) or Z < 1 (dominant attractive forces)." },
  ],
  3: [
    { q: "Homolytic fission of a covalent bond produces:", options: ["Two oppositely charged ions", "Two neutral free radicals", "A single stable molecule", "Only cations"], correct: 1, why: "In homolytic fission, the bonding electron pair splits equally between the two fragments, generating neutral species with an unpaired electron — free radicals." },
    { q: "Heterolytic fission of a covalent bond A–B (B more electronegative) typically produces:", options: ["A⁺ and B⁻", "A⁻ and B⁺", "Two free radicals", "No charged species"], correct: 0, why: "In heterolytic fission, both bonding electrons go to the more electronegative atom, giving A⁺ and B⁻." },
    { q: "A nucleophile is a species that:", options: ["Is electron-deficient and seeks electrons", "Donates an electron pair to form a new bond", "Always carries a negative formal charge", "Cannot react with electrophiles"], correct: 1, why: "Nucleophiles ('nucleus-loving') are electron-rich species that donate a lone pair to an electrophilic center to form a new covalent bond." },
    { q: "Which of these is the best example of an electrophile?", options: ["NH₃", "OH⁻", "BF₃", "Cl⁻"], correct: 2, why: "BF₃ has an incomplete octet on boron, making it electron-deficient and a strong electrophile (Lewis acid); the others are electron-rich nucleophiles." },
    { q: "The inductive effect refers to:", options: ["Delocalization of π electrons through resonance", "Permanent displacement of σ-bond electrons due to electronegativity differences", "Temporary polarization caused by an attacking reagent", "The breaking of a bond to form free radicals"], correct: 1, why: "The inductive effect is the permanent, distance-decaying displacement of electron density along a σ-bond chain due to an electronegative or electropositive substituent." },
    { q: "Resonance (mesomeric effect) involves:", options: ["Delocalization of π electrons or lone pairs across adjacent p-orbitals", "Only σ-bond electron shifts", "Complete transfer of electrons to form ions", "Rotation around a single bond"], correct: 0, why: "Resonance describes delocalization of π electrons or lone pairs across a conjugated system of overlapping p-orbitals, spreading electron density across multiple atoms." },
    { q: "In an addition reaction, the reactant:", options: ["Loses two atoms/groups to form a multiple bond", "Gains atoms/groups across a multiple bond, converting it to a single bond", "Is replaced by another atom or group", "Undergoes no structural change"], correct: 1, why: "Addition reactions occur at a double or triple bond, where new atoms/groups add across it, converting it into a saturated single bond — typical of alkenes and alkynes." },
    { q: "The relative stability order of carbocations is generally:", options: ["Primary > Secondary > Tertiary", "Tertiary > Secondary > Primary", "Secondary > Tertiary > Primary", "All carbocations are equally stable"], correct: 1, why: "Tertiary carbocations are most stable due to greater electron donation from adjacent alkyl groups via hyperconjugation and the inductive effect, followed by secondary, then primary." },
  ],
};

const TESTS = [
  { id: 1, title: "Oxidation & Reduction Quiz", topic: "Oxidation and Reduction", questions: 8, duration: 15, difficulty: "Medium", icon: "🔋", accent: "#f87171", bg: "rgba(248,113,113,0.08)", xp: 250, badge: "⚡" },
  { id: 2, title: "Gaseous State Quiz", topic: "Gaseous State", questions: 8, duration: 15, difficulty: "Easy", icon: "💨", accent: "#22d3ee", bg: "rgba(34,211,238,0.08)", xp: 220, badge: "🌬️" },
  { id: 3, title: "Organic Reactions Quiz", topic: "Basic Concepts of Organic Reactions", questions: 8, duration: 15, difficulty: "Hard", icon: "🧪", accent: "#4ade80", bg: "rgba(74,222,128,0.08)", xp: 280, badge: "🔬" },
];

// Initial attempt/best-score state, keyed by test id
const INITIAL_PROGRESS = {
  1: { attempts: 0, best: null },
  2: { attempts: 0, best: null },
  3: { attempts: 0, best: null },
};

function getCountdown() {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilSunday);
  next.setHours(0, 0, 0, 0);
  const diff = Math.max(0, next.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isSunday: day === 0,
  };
}

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Floating particles ────────────────────────────────────────────────────
const SYMBOLS = ["H", "O", "C", "N", "Fe", "Au", "Na", "Cl", "⚗", "⚛"];
function Particle({ style, seed }) {
  return (
    <div className="wt-particle" style={{ fontSize: "11px", color: "rgba(96,165,250,0.15)", animation: "floatUp 12s linear infinite", ...style }}>
      {SYMBOLS[seed % SYMBOLS.length]}
    </div>
  );
}

// ─── Countdown ring ────────────────────────────────────────────────────────
function RingUnit({ value, label, max, color }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - value / max);
  return (
    <div className="wt-ring-unit">
      <div className="wt-ring-svg-wrap">
        <svg width="104" height="104" viewBox="0 0 104 104" className="wt-ring-svg">
          <circle cx="52" cy="52" r={r} fill="none" stroke="var(--wt-track)" strokeWidth="5" />
          <circle
            cx="52" cy="52" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease", filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="wt-ring-value-wrap">
          <span className="wt-ring-value">{String(value).padStart(2, "0")}</span>
        </div>
      </div>
      <span className="wt-ring-label">{label}</span>
    </div>
  );
}

// ─── Test card ─────────────────────────────────────────────────────────────
function TestCard({ test, progress, isSunday, onStart, onPractice }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  const diffColor = test.difficulty === "Easy" ? "#34d399" : test.difficulty === "Medium" ? "#fbbf24" : "#f87171";
  const diffStars = test.difficulty === "Easy" ? 1 : test.difficulty === "Medium" ? 2 : 3;
  const locked = !isSunday;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      className="wt-card"
      style={{
        background: hovered ? test.bg : "var(--wt-surface-1)",
        border: `1px solid ${hovered ? test.accent + "50" : "var(--wt-line-1)"}`,
        boxShadow: hovered ? `0 20px 60px ${test.accent}20, 0 0 0 1px ${test.accent}20` : "none",
        transform: hovered ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)` : "perspective(600px) rotateX(0) rotateY(0) translateY(0)",
        willChange: "transform",
      }}
    >
      {hovered && (
        <div className="wt-card-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${test.accent}18 0%, transparent 60%)` }} />
      )}
      <div className="wt-card-topline" style={{ background: hovered ? `linear-gradient(90deg, transparent, ${test.accent}, transparent)` : "transparent" }} />

      <div className="wt-card-body">
        <div className="wt-card-top-row">
          <div className="wt-card-icon" style={{ background: `${test.accent}18`, border: `1px solid ${test.accent}30`, boxShadow: hovered ? `0 0 20px ${test.accent}30` : "none" }}>
            {test.icon}
          </div>
          <div className="wt-card-top-right">
            <span className="wt-diff-badge" style={{ background: `${diffColor}18`, color: diffColor, border: `1px solid ${diffColor}30` }}>
              {test.difficulty}
            </span>
            <div className="wt-stars-row">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="wt-star-dot" style={{ background: i < diffStars ? diffColor : "var(--wt-line-2)" }} />
              ))}
            </div>
          </div>
        </div>

        <div className="wt-card-title-wrap">
          <span className="wt-card-title" style={{ color: hovered ? test.accent : "var(--wt-text)" }}>{test.title}</span>
          {progress.attempts > 0 && <span className="wt-card-attempts-note">✓ {progress.attempts}× · best {progress.best}%</span>}
        </div>
        <div className="wt-card-topic">{test.topic}</div>

        <div className="wt-card-meta-row">
          {[{ icon: "❓", val: `${test.questions}Q` }, { icon: "⏱", val: `${test.duration}m` }, { icon: "⚡", val: `+${test.xp} XP` }].map((s) => (
            <div key={s.icon} className="wt-card-meta-item">
              <span>{s.icon}</span><span>{s.val}</span>
            </div>
          ))}
        </div>

        <div className="wt-card-bottom-row">
          <div className="wt-card-progress-track">
            <div className="wt-card-progress-fill" style={{ width: hovered ? "100%" : "0%", background: `linear-gradient(90deg, ${test.accent}aa, ${test.accent})`, boxShadow: `0 0 8px ${test.accent}` }} />
          </div>
          {locked ? (
            <button
              onClick={() => onPractice(test)}
              className="wt-practice-btn"
              title="Full test unlocks Sunday — practice runs don't earn XP but keep your recall sharp"
            >
              🔓 Practice
            </button>
          ) : (
            <button
              onClick={() => onStart(test)}
              className="wt-attempt-btn"
              style={{ background: hovered ? `linear-gradient(135deg, ${test.accent}, ${test.accent}bb)` : `${test.accent}20`, color: hovered ? "#000" : test.accent, border: `1px solid ${test.accent}50`, boxShadow: hovered ? `0 4px 16px ${test.accent}50` : "none" }}
            >
              Attempt →
            </button>
          )}
        </div>
      </div>
      <div className="wt-card-badge-corner">{test.badge}</div>
    </div>
  );
}

// ─── Confirm modal ─────────────────────────────────────────────────────────
function ConfirmModal({ test, practice, onClose, onConfirm }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step < 3) {
      const t = setTimeout(() => setStep((s) => s + 1), 350);
      return () => clearTimeout(t);
    }
  }, [step]);

  const qCount = QUESTION_BANKS[test.id].length;

  return (
    <div className="wt-modal-backdrop" onClick={onClose}>
      <div
        className="wt-modal"
        style={{ border: `1px solid ${test.accent}40`, boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${test.accent}20, 0 0 60px ${test.accent}15` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wt-modal-topline" style={{ background: `linear-gradient(90deg, transparent, ${test.accent}, transparent)` }} />
        <div className="wt-modal-body">
          <div className="wt-modal-icon" style={{ background: `${test.accent}18`, border: `1px solid ${test.accent}40`, boxShadow: `0 0 32px ${test.accent}30` }}>
            {test.icon}
          </div>
          <h2 className="wt-modal-title">{test.title}</h2>
          <p className="wt-modal-subtitle">
            {test.topic}{practice && <span className="wt-modal-practice-tag">Practice</span>}
          </p>

          <div className="wt-modal-list">
            {[
              { label: `${qCount} questions await`, icon: "❓" },
              { label: `${test.duration} minute time limit`, icon: "⏱" },
              { label: practice ? "Practice mode — no XP, no pressure" : `Earn up to ${test.xp} XP`, icon: "⚡" },
            ].map((item, i) => (
              <div key={i} className="wt-modal-list-item" style={{ opacity: step > i ? 1 : 0, transform: step > i ? "translateX(0)" : "translateX(-12px)" }}>
                <div className="wt-modal-list-icon" style={{ background: `${test.accent}18`, border: `1px solid ${test.accent}25` }}>{item.icon}</div>
                <span className="wt-modal-list-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="wt-modal-warning">
            Once you start, you can't pause or go back.
          </div>

          <div className="wt-modal-actions">
            <button onClick={onClose} className="wt-modal-cancel-btn">
              Not yet
            </button>
            <button
              onClick={onConfirm}
              className="wt-modal-confirm-btn"
              style={{ background: `linear-gradient(135deg, ${test.accent}, ${test.accent}cc)`, boxShadow: `0 8px 24px ${test.accent}40` }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Live quiz view ─────────────────────────────────────────────────────────
function QuizView({ test, practice, onExit, onFinish, darkMode = true }) {
  const questions = QUESTION_BANKS[test.id];
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(test.duration * 60);
  const [confirmExit, setConfirmExit] = useState(false);
  const submittedRef = useRef(false);

  const handleSubmit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    onFinish(answers);
  };

  useEffect(() => {
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const q = questions[qIndex];
  const isLast = qIndex === questions.length - 1;
  const answeredCount = answers.filter((a) => a !== null).length;
  const urgent = secondsLeft <= 30;

  return (
    <div className={darkMode ? "wt-quiz-root" : "wt-quiz-root light"}>
      <div className="wt-quiz-header">
        <div className="wt-quiz-header-inner">
          <button onClick={() => setConfirmExit(true)} className="wt-quiz-exit-btn">✕</button>
          <div className="wt-quiz-info">
            <div className="wt-quiz-info-title">{test.title} {practice && <span className="wt-quiz-practice-tag">Practice</span>}</div>
            <div className="wt-quiz-info-sub">Question {qIndex + 1} of {questions.length}</div>
          </div>
          <div
            className="wt-quiz-timer"
            style={{
              background: urgent ? "rgba(248,113,113,0.15)" : `${test.accent}22`,
              color: urgent ? "#f87171" : test.accent,
              border: `1px solid ${urgent ? "rgba(248,113,113,0.35)" : test.accent + "50"}`,
              animation: urgent ? "pulse-ring 1s ease-in-out infinite" : "none",
            }}
          >
            ⏱ {formatClock(secondsLeft)}
          </div>
        </div>
        <div className="wt-quiz-progress-track">
          <div className="wt-quiz-progress-fill" style={{ width: `${((qIndex + 1) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${test.accent}aa, ${test.accent})` }} />
        </div>
      </div>

      <div className="wt-quiz-body">
        <div className="wt-quiz-dots">
          {questions.map((_, i) => {
            const answered = answers[i] !== null;
            const active = i === qIndex;
            return (
              <button
                key={i}
                onClick={() => setQIndex(i)}
                className="wt-quiz-dot"
                style={{
                  background: active ? test.accent : answered ? `${test.accent}25` : "var(--wt-surface-2)",
                  color: active ? "#000" : answered ? test.accent : "#64748b",
                  border: `1px solid ${active ? test.accent : answered ? test.accent + "40" : "var(--wt-line-2)"}`,
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div className="wt-quiz-card" style={{ border: `1px solid ${test.accent}30` }}>
          <div className="wt-quiz-topic" style={{ color: test.accent }}>{test.topic}</div>
          <h3 className="wt-quiz-question">{q.q}</h3>

          <div className="wt-quiz-options">
            {q.options.map((opt, i) => {
              const selected = answers[qIndex] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers((prev) => { const next = [...prev]; next[qIndex] = i; return next; })}
                  className="wt-quiz-opt"
                  style={{
                    background: selected ? `${test.accent}18` : "var(--wt-surface-1)",
                    border: `1px solid ${selected ? test.accent + "60" : "var(--wt-line-1)"}`,
                    color: selected ? "var(--wt-text)" : "var(--wt-text-soft)",
                  }}
                >
                  <span
                    className="wt-quiz-opt-letter"
                    style={{ background: selected ? test.accent : "var(--wt-track)", color: selected ? "#000" : "#64748b" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="wt-quiz-nav-row">
          <button
            onClick={() => setQIndex((i) => Math.max(0, i - 1))}
            disabled={qIndex === 0}
            className="wt-quiz-prev-btn"
          >
            ← Prev
          </button>
          <div className="wt-quiz-answered-count">{answeredCount}/{questions.length} answered</div>
          {isLast ? (
            <button
              onClick={handleSubmit}
              className="wt-quiz-submit-btn"
              style={{ background: `linear-gradient(135deg, ${test.accent}, ${test.accent}cc)`, boxShadow: `0 8px 24px ${test.accent}40` }}
            >
              Submit Test ✓
            </button>
          ) : (
            <button
              onClick={() => setQIndex((i) => Math.min(questions.length - 1, i + 1))}
              className="wt-quiz-next-btn"
              style={{ background: `${test.accent}20`, color: test.accent, border: `1px solid ${test.accent}50` }}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {confirmExit && (
        <div className="wt-modal-backdrop" onClick={() => setConfirmExit(false)}>
          <div className="wt-exit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wt-exit-modal-title">Leave this test?</div>
            <p className="wt-exit-modal-desc">Your progress won't be saved and this attempt won't count.</p>
            <div className="wt-modal-actions">
              <button onClick={() => setConfirmExit(false)} className="wt-exit-stay-btn">Stay</button>
              <button onClick={onExit} className="wt-exit-leave-btn">Leave test</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Results view ───────────────────────────────────────────────────────────
function ResultsView({ test, practice, answers, saveError, onRetake, onBack, darkMode = true }) {
  const questions = QUESTION_BANKS[test.id];
  const [revealed, setRevealed] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  const correctCount = answers.reduce((sum, a, i) => sum + (a === questions[i].correct ? 1 : 0), 0);
  const pct = Math.round((correctCount / questions.length) * 100);
  const earnedXP = practice ? 0 : Math.round((test.xp * pct) / 100);

  const verdict = pct >= 85 ? { label: "Excellent work", color: "#34d399", emoji: "🏆" }
    : pct >= 60 ? { label: "Solid effort", color: "#fbbf24", emoji: "👍" }
    : { label: "Keep practicing", color: "#f87171", emoji: "💪" };

  return (
    <div className={darkMode ? "wt-results-root" : "wt-results-root light"}>
      <div className="wt-results-content">
        <div
          className="wt-score-card"
          style={{
            background: `linear-gradient(160deg, ${verdict.color}14 0%, var(--wt-surface-1) 100%)`,
            border: `1px solid ${verdict.color}35`,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
          }}
        >
          <div className="wt-score-emoji">{verdict.emoji}</div>
          <div className="wt-score-verdict" style={{ color: verdict.color }}>{verdict.label}</div>
          <div className="wt-score-pct">{pct}%</div>
          <div className="wt-score-sub">{correctCount} of {questions.length} correct{practice ? " · Practice run" : ""}</div>

          <div className="wt-score-stats-row">
            <div>
              <div className="wt-score-stat-val" style={{ color: "#fbbf24" }}>{practice ? "—" : `+${earnedXP}`}</div>
              <div className="wt-score-stat-label">XP earned</div>
            </div>
            <div className="wt-score-divider" />
            <div>
              <div className="wt-score-stat-val" style={{ color: "var(--wt-text)" }}>{formatClock(test.duration * 60)}</div>
              <div className="wt-score-stat-label">Time limit</div>
            </div>
          </div>

          {saveError && (
            <div className="wt-save-error">Couldn't save this attempt to your Reaction Log — check your connection.</div>
          )}
        </div>

        <button onClick={() => setShowReview((s) => !s)} className="wt-review-toggle">
          <span>📋 Review answers</span>
          <span className="wt-review-toggle-icon">{showReview ? "−" : "+"}</span>
        </button>

        {showReview && (
          <div className="wt-review-list">
            {questions.map((q, i) => {
              const correct = answers[i] === q.correct;
              const skipped = answers[i] === null;
              return (
                <div key={i} className="wt-review-item" style={{ border: `1px solid ${correct ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}` }}>
                  <div className="wt-review-item-top">
                    <span className="wt-review-item-icon">{correct ? "✅" : skipped ? "⏭️" : "❌"}</span>
                    <p className="wt-review-q">{q.q}</p>
                  </div>
                  <div className="wt-review-detail">
                    {!skipped && !correct && <div>Your answer: <span className="wt-review-wrong">{q.options[answers[i]]}</span></div>}
                    <div>Correct answer: <span className="wt-review-correct">{q.options[q.correct]}</span></div>
                    <div className="wt-review-why">{q.why}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="wt-results-actions">
          <button onClick={onBack} className="wt-results-back-btn">
            Back to tests
          </button>
          <button
            onClick={onRetake}
            className="wt-results-retake-btn"
            style={{ background: `linear-gradient(135deg, ${test.accent}, ${test.accent}cc)`, boxShadow: `0 8px 24px ${test.accent}40` }}
          >
            Retake test
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Weekly Test page ──────────────────────────────────────────────────────
export default function WeeklyTestPage({ onBack, darkMode = true }) {
  const [cd, setCd] = useState(getCountdown());
  const [selected, setSelected] = useState(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [view, setView] = useState("list"); // 'list' | 'quiz' | 'results'
  const [lastAnswers, setLastAnswers] = useState(null);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    style: {
      left: `${(i * 6.2) % 100}%`,
      bottom: `-${10 + (i * 13) % 40}px`,
      animationDelay: `${(i * 0.7) % 8}s`,
      animationDuration: `${10 + (i * 1.3) % 8}s`,
    },
    seed: i,
  })), []);

  const totalXP = TESTS.reduce((s, t) => s + t.xp, 0);
  const attemptedTests = Object.values(progress).filter((p) => p.attempts > 0);
  const avgAccuracy = attemptedTests.length
    ? Math.round(attemptedTests.reduce((s, p) => s + (p.best ?? 0), 0) / attemptedTests.length)
    : 0;

  const handleStart = (test) => { setSelected(test); setPracticeMode(false); };
  const handlePractice = (test) => { setSelected(test); setPracticeMode(true); };

  const handleConfirm = () => { setView("quiz"); };

  const handleFinish = (answers) => {
    setLastAnswers(answers);
    const questions = QUESTION_BANKS[selected.id];
    const correct = answers.reduce((sum, a, i) => sum + (a === questions[i].correct ? 1 : 0), 0);
    const pct = Math.round((correct / questions.length) * 100);

    if (!practiceMode) {
      setProgress((prev) => ({
        ...prev,
        [selected.id]: { attempts: prev[selected.id].attempts + 1, best: Math.max(prev[selected.id].best ?? 0, pct) },
      }));
    }

    const breakdown = questions.map((q, i) => ({
      question: q.q,
      chosen: answers[i] === null ? "Skipped" : q.options[answers[i]],
      correctAnswer: q.options[q.correct],
      correct: answers[i] === q.correct,
    }));
    setSaveError(false);
    addAttempt({
      assessment: `Weekly Test — ${selected.topic}${practiceMode ? " (Practice)" : ""}`,
      score: `${correct}/${questions.length}`,
      scorePct: pct,
      breakdown,
    }).catch(() => setSaveError(true));

    setView("results");
  };

  const handleExitQuiz = () => { setSelected(null); setPracticeMode(false); setView("list"); };
  const handleBackFromResults = () => { setSelected(null); setPracticeMode(false); setView("list"); setLastAnswers(null); setSaveError(false); };
  const handleRetake = () => { setLastAnswers(null); setSaveError(false); setView("quiz"); };

  if (view === "quiz" && selected) {
    return <QuizView test={selected} practice={practiceMode} onExit={handleExitQuiz} onFinish={handleFinish} darkMode={darkMode} />;
  }
  if (view === "results" && selected && lastAnswers) {
    return <ResultsView test={selected} practice={practiceMode} answers={lastAnswers} saveError={saveError} onRetake={handleRetake} onBack={handleBackFromResults} darkMode={darkMode} />;
  }

  return (
    <div className={darkMode ? "wt-page" : "wt-page light"}>
      <div className="wt-particles-layer">
        {particles.map((p, i) => <Particle key={i} style={p.style} seed={p.seed} />)}
        <div className="wt-blob-1" />
        <div className="wt-blob-2" />
      </div>

      <div className="wt-header">
        <button className="wt-back-btn" onClick={onBack}>←</button>
        <div className="wt-title-row-wrap">
          <div className="wt-title-row">
            <span className="wt-title-emoji">🧬</span>
            <span className="wt-title-text">Weekly Test</span>
            <span
              className="wt-live-badge"
              style={cd.isSunday ? { background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" } : { background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)" }}
            >
              {cd.isSunday ? "● LIVE" : "⏳ Sunday"}
            </span>
          </div>
        </div>
        <div className="wt-xp-badge">
          ⚡ {totalXP} XP
        </div>
      </div>

      <div className="wt-content">
        <div
          className="wt-hero"
          style={{
            background: cd.isSunday ? "linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(16,185,129,0.06) 100%)" : "linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(59,130,246,0.08) 50%, rgba(96,165,250,0.05) 100%)",
            border: cd.isSunday ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(96,165,250,0.22)",
          }}
        >
          <div className="wt-hero-ring-lg" style={{ borderColor: cd.isSunday ? "rgba(52,211,153,0.2)" : "rgba(96,165,250,0.2)" }} />
          <div className="wt-hero-ring-md" style={{ borderColor: cd.isSunday ? "rgba(52,211,153,0.3)" : "rgba(96,165,250,0.3)", animationDelay: "0.5s" }} />
          <div className="wt-hero-ring-icon" style={{ background: cd.isSunday ? "rgba(52,211,153,0.15)" : "rgba(96,165,250,0.15)", border: cd.isSunday ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(96,165,250,0.4)" }}>
            {cd.isSunday ? "🎯" : "🔓"}
          </div>

          {cd.isSunday ? (
            <div>
              <div className="wt-hero-title">The test is <span style={{ color: "#34d399" }}>live</span> today</div>
              <div className="wt-hero-sub-live">It's Sunday, so every test below is open and scored.</div>
            </div>
          ) : (
            <div>
              <div className="wt-hero-title">Next unlock in</div>
              <div className="wt-hero-sub">Each test opens in full every Sunday. Until then, you can use <span className="wt-hero-sub-highlight">Practice</span> mode — same questions, no scoring pressure.</div>
              <div className="wt-ring-row">
                <RingUnit value={cd.days} label="Days" max={7} color="#fb923c" />
                <span className="wt-ring-colon">:</span>
                <RingUnit value={cd.hours} label="Hours" max={24} color="#60a5fa" />
                <span className="wt-ring-colon">:</span>
                <RingUnit value={cd.minutes} label="Mins" max={60} color="#22d3ee" />
                <span className="wt-ring-colon">:</span>
                <RingUnit value={cd.seconds} label="Secs" max={60} color="#4ade80" />
              </div>
            </div>
          )}
        </div>

        <div className="wt-stats-grid">
          {[
            { label: "Tests Available", val: TESTS.length, icon: "📋", color: "#60a5fa" },
            { label: "Total XP Pool", val: `${totalXP}`, icon: "⚡", color: "#fbbf24" },
            { label: "Avg. Accuracy", val: attemptedTests.length ? `${avgAccuracy}%` : "—", icon: "🎯", color: "#34d399" },
          ].map((s) => (
            <div key={s.label} className="wt-stat-card">
              <div className="wt-stat-icon">{s.icon}</div>
              <div className="wt-stat-val" style={{ color: s.color }}>{s.val}</div>
              <div className="wt-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="wt-tests-row">
          <div className="wt-tests-inner">
            {TESTS.map((test) => (
              <TestCard key={test.id} test={test} progress={progress[test.id]} isSunday={cd.isSunday} onStart={handleStart} onPractice={handlePractice} />
            ))}
          </div>
        </div>

        <div className="wt-tip">
          <span className="wt-tip-icon">💡</span>
          <p className="wt-tip-text">
Every test opens in full every Sunday. Until then, Practice mode lets you go through the same questions without a score counting against you. Every attempt — practice or graded — is saved in your <span className="wt-tip-highlight">Reaction Log</span>, and you can retake a test as many times as you like.
          </p>
        </div>
      </div>

      {selected && view === "list" && (
        <ConfirmModal test={selected} practice={practiceMode} onClose={() => { setSelected(null); setPracticeMode(false); }} onConfirm={handleConfirm} />
      )}
    </div>
  );
}
