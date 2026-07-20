import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { PageHero, CtaBand, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { Spark, Bean, ArrowUpRight } from "../lib/ui.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";
import { useT, useLang } from "../lib/lang.jsx";
import Seo, { SITE, breadcrumbLd } from "../lib/seo.jsx";

/* ── Avatars illustrés : trois tasses, trois caractères ───────── */
function AvatarStan({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {/* soucoupe */}
      <ellipse cx="100" cy="168" rx="62" ry="12" fill="#141A17" opacity="0.12" />
      {/* tasse */}
      <path d="M52 78 h96 v46 a48 34 0 0 1 -96 0 z" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      <path d="M148 88 h14 a16 16 0 0 1 0 32 h-16" fill="none" stroke="#141A17" strokeWidth="6" strokeLinecap="round" />
      {/* mousse */}
      <path d="M50 78 q10 -12 25 -6 q8 -10 25 -6 q14 -8 25 2 q14 -4 23 10 z" fill="#F5EFE2" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* lunettes rondes */}
      <circle cx="82" cy="112" r="12" fill="#fff" stroke="#141A17" strokeWidth="5" />
      <circle cx="118" cy="112" r="12" fill="#fff" stroke="#141A17" strokeWidth="5" />
      <line x1="94" y1="112" x2="106" y2="112" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      <circle cx="82" cy="112" r="3.5" fill="#141A17" />
      <circle cx="118" cy="112" r="3.5" fill="#141A17" />
      {/* sourire */}
      <path d="M88 136 q12 10 24 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      {/* vapeur */}
      <path d="M84 52 q6 -8 0 -16" fill="none" stroke="#17A46E" strokeWidth="5" strokeLinecap="round" />
      <path d="M106 48 q7 -9 0 -19" fill="none" stroke="#17A46E" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function AvatarPinoo({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <ellipse cx="100" cy="170" rx="58" ry="11" fill="#141A17" opacity="0.12" />
      {/* gobelet to-go */}
      <path d="M62 74 l10 88 a8 8 0 0 0 8 7 h40 a8 8 0 0 0 8 -7 l10 -88 z" fill="#F4A259" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* manchon */}
      <path d="M66 106 l68 0 l-3 26 l-62 0 z" fill="#F5EFE2" stroke="#141A17" strokeWidth="5" strokeLinejoin="round" />
      {/* couvercle + casquette */}
      <rect x="56" y="62" width="88" height="14" rx="7" fill="#141A17" />
      <path d="M64 62 q36 -26 72 0 z" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      <path d="M128 56 q26 -4 30 8 l-24 4" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* clin d'œil */}
      <circle cx="86" cy="118" r="3.5" fill="#141A17" />
      <path d="M108 116 q6 4 12 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      {/* grand sourire */}
      <path d="M84 138 q16 12 32 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function AvatarFlo({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <ellipse cx="100" cy="170" rx="58" ry="11" fill="#141A17" opacity="0.12" />
      {/* verre latte */}
      <path d="M66 64 h68 l-8 96 a10 10 0 0 1 -10 9 h-32 a10 10 0 0 1 -10 -9 z" fill="#FFD166" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      <path d="M70 90 h60" stroke="#F5EFE2" strokeWidth="14" strokeLinecap="round" />
      {/* paille */}
      <path d="M116 20 l10 4 -14 44" fill="none" stroke="#17A46E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* casque audio */}
      <path d="M64 110 a36 36 0 0 1 72 0" fill="none" stroke="#141A17" strokeWidth="7" strokeLinecap="round" />
      <rect x="58" y="104" width="14" height="24" rx="7" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      <rect x="128" y="104" width="14" height="24" rx="7" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      {/* yeux + sourire */}
      <circle cx="88" cy="122" r="3.5" fill="#141A17" />
      <circle cx="112" cy="122" r="3.5" fill="#141A17" />
      <path d="M88 140 q12 10 24 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Les trois cofondateurs ───────────────────────────────────── */
const TEAM = [
  {
    id: "stan",
    name: "Stanislas",
    aka: "Stan",
    role: "Cofondateur",
    roleEn: "Co-founder",
    Avatar: AvatarStan,
    bg: "bg-mint",
    shadow: "#1FCE8A",
    bio: "Le stratège de la bande : il cadre les projets, garde le cap et transforme vos idées en plan d'action concret. Rien ne sort de la machine sans son œil exigeant.",
    bioEn: "The strategist of the group: he frames projects, keeps them on course and turns your ideas into a concrete action plan. Nothing leaves the machine without his demanding eye.",
    skills: ["Stratégie & clients", "Créa & design", "Développement web", "SEO"],
    skillsEn: ["Strategy & clients", "Design & creative", "Web development", "SEO"],
    fun: "Serré, sans sucre. Comme ses plannings.",
    funEn: "Espresso, no sugar. Just like his schedules.",
  },
  {
    id: "pinoo",
    name: "Jérôme",
    aka: "Pinoo",
    role: "Cofondateur",
    roleEn: "Co-founder",
    Avatar: AvatarPinoo,
    bg: "bg-caramel",
    shadow: "#F4A259",
    bio: "Toujours entre deux idées et trois écrans : il pilote la relation client, construit les sites et veille à ce que chaque projet convertisse. L'énergie de l'agence, c'est lui.",
    bioEn: "Always between two ideas and three screens: he leads the client relationship, builds the sites and makes sure every project converts. He's the energy of the agency.",
    skills: ["Stratégie & clients", "Développement web", "SEO", "Créa & design"],
    skillsEn: ["Strategy & clients", "Web development", "SEO", "Design & creative"],
    fun: "Double shot, à emporter. Il y a des sites à livrer.",
    funEn: "Double shot, to go. There are sites to ship.",
  },
  {
    id: "flo",
    name: "Florian",
    aka: "Flo",
    role: "Cofondateur",
    roleEn: "Co-founder",
    Avatar: AvatarFlo,
    bg: "bg-sun",
    shadow: "#FFD166",
    bio: "L'œil créatif : identités, visuels, réseaux sociaux, il donne à chaque marque un style qu'on reconnaît au premier regard. Et un feed dont on n'a pas honte.",
    bioEn: "The creative eye: identities, visuals, social media, he gives every brand a style you recognise at first glance. And a feed you're not ashamed of.",
    skills: ["Créa & design", "Social media", "Développement web", "SEO"],
    skillsEn: ["Design & creative", "Social media", "Web development", "SEO"],
    fun: "Latte art, évidemment. Le beau, jusque dans la tasse.",
    funEn: "Latte art, of course. Beauty, right down to the cup.",
  },
];

/* ── Carte membre avec tilt 3D ────────────────────────────────── */
function TeamCard({ m, i }) {
  const eggSpeed = useEggSpeed();
  const t = useT();
  const { lang } = useLang();
  const role = lang === "en" ? m.roleEn : m.role;
  const bio = lang === "en" ? m.bioEn : m.bio;
  const skills = lang === "en" ? m.skillsEn : m.skills;
  const fun = lang === "en" ? m.funEn : m.fun;
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 0 : i % 2 ? 1 : -1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.12, type: "spring", stiffness: 110, damping: 17 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="group relative rounded-3xl bg-white border-[3px] border-ink p-6 pb-7 shadow-[8px_8px_0_#0A0F0D] transition-shadow duration-300"
      whileHover={{ boxShadow: `12px 12px 0 ${m.shadow}` }}
    >
      {/* avatar */}
      <div className={`relative rounded-2xl ${m.bg}/25 border-[3px] border-ink overflow-hidden`}>
        <motion.div
          whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }}
          className="px-10 pt-6 pb-2"
        >
          <m.Avatar />
        </motion.div>
        <motion.span
          animate={{ rotate: [0, 14, -14, 0] }}
          transition={{ repeat: Infinity, duration: (4 + i) / eggSpeed }}
          className="absolute top-3 right-3"
        >
          <Bean className="w-7 h-7" fill={m.shadow} />
        </motion.span>
      </div>

      {/* identité */}
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-ink leading-none">
            {m.name} <span className="text-mint-dark">« {m.aka} »</span>
          </h2>
          <p className="mt-2 font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-ink/50">{role}</p>
        </div>
        <span className="grid place-items-center w-10 h-10 rounded-full bg-espresso text-mint font-display font-extrabold text-sm shrink-0">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-4 text-ink/75 font-medium leading-relaxed text-sm md:text-base">{bio}</p>

      {/* casquettes */}
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((s, j) => (
          <motion.span
            key={s}
            initial={{ scale: 0, rotate: -6 }}
            whileInView={{ scale: 1, rotate: j % 2 ? 1.5 : -1.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + j * 0.07, type: "spring", stiffness: 260, damping: 15 }}
            className="rounded-full bg-cream-2 border-2 border-ink px-3 py-1.5 font-display font-bold text-xs text-ink"
          >
            {s}
          </motion.span>
        ))}
      </div>

      {/* commande au comptoir */}
      <div className="mt-5 rounded-2xl bg-espresso px-4 py-3.5">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-mint mb-1.5">{t("Sa commande", "Their order")}</p>
        <p className="text-cream/85 font-medium text-sm leading-relaxed">{fun}</p>
      </div>
    </motion.article>
  );
}

export default function Equipe() {
  const eggSpeed = useEggSpeed();
  const t = useT();
  const { lang } = useLang();
  const values = lang === "en"
    ? [
        { t: "A short circuit", d: "The person who answers you is the one who designs, develops and optimises. No broken telephone, quick decisions." },
        { t: "Three views on every project", d: "Strategy, tech and creative review each other: your site benefits from all three areas of expertise, not just one." },
        { t: "A team that stays", d: "The same people from the first coffee to the monthly follow-up. We build relationships, not tickets." },
      ]
    : [
        { t: "Un circuit court", d: "Celui qui vous répond est celui qui conçoit, développe et optimise. Zéro téléphone arabe, des décisions rapides." },
        { t: "Trois regards sur chaque projet", d: "Stratégie, technique et créa se relisent mutuellement : votre site profite des trois expertises, pas d'une seule." },
        { t: "Une équipe qui reste", d: "Les mêmes interlocuteurs du premier café au suivi mensuel. On construit des relations, pas des tickets." },
      ];
  return (
    <>
      <Seo
        title="L'équipe Cafein : trois cofondateurs, un percolateur | Agence web Luxembourg"
        titleEn="The Cafein Team: Three Cofounders, One Coffee Machine | Web Agency Luxembourg"
        description="Stan, Pinoo et Flo : les trois cofondateurs de Cafein, agence web au Luxembourg. Stratégie, création de sites, SEO et communication, une équipe resserrée qui s'occupe de tout."
        descriptionEn="Stan, Pinoo and Flo: the three cofounders of Cafein, a web agency in Luxembourg. Strategy, website design, SEO and communication, a tight-knit team that handles everything."
        path="/equipe"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "L'équipe Cafein",
            url: SITE + "/equipe",
            about: { "@id": SITE + "/#cafein" },
          },
          ...TEAM.map((m) => ({
            "@context": "https://schema.org",
            "@type": "Person",
            name: m.name,
            alternateName: m.aka,
            jobTitle: "Cofondateur",
            worksFor: { "@id": SITE + "/#cafein" },
          })),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "L'équipe", path: "/equipe" },
          ]),
        ]}
      />
      <PageHero
        n="☕"
        tag={t("L'équipe", "The team")}
        title={lang === "en"
          ? (<>Three co-founders, <span className="text-mint-dark">one coffee machine</span></>)
          : (<>Trois cofondateurs, <span className="text-mint-dark">un seul percolateur</span></>)}
        subtitle={t(
          "Stan, Pinoo et Flo : trois profils complémentaires qui partagent la même machine à café et la même obsession, des projets web qui rapportent vraiment à leurs clients.",
          "Stan, Pinoo and Flo: three complementary profiles who share the same coffee machine and the same obsession, web projects that truly pay off for their clients."
        )}
      >
        {/* pile d'avatars façon photomaton */}
        <div className="relative select-none" aria-hidden>
          <div className="grid grid-cols-3 gap-3 items-end">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 6 : -6 }}
                animate={{ opacity: 1, y: 0, rotate: i === 1 ? -2 : i % 2 ? 3 : 2 }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 140, damping: 13 }}
                whileHover={{ y: -10, rotate: 0 }}
                className={`rounded-2xl ${m.bg}/30 border-[3px] border-ink p-3 bg-white shadow-[5px_5px_0_#0A0F0D]`}
              >
                <m.Avatar />
                <p className="mt-2 text-center font-display font-extrabold text-sm text-ink">{m.aka}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            animate={{ rotate: [0, 14, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5 / eggSpeed }}
            className="absolute -top-6 -right-4"
          >
            <Spark className="w-9 h-9 text-mint-dark" />
          </motion.div>
        </div>
      </PageHero>

      <Marquee words={["Stan", "Pinoo", "Flo", "Cofondateurs", "Luxembourg"]} />

      {/* Les cartes membres */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight"
          >
            {lang === "en" ? (<>The full <span className="squiggle">crew</span></>) : (<>La brigade, <span className="squiggle">au complet</span></>)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-ink/70 font-medium max-w-2xl"
          >
            {t(
              "Pas de commerciaux qui disparaissent après signature, pas d'intermédiaires : vous parlez directement à ceux qui font le travail.",
              "No sales reps who vanish after signing, no middlemen: you talk directly to the people who do the work."
            )}
          </motion.p>
          <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
            {TEAM.map((m, i) => (
              <TeamCard key={m.id} m={m} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ce que ça change pour vous */}
      <section className="bg-espresso py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-mint"
          >
            {t("( Ce que ça change pour vous )", "( What it means for you )")}
          </motion.p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border-[3px] border-mint/40 bg-espresso-2/70 p-7 shadow-[5px_5px_0_rgba(31,206,138,0.35)]"
              >
                <p className="font-display font-extrabold text-4xl text-mint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display font-extrabold text-xl text-cream">{v.t}</h3>
                <p className="mt-3 text-cream/60 font-medium leading-relaxed text-sm">{v.d}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              to="/notre-expertise"
              data-cursor={t("Découvrir", "Discover")}
              className="inline-flex items-center gap-2 font-display font-bold text-mint hover:gap-3 transition-all"
            >
              {t("Voir tout ce qu'on sait faire", "See everything we do")} <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Edito
        kicker={t("Une équipe, pas une usine", "A team, not a factory")}
        title={lang === "en"
          ? (<>Small team, <span className="squiggle">big attention</span></>)
          : (<>Petite équipe, <span className="squiggle">grande attention</span></>)}
        paragraphs={[
          lang === "en"
            ? (<>Choosing a web agency in Luxembourg means first choosing people. At Cafein, you work directly with the three co-founders: the ones who listen to your needs are the ones who design your site, work on your SEO and run your communication. This closeness is how we guarantee quality, from the first meeting to tracking the results.</>)
            : (<>Choisir une agence web au Luxembourg, c'est d'abord choisir des personnes. Chez Cafein, vous travaillez directement avec les trois cofondateurs : ceux qui écoutent votre besoin sont ceux qui conçoivent votre site, travaillent votre référencement et animent votre communication. Cette proximité, c'est notre façon de garantir la qualité, du premier rendez-vous au suivi des résultats.</>),
        ]}
        links={[
          { to: "/notre-expertise", label: t("Nos 12 expertises", "Our 12 areas of expertise") },
          { to: "/#realisations", label: t("Nos réalisations", "Our work") },
        ]}
      />

      <CtaBand
        title={t("Venez rencontrer la brigade", "Come meet the crew")}
        sub={t("Premier échange autour d'un café, conseils francs, devis sans engagement.", "A first chat over a coffee, honest advice, a no-commitment quote.")}
        label={t("Prendre rendez-vous", "Book a meeting")}
      />
    </>
  );
}
