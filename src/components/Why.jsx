import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "../lib/ui.jsx";

function IconPin({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 56s-18-16.5-18-30a18 18 0 1 1 36 0c0 13.5-18 30-18 30z" />
      <circle cx="32" cy="26" r="7" />
    </svg>
  );
}
function IconBot({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="22" width="36" height="28" rx="8" />
      <path d="M32 22v-8m0 0a4 4 0 1 0-4-4" />
      <circle cx="25" cy="35" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="39" cy="35" r="2.5" fill="currentColor" stroke="none" />
      <path d="M26 43c2 2 10 2 12 0" />
    </svg>
  );
}
function IconChat({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="26" r="10" />
      <path d="M10 52c2-8 7-12 14-12s12 4 14 12" />
      <circle cx="46" cy="24" r="7" />
      <path d="M40 48c1.5-6 5-9 10-9 3 0 5.5 1 7.5 3" />
    </svg>
  );
}
function IconBolt({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 6 14 36h14l-2 22 22-30H34l2-22z" />
    </svg>
  );
}

const REASONS = [
  {
    Icon: IconPin,
    title: "Ancrés au Luxembourg",
    desc: "Une agence locale qui comprend votre marché, pas un prestataire lointain.",
    color: "bg-mint",
  },
  {
    Icon: IconBot,
    title: "Prêts pour l'ère de l'IA",
    desc: "En plus du SEO classique, on optimise votre présence pour les moteurs IA (GEO), un angle que peu d'agences travaillent aujourd'hui.",
    color: "bg-caramel",
  },
  {
    Icon: IconChat,
    title: "Un interlocuteur direct",
    desc: "Pas d'intermédiaire ni de compte manager : vous échangez directement avec la personne qui construit votre projet.",
    color: "bg-sun",
  },
  {
    Icon: IconBolt,
    title: "Rapide et sans fioritures",
    desc: "Des sites propres et performants, livrés efficacement, sans jargon inutile.",
    color: "bg-cream-2",
  },
];

export default function Why() {
  return (
    <section className="relative bg-espresso py-24 md:py-36 overflow-hidden">
      {/* déco : grandes formes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-blob bg-mint/10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-blob bg-caramel/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel dark>( Pourquoi Cafein ? )</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-4xl md:text-6xl text-cream mt-4 leading-[0.95]"
        >
          Le petit grain
          <br />
          <span className="text-stroke-cream">qui change tout.</span>
        </motion.h2>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 16 }}
              whileHover={{ y: -8, rotate: i % 2 ? -1 : 1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              className={`${r.color} rounded-3xl border-[3px] border-ink p-8 md:p-10 text-ink shadow-[8px_8px_0_rgba(31,206,138,0.35)]`}
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="inline-grid place-items-center w-16 h-16 rounded-2xl bg-ink text-cream mb-6"
              >
                <r.Icon className="w-9 h-9" />
              </motion.div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl">{r.title}</h3>
              <p className="mt-3 font-medium leading-relaxed text-ink/80">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
