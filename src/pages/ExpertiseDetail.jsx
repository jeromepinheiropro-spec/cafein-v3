import React from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero, CtaBand, MiniFaq, Steps } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { Spark, ArrowUpRight, Bean } from "../lib/ui.jsx";
import { CountUp } from "../components/Stats.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";
import { EXPERTISES, getExpertise, Doodle } from "../lib/expertises.jsx";
import Seo, { faqLd, serviceLd, breadcrumbLd } from "../lib/seo.jsx";

/* ── Déco du hero : icône géante + grains en orbite ───────────── */
function OrbitDeco({ e }) {
  const eggSpeed = useEggSpeed();
  const orbit = [
    { fill: "#1FCE8A", size: 26, dur: 9 },
    { fill: "#F4A259", size: 20, dur: 12 },
    { fill: "#FFD166", size: 16, dur: 15 },
  ];
  return (
    <div className="relative grid place-items-center select-none" aria-hidden>
      {/* anneaux pointillés */}
      <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-ink/15" />
      <div className="absolute w-[21rem] h-[21rem] rounded-full border-2 border-dashed border-ink/10" />
      {/* grains en orbite */}
      {orbit.map((o, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: o.dur / eggSpeed, ease: "linear" }}
          className="absolute grid place-items-start justify-center"
          style={{ width: `${16 + i * 5}rem`, height: `${16 + i * 5}rem` }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: o.dur / eggSpeed, ease: "linear" }}
            style={{ marginTop: -o.size / 2 }}
          >
            <Bean style={{ width: o.size, height: o.size }} fill={o.fill} />
          </motion.div>
        </motion.div>
      ))}
      {/* pastille centrale */}
      <motion.div
        initial={{ scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 }}
        whileHover={{ rotate: -4, scale: 1.04 }}
        className={`relative grid place-items-center w-44 h-44 rounded-[2rem] ${e.bg || "bg-mint"} border-[3px] border-ink shadow-[10px_10px_0_#0A0F0D] text-ink`}
      >
        <Doodle kind={e.icon} className="w-24 h-24" />
        <motion.span
          animate={{ rotate: [0, 14, -14, 0] }}
          transition={{ repeat: Infinity, duration: 4 / eggSpeed }}
          className="absolute -top-4 -right-4 grid place-items-center w-12 h-12 rounded-full bg-espresso border-[3px] border-mint"
        >
          <Spark className="w-5 h-5 text-mint" />
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ── Une ligne de la liste « concrètement » ───────────────────── */
function FeatureCard({ text, i }) {
  const shadows = ["#1FCE8A", "#F4A259", "#FFD166"];
  return (
    <motion.li
      initial={{ opacity: 0, y: 34, rotate: i % 2 ? 1.2 : -1.2 }}
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

export default function ExpertiseDetail() {
  const { slug } = useParams();
  const e = getExpertise(slug);
  if (!e) return <Navigate to="/notre-expertise" replace />;
  const idx = EXPERTISES.indexOf(e);
  const related = (e.related || []).map(getExpertise).filter(Boolean);

  return (
    <>
      <Seo
        title={`${e.title} au Luxembourg | Cafein`}
        description={e.subtitle}
        path={`/notre-expertise/${e.slug}`}
        jsonLd={[
          serviceLd(e.title, e.subtitle, `/notre-expertise/${e.slug}`),
          faqLd(e.faq),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Notre expertise", path: "/notre-expertise" },
            { name: e.title, path: `/notre-expertise/${e.slug}` },
          ]),
        ]}
      />
      <PageHero
        n={String(idx + 1).padStart(2, "0")}
        tag={e.title}
        title={e.tagline}
        subtitle={e.subtitle}
      >
        <OrbitDeco e={e} />
      </PageHero>

      <Marquee words={e.words} />

      {/* Concrètement */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight"
          >
            Concrètement, <span className="squiggle">on s'occupe de tout</span>
          </motion.h2>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {e.features.map((f, i) => (
              <FeatureCard key={f} text={f} i={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* Chiffres qui claquent */}
      <section className="relative bg-espresso py-16 md:py-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-mint/10 blur-2xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid sm:grid-cols-3 gap-10 text-center">
          {e.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 16 }}
            >
              <p className="font-display font-extrabold text-5xl md:text-7xl text-mint leading-none">
                <CountUp to={s.big} />
                {s.suffix}
              </p>
              <p className="mt-4 text-cream/60 font-medium leading-relaxed max-w-[28ch] mx-auto">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Steps title="Comment on s'y prend" steps={e.steps} />

      <MiniFaq items={e.faq} />

      {/* Expertises liées */}
      <section className="bg-cream-2/60 py-16 md:py-24 border-t-2 border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-mint-dark"
          >
            ( Ça se marie bien avec )
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
                  <span className="font-display font-extrabold text-lg text-ink leading-tight flex-1">
                    {r.title}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-mint-dark group-hover:rotate-45 transition-transform duration-300 shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              to="/notre-expertise"
              className="inline-flex items-center gap-2 font-display font-bold text-mint-dark hover:gap-3 transition-all"
            >
              ← Toutes nos expertises
            </Link>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="On en parle autour d'un café ?"
        sub="Premier échange gratuit, conseils francs, devis sans engagement."
        label={e.cta || "Parlons-en"}
      />
    </>
  );
}
