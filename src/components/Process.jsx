import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel, Cup } from "../lib/ui.jsx";
import { HuntBean, useEggSpeed } from "./EasterEggs.jsx";

const STEPS = [
  {
    n: "01",
    title: "On échange",
    desc: "Un premier appel pour cadrer votre projet, vos objectifs et votre budget.",
    emojiAlt: "tasse",
  },
  {
    n: "02",
    title: "On construit",
    desc: "Design, développement, contenu : on avance vite sans sacrifier la qualité.",
  },
  {
    n: "03",
    title: "On lance",
    desc: "Mise en ligne et suivi des premiers résultats, ensemble.",
  },
];

const WEEKS = [
  { w: "Sem. 1", label: "Découverte" },
  { w: "Sem. 2", label: "Design" },
  { w: "Sem. 3", label: "Développement" },
  { w: "Sem. 4", label: "Lancement" },
];

export default function Process() {
  const eggSpeed = useEggSpeed();
  const barRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: barRef, offset: ["start 0.85", "end 0.5"] });
  const width = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);
  const cupX = useTransform(scrollYProgress, [0, 1], ["0%", "96%"]);

  return (
    <section className="relative bg-cream py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel>( Comment ça marche )</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-4xl md:text-6xl text-ink mt-4 leading-[0.95] max-w-3xl"
        >
          Simple comme un café
          <span className="text-mint-dark"> allongé.</span>
        </motion.h2>

        {/* Étapes */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 16 }}
              whileHover={{ y: -8, rotate: i % 2 ? -1.5 : 1.5 }}
              className="relative rounded-3xl bg-white border-[3px] border-ink p-8 shadow-[6px_6px_0_#1FCE8A]"
            >
              <span className="absolute -top-5 left-6 grid place-items-center w-12 h-12 rounded-full bg-ink text-mint font-display font-bold border-[3px] border-mint">
                {s.n}
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ink mt-4">{s.title}</h3>
              <p className="mt-3 text-ink/75 font-medium leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline 3-4 semaines */}
        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel>( Délai de livraison )</SectionLabel>
            <p className="font-display font-extrabold text-3xl md:text-5xl text-ink">
              3–4 semaines <span className="font-mono text-sm md:text-base text-ink/50 tracking-widest uppercase align-middle">· site vitrine</span>{" "}
              <HuntBean id="methode" className="w-5 h-5" />
            </p>
          </div>

          <div ref={barRef} className="mt-8">
            {/* Barre de progression café */}
            <div className="relative h-16 rounded-full border-[3px] border-ink bg-white overflow-visible">
              <div className="absolute inset-1 rounded-full overflow-hidden">
                <motion.div style={{ width }} className="h-full rounded-full bg-gradient-to-r from-mint to-mint-dark relative">
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#0A0F0D_10px,#0A0F0D_12px)]" />
                </motion.div>
              </div>
              {/* la tasse qui avance */}
              <motion.div style={{ left: cupX }} className="absolute -top-7 -translate-x-1/2">
                <motion.div
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: (1.2) / eggSpeed }}
                >
                  <Cup className="w-10 h-10" />
                </motion.div>
              </motion.div>
            </div>

            <div className="mt-4 grid grid-cols-4 text-center">
              {WEEKS.map((k, i) => (
                <motion.div
                  key={k.w}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-mint-dark font-bold">{k.w}</p>
                  <p className="font-display font-bold text-sm md:text-lg text-ink">{k.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
