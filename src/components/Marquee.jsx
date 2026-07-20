import React from "react";
import { motion } from "framer-motion";
import { Spark } from "../lib/ui.jsx";
import { useEgg } from "./EasterEggs.jsx";

const DEFAULT_WORDS = ["Sites web", "SEO", "GEO", "Communication", "Luxembourg"];

/*
  Bande défilante infinie, légèrement inclinée.
  La vitesse augmente au survol ? Non, elle s'inverse ! (petit plaisir)
*/
export default function Marquee({ tilt = -2, dark = false, words = DEFAULT_WORDS }) {
  const { overdrive, decaf } = useEgg();
  const duration = overdrive ? 4 : decaf ? 55 : 18;
  const row = (
    <div className="flex items-center shrink-0">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`font-display font-extrabold uppercase text-2xl md:text-4xl px-6 ${dark ? "text-cream" : "text-espresso"}`}>
            {w}
          </span>
          <Spark className={`w-5 h-5 md:w-6 md:h-6 ${dark ? "text-mint" : "text-espresso"}`} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative z-20 py-4 md:py-5 overflow-hidden border-y-4 ${
        dark ? "bg-espresso border-mint" : "bg-mint border-espresso"
      }`}
      style={{ transform: `rotate(${tilt}deg) scale(1.02)`, marginTop: "-1.25rem", marginBottom: "-1.25rem" }}
      aria-hidden="true"
    >
      <motion.div
        key={duration}
        className="flex w-max"
        animate={{ x: ["0%", "-25%"] }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
