import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Back-office Cafein (non listé, noindex). Accès : /moderation avec la clé
  admin (ADMIN_KEY sur Railway). Regroupe :
   - un aperçu chiffré (stats),
   - les leads unifiés (messages de contact + demandes d'audit avec scores),
     recherche, filtres, marquer « traité », export CSV,
   - la modération des commentaires.
*/

const scoreColor = (s) => (s == null ? "#8A857C" : s >= 90 ? "#1FCE8A" : s >= 50 ? "#E08A2B" : "#D64545");

function StatCard({ label, value, accent = "#1FCE8A" }) {
  return (
    <div className="rounded-2xl bg-white border-[3px] border-ink p-4 shadow-[4px_4px_0_#0A0F0D]">
      <p className="font-display font-extrabold text-3xl text-ink leading-none" style={{ color: accent }}>{value}</p>
      <p className="mt-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50">{label}</p>
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
        <span
          key={it.l}
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-2.5 py-1 font-mono text-[11px] font-bold"
        >
          <span className="text-ink/50 uppercase tracking-wider">{it.l}</span>
          <span style={{ color: scoreColor(it.s) }}>{it.s == null ? "—" : it.s}</span>
        </span>
      ))}
    </div>
  );
}

export default function Moderation() {
  const [key, setKey] = useState(() => sessionStorage.getItem("cafein-admin-key") || "");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]); // commentaires
  const [contacts, setContacts] = useState([]); // leads
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState("all"); // all | contact | audit | todo
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Espace équipe · Cafein";
    let m = document.head.querySelector('meta[name="robots"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "robots");
      document.head.appendChild(m);
    }
    m.setAttribute("content", "noindex, nofollow");
    return () => m.setAttribute("content", "index, follow");
  }, []);

  async function refresh() {
    const r = await fetch("/api/comments");
    setItems(r.ok ? await r.json() : []);
    const rc = await fetch("/api/contact", { headers: { "x-admin-key": key } });
    setContacts(rc.ok ? await rc.json() : []);
  }

  async function login(e) {
    e?.preventDefault();
    setMsg("");
    try {
      const r = await fetch("/api/admin/check", { headers: { "x-admin-key": key } });
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
    setContacts([]);
    setItems([]);
  }

  async function remove(id) {
    const r = await fetch(`/api/comments/${id}`, { method: "DELETE", headers: { "x-admin-key": key } });
    if (r.ok) setItems((l) => l.filter((c) => c.id !== id));
    else setMsg("Suppression impossible.");
  }

  async function removeContact(id) {
    const r = await fetch(`/api/contact/${id}`, { method: "DELETE", headers: { "x-admin-key": key } });
    if (r.ok) setContacts((l) => l.filter((c) => c.id !== id));
    else setMsg("Suppression impossible.");
  }

  async function toggleHandled(c) {
    const next = !c.handled;
    setContacts((l) => l.map((x) => (x.id === c.id ? { ...x, handled: next } : x)));
    const r = await fetch(`/api/contact/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ handled: next }),
    });
    if (!r.ok) {
      setContacts((l) => l.map((x) => (x.id === c.id ? { ...x, handled: !next } : x)));
      setMsg("Mise à jour impossible.");
    }
  }

  /* ── Stats ─────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const audits = contacts.filter((c) => c.source === "audit");
    const now = Date.now();
    const week = contacts.filter((c) => now - new Date(c.date).getTime() < 7 * 864e5).length;
    const perfVals = audits.map((c) => c.scores?.performance).filter((n) => Number.isFinite(n));
    const avgPerf = perfVals.length ? Math.round(perfVals.reduce((a, b) => a + b, 0) / perfVals.length) : null;
    const todo = contacts.filter((c) => !c.handled).length;
    return {
      leads: contacts.length,
      audits: audits.length,
      messages: contacts.length - audits.length,
      comments: items.length,
      week,
      avgPerf,
      todo,
    };
  }, [contacts, items]);

  /* ── Leads filtrés ─────────────────────────────────────── */
  const shownLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts
      .slice()
      .reverse()
      .filter((c) => {
        if (filter === "audit" && c.source !== "audit") return false;
        if (filter === "contact" && c.source === "audit") return false;
        if (filter === "todo" && c.handled) return false;
        if (q) {
          const hay = `${c.nom} ${c.email} ${c.message}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
  }, [contacts, filter, query]);

  function exportCsv() {
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
    const rows = [
      ["date", "type", "nom", "email", "traité", "performance", "seo", "accessibilité", "bonnes_pratiques", "message"],
      ...contacts.map((c) => [
        c.date,
        c.source === "audit" ? "audit" : "contact",
        c.nom,
        c.email,
        c.handled ? "oui" : "non",
        c.scores?.performance ?? "",
        c.scores?.seo ?? "",
        c.scores?.accessibility ?? "",
        c.scores?.bestPractices ?? "",
        c.message,
      ]),
    ];
    const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cafein-leads.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const FILTERS = [
    { id: "all", label: `Tous (${stats.leads})` },
    { id: "audit", label: `Audits (${stats.audits})` },
    { id: "contact", label: `Messages (${stats.messages})` },
    { id: "todo", label: `À traiter (${stats.todo})` },
  ];

  return (
    <section className="min-h-[70vh] bg-cream py-28 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-mint-dark">( Espace équipe )</p>
            <h1 className="mt-3 font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight">
              Le <span className="squiggle">back-office</span>
            </h1>
          </div>
          {authed && (
            <button
              onClick={logout}
              className="shrink-0 rounded-full bg-white border-2 border-ink px-4 py-2 font-display font-bold text-xs text-ink shadow-[3px_3px_0_#0A0F0D] hover:shadow-[1px_1px_0_#0A0F0D] transition-shadow"
            >
              Se déconnecter
            </button>
          )}
        </div>

        {!authed ? (
          <form onSubmit={login} className="mt-10 rounded-3xl bg-white border-[3px] border-ink p-6 shadow-[6px_6px_0_#0A0F0D] max-w-md">
            <label className="font-display font-bold text-ink text-sm" htmlFor="adminkey">Clé d'accès</label>
            <div className="mt-3 flex gap-3">
              <input
                id="adminkey"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="••••••••"
                className="flex-1 rounded-full border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark"
              />
              <button type="submit" className="rounded-full bg-mint border-2 border-ink px-6 py-2.5 font-display font-bold text-ink shadow-[3px_3px_0_#0A0F0D] hover:shadow-[5px_5px_0_#0A0F0D] transition-shadow">
                Entrer
              </button>
            </div>
            {msg && <p className="mt-3 text-sm font-medium text-caramel">{msg}</p>}
          </form>
        ) : (
          <div className="mt-10">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Leads au total" value={stats.leads} />
              <StatCard label="Demandes d'audit" value={stats.audits} accent="#E08A2B" />
              <StatCard label="À traiter" value={stats.todo} accent="#D64545" />
              <StatCard label="Cette semaine" value={stats.week} accent="#0A0F0D" />
              <StatCard label="Commentaires" value={stats.comments} accent="#0A0F0D" />
              <StatCard label="Perf. moyenne auditée" value={stats.avgPerf == null ? "—" : `${stats.avgPerf}`} accent={scoreColor(stats.avgPerf)} />
            </div>

            {/* Leads */}
            <div className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight">Leads</h2>
                <button
                  onClick={exportCsv}
                  className="rounded-full bg-ink text-cream font-display font-bold text-xs px-4 py-2 border-2 border-ink hover:-translate-y-0.5 transition-transform"
                >
                  ↓ Export CSV
                </button>
              </div>

              {/* toolbar : filtres + recherche */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`rounded-full px-3.5 py-1.5 font-semibold text-xs border-2 border-ink transition-all ${
                      filter === f.id ? "bg-ink text-cream" : "bg-white text-ink hover:-translate-y-0.5"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher…"
                  className="ml-auto rounded-full border-2 border-ink px-4 py-1.5 text-sm font-medium text-ink placeholder-ink/35 focus:outline-none focus:border-mint-dark w-full sm:w-52"
                />
              </div>

              <ul className="mt-6 space-y-4">
                <AnimatePresence initial={false}>
                  {shownLeads.map((c) => {
                    const isAudit = c.source === "audit";
                    return (
                      <motion.li
                        key={c.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        className={`rounded-2xl bg-white border-[3px] border-ink p-5 transition-opacity ${
                          c.handled ? "opacity-55 shadow-none" : `shadow-[4px_4px_0_${isAudit ? "#E08A2B" : "#1FCE8A"}]`
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase ${isAudit ? "bg-caramel" : "bg-mint"} text-ink`}>
                                {isAudit ? "Audit" : "Contact"}
                              </span>
                              {c.handled && (
                                <span className="rounded-full border-2 border-ink bg-cream-2 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase text-ink/60">
                                  Traité
                                </span>
                              )}
                              <span className="font-display font-bold text-ink">{c.nom}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                              <a href={`mailto:${c.email}`} className="text-sm font-medium text-mint-dark hover:underline break-all">{c.email}</a>
                              <span className="font-mono text-[10px] tracking-widest uppercase text-ink/40">
                                {new Date(c.date).toLocaleString("fr-FR")} · {c.lang?.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => toggleHandled(c)}
                              title={c.handled ? "Marquer non traité" : "Marquer traité"}
                              className={`grid place-items-center w-9 h-9 rounded-full border-2 border-ink transition-colors ${c.handled ? "bg-mint text-ink" : "bg-white text-ink/40 hover:text-ink"}`}
                            >
                              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l5 5L20 7" /></svg>
                            </button>
                            <a
                              href={`mailto:${c.email}?subject=${encodeURIComponent("Re: votre demande · Cafein")}`}
                              className="rounded-full bg-mint text-ink font-display font-bold text-xs px-4 py-2 border-2 border-ink"
                            >
                              Répondre
                            </a>
                            <button
                              onClick={() => removeContact(c.id)}
                              className="rounded-full bg-espresso text-cream font-display font-bold text-xs px-3 py-2 border-2 border-ink"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        {isAudit && <ScoreChips scores={c.scores} />}
                        <p className="mt-3 text-ink/75 font-medium whitespace-pre-wrap break-words text-sm">{c.message}</p>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
              {shownLeads.length === 0 && (
                <p className="mt-4 text-ink/50 font-medium">Aucun lead pour ce filtre. ☕</p>
              )}
            </div>

            {/* Commentaires */}
            <div className="mt-16">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mb-1">
                Commentaires <span className="text-mint-dark">({items.length})</span>
              </h2>
              <p className="font-medium text-ink/50 text-sm mb-4">Sous la publication · suppression définitive au clic</p>
              <ul className="mt-4 space-y-4">
                <AnimatePresence initial={false}>
                  {items.slice().reverse().map((c) => (
                    <motion.li
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 60 }}
                      className="flex items-start gap-4 rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[4px_4px_0_#0A0F0D]"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-ink">
                          {c.name}
                          <span className="ml-3 font-mono text-[10px] tracking-widest uppercase text-ink/40">
                            {new Date(c.date).toLocaleString("fr-FR")}
                          </span>
                        </p>
                        <p className="mt-1.5 text-ink/75 font-medium break-words">{c.text}</p>
                      </div>
                      <button
                        onClick={() => remove(c.id)}
                        className="shrink-0 rounded-full bg-espresso text-cream font-display font-bold text-xs px-4 py-2 border-2 border-ink"
                      >
                        Supprimer
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              {items.length === 0 && <p className="mt-4 text-ink/50 font-medium">Aucun commentaire. Tout est propre ! ☕</p>}
            </div>

            {msg && <p className="mt-6 text-sm font-medium text-caramel">{msg}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
