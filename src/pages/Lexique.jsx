import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero, CtaBand, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import Seo, { SITE, breadcrumbLd } from "../lib/seo.jsx";

/* Les 69 termes du lexique V1, adaptés au design V4 */
const TERMS = [
  { s: "ab-testing", t: "A/B testing", c: "Data & mesure", d: "Tester deux versions d'une page pour laisser les données décider, fin des débats d'opinion." },
  { s: "arborescence", t: "Arborescence", c: "Site web", d: "L'organisation des pages de votre site, la colonne vertébrale de la navigation et du SEO." },
  { s: "autorite-domaine", t: "Autorité de domaine", c: "SEO", d: "Le « score de crédibilité » de votre site aux yeux des moteurs de recherche." },
  { s: "avis-clients", t: "Avis clients", c: "SEO", d: "La preuve sociale qui rassure les prospects et booste votre référencement local." },
  { s: "backlink", t: "Backlink", c: "SEO", d: "Un lien entrant depuis un autre site, un vote de confiance aux yeux des moteurs." },
  { s: "balise-title", t: "Balise title", c: "SEO", d: "Le titre bleu cliquable dans Google, votre première (et parfois seule) chance de convaincre." },
  { s: "blog", t: "Blog d'entreprise", c: "SEO", d: "Le moteur de contenu qui attire du trafic qualifié et nourrit votre référencement mois après mois." },
  { s: "branding", t: "Branding", c: "Social media", d: "La construction de votre marque : identité, valeurs, perception, ce qui reste quand on vous a vu." },
  { s: "cache", t: "Cache", c: "Site web", d: "Une mémoire tampon qui ressert les pages déjà générées, pour un site instantané." },
  { s: "calendrier-editorial", t: "Calendrier éditorial", c: "Social media", d: "La planification de vos publications : qui publie quoi, où et quand." },
  { s: "cdn", t: "CDN", c: "Site web", d: "Un réseau de serveurs répartis dans le monde qui rapproche votre site de chaque visiteur." },
  { s: "charte-graphique", t: "Charte graphique", c: "Site web", d: "Le document de référence de votre identité visuelle : logo, couleurs, typographies, usages." },
  { s: "chatgpt", t: "ChatGPT", c: "GEO & IA", d: "L'assistant IA le plus utilisé au monde, et un nouveau prescripteur pour votre entreprise." },
  { s: "cms", t: "CMS", c: "Site web", d: "Le système qui vous permet de modifier votre site sans toucher au code, WordPress en tête." },
  { s: "community-management", t: "Community management", c: "Social media", d: "Animer vos réseaux sociaux : publier, répondre, fédérer une communauté autour de votre marque." },
  { s: "cookies", t: "Cookies", c: "Site web", d: "Les petits fichiers qui mémorisent les préférences et mesurent l'audience, encadrés par le RGPD." },
  { s: "copywriting", t: "Copywriting", c: "Social media", d: "L'écriture qui fait agir : titres, pages de vente, publicités, chaque mot travaille." },
  { s: "core-web-vitals", t: "Core Web Vitals", c: "Site web", d: "Les indicateurs de vitesse et de stabilité que Google mesure, et récompense." },
  { s: "crawl", t: "Crawl", c: "SEO", d: "L'exploration de votre site par les robots de Google, page par page, lien par lien." },
  { s: "cta", t: "CTA (appel à l'action)", c: "Site web", d: "Le bouton qui dit quoi faire : « Demander un devis », « Prendre rendez-vous »..." },
  { s: "sur-mesure", t: "Développement sur mesure", c: "Site web", d: "Un site codé spécifiquement pour vos besoins : performance maximale et zéro compromis." },
  { s: "donnees-structurees", t: "Données structurées (schema.org)", c: "SEO", d: "Un balisage invisible qui aide Google et les IA à comprendre précisément votre contenu." },
  { s: "e-commerce", t: "E-commerce", c: "Site web", d: "La boutique en ligne : catalogue, panier, paiement, votre commerce ouvert 24h/24." },
  { s: "engagement", t: "Engagement", c: "Social media", d: "Likes, commentaires, partages : le signe que votre contenu touche vraiment votre audience." },
  { s: "featured-snippet", t: "Featured snippet", c: "SEO", d: "La « position zéro » : l'encadré de réponse que Google affiche au-dessus de tous les résultats." },
  { s: "geo", t: "GEO (Generative Engine Optimization)", c: "GEO & IA", d: "Le référencement nouvelle génération : être cité par ChatGPT, Perplexity ou Gemini." },
  { s: "google-ads", t: "Google Ads", c: "Publicité", d: "La régie publicitaire de Google : recherche, display, YouTube et shopping." },
  { s: "analytics", t: "Google Analytics", c: "Data & mesure", d: "L'outil de mesure d'audience : qui visite votre site, d'où, et ce qu'ils y font." },
  { s: "google-business-profile", t: "Google Business Profile", c: "SEO", d: "Votre fiche sur Google Maps et la recherche locale, l'outil n°1 de visibilité de proximité." },
  { s: "search-console", t: "Google Search Console", c: "Data & mesure", d: "L'outil gratuit de Google pour surveiller votre indexation, vos positions et vos clics." },
  { s: "hebergement", t: "Hébergement web", c: "Site web", d: "Le serveur qui fait tourner votre site, sa fiabilité conditionne tout le reste." },
  { s: "https", t: "HTTPS / Certificat SSL", c: "Site web", d: "Le cadenas dans la barre d'adresse : connexion chiffrée, confiance et SEO." },
  { s: "ia-generative", t: "IA générative", c: "GEO & IA", d: "Les intelligences artificielles qui créent du contenu, et deviennent un canal de recherche majeur." },
  { s: "impressions", t: "Impressions", c: "Data & mesure", d: "Le nombre total d'affichages de votre contenu ou annonce, répétitions comprises." },
  { s: "indexation", t: "Indexation", c: "SEO", d: "Le moment où Google enregistre votre page dans sa base, sans elle, pas de visibilité possible." },
  { s: "landing-page", t: "Landing page", c: "Site web", d: "Une page unique, un seul objectif : convertir le visiteur venu d'une campagne." },
  { s: "ligne-editoriale", t: "Ligne éditoriale", c: "Social media", d: "Le fil rouge de vos contenus : ton, thèmes, valeurs, pour une communication cohérente." },
  { s: "llm", t: "LLM (grand modèle de langage)", c: "GEO & IA", d: "La technologie derrière ChatGPT et consorts : des modèles entraînés sur d'immenses corpus de textes." },
  { s: "longue-traine", t: "Longue traîne", c: "SEO", d: "Les requêtes précises et peu concurrentielles qui, cumulées, génèrent l'essentiel du trafic qualifié." },
  { s: "maillage-interne", t: "Maillage interne", c: "SEO", d: "L'art de relier vos pages entre elles pour guider visiteurs et moteurs de recherche." },
  { s: "maintenance", t: "Maintenance web", c: "Site web", d: "Mises à jour, sauvegardes, sécurité : l'entretien qui garde votre site rapide et sûr." },
  { s: "meta-description", t: "Méta description", c: "SEO", d: "Le petit texte sous le titre dans Google : il ne classe pas, mais il fait cliquer." },
  { s: "mots-cles", t: "Mots-clés", c: "SEO", d: "Les expressions que tapent vos clients, la fondation de toute stratégie SEO." },
  { s: "netlinking", t: "Netlinking", c: "SEO", d: "Obtenir des liens d'autres sites vers le vôtre pour renforcer votre autorité aux yeux de Google." },
  { s: "newsletter", t: "Newsletter", c: "Social media", d: "L'e-mail régulier à votre communauté : le seul canal dont vous êtes vraiment propriétaire." },
  { s: "nom-de-domaine", t: "Nom de domaine", c: "Site web", d: "Votre adresse sur internet (votresociete.lu), un actif à choisir et protéger avec soin." },
  { s: "pagespeed", t: "PageSpeed", c: "Site web", d: "L'outil de Google qui note la vitesse de votre site sur 100, visez 90+." },
  { s: "perplexity", t: "Perplexity", c: "GEO & IA", d: "Le moteur de réponse IA qui cite systématiquement ses sources, une opportunité SEO/GEO directe." },
  { s: "reach", t: "Portée (reach)", c: "Social media", d: "Le nombre de personnes uniques qui ont vu votre contenu." },
  { s: "responsive", t: "Responsive design", c: "Site web", d: "Un site qui s'adapte parfaitement à tous les écrans : mobile, tablette, ordinateur." },
  { s: "retargeting", t: "Retargeting", c: "Publicité", d: "Recibler les visiteurs qui n'ont pas converti, la deuxième chance publicitaire." },
  { s: "rgpd", t: "RGPD", c: "Site web", d: "Le règlement européen sur les données personnelles, une obligation, et un gage de confiance." },
  { s: "robots-txt", t: "Robots.txt", c: "SEO", d: "Le fichier qui dit aux robots ce qu'ils peuvent explorer sur votre site, à manier avec précaution." },
  { s: "saas", t: "SaaS", c: "Site web", d: "Un logiciel accessible en ligne par abonnement, sans installation, toujours à jour." },
  { s: "sea", t: "SEA (publicité Google)", c: "Publicité", d: "Les annonces payantes en haut de Google : visibilité immédiate, au coût par clic." },
  { s: "seo", t: "SEO (référencement naturel)", c: "SEO", d: "L'art de positionner votre site en haut des résultats Google sans payer de publicité." },
  { s: "seo-local", t: "SEO local", c: "SEO", d: "Être visible auprès des clients de votre zone : « agence web Luxembourg », « restaurant Esch »..." },
  { s: "serp", t: "SERP", c: "SEO", d: "La page de résultats de Google, le champ de bataille du référencement." },
  { s: "site-vitrine", t: "Site vitrine", c: "Site web", d: "Le site qui présente votre activité et transforme les visiteurs en prises de contact." },
  { s: "sitemap", t: "Sitemap XML", c: "SEO", d: "Le plan du site remis aux moteurs de recherche pour ne rater aucune page." },
  { s: "social-ads", t: "Social ads", c: "Publicité", d: "La publicité sur les réseaux sociaux : toucher précisément votre audience là où elle passe son temps." },
  { s: "storytelling", t: "Storytelling", c: "Social media", d: "Raconter votre entreprise comme une histoire, parce qu'on retient les récits, pas les arguments." },
  { s: "taux-de-clic", t: "Taux de clic (CTR)", c: "Data & mesure", d: "La part des personnes qui cliquent après avoir vu votre lien ou votre annonce." },
  { s: "taux-de-conversion", t: "Taux de conversion", c: "Data & mesure", d: "Le pourcentage de visiteurs qui passent à l'action, l'indicateur qui compte vraiment." },
  { s: "taux-de-rebond", t: "Taux de rebond", c: "Data & mesure", d: "La part des visiteurs qui repartent sans interagir, un symptôme à interpréter avec nuance." },
  { s: "conversion-funnel", t: "Tunnel de conversion", c: "Data & mesure", d: "Le parcours du visiteur jusqu'à l'action : chaque étape perd du monde, chaque friction coûte." },
  { s: "ui", t: "UI (interface utilisateur)", c: "Site web", d: "La partie visible du design : couleurs, typographies, boutons, l'esthétique au service de l'usage." },
  { s: "ux", t: "UX (expérience utilisateur)", c: "Site web", d: "Tout ce que ressent votre visiteur : fluidité, clarté, confiance, et son envie de rester." },
  { s: "wordpress", t: "WordPress", c: "Site web", d: "Le CMS qui propulse plus de 40% du web, souple, éprouvé, facile à prendre en main." },
];

const CATS = ["Tout", "SEO", "GEO & IA", "Site web", "Social media", "Publicité", "Data & mesure"];

/* Le lexique complet en données structurées (schema.org DefinedTermSet) */
const LEXIQUE_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Lexique du web par Cafein",
  url: SITE + "/lexique",
  inLanguage: "fr",
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.t,
    description: t.d,
  })),
};

const CAT_COLORS = {
  SEO: "bg-mint",
  "GEO & IA": "bg-caramel",
  "Site web": "bg-sun",
  "Social media": "bg-mint/60",
  "Publicité": "bg-caramel/60",
  "Data & mesure": "bg-cream-2",
};

export default function Lexique() {
  const [cat, setCat] = useState("Tout");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return TERMS.filter(
      (t) => (cat === "Tout" || t.c === cat) && (!q || norm(t.t + " " + t.d).includes(norm(q)))
    );
  }, [cat, q]);

  return (
    <>
      <Seo
        title="Lexique du web : SEO, GEO, sites & social media expliqués simplement | Cafein"
        description="69 termes du web enfin clairs : SEO, GEO, backlink, CMS, Core Web Vitals, taux de conversion… Le jargon du digital traduit en français simple par Cafein, agence web au Luxembourg."
        path="/lexique"
        jsonLd={[
          LEXIQUE_LD,
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Lexique", path: "/lexique" },
          ]),
        ]}
      />
      <PageHero
        n="04"
        tag="A → Z"
        title={<>Le digital, <span className="text-mint-dark">sans jargon</span></>}
        subtitle={`${TERMS.length} termes du web, du SEO, du GEO et du social media expliqués simplement. SEO, GEO, Core Web Vitals, retargeting… Le digital adore les acronymes : ce lexique les traduit en français clair, avec un angle concret pour les entreprises du Luxembourg et de la Grande Région.`}
      >
        <div className="font-display font-extrabold leading-none text-right select-none" aria-hidden>
          <span className="block text-[7rem] text-stroke-espresso opacity-50">{TERMS.length}</span>
          <span className="block text-3xl text-mint-dark mt-2">termes</span>
          <span className="block text-xl text-ink/50 mt-1">Le jargon, traduit.</span>
        </div>
      </PageHero>

      <Marquee words={["Lexique", "SEO", "GEO", "Web", "Social"]} />

      <section className="bg-cream py-16 md:py-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {/* Filtres */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border-2 border-ink px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                  cat === c ? "bg-ink text-cream" : "bg-transparent text-ink hover:bg-mint"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chercher un terme… (ex. backlink, RGPD, GEO)"
            aria-label="Chercher un terme"
            className="w-full md:max-w-md rounded-full border-2 border-ink bg-white px-6 py-3 font-medium text-ink placeholder-ink/40 outline-none focus:border-mint-dark mb-10"
          />

          {/* Grille de termes */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((t) => {
                const isOpen = open === t.s;
                return (
                  <motion.button
                    layout
                    key={t.s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    onClick={() => setOpen(isOpen ? null : t.s)}
                    aria-expanded={isOpen}
                    className={`text-left rounded-2xl border-2 border-ink p-5 transition-shadow ${
                      isOpen ? "bg-espresso text-cream shadow-[6px_6px_0_#1FCE8A]" : "bg-white text-ink hover:shadow-[4px_4px_0_#0A0F0D]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display font-extrabold text-lg leading-snug">{t.t}</h3>
                      <span className={`shrink-0 rounded-full ${CAT_COLORS[t.c] || "bg-cream-2"} border border-ink px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${isOpen ? "" : ""} text-ink`}>
                        {t.c}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden font-medium leading-relaxed text-sm pt-3 text-cream/80"
                        >
                          {t.d}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center font-medium text-ink/50 py-16">
              Aucun terme trouvé. Si un mot vous manque, dites-le-nous : on l'ajoute.
            </p>
          )}
        </div>
      </section>

      <Edito
        kicker="Pourquoi ce lexique ?"
        title={<>Le digital sans jargon, <span className="squiggle">promis</span></>}
        paragraphs={[
          <>SEO, GEO, backlinks, Core Web Vitals… le web adore les acronymes, et c'est souvent là que la confiance se perd. Ce lexique est notre façon de travailler : chez Cafein, on vous explique chaque recommandation en français simple, pour que vous compreniez toujours ce que vous payez, et pourquoi.</>,
        ]}
        links={[
          { to: "/seo-geo", label: "Notre approche SEO & GEO" },
          { to: "/notre-expertise", label: "Toutes nos expertises" },
        ]}
      />

      <CtaBand
        title="Un terme vous échappe encore ?"
        sub="Posez-nous la question, ou confiez-nous carrément le sujet."
        label="Écrivez-nous"
      />
    </>
  );
}
