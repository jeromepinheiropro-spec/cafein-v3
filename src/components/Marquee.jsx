import React from "react";
import { motion } from "framer-motion";
import { Spark } from "../lib/ui.jsx";
import { useEgg } from "./EasterEggs.jsx";

const WORDS = ["Sites web", "SEO", "GEO", "Communication", "Luxembourg"];

/*
  Bande défilante infinie, légèrement inclinée.
  La vitesse augmente au survol ? Non — elle s'inverse ! (petit plaisir)
*/
export default function Marquee({ tilt = -2, dark = false }) {
  const { overdrive, decaf } = useEgg();
  const duration = overdrive ? 4 : decaf ? 55 : 18;
  const row = (
    <div className="flex items-center shrink-0">
      {WORDS.map((w) => (
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
      className={`relative py-4 md:py-5 overflow-hidden border-y-4 ${
        dark ? "bg-espresso border-mint" : "bg-mint border-espresso"
      }`}
      style={{ transform: `rotate(${tilt}deg) scale(1.02)` }}
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
