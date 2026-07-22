import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT, useLang } from "../lib/lang.jsx";
import { AvatarBarista } from "../lib/avatars.jsx";

/*
  Barista IA, un petit chat façon barista qui répond aux questions simples
  sur Cafein (SEO, GEO, sites…) dans un ton décalé, et oriente vers la prise
  de contact. Jamais de prix (garde-fou côté serveur). Le widget est lui-même
  une démo de l'expertise IA/GEO de l'agence.
  Lanceur en bas à gauche pour ne pas gêner la mascotte (bas à droite).
*/

export default function Barista() {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const greeting = t(
    "Salut ! Moi c'est Fève, le barista de Cafein ☕ Une question sur les sites, le SEO ou le GEO ? Je réponds pendant que le café passe.",
    "Hi! I'm Bean, the Cafein barista ☕ A question about websites, SEO or GEO? I'll answer while the coffee brews.",
  );
  const [messages, setMessages] = useState([{ role: "assistant", content: greeting }]);

  const suggestions = [
    t("C'est quoi le GEO ?", "What is GEO?"),
    t("Vous faites quoi ?", "What do you do?"),
    t("Comment vous joindre ?", "How do I reach you?"),
  ];

  useEffect(() => {
    const t0 = setTimeout(() => setReady(true), 3400);
    return () => clearTimeout(t0);
  }, []);

  /* auto-scroll en bas à chaque nouveau message */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = useCallback(
    async (raw) => {
      const text = (raw ?? input).trim();
      if (!text || pending) return;
      setInput("");
      const next = [...messages, { role: "user", content: text }];
      setMessages(next);
      setPending(true);
      try {
        const r = await fetch("/api/barista", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lang,
            messages: next.map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (r.status === 503) {
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: t(
                "Le barista fait une pause pour l'instant ☕ En attendant, écris-nous à hello@cafein.lu ou via le formulaire de contact, on répond vite !",
                "The barista is on a break right now ☕ In the meantime, drop us a line at hello@cafein.lu or via the contact form, we reply fast!",
              ),
            },
          ]);
          return;
        }
        if (!r.ok) {
          const msg =
            r.status === 429
              ? t("Doucement sur les questions ☕ Réessaie dans un moment.", "Easy on the questions ☕ Try again in a bit.")
              : t("Oups, un grain coincé dans le moulin. Réessaie ?", "Oops, a bean jammed the grinder. Try again?");
          setMessages((m) => [...m, { role: "assistant", content: msg }]);
          return;
        }
        const data = await r.json();
        setMessages((m) => [...m, { role: "assistant", content: data.reply || "…" }]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: t("Connexion perdue. Écris-nous à hello@cafein.lu ☕", "Lost connection. Reach us at hello@cafein.lu ☕"),
          },
        ]);
      } finally {
        setPending(false);
      }
    },
    [input, messages, pending, lang, t],
  );

  const showSuggestions = messages.length <= 1 && !pending;

  return (
    /* Conteneur fixe dédié au barista, promu en calque de compositing
       (translateZ) : garantit qu'il reste DEVANT le marquee (transformé) même
       sur les navigateurs in-app iOS, où un fixe sans calque passe dessous. */
    <div
      className="fixed bottom-5 left-5 z-[9150]"
      style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)", willChange: "transform", backfaceVisibility: "hidden" }}
    >
      {/* lanceur */}
      <AnimatePresence>
        {ready && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            data-hiss
            data-cursor={t("Demande au barista", "Ask the barista")}
            aria-label={t("Ouvrir le barista IA", "Open the AI barista")}
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            whileHover={{ scale: 1.06, rotate: -3 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="absolute bottom-0 left-0 w-max flex items-center rounded-full bg-espresso text-cream border-[3px] border-ink pl-[4.9rem] pr-5 py-3 shadow-[5px_5px_0_#0A0F0D] hover:shadow-[2px_2px_0_#0A0F0D] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            {/* mascotte qui dépasse en haut à gauche */}
            <motion.span
              animate={{ y: [0, -3.5, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="absolute left-0 -top-7 w-[4.7rem] h-[4.7rem] pointer-events-none drop-shadow-[2px_3px_0_rgba(10,15,13,0.3)]"
            >
              <AvatarBarista className="w-full h-full" />
            </motion.span>
            <span className="font-display font-bold text-sm leading-none text-left">
              {t("Un café ?", "A coffee?")}
              <span className="block font-mono text-[9px] tracking-widest uppercase text-mint/90 mt-1">
                {t("Barista IA", "AI barista")}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* panneau */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="absolute bottom-0 left-0 flex flex-col w-[min(23rem,calc(100vw-2.5rem))] h-[min(30rem,calc(100vh-7rem))] rounded-[1.4rem] overflow-hidden bg-cream border-[3px] border-ink shadow-[10px_10px_0_#0A0F0D]"
          >
            {/* en-tête */}
            <div className="flex items-center gap-3 px-4 py-3 bg-espresso text-cream shrink-0">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-cream border-2 border-ink shrink-0 overflow-hidden">
                <AvatarBarista className="w-8 h-8" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display font-extrabold text-sm leading-tight">
                  {t("Fève, le barista", "Bean, the barista")}
                </p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-mint/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint inline-block" />
                  {t("en ligne · IA", "online · AI")}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t("Fermer", "Close")}
                className="grid place-items-center w-7 h-7 rounded-full hover:bg-white/10 text-cream text-lg leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3">
              {messages.map((m, i) =>
                m.role === "assistant" ? (
                  <div key={i} className="flex items-end gap-2 max-w-[88%]">
                    <span className="grid place-items-center w-7 h-7 rounded-full bg-cream border-2 border-ink shrink-0 mb-0.5 overflow-hidden">
                      <AvatarBarista className="w-6 h-6" />
                    </span>
                    <div className="rounded-2xl rounded-bl-md bg-white border-2 border-ink px-3.5 py-2.5 text-ink text-sm leading-snug font-medium shadow-[2px_2px_0_#0A0F0D]">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-br-md bg-mint border-2 border-ink px-3.5 py-2.5 text-ink text-sm leading-snug font-semibold shadow-[2px_2px_0_#0A0F0D]">
                      {m.content}
                    </div>
                  </div>
                ),
              )}

              {pending && (
                <div className="flex items-end gap-2">
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-cream border-2 border-ink shrink-0 overflow-hidden">
                    <AvatarBarista className="w-6 h-6" />
                  </span>
                  <div className="rounded-2xl rounded-bl-md bg-white border-2 border-ink px-4 py-3 shadow-[2px_2px_0_#0A0F0D]">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-ink/50"
                          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1 pl-8">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full bg-cream-2 border-2 border-ink px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sun transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* saisie */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 px-3 py-3 border-t-2 border-ink/10 bg-cream shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                placeholder={t("Pose ta question…", "Ask your question…")}
                className="flex-1 rounded-full bg-white border-2 border-ink px-4 py-2.5 text-sm font-medium text-ink placeholder-ink/35 focus:outline-none focus:shadow-[3px_3px_0_#1FCE8A] transition-shadow"
              />
              <button
                type="submit"
                disabled={!input.trim() || pending}
                aria-label={t("Envoyer", "Send")}
                className="grid place-items-center w-10 h-10 rounded-full bg-mint border-2 border-ink text-ink shrink-0 disabled:opacity-40 enabled:hover:-translate-y-0.5 transition-transform shadow-[2px_2px_0_#0A0F0D]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
