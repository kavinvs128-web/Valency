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
} from "lucide-react";
import "../styles/MoleConcept.css";

/* ---------- Static content data ---------- */

const sideNavItems = [
  { id: "mc-hero", label: "Intro" },
  { id: "mc-sec-what", label: "What is a mole" },
  { id: "mc-sec-formulas", label: "Formulas" },
  { id: "mc-sec-stage", label: "See it happen" },
  { id: "mc-sec-calculator", label: "Try it yourself" },
  { id: "mc-sec-worked", label: "Worked examples" },
  { id: "mc-sec-equations", label: "Mole & equations" },
  { id: "mc-sec-flash", label: "Match game" },
  { id: "mc-sec-quiz", label: "Quiz" },
  { id: "mc-sec-industry", label: "Applications" },
  { id: "mc-sec-practice", label: "Practice" },
  { id: "mc-sec-mindmap", label: "Future plan" },
];

const NA = 6.022e23;

const substances = [
  { id: "h2o", label: "H₂O", name: "Water", M: 18 },
  { id: "co2", label: "CO₂", name: "Carbon dioxide", M: 44 },
  { id: "nacl", label: "NaCl", name: "Salt", M: 58.5 },
  { id: "o2", label: "O₂", name: "Oxygen gas", M: 32 },
  { id: "nh3", label: "NH₃", name: "Ammonia", M: 17 },
  { id: "n2", label: "N₂", name: "Nitrogen gas", M: 28 },
];

const memoryPairs = [
  { id: 1, term: "n = m ÷ M", meaning: "Moles from mass" },
  { id: 2, term: "m = n × M", meaning: "Mass from moles" },
  { id: 3, term: <>N = n × N<sub>A</sub></>, meaning: "Particles from moles" },
  { id: 4, term: <>n = N ÷ N<sub>A</sub></>, meaning: "Moles from particles" },
  { id: 5, term: <>N<sub>A</sub> = 6.022 × 10²³</>, meaning: "Avogadro's constant" },
  { id: 6, term: "MASS → MOLES → PARTICLES", meaning: "The golden sequence" },
];

function shuffleTiles() {
  const tiles = [];
  memoryPairs.forEach((p) => {
    tiles.push({ uid: `${p.id}-term`, pairId: p.id, label: p.term, kind: "term" });
    tiles.push({ uid: `${p.id}-meaning`, pairId: p.id, label: p.meaning, kind: "meaning" });
  });
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}

/* Mid-page inline quiz data */
const midQuizData = [
  {
    q: "How many moles are in 36 g of H₂O? (M = 18 g/mol)",
    options: ["0.5 mol", "1 mol", "2 mol", "36 mol"],
    correct: 2,
    explain: "n = m / M = 36 / 18 = 2 mol.",
  },
  {
    q: "What is the value of the Avogadro constant?",
    options: ["6.022 × 10²²", "6.022 × 10²³", "3.011 × 10²³", "1.602 × 10⁻¹⁹"],
    correct: 1,
    explain: <>N<sub>A</sub> = 6.022 × 10²³ mol⁻¹ — the number of particles in one mole of anything.</>,
  },
  {
    q: "Find the mass of 0.5 mole of CO₂. (M = 44 g/mol)",
    options: ["11 g", "22 g", "44 g", "88 g"],
    correct: 1,
    explain: "m = n × M = 0.5 × 44 = 22 g.",
  },
  {
    q: "How many molecules are in 2 moles of any substance?",
    options: ["6.022 × 10²³", "1.204 × 10²⁴", "3.011 × 10²³", "6.022 × 10²⁴"],
    correct: 1,
    explain: <>N = n × N<sub>A</sub> = 2 × 6.022 × 10²³ = 1.204 × 10²⁴ molecules.</>,
  },
  {
    q: "A sample has 1.505 × 10²³ particles. How many moles is that?",
    options: ["0.25 mol", "0.5 mol", "1 mol", "2 mol"],
    correct: 0,
    explain: <>n = N / N<sub>A</sub> = 1.505 × 10²³ ÷ 6.022 × 10²³ ≈ 0.25 mol.</>,
  },
];

/* Full-page quiz data */
const fullQuizData = [
  {
    q: "What does 1 mole of any substance always contain?",
    options: ["12 particles", "6.022 × 10²³ particles", "1 gram of substance", "Avogadro's number of grams"],
    correct: 1,
    explain: "By definition, 1 mole = Avogadro's number = 6.022 × 10²³ particles, no matter the substance.",
    chapter: "Mole basics",
  },
  {
    q: "Find the number of moles in 88 g of CO₂. (M = 44 g/mol)",
    options: ["0.5 mol", "1 mol", "2 mol", "4 mol"],
    correct: 2,
    explain: "n = m / M = 88 / 44 = 2 mol.",
    chapter: "Mass → Moles",
  },
  {
    q: "How many molecules are present in 1 mole of H₂O?",
    options: ["1", "18", "6.022 × 10²³", "3.011 × 10²³"],
    correct: 2,
    explain: <>N = n × N<sub>A</sub> = 1 × 6.022 × 10²³ = 6.022 × 10²³ molecules.</>,
    chapter: "Moles → Particles",
  },
  {
    q: "In N₂ + 3H₂ → 2NH₃, how many moles of NH₃ form from 6 moles of H₂ (excess N₂)?",
    options: ["2 mol", "3 mol", "4 mol", "6 mol"],
    correct: 2,
    explain: "Mole ratio H₂ : NH₃ = 3 : 2, so 6 mol H₂ × (2/3) = 4 mol NH₃.",
    chapter: "Mole ratios",
  },
  {
    q: "What is the mass of 0.25 mole of NaOH? (M = 40 g/mol)",
    options: ["4 g", "8 g", "10 g", "40 g"],
    correct: 2,
    explain: "m = n × M = 0.25 × 40 = 10 g.",
    chapter: "Moles → Mass",
  },
];

const industryCards = [
  { num: "01", title: "Fertilizer Industry", eq: "N₂ + 3H₂ → 2NH₃  (ratio 1:3:2)", use: "Determines exactly how much nitrogen and hydrogen is needed to manufacture ammonia for fertilizers." },
  { num: "02", title: "Pharmaceutical Industry", eq: "n = m / M", use: "Used to prepare medicines, calculate reactant quantities, and control the purity of drugs." },
  { num: "03", title: "Chemical Industries", eq: "Raw materials → Reaction → Products", use: "Select the correct amount of raw material, predicts product quantity, and reduces wastage." },
  { num: "04", title: "Laboratory Applications", eq: "Titration · Solution preparation", use: "Chemists use mole calculations for solution preparation, titration, and quantitative analysis." },
];

const practiceQuestions = [
  "Find the number of moles in 9 g of water (H₂O).",
  "How many molecules are present in 0.5 mole of CO₂?",
  "Calculate the mass of 3 moles of NaCl. (M = 58.5 g mol⁻¹)",
  "How many moles are present in 3.011 × 10²³ atoms of sodium?",
  "If 6 mol of H₂ reacts completely with excess N₂, how many moles of NH₃ form?",
  "Calculate the number of moles in 4.4 g of CO₂.",
  "Which contains more particles — 1 mole of O₂ or 1 mole of Fe? Explain your reasoning.",
];

const careerMapRows = [
  {
    id: "ug",
    group: "green",
    title: "UG courses",
    badge: { text: "mostly estimated", tone: "amber" },
    items: "B.Sc Chemistry, B.Tech Chemical Engg, B.Pharm, B.Tech Metallurgy, B.Sc Biotech, B.Tech Food Tech",
  },
  {
    id: "pg",
    group: "green",
    title: "PG & research",
    badge: { text: "mostly estimated", tone: "amber" },
    items: "M.Sc/M.Tech → PhD → MS abroad → MBA pivot",
  },
  {
    id: "jobsIndia",
    group: "green",
    title: "Jobs — India",
    badge: { text: "mostly verified", tone: "olive" },
    items: "QC/Analytical Chemist, Process Chemist, Metallurgist, Environmental Chemist, Lecturer, CSIR/DRDO Scientist",
  },
  {
    id: "jobsAbroad",
    group: "green",
    title: "Jobs — abroad",
    badge: { text: "1 of 5 verified", tone: "amber" },
    items: "US · Germany · Canada · Australia · Gulf (UAE/Saudi)",
  },
  {
    id: "industries",
    group: "rust",
    title: "Industries",
    badge: null,
    items: "Fertilizer, Pharma dosage, Petrochemical, Food & beverage, Cement, Metal extraction",
  },
  {
    id: "skills",
    group: "rust",
    title: "Skills & resources",
    badge: null,
    items: "Stoichiometric calc, Titration/gravimetric, Python, Scientific communication + NPTEL, Coursera, internships",
  },
  {
    id: "exams",
    group: "rust",
    title: "Entrance exams",
    badge: null,
    items: "JEE · NEET · CUET · IIT JAM · CSIR-NET · GATE · BARC OCES · GRE",
  },
];

/* ---------- Formats a number in a×10^b scientific notation as JSX ---------- */
function formatSci(num) {
  if (num === 0) return "0";
  const exp = num.toExponential(3);
  const [mantissa, power] = exp.split("e");
  const p = parseInt(power, 10);
  if (p < 3) {
    return Number(num.toPrecision(4)).toString();
  }
  return (
    <>
      {mantissa} × 10<sup>{p}</sup>
    </>
  );
}

/* ---------- MoleChain: mass → moles → particles animation ---------- */
function MoleChain() {
  const [active, setActive] = useState(false);
  const mass = 18;
  const M = 18;
  const n = mass / M;
  const N = n * NA;

  return (
    <div className={`mc-chain${active ? " mc-active" : ""}`}>
      <div className="mc-chain-row">
        <div className="mc-chain-box mass">
          <div className="mc-box-label">Mass</div>
          <div className="mc-box-value">{mass} g H₂O</div>
        </div>

        <div className="mc-chain-arrow">
          <ArrowRight size={22} />
          <span className="mc-chain-formula">n = m ÷ M</span>
        </div>

        <div className="mc-chain-box moles">
          <div className="mc-box-label">Moles</div>
          <div className="mc-box-value">{n} mol</div>
        </div>

        <div className="mc-chain-arrow">
          <ArrowRight size={22} />
          <span className="mc-chain-formula">N = n × N<sub>A</sub></span>
        </div>

        <div className="mc-chain-box particles">
          <div className="mc-box-label">Particles</div>
          <div className="mc-box-value">{active ? formatSci(N) : "?"}</div>
        </div>
      </div>

      <div className="mc-chain-controls">
        <button className="mc-convert-btn" onClick={() => setActive((a) => !a)}>
          {active ? (
            <><RotateCcw size={22} style={{ marginRight: 6, verticalAlign: "-2px" }} />Reset</>
          ) : (
            <><Zap size={24} style={{ marginRight: 6, verticalAlign: "-2px" }} />Convert 18 g of water</>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- MoleCalculator: interactive mass ↔ moles ↔ particles ---------- */
function MoleCalculator() {
  const [subId, setSubId] = useState("h2o");
  const [mass, setMass] = useState(18);

  const substance = substances.find((s) => s.id === subId) || substances[0];
  const n = mass / substance.M;
  const N = n * NA;

  return (
    <div className="mc-calc">
      <div className="mc-calc-substances">
        {substances.map((s) => (
          <button
            key={s.id}
            className={`mc-calc-chip${subId === s.id ? " active" : ""}`}
            onClick={() => setSubId(s.id)}
          >
            {s.label} <span style={{ opacity: 0.6 }}>· {s.M} g/mol</span>
          </button>
        ))}
      </div>

      <div className="mc-calc-input-row">
        <span className="mc-calc-mass-label">Mass of {substance.name}:</span>
        <input
          type="range"
          min="0.5"
          max="200"
          step="0.5"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
        />
        <span className="mc-calc-mass-value">{mass} g</span>
      </div>

      <div className="mc-calc-results">
        <div className="mc-calc-result-card n">
          <div className="mc-calc-result-label">Number of moles</div>
          <div className="mc-calc-result-value">{Number(n.toPrecision(4))} mol</div>
          <div className="mc-calc-result-formula">n = {mass} ÷ {substance.M}</div>
        </div>
        <div className="mc-calc-result-card N">
          <div className="mc-calc-result-label">Number of particles</div>
          <div className="mc-calc-result-value">{formatSci(N)}</div>
          <div className="mc-calc-result-formula">N = n × N<sub>A</sub></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- MemoryMatch: flip tiles to pair each formula with its meaning ---------- */
function MemoryMatch() {
  const [tiles, setTiles] = useState(() => shuffleTiles());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(() => new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const allMatched = matched.size === memoryPairs.length;
  const isMismatch = flipped.length === 2 && tiles[flipped[0]].pairId !== tiles[flipped[1]].pairId;

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const isMatch = tiles[flipped[0]].pairId === tiles[flipped[1]].pairId;
    const t = setTimeout(() => {
      if (isMatch) {
        setMatched((prev) => new Set(prev).add(tiles[flipped[0]].pairId));
      }
      setFlipped([]);
      setLocked(false);
      setMoves((m) => m + 1);
    }, isMatch ? 500 : 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  const handleClick = (i) => {
    if (locked || flipped.length === 2) return;
    if (flipped.includes(i) || matched.has(tiles[i].pairId)) return;
    setFlipped((prev) => [...prev, i]);
  };

  const handleReshuffle = () => {
    setTiles(shuffleTiles());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  };

  return (
    <div className="mc-match">
      <div className="mc-match-meta">
        <span>Moves: {moves}</span>
        <span>Matched: {matched.size}/{memoryPairs.length}</span>
      </div>
      {!allMatched ? (
        <div className="mc-match-grid">
          {tiles.map((tile, i) => {
            const isFaceUp = flipped.includes(i) || matched.has(tile.pairId);
            const isMatchedTile = matched.has(tile.pairId);
            const isWrongTile = isMismatch && flipped.includes(i);
            let cls = "mc-match-tile";
            if (isMatchedTile) cls += " matched";
            else if (isWrongTile) cls += " wrong";
            else if (isFaceUp) cls += " face-up";
            return (
              <button key={tile.uid} className={cls} disabled={isFaceUp} onClick={() => handleClick(i)}>
                {isFaceUp ? (
                  <span className={`mc-match-tile-inner${tile.kind === "term" ? " mc-mono" : ""}`}>{tile.label}</span>
                ) : (
                  <span className="mc-match-placeholder">?</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mc-match-done">
          <div className="mc-match-done-big">🎉 All matched!</div>
          <p>You cleared the board in {moves} moves.</p>
          <button className="mc-convert-btn" onClick={handleReshuffle}>
            <RotateCcw size={15} style={{ marginRight: 6, verticalAlign: "-2px" }} />
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- MoleCareerMap: static hub-and-tree summary of the career roadmap ---------- */
function MoleCareerMap() {
  return (
    <div className="mc-cm-wrap">
      <div className="mc-cm-hub-row">
        <div className="mc-cm-hub">Mole concept careers</div>
      </div>
      <div className="mc-cm-connector">
        <div className="mc-cm-elbow-v" />
        <div className="mc-cm-elbow-h" />
      </div>
      <div className="mc-cm-tree">
        {careerMapRows.map((row) => (
          <div className="mc-cm-row" key={row.id}>
            <span className="mc-cm-tick" />
            <div className={`mc-cm-box mc-cm-box--${row.group}`}>
              <div className="mc-cm-row-head">
                <h3>{row.title}</h3>
                {row.badge && (
                  <span className={`mc-cm-badge mc-cm-badge--${row.badge.tone}`}>{row.badge.text}</span>
                )}
              </div>
              <p>{row.items}</p>
            </div>
          </div>
        ))}
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
    <div className="mc-quiz-box">
      <div className="mc-quiz-progress">
        {midQuizData.map((_, i) => (
          <div key={i} className={`mc-qdot${i < currentQ ? " mc-done" : i === currentQ ? " mc-current" : ""}`} />
        ))}
      </div>
      {!finished ? (
        <div>
          <div className="mc-quiz-q">Q{currentQ + 1}. {item.q}</div>
          <div className="mc-quiz-options">
            {item.options.map((opt, i) => {
              let cls = "mc-quiz-opt";
              if (answered && i === item.correct) cls += " mc-correct";
              else if (answered && i === selected) cls += " mc-wrong";
              return (
                <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && <div className="mc-quiz-feedback">{item.explain}</div>}
          {answered && (
            <button className="mc-quiz-next" onClick={handleNext}>
              Next <ChevronRight size={14} style={{ verticalAlign: "-2px" }} />
            </button>
          )}
        </div>
      ) : (
        <div className="mc-quiz-score">
          <div className="mc-big">{score}/{midQuizData.length}</div>
          <p style={{ margin: "10px 0 18px" }}>Nice work. Review any you missed above, or retry the deck.</p>
          <button className="mc-convert-btn" onClick={handleRetry}>
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
    <div className={darkMode ? "mc-root" : "mc-root light"}>
      {/* Topbar */}
      <div className="mc-topbar">
        <div className="mc-top-left">
          <button className="mc-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to lesson
          </button>
        </div>
        <div className="mc-page-pill">
          <span>⚗️</span>
          <span>Mole Concept — Quiz</span>
        </div>
        {!done && (
          <div className="mc-timer">
            ⏱ {mins}:{secs}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mc-progress-rail">
        <div className="mc-progress-fill" style={{ width: done ? "100%" : `${progressPct}%` }} />
      </div>

      <div className="mc-qp-wrap">
        {!done ? (
          <div className="mc-qp-card">
            <div className="mc-qp-meta">
              <span className="mc-qp-counter">Question {currentQ + 1} of {fullQuizData.length}</span>
              <span className="mc-qp-chapter">{item.chapter}</span>
            </div>
            <div className="mc-qp-dots">
              {fullQuizData.map((_, i) => (
                <div key={i} className={`mc-qp-dot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
              ))}
            </div>
            <div className="mc-qp-question">{item.q}</div>
            <div className="mc-qp-options">
              {item.options.map((opt, i) => {
                let cls = "mc-qp-opt";
                if (answered && i === item.correct) cls += " correct";
                else if (answered && i === selected) cls += " wrong";
                return (
                  <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                    <span className="mc-qp-opt-label">{labels[i]}</span>
                    <span className="mc-qp-opt-text">{opt}</span>
                    {answered && i === item.correct && <CheckCircle size={18} className="mc-qp-opt-icon correct" />}
                    {answered && i === selected && i !== item.correct && <XCircle size={18} className="mc-qp-opt-icon wrong" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`mc-qp-feedback ${selected === item.correct ? "correct" : "wrong"}`}>
                <strong>{selected === item.correct ? "Correct!" : "Not quite."}</strong>{" "}{item.explain}
              </div>
            )}
            {answered && (
              <div className="mc-qp-next-row">
                <button className="mc-qp-next-btn" onClick={handleNext}>
                  {currentQ + 1 >= fullQuizData.length ? "See results" : "Next question"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mc-qp-card">
            <div className="mc-qp-result-top">
              <div className={`mc-qp-trophy ${passed ? "pass" : "fail"}`}>
                {passed ? "🏆" : "📚"}
              </div>
              <div>
                <div className="mc-qp-result-pct">{pct}%</div>
                <div className="mc-qp-result-sub">{score} out of {fullQuizData.length} correct</div>
              </div>
            </div>
            <div className="mc-qp-result-divider" />
            <p className="mc-qp-result-msg">
              {passed
                ? "You passed the Mole Concept quiz — mass, moles and particles are clicking into place."
                : "Not quite — review the four formulas and the worked examples, then try again."}
            </p>
            <div className="mc-qp-breakdown">
              {fullQuizData.map((q, i) => (
                <div key={i} className="mc-qp-breakdown-row">
                  {userAnswers[i]?.correct
                    ? <CheckCircle size={18} className="mc-qp-opt-icon correct" />
                    : <XCircle size={18} className="mc-qp-opt-icon wrong" />}
                  <span>Q{i + 1}: {q.chapter}</span>
                </div>
              ))}
            </div>
            <div className="mc-qp-result-actions">
              <button className="mc-qp-next-btn" onClick={handleRetry}>
                <RotateCcw size={16} /> Retry quiz
              </button>
              <button className="mc-back-btn" onClick={onBack}>
                <ArrowLeft size={16} /> Back to lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */
export default function MoleConcept({ onBack, onViewBeyond, darkMode = true }) {
  const [activeNav, setActiveNav] = useState("mc-hero");
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

  /* Show full quiz page instead of lesson */
  if (showQuiz) return <QuizPage darkMode={darkMode} onBack={() => window.history.back()} />;

  return (
    <div className={darkMode ? "mc-root" : "mc-root light"}>
      {/* Topbar */}
      <div className="mc-topbar">
        <div className="mc-top-left">
          <button className="mc-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Class 11
          </button>
        </div>
        <div className="mc-page-pill">
          <span>⚗️</span>
          <span>Mole Concept</span>
        </div>
      </div>

      {/* Scroll progress */}
      <div className="mc-progress-rail">
        <div className="mc-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Side nav */}
      <nav className="mc-side-nav">
        {sideNavItems.map((item) => (
          <button key={item.id} data-label={item.label}
            className={activeNav === item.id ? "mc-active" : ""}
            onClick={() => jumpTo(item.id)} />
        ))}
      </nav>

      {/* Hero */}
      <header className="mc-hero" id="mc-hero">
        <div className="mc-hero-content">
          <div className="mc-hero-eyebrow">
            Class 11 Chemistry <span className="mc-crumb">›</span> Unit 1.2
          </div>
          <h1 className="mc-hero-title">
            <span className="amber">Mole</span> <span className="emerald">Concept</span>
          </h1>
          <p className="mc-hero-sub">
            Atoms and molecules are far too small to count one by one. The mole is
            the counting unit chemists invented instead — connecting mass, particles,
            and chemical equations with just a handful of formulas.
          </p>
          <div className="mc-mnemonic-row">
            <div className="mc-mnemonic-chip amber">1 mol <span className="full">= 6.022 × 10²³ particles</span></div>
            <div className="mc-mnemonic-chip emerald"><span>N<sub>A</sub></span> <span className="full">— the Avogadro constant</span></div>
          </div>
        </div>
      </header>

      <div className="mc-lesson-wrap">
        {/* 1. What is a mole */}
        <section className="mc-section" id="mc-sec-what">
          <div className="mc-section-tag"><span className="mc-section-num">1</span> Foundation</div>
          <h2>What is a mole?</h2>
          <p>Just as a <strong>dozen</strong> always means 12 objects, a <strong>mole</strong> always means a fixed number of particles — no matter what those particles are.</p>
          <div className="mc-console">
            <div className="mc-console-bar">
              <span className="mc-console-dot a" /><span className="mc-console-dot b" /><span className="mc-console-dot c" />
              <span className="mc-console-label">the comparison</span>
            </div>
            <div className="mc-console-body">
              1 dozen <span className="mc-arrow">=</span> 12 objects
              <br />
              1 mole <span className="mc-arrow">=</span> 6.022 × 10²³ particles
            </div>
          </div>
          <p><span className="mc-tag-mass">N<sub>A</sub> = 6.022 × 10²³ mol⁻¹</span> &nbsp;·&nbsp; <span className="mc-tag-part">(particles can be  atoms, molecules, ions , or electrons)</span></p>
        </section>

        {/* 2. Four formulas */}
        <section className="mc-section" id="mc-sec-formulas">
          <div className="mc-section-tag"><span className="mc-section-num">2</span> Must remember</div>
          <h2>The four formulas</h2>
          <p>Every mole-concept question is really just one of these four rearranged.</p>
          <div className="mc-rules-list">
            <div className="mc-rule-row"><div className="mc-rule-num">①</div><div className="mc-rule-body"><strong>Number of moles</strong><span className="mc-eg">n = m ÷ M &nbsp;(mass ÷ molar mass)</span></div></div>
            <div className="mc-rule-row"><div className="mc-rule-num">②</div><div className="mc-rule-body"><strong>Mass</strong><span className="mc-eg">m = n × M &nbsp;(moles × molar mass)</span></div></div>
            <div className="mc-rule-row"><div className="mc-rule-num">③</div><div className="mc-rule-body"><strong>Number of particles</strong><span className="mc-eg">N = n × N<sub>A</sub> &nbsp;(moles × Avogadro constant)</span></div></div>
            <div className="mc-rule-row"><div className="mc-rule-num">④</div><div className="mc-rule-body"><strong>Moles from particles</strong><span className="mc-eg">n = N ÷ N<sub>A</sub> &nbsp;(particles ÷ Avogadro constant)</span></div></div>
          </div>
        </section>

        {/* 3. See it happen */}
        <section className="mc-section" id="mc-sec-stage">
          <div className="mc-section-tag"><span className="mc-section-num">3</span> See it happen</div>
          <h2>Mass → Moles → Particles</h2>
          <p>This is the golden sequence behind every mole calculation. Tap the button to walk 18 g of water through it, step by step.</p>
          <MoleChain />
        </section>

        {/* 4. Calculator */}
        <section className="mc-section" id="mc-sec-calculator">
          <div className="mc-section-tag"><span className="mc-section-num">4</span> <Calculator size={16} style={{ verticalAlign: "-3px" }} /> Try it yourself</div>
          <h2>Interactive mole calculator</h2>
          <p>Pick a substance, drag the mass slider, and watch the moles and particle count update live.</p>
          <MoleCalculator />
        </section>

        {/* 5. Worked examples */}
        <section className="mc-section" id="mc-sec-worked">
          <div className="mc-section-tag"><span className="mc-section-num">5</span> Step by step</div>
          <h2>Worked examples</h2>
          <div className="mc-worked">
            <div className="mc-wq">Find the number of moles in 18 g of H₂O</div>
            <div className="mc-wstep">Molar mass of H₂O = 2(H) + 1(O) </div>
            <div className="mc-wstep">Molar mass of H₂O = 2(1) + 16 = 18 g mol⁻¹</div>
            <div className="mc-wstep">n = m ÷ M = 18 ÷ 18</div>
            <div className="mc-wans">n = 1 mol</div>
          </div>
          <div className="mc-worked">
            <div className="mc-wq">Find the mass of 2 moles of CO₂</div>
            <div className="mc-wstep">Molar mass of CO₂ = 1(C) + 2(O) </div>
            <div className="mc-wstep">Molar mass of CO₂ = 12 + 2(16) = 44 g mol⁻¹</div>
            <div className="mc-wstep">m = n × M = 2 × 44</div>
            <div className="mc-wans">m = 88 g</div>
          </div>
          <div className="mc-worked">
            <div className="mc-wq">22 g of CO₂ — find the moles, then the number of molecules</div>
            <div className="mc-wstep">n = m ÷ M = 22 ÷ 44 = 0.5 mol</div>
            <div className="mc-wstep">N = n × N<sub>A</sub> = 0.5 × 6.022 × 10²³</div>
            <div className="mc-wans">N = 3.011 × 10²³ molecules</div>
          </div>
        </section>

        {/* 6. Mole & equations */}
        <section className="mc-section" id="mc-sec-equations">
          <div className="mc-section-tag"><span className="mc-section-num">6</span> Reactions</div>
          <h2>Mole and chemical equations</h2>
          <p>The coefficients in a balanced equation are mole ratios — that's the entire basis of stoichiometry.</p>
          <div className="mc-console">
            <div className="mc-console-bar">
              <span className="mc-console-dot a" /><span className="mc-console-dot b" /><span className="mc-console-dot c" />
              <span className="mc-console-label">balanced equation</span>
            </div>
            <div className="mc-console-body">
              2H<sub>2</sub> <span className="mc-arrow">+</span> O<sub>2</sub> <span className="mc-arrow">→</span> 2H<sub>2</sub>O
            </div>
          </div>
          <p><span className="mc-tag-mass">2 mol H₂</span> + <span className="mc-tag-mass">1 mol O₂</span> → <span className="mc-tag-part">2 mol H₂O</span></p>
          <div className="mc-console" style={{ marginTop: 32 }}>
            <div className="mc-console-bar">
              <span className="mc-console-dot a" /><span className="mc-console-dot b" /><span className="mc-console-dot c" />
              <span className="mc-console-label">ammonia synthesis · haber process</span>
            </div>
            <div className="mc-console-body">
              N<sub>2</sub> <span className="mc-arrow">+</span> 3H<sub>2</sub> <span className="mc-arrow">→</span> 2NH<sub>3</sub>
            </div>
          </div>
          <p>Mole ratio <span className="mc-tag-part">N₂ : H₂ : NH₃ = 1 : 3 : 2</span> — this tells a fertilizer plant exactly how much nitrogen and hydrogen to feed in.</p>
        </section>

        {/* 7. Memory match */}
        <section className="mc-section" id="mc-sec-flash">
          <div className="mc-section-tag"><span className="mc-section-num">7</span> Quick recall</div>
          <h2>Formula match-up</h2>
          <p>Flip two tiles at a time and pair each formula with its meaning. Clear the board in as few moves as possible.</p>
          <MemoryMatch />
        </section>

        {/* 8. Inline Quiz */}
        <section className="mc-section" id="mc-sec-quiz">
          <div className="mc-section-tag"><span className="mc-section-num">8</span> Check yourself</div>
          <h2>Quick quiz</h2>
          <p>Five questions on the core formulas. No pressure — you can retry.</p>
          <Quiz />
        </section>

        {/* 9. Industry */}
        <section className="mc-section" id="mc-sec-industry">
          <div className="mc-section-tag"><span className="mc-section-num">9</span> Why it matters</div>
          <h2>The mole concept in industry</h2>
          <p>Raw materials → chemical reaction → product — every industrial process runs on mole calculations to get this right.</p>
          <div className="mc-industry-scroll">
            {industryCards.map((card) => (
              <div className="mc-industry-card" key={card.num}>
                <div className="mc-ic-num">{card.num}</div>
                <h4>{card.title}</h4>
                <div className="mc-ic-eq">{card.eq}</div>
                <div className="mc-ic-use">{card.use}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Practice */}
        <section className="mc-section" id="mc-sec-practice">
          <div className="mc-section-tag"><span className="mc-section-num">10</span> Your turn</div>
          <h2>Practice on your own</h2>
          <p>Work these out before checking the next subtopic. Grab a notebook.</p>
          <div className="mc-practice-list">
            {practiceQuestions.map((q, i) => (
              <div className="mc-practice-item" key={i}>
                <span className="mc-pnum">{i + 1}</span> {q}
              </div>
            ))}
          </div>
        </section>

        {/* 11. Future plan mindmap */}
        <section className="mc-section" id="mc-sec-mindmap">
          <div className="mc-section-tag"><span className="mc-section-num">11</span> Looking ahead</div>
          <h2>Your future plan</h2>
          <p>A quick-glance map of where mastering the mole concept leads — courses, exams, jobs in India and abroad, and the industries and skills behind them. Head to the full career roadmap below for verified figures and details.</p>
          <MoleCareerMap />
        </section>

        {onViewBeyond && (
          <div className="mc-read-more-row">
            <button className="mc-read-more-btn" onClick={onViewBeyond}>
              See the full career roadmap <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Quiz CTA — bottom of page */}
        <div className="mc-cta-card">
          <div className="mc-cta-left">
            <div className="mc-cta-icon">🧠</div>
            <div>
              <h2 className="mc-cta-title">It's quiz time</h2>
              <p className="mc-cta-desc">
                Lock in what you've learned. Take this quiz to review the mole concept and mark this learning unit as complete.
              </p>
              <div className="mc-cta-meta">
                <span className="mc-cta-meta-item">✅ Get 60% or more to pass</span>
                <span className="mc-cta-meta-item">🕐 ~5 minutes</span>
              </div>
              <button className="mc-cta-btn" onClick={startQuiz}>
                Start Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="mc-cta-right">
            <div className="mc-cta-trophy">🏆</div>
          </div>
        </div>
      </div>
    </div>
  );
}
