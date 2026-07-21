import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Back-office / CRM Cafein (non listé, noindex). Accès : admin.cafein.lu
  (ou /moderation en secours), protégé par la clé admin (ADMIN_KEY sur
  Railway). Menu latéral : Tableau de bord, Messages, URLs testées, Blog,
  Commentaires, Analytics.
*/

const scoreColor = (s) => (s == null ? "#8A857C" : s >= 90 ? "#1FCE8A" : s >= 50 ? "#E08A2B" : "#D64545");

function api(path, key, opts = {}) {
  return fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", "x-admin-key": key, ...(opts.headers || {}) },
  });
}

function StatCard({ label, value, accent = "#1FCE8A", sub }) {
  return (
    <div className="rounded-2xl bg-white border-[3px] border-ink p-4 shadow-[4px_4px_0_#0A0F0D]">
      <p className="font-display font-extrabold text-3xl leading-none" style={{ color: accent }}>{value}</p>
      <p className="mt-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50">{label}</p>
      {sub && <p className="mt-1 text-[11px] font-medium text-ink/40">{sub}</p>}
    </div>
  );
}

function ScoreChips({ scores }) {
  if (!scores) return null;
  const items = [
    { s: scores.performance, l: "Perf" },
    { s: scores.seo, l: "SEO" },
    { s: scores.accessibility, l: "A11y" },
    { s: scores.bestPractices, l: "Best" },
  ];
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((it) => (
        <span key={it.l} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-2.5 py-1 font-mono text-[11px] font-bold">
          <span className="text-ink/50 uppercase tracking-wider">{it.l}</span>
          <span style={{ color: scoreColor(it.s) }}>{it.s == null ? "—" : it.s}</span>
        </span>
      ))}
    </div>
  );
}

/* Mini graphe en barres (activité des 7 derniers jours). */
function MiniBars({ data, color = "#1FCE8A", label }) {
  const max = Math.max(1, ...data.map((d) => d.v));
  return (
    <div className="rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[4px_4px_0_#0A0F0D]">
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50 mb-4">{label}</p>
      <div className="flex items-end justify-between gap-2 h-28">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex items-end justify-center h-full">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.v / max) * 100}%` }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 140, damping: 18 }}
                className="w-full rounded-t-md border-2 border-ink"
                style={{ backgroundColor: color, minHeight: d.v ? 6 : 0 }}
                title={`${d.v}`}
              />
            </div>
            <span className="font-mono text-[9px] text-ink/40">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV = [
  { id: "dashboard", label: "Tableau de bord", icon: "M4 13h7V4H4v9zm9 7h7v-9h-7v9zM4 20h7v-5H4v5zM13 9h7V4h-7v5z" },
  { id: "messages", label: "Messages", icon: "M4 5h16v12H7l-3 3V5z" },
  { id: "audits", label: "URLs testées", icon: "M11 4a7 7 0 105.29 11.71l3.5 3.5 1.42-1.42-3.5-3.5A7 7 0 0011 4z" },
  { id: "blog", label: "Blog", icon: "M5 4h9l5 5v11H5V4zm9 1.5V9h3.5" },
  { id: "seo", label: "SEO / Pages", icon: "M4 7h16M4 12h16M4 17h10" },
  { id: "comments", label: "Commentaires", icon: "M4 4h16v11H8l-4 4V4z" },
  { id: "analytics", label: "Analytics", icon: "M4 20V10m6 10V4m6 16v-7m4 7V8" },
  { id: "backup", label: "Sauvegardes", icon: "M12 3v12m0 0l-4-4m4 4l4-4M4 17v3h16v-3" },
];

export default function Moderation() {
  const [key, setKey] = useState(() => sessionStorage.getItem("cafein-admin-key") || "");
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState("");
  const [view, setView] = useState("dashboard");

  const [contacts, setContacts] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [audits, setAudits] = useState([]);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    document.title = "Back-office · Cafein";
    let m = document.head.querySelector('meta[name="robots"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "robots");
      document.head.appendChild(m);
    }
    m.setAttribute("content", "noindex, nofollow");
    return () => m.setAttribute("content", "index, follow");
  }, []);

  async function refresh(k = key) {
    const [c, cm, p, a, s] = await Promise.all([
      api("/api/contact", k).then((r) => (r.ok ? r.json() : [])),
      fetch("/api/comments").then((r) => (r.ok ? r.json() : [])),
      api("/api/admin/posts", k).then((r) => (r.ok ? r.json() : [])),
      api("/api/admin/audits", k).then((r) => (r.ok ? r.json() : [])),
      fetch("/api/seo").then((r) => (r.ok ? r.json() : {})).catch(() => ({})),
    ]);
    setContacts(c); setComments(cm); setPosts(p); setAudits(a); setSeo(s || {});
  }

  async function login(e) {
    e?.preventDefault();
    setMsg("");
    try {
      const r = await api("/api/admin/check", key);
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || "Clé invalide.");
      sessionStorage.setItem("cafein-admin-key", key);
      setAuthed(true);
      refresh();
    } catch (e2) {
      setMsg(e2.message);
    }
  }
  useEffect(() => {
    if (key) login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    sessionStorage.removeItem("cafein-admin-key");
    setAuthed(false);
    setKey("");
    setContacts([]); setComments([]); setPosts([]); setAudits([]); setSeo({});
  }

  /* ── Stats globales ─────────────────────────────────────── */
  const stats = useMemo(() => {
    const auditsLeads = contacts.filter((c) => c.source === "audit");
    const now = Date.now();
    const perfVals = audits.map((a) => a.performance).filter((n) => Number.isFinite(n));
    const avgPerf = perfVals.length ? Math.round(perfVals.reduce((a, b) => a + b, 0) / perfVals.length) : null;
    // activité 7 jours (leads + audits confondus)
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 864e5);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 2);
      const v =
        contacts.filter((c) => c.date?.slice(0, 10) === key).length +
        audits.filter((a) => a.date?.slice(0, 10) === key).length;
      days.push({ label, v });
    }
    return {
      leads: contacts.length,
      auditLeads: auditsLeads.length,
      messages: contacts.length - auditsLeads.length,
      todo: contacts.filter((c) => !c.handled).length,
      comments: comments.length,
      published: posts.filter((p) => p.published).length,
      drafts: posts.filter((p) => !p.published).length,
      audits: audits.length,
      avgPerf,
      days,
    };
  }, [contacts, comments, posts, audits]);

  /* ── Écran de connexion ─────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-cream grid place-items-center px-6">
        <form onSubmit={login} className="w-full max-w-md rounded-3xl bg-white border-[3px] border-ink p-8 shadow-[8px_8px_0_#0A0F0D]">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-mint-dark">( Espace équipe )</p>
          <h1 className="mt-3 font-display font-extrabold text-3xl text-ink tracking-tight">Le back-office</h1>
          <label className="mt-6 block font-display font-bold text-ink text-sm" htmlFor="adminkey">Clé d'accès</label>
          <input
            id="adminkey"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="••••••••"
            className="mt-2 w-full rounded-full border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark"
          />
          <button type="submit" className="mt-4 w-full rounded-full bg-mint border-2 border-ink px-6 py-2.5 font-display font-bold text-ink shadow-[3px_3px_0_#0A0F0D] hover:shadow-[5px_5px_0_#0A0F0D] transition-shadow">
            Entrer
          </button>
          {msg && <p className="mt-3 text-sm font-medium text-caramel">{msg}</p>}
        </form>
      </div>
    );
  }

  /* ── App CRM ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-cream md:flex">
      {/* Sidebar */}
      <aside className="md:w-60 md:min-h-screen bg-espresso text-cream md:sticky md:top-0 md:h-screen flex md:flex-col shrink-0 border-b-[3px] md:border-b-0 md:border-r-[3px] border-ink">
        <div className="px-5 py-5 md:py-6 flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-mint text-ink font-display font-extrabold">C</span>
          <span className="font-display font-extrabold hidden md:block">Back-office</span>
        </div>
        <nav className="flex md:flex-col gap-1 px-2 md:px-3 overflow-x-auto md:overflow-visible flex-1">
          {NAV.map((n) => {
            const on = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-semibold text-sm whitespace-nowrap transition-colors ${on ? "bg-mint text-ink" : "text-cream/70 hover:text-cream hover:bg-white/5"}`}
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                  <path d={n.icon} />
                </svg>
                <span className="hidden md:inline">{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="hidden md:block p-3 shrink-0">
          <button onClick={logout} className="w-full rounded-xl px-3 py-2.5 font-semibold text-sm text-cream/60 hover:text-cream hover:bg-white/5 text-left transition-colors">
            Se déconnecter
          </button>
        </div>
        <button onClick={logout} className="md:hidden ml-auto mr-3 my-auto rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">Quitter</button>
      </aside>

      {/* Contenu */}
      <main className="flex-1 min-w-0 px-5 md:px-10 py-8 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {view === "dashboard" && <Dashboard stats={stats} contacts={contacts} audits={audits} onGo={setView} />}
            {view === "messages" && <Messages contacts={contacts} setContacts={setContacts} k={key} setMsg={setMsg} />}
            {view === "audits" && <Audits audits={audits} />}
            {view === "blog" && <Blog posts={posts} setPosts={setPosts} k={key} setMsg={setMsg} />}
            {view === "seo" && <SeoPages seo={seo} setSeo={setSeo} k={key} setMsg={setMsg} />}
            {view === "comments" && <Comments comments={comments} setComments={setComments} k={key} setMsg={setMsg} />}
            {view === "analytics" && <Analytics k={key} />}
            {view === "backup" && <Backups k={key} setMsg={setMsg} onRestored={refresh} />}
          </motion.div>
        </AnimatePresence>
        {msg && <p className="mt-6 text-sm font-medium text-caramel">{msg}</p>}
      </main>
    </div>
  );
}

/* ══════════════ Tableau de bord ══════════════ */
function Dashboard({ stats, contacts, audits, onGo }) {
  const recent = [...contacts.map((c) => ({ t: "lead", ...c })), ...audits.map((a) => ({ t: "audit", ...a }))]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Tableau de bord</h1>
      <p className="mt-1 font-medium text-ink/50">Vue d'ensemble de l'activité du site.</p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Leads au total" value={stats.leads} />
        <StatCard label="À traiter" value={stats.todo} accent="#D64545" />
        <StatCard label="URLs testées" value={stats.audits} accent="#E08A2B" />
        <StatCard label="Perf. moyenne" value={stats.avgPerf == null ? "—" : stats.avgPerf} accent={scoreColor(stats.avgPerf)} />
        <StatCard label="Articles publiés" value={stats.published} sub={`${stats.drafts} brouillon(s)`} />
        <StatCard label="Demandes d'audit" value={stats.auditLeads} accent="#E08A2B" />
        <StatCard label="Messages contact" value={stats.messages} />
        <StatCard label="Commentaires" value={stats.comments} accent="#0A0F0D" />
      </div>

      <div className="mt-4">
        <MiniBars data={stats.days} label="Activité des 7 derniers jours (leads + audits)" />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-xl text-ink">Activité récente</h2>
          <button onClick={() => onGo("messages")} className="font-mono text-[11px] tracking-wide uppercase text-mint-dark hover:underline">Tout voir →</button>
        </div>
        <ul className="mt-4 space-y-2">
          {recent.map((r, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl bg-white border-2 border-ink px-4 py-2.5">
              <span className={`rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${r.t === "audit" ? "bg-caramel" : r.source === "audit" ? "bg-caramel" : "bg-mint"} text-ink`}>
                {r.t === "audit" ? "Test" : r.source === "audit" ? "Audit" : "Message"}
              </span>
              <span className="font-semibold text-ink text-sm truncate flex-1">{r.t === "audit" ? r.url : r.nom}</span>
              <span className="font-mono text-[10px] text-ink/40 shrink-0">{new Date(r.date).toLocaleDateString("fr-FR")}</span>
            </li>
          ))}
          {recent.length === 0 && <p className="text-ink/50 font-medium">Rien pour l'instant. ☕</p>}
        </ul>
      </div>
    </div>
  );
}

/* ══════════════ Messages (leads) ══════════════ */
function Messages({ contacts, setContacts, k, setMsg }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  async function toggleHandled(c) {
    const next = !c.handled;
    setContacts((l) => l.map((x) => (x.id === c.id ? { ...x, handled: next } : x)));
    const r = await api(`/api/contact/${c.id}`, k, { method: "PATCH", body: JSON.stringify({ handled: next }) });
    if (!r.ok) { setContacts((l) => l.map((x) => (x.id === c.id ? { ...x, handled: !next } : x))); setMsg("Mise à jour impossible."); }
  }
  async function remove(id) {
    const r = await api(`/api/contact/${id}`, k, { method: "DELETE" });
    if (r.ok) setContacts((l) => l.filter((x) => x.id !== id)); else setMsg("Suppression impossible.");
  }
  function exportCsv() {
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
    const rows = [["date", "type", "nom", "email", "traité", "perf", "seo", "a11y", "best", "message"],
      ...contacts.map((c) => [c.date, c.source === "audit" ? "audit" : "contact", c.nom, c.email, c.handled ? "oui" : "non",
        c.scores?.performance ?? "", c.scores?.seo ?? "", c.scores?.accessibility ?? "", c.scores?.bestPractices ?? "", c.message])];
    const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
    a.download = "cafein-leads.csv"; a.click(); URL.revokeObjectURL(a.href);
  }

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.slice().reverse().filter((c) => {
      if (filter === "audit" && c.source !== "audit") return false;
      if (filter === "contact" && c.source === "audit") return false;
      if (filter === "todo" && c.handled) return false;
      if (q && !`${c.nom} ${c.email} ${c.message}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [contacts, filter, query]);

  const nb = { all: contacts.length, audit: contacts.filter((c) => c.source === "audit").length, todo: contacts.filter((c) => !c.handled).length };
  const FILTERS = [{ id: "all", l: `Tous (${nb.all})` }, { id: "audit", l: `Audits (${nb.audit})` }, { id: "contact", l: `Contact (${nb.all - nb.audit})` }, { id: "todo", l: `À traiter (${nb.todo})` }];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Messages</h1>
        <button onClick={exportCsv} className="rounded-full bg-ink text-cream font-display font-bold text-xs px-4 py-2 border-2 border-ink hover:-translate-y-0.5 transition-transform">↓ Export CSV</button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`rounded-full px-3.5 py-1.5 font-semibold text-xs border-2 border-ink transition-all ${filter === f.id ? "bg-ink text-cream" : "bg-white text-ink hover:-translate-y-0.5"}`}>{f.l}</button>
        ))}
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="ml-auto rounded-full border-2 border-ink px-4 py-1.5 text-sm font-medium text-ink placeholder-ink/35 focus:outline-none focus:border-mint-dark w-full sm:w-52" />
      </div>
      <ul className="mt-6 space-y-4">
        <AnimatePresence initial={false}>
          {shown.map((c) => {
            const isAudit = c.source === "audit";
            return (
              <motion.li key={c.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 60 }}
                className={`rounded-2xl bg-white border-[3px] border-ink p-5 ${c.handled ? "opacity-55" : `shadow-[4px_4px_0_${isAudit ? "#E08A2B" : "#1FCE8A"}]`}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase ${isAudit ? "bg-caramel" : "bg-mint"} text-ink`}>{isAudit ? "Audit" : "Contact"}</span>
                      {c.handled && <span className="rounded-full border-2 border-ink bg-cream-2 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase text-ink/60">Traité</span>}
                      <span className="font-display font-bold text-ink">{c.nom}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <a href={`mailto:${c.email}`} className="text-sm font-medium text-mint-dark hover:underline break-all">{c.email}</a>
                      <span className="font-mono text-[10px] uppercase text-ink/40">{new Date(c.date).toLocaleString("fr-FR")} · {c.lang?.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleHandled(c)} title={c.handled ? "Marquer non traité" : "Marquer traité"} className={`grid place-items-center w-9 h-9 rounded-full border-2 border-ink transition-colors ${c.handled ? "bg-mint text-ink" : "bg-white text-ink/40 hover:text-ink"}`}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l5 5L20 7" /></svg>
                    </button>
                    <a href={`mailto:${c.email}?subject=${encodeURIComponent("Re: votre demande · Cafein")}`} className="rounded-full bg-mint text-ink font-display font-bold text-xs px-4 py-2 border-2 border-ink">Répondre</a>
                    <button onClick={() => remove(c.id)} className="rounded-full bg-espresso text-cream font-display font-bold text-xs px-3 py-2 border-2 border-ink">✕</button>
                  </div>
                </div>
                {isAudit && <ScoreChips scores={c.scores} />}
                <p className="mt-3 text-ink/75 font-medium whitespace-pre-wrap break-words text-sm">{c.message}</p>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      {shown.length === 0 && <p className="mt-4 text-ink/50 font-medium">Aucun message pour ce filtre. ☕</p>}
    </div>
  );
}

/* ══════════════ URLs testées (journal audits) ══════════════ */
function Audits({ audits }) {
  const [query, setQuery] = useState("");
  const rows = audits.slice().reverse().filter((a) => !query || a.url?.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">URLs testées</h1>
      <p className="mt-1 font-medium text-ink/50">Tous les sites analysés par l'outil d'audit du site ({audits.length}).</p>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filtrer une URL…" className="mt-4 rounded-full border-2 border-ink px-4 py-1.5 text-sm font-medium text-ink placeholder-ink/35 focus:outline-none focus:border-mint-dark w-full sm:w-72" />
      <div className="mt-5 overflow-x-auto rounded-2xl border-[3px] border-ink bg-white shadow-[4px_4px_0_#0A0F0D]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink/10 font-mono text-[10px] tracking-widest uppercase text-ink/50">
              <th className="px-4 py-3">Site</th><th className="px-4 py-3">Perf</th><th className="px-4 py-3">SEO</th><th className="px-4 py-3">A11y</th><th className="px-4 py-3">Best</th><th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink max-w-[16rem] truncate">
                  <a href={a.url} target="_blank" rel="noreferrer" className="hover:text-mint-dark hover:underline">{a.url}</a>
                </td>
                {["performance", "seo", "accessibility", "bestPractices"].map((kk) => (
                  <td key={kk} className="px-4 py-3 font-display font-extrabold" style={{ color: scoreColor(a[kk]) }}>{a[kk] == null ? "—" : a[kk]}</td>
                ))}
                <td className="px-4 py-3 font-mono text-[11px] text-ink/50 whitespace-nowrap">{new Date(a.date).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="mt-4 text-ink/50 font-medium">Aucun audit pour l'instant. ☕</p>}
    </div>
  );
}

/* ══════════════ Blog (CMS) ══════════════ */
const EMPTY_POST = { title: "", tag: "", cover: "", excerpt: "", body: "", published: false };
function Blog({ posts, setPosts, k, setMsg }) {
  const [editing, setEditing] = useState(null); // null = liste, "new" | post object = éditeur
  const [form, setForm] = useState(EMPTY_POST);
  const [saving, setSaving] = useState(false);

  function openNew() { setForm(EMPTY_POST); setEditing("new"); }
  function openEdit(p) { setForm({ ...p }); setEditing(p); }

  async function save() {
    setSaving(true);
    try {
      const isNew = editing === "new";
      const r = await api(isNew ? "/api/admin/posts" : `/api/admin/posts/${form.id}`, k, {
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("échec");
      const saved = await r.json();
      setPosts((l) => (isNew ? [saved, ...l] : l.map((x) => (x.id === saved.id ? saved : x))));
      setEditing(null);
    } catch { setMsg("Enregistrement impossible."); }
    finally { setSaving(false); }
  }
  async function togglePublish(p) {
    const next = !p.published;
    setPosts((l) => l.map((x) => (x.id === p.id ? { ...x, published: next } : x)));
    const r = await api(`/api/admin/posts/${p.id}`, k, { method: "PUT", body: JSON.stringify({ published: next }) });
    if (!r.ok) { setPosts((l) => l.map((x) => (x.id === p.id ? { ...x, published: !next } : x))); setMsg("Impossible."); }
  }
  async function remove(p) {
    const r = await api(`/api/admin/posts/${p.id}`, k, { method: "DELETE" });
    if (r.ok) setPosts((l) => l.filter((x) => x.id !== p.id)); else setMsg("Suppression impossible.");
  }

  if (editing) {
    const set = (patch) => setForm((f) => ({ ...f, ...patch }));
    return (
      <div className="max-w-2xl">
        <button onClick={() => setEditing(null)} className="font-mono text-[11px] tracking-wide uppercase text-mint-dark hover:underline">← Retour aux articles</button>
        <h1 className="mt-3 font-display font-extrabold text-3xl text-ink tracking-tight">{editing === "new" ? "Nouvel article" : "Modifier l'article"}</h1>
        <div className="mt-6 space-y-4">
          <Field label="Titre">
            <input value={form.title} onChange={(e) => set({ title: e.target.value })} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-display font-bold text-ink focus:outline-none focus:border-mint-dark" placeholder="Le titre de l'article" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Catégorie (tag)"><input value={form.tag} onChange={(e) => set({ tag: e.target.value })} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark" placeholder="SEO, GEO, Site web…" /></Field>
            <Field label="Image de couverture (URL, optionnel)"><input value={form.cover} onChange={(e) => set({ cover: e.target.value })} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark" placeholder="https://…" /></Field>
          </div>
          <Field label="Accroche (résumé affiché sur les cartes)">
            <textarea value={form.excerpt} onChange={(e) => set({ excerpt: e.target.value })} rows={2} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark resize-y" placeholder="Une ou deux phrases qui donnent envie de lire." />
          </Field>
          <Field label="Contenu (une ligne vide = nouveau paragraphe · « ## » = sous-titre)">
            <textarea value={form.body} onChange={(e) => set({ body: e.target.value })} rows={12} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark resize-y leading-relaxed" placeholder={"Votre article ici.\n\n## Un sous-titre\n\nUn paragraphe."} />
          </Field>
          <label className="flex items-center gap-3 cursor-pointer">
            <button type="button" onClick={() => set({ published: !form.published })} className={`relative w-12 h-7 rounded-full border-2 border-ink transition-colors ${form.published ? "bg-mint" : "bg-white"}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-ink transition-all ${form.published ? "left-[1.55rem]" : "left-0.5"}`} />
            </button>
            <span className="font-display font-bold text-ink">{form.published ? "Publié (visible sur le site)" : "Brouillon (non visible)"}</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="rounded-full bg-mint text-ink font-display font-bold px-6 py-2.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-60">{saving ? "Enregistrement…" : "Enregistrer"}</button>
            <button onClick={() => setEditing(null)} className="rounded-full bg-white text-ink font-display font-bold px-6 py-2.5 border-2 border-ink">Annuler</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Blog</h1>
        <button onClick={openNew} className="rounded-full bg-mint text-ink font-display font-bold text-sm px-5 py-2.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">+ Nouvel article</button>
      </div>
      <p className="mt-1 font-medium text-ink/50">Les articles publiés apparaissent automatiquement sur le site.</p>
      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white border-[3px] border-ink p-4 shadow-[3px_3px_0_#0A0F0D]">
            <span className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase ${p.published ? "bg-mint" : "bg-cream-2"} text-ink`}>{p.published ? "Publié" : "Brouillon"}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-ink truncate">{p.title}</p>
              <p className="font-mono text-[10px] uppercase text-ink/40">{p.tag || "—"} · {new Date(p.date).toLocaleDateString("fr-FR")} · /blog/{p.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              {p.published && <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="rounded-full bg-white text-ink font-display font-bold text-xs px-3 py-2 border-2 border-ink">Voir</a>}
              <button onClick={() => togglePublish(p)} className="rounded-full bg-white text-ink font-display font-bold text-xs px-3 py-2 border-2 border-ink">{p.published ? "Dépublier" : "Publier"}</button>
              <button onClick={() => openEdit(p)} className="rounded-full bg-mint text-ink font-display font-bold text-xs px-3 py-2 border-2 border-ink">Modifier</button>
              <button onClick={() => remove(p)} className="rounded-full bg-espresso text-cream font-display font-bold text-xs px-3 py-2 border-2 border-ink">✕</button>
            </div>
          </li>
        ))}
      </ul>
      {posts.length === 0 && <p className="mt-4 text-ink/50 font-medium">Aucun article. Créez le premier ! ☕</p>}
    </div>
  );
}
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-ink/45 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

/* ══════════════ SEO / Pages ══════════════
   Force le meta title et la meta description de chaque page. Les valeurs
   par défaut ci-dessous reflètent celles codées dans le site : elles servent
   d'aperçu / de repère. Un champ laissé vide = valeur par défaut conservée. */
const SEO_PAGES = [
  { path: "/", name: "Accueil",
    title: "Cafein | Agence web & communication digitale au Luxembourg",
    titleEn: "Cafein | Web & Digital Marketing Agency in Luxembourg",
    description: "Cafein, agence de marketing web au Luxembourg : création de sites internet sur mesure, référencement SEO & GEO, réseaux sociaux et communication digitale. Devis gratuit, conseils francs.",
    descriptionEn: "Cafein, a web marketing agency in Luxembourg: custom website design, SEO & GEO, social media and digital communication. Free quote, straight-talking advice." },
  { path: "/creation-site-web", name: "Création de site",
    title: "Création de site internet au Luxembourg : vitrine, e-commerce, sur mesure | Cafein",
    titleEn: "Website Design in Luxembourg: Showcase, E-commerce, Custom | Cafein",
    description: "Cafein crée votre site internet au Luxembourg : site vitrine, boutique e-commerce ou plateforme sur mesure. Design soigné, SEO intégré dès le départ, RGPD, un mois de support inclus.",
    descriptionEn: "Cafein builds your website in Luxembourg: showcase sites, e-commerce stores or custom platforms. Polished design, SEO built in from day one, GDPR-ready, one month of support included." },
  { path: "/seo-geo", name: "SEO & GEO",
    title: "Agence SEO & GEO au Luxembourg : référencement Google et IA | Cafein",
    titleEn: "SEO & GEO Agency in Luxembourg: Google and AI Ranking | Cafein",
    description: "Référencement naturel (SEO) et visibilité dans les IA (GEO) au Luxembourg : audit, optimisation technique, contenus et suivi des positions. Être trouvé sur Google comme dans ChatGPT.",
    descriptionEn: "Search engine optimization (SEO) and visibility in AI engines (GEO) in Luxembourg: audit, technical optimization, content and rank tracking. Get found on Google and in ChatGPT." },
  { path: "/communication", name: "Communication",
    title: "Communication digitale & réseaux sociaux au Luxembourg | Cafein",
    titleEn: "Digital Communication & Social Media in Luxembourg | Cafein",
    description: "Stratégie, réseaux sociaux, contenus et campagnes publicitaires au Luxembourg : Cafein gère votre communication digitale de A à Z. LinkedIn, Instagram, Facebook, sans jargon.",
    descriptionEn: "Strategy, social media, content and ad campaigns in Luxembourg: Cafein handles your digital communication from A to Z. LinkedIn, Instagram, Facebook, no jargon." },
  { path: "/notre-expertise", name: "Notre expertise",
    title: "Nos 12 expertises web & digital au Luxembourg | Cafein",
    titleEn: "Our 12 Web & Digital Areas of Expertise in Luxembourg | Cafein",
    description: "Sites vitrine, e-commerce, SEO, GEO, réseaux sociaux, branding, data… Les 12 expertises de Cafein, agence digitale au Luxembourg, un seul interlocuteur du premier appel au suivi.",
    descriptionEn: "Showcase sites, e-commerce, SEO, GEO, social media, branding, data… The 12 areas of expertise of Cafein, a digital agency in Luxembourg, one contact from first call to follow-up." },
  { path: "/lexique", name: "Lexique",
    title: "Lexique du web : SEO, GEO, sites & social media expliqués simplement | Cafein",
    titleEn: "Web Glossary: SEO, GEO, Websites & Social Media Made Simple | Cafein",
    description: "69 termes du web enfin clairs : SEO, GEO, backlink, CMS, Core Web Vitals, taux de conversion… Le jargon du digital traduit en français simple par Cafein, agence web au Luxembourg.",
    descriptionEn: "69 web terms finally made clear: SEO, GEO, backlink, CMS, Core Web Vitals, conversion rate… Digital jargon translated into plain English by Cafein, a web agency in Luxembourg." },
  { path: "/equipe", name: "Équipe",
    title: "L'équipe Cafein : trois cofondateurs, un percolateur | Agence web Luxembourg",
    titleEn: "The Cafein Team: Three Cofounders, One Coffee Machine | Web Agency Luxembourg",
    description: "Stan, Pinoo et Flo : les trois cofondateurs de Cafein, agence web au Luxembourg. Stratégie, création de sites, SEO et communication, une équipe resserrée qui s'occupe de tout.",
    descriptionEn: "Stan, Pinoo and Flo: the three cofounders of Cafein, a web agency in Luxembourg. Strategy, website design, SEO and communication, a tight-knit team that handles everything." },
  { path: "/mentions-legales", name: "Mentions légales",
    title: "Mentions légales | Cafein", titleEn: "",
    description: "Mentions légales du site Cafein, agence web au Luxembourg.", descriptionEn: "" },
  { path: "/confidentialite", name: "Confidentialité",
    title: "Politique de confidentialité | Cafein", titleEn: "",
    description: "Politique de confidentialité du site Cafein, agence web au Luxembourg.", descriptionEn: "" },
  { path: "/politique-cookies", name: "Politique de cookies",
    title: "Politique de cookies | Cafein", titleEn: "",
    description: "Politique de cookies du site Cafein, agence web au Luxembourg.", descriptionEn: "" },
];

function CharCount({ value, rec }) {
  const n = (value || "").length;
  return <span className={`font-mono text-[10px] ${n > rec ? "text-caramel" : "text-ink/35"}`}>{n}/{rec}</span>;
}

/* Aperçu façon résultat Google, pour visualiser le rendu final. */
function SerpPreview({ title, description, path }) {
  return (
    <div className="rounded-xl bg-cream-2 border-2 border-ink/10 p-4">
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/40 mb-2">Aperçu Google</p>
      <p className="text-[13px] text-ink/50 truncate">www.cafein.lu{path === "/" ? "" : path}</p>
      <p className="text-[#1a0dab] text-lg leading-tight truncate">{title}</p>
      <p className="text-[13px] text-ink/70 leading-snug mt-0.5 line-clamp-2">{description}</p>
    </div>
  );
}

function SeoPages({ seo, setSeo, k, setMsg }) {
  const [editing, setEditing] = useState(null); // path en cours d'édition
  const [form, setForm] = useState({ title: "", titleEn: "", description: "", descriptionEn: "" });
  const [saving, setSaving] = useState(false);

  const pg = SEO_PAGES.find((p) => p.path === editing);

  function open(p) {
    const ov = seo[p.path] || {};
    setForm({ title: ov.title || "", titleEn: ov.titleEn || "", description: ov.description || "", descriptionEn: ov.descriptionEn || "" });
    setEditing(p.path);
  }
  async function send(payload, close = true) {
    setSaving(true);
    try {
      const r = await api("/api/admin/seo", k, { method: "PUT", body: JSON.stringify(payload) });
      if (!r.ok) throw new Error();
      setSeo(await r.json());
      if (close) setEditing(null);
    } catch { setMsg("Enregistrement impossible."); }
    finally { setSaving(false); }
  }

  /* ── Éditeur d'une page ── */
  if (pg) {
    const set = (patch) => setForm((f) => ({ ...f, ...patch }));
    const effTitle = form.title || pg.title;
    const effDesc = form.description || pg.description;
    return (
      <div className="max-w-2xl">
        <button onClick={() => setEditing(null)} className="font-mono text-[11px] tracking-wide uppercase text-mint-dark hover:underline">← Retour aux pages</button>
        <h1 className="mt-3 font-display font-extrabold text-3xl text-ink tracking-tight">{pg.name}</h1>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/40">www.cafein.lu{pg.path === "/" ? "" : pg.path}</p>

        <div className="mt-6"><SerpPreview title={effTitle} description={effDesc} path={pg.path} /></div>

        <div className="mt-6 space-y-4">
          <Field label={<span className="flex items-center justify-between">Meta title (FR) <CharCount value={form.title} rec={60} /></span>}>
            <input value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder={pg.title} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark" />
          </Field>
          <Field label={<span className="flex items-center justify-between">Meta description (FR) <CharCount value={form.description} rec={160} /></span>}>
            <textarea value={form.description} onChange={(e) => set({ description: e.target.value })} rows={3} placeholder={pg.description} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark resize-y" />
          </Field>
          <div className="pt-2 border-t-2 border-ink/10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 mb-3">Version anglaise (/en) — optionnel</p>
            <div className="space-y-4">
              <Field label={<span className="flex items-center justify-between">Meta title (EN) <CharCount value={form.titleEn} rec={60} /></span>}>
                <input value={form.titleEn} onChange={(e) => set({ titleEn: e.target.value })} placeholder={pg.titleEn || pg.title} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark" />
              </Field>
              <Field label={<span className="flex items-center justify-between">Meta description (EN) <CharCount value={form.descriptionEn} rec={160} /></span>}>
                <textarea value={form.descriptionEn} onChange={(e) => set({ descriptionEn: e.target.value })} rows={3} placeholder={pg.descriptionEn || pg.description} className="w-full rounded-xl border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark resize-y" />
              </Field>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={() => send({ path: pg.path, ...form })} disabled={saving} className="rounded-full bg-mint text-ink font-display font-bold px-6 py-2.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-60">{saving ? "Enregistrement…" : "Enregistrer"}</button>
            <button onClick={() => send({ path: pg.path })} disabled={saving} className="rounded-full bg-white text-ink font-display font-bold px-6 py-2.5 border-2 border-ink hover:bg-cream-2 transition-colors">Réinitialiser</button>
            <button onClick={() => setEditing(null)} className="rounded-full bg-white text-ink font-display font-bold px-6 py-2.5 border-2 border-ink">Annuler</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Liste des pages ── */
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">SEO / Pages</h1>
      <p className="mt-1 font-medium text-ink/50">Forcez le titre et la description de chaque page dans Google. Vide = valeur par défaut du site.</p>
      <ul className="mt-6 space-y-3">
        {SEO_PAGES.map((p) => {
          const ov = seo[p.path];
          const custom = ov && Object.keys(ov).length > 0;
          return (
            <li key={p.path} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white border-[3px] border-ink p-4 shadow-[3px_3px_0_#0A0F0D]">
              <span className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase ${custom ? "bg-sun" : "bg-cream-2"} text-ink`}>{custom ? "Personnalisé" : "Par défaut"}</span>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-ink truncate">{p.name}</p>
                <p className="font-mono text-[10px] uppercase text-ink/40 truncate">{(ov?.title) || p.title}</p>
              </div>
              <button onClick={() => open(p)} className="rounded-full bg-mint text-ink font-display font-bold text-xs px-4 py-2 border-2 border-ink">Modifier</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ══════════════ Sauvegardes ══════════════
   Exporte toutes les données dynamiques (messages, audits, blog, commentaires,
   SEO) en un fichier, et permet de restaurer le site depuis un tel fichier. */
function Backups({ k, setMsg, onRestored }) {
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState(null); // { obj, counts, name } en attente de confirmation
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  async function download() {
    setBusy(true);
    try {
      const r = await api("/api/admin/backup", k);
      if (!r.ok) throw new Error();
      const blob = await r.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `cafein-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch { setMsg("Téléchargement impossible."); }
    finally { setBusy(false); }
  }

  function pickFile(e) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result));
        const d = obj && obj.data ? obj.data : obj;
        const n = (x) => (Array.isArray(x) ? x.length : null);
        const counts = {
          Messages: n(d.contacts),
          "URLs testées": n(d.audits),
          Articles: n(d.posts),
          Commentaires: n(d.comments),
          "Pages SEO": d.seo && typeof d.seo === "object" && !Array.isArray(d.seo) ? Object.keys(d.seo).length : null,
        };
        if (Object.values(counts).every((v) => v == null)) return setMsg("Ce fichier ne contient aucune donnée reconnue.");
        setPending({ obj, counts, name: f.name, exportedAt: obj.exportedAt || null });
      } catch { setMsg("Fichier illisible (JSON invalide)."); }
    };
    reader.readAsText(f);
  }

  async function doRestore() {
    setBusy(true);
    try {
      const r = await api("/api/admin/restore", k, { method: "POST", body: JSON.stringify(pending.obj) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "échec");
      setResult(d.restored);
      setPending(null);
      onRestored && onRestored();
    } catch (e) { setMsg("Restauration impossible : " + (e.message || "")); }
    finally { setBusy(false); }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Sauvegardes</h1>
      <p className="mt-1 font-medium text-ink/50">Exportez toutes les données du site, ou restaurez-les depuis une sauvegarde.</p>

      {/* Télécharger */}
      <div className="mt-6 rounded-3xl bg-white border-[3px] border-ink p-6 shadow-[6px_6px_0_#0A0F0D]">
        <h2 className="font-display font-extrabold text-xl text-ink">Télécharger une sauvegarde</h2>
        <p className="mt-2 text-ink/70 font-medium text-sm leading-relaxed">
          Un fichier <code className="bg-cream-2 px-1.5 py-0.5 rounded text-xs">.json</code> contenant les messages, les URLs testées,
          les articles de blog, les commentaires et les réglages SEO. À garder au chaud.
        </p>
        <button onClick={download} disabled={busy} className="mt-4 rounded-full bg-mint text-ink font-display font-bold px-6 py-2.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-60">
          ↓ Télécharger la sauvegarde
        </button>
        <p className="mt-3 text-ink/40 font-medium text-xs">Le code du site (versionné sur GitHub) et les clés/variables (Railway) ne sont pas concernés.</p>
      </div>

      {/* Restaurer */}
      <div className="mt-5 rounded-3xl bg-white border-[3px] border-ink p-6 shadow-[6px_6px_0_#0A0F0D]">
        <h2 className="font-display font-extrabold text-xl text-ink">Restaurer une sauvegarde</h2>
        <p className="mt-2 text-ink/70 font-medium text-sm leading-relaxed">
          Importez un fichier de sauvegarde pour remplacer les données actuelles.
          <span className="text-caramel font-semibold"> Les données présentes seront écrasées.</span>
        </p>

        {!pending && (
          <>
            <input ref={fileRef} type="file" accept="application/json,.json" onChange={pickFile} className="hidden" />
            <button onClick={() => fileRef.current?.click()} disabled={busy} className="mt-4 rounded-full bg-white text-ink font-display font-bold px-6 py-2.5 border-2 border-ink hover:bg-cream-2 transition-colors disabled:opacity-60">
              Choisir un fichier…
            </button>
          </>
        )}

        {pending && (
          <div className="mt-4 rounded-2xl border-2 border-ink bg-cream p-4">
            <p className="font-display font-bold text-ink text-sm break-all">{pending.name}</p>
            {pending.exportedAt && <p className="font-mono text-[10px] uppercase text-ink/40 mt-0.5">Exporté le {new Date(pending.exportedAt).toLocaleString("fr-FR")}</p>}
            <ul className="mt-3 flex flex-wrap gap-2">
              {Object.entries(pending.counts).filter(([, v]) => v != null).map(([label, v]) => (
                <li key={label} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-2.5 py-1 font-mono text-[11px] font-bold">
                  <span className="text-ink/50 uppercase tracking-wider">{label}</span>
                  <span className="text-ink">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-caramel font-semibold text-sm">Confirmer le remplacement des données actuelles par ce fichier ?</p>
            <div className="mt-3 flex gap-3">
              <button onClick={doRestore} disabled={busy} className="rounded-full bg-espresso text-cream font-display font-bold px-6 py-2.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-60">{busy ? "Restauration…" : "Oui, restaurer"}</button>
              <button onClick={() => setPending(null)} disabled={busy} className="rounded-full bg-white text-ink font-display font-bold px-6 py-2.5 border-2 border-ink">Annuler</button>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-2xl border-2 border-ink bg-mint/25 p-4">
            <p className="font-display font-bold text-ink text-sm">Restauration terminée ✓</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {Object.entries(result).map(([label, v]) => (
                <li key={label} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-2.5 py-1 font-mono text-[11px] font-bold">
                  <span className="text-ink/50 uppercase tracking-wider">{label}</span>
                  <span className="text-ink">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════ Commentaires ══════════════ */
function Comments({ comments, setComments, k, setMsg }) {
  async function remove(id) {
    const r = await api(`/api/comments/${id}`, k, { method: "DELETE" });
    if (r.ok) setComments((l) => l.filter((c) => c.id !== id)); else setMsg("Suppression impossible.");
  }
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Commentaires <span className="text-mint-dark">({comments.length})</span></h1>
      <p className="mt-1 font-medium text-ink/50">Sous la publication · suppression définitive au clic.</p>
      <ul className="mt-6 space-y-4">
        <AnimatePresence initial={false}>
          {comments.slice().reverse().map((c) => (
            <motion.li key={c.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 60 }} className="flex items-start gap-4 rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[4px_4px_0_#0A0F0D]">
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-ink">{c.name}<span className="ml-3 font-mono text-[10px] uppercase text-ink/40">{new Date(c.date).toLocaleString("fr-FR")}</span></p>
                <p className="mt-1.5 text-ink/75 font-medium break-words">{c.text}</p>
              </div>
              <button onClick={() => remove(c.id)} className="shrink-0 rounded-full bg-espresso text-cream font-display font-bold text-xs px-4 py-2 border-2 border-ink">Supprimer</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {comments.length === 0 && <p className="mt-4 text-ink/50 font-medium">Aucun commentaire. Tout est propre ! ☕</p>}
    </div>
  );
}

/* ══════════════ Analytics (Google Analytics 4) ══════════════ */
function Analytics({ k }) {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    api("/api/admin/analytics", k)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ configured: true, error: "Connexion impossible." }));
  }, [k]);

  if (data === undefined) {
    return (
      <div>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Analytics</h1>
        <p className="mt-6 font-medium text-ink/50">Chargement des statistiques…</p>
      </div>
    );
  }

  if (!data.configured) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Analytics</h1>
        <p className="mt-1 font-medium text-ink/50">Google Analytics est installé sur le site — reste à le brancher ici.</p>
        <div className="mt-6 rounded-3xl bg-white border-[3px] border-ink p-8 shadow-[6px_6px_0_#0A0F0D]">
          <span className="inline-block rounded-full bg-sun border-2 border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">À connecter</span>
          <p className="mt-4 text-ink/75 font-medium leading-relaxed">
            Les données sont déjà collectées (propriété <strong>546253445</strong>). Pour les afficher ici, il faut un accès API :
          </p>
          <ol className="mt-4 space-y-2 text-ink/75 font-medium list-decimal pl-5">
            <li>Activer l'<strong>API Google Analytics Data</strong> sur le projet Google Cloud.</li>
            <li>Créer un <strong>compte de service</strong> + sa clé (JSON).</li>
            <li>Ajouter l'email du compte de service en <strong>Lecteur</strong> sur la propriété GA.</li>
            <li>Coller sur Railway : <code className="bg-cream-2 px-1.5 py-0.5 rounded text-sm">GA_PROPERTY_ID</code> et <code className="bg-cream-2 px-1.5 py-0.5 rounded text-sm">GA_SA_JSON</code>.</li>
          </ol>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Analytics</h1>
        <div className="mt-6 rounded-2xl bg-white border-[3px] border-ink p-6 shadow-[4px_4px_0_#0A0F0D]">
          <p className="font-display font-bold text-ink">Connexion GA en erreur</p>
          <p className="mt-2 text-ink/65 font-medium text-sm break-words">{data.error}</p>
          <p className="mt-2 text-ink/50 font-medium text-sm">Vérifie que le compte de service a bien accès à la propriété et que la clé est correcte.</p>
        </div>
      </div>
    );
  }

  const days = (data.byDay || []).map((d) => ({ label: d.date.slice(6), v: d.v }));
  const maxP = Math.max(1, ...(data.pages || []).map((p) => p.v));
  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight">Analytics</h1>
      <p className="mt-1 font-medium text-ink/50">Google Analytics · 28 derniers jours.</p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard label="Utilisateurs" value={Number(data.users).toLocaleString("fr-FR")} />
        <StatCard label="Sessions" value={Number(data.sessions).toLocaleString("fr-FR")} accent="#E08A2B" />
        <StatCard label="Pages vues" value={Number(data.pageviews).toLocaleString("fr-FR")} accent="#0A0F0D" />
      </div>

      <div className="mt-4">
        <MiniBars data={days} label="Utilisateurs par jour (14 derniers jours)" />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[4px_4px_0_#0A0F0D]">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50 mb-3">Pages les plus vues</p>
          <ul className="space-y-2.5">
            {(data.pages || []).map((p, i) => (
              <li key={i}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-ink truncate">{p.label}</span>
                  <span className="font-display font-bold text-ink shrink-0">{p.v}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-cream-2 overflow-hidden">
                  <div className="h-full bg-mint rounded-full" style={{ width: `${(p.v / maxP) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[4px_4px_0_#0A0F0D]">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50 mb-3">Pays</p>
          <ul className="space-y-2">
            {(data.countries || []).map((c, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{c.label}</span>
                <span className="font-display font-bold text-ink">{c.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
