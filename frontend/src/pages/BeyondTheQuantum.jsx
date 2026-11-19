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
import "../styles/BeyondTheQuantum.css";
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
} from "../data/quantumCareerData";

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
  return <span className="btq-badge">{children}</span>;
}

function SalaryBar({ pct }) {
  return (
    <div className="btq-salary-bar">
      <div className="btq-salary-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Expand({ open, children }) {
  if (!open) return null;
  return <div className="btq-expand">{children}</div>;
}

function DetailGrid({ items }) {
  const rows = items.filter(([, val]) => val);
  if (rows.length === 0) return null;
  return (
    <div className="btq-detail-grid">
      {rows.map(([label, val]) => (
        <div className="btq-detail-item" key={label}>
          <div className="btq-detail-label">{label}</div>
          <div className="btq-detail-val">{val}</div>
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
    <span className={`btq-verified btq-verified--${meta.cls}`}>
      <Icon size={13} /> {meta.label}
    </span>
  );
}

function VerifiedNote({ note }) {
  if (!note) return null;
  return (
    <div className="btq-verified-note">
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

export default function BeyondTheQuantum({ onBack, darkMode = true }) {
  const [activeTab, setActiveTab] = useState("ug");
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={darkMode ? "btq-root" : "btq-root light"}>
      {/* Topbar */}
      <div className="btq-topbar">
        <div className="btq-top-left">
          <div className="btq-logo-area">
            <img className="btq-logo-img" src={valencyLogo} alt="Valency" />
            <div className="btq-logo-sub">LEARN • BOND • MASTER</div>
          </div>
          <div className="btq-divider" />
          <div className="btq-page-title">
            <FlaskConical size={22} />
            <span>Class 11</span>
          </div>
        </div>
        <button className="btq-back-btn" onClick={onBack}>
          <ArrowLeft size={22} /> Back to Class 11
        </button>
      </div>

      {/* Hero */}
      <div className="btq-hero">
        <div className="btq-hero-chip">
          <FlaskConical size={20} /> CLASS 11 CHEMISTRY — QUANTUM MECHANICS OF AN ATOM
        </div>
        <h1 className="btq-hero-title">
          Your Complete Career<br />
          <span>Roadmap After Class 12</span>
        </h1>
        <p className="btq-hero-sub">
          Every course, exam, job role, salary, and skill connected to quantum numbers, orbitals and
          electron energy levels — from semiconductors and lasers to the new quantum-technology
          mission — with a transparent verification tag on every figure, so you know what's
          confirmed and what's still an estimate.
        </p>
        <div className="btq-hero-stats">
          <div className="btq-stat search"><div className="btq-stat-num">{tally.search}</div><div className="btq-stat-label">Web-verified figures</div></div>
          <div className="btq-stat scale"><div className="btq-stat-num">{tally["public-scale"]}</div><div className="btq-stat-label">Official pay scales</div></div>
          <div className="btq-stat estimate"><div className="btq-stat-num">{tally.estimate}</div><div className="btq-stat-label">Estimates — flagged</div></div>
          <div className="btq-stat"><div className="btq-stat-num">{INDUSTRIES.length}</div><div className="btq-stat-label">Core industries</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="btq-nav-tabs">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={activeTab === t.id ? "btq-tab active" : "btq-tab"}
              onClick={() => { setActiveTab(t.id); setExpandedId(null); }}
            >
              <Icon size={20} className="btq-tab-icon" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="btq-section">
        {/* UG COURSES */}
        {activeTab === "ug" && (
          <>
            <div className="btq-sec-title">Undergraduate courses after Class 12</div>
            <div className="btq-sec-desc">These degree programs build directly on quantum numbers, orbitals and energy levels. Click any row to see details, required exams, and career outcomes.</div>
            <div className="btq-table-wrap">
              <div className="btq-table-header btq-col-4">
                <span>Course and college type</span><span>Entrance exam</span><span>Duration</span><span>Avg. starting salary</span>
              </div>
              {UG_COURSES.map((c) => (
                <div key={c.id}>
                  <div className="btq-table-row btq-col-4" onClick={() => toggle(c.id)}>
                    <div>
                      <div className="btq-row-main">{c.title} <ChevronDown size={20} className={expandedId === c.id ? "btq-arrow open" : "btq-arrow"} /></div>
                      <div className="btq-row-sub">{c.subtitle}</div>
                    </div>
                    <div>{c.entranceExams.map((e) => <Badge key={e}>{e}</Badge>)}</div>
                    <div><Badge>{c.duration}</Badge></div>
                    <div>
                      <div className="btq-salary-text">{c.salary}</div>
                      <SalaryBar pct={c.salaryPercent} />
                      <VerifiedBadge verified={c.verified} />
                    </div>
                  </div>
                  <Expand open={expandedId === c.id}>
                    <div><b className="btq-accent">Why this course?</b> {c.whyBlurb}</div>
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
            <div className="btq-sec-title">Postgraduate and research pathways</div>
            <div className="btq-sec-desc">After your undergraduate degree, these are the paths that take you deeper into quantum mechanics, spectroscopy, semiconductors and quantum technology.</div>
            <div className="btq-path-wrap">
              {PG_STEPS.map((group, gi) => (
                <div className="btq-path-step" key={group.group}>
                  <div className="btq-path-line-col">
                    <div className="btq-path-circle">{group.group.charAt(0)}</div>
                    {gi < PG_STEPS.length - 1 && <div className="btq-path-connector" />}
                  </div>
                  <div className="btq-path-body">
                    <div className="btq-path-title">{group.group}</div>
                    <div className="btq-path-entries">
                      {group.steps.map((s, si) => {
                        const key = `${group.group}-${si}`;
                        return (
                          <div key={key}>
                            <div className="btq-path-entry" onClick={() => toggle(key)}>
                              <div className="btq-pe-left">
                                <div className="btq-pe-title">{s.title} <ChevronDown size={18} className={expandedId === key ? "btq-arrow open" : "btq-arrow"} /></div>
                                <div className="btq-pe-desc">{s.desc}</div>
                                {s.badges && <div className="btq-pe-badges">{s.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="btq-pe-right">
                                <div className="btq-pe-salary">{s.salary}</div>
                                <div className="btq-pe-tag">{s.tag}</div>
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
            <div className="btq-sec-title">Jobs in India — where atomic and quantum ideas are used daily</div>
            <div className="btq-sec-desc">Real roles, real companies. Click any row for details.</div>
            <div className="btq-table-wrap">
              <div className="btq-table-header btq-col-5">
                <span>Role and sector</span><span>Key employers</span><span>Qualification</span><span>Fresher salary</span><span>Senior salary</span>
              </div>
              {JOBS_INDIA.map((j) => (
                <div key={j.id}>
                  <div className="btq-table-row btq-col-5" onClick={() => toggle(j.id)}>
                    <div>
                      <div className="btq-row-main">{j.title} <ChevronDown size={20} className={expandedId === j.id ? "btq-arrow open" : "btq-arrow"} /></div>
                      <div className="btq-row-sub">{j.subtitle}</div>
                    </div>
                    <div><div className="btq-row-sub">{j.employers.join(", ")}</div></div>
                    <div>{j.qualifications.map((q) => <Badge key={q}>{q}</Badge>)}</div>
                    <div><div className="btq-salary-text">{j.fresherSalary}</div><SalaryBar pct={j.fresherPercent} /></div>
                    <div><div className="btq-salary-text">{j.seniorSalary}</div><SalaryBar pct={j.seniorPercent} /></div>
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
            <div className="btq-sec-title">Global career destinations for physics, semiconductor and quantum roles</div>
            <div className="btq-sec-desc">Countries and employers hiring for physics, materials, semiconductor and quantum skills. Salaries in local currency; INR equivalents are rough and rate-dependent.</div>
            <div className="btq-path-wrap">
              {JOBS_ABROAD.map((country, ci) => (
                <div className="btq-path-step" key={country.country}>
                  <div className="btq-path-line-col">
                    <div className="btq-path-circle">{country.flag}</div>
                    {ci < JOBS_ABROAD.length - 1 && <div className="btq-path-connector" />}
                  </div>
                  <div className="btq-path-body">
                    <div className="btq-path-title">{country.title}</div>
                    <div className="btq-path-entries">
                      {country.entries.map((e, ei) => {
                        const key = `${country.country}-${ei}`;
                        return (
                          <div key={key}>
                            <div className="btq-path-entry" onClick={() => toggle(key)}>
                              <div className="btq-pe-left">
                                <div className="btq-pe-title">{e.title} <ChevronDown size={18} className={expandedId === key ? "btq-arrow open" : "btq-arrow"} /></div>
                                <div className="btq-pe-desc">{e.desc}</div>
                                {e.badges && <div className="btq-pe-badges">{e.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>}
                              </div>
                              <div className="btq-pe-right">
                                <div className="btq-pe-salary">{e.salary}</div>
                                <div className="btq-pe-tag">{e.inrTag}</div>
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
            <div className="btq-sec-title">Where quantum mechanics of the atom is applied in industry</div>
            <div className="btq-sec-desc">Each of these industries runs on electrons sitting in quantised energy levels — the same ideas as n, l, m and spin from this lesson.</div>
            <div className="btq-ind-list">
              {INDUSTRIES.map((ind, i) => (
                <div className="btq-ind-row" key={ind.id}>
                  <div className="btq-ind-num">{i + 1}</div>
                  <div className="btq-ind-body">
                    <div className="btq-ind-title">{ind.title}</div>
                    <div className="btq-ind-desc">{ind.desc}</div>
                    <div className="btq-ind-tags">{ind.companies.map((c) => <Badge key={c}>{c}</Badge>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <>
            <div className="btq-why-banner">
              <div className="btq-why-icon">🎯</div>
              <div>
                <div className="btq-why-title">What employers actually want</div>
                <div className="btq-why-text">Technical knowledge alone is not enough. These are the skills that separate candidates who get hired from those who don't — build them alongside your degree.</div>
              </div>
            </div>
            <div className="btq-skill-grid">
              {SKILLS.map((s) => (
                <div className="btq-skill-card" key={s.id}>
                  <div className="btq-skill-top">
                    <div
                      className="btq-skill-icon"
                      style={{ background: `${s.color}22`, color: s.color, borderColor: `${s.color}55` }}
                    >
                      <Lightbulb size={24} />
                    </div>
                    <div><div className="btq-skill-name">{s.name}</div><div className="btq-skill-why">{s.why}</div></div>
                  </div>
                  <div className="btq-skill-topics">{s.topics.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                  <div className="btq-prog-row">
                    <span className="btq-prog-label">Employer priority</span>
                    <div className="btq-prog-bar"><div className="btq-prog-fill" style={{ width: `${s.percent}%`, background: s.color }} /></div>
                    <span className="btq-prog-val">{s.priority}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="btq-free-box">
              <div className="btq-free-title">Free ways to build these skills right now</div>
              <div className="btq-ind-list">
                {FREE_RESOURCES.map((r, i) => (
                  <div className="btq-ind-row btq-ind-row--compact" key={r.name}>
                    <div className="btq-ind-num">{i + 1}</div>
                    <div className="btq-ind-body">
                      <div className="btq-ind-title">{r.name} <span className="btq-free-provider">— {r.provider}</span></div>
                      <div className="btq-ind-desc">{r.desc}</div>
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
            <div className="btq-sec-title">Key entrance exams — complete reference</div>
            <div className="btq-sec-desc">Every exam you need to know, when to write it, and exactly what it opens for you — including what's genuinely new for the 2026 cycle.</div>
            <div className="btq-exam-list">
              {EXAMS.map((ex) => (
                <div className="btq-exam-row" key={ex.badge}>
                  <div className="btq-exam-badge-box">
                    <span className="btq-exam-name-badge" style={{ background: `${ex.color}1f`, color: ex.color, borderColor: `${ex.color}55` }}>{ex.badge}</span>
                  </div>
                  <div className="btq-exam-body">
                    <div className="btq-exam-title">{ex.title}</div>
                    <div className="btq-exam-desc">{ex.desc}</div>
                    <div className="btq-exam-meta">{ex.meta.map((m) => <Badge key={m}>{m}</Badge>)}</div>
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
