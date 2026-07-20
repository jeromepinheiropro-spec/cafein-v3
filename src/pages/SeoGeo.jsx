import React from "react";
import { motion } from "framer-motion";
import { PageHero, CtaBand, MiniFaq, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { CountUp } from "../components/Stats.jsx";
import Seo, { faqLd, serviceLd, breadcrumbLd } from "../lib/seo.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";
import { useT, useLang } from "../lib/lang.jsx";

/* Mockup résultat Google pour le hero */
function SerpDeco() {
  const eggSpeed = useEggSpeed();
  const t = useT();
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-cream/20 bg-espresso-2 p-6 shadow-2xl">
        <p className="font-mono text-[10px] tracking-widest text-mint uppercase mb-3">#1 · cafein.lu</p>
        <p className="font-display font-bold text-cream text-lg leading-snug">
          {t("Cafein | Agence de marketing web au Luxembourg", "Cafein | Web marketing agency in Luxembourg")}
        </p>
        <p className="text-cream/50 text-sm mt-1">
          {t("Sites sur mesure, SEO & GEO, communication digitale…", "Custom-built websites, SEO & GEO, digital communication…")}
        </p>
      </div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: (3) / eggSpeed }}
        className="rounded-2xl border-2 border-mint/50 bg-mint/10 p-6"
      >
        <p className="font-mono text-[10px] tracking-widest text-mint-dark uppercase mb-2">{t("Assistant IA", "AI assistant")}</p>
        <p className="text-ink/80 font-medium text-sm leading-relaxed">
          {t("« Quelle agence web recommandes-tu au Luxembourg ? »", "« Which web agency do you recommend in Luxembourg? »")}
        </p>
        <p className="mt-2 text-mint-dark font-bold text-sm">{t("→ Cafein, cité en source.", "→ Cafein, cited as a source.")}</p>
      </motion.div>
    </div>
  );
}

const STATS = {
  fr: [
    { big: <CountUp to={240} prefix="+" suffix="%" />, label: "Trafic organique en 6 mois" },
    { big: "Top 3", label: "15 mots-clés positionnés" },
    { big: <CountUp to={95} suffix="/100" />, label: "Score Lighthouse après audit" },
    { big: <CountUp to={4} suffix=" IA" />, label: "Sources qui citent nos clients" },
  ],
  en: [
    { big: <CountUp to={240} prefix="+" suffix="%" />, label: "Organic traffic in 6 months" },
    { big: "Top 3", label: "15 keywords ranked" },
    { big: <CountUp to={95} suffix="/100" />, label: "Lighthouse score after audit" },
    { big: <CountUp to={4} suffix=" AI" />, label: "Sources citing our clients" },
  ],
};

const PILLARS = {
  fr: [
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
  ],
  en: [
    {
      tag: "The foundation",
      title: "Classic SEO",
      desc: "In-depth work on your organic search to gain lasting visibility on Google.",
      points: [
        "Complete technical and semantic audit",
        "On-page optimisation (content, structure, internal linking)",
        "Content strategy targeted at your market",
        "Ranking and results tracking",
      ],
      bg: "bg-mint",
    },
    {
      tag: "The edge",
      title: "GEO: ranking for AI",
      desc: "An emerging discipline: optimising your presence to be cited in responses from generative AI.",
      points: [
        "Content structuring for AI engines",
        "Optimising your presence cited as a source",
        "Active monitoring of new GEO practices",
        "Few agencies in Luxembourg focus on this today",
      ],
      bg: "bg-caramel",
    },
  ],
};

const TIMELINE = {
  fr: [
    { m: "Mois 1-2", t: "Audit et fondations", d: "Analyse de l'existant, identification des priorités techniques et sémantiques, mise en place des bases." },
    { m: "Mois 3-5", t: "Production et optimisation", d: "Contenu optimisé, corrections techniques, structuration du contenu pour les moteurs IA." },
    { m: "Mois 6+", t: "Montée en puissance", d: "Les positions progressent, les citations dans les IA augmentent. Le référencement est un investissement qui croît dans le temps." },
  ],
  en: [
    { m: "Month 1-2", t: "Audit and foundations", d: "Analysis of what's already in place, identification of technical and semantic priorities, laying the groundwork." },
    { m: "Month 3-5", t: "Production and optimisation", d: "Optimised content, technical fixes, content structuring for AI engines." },
    { m: "Month 6+", t: "Gaining momentum", d: "Rankings climb, AI citations grow. SEO is an investment that keeps compounding over time." },
  ],
};

const FAQ = {
  fr: [
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
  ],
  en: [
    {
      q: "Does GEO replace SEO?",
      a: "No, it complements it. Good SEO practices remain the foundation: a technically clean site and clear content benefit both. GEO adds a specific layer of optimisation so that AIs identify you and cite you as a reliable source.",
    },
    {
      q: "How long before we see results?",
      a: "Generally expect 3 to 6 months for meaningful results on local keywords. Some technical optimisations kick in faster, and we track rankings together, month after month.",
    },
    {
      q: "Do we have to rebuild everything if the site already exists?",
      a: "Rarely. We start with an audit: in most cases, targeted optimisations (structure, content, technical) are enough. If the foundation is too fragile, we'll tell you honestly and quote both scenarios.",
    },
  ],
};

export default function SeoGeo() {
  const { lang } = useLang();
  const t = useT();
  return (
    <>
      <Seo
        title="Agence SEO & GEO au Luxembourg : référencement Google et IA | Cafein"
        titleEn="SEO & GEO Agency in Luxembourg: Google and AI Ranking | Cafein"
        description="Référencement naturel (SEO) et visibilité dans les IA (GEO) au Luxembourg : audit, optimisation technique, contenus et suivi des positions. Être trouvé sur Google comme dans ChatGPT."
        descriptionEn="Search engine optimization (SEO) and visibility in AI engines (GEO) in Luxembourg: audit, technical optimization, content and rank tracking. Get found on Google and in ChatGPT."
        path="/seo-geo"
        jsonLd={[
          serviceLd("SEO & GEO", "Référencement naturel Google et optimisation pour les moteurs IA (GEO) au Luxembourg.", "/seo-geo"),
          faqLd(lang === "en" ? FAQ.en : FAQ.fr),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "SEO & GEO", path: "/seo-geo" },
          ]),
        ]}
      />
      <PageHero
        n="02"
        tag="Rank #1"
        title={lang === "en"
          ? (<>Get found, by Google <span className="text-mint-dark">and by AI</span></>)
          : (<>Être trouvé, par Google <span className="text-mint-dark">comme par les IA</span></>)}
        subtitle={t(
          "Le référencement ne se limite plus à Google. Cafein travaille votre visibilité sur les moteurs de recherche classiques et sur les intelligences artificielles génératives (ChatGPT, Perplexity, Gemini...), qui deviennent une nouvelle porte d'entrée vers vos clients.",
          "Search is no longer limited to Google. Cafein works on your visibility across classic search engines and generative AIs (ChatGPT, Perplexity, Gemini...), which are becoming a new gateway to your clients."
        )}
      >
        <SerpDeco />
      </PageHero>

      {/* Stats : cartes autocollants sur fond espresso */}
      <section className="bg-espresso pb-24 border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STATS[lang].map((s, i) => {
            const bgs = ["bg-mint", "bg-caramel", "bg-sun", "bg-cream-2"];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 46, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 130, damping: 14 }}
                whileHover={{ y: -8, rotate: 0 }}
                className={`${bgs[i % 4]} rounded-3xl border-[3px] border-ink p-6 md:p-8 shadow-[6px_6px_0_rgba(31,206,138,0.35)] text-ink`}
              >
                <p className="font-display font-extrabold text-3xl md:text-4xl leading-none">{s.big}</p>
                <p className="mt-3 font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-ink/60 leading-relaxed">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Marquee words={["SEO", "GEO", "Google", "ChatGPT", "Perplexity"]} />

      {/* SEO + GEO */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-8">
          {PILLARS[lang].map((c, i) => (
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
            {t("Pourquoi les deux ensemble ?", "Why both together?")}
          </h3>
          <p className="mt-5 text-ink/70 font-medium text-lg leading-relaxed">
            {t(
              "De plus en plus de recherches passent par les assistants IA plutôt que par un moteur de recherche classique. Combiner SEO et GEO, c'est s'assurer d'être visible partout où vos clients cherchent une réponse, aujourd'hui et demain.",
              "More and more searches go through AI assistants rather than a classic search engine. Combining SEO and GEO means making sure you're visible everywhere your clients look for an answer, today and tomorrow."
            )}
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
            {lang === "en"
              ? (<>A <span className="text-mint">realistic</span> view of results</>)
              : (<>Une vision <span className="text-mint">réaliste</span> des résultats</>)}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TIMELINE[lang].map((s, i) => (
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

      <MiniFaq items={FAQ[lang]} />

      <Edito
        kicker={t("Le référencement, expliqué simplement", "SEO, explained simply")}
        title={lang === "en"
          ? (<>First on Google, <span className="squiggle">and cited by AI</span></>)
          : (<>Être premier sur Google, <span className="squiggle">et cité par les IA</span></>)}
        paragraphs={lang === "en"
          ? [
            <>Organic search in Luxembourg is a marathon, not a sprint: Google rewards sites that are technically clean, fast and rich with content that truly answers your clients' questions. That's exactly what we build, keyword by keyword, page by page, with transparent monthly ranking tracking.</>,
            <>And while everyone watches Google, a new gateway has opened: ChatGPT, Perplexity and Gemini now recommend businesses. GEO, the art of being cited as a source by AI, is still rare in Luxembourg, and it's precisely our specialty. Two engines, one visibility strategy.</>,
          ]
          : [
            <>Le référencement naturel au Luxembourg est une course de fond, pas un sprint : Google récompense les sites techniquement propres, rapides et riches d'un contenu qui répond vraiment aux questions de vos clients. C'est exactement ce qu'on construit, mot-clé par mot-clé, page par page, avec un suivi transparent de vos positions chaque mois.</>,
            <>Et pendant que tout le monde regarde Google, une nouvelle porte d'entrée s'est ouverte : ChatGPT, Perplexity et Gemini recommandent désormais des entreprises. Le GEO, l'art d'être cité comme source par les IA, est encore rare au Luxembourg, et c'est précisément notre spécialité. Deux moteurs, une seule stratégie de visibilité.</>,
          ]}
        links={[
          { to: "/notre-expertise/seo", label: "SEO" },
          { to: "/notre-expertise/geo-visibilite-ia", label: t("GEO & IA", "GEO & AI") },
          { to: "/notre-expertise/seo-local-luxembourg", label: t("SEO local Luxembourg", "Local SEO Luxembourg") },
          { to: "/lexique", label: t("Lexique du web", "Web glossary") },
        ]}
      />

      <CtaBand
        title={t("Envie d'améliorer votre visibilité ?", "Want to boost your visibility?")}
        sub={t("Parlons de votre situation actuelle et de vos objectifs.", "Let's talk about your current situation and your goals.")}
        label={t("Demander un audit", "Request an audit")}
      />
    </>
  );
}
