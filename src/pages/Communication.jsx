import React from "react";
import { motion } from "framer-motion";
import { PageHero, CtaBand, MiniFaq, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import Seo, { faqLd, serviceLd, breadcrumbLd } from "../lib/seo.jsx";
import { useEggSpeed } from "../components/EasterEggs.jsx";

/* Mockup post social pour le hero */
function PostDeco() {
  const eggSpeed = useEggSpeed();
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: (4) / eggSpeed }}
      className="rounded-2xl border-2 border-cream/20 bg-espresso-2 p-6 shadow-2xl max-w-sm ml-auto"
    >
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-11 h-11 rounded-full bg-mint font-display font-extrabold text-ink">C</span>
        <div>
          <p className="font-display font-bold text-cream text-sm">Cafein · Agence</p>
          <p className="font-mono text-[10px] tracking-widest text-cream/40 uppercase">À l'instant</p>
        </div>
      </div>
      <p className="mt-4 text-cream/80 font-medium text-sm leading-relaxed">
        Nouveau site en ligne pour un client luxembourgeois — propre, rapide, efficace. ☕
      </p>
      <div className="mt-4 flex items-center gap-5 font-mono text-xs text-cream/50">
        <span className="text-mint font-bold">♥ 128</span>
        <span>💬 24</span>
        <span>↗ 12</span>
      </div>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 12 }}
        className="absolute -top-3 -right-3 rounded-full bg-caramel border-2 border-ink px-3 py-1 font-mono text-[10px] font-bold text-ink"
      >
        +1,2k vues
      </motion.span>
    </motion.div>
  );
}

const SERVICES = [
  { t: "Stratégie", d: "Positionnement, ligne éditoriale, choix des canaux : un plan clair avant de publier quoi que ce soit.", bg: "bg-mint" },
  { t: "Social media", d: "Gestion de vos réseaux (LinkedIn, Instagram, Facebook...) : publications, communauté, réputation.", bg: "bg-caramel" },
  { t: "Contenus", d: "Textes, visuels et formats courts qui portent votre voix — cohérents avec votre marque et votre marché.", bg: "bg-sun" },
  { t: "Campagnes", d: "Campagnes sponsorisées ciblées Luxembourg et Grande Région, pilotées aux résultats.", bg: "bg-cream-2" },
];

const WEEK = [
  { d: "Lun", t: "Post LinkedIn" },
  { d: "Mar", t: "Story coulisses" },
  { d: "Mer", t: "Article blog" },
  { d: "Jeu", t: "Réel produit" },
  { d: "Ven", t: "Newsletter" },
];

const FAQ = [
  {
    q: "Sur quels réseaux intervenez-vous ?",
    a: "Principalement LinkedIn, Instagram et Facebook — les canaux les plus pertinents pour les entreprises luxembourgeoises. Le choix final dépend de votre cible : on ne vous fera jamais publier partout pour publier partout.",
  },
  {
    q: "Créez-vous aussi les visuels et les vidéos ?",
    a: "Oui : visuels, carrousels, formats courts et montages simples sont inclus dans la production de contenus. Pour des tournages plus ambitieux, on s'appuie sur des partenaires locaux de confiance et on pilote le projet pour vous.",
  },
  {
    q: "Peut-on démarrer petit ?",
    a: "Bien sûr. Beaucoup de nos clients commencent par un seul canal bien géré, puis élargissent quand les résultats suivent. Un accompagnement utile vaut mieux qu'une présence partout mais vide.",
  },
];

export default function Communication() {
  return (
    <>
      <Seo
        title="Communication digitale & réseaux sociaux au Luxembourg | Cafein"
        description="Stratégie, réseaux sociaux, contenus et campagnes publicitaires au Luxembourg : Cafein gère votre communication digitale de A à Z. LinkedIn, Instagram, Facebook — sans jargon."
        path="/communication"
        jsonLd={[
          serviceLd("Communication digitale", "Stratégie, réseaux sociaux, contenus et campagnes au Luxembourg et dans la Grande Région.", "/communication"),
          faqLd(FAQ),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Communication", path: "/communication" },
          ]),
        ]}
      />
      <PageHero
        n="03"
        tag="Social"
        title={<>Une marque qui rayonne <span className="text-mint-dark">sur tous les canaux</span></>}
        subtitle="Stratégie, réseaux sociaux, contenus et campagnes : Cafein gère votre communication digitale de A à Z pour faire exister votre marque auprès de vos clients, au Luxembourg et dans la Grande Région."
      >
        <div className="relative">
          <PostDeco />
        </div>
      </PageHero>

      <Marquee words={["Stratégie", "Social media", "Contenus", "Campagnes", "Luxembourg"]} />

      {/* Ce qu'on gère pour vous */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight mb-12"
          >
            Ce qu'on gère <span className="squiggle">pour vous</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
                whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
                className={`${c.bg} rounded-3xl border-[3px] border-ink p-8 md:p-10 text-ink shadow-[6px_6px_0_#0A0F0D]`}
              >
                <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">{c.t}</h3>
                <p className="mt-3 font-medium leading-relaxed text-ink/80">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Semaine type */}
      <section className="bg-espresso py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-cream tracking-tight"
          >
            Une semaine type, <span className="text-mint">orchestrée</span>
          </motion.h2>
          <p className="mt-4 text-cream/60 font-medium max-w-xl">
            Un calendrier éditorial régulier, pensé pour rester visible sans vous épuiser.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {WEEK.map((w, i) => (
              <motion.div
                key={w.d}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 150, damping: 16 }}
                whileHover={{ y: -6 }}
                className="border-2 border-cream/15 bg-espresso-2/60 p-6 text-center"
              >
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-mint">{w.d}</p>
                <p className="mt-3 font-display font-bold text-cream">{w.t}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MiniFaq items={FAQ} />

      <Edito
        kicker="Communiquer au Luxembourg"
        title={<>Une marque qu'on remarque, <span className="squiggle">et qu'on retient</span></>}
        paragraphs={[
          <>La communication digitale au Luxembourg a une particularité : un marché multilingue, local et où le bouche-à-oreille compte double. Une présence bien pensée sur LinkedIn, Instagram ou Facebook fait plus que « poster » — elle installe votre marque dans le paysage, rassure vos prospects et fait revenir vos clients.</>,
          <>Notre approche : une stratégie claire avant le premier post, des contenus qui portent votre voix, et des campagnes pilotées aux résultats plutôt qu'aux likes. On commence petit si besoin, on mesure tout, et on amplifie ce qui fonctionne. Votre communication devient un investissement, pas une corvée.</>,
        ]}
        links={[
          { to: "/notre-expertise/reseaux-sociaux", label: "Réseaux sociaux" },
          { to: "/notre-expertise/contenus-copywriting", label: "Contenus & copywriting" },
          { to: "/notre-expertise/campagnes-publicitaires", label: "Campagnes publicitaires" },
        ]}
      />

      <CtaBand title="Votre marque mérite d'être vue" sub="Parlons de votre communication, sans engagement." label="Parlons-en" />
    </>
  );
}
