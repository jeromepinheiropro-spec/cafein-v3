import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero, CtaBand } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { Spark, ArrowUpRight, Bean } from "../lib/ui.jsx";
import { EXPERTISES, Doodle } from "../lib/expertises.jsx";

/*
  La grille des 12 expertises Cafein, façon nooki.fr/notre-expertise —
  chaque carte mène à sa page dédiée.
*/
function ExpertiseCard({ e, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.08, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
      className="h-full"
    >
      <Link
        to={`/notre-expertise/${e.slug}`}
        data-cursor="Découvrir"
        className="group flex flex-col rounded-3xl bg-white border-[3px] border-ink p-7 shadow-[5px_5px_0_#0A0F0D] hover:shadow-[9px_9px_0_#1FCE8A] transition-shadow text-left h-full"
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={`grid place-items-center w-16 h-16 rounded-2xl border-[3px] border-ink text-ink ${e.bg || "bg-cream-2"}`}
          >
            <Doodle kind={e.icon} />
          </span>
          <span className="font-mono text-xs font-bold text-mint-dark tracking-widest">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 font-display font-extrabold text-xl md:text-2xl text-ink leading-tight">
          {e.title}
        </h3>
        <p className="mt-2.5 text-ink/70 font-medium leading-relaxed text-sm md:text-base">
          {e.desc}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-display font-bold text-sm text-mint-dark group-hover:gap-2.5 transition-all">
          En savoir plus <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function Expertise() {
  return (
    <>
      <PageHero
        n="✦"
        tag="Savoir-faire"
        title={
          <>
            Une expertise complète, <span className="text-mint-dark">servie bien serrée</span>
          </>
        }
        subtitle="Des années d'expérience réunies autour d'une même tasse : sites web, visibilité, communication et data. Douze savoir-faire complémentaires, un seul interlocuteur — au Luxembourg et dans la Grande Région."
      >
        <div className="relative select-none" aria-hidden>
          {/* pile de tasses façon autocollants */}
          <div className="rounded-3xl bg-espresso border-[3px] border-ink p-8 shadow-[8px_8px_0_#1FCE8A] rotate-2">
            <div className="grid grid-cols-3 gap-5">
              {["site", "seo", "geo", "social", "contenu", "data"].map((k) => (
                <span key={k} className="grid place-items-center w-16 h-16 rounded-2xl bg-espresso-2 border-2 border-mint/40 text-mint">
                  <Doodle kind={k} className="w-8 h-8" />
                </span>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-cream/50 text-center">
              12 expertises · 1 interlocuteur
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 14, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-5 -right-5"
          >
            <Bean className="w-12 h-12" fill="#F4A259" />
          </motion.div>
        </div>
      </PageHero>

      <Marquee words={["Sites web", "SEO", "GEO", "Social media", "Contenus", "Data"]} />

      {/* Grille des 12 expertises */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight"
          >
            Tout ce qu'on sait <span className="squiggle">faire</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-ink/70 font-medium max-w-2xl"
          >
            Chaque expertise a sa page dédiée — cliquez, explorez, c'est ensemble qu'elles donnent le meilleur mélange.
          </motion.p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISES.map((e, i) => (
              <ExpertiseCard key={e.slug} e={e} i={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 font-mono text-xs tracking-[0.3em] uppercase text-mint-dark flex items-center gap-2"
          >
            <Spark className="w-4 h-4" /> Il manque la vôtre ? Parlons-en.
          </motion.p>
        </div>
      </section>

      {/* Bande "pourquoi nous" compacte */}
      <section className="bg-espresso py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { big: "1", label: "interlocuteur unique, du premier appel au suivi" },
            { big: "3", label: "métiers complémentaires : site, visibilité, communication" },
            { big: "0", label: "jargon — on vous explique tout, simplement" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-display font-extrabold text-6xl md:text-7xl text-mint">{s.big}</p>
              <p className="mt-3 text-cream/60 font-medium leading-relaxed max-w-[26ch] mx-auto">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Une idée ? On a l'expertise qui va avec."
        sub="Racontez-nous votre projet autour d'un café — devis gratuit, sans engagement."
        label="Parlons-en"
      />
    </>
  );
}
