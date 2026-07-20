import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero, CtaBand, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { useT, useLang } from "../lib/lang.jsx";
import Seo, { SITE, breadcrumbLd } from "../lib/seo.jsx";

/* Les 69 termes du lexique V1, adaptés au design V4 */
const TERMS = [
  { s: "ab-testing", t: "A/B testing", te: "A/B testing", c: "Data & mesure", d: "Tester deux versions d'une page pour laisser les données décider, fin des débats d'opinion.", de: "Testing two versions of a page to let the data decide, the end of opinion-based debates." },
  { s: "arborescence", t: "Arborescence", te: "Site structure", c: "Site web", d: "L'organisation des pages de votre site, la colonne vertébrale de la navigation et du SEO.", de: "The way your site's pages are organised, the backbone of navigation and SEO." },
  { s: "autorite-domaine", t: "Autorité de domaine", te: "Domain authority", c: "SEO", d: "Le « score de crédibilité » de votre site aux yeux des moteurs de recherche.", de: "The 'credibility score' of your site in the eyes of search engines." },
  { s: "avis-clients", t: "Avis clients", te: "Customer reviews", c: "SEO", d: "La preuve sociale qui rassure les prospects et booste votre référencement local.", de: "The social proof that reassures prospects and boosts your local SEO." },
  { s: "backlink", t: "Backlink", te: "Backlink", c: "SEO", d: "Un lien entrant depuis un autre site, un vote de confiance aux yeux des moteurs.", de: "An incoming link from another site, a vote of confidence in the eyes of search engines." },
  { s: "balise-title", t: "Balise title", te: "Title tag", c: "SEO", d: "Le titre bleu cliquable dans Google, votre première (et parfois seule) chance de convaincre.", de: "The blue clickable title in Google, your first (and sometimes only) chance to convince." },
  { s: "blog", t: "Blog d'entreprise", te: "Company blog", c: "SEO", d: "Le moteur de contenu qui attire du trafic qualifié et nourrit votre référencement mois après mois.", de: "The content engine that attracts qualified traffic and feeds your SEO month after month." },
  { s: "branding", t: "Branding", te: "Branding", c: "Social media", d: "La construction de votre marque : identité, valeurs, perception, ce qui reste quand on vous a vu.", de: "Building your brand: identity, values, perception, what stays with people once they've seen you." },
  { s: "cache", t: "Cache", te: "Cache", c: "Site web", d: "Une mémoire tampon qui ressert les pages déjà générées, pour un site instantané.", de: "A buffer memory that re-serves already-generated pages, for an instant site." },
  { s: "calendrier-editorial", t: "Calendrier éditorial", te: "Editorial calendar", c: "Social media", d: "La planification de vos publications : qui publie quoi, où et quand.", de: "The planning of your posts: who publishes what, where and when." },
  { s: "cdn", t: "CDN", te: "CDN", c: "Site web", d: "Un réseau de serveurs répartis dans le monde qui rapproche votre site de chaque visiteur.", de: "A network of servers spread around the world that brings your site closer to each visitor." },
  { s: "charte-graphique", t: "Charte graphique", te: "Brand style guide", c: "Site web", d: "Le document de référence de votre identité visuelle : logo, couleurs, typographies, usages.", de: "The reference document for your visual identity: logo, colours, typography, usage." },
  { s: "chatgpt", t: "ChatGPT", te: "ChatGPT", c: "GEO & IA", d: "L'assistant IA le plus utilisé au monde, et un nouveau prescripteur pour votre entreprise.", de: "The most widely used AI assistant in the world, and a new recommender for your business." },
  { s: "cms", t: "CMS", te: "CMS", c: "Site web", d: "Le système qui vous permet de modifier votre site sans toucher au code, WordPress en tête.", de: "The system that lets you edit your site without touching the code, with WordPress leading the way." },
  { s: "community-management", t: "Community management", te: "Community management", c: "Social media", d: "Animer vos réseaux sociaux : publier, répondre, fédérer une communauté autour de votre marque.", de: "Running your social media: posting, replying, building a community around your brand." },
  { s: "cookies", t: "Cookies", te: "Cookies", c: "Site web", d: "Les petits fichiers qui mémorisent les préférences et mesurent l'audience, encadrés par le RGPD.", de: "The small files that remember preferences and measure audiences, regulated by the GDPR." },
  { s: "copywriting", t: "Copywriting", te: "Copywriting", c: "Social media", d: "L'écriture qui fait agir : titres, pages de vente, publicités, chaque mot travaille.", de: "Writing that drives action: headlines, sales pages, ads, every word pulls its weight." },
  { s: "core-web-vitals", t: "Core Web Vitals", te: "Core Web Vitals", c: "Site web", d: "Les indicateurs de vitesse et de stabilité que Google mesure, et récompense.", de: "The speed and stability metrics that Google measures, and rewards." },
  { s: "crawl", t: "Crawl", te: "Crawl", c: "SEO", d: "L'exploration de votre site par les robots de Google, page par page, lien par lien.", de: "The exploration of your site by Google's bots, page by page, link by link." },
  { s: "cta", t: "CTA (appel à l'action)", te: "CTA (call to action)", c: "Site web", d: "Le bouton qui dit quoi faire : « Demander un devis », « Prendre rendez-vous »...", de: "The button that tells people what to do: 'Request a quote', 'Book a meeting'…" },
  { s: "sur-mesure", t: "Développement sur mesure", te: "Custom development", c: "Site web", d: "Un site codé spécifiquement pour vos besoins : performance maximale et zéro compromis.", de: "A site coded specifically for your needs: maximum performance and zero compromise." },
  { s: "donnees-structurees", t: "Données structurées (schema.org)", te: "Structured data (schema.org)", c: "SEO", d: "Un balisage invisible qui aide Google et les IA à comprendre précisément votre contenu.", de: "Invisible markup that helps Google and AIs understand your content precisely." },
  { s: "e-commerce", t: "E-commerce", te: "E-commerce", c: "Site web", d: "La boutique en ligne : catalogue, panier, paiement, votre commerce ouvert 24h/24.", de: "The online store: catalogue, cart, checkout, your shop open 24/7." },
  { s: "engagement", t: "Engagement", te: "Engagement", c: "Social media", d: "Likes, commentaires, partages : le signe que votre contenu touche vraiment votre audience.", de: "Likes, comments, shares: the sign that your content really connects with your audience." },
  { s: "featured-snippet", t: "Featured snippet", te: "Featured snippet", c: "SEO", d: "La « position zéro » : l'encadré de réponse que Google affiche au-dessus de tous les résultats.", de: "'Position zero': the answer box Google displays above all other results." },
  { s: "geo", t: "GEO (Generative Engine Optimization)", te: "GEO (Generative Engine Optimization)", c: "GEO & IA", d: "Le référencement nouvelle génération : être cité par ChatGPT, Perplexity ou Gemini.", de: "The new generation of search optimisation: getting cited by ChatGPT, Perplexity or Gemini." },
  { s: "google-ads", t: "Google Ads", te: "Google Ads", c: "Publicité", d: "La régie publicitaire de Google : recherche, display, YouTube et shopping.", de: "Google's advertising platform: search, display, YouTube and shopping." },
  { s: "analytics", t: "Google Analytics", te: "Google Analytics", c: "Data & mesure", d: "L'outil de mesure d'audience : qui visite votre site, d'où, et ce qu'ils y font.", de: "The audience measurement tool: who visits your site, from where, and what they do there." },
  { s: "google-business-profile", t: "Google Business Profile", te: "Google Business Profile", c: "SEO", d: "Votre fiche sur Google Maps et la recherche locale, l'outil n°1 de visibilité de proximité.", de: "Your listing on Google Maps and local search, the number one tool for local visibility." },
  { s: "search-console", t: "Google Search Console", te: "Google Search Console", c: "Data & mesure", d: "L'outil gratuit de Google pour surveiller votre indexation, vos positions et vos clics.", de: "Google's free tool to monitor your indexing, rankings and clicks." },
  { s: "hebergement", t: "Hébergement web", te: "Web hosting", c: "Site web", d: "Le serveur qui fait tourner votre site, sa fiabilité conditionne tout le reste.", de: "The server that runs your site, its reliability underpins everything else." },
  { s: "https", t: "HTTPS / Certificat SSL", te: "HTTPS / SSL certificate", c: "Site web", d: "Le cadenas dans la barre d'adresse : connexion chiffrée, confiance et SEO.", de: "The padlock in the address bar: encrypted connection, trust and SEO." },
  { s: "ia-generative", t: "IA générative", te: "Generative AI", c: "GEO & IA", d: "Les intelligences artificielles qui créent du contenu, et deviennent un canal de recherche majeur.", de: "The artificial intelligences that create content, and are becoming a major search channel." },
  { s: "impressions", t: "Impressions", te: "Impressions", c: "Data & mesure", d: "Le nombre total d'affichages de votre contenu ou annonce, répétitions comprises.", de: "The total number of times your content or ad is displayed, repeats included." },
  { s: "indexation", t: "Indexation", te: "Indexing", c: "SEO", d: "Le moment où Google enregistre votre page dans sa base, sans elle, pas de visibilité possible.", de: "The moment Google records your page in its database, without it, no visibility is possible." },
  { s: "landing-page", t: "Landing page", te: "Landing page", c: "Site web", d: "Une page unique, un seul objectif : convertir le visiteur venu d'une campagne.", de: "A single page with a single goal: converting the visitor who came from a campaign." },
  { s: "ligne-editoriale", t: "Ligne éditoriale", te: "Editorial line", c: "Social media", d: "Le fil rouge de vos contenus : ton, thèmes, valeurs, pour une communication cohérente.", de: "The thread running through your content: tone, themes, values, for consistent communication." },
  { s: "llm", t: "LLM (grand modèle de langage)", te: "LLM (large language model)", c: "GEO & IA", d: "La technologie derrière ChatGPT et consorts : des modèles entraînés sur d'immenses corpus de textes.", de: "The technology behind ChatGPT and the like: models trained on huge corpora of text." },
  { s: "longue-traine", t: "Longue traîne", te: "Long tail", c: "SEO", d: "Les requêtes précises et peu concurrentielles qui, cumulées, génèrent l'essentiel du trafic qualifié.", de: "The specific, low-competition queries that, combined, generate most of your qualified traffic." },
  { s: "maillage-interne", t: "Maillage interne", te: "Internal linking", c: "SEO", d: "L'art de relier vos pages entre elles pour guider visiteurs et moteurs de recherche.", de: "The art of connecting your pages to guide both visitors and search engines." },
  { s: "maintenance", t: "Maintenance web", te: "Web maintenance", c: "Site web", d: "Mises à jour, sauvegardes, sécurité : l'entretien qui garde votre site rapide et sûr.", de: "Updates, backups, security: the upkeep that keeps your site fast and safe." },
  { s: "meta-description", t: "Méta description", te: "Meta description", c: "SEO", d: "Le petit texte sous le titre dans Google : il ne classe pas, mais il fait cliquer.", de: "The short text under the title in Google: it doesn't rank you, but it earns the click." },
  { s: "mots-cles", t: "Mots-clés", te: "Keywords", c: "SEO", d: "Les expressions que tapent vos clients, la fondation de toute stratégie SEO.", de: "The phrases your customers type, the foundation of any SEO strategy." },
  { s: "netlinking", t: "Netlinking", te: "Link building", c: "SEO", d: "Obtenir des liens d'autres sites vers le vôtre pour renforcer votre autorité aux yeux de Google.", de: "Earning links from other sites to yours to strengthen your authority in Google's eyes." },
  { s: "newsletter", t: "Newsletter", te: "Newsletter", c: "Social media", d: "L'e-mail régulier à votre communauté : le seul canal dont vous êtes vraiment propriétaire.", de: "The regular email to your community: the only channel you truly own." },
  { s: "nom-de-domaine", t: "Nom de domaine", te: "Domain name", c: "Site web", d: "Votre adresse sur internet (votresociete.lu), un actif à choisir et protéger avec soin.", de: "Your address on the internet (yourcompany.lu), an asset to choose and protect with care." },
  { s: "pagespeed", t: "PageSpeed", te: "PageSpeed", c: "Site web", d: "L'outil de Google qui note la vitesse de votre site sur 100, visez 90+.", de: "Google's tool that scores your site's speed out of 100, aim for 90+." },
  { s: "perplexity", t: "Perplexity", te: "Perplexity", c: "GEO & IA", d: "Le moteur de réponse IA qui cite systématiquement ses sources, une opportunité SEO/GEO directe.", de: "The AI answer engine that systematically cites its sources, a direct SEO/GEO opportunity." },
  { s: "reach", t: "Portée (reach)", te: "Reach", c: "Social media", d: "Le nombre de personnes uniques qui ont vu votre contenu.", de: "The number of unique people who have seen your content." },
  { s: "responsive", t: "Responsive design", te: "Responsive design", c: "Site web", d: "Un site qui s'adapte parfaitement à tous les écrans : mobile, tablette, ordinateur.", de: "A site that adapts perfectly to every screen: mobile, tablet, desktop." },
  { s: "retargeting", t: "Retargeting", te: "Retargeting", c: "Publicité", d: "Recibler les visiteurs qui n'ont pas converti, la deuxième chance publicitaire.", de: "Re-targeting visitors who didn't convert, advertising's second chance." },
  { s: "rgpd", t: "RGPD", te: "GDPR", c: "Site web", d: "Le règlement européen sur les données personnelles, une obligation, et un gage de confiance.", de: "The European regulation on personal data, an obligation, and a mark of trust." },
  { s: "robots-txt", t: "Robots.txt", te: "Robots.txt", c: "SEO", d: "Le fichier qui dit aux robots ce qu'ils peuvent explorer sur votre site, à manier avec précaution.", de: "The file that tells bots what they can crawl on your site, to be handled with care." },
  { s: "saas", t: "SaaS", te: "SaaS", c: "Site web", d: "Un logiciel accessible en ligne par abonnement, sans installation, toujours à jour.", de: "Software accessed online by subscription, no installation, always up to date." },
  { s: "sea", t: "SEA (publicité Google)", te: "SEA (Google advertising)", c: "Publicité", d: "Les annonces payantes en haut de Google : visibilité immédiate, au coût par clic.", de: "The paid ads at the top of Google: instant visibility, paid per click." },
  { s: "seo", t: "SEO (référencement naturel)", te: "SEO (search engine optimization)", c: "SEO", d: "L'art de positionner votre site en haut des résultats Google sans payer de publicité.", de: "The art of ranking your site at the top of Google without paying for ads." },
  { s: "seo-local", t: "SEO local", te: "Local SEO", c: "SEO", d: "Être visible auprès des clients de votre zone : « agence web Luxembourg », « restaurant Esch »...", de: "Being visible to customers in your area: 'web agency Luxembourg', 'restaurant Esch'…" },
  { s: "serp", t: "SERP", te: "SERP", c: "SEO", d: "La page de résultats de Google, le champ de bataille du référencement.", de: "Google's results page, the battlefield of search optimisation." },
  { s: "site-vitrine", t: "Site vitrine", te: "Showcase website", c: "Site web", d: "Le site qui présente votre activité et transforme les visiteurs en prises de contact.", de: "The site that presents your business and turns visitors into enquiries." },
  { s: "sitemap", t: "Sitemap XML", te: "XML sitemap", c: "SEO", d: "Le plan du site remis aux moteurs de recherche pour ne rater aucune page.", de: "The site map handed to search engines so they don't miss a single page." },
  { s: "social-ads", t: "Social ads", te: "Social ads", c: "Publicité", d: "La publicité sur les réseaux sociaux : toucher précisément votre audience là où elle passe son temps.", de: "Advertising on social media: reaching your audience precisely where they spend their time." },
  { s: "storytelling", t: "Storytelling", te: "Storytelling", c: "Social media", d: "Raconter votre entreprise comme une histoire, parce qu'on retient les récits, pas les arguments.", de: "Telling your business as a story, because people remember stories, not arguments." },
  { s: "taux-de-clic", t: "Taux de clic (CTR)", te: "Click-through rate (CTR)", c: "Data & mesure", d: "La part des personnes qui cliquent après avoir vu votre lien ou votre annonce.", de: "The share of people who click after seeing your link or ad." },
  { s: "taux-de-conversion", t: "Taux de conversion", te: "Conversion rate", c: "Data & mesure", d: "Le pourcentage de visiteurs qui passent à l'action, l'indicateur qui compte vraiment.", de: "The percentage of visitors who take action, the metric that really matters." },
  { s: "taux-de-rebond", t: "Taux de rebond", te: "Bounce rate", c: "Data & mesure", d: "La part des visiteurs qui repartent sans interagir, un symptôme à interpréter avec nuance.", de: "The share of visitors who leave without interacting, a symptom to read with nuance." },
  { s: "conversion-funnel", t: "Tunnel de conversion", te: "Conversion funnel", c: "Data & mesure", d: "Le parcours du visiteur jusqu'à l'action : chaque étape perd du monde, chaque friction coûte.", de: "The visitor's path to action: every step loses people, every friction costs." },
  { s: "ui", t: "UI (interface utilisateur)", te: "UI (user interface)", c: "Site web", d: "La partie visible du design : couleurs, typographies, boutons, l'esthétique au service de l'usage.", de: "The visible part of design: colours, typography, buttons, aesthetics serving usability." },
  { s: "ux", t: "UX (expérience utilisateur)", te: "UX (user experience)", c: "Site web", d: "Tout ce que ressent votre visiteur : fluidité, clarté, confiance, et son envie de rester.", de: "Everything your visitor feels: smoothness, clarity, trust, and the urge to stay." },
  { s: "wordpress", t: "WordPress", te: "WordPress", c: "Site web", d: "Le CMS qui propulse plus de 40% du web, souple, éprouvé, facile à prendre en main.", de: "The CMS that powers over 40% of the web, flexible, proven, easy to get to grips with." },
];

const CATS = ["Tout", "SEO", "GEO & IA", "Site web", "Social media", "Publicité", "Data & mesure"];

const CAT_EN = {
  Tout: "All",
  SEO: "SEO",
  "GEO & IA": "GEO & AI",
  "Site web": "Websites",
  "Social media": "Social media",
  "Publicité": "Advertising",
  "Data & mesure": "Data & analytics",
};

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
  const tr = useT();
  const { lang } = useLang();
  const [cat, setCat] = useState("Tout");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return TERMS.filter(
      (t) =>
        (cat === "Tout" || t.c === cat) &&
        (!q || norm((lang === "en" ? t.te + " " + t.de : t.t + " " + t.d)).includes(norm(q)))
    );
  }, [cat, q, lang]);

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
        title={lang === "en"
          ? (<>The web, <span className="text-mint-dark">without the jargon</span></>)
          : (<>Le digital, <span className="text-mint-dark">sans jargon</span></>)}
        subtitle={lang === "en"
          ? `${TERMS.length} web, SEO, GEO and social media terms explained simply. SEO, GEO, Core Web Vitals, retargeting… Digital loves acronyms: this glossary translates them into plain English, with a concrete angle for businesses in Luxembourg and the Greater Region.`
          : `${TERMS.length} termes du web, du SEO, du GEO et du social media expliqués simplement. SEO, GEO, Core Web Vitals, retargeting… Le digital adore les acronymes : ce lexique les traduit en français clair, avec un angle concret pour les entreprises du Luxembourg et de la Grande Région.`}
      >
        <div className="font-display font-extrabold leading-none text-right select-none" aria-hidden>
          <span className="block text-[7rem] text-stroke-espresso opacity-50">{TERMS.length}</span>
          <span className="block text-3xl text-mint-dark mt-2">{tr("termes", "terms")}</span>
          <span className="block text-xl text-ink/50 mt-1">{tr("Le jargon, traduit.", "The jargon, translated.")}</span>
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
                {lang === "en" ? CAT_EN[c] : c}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr("Chercher un terme… (ex. backlink, RGPD, GEO)", "Search a term… (e.g. backlink, GDPR, GEO)")}
            aria-label={tr("Chercher un terme", "Search a term")}
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
                      <h3 className="font-display font-extrabold text-lg leading-snug">{lang === "en" ? t.te : t.t}</h3>
                      <span className={`shrink-0 rounded-full ${CAT_COLORS[t.c] || "bg-cream-2"} border border-ink px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${isOpen ? "" : ""} text-ink`}>
                        {lang === "en" ? CAT_EN[t.c] : t.c}
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
                          {lang === "en" ? t.de : t.d}
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
              {tr("Aucun terme trouvé. Si un mot vous manque, dites-le-nous : on l'ajoute.", "No term found. If a word is missing, let us know: we'll add it.")}
            </p>
          )}
        </div>
      </section>

      <Edito
        kicker={tr("Pourquoi ce lexique ?", "Why this glossary?")}
        title={lang === "en"
          ? (<>Digital without the jargon, <span className="squiggle">promise</span></>)
          : (<>Le digital sans jargon, <span className="squiggle">promis</span></>)}
        paragraphs={[
          lang === "en"
            ? (<>SEO, GEO, backlinks, Core Web Vitals… the web loves acronyms, and that's often where trust breaks down. This glossary reflects how we work: at Cafein, we explain every recommendation in plain English, so you always understand what you're paying for, and why.</>)
            : (<>SEO, GEO, backlinks, Core Web Vitals… le web adore les acronymes, et c'est souvent là que la confiance se perd. Ce lexique est notre façon de travailler : chez Cafein, on vous explique chaque recommandation en français simple, pour que vous compreniez toujours ce que vous payez, et pourquoi.</>),
        ]}
        links={[
          { to: "/seo-geo", label: tr("Notre approche SEO & GEO", "Our SEO & GEO approach") },
          { to: "/notre-expertise", label: tr("Toutes nos expertises", "All our expertise") },
        ]}
      />

      <CtaBand
        title={tr("Un terme vous échappe encore ?", "Still a term you can't pin down?")}
        sub={tr("Posez-nous la question, ou confiez-nous carrément le sujet.", "Ask us the question, or hand the whole topic over to us.")}
        label={tr("Écrivez-nous", "Write to us")}
      />
    </>
  );
}
