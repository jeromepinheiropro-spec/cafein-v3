import React from "react";
import { motion } from "framer-motion";
import { PageHero, CtaBand, MiniFaq, Steps, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { Spark } from "../lib/ui.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";
import Seo, { faqLd, serviceLd, breadcrumbLd } from "../lib/seo.jsx";

/* Mockup navigateur animé : le site se construit en boucle sous vos yeux */
function BrowserDeco() {
  const eggSpeed = useEggSpeed();
  const D = 8 / eggSpeed; // durée d'un cycle complet

  /* aide : élément qui "pop" à t0, reste, puis disparaît pour la boucle */
  const pop = (t0) => ({
    initial: false,
    animate: { opacity: [0, 1, 1, 0], scale: [0.4, 1.08, 1, 0.6], y: [14, 0, 0, 8] },
    transition: { duration: D, times: [t0, Math.min(t0 + 0.05, 1), 0.93, 1], repeat: Infinity, ease: "easeOut" },
  });
  const grow = (t0) => ({
    initial: false,
    animate: { opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 0] },
    transition: { duration: D, times: [t0, Math.min(t0 + 0.07, 1), 0.93, 1], repeat: Infinity, ease: "easeOut" },
  });

  return (
    <div className="relative select-none" aria-hidden>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
        transition={{ type: "spring", stiffness: 110, damping: 16 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className="rounded-3xl overflow-hidden border-[3px] border-ink bg-espresso-2 shadow-[10px_10px_0_#0A0F0D]"
      >
        {/* barre du navigateur */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-espresso border-b-[3px] border-ink">
          <span className="w-2.5 h-2.5 rounded-full bg-caramel" />
          <span className="w-2.5 h-2.5 rounded-full bg-sun" />
          <span className="w-2.5 h-2.5 rounded-full bg-mint" />
          <div className="ml-3 overflow-hidden">
            <motion.span
              animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }}
              transition={{ duration: D, times: [0.02, 0.14, 0.95, 1], repeat: Infinity, ease: "linear" }}
              className="inline-block font-mono text-[10px] tracking-widest text-mint uppercase"
            >
              https://votre-site.lu
            </motion.span>
          </div>
        </div>

        {/* la page qui se construit */}
        <div className="p-6 space-y-3 relative">
          <motion.div {...grow(0.14)} className="h-8 w-2/3 rounded-lg bg-cream/90 origin-left" />
          <motion.div {...grow(0.2)} className="h-3 w-full rounded bg-cream/20 origin-left" />
          <motion.div {...grow(0.24)} className="h-3 w-4/5 rounded bg-cream/20 origin-left" />
          <div className="flex gap-2 pt-2">
            <motion.div
              animate={{
                opacity: [0, 1, 1, 1, 1, 0],
                scale: [0.4, 1.08, 1, 0.85, 1.12, 0.6],
              }}
              transition={{ duration: D, times: [0.3, 0.35, 0.44, 0.47, 0.51, 1], repeat: Infinity, ease: "easeOut" }}
              className="h-9 w-28 rounded-full bg-mint"
            />
            <motion.div {...pop(0.34)} className="h-9 w-28 rounded-full border-2 border-cream/30" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {["bg-mint/30", "bg-caramel/30", "bg-sun/30"].map((c, i) => (
              <motion.div key={c} {...pop(0.52 + i * 0.05)} className={`h-16 rounded-lg ${c}`} />
            ))}
          </div>

          {/* curseur qui construit la page */}
          <motion.svg
            viewBox="0 0 24 24"
            animate={{
              opacity: [0, 1, 1, 1, 1, 0],
              x: [230, 90, 60, 60, 200, 260],
              y: [-20, -60, 36, 36, 84, 110],
              scale: [1, 1, 1, 0.8, 1, 1],
            }}
            transition={{ duration: D, times: [0.26, 0.34, 0.44, 0.47, 0.58, 0.68], repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 w-6 h-6 drop-shadow-md pointer-events-none"
          >
            <path d="M5 3l14 8-6 1.5L10 19z" fill="#F5EFE2" stroke="#141A17" strokeWidth="1.6" strokeLinejoin="round" />
          </motion.svg>
        </div>
      </motion.div>

      {/* tampon "EN LIGNE !" qui claque à la fin du cycle */}
      <motion.div
        animate={{ opacity: [0, 1, 1, 0], scale: [2.2, 1, 1, 0.7], rotate: [-18, -8, -8, 0] }}
        transition={{ duration: D, times: [0.7, 0.74, 0.92, 0.97], repeat: Infinity, ease: "easeOut" }}
        className="absolute -top-5 -right-3 rounded-full bg-sun border-[3px] border-ink px-4 py-2 font-display font-extrabold text-ink text-sm shadow-[4px_4px_0_#0A0F0D]"
      >
        EN LIGNE !
      </motion.div>

      {/* étincelles au moment du tampon */}
      {[
        { x: "-right-6", y: "top-8", d: 0.72 },
        { x: "right-16", y: "-top-8", d: 0.75 },
      ].map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], rotate: [0, 90, 180] }}
          transition={{ duration: D, times: [s.d, s.d + 0.06, s.d + 0.14], repeat: Infinity }}
          className={`absolute ${s.x} ${s.y}`}
        >
          <Spark className="w-6 h-6 text-mint-dark" />
        </motion.span>
      ))}

      {/* chips flottantes autour de la fenêtre */}
      {[
        { label: "Responsive", cls: "-left-4 -bottom-5 bg-mint", delay: 0 },
        { label: "Rapide", cls: "left-28 -bottom-8 bg-caramel", delay: 0.6 },
        { label: "SEO ready", cls: "-right-3 -bottom-6 bg-cream-2", delay: 1.2 },
      ].map((c) => (
        <motion.span
          key={c.label}
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
          transition={{
            opacity: { delay: 0.8 + c.delay, duration: 0.4 },
            scale: { delay: 0.8 + c.delay, type: "spring", stiffness: 260, damping: 14 },
            y: { delay: 1.2 + c.delay, repeat: Infinity, duration: 3.2 / eggSpeed, ease: "easeInOut" },
          }}
          className={`absolute ${c.cls} rounded-full border-[3px] border-ink px-4 py-1.5 font-display font-bold text-xs text-ink shadow-[3px_3px_0_#0A0F0D]`}
        >
          {c.label}
        </motion.span>
      ))}
    </div>
  );
}

const TYPES = [
  { n: "01", t: "Site vitrine", d: "Restaurants, cabinets, artisans : votre activité présentée avec soin." },
  { n: "02", t: "E-commerce", d: "Vendez en ligne avec une boutique rapide et rassurante." },
  { n: "03", t: "Plateforme", d: "SaaS, portails métier, outils internes : du sur mesure qui scale." },
];

const WP = {
  tag: "Rapide à lancer",
  title: "WordPress",
  desc: "Un site professionnel, simple à mettre à jour vous-même, sur la plateforme la plus utilisée au monde.",
  points: [
    "Design sur mesure, pas de template générique",
    "Interface d'édition simple pour votre contenu",
    "Hébergement et maintenance possibles",
    "Idéal pour sites vitrine et blogs",
  ],
  bg: "bg-mint",
};
const SM = {
  tag: "100% personnalisé",
  title: "Sur mesure",
  desc: "Un développement entièrement sur mesure pour les projets qui ont besoin de performance, de fonctionnalités spécifiques ou d'une scalabilité particulière.",
  points: [
    "Performance et vitesse de chargement optimales",
    "Fonctionnalités et intégrations spécifiques à votre métier",
    "Architecture pensée pour grandir avec votre activité",
    "Idéal pour SaaS, plateformes et projets complexes",
  ],
  bg: "bg-caramel",
};

const INCLUS = [
  "Design responsive (mobile, tablette, desktop)",
  "Structure SEO optimisée dès le départ",
  "Conformité RGPD de base",
  "Vitesse de chargement optimisée",
  "Formation à la prise en main",
  "Un mois de support après lancement",
];

const COMPARE = [
  ["Budget", "Plus accessible", "Plus élevé"],
  ["Délai de livraison", "2 à 4 semaines", "4 à 10 semaines"],
  ["Autonomie d'édition", "Très simple", "Selon intégration CMS"],
  ["Performance", "Bonne", "Excellente"],
  ["Flexibilité", "Standard", "Illimitée"],
  ["Idéal pour", "Vitrines, blogs", "SaaS, plateformes"],
];

const FAQ = [
  {
    q: "Puis-je modifier le contenu moi-même après livraison ?",
    a: "Oui. Sur WordPress, vous disposez d'une interface d'édition simple et d'une formation à la prise en main. Sur un développement sur mesure, un CMS peut être intégré selon vos besoins d'autonomie.",
  },
  {
    q: "La maintenance est-elle incluse ?",
    a: "Un mois de support est inclus après chaque lancement. Ensuite, on propose des formules de maintenance (mises à jour, sauvegardes, sécurité, petites évolutions) adaptées à votre budget, sans engagement forcé.",
  },
  {
    q: "Vous intervenez aussi sur des sites existants ?",
    a: "Oui : refonte complète, optimisation des performances, corrections SEO ou simple coup de frais. On commence par un audit rapide de l'existant pour vous dire honnêtement ce qui mérite d'être gardé.",
  },
];

export default function CreationSite() {
  return (
    <>
      <Seo
        title="Création de site internet au Luxembourg : vitrine, e-commerce, sur mesure | Cafein"
        description="Cafein crée votre site internet au Luxembourg : site vitrine, boutique e-commerce ou plateforme sur mesure. Design soigné, SEO intégré dès le départ, RGPD, un mois de support inclus."
        path="/creation-site-web"
        jsonLd={[
          serviceLd("Création de site internet", "Sites vitrine, e-commerce et plateformes sur mesure au Luxembourg.", "/creation-site-web"),
          faqLd(FAQ),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Création de site web", path: "/creation-site-web" },
          ]),
        ]}
      />
      <PageHero
        n="01"
        tag="Sites"
        title={<>Un site qui vous ressemble, <span className="text-mint-dark">pensé pour convertir</span></>}
        subtitle="Que vous ayez besoin d'un site vitrine, d'une boutique en ligne ou d'une plateforme sur mesure, Cafein conçoit des sites rapides, propres et pensés pour transformer vos visiteurs en clients, pour les entreprises basées au Luxembourg comme à l'international."
      >
        <BrowserDeco />
      </PageHero>

      <Marquee words={["Vitrine", "E-commerce", "Plateforme", "WordPress", "Sur mesure"]} />

      {/* Types de projets */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight mb-12"
          >
            Pour chaque type de projet
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TYPES.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
                whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
                className="rounded-3xl bg-white border-[3px] border-ink p-8 shadow-[6px_6px_0_#0A0F0D] hover:shadow-[10px_10px_0_#1FCE8A] transition-shadow"
              >
                <span className="font-mono text-sm font-bold text-mint-dark">{c.n}</span>
                <h3 className="mt-3 font-display font-extrabold text-2xl text-ink tracking-tight">{c.t}</h3>
                <p className="mt-3 text-ink/70 font-medium leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 font-mono text-xs tracking-[0.3em] uppercase text-mint-dark flex items-center gap-2"
          >
            <Spark className="w-4 h-4" /> Et le vôtre ?
          </motion.p>
        </div>
      </section>

      {/* WordPress vs Sur mesure */}
      <section className="bg-espresso py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-8">
          {[WP, SM].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 110, damping: 17 }}
              className={`${c.bg} rounded-3xl border-[3px] border-ink p-8 md:p-12 text-ink`}
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase border-2 border-ink rounded-full px-4 py-1.5">
                {c.tag}
              </span>
              <h3 className="mt-6 font-display font-extrabold text-3xl md:text-5xl tracking-tight">{c.title}</h3>
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

        {/* Tableau comparatif */}
        <div className="mx-auto max-w-7xl px-6 md:px-10 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="overflow-x-auto rounded-2xl border-2 border-cream/15"
          >
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b-2 border-cream/15 font-mono text-[11px] tracking-[0.25em] uppercase text-cream/50">
                  <th className="px-6 py-4"> </th>
                  <th className="px-6 py-4 text-mint">WordPress</th>
                  <th className="px-6 py-4 text-caramel">Sur mesure</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row[0]} className="border-b border-cream/10 last:border-0">
                    <td className="px-6 py-4 font-display font-bold text-cream">{row[0]}</td>
                    <td className="px-6 py-4 text-cream/70 font-medium">{row[1]}</td>
                    <td className="px-6 py-4 text-cream/70 font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Inclus dans chaque projet */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight mb-12"
          >
            Inclus dans <span className="squiggle">chaque projet</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INCLUS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-2xl bg-white border-2 border-ink p-5 font-medium text-ink"
              >
                <span className="grid place-items-center w-7 h-7 rounded-full bg-mint text-ink shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l5 5L20 7" />
                  </svg>
                </span>
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Steps
        dark
        title="Comment on travaille"
        steps={[
          { n: "01", title: "Découverte", desc: "On échange sur vos objectifs, votre cible et vos contraintes pour cadrer le projet." },
          { n: "02", title: "Design", desc: "Maquettes et parcours utilisateur, alignés avec votre identité de marque." },
          { n: "03", title: "Développement", desc: "Intégration et développement, avec des points d'étape réguliers." },
          { n: "04", title: "Lancement", desc: "Mise en ligne, puis accompagnement pour le référencement et la suite." },
        ]}
      />

      <MiniFaq items={FAQ} />

      <Edito
        kicker="Créer un site au Luxembourg"
        title={<>Un bon site, c'est un commercial <span className="squiggle">qui ne dort jamais</span></>}
        paragraphs={[
          <>Créer un site internet au Luxembourg, ce n'est pas seulement « être en ligne » : c'est donner à vos clients une raison de vous choisir. Un site vitrine bien conçu présente votre activité, inspire confiance et transforme les visites en prises de contact, que vous soyez artisan, indépendant, cabinet ou PME de la Grande Région.</>,
          <>Chez Cafein, chaque projet démarre avec les fondations qui comptent pour Google : structure claire, vitesse de chargement, version mobile impeccable et référencement naturel intégré dès la conception. Résultat : un site beau à visiter, simple à mettre à jour, et surtout facile à trouver. Le café est offert, le devis aussi.</>,
        ]}
        links={[
          { to: "/notre-expertise/sites-vitrine", label: "Sites vitrine" },
          { to: "/notre-expertise/e-commerce", label: "E-commerce" },
          { to: "/seo-geo", label: "Référencement SEO & GEO" },
        ]}
      />

      <CtaBand title="Un projet de site web en tête ?" sub="Discutons-en, sans engagement." label="Demander un devis" />
    </>
  );
}
