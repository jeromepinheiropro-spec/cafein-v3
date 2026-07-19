import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionLabel, ArrowUpRight, Spark } from "../lib/ui.jsx";
import { CountUp } from "./Stats.jsx";
import { HuntBean } from "./EasterEggs.jsx";

/* ── Fausse fenêtre navigateur pour les aperçus projets ───────── */
function BrowserMock({ variant = "a" }) {
  const isA = variant === "a";
  return (
    <div className="rounded-2xl overflow-hidden border-[3px] border-ink bg-white">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-cream-2 border-b-[3px] border-ink">
        <span className="w-2.5 h-2.5 rounded-full bg-caramel" />
        <span className="w-2.5 h-2.5 rounded-full bg-sun" />
        <span className="w-2.5 h-2.5 rounded-full bg-mint" />
        <span className="ml-3 flex-1 h-4 rounded-full bg-ink/10" />
      </div>
      {isA ? (
        <div className="p-5 space-y-3 bg-white">
          <div className="h-7 w-2/3 rounded-lg bg-espresso" />
          <div className="h-3 w-full rounded bg-ink/15" />
          <div className="h-3 w-5/6 rounded bg-ink/15" />
          <div className="flex gap-2 pt-1">
            <div className="h-8 w-24 rounded-full bg-mint border-2 border-ink" />
            <div className="h-8 w-24 rounded-full border-2 border-ink" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-14 rounded-lg bg-mint/30" />
            <div className="h-14 rounded-lg bg-caramel/30" />
            <div className="h-14 rounded-lg bg-sun/40" />
          </div>
        </div>
      ) : (
        <div className="p-5 bg-espresso space-y-3">
          <div className="flex gap-2">
            <div className="h-16 w-16 rounded-full bg-mint shrink-0" />
            <div className="flex-1 space-y-2 pt-2">
              <div className="h-4 w-3/4 rounded bg-cream/80" />
              <div className="h-3 w-1/2 rounded bg-cream/30" />
            </div>
          </div>
          <div className="h-3 w-full rounded bg-cream/20" />
          <div className="h-3 w-4/5 rounded bg-cream/20" />
          <div className="h-9 w-32 rounded-full bg-caramel border-2 border-cream/20" />
        </div>
      )}
    </div>
  );
}

/* ── Carte projet avec tilt 3D ────────────────────────────────── */
function ProjectCard({ letter, title, sub, variant, rot }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      initial={{ opacity: 0, y: 60, rotate: rot * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      data-cursor="Bientôt"
      className="group relative rounded-3xl bg-white border-[3px] border-ink p-6 shadow-[8px_8px_0_#0A0F0D] hover:shadow-[12px_12px_0_#1FCE8A] transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="grid place-items-center w-11 h-11 rounded-full bg-espresso text-mint font-display font-bold text-lg">
          {letter}
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/50">{sub}</span>
      </div>
      <BrowserMock variant={variant} />
      <div className="mt-5 flex items-center justify-between">
        <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink">{title}</h3>
        <span className="grid place-items-center w-10 h-10 rounded-full border-2 border-ink group-hover:bg-mint group-hover:rotate-45 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </motion.div>
  );
}

/* ── Slider avant / après (draggable) ─────────────────────────── */
function BeforeAfter() {
  const containerRef = useRef(null);
  const [pct, setPct] = useState(50);

  function updateFromClientX(clientX) {
    const r = containerRef.current.getBoundingClientRect();
    const p = Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100));
    setPct(p);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mt-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <h3 className="font-display font-extrabold text-2xl md:text-4xl text-ink">
          Un site repensé de A à Z
        </h3>
        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-ink/50">
          ← Glissez le curseur →
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-72 md:h-96 rounded-3xl border-[3px] border-ink overflow-hidden select-none touch-pan-y"
        onPointerMove={(e) => e.buttons === 1 && updateFromClientX(e.clientX)}
        onPointerDown={(e) => updateFromClientX(e.clientX)}
      >
        {/* APRÈS (fond) — contenu aligné à droite pour rester visible */}
        <div className="absolute inset-0 bg-espresso p-6 md:p-10 flex flex-col justify-between items-end text-right">
          <div className="flex flex-col items-end">
            <span className="inline-block rounded-full bg-mint text-ink font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5">
              Après Cafein
            </span>
            <div className="mt-6 space-y-3 w-56 md:w-80 flex flex-col items-end">
              <div className="h-8 md:h-10 w-4/5 rounded-lg bg-cream" />
              <div className="h-3 w-full rounded bg-cream/30" />
              <div className="h-3 w-2/3 rounded bg-cream/30" />
              <div className="h-10 w-40 rounded-full bg-mint border-2 border-cream/20 mt-4" />
            </div>
          </div>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-mint">
            Refonte optimisée — UX mobile + structure SEO
          </p>
        </div>

        {/* AVANT (par-dessus, clippé) */}
        <div
          className="absolute inset-0 bg-cream-2 p-6 md:p-10"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <span className="inline-block rounded-full bg-ink/80 text-cream font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5">
            Avant : site existant
          </span>
          <div className="mt-6 space-y-3 max-w-md opacity-60">
            <div className="h-6 w-1/2 rounded bg-ink/40" />
            <div className="h-2.5 w-full rounded bg-ink/20" />
            <div className="h-2.5 w-full rounded bg-ink/20" />
            <div className="h-2.5 w-5/6 rounded bg-ink/20" />
            <div className="h-8 w-28 rounded bg-ink/30 mt-4" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 pt-3">
              lent · daté · invisible sur Google
            </p>
          </div>
        </div>

        {/* Poignée */}
        <div className="absolute inset-y-0" style={{ left: `${pct}%` }}>
          <div className="absolute inset-y-0 -translate-x-1/2 w-1.5 bg-mint" />
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(e, info) => updateFromClientX(info.point.x)}
            whileHover={{ scale: 1.15 }}
            whileDrag={{ scale: 1.2 }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-mint border-[3px] border-ink cursor-grab active:cursor-grabbing shadow-[4px_4px_0_#0A0F0D]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0A0F0D" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 7 4 12l4 5M16 7l4 5-4 5" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Résultats concrets ───────────────────────────────────────── */
const RESULTS = [
  { big: <CountUp to={240} prefix="+" suffix="%" />, title: "Trafic organique", sub: "En 6 mois sur un projet SEO local Luxembourg" },
  { big: "< 1.5s", title: "Temps de chargement", sub: "Score PageSpeed > 90 sur mobile après optimisation" },
  { big: "Top 3", title: "Sur Google", sub: "Mots-clés locaux ciblés, résultats stables" },
];

export default function Showcase() {
  return (
    <section id="realisations" className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel>( Réalisations )</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-6 mt-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-ink leading-[0.95] max-w-2xl"
          >
            Un aperçu de ce qu'on <span className="squiggle">prépare</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm text-ink/70 font-medium"
          >
            Nos premiers projets arrivent bientôt. En attendant, voici le type de rendu qu'on vise :
            propre, rapide et pensé pour convertir.
          </motion.p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-10">
          <ProjectCard letter="A" title="Projet 1" sub="Aperçu du site, à venir" variant="a" rot={-1} />
          <ProjectCard letter="B" title="Projet 2" sub="Aperçu du site, à venir" variant="b" rot={1} />
        </div>

        <BeforeAfter />

        {/* Résultats */}
        <div className="mt-24">
          <div className="flex items-center gap-3">
            <Spark className="w-5 h-5 text-mint-dark" />
            <SectionLabel>( Des résultats concrets )</SectionLabel>
            <HuntBean id="resultats" className="w-5 h-5" />
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 16 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-espresso p-8 border-[3px] border-ink shadow-[6px_6px_0_#F4A259]"
              >
                <p className="font-display font-extrabold text-4xl md:text-5xl text-mint">{r.big}</p>
                <p className="mt-2 font-display font-bold text-lg text-cream">{r.title}</p>
                <p className="mt-2 text-sm text-cream/60 font-medium leading-relaxed">{r.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
