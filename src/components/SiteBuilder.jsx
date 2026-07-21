import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, Magnetic, ArrowUpRight, Spark } from "../lib/ui.jsx";
import { CountUp } from "./Stats.jsx";
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

/* Couleur d'un score PageSpeed selon les seuils officiels de Google :
   0-49 rouge, 50-89 orange, 90-100 vert. */
const scoreColor = (s) => (s == null ? "#8A857C" : s >= 90 ? "#1FCE8A" : s >= 50 ? "#F4A259" : "#E5623E");

/* Jauge circulaire animée pour un score /100 (fond sombre). */
function Gauge({ score, size = 128, label }) {
  const color = scoreColor(score);
  const r = size / 2 - 9;
  const C = 2 * Math.PI * r;
  const off = score == null ? C : C * (1 - score / 100);
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="7" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: off }}
            transition={{ duration: 1.3, delay: 0.15, ease: "easeOut" }}
          />
        </svg>
        <span
          className="absolute inset-0 grid place-items-center font-display font-extrabold text-cream"
          style={{ fontSize: size * 0.3 }}
        >
          {score == null ? "—" : <CountUp to={score} />}
        </span>
      </div>
      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream/60 text-center leading-tight">{label}</span>
    </div>
  );
}

/* ── Audit instantané : le visiteur tape son URL, on affiche son VRAI
   score PageSpeed (Google), puis on capture le lead avec ses chiffres.
   La meilleure démo possible pour une agence web/SEO. */
function AuditForm({ lang, t, businessName }) {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | scanning | result | error
  const [scores, setScores] = useState(null);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle"); // idle | sending | done
  const [leadErr, setLeadErr] = useState("");
  const [tick, setTick] = useState(0);

  const scanMsgs = [
    t("On mesure la vitesse de chargement…", "Measuring load speed…"),
    t("On inspecte la structure SEO…", "Inspecting SEO structure…"),
    t("On teste la version mobile…", "Testing the mobile version…"),
    t("On compile votre score…", "Compiling your score…"),
  ];

  useEffect(() => {
    if (phase !== "scanning") return;
    const id = setInterval(() => setTick((n) => n + 1), 2800);
    return () => clearInterval(id);
  }, [phase]);

  const analyze = async (e) => {
    e.preventDefault();
    if (phase === "scanning") return;
    if (!url.trim()) {
      setErr(t("Entrez l'adresse de votre site.", "Enter your site's address."));
      return;
    }
    setErr("");
    setTick(0);
    setPhase("scanning");
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setErr(data.detail || t("Analyse impossible pour le moment.", "Analysis unavailable right now."));
        setPhase("error");
        return;
      }
      setScores(data);
      setPhase("result");
    } catch {
      setErr(t("Connexion perdue. Réessayez.", "Connection lost. Try again."));
      setPhase("error");
    }
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (leadStatus === "sending") return;
    const mail = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      setLeadErr(t("Un email valide, s'il vous plaît.", "A valid email, please."));
      return;
    }
    setLeadErr("");
    setLeadStatus("sending");
    let host = scores.url;
    try { host = new URL(scores.url).hostname; } catch { /* garde l'URL brute */ }
    const who = businessName.trim() || host;
    const message =
      (lang === "en"
        ? `Detailed audit request from the live audit.\nSite: ${scores.url}\nMeasured scores (mobile) — Performance ${scores.performance}/100, SEO ${scores.seo}/100, Accessibility ${scores.accessibility}/100, Best practices ${scores.bestPractices}/100.\nBusiness: ${who}`
        : `Demande d'audit détaillé depuis l'audit instantané.\nSite : ${scores.url}\nScores mesurés (mobile) — Performance ${scores.performance}/100, SEO ${scores.seo}/100, Accessibilité ${scores.accessibility}/100, Bonnes pratiques ${scores.bestPractices}/100.\nEntreprise : ${who}`);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: `${host} — ${t("Audit", "Audit")}`, email: mail, message, lang }),
      });
      if (!r.ok) throw new Error("bad");
      setLeadStatus("done");
    } catch {
      setLeadErr(t("Envoi échoué. Écrivez-nous à hello@cafein.lu.", "Sending failed. Reach us at hello@cafein.lu."));
      setLeadStatus("idle");
    }
  };

  const reset = () => {
    setPhase("idle");
    setScores(null);
    setErr("");
  };

  const perf = scores?.performance;
  const verdict =
    perf == null
      ? { title: "", sub: "" }
      : perf < 50
        ? { title: t("Il y a du potentiel inexploité.", "There's untapped potential."), sub: t("Un site lent fait fuir les visiteurs et Google. Bonne nouvelle : c'est exactement ce qu'on redresse.", "A slow site loses visitors and Google. Good news: that's exactly what we fix.") }
        : perf < 90
          ? { title: t("Pas mal, mais on peut viser plus haut.", "Not bad, but we can aim higher."), sub: t("Quelques optimisations et vous passez dans le vert.", "A few optimisations and you're in the green.") }
          : { title: t("Déjà solide, bravo !", "Already solid, well done!"), sub: t("On peaufine les derniers détails et on sécurise le SEO.", "We polish the last details and lock in the SEO.") };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
      className="mt-16 rounded-[1.6rem] border-[3px] border-ink bg-espresso text-cream shadow-[10px_10px_0_#0A0F0D] overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 p-8 md:p-12 items-center">
        {/* colonne gauche : pitch */}
        <div>
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-mint">
            {t("Audit gratuit, en direct", "Free audit, live")}
          </span>
          <h3 className="mt-3 font-display font-extrabold text-2xl md:text-4xl leading-[1.02] tracking-tight">
            {t("Votre site vaut", "How does your site")}
            <br />
            <span className="text-mint">{t("combien sur Google ?", "score on Google?")}</span>
          </h3>
          <p className="mt-4 text-cream/70 font-medium leading-relaxed max-w-md">
            {t(
              "Tapez votre adresse : on interroge Google en direct et on affiche votre vrai score de performance et de référencement. Sans détour, sans rapport automatique bidon.",
              "Type your address: we query Google live and show your real performance and SEO score. No spin, no fake automated report.",
            )}
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40">
            {t("Mesuré par Google PageSpeed Insights", "Measured by Google PageSpeed Insights")}
          </p>
        </div>

        {/* colonne droite : panneau interactif */}
        <div>
          <AnimatePresence mode="wait">
            {/* ÉTAT 1 : saisie de l'URL */}
            {phase === "idle" && (
              <motion.form
                key="idle"
                onSubmit={analyze}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-3.5"
              >
                <label htmlFor="au-url" className="block font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-cream/50 mb-2">
                  {t("Adresse de votre site", "Your site's address")}
                </label>
                <input
                  id="au-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value.slice(0, 120))}
                  placeholder={t("votre-site.lu", "your-site.lu")}
                  className="w-full rounded-xl bg-espresso-2 border-2 border-cream/20 px-4 py-3.5 font-medium text-cream placeholder-cream/30 focus:outline-none focus:border-mint transition-colors"
                />
                {err && <p className="font-medium text-sm text-caramel">{err}</p>}
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-mint text-ink font-display font-bold text-base px-6 py-3.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
                >
                  {t("Analyser mon site", "Analyse my site")}
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </button>
                <p className="font-medium text-xs text-cream/45 text-center">
                  {t("Gratuit et instantané. L'analyse prend ~30 s.", "Free and instant. The scan takes ~30 s.")}
                </p>
              </motion.form>
            )}

            {/* ÉTAT 2 : analyse en cours */}
            {phase === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-2xl bg-espresso-2 border-2 border-cream/15 p-8 text-center"
              >
                <div className="relative w-16 h-16 mx-auto">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[3px] border-cream/15 border-t-mint"
                  />
                  <span className="absolute inset-0 grid place-items-center text-mint">☕</span>
                </div>
                <p className="mt-5 font-display font-bold text-lg text-cream">
                  {scanMsgs[tick % scanMsgs.length]}
                </p>
                <p className="mt-1.5 font-mono text-[11px] tracking-wide text-cream/45 break-all">{url.trim()}</p>
              </motion.div>
            )}

            {/* ÉTAT 3 : résultat + capture */}
            {phase === "result" && scores && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                {leadStatus === "done" ? (
                  <div className="rounded-2xl bg-espresso-2 border-2 border-mint/40 p-7 text-center">
                    <span className="grid place-items-center w-12 h-12 mx-auto rounded-full bg-mint text-ink">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l5 5L20 7" />
                      </svg>
                    </span>
                    <p className="mt-4 font-display font-extrabold text-xl text-cream">{t("C'est parti, merci !", "You're all set, thanks!")}</p>
                    <p className="mt-2 text-cream/65 font-medium text-sm">
                      {t("On analyse votre site en détail et on revient vers vous sous 48h avec un plan concret.", "We'll dig into your site and come back within 48h with a concrete plan.")}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-espresso-2 border-2 border-cream/15 p-6">
                    {/* score principal + secondaires */}
                    <div className="flex items-center gap-5">
                      <Gauge score={perf} size={116} label={t("Performance", "Performance")} />
                      <div className="flex-1">
                        <p className="font-display font-extrabold text-lg leading-tight text-cream">{verdict.title}</p>
                        <p className="mt-1.5 text-cream/65 font-medium text-sm leading-snug">{verdict.sub}</p>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cream/10 pt-5">
                      {[
                        { s: scores.seo, l: "SEO" },
                        { s: scores.accessibility, l: t("Accessib.", "Accessib.") },
                        { s: scores.bestPractices, l: t("Bonnes prat.", "Best pract.") },
                      ].map((g) => (
                        <div key={g.l} className="flex flex-col items-center gap-1">
                          <span className="font-display font-extrabold text-2xl" style={{ color: scoreColor(g.s) }}>
                            {g.s == null ? "—" : g.s}
                          </span>
                          <span className="font-mono text-[9px] tracking-wider uppercase text-cream/50">{g.l}</span>
                        </div>
                      ))}
                    </div>

                    {/* pitch + capture email */}
                    <div className="mt-5 rounded-xl bg-mint/10 border border-mint/25 p-4">
                      <p className="font-display font-bold text-mint text-sm">
                        {t("On peut vous emmener à 95+.", "We can take you to 95+.")}
                      </p>
                      <form onSubmit={submitLead} className="mt-3 flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value.slice(0, 120))}
                          placeholder={t("vous@entreprise.lu", "you@company.lu")}
                          className="flex-1 rounded-lg bg-espresso border-2 border-cream/20 px-3.5 py-2.5 text-sm font-medium text-cream placeholder-cream/30 focus:outline-none focus:border-mint transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={leadStatus === "sending"}
                          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg bg-mint text-ink font-display font-bold text-sm px-4 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform disabled:opacity-60"
                        >
                          {leadStatus === "sending" ? t("Envoi…", "Sending…") : t("Recevoir le plan", "Get the plan")}
                        </button>
                      </form>
                      {leadErr && <p className="mt-2 font-medium text-xs text-caramel">{leadErr}</p>}
                      <p className="mt-2 font-medium text-[11px] text-cream/40">
                        {t("Audit détaillé + recommandations. Gratuit, réponse sous 48h.", "Detailed audit + recommendations. Free, reply within 48h.")}
                      </p>
                    </div>

                    <button onClick={reset} className="mt-3 w-full font-mono text-[11px] tracking-wide uppercase text-cream/45 hover:text-mint transition-colors">
                      {t("↻ Analyser un autre site", "↻ Analyse another site")}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ÉTAT 4 : erreur */}
            {phase === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-2xl bg-espresso-2 border-2 border-caramel/40 p-7 text-center"
              >
                <p className="font-display font-bold text-lg text-cream">{t("Analyse impossible", "Analysis failed")}</p>
                <p className="mt-2 text-cream/65 font-medium text-sm">{err}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <button onClick={reset} className="rounded-full bg-mint text-ink font-display font-bold text-sm px-5 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform">
                    {t("Réessayer", "Try again")}
                  </button>
                  <a href={lang === "en" ? "/en/#contact" : "/#contact"} className="font-mono text-[11px] tracking-wide uppercase text-cream/50 hover:text-mint transition-colors">
                    {t("ou écrivez-nous directement", "or reach us directly")}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
