import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero, CtaBand } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { Spark, ArrowUpRight, Cup, Bean } from "../lib/ui.jsx";

/* Icônes doodle minimalistes, cohérentes avec le reste du site */
function Doodle({ kind, className = "w-9 h-9" }) {
  const common = {
    viewBox: "0 0 64 64",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (kind) {
    case "site":
      return (
        <svg {...common}>
          <rect x="8" y="14" width="48" height="36" rx="4" />
          <path d="M8 24h48M16 34h16M16 41h22" />
        </svg>
      );
    case "ecom":
      return (
        <svg {...common}>
          <path d="M12 18h8l6 26h22l6-20H24" />
          <circle cx="30" cy="52" r="3" fill="currentColor" stroke="none" />
          <circle cx="48" cy="52" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M22 20 10 32l12 12M42 20l12 12-12 12M36 14l-8 36" />
        </svg>
      );
    case "seo":
      return (
        <svg {...common}>
          <circle cx="27" cy="27" r="15" />
          <path d="M38 38 52 52M20 30l5-6 5 4 5-8" />
        </svg>
      );
    case "geo":
      return (
        <svg {...common}>
          <rect x="12" y="14" width="40" height="28" rx="6" />
          <circle cx="26" cy="28" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="38" cy="28" r="2.5" fill="currentColor" stroke="none" />
          <path d="M26 50h12M32 42v8" />
        </svg>
      );
    case "local":
      return (
        <svg {...common}>
          <path d="M32 54c10-11 16-18 16-26a16 16 0 1 0-32 0c0 8 6 15 16 26z" />
          <circle cx="32" cy="27" r="6" />
        </svg>
      );
    case "social":
      return (
        <svg {...common}>
          <circle cx="20" cy="22" r="7" />
          <circle cx="46" cy="16" r="5" />
          <circle cx="44" cy="46" r="8" />
          <path d="M26 26l11 15M26 20l14-3" />
        </svg>
      );
    case "contenu":
      return (
        <svg {...common}>
          <path d="M16 50 44 22l-6-6L10 44l-2 10 8-4zM38 16l10 10" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="18" />
          <path d="M32 14v-6M32 56v-6M14 32H8M56 32h-6" />
          <circle cx="32" cy="32" r="6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "ads":
      return (
        <svg {...common}>
          <path d="M10 28v8l24 10V18L10 28zM34 24l18-8M34 40l18 8M52 26v12" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="10" y="18" width="44" height="30" rx="4" />
          <path d="M10 22l22 16 22-16" />
        </svg>
      );
    case "data":
      return (
        <svg {...common}>
          <path d="M12 52V32M26 52V20M40 52V38M54 52V26" />
          <path d="M8 56h48" />
        </svg>
      );
    default:
      return <Cup className={className} />;
  }
}

/*
  Les 12 expertises Cafein, façon nooki.fr/notre-expertise
  mais servies bien serrées. `to` = carte cliquable vers la page dédiée.
*/
const EXPERTISES = [
  {
    icon: "site",
    title: "Sites vitrine",
    desc: "Votre activité présentée avec soin, pensée pour transformer les visiteurs en contacts.",
    to: "/creation-site-web",
    bg: "bg-mint",
  },
  {
    icon: "ecom",
    title: "E-commerce",
    desc: "Des boutiques en ligne rapides et rassurantes, du catalogue au paiement.",
    to: "/creation-site-web",
  },
  {
    icon: "code",
    title: "Développement sur mesure",
    desc: "SaaS, plateformes, outils métier : du code taillé pour vos besoins, qui grandit avec vous.",
    to: "/creation-site-web",
  },
  {
    icon: "seo",
    title: "SEO",
    desc: "Placez votre site en haut des résultats Google avec une stratégie durable, sans payer de publicité.",
    to: "/seo-geo",
    bg: "bg-caramel",
  },
  {
    icon: "geo",
    title: "GEO — visibilité IA",
    desc: "Être trouvé et cité par ChatGPT, Perplexity et Gemini : le référencement nouvelle génération.",
    to: "/seo-geo",
    bg: "bg-sun",
  },
  {
    icon: "local",
    title: "SEO local Luxembourg",
    desc: "Être visible auprès des clients de votre zone : Google Maps, fiches locales, Grande Région.",
    to: "/seo-geo",
  },
  {
    icon: "social",
    title: "Réseaux sociaux",
    desc: "Nous animons vos comptes pour fédérer une communauté et faire rayonner votre marque.",
    to: "/communication",
    bg: "bg-mint",
  },
  {
    icon: "contenu",
    title: "Contenus & copywriting",
    desc: "Articles, pages, posts : des mots qui travaillent pour votre image et votre SEO.",
    to: "/communication",
  },
  {
    icon: "brand",
    title: "Branding & identité",
    desc: "Logo, couleurs, ton : une identité cohérente qui reste en tête, du site aux réseaux.",
  },
  {
    icon: "ads",
    title: "Campagnes publicitaires",
    desc: "Google Ads et social ads ciblés, pour un retour sur investissement mesurable et rapide.",
    bg: "bg-caramel",
  },
  {
    icon: "mail",
    title: "Emailing & newsletters",
    desc: "Des e-mails bien tournés et esthétiques, le seul canal dont vous êtes vraiment propriétaire.",
  },
  {
    icon: "data",
    title: "Data & reporting",
    desc: "Positions SEO, performances des campagnes : des rapports clairs pour décider vite.",
    bg: "bg-sun",
  },
];

function ExpertiseCard({ e, i }) {
  const inner = (
    <>
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
      {e.to && (
        <span className="mt-4 inline-flex items-center gap-1.5 font-display font-bold text-sm text-mint-dark group-hover:gap-2.5 transition-all">
          En savoir plus <ArrowUpRight className="w-4 h-4" />
        </span>
      )}
    </>
  );

  const className = `group flex flex-col rounded-3xl bg-white border-[3px] border-ink p-7 shadow-[5px_5px_0_#0A0F0D] hover:shadow-[9px_9px_0_#1FCE8A] transition-shadow text-left h-full`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.08, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
      className="h-full"
    >
      {e.to ? (
        <Link to={e.to} data-cursor="Découvrir" className={className}>
          {inner}
        </Link>
      ) : (
        <div className={className}>{inner}</div>
      )}
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
            Chaque expertise se déguste seule — mais c'est ensemble qu'elles donnent le meilleur mélange.
          </motion.p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISES.map((e, i) => (
              <ExpertiseCard key={e.title} e={e} i={i} />
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
