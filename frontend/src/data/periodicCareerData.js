// ============================================================================
// PERIODIC CLASSIFICATION OF ELEMENTS — CAREER PAGE DATA
// ============================================================================
// VERIFICATION KEY — every object below carries a `verified` field:
//   "search"       = pulled from a web search in the Nov 2026 research pass (or
//                    carried over from the Oct/Sep 2026 passes, which say so),
//                    cite-able to a named source (Payscale / BLS / PIB /
//                    steel.gov.in / an exam notification relayed by a news site).
//   "public-scale" = a fixed, published government pay scale or fellowship
//                    (7th CPC / UGC / CSIR), not a market estimate.
//   "estimate"     = NOT independently verified. Built from general knowledge
//                    or from weak secondary sources. Treat as a placeholder and
//                    re-verify before presenting to students as fact.
// All Indian figures are annual CTC / base pay in INR unless marked otherwise.
// "%" fields are 0–100 values for progress-bar UI — a rough relative indicator,
// NOT an official statistic. USD→INR conversions are rough and rate-dependent;
// euro figures are left unconverted on purpose.
//
// Research pass: Nov 2026. The BLS Occupational Outlook Handbook figures below
// were read from web-search summaries of bls.gov, not by opening the page, so
// they are tagged "search" with a note to confirm on bls.gov. Where Indian
// salary aggregators disagree (common — Payscale base pay vs Salary.com gross)
// both numbers are shown instead of picking one.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. UNDERGRADUATE COURSES
// ----------------------------------------------------------------------------
export const UG_COURSES = [
  {
    id: "bsc-chemistry",
    title: "B.Sc Chemistry (Hons)",
    subtitle: "3-4 yrs · Delhi University, Presidency, Loyola, St. Stephen's, Fergusson",
    entranceExams: ["CUET-UG", "College-specific merit"],
    duration: "3 years (4 with Honours/research add-on under NEP)",
    salary: "₹2L – ₹4.5L (fresher, direct job) — Payscale entry-level Chemist avg ≈₹2.4L; most graduates continue to M.Sc",
    salaryPercent: 30,
    verified: "search",
    verifiedNote:
      "Payscale India (2026 pages): entry-level Chemist avg base ≈₹2,39,284 (10th–90th percentile ₹1.27L–₹5.13L); entry-level Analytical Chemist avg ≈₹2.0L; entry-level QC Chemist avg ≈₹1.87L. Salary.com shows a much higher entry-level Chemist average (≈₹6.2L, April 2025) on a different methodology. An Oct 2026 pass on the Quantum page found Payscale analytical-chemist entry pay ≈₹3.5L on a different page — the sources and sample sizes move a lot, so read this as a range, not a promise.",
    whyBlurb:
      "Group and period position is how a chemist predicts what a compound will do before opening the bottle: the same trends in radius, ionisation enthalpy and electronegativity from this lesson run through inorganic, physical and analytical chemistry papers in every B.Sc.",
    details: {
      topColleges: ["Miranda House (DU)", "St. Stephen's (DU)", "Presidency University Kolkata", "Loyola College Chennai", "Fergusson College Pune"],
      careerExits: ["Analytical / QC chemist", "M.Sc Chemistry (IIT JAM / CUET-PG)", "Lab technician / research assistant", "Teaching (B.Ed / NET)"],
      keySubjects: ["Inorganic Chemistry (periodicity, d- and f-block)", "Physical Chemistry", "Analytical Chemistry", "Organic Chemistry"],
      furtherStudy: ["M.Sc Chemistry", "Integrated PhD", "CSIR-NET (JRF)"],
    },
  },
  {
    id: "btech-chemical",
    title: "B.Tech Chemical Engineering",
    subtitle: "4 yrs · IITs, NITs, ICT Mumbai, BITS Pilani, state engineering colleges",
    entranceExams: ["JEE Main + Advanced", "State engineering CETs", "BITSAT"],
    duration: "4 years",
    salary: "₹3L – ₹6L (fresher base) — Payscale entry-level Chemical Engineer avg ≈₹4.4L (10th–90th ₹1.8L–₹10L)",
    salaryPercent: 48,
    verified: "search",
    verifiedNote:
      "Payscale India (2026 pages, base salary): entry-level Chemical Engineer avg ≈₹4,35,553 (10th percentile ≈₹1.82L, 90th ≈₹10L); early-career ≈₹4,22,322; the Chemical Process Engineer sub-title averages lower (≈₹3.03L) and Chemical Engineer R&D lower still (≈₹2.35L). City pages differ a lot (Bangalore ≈₹5L, Mumbai ≈₹4.1L) on small samples. A CorpReady page quotes ₹4L–₹12L for 0–2 yrs but is a weaker aggregator, so Payscale is the anchor. Campus placements at top IITs sit well above this base-pay survey figure — check each institute's placement report.",
    whyBlurb:
      "Chemical engineers choose reactants, catalysts and reactor materials by element behaviour: why chlorine and bromine behave alike, why nickel and platinum work as catalysts, why some metals corrode. That is periodic classification used as an engineering tool.",
    details: {
      topColleges: ["IIT Bombay", "IIT Madras", "IIT Kanpur", "ICT Mumbai", "NIT Trichy"],
      careerExits: ["Process / plant engineer", "Petrochemical & specialty-chemicals roles", "Pharma process engineer", "M.Tech / MS / MBA"],
      keySubjects: ["Chemical Reaction Engineering", "Thermodynamics", "Mass & Heat Transfer", "Process Control"],
      furtherStudy: ["M.Tech (GATE)", "MS/PhD abroad", "MBA (CAT)", "PSU recruitment via GATE"],
    },
  },
  {
    id: "btech-metallurgy",
    title: "B.Tech Metallurgical & Materials Engineering",
    subtitle: "4 yrs · IIT Bombay, IIT Kharagpur, IIT Madras, IIT BHU, NIT Rourkela, NIT Trichy (programme names vary)",
    entranceExams: ["JEE Main + Advanced", "State engineering CETs"],
    duration: "4 years",
    salary: "₹3L – ₹5.6L (fresher base) — Payscale entry-level Metallurgical Engineer avg ≈₹3.0L; Materials Engineer entry ≈₹4.4L",
    salaryPercent: 42,
    verified: "search",
    verifiedNote:
      "Payscale India (2026 pages, self-reported base pay): entry-level Metallurgical Engineer avg ≈₹3,02,588 (10th–90th percentile ≈₹1.21L–₹9.86L); early-career ≈₹3,56,054. Entry-level Materials Engineer avg ≈₹4.4L (₹1.5L–₹10L); early-career ≈₹5.6L. Physics Wallah (an education site) cites ₹4–9L for metallurgy engineers and ≈₹3.4L for entry-level materials engineers. Programme names and intake differ between IITs/NITs and were not checked institute by institute.",
    whyBlurb:
      "Steel, aluminium, copper alloys and battery metals are all chosen using periodic-table logic: d-block transition metals for strength and catalysis, Group 1 and 2 for light reactive metals, Group 14 for semiconductors. This course turns those trends into stronger, cheaper materials.",
    details: {
      topColleges: ["IIT Bombay", "IIT Kharagpur", "IIT Madras", "IIT (BHU) Varanasi", "NIT Rourkela"],
      careerExits: ["Steel / metals plant metallurgist", "Materials characterisation & quality", "Battery & energy-materials R&D", "MS/PhD in materials"],
      keySubjects: ["Physical Metallurgy", "Extractive Metallurgy", "Materials Characterisation", "Corrosion & Failure Analysis"],
      furtherStudy: ["M.Tech Materials / Metallurgy (GATE)", "MS/PhD abroad", "PSU recruitment via GATE"],
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
      "Carried over from the Oct 2026 research pass (Quantum page). DST pages and Indian scholarship portals consistently cite INSPIRE-SHE at ₹80,000/yr for natural/basic sciences, for the top 1% of Class 12 board scorers (and some alternate routes); the cash vs. mentorship split varies by source and year, so check online-inspire.gov.in for current terms. IAT 2026 was held on June 7, 2026 and NEST 2026 on June 6, 2026. The 2027 cycle dates were NOT searched in this pass — confirm on iiseradmission.in and nestexam.in.",
    whyBlurb:
      "The most research-heavy way to study chemistry: inorganic and physical chemistry courses start from the periodic law and go straight into bonding, spectroscopy and materials, with lab research built in from the early years.",
    details: {
      topColleges: ["IISER Pune", "IISER Mohali", "IISER Kolkata", "NISER Bhubaneswar", "IISER Thiruvananthapuram"],
      careerExits: ["PhD in India or abroad", "Research scientist", "Materials / catalysis research", "Data science and tech roles"],
      keySubjects: ["Inorganic Chemistry", "Chemical Bonding & Spectroscopy", "Solid-State Chemistry", "Mathematical Methods"],
      furtherStudy: ["PhD (IISc, IISERs, abroad)", "CSIR-NET (JRF)", "Industry R&D"],
    },
  },
  {
    id: "bpharm",
    title: "B.Pharm (Pharmacy)",
    subtitle: "4 yrs · Pharmacy colleges and universities across India (state-level admissions)",
    entranceExams: ["State CETs (e.g. MHT-CET, KCET)", "Institute-specific admission"],
    duration: "4 years",
    salary: "₹2.5L – ₹4.5L (fresher, estimate) — most roles are QC / production / regulatory",
    salaryPercent: 34,
    verified: "estimate",
    verifiedNote:
      "NOT independently verified. No B.Pharm-specific fresher salary was pulled in this research pass; the range is general knowledge and overlaps the verified Payscale QC-chemist entry pay (≈₹1.9L). Entrance routes differ by state and change yearly — check the state's CET brochure. What IS verified: demand — India's pharma exports crossed $30 billion in FY25 (see the Industries tab).",
    whyBlurb:
      "Iodine as an antiseptic, platinum in some cancer drugs, lithium in mood stabilisers, fluorine in many medicines: pharmacy is applied periodicity — knowing an element's group tells you how it will behave in the body and in the reactor.",
    details: {
      topColleges: ["ICT Mumbai (Pharmaceutical Sciences)", "Jamia Hamdard (Delhi)", "Manipal College of Pharmaceutical Sciences", "Panjab University (UIPS)", "State university pharmacy departments"],
      careerExits: ["Quality control / quality assurance", "Production & formulation", "Regulatory affairs", "M.Pharm / MBA"],
      keySubjects: ["Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacology", "Pharmaceutical Analysis"],
      furtherStudy: ["M.Pharm (GPAT)", "MBA", "Regulatory-affairs certifications"],
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
        title: "M.Sc Chemistry (Inorganic / Physical / Analytical)",
        desc: "2-year postgraduate degree that takes the periodic table into depth: transition-metal and f-block chemistry, coordination compounds, spectroscopy and materials.",
        badges: ["IIT JAM (Chemistry)", "CUET-PG"],
        salary: "Fee waiver / stipend at IITs; direct-job pay ≈ ₹3L – ₹7L (estimate)",
        tag: "Research-track",
        verified: "estimate",
        verifiedNote:
          "Salary NOT independently verified — general knowledge, overlapping the Payscale chemist/analytical-chemist pages in the UG tab. What IS verified (news sites relaying the IIT JAM 2027 brochure, Nov 2026): IIT Kharagpur is the organising institute, JAM 2027 is a computer-based test on Feb 14, 2027 in two sessions, Chemistry (CY) is one of seven papers (reported in the forenoon session), and registration closed after the deadline was extended to Oct 19, 2026. Always read the official brochure at jam.iitkgp.ac.in for eligibility and dates.",
      },
      {
        title: "M.Tech Materials / Metallurgy / Chemical Engineering",
        desc: "Specialises periodic-table knowledge into alloys, ceramics, polymers, catalysts and process engineering — the technical route into steel, battery and chemical industries.",
        badges: ["GATE (MT / CH / XE / CY)"],
        salary: "₹5L – ₹12L (estimate); GATE-qualified PSU entry is higher — see the Exams tab",
        tag: "Industry-track",
        verified: "estimate",
        verifiedNote:
          "NOT independently searched — general knowledge of M.Tech-level pay bands. PSU CTC (₹12L–₹17.3L at IOCL-type PSUs) was verified in the Sep 2026 research pass for chemical/process roles. GATE 2027 (IIT Madras) exam days reported as Feb 6, 7, 13, 14, 20 and 21, 2027; the exact day of each paper (e.g. Chemistry CY) was not consistent across sources — confirm on gate2027.iitm.ac.in.",
        details: {
          topColleges: ["IIT Bombay", "IIT Madras", "IIT Kharagpur", "IISc Bengaluru"],
          careerExits: ["Process / materials engineer", "Battery & energy-materials R&D", "Metallurgical plant roles"],
          keySubjects: ["Advanced Materials", "Extractive & Physical Metallurgy", "Reaction Engineering", "Corrosion Science"],
          furtherStudy: ["PhD", "MS abroad"],
        },
      },
      {
        title: "Battery, energy-storage & critical-minerals specialisations (M.Tech / PhD)",
        desc: "Lithium, nickel, cobalt, manganese, graphite — chemistry and materials skills for the cell, the recycling plant and the refinery.",
        badges: ["GATE / institute test", "CSIR-NET"],
        salary: "PhD fellowship ₹37,000–₹42,000/month (see PhD row); industry pay not reliably available",
        tag: "Frontier / industry",
        verified: "search",
        verifiedNote:
          "Policy facts verified from news and industry reports: the PLI scheme for Advanced Chemistry Cell (ACC) battery storage was approved by the Union Cabinet on 12 May 2021 with an outlay of ₹18,100 crore over 5 years, targeting 50 GWh of ACC capacity (plus 5 GWh niche ACC); a Dec 2025 report says 40 GWh had been awarded to four beneficiary firms. The National Critical Mineral Mission (approved late Jan 2025) is ₹16,300 crore of government spending plus ₹18,000 crore of expected PSU investment (≈₹34,300 crore over 7 years), and covers lithium, cobalt, nickel, gallium, germanium and graphite among others; a ₹1,500 crore recycling incentive followed in Sep 2025. Specific degree programme names differ by institute and were not verified individually.",
      },
    ],
  },
  {
    group: "PhD",
    steps: [
      {
        title: "PhD in Chemistry / Materials Science / Metallurgy",
        desc: "4–6 years of original research: designing new catalysts, battery materials, semiconductors, alloys and analytical methods.",
        badges: ["CSIR-NET (JRF)", "GATE", "Institute entrance tests"],
        salary: "₹37,000/month fellowship → ₹42,000/month after registration/SRF → ₹9.6L–15L+ post-PhD (Scientist B / faculty entry)",
        tag: "Deep research",
        verified: "public-scale",
        verifiedNote:
          "CSIR-HRDG circular (checked Sep 2026, carried over): JRF ₹37,000/month rising to SRF ₹42,000/month plus annual contingency and HRA. CSIR-UGC NET December 2026 (NTA): Chemical Sciences is one of the subjects; reports say the application window ran Oct 7 – Nov 5, 2026 (late-fee deadline ≈ Nov 9) and the exam is CBT-mode — but sources disagree on exam days (Dec 19, 22, 27 vs Dec 20–21). Confirm on csirnet.nta.nic.in.",
      },
    ],
  },
  {
    group: "International",
    steps: [
      {
        title: "MS / PhD Abroad (Chemistry, Materials Science, Chemical Engineering)",
        desc: "The US, Germany, the Netherlands, the UK and Canada are major destinations for chemistry and materials research.",
        badges: ["GRE (often optional)", "IELTS/TOEFL"],
        salary: "US chemist median $91,240 · materials scientist median $117,790 (BLS, May 2025)",
        tag: "Global track",
        verified: "search",
        verifiedNote:
          "U.S. Bureau of Labor Statistics Occupational Outlook Handbook, as relayed by web-search summaries (page itself not opened in this pass): chemists median $91,240 and materials scientists $117,790 (May 2025); chemists and materials scientists combined +7% projected 2025–2035, about 93,500 jobs. A bachelor's degree is the typical entry requirement for chemists, a PhD usually for research. Earlier May 2024 figures (chemists $84,150; materials scientists $104,160 on the Quantum page) are older. Confirm on bls.gov before quoting.",
      },
    ],
  },
  {
    group: "MBA / Non-traditional",
    steps: [
      {
        title: "Regulatory affairs, patents, chemical sales & science communication",
        desc: "Not every chemistry-literate student works in a lab: regulatory affairs, patent analysis, technical sales, ESG/sustainability and science writing all value a strong periodic-table foundation.",
        badges: ["CAT/MAT (MBA)", "Institute-specific"],
        salary: "₹6L – ₹18L+ (estimate)",
        tag: "Pivot",
        verified: "estimate",
        verifiedNote: "NOT independently searched. Treat as a placeholder range; check live job postings before quoting pay.",
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
    title: "Analytical / QC Chemist",
    subtitle: "Tests raw materials, drugs, water and food — identifies elements and impurities by their behaviour",
    employers: ["Sun Pharma", "Dr. Reddy's", "Cipla", "NABL-accredited testing labs", "CSIR labs"],
    qualifications: ["B.Sc Chemistry", "M.Sc Analytical Chemistry", "B.Pharm"],
    fresherSalary: "₹1.9L – ₹3.5L (Payscale: QC chemist entry ≈₹1.9L, analytical chemist entry ≈₹2.0L–₹3.5L depending on page)",
    fresherPercent: 28,
    seniorSalary: "₹6L – ₹14L (8+ yrs, estimate)",
    seniorPercent: 58,
    verified: "search",
    verifiedNote:
      "Payscale India (2026 pages): entry-level QC Chemist avg ≈₹1,87,352; entry-level Analytical Chemist avg ≈₹2.0L (25th–75th ₹1.8L–₹3.57L) on one page and ≈₹3.5L on another carried over from the Oct 2026 pass (Analytical Chemist avg ₹4L, entry ₹3.5L, range ₹1.51L–₹6.08L); SalaryExpert cites far higher gross figures (≈₹10.4L). The spread between sources is the honest finding. The senior range is NOT verified.",
    details: {
      dayToDay: ["Run titrations, chromatography and spectroscopy on samples", "Check metal and impurity limits against specifications", "Calibrate instruments and prepare standards", "Document results to GMP/ISO standards"],
      growthPath: ["Analyst → Senior Analyst → Lab / QA Manager"],
      keySkills: ["Analytical technique", "Instrument calibration", "Documentation & GMP"],
    },
  },
  {
    id: "research-process-chemist",
    title: "Research / Process Chemist (specialty chemicals & pharma)",
    subtitle: "Develops and scales up reactions — chooses reagents, catalysts and conditions",
    employers: ["Pharma and API manufacturers", "Specialty-chemicals companies", "CRO / CDMO labs", "CSIR labs"],
    qualifications: ["M.Sc Organic / Inorganic Chemistry", "B.Tech Chemical Engineering", "PhD for research-lead roles"],
    fresherSalary: "₹2.4L – ₹3L (Payscale: entry-level Chemist ≈₹2.39L; early-career Research Chemist, Mumbai ≈₹2.48L)",
    fresherPercent: 30,
    seniorSalary: "₹8L – ₹20L (estimate)",
    seniorPercent: 62,
    verified: "search",
    verifiedNote:
      "Payscale India (2026 pages): entry-level Chemist avg base ≈₹2,39,284 (10th–90th ₹1.27L–₹5.13L); early-career Research Chemist in Mumbai ≈₹2.48L (middle 50% ₹2.0L–₹3.2L); Research Chemist in Chennai (all experience) ≈₹2.91L. There was no national entry-level 'Research Chemist' page, so Mumbai is a proxy. Salary.com's higher entry-level figure (≈₹6.2L) uses a different method. The senior range is NOT verified — it is general knowledge.",
    details: {
      dayToDay: ["Plan and run synthesis and scale-up experiments", "Screen catalysts and reagents", "Analyse yields and impurities", "Write lab reports and transfer processes to plant"],
      growthPath: ["Research Chemist → Senior Scientist → Group Leader / Process Head"],
      keySkills: ["Reaction chemistry", "Catalysis", "Chromatography & spectroscopy"],
    },
  },
  {
    id: "metallurgical-materials-engineer",
    title: "Metallurgical / Materials Engineer",
    subtitle: "Controls how metals and alloys are extracted, made, tested and fail — steel, aluminium, copper, castings",
    employers: ["Tata Steel", "JSW Steel", "SAIL", "Hindalco", "Auto and aerospace component makers"],
    qualifications: ["B.Tech Metallurgical / Materials Engineering", "M.Tech Materials / Metallurgy"],
    fresherSalary: "₹3L – ₹5.6L (Payscale: metallurgical engineer entry ≈₹3.0L, early-career ≈₹3.6L; materials engineer entry ≈₹4.4L)",
    fresherPercent: 42,
    seniorSalary: "₹10L – ₹25L (estimate)",
    seniorPercent: 68,
    verified: "search",
    verifiedNote:
      "Payscale India (2026 pages, self-reported base pay): entry-level Metallurgical Engineer ≈₹3,02,588 (10th–90th ₹1.21L–₹9.86L); early-career ≈₹3,56,054; entry-level Materials Engineer ≈₹4.4L, early-career ≈₹5.6L. Physics Wallah cites ₹4–9L for metallurgy engineers. The senior range is NOT verified. DEMAND is verified: India produced about 164.9 million tonnes of crude steel in 2025 (≈ +10% on 2024), second only to China's 960.8 Mt, per Ministry of Steel and worldsteel-based reports.",
    details: {
      dayToDay: ["Monitor furnace, casting and rolling parameters", "Test strength, hardness and microstructure", "Investigate failures and corrosion", "Develop alloys and heat-treatment recipes"],
      growthPath: ["Graduate Engineer Trainee → Metallurgist → Section / Plant Head"],
      keySkills: ["Physical metallurgy", "Materials testing", "Statistics & quality tools"],
    },
  },
  {
    id: "battery-materials-engineer",
    title: "Battery & Energy-Materials Engineer / Chemist",
    subtitle: "Works on cell chemistry, electrode materials, recycling and quality — lithium, nickel, cobalt, manganese, graphite",
    employers: ["ACC Energy Storage Pvt Ltd", "Ola Cell Technologies", "CSIR labs (e.g. CECRI)", "Battery-recycling and materials start-ups"],
    qualifications: ["B.Tech Chemical / Metallurgy / Materials", "M.Sc Chemistry", "M.Tech / PhD (R&D roles)"],
    fresherSalary: "No battery-specific figure found — Payscale materials engineer entry ≈₹4.4L (early-career ≈₹5.6L) is the closest proxy",
    fresherPercent: 45,
    seniorSalary: "Not reliably found — estimate ₹12L – ₹30L+ for experienced R&D engineers",
    seniorPercent: 70,
    verified: "estimate",
    verifiedNote:
      "Salary NOT verified: no battery-specific India dataset was found; the fresher proxy is the Payscale Materials Engineer page (entry ≈₹4.4L, early-career ≈₹5.6L, 2025–26) and the senior range is general knowledge. DEMAND is verified: the PLI-ACC scheme (₹18,100 crore, approved 12 May 2021) targets 50 GWh of cell capacity with 40 GWh awarded by Dec 2025 (IANS report); the ACC Energy Storage and Ola Cell Technologies names come from that report. Plant start-ups and hiring are early-stage — check live postings.",
    details: {
      dayToDay: ["Prepare and test electrode and electrolyte materials", "Run cell-performance and safety tests", "Analyse failure and degradation", "Support recycling and recovery of metals"],
      growthPath: ["Engineer / Chemist → Senior Engineer → R&D or Process Lead"],
      keySkills: ["Electrochemistry", "Materials characterisation", "Data analysis (Python)"],
    },
  },
  {
    id: "govt-research-scientist",
    title: "CSIR / DRDO / BARC / ISRO Scientist",
    subtitle: "Government research labs — Scientist 'B' track (7th Pay Commission, Level 10)",
    employers: ["CSIR labs", "DRDO", "BARC", "ISRO", "NPCIL (nuclear power)"],
    qualifications: ["M.Sc Chemistry/Physics + CSIR-NET (JRF)", "M.Tech / PhD (preferred for direct entry)"],
    fresherSalary: "₹9.6L – ₹12L (gross, Scientist 'B', Level 10, basic ₹56,100); DRDO gross ≈₹1L/month at joining per official recruitment ad",
    fresherPercent: 65,
    seniorSalary: "₹18L – ₹30L+ (senior Scientist levels — estimate)",
    seniorPercent: 82,
    verified: "search",
    verifiedNote:
      "Carried over from the Sep/Oct 2026 research passes. DRDO official recruitment advertisement (drdo.gov.in, 2026): Scientist-B is 7th CPC Level 10 (basic ₹56,100/month), with gross emoluments at joining (metro) around ₹1,00,000/month. BARC OCES/DGFS training stipend commonly cited at ₹74,000/month plus a ₹30,000 book allowance (secondary source). Senior Scientist levels were NOT re-searched. NPCIL was not searched for salary.",
    details: {
      dayToDay: ["Original research and experiments", "Material and device development", "Publication & patent work", "Project proposal writing"],
      growthPath: ["Scientist B → Scientist C/D → Scientist E/F/G"],
      keySkills: ["Research methodology", "Inorganic / materials chemistry", "Grant & proposal writing"],
    },
  },
  {
    id: "lecturer",
    title: "Lecturer / Assistant Professor (Chemistry)",
    subtitle: "Teaches at UG/PG level in govt or private colleges and universities",
    employers: ["Govt/aided colleges", "Private universities", "Junior colleges (Class 11-12)"],
    qualifications: ["M.Sc + NET/SET", "PhD (for university posts)"],
    fresherSalary: "₹8.7L – ₹11.3L (gross; UGC Academic Level 10, basic ₹57,700)",
    fresherPercent: 62,
    seniorSalary: "₹20L – ₹31L+ (gross, Professor level)",
    seniorPercent: 85,
    verified: "public-scale",
    verifiedNote:
      "Carried over from the Sep/Oct 2026 research passes. UGC 7th Pay Commission Academic Level 10 basic pay ₹57,700/month (unchanged for 2026). Gross with DA+HRA+TA commonly cited at ₹1.05–1.25 lakh/month depending on city class; DA is revised twice yearly, so the exact gross figure drifts.",
    details: {
      dayToDay: ["Teaching UG/PG chemistry", "Lab supervision", "Research (if in university)", "Exam evaluation"],
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
    title: "US — Chemistry, Materials & Chemical Engineering",
    entries: [
      {
        title: "Chemist",
        desc: "BLS is the authoritative source; a bachelor's degree is the typical entry requirement, a PhD for research roles.",
        badges: ["Bachelor's degree typical", "F-1 OPT / H-1B routes"],
        salary: "$91,240 median (BLS, May 2025)",
        inrTag: "≈ ₹78L (rough, rate-dependent)",
        verified: "search",
        verifiedNote:
          "BLS Occupational Outlook Handbook, via web-search summaries (page not opened in this pass): chemists median $91,240 (May 2025). A BLS Economics Daily article gives $84,150 for May 2024 and +4.9% employment growth for 2024–34; the combined 'chemists and materials scientists' page now projects +7% for 2025–35. Confirm on bls.gov before quoting.",
      },
      {
        title: "Materials Scientist",
        desc: "Characterises and develops materials for electronics, batteries, energy and aerospace.",
        badges: ["Bachelor's / Master's / PhD by role", "BLS-tracked occupation"],
        salary: "$117,790 median (BLS, May 2025)",
        inrTag: "≈ ₹1.0Cr (rough, rate-dependent)",
        verified: "search",
        verifiedNote:
          "BLS Occupational Outlook Handbook, via web-search summaries: materials scientists median $117,790 (May 2025); combined chemists-and-materials-scientists median $95,060, about 93,500 jobs, +7% projected 2025–35. The Quantum page quotes the older May 2024 figure ($104,160). Confirm on bls.gov.",
      },
      {
        title: "Chemical Engineer",
        desc: "Designs processes and plants for chemicals, fuels, food, pharma and batteries.",
        badges: ["Bachelor's degree typical", "Large industrial demand"],
        salary: "$125,040 median (BLS, 2025)",
        inrTag: "≈ ₹1.06Cr (rough, rate-dependent)",
        verified: "search",
        verifiedNote:
          "BLS Occupational Outlook Handbook, via web-search summaries: chemical engineers median pay $125,040 for 2025, +5% projected 2025–35 (faster than average). A BLS Economics Daily article gives $121,860 for May 2024 and +2.6% for 2024–34. Confirm on bls.gov.",
      },
    ],
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    title: "Germany — Chemical Industry & Analytical Labs",
    entries: [
      {
        title: "Analytical / Research Chemist",
        desc: "Germany has a large chemical and pharma sector; a master's degree or PhD is common for research posts.",
        badges: ["EU Blue Card (skilled workers)", "Master's / PhD common"],
        salary: "≈ €50,000 (analytical chemist avg) · ≈ €49,900 (early-career research chemist) — base pay",
        inrTag: "INR conversion varies with the euro rate — convert at the live rate",
        verified: "search",
        verifiedNote:
          "Payscale Germany (self-reported base pay): Analytical Chemist avg ≈€50,000 in 2025 (range ≈€36k–€61k); early-career Research Chemist avg ≈€49,920 in 2026 (range ≈€31k–€56k). Paylab Germany reports a different basis — 80% of chemists earn €3,230–€5,605 per month gross including bonuses — so the sources are not directly comparable. Payscale had no general 'Chemist' page for Germany.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 5. INDUSTRIES
// ----------------------------------------------------------------------------
export const INDUSTRIES = [
  {
    id: "metals-steel-mining",
    title: "Metals, Steel & Mining",
    desc: "Iron, aluminium, copper, nickel and chromium are chosen and combined using their positions in the periodic table. India produced about 164.9 million tonnes of crude steel in 2025, second only to China (Ministry of Steel / worldsteel-based reports), and the National Critical Mineral Mission (approved Jan 2025, ≈₹34,300 crore including expected PSU investment) targets lithium, cobalt, nickel, gallium, germanium and graphite.",
    companies: ["Tata Steel", "JSW Steel", "SAIL", "Hindalco"],
  },
  {
    id: "batteries-energy-storage",
    title: "Batteries & Energy Storage",
    desc: "Lithium (Group 1) is the star of the rechargeable cell, with nickel, cobalt and manganese from the d-block in the cathode. The PLI scheme for Advanced Chemistry Cell batteries (₹18,100 crore, approved 12 May 2021) targets 50 GWh of capacity; a Dec 2025 report says 40 GWh had been awarded to four firms. A ₹1,500 crore recycling incentive (Sep 2025) targets recovery of critical minerals.",
    companies: ["ACC Energy Storage Pvt Ltd", "Ola Cell Technologies", "CSIR battery labs", "Recycling & materials start-ups"],
  },
  {
    id: "pharma-specialty-chemicals",
    title: "Pharmaceuticals & Specialty Chemicals",
    desc: "India's pharma exports crossed $30 billion in FY2025 (≈$30.47 billion, up about 9.4%), with the US taking about 34%; India ranks third globally by volume. Every API process depends on knowing how halogens, metals and catalysts behave — periodic classification in daily use.",
    companies: ["Sun Pharma", "Dr. Reddy's", "Cipla", "CRO / CDMO labs"],
  },
  {
    id: "semiconductors-electronics",
    title: "Semiconductors & Electronics",
    desc: "Silicon and germanium (Group 14) are the classic semiconductors; gallium (Group 13) and arsenic (Group 15) pair up in compound semiconductors. India is building fabs and packaging plants: PIB (Feb 2026) lists 10 India Semiconductor Mission projects worth ₹1.60 lakh crore across 6 states as of Dec 2025 (carried over from the Oct 2026 pass).",
    companies: ["Tata Electronics", "Micron (Sanand)", "CG Power", "Tata-PSMC (Dholera)"],
  },
  {
    id: "water-environment-testing",
    title: "Water, Environment & Analytical Testing",
    desc: "Chlorine disinfects water, while lead, mercury, arsenic and cadmium are heavy-metal contaminants that labs monitor. Knowing which elements are essential, which are toxic and which behave alike is the job of environmental and testing chemists. (No sector-wide pay or size figure was pulled for this industry.)",
    companies: ["NABL-accredited testing labs", "CSIR-NEERI", "Central Pollution Control Board", "Water-treatment companies"],
  },
  {
    id: "nuclear-energy",
    title: "Nuclear & Energy",
    desc: "Uranium, an actinoid from the f-block, is used as nuclear fuel under tightly controlled conditions; recruitment into this sector is through public bodies such as BARC and NPCIL, often via GATE or the BARC training schemes. (No sector figures were searched in this pass.)",
    companies: ["BARC", "NPCIL", "DAE units", "Research reactors & fuel-cycle labs"],
  },
  {
    id: "advanced-materials-magnets",
    title: "Advanced Materials & Rare-Earth Technologies",
    desc: "The lanthanoids (the first f-block row) go into powerful permanent magnets for electric-vehicle motors and wind turbines, and into phosphors and catalysts. Materials scientists use periodic trends to pick which elements to mix.",
    companies: ["CSIR labs", "IISc & IIT materials groups", "Specialty-materials R&D"],
  },
];

// ----------------------------------------------------------------------------
// 6. SKILLS EMPLOYERS WANT + FREE RESOURCES
// ----------------------------------------------------------------------------
export const SKILLS = [
  {
    id: "periodic-fluency",
    color: "#fb923c",
    name: "Periodic-Table Fluency & Trend Reasoning",
    why: "Placing any element, naming its block and family, and predicting radius, ionisation enthalpy and electronegativity trends — including the known exceptions like the Al and S dips — is the entry ticket for chemistry exams and technical interviews.",
    topics: ["Group, period and block placement", "Trends across and down", "Exceptions (Al, S, Be–B)", "Diagonal and group similarities"],
    priority: "High",
    percent: 92,
  },
  {
    id: "maths-data",
    color: "#22d3ee",
    name: "Maths & Data Handling",
    why: "Chemistry is numeric: unit conversions, logs, graphs and basic statistics. Reading a trend table or a calibration curve quickly is what separates a confident analyst from a nervous one.",
    topics: ["Unit conversion & significant figures", "Graph reading", "Basic statistics", "Estimation"],
    priority: "High",
    percent: 84,
  },
  {
    id: "lab-instruments",
    color: "#a78bfa",
    name: "Lab Technique & Instrument Literacy",
    why: "Real work means flame tests, titrations, spectroscopy and chromatography. Even a school-level flame test of Group 1 and 2 salts is the first step towards reading real analytical data.",
    topics: ["Titration & standard solutions", "Flame tests and spectroscopy", "Chromatography basics", "Calibration & error"],
    priority: "Medium",
    percent: 72,
  },
  {
    id: "python-data",
    color: "#4ade80",
    name: "Python & Data Analysis for Science",
    why: "Plotting trends, cleaning measurement data and screening materials is now done in Python (NumPy, pandas, matplotlib). A small project that plots periodic trends from a public dataset is a strong beginner portfolio piece.",
    topics: ["Python + NumPy / pandas", "Plotting & visualisation", "Reading open datasets", "Version control (Git)"],
    priority: "Medium",
    percent: 66,
  },
  {
    id: "safety-green",
    color: "#f87171",
    name: "Lab Safety & Green Chemistry",
    why: "Many elements are reactive (Group 1 metals), toxic (Pb, Hg, As, Cd) or radioactive (actinoids). Knowing how to store, handle and dispose of them is a baseline expectation in every chemistry employer.",
    topics: ["SDS / hazard labels", "Handling reactive metals", "Waste & disposal rules", "Green-chemistry principles"],
    priority: "Medium",
    percent: 68,
  },
];

export const FREE_RESOURCES = [
  {
    name: "NCERT Class 11 Chemistry — Classification of Elements and Periodicity in Properties",
    provider: "NCERT (ncert.nic.in)",
    type: "Textbook",
    desc: "The reference chapter this lesson follows: the modern periodic law, blocks, trends and the exceptions. Free to read and download on the NCERT website.",
  },
  {
    name: "Visual Elements Periodic Table",
    provider: "Royal Society of Chemistry (rsc.org)",
    type: "Interactive reference",
    desc: "A free, searchable periodic table with uses, discovery history and key data for each element — good for connecting an element's position to its real-world uses.",
  },
  {
    name: "Periodic Table",
    provider: "PubChem, U.S. National Institutes of Health",
    type: "Interactive reference",
    desc: "A free periodic table linked to measured properties and safety information for every element.",
  },
  {
    name: "Chemistry video courses",
    provider: "NPTEL / SWAYAM (IIT-led)",
    type: "Video course",
    desc: "IIT faculty courses on inorganic and general chemistry. Search the current catalogue at nptel.ac.in — courses and run dates change, and certificate exams may carry a fee.",
  },
  {
    name: "Lab or research internships",
    provider: "Local testing labs, IISER/IIT summer programmes, CSIR labs",
    type: "Internship",
    desc: "Even a short stint in a testing lab or a materials group teaches more than any video. Many institutes run summer research programmes — look for application windows early in the calendar year.",
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
    desc: "Gateway to IITs/NITs for Chemical, Metallurgical and Materials Engineering. Pattern as reported in the Sep 2026 research pass: 2 sessions/year (Jan + April), 300 marks, +4/-1 marking. The 2027 cycle was not re-searched — read the NTA / JoSAA notices.",
    meta: ["Class 12", "National level", "Engineering entry"],
  },
  {
    badge: "CUET",
    color: "#ec4899",
    title: "CUET-UG",
    desc: "Common entrance for central and state universities' B.Sc Chemistry programmes. As reported in the Sep 2026 pass, it changed materially for 2026: CBT-only, fewer subject choices (63 → 37), max 5 subjects per student, and every question compulsory.",
    meta: ["Class 12", "National level", "UG entry", "Changed for 2026"],
  },
  {
    badge: "IAT",
    color: "#10b981",
    title: "IISER Aptitude Test (IAT)",
    desc: "Single gateway to the 5-year BS-MS dual degree at the IISERs. IAT 2026 was held on June 7, 2026 as a 3-hour computer-based test with 60 MCQs across Physics, Chemistry, Maths and Biology. The 2027 dates were not searched — read the official brochure at iiseradmission.in.",
    meta: ["Class 12", "National level", "BS-MS entry"],
  },
  {
    badge: "NEST",
    color: "#f59e0b",
    title: "NEST (NISER + UM-DAE CEBS)",
    desc: "Entrance test for the 5-year integrated M.Sc at NISER Bhubaneswar and UM-DAE CEBS Mumbai. NEST 2026 was scheduled for June 6, 2026 (CBT, 261 seats). Eligibility: at least 60% in Class 12 (55% for SC/ST). 2027 dates were not searched — confirm on nestexam.in.",
    meta: ["Class 12", "National level", "Integrated M.Sc entry"],
  },
  {
    badge: "JAM",
    color: "#8b5cf6",
    title: "IIT JAM (Chemistry)",
    desc: "Entry to M.Sc and integrated PhD at IITs. IIT JAM 2027 is organised by IIT Kharagpur as a computer-based test on February 14, 2027; Chemistry (CY) is one of seven papers, reported in the forenoon session. Registration closed after the deadline was extended to October 19, 2026 (news-site reports). Read the official brochure at jam.iitkgp.ac.in.",
    meta: ["Post-UG", "National level", "M.Sc/PhD entry", "Registration closed"],
  },
  {
    badge: "GATE",
    color: "#14b8a6",
    title: "GATE (Chemistry / Chemical / Metallurgy / Engineering Sciences)",
    desc: "Required for M.Tech admission with stipend and used by PSUs and national labs for recruitment. GATE 2027 is organised by IIT Madras; exam days are reported as Feb 6, 7, 13, 14, 20 and 21, 2027 (paper-wise days were not consistent across sources). Confirm the paper schedule on gate2027.iitm.ac.in.",
    meta: ["Post-UG", "National level", "M.Tech/PSU entry"],
  },
  {
    badge: "NET",
    color: "#06b6d4",
    title: "CSIR-UGC NET (Chemical Sciences)",
    desc: "Qualifies for PhD admission with fellowship (₹37,000/month JRF) and lectureship eligibility. For the December 2026 cycle, reports say applications ran Oct 7 – Nov 5, 2026 (late-fee deadline ≈ Nov 9) and the exam is CBT-mode, but sources disagree on the exam days (Dec 19, 22, 27 vs Dec 20–21). Confirm on csirnet.nta.nic.in.",
    meta: ["Post-PG", "National level", "Research/Teaching entry", "Dec 2026 cycle"],
  },
];

// ============================================================================
// HONEST TALLY (research pass completed Nov 2026)
// ============================================================================
// "search": B.Sc Chemistry, B.Tech Chemical, B.Tech Metallurgy/Materials,
//   BS-MS/INSPIRE (carried over), Battery/critical-minerals PG step (policy
//   facts), International PG step, Analytical/QC chemist, Research/process
//   chemist (fresher), Metallurgical engineer (fresher + steel output),
//   CSIR/DRDO/BARC scientist (carried over), 3 US + 1 Germany abroad entries.
// "public-scale": PhD fellowship (CSIR), Lecturer (UGC 7th CPC).
// "estimate": B.Pharm, M.Sc and M.Tech PG steps, MBA/pivot step, Battery
//   materials engineer salary.
//
// Biggest honest gaps: senior-level India pay for chemists and metallurgists
// (no source found); battery-specific India pay; BLS figures were read from
// search summaries, not the bls.gov page itself; exam dates came from news
// sites and conflict in places (CSIR-NET, GATE paper days) — each exam entry
// says to confirm on the official portal.
// ============================================================================
