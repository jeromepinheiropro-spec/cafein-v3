import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isSoundOn, toggleSound, playHiss } from "../lib/sound.js";
import { useT } from "../lib/lang.jsx";

/*
  Petit bouton son (coupé par défaut). Quand il est activé, survoler un CTA
  marqué `data-hiss` déclenche un sifflement d'espresso. Discret : posé en bas
  à droite, au-dessus de la mascotte.
*/
export default function SoundToggle() {
  const t = useT();
  const [on, setOn] = useState(isSoundOn());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setReady(true), 3000);
    const sync = (e) => setOn(!!e.detail);
    window.addEventListener("cafein-sound-change", sync);

    /* survol des CTA principaux → sifflement (délégation, un seul listener) */
    const onOver = (e) => {
      const el = e.target.closest?.("[data-hiss]");
      if (el) playHiss();
    };
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      clearTimeout(t0);
      window.removeEventListener("cafein-sound-change", sync);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  if (!ready) return null;

  return (
    <motion.button
      type="button"
      onClick={() => setOn(toggleSound())}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      aria-pressed={on}
      data-cursor={on ? t("Son activé", "Sound on") : t("Activer le son", "Turn sound on")}
      aria-label={on ? t("Couper le son", "Mute sound") : t("Activer le son", "Turn sound on")}
      className={`fixed bottom-[6.5rem] right-6 z-[9000] grid place-items-center w-10 h-10 rounded-full border-[2.5px] border-ink transition-colors shadow-[3px_3px_0_#0A0F0D] ${
        on ? "bg-mint text-ink" : "bg-cream text-ink/70"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {on ? (
          <motion.svg
            key="on"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
          </motion.svg>
        ) : (
          <motion.svg
            key="off"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
            <path d="M22 9l-6 6M16 9l6 6" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
