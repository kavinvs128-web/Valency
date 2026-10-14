import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Zap,
  Calculator,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import "../styles/EmpiricalMolecularFormula.css";

/* ---------- Static content data ---------- */

const sideNavItems = [
  { id: "emf-hero", label: "Intro" },
  { id: "emf-sec-what", label: "What are they" },
  { id: "emf-sec-method", label: "Golden method" },
  { id: "emf-sec-worked1", label: "Worked example" },
  { id: "emf-sec-fractions", label: "Fractional ratios" },
  { id: "emf-sec-worked2", label: "Simple ratio" },
  { id: "emf-sec-molecular", label: "Molecular formula" },
  { id: "emf-sec-combined", label: "Combined example" },
  { id: "emf-sec-analogy", label: "Analogy" },
  { id: "emf-sec-mistakes", label: "Common mistakes" },
  { id: "emf-sec-quiz", label: "Quiz" },
  { id: "emf-sec-industry", label: "Applications" },
  { id: "emf-sec-practice", label: "Practice" },
  { id: "emf-sec-mindmap", label: "Higher education" },
];

const comparisonRows = [
  { compound: "Glucose", empirical: <>CH<sub>2</sub>O</>, molecular: <>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></> },
  { compound: "Acetic acid", empirical: <>CH<sub>2</sub>O</>, molecular: <>C<sub>2</sub>H<sub>4</sub>O<sub>2</sub></> },
  { compound: "Benzene", empirical: "CH", molecular: <>C<sub>6</sub>H<sub>6</sub></> },
  { compound: "Hydrogen peroxide", empirical: "HO", molecular: <>H<sub>2</sub>O<sub>2</sub></> },
  { compound: "Water", empirical: <>H<sub>2</sub>O</>, molecular: <>H<sub>2</sub>O</> },
];

/* Worked Example 1 data — drives the animated Golden Method demo */
const methodRows = [
  { el: "C", pct: "40", mass: "40 g", atomicMass: "12", moles: "3.33", ratio: "1" },
  { el: "H", pct: "6.67", mass: "6.67 g", atomicMass: "1", moles: "6.67", ratio: "2" },
  { el: "O", pct: "53.33", mass: "53.33 g", atomicMass: "16", moles: "3.33", ratio: "1" },
];

const fractionRows = [
  { id: "f1", decimal: "0.5", multiplyBy: "2", example: "1 : 1.5 : 1", whole: "2 : 3 : 2" },
  { id: "f2", decimal: "0.33 or 0.34", multiplyBy: "3", example: "1 : 1.33 : 1", whole: "3 : 4 : 3" },
  { id: "f3", decimal: "0.25", multiplyBy: "4", example: "1 : 1.25", whole: "4 : 5" },
  { id: "f4", decimal: "0.20", multiplyBy: "5", example: "1 : 1.20", whole: "5 : 6" },
  { id: "f5", decimal: "0.67", multiplyBy: "3", example: "1 : 1.67", whole: "3 : 5" },
];

/* Presets for the interactive molecular-formula calculator */
const empiricalPresets = [
  { id: "ch2o", label: <>CH<sub>2</sub>O</>, name: "Formaldehyde unit", mass: 30, atoms: [["C", 1], ["H", 2], ["O", 1]] },
  { id: "ch", label: "CH", name: "Benzene unit", mass: 13, atoms: [["C", 1], ["H", 1]] },
  { id: "ch2", label: <>CH<sub>2</sub></>, name: "Alkene unit", mass: 14, atoms: [["C", 1], ["H", 2]] },
  { id: "c2h4o", label: <>C<sub>2</sub>H<sub>4</sub>O</>, name: "Higher-order unit", mass: 44, atoms: [["C", 2], ["H", 4], ["O", 1]] },
];

/* Mid-page inline quiz data */
const midQuizData = [
  {
    q: "What is the empirical formula of a compound with C = 40%, H = 6.67%, O = 53.33%?",
    options: [<>CH<sub>2</sub>O</>, <>C<sub>2</sub>H<sub>4</sub>O<sub>2</sub></>, "CH", <>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></>],
    correct: 0,
    explain: <>Moles: C = 40/12 = 3.33, H = 6.67/1 = 6.67, O = 53.33/16 = 3.33. Divide by 3.33 → C:H:O = 1:2:1 → CH<sub>2</sub>O.</>,
  },
  {
    q: "A mole ratio comes out to 1 : 1.33 : 1. What should you multiply by to clear the fraction?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explain: "0.33 (≈1/3) needs ×3 to become a whole number: 1 : 1.33 : 1 → 3 : 4 : 3.",
  },
  {
    q: <>CH<sub>2</sub>O has an empirical formula mass of 30. If the molecular mass is 180, what is n?</>,
    options: ["3", "4", "6", "9"],
    correct: 2,
    explain: "n = molecular mass ÷ empirical formula mass = 180 ÷ 30 = 6.",
  },
  {
    q: "Benzene has empirical formula CH and molecular mass 78. What is its molecular formula?",
    options: [<>C<sub>2</sub>H<sub>2</sub></>, <>C<sub>4</sub>H<sub>4</sub></>, <>C<sub>6</sub>H<sub>6</sub></>, <>C<sub>3</sub>H<sub>3</sub></>],
    correct: 2,
    explain: <>Empirical mass of CH = 13. n = 78/13 = 6. Multiply CH by 6 → C<sub>6</sub>H<sub>6</sub>.</>,
  },
  {
    q: "What is the correct first step of the Golden Method when given percentage composition?",
    options: ["Divide moles by the smallest mole value", "Assume 100 g of the compound", "Multiply by molecular mass", "Write the formula directly"],
    correct: 1,
    explain: "Always start by assuming 100 g of the compound, so each percentage becomes a mass in grams.",
  },
];

/* Full-page quiz data */
const fullQuizData = [
  {
    q: "What does an empirical formula represent?",
    options: ["The actual number of atoms in one molecule", "The simplest whole-number ratio of atoms", "The molecular mass of a compound", "The percentage composition by mass"],
    correct: 1,
    explain: "Empirical formula is the simplest whole-number ratio of atoms of each element — molecular formula gives the actual count.",
    chapter: "Basics",
  },
  {
    q: "A compound is 92.3% C and 7.7% H. What is its empirical formula?",
    options: ["CH", <>CH<sub>2</sub></>, <>CH<sub>3</sub></>, <>C<sub>2</sub>H<sub>3</sub></>],
    correct: 0,
    explain: "Moles: C = 92.3/12 = 7.69, H = 7.7/1 = 7.70. Dividing both by 7.69 gives ≈1:1 → CH.",
    chapter: "Percentage → Formula",
  },
  {
    q: "A ratio comes out as 1 : 1.25. What whole-number ratio does this become?",
    options: ["1 : 1.25 stays as is", "2 : 3", "4 : 5", "5 : 6"],
    correct: 2,
    explain: "0.25 = 1/4, so multiply every part by 4: 1×4 : 1.25×4 = 4 : 5.",
    chapter: "Fractional ratios",
  },
  {
    q: "Empirical formula C2H4O has empirical mass 44, and the molecular mass is 88. What is the molecular formula?",
    options: [<>C<sub>2</sub>H<sub>4</sub>O</>, <>C<sub>4</sub>H<sub>8</sub>O<sub>2</sub></>, <>C<sub>6</sub>H<sub>12</sub>O<sub>3</sub></>, <>C<sub>3</sub>H<sub>6</sub>O</>],
    correct: 1,
    explain: <>n = 88 ÷ 44 = 2. Multiply every subscript in C<sub>2</sub>H<sub>4</sub>O by 2 → C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>.</>,
    chapter: "Molecular formula",
  },
  {
    q: "Which industry relies on this kind of composition analysis to check additive and nutrient levels?",
    options: ["Petrochemical industry", "Food industry", "Metallurgy", "Environmental analysis"],
    correct: 1,
    explain: "The food industry analyzes carbohydrates, proteins, fats and additives — composition checks rely on empirical/molecular formula work.",
    chapter: "Applications",
  },
];

const industryCards = [
  { num: "01", title: "Pharmaceutical Industry", desc: "Determines the composition and analysis of chemical substances and drug-related compounds." },
  { num: "02", title: "Food Industry", desc: "Analyzes carbohydrates, proteins, fats and additives against labelled composition." },
  { num: "03", title: "Fertilizer Industry", desc: "Checks composition and elemental analysis of fertilizer chemicals." },
  { num: "04", title: "Petrochemical Industry", desc: "Analyzes fuels, hydrocarbons and petroleum products by formula." },
  { num: "05", title: "Metallurgy", desc: "Determines composition of compounds formed during extraction and processing of metals." },
  { num: "06", title: "Environmental Analysis", desc: "Analyzes water, soil, air and industrial waste for chemical composition." },
  { num: "07", title: "Research Laboratories", desc: "Determines empirical composition of unknown substances from analytical data." },
];

const practiceQuestions = [
  "Find the empirical formula of a compound containing C = 40%, H = 6.67%, O = 53.33%.",
  "Find the empirical formula of a compound containing C = 92.3%, H = 7.7%.",
  "Empirical formula = CH₂O and molecular mass = 180. Find the molecular formula.",
  "Empirical formula = CH₂ and molecular mass = 42. Find the molecular formula.",
  "A compound contains 52.17% C, 13.04% H and 34.78% O. Molecular mass = 92. Find both formulas.",
  "Two compounds share the empirical formula CH₂O but have different molecular formulas. Explain why, with examples.",
];

const mistakes = [
  "Do not use percentage values directly as the atom ratio.",
  "Always convert mass to moles using mass ÷ atomic mass.",
  "Always divide every mole value by the smallest mole value.",
  "Never leave decimal subscripts in the final empirical formula.",
  "When multiplying a fractional ratio, multiply every element by the same number.",
  "For molecular formula, use molecular mass ÷ empirical formula mass — never guess.",
];

const higherEdBranches = [
  { color: "c1", title: "B.Sc Chemistry", desc: "Organic, inorganic, analytical & physical chemistry — lab calculations and composition analysis." },
  { color: "c2", title: "B.Pharm / Pharmacy", desc: "Chemical composition, pharmaceutical analysis, and understanding molecular formulas." },
  { color: "c3", title: "Engineering", desc: "Chemical engineering, materials engineering, metallurgy and fuel analysis." },
  { color: "c1", title: "Biochemistry / Life Sciences", desc: "Molecular composition of organic and biological substances." },
  { color: "c2", title: "Research", desc: "Identification and characterization of unknown compounds." },
];

/* ---------- Golden Method animated demo ---------- */
function GoldenMethodDemo() {
  const [active, setActive] = useState(false);

  return (
    <div className={`emf-method${active ? " emf-active" : ""}`}>
      <table className="emf-method-table">
        <thead>
          <tr>
            <th>Element</th>
            <th>%</th>
            <th>Mass (100 g)</th>
            <th>Atomic mass</th>
            <th>Moles</th>
            <th>÷ smallest</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          {methodRows.map((r) => (
            <tr key={r.el}>
              <td className="emf-el">{r.el}</td>
              <td>{r.pct}</td>
              <td className="emf-method-cell stage-1">{r.mass}</td>
              <td className="emf-method-cell stage-1">{r.atomicMass}</td>
              <td className="emf-method-cell stage-2">{r.moles}</td>
              <td className="emf-method-cell stage-3">÷ 3.33</td>
              <td className="emf-method-cell stage-4">{r.ratio}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="emf-method-formula">
        Empirical formula = CH<sub>2</sub>O
      </div>

      <div className="emf-method-controls">
        <button className="emf-run-btn" onClick={() => setActive((a) => !a)}>
          {active ? (
            <><RotateCcw size={20} style={{ marginRight: 6, verticalAlign: "-2px" }} />Reset</>
          ) : (
            <><Zap size={22} style={{ marginRight: 6, verticalAlign: "-2px" }} />Run the Golden Method</>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- Fractional ratio chips ---------- */
function FractionExplorer() {
  const [selected, setSelected] = useState(null);
  const row = fractionRows.find((r) => r.id === selected);

  return (
    <div className="emf-frac">
      <div className="emf-frac-chips">
        {fractionRows.map((r) => (
          <button
            key={r.id}
            className={`emf-frac-chip${selected === r.id ? " active" : ""}`}
            onClick={() => setSelected(r.id)}
          >
            {r.decimal}
          </button>
        ))}
      </div>
      {row ? (
        <div className="emf-frac-detail">
          {row.example} <span className="arrow">×{row.multiplyBy}→</span> <span className="result">{row.whole}</span>
        </div>
      ) : (
        <div className="emf-frac-detail emf-frac-empty">Tap a decimal above to see what to multiply by.</div>
      )}
    </div>
  );
}

/* ---------- Molecular formula calculator ---------- */
function MolecularFormulaCalculator() {
  const [presetId, setPresetId] = useState("ch2o");
  const [molecularMass, setMolecularMass] = useState(180);

  const preset = empiricalPresets.find((p) => p.id === presetId) || empiricalPresets[0];
  const nRaw = molecularMass / preset.mass;
  const n = Math.max(1, Math.round(nRaw));

  const selectPreset = (p) => {
    setPresetId(p.id);
    setMolecularMass((m) => Math.min(Math.max(m, p.mass), p.mass * 12));
  };

  return (
    <div className="emf-calc">
      <div className="emf-calc-chips">
        {empiricalPresets.map((p) => (
          <button
            key={p.id}
            className={`emf-calc-chip${presetId === p.id ? " active" : ""}`}
            onClick={() => selectPreset(p)}
          >
            {p.label} <span style={{ opacity: 0.6 }}>· M = {p.mass}</span>
          </button>
        ))}
      </div>

      <div className="emf-calc-input-row">
        <span className="emf-calc-mass-label">Molecular mass:</span>
        <input
          type="range"
          min={preset.mass}
          max={preset.mass * 12}
          step="1"
          value={molecularMass}
          onChange={(e) => setMolecularMass(Number(e.target.value))}
        />
        <span className="emf-calc-mass-value">{molecularMass}</span>
      </div>

      <div className="emf-calc-results">
        <div className="emf-calc-result-card n">
          <div className="emf-calc-result-label">n (multiplier)</div>
          <div className="emf-calc-result-value">n ≈ {n}</div>
          <div className="emf-calc-result-formula">n = {molecularMass} ÷ {preset.mass} = {nRaw.toFixed(2)}</div>
        </div>
        <div className="emf-calc-result-card mol">
          <div className="emf-calc-result-label">Molecular formula</div>
          <div className="emf-calc-result-value">
            {preset.atoms.map(([el, count]) => (
              <span key={el}>{el}<sub>{count * n}</sub></span>
            ))}
          </div>
          <div className="emf-calc-result-formula">({preset.label}) × {n}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inline mid-page Quiz ---------- */
function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const finished = currentQ >= midQuizData.length;
  const item = !finished ? midQuizData[currentQ] : null;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="emf-quiz-box">
      <div className="emf-quiz-progress">
        {midQuizData.map((_, i) => (
          <div key={i} className={`emf-qdot${i < currentQ ? " emf-done" : i === currentQ ? " emf-current" : ""}`} />
        ))}
      </div>
      {!finished ? (
        <div>
          <div className="emf-quiz-q">Q{currentQ + 1}. {item.q}</div>
          <div className="emf-quiz-options">
            {item.options.map((opt, i) => {
              let cls = "emf-quiz-opt";
              if (answered && i === item.correct) cls += " emf-correct";
              else if (answered && i === selected) cls += " emf-wrong";
              return (
                <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && <div className="emf-quiz-feedback">{item.explain}</div>}
          {answered && (
            <button className="emf-quiz-next" onClick={handleNext}>
              Next <ChevronRight size={14} style={{ verticalAlign: "-2px" }} />
            </button>
          )}
        </div>
      ) : (
        <div className="emf-quiz-score">
          <div className="emf-big">{score}/{midQuizData.length}</div>
          <p style={{ margin: "10px 0 18px" }}>Nice work. Review any you missed above, or retry the deck.</p>
          <button className="emf-run-btn" onClick={handleRetry}>
            <RotateCcw size={15} style={{ marginRight: 6, verticalAlign: "-2px" }} />
            Retry quiz
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Full-page Quiz ---------- */
function QuizPage({ onBack, darkMode = true }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = done;
  }, [done]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (doneRef.current) { clearInterval(interval); return; }
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const item = !done ? fullQuizData[currentQ] : null;
  const labels = ["A", "B", "C", "D"];
  const pct = Math.round((score / fullQuizData.length) * 100);
  const passed = pct >= 60;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
    setUserAnswers((prev) => [...prev, { chosen: i, correct: i === item.correct }]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= fullQuizData.length) { setDone(true); return; }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRetry = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setScore(0); setUserAnswers([]); setDone(false);
    setTimeLeft(5 * 60);
  };

  const progressPct = (currentQ / fullQuizData.length) * 100;

  return (
    <div className={darkMode ? "emf-root" : "emf-root light"}>
      <div className="emf-topbar">
        <div className="emf-top-left">
          <button className="emf-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to lesson
          </button>
        </div>
        <div className="emf-page-pill">
          <span>🧬</span>
          <span>Empirical &amp; Molecular Formula — Quiz</span>
        </div>
        {!done && <div className="emf-timer">⏱ {mins}:{secs}</div>}
      </div>

      <div className="emf-progress-rail">
        <div className="emf-progress-fill" style={{ width: done ? "100%" : `${progressPct}%` }} />
      </div>

      <div className="emf-qp-wrap">
        {!done ? (
          <div className="emf-qp-card">
            <div className="emf-qp-meta">
              <span className="emf-qp-counter">Question {currentQ + 1} of {fullQuizData.length}</span>
              <span className="emf-qp-chapter">{item.chapter}</span>
            </div>
            <div className="emf-qp-dots">
              {fullQuizData.map((_, i) => (
                <div key={i} className={`emf-qp-dot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
              ))}
            </div>
            <div className="emf-qp-question">{item.q}</div>
            <div className="emf-qp-options">
              {item.options.map((opt, i) => {
                let cls = "emf-qp-opt";
                if (answered && i === item.correct) cls += " correct";
                else if (answered && i === selected) cls += " wrong";
                return (
                  <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                    <span className="emf-qp-opt-label">{labels[i]}</span>
                    <span className="emf-qp-opt-text">{opt}</span>
                    {answered && i === item.correct && <CheckCircle size={18} className="emf-qp-opt-icon correct" />}
                    {answered && i === selected && i !== item.correct && <XCircle size={18} className="emf-qp-opt-icon wrong" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`emf-qp-feedback ${selected === item.correct ? "correct" : "wrong"}`}>
                <strong>{selected === item.correct ? "Correct!" : "Not quite."}</strong>{" "}{item.explain}
              </div>
            )}
            {answered && (
              <div className="emf-qp-next-row">
                <button className="emf-qp-next-btn" onClick={handleNext}>
                  {currentQ + 1 >= fullQuizData.length ? "See results" : "Next question"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="emf-qp-card">
            <div className="emf-qp-result-top">
              <div className={`emf-qp-trophy ${passed ? "pass" : "fail"}`}>{passed ? "🏆" : "📚"}</div>
              <div>
                <div className="emf-qp-result-pct">{pct}%</div>
                <div className="emf-qp-result-sub">{score} out of {fullQuizData.length} correct</div>
              </div>
            </div>
            <div className="emf-qp-result-divider" />
            <p className="emf-qp-result-msg">
              {passed
                ? "You passed the Empirical & Molecular Formula quiz — the golden method is clicking into place."
                : "Not quite — review the Golden Method and the fractional-ratio table, then try again."}
            </p>
            <div className="emf-qp-breakdown">
              {fullQuizData.map((q, i) => (
                <div key={i} className="emf-qp-breakdown-row">
                  {userAnswers[i]?.correct
                    ? <CheckCircle size={18} className="emf-qp-opt-icon correct" />
                    : <XCircle size={18} className="emf-qp-opt-icon wrong" />}
                  <span>Q{i + 1}: {q.chapter}</span>
                </div>
              ))}
            </div>
            <div className="emf-qp-result-actions">
              <button className="emf-qp-next-btn" onClick={handleRetry}>
                <RotateCcw size={16} /> Retry quiz
              </button>
              <button className="emf-back-btn" onClick={onBack}>
                <ArrowLeft size={16} /> Back to lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Higher-education mindmap (short) ---------- */
function HigherEdMap() {
  return (
    <div className="emf-mm-wrap">
      <div className="emf-mm-hub-row">
        <div className="emf-mm-hub">Where formula skills lead</div>
      </div>
      <div className="emf-mm-connector">
        <div className="emf-mm-elbow-v" />
        <div className="emf-mm-elbow-h" />
      </div>
      <div className="emf-mm-tree">
        {higherEdBranches.map((b) => (
          <div className="emf-mm-row" key={b.title}>
            <span className="emf-mm-tick" />
            <div className={`emf-mm-box ${b.color}`}>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */
export default function EmpiricalMolecularFormula({ onBack, onViewBeyond, darkMode = true }) {
  const [activeNav, setActiveNav] = useState("emf-hero");
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    function handlePopState(e) {
      const level = e.state && e.state.level;
      setShowQuiz(level === "quiz");
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const startQuiz = () => {
    window.history.pushState({ app: true, level: "quiz" }, "", window.location.href);
    setShowQuiz(true);
  };

  const handleScroll = useCallback(() => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    setProgress(scrolled || 0);
    let active = sideNavItems[0].id;
    for (const item of sideNavItems) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = item.id;
    }
    setActiveNav(active);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const id = requestAnimationFrame(handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(id); };
  }, [handleScroll]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (showQuiz) return <QuizPage darkMode={darkMode} onBack={() => window.history.back()} />;

  return (
    <div className={darkMode ? "emf-root" : "emf-root light"}>
      <div className="emf-topbar">
        <div className="emf-top-left">
          <button className="emf-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Class 11
          </button>
        </div>
        <div className="emf-page-pill">
          <span>🧬</span>
          <span>Empirical &amp; Molecular Formula</span>
        </div>
      </div>

      <div className="emf-progress-rail">
        <div className="emf-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <nav className="emf-side-nav">
        {sideNavItems.map((item) => (
          <button key={item.id} data-label={item.label}
            className={activeNav === item.id ? "emf-active" : ""}
            onClick={() => jumpTo(item.id)} />
        ))}
      </nav>

      {/* Hero */}
      <header className="emf-hero" id="emf-hero">
        <div className="emf-hero-content">
          <div className="emf-hero-eyebrow">
            Class 11 Chemistry <span className="emf-crumb">›</span> Unit 1.3
          </div>
          <h1 className="emf-hero-title">
            <span className="teal">Empirical</span> &amp; <span className="rose">Molecular</span> Formula
          </h1>
          <p className="emf-hero-sub">
            Percentage composition alone can't hand you a formula — you have to go through moles first.
            This is the golden method that turns raw lab data into real chemical formulas.
          </p>
          <div className="emf-mnemonic-row">
            <div className="emf-mnemonic-chip teal">% → g → mol <span className="full">→ ratio → formula</span></div>
            <div className="emf-mnemonic-chip rose">n = M ÷ E <span className="full">— molecular ÷ empirical mass</span></div>
          </div>
        </div>
      </header>

      <div className="emf-lesson-wrap">
        {/* 1. What are they */}
        <section className="emf-section" id="emf-sec-what">
          <div className="emf-section-tag"><span className="emf-section-num">1</span> Foundation</div>
          <h2>What are these formulas?</h2>
          <p><strong>Empirical formula</strong> is the simplest whole-number ratio of atoms of each element in a compound. <strong>Molecular formula</strong> is the actual number of atoms of each element in one molecule.</p>
          <table className="emf-table">
            <thead>
              <tr><th>Compound</th><th>Empirical formula</th><th>Molecular formula</th></tr>
            </thead>
            <tbody>
              {comparisonRows.map((r) => (
                <tr key={r.compound}>
                  <td>{r.compound}</td>
                  <td className="emf-mono">{r.empirical}</td>
                  <td className="emf-mono rose">{r.molecular}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 2. Golden method */}
        <section className="emf-section" id="emf-sec-method">
          <div className="emf-section-tag"><span className="emf-section-num">2</span> The golden method</div>
          <h2>Percentage → Mass → Mole → Ratio → Formula</h2>
          <p>Six steps, always in this order. Tap the button to watch a real compound (C = 40%, H = 6.67%, O = 53.33%) walk through every stage.</p>
          <GoldenMethodDemo />
          <p style={{ marginTop: 24, fontSize: 20, color: "#a5adc6" }}>
            1. Assume 100 g of the compound &nbsp;·&nbsp; 2. Each % becomes a mass in grams &nbsp;·&nbsp;
            3. moles = mass ÷ atomic mass &nbsp;·&nbsp; 4. Divide every mole value by the smallest &nbsp;·&nbsp;
            5. Round to the nearest whole-number ratio &nbsp;·&nbsp; 6. Write the formula using those numbers as subscripts.
          </p>
        </section>

        {/* 3. Worked example 1 */}
        <section className="emf-section" id="emf-sec-worked1">
          <div className="emf-section-tag"><span className="emf-section-num">3</span> Step by step</div>
          <h2>Worked example — finding an empirical formula</h2>
          <div className="emf-worked">
            <div className="emf-wq">A compound contains C = 40%, H = 6.67%, O = 53.33%. Find its empirical formula.</div>
            <div className="emf-wstep">Moles: C = 40/12 = 3.33, H = 6.67/1 = 6.67, O = 53.33/16 = 3.33</div>
            <div className="emf-wstep">Divide by smallest (3.33): C = 1, H = 2, O = 1</div>
            <div className="emf-wans">Empirical formula = CH₂O</div>
          </div>
        </section>

        {/* 4. Fractional ratios */}
        <section className="emf-section" id="emf-sec-fractions">
          <div className="emf-section-tag"><span className="emf-section-num">4</span> Very important</div>
          <h2>Fractional ratios</h2>
          <p>Decimal subscripts can't be used. Multiply every ratio by a suitable small integer. Tap a decimal to see how.</p>
          <FractionExplorer />
        </section>

        {/* 5. Worked example 2 */}
        <section className="emf-section" id="emf-sec-worked2">
          <div className="emf-section-tag"><span className="emf-section-num">5</span> Step by step</div>
          <h2>Worked example — a simple 1:1 ratio</h2>
          <div className="emf-worked">
            <div className="emf-wq">C = 92.3%, H = 7.7%. Find the empirical formula.</div>
            <div className="emf-wstep">Assume 100 g: C = 92.3 g, H = 7.7 g</div>
            <div className="emf-wstep">Moles: C = 92.3/12 = 7.69, H = 7.7/1 = 7.70</div>
            <div className="emf-wstep">Divide by 7.69 → approximately 1 : 1</div>
            <div className="emf-wans">Empirical formula = CH</div>
          </div>
        </section>

        {/* 6. Molecular formula */}
        <section className="emf-section" id="emf-sec-molecular">
          <div className="emf-section-tag"><span className="emf-section-num">6</span> <Calculator size={16} style={{ verticalAlign: "-3px" }} /> Try it yourself</div>
          <h2>Molecular formula — the easy method</h2>
          <p>n = molecular mass ÷ empirical formula mass, then multiply every subscript in the empirical formula by n. Pick an empirical formula and drag the molecular-mass slider.</p>
          <MolecularFormulaCalculator />
        </section>

        {/* 7. Combined example */}
        <section className="emf-section" id="emf-sec-combined">
          <div className="emf-section-tag"><span className="emf-section-num">7</span> Putting it together</div>
          <h2>Combined &amp; higher-order examples</h2>
          <div className="emf-worked">
            <div className="emf-wq">C = 40%, H = 6.67%, O = 53.33%; molecular mass = 180. Find both formulas.</div>
            <div className="emf-wstep">Empirical formula = CH₂O. Empirical formula mass = 30.</div>
            <div className="emf-wstep">n = 180/30 = 6</div>
            <div className="emf-wans">Molecular formula = C₆H₁₂O₆</div>
          </div>
          <div className="emf-worked">
            <div className="emf-wq">A compound contains C = 54.55%, H = 9.09%, O = 36.36%. Molecular mass = 88. Find both formulas.</div>
            <div className="emf-wstep">Moles: C = 54.55/12 = 4.55, H = 9.09/1 = 9.09, O = 36.36/16 = 2.27</div>
            <div className="emf-wstep">Divide by 2.27 → ratio 2 : 4 : 1 → Empirical formula = C₂H₄O (mass 44)</div>
            <div className="emf-wstep">n = 88/44 = 2</div>
            <div className="emf-wans">Molecular formula = C₄H₈O₂</div>
          </div>
        </section>

        {/* 8. Analogy */}
        <section className="emf-section" id="emf-sec-analogy">
          <div className="emf-section-tag"><span className="emf-section-num">8</span> A classroom analogy</div>
          <h2>Empirical formula = the simplest recipe</h2>
          <div className="emf-analogy">
            <div className="emf-analogy-label">Think of it like a recipe</div>
            <p>If a recipe uses 6 parts of one ingredient and 12 parts of another, the simplest ratio is 1 : 2 — you don't need to write "6 and 12" every time. Similarly, C₆H₁₂O₆ becomes CH₂O once every subscript is divided by 6.</p>
          </div>
        </section>

        {/* 9. Common mistakes */}
        <section className="emf-section" id="emf-sec-mistakes">
          <div className="emf-section-tag"><span className="emf-section-num">9</span> Watch out</div>
          <h2>Common student mistakes</h2>
          <div className="emf-mistakes">
            {mistakes.map((m) => (
              <div className="emf-mistake-row" key={m}>
                <AlertTriangle size={20} className="emf-mistake-icon" />
                <p>{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Inline Quiz */}
        <section className="emf-section" id="emf-sec-quiz">
          <div className="emf-section-tag"><span className="emf-section-num">10</span> Check yourself</div>
          <h2>Quick quiz</h2>
          <p>Five questions on the golden method and formula conversions. No pressure — you can retry.</p>
          <Quiz />
        </section>

        {/* 11. Industry */}
        <section className="emf-section" id="emf-sec-industry">
          <div className="emf-section-tag"><span className="emf-section-num">11</span> Why it matters</div>
          <h2>Industrial applications</h2>
          <p>Composition analysis isn't just an exam topic — it's how industries verify what's actually in a product.</p>
          <div className="emf-industry-scroll">
            {industryCards.map((card) => (
              <div className="emf-industry-card" key={card.num}>
                <div className="emf-ic-num">{card.num}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Practice */}
        <section className="emf-section" id="emf-sec-practice">
          <div className="emf-section-tag"><span className="emf-section-num">12</span> Your turn</div>
          <h2>Practice on your own</h2>
          <p>Work these out before checking the next subtopic. Grab a notebook.</p>
          <div className="emf-practice-list">
            {practiceQuestions.map((q, i) => (
              <div className="emf-practice-item" key={i}>
                <span className="emf-pnum">{i + 1}</span> {q}
              </div>
            ))}
          </div>
        </section>

        {/* 13. Higher education mindmap */}
        <section className="emf-section" id="emf-sec-mindmap">
          <div className="emf-section-tag"><span className="emf-section-num">13</span> Looking ahead</div>
          <h2>Where this topic is used in higher education</h2>
          <p>A quick map of the degrees and careers that build directly on empirical and molecular formula skills.</p>
          <HigherEdMap />
        </section>

        {onViewBeyond && (
          <div className="emf-read-more-row">
            <button className="emf-read-more-btn" onClick={onViewBeyond}>
              See the full career roadmap <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Quiz CTA */}
        <div className="emf-cta-card">
          <div className="emf-cta-left">
            <div className="emf-cta-icon">🧠</div>
            <div>
              <h2 className="emf-cta-title">It's quiz time</h2>
              <p className="emf-cta-desc">
                Lock in what you've learned. Take this quiz to review the golden method and mark this learning unit as complete.
              </p>
              <div className="emf-cta-meta">
                <span className="emf-cta-meta-item">✅ Get 60% or more to pass</span>
                <span className="emf-cta-meta-item">🕐 ~5 minutes</span>
              </div>
              <button className="emf-cta-btn" onClick={startQuiz}>
                Start Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="emf-cta-right">
            <div className="emf-cta-trophy">🏆</div>
          </div>
        </div>
      </div>
    </div>
  );
}
