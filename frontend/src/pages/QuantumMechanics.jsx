import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Play,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import "../styles/QuantumMechanics.css";

/* ---------- helpers ---------- */

const IMG = "/images/quantum/";
const LETTERS = ["s", "p", "d", "f", "g"];
const SUP_MAP = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sup = (n) => String(n).split("").map((c) => SUP_MAP[c] ?? c).join("");
const fmtE = (v) => (v < 0 ? "−" : "") + Math.abs(v).toFixed(2);
const signed = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : "0");

/* ---------- static data ---------- */

const sideNavItems = [
  { id: "qm-hero", label: "Intro" },
  { id: "qm-sec-obj", label: "Objectives" },
  { id: "qm-sec-models", label: "Atomic models" },
  { id: "qm-sec-shell", label: "Shell · subshell · orbital" },
  { id: "qm-sec-qn", label: "Quantum numbers" },
  { id: "qm-sec-count", label: "Counting orbitals" },
  { id: "qm-sec-shapes", label: "Orbital shapes" },
  { id: "qm-sec-nodes", label: "Nodes" },
  { id: "qm-sec-config", label: "Electron configuration" },
  { id: "qm-sec-energy", label: "Orbital energy" },
  { id: "qm-sec-radius", label: "Orbital radius" },
  { id: "qm-sec-fast", label: "Fast calculations" },
  { id: "qm-sec-quiz", label: "Quiz" },
  { id: "qm-sec-daily", label: "Daily-life uses" },
  { id: "qm-sec-industry", label: "Industrial uses" },
  { id: "qm-sec-higher", label: "Higher education" },
  { id: "qm-sec-jobs", label: "Careers" },
  { id: "qm-sec-global", label: "Global needs" },
  { id: "qm-sec-practice", label: "Practice" },
  { id: "qm-sec-memory", label: "Memory sheet" },
];

const objectives = [
  "Understand shells, subshells, orbitals and the quantum-mechanical model.",
  "Use the four quantum numbers and their allowed values.",
  "Calculate orbitals and maximum electrons in shells and subshells.",
  "Calculate radial, angular and total nodes.",
  "Understand s, p, d and f orbital shapes and orientations.",
  "Write electronic configurations using Aufbau, Pauli and Hund rules.",
  "Use simple hydrogen-like formulas for orbital energy and radius.",
  "Connect the topic with daily life, higher education, industry and careers.",
];

const models = [
  { nm: "Dalton", yr: "1803", tx: "Atom as an indivisible particle." },
  { nm: "Thomson", yr: "1904", tx: "A positive sphere containing electrons." },
  { nm: "Rutherford", yr: "1911", tx: "A tiny, dense nucleus." },
  { nm: "Bohr", yr: "1913", tx: "Quantized energy levels for hydrogen." },
  { nm: "Quantum model", yr: "1926", tx: "Electrons are described by wavefunctions and probability distributions." },
];

const shapeInfo = {
  s: { orbs: 1, e: 2, shape: "Spherical", text: "The same in every direction — a sphere that grows larger as n increases." },
  p: { orbs: 3, e: 6, shape: "Dumbbell", text: "Dumbbell-shaped with three orientations along the x, y and z axes." },
  d: { orbs: 5, e: 10, shape: "Mostly four-lobed", text: "Five orbitals, mostly four-lobed shapes in different orientations." },
  f: { orbs: 7, e: 14, shape: "Complex", text: "Seven orbitals with even more complex, many-lobed shapes." },
};

const nodeExamples = [
  [1, 0], [2, 0], [2, 1], [3, 1], [3, 2],
];

const FILL = [
  { id: "1s", orb: 1 }, { id: "2s", orb: 1 }, { id: "2p", orb: 3 }, { id: "3s", orb: 1 },
  { id: "3p", orb: 3 }, { id: "4s", orb: 1 }, { id: "3d", orb: 5 }, { id: "4p", orb: 3 },
];
const EXCEPTIONS = { 24: { "4s": 1, "3d": 5 }, 29: { "4s": 1, "3d": 10 } };
const SYMBOLS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"];
const NAMES = ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminium", "Silicon", "Phosphorus", "Sulphur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton"];
const PRESETS = [7, 8, 11, 17, 19, 20, 26];

const orderList = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"];

const configExamples = [
  ["Oxygen", 8, "1s² 2s² 2p⁴"],
  ["Sodium", 11, "1s² 2s² 2p⁶ 3s¹"],
  ["Chlorine", 17, "1s² 2s² 2p⁶ 3s² 3p⁵"],
  ["Calcium", 20, "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²"],
  ["Iron", 26, "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶"],
];

const fastCalcs = [
  ["Orbitals in 4d", "l = 2 → 2l + 1 = 5"],
  ["Maximum electrons in 4d", "5 × 2 = 10"],
  ["Orbitals in n = 3 shell", "3² = 9"],
  ["Maximum electrons in n = 3", "2 × 3² = 18"],
  ["Radial nodes in 4p", "4 − 1 − 1 = 2"],
  ["Angular nodes in 4p", "l = 1"],
  ["Total nodes in 4p", "4 − 1 = 3"],
  ["Radial nodes in 3d", "3 − 2 − 1 = 0"],
  ["Angular nodes in 3d", "l = 2"],
];

const dailyUses = [
  { icon: "💡", t: "LEDs and displays", d: "Electronic energy levels and semiconductor band structures control light emission and absorption." },
  { icon: "🔴", t: "Lasers", d: "Controlled transitions between quantized energy states produce coherent light." },
  { icon: "🔆", t: "Lamps", d: "Atoms and ions emit characteristic wavelengths when electrons change energy levels." },
  { icon: "☀️", t: "Solar cells", d: "Electronic energy gaps determine how light can generate electrical energy." },
  { icon: "📱", t: "Phones and computers", d: "Semiconductor devices depend on quantum behaviour of electrons." },
  { icon: "🔬", t: "Spectroscopy", d: "Characteristic energy transitions help identify and analyse substances." },
];

const industryCards = [
  { num: "01", t: "Semiconductors", d: "Transistors, integrated circuits, LEDs, sensors and photovoltaic devices." },
  { num: "02", t: "Telecommunications", d: "Lasers, optical fibres and photonic devices." },
  { num: "03", t: "Healthcare", d: "Spectroscopy, imaging and scientific instrumentation." },
  { num: "04", t: "Advanced materials", d: "Nanomaterials, catalysts, coatings and electronic materials." },
  { num: "05", t: "Energy", d: "Solar-cell materials, batteries and energy-related materials research." },
  { num: "06", t: "Analytical laboratories", d: "Atomic absorption, emission and related spectroscopic methods." },
];

const higherEd = [
  { c: "c1", t: "B.Sc Chemistry", d: "Quantum chemistry, spectroscopy, bonding and analytical chemistry." },
  { c: "c2", t: "Physics", d: "Quantum mechanics, atomic physics, nuclear physics and spectroscopy." },
  { c: "c3", t: "Engineering", d: "Semiconductors, electronics, nanotechnology and materials science." },
  { c: "c1", t: "Pharmacy / Biochemistry", d: "Spectroscopy and molecular-structure analysis." },
  { c: "c2", t: "Medicine / Life sciences", d: "Imaging, spectroscopy and molecular diagnostics." },
  { c: "c3", t: "Research", d: "Quantum materials, nanomaterials, photonics and computational chemistry." },
];

const jobs = [
  { f: "Chemistry", w: "Analytical chemist, laboratory scientist, spectroscopy technician, QC/QA." },
  { f: "Physics", w: "Research assistant, physicist, spectroscopy/instrumentation roles." },
  { f: "Electronics", w: "Semiconductor process, device, testing and materials roles." },
  { f: "Materials / Nanotechnology", w: "Materials characterization and nanomaterials research." },
  { f: "Pharma / Biotech", w: "Analytical testing, spectroscopy and quality control." },
  { f: "Energy / Photonics", w: "Solar-cell materials, optical devices and laser technology." },
  { f: "Education", w: "Teacher, lecturer, laboratory and curriculum roles." },
];

const globalNeeds = [
  { i: "💻", t: "Modern computing and electronics require understanding quantum behaviour in materials." },
  { i: "🔋", t: "Clean-energy technologies depend on electronic structure and energy gaps." },
  { i: "🩺", t: "Healthcare increasingly uses spectroscopy, imaging and advanced instrumentation." },
  { i: "🧬", t: "Nanotechnology and advanced materials require control and measurement at atomic scales." },
  { i: "📡", t: "Photonics, lasers and optical communication rely on quantized transitions." },
  { i: "🔭", t: "Future research combines chemistry, physics, materials science and computation." },
];

const practice = [
  { q: "How many orbitals are present in the 5d subshell?", a: "5 orbitals." },
  { q: "What is the maximum number of electrons in the 4f subshell?", a: "14 electrons." },
  { q: "How many orbitals are present in the n = 5 shell?", a: "25 orbitals." },
  { q: "Calculate the maximum number of electrons in the n = 5 shell.", a: "50 electrons." },
  { q: "Find radial, angular and total nodes in 3p.", a: "3p: radial = 1, angular = 1, total = 2." },
  { q: "Find radial, angular and total nodes in 4d.", a: "4d: radial = 1, angular = 2, total = 3." },
  { q: "Write the electronic configuration of nitrogen (Z = 7).", a: "N: 1s² 2s² 2p³." },
  { q: "Write the electronic configuration of potassium (Z = 19).", a: "K: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹." },
  { q: "Calculate the energy of hydrogen at n = 3.", a: "H at n = 3: E = −13.6/9 = −1.51 eV (approx.)." },
  { q: "Calculate the radius of hydrogen at n = 3 using a₀ = 0.529 Å.", a: "H at n = 3: r = 0.529 × 9 = 4.761 Å." },
];

const chain = ["Atom", "Quantum numbers", "Shells / subshells", "Orbitals", "Nodes", "Electronic configuration", "Energy levels", "Spectroscopy · Materials · Technology"];

const midQuizData = [
  { q: "How many orbitals are present in the 3d subshell?", options: ["1", "3", "5", "7"], correct: 2, explain: "3d has l = 2, so orbitals = 2l + 1 = 2(2) + 1 = 5." },
  { q: "What is the maximum number of electrons in the n = 4 shell?", options: ["16", "18", "32", "50"], correct: 2, explain: "Maximum electrons in a shell = 2n² = 2(4²) = 32." },
  { q: "How many radial nodes does a 3p orbital have?", options: ["0", "1", "2", "3"], correct: 1, explain: "Radial nodes = n − l − 1 = 3 − 1 − 1 = 1." },
  { q: "Which rule says equal-energy orbitals are singly occupied with parallel spins before pairing?", options: ["Aufbau principle", "Pauli exclusion principle", "Hund's rule", "Bohr's rule"], correct: 2, explain: "Hund's rule: equal-energy orbitals fill singly with parallel spins before any pairing begins." },
  { q: "What is the energy of the hydrogen electron at n = 2?", options: ["−13.6 eV", "−6.80 eV", "−3.40 eV", "−1.51 eV"], correct: 2, explain: "E = −13.6 × 1² ÷ 2² = −3.40 eV." },
];

const fullQuizData = [
  { q: "Which statement correctly describes an orbital?", options: ["A definite circular path followed by an electron", "A region of high probability of finding an electron", "The nucleus of an atom", "A fixed energy level for all electrons"], correct: 1, explain: "An orbit is a definite path in the old Bohr model; an orbital is a region of high probability of finding an electron.", chapter: "Orbit vs orbital" },
  { q: "What are the allowed values of l when n = 3?", options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "−2 to +2"], correct: 1, explain: "l runs from 0 to n − 1, so for n = 3 it can be 0, 1 or 2 — the 3s, 3p and 3d subshells.", chapter: "Quantum numbers" },
  { q: "How many total nodes does a 4p orbital have?", options: ["1", "2", "3", "4"], correct: 2, explain: "Total nodes = n − 1 = 4 − 1 = 3 (2 radial + 1 angular).", chapter: "Nodes" },
  { q: "What is the electronic configuration of sodium (Z = 11)?", options: ["1s² 2s² 2p⁶ 3s¹", "1s² 2s² 2p⁵ 3s²", "1s² 2s² 2p⁶ 3p¹", "1s² 2s² 2p⁷"], correct: 0, explain: "By Aufbau: 1s² 2s² 2p⁶ uses 10 electrons; the 11th goes into 3s¹.", chapter: "Electronic configuration" },
  { q: "Using a₀ = 0.529 Å, what is the radius of the hydrogen orbit at n = 3?", options: ["1.058 Å", "2.116 Å", "4.761 Å", "0.529 Å"], correct: 2, explain: "r = a₀n²/Z = 0.529 × 9 / 1 = 4.761 Å.", chapter: "Hydrogen-like formulas" },
];

/* ---------- reusable pieces ---------- */

function Figure({ src, alt, caption, onZoom, narrow }) {
  return (
    <figure className={`qm-figure${narrow ? " narrow" : ""}`}>
      <div
        className="qm-figure-frame"
        role="button"
        tabIndex={0}
        onClick={() => onZoom(IMG + src)}
        onKeyDown={(e) => { if (e.key === "Enter") onZoom(IMG + src); }}
      >
        <img src={IMG + src} alt={alt} loading="lazy" decoding="async" />
        <span className="qm-figure-hint">🔍 Click to enlarge</span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function VideoBlock({ title, desc, file }) {
  return (
    <div className="qm-video-block">
      <div className="qm-video-tag">🎬 CONCEPT VIDEO</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="qm-video-wrap">
        <video className="qm-video" controls playsInline preload="metadata">
          <source src={encodeURI(`/Videos/${file}`)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

function SectionHead({ num, tag, title }) {
  return (
    <>
      <div className="qm-section-tag"><span className="qm-section-num">{num}</span> {tag}</div>
      <h2>{title}</h2>
    </>
  );
}

/* ---------- hero atom ---------- */

function HeroAtom() {
  return (
    <div className="qm-hero-visual" aria-hidden="true">
      <div className="qm-atom-glow" />
      {[[0, 6], [60, 8.5], [120, 11]].map(([rz, dur], i) => (
        <div className="qm-orbit" key={i} style={{ "--rz": `${rz}deg` }}>
          <div className="qm-orbit-spin" style={{ "--dur": `${dur}s`, animationDirection: i === 1 ? "reverse" : "normal" }}>
            <span className="qm-electron" />
          </div>
        </div>
      ))}
      <div className="qm-nucleus" />
    </div>
  );
}

/* ---------- orbit vs orbital ---------- */

function OrbitVsOrbital() {
  const [dots] = useState(() =>
    Array.from({ length: 48 }, () => {
      const r = Math.min(104, Math.sqrt(-2 * Math.log(1 - Math.random())) * 34);
      const a = Math.random() * Math.PI * 2;
      return { x: 120 + r * Math.cos(a), y: 120 + r * Math.sin(a), d: 1.6 + Math.random() * 2.6, dl: Math.random() * 3 };
    })
  );
  return (
    <div className="qm-ovo">
      <div className="qm-ovo-card a">
        <div className="qm-ovo-title">Orbit</div>
        <div className="qm-ovo-sub">Old Bohr model — a definite path</div>
        <div className="qm-ovo-stage">
          <div className="qm-bohr-ring" />
          <div className="qm-bohr-spin"><span className="qm-bohr-e" /></div>
          <div className="qm-ovo-nuc" />
        </div>
      </div>
      <div className="qm-ovo-card b">
        <div className="qm-ovo-title">Orbital</div>
        <div className="qm-ovo-sub">Quantum model — a region of high probability</div>
        <div className="qm-ovo-stage">
          <div className="qm-cloud" />
          {dots.map((p, i) => (
            <span key={i} className="qm-cloud-dot" style={{ left: p.x - 2.5, top: p.y - 2.5, "--d": `${p.d}s`, "--dl": `${p.dl}s` }} />
          ))}
          <div className="qm-ovo-nuc" />
        </div>
      </div>
    </div>
  );
}

function ModelTimeline() {
  const [active, setActive] = useState(0);
  const m = models[active];
  const last = active === models.length - 1;
  return (
    <>
      <div className="qm-models">
        {models.map((x, i) => (
          <button
            key={x.nm}
            className={`qm-model-chip${active === i ? " active" : ""}${i === models.length - 1 ? " last" : ""}`}
            onClick={() => setActive(i)}
          >
            <div className="yr">{x.yr}</div>
            <div className="nm">{x.nm}</div>
          </button>
        ))}
      </div>
      <div key={active} className={`qm-model-detail${last ? " last" : ""}`}>
        <b>{m.nm}:</b> {m.tx}
      </div>
    </>
  );
}

/* ---------- quantum number explorer ---------- */

function QuantumExplorer() {
  const [n, setN] = useState(3);
  const [lRaw, setL] = useState(1);
  const [mlRaw, setMl] = useState(0);
  const [ms, setMs] = useState(1);

  const l = Math.min(lRaw, n - 1);
  const ml = Math.max(-l, Math.min(l, mlRaw));
  const orbs = 2 * l + 1;
  const mlVals = Array.from({ length: orbs }, (_, i) => i - l);
  const sub = `${n}${LETTERS[l]}`;
  const msLabel = ms > 0 ? "+½" : "−½";

  return (
    <div className="qm-panel">
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Principal n</span>
        <div className="qm-ctl-chips">
          {[1, 2, 3, 4, 5].map((v) => (
            <button key={v} className={`qm-chipbtn${n === v ? " active" : ""}`} onClick={() => setN(v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Azimuthal l</span>
        <div className="qm-ctl-chips">
          {[0, 1, 2, 3, 4].map((v) => (
            <button key={v} className={`qm-chipbtn${l === v ? " active" : ""}`} disabled={v > n - 1} onClick={() => setL(v)}>
              {v} ({LETTERS[v]})
            </button>
          ))}
        </div>
      </div>
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Magnetic m<sub>l</sub></span>
        <div className="qm-ctl-chips">
          {mlVals.map((v) => (
            <button key={v} className={`qm-chipbtn${ml === v ? " active" : ""}`} onClick={() => setMl(v)}>{signed(v)}</button>
          ))}
        </div>
      </div>
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Spin m<sub>s</sub></span>
        <div className="qm-ctl-chips">
          <button className={`qm-chipbtn${ms > 0 ? " active" : ""}`} onClick={() => setMs(1)}>+½ ↑</button>
          <button className={`qm-chipbtn${ms < 0 ? " active" : ""}`} onClick={() => setMs(-1)}>−½ ↓</button>
        </div>
      </div>

      <div className="qm-address">
        <div className="qm-address-item n"><span className="t">City</span> n = {n}</div>
        <div className="qm-address-item l"><span className="t">Street</span> l = {l}</div>
        <div className="qm-address-item m"><span className="t">House</span> m<sub>l</sub> = {signed(ml)}</div>
        <div className="qm-address-item s"><span className="t">Direction</span> m<sub>s</sub> = {msLabel}</div>
      </div>

      <div className="qm-orb-row">
        {mlVals.map((v) => (
          <div className="qm-orb-col" key={v}>
            <div className="ml">m<sub>l</sub> = {signed(v)}</div>
            <div className={`qm-orb-box${v === ml ? " sel" : ""}`}>
              <span className="arr" key={`${v === ml}-${ms}`}>{v === ml ? (ms > 0 ? "↑" : "↓") : ""}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="qm-stat-grid" style={{ marginTop: 22 }}>
        <div className="qm-stat o"><div className="k">Subshell</div><div className="v"><span key={sub} className="qm-pop">{sub}</span></div></div>
        <div className="qm-stat c"><div className="k">Orbitals in subshell</div><div className="v"><span key={orbs} className="qm-pop">{orbs}</span></div><div className="s">2l + 1 = {orbs}</div></div>
        <div className="qm-stat p"><div className="k">Max e⁻ in subshell</div><div className="v"><span key={orbs * 2} className="qm-pop">{orbs * 2}</span></div><div className="s">2(2l + 1) = {orbs * 2}</div></div>
        <div className="qm-stat c"><div className="k">Orbitals in shell</div><div className="v"><span key={n * n} className="qm-pop">{n * n}</span></div><div className="s">n² = {n * n}</div></div>
        <div className="qm-stat g"><div className="k">Max e⁻ in shell</div><div className="v"><span key={2 * n * n} className="qm-pop">{2 * n * n}</span></div><div className="s">2n² = {2 * n * n}</div></div>
      </div>
    </div>
  );
}

/* ---------- orbital shapes ---------- */

function Lobe({ a, off = 58, rx = 56, ry = 34, c }) {
  return (
    <ellipse
      cx={150 + off}
      cy={150}
      rx={rx}
      ry={ry}
      fill={c === "r" ? "url(#qmRed)" : "url(#qmBlue)"}
      opacity="0.93"
      transform={`rotate(${a} 150 150)`}
    />
  );
}

function OrbitalShapes() {
  const [kind, setKind] = useState("p");
  const [pOr, setPOr] = useState("px");
  const [dOr, setDOr] = useState("dxy");
  const info = shapeInfo[kind];
  const pRot = { px: 0, py: -38, pz: 90 }[pOr];

  let body;
  if (kind === "s") {
    body = (
      <g style={{ transformOrigin: "150px 150px", animation: "qmPulse 3.5s ease-in-out infinite" }}>
        <circle cx="150" cy="150" r="80" fill="url(#qmBlue)" opacity="0.95" />
        <circle cx="128" cy="124" r="20" fill="#fff" opacity="0.18" />
      </g>
    );
  } else if (kind === "p") {
    body = (
      <g className="qm-lobe-rot" style={{ transform: `rotate(${pRot}deg)` }}>
        <Lobe a={0} c="r" />
        <Lobe a={180} c="b" />
      </g>
    );
  } else if (kind === "d") {
    if (dOr === "dz2") {
      body = (
        <g>
          <ellipse cx="150" cy="150" rx="54" ry="16" fill="url(#qmBlue)" opacity="0.9" />
          <Lobe a={90} off={62} rx={58} ry={28} c="r" />
          <Lobe a={270} off={62} rx={58} ry={28} c="r" />
        </g>
      );
    } else {
      body = (
        <g className="qm-lobe-rot" style={{ transform: `rotate(${dOr === "dxy" ? 0 : 45}deg)` }}>
          <Lobe a={45} off={62} rx={50} ry={24} c="r" />
          <Lobe a={135} off={62} rx={50} ry={24} c="b" />
          <Lobe a={225} off={62} rx={50} ry={24} c="r" />
          <Lobe a={315} off={62} rx={50} ry={24} c="b" />
        </g>
      );
    }
  } else {
    body = (
      <g>
        {Array.from({ length: 8 }, (_, k) => (
          <Lobe key={k} a={k * 45} off={60} rx={46} ry={17} c={k % 2 === 0 ? "r" : "b"} />
        ))}
      </g>
    );
  }

  return (
    <div className="qm-panel">
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Subshell</span>
        <div className="qm-ctl-chips">
          {["s", "p", "d", "f"].map((k) => (
            <button key={k} className={`qm-chipbtn o${kind === k ? " active" : ""}`} onClick={() => setKind(k)}>{k}</button>
          ))}
        </div>
      </div>
      <div className="qm-shapes">
        <div className="qm-shape-stage">
          <svg viewBox="0 0 300 300" role="img" aria-label={`${kind} orbital shape`}>
            <defs>
              <radialGradient id="qmRed" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#fca5a5" /><stop offset="55%" stopColor="#ef4444" /><stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
              <radialGradient id="qmBlue" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#93c5fd" /><stop offset="55%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            <g stroke="rgba(148,163,184,.4)" strokeWidth="1.5">
              <line x1="150" y1="14" x2="150" y2="286" />
              <line x1="14" y1="150" x2="286" y2="150" />
              <line x1="50" y1="250" x2="250" y2="50" strokeDasharray="4 5" />
            </g>
            <g fill="#94a3b8" fontSize="13" fontFamily="JetBrains Mono, monospace">
              <text x="156" y="22">z</text><text x="270" y="144">y</text><text x="40" y="262">x</text>
            </g>
            <g className="qm-shape-g">{body}</g>
            <circle cx="150" cy="150" r="4" fill="#fde68a" />
          </svg>
        </div>
        <div className="qm-shape-info">
          <h3>{kind} orbital — {info.shape.toLowerCase()}</h3>
          <p>{info.text}</p>
          {kind === "p" && (
            <div className="qm-ctl-chips" style={{ marginBottom: 14 }}>
              {[["px", <>p<sub>x</sub></>], ["py", <>p<sub>y</sub></>], ["pz", <>p<sub>z</sub></>]].map(([id, lb]) => (
                <button key={id} className={`qm-chipbtn${pOr === id ? " active" : ""}`} onClick={() => setPOr(id)}>{lb}</button>
              ))}
            </div>
          )}
          {kind === "d" && (
            <div className="qm-ctl-chips" style={{ marginBottom: 14 }}>
              {[["dxy", <>d<sub>xy</sub></>], ["dx2", <>d<sub>x²−y²</sub></>], ["dz2", <>d<sub>z²</sub></>]].map(([id, lb]) => (
                <button key={id} className={`qm-chipbtn${dOr === id ? " active" : ""}`} onClick={() => setDOr(id)}>{lb}</button>
              ))}
            </div>
          )}
          <div className="qm-stat-grid">
            <div className="qm-stat c"><div className="k">Orbitals</div><div className="v"><span key={info.orbs} className="qm-pop">{info.orbs}</span></div></div>
            <div className="qm-stat g"><div className="k">Max electrons</div><div className="v"><span key={info.e} className="qm-pop">{info.e}</span></div></div>
          </div>
          <div className="qm-phase">
            <span><i style={{ background: "#ef4444" }} />positive phase</span>
            <span><i style={{ background: "#3b82f6" }} />negative phase</span>
          </div>
          {kind === "d" && <p style={{ fontSize: 17, marginTop: 12, color: "var(--dim)" }}>Showing 3 of the 5 d orientations.</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- nodes ---------- */

function NodeExplorer() {
  const [n, setN] = useState(3);
  const [lRaw, setL] = useState(1);
  const l = Math.min(lRaw, n - 1);
  const radial = n - l - 1;
  const angular = l;
  const total = n - 1;
  const set = (nn, ll) => { setN(nn); setL(ll); };

  const rings = Array.from({ length: radial }, (_, k) => ((k + 1) / (radial + 1)) * 118);
  const lines = Array.from({ length: angular }, (_, k) => {
    const deg = (180 / angular) * k + (angular === 2 ? 45 : 0);
    const rad = (deg * Math.PI) / 180;
    return { x: Math.cos(rad) * 130, y: Math.sin(rad) * 130 };
  });

  return (
    <div className="qm-panel">
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Principal n</span>
        <div className="qm-ctl-chips">
          {[1, 2, 3, 4, 5].map((v) => (
            <button key={v} className={`qm-chipbtn${n === v ? " active" : ""}`} onClick={() => setN(v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="qm-ctl-row">
        <span className="qm-ctl-label">Azimuthal l</span>
        <div className="qm-ctl-chips">
          {[0, 1, 2, 3, 4].map((v) => (
            <button key={v} className={`qm-chipbtn${l === v ? " active" : ""}`} disabled={v > n - 1} onClick={() => setL(v)}>
              {v} ({LETTERS[v]})
            </button>
          ))}
        </div>
      </div>
      <div className="qm-nodes">
        <div className="qm-node-stage">
          <svg viewBox="0 0 300 300" role="img" aria-label={`Nodes of ${n}${LETTERS[l]}`}>
            <defs>
              <radialGradient id="qmCloud" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#2563eb" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.15" />
              </radialGradient>
            </defs>
            <circle cx="150" cy="150" r="136" fill="url(#qmCloud)" />
            {rings.map((r, i) => <circle key={`${n}-${l}-r${i}`} className="qm-radial-ring" cx="150" cy="150" r={r} />)}
            {lines.map((p, i) => (
              <line key={`${n}-${l}-a${i}`} className="qm-angular-line" x1={150 - p.x} y1={150 - p.y} x2={150 + p.x} y2={150 + p.y} />
            ))}
            <circle cx="150" cy="150" r="7" fill="#fde68a" />
          </svg>
        </div>
        <div>
          <h3 style={{ margin: "0 0 12px", fontSize: 40, fontFamily: "'JetBrains Mono', monospace", color: "var(--or)" }}>{n}{LETTERS[l]} orbital</h3>
          <div className="qm-stat-grid">
            <div className="qm-stat g"><div className="k">Angular nodes</div><div className="v"><span key={angular} className="qm-pop">{angular}</span></div><div className="s">= l</div></div>
            <div className="qm-stat o"><div className="k">Radial nodes</div><div className="v"><span key={radial} className="qm-pop">{radial}</span></div><div className="s">n − l − 1 = {n} − {l} − 1</div></div>
            <div className="qm-stat c"><div className="k">Total nodes</div><div className="v"><span key={total} className="qm-pop">{total}</span></div><div className="s">n − 1 = {n} − 1</div></div>
          </div>
          <p style={{ fontSize: 19, color: "var(--mut)", margin: "14px 0 0" }}>
            <span style={{ color: "var(--or)" }}>Dashed rings</span> = radial nodes · <span style={{ color: "var(--gr)" }}>green lines</span> = angular nodes
          </p>
          <div className="qm-node-examples">
            {nodeExamples.map(([nn, ll]) => (
              <button key={`${nn}${ll}`} className={`qm-chipbtn${n === nn && l === ll ? " active" : ""}`} onClick={() => set(nn, ll)}>{nn}{LETTERS[ll]}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- electron configuration builder ---------- */

function occupancy(z) {
  const occ = {};
  let rem = z;
  FILL.forEach((s) => {
    const t = Math.min(rem, s.orb * 2);
    occ[s.id] = t;
    rem -= t;
  });
  if (EXCEPTIONS[z]) Object.assign(occ, EXCEPTIONS[z]);
  return occ;
}

function electronSequence(z) {
  const occ = occupancy(z);
  const seq = [];
  FILL.forEach((s) => {
    for (let i = 0; i < occ[s.id]; i++) {
      seq.push(i < s.orb
        ? { sub: s.id, box: i, spin: "up", idx: i, orb: s.orb }
        : { sub: s.id, box: i - s.orb, spin: "down", idx: i, orb: s.orb });
    }
  });
  return seq;
}

function explainElectron(e, count) {
  if (!e) return null;
  const aufbau = e.idx === 0 ? `Aufbau principle — ${e.sub} is the next lowest-energy subshell. ` : "";
  let rule;
  if (e.spin === "down") rule = "Pauli exclusion principle — pairs with the ↑ electron using the opposite spin ↓.";
  else if (e.orb > 1) rule = "Hund's rule — goes singly into an empty orbital with parallel spin ↑ before any pairing.";
  else rule = "one orbital, spin ↑.";
  return { text: `Electron ${count} → ${e.sub}. ${aufbau}${rule}`, kind: e.spin === "down" ? "c" : "o" };
}

function ConfigBuilder() {
  const [z, setZ] = useState(8);
  const [step, setStep] = useState(8);
  const [playing, setPlaying] = useState(false);

  const seq = electronSequence(z);
  const occ = occupancy(z);

  const isPlaying = playing && step < z;

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setStep((s) => Math.min(s + 1, z)), 420);
    return () => clearInterval(id);
  }, [isPlaying, z]);

  const pick = (nz) => { setZ(nz); setStep(nz); setPlaying(false); };
  const play = () => { setStep(0); setPlaying(true); };
  const showAll = () => { setStep(z); setPlaying(false); };

  const shown = seq.slice(0, step);
  const last = step > 0 ? seq[step - 1] : null;
  const counts = {};
  shown.forEach((e) => { counts[e.sub] = (counts[e.sub] || 0) + 1; });
  const cfg = FILL.filter((s) => counts[s.id]).map((s) => `${s.id}${sup(counts[s.id])}`).join(" ");
  const ex = explainElectron(last, step);

  return (
    <div className="qm-panel">
      <div className="qm-config-top">
        <div className="qm-element-card" key={z}>
          <span className="z">{z}</span>
          <span className="sym">{SYMBOLS[z - 1]}</span>
          <span className="nm">{NAMES[z - 1]}</span>
        </div>
        <div className="qm-config-slider">
          <span className="lbl">Atomic number Z = {z}</span>
          <input type="range" min="1" max="36" value={z} onChange={(e) => pick(Number(e.target.value))} />
        </div>
      </div>
      <div className="qm-config-presets">
        {PRESETS.map((p) => (
          <button key={p} className={`qm-chipbtn o${z === p ? " active" : ""}`} onClick={() => pick(p)}>{SYMBOLS[p - 1]} · {p}</button>
        ))}
      </div>

      <div className="qm-config-rows">
        {FILL.filter((s) => occ[s.id] > 0).map((s) => {
          const c = counts[s.id] || 0;
          return (
            <div key={s.id} className={`qm-sub-row${c > 0 ? " has" : " dim"}`}>
              <span className="qm-sub-label">{s.id}</span>
              <div className="qm-boxes">
                {Array.from({ length: s.orb }, (_, b) => {
                  const up = shown.some((e) => e.sub === s.id && e.box === b && e.spin === "up");
                  const down = shown.some((e) => e.sub === s.id && e.box === b && e.spin === "down");
                  const isLast = last && last.sub === s.id && last.box === b;
                  return (
                    <div key={b} className={`qm-box${up || down ? " filled" : ""}${isLast ? " last" : ""}`}>
                      {up && <span key="u" className="qm-arrow up">↑</span>}
                      {down && <span key="d" className="qm-arrow down">↓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="qm-config-string">
        {cfg || <span className="empty">Press “Fill electrons” to watch the configuration build up…</span>}
      </div>
      {ex && <div key={step} className={`qm-config-explain ${ex.kind}`}>{ex.text}</div>}
      {EXCEPTIONS[z] && step >= z && (
        <div className="qm-config-note">
          ⚠ Exception: a half-filled (3d⁵) or completely filled (3d¹⁰) d subshell is extra stable, so one 4s electron moves into 3d — this goes beyond the simple Aufbau order.
        </div>
      )}
      <div className="qm-config-controls">
        <button className="qm-btn" onClick={play}><Play size={18} /> Fill electrons</button>
        <button className="qm-btn ghost" onClick={showAll}><Eye size={18} /> Show all</button>
        <span style={{ color: "var(--dim)", fontSize: 18 }}>{Math.min(step, z)} / {z} electrons</span>
      </div>
    </div>
  );
}

/* ---------- hydrogen-like energy: levels + photon jump ---------- */

const LEVELS = [1, 2, 3, 4, Infinity];

function EnergyJump() {
  const [z, setZ] = useState(1);
  const [cur, setCur] = useState(1);
  const [jump, setJump] = useState(null);
  const jumpId = useRef(0);
  const E =(n) => (n === Infinity ? 0 : (-13.6 * z * z) / (n * n));
  const y = (n) => (n === Infinity ? 30 : 30 + 360 / (n * n));
  const nLabel = (n) => (n === Infinity ? "∞" : n);

  const go = (to) => {
    if (to === cur) return;
    jumpId.current += 1;
    setJump({ id: jumpId.current, from: cur, to, dE: E(to) - E(cur) });
    setCur(to);
  };
  const changeZ = (nz) => { setZ(nz); setCur(1); setJump(null); };

  const emit = jump && jump.dE < 0;

  return (
    <div className="qm-panel">
      <div className="qm-lab">
        <div className="qm-lab-stage">
          <svg viewBox="0 0 520 440" role="img" aria-label="Hydrogen-like energy levels">
            <defs>
              <radialGradient id="qmElec" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fff" /><stop offset="60%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#0891b2" />
              </radialGradient>
            </defs>
            {LEVELS.map((n) => (
              <g key={String(n)}>
                <line className={`qm-level-line${cur === n ? " cur" : ""}`} x1="190" x2="500" y1={y(n)} y2={y(n)} strokeDasharray={n === Infinity ? "8 7" : undefined} />
                <text className={`qm-svg-t${cur === n ? " cur" : ""}`} x="8" y={y(n) + 5}>
                  n = {nLabel(n)}  {n === Infinity ? "0 eV" : `${fmtE(E(n))} eV`}
                </text>
              </g>
            ))}
            <g transform={`translate(300 ${y(cur)})`} />
            <g className="qm-svg-e" style={{ transform: `translate(300px, ${y(cur)}px)` }}>
              <circle r="16" fill="rgba(34,211,238,.25)" />
              <circle r="9" fill="url(#qmElec)" />
            </g>
            {jump && (
              <g transform={`translate(330 ${y(emit ? jump.to : jump.from)})`}>
                <g key={jump.id} className={emit ? "qm-photon-out" : "qm-photon-in"}>
                  <path d="M0 0 q8 -13 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke={emit ? "#fb923c" : "#22d3ee"} strokeWidth="3.5" strokeLinecap="round" />
                  <text x="40" y="-14" fontSize="15" fill={emit ? "#fb923c" : "#22d3ee"} fontStyle="italic" fontFamily="JetBrains Mono, monospace">hν</text>
                </g>
              </g>
            )}
          </svg>
        </div>
        <div>
          <div className="qm-ctl-row">
            <span className="qm-ctl-label">Species</span>
            <div className="qm-ctl-chips">
              {[[1, <>H (Z = 1)</>], [2, <>He<sup>+</sup> (Z = 2)</>], [3, <>Li<sup>2+</sup> (Z = 3)</>]].map(([v, lb]) => (
                <button key={v} className={`qm-chipbtn${z === v ? " active" : ""}`} onClick={() => changeZ(v)}>{lb}</button>
              ))}
            </div>
          </div>
          <div className="qm-ctl-row">
            <span className="qm-ctl-label">Jump to</span>
            <div className="qm-ctl-chips">
              {LEVELS.map((n) => (
                <button key={String(n)} className={`qm-chipbtn o${cur === n ? " active" : ""}`} onClick={() => go(n)}>n = {nLabel(n)}</button>
              ))}
            </div>
          </div>
          <div className="qm-formula-line">
            E<sub>n</sub> = −13.6 Z² ÷ n²<br />
            {cur === Infinity
              ? <>n = ∞ → E = <b>0 eV</b> (free electron)</>
              : <>= −13.6 × {z}² ÷ {cur}² = <b>{fmtE(E(cur))} eV</b></>}
          </div>
          {jump ? (
            <div key={jump.id} className={`qm-jump-msg ${emit ? "emit" : "absorb"}`}>
              n = {nLabel(jump.from)} → n = {nLabel(jump.to)}: ΔE = {fmtE(jump.dE)} eV →{" "}
              <b>{emit ? `photon of ${Math.abs(jump.dE).toFixed(2)} eV is emitted` : `photon of ${Math.abs(jump.dE).toFixed(2)} eV is absorbed`}</b>
              {jump.to === Infinity && " — the electron is ionised."}
            </div>
          ) : (
            <div className="qm-jump-msg" style={{ color: "var(--dim)" }}>Pick a level to make the electron jump — falling emits a photon, climbing absorbs one.</div>
          )}
          <p style={{ fontSize: 17, color: "var(--dim)", marginTop: 14 }}>Notice how the levels crowd closer together as n increases.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- hydrogen-like radius ---------- */

function RadiusRings() {
  const [z, setZ] = useState(1);
  const [n, setN] = useState(2);
  const r = (nn) => (0.529 * nn * nn) / z;
  const px = (nn) => r(nn) * 16.5;
  return (
    <div className="qm-panel">
      <div className="qm-lab">
        <div className="qm-lab-stage">
          <svg viewBox="0 0 300 300" role="img" aria-label="Orbit radii">
            {[1, 2, 3, 4].map((nn) => (
              <g key={nn}>
                <circle className={`qm-ring-c${n === nn ? " cur" : ""}`} cx="150" cy="150" r={px(nn)} />
                <text className={`qm-svg-t${n === nn ? " cur" : ""}`} x={150 + px(nn) * 0.707 + 3} y={150 - px(nn) * 0.707 - 2} fontSize="13">n={nn}</text>
              </g>
            ))}
            <line x1="150" y1="150" x2={150 + px(n)} y2="150" stroke="#fb923c" strokeWidth="2.5" />
            <circle cx="150" cy="150" r="7" fill="#fb923c" />
            <text x="150" y="153.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1c0a00">+</text>
          </svg>
        </div>
        <div>
          <div className="qm-ctl-row">
            <span className="qm-ctl-label">Species</span>
            <div className="qm-ctl-chips">
              {[[1, <>H</>], [2, <>He<sup>+</sup></>], [3, <>Li<sup>2+</sup></>]].map(([v, lb]) => (
                <button key={v} className={`qm-chipbtn${z === v ? " active" : ""}`} onClick={() => setZ(v)}>{lb}</button>
              ))}
            </div>
          </div>
          <div className="qm-ctl-row">
            <span className="qm-ctl-label">Orbit n</span>
            <div className="qm-ctl-chips">
              {[1, 2, 3, 4].map((v) => (
                <button key={v} className={`qm-chipbtn o${n === v ? " active" : ""}`} onClick={() => setN(v)}>{v}</button>
              ))}
            </div>
          </div>
          <div className="qm-formula-line">
            r<sub>n</sub> = a<sub>0</sub> n² ÷ Z<br />
            = 0.529 × {n}² ÷ {z} = <b>{r(n).toFixed(3)} Å</b>
          </div>
          <div className="qm-stat-grid" style={{ marginTop: 16 }}>
            {[1, 2, 3, 4].map((nn) => (
              <div key={nn} className={`qm-stat${n === nn ? " o" : ""}`}>
                <div className="k">n = {nn}</div>
                <div className="v" style={{ fontSize: 24 }}>{r(nn).toFixed(3)} Å</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- fast calculations (reveal) ---------- */

function FastCalcs() {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => setOpen((prev) => { const nx = new Set(prev); if (nx.has(i)) nx.delete(i); else nx.add(i); return nx; });
  const allOpen = open.size === fastCalcs.length;
  return (
    <>
      <div className="qm-table-wrap">
        <table className="qm-table">
          <thead><tr><th>Question</th><th>Answer (click a row)</th></tr></thead>
          <tbody>
            {fastCalcs.map(([q, a], i) => (
              <tr key={q} className="qm-reveal-row" onClick={() => toggle(i)}>
                <td>{q}</td>
                <td><span className={`qm-ans${open.has(i) ? " show" : ""}`}>{a}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="qm-btn ghost" onClick={() => setOpen(allOpen ? new Set() : new Set(fastCalcs.map((_, i) => i)))}>
        {allOpen ? <><EyeOff size={18} /> Hide all answers</> : <><Eye size={18} /> Reveal all answers</>}
      </button>
    </>
  );
}

/* ---------- practice ---------- */

function PracticeList() {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => setOpen((prev) => { const nx = new Set(prev); if (nx.has(i)) nx.delete(i); else nx.add(i); return nx; });
  return (
    <div className="qm-practice-list">
      {practice.map((p, i) => (
        <div className="qm-practice-item" key={i}>
          <div className="qm-practice-q">
            <span className="qm-pnum">{i + 1}</span>
            <span className="grow">{p.q}</span>
            <button className="qm-show-ans" onClick={() => toggle(i)}>{open.has(i) ? "hide" : "show answer"}</button>
          </div>
          {open.has(i) && <div className="qm-practice-ans">✓ {p.a}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---------- quiz ---------- */

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
  const handleNext = () => { setCurrentQ((q) => q + 1); setSelected(null); setAnswered(false); };
  const handleRetry = () => { setCurrentQ(0); setScore(0); setSelected(null); setAnswered(false); };

  return (
    <div className="qm-quiz-box">
      <div className="qm-quiz-progress">
        {midQuizData.map((_, i) => (
          <div key={i} className={`qm-qdot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
        ))}
      </div>
      {!finished ? (
        <div>
          <div className="qm-quiz-q">Q{currentQ + 1}. {item.q}</div>
          <div className="qm-quiz-options">
            {item.options.map((opt, i) => {
              let cls = "qm-quiz-opt";
              if (answered && i === item.correct) cls += " correct";
              else if (answered && i === selected) cls += " wrong";
              return <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>{opt}</button>;
            })}
          </div>
          {answered && <div className="qm-quiz-feedback">{item.explain}</div>}
          {answered && (
            <button className="qm-quiz-next" onClick={handleNext}>
              Next <ChevronRight size={14} style={{ verticalAlign: "-2px" }} />
            </button>
          )}
        </div>
      ) : (
        <div className="qm-quiz-score">
          <div className="qm-big">{score}/{midQuizData.length}</div>
          <p style={{ margin: "10px 0 18px" }}>Nice work. Review any you missed above, or retry the deck.</p>
          <button className="qm-btn" onClick={handleRetry}><RotateCcw size={15} /> Retry quiz</button>
        </div>
      )}
    </div>
  );
}

function QuizPage({ onBack, darkMode = true }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const doneRef = useRef(false);

  useEffect(() => { doneRef.current = done; }, [done]);

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
    setCurrentQ((q) => q + 1); setSelected(null); setAnswered(false);
  };
  const handleRetry = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setScore(0); setUserAnswers([]); setDone(false); setTimeLeft(5 * 60);
  };

  return (
    <div className={darkMode ? "qm-root" : "qm-root light"}>
      <div className="qm-topbar">
        <div className="qm-top-left">
          <button className="qm-back-btn" onClick={onBack}><ArrowLeft size={16} /> Back to lesson</button>
        </div>
        <div className="qm-page-pill"><span>⚛️</span><span>Quantum Mechanics — Quiz</span></div>
        {!done && <div className="qm-timer">⏱ {mins}:{secs}</div>}
      </div>
      <div className="qm-progress-rail">
        <div className="qm-progress-fill" style={{ width: done ? "100%" : `${(currentQ / fullQuizData.length) * 100}%` }} />
      </div>
      <div className="qm-qp-wrap">
        {!done ? (
          <div className="qm-qp-card">
            <div className="qm-qp-meta">
              <span className="qm-qp-counter">Question {currentQ + 1} of {fullQuizData.length}</span>
              <span className="qm-qp-chapter">{item.chapter}</span>
            </div>
            <div className="qm-qp-dots">
              {fullQuizData.map((_, i) => (
                <div key={i} className={`qm-qp-dot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
              ))}
            </div>
            <div className="qm-qp-question">{item.q}</div>
            <div className="qm-qp-options">
              {item.options.map((opt, i) => {
                let cls = "qm-qp-opt";
                if (answered && i === item.correct) cls += " correct";
                else if (answered && i === selected) cls += " wrong";
                return (
                  <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                    <span className="qm-qp-opt-label">{labels[i]}</span>
                    <span className="qm-qp-opt-text">{opt}</span>
                    {answered && i === item.correct && <CheckCircle size={18} className="qm-qp-icon correct" />}
                    {answered && i === selected && i !== item.correct && <XCircle size={18} className="qm-qp-icon wrong" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`qm-qp-feedback ${selected === item.correct ? "correct" : "wrong"}`}>
                <strong>{selected === item.correct ? "Correct!" : "Not quite."}</strong> {item.explain}
              </div>
            )}
            {answered && (
              <div className="qm-qp-next-row">
                <button className="qm-qp-next-btn" onClick={handleNext}>
                  {currentQ + 1 >= fullQuizData.length ? "See results" : "Next question"} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="qm-qp-card">
            <div className="qm-qp-result-top">
              <div className={`qm-qp-trophy ${passed ? "pass" : "fail"}`}>{passed ? "🏆" : "📚"}</div>
              <div>
                <div className="qm-qp-pct">{pct}%</div>
                <div className="qm-qp-sub">{score} out of {fullQuizData.length} correct</div>
              </div>
            </div>
            <hr className="qm-qp-divider" />
            <p className="qm-qp-msg">
              {passed
                ? "You passed the Quantum Mechanics quiz — shells, orbitals, nodes and configurations are clicking into place."
                : "Not quite — revisit the quantum numbers, node formulas and the three filling rules, then try again."}
            </p>
            <div className="qm-qp-breakdown">
              {fullQuizData.map((q, i) => (
                <div key={i} className="qm-qp-breakdown-row">
                  {userAnswers[i]?.correct
                    ? <CheckCircle size={18} className="qm-qp-icon correct" />
                    : <XCircle size={18} className="qm-qp-icon wrong" />}
                  <span>Q{i + 1}: {q.chapter}</span>
                </div>
              ))}
            </div>
            <div className="qm-qp-actions">
              <button className="qm-qp-next-btn" onClick={handleRetry}><RotateCcw size={16} /> Retry quiz</button>
              <button className="qm-back-btn" onClick={onBack}><ArrowLeft size={16} /> Back to lesson</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- higher-education mindmap ---------- */

function HigherEdMap() {
  return (
    <div className="qm-mm-wrap">
      <div className="qm-mm-hub-row"><div className="qm-mm-hub">Where quantum ideas lead</div></div>
      <div className="qm-mm-connector"><div className="qm-mm-v" /><div className="qm-mm-h" /></div>
      <div className="qm-mm-tree">
        {higherEd.map((b) => (
          <div className="qm-mm-row" key={b.t}>
            <span className="qm-mm-tick" />
            <div className={`qm-mm-box ${b.c}`}><h4>{b.t}</h4><p>{b.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export default function QuantumMechanics({ onBack, darkMode = true }) {
  const [activeNav, setActiveNav] = useState("qm-hero");
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [zoom, setZoom] = useState(null);

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

  useEffect(() => {
    if (showQuiz) return;
    const els = document.querySelectorAll(".qm-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("qm-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("qm-in"); io.unobserve(en.target); }
      }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [showQuiz]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => { if (e.key === "Escape") setZoom(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (showQuiz) return <QuizPage darkMode={darkMode} onBack={() => window.history.back()} />;

  return (
    <div className={darkMode ? "qm-root" : "qm-root light"}>
      <div className="qm-topbar">
        <div className="qm-top-left">
          <button className="qm-back-btn" onClick={onBack}><ArrowLeft size={16} /> Back to Class 11</button>
        </div>
        <div className="qm-page-pill"><span>⚛️</span><span>Quantum Mechanics of an Atom</span></div>
      </div>

      <div className="qm-progress-rail"><div className="qm-progress-fill" style={{ width: `${progress}%` }} /></div>

      <nav className="qm-side-nav">
        {sideNavItems.map((item) => (
          <button key={item.id} data-label={item.label} className={activeNav === item.id ? "qm-active" : ""} onClick={() => jumpTo(item.id)} />
        ))}
      </nav>

      {zoom && (
        <div className="qm-lightbox" onClick={() => setZoom(null)}>
          <button className="qm-lightbox-close" aria-label="Close">✕</button>
          <img src={zoom} alt="Enlarged figure" />
        </div>
      )}

      {/* Hero */}
      <header className="qm-hero" id="qm-hero">
        <div className="qm-hero-inner">
          <div className="qm-hero-text">
            <div className="qm-hero-eyebrow">Class 11 Chemistry <span className="qm-crumb">›</span> Lesson 2</div>
            <h1 className="qm-hero-title"><span className="o">Quantum</span> <span className="c">Mechanics</span> of an Atom</h1>
            <p className="qm-hero-sub">
              Electrons don't race along neat circular tracks — they live in clouds of probability.
              Learn the addresses, shapes and rules that decide where every electron lives.
            </p>
            <div className="qm-chip-row">
              <div className="qm-chip o">n · l · m<sub>l</sub> · m<sub>s</sub> <span className="full">— the electron's address</span></div>
              <div className="qm-chip c">Aufbau → Pauli → Hund <span className="full">— the filling rules</span></div>
            </div>
          </div>
          <HeroAtom />
        </div>
      </header>

      <div className="qm-lesson-wrap">
        {/* 1. Objectives */}
        <section className="qm-section qm-reveal" id="qm-sec-obj">
          <SectionHead num="1" tag="Your mission" title="Learning objectives" />
          <p>By the end of this lesson you will be able to:</p>
          <div className="qm-obj-grid">
            {objectives.map((o, i) => (
              <div className="qm-obj" key={i}><span className="qm-obj-num">{String(i + 1).padStart(2, "0")}</span><p>{o}</p></div>
            ))}
          </div>
        </section>

        {/* 2. Atomic models */}
        <section className="qm-section qm-reveal" id="qm-sec-models">
          <SectionHead num="2" tag="The story so far" title="Atomic models — why quantum mechanics?" />
          <p>Each model fixed a problem with the one before it. Tap a scientist to see their idea.</p>
          <ModelTimeline />
          <Figure src="atomic-models-timeline.webp" alt="Timeline of atomic models from Dalton to the quantum model" caption="Fig 1 · Atomic models timeline" onZoom={setZoom} />
          <div className="qm-callout">
            <div className="qm-callout-label">Key distinction</div>
            <p>An <b>orbit</b> is a definite path in the old Bohr model; an <b>orbital</b> is a region of high probability of finding an electron.</p>
          </div>
          <OrbitVsOrbital />
          <VideoBlock title="Orbit vs Orbital" desc="Watch how the fixed Bohr path gives way to a probability cloud." file="Orbit vs Orbital.mp4" />
        </section>

        {/* 3. Shell, subshell, orbital */}
        <section className="qm-section qm-reveal" id="qm-sec-shell">
          <SectionHead num="3" tag="Building blocks" title="Shell, subshell and orbital" />
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>Term</th><th>Simple meaning</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td className="hl">Shell</td><td>Main energy level; n = 1, 2, 3, …</td><td>n = 3</td></tr>
                <tr><td className="hl">Subshell</td><td>Part of a shell; l = 0, 1, 2, 3</td><td>3s, 3p, 3d</td></tr>
                <tr><td className="hl">Orbital</td><td>Probability region; maximum 2 electrons</td><td>one 2p orbital</td></tr>
              </tbody>
            </table>
          </div>
          <Figure src="shell-subshell-orbital.webp" alt="The n = 3 shell contains 3s, 3p and 3d subshells" caption="Fig 2 · Shell, subshell and orbital (n = 3)" onZoom={setZoom} />
        </section>

        {/* 4. Four quantum numbers */}
        <section className="qm-section qm-reveal" id="qm-sec-qn">
          <SectionHead num="4" tag="The electron's address" title="Four quantum numbers" />
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>Number</th><th>Symbol</th><th>Allowed values</th><th>Tells us</th></tr></thead>
              <tbody>
                <tr><td>Principal</td><td className="hl">n</td><td>1, 2, 3, …</td><td>Shell, size and main energy level</td></tr>
                <tr><td>Azimuthal</td><td className="hl">l</td><td>0 to n − 1</td><td>Subshell and shape</td></tr>
                <tr><td>Magnetic</td><td className="hl">m<sub>l</sub></td><td>−l to +l</td><td>Orbital orientation</td></tr>
                <tr><td>Spin</td><td className="hl">m<sub>s</sub></td><td>+½ or −½</td><td>Electron spin</td></tr>
              </tbody>
            </table>
          </div>
          <Figure src="electron-address.webp" alt="Electron address: city, street, house and direction for n, l, ml and ms" caption="Fig 3 · The electron address — city → street → house → direction" onZoom={setZoom} />
          <h3>Build an electron's address</h3>
          <p>Choose the four numbers. Notice how l is limited by n, and m<sub>l</sub> by l.</p>
          <QuantumExplorer />
        </section>

        {/* 5. Counting orbitals */}
        <section className="qm-section qm-reveal" id="qm-sec-count">
          <SectionHead num="5" tag="Simple formulae" title="Number of orbitals" />
          <div className="qm-formula-grid">
            <div className="qm-formula-card o"><div className="lbl">Orbitals in a subshell</div><div className="f">2l + 1</div></div>
            <div className="qm-formula-card c"><div className="lbl">Orbitals in a shell</div><div className="f">n²</div></div>
            <div className="qm-formula-card g"><div className="lbl">Maximum electrons in a shell</div><div className="f">2n²</div></div>
          </div>
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>l</th><th>Subshell</th><th>Orbitals</th><th>Maximum electrons</th></tr></thead>
              <tbody>
                {[[0, "s", 1, 2], [1, "p", 3, 6], [2, "d", 5, 10], [3, "f", 7, 14]].map(([l, s, o, e]) => (
                  <tr key={s}><td>{l}</td><td className="hl">{s}</td><td>{o}</td><td className="hl2">{e}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="qm-callout purple">
            <div className="qm-callout-label">Worked examples</div>
            <p><b>3d:</b> l = 2 → 2(2) + 1 = 5 orbitals. &nbsp;·&nbsp; <b>n = 4 shell:</b> 4² = 16 orbitals and 2(4²) = 32 electrons.</p>
          </div>
          <h3>Shell quick table</h3>
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>n</th><th>Subshells</th><th>Orbitals n²</th><th>Maximum electrons 2n²</th></tr></thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((n) => (
                  <tr key={n}>
                    <td className="hl">{n}</td>
                    <td>{Array.from({ length: n }, (_, l) => `${n}${LETTERS[l]}`).join(", ")}</td>
                    <td>{n * n}</td>
                    <td className="hl2">{2 * n * n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Orbital shapes */}
        <section className="qm-section qm-reveal" id="qm-sec-shapes">
          <SectionHead num="6" tag="See the clouds" title="Orbital shapes and orientation" />
          <p><b>s:</b> spherical, 1 orbital. <b>p:</b> dumbbell-shaped, 3 orientations: p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>. <b>d:</b> 5 orbitals, mostly four-lobed shapes. <b>f:</b> 7 orbitals with more complex shapes.</p>
          <OrbitalShapes />
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>Subshell</th><th>Orbitals</th><th>Maximum electrons</th><th>General shape</th></tr></thead>
              <tbody>
                <tr><td className="hl">s</td><td>1</td><td>2</td><td>Spherical</td></tr>
                <tr><td className="hl">p</td><td>3</td><td>6</td><td>Dumbbell; p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub></td></tr>
                <tr><td className="hl">d</td><td>5</td><td>10</td><td>Mostly four-lobed; five orientations</td></tr>
                <tr><td className="hl">f</td><td>7</td><td>14</td><td>Complex</td></tr>
              </tbody>
            </table>
          </div>
          <Figure src="orbital-shapes.webp" alt="Shapes of s, p, d and f orbitals" caption="Fig 4 · Orbital shapes — red = positive phase, blue = negative phase" onZoom={setZoom} />
          <VideoBlock title="Orbital Shapes in 3D" desc="Rotate through s, p, d and f orbitals and see their lobes in three dimensions." file="Orbital Shapes in 3D.mp4" />
        </section>

        {/* 7. Nodes */}
        <section className="qm-section qm-reveal" id="qm-sec-nodes">
          <SectionHead num="7" tag="Where electrons never are" title="Nodes — very easy formula" />
          <p>A <b>node</b> is a region where the probability of finding the electron is zero.</p>
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>Type</th><th>Formula</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td>Angular nodes</td><td className="hl">l</td><td>Angular / directional nodal regions</td></tr>
                <tr><td>Radial nodes</td><td className="hl">n − l − 1</td><td>Nodal regions at particular distances</td></tr>
                <tr><td>Total nodes</td><td className="hl">n − 1</td><td>Radial + angular nodes</td></tr>
              </tbody>
            </table>
          </div>
          <NodeExplorer />
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>Orbital</th><th>Angular</th><th>Radial</th><th>Total</th></tr></thead>
              <tbody>
                {nodeExamples.map(([n, l]) => (
                  <tr key={`${n}${l}`}><td className="hl">{n}{LETTERS[l]}</td><td>{l}</td><td>{n - l - 1}</td><td className="hl2">{n - 1}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <Figure src="nodes-in-orbitals.webp" alt="2s radial node and 2p angular node" caption="Fig 5 · Nodes in atomic orbitals — 2s (radial) and 2p (angular)" onZoom={setZoom} />
        </section>

        {/* 8. Electronic configuration */}
        <section className="qm-section qm-reveal" id="qm-sec-config">
          <SectionHead num="8" tag="Filling the boxes" title="Electronic configuration — three rules" />
          <div className="qm-rules">
            <div className="qm-rule"><span className="no">1</span><h4>Aufbau principle</h4><p>Lower-energy orbitals fill before higher-energy orbitals.</p></div>
            <div className="qm-rule"><span className="no">2</span><h4>Pauli exclusion</h4><p>An orbital holds a maximum of 2 electrons with opposite spins.</p></div>
            <div className="qm-rule"><span className="no">3</span><h4>Hund's rule</h4><p>Equal-energy orbitals are singly occupied with parallel spins before pairing.</p></div>
          </div>
          <h3>Filling order</h3>
          <div className="qm-order-strip">
            {orderList.map((s, i) => (
              <span key={s} style={{ display: "contents" }}>
                <span className="qm-order-pill" style={{ "--i": i }}>{s}</span>
                {i < orderList.length - 1 && <span className="qm-order-arrow">→</span>}
              </span>
            ))}
          </div>
          <Figure src="aufbau-filling-order.webp" alt="Aufbau filling order diagram" caption="Fig 6 · Filling order (Aufbau principle)" onZoom={setZoom} />
          <h3>Hund's rule in action</h3>
          <Figure narrow src="hunds-rule.webp" alt="Hund's rule for nitrogen and oxygen" caption="Fig 7 · Hund's rule — N (p³) fills singly; O (p⁴) pairs only after each orbital has one electron" onZoom={setZoom} />
          <VideoBlock title="Aufbau, Pauli and Hund" desc="Watch electrons fill orbitals following the three rules, step by step." file="Aufbau, Pauli and Hund.mp4" />
          <h3>Build any configuration yourself</h3>
          <p>Pick an element (or drag Z) and press <b>Fill electrons</b> — each electron explains which rule placed it.</p>
          <ConfigBuilder />
          <h3>Worked examples</h3>
          <div className="qm-table-wrap">
            <table className="qm-table">
              <thead><tr><th>Atom</th><th>Z</th><th>Configuration</th></tr></thead>
              <tbody>
                {configExamples.map(([a, z, c]) => (
                  <tr key={a}><td>{a}</td><td>{z}</td><td className="hl2">{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="qm-callout purple">
            <div className="qm-callout-label">Hund example</div>
            <p>p³ = [↑] [↑] [↑] &nbsp;·&nbsp; p⁴ = [↑↓] [↑] [↑]</p>
          </div>
        </section>

        {/* 9. Orbital energy */}
        <section className="qm-section qm-reveal" id="qm-sec-energy">
          <SectionHead num="9" tag="Hydrogen-like species" title="Orbital energy" />
          <p>For a one-electron species such as H, He⁺ or Li²⁺:</p>
          <div className="qm-formula-grid">
            <div className="qm-formula-card o"><div className="lbl">Energy of level n</div><div className="f">E<sub>n</sub> = −13.6 Z² / n² eV</div><div className="s">Z = atomic number, n = principal quantum number. The negative sign means the electron is bound.</div></div>
          </div>
          <div className="qm-callout purple">
            <div className="qm-callout-label">Example</div>
            <p>H at n = 2: E = −13.6(1)² / 2² = <b>−3.40 eV</b></p>
          </div>
          <div className="qm-callout">
            <div className="qm-callout-label">Important</div>
            <p>This simple equation is exact for hydrogen-like one-electron species, not an exact multi-electron formula.</p>
          </div>
          <Figure src="hydrogen-energy-levels.webp" alt="Hydrogen energy level diagram" caption="Fig 8 · Hydrogen energy levels — closer together as n increases" onZoom={setZoom} />
          <h3>Make the electron jump</h3>
          <EnergyJump />
          <VideoBlock title="Energy Jump" desc="See an electron jump between energy levels and give out or take in light." file="Energy Jump.mp4" />
        </section>

        {/* 10. Orbital radius */}
        <section className="qm-section qm-reveal" id="qm-sec-radius">
          <SectionHead num="10" tag="Hydrogen-like species" title="Orbital radius" />
          <div className="qm-formula-grid">
            <div className="qm-formula-card c"><div className="lbl">Radius of orbit n</div><div className="f">r<sub>n</sub> = a<sub>0</sub> n² / Z</div><div className="s">a<sub>0</sub> = 0.529 Å (≈ 5.29 × 10⁻¹¹ m)</div></div>
          </div>
          <div className="qm-callout purple">
            <div className="qm-callout-label">Examples</div>
            <p>H at n = 2: r = 0.529 × 4 = <b>2.116 Å</b> &nbsp;·&nbsp; He⁺ at n = 2: r = 0.529 × 4 / 2 = <b>1.058 Å</b></p>
          </div>
          <Figure src="atomic-radius-hydrogen.webp" alt="Hydrogen orbit radii for n = 1, 2 and 3" caption="Fig 9 · Atomic radius of hydrogen — r ∝ n²" onZoom={setZoom} />
          <h3>Explore the radii</h3>
          <RadiusRings />
        </section>

        {/* 11. Fast calculations */}
        <section className="qm-section qm-reveal" id="qm-sec-fast">
          <SectionHead num="11" tag="Exam speed" title="Fast exam calculations" />
          <p>Cover the answer, solve it in your head, then click the row to check.</p>
          <FastCalcs />
        </section>

        {/* 12. Quiz */}
        <section className="qm-section qm-reveal" id="qm-sec-quiz">
          <SectionHead num="12" tag="Check yourself" title="Quick quiz" />
          <p>Five questions on quantum numbers, nodes, rules and hydrogen-like formulas. No pressure — you can retry.</p>
          <Quiz />
        </section>

        {/* 13. Daily-life uses */}
        <section className="qm-section qm-reveal" id="qm-sec-daily">
          <SectionHead num="13" tag="It's everywhere" title="Daily-life uses" />
          <p>Quantum energy levels aren't just theory — they power the things you use every day.</p>
          <div className="qm-use-grid">
            {dailyUses.map((u) => (
              <div className="qm-use-card" key={u.t}>
                <span className="qm-use-icon">{u.icon}</span>
                <h4>{u.t}</h4>
                <p>{u.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 14. Industrial uses */}
        <section className="qm-section qm-reveal" id="qm-sec-industry">
          <SectionHead num="14" tag="Why it matters" title="Industrial uses" />
          <div className="qm-industry-scroll">
            {industryCards.map((c) => (
              <div className="qm-industry-card" key={c.num}>
                <div className="qm-ic-num">{c.num}</div>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 15. Higher education */}
        <section className="qm-section qm-reveal" id="qm-sec-higher">
          <SectionHead num="15" tag="Looking ahead" title="Higher-education uses" />
          <p>A quick map of the degrees that build directly on quantum mechanics of the atom.</p>
          <HigherEdMap />
        </section>

        {/* 16. Careers */}
        <section className="qm-section qm-reveal" id="qm-sec-jobs">
          <SectionHead num="16" tag="Your future" title="Job opportunities" />
          <div className="qm-job-grid">
            {jobs.map((j) => (
              <div className="qm-job" key={j.f}><h4>{j.f}</h4><p>{j.w}</p></div>
            ))}
          </div>
        </section>

        {/* 17. Global needs */}
        <section className="qm-section qm-reveal" id="qm-sec-global">
          <SectionHead num="17" tag="The bigger picture" title="Global needs" />
          <div className="qm-global">
            {globalNeeds.map((g) => (
              <div className="qm-global-item" key={g.t}><span className="qm-global-ic">{g.i}</span><p>{g.t}</p></div>
            ))}
          </div>
        </section>

        {/* 18. Practice */}
        <section className="qm-section qm-reveal" id="qm-sec-practice">
          <SectionHead num="18" tag="Your turn" title="Practice problems" />
          <p>Solve each one in your notebook first — then reveal the answer key.</p>
          <PracticeList />
        </section>

        {/* 19. Memory sheet */}
        <section className="qm-section qm-reveal" id="qm-sec-memory">
          <SectionHead num="19" tag="Revise in a minute" title="One-minute memory sheet" />
          <div className="qm-formula-grid">
            <div className="qm-formula-card"><div className="lbl">Quantum numbers</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>n = shell · l = subshell and shape · m<sub>l</sub> = orientation · m<sub>s</sub> = spin</div></div>
            <div className="qm-formula-card o"><div className="lbl">Orbitals in subshell</div><div className="f">2l + 1</div></div>
            <div className="qm-formula-card o"><div className="lbl">Max electrons in subshell</div><div className="f">2(2l + 1)</div></div>
            <div className="qm-formula-card c"><div className="lbl">Orbitals in shell</div><div className="f">n²</div></div>
            <div className="qm-formula-card c"><div className="lbl">Max electrons in shell</div><div className="f">2n²</div></div>
            <div className="qm-formula-card g"><div className="lbl">Angular nodes</div><div className="f">l</div></div>
            <div className="qm-formula-card g"><div className="lbl">Radial nodes</div><div className="f">n − l − 1</div></div>
            <div className="qm-formula-card g"><div className="lbl">Total nodes</div><div className="f">n − 1</div></div>
            <div className="qm-formula-card"><div className="lbl">Filling rules</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>Aufbau = lower-energy first · Pauli = 2 per orbital, opposite spins · Hund = fill singly before pairing</div></div>
            <div className="qm-formula-card o"><div className="lbl">Hydrogen-like energy</div><div className="f" style={{ fontSize: 22 }}>E<sub>n</sub> = −13.6 Z²/n² eV</div></div>
            <div className="qm-formula-card c"><div className="lbl">Hydrogen-like radius</div><div className="f" style={{ fontSize: 22 }}>r<sub>n</sub> = a<sub>0</sub>n²/Z</div><div className="s">a<sub>0</sub> = 0.529 Å</div></div>
          </div>
          <h3>Final concept map</h3>
          <div className="qm-chain">
            {chain.map((c, i) => (
              <span key={c} style={{ display: "contents" }}>
                <span className="qm-chain-node" style={{ "--i": i }}>{c}</span>
                {i < chain.length - 1 && <span className="qm-chain-arrow">→</span>}
              </span>
            ))}
          </div>
          <div className="qm-teacher">
            <p>Teacher note: The energy and radius equations are hydrogen-like formulas. Multi-electron atoms require fuller quantum-mechanical treatment because electron–electron interactions affect orbital energies.</p>
          </div>
        </section>

        {/* Quiz CTA */}
        <div className="qm-cta-card">
          <div className="qm-cta-left">
            <div className="qm-cta-icon">🧠</div>
            <div>
              <h2 className="qm-cta-title">It's quiz time</h2>
              <p className="qm-cta-desc">Lock in what you've learned. Take this quiz to review quantum mechanics of the atom and mark this lesson as complete.</p>
              <div className="qm-cta-meta">
                <span>✅ Get 60% or more to pass</span>
                <span>🕐 ~5 minutes</span>
              </div>
              <button className="qm-cta-btn" onClick={startQuiz}>Start Quiz <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="qm-cta-trophy">🏆</div>
        </div>
      </div>
    </div>
  );
}
