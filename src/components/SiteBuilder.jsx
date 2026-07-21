import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionLabel, Magnetic, ArrowUpRight, Spark } from "../lib/ui.jsx";
import { Link } from "../lib/link.jsx";
import { useT, useLang } from "../lib/lang.jsx";

/*
  « Votre site en direct » — le visiteur tape le nom de sa boîte, choisit un
  secteur et une couleur : un aperçu de SON site apparaît dans un navigateur,
  en temps réel. La preuve, avant même le premier échange.
*/

const SECTORS = [
  {
    id: "resto",
    fr: "Restaurant", en: "Restaurant",
    navFr: ["Accueil", "Menu", "Réserver"], navEn: ["Home", "Menu", "Book"],
    tagFr: "Une table vous attend.", tagEn: "A table is waiting for you.",
    subFr: "Cuisine maison, réservation en deux clics.", subEn: "Homemade food, book in two clicks.",
    ctaFr: "Réserver une table", ctaEn: "Book a table",
  },
  {
    id: "shop",
    fr: "Boutique", en: "Shop",
    navFr: ["Accueil", "Boutique", "Panier"], navEn: ["Home", "Shop", "Cart"],
    tagFr: "Ouvert 24h/24, sans rideau.", tagEn: "Open 24/7, no shutters.",
    subFr: "Vos produits en ligne, prêts à être commandés.", subEn: "Your products online, ready to order.",
    ctaFr: "Voir la boutique", ctaEn: "Visit the shop",
  },
  {
    id: "studio",
    fr: "Studio créatif", en: "Creative studio",
    navFr: ["Accueil", "Projets", "Contact"], navEn: ["Home", "Work", "Contact"],
    tagFr: "On donne vie à vos idées.", tagEn: "We bring your ideas to life.",
    subFr: "Un portfolio qui claque, pensé pour convertir.", subEn: "A striking portfolio, built to convert.",
    ctaFr: "Voir les projets", ctaEn: "See the work",
  },
  {
    id: "artisan",
    fr: "Artisan", en: "Craftsman",
    navFr: ["Accueil", "Savoir-faire", "Devis"], navEn: ["Home", "Craft", "Quote"],
    tagFr: "Un savoir-faire, à portée de clic.", tagEn: "Real craft, one click away.",
    subFr: "Vos réalisations mises en valeur, devis en ligne.", subEn: "Your work showcased, quotes online.",
    ctaFr: "Demander un devis", ctaEn: "Get a quote",
  },
  {
    id: "pro",
    fr: "Services pro", en: "Pro services",
    navFr: ["Accueil", "Services", "Rendez-vous"], navEn: ["Home", "Services", "Booking"],
    tagFr: "Votre expertise, enfin visible.", tagEn: "Your expertise, finally visible.",
    subFr: "Un site clair qui inspire confiance et prend des RDV.", subEn: "A clear site that builds trust and books meetings.",
    ctaFr: "Prendre rendez-vous", ctaEn: "Book a meeting",
  },
];

const COLORS = [
  { id: "mint", hex: "#1FCE8A" },
  { id: "caramel", hex: "#F4A259" },
  { id: "sun", hex: "#FFD166" },
  { id: "blue", hex: "#4F8DF7" },
  { id: "pink", hex: "#F26D9E" },
  { id: "violet", hex: "#8B7CF6" },
];

const EXAMPLES = ["Le Comptoir", "Studio Nova", "Fleur & Co", "Atelier Prieur", "Nordik", "Maison Belva"];

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 22) || "votre-marque";
}

/* Le mini-site rendu dans le navigateur, avec la couleur d'accent choisie */
function Preview({ name, sector, accent, lang }) {
  const nav = lang === "en" ? sector.navEn : sector.navFr;
  const tag = lang === "en" ? sector.tagEn : sector.tagFr;
  const sub = lang === "en" ? sector.subEn : sector.subFr;
  const cta = lang === "en" ? sector.ctaEn : sector.ctaFr;
  const initial = (name.trim()[0] || "•").toUpperCase();

  return (
    <div className="bg-white text-ink">
      {/* barre de nav du site aperçu */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="grid place-items-center w-6 h-6 rounded-lg text-white font-display font-extrabold text-xs shrink-0"
            style={{ backgroundColor: accent }}
          >
            {initial}
          </span>
          <span className="font-display font-extrabold text-sm truncate">{name}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-medium text-[11px] text-ink/55">
          {nav.slice(0, 2).map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span
            className="rounded-full px-3 py-1 text-white font-semibold text-[11px]"
            style={{ backgroundColor: accent }}
          >
            {nav[2]}
          </span>
        </div>
      </div>

      {/* hero du site aperçu */}
      <div className="px-5 py-7 md:px-7 md:py-9">
        <span
          className="inline-block rounded-full px-2.5 py-1 font-mono text-[9px] tracking-widest uppercase mb-3"
          style={{ backgroundColor: accent + "22", color: accent }}
        >
          {lang === "en" ? sector.en : sector.fr}
        </span>
        <h3 className="font-display font-extrabold text-xl md:text-3xl leading-[1.05] tracking-tight">
          {name}
          <span style={{ color: accent }}> — {tag}</span>
        </h3>
        <p className="mt-2.5 text-ink/55 font-medium text-xs md:text-sm max-w-sm">{sub}</p>
        <div className="mt-4 flex items-center gap-2.5">
          <motion.span
            key={accent + cta}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-white font-display font-bold text-xs md:text-sm shadow-sm"
            style={{ backgroundColor: accent }}
          >
            {cta}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.span>
          <span className="rounded-full px-4 py-2 border border-ink/15 font-semibold text-xs text-ink/60">
            {lang === "en" ? "Learn more" : "En savoir plus"}
          </span>
        </div>

        {/* 3 cartes déco */}
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-ink/10 p-2.5">
              <div className="w-6 h-6 rounded-md mb-2" style={{ backgroundColor: accent, opacity: 0.85 - i * 0.22 }} />
              <div className="h-1.5 rounded bg-ink/15 mb-1.5" />
              <div className="h-1.5 w-2/3 rounded bg-ink/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SiteBuilder() {
  const t = useT();
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [sectorId, setSectorId] = useState("resto");
  const [accent, setAccent] = useState("#1FCE8A");
  const [exIdx, setExIdx] = useState(0);

  const sector = useMemo(() => SECTORS.find((s) => s.id === sectorId) || SECTORS[0], [sectorId]);

  /* exemple qui tourne tant que le champ est vide → invite à taper */
  useEffect(() => {
    if (name) return;
    const id = setInterval(() => setExIdx((i) => (i + 1) % EXAMPLES.length), 2600);
    return () => clearInterval(id);
  }, [name]);

  const shown = name.trim() || EXAMPLES[exIdx];
  const slug = slugify(name.trim() || EXAMPLES[exIdx]);

  return (
    <section className="relative bg-cream py-24 md:py-32 overflow-hidden">
      {/* halo léger */}
      <div
        className="absolute -top-24 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: accent }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* colonne gauche : le pitch + les contrôles */}
        <div>
          <SectionLabel>{t("( Votre site, en direct )", "( Your site, live )")}</SectionLabel>
          <h2 className="mt-4 font-display font-extrabold text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] text-ink tracking-tight">
            {t("Voyez votre site", "See your site")}
            <br />
            <span className="squiggle">{t("en 10 secondes", "in 10 seconds")}</span>
          </h2>
          <p className="mt-5 text-lg text-ink/65 font-medium max-w-md leading-relaxed">
            {t(
              "Tapez le nom de votre entreprise, choisissez une ambiance. On s'occupe du reste, sous vos yeux.",
              "Type your business name, pick a vibe. We handle the rest, right in front of you.",
            )}
          </p>

          {/* champ nom */}
          <div className="mt-8">
            <label htmlFor="sb-name" className="block font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-ink/45 mb-2">
              {t("Nom de votre entreprise", "Your business name")}
            </label>
            <input
              id="sb-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 26))}
              placeholder={EXAMPLES[exIdx]}
              className="w-full rounded-2xl bg-white border-[3px] border-ink px-5 py-3.5 font-display font-bold text-lg text-ink placeholder-ink/30 shadow-[4px_4px_0_#0A0F0D] focus:outline-none focus:shadow-[6px_6px_0_#1FCE8A] transition-shadow"
            />
          </div>

          {/* secteur */}
          <div className="mt-6">
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-ink/45 mb-2.5">
              {t("Votre secteur", "Your field")}
            </p>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((s) => {
                const on = s.id === sectorId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSectorId(s.id)}
                    className={`rounded-full px-4 py-2 font-semibold text-sm border-2 border-ink transition-all ${
                      on ? "bg-ink text-cream shadow-[3px_3px_0_#1FCE8A]" : "bg-white text-ink hover:-translate-y-0.5"
                    }`}
                  >
                    {lang === "en" ? s.en : s.fr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* couleur */}
          <div className="mt-6">
            <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-ink/45 mb-2.5">
              {t("Votre couleur", "Your colour")}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {COLORS.map((c) => {
                const on = c.hex === accent;
                return (
                  <button
                    key={c.id}
                    onClick={() => setAccent(c.hex)}
                    aria-label={c.id}
                    className={`w-9 h-9 rounded-full border-[3px] border-ink transition-transform ${on ? "scale-110 shadow-[3px_3px_0_#0A0F0D]" : "hover:scale-105"}`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {on && <Spark className="w-4 h-4 text-white mx-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-9">
            <Magnetic strength={0.25}>
              <Link
                to="/#contact"
                data-cursor={t("Go !", "Go!")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-mint text-ink font-display font-bold text-lg px-7 py-3.5 border-[3px] border-ink shadow-[5px_5px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200"
              >
                {t("On le construit pour de vrai ?", "Shall we build it for real?")}
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </Magnetic>
            <p className="mt-3 font-medium text-sm text-ink/45">
              {t("Aperçu indicatif — le vôtre sera sur mesure.", "Indicative preview — yours will be bespoke.")}
            </p>
          </div>
        </div>

        {/* colonne droite : le navigateur avec l'aperçu en direct */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            whileHover={{ rotate: 0, scale: 1.015 }}
            className="rounded-[1.6rem] overflow-hidden border-[3px] border-ink bg-white shadow-[12px_12px_0_#0A0F0D]"
          >
            {/* chrome navigateur */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-espresso">
              <span className="w-2.5 h-2.5 rounded-full bg-caramel" />
              <span className="w-2.5 h-2.5 rounded-full bg-sun" />
              <span className="w-2.5 h-2.5 rounded-full bg-mint" />
              <div className="ml-3 flex-1">
                <div className="rounded-md bg-espresso-2 px-3 py-1 font-mono text-[10px] tracking-wider text-mint/90 truncate">
                  https://{slug}.lu
                </div>
              </div>
            </div>
            {/* l'aperçu */}
            <Preview name={shown} sector={sector} accent={accent} lang={lang} />
          </motion.div>

          {/* tampon "c'est vous !" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 12 }}
            className="absolute -top-4 -left-3 rounded-full bg-sun border-[3px] border-ink px-4 py-2 font-display font-extrabold text-ink text-sm shadow-[4px_4px_0_#0A0F0D]"
          >
            {t("c'est le vôtre !", "that's yours!")}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
