import React, { useEffect, useMemo, useState } from "react";
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
  { id: "comments", label: "Commentaires", icon: "M4 4h16v11H8l-4 4V4z" },
  { id: "analytics", label: "Analytics", icon: "M4 20V10m6 10V4m6 16v-7m4 7V8" },
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
    const [c, cm, p, a] = await Promise.all([
      api("/api/contact", k).then((r) => (r.ok ? r.json() : [])),
      fetch("/api/comments").then((r) => (r.ok ? r.json() : [])),
      api("/api/admin/posts", k).then((r) => (r.ok ? r.json() : [])),
      api("/api/admin/audits", k).then((r) => (r.ok ? r.json() : [])),
    ]);
    setContacts(c); setComments(cm); setPosts(p); setAudits(a);
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
    setContacts([]); setComments([]); setPosts([]); setAudits([]);
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
            {view === "comments" && <Comments comments={comments} setComments={setComments} k={key} setMsg={setMsg} />}
            {view === "analytics" && <Analytics k={key} />}
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
