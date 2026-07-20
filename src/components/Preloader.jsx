import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LeafMark } from "../lib/ui.jsx";
import { useT } from "../lib/lang.jsx";

/*
  Préloader : une tasse qui se remplit de café pendant que le compteur monte.
  Sortie : rideau qui se lève en deux temps.
*/
export default function Preloader({ onDone }) {
  const t = useT();
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    let raf;
    const start = performance.now();
    const DURATION = 1800;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      // easing gourmand : accélère puis ralentit
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 450);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduce]);

  const fill = count / 100;

  return (
    <motion.div
      className="fixed inset-0 z-[9000] bg-espresso flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      aria-label={t("Chargement", "Loading")}
    >
      {/* deuxième rideau pour l'effet de profondeur à la sortie */}
      <motion.div
        className="absolute inset-0 bg-mint"
        initial={{ y: "100%" }}
        exit={{ y: "0%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.06 } }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Tasse qui se remplit */}
        <div className="relative">
          <svg viewBox="0 0 120 110" className="w-28 h-28 md:w-36 md:h-36" fill="none">
            <defs>
              <clipPath id="cupClip">
                <path d="M25 38h56v26c0 15.5-12.5 28-28 28S25 79.5 25 64V38z" />
              </clipPath>
            </defs>
            {/* café qui monte */}
            <g clipPath="url(#cupClip)">
              <motion.rect
                x="20"
                width="66"
                height="60"
                fill="#1FCE8A"
                animate={{ y: 92 - fill * 54 }}
                transition={{ type: "tween", duration: 0.15 }}
              />
              {/* vague */}
              <motion.path
                d="M14 0 Q 22 -6 30 0 T 46 0 T 62 0 T 78 0 T 94 0 V 80 H 14 Z"
                fill="#1FCE8A"
                animate={{ y: 92 - fill * 54, x: [-16, 0, -16] }}
                transition={{
                  y: { type: "tween", duration: 0.15 },
                  x: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
                }}
              />
            </g>
            {/* contour tasse */}
            <path
              d="M25 38h56v26c0 15.5-12.5 28-28 28S25 79.5 25 64V38z"
              stroke="#F5EFE2"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="M81 44h8a10 10 0 0 1 0 20h-8" stroke="#F5EFE2" strokeWidth="4" strokeLinecap="round" />
            {/* vapeur */}
            <motion.path
              d="M43 26c0-5 5-5 5-10"
              stroke="#1FCE8A"
              strokeWidth="3.5"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0], y: [4, -3] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
            />
            <motion.path
              d="M57 26c0-5 5-5 5-10"
              stroke="#1FCE8A"
              strokeWidth="3.5"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0], y: [4, -3] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut", delay: 0.35 }}
            />
          </svg>
          <motion.div
            className="absolute -right-3 -top-3"
            animate={{ rotate: [0, 12, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4 }}
          >
            <LeafMark className="h-6 w-auto" />
          </motion.div>
        </div>

        {/* Compteur géant */}
        <div className="flex items-end gap-4">
          <span className="font-display font-extrabold text-7xl md:text-8xl text-cream tabular-nums leading-none">
            {count}
          </span>
          <span className="font-display font-extrabold text-3xl md:text-4xl text-mint mb-1">%</span>
        </div>

        <p className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-cream/50 uppercase">
          {t("Le café passe… le site arrive", "Brewing… your site is on its way")}
        </p>
      </div>
    </motion.div>
  );
}
