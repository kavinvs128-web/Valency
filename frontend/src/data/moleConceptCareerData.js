// ============================================================================
// MOLE CONCEPT — CAREER PAGE DATA
// ============================================================================
// VERIFICATION KEY — every object below carries a `verified` field:
//   "search"     = pulled from a live web search this session (Sep 2026),
//                  cite-able to a named source (AmbitionBox/Indeed/Glassdoor/
//                  Payscale/pay-commission notification).
//   "public-scale" = a fixed, published government pay scale (7th CPC /
//                  UGC), not a market estimate — high confidence even
//                  though not re-searched every time.
//   "estimate"   = NOT independently verified this session. Built from
//                  general knowledge / reasoning, not a pulled data point.
//                  Treat as a placeholder — re-verify before publishing to
//                  students as fact.
// All figures are annual CTC in INR unless marked otherwise. "%" fields are
// 0–100 values meant for progress-bar / meter UI elements — a rough
// relative-demand indicator, not an official statistic.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. UNDERGRADUATE COURSES
// ----------------------------------------------------------------------------
export const UG_COURSES = [
  {
    id: "bsc-chemistry",
    title: "B.Sc Chemistry (Honours)",
    subtitle: "3-4 yrs · Delhi University, Presidency, Loyola, Fergusson, St. Xavier's",
    entranceExams: ["CUET", "State CETs", "College-specific merit"],
    duration: "3 years (4 with Honours/research add-on under NEP)",
    salary: "₹1.8L – ₹4.5L (fresher, direct with B.Sc — grows with M.Sc/certification)",
    salaryPercent: 38,
    verified: "estimate",
    verifiedNote: "Not independently searched — a bare B.Sc chemist entry role tracks close to the 'Chemist' AmbitionBox band (₹1.4L–4.5L) found for related roles this session, but this exact figure wasn't pulled.",
    whyBlurb:
      "Mole concept IS the backbone of a chemistry degree — every volumetric analysis, gravimetric estimation, and physical chemistry numerical you'll do for the next 3 years traces back to n = mass/M and n = N/N_A. Get this solid now and half your first-year lab reports write themselves.",
    details: {
      topColleges: ["Miranda House (DU)", "Presidency University Kolkata", "Loyola College Chennai", "St. Stephen's (DU)", "Fergusson College Pune"],
      careerExits: ["QC/QA Analyst", "M.Sc Chemistry", "Teaching (with B.Ed)", "Lab Technician"],
      keySubjects: ["Physical Chemistry (thermodynamics, kinetics)", "Inorganic Chemistry", "Organic Reaction Mechanisms", "Analytical Chemistry & Instrumentation"],
      furtherStudy: ["M.Sc Chemistry / Analytical Chemistry", "MBA (Chemical/Pharma mgmt)", "B.Ed for teaching", "Certifications in GC-MS/HPLC"],
    },
  },
  {
    id: "btech-chemical",
    title: "B.Tech Chemical Engineering",
    subtitle: "4 yrs · IITs, NITs, ICT Mumbai, BITS Pilani",
    entranceExams: ["JEE Main + Advanced", "BITSAT", "State engineering CETs"],
    duration: "4 years",
    salary: "₹3.5L – ₹9L (fresher; PSU/campus placements often ₹6L+, smaller private plants lower)",
    salaryPercent: 60,
    verified: "estimate",
    verifiedNote: "Not independently searched this session — built from the verified Process Engineer (US) and QC Analyst (India) figures plus general knowledge of PSU vs private-sector spread. Re-verify with AmbitionBox/Naukri before publishing.",
    whyBlurb:
      "Every mass and energy balance in a chemical plant — from a fertilizer reactor to a distillation column — is a scaled-up mole concept problem. Limiting reagent and yield calculations you do in Class 11 are literally what a process engineer does daily, just with bigger numbers and safety margins.",
    details: {
      topColleges: ["IIT Bombay", "IIT Delhi", "ICT Mumbai", "BITS Pilani", "NIT Trichy"],
      careerExits: ["Process/Production Engineer", "R&D Engineer", "Plant Operations", "Higher studies abroad (MS)"],
      keySubjects: ["Mass & Energy Balances", "Chemical Reaction Engineering", "Process Design & Simulation", "Transport Phenomena"],
      furtherStudy: ["M.Tech Chemical Engg (GATE)", "MS abroad (GRE)", "MBA Operations", "PG Diploma in Process Safety"],
    },
  },
  {
    id: "bpharm",
    title: "B.Pharm (Bachelor of Pharmacy)",
    subtitle: "4 yrs · NIPER, Jamia Hamdard, ICT Mumbai, BITS Pilani",
    entranceExams: ["NEET (for some states/colleges)", "State Pharmacy CETs", "College-specific"],
    duration: "4 years",
    salary: "₹2L – ₹4.5L (industry role, e.g. QC/formulation); retail/hospital pharmacist roles often lower, ₹1.2L–3L",
    salaryPercent: 42,
    verified: "search",
    verifiedNote: "Grounded in Careers360 and industry-blog reporting (2024-2026): B.Pharm graduates in QC/production/regulatory roles typically start ₹2.5L–6L, while a large share of retail/hospital pharmacist postings pay far less (~₹12,000–25,000/month, i.e. ₹1.4L–3L/yr). Widened band reflects that real split.",
    whyBlurb:
      "Every dosage calculation, drug formulation, and dilution a pharmacist works out is molarity and stoichiometry wearing a lab coat. Get comfortable converting between moles, mass, and concentration now, because a pharmacy degree runs on it from Semester 1.",
    details: {
      topColleges: ["NIPER Mohali", "Jamia Hamdard", "ICT Mumbai", "Manipal College of Pharmaceutical Sciences", "BITS Pilani"],
      careerExits: ["Formulation/QC Chemist (pharma)", "Retail/Hospital Pharmacist", "Drug Regulatory Affairs", "M.Pharm / Pharm.D"],
      keySubjects: ["Pharmaceutical Chemistry", "Pharmaceutics (dosage forms)", "Pharmacology", "Pharmaceutical Analysis"],
      furtherStudy: ["M.Pharm (GPAT)", "Pharm.D", "MBA Pharma Management", "Regulatory Affairs certification"],
    },
  },
  {
    id: "btech-metallurgy",
    title: "B.Tech Metallurgical & Materials Engineering",
    subtitle: "4 yrs · IIT Kharagpur, IIT-BHU, NIT Rourkela, NIT Trichy",
    entranceExams: ["JEE Main + Advanced", "State engineering CETs"],
    duration: "4 years",
    salary: "₹3L – ₹6L (fresher; company-wise spread is wide — e.g. Tata Steel ₹2.2L–8.2L)",
    salaryPercent: 50,
    verified: "search",
    verifiedNote: "Grounded in a PW.live compilation citing AmbitionBox/company data: overall metallurgy engineer average ~₹90,000/month across all experience levels, entry trainee job postings at ₹45,000–65,000/month (~₹5.4L–7.8L annualized), and Tata Steel range ₹2.2L–8.2L. Fresher band here is deliberately conservative relative to those trainee postings.",
    whyBlurb:
      "Extracting metal from ore (e.g., reducing Fe₂O₃ in a blast furnace) is a limiting-reagent and stoichiometry problem at industrial scale — how much coke, how much ore, how much slag former, in exact mole ratios. This is mole concept applied to steel, aluminium, and copper production.",
    details: {
      topColleges: ["IIT Kharagpur", "IIT (BHU) Varanasi", "NIT Rourkela", "NIT Trichy", "VNIT Nagpur"],
      careerExits: ["Process/Extractive Metallurgist", "Quality Engineer (steel/auto)", "R&D in materials", "Higher studies"],
      keySubjects: ["Extractive Metallurgy", "Physical Metallurgy", "Materials Characterization", "Corrosion Engineering"],
      furtherStudy: ["M.Tech Metallurgical Engg (GATE)", "MS Materials Science abroad", "PhD + research career"],
    },
  },
  {
    id: "bsc-biotech",
    title: "B.Sc Biotechnology",
    subtitle: "3 yrs · JNU, Amity, Christ University, Panjab University",
    entranceExams: ["CUET", "State CETs", "College-specific merit"],
    duration: "3 years",
    salary: "₹1.8L – ₹4L (fresher — a bare B.Sc; M.Sc usually needed for better roles)",
    salaryPercent: 36,
    verified: "estimate",
    verifiedNote: "Not independently searched this session. Biotech fresher pay with only a B.Sc (no M.Sc) tends to sit at the lower end of the general 'Chemist'/lab-assistant band found for related roles — treat as a placeholder.",
    whyBlurb:
      "Buffer preparation, molarity of reagents in a PCR mix, and enzyme concentration calculations all reduce to the same mole-concept skills — just applied to biological samples instead of inorganic salts.",
    details: {
      topColleges: ["JNU Delhi", "Panjab University", "Christ University Bengaluru", "Amity University", "Madras University"],
      careerExits: ["Research Associate", "QC in biotech/pharma", "Lab Technician", "M.Sc Biotechnology"],
      keySubjects: ["Biochemistry", "Molecular Biology", "Microbiology", "Bioprocess Engineering"],
      furtherStudy: ["M.Sc Biotechnology", "M.Tech Biotech (GATE)", "PhD + research", "Certifications in bioinformatics"],
    },
  },
  {
    id: "btech-food-tech",
    title: "B.Tech Food Technology",
    subtitle: "4 yrs · CFTRI Mysore, NIFTEM, Anna University, ICT Mumbai",
    entranceExams: ["JEE Main / State CETs", "College-specific"],
    duration: "4 years",
    salary: "₹2.5L – ₹5.5L (fresher)",
    salaryPercent: 45,
    verified: "estimate",
    verifiedNote: "Not independently searched this session — placeholder based on general FMCG/food-QC entry-level norms. Re-verify before publishing.",
    whyBlurb:
      "Nutritional labelling, preservative dosing limits, and fortification (e.g., iodine in salt, iron in flour) are all governed by precise mole-to-mass conversions and permissible-limit calculations — food safety law is basically applied stoichiometry.",
    details: {
      topColleges: ["CFTRI Mysore", "NIFTEM Kundli", "Anna University", "ICT Mumbai", "PAU Ludhiana"],
      careerExits: ["Food QC/QA Chemist", "Production Chemist (FMCG)", "R&D — new product development", "Regulatory affairs (FSSAI)"],
      keySubjects: ["Food Chemistry", "Food Microbiology", "Food Process Engineering", "Food Safety & Regulations"],
      furtherStudy: ["M.Tech Food Technology", "MBA Food & Agribusiness", "PG Diploma in Food Safety (FSSAI)"],
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
        title: "M.Sc Chemistry / Analytical Chemistry",
        desc: "2-year deep dive into instrumentation (HPLC, GC-MS, AAS) where every calibration curve and sample dilution is a mole-concept calculation.",
        badges: ["IIT JAM", "CUET-PG"],
        salary: "₹3.5L – ₹8L",
        tag: "Research-track",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session.",
      },
      {
        title: "M.Tech Chemical / Metallurgical Engineering",
        desc: "Specializes in process design, reactor sizing, and plant-scale mass balances — direct extension of stoichiometric limiting-reagent problems.",
        badges: ["GATE"],
        salary: "₹6L – ₹12L",
        tag: "Industry-track",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session.",
        details: {
          topColleges: ["IIT Bombay", "IIT Kanpur", "ICT Mumbai"],
          careerExits: ["Senior Process Engineer", "R&D Lead"],
          keySubjects: ["Advanced Reaction Engineering", "Process Simulation (Aspen)"],
          furtherStudy: ["PhD", "PSU management track"],
        },
      },
    ],
  },
  {
    group: "PhD",
    steps: [
      {
        title: "PhD in Chemistry / Chemical Engineering",
        desc: "4-6 years of original research; stoichiometric calculation is the daily grammar of experimental design and yield optimization.",
        badges: ["CSIR-NET (JRF)", "GATE (for Institute funding)"],
        salary: "₹37,000/month JRF stipend (2026) → ₹9.6L–15L+ post-PhD (Scientist B / faculty entry)",
        tag: "Deep research",
        verified: "public-scale",
        verifiedNote: "JRF stipend confirmed at ₹37,000/month as of the June 2026 UGC-NET cycle (NTA notification, reported via indianpaycalculator.in). This is an increase from the older ₹31,000 figure — corrected here.",
      },
    ],
  },
  {
    group: "International",
    steps: [
      {
        title: "MS in Chemical Engineering / Chemistry (Abroad)",
        desc: "US, Germany, Canada, Australia — global demand for process/analytical chemists is stable since every manufacturing economy needs stoichiometric QC.",
        badges: ["GRE", "IELTS/TOEFL"],
        salary: "$50,000 – $90,000 post-MS (varies by country)",
        tag: "Global track",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — broadly consistent with the verified US Process Engineer/QC Chemist entry-level figures, but the specific $50k-90k band itself wasn't pulled.",
      },
    ],
  },
  {
    group: "MBA / Non-traditional",
    steps: [
      {
        title: "MBA (Pharma / Chemical / Operations Management)",
        desc: "Pairs technical mole-concept fluency with plant economics and supply-chain decisions — useful for chemists who want to move into management.",
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
    id: "qc-analytical-chemist",
    title: "QC / Analytical Chemist",
    subtitle: "Tests raw materials & finished products against spec",
    employers: ["Sun Pharma", "Dr. Reddy's", "Cipla", "ITC", "Britannia"],
    qualifications: ["B.Sc Chemistry", "B.Pharm", "M.Sc Analytical Chemistry"],
    fresherSalary: "₹1.8L – ₹3.6L",
    fresherPercent: 35,
    seniorSalary: "₹6L – ₹9L+ (8+ yrs)",
    seniorPercent: 60,
    verified: "search",
    verifiedNote: "Payscale India: median base ₹3.62L/yr, range ₹1.82L–8.22L. Indeed: Analytical Chemist average ₹18,980/month (~₹2.3L/yr) at entry.",
    details: {
      dayToDay: ["Titrations & gravimetric checks", "HPLC/GC sample runs", "Batch documentation", "Deviation investigation"],
      growthPath: ["QC Chemist → Senior Analyst → QA Manager"],
      keySkills: ["Titration accuracy", "Instrument calibration", "GMP documentation"],
    },
  },
  {
    id: "process-production-chemist",
    title: "Process / Production Chemist",
    subtitle: "Runs and optimizes batch/continuous chemical or pharma production",
    employers: ["Reliance", "IOCL", "Aarti Industries", "Lupin", "UPL"],
    qualifications: ["B.Tech Chemical Engineering", "B.Sc Chemistry + plant training"],
    fresherSalary: "₹3.5L – ₹6L",
    fresherPercent: 50,
    seniorSalary: "₹12L – ₹28L (8+ yrs)",
    seniorPercent: 75,
    verified: "estimate",
    verifiedNote: "Not independently searched this session — not the same as the searched 'Process Engineer' US figures. Re-verify India-specific chemical-plant production chemist pay before publishing.",
    details: {
      dayToDay: ["Reactor charge calculations", "Yield & mass balance checks", "Batch record sign-off", "Troubleshooting off-spec batches"],
      growthPath: ["Process Chemist → Shift Incharge → Plant Manager"],
      keySkills: ["Stoichiometric scale-up", "Process safety", "Six Sigma/Lean basics"],
    },
  },
  {
    id: "metallurgist",
    title: "Metallurgist (Process/Extractive)",
    subtitle: "Controls ore-to-metal reduction and alloy composition",
    employers: ["Tata Steel", "SAIL", "Hindalco", "Vedanta"],
    qualifications: ["B.Tech Metallurgical Engineering", "M.Tech Metallurgy"],
    fresherSalary: "₹3L – ₹6L (trainee postings run ₹5.4L–7.8L; wide company variance)",
    fresherPercent: 50,
    seniorSalary: "₹9L – ₹20L (8+ yrs) [estimate — not independently searched]",
    seniorPercent: 65,
    verified: "search",
    verifiedNote: "Fresher figure grounded in PW.live's compilation (overall average ~₹90,000/month across experience, entry trainee postings ₹45,000–65,000/month, Tata Steel range ₹2.2L–8.2L). Senior figure is NOT verified — extrapolated from the fresher band, treat as placeholder.",
    details: {
      dayToDay: ["Ore-coke-flux charge ratio calculations", "Alloy composition checks", "Slag analysis", "Furnace efficiency audits"],
      growthPath: ["Metallurgist → Senior Metallurgist → Plant Head"],
      keySkills: ["Extractive metallurgy calculations", "Phase diagrams", "Quality standards (ASTM/BIS)"],
    },
  },
  {
    id: "environmental-water-chemist",
    title: "Environmental / Water Chemist",
    subtitle: "Monitors pollutant/contaminant levels against permissible limits",
    employers: ["State Pollution Control Boards", "NEERI", "Municipal water utilities", "EIA consultancies"],
    qualifications: ["B.Sc/M.Sc Chemistry", "M.Sc Environmental Science"],
    fresherSalary: "₹1.5L – ₹4.7L",
    fresherPercent: 35,
    seniorSalary: "₹6L – ₹10L (8+ yrs) [estimate — not independently searched]",
    seniorPercent: 50,
    verified: "search",
    verifiedNote: "Fresher band grounded in an Amity Online careers article citing Environmental Chemist pay of ₹1.2L–4.7L/yr in India. Senior figure is NOT verified.",
    details: {
      dayToDay: ["BOD/COD & contaminant quantification", "Permissible-limit compliance checks", "Water treatment dosing calculations", "Report filing for regulators"],
      growthPath: ["Water Chemist → Environmental Engineer → Compliance Head"],
      keySkills: ["Titrimetric/gravimetric analysis", "Regulatory limit calculations", "Report writing"],
    },
  },
  {
    id: "lecturer",
    title: "Lecturer / Assistant Professor (Chemistry)",
    subtitle: "Teaches at UG/PG level in govt or private colleges",
    employers: ["Govt/aided colleges", "Private universities", "Junior colleges (Class 11-12)"],
    qualifications: ["M.Sc Chemistry + NET/SET", "PhD (for university posts)"],
    fresherSalary: "₹8.7L – ₹11.3L (gross; UGC Academic Level 10, basic ₹57,700 + DA/HRA)",
    fresherPercent: 62,
    seniorSalary: "₹20L – ₹31L+ (gross, Professor level, basic up to ₹2,11,300+)",
    seniorPercent: 85,
    verified: "public-scale",
    verifiedNote: "UGC 7th Pay Commission Academic Level 10: Assistant Professor basic pay ₹57,700 (2026), gross with DA/HRA typically ₹72,700–₹93,900/month. Professor level basic runs ₹1,39,600–₹2,11,300, gross ₹1,69,600–₹2,61,300/month. NOTE: my earlier ₹4.5L–7L figure for this role was too low — corrected here.",
    details: {
      dayToDay: ["Teaching UG/PG chemistry", "Lab supervision", "Research (if in university)", "Exam evaluation"],
      growthPath: ["Assistant Professor → Associate Professor → Professor"],
      keySkills: ["Subject depth", "NET/SET clearance", "Publication record (for growth)"],
    },
  },
  {
    id: "csir-drdo-scientist",
    title: "CSIR / DRDO Research Scientist",
    subtitle: "Government research labs — Scientific Officer track (7th Pay Commission, Level 10)",
    employers: ["CSIR labs (NCL, IICT)", "DRDO", "BARC", "ISRO (materials/propellant chemistry)"],
    qualifications: ["M.Sc Chemistry + CSIR-NET (JRF)", "PhD (preferred for direct entry)"],
    fresherSalary: "₹9.6L – ₹12L (gross, Scientist 'B', Level 10, basic ₹56,100)",
    fresherPercent: 65,
    seniorSalary: "₹18L – ₹30L+ (Scientist E/F/G level) [estimate — senior figure not independently searched]",
    seniorPercent: 82,
    verified: "public-scale",
    verifiedNote: "DRDO/CSIR Scientist 'B' is 7th CPC Level 10, basic pay ₹56,100/month. Gross with DA/HRA/TA at metro rates runs ~₹80,000–₹1,00,000+/month (≈₹9.6L–12L/yr) at entry, confirmed via multiple recruitment notifications and careers360 breakdowns. Senior-level figure (Scientist F/G) is NOT independently verified.",
    details: {
      dayToDay: ["Original research design", "Reagent/yield calculations for experiments", "Publication & patent work", "Project proposal writing"],
      growthPath: ["Scientist B → Scientist C/D → Scientist E/F/G"],
      keySkills: ["Research methodology", "Grant/proposal writing", "Deep subject expertise"],
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
    title: "US — Pharma/Chemical Manufacturing Hubs",
    entries: [
      {
        title: "Analytical / QC Chemist",
        desc: "Average base pay across the US.",
        badges: ["H-1B (post-OPT)", "F-1 OPT for fresh MS grads"],
        salary: "$63,000 – $103,000",
        inrTag: "≈ ₹52L – ₹86L (at ~₹83/$)",
        verified: "search",
        verifiedNote: "Glassdoor, Sep 2026: typical pay range $63,498–$103,073, average $80,438/yr.",
      },
      {
        title: "Process Engineer",
        desc: "Wide range depending on industry (semiconductor & pharma pay more).",
        badges: ["H-1B", "STEM OPT extension"],
        salary: "$65,000 – $148,000",
        inrTag: "≈ ₹54L – ₹1.2Cr",
        verified: "search",
        verifiedNote: "Indeed, Sep 2026: average $98,146/yr, range $65,367–$147,361. Glassdoor's broader dataset skews higher (avg $126,465), so this is a conservative/entry-weighted read.",
      },
    ],
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    title: "Germany — Chemical & Process Engineering",
    entries: [
      {
        title: "Process/Chemical Engineer",
        desc: "Strong chemical manufacturing base (BASF, Bayer, Merck); public university MS is low-cost, a common entry route.",
        badges: ["EU Blue Card", "Job Seeker Visa post-MS"],
        salary: "€45,000 – €70,000",
        inrTag: "≈ ₹40L – ₹63L (at ~₹90/€)",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session. Figure is a general-knowledge estimate for chemical engineers in Germany — verify against Stepstone/Glassdoor Germany before publishing.",
      },
    ],
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    title: "Canada — Manufacturing & QA",
    entries: [
      {
        title: "QC/QA Chemist",
        desc: "Common PR-track role via Express Entry after a Canadian MS/PGWP; steady demand in food & pharma QA.",
        badges: ["PGWP", "Express Entry PR"],
        salary: "CAD 50,000 – CAD 75,000",
        inrTag: "≈ ₹31L – ₹46L (at ~₹62/CAD)",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — unverified estimate. Verify against Job Bank Canada / Glassdoor Canada before publishing.",
      },
    ],
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    title: "Australia — Resources & Food Processing",
    entries: [
      {
        title: "Chemist / Process Engineer",
        desc: "Mining/metallurgy and food-processing sectors both hire chemistry & chem-engineering grads.",
        badges: ["Temporary Skill Shortage (482)", "Skilled Independent (189)"],
        salary: "AUD 65,000 – AUD 95,000",
        inrTag: "≈ ₹36L – ₹52L (at ~₹55/AUD)",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — unverified estimate. Verify against SEEK/Glassdoor Australia before publishing.",
      },
    ],
  },
  {
    country: "Gulf (UAE / Saudi Arabia)",
    flag: "🇦🇪",
    title: "Gulf — Petrochemical & Fertilizer",
    entries: [
      {
        title: "Process Chemist (Refinery/Petrochemical)",
        desc: "Tax-free salary; large Indian expat presence in ADNOC, SABIC-linked plants.",
        badges: ["Employer-sponsored work visa"],
        salary: "AED 8,000 – AED 18,000/month (tax-free)",
        inrTag: "≈ ₹22L – ₹49L per year (at ~₹22.7/AED)",
        verified: "estimate",
        verifiedNote: "NOT independently searched this session — unverified estimate. Verify against Bayt/GulfTalent before publishing.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 5. INDUSTRIES (with the actual stoichiometric calculation involved)
// ----------------------------------------------------------------------------
export const INDUSTRIES = [
  {
    id: "fertilizer",
    title: "Fertilizer Manufacturing",
    desc: "Producing urea (NH₂CONH₂) from ammonia and CO₂, or DAP from phosphoric acid and ammonia, requires exact mole ratios: 2NH₃ + CO₂ → NH₂CONH₂ + H₂O. Get the NH₃:CO₂ ratio wrong and you either waste ammonia (cost) or leave CO₂ unreacted (lost yield) — this is a limiting-reagent problem run at thousands of tonnes/day.",
    companies: ["IFFCO", "Coromandel International", "Chambal Fertilisers", "RCF"],
  },
  {
    id: "pharma-dosage",
    title: "Pharma Dosage & Formulation",
    desc: "A 500mg paracetamol tablet requires calculating moles of active ingredient per batch, converting to mass, then accounting for excipient dilution — molarity and mole-to-mass conversion errors here directly affect patient safety, which is why pharma QC is one of the most mole-concept-heavy roles in industry.",
    companies: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin"],
  },
  {
    id: "petrochemical",
    title: "Petrochemical Refining",
    desc: "Cracking naphtha into ethylene and propylene, or reforming to increase octane, involves mass-balance calculations across every reactor stage — moles in must equal moles out (accounting for reaction stoichiometry), which is exactly the conservation-of-mass logic behind mole concept.",
    companies: ["Reliance Industries", "IOCL", "ONGC", "HPCL"],
  },
  {
    id: "food-beverage",
    title: "Food & Beverage Quantity Control",
    desc: "Fortifying salt with iodine (KIO₃) to meet the 15-30 ppm mandated limit, or calculating preservative concentration in a beverage, is a direct mole/mass-to-concentration calculation — get the KIO₃ dose wrong and you either fail regulatory testing or risk under/over-fortification.",
    companies: ["Tata Salt (Tata Consumer)", "ITC", "Britannia", "Nestlé India"],
  },
  {
    id: "cement-construction",
    title: "Cement & Construction Materials",
    desc: "Clinker formation (CaCO₃ → CaO + CO₂ at high temp) and gypsum addition ratios are controlled by mole calculations to hit target compressive-strength specs — the limestone-to-clay ratio in raw mix design is a stoichiometry problem before it's ever a construction problem.",
    companies: ["UltraTech Cement", "ACC", "Ambuja Cements", "Shree Cement"],
  },
  {
    id: "metal-extraction",
    title: "Metal Extraction & Refining",
    desc: "Reducing Fe₂O₃ to Fe in a blast furnace (Fe₂O₃ + 3CO → 2Fe + 3CO₂) requires calculating exact coke and ore charge ratios to hit target output while minimizing excess reductant — a textbook limiting-reagent problem scaled to a furnace producing thousands of tonnes of steel per day.",
    companies: ["Tata Steel", "SAIL", "JSW Steel", "Hindalco"],
  },
];

// ----------------------------------------------------------------------------
// 6. SKILLS EMPLOYERS WANT + FREE RESOURCES
// ----------------------------------------------------------------------------
export const SKILLS = [
  {
    id: "stoichiometric-speed",
    color: "#2dd4bf",
    name: "Quantitative / Stoichiometric Calculation Speed",
    why: "Every QC report, batch record, and process deviation investigation runs on fast, accurate mole-mass-concentration conversions — employers test this directly in technical interviews.",
    topics: ["Limiting reagent problems", "Molarity/normality conversions", "Yield & % purity calculations", "Empirical/molecular formula from data"],
    priority: "High",
    percent: 90,
  },
  {
    id: "titration-gravimetric",
    color: "#60a5fa",
    name: "Titration & Gravimetric Analysis",
    why: "Hands-on lab skill directly tested in QC/QA interviews and used daily on the job — precision here is what separates a passable analyst from a trusted one.",
    topics: ["Acid-base titration", "Redox titration", "Gravimetric precipitation & filtration", "Standard solution preparation"],
    priority: "High",
    percent: 85,
  },
  {
    id: "python-data-analysis",
    color: "#f472b6",
    name: "Python / Data Analysis",
    why: "Modern QC and R&D labs log data digitally — being able to clean, plot, and statistically analyze batch data (control charts, calibration curves) is an increasingly common ask.",
    topics: ["Pandas for lab-data cleanup", "Matplotlib for calibration curves", "Basic statistics (mean, SD, control limits)", "Excel/Sheets automation as a stepping stone"],
    priority: "Medium",
    percent: 60,
  },
  {
    id: "scientific-communication",
    color: "#fbbf24",
    name: "Scientific Communication",
    why: "Batch reports, deviation write-ups, and research papers all need to explain a calculation and its implications clearly — this is what turns a good chemist into someone trusted with independent decisions.",
    topics: ["Technical report writing", "SOP documentation", "Presenting data to non-specialists", "Literature review basics"],
    priority: "Medium",
    percent: 55,
  },
];

export const FREE_RESOURCES = [
  {
    name: "Stoichiometry and Mole Concept",
    provider: "NPTEL (IIT)",
    type: "Video course",
    desc: "Free rigorous coverage of mole concept fundamentals through an engineering lens — good bridge from Class 11-12 to college-level problem-solving.",
  },
  {
    name: "Introduction to Chemistry",
    provider: "Coursera (Duke University, audit free)",
    type: "MOOC",
    desc: "Covers stoichiometry, solutions, and quantitative chemistry with problem sets — auditable at no cost.",
  },
  {
    name: "Analytical/QC lab internships",
    provider: "State pharma clusters, local testing labs",
    type: "Internship",
    desc: "Even a 4-6 week internship at a local QC lab gives direct hands-on titration/gravimetric practice that strengthens both resume and real skill.",
  },
];

// ----------------------------------------------------------------------------
// 7. EXAMS (reused/adapted from Oxidation-Reduction page — same gating exams)
// ----------------------------------------------------------------------------
export const EXAMS = [
  {
    badge: "JEE",
    color: "#3b82f6",
    title: "JEE Main + Advanced",
    desc: "Gateway to IITs/NITs for Chemical, Metallurgical, and allied engineering branches — Physical Chemistry section is mole-concept-heavy.",
    meta: ["Class 12", "National level", "Engineering entry"],
  },
  {
    badge: "NEET",
    color: "#10b981",
    title: "NEET",
    desc: "Entry to B.Pharm (in several states/colleges) and medical-adjacent chemistry programs — stoichiometry and solutions are core to the chemistry section.",
    meta: ["Class 12", "National level", "Pharmacy/Medical entry"],
  },
  {
    badge: "CUET",
    color: "#f59e0b",
    title: "CUET",
    desc: "Common entrance for central and many state universities' B.Sc Chemistry/Biotechnology programs.",
    meta: ["Class 12", "National level", "UG entry"],
  },
  {
    badge: "JAM",
    color: "#8b5cf6",
    title: "IIT JAM",
    desc: "Entry to M.Sc Chemistry and integrated PhD programs at IITs — direct continuation of quantitative problem-solving from UG.",
    meta: ["Post-UG", "National level", "M.Sc/PhD entry"],
  },
  {
    badge: "NET",
    color: "#ec4899",
    title: "CSIR-NET (JRF)",
    desc: "Qualifies for PhD admission with fellowship and eligibility for Lectureship — the standard gate into research careers.",
    meta: ["Post-PG", "National level", "Research/Teaching entry"],
  },
  {
    badge: "GATE",
    color: "#ef4444",
    title: "GATE (Chemical/Metallurgical Engg)",
    desc: "Required for M.Tech admission with stipend, and used directly by PSUs (IOCL, SAIL, ONGC) for recruitment.",
    meta: ["Post-UG", "National level", "M.Tech/PSU entry"],
  },
  {
    badge: "OCES",
    color: "#06b6d4",
    title: "BARC OCES/DGFS",
    desc: "Direct entry to Bhabha Atomic Research Centre as a Scientific Officer trainee — a well-known path for chemistry/chem-engg grads into govt research.",
    meta: ["Post-UG/PG", "National level", "Government research entry"],
  },
  {
    badge: "GRE",
    color: "#14b8a6",
    title: "GRE + IELTS/TOEFL",
    desc: "Standard requirement for MS admissions abroad (US primarily; some EU programs waive GRE but still need English proficiency proof).",
    meta: ["Post-UG", "International", "MS/PhD abroad entry"],
  },
];

// ============================================================================
// HONEST TALLY (as of this file's last edit, Sep 2026)
// ============================================================================
// "search"       (live-verified, cite-able):  8 entries
//   - QC Analyst India + US, Analytical Chemist India, Process Engineer US,
//     Metallurgist (fresher), Environmental Chemist (fresher), B.Pharm,
//     Assistant Professor / CSIR-DRDO Scientist B (public-scale, see below)
// "public-scale" (fixed govt pay matrix, high confidence): 3 entries
//   - Assistant Professor Level 10, CSIR/DRDO Scientist B Level 10, JRF stipend
// "estimate"     (NOT verified — placeholder, reasoning-based): ~14 entries
//   - Every abroad country except general US figures, most UG course fresher
//     salaries (B.Sc Chem, B.Tech Chem Engg, Biotech, Food Tech), all PG_STEPS
//     salary figures, Process/Production Chemist India, all senior-level
//     figures for Metallurgist/Environmental Chemist/CSIR-DRDO Scientist.
//
// Before publishing to students: prioritize re-verifying the "estimate"
// entries above the "search"/"public-scale" ones — those are the real gaps.
// ============================================================================
