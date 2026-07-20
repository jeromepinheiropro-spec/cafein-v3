import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../lib/lang.jsx";

/* Compteur animé */
export function CountUp({ to, duration = 1.6, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

const STATS = {
  fr: [
    { big: <CountUp to={100} suffix="%" />, label: "Sur-mesure, jamais de template revendu" },
    { big: <CountUp to={3} />, label: "Services complémentaires : site, visibilité et communication" },
    { big: "3–4 sem.", label: "Délai moyen pour un site vitrine" },
    { big: "FR + EN", label: "Bilingue, pour le marché grand-ducal" },
  ],
  en: [
    { big: <CountUp to={100} suffix="%" />, label: "Bespoke work, never a resold template" },
    { big: <CountUp to={3} />, label: "Complementary services: website, visibility and communication" },
    { big: "3–4 wks", label: "Average lead time for a showcase site" },
    { big: "FR + EN", label: "Bilingual, for the Luxembourg market" },
  ],
};

export default function Stats() {
  const { lang } = useLang();
  const stats = STATS[lang];
  return (
    <section className="relative bg-espresso py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/15 rounded-3xl overflow-hidden border border-cream/15">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ backgroundColor: "#101614" }}
              className="bg-espresso p-8 md:p-10 group"
            >
              <p className="font-display font-extrabold text-4xl md:text-5xl text-mint group-hover:scale-110 origin-left transition-transform duration-300">
                {s.big}
              </p>
              <p className="mt-3 font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-cream/60 leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
