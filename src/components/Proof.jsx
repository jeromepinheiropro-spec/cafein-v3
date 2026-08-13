import React from "react";
import { motion } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { CountUp } from "./Stats.jsx";
import { Spark, ArrowUpRight } from "../lib/ui.jsx";
import { useT } from "../lib/lang.jsx";

/*
  Preuve sociale par cas client RÉEL.
  On met en scène une réalisation concrète (client, secteur, résultats
  chiffrés vérifiables) plutôt que de faux témoignages. Layout volontairement
  différent des grilles de cartes : un grand bloc « case study » coloré, des
  compteurs géants, et une bande « ils nous font confiance ».

  Props :
    dark        : fond espresso si true, sinon crème
    kicker      : petite ligne mono au-dessus du titre
    title       : titre (JSX)
    study       : { client, sector, to, quote, accent, stats:[{to,prefix,suffix,label,plain}] }
    rosterLabel : libellé de la bande de logos
    roster      : [string]  noms de clients
*/
export default function Proof({ dark = false, kicker, title, study, rosterLabel, roster = [] }) {
  const t = useT();
  const accent = study.accent || "bg-mint";

  return (
    <section className={`relative overflow-hidden ${dark ? "bg-espresso" : "bg-cream"} py-20 md:py-28`}>
      {/* halo décoratif */}
      <div className={`absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-blob ${dark ? "bg-mint/10" : "bg-mint/15"} blur-3xl pointer-events-none`} />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-mint-dark flex items-center gap-2"
        >
          <Spark className="w-4 h-4" /> {kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className={`mt-4 font-display font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] ${dark ? "text-cream" : "text-ink"}`}
        >
          {title}
        </motion.h2>

        {/* Grande carte case study */}
        <motion.div
          initial={{ opacity: 0, y: 44, rotate: -1.2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 110, damping: 17 }}
          className={`mt-12 grid lg:grid-cols-[1fr_1.15fr] rounded-[2rem] border-[3px] border-ink overflow-hidden shadow-[10px_10px_0_#0A0F0D]`}
        >
          {/* Colonne gauche : le client + le récit */}
          <div className={`${accent} text-ink p-8 md:p-12 flex flex-col`}>
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase border-2 border-ink rounded-full px-4 py-1.5 self-start">
              {t("Cas client", "Client case")}
            </span>
            <h3 className="mt-6 font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-none">
              {study.client}
            </h3>
            <p className="mt-1.5 font-mono text-xs tracking-[0.2em] uppercase text-ink/60">{study.sector}</p>
            <p className="mt-6 font-medium text-lg leading-relaxed opacity-90 flex-1">{study.quote}</p>
            {study.to && (
              <Link
                to={study.to}
                data-cursor={t("Voir", "See")}
                className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-ink text-cream font-display font-bold text-sm px-5 py-3 border-[3px] border-ink hover:bg-espresso-2 transition-colors"
              >
                {t("Voir la réalisation", "See the project")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Colonne droite : les chiffres géants */}
          <div className={`${dark ? "bg-espresso-2" : "bg-white"} p-8 md:p-12 grid content-center gap-8`}>
            {study.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="flex items-baseline gap-5 border-b-2 border-ink/10 last:border-0 pb-6 last:pb-0"
              >
                <p className={`font-display font-extrabold text-5xl md:text-6xl leading-none ${dark ? "text-mint" : "text-mint-dark"} tabular-nums shrink-0`}>
                  {s.plain ? s.plain : <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />}
                </p>
                <p className={`font-medium text-base md:text-lg leading-snug ${dark ? "text-cream/70" : "text-ink/70"}`}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bande « ils nous font confiance » */}
        {roster.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3"
          >
            <span className={`font-mono text-[11px] tracking-[0.25em] uppercase ${dark ? "text-cream/40" : "text-ink/40"} mr-2`}>
              {rosterLabel} :
            </span>
            {roster.map((r) => (
              <span
                key={r}
                className={`rounded-full border-2 px-4 py-1.5 font-display font-bold text-sm ${
                  dark ? "border-cream/25 text-cream/80" : "border-ink/20 text-ink/80 bg-white"
                }`}
              >
                {r}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
