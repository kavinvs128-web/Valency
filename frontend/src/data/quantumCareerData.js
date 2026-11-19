// ============================================================================
// QUANTUM MECHANICS OF AN ATOM — CAREER PAGE DATA
// ============================================================================
// VERIFICATION KEY — every object below carries a `verified` field:
//   "search"       = pulled from a live web search this session (Oct 2026),
//                    cite-able to a named source (Payscale / BLS / DST /
//                    PIB / an official exam notification).
//   "public-scale" = a fixed, published government pay scale or fellowship
//                    (7th CPC / UGC / CSIR / TIFR), not a market estimate.
//   "estimate"     = NOT independently verified. Built from general knowledge
//                    or from weak secondary sources (career blogs, tiny
//                    Glassdoor samples). Treat as a placeholder and
//                    re-verify before presenting to students as fact.
// All Indian figures are annual CTC in INR unless marked otherwise. "%"
// fields are 0–100 values for progress-bar UI — a rough relative-demand
// indicator, NOT an official statistic. USD→INR conversions are rough and
// rate-dependent; euro figures are left unconverted on purpose.
//
// Research pass: Oct 2026. Where sources disagree (common with Indian salary
// aggregators) the range is shown with both numbers instead of picking one.
// Rows carried over from the Sep 2026 Empirical-formula research pass say so
// in their note.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. UNDERGRADUATE COURSES
// ----------------------------------------------------------------------------
export const UG_COURSES = [
  {
    id: "bsc-physics",
    title: "B.Sc Physics (Hons)",
    subtitle: "3-4 yrs · Delhi University, Presidency, Loyola, St. Stephen's, Fergusson",
    entranceExams: ["CUET-UG", "College-specific merit"],
    duration: "3 years (4 with Honours/research add-on under NEP)",
    salary: "₹2.5L – ₹5L (fresher, direct job) — most graduates continue to M.Sc, where the real salary jump happens",
    salaryPercent: 38,
    verified: "estimate",
    verifiedNote:
      "NOT independently verified. No reliable India-specific fresher salary for a plain B.Sc Physics graduate surfaced in this research pass (salary aggregators mostly list roles that need an M.Sc or an engineering degree). Treat the range as a placeholder. What IS verified: the pathways after it — IIT JAM / M.Sc, then research roles (see PG and Jobs tabs).",
    whyBlurb:
      "Quantum numbers, orbital shapes and energy levels from this lesson are the first week of every atomic-physics and quantum-mechanics paper in a physics degree — the same n, l, m and spin, now with the Schrödinger equation behind them.",
    details: {
      topColleges: ["Miranda House (DU)", "St. Stephen's (DU)", "Presidency University Kolkata", "Loyola College Chennai", "Fergusson College Pune"],
      careerExits: ["M.Sc Physics (IIT JAM / CUET-PG)", "Research assistant", "Instrumentation / lab roles", "Teaching (B.Ed / NET)"],
      keySubjects: ["Quantum Mechanics", "Atomic & Molecular Physics", "Mathematical Methods", "Solid State Physics"],
      furtherStudy: ["M.Sc Physics", "Integrated PhD", "CSIR-NET (JRF)", "JEST / TIFR GS for PhD"],
    },
  },
  {
    id: "bsc-chemistry-physical",
    title: "B.Sc Chemistry (Physical / Analytical focus)",
    subtitle: "3-4 yrs · Delhi University, Presidency, Loyola, Fergusson, St. Xavier's",
    entranceExams: ["CUET-UG", "State CETs", "College-specific merit"],
    duration: "3 years (4 with Honours/research add-on under NEP)",
    salary: "₹3.5L – ₹8L (fresher) — wide variance: SalaryExpert cites ₹10.4L avg for 1–3 yrs, Payscale cites ₹3.5L avg entry-level",
    salaryPercent: 45,
    verified: "search",
    verifiedNote:
      "Carried over from the Sep 2026 research pass. SalaryExpert (2026): Analytical Chemist entry-level (1–3 yrs) avg ₹10,43,749/yr gross. Payscale India (2026): Analytical Chemist avg ₹4,00,000/yr, entry-level avg ₹3,50,000 (range ₹1.51L–₹6.08L). The two sources disagree by roughly 2–3x, likely different methodology (gross CTC surveys vs. self-reported base pay) — present as a range, not a single figure.",
    whyBlurb:
      "Electron configurations, shielding and energy levels are why elements react, absorb light and show up in a spectrometer the way they do — Physical Chemistry and spectroscopy build directly on this lesson.",
    details: {
      topColleges: ["Miranda House (DU)", "Presidency University Kolkata", "Loyola College Chennai", "St. Stephen's (DU)", "Fergusson College Pune"],
      careerExits: ["Analytical / spectroscopy chemist", "M.Sc Physical or Analytical Chemistry", "Quality-control roles", "Lab technician"],
      keySubjects: ["Quantum Chemistry", "Molecular Spectroscopy", "Analytical Chemistry & Instrumentation", "Inorganic Chemistry"],
      furtherStudy: ["M.Sc Chemistry (IIT JAM)", "CSIR-NET (JRF)", "Certifications in AAS / UV-Vis / NMR"],
    },
  },
  {
    id: "bs-ms-iiser",
    title: "BS-MS Dual Degree (IISER / NISER)",
    subtitle: "5 yrs · IISER Pune, Mohali, Kolkata, Bhopal, Thiruvananthapuram · NISER Bhubaneswar",
    entranceExams: ["IISER Aptitude Test (IAT)", "NEST (NISER / UM-DAE CEBS)", "JEE Advanced / KVPY-route (alternate)"],
    duration: "5 years",
    salary: "Stipend rather than salary: DST INSPIRE-SHE ₹80,000/yr (top 1% in Class 12 boards, plus alternate routes)",
    salaryPercent: 55,
    verified: "search",
    verifiedNote:
      "DST pages and Indian scholarship portals (2026 search) consistently cite INSPIRE-SHE at ₹80,000/yr for natural/basic sciences, for the top 1% of Class 12 board scorers (and some alternate qualifying routes) — but the split into cash vs. mentorship/attachment components varies by source and year, so check online-inspire.gov.in for the current terms. IAT 2026 was held on June 7, 2026 (3-hour CBT, 60 MCQs across Physics, Chemistry, Maths, Biology — Careers360). NEST 2026 was scheduled for June 6, 2026 for NISER and UM-DAE CEBS (261 seats; min. 60% in Class 12, 55% SC/ST — Careers360). Dates and cut-offs change every cycle; confirm on iiseradmission.in and nestexam.in.",
    whyBlurb:
      "This is the most research-heavy way to study the ideas in this lesson: quantum mechanics, atomic structure and spectroscopy are core courses from the first two years, with lab research built in.",
    details: {
      topColleges: ["IISER Pune", "IISER Mohali", "IISER Kolkata", "NISER Bhubaneswar", "IISER Thiruvananthapuram"],
      careerExits: ["PhD in India or abroad", "Research scientist", "Quantum / materials research", "Data science and tech roles"],
      keySubjects: ["Quantum Mechanics", "Chemical Bonding & Spectroscopy", "Statistical Mechanics", "Mathematical Methods"],
      furtherStudy: ["PhD (IISc, TIFR, IISERs, abroad)", "CSIR-NET (JRF)", "Industry R&D"],
    },
  },
  {
    id: "btech-ece-vlsi",
    title: "B.Tech Electronics & Communication (VLSI / Semiconductor focus)",
    subtitle: "4 yrs · IITs, NITs, BITS Pilani, IIIT Hyderabad, VIT",
    entranceExams: ["JEE Main + Advanced", "BITSAT", "State engineering CETs"],
    duration: "4 years",
    salary: "₹4L – ₹8L (fresher; some aggregators cite ₹4.8L – ₹10L; high-end claims up to ₹20L are not representative)",
    salaryPercent: 55,
    verified: "estimate",
    verifiedNote:
      "NOT confirmed from a primary salary source. Several career blogs (Futurense, SRM University, Beincareer) cite roughly ₹4–8 LPA for fresher semiconductor engineers, one aggregator ₹4.8–10 LPA — all secondary. Glassdoor's only process-engineer figure (≈₹11.5L) rests on 2 anonymous salaries and is not meaningful. A Micron Sanand graduate-technician posting listed pay as 'not disclosed'. What IS verified: demand — see the Industries tab (India Semiconductor Mission approvals).",
    whyBlurb:
      "Transistors, diodes and LEDs work because electrons in solids occupy allowed energy levels and gaps — the band picture is the n = 1, 2, 3 energy-level idea from this lesson scaled up to 10²³ atoms.",
    details: {
      topColleges: ["IIT Madras", "IIT Bombay", "IIIT Hyderabad", "BITS Pilani", "NIT Trichy"],
      careerExits: ["VLSI design / verification", "Fab process or equipment engineer", "Embedded & electronics R&D", "Higher studies (MS/M.Tech)"],
      keySubjects: ["Semiconductor Physics & Devices", "VLSI Design", "Digital & Analog Electronics", "Solid-State Electronics"],
      furtherStudy: ["M.Tech VLSI / Microelectronics (GATE)", "MS/PhD abroad", "Industry certifications (Cadence / Synopsys tools)"],
    },
  },
  {
    id: "btech-engineering-physics",
    title: "B.Tech Engineering Physics / Engineering Science",
    subtitle: "4 yrs · IIT Bombay, IIT Madras, IIT Kanpur, IIT Delhi (programme names vary)",
    entranceExams: ["JEE Main + Advanced"],
    duration: "4 years",
    salary: "Not reliably found — treat as an estimate: ₹6L – ₹14L at top IITs (campus-dependent)",
    salaryPercent: 62,
    verified: "estimate",
    verifiedNote:
      "NOT independently verified this session. Programme names and branch availability differ between IITs, and no per-branch placement figure was pulled. The range reflects general knowledge of top-IIT campus placements — re-verify against the official placement report of the specific institute before quoting it.",
    whyBlurb:
      "Engineering Physics is where quantum mechanics, optics, lasers and semiconductors are taught as engineering tools — the closest undergraduate degree to the 'quantum technology' careers on the Jobs tab.",
    details: {
      topColleges: ["IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Delhi", "IIT Hyderabad"],
      careerExits: ["Photonics / optics engineer", "Semiconductor R&D", "Quantum technology research", "MS/PhD abroad"],
      keySubjects: ["Quantum Mechanics", "Optics & Photonics", "Condensed Matter Physics", "Numerical Methods"],
      furtherStudy: ["M.Tech / MS (Photonics, VLSI, Materials)", "PhD", "GATE for PSU / M.Tech"],
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
        title: "M.Sc Physics / Chemistry (Atomic, Molecular & Spectroscopy focus)",
        desc: "2-year postgraduate degree where quantum mechanics becomes the main course — hydrogen atom, angular momentum, perturbation theory and molecular spectroscopy.",
        badges: ["IIT JAM", "CUET-PG"],
        salary: "Stipend/fee-waiver at IITs; direct-job pay ≈ ₹4L – ₹8L (estimate)",
        tag: "Research-track",
        verified: "estimate",
        verifiedNote:
          "NOT independently verified. IIT JAM eligibility (2026 cycle, per Careers360 listings): bachelor's degree with at least 55% (General/OBC-NCL) or 50% (SC/ST/PwD) at IIT Guwahati — other IITs may differ, so read the official brochure. The 2026 Physics JAM was reported for Feb 15, 2026 as a CBT run by IIT Bombay. The salary range is general knowledge, not a pulled figure.",
      },
      {
        title: "M.Tech VLSI / Microelectronics / Photonics / Materials",
        desc: "Specialises the quantum ideas into chip design, optical devices or advanced materials — the technical route into the new Indian fabs and photonics labs.",
        badges: ["GATE"],
        salary: "₹6L – ₹14L (estimate); GATE-qualified PSU entry far higher — see Exams tab",
        tag: "Industry-track",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — general knowledge of M.Tech-level pay bands. PSU CTC (₹12L–₹17.3L at IOCL-type PSUs) was verified in the Sep 2026 research pass, but that is for chemical/process roles, not semiconductor ones.",
        details: {
          topColleges: ["IIT Bombay", "IIT Madras", "IISc Bengaluru", "IIT Kanpur"],
          careerExits: ["Chip design / process engineer", "Photonics R&D", "Materials characterisation"],
          keySubjects: ["Semiconductor Device Physics", "Nanofabrication", "Optoelectronics"],
          furtherStudy: ["PhD", "MS abroad"],
        },
      },
      {
        title: "Quantum-technology specialisations (M.Tech / PhD)",
        desc: "Quantum computing, communication, sensing and quantum materials — the four thematic hubs of India's National Quantum Mission.",
        badges: ["GATE / JEST / institute test"],
        salary: "PhD fellowship ₹37,000–₹42,000/month at TIFR (see PhD row); industry pay not reliably available",
        tag: "Frontier research",
        verified: "search",
        verifiedNote:
          "National Quantum Mission: approved by the Union Cabinet on 19 April 2023; ~₹6,003.65 crore outlay for 2023-24 to 2030-31; four thematic hubs (quantum computing at IISc Bengaluru, communication, sensing & metrology, materials & devices). One secondary report puts sanctioned funds at ₹2,169.62 crore so far — the larger figure is the approved outlay, not money already released. Institutions named in sources: IISc Bangalore, IISER Pune's I-Hub Quantum Technology Foundation, TIFR (testing a 6-qubit processor with DRDO and TCS), IIT Madras. Specific M.Tech/PhD programme titles differ by institute and were not verified individually.",
      },
    ],
  },
  {
    group: "PhD",
    steps: [
      {
        title: "PhD in Physics / Chemistry / Materials / Quantum Science",
        desc: "4–6 years of original research; quantum mechanics is the daily grammar of atomic, molecular and materials experiments and theory.",
        badges: ["CSIR-NET (JRF)", "JEST", "TIFR GS", "GATE"],
        salary: "₹37,000/month fellowship → ₹42,000/month after registration/SRF → ₹9.6L–15L+ post-PhD (Scientist B / faculty entry)",
        tag: "Deep research",
        verified: "public-scale",
        verifiedNote:
          "CSIR-HRDG circular (checked Sep 2026): JRF ₹37,000/month rising to SRF ₹42,000/month (confirmed current for the June 2026 cycle) plus annual contingency and HRA. TIFR GS (2026-27 cycle notices, Oct 2026): PhD fellowship ₹37,000/month, enhanced to ₹42,000 after PhD registration, with hostel or HRA; Integrated PhD ₹25,000 in year 1 then ₹37,000; GS-2027 application deadline reported as 25 Oct 2026 and written test 13 Dec 2026 (secondary sources — confirm on tifr.res.in). Whether JEST scores are accepted for TIFR varies — check the official notice.",
      },
    ],
  },
  {
    group: "International",
    steps: [
      {
        title: "MS / PhD Abroad (Physics, Quantum Science, Materials, Semiconductor Engineering)",
        desc: "US, Germany, the Netherlands and the UK are the biggest destinations for semiconductor and quantum research.",
        badges: ["GRE (often optional)", "IELTS/TOEFL"],
        salary: "US physicist median $166,290 (BLS, May 2024); US materials scientist median $104,160 (BLS, May 2024)",
        tag: "Global track",
        verified: "search",
        verifiedNote:
          "U.S. Bureau of Labor Statistics Occupational Outlook Handbook (May 2024 data — the figures BLS lists): physicists median $166,290/yr (astronomers $132,170); employment projected +4% 2024–2034, ~1,800 openings/yr for physicists and astronomers combined, PhD typically needed for research roles. Materials scientists: $104,160. Third-party sites report newer May 2025 numbers (e.g. physicists ≈$172,250) that were not confirmed on bls.gov. See the Jobs Abroad tab for more.",
      },
    ],
  },
  {
    group: "MBA / Non-traditional",
    steps: [
      {
        title: "Deep-tech product, tech policy & science communication",
        desc: "Not every quantum-literate student becomes a lab researcher: product management, technology policy, patent analysis and science writing all value this background.",
        badges: ["CAT/MAT (MBA)", "Institute-specific"],
        salary: "₹8L – ₹20L+ (estimate)",
        tag: "Pivot",
        verified: "estimate",
        verifiedNote: "NOT independently searched. A career article (Futurense, 2026) notes quantum product, applications, educator and sales roles typically do not need a PhD, but it quotes no India salary for them.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 3. JOBS — INDIA
// ----------------------------------------------------------------------------
export const JOBS_INDIA = [
  {
    id: "spectroscopy-analytical-chemist",
    title: "Analytical / Spectroscopy Chemist",
    subtitle: "Runs AAS, UV-Vis, FTIR, NMR and mass-spec instruments — every technique reads electron or nuclear energy levels",
    employers: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Testing & QC laboratories", "CSIR labs"],
    qualifications: ["B.Sc Chemistry", "M.Sc Analytical Chemistry", "B.Pharm"],
    fresherSalary: "₹1.8L – ₹3.5L (Payscale QC chemist); analytical chemist avg ₹3.5L entry-level; SalaryExpert cites ₹10.4L — wide source variance",
    fresherPercent: 35,
    seniorSalary: "₹6L – ₹14L (8+ yrs)",
    seniorPercent: 60,
    verified: "search",
    verifiedNote:
      "Carried over from the Sep 2026 research pass. Payscale India (2026): Analytical Chemist avg ₹4L/yr, entry-level avg ₹3.5L (₹1.51L–₹6.08L); QC Chemist avg ₹3.06L, entry-level ₹1.87L. SalaryExpert cites much higher gross figures (analytical chemist entry ₹10.4L). Present as a wide range — the spread is the honest finding.",
    details: {
      dayToDay: ["Run and calibrate spectrometers (AAS, UV-Vis, FTIR, NMR)", "Interpret absorption/emission spectra", "Prepare standards and samples", "Document results to GMP/ISO standards"],
      growthPath: ["Analyst → Senior Analyst → Lab / QA Manager"],
      keySkills: ["Spectroscopy interpretation", "Calibration & uncertainty", "GMP documentation"],
    },
  },
  {
    id: "semiconductor-process-engineer",
    title: "Semiconductor Process / Fab Engineer",
    subtitle: "Works in chip fabrication or packaging — lithography, etch, deposition, yield",
    employers: ["Tata Electronics (Dholera, Jagiroad/Morigaon)", "Micron (Sanand)", "CG Power (Sanand)", "Global semiconductor firms' India teams"],
    qualifications: ["B.Tech ECE / Materials / Chemical", "M.Tech VLSI / Microelectronics", "M.Sc Physics / Chemistry"],
    fresherSalary: "Not reliably found — treat as an estimate: ₹4L – ₹8L (secondary blogs; some cite ₹4.8L–₹10L)",
    fresherPercent: 48,
    seniorSalary: "Not reliably found — estimate ₹15L – ₹35L+ for experienced fab engineers",
    seniorPercent: 72,
    verified: "estimate",
    verifiedNote:
      "Salary NOT verified: career blogs (Futurense, SRM University, Beincareer) cite ₹4–8 LPA fresher, Glassdoor has only a 2-salary sample (≈₹11.5L), and a Micron Sanand graduate-technician posting says 'salary not disclosed'. The senior range is general knowledge. DEMAND is verified though: PIB (Feb 2026) records 10 India Semiconductor Mission projects worth ₹1.60 lakh crore approved across 6 states as of Dec 2025; later secondary reports count 12–13 projects (~₹1.64 lakh crore) by May 2026. Micron's Sanand ATMP unit is listed at ₹22,516 crore; Tata-PSMC's Dholera fab is under construction.",
    details: {
      dayToDay: ["Monitor and tune deposition / etch / lithography steps", "Analyse wafer yield data", "Troubleshoot process excursions", "Cleanroom operations and documentation"],
      growthPath: ["Process Engineer → Senior Engineer → Module / Fab Manager"],
      keySkills: ["Semiconductor physics", "Statistics & yield analysis", "Cleanroom discipline"],
    },
  },
  {
    id: "photonics-optical-engineer",
    title: "Optical / Photonics Engineer",
    subtitle: "Designs and tests lasers, optical sensors, fibre links and imaging systems",
    employers: ["Defence & space labs (DRDO, ISRO)", "Optical-instrument makers", "Telecom & fibre companies", "Research institutes"],
    qualifications: ["B.Tech Engineering Physics / ECE", "M.Sc Physics (Optics)", "M.Tech Photonics"],
    fresherSalary: "₹3.1L – ₹6L (Payscale optical engineer: entry-level/early-career avg ≈₹4.75L)",
    fresherPercent: 45,
    seniorSalary: "≈₹10L (Payscale 90th percentile for optical engineers); one undated source cites ₹12.6L avg for photonics engineers",
    seniorPercent: 68,
    verified: "search",
    verifiedNote:
      "Payscale India (2026): Optical Engineer avg base ≈₹5.86L/yr, 10th–90th percentile ≈₹3.14L–₹10L; early-career avg ≈₹4.75L. A Coursera article cites ≈₹12.64L for 'photonics engineer' but gives no year or data source, and a JKKN blog lists ₹4.5–8L entry for optical/photonics — both weakly sourced, so Payscale is the anchor. No Payscale page for 'spectroscopist' or 'photonics engineer' specifically was found.",
    details: {
      dayToDay: ["Design and align optical setups", "Characterise lasers and detectors", "Model light propagation", "Write test and calibration procedures"],
      growthPath: ["Optical Engineer → Senior / Systems Engineer → R&D Lead"],
      keySkills: ["Optics & laser physics", "Python / MATLAB", "Optical-design software"],
    },
  },
  {
    id: "research-scientist-industry",
    title: "Research Scientist (R&D, industry or institute)",
    subtitle: "Investigates new materials, devices or methods — often with a PhD",
    employers: ["Industrial R&D centres", "Research institutes", "Universities", "Deep-tech startups"],
    qualifications: ["M.Sc + PhD", "M.Tech + PhD", "CSIR-NET (JRF) route"],
    fresherSalary: "₹3L – ₹6L entry (Payscale early-career research scientist avg ≈₹6.1L)",
    fresherPercent: 50,
    seniorSalary: "₹12L – ₹17L (Payscale experienced ≈₹12.2L, late-career ≈₹17L; wide band up to ≈₹30L)",
    seniorPercent: 72,
    verified: "search",
    verifiedNote:
      "Payscale India (2026): Research Scientist avg ≈₹8.2L/yr, 10th–90th percentile ≈₹3L–₹30L; early-career ≈₹6.08L, mid-career ≈₹8.9L, experienced ≈₹12.2L, late-career ≈₹17L (self-reported/modelled — treat as indicative). Payscale's physicist-specific page was unusable (NaN pay fields), so this generic title is used instead.",
    details: {
      dayToDay: ["Design and run experiments or simulations", "Analyse and publish data", "Write proposals and patents", "Supervise junior researchers"],
      growthPath: ["Research Scientist → Senior Scientist → Principal / Group Lead"],
      keySkills: ["Quantum / materials theory", "Experimental technique", "Scientific writing"],
    },
  },
  {
    id: "quantum-technology-role",
    title: "Quantum Technology Researcher / Engineer",
    subtitle: "Quantum computing, communication, sensing and materials — an emerging field",
    employers: ["IISc Bengaluru", "TIFR", "IISER Pune (I-Hub Quantum Technology Foundation)", "IIT Madras", "A small number of startups"],
    qualifications: ["PhD in Physics / EE / Materials (hardware, research)", "B.Tech/M.Tech CS + Qiskit-type skills (software roles)"],
    fresherSalary: "No reliable India salary dataset exists — see note",
    fresherPercent: 50,
    seniorSalary: "No reliable India salary dataset exists — see note",
    seniorPercent: 70,
    verified: "estimate",
    verifiedNote:
      "NO verified India salary. Glassdoor India shows tiny, low-confidence samples (one ≈₹1 lakh/yr entry; a 3-salary page ₹10,000–₹60,000/month), modelled ERI/SalaryExpert figures sit around ₹17–29L, and a CorpReady page quotes ₹9–18L entry with vague sourcing — they disagree by more than 10×, so none is used. A Futurense career article (2026) explicitly says it found no reliable sourced India salary dataset. What it does say: software, applications, product and business roles are the entry points that rarely need a PhD; hardware and error-correction research usually does; early Indian openings are mainly research/academic/national-lab positions plus a few startups; and public funding will not automatically create many private jobs. Check live job postings before promising pay.",
    details: {
      dayToDay: ["Build and test qubit or photonic hardware", "Develop quantum algorithms / software", "Run error-correction and benchmarking studies", "Write papers and grant reports"],
      growthPath: ["Research Associate → Scientist → Group Leader (hardware) · Quantum Software Engineer → Lead (software)"],
      keySkills: ["Quantum mechanics & linear algebra", "Python + Qiskit / Cirq / PennyLane", "Experimental physics or algorithms"],
    },
  },
  {
    id: "govt-research-scientist",
    title: "CSIR / DRDO / BARC / ISRO Scientist",
    subtitle: "Government research labs — Scientist 'B' track (7th Pay Commission, Level 10)",
    employers: ["CSIR labs", "DRDO", "BARC", "ISRO", "TIFR"],
    qualifications: ["M.Sc Physics/Chemistry + CSIR-NET (JRF)", "M.Tech / PhD (preferred for direct entry)"],
    fresherSalary: "₹9.6L – ₹12L (gross, Scientist 'B', Level 10, basic ₹56,100); DRDO gross ≈₹1L/month at joining per official recruitment ad",
    fresherPercent: 65,
    seniorSalary: "₹18L – ₹30L+ (senior Scientist levels — estimate)",
    seniorPercent: 82,
    verified: "search",
    verifiedNote:
      "Carried over from the Sep 2026 research pass. DRDO official recruitment advertisement (drdo.gov.in, 2026): Scientist-B is 7th CPC Level 10 (basic ₹56,100/month), with gross emoluments at joining (metro) around ₹1,00,000/month. BARC OCES/DGFS training stipend commonly cited at ₹74,000/month plus a ₹30,000 book allowance (secondary source). Senior Scientist levels were NOT re-searched.",
    details: {
      dayToDay: ["Original research and experiments", "Instrument and device development", "Publication & patent work", "Project proposal writing"],
      growthPath: ["Scientist B → Scientist C/D → Scientist E/F/G"],
      keySkills: ["Research methodology", "Quantum / atomic physics", "Grant / proposal writing"],
    },
  },
  {
    id: "lecturer",
    title: "Lecturer / Assistant Professor (Physics or Chemistry)",
    subtitle: "Teaches at UG/PG level in govt or private colleges and universities",
    employers: ["Govt/aided colleges", "Private universities", "Junior colleges (Class 11-12)"],
    qualifications: ["M.Sc + NET/SET", "PhD (for university posts)"],
    fresherSalary: "₹8.7L – ₹11.3L (gross; UGC Academic Level 10, basic ₹57,700)",
    fresherPercent: 62,
    seniorSalary: "₹20L – ₹31L+ (gross, Professor level)",
    seniorPercent: 85,
    verified: "public-scale",
    verifiedNote:
      "Carried over from the Sep 2026 research pass. UGC 7th Pay Commission Academic Level 10 basic pay ₹57,700/month (unchanged for 2026). Gross with DA+HRA+TA commonly cited at ₹1.05–1.25 lakh/month depending on city class; DA is revised twice yearly, so the exact gross figure drifts.",
    details: {
      dayToDay: ["Teaching UG/PG physics or chemistry", "Lab supervision", "Research (if in university)", "Exam evaluation"],
      growthPath: ["Assistant Professor → Associate Professor → Professor"],
      keySkills: ["Subject depth", "NET/SET clearance", "Publication record"],
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
    title: "US — Physics, Materials, Electronics & Quantum",
    entries: [
      {
        title: "Physicist",
        desc: "BLS is the authoritative source; a PhD is typically needed for research roles.",
        badges: ["PhD typically required", "F-1 OPT / H-1B routes"],
        salary: "$166,290 median (BLS, May 2024)",
        inrTag: "≈ ₹1.4Cr (rough, rate-dependent)",
        verified: "search",
        verifiedNote:
          "U.S. Bureau of Labor Statistics Occupational Outlook Handbook (May 2024 data): physicists median $166,290/yr; astronomers $132,170. Projected employment growth 4% (2024–2034), about as fast as average, with about 1,800 openings per year for physicists and astronomers combined. Third-party sites (e.g. WageDex) report a May 2025 physicist median of ≈$172,250 — not confirmed on bls.gov.",
      },
      {
        title: "Materials Scientist",
        desc: "Characterises and develops materials for electronics, energy and aerospace.",
        badges: ["Bachelor's / Master's / PhD by role", "BLS-tracked occupation"],
        salary: "$104,160 median (BLS, May 2024)",
        inrTag: "≈ ₹86L (rough, rate-dependent)",
        verified: "search",
        verifiedNote:
          "BLS Occupational Outlook Handbook, combined 'Chemists and Materials Scientists' page: materials scientists median $104,160 (May 2024); employment for chemists and materials scientists projected +5% 2024–2034 (faster than average). An older BLS OES table (May 2023) lists a median of $106,160 with 10th–90th percentile $64,130–$170,900 — the OOH figure is used as the headline.",
      },
      {
        title: "Electronics Engineer (semiconductor devices, photonics)",
        desc: "Figures shown come from sites that repackage BLS data — not read on bls.gov directly.",
        badges: ["Bachelor's degree typical", "Large semiconductor & defence demand"],
        salary: "≈ $130,220 median (May 2025, via third-party sites citing BLS)",
        inrTag: "≈ ₹1.1Cr (rough, rate-dependent)",
        verified: "search",
        verifiedNote:
          "Reported by several BLS-derived third-party sites (tradecareerpath.com and similar) for SOC 17-2072: May 2025 median ≈$130,220, 10th percentile ≈$81,840, 90th ≈$206,960, +6.2% projected 2024–2034. Because these are secondary, check the May 2025 OEWS table on bls.gov before quoting. No data was found for semiconductor processing technicians specifically.",
      },
      {
        title: "Quantum Software Engineer / Applications Scientist (entry-level)",
        desc: "A new, fast-moving field — US figures are directional benchmarks only.",
        badges: ["Qiskit / Cirq / PennyLane", "PhD rarely needed for software roles"],
        salary: "≈ $130,000 – $170,000 (software) · ≈ $115,000 – $150,000 (applications scientist)",
        inrTag: "≈ ₹1.1Cr – ₹1.4Cr (rough)",
        verified: "estimate",
        verifiedNote:
          "Compiled by The Quantum Insider from Glassdoor, ZipRecruiter and LinkedIn Salary Insights (early 2026) and relayed by a Futurense article — which itself calls them 'directional benchmarks, not definitive figures'. Not independently verified here. Global context from the same article: nearly 16,500 pure-play quantum workers in 2025 (QED-C), ~250,000 new quantum-sector jobs projected by 2030 (The Quantum Insider's own analysis).",
      },
    ],
  },
  {
    country: "Germany / Netherlands",
    flag: "🇩🇪",
    title: "Europe — Semiconductor & Photonics Industry",
    entries: [
      {
        title: "Semiconductor Engineer (design / systems / applications)",
        desc: "Germany pays the highest in Europe's semiconductor sector, followed by the Netherlands, the UK and France (WTW 2024).",
        badges: ["EU Blue Card (skilled workers)", "Master's degree common"],
        salary: "€61,000 (applications eng.) · €70,000 (senior hardware design) · €96,000 median (principal) — base pay",
        inrTag: "INR conversion varies with the euro rate — convert at the live rate",
        verified: "search",
        verifiedNote:
          "Payscale Germany (2026, self-reported estimates by job title, not physicist-specific): Applications Engineer, Semiconductor avg ≈€61,042; Senior Hardware Design Engineer (semiconductor skills) avg ≈€70,000 base; Principal Engineer, Semiconductor median ≈€96,000 base, ≈€119,000 for the experienced tier. WTW (May 2024 report) found semiconductor base pay pulls ahead of general tech pay in Germany from survey grade 11 and in the Netherlands from grade 14. No Dutch Payscale figures or ASML/Zeiss/Infineon-specific numbers were found, so none are quoted.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 5. INDUSTRIES
// ----------------------------------------------------------------------------
export const INDUSTRIES = [
  {
    id: "semiconductors-electronics",
    title: "Semiconductors & Electronics",
    desc: "Transistors, memory chips, LEDs and sensors all rely on electron energy levels and band structure. India is building domestic fabs and packaging plants: PIB (Feb 2026) lists 10 India Semiconductor Mission projects worth ₹1.60 lakh crore across 6 states as of December 2025, with later secondary reports counting 12–13 projects by May 2026.",
    companies: ["Tata Electronics", "Micron (Sanand)", "CG Power", "Tata-PSMC (Dholera)"],
  },
  {
    id: "lasers-photonics-telecom",
    title: "Lasers, Photonics & Telecommunications",
    desc: "A laser works because electrons drop between quantised energy levels and emit light of a fixed colour — the same jump you simulated in this lesson. Fibre-optic links, LiDAR and barcode scanners are built on that idea.",
    companies: ["DRDO & ISRO labs", "Optical-instrument manufacturers", "Telecom & fibre companies"],
  },
  {
    id: "analytical-spectroscopy",
    title: "Analytical & Spectroscopy Laboratories",
    desc: "Atomic absorption and emission, UV-Vis, FTIR and NMR identify substances by the characteristic energies at which their electrons or nuclei absorb or emit light. Testing labs in pharma, food, environment and forensics run them daily.",
    companies: ["Pharma QC labs", "CSIR labs", "NABL-accredited testing labs"],
  },
  {
    id: "solar-energy",
    title: "Solar & Energy Materials",
    desc: "A solar cell works when a photon gives an electron enough energy to cross a band gap. Choosing materials with the right energy gap is a quantum-mechanical problem. (Only installer-level job listings, ₹12,000–₹30,000/month at small regional firms, turned up in search — they do not represent cell-R&D pay.)",
    companies: ["Tata Power Solar", "Solar module manufacturers", "Battery & materials R&D labs"],
  },
  {
    id: "healthcare-imaging",
    title: "Healthcare Imaging & Diagnostics",
    desc: "MRI relies on the spin of hydrogen nuclei — a direct cousin of the electron spin quantum number m_s — and PET, X-ray and fluorescence methods depend on quantised transitions.",
    companies: ["Siemens Healthineers", "GE HealthCare", "Philips", "Hospital imaging departments"],
  },
  {
    id: "quantum-technology",
    title: "Quantum Technology",
    desc: "India's National Quantum Mission (approved 19 April 2023, ~₹6,003.65 crore for 2023-24 to 2030-31) funds four thematic hubs: quantum computing, communication, sensing & metrology, and materials & devices. The computing hub at IISc Bengaluru targets 20–50 physical qubits in 3 years, 50–100 in 5 years and 50–1000 in 8 years. Early openings are mainly research and academic.",
    companies: ["IISc Bengaluru", "TIFR", "IISER Pune (I-Hub)", "IIT Madras"],
  },
  {
    id: "advanced-materials-nano",
    title: "Advanced Materials & Nanotechnology",
    desc: "Quantum dots, 2D materials and catalysts get their properties from confined electrons and orbital overlap. Designing them means choosing which orbitals mix and where the energy levels sit.",
    companies: ["CSIR labs", "IISc & IIT materials groups", "Specialty-chemicals R&D"],
  },
];

// ----------------------------------------------------------------------------
// 6. SKILLS EMPLOYERS WANT + FREE RESOURCES
// ----------------------------------------------------------------------------
export const SKILLS = [
  {
    id: "quantum-foundations",
    color: "#fb923c",
    name: "Quantum Foundations & Fast Calculation",
    why: "Quantum numbers, orbital counts, nodes, electron configurations and the hydrogen-like formulas are the entry ticket — exams and interviews test them under time pressure.",
    topics: ["n, l, m_l, m_s allowed values", "2l + 1, n², 2n² counting", "Radial / angular / total nodes", "Aufbau, Pauli, Hund + exceptions"],
    priority: "High",
    percent: 92,
  },
  {
    id: "math-physics",
    color: "#22d3ee",
    name: "Maths: Calculus, Linear Algebra & Probability",
    why: "Quantum mechanics is written in the language of differential equations, complex numbers and linear algebra. IBM's free Basics of Quantum Information course recommends familiarity with basic linear algebra, complex numbers and elementary notation; NPTEL's atomic-structure course lists integral and differential calculus, first-order differential equations and matrix algebra.",
    topics: ["Vectors & matrices", "Complex numbers", "Differential equations", "Probability & statistics"],
    priority: "High",
    percent: 88,
  },
  {
    id: "spectroscopy-instruments",
    color: "#a78bfa",
    name: "Spectroscopy & Instrumentation Literacy",
    why: "Real data arrives as spectra: UV-Vis, FTIR, AAS, NMR. Being able to read what each peak says about energy levels is what turns textbook theory into lab skill.",
    topics: ["Absorption vs emission spectra", "Reading peaks and energy gaps", "Calibration & uncertainty", "Safe lab practice"],
    priority: "Medium",
    percent: 70,
  },
  {
    id: "python-quantum-software",
    color: "#4ade80",
    name: "Python & Quantum Software Tools",
    why: "Quantum software roles use Python with frameworks such as Qiskit, Cirq and PennyLane (per a 2026 Futurense career article); numerical modelling in Python also helps in semiconductor and materials simulation.",
    topics: ["Python + NumPy", "Qiskit / Cirq / PennyLane", "Plotting & data analysis", "Version control (Git)"],
    priority: "Medium",
    percent: 65,
  },
];

export const FREE_RESOURCES = [
  {
    name: "Chemistry: Atomic Structure and Chemical Bonding",
    provider: "NPTEL / SWAYAM (IIT Madras, Prof. K. Mangala Sunder)",
    type: "Video course",
    desc: "Covers the hydrogen atom, the Schrödinger equation and particle-in-a-box models — a direct next step after this lesson. Check nptel.ac.in for the current run; certificate exams may carry a fee.",
  },
  {
    name: "Atomic and Molecular Physics",
    provider: "NPTEL (IIT Kharagpur, Prof. Amal Kumar Das)",
    type: "Video course",
    desc: "Atomic structure, quantum numbers, the hydrogen atom and atomic spectra, from the Bohr–Sommerfeld model through to molecular spectroscopy.",
  },
  {
    name: "Basics of Quantum Information",
    provider: "IBM Quantum Learning (John Watrous)",
    type: "Online course",
    desc: "Four modules on single systems, multiple systems, quantum circuits and entanglement, with Qiskit exercises. The catalogue lists the duration inconsistently (5 vs 15 hours) — confirm the course page and its access terms.",
  },
  {
    name: "Lab or research internships",
    provider: "Local testing labs, IISER/IIT summer programmes, CSIR labs",
    type: "Internship",
    desc: "Even a short stint with a spectrometer or a physics research group teaches more than any video. Many institutes run summer research programmes — look for application windows early in the calendar year.",
  },
];

// ----------------------------------------------------------------------------
// 7. EXAMS
// ----------------------------------------------------------------------------
export const EXAMS = [
  {
    badge: "JEE",
    color: "#3b82f6",
    title: "JEE Main + Advanced",
    desc: "Gateway to IITs/NITs for Engineering Physics, ECE/VLSI, Materials and allied branches. Pattern as reported in the Sep 2026 research pass: 2 sessions/year (Jan + April), 300 marks, +4/-1 marking.",
    meta: ["Class 12", "National level", "Engineering entry"],
  },
  {
    badge: "IAT",
    color: "#10b981",
    title: "IISER Aptitude Test (IAT)",
    desc: "Single gateway to the 5-year BS-MS dual degree at the IISERs. IAT 2026 was held on June 7, 2026 as a 3-hour computer-based test with 60 MCQs across Physics, Chemistry, Maths and Biology. Eligibility years and minimum marks vary by source and institute — read the official brochure at iiseradmission.in.",
    meta: ["Class 12", "National level", "BS-MS entry", "2026 cycle done"],
  },
  {
    badge: "NEST",
    color: "#f59e0b",
    title: "NEST (NISER + UM-DAE CEBS)",
    desc: "Entrance test for the 5-year integrated M.Sc at NISER Bhubaneswar and UM-DAE CEBS Mumbai. NEST 2026 was scheduled for June 6, 2026 (CBT, 261 seats: 202 NISER + 59 CEBS). Eligibility: at least 60% in Class 12 (55% for SC/ST) and three of the four basic sciences in Classes 11–12. Confirm details on nestexam.in.",
    meta: ["Class 12", "National level", "Integrated M.Sc entry"],
  },
  {
    badge: "CUET",
    color: "#ec4899",
    title: "CUET-UG",
    desc: "Common entrance for central and state universities' B.Sc Physics and Chemistry programmes. As reported in the Sep 2026 pass, it changed materially for 2026: CBT-only, fewer subject choices (63 → 37), max 5 subjects per student, and every question compulsory.",
    meta: ["Class 12", "National level", "UG entry", "Changed for 2026"],
  },
  {
    badge: "JAM",
    color: "#8b5cf6",
    title: "IIT JAM (Physics / Chemistry)",
    desc: "Entry to M.Sc and integrated PhD at IITs. 2026 Physics JAM was reported for Feb 15, 2026 as a CBT run by IIT Bombay. At IIT Guwahati the minimum was 55% (General/OBC-NCL) or 50% (SC/ST/PwD) — other IITs may differ, so read each brochure.",
    meta: ["Post-UG", "National level", "M.Sc/PhD entry"],
  },
  {
    badge: "NET",
    color: "#06b6d4",
    title: "CSIR-NET (JRF)",
    desc: "Qualifies for PhD admission with fellowship (₹37,000/month JRF, confirmed current for 2026) and lectureship eligibility. The Chemical Sciences stream is unaffected by the new Joint CSIR-UGC-DBT exam (Life Sciences only).",
    meta: ["Post-PG", "National level", "Research/Teaching entry"],
  },
  {
    badge: "TIFR",
    color: "#ef4444",
    title: "TIFR Graduate School (GS)",
    desc: "PhD, Integrated PhD and M.Sc admissions at TIFR. GS-2027 notices report an application deadline of 25 October 2026 (11 PM) and a written test on Sunday, 13 December 2026; PhD fellowship ₹37,000/month rising to ₹42,000 after registration. Confirm on tifr.res.in — secondary sources were used here.",
    meta: ["Post-UG/PG", "National level", "PhD entry", "Deadline soon"],
  },
  {
    badge: "GATE",
    color: "#14b8a6",
    title: "GATE (Physics / Electronics / Chemistry / Materials)",
    desc: "Required for M.Tech admission with stipend and used by PSUs and some national labs for recruitment. BARC OCES/DGFS recruitment uses a valid GATE score (the 2026 window ran Dec 22, 2025 – Jan 31, 2026 per the Sep 2026 pass).",
    meta: ["Post-UG", "National level", "M.Tech/PSU entry"],
  },
];

// ============================================================================
// HONEST TALLY (research pass completed Oct 2026)
// ============================================================================
// "search"  (live-verified or carried from the Sep 2026 verified pass):
//   BS-MS/INSPIRE, B.Sc Chemistry, Quantum-technology PG step (NQM facts),
//   international PG step, Analytical chemist, Optical/Photonics engineer,
//   Research scientist, CSIR/DRDO/BARC scientist, 4 US/Europe abroad entries
//   (3 BLS-based + Germany Payscale).
// "public-scale": PhD fellowships (CSIR + TIFR), Lecturer (UGC 7th CPC).
// "estimate": B.Sc Physics, B.Tech ECE/VLSI, Engineering Physics, M.Sc and
//   M.Tech PG steps, MBA/pivot step, Semiconductor process engineer, Quantum
//   technology role (no reliable India salary anywhere), US quantum entry
//   figures.
//
// Biggest honest gaps: India fresher pay for semiconductor and quantum roles
// (only blogs / tiny Glassdoor samples exist); BLS physicist and materials
// figures are May 2024 (newer May 2025 numbers were only on third-party
// sites); IAT/NEST/TIFR dates came from news sites, not the official portals.
// ============================================================================
