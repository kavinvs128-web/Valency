import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  XCircle,
  Shuffle,
} from "lucide-react";
import "../styles/PeriodicClassification.css";
import {
  ELEMENTS,
  Z_OF,
  BLOCK_META,
  FAMILY_META,
  PERIOD_SIZES,
  outerConfig,
  valenceText,
  groupNote,
  sideNavItems,
  objectives,
  keyTerms,
  models,
  TRIADS,
  NEWLANDS,
  NEWLANDS_BAD,
  NEWLANDS_HEAD,
  NEWLANDS_COL_NOTE,
  GAPS,
  MASS_PAIRS,
  TREND,
  TREND_PROPS,
  TREND_SETS,
  PULL_PERIOD,
  PULL_GROUP,
  everyday,
  industrial,
  higherEd,
  globalOps,
  skills,
  NA_CL,
  CHARACTER,
  thinkQs,
  practice,
  tfItems,
  flashcards,
  midQuizData,
  fullQuizData,
  examTips,
  chain,
} from "../data/periodicData.js";

/* ---------- helpers ---------- */

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const colorOf = (e, colorMode) => (colorMode === "families" ? FAMILY_META[e.family].c : BLOCK_META[e.block].c);

/* ---------- reusable pieces ---------- */

// Plays /Videos/<file>. If the file has not been added yet the player errors and a
// friendly placeholder is shown instead, so the page never looks broken.
function VideoBlock({ title, desc, file }) {
  const [missing, setMissing] = useState(false);
  // Also check on mount: a failed load can set el.error before onError is attached.
  const videoRef = useCallback((el) => { if (el && el.error) setMissing(true); }, []);
  return (
    <div className="pc-video-block">
      <div className="pc-video-tag">🎬 CONCEPT VIDEO</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="pc-video-wrap">
        {missing ? (
          <div className="pc-video-missing">
            <span className="big">🎬</span>
            <b>Video coming soon</b>
            <span>public/Videos/{file}</span>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="pc-video"
            controls
            playsInline
            preload="metadata"
            src={encodeURI(`/Videos/${file}`)}
            onError={() => setMissing(true)}          />
        )}
      </div>
    </div>
  );
}

function SectionHead({ num, tag, title }) {
  return (
    <>
      <div className="pc-section-tag"><span className="pc-section-num">{num}</span> {tag}</div>
      <h2>{title}</h2>
    </>
  );
}

function RevealList({ items }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => setOpen((prev) => { const nx = new Set(prev); if (nx.has(i)) nx.delete(i); else nx.add(i); return nx; });
  return (
    <div className="pc-practice-list">
      {items.map((p, i) => (
        <div className="pc-practice-item" key={p.q}>
          <div className="pc-practice-q">
            <span className="pc-pnum">{i + 1}</span>
            <span className="grow">{p.q}</span>
            <button className="pc-show-ans" onClick={() => toggle(i)}>{open.has(i) ? "hide" : "show answer"}</button>
          </div>
          {open.has(i) && <div className="pc-practice-ans">✓ {p.a}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---------- hero ---------- */

const HERO_ROWS = [
  [1, null, null, null, null, null, null, 2],
  [3, 4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17, 18],
];

function HeroTable() {
  return (
    <div className="pc-hero-visual" aria-hidden="true">
      {HERO_ROWS.flatMap((row, r) =>
        row.map((z, c) =>
          z == null ? (
            <div key={`${r}-${c}`} className="pc-hero-tile empty" />
          ) : (
            <div key={`${r}-${c}`} className="pc-hero-tile" style={{ "--c": BLOCK_META[ELEMENTS[z - 1].block].c, "--d": c + r * 2 }}>
              <span className="z">{z}</span>
              {ELEMENTS[z - 1].sym}
            </div>
          )
        )
      )}
    </div>
  );
}

/* ---------- 2. why classify: chaos → order → table ---------- */

const SHELF_Z = Array.from({ length: 18 }, (_, i) => i + 1);
const SHELF_STEP = 52;
const SHELF_NOTES = {
  mixed: { l: "No system", t: "Eighteen elements in a random heap. To find the ones that behave alike you would have to learn every one separately." },
  sorted: { l: "A line", t: "Sorting by atomic number gives a neat order — but similar elements (He, Ne, Ar … or Li, Na …) are still scattered along the line." },
  table: { l: "The periodic table", t: "Start a new row each time the pattern repeats and similar elements line up in columns: Li and Na together, F and Cl together, He, Ne and Ar together. That is periodicity." },
};

function ShelfDemo() {
  const [mode, setMode] = useState("mixed");
  const [mix, setMix] = useState(() => shuffled(SHELF_Z));

  const spot = (z) => {
    if (mode === "table") {
      const e = ELEMENTS[z - 1];
      return [(e.group - 1) * SHELF_STEP, (e.period - 1) * SHELF_STEP];
    }
    const idx = mode === "mixed" ? mix.indexOf(z) : z - 1;
    return [(idx % 9) * SHELF_STEP, Math.floor(idx / 9) * SHELF_STEP];
  };

  return (
    <>
      <div className="pc-row">
        {[["mixed", "1 · Mixed up"], ["sorted", "2 · By atomic number"], ["table", "3 · Periodic table"]].map(([k, l]) => (
          <button key={k} className={`pc-chipbtn${mode === k ? " active" : ""}`} onClick={() => setMode(k)}>{l}</button>
        ))}
        {mode === "mixed" && (
          <button className="pc-btn ghost" onClick={() => setMix(shuffled(SHELF_Z))}><Shuffle size={16} /> Shuffle again</button>
        )}
      </div>
      <div className="pc-panel">
        <div className="pc-shelf">
          <div className="pc-shelf-stage" style={{ width: 18 * SHELF_STEP, height: (mode === "table" ? 3 : 2) * SHELF_STEP, "--sz": "46px" }}>
            {SHELF_Z.map((z) => {
              const e = ELEMENTS[z - 1];
              const [x, y] = spot(z);
              const style = { "--x": `${x}px`, "--y": `${y}px` };
              if (mode !== "mixed") style["--c"] = FAMILY_META[e.family].c;
              return (
                <div key={z} className="pc-tile" style={style} title={e.name}>
                  <span className="z">{z}</span>
                  <span className="s">{e.sym}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div key={mode} className="pc-model-detail last" style={{ marginTop: 18, marginBottom: 0 }}>
          <b>{SHELF_NOTES[mode].l}:</b> {SHELF_NOTES[mode].t}
        </div>
      </div>
    </>
  );
}

/* ---------- 3. history ---------- */

function HistoryTimeline() {
  const [active, setActive] = useState(0);
  const m = models[active];
  const last = active === models.length - 1;
  return (
    <>
      <div className="pc-models">
        {models.map((x, i) => (
          <button key={x.nm} className={`pc-model-chip${active === i ? " active" : ""}${i === models.length - 1 ? " last" : ""}`} onClick={() => setActive(i)}>
            <div className="yr">{x.year} · {x.yr}</div>
            <div className="nm">{x.nm}</div>
          </button>
        ))}
      </div>
      <div key={active} className={`pc-model-detail${last ? " last" : ""}`}>
        <b>Main idea:</b> {m.idea}
        <div style={{ marginTop: 10, color: "var(--mut)" }}>
          <b style={{ color: last ? "var(--cy)" : "var(--or)" }}>{last ? "Result:" : "Importance / limitation:"}</b> {m.limit}
        </div>
      </div>
    </>
  );
}

function TriadLab() {
  const [i, setI] = useState(0);
  const t = TRIADS[i];
  const [a, b, c] = t.els;
  const avg = (a[1] + c[1]) / 2;
  const diff = Math.abs(avg - b[1]);
  return (
    <>
      <div className="pc-row">
        {TRIADS.map((x, k) => (
          <button key={x.name} className={`pc-chipbtn${i === k ? " active" : ""}`} onClick={() => setI(k)}>{x.name}</button>
        ))}
      </div>
      <div className="pc-triad">
        {[a, b, c].map(([sym, mass], k) => (
          <div key={sym} className={`pc-triad-card${k === 1 ? " mid" : ""}`}>
            <div className="lbl">{k === 1 ? "middle element" : k === 0 ? "lightest" : "heaviest"}</div>
            <div className="sym">{sym}</div>
            <div className="mass">{mass.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="pc-eq">
        average of {a[0]} and {c[0]} = ({a[1].toFixed(2)} + {c[1].toFixed(2)}) ÷ 2 = <b>{avg.toFixed(2)}</b><br />
        actual mass of {b[0]} = <b>{b[1].toFixed(2)}</b> &nbsp;·&nbsp; difference ≈ {diff.toFixed(2)}
      </div>
      <p className="pc-note">Only a limited number of elements fit into triads — that was the limitation of this idea.</p>
    </>
  );
}

function NewlandsGrid() {
  const [col, setCol] = useState(1);
  return (
    <>
      <div className="pc-nl">
        {NEWLANDS_HEAD.map((h) => <div className="pc-nl-head" key={h}>{h}</div>)}
        {NEWLANDS.map((sym, i) => {
          const c = i % 7;
          const bad = NEWLANDS_BAD.has(sym);
          return (
            <button
              key={sym}
              className={`pc-nl-cell ${bad ? "bad" : "ok"}${col === c ? " col" : col != null ? " faded" : ""}`}
              onClick={() => setCol(c)}
            >
              <span className="n">{i + 1}</span>
              {sym}
            </button>
          );
        })}
      </div>
      <div key={col} className="pc-model-detail" style={{ maxWidth: 760 }}>
        <b>Column {col + 1}:</b> {NEWLANDS_COL_NOTE[col]}
      </div>
      <p className="pc-note">Elements in order of increasing atomic mass, seven to a row — like the notes of a musical octave. Green = fits its column, red = does not. The pattern held for the lighter elements and then broke down after calcium.</p>
    </>
  );
}

function GapPredictor() {
  const [found, setFound] = useState(() => GAPS.map(() => false));
  const toggle = (i) => setFound((f) => f.map((v, k) => (k === i ? !v : v)));
  const all = found.every(Boolean);
  return (
    <>
      <div className="pc-gap-grid">
        {GAPS.map((g, i) => (
          <div key={g.eka} className={`pc-gap${found[i] ? " found" : ""}`}>
            <div className="q">{found[i] ? g.sym : "?"}</div>
            <h4>{found[i] ? g.name : `Gap: ${g.eka}`}</h4>
            <div className="row">Mendeleev predicted mass: <b>≈ {g.pred}</b></div>
            {found[i] && (
              <div className="row found-row">Discovered {g.year} · actual mass <b>{g.real}</b></div>
            )}
            <button className="pc-chipbtn" style={{ marginTop: 12 }} onClick={() => toggle(i)}>
              {found[i] ? "Hide" : "Discover the element"}
            </button>
          </div>
        ))}
      </div>
      <p className="pc-note">
        {all
          ? "His predicted masses were remarkably close — that is why the table was trusted. The guide names gallium and scandium; germanium is a third famous example."
          : "Each gap is an element nobody had found yet. Click to discover what filled it."}
      </p>
    </>
  );
}

function MassVsNumber() {
  const [pid, setPid] = useState("ark");
  const [mode, setMode] = useState("mass");
  const pair = MASS_PAIRS.find((p) => p.id === pid);
  const W = 134;
  const byNumber = pair.slots;
  const order = mode === "number" ? byNumber : [...pair.slots].sort((a, b) => a.m - b.m);
  const bad = order.filter((s, i) => ELEMENTS[Z_OF[s.sym] - 1].group !== ELEMENTS[Z_OF[byNumber[i].sym] - 1].group).length;
  return (
    <>
      <div className="pc-ctl-row">
        <span className="pc-ctl-label">Pair</span>
        <div className="pc-ctl-chips">
          {MASS_PAIRS.map((p) => (
            <button key={p.id} className={`pc-chipbtn${pid === p.id ? " active" : ""}`} onClick={() => setPid(p.id)}>{p.label}</button>
          ))}
        </div>
      </div>
      <div className="pc-ctl-row">
        <span className="pc-ctl-label">Arrange by</span>
        <div className="pc-ctl-chips">
          <button className={`pc-chipbtn o${mode === "mass" ? " active" : ""}`} onClick={() => setMode("mass")}>Atomic mass</button>
          <button className={`pc-chipbtn${mode === "number" ? " active" : ""}`} onClick={() => setMode("number")}>Atomic number</button>
        </div>
      </div>
      <div className="pc-panel">
        <div className="pc-shelf">
          <div className="pc-shelf-stage" style={{ width: 4 * W, height: 128 }}>
            {pair.slots.map((s) => {
              const idx = order.findIndex((o) => o.sym === s.sym);
              const slotGroup = ELEMENTS[Z_OF[byNumber[idx].sym] - 1].group;
              const own = ELEMENTS[Z_OF[s.sym] - 1];
              const mismatch = own.group !== slotGroup;
              return (
                <div key={s.sym} className="pc-tile lg" style={{ "--x": `${idx * W}px`, "--y": "0px", "--c": mismatch ? "#f87171" : "#4ade80" }}>
                  <span className="z">{own.z}</span>
                  <span className="s">{s.sym}</span>
                  <span className="m">mass {s.m}</span>
                  <span className="m">Group {own.group}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", width: 4 * W, marginTop: 6 }}>
            {order.map((_, idx) => (
              <div key={idx} className="pc-nl-head" style={{ width: W }}>
                slot: Group {ELEMENTS[Z_OF[byNumber[idx].sym] - 1].group}
              </div>
            ))}
          </div>
        </div>
        <div key={`${pid}${mode}`} className="pc-model-detail last" style={{ marginTop: 18, marginBottom: 0 }}>
          {mode === "mass"
            ? <><b style={{ color: "var(--rd)" }}>{bad} elements in the wrong column.</b> {pair.note}</>
            : <><b style={{ color: "var(--gr)" }}>Every element sits in the column that matches its properties ✓</b> — that is why Moseley's atomic number is the correct basis.</>}
        </div>
      </div>
    </>
  );
}

/* ---------- 4. the periodic table ---------- */

function PeriodicTable({ colorMode = "blocks", compact = false, selected = null, onSelect, hlGroup = null, hlPeriod = null, onGroup, onPeriod, marks = null }) {
  const off = compact ? 0 : 1;
  const row = (p) => p + off;
  const lanRow = 9 + off;
  const actRow = 10 + off;
  const useMarks = marks && marks.size > 0;
  return (
    <div className="pc-pt-scroll">
      <div className={`pc-pt${compact ? " compact" : ""}`}>
        {!compact && Array.from({ length: 18 }, (_, i) => i + 1).map((g) => (
          <button key={`g${g}`} className={`pc-pt-lbl${hlGroup === g ? " on" : ""}`} style={{ gridColumn: g + 1, gridRow: 1 }} onClick={() => onGroup && onGroup(g)} aria-label={`Group ${g}`}>{g}</button>
        ))}
        {!compact && Array.from({ length: 7 }, (_, i) => i + 1).map((p) => (
          <button key={`p${p}`} className={`pc-pt-lbl${hlPeriod === p ? " on" : ""}`} style={{ gridColumn: 1, gridRow: row(p) }} onClick={() => onPeriod && onPeriod(p)} aria-label={`Period ${p}`}>{p}</button>
        ))}

        {ELEMENTS.map((e) => {
          const col = e.series ? e.idx + 3 + off : e.group + off;
          const r = e.series ? (e.series === "lan" ? lanRow : actRow) : row(e.period);
          const active = useMarks
            ? marks.has(e.z)
            : hlGroup != null ? e.group === hlGroup : hlPeriod != null ? e.period === hlPeriod : true;
          const cls = ["pc-pt-cell"];
          if (!active) cls.push("dim");
          if (selected === e.z) cls.push("sel");
          if (useMarks && marks.has(e.z)) cls.push("mark");
          return (
            <button
              key={e.z}
              className={cls.join(" ")}
              style={{ gridColumn: col, gridRow: r, "--c": colorOf(e, colorMode) }}
              onClick={() => onSelect && onSelect(e.z)}
              aria-label={`${e.name}, atomic number ${e.z}`}
              title={`${e.name} (${e.z})`}
            >
              <span className="z">{e.z}</span>
              <span className="s">{e.sym}</span>
              <span className="n">{e.name}</span>
            </button>
          );
        })}

        <div className="pc-pt-ph" style={{ gridColumn: 3 + off, gridRow: row(6) }}>57–71</div>
        <div className="pc-pt-ph" style={{ gridColumn: 3 + off, gridRow: row(7) }}>89–103</div>
        <div className="pc-pt-series" style={{ gridColumn: `1 / ${3 + off}`, gridRow: lanRow }}>Lanthanoids →</div>
        <div className="pc-pt-series" style={{ gridColumn: `1 / ${3 + off}`, gridRow: actRow }}>Actinoids →</div>
        <div style={{ gridColumn: "1 / -1", gridRow: 8 + off, height: 8 }} />
      </div>
    </div>
  );
}

const SPECIAL_NOTES = {
  1: "Hydrogen is placed in Group 1 but is not an alkali metal — it is exceptional.",
  2: "Helium is 1s², an s-subshell, yet it sits in Group 18 with the noble gases because its shell is full.",
  57: "Textbooks differ on whether La or Lu belongs in Group 3. Here the full lanthanoid series is shown as the f-block row, as in the guide.",
  71: "Textbooks differ on whether La or Lu belongs in Group 3. Here the full lanthanoid series is shown as the f-block row, as in the guide.",
  89: "Textbooks differ on whether Ac or Lr belongs in Group 3. Here the full actinoid series is shown as the f-block row, as in the guide.",
  103: "Textbooks differ on whether Ac or Lr belongs in Group 3. Here the full actinoid series is shown as the f-block row, as in the guide.",
};

function TableExplorer() {
  const [mode, setMode] = useState("blocks");
  const [sel, setSel] = useState(11);
  const [hg, setHg] = useState(null);
  const [hp, setHp] = useState(null);
  const e = ELEMENTS[sel - 1];
  const colorMode = mode === "families" ? "families" : "blocks";

  const choose = (z) => {
    setSel(z);
    const x = ELEMENTS[z - 1];
    if (mode === "group" && x.group != null) setHg(x.group);
    if (mode === "period") setHp(x.period);
  };
  const pickMode = (m) => {
    setMode(m);
    if (m === "group") setHg(e.group ?? 1);
    if (m === "period") setHp(e.period);
  };
  const pickGroup = (g) => { setMode("group"); setHg(g); setHp(null); };
  const pickPeriod = (p) => { setMode("period"); setHp(p); setHg(null); };

  const members = (pred) => ELEMENTS.filter(pred);
  const groupMembers = hg != null ? members((x) => x.group === hg).map((x) => x.sym) : [];
  const periodMembers = hp != null ? members((x) => x.period === hp) : [];

  const legend = colorMode === "families"
    ? Object.values(FAMILY_META)
    : Object.values(BLOCK_META).map((b) => ({ label: `${b.label} · ${b.short}`, c: b.c }));

  return (
    <>
      <div className="pc-ctl-row">
        <span className="pc-ctl-label">Colour / highlight by</span>
        <div className="pc-ctl-chips">
          {[["blocks", "Blocks"], ["families", "Families"], ["group", "A group"], ["period", "A period"]].map(([k, l]) => (
            <button key={k} className={`pc-chipbtn${mode === k ? " active" : ""}`} onClick={() => pickMode(k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="pc-panel" style={{ padding: 22 }}>
        <PeriodicTable
          colorMode={colorMode}
          selected={sel}
          onSelect={choose}
          hlGroup={mode === "group" ? hg : null}
          hlPeriod={mode === "period" ? hp : null}
          onGroup={pickGroup}
          onPeriod={pickPeriod}
        />
        <div className="pc-legend">
          {legend.map((l) => <span key={l.label} style={{ "--c": l.c }}><i />{l.label}</span>)}
        </div>
        <p className="pc-note">Click any element — or a group number across the top, or a period number down the side. On a phone, swipe sideways to see all 18 groups.</p>
      </div>

      {mode === "group" && hg != null && (
        <div key={`g${hg}`} className="pc-model-detail">
          <b>Group {hg}:</b> {groupMembers.join(", ")} &nbsp;·&nbsp; valence shell <b style={{ fontFamily: "'JetBrains Mono', monospace" }}>{groupNote(hg)}</b>
          <div style={{ color: "var(--mut)", marginTop: 6, fontSize: 19 }}>Same valence-shell configuration → similar chemical properties.</div>
        </div>
      )}
      {mode === "period" && hp != null && (
        <div key={`p${hp}`} className="pc-model-detail">
          <b>Period {hp}:</b> {PERIOD_SIZES[hp - 1]} elements ({periodMembers[0].sym} → {periodMembers[periodMembers.length - 1].sym}).
          <div style={{ color: "var(--mut)", marginTop: 6, fontSize: 19 }}>The period number equals the outermost shell, n = {hp}. Atomic number increases left to right.</div>
        </div>
      )}

      <div key={sel} className="pc-detail" style={{ "--c": colorOf(e, colorMode) }}>
        <div className="pc-detail-sym">
          <div className="s">{e.sym}</div>
          <div className="z">Z = {e.z}</div>
          <div className="nm">{e.name}</div>
        </div>
        <div className="pc-facts">
          <div className="pc-fact"><div className="k">Group</div><div className="v">{e.group ?? "f-series"}</div></div>
          <div className="pc-fact"><div className="k">Period</div><div className="v">{e.period}</div></div>
          <div className="pc-fact"><div className="k">Block</div><div className="v">{e.block}</div></div>
          <div className="pc-fact"><div className="k">Valence e⁻</div><div className="v">{valenceText(e)}</div></div>
          <div className="pc-fact"><div className="k">Family</div><div className="v" style={{ fontSize: 17 }}>{FAMILY_META[e.family].label.replace(/ \(.*\)/, "")}</div></div>
          <div className="pc-fact"><div className="k">Outer configuration</div><div className="v" style={{ fontSize: 17 }}>{outerConfig(e)}</div></div>
          {SPECIAL_NOTES[e.z] && <div className="pc-fact wide"><div className="v">{SPECIAL_NOTES[e.z]}</div></div>}
          {!SPECIAL_NOTES[e.z] && (e.block === "d" || e.block === "f") && (
            <div className="pc-fact wide"><div className="v">General pattern only — a few elements (for example Cr and Cu) have exceptions in their exact configuration.</div></div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- 5. trends ---------- */

function TrendExplorer() {
  const [prop, setProp] = useState("r");
  const [setId, setSetId] = useState("p3");
  const P = TREND_PROPS[prop];
  const S = TREND_SETS.find((s) => s.id === setId);
  const across = S.kind === "across";
  const expect = across ? P.across : P.group;

  const rows = S.els.map((sym) => ({ sym, raw: TREND[sym][prop] }));
  const mags = rows.map((r) => (r.raw == null ? null : P.mag(r.raw)));
  const max = Math.max(...mags.filter((m) => m != null));
  const exc = rows.map((_, i) => {
    if (i === 0 || mags[i] == null || mags[i - 1] == null) return false;
    return expect === "up" ? mags[i] < mags[i - 1] : mags[i] > mags[i - 1];
  });
  const excList = rows.map((r, i) => (exc[i] ? `${rows[i - 1].sym} → ${r.sym}` : null)).filter(Boolean);
  const hasNull = rows.some((r) => r.raw == null);

  return (
    <div className="pc-panel">
      <div className="pc-ctl-row">
        <span className="pc-ctl-label">Property</span>
        <div className="pc-ctl-chips">
          {Object.entries(TREND_PROPS).map(([k, v]) => (
            <button key={k} className={`pc-chipbtn o${prop === k ? " active" : ""}`} onClick={() => setProp(k)}>{v.label}</button>
          ))}
        </div>
      </div>
      <div className="pc-ctl-row">
        <span className="pc-ctl-label">Look along</span>
        <div className="pc-ctl-chips">
          {TREND_SETS.map((s) => (
            <button key={s.id} className={`pc-chipbtn${setId === s.id ? " active" : ""}`} onClick={() => setSetId(s.id)}>{s.label}</button>
          ))}
        </div>
      </div>

      <div className="pc-bars">
        {rows.map((r, i) => (
          <div className="pc-bar-col" key={r.sym}>
            <div className="pc-bar-val">{r.raw == null ? "n/a" : P.fmt(r.raw)}</div>
            <div
              className={`pc-bar${exc[i] ? " exc" : ""}${r.raw == null ? " none" : ""}`}
              style={{ height: r.raw == null ? "6%" : `${Math.max((mags[i] / max) * 78, 1.5)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="pc-bar-names">
        {rows.map((r) => <div key={r.sym}>{r.sym}<small>{ELEMENTS[Z_OF[r.sym] - 1].name.slice(0, 9)}</small></div>)}
      </div>
      <div className="pc-arrow-line"><span>{S.dir}</span><div className="ln" /></div>

      <div className="pc-trend-verdict">
        <div><b className={expect === "up" ? "up" : "dn"}>General trend:</b> {across ? P.acrossTxt : P.groupTxt}</div>
        <div>
          <b className="ex">Exceptions here:</b>{" "}
          {excList.length ? excList.join(", ") + " (bar in red)" : "none in this set"}
        </div>
      </div>
      <p className="pc-note">
        <b>Why:</b> {P.reason}
        {hasNull && prop === "r" && " Ne and Ar are not shown — noble-gas radii are measured differently and are not comparable."}
        {hasNull && prop === "en" && " Ne and Ar are not given a Pauling value."}
        {" "}Unit: {P.unit}. Figures are standard textbook values, rounded; sources differ slightly.
      </p>
    </div>
  );
}

function PullAndSize() {
  const [tab, setTab] = useState("period");
  const [i, setI] = useState(0);
  const list = tab === "period" ? PULL_PERIOD : PULL_GROUP;
  const d = list[Math.min(i, list.length - 1)];
  const K = 0.5;
  const R = d.r * K;
  const valence = tab === "period" ? d.z - 10 : 1;
  const zeff = valence;
  const shells = tab === "period" ? 3 : d.shells;
  const C = 150;
  const dotsOn = (radius, n, offset = -90) =>
    Array.from({ length: n }, (_, k) => {
      const a = ((offset + (k * 360) / n) * Math.PI) / 180;
      return [C + radius * Math.cos(a), C + radius * Math.sin(a)];
    });

  const inner = tab === "period" ? [16, 40] : Array.from({ length: shells - 1 }, (_, s) => (R * (s + 1)) / shells);
  const valDots = dotsOn(R, valence);

  return (
    <div className="pc-panel">
      <div className="pc-ctl-row">
        <span className="pc-ctl-label">Compare</span>
        <div className="pc-ctl-chips">
          <button className={`pc-chipbtn${tab === "period" ? " active" : ""}`} onClick={() => { setTab("period"); setI(0); }}>Across Period 3 (Na → Cl)</button>
          <button className={`pc-chipbtn${tab === "group" ? " active" : ""}`} onClick={() => { setTab("group"); setI(0); }}>Down Group 1 (Li → Cs)</button>
        </div>
      </div>
      <div className="pc-pull">
        <svg viewBox="0 0 300 300" role="img" aria-label={`${d.sym} atom with ${shells} shells`}>
          {inner.map((r, k) => <circle key={k} className="pc-ring" cx={C} cy={C} r={r} />)}
          {tab === "period" && dotsOn(16, 2, -45).map(([x, y], k) => <circle key={`a${k}`} className="pc-core-e" cx={x} cy={y} r="3.5" />)}
          {tab === "period" && dotsOn(40, 8, -90).map(([x, y], k) => <circle key={`b${k}`} className="pc-core-e" cx={x} cy={y} r="3.5" />)}
          <circle className="pc-ring outer" cx={C} cy={C} r={R} />
          <line className="pc-pull-line" x1={C} y1={C - R + 7} x2={C} y2={C - 16} strokeWidth={1 + zeff * 1.1} strokeLinecap="round" opacity=".75" />
          {valDots.map(([x, y], k) => <circle key={k} className="pc-ring-e" cx={x} cy={y} r="6" />)}
          <circle className="pc-nuc" cx={C} cy={C} r="14" />
          <text className="pc-nuc-t" x={C} y={C}>+{d.z}</text>
        </svg>

        <div>
          <div className="pc-ctl-row">
            <span className="pc-ctl-label" style={{ minWidth: 80 }}>{d.sym}</span>
            <input
              type="range" min="0" max={list.length - 1} value={Math.min(i, list.length - 1)}
              onChange={(ev) => setI(+ev.target.value)}
              style={{ flex: 1, minWidth: 160, accentColor: "var(--pu)" }}
              aria-label="Choose element"
            />
          </div>
          <div className="pc-stat-grid">
            <div className="pc-stat o"><div className="k">Element</div><div className="v">{d.sym} <span style={{ fontSize: 15, color: "var(--mut)" }}>Z = {d.z}</span></div></div>
            <div className="pc-stat c"><div className="k">Atomic radius</div><div className="v"><span key={d.sym} className="pc-pop">{d.r}</span> pm</div></div>
            <div className="pc-stat p"><div className="k">Shells</div><div className="v">{shells}</div></div>
            <div className="pc-stat g"><div className="k">Pull on outer e⁻</div><div className="v">≈ +{zeff}</div></div>
          </div>
          <div key={`${tab}${d.sym}`} className="pc-model-detail last" style={{ marginTop: 16, marginBottom: 0, fontSize: 20 }}>
            {tab === "period"
              ? <>Same shell (n = 3) for every element, but the nucleus grows from +11 to +17 while the 10 inner electrons stay. <b>Stronger pull → smaller atom.</b></>
              : <>Each step down adds a <b>whole new shell</b>, so the outer electron is farther away, while the pull stays about +1. <b>More shells → larger atom.</b></>}
          </div>
        </div>
      </div>
      <p className="pc-note">Pull ≈ nuclear charge minus inner electrons — a simplified picture of effective nuclear charge. Real values rise a little more gently, but the direction is the same.</p>
    </div>
  );
}

/* ---------- 6 & 7. applications with a locator ---------- */

function UseLocator({ items }) {
  const [i, setI] = useState(0);
  const it = items[i];
  const marks = new Set(it.els.map((s) => Z_OF[s]));
  return (
    <>
      <div className="pc-loc-grid">
        {items.map((x, k) => (
          <button key={x.t} className={`pc-loc${k === i ? " on" : ""}`} onClick={() => setI(k)}>
            <span className="ic">{x.ic}</span>
            <h4>{x.t}</h4>
            <p>{x.d}</p>
          </button>
        ))}
      </div>
      <div key={i} className="pc-loc-detail">
        <b>{it.els.join(" · ")}</b> on the periodic table — {it.link}
      </div>
      <div className="pc-panel" style={{ padding: 18 }}>
        <PeriodicTable compact colorMode="blocks" marks={marks} />
      </div>
    </>
  );
}

function HigherEdMap() {
  return (
    <div className="pc-mm-wrap">
      <div className="pc-mm-hub-row"><div className="pc-mm-hub">Where periodic ideas lead</div></div>
      <div className="pc-mm-connector"><div className="pc-mm-v" /><div className="pc-mm-h" /></div>
      <div className="pc-mm-tree">
        {higherEd.map((b) => (
          <div className="pc-mm-row" key={b.t}>
            <span className="pc-mm-tick" />
            <div className={`pc-mm-box ${b.c}`}><h4>{b.t}</h4><p>{b.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 10. classroom activity ---------- */

function MetalActivity() {
  const [deck] = useState(() => shuffled(NA_CL));
  const [picked, setPicked] = useState([]);
  const [wrong, setWrong] = useState(null);
  const done = picked.length === NA_CL.length;

  const pick = (sym) => {
    if (picked.includes(sym) || done) return;
    if (sym === NA_CL[picked.length]) setPicked((p) => [...p, sym]);
    else setWrong(sym);
  };
  const reset = () => { setPicked([]); setWrong(null); };

  return (
    <div className="pc-panel">
      <p className="pc-lead" style={{ margin: "0 0 4px", fontSize: 21 }}>
        <b>Step 1.</b> Tap Na, Mg, Al, Si, P, S and Cl in <b>increasing atomic-number order</b>. Use the table above if you need it.
      </p>
      <div className="pc-pick-row">
        {deck.map((sym) => {
          const isDone = picked.includes(sym);
          return (
            <button
              key={sym}
              className={`pc-pick${isDone ? " done" : ""}${wrong === sym ? " shake" : ""}`}
              disabled={done}
              onClick={() => pick(sym)}
              onAnimationEnd={() => setWrong(null)}
            >
              {sym}
              <small>{isDone ? `Z = ${Z_OF[sym]}` : ELEMENTS[Z_OF[sym] - 1].name}</small>
            </button>
          );
        })}
      </div>
      <p className="pc-note">{picked.length} of {NA_CL.length} placed{wrong ? " — not that one, try again" : ""}.</p>

      {done && (
        <div style={{ animation: "pcFade .4s ease" }}>
          <p className="pc-lead" style={{ margin: "22px 0 0", fontSize: 21 }}>
            <b>Step 2.</b> Now see how metallic character changes from Na to Cl:
          </p>
          <div className="pc-metal-bar" />
          <div className="pc-metal-labels">
            {NA_CL.map((s) => <div key={s}><b>{s}</b><span>{CHARACTER[s]}</span></div>)}
          </div>
          <div className="pc-callout purple" style={{ marginBottom: 0 }}>
            <div className="pc-callout-label">Discussion</div>
            <p>Metallic character <b>decreases</b> from Na to Cl: Na, Mg and Al are metals, Si is a metalloid, and P, S and Cl are non-metals. It follows the same direction as the rising nuclear attraction across the period.</p>
          </div>
          <button className="pc-btn ghost" style={{ marginTop: 16 }} onClick={reset}><RotateCcw size={16} /> Try again</button>
        </div>
      )}
    </div>
  );
}

/* ---------- 13. self-evaluation ---------- */

function TrueFalse() {
  const [ans, setAns] = useState({});
  const answered = Object.keys(ans).length;
  const score = tfItems.filter((t, i) => ans[i] === t.a).length;
  return (
    <>
      <div className="pc-tf">
        {tfItems.map((t, i) => {
          const a = ans[i];
          const has = a !== undefined;
          return (
            <div key={t.q} className={`pc-tf-item${has ? (a === t.a ? " right" : " wrong") : ""}`}>
              <div className="pc-tf-q"><b style={{ color: "var(--pu)", fontFamily: "'JetBrains Mono', monospace" }}>{i + 1}.</b> {t.q}</div>
              <div className="pc-tf-btns">
                {[true, false].map((v) => (
                  <button key={String(v)} className={`pc-chipbtn${has && a === v ? " active" : ""}`} disabled={has} onClick={() => setAns((s) => ({ ...s, [i]: v }))}>
                    {v ? "True" : "False"}
                  </button>
                ))}
              </div>
              {has && (
                <div className="pc-tf-fb">
                  <b className={a === t.a ? "r" : "w"}>{a === t.a ? "Correct." : `Not quite — it is ${t.a ? "True" : "False"}.`}</b> {t.why}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {answered === tfItems.length && (
        <p className="pc-note" style={{ fontSize: 20 }}>
          Score: <b style={{ color: "var(--gr)" }}>{score}/{tfItems.length}</b>{" "}
          <button className="pc-show-ans" onClick={() => setAns({})}>reset</button>
        </p>
      )}
    </>
  );
}

function Flashcards() {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const go = (d) => { setFlip(false); setI((x) => (x + d + flashcards.length) % flashcards.length); };
  const [q, a] = flashcards[i];
  return (
    <div className="pc-flash-wrap">
      <div className={`pc-flash${flip ? " flip" : ""}`} onClick={() => setFlip((f) => !f)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlip((f) => !f); } }}>
        <div className="pc-flash-in" style={{ minHeight: 240 }}>
          <div className="pc-flash-face"><div className="k">Question · click to flip</div><div className="t">{q}</div></div>
          <div className="pc-flash-face back"><div className="k">Answer</div><div className="t">{a}</div></div>
        </div>
      </div>
      <div className="pc-flash-bar">
        <button className="pc-btn ghost" onClick={() => go(-1)}><ArrowLeft size={16} /> Prev</button>
        <button className="pc-btn" onClick={() => go(1)}>Next <ArrowRight size={16} /></button>
        <span className="cnt">{i + 1} / {flashcards.length}</span>
      </div>
    </div>
  );
}

/* ---------- 12. quiz ---------- */

function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const finished = currentQ >= midQuizData.length;
  const item = !finished ? midQuizData[currentQ] : null;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
  };
  const handleNext = () => { setCurrentQ((q) => q + 1); setSelected(null); setAnswered(false); };
  const handleRetry = () => { setCurrentQ(0); setScore(0); setSelected(null); setAnswered(false); };

  return (
    <div className="pc-quiz-box">
      <div className="pc-quiz-progress">
        {midQuizData.map((_, i) => (
          <div key={i} className={`pc-qdot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
        ))}
      </div>
      {!finished ? (
        <div>
          <div className="pc-quiz-q">Q{currentQ + 1}. {item.q}</div>
          <div className="pc-quiz-options">
            {item.options.map((opt, i) => {
              let cls = "pc-quiz-opt";
              if (answered && i === item.correct) cls += " correct";
              else if (answered && i === selected) cls += " wrong";
              return <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>{opt}</button>;
            })}
          </div>
          {answered && <div className="pc-quiz-feedback">{item.explain}</div>}
          {answered && (
            <button className="pc-quiz-next" onClick={handleNext}>
              Next <ChevronRight size={14} style={{ verticalAlign: "-2px" }} />
            </button>
          )}
        </div>
      ) : (
        <div className="pc-quiz-score">
          <div className="pc-big">{score}/{midQuizData.length}</div>
          <p style={{ margin: "10px 0 18px" }}>Nice work. Review any you missed above, or retry the deck.</p>
          <button className="pc-btn" onClick={handleRetry}><RotateCcw size={15} /> Retry quiz</button>
        </div>
      )}
    </div>
  );
}

function QuizPage({ onBack, darkMode = true }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6 * 60);
  const doneRef = useRef(false);

  useEffect(() => { doneRef.current = done; }, [done]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (doneRef.current) { clearInterval(interval); return; }
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const item = !done ? fullQuizData[currentQ] : null;
  const labels = ["A", "B", "C", "D"];
  const pct = Math.round((score / fullQuizData.length) * 100);
  const passed = pct >= 60;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
    setUserAnswers((prev) => [...prev, { chosen: i, correct: i === item.correct }]);
  };
  const handleNext = () => {
    if (currentQ + 1 >= fullQuizData.length) { setDone(true); return; }
    setCurrentQ((q) => q + 1); setSelected(null); setAnswered(false);
  };
  const handleRetry = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setScore(0); setUserAnswers([]); setDone(false); setTimeLeft(6 * 60);
  };

  return (
    <div className={darkMode ? "pc-root" : "pc-root light"}>
      <div className="pc-topbar">
        <div className="pc-top-left">
          <button className="pc-back-btn" onClick={onBack}><ArrowLeft size={16} /> Back to lesson</button>
        </div>
        <div className="pc-page-pill"><span>🧪</span><span>Periodic Classification — Quiz</span></div>
        {!done && <div className="pc-timer">⏱ {mins}:{secs}</div>}
      </div>
      <div className="pc-progress-rail">
        <div className="pc-progress-fill" style={{ width: done ? "100%" : `${(currentQ / fullQuizData.length) * 100}%` }} />
      </div>
      <div className="pc-qp-wrap">
        {!done ? (
          <div className="pc-qp-card">
            <div className="pc-qp-meta">
              <span className="pc-qp-counter">Question {currentQ + 1} of {fullQuizData.length}</span>
              <span className="pc-qp-chapter">{item.chapter}</span>
            </div>
            <div className="pc-qp-dots">
              {fullQuizData.map((_, i) => (
                <div key={i} className={`pc-qp-dot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
              ))}
            </div>
            <div className="pc-qp-question">{item.q}</div>
            <div className="pc-qp-options">
              {item.options.map((opt, i) => {
                let cls = "pc-qp-opt";
                if (answered && i === item.correct) cls += " correct";
                else if (answered && i === selected) cls += " wrong";
                return (
                  <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                    <span className="pc-qp-opt-label">{labels[i]}</span>
                    <span className="pc-qp-opt-text">{opt}</span>
                    {answered && i === item.correct && <CheckCircle size={18} className="pc-qp-icon correct" />}
                    {answered && i === selected && i !== item.correct && <XCircle size={18} className="pc-qp-icon wrong" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`pc-qp-feedback ${selected === item.correct ? "correct" : "wrong"}`}>
                <strong>{selected === item.correct ? "Correct!" : "Not quite."}</strong> {item.explain}
              </div>
            )}
            {answered && (
              <div className="pc-qp-next-row">
                <button className="pc-qp-next-btn" onClick={handleNext}>
                  {currentQ + 1 >= fullQuizData.length ? "See results" : "Next question"} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="pc-qp-card">
            <div className="pc-qp-result-top">
              <div className={`pc-qp-trophy ${passed ? "pass" : "fail"}`}>{passed ? "🏆" : "📚"}</div>
              <div>
                <div className="pc-qp-pct">{pct}%</div>
                <div className="pc-qp-sub">{score} out of {fullQuizData.length} correct</div>
              </div>
            </div>
            <hr className="pc-qp-divider" />
            <p className="pc-qp-msg">
              {passed
                ? "You passed the Periodic Classification quiz — the scientists, the table layout and the trends are in good shape."
                : "Not quite — revisit the scientists, the group and block names, and the direction of each periodic trend, then try again."}
            </p>
            <div className="pc-qp-breakdown">
              {fullQuizData.map((q, i) => (
                <div key={i} className="pc-qp-breakdown-row">
                  {userAnswers[i]?.correct
                    ? <CheckCircle size={18} className="pc-qp-icon correct" />
                    : <XCircle size={18} className="pc-qp-icon wrong" />}
                  <span>Q{i + 1}: {q.chapter}</span>
                </div>
              ))}
            </div>
            <div className="pc-qp-actions">
              <button className="pc-qp-next-btn" onClick={handleRetry}><RotateCcw size={16} /> Retry quiz</button>
              <button className="pc-back-btn" onClick={onBack}><ArrowLeft size={16} /> Back to lesson</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- static tables ---------- */

const familyRows = [
  ["1", "Alkali metals (hydrogen is exceptional)", "Li, Na, K"],
  ["2", "Alkaline earth metals", "Be, Mg, Ca"],
  ["3–12", "Transition elements", "Fe, Cu, Zn"],
  ["17", "Halogens", "F, Cl, Br"],
  ["18", "Noble gases", "He, Ne, Ar"],
];

const trendRows = [
  ["Atomic radius", "Generally decreases", "Generally increases", "Across a period, effective nuclear attraction increases; down a group, additional shells are added."],
  ["Ionisation enthalpy", "Generally increases", "Generally decreases", "Electrons are held more strongly across a period; outer electrons are farther from the nucleus down a group."],
  ["Electron gain enthalpy", "Often becomes more negative, with exceptions", "Not uniform; often less negative", "Depends on nuclear attraction, size and electronic configuration."],
  ["Electronegativity", "Generally increases", "Generally decreases", "The ability to attract shared electrons generally increases across and decreases down."],
];

/* ---------- main component ---------- */

export default function PeriodicClassification({ onBack, darkMode = true }) {
  const [activeNav, setActiveNav] = useState("pc-hero");
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    function handlePopState(e) {
      const level = e.state && e.state.level;
      setShowQuiz(level === "quiz");
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const startQuiz = () => {
    window.history.pushState({ app: true, level: "quiz" }, "", window.location.href);
    setShowQuiz(true);
  };

  const handleScroll = useCallback(() => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    setProgress(scrolled || 0);
    let active = sideNavItems[0].id;
    for (const item of sideNavItems) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = item.id;
    }
    setActiveNav(active);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const id = requestAnimationFrame(handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(id); };
  }, [handleScroll]);

  useEffect(() => {
    if (showQuiz) return;
    const els = document.querySelectorAll(".pc-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("pc-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("pc-in"); io.unobserve(en.target); }
      }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [showQuiz]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (showQuiz) return <QuizPage darkMode={darkMode} onBack={() => window.history.back()} />;

  return (
    <div className={darkMode ? "pc-root" : "pc-root light"}>
      <div className="pc-topbar">
        <div className="pc-top-left">
          <button className="pc-back-btn" onClick={onBack}><ArrowLeft size={16} /> Back to Class 11</button>
        </div>
        <div className="pc-page-pill"><span>🧪</span><span>Periodic Classification of Elements</span></div>
      </div>

      <div className="pc-progress-rail"><div className="pc-progress-fill" style={{ width: `${progress}%` }} /></div>

      <nav className="pc-side-nav">
        {sideNavItems.map((item) => (
          <button key={item.id} data-label={item.label} aria-label={item.label} className={activeNav === item.id ? "pc-active" : ""} onClick={() => jumpTo(item.id)} />
        ))}
      </nav>

      {/* Hero */}
      <header className="pc-hero" id="pc-hero">
        <div className="pc-hero-inner">
          <div className="pc-hero-text">
            <div className="pc-hero-eyebrow">Class 11 Chemistry <span className="pc-crumb">›</span> Lesson 3</div>
            <h1 className="pc-hero-title"><span className="o">Periodic</span> <span className="c">Classification</span> of Elements</h1>
            <p className="pc-hero-sub">
              Over a hundred elements, one clever chart. See how scientists found the pattern, how the modern table is built,
              and why size, energy and reactivity change in predictable ways.
            </p>
            <div className="pc-chip-row">
              <div className="pc-chip o">7 periods · 18 groups <span className="full">— rows and columns</span></div>
              <div className="pc-chip c">s · p · d · f <span className="full">— the four blocks</span></div>
            </div>
          </div>
          <HeroTable />
        </div>
      </header>

      <div className="pc-lesson-wrap">
        {/* 1. Objectives */}
        <section className="pc-section pc-reveal" id="pc-sec-obj">
          <SectionHead num="1" tag="Your mission" title="Learning objectives" />
          <p>By the end of this lesson you will be able to:</p>
          <div className="pc-obj-grid">
            {objectives.map((o, i) => (
              <div className="pc-obj" key={i}><span className="pc-obj-num">{String(i + 1).padStart(2, "0")}</span><p>{o}</p></div>
            ))}
          </div>
        </section>

        {/* 2. Why classify */}
        <section className="pc-section pc-reveal" id="pc-sec-why">
          <SectionHead num="2" tag="The big question" title="Why classify elements?" />
          <div className="pc-callout">
            <div className="pc-callout-label">Think first</div>
            <p>Why do salt, electrical wires and balloons involve different elements?</p>
          </div>
          <p>
            Many elements are known, and learning the properties of each one separately is difficult. Classification arranges
            elements systematically so that similarities, differences and trends become easier to understand. It also helps
            scientists predict properties.
          </p>
          <div className="pc-callout purple">
            <div className="pc-callout-label">A simple everyday analogy</div>
            <p>A library groups books by subject, language or author. In the same way, the periodic table arranges elements according to atomic number and electronic structure.</p>
          </div>
          <h3>Key terms</h3>
          <div className="pc-term-grid">
            {keyTerms.map((k) => (
              <div className="pc-term" key={k.t} style={{ "--c": k.c }}><h4>{k.t}</h4><p>{k.d}</p></div>
            ))}
          </div>
          <h3>From a heap to a table</h3>
          <p>Press the three buttons in order and watch the same 18 elements get organised.</p>
          <ShelfDemo />
          <VideoBlock title="Why Classify Elements?" desc="From a library of books to a table of elements — why we need order." file="Why Classify Elements.mp4" />
        </section>

        {/* 3. History */}
        <section className="pc-section pc-reveal" id="pc-sec-history">
          <SectionHead num="3" tag="The story so far" title="Historical development of classification" />
          <p>Each scientist improved on the one before. Tap a name to see the idea and its limitation.</p>
          <HistoryTimeline />

          <div className="pc-table-wrap">
            <table className="pc-table">
              <thead><tr><th>Scientist / model</th><th>Main idea</th><th>Importance / limitation</th></tr></thead>
              <tbody>
                {models.map((m) => (
                  <tr key={m.nm}><td className="hl">{m.nm} — {m.yr}</td><td>{m.idea}</td><td>{m.limit}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Döbereiner's triads — check the average</h3>
          <TriadLab />

          <h3>Newlands' law of octaves — find the pattern</h3>
          <NewlandsGrid />

          <h3>Mendeleev's gaps — predicting the unknown</h3>
          <div className="pc-callout">
            <div className="pc-callout-label">Mendeleev's contribution</div>
            <p>He left blank spaces for elements not yet discovered, predicted properties of some missing elements, and later discoveries — including gallium and scandium — supported several predictions.</p>
          </div>
          <GapPredictor />

          <h3>Moseley — why atomic number wins</h3>
          <p>Arranging by mass puts a few pairs in the wrong column. Switch between the two orders and watch the tiles move.</p>
          <MassVsNumber />
          <VideoBlock title="Evolution of the Periodic Table" desc="Triads, octaves, Mendeleev's gaps and Moseley's atomic number on one timeline." file="Evolution of the Periodic Table.mp4" />
        </section>

        {/* 4. Modern table */}
        <section className="pc-section pc-reveal" id="pc-sec-table">
          <SectionHead num="4" tag="The modern table" title="Modern periodic law and the long-form table" />
          <div className="pc-callout">
            <div className="pc-callout-label">Modern periodic law</div>
            <p>The physical and chemical properties of elements are periodic functions of their atomic numbers.</p>
          </div>
          <div className="pc-formula-grid">
            <div className="pc-formula-card o"><div className="lbl">Periods (rows)</div><div className="f">7</div><div className="s">Atomic number increases from left to right across a period.</div></div>
            <div className="pc-formula-card c"><div className="lbl">Groups (columns)</div><div className="f">18</div><div className="s">Elements in a group generally have similar valence-shell configurations and related chemical properties.</div></div>
            <div className="pc-formula-card g"><div className="lbl">Blocks</div><div className="f">s · p · d · f</div><div className="s">Named by the subshell the differentiating electron enters.</div></div>
          </div>

          <h3>Explore the table</h3>
          <TableExplorer />

          <h3>The four blocks — an easy way to remember</h3>
          <div className="pc-block-grid">
            <div className="pc-block-card" style={{ "--c": BLOCK_META.s.c }}><div className="big">s</div><h4>Groups 1 and 2</h4><p>The differentiating electron enters an s subshell.</p></div>
            <div className="pc-block-card" style={{ "--c": BLOCK_META.p.c }}><div className="big">p</div><h4>Groups 13 to 18</h4><p>The differentiating electron enters a p subshell.</p></div>
            <div className="pc-block-card" style={{ "--c": BLOCK_META.d.c }}><div className="big">d</div><h4>Groups 3 to 12</h4><p>Includes the transition elements.</p></div>
            <div className="pc-block-card" style={{ "--c": BLOCK_META.f.c }}><div className="big">f</div><h4>Lanthanoids and actinoids</h4><p>Usually shown separately below the main table.</p></div>
          </div>

          <h3>Important families</h3>
          <div className="pc-table-wrap">
            <table className="pc-table">
              <thead><tr><th>Group</th><th>Family</th><th>Examples</th></tr></thead>
              <tbody>
                {familyRows.map(([g, f, ex]) => (
                  <tr key={g}><td className="hl">{g}</td><td>{f}</td><td className="hl2">{ex}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <VideoBlock title="Building the Modern Periodic Table" desc="Atomic number order, 7 periods, 18 groups and the s, p, d and f blocks." file="Building the Modern Periodic Table.mp4" />
        </section>

        {/* 5. Trends */}
        <section className="pc-section pc-reveal" id="pc-sec-trends">
          <SectionHead num="5" tag="Understand the trends" title="Periodic properties" />
          <p>Periodic trends describe how properties change across a period and down a group. They are general trends — exceptions occur because of electronic configuration and other factors.</p>
          <div className="pc-table-wrap">
            <table className="pc-table">
              <thead><tr><th>Property</th><th>Across a period</th><th>Down a group</th><th>Simple reason</th></tr></thead>
              <tbody>
                {trendRows.map(([p, a, d, r]) => (
                  <tr key={p}><td className="hl">{p}</td><td>{a}</td><td>{d}</td><td style={{ fontSize: 18 }}>{r}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pc-callout purple">
            <div className="pc-callout-label">A quick memory aid</div>
            <p>Across a period, nuclear attraction generally becomes stronger and atomic size becomes smaller. Down a group, new electron shells are added and atomic size generally becomes larger.</p>
          </div>

          <h3>Trend explorer</h3>
          <p>Pick a property and a row or column of the table. Bars that break the general direction turn red — those are the exceptions.</p>
          <TrendExplorer />

          <h3>Why does size change?</h3>
          <PullAndSize />

          <div className="pc-callout">
            <div className="pc-callout-label">Important</div>
            <p>These are broad trends, not absolute rules. For example, electron gain enthalpy has notable exceptions.</p>
          </div>
          <VideoBlock title="Atomic Radius Trend" desc="Watch atoms shrink across a period and grow down a group." file="Atomic Radius Trend.mp4" />
          <VideoBlock title="Ionisation Enthalpy and Electronegativity" desc="How hard it is to remove an electron, and how strongly an atom attracts shared electrons." file="Ionisation Enthalpy and Electronegativity.mp4" />
        </section>

        {/* 6. Everyday */}
        <section className="pc-section pc-reveal" id="pc-sec-daily">
          <SectionHead num="6" tag="It's everywhere" title="Applications in everyday life" />
          <p>Pick an item to see where its element lives on the table and why that position matters.</p>
          <UseLocator items={everyday} />
        </section>

        {/* 7. Industrial */}
        <section className="pc-section pc-reveal" id="pc-sec-industry">
          <SectionHead num="7" tag="Why it matters" title="Industrial applications" />
          <p>Knowing an element's position, electronic configuration and reactivity helps industries select suitable elements and compounds for specific applications.</p>
          <UseLocator items={industrial} />
          <VideoBlock title="The Periodic Table in Everyday Life and Industry" desc="Sodium, chlorine, silicon, copper, lithium and more — and where they sit on the table." file="Periodic Table in Everyday Life.mp4" />
        </section>

        {/* 8. Higher education */}
        <section className="pc-section pc-reveal" id="pc-sec-higher">
          <SectionHead num="8" tag="Looking ahead" title="Connections with higher education" />
          <p>Periodic ideas keep returning in later study. A quick map of where they lead:</p>
          <HigherEdMap />
        </section>

        {/* 9. Global opportunities */}
        <section className="pc-section pc-reveal" id="pc-sec-global">
          <SectionHead num="9" tag="The bigger picture" title="Global opportunities and career connections" />
          <div className="pc-callout">
            <div className="pc-callout-label">Honest note</div>
            <p>This chapter alone does not qualify a student for a particular job, but it builds foundational knowledge used in several higher-education and technology fields.</p>
          </div>
          <div className="pc-global">
            {globalOps.map((g) => (
              <div className="pc-global-item" key={g.t}><span className="pc-global-ic">{g.i}</span><p>{g.t}</p></div>
            ))}
          </div>
          <h3>Useful skills</h3>
          <div className="pc-row">
            {skills.map((s) => <span key={s} className="pc-chipbtn active" style={{ cursor: "default" }}>{s}</span>)}
          </div>
        </section>

        {/* 10. Activity */}
        <section className="pc-section pc-reveal" id="pc-sec-activity">
          <SectionHead num="10" tag="Try it" title="Classroom activity: Na to Cl" />
          <p>Locate Na, Mg, Al, Si, P, S and Cl in the periodic table. Write them in increasing atomic-number order. Then discuss how metallic character changes from Na to Cl.</p>
          <MetalActivity />
        </section>

        {/* 11. Think and answer */}
        <section className="pc-section pc-reveal" id="pc-sec-think">
          <SectionHead num="11" tag="Your turn" title="Think and answer" />
          <p>Answer each one in your notebook first — then reveal the answer.</p>
          <RevealList items={thinkQs} />
          <h3>Locate and compare</h3>
          <RevealList items={practice} />
        </section>

        {/* 12. Quiz */}
        <section className="pc-section pc-reveal" id="pc-sec-quiz">
          <SectionHead num="12" tag="Check yourself" title="Quick quiz" />
          <p>Five questions on the scientists, blocks and trends. No pressure — you can retry.</p>
          <Quiz />
        </section>

        {/* 13. Self-evaluation */}
        <section className="pc-section pc-reveal" id="pc-sec-check">
          <SectionHead num="13" tag="Self-evaluation" title="True or false, then a rapid revision round" />
          <p>Mark each statement True or False.</p>
          <TrueFalse />
          <h3>Rapid revision round — one-word answers</h3>
          <p>Say the answer out loud, then flip the card.</p>
          <Flashcards />
        </section>

        {/* 14. Memory sheet */}
        <section className="pc-section pc-reveal" id="pc-sec-memory">
          <SectionHead num="14" tag="Revise in a minute" title="Exam tips and one-minute memory sheet" />
          <div className="pc-formula-grid">
            <div className="pc-formula-card"><div className="lbl">Modern periodic law</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>Properties of elements are periodic functions of their <b>atomic numbers</b>.</div></div>
            <div className="pc-formula-card o"><div className="lbl">Layout</div><div className="f">7 periods · 18 groups</div></div>
            <div className="pc-formula-card c"><div className="lbl">Blocks</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>s: Groups 1–2 · p: 13–18 · d: 3–12 · f: lanthanoids and actinoids</div></div>
            <div className="pc-formula-card g"><div className="lbl">Across a period →</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>radius ↓ · ionisation enthalpy ↑ · electronegativity ↑ · electron gain enthalpy often more negative</div></div>
            <div className="pc-formula-card g"><div className="lbl">Down a group ↓</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>radius ↑ · ionisation enthalpy ↓ · electronegativity ↓ · electron gain enthalpy not uniform</div></div>
            <div className="pc-formula-card"><div className="lbl">Scientists</div><div className="s" style={{ fontSize: 19, color: "var(--tx)" }}>Döbereiner = triads · Newlands = octaves · Mendeleev = gaps · Moseley = atomic number</div></div>
          </div>
          <h3>Examination preparation tips</h3>
          <div className="pc-tip-list">
            {examTips.map((t) => <div className="pc-tip" key={t}>{t}</div>)}
          </div>
          <h3>Final concept map</h3>
          <div className="pc-chain">
            {chain.map((c, i) => (
              <span key={c} style={{ display: "contents" }}>
                <span className="pc-chain-node" style={{ "--i": i }}>{c}</span>
                {i < chain.length - 1 && <span className="pc-chain-arrow">→</span>}
              </span>
            ))}
          </div>
          <div className="pc-callout purple">
            <div className="pc-callout-label">Final takeaway</div>
            <p>Periodic classification is more than memorising element names. It connects atomic structure with the properties and behaviour of elements, helps us compare them, understand their applications and make scientifically informed predictions about their chemistry.</p>
          </div>
          <div className="pc-teacher">
            <p>Teacher note: trend values shown in the explorer are standard textbook figures, rounded. Cross-check subtopic order and terminology with the current prescribed textbook.</p>
          </div>
        </section>

        {/* Quiz CTA */}
        <div className="pc-cta-card">
          <div className="pc-cta-left">
            <div className="pc-cta-icon">🧠</div>
            <div>
              <h2 className="pc-cta-title">It's quiz time</h2>
              <p className="pc-cta-desc">Lock in what you've learned. Take this quiz to review periodic classification and mark this lesson as complete.</p>
              <div className="pc-cta-meta">
                <span>✅ Get 60% or more to pass</span>
                <span>🕐 ~6 minutes</span>
              </div>
              <button className="pc-cta-btn" onClick={startQuiz}>Start Quiz <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="pc-cta-trophy">🏆</div>
        </div>
      </div>
    </div>
  );
}
