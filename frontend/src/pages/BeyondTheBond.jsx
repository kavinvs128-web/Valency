import { useState } from "react";
import {
  ArrowLeft,
  GraduationCap,
  Award,
  Briefcase,
  Plane,
  Factory,
  Lightbulb,
  Pencil,
  ChevronDown,
  Atom,
} from "lucide-react";
import "../styles/BeyondTheBond.css";
import valencyLogo from "../assets/valency-logo.svg";

/* ── Data ─────────────────────────────────────────────────────────────── */

const TABS = [
  { id: "ug", label: "UG Courses", icon: GraduationCap },
  { id: "pg", label: "PG / Research", icon: Award },
  { id: "jobsIndia", label: "Jobs — India", icon: Briefcase },
  { id: "jobsAbroad", label: "Jobs — Abroad", icon: Plane },
  { id: "industry", label: "Industries", icon: Factory },
  { id: "skills", label: "Skills", icon: Lightbulb },
  { id: "exams", label: "Exams", icon: Pencil },
];

const UG_COURSES = [
  {
    id: "ug1",
    title: "B.Sc Chemistry / B.Sc (Hons)",
    subtitle: "Central / State universities, IISc BS, IISER BS",
    exams: ["CUET", "IISER IAT", "State Exams"],
    duration: "3 years",
    salary: "₹3–6 LPA",
    pct: 35,
    why: "Core foundation in redox chemistry, electrochemistry, analytical methods. Gateway to M.Sc, CSIR-NET, GATE, and research careers.",
    details: [
      ["Top colleges", "IISc (BS), IISER Pune/Kolkata, Delhi University, BHU, Presidency College"],
      ["Career exits", "Lab analyst, quality chemist, teaching, M.Sc admission, CSIR-JRF, GATE"],
      ["Key subjects", "Electrochemistry, Thermodynamics, Analytical Chemistry, Organic synthesis"],
      ["Further study", "M.Sc Chemistry → Ph.D → Research scientist (₹8–25 LPA)"],
    ],
  },
  {
    id: "ug2",
    title: "B.Tech Chemical Engineering",
    subtitle: "IITs, NITs, BITS, top private colleges",
    exams: ["JEE Main", "JEE Advanced"],
    duration: "4 years",
    salary: "₹6–18 LPA",
    pct: 60,
    why: "Redox reactions are central to chemical reactors, refining, and process design. IIT grads get placed at ONGC, IOCL, Shell, BASF, and EV startups.",
    details: [
      ["Top colleges", "IIT Bombay, IIT Delhi, IIT Madras, IIT Kharagpur, NIT Trichy, BITS Pilani"],
      ["IIT package", "₹12–35 LPA (median IIT Bombay 2024: ₹22 LPA)"],
      ["Key subjects", "Chemical reaction engineering, Mass transfer, Electrochemical processes, Process control"],
      ["Top recruiters", "IOCL, HPCL, ONGC, Reliance, BASF, Dow Chemical, battery startups"],
    ],
  },
  {
    id: "ug3",
    title: "B.Pharm / Pharmacy",
    subtitle: "Pharmacy colleges, private / govt institutions",
    exams: ["NEET", "BITSAT", "State CET"],
    duration: "4 years",
    salary: "₹3–8 LPA",
    pct: 40,
    why: "Oxidation-reduction reactions underpin drug synthesis, stability testing, and formulation. India's pharma sector targets a $130B overall market size by 2030, with $50B of that from exports.",
    details: [
      ["Top colleges", "BITS Pilani Pharmacy, Jamia Hamdard, Manipal, JSS College of Pharmacy"],
      ["Top recruiters", "Sun Pharma, Dr. Reddy's, Cipla, Lupin, Abbott, Pfizer India"],
      ["Roles", "QC Analyst, Formulation Scientist, Regulatory Affairs, Medical Rep"],
      ["Higher study", "M.Pharm, MBA Pharma Management, Clinical Research PGD"],
    ],
  },
  {
    id: "ug4",
    title: "B.Tech Metallurgical / Materials Engineering",
    subtitle: "IITs, NITs — deeply redox-based field",
    exams: ["JEE Main", "JEE Advanced"],
    duration: "4 years",
    salary: "₹6–14 LPA",
    pct: 52,
    why: "Extraction of metals (iron, aluminium, copper) is entirely redox-driven — blast furnace, electrolysis. Steel, aluminium, and EV battery material sectors are booming.",
    details: [
      ["Top colleges", "IIT Bombay, IIT Kharagpur, IIT Madras, NIT Rourkela, NIT Warangal"],
      ["Top recruiters", "Tata Steel, SAIL, Hindalco, Vedanta, NALCO, JSW Steel"],
      ["Key subjects", "Pyrometallurgy, Hydrometallurgy, Electrometallurgy, Corrosion Science"],
      ["Emerging role", "Battery material engineer — Li-ion cathode/anode production (₹10–25 LPA)"],
    ],
  },
  {
    id: "ug5",
    title: "B.Tech Chemical & Electrochemical Engineering",
    subtitle: "CSIR-CECRI (admitted via JoSAA/TNEA)",
    exams: ["JEE Main", "TNEA"],
    duration: "4 years",
    salary: "₹5–12 LPA",
    pct: 45,
    why: "The most directly redox-focused engineering degree. CSIR-CECRI (Karaikudi) is India's only dedicated electrochemistry research institute. EV battery boom makes this extremely future-proof.",
    details: [
      ["Key institute", "CSIR-Central Electrochemical Research Institute (CECRI), Karaikudi, Tamil Nadu"],
      ["Roles", "Electrochemist, Corrosion Engineer, Battery Cell Engineer, Plating Specialist"],
      ["Govt jobs", "CSIR labs, DRDO, BARC, BHEL, BEL — via GATE score"],
      ["EV sector salary", "₹7–20 LPA (mid-level with PLI gigafactory demand)"],
    ],
  },
  {
    id: "ug6",
    title: "B.Tech Environmental Engineering",
    subtitle: "NITs, IITs, and environmental science colleges",
    exams: ["CUET", "JEE", "State exams"],
    duration: "4 years",
    salary: "₹4–10 LPA",
    pct: 38,
    why: "Water treatment uses oxidation (chlorination, ozonation). Environmental monitoring for redox-sensitive pollutants is a growing field with NGO, government, and private sector demand.",
    details: [
      ["Roles", "Environmental Chemist, ETP/STP Plant Engineer, Pollution Control Officer"],
      ["Employers", "CPCB, SPCB, NGOs, Suez, Veolia, municipal corporations, NTPC"],
      ["Govt route", "IFS (Indian Forest Service), CPCB scientist — via UPSC/state PSC"],
      ["Global scope", "UN Environment Programme, WHO, World Bank projects — Canada/Sweden especially"],
    ],
  },
];

const PG_STEPS = [
  {
    id: "pg-m",
    letter: "M",
    color: "purple",
    title: "M.Sc Chemistry / Electrochemistry — India",
    entries: [
      {
        id: "pg1",
        title: "M.Sc Chemistry — IIT / IISc / Central Universities",
        desc: "2-year advanced program. IIT JAM is the gateway. Covers physical, organic, inorganic, and electrochemistry at depth. CSIR-NET after this opens research fellowships of ₹37,000/month.",
        badges: ["IIT JAM", "CUET-PG", "University entrance"],
        salary: "₹5–15 LPA",
        tag: "after degree",
        details: [
          ["Top colleges", "IIT Bombay, IIT Madras, IISc Bangalore, IIT Delhi, Hyderabad University, JNU"],
          ["Fellowships", "CSIR-JRF: ₹37,000/month + HRA. DST-INSPIRE: ₹37,000/month for PhD"],
          ["After M.Sc routes", "CSIR-NET → PhD, GATE → M.Tech/PSU jobs, Industry analyst roles"],
          ["Industry salary", "Pharma QC: ₹4–8 LPA. R&D Scientist: ₹6–15 LPA. EV Electrochemist: ₹8–20 LPA"],
        ],
      },
      {
        id: "pg2",
        title: "M.Tech Chemical / Electrochemical Engineering",
        desc: "2-year engineering PG. GATE score required. IIT placement at ₹12–25 LPA. Deepens process engineering, reactor design, and battery systems knowledge.",
        badges: ["GATE Chemistry", "GATE ChE"],
        salary: "₹8–25 LPA",
        tag: "IIT placement avg.",
        details: [
          ["Top colleges", "IIT Bombay, IIT Madras, IIT Kharagpur, NIT Trichy, NIT Surathkal"],
          ["PSU via GATE", "IOCL, HPCL, ONGC, BPCL, NTPC, DRDO, BARC — starting ₹12–18 LPA + perks"],
          ["Specialisations", "Battery Technology, Green Hydrogen, Process Design, Corrosion Engineering"],
          ["Stipend during M.Tech", "₹12,400/month (GATE-qualified) from MHRD at IITs/NITs"],
        ],
      },
    ],
  },
  {
    id: "pg-p",
    letter: "P",
    color: "teal",
    title: "Ph.D and Research fellowships",
    entries: [
      {
        id: "pg3",
        title: "Ph.D Chemistry / Electrochemistry — IIT / IISc / CSIR Labs",
        desc: "5-year funded research. CSIR-JRF fellowship: ₹37,000–42,000/month. Topics include Li-ion batteries, green hydrogen electrolysis, CO₂ reduction, corrosion inhibitors, biosensors. Leads to Scientist-B/C in DRDO/BARC or academia.",
        badges: ["CSIR-JRF", "DST-INSPIRE", "UGC-JRF"],
        salary: "₹15–40 LPA",
        tag: "post PhD (industry)",
        details: [
          ["Hot research areas", "Solid-state batteries, Fuel cells, Green hydrogen via electrolysis, Electrocatalysis for CO₂ reduction, Wearable electrochemical sensors"],
          ["Govt scientist jobs", "DRDO Scientist-B: ~₹12 LPA (Level 10 basic ₹56,100/month). BARC Scientist-C: ₹18–22 LPA. CSIR Scientist: ₹14–20 LPA"],
          ["IIT faculty path", "PhD → Postdoc (2–3 yr) → Assistant Professor IIT: ₹14–18 LPA + research grants"],
          ["Industry R&D", "Tata Chemicals, Ola Electric, ISRO SPL, Amara Raja — Research Scientist: ₹12–30 LPA"],
        ],
      },
    ],
  },
  {
    id: "pg-i",
    letter: "I",
    color: "amber",
    title: "International postgraduate options",
    entries: [
      {
        id: "pg4",
        title: "M.S. / M.Sc Abroad — USA, Germany, UK, Australia",
        desc: "Study electrochemistry, materials science, or chemical engineering at top global universities. Funded PhD positions in Europe pay €1,400–2,500/month. USA PhD in Chemistry is almost always fully funded.",
        badges: ["GRE", "TOEFL/IELTS"],
        salary: "$70K–120K",
        tag: "USA salary post-MS/PhD",
        details: [
          ["Top USA universities", "MIT, Stanford, Caltech, UT Austin, Georgia Tech — for Electrochemistry/Materials"],
          ["Germany (free tuition)", "TU Munich, RWTH Aachen, KIT — nearly zero tuition. DAAD scholarship available"],
          ["UK options", "Imperial College, Oxford, Cambridge — competitive. Chevening / Commonwealth scholarships"],
          ["Erasmus+ / DAAD", "Fully funded exchanges for 6–24 months. Open to Indian students with B+ academic record"],
        ],
      },
      {
        id: "pg5",
        title: "M.S. Energy / EV Battery Technology — Europe",
        desc: "Germany and Netherlands lead in EV storage research. TU Delft (Netherlands), KIT (Germany) offer dedicated battery science programs. High demand from BASF, BMW, Volkswagen R&D labs post-graduation.",
        badges: ["Germany", "Netherlands", "Sweden"],
        salary: "€45K–75K",
        tag: "Europe salary",
      },
    ],
  },
  {
    id: "pg-mba",
    letter: "MBA",
    color: "pink",
    title: "Management and non-traditional routes",
    entries: [
      {
        id: "pg6",
        title: "MBA — Energy Management / Sustainability",
        desc: "B.Sc/B.Tech + 2 years work → MBA from IIM/XLRI/ISB. Moves you into leadership in energy companies, EV firms, consulting. Redox chemistry background is a strong differentiator for energy sector MBA roles.",
        badges: ["CAT", "GMAT (abroad)"],
        salary: "₹20–60 LPA",
        tag: "IIM/ISB average",
      },
      {
        id: "pg7",
        title: "Patent Agent / IP Law (Chemistry specialisation)",
        desc: "Chemistry graduates can become patent agents after passing the Indian Patent Office exam. Global pharma and chemical companies need chemistry-literate IP professionals. Very high salary growth potential.",
        badges: ["Patent Agent Exam", "LLB (optional)"],
        salary: "₹8–30 LPA",
        tag: "Patent law firms",
      },
    ],
  },
];

const JOBS_INDIA = [
  {
    id: "ji1",
    title: "Electrochemist / Cell Engineer — EV and Battery",
    subtitle: " Hottest redox career in India 2025. PLI scheme driving gigafactory demand.",
    employers: "Ola Electric, Exide Energy, Amara Raja, Tata Motors, ISRO SPL, Reliance New Energy",
    quals: ["B.Tech / M.Tech", "GATE"],
    fresher: "₹7–16 LPA",
    fresherPct: 55,
    senior: "₹20–40 LPA",
    seniorPct: 80,
    banner: "★ India's ACC PLI Scheme (₹18,100 crore) — engineers with electrochemistry + thermal modeling earn top tier ₹20+ LPA at mid-level",
    details: [
      ["What you do daily", "Design Li-ion cell chemistry, test charge-discharge cycles, optimize cathode/anode redox reactions, develop BMS algorithms, run electrochemical workstation experiments (CV, GCD, EIS)"],
      ["Cities hiring most", "Bengaluru, Pune, Chennai, Delhi-NCR, Hyderabad — Bengaluru leads for R&D roles"],
      ["Skills in demand", "Electrochemistry, COMSOL simulation, Python for data, Battery Management Systems (BMS), thermal modeling"],
      ["Growth path", "Electrochemist → Senior Cell Engineer → Battery Systems Lead → CTO (10–12 yrs)"],
    ],
  },
  {
    id: "ji2",
    title: "Scientist / Research Associate — DRDO / BARC / CSIR",
    subtitle: "Prestigious govt research. Redox at the heart of defence, nuclear, and energy research.",
    employers: "DRDO, BARC, CSIR-CECRI, CSIR-NCL, ISRO, CSIR-NIO",
    quals: ["CSIR-NET/JRF", "GATE", "BARC OCES"],
    fresher: "₹10–15 LPA",
    fresherPct: 45,
    senior: "₹20–35 LPA",
    seniorPct: 75,
    details: [
      ["DRDO Scientist-B", "Level 10 pay matrix: ₹56,100/month basic + DA + HRA + perks ≈ ₹11–13 LPA total. Apply via CEPTAM written test + interview"],
      ["BARC OCES", "For B.Tech/M.Sc in Chemistry, Metallurgy. 1-year training → Scientist-C: ₹18–22 LPA. Apply every January."],
      ["CSIR-CECRI 2026", "JRF: ₹37,000/month. Project Associate: ₹25,000–35,000/month. Research in battery materials, corrosion, electroplating."],
      ["Benefit", "Job security, subsidised housing, pension (NPS), research funding, international collaboration opportunities"],
    ],
  },
  {
    id: "ji3",
    title: "Process / Research Chemist — Pharma Industry",
    subtitle: "India is world's 3rd largest pharma producer. Redox = drug synthesis and stability.",
    employers: "Sun Pharma, Dr. Reddy's, Cipla, Lupin, Aurobindo, Divi's Laboratories",
    quals: ["M.Sc Chemistry", "B.Pharm"],
    fresher: "₹3–6 LPA",
    fresherPct: 30,
    senior: "₹12–20 LPA",
    seniorPct: 60,
    details: [
      ["Roles available", "QC Analyst, Process Chemist, API Scientist, Regulatory Affairs, Pharmacovigilance Expert, Formulation Scientist"],
      ["Where redox matters", "Oxidation-state monitoring in API synthesis, antioxidant formulation, reduction of nitro-groups in drug molecules, ROS assay in safety testing"],
      ["Sector outlook", "India pharma targets a $130B overall market by 2030, including $50B in exports. PLI scheme for pharmaceutical sector. High demand for Hyderabad, Ahmedabad, and Mumbai corridors."],
      ["Experienced salary", "Senior Research Scientist (8+ yrs): ₹15–25 LPA. Principal Scientist: ₹20–35 LPA"],
    ],
  },
  {
    id: "ji4",
    title: "Process Chemist / Engineer — Oil, Gas and Petrochemicals",
    subtitle: "Refining, cracking, and desulphurisation are all redox-driven industrial processes.",
    employers: "ONGC, IOCL, HPCL, BPCL, Reliance Industries, GAIL",
    quals: ["GATE", "B.Tech ChE"],
    fresher: "₹8–14 LPA",
    fresherPct: 48,
    senior: "₹18–35 LPA",
    seniorPct: 72,
    details: [
      ["PSU route (GATE)", "IOCL/HPCL/ONGC via GATE score + interview. Level 11 officer: ₹12–18 LPA starting + perks, housing, medical"],
      ["What redox work looks like", "Catalytic cracking (oxidation states of catalyst), hydrodesulphurisation (reduction of S-compounds), corrosion monitoring pipelines"],
      ["Private sector", "Reliance Jamnagar (world's largest refinery), HMEL, Nayara Energy — higher salary but no PSU benefits"],
      ["Senior roles", "Chief Refinery Engineer, Plant Manager (15+ yrs) — ₹30–60 LPA + profit sharing"],
    ],
  },
  {
    id: "ji5",
    title: "Metallurgist / Materials Scientist — Steel and Metals",
    subtitle: "Extraction, refining, and corrosion protection — all core redox applications.",
    employers: "Tata Steel, SAIL, JSW Steel, Hindalco, Vedanta, NALCO",
    quals: ["B.Tech Metallurgy", "GATE"],
    fresher: "₹5–10 LPA",
    fresherPct: 38,
    senior: "₹15–28 LPA",
    seniorPct: 65,
    details: [
      ["Roles", "Process Metallurgist, Corrosion Engineer, R&D Scientist, Quality Control, Battery Material Specialist"],
      ["Emerging demand", "Lithium, Cobalt, Nickel processing for EV batteries — India's critical mineral mission 2024 pushing domestic production"],
      ["SAIL Scientist", "SAIL recruits Metallurgists via GATE. R&D centre in Ranchi. Starting: ₹12–16 LPA + perks"],
      ["Corrosion niche", "Corrosion Engineer (oil/gas/infra) — high demand, niche, ₹10–25 LPA. Certification: NACE/AMPP adds value"],
    ],
  },
  {
    id: "ji6",
    title: "Environmental / Water Chemist",
    subtitle: "Oxidation used in water treatment, pollution monitoring, industrial effluent control.",
    employers: "CPCB, SPCB, Suez India, Veolia, WAPCOS, municipal corporations",
    quals: ["B.Sc / M.Sc", "UPSC/PSC"],
    fresher: "₹3–7 LPA",
    fresherPct: 28,
    senior: "₹10–20 LPA",
    seniorPct: 52,
    details: [
      ["Govt scientist route", "CPCB Scientist-B via UPSC: ₹56,100/month basic. Apply when UPSC notifies — usually 20–30 posts per year"],
      ["IFS (Forest Service)", "Chemistry graduates eligible for IFS (UPSC). Forest department environmental monitoring — ₹15+ LPA + bungalow"],
      ["Private ETP plants", "Effluent Treatment Plant (ETP) operators at factories, hotels, pharma — ₹3–8 LPA. Growing with green regulations"],
      ["UN / NGO route", "UN Environment Programme, TERI, CSE India — requires postgrad + fieldwork. ₹6–18 LPA internationally competitive"],
    ],
  },
  {
    id: "ji7",
    title: "Lecturer / Assistant Professor — Chemistry",
    subtitle: "Teach and inspire the next generation. CSIR-NET/UGC-NET is the key exam.",
    employers: "IITs, NITs, central universities, state colleges, Navodaya / Kendriya Vidyalaya",
    quals: ["UGC-NET/SET", "PhD preferred"],
    fresher: "₹6–9 LPA",
    fresherPct: 35,
    senior: "₹14–25 LPA",
    seniorPct: 62,
    details: [
      ["IIT Assistant Professor", "After PhD + postdoc: ₹1,01,500/month basic (Level 12). Research grants separately. Prestigious, high job security."],
      ["State college lecturer", "UGC-NET qualified: ₹57,700/month starting (7th pay commission). NPS pension, housing allowance."],
      ["KV / NV teacher", "PGT Chemistry via KVS/NVS exam: ₹47,600/month + allowances. Excellent work-life balance, central govt perks."],
      ["Research + teaching", "IIT/NIT faculty can earn ₹10–50L+ from research grants, consultancy, and industry collaboration annually"],
    ],
  },
];

const JOBS_ABROAD = [
  {
    id: "ja-us",
    flag: "🇺🇸",
    title: "United States — Battery, Pharma, and Research",
    entries: [
      { title: "Battery / EV Research Scientist", desc: "Tesla, Panasonic EV Energy, QuantumScape, Solid Power — Li-ion and solid-state battery research. PhD strongly preferred. Silicon Valley and Austin hubs.", badges: ["H-1B visa", "OPT after MS/PhD"], salary: "$80K–130K", tag: "≈ ₹67–108 LPA" },
      { title: "Pharma R&D Scientist", desc: "Pfizer, Merck, Abbvie, Eli Lilly — drug synthesis, QC, formulation. M.Sc + PhD. New Jersey and Boston pharma corridors.", badges: ["H-1B", "EB-2 NIW for PhD"], salary: "$130K–220K", tag: "≈ ₹108–183 LPA" },
      { title: "Postdoctoral Research Fellow", desc: "MIT, Stanford, Caltech, Argonne National Lab — funded positions. $65K–85K/year. Pathway to tenure-track faculty or industry senior scientist.", badges: ["J-1 visa", "Fully funded"], salary: "$65K–85K", tag: "Funded postdoc" },
    ],
  },
  {
    id: "ja-de",
    flag: "🇩🇪",
    title: "Germany — Chemical and EV Industry Leader",
    entries: [
      { title: "Research Chemist / Engineer — BASF, Covestro, Evonik, Bayer", desc: "World's largest chemical companies. Redox expertise in catalysis, electrocoating, battery materials. Near-zero tuition for studying in Germany first — strategic entry point.", badges: ["EU Blue Card", "German Work Visa"], salary: "€45K–75K", tag: "≈ ₹40–65 LPA" },
      { title: "Battery Engineer — BMW, Volkswagen, Bosch", desc: "German automotive electrification — massive battery R&D expansion post-2025. Munich, Stuttgart, Wolfsburg. M.Tech/M.Sc + 2 yrs experience preferred.", badges: ["EU Blue Card", "German Work Visa"], salary: "€50K–85K", tag: "≈ ₹44–74 LPA" },
    ],
  },
  {
    id: "ja-other",
    flag: "🌍",
    title: "Other major destinations",
    entries: [
      { title: "🇬🇧 United Kingdom — Imperial, Oxford, AstraZeneca, GSK", desc: "Pharma R&D corridor in Cambridge. Renewable energy research in Scotland. Chevening Scholarship for Indian students covers full tuition + living. Graduate Visa (2 yrs post-study work).", salary: "£35K–65K", tag: "≈ ₹37–68 LPA" },
      { title: "🇦🇺 Australia — CSIRO, Mining, and Renewable Energy", desc: "CSIRO actively recruits Indian chemistry PhD holders. Mining (redox in ore processing), solar fuels, and green hydrogen research. PR pathway via skilled migration. Subclass 482/189 visa.", salary: "AUD 80K–130K", tag: "≈ ₹44–71 LPA" },
      { title: "🇨🇭 Switzerland — Novartis, Roche, ETH Zurich Research", desc: "Highest salaries in Europe for chemists. ETH Zurich PhD positions: CHF 55,000/year. Roche/Novartis Basel: senior scientists earn CHF 100K–140K. Very competitive but highly rewarding.", salary: "CHF 80K–140K", tag: "≈ ₹76–133 LPA" },
      { title: "🇯🇵 Japan / 🇰🇷 South Korea — Samsung SDI, Panasonic, Toyota", desc: "Asia's battery giants. Samsung SDI and LG Energy Solution (Korea) pay in KRW, not JPY — figures here are for Japan only. Panasonic and Toyota (Japan) hire electrochemists globally. MEXT scholarship for Japan.", salary: "¥6M–12M (Japan only)", tag: "≈ ₹33–66 LPA" },
    ],
  },
];

const INDUSTRIES = [
  {
    title: "Extraction of Metals — Blast Furnace and Electrolysis",
    desc: "Iron extraction in blast furnace: Fe₂O₃ reduced by CO → Fe (reduction). Aluminium via Hall-Héroult electrolysis: Al³⁺ + 3e⁻ → Al. Copper refining via electrolytic purification. This is the core of India's steel (~₹9 lakh crore sector) and aluminium industries.",
    tags: ["Tata Steel", "SAIL", "NALCO", "Hindalco", "Vedanta"],
  },
  {
    title: "Batteries and Fuel Cells — Electrochemical Energy Storage",
    desc: "Li-ion batteries: LiCoO₂ cathode undergoes oxidation on charging, reduction on discharging. Fuel cells: H₂ → 2H⁺ + 2e⁻ (anode oxidation); O₂ + 4H⁺ + 4e⁻ → 2H₂O (cathode reduction). India's EV market to reach $100B+ by 2030. FAME-II and ACC PLI schemes together pumping ~₹29,600 crore into this sector.",
    tags: ["Ola Electric", "Exide Energy", "Amara Raja", "Tata Motors EV", "ISRO SPL"],
  },
  {
    title: "Chlor-Alkali Industry — Electrochemical Manufacturing",
    desc: "Electrolysis of brine (NaCl solution) to produce sodium hydroxide (NaOH), chlorine gas (Cl₂), and hydrogen gas (H₂). Cathode (reduction): 2H₂O + 2e⁻ → H₂ + 2OH⁻; Anode (oxidation): 2Cl⁻ → Cl₂ + 2e⁻. A massive global chemical sector that forms the backbone of detergents, papers, PVC, and water disinfection.",
    tags: ["GACL", "Tata Chemicals", "DCM Shriram", "Reliance"],
  },
  {
    title: "Electroplating and Surface Coatings",
    desc: "Metal ions reduced at cathode: Cu²⁺ + 2e⁻ → Cu. Used in automobile parts (chrome/nickel plating), jewellery, electronics (PCB copper plating), medical implants. India's electroplating industry: ₹12,000 crore+. CSIR-CECRI conducts dedicated research in this area.",
    tags: ["Auto industry", "Electronics", "Jewellery", "Aerospace"],
  },
  {
    title: "Manufacture of Nitric Acid — Ostwald Process",
    desc: "4NH₃ + 5O₂ → 4NO + 6H₂O (oxidation by Pt catalyst). 4NO + 3O₂ + 2H₂O → 4HNO₃. Critical for fertiliser (ammonium nitrate), explosives (defence), and dyes. India imports a significant share of its nitric acid requirements — domestic production is a priority sector.",
    tags: ["DFPCL", "Gujarat Narmada", "Chambal Fertilisers"],
  },
  {
    title: "Water Treatment and Environmental Monitoring",
    desc: "Chlorination: Cl₂ + H₂O → HOCl (oxidising agent kills pathogens). Ozonation: stronger oxidant, no chlorine by-products. COD (Chemical Oxygen Demand) testing uses redox titrations. India's Jal Jeevan Mission (₹3.6 lakh crore) — massive demand for water treatment engineers.",
    tags: ["Jal Jeevan Mission", "Suez", "Veolia", "WAPCOS"],
  },
  {
    title: "Bleaching Industry — Paper, Textile, and Food",
    desc: "H₂O₂ (oxidising bleach) decolourises textile dyes. NaOCl used in paper pulp bleaching. Sodium thiosulphate (reducing agent) removes excess chlorine. India's textile exports: ~$38B (FY24–25) — bleaching chemists in high demand in Surat, Tiruppur, Ludhiana corridors.",
    tags: ["Textile mills", "Paper mills", "IOCL chemicals"],
  },
  {
    title: "Petroleum Refining and Petrochemicals",
    desc: "Hydrodesulphurisation: removal of sulphur by reduction. Catalytic reforming: oxidation states of catalysts control octane rating. Reliance Jamnagar is the world's largest integrated refinery. Petrochemicals from naphtha cracking are redox-driven cascade reactions.",
    tags: ["Reliance", "ONGC", "IOCL", "HPCL", "BPCL"],
  },
];

const SKILLS = [
  {
    color: "purple",
    name: "Electrochemistry — Core Technical",
    why: "Non-negotiable for EV, CSIR, and DRDO roles",
    topics: ["Electrochemical cells", "Nernst equation", "Cell potential calculations", "Faraday's laws", "Electrolysis", "Corrosion mechanisms", "Cyclic Voltammetry (CV)", "EIS (Impedance spectroscopy)"],
    priority: "Very high",
    pct: 92,
  },
  {
    color: "teal",
    name: "Python / Data Analysis",
    why: "Separates ₹8L candidates from ₹18L candidates",
    topics: ["Python (NumPy, Pandas)", "Matplotlib for graphs", "Data fitting (scipy)", "Jupyter notebooks", "Origin Pro", "MATLAB basics", "Machine learning basics"],
    priority: "High",
    pct: 85,
  },
  {
    color: "amber",
    name: "Analytical and Instrumentation Skills",
    why: "Mandatory in pharma QC, DRDO, and CSIR roles",
    topics: ["UV-Vis Spectroscopy", "HPLC", "GC-MS", "NMR basics", "XRD / SEM", "Titration methods", "Electrochemical workstations", "Karl Fischer"],
    priority: "Very high",
    pct: 88,
  },
  {
    color: "blue",
    name: "Scientific Communication",
    why: "Required for research, patents, regulatory affairs",
    topics: ["Research paper writing", "Patent drafting basics", "Lab report writing", "Presentation (PPT/Beamer)", "LaTeX for thesis", "Regulatory writing (pharma)"],
    priority: "Moderate–High",
    pct: 78,
  },
];

const FREE_RESOURCES = [
  { color: "teal", title: "NPTEL (IIT courses — Free)", desc: "Electrochemistry by IIT Madras, Analytical Chemistry by IIT Bombay, Python for Engineers — all free on nptel.ac.in. Certificate exam: ₹1,000. Accepted by CSIR and industry recruiters." },
  { color: "purple", title: "Coursera / edX — MIT / Stanford Chemistry", desc: "MIT OpenCourseWare is completely free. Coursera audit mode is free. Financial aid available for certificates. Johns Hopkins, Imperial College electrochemistry courses online." },
  { color: "amber", title: "Research internships — CSIR and IIT labs", desc: "CSIR Integrated Skill Initiative, IIT summer research fellowships (SRFP), IISER research programs. Apply in January–February each year. Stipend: ₹5,000–20,000/month (some CSIR programs are unpaid). Resume gold." },
];

const EXAMS = [
  { badge: "JEE MAIN", color: "blue", title: "Joint Entrance Examination — Main", desc: "Gateway to NITs, IIITs, and CFTI colleges for B.Tech Chemical / Metallurgical / Environmental Engineering. Conducted twice a year (January and April) by NTA. 75% marks in Class 12 needed.", meta: ["Jan + Apr", "300 marks", "NITs / IIITs", "B.Tech admission"] },
  { badge: "JEE ADV.", color: "indigo", title: "JEE Advanced", desc: "For IIT admission in B.Tech Chemical, Metallurgical, and Environmental Engineering. Top 2.5 lakh JEE Main qualifiers eligible. IIT Chemistry/ChE packages: ₹12–35 LPA at placements.", meta: ["May/June", "23 IITs", "Top 2.5L eligible"] },
  { badge: "NEET UG", color: "red", title: "National Eligibility cum Entrance Test (UG)", desc: "For B.Pharm, MBBS — leads to pharma industry roles where redox chemistry is used in drug formulation and QC analysis. Conducted once yearly by NTA in May.", meta: ["May each year", "Medical / Pharma", "720 marks"] },
  { badge: "CUET", color: "green", title: "Common University Entrance Test", desc: "UG admission to central universities (Delhi, BHU, JNU etc.) for B.Sc Chemistry and Environmental Science. Also CUET-PG for M.Sc admissions. Conducted by NTA. Relatively easier than JEE.", meta: ["May–June", "Central universities", "B.Sc / M.Sc"] },
  { badge: "IIT JAM", color: "amber", title: "Joint Admission Test for M.Sc (IITs)", desc: "THE most important exam for B.Sc Chemistry graduates. Conducted by IITs for M.Sc / M.Sc-PhD / Joint M.Sc-PhD admission. Qualifying IIT JAM and getting into IIT M.Sc is a major career accelerator.", meta: ["February", "IITs + IISc", "For B.Sc grads", "Gateway to PhD"] },
  { badge: "CSIR-NET", color: "teal", title: "CSIR UGC NET — Chemical Sciences", desc: "For Junior Research Fellowship (JRF: ₹37,000/month) and Lectureship eligibility. JRF rank = PhD fellowship at any CSIR lab or university. Lectureship = eligible to teach in colleges. Conducted twice yearly.", meta: ["June + December", "JRF fellowship", "Lectureship", "CSIR labs"] },
  { badge: "GATE", color: "purple", title: "Graduate Aptitude Test in Engineering — Chemistry / Chemical Engg.", desc: "Opens PSU jobs (IOCL, HPCL, ONGC, DRDO, BARC — direct ₹12–18 LPA), M.Tech admission in IITs/NITs with stipend, and CSIR-JRF eligibility (GATE score accepted). Arguably the most valuable exam for industry-bound chemistry graduates.", meta: ["February", "PSU jobs", "M.Tech IIT", "DRDO/BARC", "₹12,400/mo stipend"] },
  { badge: "BARC OCES", color: "pink", title: "BARC Orientation Course for Engineering Graduates and Scientists", desc: "Direct entry to Bhabha Atomic Research Centre as Scientist/Engineer-C after 1 year training. For B.Tech/M.Sc in Chemistry, Metallurgy, Chemical Engineering. Apply every January. One of India's most prestigious science careers.", meta: ["January each year", "BARC Scientist-C", "₹18–22 LPA", "Govt housing + perks"] },
  { badge: "GRE", color: "gray", title: "Graduate Record Examination (for study abroad)", desc: "Required for MS/PhD applications in USA, Canada, and some UK universities. Chemistry subject GRE is an advantage for top US PhD programs. ETS conducts it year-round at test centres in Chennai, Delhi, Mumbai.", meta: ["Year-round", "USA/Canada/UK", "340 marks total", "MS/PhD abroad"] },
];

/* ── Small reusable pieces ────────────────────────────────────────────── */

function Badge({ children, color = "gray" }) {
  return <span className={`btb-badge btb-badge--${color}`}>{children}</span>;
}

function SalaryBar({ pct }) {
  return (
    <div className="btb-salary-bar">
      <div className="btb-salary-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Expand({ open, children }) {
  if (!open) return null;
  return <div className="btb-expand">{children}</div>;
}

function DetailGrid({ items }) {
  return (
    <div className="btb-detail-grid">
      {items.map(([label, val]) => (
        <div className="btb-detail-item" key={label}>
          <div className="btb-detail-label">{label}</div>
          <div className="btb-detail-val">{val}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */

export default function BeyondTheBond({ onBack, darkMode = true }) {
  const [activeTab, setActiveTab] = useState("ug");
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={darkMode ? "btb-root" : "btb-root light"}>
      {/* Topbar */}
      <div className="btb-topbar">
        <div className="btb-top-left">
          <div className="btb-logo-area">
            <img className="btb-logo-img" src={valencyLogo} alt="Valency" />
            <div className="btb-logo-sub">LEARN • BOND • MASTER</div>
          </div>
          <div className="btb-divider" />
          <div className="btb-page-title">
            <Pencil size={26} />
            <span>Class 11</span>
          </div>
        </div>
        <button className="btb-back-btn" onClick={onBack}>
          <ArrowLeft size={22} /> Back to Live Books
        </button>
      </div>

      {/* Hero */}
      <div className="btb-hero">
        <div className="btb-hero-chip">
          <Atom size={20} /> CLASS 11 CHEMISTRY — OXIDATION AND REDUCTION
        </div>
        <h1 className="btb-hero-title">
          Your Complete Career<br />
          <span>Roadmap After Class 12</span>
        </h1>
        <p className="btb-hero-sub">
          Every course, exam, job role, salary, and skill connected to redox chemistry — with
          figures checked against official sources where possible.
        </p>
        <div className="btb-hero-stats">
          <div className="btb-stat"><div className="btb-stat-num">40+</div><div className="btb-stat-label">Career paths</div></div>
          <div className="btb-stat"><div className="btb-stat-num">₹3L–₹80L</div><div className="btb-stat-label">Salary range in India</div></div>
          <div className="btb-stat"><div className="btb-stat-num">8</div><div className="btb-stat-label">Core industries</div></div>
          <div className="btb-stat"><div className="btb-stat-num">6</div><div className="btb-stat-label">Global destinations</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="btb-nav-tabs">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={activeTab === t.id ? "btb-tab active" : "btb-tab"}
              onClick={() => { setActiveTab(t.id); setExpandedId(null); }}
            >
              <Icon size={20} className="btb-tab-icon" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="btb-section">
        {/* UG COURSES */}
        {activeTab === "ug" && (
          <>
            <div className="btb-sec-title">Undergraduate courses after Class 12</div>
            <div className="btb-sec-desc">These degree programs directly use oxidation-reduction chemistry. Click any row to see details, required exams, and career outcomes.</div>
            <div className="btb-table-wrap">
              <div className="btb-table-header btb-col-4">
                <span>Course and College type</span><span>Entrance exam</span><span>Duration</span><span>Avg. starting salary</span>
              </div>
              {UG_COURSES.map((c) => (
                <div key={c.id}>
                  <div className="btb-table-row btb-col-4" onClick={() => toggle(c.id)}>
                    <div>
                      <div className="btb-row-main">{c.title} <ChevronDown size={20} className={expandedId === c.id ? "btb-arrow open" : "btb-arrow"} /></div>
                      <div className="btb-row-sub">{c.subtitle}</div>
                    </div>
                    <div>{c.exams.map((e) => <Badge key={e} color="gray">{e}</Badge>)}</div>
                    <div><Badge color="gray">{c.duration}</Badge></div>
                    <div><div className="btb-salary-text">{c.salary}</div><SalaryBar pct={c.pct} /></div>
                  </div>
                  <Expand open={expandedId === c.id}>
                    <div><b className="btb-accent">Why this course?</b> {c.why}</div>
                    <DetailGrid items={c.details} />
                  </Expand>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PG / RESEARCH */}
        {activeTab === "pg" && (
          <>
            <div className="btb-sec-title">Postgraduate and research pathways</div>
            <div className="btb-sec-desc">After your undergraduate degree, these are the paths that take you to senior research, leadership, and global roles.</div>
            <div className="btb-path-wrap">
              {PG_STEPS.map((step, si) => (
                <div className="btb-path-step" key={step.id}>
                  <div className="btb-path-line-col">
                    <div className={`btb-path-circle btb-pc-${step.color}`}>{step.letter}</div>
                    {si < PG_STEPS.length - 1 && <div className="btb-path-connector" />}
                  </div>
                  <div className="btb-path-body">
                    <div className="btb-path-title">{step.title}</div>
                    <div className="btb-path-entries">
                      {step.entries.map((e) => (
                        <div key={e.id}>
                          <div className="btb-path-entry" onClick={() => e.details && toggle(e.id)}>
                            <div className="btb-pe-left">
                              <div className="btb-pe-title">{e.title}{e.details && <ChevronDown size={18} className={expandedId === e.id ? "btb-arrow open" : "btb-arrow"} />}</div>
                              <div className="btb-pe-desc">{e.desc}</div>
                              {e.badges && <div className="btb-pe-badges">{e.badges.map((b) => <Badge key={b} color="purple">{b}</Badge>)}</div>}
                            </div>
                            <div className="btb-pe-right"><div className="btb-pe-salary">{e.salary}</div><div className="btb-pe-tag">{e.tag}</div></div>
                          </div>
                          {e.details && (
                            <Expand open={expandedId === e.id}>
                              <DetailGrid items={e.details} />
                            </Expand>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* JOBS INDIA */}
        {activeTab === "jobsIndia" && (
          <>
            <div className="btb-sec-title">Jobs in India — where redox chemistry is actively used</div>
            <div className="btb-sec-desc">Real roles, real companies. Click any row for details.</div>
            <div className="btb-table-wrap">
              <div className="btb-table-header btb-col-5">
                <span>Role and sector</span><span>Key employers</span><span>Qualification</span><span>Fresher salary</span><span>Senior salary</span>
              </div>
              {JOBS_INDIA.map((j) => (
                <div key={j.id}>
                  <div className="btb-table-row btb-col-5" onClick={() => toggle(j.id)}>
                    <div>
                      <div className="btb-row-main">{j.title} <ChevronDown size={20} className={expandedId === j.id ? "btb-arrow open" : "btb-arrow"} /></div>
                      <div className="btb-row-sub">{j.subtitle}</div>
                    </div>
                    <div><div className="btb-row-sub">{j.employers}</div></div>
                    <div>{j.quals.map((q) => <Badge key={q} color="blue">{q}</Badge>)}</div>
                    <div><div className="btb-salary-text">{j.fresher}</div><SalaryBar pct={j.fresherPct} /></div>
                    <div><div className="btb-salary-text">{j.senior}</div><SalaryBar pct={j.seniorPct} /></div>
                  </div>
                  <Expand open={expandedId === j.id}>
                    {j.banner && <div className="btb-banner-note">{j.banner}</div>}
                    <DetailGrid items={j.details} />
                  </Expand>
                </div>
              ))}
            </div>
          </>
        )}

        {/* JOBS ABROAD */}
        {activeTab === "jobsAbroad" && (
          <>
            <div className="btb-sec-title">Global career destinations for redox chemistry graduates</div>
            <div className="btb-sec-desc">Countries and companies hiring Indian chemistry and electrochemistry talent. Salaries in local currency with INR equivalent.</div>
            <div className="btb-path-wrap">
              {JOBS_ABROAD.map((step, si) => (
                <div className="btb-path-step" key={step.id}>
                  <div className="btb-path-line-col">
                    <div className="btb-path-circle btb-pc-blue">{step.flag}</div>
                    {si < JOBS_ABROAD.length - 1 && <div className="btb-path-connector" />}
                  </div>
                  <div className="btb-path-body">
                    <div className="btb-path-title">{step.title}</div>
                    <div className="btb-path-entries">
                      {step.entries.map((e, ei) => (
                        <div className="btb-path-entry btb-path-entry--static" key={ei}>
                          <div className="btb-pe-left">
                            <div className="btb-pe-title">{e.title}</div>
                            <div className="btb-pe-desc">{e.desc}</div>
                            {e.badges && <div className="btb-pe-badges">{e.badges.map((b) => <Badge key={b} color="gray">{b}</Badge>)}</div>}
                          </div>
                          <div className="btb-pe-right"><div className="btb-pe-salary">{e.salary}</div><div className="btb-pe-tag">{e.tag}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* INDUSTRIES */}
        {activeTab === "industry" && (
          <>
            <div className="btb-sec-title">Industrial applications of oxidation-reduction</div>
            <div className="btb-sec-desc">Every industry below uses redox chemistry as a core process — not a side subject.</div>
            <div className="btb-ind-list">
              {INDUSTRIES.map((ind, i) => (
                <div className="btb-ind-row" key={ind.title}>
                  <div className="btb-ind-num">{i + 1}</div>
                  <div className="btb-ind-body">
                    <div className="btb-ind-title">{ind.title}</div>
                    <div className="btb-ind-desc">{ind.desc}</div>
                    <div className="btb-ind-tags">{ind.tags.map((t) => <Badge key={t} color="amber">{t}</Badge>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <>
            <div className="btb-why-banner">
              <div className="btb-why-icon">🎯</div>
              <div>
                <div className="btb-why-title">What employers actually want in 2025</div>
                <div className="btb-why-text">Technical knowledge alone is not enough. These are the skills that separate candidates who get hired from those who don't — build them alongside your degree.</div>
              </div>
            </div>
            <div className="btb-skill-grid">
              {SKILLS.map((s) => (
                <div className="btb-skill-card" key={s.name}>
                  <div className="btb-skill-top">
                    <div className={`btb-skill-icon btb-sib-${s.color}`}><Lightbulb size={26} /></div>
                    <div><div className="btb-skill-name">{s.name}</div><div className="btb-skill-why">{s.why}</div></div>
                  </div>
                  <div className="btb-skill-topics">{s.topics.map((t) => <Badge key={t} color={s.color}>{t}</Badge>)}</div>
                  <div className="btb-prog-row">
                    <span className="btb-prog-label">Employer priority (editorial estimate)</span>
                    <div className="btb-prog-bar"><div className="btb-prog-fill" style={{ width: `${s.pct}%` }} /></div>
                    <span className="btb-prog-val">{s.priority}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="btb-free-box">
              <div className="btb-free-title">Free and low-cost ways to build these skills right now</div>
              <div className="btb-ind-list">
                {FREE_RESOURCES.map((r) => (
                  <div className="btb-ind-row btb-ind-row--compact" key={r.title}>
                    <div className={`btb-ind-num btb-ind-num--${r.color}`}>{r.title.startsWith("N") ? 1 : r.title.startsWith("C") ? 2 : 3}</div>
                    <div className="btb-ind-body"><div className="btb-ind-title">{r.title}</div><div className="btb-ind-desc">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* EXAMS */}
        {activeTab === "exams" && (
          <>
            <div className="btb-sec-title">Key entrance exams — complete reference</div>
            <div className="btb-sec-desc">Every exam you need to know, when to write it, and exactly what it opens for you as a redox chemistry student.</div>
            <div className="btb-exam-list">
              {EXAMS.map((ex) => (
                <div className="btb-exam-row" key={ex.badge}>
                  <div className="btb-exam-badge-box"><span className={`btb-exam-name-badge btb-badge--${ex.color}`}>{ex.badge}</span></div>
                  <div className="btb-exam-body">
                    <div className="btb-exam-title">{ex.title}</div>
                    <div className="btb-exam-desc">{ex.desc}</div>
                    <div className="btb-exam-meta">{ex.meta.map((m) => <Badge key={m} color="gray">{m}</Badge>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
