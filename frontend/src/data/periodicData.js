// periodicData.js — content + data for Lesson 3: Periodic Classification of Elements.
// Lesson text follows the supplied Tamil Nadu State Board teacher's guide (PDF).
// Extra numbers (atomic masses, trend values) are standard textbook figures, rounded.

/* ------------------------------------------------------------------ */
/* 118 elements                                                       */
/* ------------------------------------------------------------------ */

export const SYM =
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(" ");

export const NAMES =
  "Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulphur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Caesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson".split(" ");

export const Z_OF = Object.fromEntries(SYM.map((s, i) => [s, i + 1]));

const PERIOD_END = [2, 10, 18, 36, 54, 86, 118];

export const BLOCK_META = {
  s: { label: "s-block", c: "var(--blk-s)", short: "Groups 1 and 2" },
  p: { label: "p-block", c: "var(--blk-p)", short: "Groups 13 to 18" },
  d: { label: "d-block", c: "var(--blk-d)", short: "Groups 3 to 12" },
  f: { label: "f-block", c: "var(--blk-f)", short: "Lanthanoids and actinoids" },
};

export const FAMILY_META = {
  hydrogen: { label: "Hydrogen (exceptional)", c: "#e2e8f0" },
  alkali: { label: "Alkali metals (Group 1)", c: "#fb923c" },
  alkaline: { label: "Alkaline earth metals (Group 2)", c: "#fbbf24" },
  transition: { label: "Transition elements (Groups 3–12)", c: "#a78bfa" },
  other: { label: "Other p-block (Groups 13–16)", c: "#60a5fa" },
  halogen: { label: "Halogens (Group 17)", c: "#22d3ee" },
  noble: { label: "Noble gases (Group 18)", c: "#f472b6" },
  lanthanoid: { label: "Lanthanoids (f-block)", c: "#4ade80" },
  actinoid: { label: "Actinoids (f-block)", c: "#a3e635" },
};

function placeOf(z) {
  const period = PERIOD_END.findIndex((b) => z <= b) + 1;
  const start = period === 1 ? 1 : PERIOD_END[period - 2] + 1;
  const i = z - start;
  if (period === 1) return { period, group: i === 0 ? 1 : 18 };
  if (period <= 3) return { period, group: i < 2 ? i + 1 : i + 11 };
  if (period <= 5) return { period, group: i + 1 };
  if (i < 2) return { period, group: i + 1 };
  if (i < 17) return { period, group: null, series: period === 6 ? "lan" : "act", idx: i - 2 };
  return { period, group: i - 13 };
}

function blockOf(pl) {
  if (pl.series) return "f";
  if (pl.group <= 2) return "s";
  if (pl.group <= 12) return "d";
  return "p";
}

function familyOf(z, pl) {
  if (pl.series) return pl.series === "lan" ? "lanthanoid" : "actinoid";
  const g = pl.group;
  if (g === 1) return z === 1 ? "hydrogen" : "alkali";
  if (g === 2) return "alkaline";
  if (g <= 12) return "transition";
  if (g <= 16) return "other";
  return g === 17 ? "halogen" : "noble";
}

export const ELEMENTS = SYM.map((sym, i) => {
  const z = i + 1;
  const pl = placeOf(z);
  return { z, sym, name: NAMES[i], ...pl, block: blockOf(pl), family: familyOf(z, pl) };
});

const SUPS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sp = (n) => String(n).split("").map((c) => SUPS[+c]).join("");

export function outerConfig(e) {
  const p = e.period;
  if (e.block === "f") {
    const a = p === 6 ? 4 : 5;
    return `${a}f¹⁻¹⁴ ${a + 1}d⁰⁻¹ ${p}s²`;
  }
  if (e.block === "d") return `${p - 1}d¹⁻¹⁰ ${p}s¹⁻²`;
  if (e.z === 1) return "1s¹";
  if (e.z === 2) return "1s²";
  if (e.block === "s") return `${p}s${sp(e.group)}`;
  return `${p}s² ${p}p${sp(e.group - 12)}`;
}

export function valenceText(e) {
  if (e.block === "f") return "Variable";
  if (e.block === "d") return `ns + (n−1)d = ${e.group}`;
  if (e.z === 2) return "2";
  if (e.group <= 2) return String(e.group);
  return String(e.group - 10);
}

export function groupNote(g) {
  if (g === 1) return "ns¹";
  if (g === 2) return "ns²";
  if (g >= 3 && g <= 12) return "(n−1)d¹⁻¹⁰ ns¹⁻²  ·  d + s electrons = group number";
  if (g === 18) return "ns² np⁶  (He is 1s²)";
  return `ns² np${sp(g - 12)}`;
}

export const PERIOD_SIZES = [2, 8, 8, 18, 18, 32, 32];

/* ------------------------------------------------------------------ */
/* Lesson content (from the PDF)                                      */
/* ------------------------------------------------------------------ */

export const sideNavItems = [
  { id: "pc-hero", label: "Intro" },
  { id: "pc-sec-obj", label: "Objectives" },
  { id: "pc-sec-why", label: "Why classify?" },
  { id: "pc-sec-history", label: "Historical development" },
  { id: "pc-sec-table", label: "Modern table" },
  { id: "pc-sec-trends", label: "Periodic trends" },
  { id: "pc-sec-daily", label: "Everyday life" },
  { id: "pc-sec-industry", label: "Industry" },
  { id: "pc-sec-higher", label: "Higher education" },
  { id: "pc-sec-global", label: "Global opportunities" },
  { id: "pc-sec-activity", label: "Classroom activity" },
  { id: "pc-sec-think", label: "Think and answer" },
  { id: "pc-sec-quiz", label: "Quick quiz" },
  { id: "pc-sec-check", label: "Self-evaluation" },
  { id: "pc-sec-memory", label: "Memory sheet" },
];

export const objectives = [
  "Explain why elements need to be classified.",
  "Describe the Döbereiner triads, Newlands' law of octaves and Mendeleev's periodic table.",
  "State the modern periodic law and describe the long-form periodic table.",
  "Identify groups, periods and the s, p, d and f blocks.",
  "Explain general periodic trends in atomic radius, ionisation enthalpy, electron gain enthalpy and electronegativity.",
];

export const keyTerms = [
  { t: "Element", c: "var(--or)", d: "A pure substance made up of atoms having the same atomic number." },
  { t: "Periodicity", c: "var(--cy)", d: "Repetition of similar properties at regular intervals when elements are arranged in increasing atomic number." },
  { t: "Group", c: "var(--pu)", d: "A vertical column in the periodic table." },
  { t: "Period", c: "var(--gr)", d: "A horizontal row in the periodic table." },
];

export const models = [
  {
    nm: "Döbereiner", yr: "Triads", year: 1829,
    idea: "Certain elements with similar properties could be arranged in groups of three. The atomic mass of the middle element was approximately the average of the other two.",
    limit: "Only a limited number of elements could be grouped into triads.",
  },
  {
    nm: "Newlands", yr: "Law of Octaves", year: 1864,
    idea: "When elements were arranged in increasing atomic mass, every eighth element showed similar properties.",
    limit: "Worked reasonably well only for lighter elements; did not leave gaps for undiscovered elements.",
  },
  {
    nm: "Mendeleev", yr: "Periodic table", year: 1869,
    idea: "Arranged elements mainly by increasing atomic mass and grouped elements with similar chemical properties. Left gaps for undiscovered elements.",
    limit: "Predicted properties of undiscovered elements, but some pairs and isotopes could not be explained fully. Provided the foundation of the modern periodic table.",
  },
  {
    nm: "Moseley", yr: "Atomic number", year: 1913,
    idea: "Established atomic number as the correct basis for arranging elements.",
    limit: "This led to the modern periodic law.",
  },
];

export const TRIADS = [
  { name: "Li · Na · K", els: [["Li", 6.94], ["Na", 22.99], ["K", 39.1]] },
  { name: "Ca · Sr · Ba", els: [["Ca", 40.08], ["Sr", 87.62], ["Ba", 137.33]] },
  { name: "Cl · Br · I", els: [["Cl", 35.45], ["Br", 79.9], ["I", 126.9]] },
];

export const NEWLANDS = ["H", "Li", "Be", "B", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Cr", "Ti", "Mn", "Fe"];
export const NEWLANDS_BAD = new Set(["H", "Cr", "Ti", "Mn", "Fe"]);
export const NEWLANDS_HEAD = ["Do", "Re", "Mi", "Fa", "So", "La", "Ti"];
export const NEWLANDS_COL_NOTE = [
  "F and Cl are both halogens ✓ — but hydrogen does not belong with them ✗.",
  "Li, Na and K are all alkali metals ✓ — the pattern works.",
  "Be, Mg and Ca are all alkaline earth metals ✓ — the pattern works.",
  "B and Al are in the same family ✓ — but Cr is a transition metal ✗.",
  "C and Si are in the same family ✓ — but Ti is a transition metal ✗.",
  "N and P are in the same family ✓ — but Mn is a transition metal ✗.",
  "O and S are in the same family ✓ — but Fe, a metal, is forced under them ✗.",
];

export const GAPS = [
  { eka: "eka-aluminium", sym: "Ga", name: "Gallium", pred: 68, real: 69.72, year: 1875, pdf: true },
  { eka: "eka-boron", sym: "Sc", name: "Scandium", pred: 44, real: 44.96, year: 1879, pdf: true },
  { eka: "eka-silicon", sym: "Ge", name: "Germanium", pred: 72, real: 72.63, year: 1886, pdf: false },
];

export const MASS_PAIRS = [
  {
    id: "ark",
    label: "Argon and potassium",
    slots: [
      { sym: "Cl", m: 35.45 },
      { sym: "Ar", m: 39.95 },
      { sym: "K", m: 39.1 },
      { sym: "Ca", m: 40.08 },
    ],
    note: "By mass, K (39.10) comes before Ar (39.95) — so K would land in the noble-gas column and Ar in the alkali-metal column. Atomic number puts Ar (18) before K (19) and fixes it.",
  },
  {
    id: "tei",
    label: "Tellurium and iodine",
    slots: [
      { sym: "Sb", m: 121.76 },
      { sym: "Te", m: 127.6 },
      { sym: "I", m: 126.9 },
      { sym: "Xe", m: 131.29 },
    ],
    note: "By mass, I (126.90) comes before Te (127.60) — so iodine would fall under oxygen and sulphur. Mendeleev swapped them by chemical sense; Moseley's atomic number (Te 52, I 53) explains why he was right.",
  },
];

/* ------------------------------------------------------------------ */
/* Periodic trends                                                    */
/* ------------------------------------------------------------------ */

// radius (pm), first ionisation enthalpy (kJ/mol), electron gain enthalpy (kJ/mol), Pauling electronegativity.
// Standard textbook values, rounded. Noble-gas radii and electronegativities are not compared (null).
export const TREND = {
  Li: { r: 152, ie: 520, ea: -60, en: 1.0 }, Be: { r: 111, ie: 899, ea: 48, en: 1.5 }, B: { r: 88, ie: 801, ea: -27, en: 2.0 },
  C: { r: 77, ie: 1086, ea: -122, en: 2.5 }, N: { r: 74, ie: 1402, ea: 7, en: 3.0 }, O: { r: 66, ie: 1314, ea: -141, en: 3.5 },
  F: { r: 64, ie: 1681, ea: -328, en: 4.0 }, Ne: { r: null, ie: 2081, ea: 116, en: null },
  Na: { r: 186, ie: 496, ea: -53, en: 0.9 }, Mg: { r: 160, ie: 738, ea: 39, en: 1.2 }, Al: { r: 143, ie: 577, ea: -42, en: 1.5 },
  Si: { r: 117, ie: 786, ea: -134, en: 1.8 }, P: { r: 110, ie: 1012, ea: -72, en: 2.1 }, S: { r: 104, ie: 1000, ea: -200, en: 2.5 },
  Cl: { r: 99, ie: 1251, ea: -349, en: 3.0 }, Ar: { r: null, ie: 1521, ea: 96, en: null },
  K: { r: 231, ie: 419, ea: -48, en: 0.8 }, Rb: { r: 244, ie: 403, ea: -47, en: 0.8 }, Cs: { r: 262, ie: 376, ea: -46, en: 0.7 },
  Br: { r: 114, ie: 1140, ea: -325, en: 2.8 }, I: { r: 133, ie: 1008, ea: -295, en: 2.5 },
};

export const TREND_PROPS = {
  r: {
    label: "Atomic radius", unit: "pm", across: "down", group: "up",
    acrossTxt: "Generally decreases", groupTxt: "Generally increases",
    reason: "Across a period, effective nuclear attraction increases; down a group, additional shells are added.",
    mag: (v) => v,
    fmt: (v) => String(v),
  },
  ie: {
    label: "Ionisation enthalpy", unit: "kJ/mol", across: "up", group: "down",
    acrossTxt: "Generally increases", groupTxt: "Generally decreases",
    reason: "Electrons are held more strongly across a period; outer electrons are farther from the nucleus down a group.",
    mag: (v) => v,
    fmt: (v) => String(v),
  },
  ea: {
    label: "Electron gain enthalpy", unit: "kJ/mol", across: "up", group: "down",
    acrossTxt: "Often becomes more negative, with exceptions", groupTxt: "Not uniform; often becomes less negative",
    reason: "Depends on nuclear attraction, size and electronic configuration. Bars show the energy released — a positive value (energy must be supplied) has no bar.",
    mag: (v) => (v < 0 ? -v : 0),
    fmt: (v) => (v > 0 ? `+${v}` : `−${Math.abs(v)}`),
  },
  en: {
    label: "Electronegativity", unit: "Pauling", across: "up", group: "down",
    acrossTxt: "Generally increases", groupTxt: "Generally decreases",
    reason: "The ability to attract shared electrons generally increases across and decreases down.",
    mag: (v) => v,
    fmt: (v) => v.toFixed(1),
  },
};

export const TREND_SETS = [
  { id: "p2", label: "Period 2", kind: "across", els: ["Li", "Be", "B", "C", "N", "O", "F", "Ne"], dir: "Left → right across Period 2 (Li to Ne)" },
  { id: "p3", label: "Period 3", kind: "across", els: ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"], dir: "Left → right across Period 3 (Na to Ar)" },
  { id: "g1", label: "Group 1", kind: "group", els: ["Li", "Na", "K", "Rb", "Cs"], dir: "Top → bottom down Group 1 (Li to Cs)" },
  { id: "g17", label: "Group 17", kind: "group", els: ["F", "Cl", "Br", "I"], dir: "Top → bottom down Group 17 (F to I)" },
];

export const PULL_PERIOD = [
  { sym: "Na", z: 11, r: 186 }, { sym: "Mg", z: 12, r: 160 }, { sym: "Al", z: 13, r: 143 }, { sym: "Si", z: 14, r: 117 },
  { sym: "P", z: 15, r: 110 }, { sym: "S", z: 16, r: 104 }, { sym: "Cl", z: 17, r: 99 },
];
export const PULL_GROUP = [
  { sym: "Li", z: 3, r: 152, shells: 2 }, { sym: "Na", z: 11, r: 186, shells: 3 }, { sym: "K", z: 19, r: 231, shells: 4 },
  { sym: "Rb", z: 37, r: 244, shells: 5 }, { sym: "Cs", z: 55, r: 262, shells: 6 },
];

/* ------------------------------------------------------------------ */
/* Applications                                                       */
/* ------------------------------------------------------------------ */

export const everyday = [
  { ic: "🧂", t: "Sodium — table salt", d: "Sodium chloride is common table salt; sodium compounds have many uses.", link: "Group 1 alkali metal; forms Na⁺ readily.", els: ["Na", "Cl"] },
  { ic: "💧", t: "Chlorine — clean water", d: "Used in controlled disinfection of drinking water and swimming pools.", link: "Group 17 halogen; reactive non-metal.", els: ["Cl"] },
  { ic: "🎈", t: "Helium — balloons", d: "Balloons and specialised cooling applications.", link: "Group 18 noble gas; chemically unreactive.", els: ["He"] },
  { ic: "💻", t: "Silicon — chips & solar cells", d: "Computer chips and solar cells.", link: "p-block element; important semiconductor.", els: ["Si"] },
  { ic: "🏗️", t: "Iron — buildings & vehicles", d: "Buildings, vehicles, tools and machinery.", link: "d-block transition element.", els: ["Fe"] },
  { ic: "🔌", t: "Copper — wiring", d: "Electrical wiring, motors and plumbing.", link: "d-block element with high electrical conductivity.", els: ["Cu"] },
];

export const industrial = [
  { ic: "🔬", t: "Electronics", d: "Silicon and germanium are used as semiconductors in chips, transistors and solar cells.", link: "Both sit in Group 14 of the p-block.", els: ["Si", "Ge"] },
  { ic: "⚙️", t: "Metallurgy", d: "Iron, nickel and chromium are used in alloys; chromium and nickel are important in stainless steel.", link: "All three are d-block transition metals.", els: ["Fe", "Ni", "Cr"] },
  { ic: "⚗️", t: "Chemical industries", d: "Platinum, nickel and iron can act as catalysts in industrial chemical reactions.", link: "Transition metals — variable behaviour suits catalysis.", els: ["Pt", "Ni", "Fe"] },
  { ic: "💊", t: "Medicine", d: "Iodine is used in antiseptic preparations; compounds of selected elements have medical applications.", link: "Iodine is a Group 17 halogen.", els: ["I"] },
  { ic: "🔋", t: "Energy technology", d: "Lithium is important in rechargeable batteries; uranium is used as nuclear fuel under controlled conditions.", link: "Lithium is a Group 1 alkali metal; uranium is in the f-block (actinoids).", els: ["Li", "U"] },
];

export const higherEd = [
  { t: "Chemistry", d: "Chemical bonding, reactivity, acid–base behaviour and reaction mechanisms build on periodic properties.", c: "c1" },
  { t: "Physics", d: "Quantum numbers, orbitals, electron configuration and nuclear charge explain periodic behaviour.", c: "c2" },
  { t: "Materials science", d: "Periodic trends help in understanding semiconductors, magnetic materials, alloys and functional materials.", c: "c3" },
  { t: "Pharmacy and medicinal chemistry", d: "The chemistry of elemental ions and compounds is relevant to medicines and biological systems.", c: "c1" },
  { t: "Environmental science", d: "Understanding toxic metals, essential elements and chemical behaviour helps in monitoring pollution and water quality.", c: "c2" },
];

export const globalOps = [
  { i: "🔬", t: "Semiconductor and chip manufacturing — chemistry, materials science and electronics engineering." },
  { i: "🔋", t: "Battery and electric-vehicle industries — materials involving lithium, nickel, cobalt and manganese." },
  { i: "☀️", t: "Clean energy — solar cells, hydrogen technologies and energy storage." },
  { i: "💊", t: "Pharmaceuticals and biotechnology — analytical chemistry and materials research." },
  { i: "⛏️", t: "Mining, metallurgy and recycling — extraction, processing and recovery of useful elements." },
  { i: "🎓", t: "Research and teaching — chemistry, physics, nanoscience and materials science." },
];

export const skills = ["Chemistry and mathematics fundamentals", "Laboratory safety", "Data analysis", "Computing", "Communication", "Problem-solving"];

/* ------------------------------------------------------------------ */
/* Practice + checks                                                  */
/* ------------------------------------------------------------------ */

export const NA_CL = ["Na", "Mg", "Al", "Si", "P", "S", "Cl"];
export const CHARACTER = { Na: "Metal", Mg: "Metal", Al: "Metal", Si: "Metalloid", P: "Non-metal", S: "Non-metal", Cl: "Non-metal" };

export const thinkQs = [
  { q: "Why did Mendeleev leave gaps in his periodic table?", a: "He trusted that properties repeat in a pattern, so a gap meant an element not yet discovered. He even predicted their properties — later discoveries such as gallium and scandium supported several of them." },
  { q: "Why do elements in the same group often show similar chemical properties?", a: "They generally have similar valence-shell electronic configurations — the same number of outer electrons — so they react in similar ways." },
  { q: "How are sodium and chlorine useful in everyday life?", a: "Sodium chloride is common table salt (sodium compounds have many uses), and chlorine is used in controlled disinfection of drinking water and swimming pools." },
  { q: "Why does atomic radius generally decrease across a period?", a: "Electrons are added to the same shell while the nuclear charge rises, so the effective nuclear attraction grows and pulls the outer electrons closer." },
];

export const practice = [
  { q: "Locate magnesium (Z = 12): give its group, period and block.", a: "Group 2, Period 3, s-block (alkaline earth metal)" },
  { q: "Locate chlorine (Z = 17): give its group, period, block and family.", a: "Group 17, Period 3, p-block, halogen" },
  { q: "Locate iron (Z = 26): give its group, period and block.", a: "Group 8, Period 4, d-block (transition element)" },
  { q: "Which has the larger atomic radius, Na or Cl?", a: "Na — radius decreases across a period (186 pm vs 99 pm)" },
  { q: "Which generally has the higher ionisation enthalpy, Na or Mg?", a: "Mg — it generally increases across a period (738 vs 496 kJ/mol)" },
  { q: "Fluorine, chlorine, bromine, iodine: which is the most electronegative?", a: "Fluorine — electronegativity decreases down a group" },
];

export const tfItems = [
  { q: "The modern periodic table is based on atomic number.", a: true, why: "Moseley showed atomic number is the correct basis — this is the modern periodic law." },
  { q: "There are 18 periods in the modern periodic table.", a: false, why: "There are 7 periods (rows) and 18 groups (columns)." },
  { q: "Group 18 elements are generally called noble gases.", a: true, why: "He, Ne, Ar … are chemically unreactive noble gases." },
  { q: "Atomic radius generally increases down a group.", a: true, why: "Additional shells are added as you go down." },
  { q: "Iron is a p-block element.", a: false, why: "Iron is a d-block transition element (Group 8)." },
  { q: "Silicon is used as a semiconductor.", a: true, why: "Silicon is a p-block semiconductor used in chips and solar cells." },
];

export const flashcards = [
  ["Who proposed the Law of Triads?", "Döbereiner"],
  ["Who proposed the Law of Octaves?", "Newlands"],
  ["Who arranged elements mainly by atomic mass and predicted missing elements?", "Mendeleev"],
  ["The modern periodic table is based on which number?", "Atomic number"],
  ["Number of periods in the modern periodic table?", "Seven"],
  ["Number of groups in the modern periodic table?", "Eighteen"],
  ["Group 17 family name?", "Halogens"],
  ["Group 18 family name?", "Noble gases"],
  ["Iron belongs to which block?", "d-block"],
  ["Lanthanoids belong to which block?", "f-block"],
  ["Number of protons in an atom is called its?", "Atomic number"],
  ["Minimum energy needed to remove an electron from an isolated gaseous atom?", "Ionisation enthalpy"],
];

export const midQuizData = [
  { q: "Who left gaps in his table for undiscovered elements and predicted their properties?", options: ["Newlands", "Mendeleev", "Döbereiner", "Moseley"], correct: 1, explain: "Mendeleev left blank spaces and predicted properties of missing elements; gallium and scandium later supported him." },
  { q: "In a Döbereiner triad, the atomic mass of the middle element is approximately…", options: ["the sum of the other two", "double the lightest", "the average of the other two", "equal to the heaviest"], correct: 2, explain: "Li 6.94, Na 22.99, K 39.10 → (6.94 + 39.10) ÷ 2 = 23.02 ≈ 22.99." },
  { q: "Iron belongs to which block?", options: ["s", "p", "d", "f"], correct: 2, explain: "Iron is in Group 8 — a d-block transition element." },
  { q: "Atomic radius generally ______ across a period.", options: ["increases", "decreases", "stays the same", "doubles"], correct: 1, explain: "Nuclear charge rises while electrons enter the same shell, so effective nuclear attraction increases." },
  { q: "Which statement about periodic trends is correct?", options: ["They are absolute rules", "They are broad trends with exceptions", "They apply only to metals", "They apply only to Group 1"], correct: 1, explain: "Trends are general — e.g. Be and N have higher ionisation enthalpies than the next element." },
];

export const fullQuizData = [
  { chapter: "Modern periodic law", q: "The modern periodic law is based on:", options: ["Atomic mass", "Atomic number", "Density", "Melting point"], correct: 1, explain: "Properties of elements are periodic functions of their atomic numbers." },
  { chapter: "Groups and periods", q: "How many groups are in the modern periodic table?", options: ["7", "8", "18", "16"], correct: 2, explain: "The long-form table has 18 groups and 7 periods." },
  { chapter: "Families", q: "Halogens belong to which group?", options: ["1", "2", "17", "18"], correct: 2, explain: "F, Cl, Br, I … are Group 17." },
  { chapter: "Families", q: "Noble gases belong to which group?", options: ["16", "17", "18", "2"], correct: 2, explain: "He, Ne, Ar … are Group 18." },
  { chapter: "Scientists", q: "Who proposed the Law of Octaves?", options: ["Döbereiner", "Newlands", "Moseley", "Mendeleev"], correct: 1, explain: "Newlands noticed every eighth element showed similar properties." },
  { chapter: "Groups and periods", q: "A horizontal row in the periodic table is called a:", options: ["Group", "Period", "Block", "Family"], correct: 1, explain: "Rows are periods; columns are groups." },
  { chapter: "Blocks", q: "Iron belongs to which block?", options: ["s", "p", "d", "f"], correct: 2, explain: "Iron is a d-block transition element." },
  { chapter: "Trends", q: "Atomic radius generally ______ across a period.", options: ["increases", "decreases", "remains the same", "doubles"], correct: 1, explain: "Effective nuclear attraction increases across a period." },
  { chapter: "Scientists", q: "Who arranged elements mainly by atomic mass and predicted missing elements?", options: ["Moseley", "Newlands", "Mendeleev", "Döbereiner"], correct: 2, explain: "Mendeleev left gaps and predicted the properties of undiscovered elements." },
  { chapter: "Blocks", q: "Lanthanoids belong to which block?", options: ["s-block", "p-block", "d-block", "f-block"], correct: 3, explain: "Lanthanoids and actinoids are the f-block, usually shown separately below the main table." },
  { chapter: "Trends", q: "The minimum energy needed to remove an electron from an isolated gaseous atom is the:", options: ["Electron gain enthalpy", "Ionisation enthalpy", "Electronegativity", "Atomic radius"], correct: 1, explain: "That is the definition of ionisation enthalpy." },
  { chapter: "Scientists", q: "In a Döbereiner triad, the middle element's atomic mass is approximately:", options: ["the average of the other two", "the sum of the other two", "twice the first", "the same as the last"], correct: 0, explain: "That was Döbereiner's observation for groups such as Li, Na, K." },
];

export const examTips = [
  "Prepare a comparison table of scientists, their classification methods and limitations.",
  "Practise writing the modern periodic law accurately.",
  "Locate elements by group, period and block using a periodic table.",
  "Learn both the direction of periodic trends and the reasons behind them.",
  "Remember that general trends have exceptions; do not treat every trend as an absolute rule.",
];

export const chain = ["Atomic number", "Electron configuration", "Group & period", "Block (s p d f)", "Periodic trends", "Properties & uses"];
