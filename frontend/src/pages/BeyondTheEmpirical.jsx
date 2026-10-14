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
  FlaskConical,
  CheckCircle2,
  Landmark,
  AlertTriangle,
} from "lucide-react";
import "../styles/BeyondTheEmpirical.css";
import valencyLogo from "../assets/valency-logo.svg";
import {
  UG_COURSES,
  PG_STEPS,
  JOBS_INDIA,
  JOBS_ABROAD,
  INDUSTRIES,
  SKILLS,
  FREE_RESOURCES,
  EXAMS,
} from "../data/empiricalFormulaCareerData";

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

const VERIFY_META = {
  search: { icon: CheckCircle2, label: "Verified (web)", cls: "search" },
  "public-scale": { icon: Landmark, label: "Official pay scale", cls: "scale" },
  estimate: { icon: AlertTriangle, label: "Estimate", cls: "estimate" },
};

/* ── Small reusable pieces ────────────────────────────────────────────── */

function Badge({ children }) {
  return <span className="bte-badge">{children}</span>;
}

function SalaryBar({ pct }) {
  return (
    <div className="bte-salary-bar">
      <div className="bte-salary-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Expand({ open, children }) {
  if (!open) return null;
  return <div className="bte-expand">{children}</div>;
}

function DetailGrid({ items }) {
  const rows = items.filter(([, val]) => val);
  if (rows.length === 0) return null;
  return (
    <div className="bte-detail-grid">
      {rows.map(([label, val]) => (
        <div className="bte-detail-item" key={label}>
          <div className="bte-detail-label">{label}</div>
          <div className="bte-detail-val">{val}</div>
        </div>
      ))}
    </div>
  );
}

function VerifiedBadge({ verified }) {
  const meta = VERIFY_META[verified];
  if (!meta) return null;
  const Icon = meta.icon;
  return (
    <span className={`bte-verified bte-verified--${meta.cls}`}>
      <Icon size={13} /> {meta.label}
    </span>
  );
}

function VerifiedNote({ note }) {
  if (!note) return null;
  return (
    <div className="bte-verified-note">
      <strong>Source note:</strong> {note}
    </div>
  );
}

function courseDetailItems(details) {
  return [
    ["Top colleges", details.topColleges?.join(", ")],
    ["Career exits", details.careerExits?.join(", ")],
    ["Key subjects", details.keySubjects?.join(", ")],
    ["Further study", details.furtherStudy?.join(", ")],
  ];
}

/* ── Main component ───────────────────────────────────────────────────── */

export default function BeyondTheEmpirical({ onBack, darkMode = true }) {
  const [activeTab, setActiveTab] = useState("ug");
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={darkMode ? "bte-root" : "bte-root light"}>
      {/* Topbar */}
      <div className="bte-topbar">
        <div className="bte-top-left">
          <div className="bte-logo-area">
            <img className="bte-logo-img" src={valencyLogo} alt="Valency" />
            <div className="bte-logo-sub">LEARN • BOND • MASTER</div>
          </div>
          <div className="bte-divider" />
          <div className="bte-page-title">
            <FlaskConical size={22} />
            <span>Class 11</span>
          </div>
        </div>
        <button className="bte-back-btn" onClick={onBack}>
          <ArrowLeft size={22} /> Back to Class 11
        </button>
      </div>

      {/* Hero */}
      <div className="bte-hero">
        <div className="bte-hero-chip">
          <FlaskConical size={20} /> CLASS 11 CHEMISTRY — EMPIRICAL &amp; MOLECULAR FORMULA
        </div>
        <h1 className="bte-hero-title">
          Your Complete Career<br />
          <span>Roadmap After Class 12</span>
        </h1>
        <p className="bte-hero-sub">
          Every course, exam, job role, salary, and skill connected to composition analysis and
          formula determination — with a transparent verification tag on every figure, so you know
          what's confirmed and what's still an estimate.
        </p>
        <div className="bte-hero-stats">
          <div className="bte-stat search"><div className="bte-stat-num">17</div><div className="bte-stat-label">Live-verified figures</div></div>
          <div className="bte-stat scale"><div className="bte-stat-num">2</div><div className="bte-stat-label">Official pay scales</div></div>
          <div className="bte-stat estimate"><div className="bte-stat-num">4</div><div className="bte-stat-label">Estimates — flagged</div></div>
          <div className="bte-stat"><div className="bte-stat-num">7</div><div className="bte-stat-label">Core industries</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bte-nav-tabs">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={activeTab === t.id ? "bte-tab active" : "bte-tab"}
              onClick={() => { setActiveTab(t.id); setExpandedId(null); }}
            >
              <Icon size={20} className="bte-tab-icon" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="bte-section">
        {/* UG COURSES */}
        {activeTab === "ug" && (
          <>
            <div className="bte-sec-title">Undergraduate courses after Class 12</div>
            <div className="bte-sec-desc">These degree programs are built on composition-analysis fluency. Click any row to see details, required exams, and career outcomes.</div>
            <div className="bte-table-wrap">
              <div className="bte-table-header bte-col-4">
                <span>Course and college type</span><span>Entrance exam</span><span>Duration</span><span>Avg. starting salary</span>
              </div>
              {UG_COURSES.map((c) => (
                <div key={c.id}>
                  <div className="bte-table-row bte-col-4" onClick={() => toggle(c.id)}>
                    <div>
                      <div className="bte-row-main">{c.title} <ChevronDown size={20} className={expandedId === c.id ? "bte-arrow open" : "bte-arrow"} /></div>
                      <div className="bte-row-sub">{c.subtitle}</div>
                    </div>
                    <div>{c.entranceExams.map((e) => <Badge key={e}>{e}</Badge>)}</div>
                    <div><Badge>{c.duration}</Badge></div>
                    <div>
                      <div className="bte-salary-text">{c.salary}</div>
                      <SalaryBar pct={c.salaryPercent} />
                      <VerifiedBadge verified={c.verified} />
                    </div>
                  </div>
                  <Expand open={expandedId === c.id}>
                    <div><b className="bte-accent">Why this course?</b> {c.whyBlurb}</div>
                    <DetailGrid items={courseDetailItems(c.details)} />
                    <VerifiedNote note={c.verifiedNote} />
                  </Expand>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PG / RESEARCH */}
        {activeTab === "pg" && (
          <>
            <div className="bte-sec-title">Postgraduate and research pathways</div>
            <div className="bte-sec-desc">After your undergraduate degree, these are the paths that take you deeper into instrumental and composition-analysis chemistry.</div>
            <div className="bte-path-wrap">
              {PG_STEPS.map((group, gi) => (
                <div className="bte-path-step" key={group.group}>
                  <div className="bte-path-line-col">
                    <div className="bte-path-circle">{group.group.charAt(0)}</div>
                    {gi < PG_STEPS.length - 1 && <div className="bte-path-connector" />}
                  </div>
                  <div className="bte-path-body">
                    <div className="bte-path-title">{group.group}</div>
                    <div className="bte-path-entries">
                      {group.steps.map((s, si) => {
                        const key = `${group.group}-${si}`;
                        return (
                          <div key={key}>
                            <div className="bte-path-entry" onClick={() => toggle(key)}>
                              <div className="bte-pe-left">
                                <div className="bte-pe-title">{s.title} <ChevronDown size={18} className={expandedId === key ? "bte-arrow open" : "bte-arrow"} /></div>
                                <div className="bte-pe-desc">{s.desc}</div>
                                {s.badges && <div className="bte-pe-badges">{s.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="bte-pe-right">
                                <div className="bte-pe-salary">{s.salary}</div>
                                <div className="bte-pe-tag">{s.tag}</div>
                                <VerifiedBadge verified={s.verified} />
                              </div>
                            </div>
                            <Expand open={expandedId === key}>
                              {s.details && <DetailGrid items={courseDetailItems(s.details)} />}
                              <VerifiedNote note={s.verifiedNote} />
                            </Expand>
                          </div>
                        );
                      })}
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
            <div className="bte-sec-title">Jobs in India — where composition analysis is used daily</div>
            <div className="bte-sec-desc">Real roles, real companies. Click any row for details.</div>
            <div className="bte-table-wrap">
              <div className="bte-table-header bte-col-5">
                <span>Role and sector</span><span>Key employers</span><span>Qualification</span><span>Fresher salary</span><span>Senior salary</span>
              </div>
              {JOBS_INDIA.map((j) => (
                <div key={j.id}>
                  <div className="bte-table-row bte-col-5" onClick={() => toggle(j.id)}>
                    <div>
                      <div className="bte-row-main">{j.title} <ChevronDown size={20} className={expandedId === j.id ? "bte-arrow open" : "bte-arrow"} /></div>
                      <div className="bte-row-sub">{j.subtitle}</div>
                    </div>
                    <div><div className="bte-row-sub">{j.employers.join(", ")}</div></div>
                    <div>{j.qualifications.map((q) => <Badge key={q}>{q}</Badge>)}</div>
                    <div><div className="bte-salary-text">{j.fresherSalary}</div><SalaryBar pct={j.fresherPercent} /></div>
                    <div><div className="bte-salary-text">{j.seniorSalary}</div><SalaryBar pct={j.seniorPercent} /></div>
                  </div>
                  <Expand open={expandedId === j.id}>
                    <VerifiedBadge verified={j.verified} />
                    <DetailGrid items={[
                      ["What you do daily", j.details.dayToDay?.join(" · ")],
                      ["Growth path", j.details.growthPath?.join(" · ")],
                      ["Key skills", j.details.keySkills?.join(", ")],
                    ]} />
                    <VerifiedNote note={j.verifiedNote} />
                  </Expand>
                </div>
              ))}
            </div>
          </>
        )}

        {/* JOBS ABROAD */}
        {activeTab === "jobsAbroad" && (
          <>
            <div className="bte-sec-title">Global career destinations for composition-analysis roles</div>
            <div className="bte-sec-desc">Countries and companies hiring for analytical and forensic chemistry skills. Salaries in local currency with INR equivalent.</div>
            <div className="bte-path-wrap">
              {JOBS_ABROAD.map((country, ci) => (
                <div className="bte-path-step" key={country.country}>
                  <div className="bte-path-line-col">
                    <div className="bte-path-circle">{country.flag}</div>
                    {ci < JOBS_ABROAD.length - 1 && <div className="bte-path-connector" />}
                  </div>
                  <div className="bte-path-body">
                    <div className="bte-path-title">{country.title}</div>
                    <div className="bte-path-entries">
                      {country.entries.map((e, ei) => {
                        const key = `${country.country}-${ei}`;
                        return (
                          <div key={key}>
                            <div className="bte-path-entry" onClick={() => toggle(key)}>
                              <div className="bte-pe-left">
                                <div className="bte-pe-title">{e.title} <ChevronDown size={18} className={expandedId === key ? "bte-arrow open" : "bte-arrow"} /></div>
                                <div className="bte-pe-desc">{e.desc}</div>
                                {e.badges && <div className="bte-pe-badges">{e.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="bte-pe-right">
                                <div className="bte-pe-salary">{e.salary}</div>
                                <div className="bte-pe-tag">{e.inrTag}</div>
                                <VerifiedBadge verified={e.verified} />
                              </div>
                            </div>
                            <Expand open={expandedId === key}>
                              <VerifiedNote note={e.verifiedNote} />
                            </Expand>
                          </div>
                        );
                      })}
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
            <div className="bte-sec-title">Industrial applications of composition analysis</div>
            <div className="bte-sec-desc">Every industry below runs the percentage → mass → mole → formula pipeline as a core process — not a side subject.</div>
            <div className="bte-ind-list">
              {INDUSTRIES.map((ind, i) => (
                <div className="bte-ind-row" key={ind.id}>
                  <div className="bte-ind-num">{i + 1}</div>
                  <div className="bte-ind-body">
                    <div className="bte-ind-title">{ind.title}</div>
                    <div className="bte-ind-desc">{ind.desc}</div>
                    <div className="bte-ind-tags">{ind.companies.map((c) => <Badge key={c}>{c}</Badge>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <>
            <div className="bte-why-banner">
              <div className="bte-why-icon">🎯</div>
              <div>
                <div className="bte-why-title">What employers actually want</div>
                <div className="bte-why-text">Technical knowledge alone is not enough. These are the skills that separate candidates who get hired from those who don't — build them alongside your degree.</div>
              </div>
            </div>
            <div className="bte-skill-grid">
              {SKILLS.map((s) => (
                <div className="bte-skill-card" key={s.id}>
                  <div className="bte-skill-top">
                    <div
                      className="bte-skill-icon"
                      style={{ background: `${s.color}22`, color: s.color, borderColor: `${s.color}55` }}
                    >
                      <Lightbulb size={24} />
                    </div>
                    <div><div className="bte-skill-name">{s.name}</div><div className="bte-skill-why">{s.why}</div></div>
                  </div>
                  <div className="bte-skill-topics">{s.topics.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                  <div className="bte-prog-row">
                    <span className="bte-prog-label">Employer priority</span>
                    <div className="bte-prog-bar"><div className="bte-prog-fill" style={{ width: `${s.percent}%`, background: s.color }} /></div>
                    <span className="bte-prog-val">{s.priority}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bte-free-box">
              <div className="bte-free-title">Free ways to build these skills right now</div>
              <div className="bte-ind-list">
                {FREE_RESOURCES.map((r, i) => (
                  <div className="bte-ind-row bte-ind-row--compact" key={r.name}>
                    <div className="bte-ind-num">{i + 1}</div>
                    <div className="bte-ind-body">
                      <div className="bte-ind-title">{r.name} <span className="bte-free-provider">— {r.provider}</span></div>
                      <div className="bte-ind-desc">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* EXAMS */}
        {activeTab === "exams" && (
          <>
            <div className="bte-sec-title">Key entrance exams — complete reference</div>
            <div className="bte-sec-desc">Every exam you need to know, when to write it, and exactly what it opens for you — including what's genuinely new for the 2026 cycle.</div>
            <div className="bte-exam-list">
              {EXAMS.map((ex) => (
                <div className="bte-exam-row" key={ex.badge}>
                  <div className="bte-exam-badge-box">
                    <span className="bte-exam-name-badge" style={{ background: `${ex.color}1f`, color: ex.color, borderColor: `${ex.color}55` }}>{ex.badge}</span>
                  </div>
                  <div className="bte-exam-body">
                    <div className="bte-exam-title">{ex.title}</div>
                    <div className="bte-exam-desc">{ex.desc}</div>
                    <div className="bte-exam-meta">{ex.meta.map((m) => <Badge key={m}>{m}</Badge>)}</div>
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
