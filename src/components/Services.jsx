import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionLabel, ArrowUpRight } from "../lib/ui.jsx";
import { useT, useLang } from "../lib/lang.jsx";

const MotionLink = motion.create(Link);

/* Icônes doodle par service */
function IconSite({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <rect x="8" y="12" width="48" height="36" rx="4" />
      <path d="M8 22h48" />
      <circle cx="15" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="21" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="27" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16 32h14M16 39h20" />
      <path d="M42 30l8 8-8 8" />
    </svg>
  );
}
function IconSeo({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <circle cx="27" cy="27" r="15" />
      <path d="M38 38 L52 52" />
      <path d="M20 30 L25 24 L30 28 L35 20" />
    </svg>
  );
}
function IconCom({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <path d="M10 40 V24 a4 4 0 0 1 4-4 h22 a4 4 0 0 1 4 4 v10 a4 4 0 0 1-4 4 H22 l-8 8 v-6 z" />
      <path d="M46 26 c6 2 8 6 8 10 v10 l-6-5 h-4" />
      <circle cx="20" cy="29" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="26" cy="29" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="32" cy="29" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SERVICES = {
  fr: [
    {
      n: "01",
      to: "/creation-site-web",
      title: "Création de site web",
      desc: "WordPress ou développement sur mesure, selon vos besoins et votre budget : vitrine, e-commerce ou plateforme spécifique, pensés pour le marché luxembourgeois.",
      tags: ["Vitrine", "E-commerce", "Sur mesure"],
      Icon: IconSite,
      bg: "bg-mint",
      text: "text-ink",
      rotate: -1.5,
    },
    {
      n: "02",
      to: "/seo-geo",
      title: "SEO & GEO",
      desc: "Référencement naturel classique et optimisation pour être trouvé et cité par les intelligences artificielles (ChatGPT, Perplexity...), avec un focus local Luxembourg.",
      tags: ["Google", "ChatGPT", "Local"],
      Icon: IconSeo,
      bg: "bg-caramel",
      text: "text-ink",
      rotate: 1.5,
    },
    {
      n: "03",
      to: "/communication",
      title: "Communication digitale",
      desc: "Stratégie, réseaux sociaux, contenus et campagnes : on gère votre communication digitale de A à Z pour faire rayonner votre marque au Luxembourg.",
      tags: ["Réseaux sociaux", "Contenus", "Campagnes"],
      Icon: IconCom,
      bg: "bg-sun",
      text: "text-ink",
      rotate: -1,
    },
  ],
  en: [
    {
      n: "01",
      to: "/creation-site-web",
      title: "Website design",
      desc: "WordPress or fully custom development, tailored to your needs and budget: showcase sites, e-commerce or bespoke platforms, built for the Luxembourg market.",
      tags: ["Showcase", "E-commerce", "Custom-built"],
      Icon: IconSite,
      bg: "bg-mint",
      text: "text-ink",
      rotate: -1.5,
    },
    {
      n: "02",
      to: "/seo-geo",
      title: "SEO & GEO",
      desc: "Classic search engine optimisation plus tuning to get found and cited by AI assistants (ChatGPT, Perplexity...), with a local focus on Luxembourg.",
      tags: ["Google", "ChatGPT", "Local"],
      Icon: IconSeo,
      bg: "bg-caramel",
      text: "text-ink",
      rotate: 1.5,
    },
    {
      n: "03",
      to: "/communication",
      title: "Digital communication",
      desc: "Strategy, social media, content and campaigns: we handle your digital communication from A to Z to make your brand shine across Luxembourg.",
      tags: ["Social media", "Content", "Campaigns"],
      Icon: IconCom,
      bg: "bg-sun",
      text: "text-ink",
      rotate: -1,
    },
  ],
};

function Card({ s, i, total, progress }) {
  const t = useT();
  const targetScale = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 md:top-28 flex justify-center px-4" style={{ zIndex: i + 1 }}>
      <MotionLink
        to={s.to}
        data-cursor={t("Découvrir", "Discover")}
        aria-label={`${s.title}, ${t("en savoir plus", "learn more")}`}
        style={{ scale, rotate: s.rotate }}
        whileHover={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`block ${s.bg} ${s.text} w-full max-w-4xl rounded-[2rem] border-[3px] border-ink shadow-[8px_8px_0_#0A0F0D] p-8 md:p-12 mb-8 cursor-pointer`}
      >
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-sm md:text-base font-bold tracking-widest border-2 border-ink rounded-full px-3 py-1">
            {s.n}
          </span>
          <motion.div
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
          >
            <s.Icon className="w-14 h-14 md:w-20 md:h-20" />
          </motion.div>
        </div>
        <h3 className="font-display font-extrabold text-3xl md:text-5xl mt-6 leading-tight">
          {s.title}
        </h3>
        <p className="mt-4 text-base md:text-xl font-medium leading-relaxed max-w-2xl opacity-90">
          {s.desc}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {s.tags.map((t) => (
            <span key={t} className="rounded-full bg-ink/10 border border-ink/30 px-4 py-1.5 font-mono text-xs uppercase tracking-wider">
              {t}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-2 font-display font-bold text-sm md:text-base group">
            {t("En savoir plus", "Learn more")}
            <span className="grid place-items-center w-9 h-9 rounded-full bg-ink text-cream group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </span>
        </div>
      </MotionLink>
    </div>
  );
}

export default function Services() {
  const { lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const services = SERVICES[lang];

  return (
    <section id="services" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 mb-10 md:mb-16">
        <SectionLabel>( Services )</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-ink mt-4 leading-[0.95]"
        >
          {lang === "en" ? (
            <>
              Three espressos,
              <br />
              <span className="text-stroke-espresso">zero decaf.</span>
            </>
          ) : (
            <>
              Trois expressos,
              <br />
              <span className="text-stroke-espresso">zéro déca.</span>
            </>
          )}
        </motion.h2>
      </div>

      <div ref={ref} className="relative">
        {services.map((s, i) => (
          <Card key={s.n} s={s} i={i} total={services.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
