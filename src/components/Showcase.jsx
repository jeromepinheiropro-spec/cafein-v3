import React, { useRef, useState } from "react";
import { Link } from "../lib/link.jsx";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionLabel, ArrowUpRight, Spark } from "../lib/ui.jsx";
import { CountUp } from "./Stats.jsx";
import { HuntBean } from "./EasterEggs.jsx";
import { getProjets } from "../lib/projets.jsx";
import { useT, useLang } from "../lib/lang.jsx";

const MotionLink = motion.create(Link);

/* ── Carte projet avec tilt 3D ────────────────────────────────── */
function ProjectCard({ p, rot }) {
  const t = useT();
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
    <MotionLink
      to={`/realisations/${p.slug}`}
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
      data-cursor={t("Découvrir", "Discover")}
      className="group relative block rounded-3xl bg-white border-[3px] border-ink p-4 pb-5 shadow-[8px_8px_0_#0A0F0D] transition-shadow duration-300"
      whileHover={{ boxShadow: `12px 12px 0 ${p.shadow}` }}
    >
      <div className="relative rounded-2xl overflow-hidden border-[3px] border-ink">
        {/* barre navigateur cartoon */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-cream-2 border-b-[3px] border-ink">
          <span className="w-2.5 h-2.5 rounded-full bg-caramel" />
          <span className="w-2.5 h-2.5 rounded-full bg-sun" />
          <span className="w-2.5 h-2.5 rounded-full bg-mint" />
          <span className="ml-3 font-mono text-[9px] tracking-[0.2em] uppercase text-ink/40">{p.tags}</span>
        </div>
        <div className="overflow-hidden">
          <img
            src={p.img}
            alt={p.alt}
            loading="lazy"
            className="w-full h-44 md:h-52 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
        <span className="absolute top-11 right-3 grid place-items-center w-9 h-9 rounded-full bg-espresso text-mint font-mono text-xs font-bold border-2 border-mint/50">
          {p.n}
        </span>
      </div>
      <div className="mt-4 px-1 flex items-center justify-between">
        <h3 className="font-display font-extrabold text-lg md:text-xl text-ink">{p.title}</h3>
        <span className="grid place-items-center w-9 h-9 rounded-full border-2 border-ink group-hover:bg-mint group-hover:rotate-45 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </MotionLink>
  );
}

/* ── Slider avant / après (draggable) ─────────────────────────── */
function BeforeAfter() {
  const containerRef = useRef(null);
  const [pct, setPct] = useState(50);
  const t = useT();

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
          {t("Un site repensé de A à Z", "A site rebuilt from A to Z")}
        </h3>
        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-ink/50">
          {t("← Glissez le curseur →", "← Drag the slider →")}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-72 md:h-96 rounded-3xl border-[3px] border-ink overflow-hidden select-none touch-pan-y"
        onPointerMove={(e) => e.buttons === 1 && updateFromClientX(e.clientX)}
        onPointerDown={(e) => updateFromClientX(e.clientX)}
      >
        {/* APRÈS (fond), contenu aligné à droite pour rester visible */}
        <div className="absolute inset-0 bg-espresso p-6 md:p-10 flex flex-col justify-between items-end text-right">
          <div className="flex flex-col items-end">
            <span className="inline-block rounded-full bg-mint text-ink font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5">
              {t("Après Cafein", "After Cafein")}
            </span>
            <div className="mt-6 space-y-3 w-56 md:w-80 flex flex-col items-end">
              <div className="h-8 md:h-10 w-4/5 rounded-lg bg-cream" />
              <div className="h-3 w-full rounded bg-cream/30" />
              <div className="h-3 w-2/3 rounded bg-cream/30" />
              <div className="h-10 w-40 rounded-full bg-mint border-2 border-cream/20 mt-4" />
            </div>
          </div>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-mint">
            {t("Refonte optimisée : UX mobile + structure SEO", "Optimised rebuild: mobile UX + SEO structure")}
          </p>
        </div>

        {/* AVANT (par-dessus, clippé) */}
        <div
          className="absolute inset-0 bg-cream-2 p-6 md:p-10"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <span className="inline-block rounded-full bg-ink/80 text-cream font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5">
            {t("Avant : site existant", "Before: existing site")}
          </span>
          <div className="mt-6 space-y-3 max-w-md opacity-60">
            <div className="h-6 w-1/2 rounded bg-ink/40" />
            <div className="h-2.5 w-full rounded bg-ink/20" />
            <div className="h-2.5 w-full rounded bg-ink/20" />
            <div className="h-2.5 w-5/6 rounded bg-ink/20" />
            <div className="h-8 w-28 rounded bg-ink/30 mt-4" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 pt-3">
              {t("lent · daté · invisible sur Google", "slow · dated · invisible on Google")}
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

export default function Showcase() {
  const { lang } = useLang();
  const t = useT();
  const projets = getProjets(lang);

  /* ── Résultats concrets ─────────────────────────────────────── */
  const RESULTS = [
    { big: <CountUp to={240} prefix="+" suffix="%" />, title: t("Trafic organique", "Organic traffic"), sub: t("En 6 mois sur un projet SEO local Luxembourg", "In 6 months on a local SEO project in Luxembourg") },
    { big: "< 1.5s", title: t("Temps de chargement", "Load time"), sub: t("Score PageSpeed > 90 sur mobile après optimisation", "PageSpeed score > 90 on mobile after optimisation") },
    { big: "Top 3", title: t("Sur Google", "On Google"), sub: t("Mots-clés locaux ciblés, résultats stables", "Targeted local keywords, stable results") },
  ];

  return (
    <section id="realisations" className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel>{t("( Réalisations )", "( Our work )")}</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-6 mt-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-ink leading-[0.95] max-w-2xl"
          >
            {lang === "en" ? (
              <>Projects with real <span className="squiggle">substance</span></>
            ) : (
              <>Des projets qui ont <span className="squiggle">du corps</span></>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm text-ink/70 font-medium"
          >
            {t(
              "Une sélection de réalisations signées par notre groupe : sites web, identités, SEO et campagnes. Propre, rapide et pensé pour convertir.",
              "A selection of work signed by our group: websites, identities, SEO and campaigns. Clean, fast and built to convert.",
            )}
          </motion.p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projets.map((p, i) => (
            <ProjectCard key={p.slug} p={p} rot={i % 2 ? 1 : -1} />
          ))}
        </div>

        <BeforeAfter />

        {/* Résultats */}
        <div className="mt-24">
          <div className="flex items-center gap-3">
            <Spark className="w-5 h-5 text-mint-dark" />
            <SectionLabel>{t("( Des résultats concrets )", "( Real results )")}</SectionLabel>
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
