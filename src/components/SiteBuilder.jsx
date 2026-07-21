import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionLabel, Magnetic, ArrowUpRight, Spark } from "../lib/ui.jsx";
import { Link } from "../lib/link.jsx";
import { useT, useLang } from "../lib/lang.jsx";

/*
  « Imaginez votre site en direct » — le visiteur tape le nom de sa boîte,
  choisit un secteur, une couleur et une ambiance (clair / sombre) : un aperçu
  de SON site apparaît dans un navigateur, en temps réel. La preuve, avant même
  le premier échange.
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
  {
    id: "immo",
    fr: "Immobilier", en: "Real estate",
    navFr: ["Accueil", "Biens", "Estimer"], navEn: ["Home", "Listings", "Estimate"],
    tagFr: "Trouvez le bon toit.", tagEn: "Find the right roof.",
    subFr: "Vos biens mis en valeur, contacts qualifiés en ligne.", subEn: "Your listings showcased, qualified leads online.",
    ctaFr: "Voir les biens", ctaEn: "See listings",
  },
  {
    id: "beaute",
    fr: "Beauté & soins", en: "Beauty & care",
    navFr: ["Accueil", "Prestations", "Réserver"], navEn: ["Home", "Services", "Book"],
    tagFr: "Prenez soin de vous.", tagEn: "Take care of yourself.",
    subFr: "Prise de rendez-vous en ligne, en un instant.", subEn: "Online booking, in an instant.",
    ctaFr: "Prendre RDV", ctaEn: "Book now",
  },
  {
    id: "event",
    fr: "Événementiel", en: "Events",
    navFr: ["Accueil", "Événements", "Contact"], navEn: ["Home", "Events", "Contact"],
    tagFr: "Des moments inoubliables.", tagEn: "Unforgettable moments.",
    subFr: "Vos événements mis en scène, billetterie intégrée.", subEn: "Your events staged, ticketing built in.",
    ctaFr: "Voir l'agenda", ctaEn: "See the agenda",
  },
  {
    id: "tech",
    fr: "Startup tech", en: "Tech startup",
    navFr: ["Accueil", "Produit", "Démo"], navEn: ["Home", "Product", "Demo"],
    tagFr: "L'avenir, maintenant.", tagEn: "The future, now.",
    subFr: "Un produit clair, une promesse qui convertit.", subEn: "A clear product, a promise that converts.",
    ctaFr: "Demander une démo", ctaEn: "Request a demo",
  },
];

const COLORS = [
  { id: "mint", hex: "#1FCE8A" },
  { id: "caramel", hex: "#F4A259" },
  { id: "sun", hex: "#FFD166" },
  { id: "blue", hex: "#4F8DF7" },
  { id: "pink", hex: "#F26D9E" },
  { id: "violet", hex: "#8B7CF6" },
  { id: "red", hex: "#F2545B" },
  { id: "teal", hex: "#17BEBB" },
  { id: "lime", hex: "#8CC63F" },
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

/* Le mini-site rendu dans le navigateur, avec la couleur d'accent et
   l'ambiance (claire ou sombre) choisies. */
function Preview({ name, sector, accent, lang, theme = "light" }) {
  const dark = theme === "dark";
  const nav = lang === "en" ? sector.navEn : sector.navFr;
  const tag = lang === "en" ? sector.tagEn : sector.tagFr;
  const sub = lang === "en" ? sector.subEn : sector.subFr;
  const cta = lang === "en" ? sector.ctaEn : sector.ctaFr;
  const initial = (name.trim()[0] || "•").toUpperCase();

  const bg = dark ? "bg-[#12100E]" : "bg-white";
  const title = dark ? "text-cream" : "text-ink";
  const muted = dark ? "text-cream/55" : "text-ink/55";
  const line = dark ? "border-white/12" : "border-ink/10";
  const ghost = dark ? "text-cream/70 border-white/20" : "text-ink/60 border-ink/15";

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`${bg} ${title}`}
    >
      {/* barre de nav du site aperçu */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${line}`}>
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="grid place-items-center w-6 h-6 rounded-lg text-white font-display font-extrabold text-xs shrink-0"
            style={{ backgroundColor: accent }}
          >
            {initial}
          </span>
          <span className="font-display font-extrabold text-sm truncate">{name}</span>
        </div>
        <div className={`hidden sm:flex items-center gap-3 font-medium text-[11px] ${muted}`}>
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
          <span className="block" style={{ color: accent }}>{tag}</span>
        </h3>
        <p className={`mt-2.5 font-medium text-xs md:text-sm max-w-sm ${muted}`}>{sub}</p>
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
          <span className={`rounded-full px-4 py-2 border font-semibold text-xs ${ghost}`}>
            {lang === "en" ? "Learn more" : "En savoir plus"}
          </span>
        </div>

        {/* 3 cartes déco */}
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-xl border p-2.5 ${line}`}>
              <div className="w-6 h-6 rounded-md mb-2" style={{ backgroundColor: accent, opacity: 0.85 - i * 0.22 }} />
              <div className={`h-1.5 rounded mb-1.5 ${dark ? "bg-white/20" : "bg-ink/15"}`} />
              <div className={`h-1.5 w-2/3 rounded ${dark ? "bg-white/12" : "bg-ink/10"}`} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Lead-capture honnête : on audite le VRAI site du visiteur ─────
   Pas de maquette auto envoyée par email (ça sonnerait faux). On offre
   un vrai regard d'expert sur le site existant, et on capture l'email
   au moment où l'intention est la plus forte. Passe par /api/contact. */
function AuditForm({ lang, t, businessName }) {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const mail = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      setErr(t("Un email valide, s'il vous plaît.", "A valid email, please."));
      return;
    }
    setErr("");
    setStatus("sending");
    const site = url.trim() || t("(non précisé)", "(not provided)");
    const who = businessName.trim() || t("Visiteur du site", "Site visitor");
    const message =
      (lang === "en"
        ? `Free audit request from the SiteBuilder.\nCurrent website: ${site}\nBusiness: ${who}`
        : `Demande d'audit gratuit depuis le SiteBuilder.\nSite actuel : ${site}\nEntreprise : ${who}`);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: `${who} — ${t("Audit", "Audit")}`, email: mail, message, lang }),
      });
      if (!r.ok) throw new Error("bad");
      setStatus("done");
    } catch {
      setStatus("error");
      setErr(t("Oups, l'envoi a échoué. Écrivez-nous à hello@cafein.lu.", "Oops, sending failed. Reach us at hello@cafein.lu."));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
      className="mt-16 rounded-[1.6rem] border-[3px] border-ink bg-espresso text-cream shadow-[10px_10px_0_#0A0F0D] overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 p-8 md:p-12 items-center">
        <div>
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-mint">
            {t("Vous avez déjà un site ?", "Already have a site?")}
          </span>
          <h3 className="mt-3 font-display font-extrabold text-2xl md:text-4xl leading-[1.02] tracking-tight">
            {t("On l'audite. Gratuitement,", "We'll audit it. Free,")}
            <br />
            <span className="text-mint">{t("et franchement.", "and honestly.")}</span>
          </h3>
          <p className="mt-4 text-cream/70 font-medium leading-relaxed max-w-md">
            {t(
              "On regarde la vitesse, le référencement et la version mobile, et on vous dit sans détour ce qui mérite d'être gardé, corrigé ou refait. Un vrai retour d'humain, pas un rapport automatique.",
              "We look at speed, search ranking and the mobile version, then tell you straight what's worth keeping, fixing or rebuilding. A real human take, not an automated report.",
            )}
          </p>
        </div>

        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-espresso-2 border-2 border-mint/40 p-7 text-center"
          >
            <span className="grid place-items-center w-12 h-12 mx-auto rounded-full bg-mint text-ink">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l5 5L20 7" />
              </svg>
            </span>
            <p className="mt-4 font-display font-extrabold text-xl text-cream">
              {t("C'est noté, merci !", "Got it, thanks!")}
            </p>
            <p className="mt-2 text-cream/65 font-medium text-sm">
              {t("On regarde votre site et on revient vers vous sous 48h avec un retour franc.", "We'll look at your site and get back to you within 48h with honest feedback.")}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5">
            <div>
              <label htmlFor="au-url" className="block font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-cream/50 mb-2">
                {t("Adresse de votre site", "Your site's address")}
              </label>
              <input
                id="au-url"
                value={url}
                onChange={(e) => setUrl(e.target.value.slice(0, 120))}
                placeholder={t("votre-site.lu", "your-site.lu")}
                className="w-full rounded-xl bg-espresso-2 border-2 border-cream/20 px-4 py-3 font-medium text-cream placeholder-cream/30 focus:outline-none focus:border-mint transition-colors"
              />
            </div>
            <div>
              <label htmlFor="au-email" className="block font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-cream/50 mb-2">
                {t("Votre email", "Your email")}
              </label>
              <input
                id="au-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 120))}
                placeholder={t("vous@entreprise.lu", "you@company.lu")}
                className="w-full rounded-xl bg-espresso-2 border-2 border-cream/20 px-4 py-3 font-medium text-cream placeholder-cream/30 focus:outline-none focus:border-mint transition-colors"
              />
            </div>
            {err && <p className="font-medium text-sm text-caramel">{err}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-mint text-ink font-display font-bold text-base px-6 py-3.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 disabled:opacity-60"
            >
              {status === "sending" ? t("Envoi…", "Sending…") : t("Recevoir mon audit", "Get my audit")}
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <p className="font-medium text-xs text-cream/45 text-center">
              {t("Gratuit, sans engagement. Réponse sous 48h.", "Free, no strings. Reply within 48h.")}
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}

export default function SiteBuilder() {
  const t = useT();
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [sectorId, setSectorId] = useState("resto");
  const [accent, setAccent] = useState("#1FCE8A");
  const [theme, setTheme] = useState("light");
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
      {/* lueur très diffuse, cachée derrière la maquette : donne un peu de
          couleur sans créer de bande qui découpe la section */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full blur-[130px] pointer-events-none opacity-[0.09]"
        style={{ backgroundColor: accent }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* colonne gauche : le pitch + les contrôles */}
        <div>
          <SectionLabel>{t("( Votre site, en direct )", "( Your site, live )")}</SectionLabel>
          <h2 className="mt-4 font-display font-extrabold text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] text-ink tracking-tight">
            {t("Imaginez votre site", "Imagine your site")}
            <br />
            <span className="squiggle">{t("en 10 secondes", "in 10 seconds")}</span>
          </h2>
          <p className="mt-5 text-lg text-ink/65 font-medium max-w-md leading-relaxed">
            {t(
              "Tapez le nom de votre entreprise, choisissez une ambiance : un aperçu prend vie en direct. Juste un avant-goût. Votre vrai site ira bien plus loin.",
              "Type your business name, pick a vibe: a preview comes to life instantly. Just a taste. Your real site will go much further.",
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

          {/* couleur + ambiance */}
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-ink/45 mb-2.5">
                {t("Votre couleur", "Your colour")}
              </p>
              <div className="flex flex-wrap gap-2.5 max-w-[16rem]">
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

            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-ink/45 mb-2.5">
                {t("Ambiance", "Vibe")}
              </p>
              <div className="inline-flex rounded-full border-2 border-ink overflow-hidden shadow-[3px_3px_0_#0A0F0D]">
                {[
                  { id: "light", fr: "Clair", en: "Light" },
                  { id: "dark", fr: "Sombre", en: "Dark" },
                ].map((th) => {
                  const on = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`px-4 py-2 font-semibold text-sm transition-colors ${
                        on ? "bg-ink text-cream" : "bg-white text-ink hover:bg-cream-2"
                      }`}
                    >
                      {lang === "en" ? th.en : th.fr}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-9">
            <Magnetic strength={0.25}>
              <Link
                to="/#contact"
                data-hiss
                data-cursor={t("Go !", "Go!")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-mint text-ink font-display font-bold text-lg px-7 py-3.5 border-[3px] border-ink shadow-[5px_5px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200"
              >
                {t("On le construit pour de vrai ?", "Shall we build it for real?")}
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </Magnetic>
            <p className="mt-3 font-medium text-sm text-ink/45">
              {t("Aperçu indicatif. Le vôtre sera sur mesure.", "Indicative preview. Yours will be bespoke.")}
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
            <Preview name={shown} sector={sector} accent={accent} lang={lang} theme={theme} />
          </motion.div>

          {/* tampon "bientôt le vôtre" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 12 }}
            className="absolute -top-4 -left-3 rounded-full bg-sun border-[3px] border-ink px-4 py-2 font-display font-extrabold text-ink text-sm shadow-[4px_4px_0_#0A0F0D]"
          >
            {t("bientôt le vôtre", "yours soon")}
          </motion.div>
        </div>
      </div>

      {/* Lead-capture : on audite le vrai site du visiteur */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <AuditForm lang={lang} t={t} businessName={name} />
      </div>
    </section>
  );
}
