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
import "../styles/BeyondThePeriodicTable.css";
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
} from "../data/periodicCareerData";

function countVerified() {
  const tally = { search: 0, "public-scale": 0, estimate: 0 };
  const add = (x) => { if (x && tally[x.verified] !== undefined) tally[x.verified] += 1; };
  UG_COURSES.forEach(add);
  PG_STEPS.forEach((g) => g.steps.forEach(add));
  JOBS_INDIA.forEach(add);
  JOBS_ABROAD.forEach((c) => c.entries.forEach(add));
  return tally;
}
const tally = countVerified();

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
  return <span className="bpt-badge">{children}</span>;
}

function SalaryBar({ pct }) {
  return (
    <div className="bpt-salary-bar">
      <div className="bpt-salary-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Expand({ open, children }) {
  if (!open) return null;
  return <div className="bpt-expand">{children}</div>;
}

function DetailGrid({ items }) {
  const rows = items.filter(([, val]) => val);
  if (rows.length === 0) return null;
  return (
    <div className="bpt-detail-grid">
      {rows.map(([label, val]) => (
        <div className="bpt-detail-item" key={label}>
          <div className="bpt-detail-label">{label}</div>
          <div className="bpt-detail-val">{val}</div>
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
    <span className={`bpt-verified bpt-verified--${meta.cls}`}>
      <Icon size={13} /> {meta.label}
    </span>
  );
}

function VerifiedNote({ note }) {
  if (!note) return null;
  return (
    <div className="bpt-verified-note">
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

export default function BeyondThePeriodicTable({ onBack, darkMode = true }) {
  const [activeTab, setActiveTab] = useState("ug");
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={darkMode ? "bpt-root" : "bpt-root light"}>
      {/* Topbar */}
      <div className="bpt-topbar">
        <div className="bpt-top-left">
          <div className="bpt-logo-area">
            <img className="bpt-logo-img" src={valencyLogo} alt="Valency" />
            <div className="bpt-logo-sub">LEARN • BOND • MASTER</div>
          </div>
          <div className="bpt-divider" />
          <div className="bpt-page-title">
            <FlaskConical size={22} />
            <span>Class 11</span>
          </div>
        </div>
        <button className="bpt-back-btn" onClick={onBack}>
          <ArrowLeft size={22} /> Back to Class 11
        </button>
      </div>

      {/* Hero */}
      <div className="bpt-hero">
        <div className="bpt-hero-chip">
          <FlaskConical size={20} /> CLASS 11 CHEMISTRY — PERIODIC CLASSIFICATION OF ELEMENTS
        </div>
        <h1 className="bpt-hero-title">
          Your Complete Career<br />
          <span>Roadmap After Class 12</span>
        </h1>
        <p className="bpt-hero-sub">
          Every course, exam, job role, salary, and skill connected to groups, periods, blocks and
          periodic trends — from steel plants and battery factories to pharma labs and
          semiconductor fabs — with a transparent verification tag on every figure, so you know
          what's confirmed and what's still an estimate.
        </p>
        <div className="bpt-hero-stats">
          <div className="bpt-stat search"><div className="bpt-stat-num">{tally.search}</div><div className="bpt-stat-label">Web-verified figures</div></div>
          <div className="bpt-stat scale"><div className="bpt-stat-num">{tally["public-scale"]}</div><div className="bpt-stat-label">Official pay scales</div></div>
          <div className="bpt-stat estimate"><div className="bpt-stat-num">{tally.estimate}</div><div className="bpt-stat-label">Estimates — flagged</div></div>
          <div className="bpt-stat"><div className="bpt-stat-num">{INDUSTRIES.length}</div><div className="bpt-stat-label">Core industries</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bpt-nav-tabs">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={activeTab === t.id ? "bpt-tab active" : "bpt-tab"}
              onClick={() => { setActiveTab(t.id); setExpandedId(null); }}
            >
              <Icon size={20} className="bpt-tab-icon" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="bpt-section">
        {/* UG COURSES */}
        {activeTab === "ug" && (
          <>
            <div className="bpt-sec-title">Undergraduate courses after Class 12</div>
            <div className="bpt-sec-desc">These degree programs build directly on the periodic law and periodic trends. Click any row to see details, required exams, and career outcomes.</div>
            <div className="bpt-table-wrap">
              <div className="bpt-table-header bpt-col-4">
                <span>Course and college type</span><span>Entrance exam</span><span>Duration</span><span>Avg. starting salary</span>
              </div>
              {UG_COURSES.map((c) => (
                <div key={c.id}>
                  <div className="bpt-table-row bpt-col-4" onClick={() => toggle(c.id)}>
                    <div>
                      <div className="bpt-row-main">{c.title} <ChevronDown size={20} className={expandedId === c.id ? "bpt-arrow open" : "bpt-arrow"} /></div>
                      <div className="bpt-row-sub">{c.subtitle}</div>
                    </div>
                    <div>{c.entranceExams.map((e) => <Badge key={e}>{e}</Badge>)}</div>
                    <div><Badge>{c.duration}</Badge></div>
                    <div>
                      <div className="bpt-salary-text">{c.salary}</div>
                      <SalaryBar pct={c.salaryPercent} />
                      <VerifiedBadge verified={c.verified} />
                    </div>
                  </div>
                  <Expand open={expandedId === c.id}>
                    <div><b className="bpt-accent">Why this course?</b> {c.whyBlurb}</div>
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
            <div className="bpt-sec-title">Postgraduate and research pathways</div>
            <div className="bpt-sec-desc">After your undergraduate degree, these are the paths that take you deeper into inorganic chemistry, materials, batteries and critical minerals.</div>
            <div className="bpt-path-wrap">
              {PG_STEPS.map((group, gi) => (
                <div className="bpt-path-step" key={group.group}>
                  <div className="bpt-path-line-col">
                    <div className="bpt-path-circle">{group.group.charAt(0)}</div>
                    {gi < PG_STEPS.length - 1 && <div className="bpt-path-connector" />}
                  </div>
                  <div className="bpt-path-body">
                    <div className="bpt-path-title">{group.group}</div>
                    <div className="bpt-path-entries">
                      {group.steps.map((s, si) => {
                        const key = `${group.group}-${si}`;
                        return (
                          <div key={key}>
                            <div className="bpt-path-entry" onClick={() => toggle(key)}>
                              <div className="bpt-pe-left">
                                <div className="bpt-pe-title">{s.title} <ChevronDown size={18} className={expandedId === key ? "bpt-arrow open" : "bpt-arrow"} /></div>
                                <div className="bpt-pe-desc">{s.desc}</div>
                                {s.badges && <div className="bpt-pe-badges">{s.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="bpt-pe-right">
                                <div className="bpt-pe-salary">{s.salary}</div>
                                <div className="bpt-pe-tag">{s.tag}</div>
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
            <div className="bpt-sec-title">Jobs in India — where periodic-table knowledge is used daily</div>
            <div className="bpt-sec-desc">Real roles, real companies. Click any row for details.</div>
            <div className="bpt-table-wrap">
              <div className="bpt-table-header bpt-col-5">
                <span>Role and sector</span><span>Key employers</span><span>Qualification</span><span>Fresher salary</span><span>Senior salary</span>
              </div>
              {JOBS_INDIA.map((j) => (
                <div key={j.id}>
                  <div className="bpt-table-row bpt-col-5" onClick={() => toggle(j.id)}>
                    <div>
                      <div className="bpt-row-main">{j.title} <ChevronDown size={20} className={expandedId === j.id ? "bpt-arrow open" : "bpt-arrow"} /></div>
                      <div className="bpt-row-sub">{j.subtitle}</div>
                    </div>
                    <div><div className="bpt-row-sub">{j.employers.join(", ")}</div></div>
                    <div>{j.qualifications.map((q) => <Badge key={q}>{q}</Badge>)}</div>
                    <div><div className="bpt-salary-text">{j.fresherSalary}</div><SalaryBar pct={j.fresherPercent} /></div>
                    <div><div className="bpt-salary-text">{j.seniorSalary}</div><SalaryBar pct={j.seniorPercent} /></div>
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
            <div className="bpt-sec-title">Global career destinations for chemistry, materials and chemical-engineering roles</div>
            <div className="bpt-sec-desc">Countries and employers hiring for chemistry, materials and process skills. Salaries in local currency; INR equivalents are rough and rate-dependent.</div>
            <div className="bpt-path-wrap">
              {JOBS_ABROAD.map((country, ci) => (
                <div className="bpt-path-step" key={country.country}>
                  <div className="bpt-path-line-col">
                    <div className="bpt-path-circle">{country.flag}</div>
                    {ci < JOBS_ABROAD.length - 1 && <div className="bpt-path-connector" />}
                  </div>
                  <div className="bpt-path-body">
                    <div className="bpt-path-title">{country.title}</div>
                    <div className="bpt-path-entries">
                      {country.entries.map((e, ei) => {
                        const key = `${country.country}-${ei}`;
                        return (
                          <div key={key}>
                            <div className="bpt-path-entry" onClick={() => toggle(key)}>
                              <div className="bpt-pe-left">
                                <div className="bpt-pe-title">{e.title} <ChevronDown size={18} className={expandedId === key ? "bpt-arrow open" : "bpt-arrow"} /></div>
                                <div className="bpt-pe-desc">{e.desc}</div>
                                {e.badges && <div className="bpt-pe-badges">{e.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="bpt-pe-right">
                                <div className="bpt-pe-salary">{e.salary}</div>
                                <div className="bpt-pe-tag">{e.inrTag}</div>
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
            <div className="bpt-sec-title">Where periodic classification is applied in industry</div>
            <div className="bpt-sec-desc">Each of these industries picks its materials by group, period and block — the same classification and trends you learned in this lesson.</div>
            <div className="bpt-ind-list">
              {INDUSTRIES.map((ind, i) => (
                <div className="bpt-ind-row" key={ind.id}>
                  <div className="bpt-ind-num">{i + 1}</div>
                  <div className="bpt-ind-body">
                    <div className="bpt-ind-title">{ind.title}</div>
                    <div className="bpt-ind-desc">{ind.desc}</div>
                    <div className="bpt-ind-tags">{ind.companies.map((c) => <Badge key={c}>{c}</Badge>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <>
            <div className="bpt-why-banner">
              <div className="bpt-why-icon">🎯</div>
              <div>
                <div className="bpt-why-title">What employers actually want</div>
                <div className="bpt-why-text">Technical knowledge alone is not enough. These are the skills that separate candidates who get hired from those who don't — build them alongside your degree.</div>
              </div>
            </div>
            <div className="bpt-skill-grid">
              {SKILLS.map((s) => (
                <div className="bpt-skill-card" key={s.id}>
                  <div className="bpt-skill-top">
                    <div
                      className="bpt-skill-icon"
                      style={{ background: `${s.color}22`, color: s.color, borderColor: `${s.color}55` }}
                    >
                      <Lightbulb size={24} />
                    </div>
                    <div><div className="bpt-skill-name">{s.name}</div><div className="bpt-skill-why">{s.why}</div></div>
                  </div>
                  <div className="bpt-skill-topics">{s.topics.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                  <div className="bpt-prog-row">
                    <span className="bpt-prog-label">Employer priority</span>
                    <div className="bpt-prog-bar"><div className="bpt-prog-fill" style={{ width: `${s.percent}%`, background: s.color }} /></div>
                    <span className="bpt-prog-val">{s.priority}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bpt-free-box">
              <div className="bpt-free-title">Free ways to build these skills right now</div>
              <div className="bpt-ind-list">
                {FREE_RESOURCES.map((r, i) => (
                  <div className="bpt-ind-row bpt-ind-row--compact" key={r.name}>
                    <div className="bpt-ind-num">{i + 1}</div>
                    <div className="bpt-ind-body">
                      <div className="bpt-ind-title">{r.name} <span className="bpt-free-provider">— {r.provider}</span></div>
                      <div className="bpt-ind-desc">{r.desc}</div>
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
            <div className="bpt-sec-title">Key entrance exams — complete reference</div>
            <div className="bpt-sec-desc">Every exam you need to know, when to write it, and exactly what it opens for you — including what's genuinely new for the 2026 cycle.</div>
            <div className="bpt-exam-list">
              {EXAMS.map((ex) => (
                <div className="bpt-exam-row" key={ex.badge}>
                  <div className="bpt-exam-badge-box">
                    <span className="bpt-exam-name-badge" style={{ background: `${ex.color}1f`, color: ex.color, borderColor: `${ex.color}55` }}>{ex.badge}</span>
                  </div>
                  <div className="bpt-exam-body">
                    <div className="bpt-exam-title">{ex.title}</div>
                    <div className="bpt-exam-desc">{ex.desc}</div>
                    <div className="bpt-exam-meta">{ex.meta.map((m) => <Badge key={m}>{m}</Badge>)}</div>
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
