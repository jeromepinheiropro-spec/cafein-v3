import React from "react";
import { motion } from "framer-motion";
import { PageHero, CtaBand, MiniFaq } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { CountUp } from "../components/Stats.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";

/* Mockup résultat Google pour le hero */
function SerpDeco() {
  const eggSpeed = useEggSpeed();
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-cream/20 bg-espresso-2 p-6 shadow-2xl">
        <p className="font-mono text-[10px] tracking-widest text-mint uppercase mb-3">#1 · cafein.lu</p>
        <p className="font-display font-bold text-cream text-lg leading-snug">
          Cafein — Agence de marketing web au Luxembourg
        </p>
        <p className="text-cream/50 text-sm mt-1">Sites sur mesure, SEO & GEO, communication digitale…</p>
      </div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: (3) / eggSpeed }}
        className="rounded-2xl border-2 border-mint/50 bg-mint/10 p-6"
      >
        <p className="font-mono text-[10px] tracking-widest text-mint uppercase mb-2">Assistant IA</p>
        <p className="text-cream/85 font-medium text-sm leading-relaxed">
          « Quelle agence web recommandes-tu au Luxembourg ? »
        </p>
        <p className="mt-2 text-mint font-bold text-sm">→ Cafein, cité en source.</p>
      </motion.div>
    </div>
  );
}

const STATS = [
  { big: <CountUp to={240} prefix="+" suffix="%" />, label: "Trafic organique en 6 mois" },
  { big: "Top 3", label: "15 mots-clés positionnés" },
  { big: <CountUp to={95} suffix="/100" />, label: "Score Lighthouse après audit" },
  { big: <CountUp to={4} suffix=" IA" />, label: "Sources qui citent nos clients" },
];

const PILLARS = [
  {
    tag: "Le socle",
    title: "SEO classique",
    desc: "Un travail de fond sur votre référencement naturel pour gagner en visibilité durablement sur Google.",
    points: [
      "Audit technique et sémantique complet",
      "Optimisation on-page (contenu, structure, maillage)",
      "Stratégie de contenu ciblée sur votre marché",
      "Suivi des positions et des résultats",
    ],
    bg: "bg-mint",
  },
  {
    tag: "L'avantage",
    title: "GEO : référencement pour les IA",
    desc: "Une discipline émergente : optimiser votre présence pour être cité en réponse dans les IA génératives.",
    points: [
      "Structuration du contenu pour les moteurs IA",
      "Optimisation de votre présence citée en source",
      "Veille active sur les nouvelles pratiques GEO",
      "Peu d'agences au Luxembourg s'y consacrent aujourd'hui",
    ],
    bg: "bg-caramel",
  },
];

const TIMELINE = [
  { m: "Mois 1-2", t: "Audit et fondations", d: "Analyse de l'existant, identification des priorités techniques et sémantiques, mise en place des bases." },
  { m: "Mois 3-5", t: "Production et optimisation", d: "Contenu optimisé, corrections techniques, structuration du contenu pour les moteurs IA." },
  { m: "Mois 6+", t: "Montée en puissance", d: "Les positions progressent, les citations dans les IA augmentent. Le référencement est un investissement qui croît dans le temps." },
];

const FAQ = [
  {
    q: "Le GEO remplace-t-il le SEO ?",
    a: "Non, il le complète. Les bonnes pratiques SEO restent la base : un site techniquement propre et un contenu clair profitent aux deux. Le GEO ajoute une couche d'optimisation spécifique pour que les IA vous identifient et vous citent comme source fiable.",
  },
  {
    q: "En combien de temps voit-on des résultats ?",
    a: "Comptez généralement 3 à 6 mois pour des résultats significatifs sur des mots-clés locaux. Certaines optimisations techniques donnent des effets plus rapides, et on suit les positions ensemble, mois après mois.",
  },
  {
    q: "Faut-il tout refaire si le site existe déjà ?",
    a: "Rarement. On commence par un audit : dans la plupart des cas, des optimisations ciblées (structure, contenu, technique) suffisent. Si la base est trop fragile, on vous le dit franchement et on chiffre les deux scénarios.",
  },
];

export default function SeoGeo() {
  return (
    <>
      <PageHero
        n="02"
        tag="Rank #1"
        title={<>Être trouvé, par Google <span className="text-mint-dark">comme par les IA</span></>}
        subtitle="Le référencement ne se limite plus à Google. Cafein travaille votre visibilité sur les moteurs de recherche classiques et sur les intelligences artificielles génératives (ChatGPT, Perplexity, Gemini...), qui deviennent une nouvelle porte d'entrée vers vos clients."
      >
        <SerpDeco />
      </PageHero>

      {/* Stats */}
      <section className="bg-espresso pb-20 border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/15 rounded-3xl overflow-hidden border border-cream/15">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-espresso p-7 md:p-9"
            >
              <p className="font-display font-extrabold text-3xl md:text-4xl text-mint">{s.big}</p>
              <p className="mt-2 font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-cream/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Marquee words={["SEO", "GEO", "Google", "ChatGPT", "Perplexity"]} />

      {/* SEO + GEO */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-8">
          {PILLARS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 110, damping: 17 }}
              className={`${c.bg} rounded-3xl border-[3px] border-ink p-8 md:p-12 text-ink shadow-[8px_8px_0_#0A0F0D]`}
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase border-2 border-ink rounded-full px-4 py-1.5">
                {c.tag}
              </span>
              <h3 className="mt-6 font-display font-extrabold text-2xl md:text-4xl tracking-tight">{c.title}</h3>
              <p className="mt-4 font-medium leading-relaxed text-lg opacity-85">{c.desc}</p>
              <ul className="mt-6 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-medium">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l5 5L20 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-4xl px-6 md:px-10 mt-16 text-center"
        >
          <h3 className="font-display font-extrabold text-2xl md:text-4xl text-ink tracking-tight">
            Pourquoi les deux ensemble ?
          </h3>
          <p className="mt-5 text-ink/70 font-medium text-lg leading-relaxed">
            De plus en plus de recherches passent par les assistants IA plutôt que par un moteur de
            recherche classique. Combiner SEO et GEO, c'est s'assurer d'être visible partout où vos
            clients cherchent une réponse, aujourd'hui et demain.
          </p>
        </motion.div>
      </section>

      {/* Timeline réaliste */}
      <section className="bg-espresso py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-cream tracking-tight mb-12"
          >
            Une vision <span className="text-mint">réaliste</span> des résultats
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TIMELINE.map((s, i) => (
              <motion.div
                key={s.m}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12 }}
                className="border-2 border-cream/15 bg-espresso-2/60 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 bg-mint" style={{ width: `${(i + 1) * 33}%` }} />
                <p className="font-mono text-xs tracking-[0.25em] uppercase text-mint">{s.m}</p>
                <h3 className="mt-3 font-display font-extrabold text-xl text-cream tracking-tight">{s.t}</h3>
                <p className="mt-3 text-cream/60 font-medium leading-relaxed text-sm">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MiniFaq items={FAQ} />
      <CtaBand title="Envie d'améliorer votre visibilité ?" sub="Parlons de votre situation actuelle et de vos objectifs." label="Demander un audit" />
    </>
  );
}
