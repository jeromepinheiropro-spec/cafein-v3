import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Page de modération des commentaires (non listée, noindex).
  Accès : /moderation — nécessite la clé admin (variable ADMIN_KEY sur Railway).
*/
export default function Moderation() {
  const [key, setKey] = useState(() => sessionStorage.getItem("cafein-admin-key") || "");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.title = "Modération des commentaires · Cafein";
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

  return (
    <section className="min-h-[70vh] bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-mint-dark">( Espace équipe )</p>
        <h1 className="mt-3 font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight">
          Modération des <span className="squiggle">commentaires</span>
        </h1>

        {!authed ? (
          <form onSubmit={login} className="mt-10 rounded-3xl bg-white border-[3px] border-ink p-6 shadow-[6px_6px_0_#0A0F0D]">
            <label className="font-display font-bold text-ink text-sm" htmlFor="adminkey">
              Clé d'accès
            </label>
            <div className="mt-3 flex gap-3">
              <input
                id="adminkey"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="••••••••"
                className="flex-1 rounded-full border-2 border-ink px-4 py-2.5 font-medium text-ink focus:outline-none focus:border-mint-dark"
              />
              <button
                type="submit"
                className="rounded-full bg-mint border-2 border-ink px-6 py-2.5 font-display font-bold text-ink shadow-[3px_3px_0_#0A0F0D] hover:shadow-[5px_5px_0_#0A0F0D] transition-shadow"
              >
                Entrer
              </button>
            </div>
            {msg && <p className="mt-3 text-sm font-medium text-caramel">{msg}</p>}
          </form>
        ) : (
          <div className="mt-10">
            {/* Messages du formulaire de contact */}
            <div className="mb-14">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight">
                Messages reçus <span className="text-mint-dark">({contacts.length})</span>
              </h2>
              <p className="mt-1 font-medium text-ink/50 text-sm">
                Formulaire de contact · aussi envoyés par e-mail à hello@cafein.lu
              </p>
              <ul className="mt-6 space-y-4">
                <AnimatePresence initial={false}>
                  {contacts
                    .slice()
                    .reverse()
                    .map((c) => (
                      <motion.li
                        key={c.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        className="rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[4px_4px_0_#F4A259]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-display font-bold text-ink">
                              {c.nom}
                              <span className="ml-3 font-mono text-[10px] tracking-widest uppercase text-ink/40">
                                {new Date(c.date).toLocaleString("fr-FR")} · {c.lang?.toUpperCase()}
                              </span>
                            </p>
                            <a href={`mailto:${c.email}`} className="text-sm font-medium text-mint-dark hover:underline break-all">
                              {c.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={`mailto:${c.email}?subject=${encodeURIComponent("Re: votre message · Cafein")}`}
                              className="rounded-full bg-mint text-ink font-display font-bold text-xs px-4 py-2 border-2 border-ink"
                            >
                              Répondre
                            </a>
                            <motion.button
                              whileTap={{ scale: 0.92 }}
                              onClick={() => removeContact(c.id)}
                              className="rounded-full bg-espresso text-cream font-display font-bold text-xs px-3 py-2 border-2 border-ink"
                            >
                              ✕
                            </motion.button>
                          </div>
                        </div>
                        <p className="mt-3 text-ink/75 font-medium whitespace-pre-wrap break-words">{c.message}</p>
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
              {contacts.length === 0 && (
                <p className="mt-4 text-ink/50 font-medium">Aucun message pour l'instant. ☕</p>
              )}
            </div>

            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mb-1">
              Commentaires <span className="text-mint-dark">({items.length})</span>
            </h2>
            <p className="font-medium text-ink/50 text-sm mb-4">
              Sous la publication · suppression définitive au clic
            </p>
            <ul className="mt-6 space-y-4">
              <AnimatePresence initial={false}>
                {items
                  .slice()
                  .reverse()
                  .map((c) => (
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
                      <motion.button
                        whileHover={{ scale: 1.06, rotate: -2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => remove(c.id)}
                        className="shrink-0 rounded-full bg-espresso text-cream font-display font-bold text-xs px-4 py-2 border-2 border-ink"
                      >
                        Supprimer
                      </motion.button>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
            {items.length === 0 && (
              <p className="mt-8 text-ink/50 font-medium">Aucun commentaire pour le moment. Tout est propre ! ☕</p>
            )}
            {msg && <p className="mt-4 text-sm font-medium text-caramel">{msg}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
