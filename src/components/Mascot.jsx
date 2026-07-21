import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEgg } from "./EasterEggs.jsx";
import { useT } from "../lib/lang.jsx";
import { MASCOTS } from "../lib/avatars.jsx";

/*
  La mascotte Cafein.
  À chaque visite, l'un des trois personnages de l'équipe (Stan, Pinoo, Flo)
  est tiré au sort et vient vivre en bas à droite : il flotte, réagit aux modes
  surcaféiné / décaféiné, se présente, lâche des répliques et fait coucou.
  100% transform/opacity (aucun blur, aucun layout) → zéro impact sur le scroll.
  Refermable (mémorisé dans localStorage).
*/

const HIDE_KEY = "cafein-mascot-hidden";

export default function Mascot() {
  const { overdrive, decaf } = useEgg();
  const t = useT();
  const mood = overdrive ? "over" : decaf ? "decaf" : "idle";

  /* Un personnage de l'équipe tiré au sort, figé pour la durée de la visite. */
  const [char] = useState(() => MASCOTS[Math.floor(Math.random() * MASCOTS.length)]);
  const Avatar = char.Avatar;

  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(HIDE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [ready, setReady] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [wave, setWave] = useState(false);
  const idx = useRef(0);
  const timers = useRef([]);

  const lines = [
    t(char.line[0], char.line[1]),
    t("Psst… tape « cafein » au clavier 👀", "Psst… type “cafein” on your keyboard 👀"),
    t("Un projet ? On répond le temps d'un café ☕", "Got a project? We reply in one coffee ☕"),
    t("Descends, y'a des surprises cachées 🫘", "Scroll down, there are hidden surprises 🫘"),
    t("hello@cafein.lu — je parie que tu vas cliquer", "hello@cafein.lu — bet you'll click"),
  ];

  const say = useCallback((i) => {
    setBubble(lines[i % lines.length]);
    const t1 = setTimeout(() => setBubble(null), 5200);
    timers.current.push(t1);
  }, [lines]);

  /* Apparition après le préloader, puis répliques espacées */
  useEffect(() => {
    if (hidden) return;
    const t0 = setTimeout(() => setReady(true), 2600);
    const t1 = setTimeout(() => say(idx.current++), 4200);
    const loop = setInterval(() => {
      if (document.hidden) return;
      say(idx.current++);
    }, 19000); // ~19 s
    timers.current.push(t0, t1);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearInterval(loop);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  /* Réplique dédiée quand un mode s'active */
  useEffect(() => {
    if (hidden || !ready) return;
    if (overdrive) setBubble(t("WOUAH. Triple espresso. 🚀", "WHOA. Triple espresso. 🚀"));
    else if (decaf) setBubble(t("Mode sieste… zzz", "Nap mode… zzz"));
    if (overdrive || decaf) {
      const tt = setTimeout(() => setBubble(null), 4200);
      timers.current.push(tt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overdrive, decaf]);

  function onClick() {
    setWave(true);
    setTimeout(() => setWave(false), 900);
    say(idx.current++);
  }

  function close(e) {
    e.stopPropagation();
    setHidden(true);
    try {
      localStorage.setItem(HIDE_KEY, "1");
    } catch {
      /* privé */
    }
  }

  if (hidden) return null;

  /* Animation du corps selon l'humeur */
  const bodyAnim =
    mood === "over"
      ? { x: [0, -2, 2, -2, 0], rotate: [0, -4, 4, -3, 0], y: 0 }
      : mood === "decaf"
        ? { rotate: [0, 6, 4, 6, 0], y: [0, 2, 0] }
        : { y: [0, -7, 0], rotate: [0, 1.5, -1.5, 0] };
  const bodyTr =
    mood === "over"
      ? { repeat: Infinity, duration: 0.32, ease: "easeInOut" }
      : mood === "decaf"
        ? { repeat: Infinity, duration: 5.5, ease: "easeInOut" }
        : { repeat: Infinity, duration: 4.5, ease: "easeInOut" };

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="fixed bottom-5 right-5 z-[9200] flex flex-col items-end gap-2 select-none"
        >
          {/* bulle de dialogue */}
          <AnimatePresence>
            {bubble && (
              <motion.div
                key={bubble}
                initial={{ opacity: 0, y: 12, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative max-w-[15rem] rounded-2xl rounded-br-md bg-cream text-ink border-[2.5px] border-ink px-4 py-2.5 font-medium text-sm leading-snug shadow-[4px_4px_0_#0A0F0D]"
              >
                {bubble}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="group relative">
            {/* bouton fermer (apparaît au survol de la mascotte) */}
            <button
              onClick={close}
              aria-label={t("Cacher la mascotte", "Hide the mascot")}
              className="absolute -top-1.5 -left-1.5 z-10 grid place-items-center w-5 h-5 rounded-full bg-espresso text-cream border-2 border-ink text-[10px] leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            >
              ✕
            </button>

            {/* le grain */}
            <motion.button
              type="button"
              onClick={onClick}
              onMouseEnter={() => say(idx.current++)}
              data-cursor={t("Coucou !", "Hi!")}
              aria-label={t(`${char.name}, la mascotte Cafein`, `${char.name}, the Cafein mascot`)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="group relative block w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] bg-transparent border-0 p-0 cursor-pointer drop-shadow-[3px_3px_0_rgba(10,15,13,0.25)]"
            >
              <motion.div animate={bodyAnim} transition={bodyTr} className="w-full h-full">
                <Avatar className="w-full h-full" />
              </motion.div>

              {/* petit bras qui fait coucou au clic */}
              <AnimatePresence>
                {wave && (
                  <motion.span
                    initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: [20, -10, 20], scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -right-1 top-3 text-lg origin-bottom-left"
                  >
                    👋
                  </motion.span>
                )}
              </AnimatePresence>

              {/* "zzz" en mode décaféiné */}
              <AnimatePresence>
                {mood === "decaf" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], y: [-2, -14, -22], x: [0, 4, 8] }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                    className="absolute -top-1 right-0 font-display font-bold text-ink/70 text-sm"
                  >
                    z
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
