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
import "../styles/BeyondTheMole.css";
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
} from "../data/moleConceptCareerData";

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
  return <span className="bm-badge">{children}</span>;
}

function SalaryBar({ pct }) {
  return (
    <div className="bm-salary-bar">
      <div className="bm-salary-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Expand({ open, children }) {
  if (!open) return null;
  return <div className="bm-expand">{children}</div>;
}

function DetailGrid({ items }) {
  const rows = items.filter(([, val]) => val);
  if (rows.length === 0) return null;
  return (
    <div className="bm-detail-grid">
      {rows.map(([label, val]) => (
        <div className="bm-detail-item" key={label}>
          <div className="bm-detail-label">{label}</div>
          <div className="bm-detail-val">{val}</div>
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
    <span className={`bm-verified bm-verified--${meta.cls}`}>
      <Icon size={13} /> {meta.label}
    </span>
  );
}

function VerifiedNote({ note }) {
  if (!note) return null;
  return (
    <div className="bm-verified-note">
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

export default function BeyondTheMole({ onBack, darkMode = true }) {
  const [activeTab, setActiveTab] = useState("ug");
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={darkMode ? "bm-root" : "bm-root light"}>
      {/* Topbar */}
      <div className="bm-topbar">
        <div className="bm-top-left">
          <div className="bm-logo-area">
            <img className="bm-logo-img" src={valencyLogo} alt="Valency" />
            <div className="bm-logo-sub">LEARN • BOND • MASTER</div>
          </div>
          <div className="bm-divider" />
          <div className="bm-page-title">
            <FlaskConical size={22} />
            <span>Class 11</span>
          </div>
        </div>
        <button className="bm-back-btn" onClick={onBack}>
          <ArrowLeft size={22} /> Back to Class 11
        </button>
      </div>

      {/* Hero */}
      <div className="bm-hero">
        <div className="bm-hero-chip">
          <FlaskConical size={20} /> CLASS 11 CHEMISTRY — MOLE CONCEPT
        </div>
        <h1 className="bm-hero-title">
          Your Complete Career<br />
          <span>Roadmap After Class 12</span>
        </h1>
        <p className="bm-hero-sub">
          Every course, exam, job role, salary, and skill connected to the mole concept —
          with a transparent verification tag on every figure, so you know what's confirmed
          and what's still an estimate.
        </p>
        <div className="bm-hero-stats">
          <div className="bm-stat search"><div className="bm-stat-num">8</div><div className="bm-stat-label">Live-verified figures</div></div>
          <div className="bm-stat scale"><div className="bm-stat-num">3</div><div className="bm-stat-label">Official pay scales</div></div>
          <div className="bm-stat estimate"><div className="bm-stat-num">14</div><div className="bm-stat-label">Estimates — flagged</div></div>
          <div className="bm-stat"><div className="bm-stat-num">6</div><div className="bm-stat-label">Core industries</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bm-nav-tabs">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={activeTab === t.id ? "bm-tab active" : "bm-tab"}
              onClick={() => { setActiveTab(t.id); setExpandedId(null); }}
            >
              <Icon size={20} className="bm-tab-icon" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="bm-section">
        {/* UG COURSES */}
        {activeTab === "ug" && (
          <>
            <div className="bm-sec-title">Undergraduate courses after Class 12</div>
            <div className="bm-sec-desc">These degree programs are built on mole-concept fluency. Click any row to see details, required exams, and career outcomes.</div>
            <div className="bm-table-wrap">
              <div className="bm-table-header bm-col-4">
                <span>Course and college type</span><span>Entrance exam</span><span>Duration</span><span>Avg. starting salary</span>
              </div>
              {UG_COURSES.map((c) => (
                <div key={c.id}>
                  <div className="bm-table-row bm-col-4" onClick={() => toggle(c.id)}>
                    <div>
                      <div className="bm-row-main">{c.title} <ChevronDown size={20} className={expandedId === c.id ? "bm-arrow open" : "bm-arrow"} /></div>
                      <div className="bm-row-sub">{c.subtitle}</div>
                    </div>
                    <div>{c.entranceExams.map((e) => <Badge key={e}>{e}</Badge>)}</div>
                    <div><Badge>{c.duration}</Badge></div>
                    <div>
                      <div className="bm-salary-text">{c.salary}</div>
                      <SalaryBar pct={c.salaryPercent} />
                      <VerifiedBadge verified={c.verified} />
                    </div>
                  </div>
                  <Expand open={expandedId === c.id}>
                    <div><b className="bm-accent">Why this course?</b> {c.whyBlurb}</div>
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
            <div className="bm-sec-title">Postgraduate and research pathways</div>
            <div className="bm-sec-desc">After your undergraduate degree, these are the paths that take you deeper into stoichiometric and quantitative chemistry.</div>
            <div className="bm-path-wrap">
              {PG_STEPS.map((group, gi) => (
                <div className="bm-path-step" key={group.group}>
                  <div className="bm-path-line-col">
                    <div className="bm-path-circle">{group.group.charAt(0)}</div>
                    {gi < PG_STEPS.length - 1 && <div className="bm-path-connector" />}
                  </div>
                  <div className="bm-path-body">
                    <div className="bm-path-title">{group.group}</div>
                    <div className="bm-path-entries">
                      {group.steps.map((s, si) => {
                        const key = `${group.group}-${si}`;
                        return (
                          <div key={key}>
                            <div className="bm-path-entry" onClick={() => toggle(key)}>
                              <div className="bm-pe-left">
                                <div className="bm-pe-title">{s.title} <ChevronDown size={18} className={expandedId === key ? "bm-arrow open" : "bm-arrow"} /></div>
                                <div className="bm-pe-desc">{s.desc}</div>
                                {s.badges && <div className="bm-pe-badges">{s.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="bm-pe-right">
                                <div className="bm-pe-salary">{s.salary}</div>
                                <div className="bm-pe-tag">{s.tag}</div>
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
            <div className="bm-sec-title">Jobs in India — where mole concept is used daily</div>
            <div className="bm-sec-desc">Real roles, real companies. Click any row for details.</div>
            <div className="bm-table-wrap">
              <div className="bm-table-header bm-col-5">
                <span>Role and sector</span><span>Key employers</span><span>Qualification</span><span>Fresher salary</span><span>Senior salary</span>
              </div>
              {JOBS_INDIA.map((j) => (
                <div key={j.id}>
                  <div className="bm-table-row bm-col-5" onClick={() => toggle(j.id)}>
                    <div>
                      <div className="bm-row-main">{j.title} <ChevronDown size={20} className={expandedId === j.id ? "bm-arrow open" : "bm-arrow"} /></div>
                      <div className="bm-row-sub">{j.subtitle}</div>
                    </div>
                    <div><div className="bm-row-sub">{j.employers.join(", ")}</div></div>
                    <div>{j.qualifications.map((q) => <Badge key={q}>{q}</Badge>)}</div>
                    <div><div className="bm-salary-text">{j.fresherSalary}</div><SalaryBar pct={j.fresherPercent} /></div>
                    <div><div className="bm-salary-text">{j.seniorSalary}</div><SalaryBar pct={j.seniorPercent} /></div>
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
            <div className="bm-sec-title">Global career destinations for mole-concept-driven roles</div>
            <div className="bm-sec-desc">Countries and companies hiring Indian chemistry and chemical-engineering talent. Salaries in local currency with INR equivalent.</div>
            <div className="bm-path-wrap">
              {JOBS_ABROAD.map((country, ci) => (
                <div className="bm-path-step" key={country.country}>
                  <div className="bm-path-line-col">
                    <div className="bm-path-circle">{country.flag}</div>
                    {ci < JOBS_ABROAD.length - 1 && <div className="bm-path-connector" />}
                  </div>
                  <div className="bm-path-body">
                    <div className="bm-path-title">{country.title}</div>
                    <div className="bm-path-entries">
                      {country.entries.map((e, ei) => {
                        const key = `${country.country}-${ei}`;
                        return (
                          <div key={key}>
                            <div className="bm-path-entry" onClick={() => toggle(key)}>
                              <div className="bm-pe-left">
                                <div className="bm-pe-title">{e.title} <ChevronDown size={18} className={expandedId === key ? "bm-arrow open" : "bm-arrow"} /></div>
                                <div className="bm-pe-desc">{e.desc}</div>
                                {e.badges && <div className="bm-pe-badges">{e.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="bm-pe-right">
                                <div className="bm-pe-salary">{e.salary}</div>
                                <div className="bm-pe-tag">{e.inrTag}</div>
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
            <div className="bm-sec-title">Industrial applications of the mole concept</div>
            <div className="bm-sec-desc">Every industry below runs on stoichiometric calculation as a core process — not a side subject.</div>
            <div className="bm-ind-list">
              {INDUSTRIES.map((ind, i) => (
                <div className="bm-ind-row" key={ind.id}>
                  <div className="bm-ind-num">{i + 1}</div>
                  <div className="bm-ind-body">
                    <div className="bm-ind-title">{ind.title}</div>
                    <div className="bm-ind-desc">{ind.desc}</div>
                    <div className="bm-ind-tags">{ind.companies.map((c) => <Badge key={c}>{c}</Badge>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <>
            <div className="bm-why-banner">
              <div className="bm-why-icon">🎯</div>
              <div>
                <div className="bm-why-title">What employers actually want</div>
                <div className="bm-why-text">Technical knowledge alone is not enough. These are the skills that separate candidates who get hired from those who don't — build them alongside your degree.</div>
              </div>
            </div>
            <div className="bm-skill-grid">
              {SKILLS.map((s) => (
                <div className="bm-skill-card" key={s.id}>
                  <div className="bm-skill-top">
                    <div
                      className="bm-skill-icon"
                      style={{ background: `${s.color}22`, color: s.color, borderColor: `${s.color}55` }}
                    >
                      <Lightbulb size={24} />
                    </div>
                    <div><div className="bm-skill-name">{s.name}</div><div className="bm-skill-why">{s.why}</div></div>
                  </div>
                  <div className="bm-skill-topics">{s.topics.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                  <div className="bm-prog-row">
                    <span className="bm-prog-label">Employer priority</span>
                    <div className="bm-prog-bar"><div className="bm-prog-fill" style={{ width: `${s.percent}%`, background: s.color }} /></div>
                    <span className="bm-prog-val">{s.priority}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bm-free-box">
              <div className="bm-free-title">Free ways to build these skills right now</div>
              <div className="bm-ind-list">
                {FREE_RESOURCES.map((r, i) => (
                  <div className="bm-ind-row bm-ind-row--compact" key={r.name}>
                    <div className="bm-ind-num">{i + 1}</div>
                    <div className="bm-ind-body">
                      <div className="bm-ind-title">{r.name} <span className="bm-free-provider">— {r.provider}</span></div>
                      <div className="bm-ind-desc">{r.desc}</div>
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
            <div className="bm-sec-title">Key entrance exams — complete reference</div>
            <div className="bm-sec-desc">Every exam you need to know, when to write it, and exactly what it opens for you as a mole-concept-strong chemistry student.</div>
            <div className="bm-exam-list">
              {EXAMS.map((ex) => (
                <div className="bm-exam-row" key={ex.badge}>
                  <div className="bm-exam-badge-box">
                    <span className="bm-exam-name-badge" style={{ background: `${ex.color}1f`, color: ex.color, borderColor: `${ex.color}55` }}>{ex.badge}</span>
                  </div>
                  <div className="bm-exam-body">
                    <div className="bm-exam-title">{ex.title}</div>
                    <div className="bm-exam-desc">{ex.desc}</div>
                    <div className="bm-exam-meta">{ex.meta.map((m) => <Badge key={m}>{m}</Badge>)}</div>
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
