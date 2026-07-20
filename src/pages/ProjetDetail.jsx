import React from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero, CtaBand } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { ArrowUpRight, Bean, Spark } from "../lib/ui.jsx";
import { CountUp } from "../components/Stats.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";
import { PROJETS, getProjet } from "../lib/projets.jsx";
import { getExpertise, Doodle } from "../lib/expertises.jsx";
import Seo, { SITE, breadcrumbLd } from "../lib/seo.jsx";

/* ── Visuel du hero : capture dans une fenêtre cartoon ────────── */
function ProjetVisual({ p }) {
  const eggSpeed = useEggSpeed();
  return (
    <div className="relative select-none">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.25 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className="rounded-3xl overflow-hidden border-[3px] border-ink bg-white shadow-[10px_10px_0_#0A0F0D]"
      >
        <div className="flex items-center gap-1.5 px-4 py-3 bg-cream-2 border-b-[3px] border-ink">
          <span className="w-2.5 h-2.5 rounded-full bg-caramel" />
          <span className="w-2.5 h-2.5 rounded-full bg-sun" />
          <span className="w-2.5 h-2.5 rounded-full bg-mint" />
          <span className="ml-3 font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40">
            {p.title} · {p.year}
          </span>
        </div>
        <img src={p.img} alt={p.alt} className="w-full h-64 md:h-80 object-cover" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 14, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5 / eggSpeed }}
        className="absolute -top-5 -right-4"
        aria-hidden
      >
        <Bean className="w-11 h-11" fill={p.shadow} />
      </motion.div>
      <div className="absolute -bottom-4 left-5 flex flex-wrap gap-2">
        {p.tagList.map((t, i) => (
          <motion.span
            key={t}
            initial={{ scale: 0, rotate: -6 }}
            animate={{ scale: 1, rotate: i % 2 ? 2 : -2 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 260, damping: 14 }}
            className="rounded-full bg-espresso text-mint font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 border-2 border-mint/40"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ── Une carte « ce qu'on a fait » ────────────────────────────── */
function DoneCard({ text, i }) {
  const shadows = ["#1FCE8A", "#F4A259", "#FFD166"];
  return (
    <motion.li
      initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.2 : -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (i % 3) * 0.09, type: "spring", stiffness: 130, damping: 16 }}
      whileHover={{ y: -6, rotate: i % 2 ? -1 : 1 }}
      className="flex items-start gap-4 rounded-2xl bg-white border-[3px] border-ink p-5 font-medium text-ink"
      style={{ boxShadow: `5px 5px 0 ${shadows[i % 3]}` }}
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: (i % 3) * 0.09 + 0.2, type: "spring", stiffness: 300, damping: 14 }}
        className="grid place-items-center w-8 h-8 rounded-full bg-mint text-ink border-2 border-ink shrink-0"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l5 5L20 7" />
        </svg>
      </motion.span>
      {text}
    </motion.li>
  );
}

export default function ProjetDetail() {
  const { slug } = useParams();
  const p = getProjet(slug);
  if (!p) return <Navigate to="/" replace />;
  const related = (p.related || []).map(getExpertise).filter(Boolean);

  return (
    <>
      <Seo
        title={`${p.title} — réalisation ${p.tags.toLowerCase()} | Cafein`}
        description={`${p.client} Découvrez ce que notre groupe a réalisé : ${p.tags.toLowerCase()}.`}
        path={`/realisations/${p.slug}`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `Projet ${p.title}`,
            about: p.tags,
            url: `${SITE}/realisations/${p.slug}`,
            dateCreated: p.year,
            author: { "@id": SITE + "/#cafein" },
          },
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/#realisations" },
            { name: p.title, path: `/realisations/${p.slug}` },
          ]),
        ]}
      />
      <PageHero n={p.n} tag={`Projet · ${p.year}`} title={p.tagline} subtitle={p.client}>
        <ProjetVisual p={p} />
      </PageHero>

      <Marquee words={p.words} />

      {/* La mission */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-mint-dark flex items-center gap-2"
              >
                <Spark className="w-4 h-4" /> La mission
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight"
              >
                Ce qu'on a <span className="squiggle">fait</span>
              </motion.h2>
              <div className="mt-6 space-y-5">
                {p.mission.map((m, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08 }}
                    className="text-ink/75 font-medium leading-relaxed text-base md:text-lg"
                  >
                    {m}
                  </motion.p>
                ))}
              </div>
            </div>
            <ul className="grid sm:grid-cols-1 gap-4 list-none lg:mt-16">
              {p.done.map((d, i) => (
                <DoneCard key={d} text={d} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Les résultats, quand ils sont mesurables */}
      {p.stats && (
        <section className="relative bg-espresso py-16 md:py-24 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-mint/10 blur-2xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-mint"
            >
              ( Les résultats )
            </motion.p>
            <div className="mt-10 grid sm:grid-cols-3 gap-10 text-center">
              {p.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 16 }}
                >
                  <p className="font-display font-extrabold text-5xl md:text-7xl text-mint leading-none">
                    {s.raw ? s.raw : <><CountUp to={s.big} prefix={s.prefix} />{s.suffix}</>}
                  </p>
                  <p className="mt-4 text-cream/60 font-medium leading-relaxed max-w-[28ch] mx-auto">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertises mobilisées */}
      <section className="bg-cream-2/60 py-16 md:py-24 border-t-2 border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-mint-dark"
          >
            ( Les expertises mobilisées )
          </motion.p>
          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 16 }}
                whileHover={{ y: -6, rotate: i % 2 ? -1 : 1 }}
              >
                <Link
                  to={`/notre-expertise/${r.slug}`}
                  data-cursor="Découvrir"
                  className="group flex items-center gap-4 rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[5px_5px_0_#0A0F0D] hover:shadow-[8px_8px_0_#1FCE8A] transition-shadow"
                >
                  <span className={`grid place-items-center w-14 h-14 rounded-xl border-2 border-ink text-ink shrink-0 ${r.bg || "bg-cream-2"}`}>
                    <Doodle kind={r.icon} className="w-8 h-8" />
                  </span>
                  <span className="font-display font-extrabold text-lg text-ink leading-tight flex-1">{r.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-mint-dark group-hover:rotate-45 transition-transform duration-300 shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Navigation entre projets */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              to="/#realisations"
              className="inline-flex items-center gap-2 font-display font-bold text-mint-dark hover:gap-3 transition-all"
            >
              ← Toutes nos réalisations
            </Link>
            <div className="flex flex-wrap gap-2">
              {PROJETS.filter((x) => x.slug !== p.slug)
                .slice(0, 3)
                .map((x) => (
                  <Link
                    key={x.slug}
                    to={`/realisations/${x.slug}`}
                    data-cursor="Voir"
                    className="rounded-full bg-white border-2 border-ink px-4 py-2 font-display font-bold text-sm text-ink shadow-[3px_3px_0_#0A0F0D] hover:shadow-[5px_5px_0_#1FCE8A] transition-shadow"
                  >
                    {x.title}
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Envie d'un projet comme celui-ci ?"
        sub="Racontez-nous le vôtre autour d'un café — devis gratuit, sans engagement."
        label="Parlons-en"
      />
    </>
  );
}
