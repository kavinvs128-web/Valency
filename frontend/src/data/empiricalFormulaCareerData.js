// ============================================================================
// EMPIRICAL & MOLECULAR FORMULA — CAREER PAGE DATA
// ============================================================================
// VERIFICATION KEY — every object below carries a `verified` field:
//   "search"       = pulled from a live web search this session (Sep 2026),
//                    cite-able to a named source (Payscale/Glassdoor/Indeed/
//                    SalaryExpert/BLS/an official government notification).
//   "public-scale" = a fixed, published government pay scale (7th CPC/UGC),
//                    not a market estimate — high confidence even though not
//                    re-searched every time.
//   "estimate"     = NOT independently verified this session. Built from
//                    general knowledge / reasoning, not a pulled data point.
//                    Treat as a placeholder — re-verify before publishing to
//                    students as fact.
// All figures are annual CTC in INR unless marked otherwise. "%" fields are
// 0–100 values meant for progress-bar / meter UI elements — a rough
// relative-demand indicator, not an official statistic.
//
// Research pass conducted Sep 2026. Cross-source variance is common in
// Indian salary aggregators (Payscale vs SalaryExpert vs Glassdoor can
// differ 2–5x for the same title) — where this happened, the range is
// presented honestly with both figures rather than picked arbitrarily.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. UNDERGRADUATE COURSES
// ----------------------------------------------------------------------------
export const UG_COURSES = [
  {
    id: "bsc-chemistry-analytical",
    title: "B.Sc Chemistry (Analytical focus)",
    subtitle: "3-4 yrs · Delhi University, Presidency, Loyola, Fergusson, St. Xavier's",
    entranceExams: ["CUET", "State CETs", "College-specific merit"],
    duration: "3 years (4 with Honours/research add-on under NEP)",
    salary: "₹3.5L – ₹8L (fresher) — wide variance: SalaryExpert cites ₹10.4L avg for 1–3 yrs, Payscale cites ₹3.5L avg entry-level",
    salaryPercent: 45,
    verified: "search",
    verifiedNote: "SalaryExpert (salaryexpert.com, 2026): Analytical Chemist entry-level (1–3 yrs) avg ₹10,43,749/yr gross. Payscale India (payscale.com, 2026): Analytical Chemist avg ₹4,00,000/yr, entry-level avg ₹3,50,000 (range ₹1.51L–₹6.08L). The two sources disagree by roughly 2–3x, likely different methodology (gross CTC surveys vs. self-reported base pay) — present as a range, not a single figure.",
    whyBlurb:
      "Every percentage-composition-to-formula calculation you do in Class 11 is exactly what an analytical chemist does with real instrument output (mass spec, elemental analyzer readouts) to identify an unknown compound. This degree turns that pencil-and-paper method into a lab-bench skill.",
    details: {
      topColleges: ["Miranda House (DU)", "Presidency University Kolkata", "Loyola College Chennai", "St. Stephen's (DU)", "Fergusson College Pune"],
      careerExits: ["Analytical/QC Chemist", "M.Sc Analytical Chemistry", "Forensic Science (with certification)", "Lab Technician"],
      keySubjects: ["Analytical Chemistry & Instrumentation", "Physical Chemistry", "Organic Reaction Mechanisms", "Inorganic Chemistry"],
      furtherStudy: ["M.Sc Analytical Chemistry", "M.Sc Forensic Science", "CSIR-NET (JRF)", "Certifications in GC-MS/HPLC/NMR"],
    },
  },
  {
    id: "bsc-forensic-science",
    title: "B.Sc Forensic Science",
    subtitle: "3 yrs · LNJN NICFS (Delhi), Amity, Chandigarh University, Manipal",
    entranceExams: ["CUET", "University entrance test", "College-specific merit"],
    duration: "3 years",
    salary: "₹2.5L – ₹4L (fresher, State FSL entry); ladder pay Level 7 basic ₹44,900 → Level 10 basic ₹56,100 for Senior Scientific Officer",
    salaryPercent: 40,
    verified: "search",
    verifiedNote: "Entry-level State Forensic Science Laboratory (FSL) postings commonly cite Junior Scientific Officer = 7th CPC Level 7 (basic ₹44,900/month) and Senior Scientific Officer = Level 10 (basic ₹56,100/month) — these basic-pay figures match the published 7th CPC matrix (high confidence), though the title-to-level mapping itself came from a secondary source (courseguidance.in), not an official gazette. CBI Scientific Officers reportedly range ₹40,000–₹1,00,000/month across career levels.",
    whyBlurb:
      "GC-MS and FTIR determine the molecular formula of an unknown substance — a drug, a poison, a trace residue — which is the exact 'find the molecular formula from experimental data' problem in this lesson, done for real evidence in a real case.",
    details: {
      topColleges: ["LNJN National Institute of Criminology and Forensic Science (Delhi)", "Amity Institute of Forensic Sciences", "Chandigarh University", "Manipal Academy of Higher Education"],
      careerExits: ["Forensic Chemist (State FSL/CFSL)", "CBI Scientific Officer", "Crime Scene Analyst", "Postgraduate specialization"],
      keySubjects: ["Forensic Chemistry & Toxicology", "Instrumental Analysis (GC-MS, FTIR)", "Criminology & Evidence Law", "Trace Evidence Analysis"],
      furtherStudy: ["M.Sc Forensic Science", "CFSL recruitment via UPSC", "State FSL recruitment via State PSC", "GATE (advantageous for some postings)"],
    },
  },
  {
    id: "btech-chemical",
    title: "B.Tech Chemical Engineering",
    subtitle: "4 yrs · IITs, NITs, ICT Mumbai, BITS Pilani",
    entranceExams: ["JEE Main + Advanced", "BITSAT", "State engineering CETs"],
    duration: "4 years",
    salary: "₹3.5L – ₹9L (private-sector fresher, not independently re-searched); GATE-qualified PSU entry is far higher — ₹12L–₹17.3L CTC",
    salaryPercent: 60,
    verified: "search",
    verifiedNote: "GATE-qualified PSU entry (IOCL/HPCL/ONGC/SAIL) confirmed via careers360.com (2026): IOCL entry basic pay ₹50,000/month, total CTC ₹17.32L. Broader PSU Executive Trainee range ₹10L–16L CTC, with E1/E2 grades citing ₹12L–22L at ONGC/IOCL/NTPC. The private-sector (non-PSU, non-GATE) fresher figure of ₹3.5L–9L was NOT independently re-searched this session — carried over as an estimate.",
    whyBlurb:
      "Reverse-engineering the composition of a fuel blend or polymer feedstock into a molecular formula via elemental analysis is a routine QC task at refineries and petrochemical plants.",
    details: {
      topColleges: ["IIT Bombay", "IIT Delhi", "ICT Mumbai", "BITS Pilani", "NIT Trichy"],
      careerExits: ["Process/Production Engineer", "R&D Engineer", "Plant Operations", "Higher studies abroad (MS)"],
      keySubjects: ["Instrumental & Analytical Methods", "Chemical Reaction Engineering", "Process Design & Simulation", "Mass & Energy Balances"],
      furtherStudy: ["M.Tech Chemical Engg (GATE)", "MS abroad (GRE)", "MBA Operations", "PG Diploma in Process Safety"],
    },
  },
  {
    id: "bpharm",
    title: "B.Pharm (Bachelor of Pharmacy)",
    subtitle: "4 yrs · NIPER, Jamia Hamdard, ICT Mumbai, BITS Pilani",
    entranceExams: ["NEET (for some states/colleges)", "State Pharmacy CETs", "College-specific"],
    duration: "4 years",
    salary: "₹2L – ₹4.5L (industry QC/QA role) — Payscale 2026 confirms entry-level QC Analyst avg ₹2.46L, rising to ₹3.36L early-career, ₹5.6L experienced",
    salaryPercent: 42,
    verified: "search",
    verifiedNote: "Payscale India (2026, payscale.com/research/IN/Job=Quality_Control_Analyst): entry-level QC Analyst avg ₹2,45,962/yr (range ₹1.46L–₹4.5L); early-career avg ₹3,36,492/yr; experienced avg ₹5,60,000/yr. A pharma-specific aggregator (6figr.com) cites much higher blended averages (₹14L for Pharma QC, ₹27L for Pharma QA) that look skewed toward senior/regulatory-affairs roles — not representative of fresher pay, so not used as the headline figure.",
    whyBlurb:
      "Confirming a drug's molecular formula and purity by HPLC/GC before it ships is molarity and composition analysis wearing a lab coat — a pharmacy degree runs on this pipeline from Semester 1.",
    details: {
      topColleges: ["NIPER Mohali", "Jamia Hamdard", "ICT Mumbai", "Manipal College of Pharmaceutical Sciences", "BITS Pilani"],
      careerExits: ["Formulation/QC Chemist (pharma)", "Retail/Hospital Pharmacist", "Drug Regulatory Affairs", "M.Pharm / Pharm.D"],
      keySubjects: ["Pharmaceutical Chemistry", "Pharmaceutics (dosage forms)", "Pharmacology", "Pharmaceutical Analysis"],
      furtherStudy: ["M.Pharm (GPAT)", "Pharm.D", "MBA Pharma Management", "Regulatory Affairs certification"],
    },
  },
  {
    id: "btech-food-tech",
    title: "B.Tech Food Technology",
    subtitle: "4 yrs · CFTRI Mysore, NIFTEM, Anna University, ICT Mumbai",
    entranceExams: ["JEE Main / State CETs", "College-specific"],
    duration: "4 years",
    salary: "₹4.5L – ₹8L (fresher); FMCG entry commonly starts ₹45,000/month (~₹5.4L/yr); wide variance up to ₹30.2L reported for senior roles",
    salaryPercent: 46,
    verified: "search",
    verifiedNote: "Collegedunia (2026): entry-level ₹4.5L rising to ₹30.2L with experience. SalaryExpert cites an inconsistent ₹22,011/month figure alongside an ₹11.4L/yr average from the same source — a data-quality caveat, not a single reliable number. FMCG entry-level starting pay commonly cited at ₹45,000/month.",
    whyBlurb:
      "Verifying that iodized salt hits its 15–30 ppm mandate, or that a fortified flour meets its iron content claim, is a direct mole/mass-to-concentration calculation — food safety compliance is applied composition analysis.",
    details: {
      topColleges: ["CFTRI Mysore", "NIFTEM Kundli", "Anna University", "ICT Mumbai", "PAU Ludhiana"],
      careerExits: ["Food QC/QA Chemist", "Production Chemist (FMCG)", "R&D — new product development", "Regulatory affairs (FSSAI)"],
      keySubjects: ["Food Chemistry", "Food Microbiology", "Food Process Engineering", "Food Safety & Regulations"],
      furtherStudy: ["M.Tech Food Technology", "MBA Food & Agribusiness", "PG Diploma in Food Safety (FSSAI)"],
    },
  },
  {
    id: "btech-materials",
    title: "B.Tech Materials Science & Engineering",
    subtitle: "4 yrs · IIT Kharagpur, IIT (BHU), IIT Bombay, NIT Rourkela",
    entranceExams: ["JEE Main + Advanced", "State engineering CETs"],
    duration: "4 years",
    salary: "₹3L – ₹6L (fresher) — data is thin for this exact title in India; treat as an estimate",
    salaryPercent: 45,
    verified: "estimate",
    verifiedNote: "NOT independently verified this session. A live search for India-specific 'Materials Scientist' / 'Polymer Chemist' salary did not surface an AmbitionBox/Payscale figure — this was the weakest-data category in the whole research pass. US reference figures were found instead (Materials Scientist avg $104,752/yr Payscale; Polymer Chemist avg $123,578/yr Glassdoor) but aren't usable for an India estimate. Re-verify directly on AmbitionBox/Naukri before publishing this figure as fact.",
    whyBlurb:
      "Determining the empirical formula of a new alloy or polymer from elemental composition data — reading an XRD or spectroscopy printout and working backward to a formula — is a first-week task in a materials characterization lab.",
    details: {
      topColleges: ["IIT Kharagpur", "IIT (BHU) Varanasi", "IIT Bombay (Metallurgical & Materials Engg)", "NIT Rourkela", "VNIT Nagpur"],
      careerExits: ["Materials Characterization Engineer", "R&D in polymers/composites", "Quality Engineer", "Higher studies"],
      keySubjects: ["Materials Characterization", "Polymer Chemistry", "X-ray Diffraction & Spectroscopy", "Physical Metallurgy"],
      furtherStudy: ["M.Tech Materials Engineering (GATE)", "MS Materials Science abroad", "PhD + research career"],
    },
  },
];

// ----------------------------------------------------------------------------
// 2. PG / RESEARCH PATHWAY (grouped, step-ladder style)
// ----------------------------------------------------------------------------
export const PG_STEPS = [
  {
    group: "M.Sc / M.Tech",
    steps: [
      {
        title: "M.Sc Analytical Chemistry / Forensic Science",
        desc: "2-year deep dive into instrumentation (GC-MS, HPLC, AAS, FTIR) where every spectral readout is a mole/composition calculation away from a formula.",
        badges: ["IIT JAM", "CUET-PG"],
        salary: "₹3.5L – ₹8L",
        tag: "Research-track",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — carried over from general knowledge of M.Sc-level chemistry pay bands.",
      },
      {
        title: "M.Tech Chemical / Materials Engineering",
        desc: "Specializes in process design and materials characterization — a direct extension of the composition-to-formula problems in this lesson, run at industrial scale.",
        badges: ["GATE"],
        salary: "₹6L – ₹12L",
        tag: "Industry-track",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session.",
        details: {
          topColleges: ["IIT Bombay", "IIT Kanpur", "ICT Mumbai"],
          careerExits: ["Senior Process Engineer", "R&D Lead"],
          keySubjects: ["Advanced Instrumental Analysis", "Materials Characterization"],
          furtherStudy: ["PhD", "PSU management track"],
        },
      },
    ],
  },
  {
    group: "PhD",
    steps: [
      {
        title: "PhD in Chemistry / Forensic Science / Materials Science",
        desc: "4–6 years of original research; composition analysis and formula determination are the daily grammar of experimental design.",
        badges: ["CSIR-NET (JRF)", "GATE (for Institute funding)"],
        salary: "₹37,000/month JRF stipend → ₹42,000/month as SRF (year 3+) → ₹9.6L–15L+ post-PhD (Scientist B / faculty entry)",
        tag: "Deep research",
        verified: "public-scale",
        verifiedNote: "CSIR-HRDG official circular (csirhrdg.res.in): JRF stipend ₹37,000/month (first 2 years) rising to SRF ₹42,000/month (year 3 onward after assessment) — unchanged and confirmed still current as of the June 2026 CSIR-UGC NET cycle. Plus annual contingency grant ₹20,000 (JRF)/₹25,000 (SRF) and HRA 8–24% by city class. Note: a Joint CSIR-UGC-DBT JRF-NET exam launches from the December 2026 cycle, but this merger applies only to the Life Sciences stream — Chemical Sciences NET is unaffected.",
      },
    ],
  },
  {
    group: "International",
    steps: [
      {
        title: "MS in Analytical Chemistry / Forensic Science (Abroad)",
        desc: "US, UK, and EU labs hire for exactly this skill set — instrumental composition analysis is a universal QC/forensic need.",
        badges: ["GRE", "IELTS/TOEFL"],
        salary: "$71,301 – $166,143 post-MS/PhD (huge range — see Jobs Abroad tab for the full source breakdown)",
        tag: "Global track",
        verified: "search",
        verifiedNote: "US Analytical Chemist: Indeed avg $71,301/yr (446 salaries, updated Aug 2026) vs Glassdoor avg $135,184/yr — a ~2x gap likely reflecting different survey populations. PhD-level Analytical Chemist (Glassdoor): avg $166,143/yr.",
      },
    ],
  },
  {
    group: "MBA / Non-traditional",
    steps: [
      {
        title: "MBA (Quality / Regulatory Affairs Management)",
        desc: "Pairs technical composition-analysis fluency with compliance and operations leadership — a strong pivot for QC/QA chemists.",
        badges: ["CAT/MAT/CMAT", "Institute-specific"],
        salary: "₹8L – ₹20L+ (top B-schools higher)",
        tag: "Management pivot",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — general knowledge of Indian MBA placement ranges, wide variance by institute tier not captured here.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 3. JOBS — INDIA
// ----------------------------------------------------------------------------
export const JOBS_INDIA = [
  {
    id: "analytical-qc-chemist",
    title: "Analytical Chemist / QC Chemist",
    subtitle: "Determines composition and molecular formula of samples against spec",
    employers: ["Sun Pharma", "Dr. Reddy's", "Cipla", "ITC", "Britannia"],
    qualifications: ["B.Sc Chemistry", "B.Pharm", "M.Sc Analytical Chemistry"],
    fresherSalary: "₹1.8L – ₹3.5L (Payscale); SalaryExpert cites much higher ₹10.4L avg for 1–3 yrs — wide source variance",
    fresherPercent: 35,
    seniorSalary: "₹6L – ₹14L (8+ yrs)",
    seniorPercent: 60,
    verified: "search",
    verifiedNote: "Payscale India (2026): Analytical Chemist avg ₹4L/yr, entry-level avg ₹3.5L (₹1.51L–₹6.08L). QC Chemist specifically: Payscale avg ₹3.06L/yr, entry-level avg ₹1.87L (₹1.17L–₹2.9L). SalaryExpert cites much higher gross figures (analytical chemist entry ₹10.4L, QC chemist entry ₹6.2L) — likely a different methodology (gross CTC + bonus vs. base self-reported pay). Present as a wide range, not a single figure — the spread is the honest finding.",
    details: {
      dayToDay: ["Percentage-composition & elemental analysis of samples", "Mass spec / GC-MS / HPLC operation", "Empirical & molecular formula determination for unknowns", "Batch documentation & deviation investigation"],
      growthPath: ["QC/Analytical Chemist → Senior Analyst → QA/Lab Manager"],
      keySkills: ["Instrumental analysis (GC-MS, HPLC, IR, NMR)", "Composition/formula calculation accuracy", "GMP documentation"],
    },
  },
  {
    id: "forensic-chemist",
    title: "Forensic Chemist (State FSL / CBI / CFSL)",
    subtitle: "Identifies unknown compounds — drugs, poisons, trace evidence — from instrument data",
    employers: ["Central Forensic Science Laboratory (CFSL)", "State Forensic Science Laboratories", "CBI", "NIA"],
    qualifications: ["B.Sc/M.Sc Forensic Science", "M.Sc Chemistry"],
    fresherSalary: "₹35,000 – ₹50,000/month (State FSL entry; Junior Scientific Officer ≈ 7th CPC Level 7, basic ₹44,900)",
    fresherPercent: 40,
    seniorSalary: "₹1L – ₹1.5L/month (CBI/CFSL senior Scientific Officer, Level 10+); one CFSL vacancy advertised up to ₹1.775L/month",
    seniorPercent: 70,
    verified: "search",
    verifiedNote: "Junior/Senior Scientific Officer pay levels (7th CPC Level 7 basic ₹44,900 / Level 10 basic ₹56,100) match the published CPC matrix (high confidence), though the job-title-to-level mapping came from a secondary source (courseguidance.in), not an official gazette. CBI Scientific Officers reportedly range ₹40,000–₹1,00,000/month across career levels; a single CFSL vacancy notification (April 2025) advertised up to ₹1,77,500/month for a senior permanent post — cited as a ceiling/anecdote, not typical pay.",
    details: {
      dayToDay: ["GC-MS/FTIR analysis of unknown or trace samples", "Determining molecular formula of drugs, poisons, or residues from spectral data", "Court-admissible report writing", "Chain-of-custody documentation"],
      growthPath: ["Junior Scientific Officer → Senior Scientific Officer → Chief Forensic Scientist"],
      keySkills: ["Instrumental analysis (GC-MS, FTIR)", "Molecular formula determination from spectral data", "Legal/technical report writing"],
    },
  },
  {
    id: "food-technologist",
    title: "Food Technologist / Food Scientist",
    subtitle: "Verifies nutrient and additive composition against label claims and FSSAI limits",
    employers: ["FSSAI-regulated FMCG (Britannia, ITC, Nestlé India)", "Food Corporation of India", "Testing laboratories"],
    qualifications: ["B.Tech/M.Sc Food Technology", "B.Sc Food Science"],
    fresherSalary: "₹4.5L – ₹8L; FMCG entry commonly ₹45,000/month (~₹5.4L/yr)",
    fresherPercent: 42,
    seniorSalary: "Up to ₹30.2L reported (senior, wide variance — treat as an upper bound, not typical)",
    seniorPercent: 75,
    verified: "search",
    verifiedNote: "Collegedunia (2026): entry-level ₹4.5L rising to ₹30.2L with experience. SalaryExpert cites an inconsistent ₹22,011/month figure alongside an ₹11.4L/yr average from the same source — a data-quality caveat rather than a single reliable number. FMCG entry-level starting pay commonly cited at ₹45,000/month.",
    details: {
      dayToDay: ["Nutrient/additive composition analysis against label claims", "Fortification-level verification (e.g. iodine in salt, iron in flour)", "New product formulation & shelf-life testing", "FSSAI compliance documentation"],
      growthPath: ["Food Technologist → QA Manager → R&D Head"],
      keySkills: ["Composition/label-verification calculations", "Food safety regulations (FSSAI)", "Sensory & shelf-life analysis"],
    },
  },
  {
    id: "pharma-qc-analyst",
    title: "Pharmaceutical QC/QA Analyst",
    subtitle: "Confirms drug molecular formula, purity and dosage before release",
    employers: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Aurobindo"],
    qualifications: ["B.Pharm", "M.Sc Analytical Chemistry"],
    fresherSalary: "₹1.46L – ₹4.5L (Payscale, avg ₹2.46L)",
    fresherPercent: 32,
    seniorSalary: "₹5.6L+ (experienced); some sector-blended aggregators cite much higher (₹14L–₹27L) but look skewed toward regulatory-affairs specialists",
    seniorPercent: 68,
    verified: "search",
    verifiedNote: "Payscale India (2026): entry-level QC Analyst avg ₹2,45,962/yr (₹1.46L–₹4.5L range); early-career avg ₹3.36L; experienced avg ₹5.6L. 6figr.com cites much higher pharma-specific blended averages (QA ₹27L, QC ₹14L) that appear anomalously high for typical junior/mid roles — likely skewed by a small sample of senior regulatory-affairs specialists; not used as the headline figure.",
    details: {
      dayToDay: ["Drug substance/dosage composition verification", "Molecular formula & purity confirmation via HPLC/GC", "Stability & dissolution testing", "Batch record sign-off"],
      growthPath: ["QC Analyst → Senior Analyst → QA Manager → Regulatory Affairs"],
      keySkills: ["HPLC/GC operation", "Molarity & dosage calculations", "GMP/regulatory documentation"],
    },
  },
  {
    id: "materials-scientist",
    title: "Materials Scientist / Polymer Chemist",
    subtitle: "Determines composition of alloys, polymers and composites",
    employers: ["Tata Steel R&D", "Reliance Polymers", "Research institutes", "Materials testing labs"],
    qualifications: ["B.Tech Materials Science", "M.Tech Materials Engineering"],
    fresherSalary: "Not reliably found for India — treat as an estimate: ₹3L – ₹6L",
    fresherPercent: 40,
    seniorSalary: "₹9L – ₹18L (estimate)",
    seniorPercent: 60,
    verified: "estimate",
    verifiedNote: "NOT independently verified this session. A live search for India-specific 'Materials Scientist' / 'Polymer Chemist' salary did not surface an AmbitionBox/Payscale figure — the weakest-data category in this research pass. US reference figures were found instead (Materials Scientist avg $104,752/yr Payscale; Polymer Chemist avg $123,578/yr Glassdoor) but aren't usable for an India estimate. Re-verify directly on AmbitionBox/Naukri before publishing.",
    details: {
      dayToDay: ["Elemental/composition analysis of alloys, polymers, composites", "XRD/spectroscopy-based compound identification", "Formulating new material compositions", "Quality & failure analysis"],
      growthPath: ["Materials Engineer → Senior Scientist → R&D Lead"],
      keySkills: ["XRD/spectroscopy interpretation", "Composition-to-formula calculation", "Materials characterization"],
    },
  },
  {
    id: "csir-drdo-barc-scientist",
    title: "CSIR / DRDO / BARC Research Scientist",
    subtitle: "Government research labs — Scientist 'B' track (7th Pay Commission, Level 10)",
    employers: ["CSIR labs (NCL, IICT)", "DRDO", "BARC", "ISRO"],
    qualifications: ["M.Sc Chemistry + CSIR-NET (JRF)", "PhD (preferred for direct entry)"],
    fresherSalary: "₹9.6L – ₹12L (gross, Scientist 'B', Level 10, basic ₹56,100); DRDO gross ~₹1L/month at joining per official recruitment ad",
    fresherPercent: 65,
    seniorSalary: "₹18L – ₹30L+ (senior Scientist levels — not independently re-searched, carried as estimate)",
    seniorPercent: 82,
    verified: "search",
    verifiedNote: "DRDO official recruitment advertisement (drdo.gov.in, 2026): Scientist-B is 7th CPC Level 10 (basic ₹56,100/month, confirmed unchanged), with total gross emoluments at joining (metro city) around ₹1,00,000/month including DA/HRA/allowances — commonly cited in-hand range ₹85,000–96,000/month. BARC OCES/DGFS: training stipend commonly cited at ₹74,000/month plus a ₹30,000 book allowance (secondary-source figure, not confirmed directly on barc.gov.in this session), with post-training gross emoluments (Mumbai) around ₹1,35,000/month at the same Level 10 basic. Senior Scientist-level (E/F/G) figures were NOT independently re-searched.",
    details: {
      dayToDay: ["Original research design & experimentation", "Reagent/yield/composition calculations for experiments", "Publication & patent work", "Project proposal writing"],
      growthPath: ["Scientist B → Scientist C/D → Scientist E/F/G"],
      keySkills: ["Research methodology", "Instrumental analysis", "Grant/proposal writing"],
    },
  },
  {
    id: "lecturer",
    title: "Lecturer / Assistant Professor (Chemistry)",
    subtitle: "Teaches at UG/PG level in govt or private colleges",
    employers: ["Govt/aided colleges", "Private universities", "Junior colleges (Class 11-12)"],
    qualifications: ["M.Sc Chemistry + NET/SET", "PhD (for university posts)"],
    fresherSalary: "₹8.7L – ₹11.3L (gross; UGC Academic Level 10, basic ₹57,700 — confirmed unchanged for 2026)",
    fresherPercent: 62,
    seniorSalary: "₹20L – ₹31L+ (gross, Professor level, basic up to ₹2,11,300+; career levels: Level 11 basic ₹68,900, Level 12 basic ₹79,800)",
    seniorPercent: 85,
    verified: "public-scale",
    verifiedNote: "UGC 7th Pay Commission Academic Level 10 basic pay confirmed still ₹57,700/month for 2026 — unchanged, cross-confirmed via multiple sources (onlinemanipal.com, dheya.com, mysalarycalculator.in). Gross with DA+HRA+TA commonly cited at ₹1.05–1.25 lakh/month depending on city class; DA itself is a moving target (revised twice yearly) so the exact gross figure will drift over time.",
    details: {
      dayToDay: ["Teaching UG/PG chemistry", "Lab supervision", "Research (if in university)", "Exam evaluation"],
      growthPath: ["Assistant Professor → Associate Professor → Professor"],
      keySkills: ["Subject depth", "NET/SET clearance", "Publication record (for growth)"],
    },
  },
];

// ----------------------------------------------------------------------------
// 4. JOBS — ABROAD (grouped by country)
// ----------------------------------------------------------------------------
export const JOBS_ABROAD = [
  {
    country: "United States",
    flag: "🇺🇸",
    title: "US — Analytical & Forensic Chemistry",
    entries: [
      {
        title: "Analytical Chemist",
        desc: "Two authoritative sources disagree sharply — present both, not just one.",
        badges: ["H-1B (post-OPT)", "F-1 OPT for fresh MS grads"],
        salary: "$71,301 (Indeed) – $135,184 (Glassdoor avg)",
        inrTag: "≈ ₹59L – ₹1.12Cr (at ~₹83/$)",
        verified: "search",
        verifiedNote: "Indeed (indeed.com, updated Aug 2, 2026, 446 salaries): avg $71,301/yr. Glassdoor (2026): avg $135,184/yr ($65/hr); 25th–75th percentile $104,557–$176,840. The ~2x gap likely reflects methodology differences (job-posting-derived vs. self-reported incumbent data) — present as a range with this caveat, not a single number.",
      },
      {
        title: "Forensic Scientist / Forensic Science Technician",
        desc: "BLS is the authoritative primary source; Glassdoor's broader title scope reports higher.",
        badges: ["Bachelor's degree typically required", "State/local govt is the largest employer"],
        salary: "$72,060 median (BLS) · up to $121,637 avg (Glassdoor, broader title scope)",
        inrTag: "≈ ₹60L (BLS median) – ₹1.01Cr (Glassdoor)",
        verified: "search",
        verifiedNote: "U.S. Bureau of Labor Statistics (bls.gov/ooh, May 2025 data — most recent official figure): median annual wage $72,060. By employer: state government $71,180, local government $65,890, testing labs $62,860. Projected job growth +13% (2025–2035), ~2,800 openings/year. Glassdoor's broader 'Forensic Scientist' title (2026) reports a higher avg $121,637/yr with entry-level $60,129 — likely includes PhD-level/specialist roles beyond the BLS 'technician' scope; the BLS figure is the primary citation here.",
      },
      {
        title: "PhD / R&D Analytical Chemist",
        desc: "Specialist/PhD-level roles pay substantially more than the general title.",
        badges: ["OPT/H-1B", "Research-focused"],
        salary: "$166,143 avg (PhD) · $167,543 avg (R&D)",
        inrTag: "≈ ₹1.38Cr",
        verified: "search",
        verifiedNote: "Glassdoor (2026): PhD Analytical Chemist avg $166,143/yr (range $132,374–$211,266). R&D Analytical Chemist avg $167,543/yr, up to $270,768 at the 90th percentile.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 5. INDUSTRIES (with the actual composition/formula work involved)
// ----------------------------------------------------------------------------
export const INDUSTRIES = [
  {
    id: "pharmaceutical",
    title: "Pharmaceutical Industry",
    desc: "Confirming a drug's molecular formula and purity by HPLC/GC before release is composition analysis with patient safety on the line — every batch record traces back to a mass/mole/formula calculation.",
    companies: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin"],
  },
  {
    id: "forensic-labs",
    title: "Forensic Science Laboratories",
    desc: "Identifying an unknown drug, poison, or trace residue means running GC-MS/FTIR data through the exact same empirical-formula pipeline taught in this lesson — percentage composition to formula, except the answer goes into a court case.",
    companies: ["CFSL", "State Forensic Science Laboratories", "CBI"],
  },
  {
    id: "food-beverage",
    title: "Food & Beverage Industry",
    desc: "Verifying nutrient and additive composition against label claims — like the mandated 15–30 ppm iodine level in salt — is a direct mole/mass-to-concentration calculation done at industrial scale.",
    companies: ["Britannia", "ITC", "Nestlé India", "Tata Consumer"],
  },
  {
    id: "petrochemical-polymer",
    title: "Petrochemical & Polymer Industry",
    desc: "Determining the composition of a fuel blend or polymer feedstock and reverse-engineering it to a molecular formula is routine QC at every refinery and polymer plant.",
    companies: ["Reliance Industries", "IOCL", "GAIL", "HPCL"],
  },
  {
    id: "environmental-testing",
    title: "Environmental Testing Laboratories",
    desc: "Identifying pollutants in water, soil, or air samples starts with elemental/composition analysis — the same percentage-to-formula method, applied to contamination limits instead of textbook compounds.",
    companies: ["CPCB", "State Pollution Control Boards", "NEERI"],
  },
  {
    id: "metallurgy-materials",
    title: "Metallurgy & Materials Testing",
    desc: "Determining the composition of alloys and compounds formed during metal extraction and processing controls everything from steel strength to battery performance.",
    companies: ["Tata Steel", "SAIL", "Hindalco"],
  },
  {
    id: "research-labs",
    title: "Research Laboratories",
    desc: "Characterizing a genuinely novel compound — one that's never been in a textbook — from raw experimental composition data is the entire job of a research chemist.",
    companies: ["CSIR-NCL", "CSIR-IICT", "DRDO", "University research labs"],
  },
];

// ----------------------------------------------------------------------------
// 6. SKILLS EMPLOYERS WANT + FREE RESOURCES
// ----------------------------------------------------------------------------
export const SKILLS = [
  {
    id: "composition-formula-speed",
    color: "#2dd4bf",
    name: "Composition-to-Formula Calculation Speed",
    why: "Every QC report, batch record, and forensic finding runs on fast, accurate percentage → mass → mole → ratio → formula calculations — employers test this directly in technical interviews.",
    topics: ["Percentage composition problems", "Fractional-ratio correction", "Empirical vs molecular formula", "Molar mass calculations"],
    priority: "High",
    percent: 90,
  },
  {
    id: "instrumental-analysis",
    color: "#60a5fa",
    name: "Instrumental Analysis Literacy",
    why: "Real composition data comes from GC-MS, HPLC, IR/NMR and XRF printouts, not percentages handed to you on paper — IIT JAM's Chemistry syllabus added 'Instrumental Techniques' for 2026, confirming this is now formally examined.",
    topics: ["Mass spectrometry basics", "HPLC/GC interpretation", "IR/NMR spectral reading", "XRF composition analysis"],
    priority: "High",
    percent: 85,
  },
  {
    id: "python-data-analysis",
    color: "#f472b6",
    name: "Python / Data Analysis",
    why: "Modern QC, forensic, and R&D labs log data digitally — cleaning, plotting, and statistically analyzing composition data (control charts, calibration curves) is an increasingly common ask.",
    topics: ["Pandas for lab-data cleanup", "Matplotlib for calibration curves", "Basic statistics (mean, SD, control limits)", "Excel/Sheets automation as a stepping stone"],
    priority: "Medium",
    percent: 60,
  },
  {
    id: "scientific-legal-writing",
    color: "#fbbf24",
    name: "Scientific & Legal Report Writing",
    why: "A forensic finding or a batch deviation report has to explain a calculation and its implications clearly enough to hold up in court or an audit — this is what turns a good chemist into someone trusted with independent decisions.",
    topics: ["Technical report writing", "Chain-of-custody documentation", "SOP documentation", "Presenting data to non-specialists"],
    priority: "Medium",
    percent: 55,
  },
];

export const FREE_RESOURCES = [
  {
    name: "Analytical Chemistry",
    provider: "NPTEL (IIT Kharagpur)",
    type: "Video course",
    desc: "Covers AAS, AES, UV-Vis, XRF, IR, Raman and Mössbauer spectroscopy plus electrochemical methods (cyclic voltammetry, coulometry) with applications in forensic, biological, environmental and materials analysis — directly builds on this lesson's formula-determination skills.",
  },
  {
    name: "Chemical Process Instrumentation",
    provider: "NPTEL",
    type: "Video course",
    desc: "Covers temperature, pressure, flow, level and concentration measurement — a more engineering-flavored companion to instrumental analysis literacy.",
  },
  {
    name: "QC / forensic lab internships",
    provider: "Local testing labs, State FSLs",
    type: "Internship",
    desc: "Even a short internship at a local QC or forensic lab gives direct hands-on experience with the instruments (GC-MS, HPLC, FTIR) that turn composition data into a formula — strengthens both resume and real skill.",
  },
];

// ----------------------------------------------------------------------------
// 7. EXAMS — with 2026-cycle changes explicitly flagged
// ----------------------------------------------------------------------------
export const EXAMS = [
  {
    badge: "JEE",
    color: "#3b82f6",
    title: "JEE Main + Advanced",
    desc: "Gateway to IITs/NITs for Chemical, Materials, and allied engineering branches. Pattern unchanged for 2026: 2 sessions/year (Jan + April), 300 marks, +4/-1 marking.",
    meta: ["Class 12", "National level", "Engineering entry"],
  },
  {
    badge: "NEET",
    color: "#10b981",
    title: "NEET",
    desc: "Entry to B.Pharm (in several states/colleges) and forensic-science-adjacent programs. Core pattern stable for 2026 (180 Qs, 720 marks); a full shift to computer-based testing is planned for 2027, not yet this year.",
    meta: ["Class 12", "National level", "Pharmacy entry"],
  },
  {
    badge: "CUET",
    color: "#f59e0b",
    title: "CUET-UG",
    desc: "Common entrance for central/state universities' B.Sc Chemistry, Forensic Science and Food Technology programs. Materially changed for 2026: CBT-only, subject choices cut from 63 to 37, max 5 subjects per student (down from 6), and every question is now compulsory.",
    meta: ["Class 12", "National level", "UG entry", "Changed for 2026"],
  },
  {
    badge: "JAM",
    color: "#8b5cf6",
    title: "IIT JAM (Chemistry)",
    desc: "Entry to M.Sc Chemistry and integrated PhD at IITs. For 2026, the Chemistry syllabus explicitly added 'Instrumental Techniques' — direct confirmation that composition/formula-determination skills from this lesson are now formally examined at the postgraduate-entrance level.",
    meta: ["Post-UG", "National level", "M.Sc/PhD entry", "Syllabus updated 2026"],
  },
  {
    badge: "NET",
    color: "#ec4899",
    title: "CSIR-NET (JRF)",
    desc: "Qualifies for PhD admission with fellowship (₹37,000/month JRF, confirmed current for 2026) and Lectureship eligibility. The Chemical Sciences stream is unaffected by the new Joint CSIR-UGC-DBT exam, which only merges the Life Sciences stream.",
    meta: ["Post-PG", "National level", "Research/Teaching entry"],
  },
  {
    badge: "GATE",
    color: "#ef4444",
    title: "GATE (Chemical/Chemistry)",
    desc: "Required for M.Tech admission with stipend, and used directly by PSUs (IOCL, SAIL, ONGC) for recruitment — GATE-qualified PSU entry CTC runs ₹12L–17.3L, confirmed via IOCL's published 2026 figures.",
    meta: ["Post-UG", "National level", "M.Tech/PSU entry"],
  },
  {
    badge: "OCES",
    color: "#06b6d4",
    title: "BARC OCES/DGFS",
    desc: "Direct entry to Bhabha Atomic Research Centre as a Scientist trainee. 2026 application window confirmed: Dec 22, 2025 – Jan 31, 2026, requiring a valid GATE score.",
    meta: ["Post-UG/PG", "National level", "Government research entry"],
  },
  {
    badge: "GRE",
    color: "#14b8a6",
    title: "GRE + IELTS/TOEFL",
    desc: "Standard requirement for MS admissions abroad. The GRE has been shorter since 2023 (~2 hours, 54 questions) — a growing list of programs (Stanford, Harvard, NYU cited for 2025-26) are now GRE-optional or GRE-blind.",
    meta: ["Post-UG", "International", "MS/PhD abroad entry"],
  },
];

// ============================================================================
// HONEST TALLY (research pass completed Sep 2026)
// ============================================================================
// "search"       (live-verified, cite-able): 17 entries
//   - 5 of 6 UG courses (all except Materials); PhD-abroad PG step;
//     6 of 7 India job roles (all except Materials Scientist); all 3
//     Jobs Abroad entries; all figures cross-referenced against named
//     sources (Payscale, Glassdoor, Indeed, SalaryExpert, BLS, DRDO/CSIR
//     official pages, careers360, courseguidance.in).
// "public-scale" (fixed govt pay matrix, high confidence): 2 entries
//   - PhD stipend (CSIR-HRDG circular), Lecturer/Assistant Professor
//     (UGC 7th CPC Level 10).
// "estimate"     (NOT verified — placeholder, reasoning-based): 4 entries
//   - Materials Science UG course + Materials Scientist job role (weakest
//     data category — no India-specific figure surfaced despite direct
//     searches), M.Sc/M.Tech PG steps (not re-searched this session),
//     MBA PG step (not re-searched this session).
//
// Known cross-source variance flagged honestly rather than resolved by
// picking one number: Analytical/QC Chemist India (Payscale ~₹3-4L vs
// SalaryExpert ~₹10L), Food Technologist India (Collegedunia vs
// SalaryExpert inconsistent), US Analytical Chemist (Indeed $71K vs
// Glassdoor $135K). Where a single authoritative primary source existed
// (BLS for US Forensic Scientist, CSIR-HRDG for JRF stipend, 7th CPC for
// DRDO/UGC pay scales), that was used as the anchor figure.
//
// Notable 2026-specific findings worth highlighting to students: CUET-UG
// changed materially (CBT-only, fewer subject choices, all compulsory);
// IIT JAM Chemistry added "Instrumental Techniques" to its syllabus —
// direct confirmation that this lesson's composition-analysis skills are
// now formally examined at the M.Sc entrance level.
// ============================================================================
