import React from "react";
import { Cup } from "./ui.jsx";

/* ── Icônes doodle partagées (grille + pages dédiées) ─────────── */
export function Doodle({ kind, className = "w-9 h-9" }) {
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

/* ── Les 12 expertises + contenu riche des pages dédiées ──────── */
export const EXPERTISES = [
  {
    slug: "sites-vitrine",
    icon: "site",
    bg: "bg-mint",
    title: "Sites vitrine",
    desc: "Votre activité présentée avec soin, pensée pour transformer les visiteurs en contacts.",
    tagline: (
      <>
        Un site qui donne <span className="text-mint-dark">envie de vous appeler</span>
      </>
    ),
    subtitle:
      "Restaurants, cabinets, artisans, indépendants : votre vitrine en ligne travaille pour vous 24h/24. On la rend belle, rapide, et surtout pensée pour transformer un visiteur curieux en prise de contact.",
    words: ["Vitrine", "Design", "Rapide", "Conversion", "Luxembourg"],
    features: [
      "Design sur mesure aligné avec votre identité, jamais de template générique",
      "Structure pensée pour convertir : parcours clair, appels à l'action visibles",
      "Responsive parfait : mobile, tablette, ordinateur",
      "Textes travaillés avec vous, dans votre ton",
      "SEO de base intégré dès la conception",
      "Formation à la prise en main pour rester autonome",
    ],
    stats: [
      { big: 3, suffix: " sem.", label: "de délai moyen pour un site vitrine, découverte comprise" },
      { big: 100, suffix: "%", label: "sur mesure, pensé pour votre métier et vos clients" },
      { big: 1, suffix: " mois", label: "de support offert après le lancement" },
    ],
    steps: [
      { n: "01", title: "Découverte", desc: "On écoute votre métier, vos clients, vos objectifs, autour d'un café." },
      { n: "02", title: "Maquette", desc: "Un design qui vous ressemble, validé ensemble avant la moindre ligne de code." },
      { n: "03", title: "Développement", desc: "Intégration soignée, animations légères, performance au rendez-vous." },
      { n: "04", title: "Lancement", desc: "Mise en ligne, indexation Google et suivi des premiers contacts." },
    ],
    faq: [
      {
        q: "Combien coûte un site vitrine ?",
        a: "Cela dépend du nombre de pages et des fonctionnalités. On établit un devis gratuit après un premier échange, sans engagement et sans jargon.",
      },
      {
        q: "Pourrai-je modifier le contenu moi-même ?",
        a: "Oui. On vous forme à la prise en main et l'interface d'édition est pensée pour être simple. Vous restez autonome sur vos textes et photos.",
      },
    ],
    related: ["e-commerce", "seo", "branding-identite"],
    cta: "Discutons de votre vitrine",
  },
  {
    slug: "e-commerce",
    icon: "ecom",
    bg: "bg-caramel",
    title: "E-commerce",
    desc: "Des boutiques en ligne rapides et rassurantes, du catalogue au paiement.",
    tagline: (
      <>
        Une boutique qui <span className="text-mint-dark">vend pendant que vous dormez</span>
      </>
    ),
    subtitle:
      "Catalogue, panier, paiement, livraison : on construit des boutiques en ligne rapides et rassurantes, où chaque étape du parcours d'achat est optimisée pour réduire les abandons.",
    words: ["Boutique", "Panier", "Paiement", "Livraison", "Conversion"],
    features: [
      "Catalogue produit clair avec recherche et filtres efficaces",
      "Tunnel d'achat optimisé pour limiter les abandons de panier",
      "Paiements sécurisés : cartes, PayPal, Payconiq…",
      "Gestion des stocks et des livraisons intégrée",
      "Fiches produits pensées SEO pour attirer du trafic gratuit",
      "Tableau de bord simple pour suivre vos ventes",
    ],
    stats: [
      { big: 24, suffix: "h/24", label: "votre boutique encaisse, même les jours fériés" },
      { big: 3, suffix: " clics", label: "maximum entre l'arrivée du client et le paiement" },
      { big: 100, suffix: "%", label: "conforme RGPD et mentions légales incluses" },
    ],
    steps: [
      { n: "01", title: "Cadrage", desc: "Catalogue, moyens de paiement, livraison : on définit le périmètre exact." },
      { n: "02", title: "Design", desc: "Une expérience d'achat fluide et rassurante, maquettée page par page." },
      { n: "03", title: "Intégration", desc: "Produits, paiements, transporteurs : tout est branché et testé." },
      { n: "04", title: "Ouverture", desc: "Lancement, premiers acheteurs, et optimisations sur données réelles." },
    ],
    faq: [
      {
        q: "WordPress/WooCommerce ou sur mesure ?",
        a: "Pour la plupart des boutiques, WooCommerce offre le meilleur rapport souplesse/budget. Pour des besoins très spécifiques ou de gros volumes, on développe sur mesure. On vous conseille honnêtement selon votre cas.",
      },
      {
        q: "Gérez-vous la conformité (RGPD, CGV) ?",
        a: "On intègre les mentions légales, la gestion des cookies et les bonnes pratiques RGPD. Pour les CGV, on vous fournit une base solide à faire valider par votre juriste.",
      },
    ],
    related: ["sites-vitrine", "campagnes-publicitaires", "data-reporting"],
    cta: "Parlons de votre boutique",
  },
  {
    slug: "developpement-sur-mesure",
    icon: "code",
    bg: "bg-sun",
    title: "Développement sur mesure",
    desc: "SaaS, plateformes, outils métier : du code taillé pour vos besoins, qui grandit avec vous.",
    tagline: (
      <>
        Du code taillé <span className="text-mint-dark">pour votre métier</span>
      </>
    ),
    subtitle:
      "Quand un template ne suffit plus : SaaS, portails clients, outils internes, intégrations spécifiques. On conçoit des applications robustes qui épousent vos processus, pas l'inverse.",
    words: ["SaaS", "Plateforme", "API", "React", "Performance"],
    features: [
      "Architecture pensée pour évoluer avec votre activité",
      "Interfaces React modernes, rapides et agréables à utiliser",
      "Intégrations avec vos outils existants (CRM, facturation, API…)",
      "Espaces clients et tableaux de bord sécurisés",
      "Performance et vitesse de chargement optimales",
      "Code documenté, maintenable, qui vous appartient",
    ],
    stats: [
      { big: 0, suffix: " template", label: "tout est conçu pour vos processus exacts" },
      { big: 99, suffix: ",9%", label: "de disponibilité visée sur nos déploiements" },
      { big: 100, suffix: "%", label: "propriétaire : le code source vous appartient" },
    ],
    steps: [
      { n: "01", title: "Spécifications", desc: "On traduit vos besoins métier en fonctionnalités concrètes et priorisées." },
      { n: "02", title: "Prototype", desc: "Une première version cliquable pour valider les parcours rapidement." },
      { n: "03", title: "Développement", desc: "Sprints courts, démos régulières : vous voyez le produit avancer." },
      { n: "04", title: "Déploiement", desc: "Mise en production, formation et accompagnement dans la durée." },
    ],
    faq: [
      {
        q: "Quel budget pour du sur mesure ?",
        a: "Un développement sur mesure commence généralement à quelques milliers d'euros et dépend fortement du périmètre. Après cadrage, vous recevez un devis détaillé par fonctionnalité, vous décidez de ce qui entre dans la V1.",
      },
      {
        q: "Qui possède le code ?",
        a: "Vous. Le code source est livré avec sa documentation et vous en détenez la propriété complète. Aucune dépendance forcée envers nous.",
      },
    ],
    related: ["sites-vitrine", "e-commerce", "data-reporting"],
    cta: "Exposez-nous votre idée",
  },
  {
    slug: "seo",
    icon: "seo",
    bg: "bg-mint",
    title: "SEO",
    desc: "Placez votre site en haut des résultats Google avec une stratégie durable, sans payer de publicité.",
    tagline: (
      <>
        En haut de Google, <span className="text-mint-dark">durablement</span>
      </>
    ),
    subtitle:
      "Le référencement naturel est l'actif marketing le plus rentable sur la durée : un travail de fond sur la technique, les contenus et la popularité de votre site, pour capter un trafic qualifié sans payer chaque clic.",
    words: ["Google", "Mots-clés", "Contenus", "Backlinks", "Positions"],
    features: [
      "Audit technique complet : vitesse, indexation, structure",
      "Recherche de mots-clés selon votre marché réel",
      "Optimisation des pages existantes (balises, contenus, maillage)",
      "Stratégie de contenus qui attire du trafic qualifié",
      "Netlinking propre pour renforcer votre autorité",
      "Suivi mensuel des positions et rapport clair",
    ],
    stats: [
      { big: 90, suffix: "+", label: "score PageSpeed visé sur les sites que l'on optimise" },
      { big: 0, suffix: " €", label: "par clic : le trafic SEO est gratuit une fois acquis" },
      { big: 12, suffix: " mois", label: "l'horizon d'un vrai travail SEO, on est francs là-dessus" },
    ],
    steps: [
      { n: "01", title: "Audit", desc: "État des lieux technique et concurrentiel : où vous êtes, où aller." },
      { n: "02", title: "Fondations", desc: "Corrections techniques et optimisation des pages stratégiques." },
      { n: "03", title: "Contenus", desc: "Production régulière de pages et d'articles qui se positionnent." },
      { n: "04", title: "Autorité", desc: "Netlinking et notoriété pour consolider les positions gagnées." },
    ],
    faq: [
      {
        q: "En combien de temps voit-on des résultats ?",
        a: "Les premières progressions arrivent souvent sous 3 mois, les résultats solides entre 6 et 12 mois. Le SEO est un investissement durable, pas un sprint, méfiez-vous de ceux qui promettent la première position en 30 jours.",
      },
      {
        q: "Le SEO fonctionne-t-il encore avec l'IA ?",
        a: "Plus que jamais : les moteurs IA s'appuient sur les contenus bien référencés. C'est pour ça qu'on couple systématiquement SEO et GEO, voir notre expertise dédiée.",
      },
    ],
    related: ["geo-visibilite-ia", "seo-local-luxembourg", "contenus-copywriting"],
    cta: "Demandez votre audit SEO",
  },
  {
    slug: "geo-visibilite-ia",
    icon: "geo",
    bg: "bg-sun",
    title: "GEO : visibilité IA",
    desc: "Être trouvé et cité par ChatGPT, Perplexity et Gemini : le référencement nouvelle génération.",
    tagline: (
      <>
        Cité par <span className="text-mint-dark">ChatGPT et Perplexity</span>
      </>
    ),
    subtitle:
      "Vos futurs clients ne demandent plus seulement à Google : ils demandent à ChatGPT, Perplexity ou Gemini. Le GEO (Generative Engine Optimization) fait de votre entreprise la réponse que les IA recommandent.",
    words: ["ChatGPT", "Perplexity", "Gemini", "Citations", "GEO"],
    features: [
      "Audit de votre visibilité actuelle dans les moteurs IA",
      "Contenus structurés pour être compris et cités par les LLM",
      "Données structurées (schema.org) posées proprement",
      "Présence renforcée sur les sources que les IA consultent",
      "Cohérence nom-adresse-téléphone sur tout le web",
      "Veille : les moteurs IA évoluent vite, votre stratégie aussi",
    ],
    stats: [
      { big: 800, suffix: " M+", label: "de personnes utilisent déjà des assistants IA chaque semaine" },
      { big: 1, suffix: "er", label: "au Luxembourg à proposer une offre GEO structurée" },
      { big: 2, suffix: " en 1", label: "le GEO renforce aussi votre SEO classique" },
    ],
    steps: [
      { n: "01", title: "Diagnostic", desc: "Que répondent ChatGPT et Perplexity quand on parle de votre secteur ?" },
      { n: "02", title: "Structuration", desc: "Contenus, données structurées, autorité : on rend votre site lisible par les IA." },
      { n: "03", title: "Diffusion", desc: "Présence sur les sources que les moteurs IA consultent et citent." },
      { n: "04", title: "Mesure", desc: "Suivi des citations et ajustements au rythme des évolutions IA." },
    ],
    faq: [
      {
        q: "Le GEO remplace-t-il le SEO ?",
        a: "Non, il le complète. Les moteurs IA s'appuient largement sur les contenus bien référencés : un bon SEO est le socle, le GEO est l'étage au-dessus. On travaille toujours les deux ensemble.",
      },
      {
        q: "Comment mesure-t-on les résultats GEO ?",
        a: "On interroge régulièrement les principaux assistants IA sur vos requêtes cibles et on documente les citations de votre marque, avec un rapport avant/après.",
      },
    ],
    related: ["seo", "contenus-copywriting", "data-reporting"],
    cta: "Testez votre visibilité IA",
  },
  {
    slug: "seo-local-luxembourg",
    icon: "local",
    bg: "bg-caramel",
    title: "SEO local Luxembourg",
    desc: "Être visible auprès des clients de votre zone : Google Maps, fiches locales, Grande Région.",
    tagline: (
      <>
        Le premier réflexe <span className="text-mint-dark">de vos voisins</span>
      </>
    ),
    subtitle:
      "« Restaurant Esch », « plombier Luxembourg-ville », « agence web Grande Région » : quand vos clients cherchent près de chez eux, votre entreprise doit sortir en premier, sur Google Maps comme dans les résultats classiques.",
    words: ["Google Maps", "Fiche locale", "Avis", "Grande Région", "Proximité"],
    features: [
      "Fiche Google Business Profile optimisée de A à Z",
      "Stratégie d'avis clients : en obtenir plus, y répondre bien",
      "Pages locales ciblées par ville et par quartier",
      "Cohérence de vos coordonnées sur tous les annuaires",
      "Photos et posts réguliers sur votre fiche",
      "Suivi des appels, itinéraires et clics générés",
    ],
    stats: [
      { big: 46, suffix: "%", label: "des recherches Google ont une intention locale" },
      { big: 3, suffix: " pack", label: "l'objectif : le trio de tête sur Google Maps" },
      { big: 5, suffix: " étoiles", label: "on vous aide à les mériter et à les afficher" },
    ],
    steps: [
      { n: "01", title: "État des lieux", desc: "Audit de votre fiche, de vos avis et de votre visibilité locale actuelle." },
      { n: "02", title: "Optimisation", desc: "Fiche complète, catégories justes, photos pro, coordonnées cohérentes." },
      { n: "03", title: "Avis", desc: "Un système simple pour collecter des avis réguliers et y répondre." },
      { n: "04", title: "Rayonnement", desc: "Pages locales et citations pour élargir votre zone de chalandise." },
    ],
    faq: [
      {
        q: "Je n'ai pas de boutique physique, le SEO local me concerne-t-il ?",
        a: "Oui, si vos clients sont dans une zone géographique : artisans, services à domicile, professions libérales… Une zone de service se référence aussi très bien.",
      },
      {
        q: "Que faire des avis négatifs ?",
        a: "Y répondre vite, avec professionnalisme, c'est souvent plus convaincant qu'une note parfaite. On vous fournit des trames de réponse et on vous accompagne.",
      },
    ],
    related: ["seo", "sites-vitrine", "campagnes-publicitaires"],
    cta: "Dominez votre zone",
  },
  {
    slug: "reseaux-sociaux",
    icon: "social",
    bg: "bg-mint",
    title: "Réseaux sociaux",
    desc: "Nous animons vos comptes pour fédérer une communauté et faire rayonner votre marque.",
    tagline: (
      <>
        Une marque <span className="text-mint-dark">qu'on a envie de suivre</span>
      </>
    ),
    subtitle:
      "Instagram, LinkedIn, Facebook, TikTok : on définit la stratégie, on crée les contenus, on publie, on répond. Votre marque vit sur les réseaux, et vous, vous vous concentrez sur votre métier.",
    words: ["Instagram", "LinkedIn", "TikTok", "Communauté", "Engagement"],
    features: [
      "Stratégie éditoriale alignée avec vos objectifs business",
      "Calendrier de publication tenu, sans trous ni improvisation",
      "Création de visuels et vidéos dans votre identité",
      "Community management : réponses, messages, modération",
      "Veille des tendances pour surfer au bon moment",
      "Reporting mensuel : portée, engagement, croissance",
    ],
    stats: [
      { big: 12, suffix: " posts", label: "par mois minimum pour exister vraiment dans les fils" },
      { big: 24, suffix: "h", label: "délai maximum de réponse à vos communautés" },
      { big: 1, suffix: " voix", label: "un ton cohérent sur tous vos canaux" },
    ],
    steps: [
      { n: "01", title: "Ligne éditoriale", desc: "Ton, thèmes, formats : le fil rouge qui rend votre marque reconnaissable." },
      { n: "02", title: "Production", desc: "Visuels, textes, vidéos : un mois de contenus préparés à l'avance." },
      { n: "03", title: "Animation", desc: "Publication, réponses, interactions : votre communauté est chouchoutée." },
      { n: "04", title: "Analyse", desc: "Ce qui marche est amplifié, ce qui ne marche pas est repensé." },
    ],
    faq: [
      {
        q: "Sur quels réseaux faut-il être présent ?",
        a: "Ceux où sont vos clients, pas forcément tous. Un B2B misera sur LinkedIn, un restaurant sur Instagram. On choisit ensemble 2 ou 3 canaux et on les traite très bien.",
      },
      {
        q: "Devrai-je fournir les photos et vidéos ?",
        a: "Idéalement quelques matières brutes de votre quotidien, c'est ce qui sonne le plus vrai. On s'occupe de tout le reste : cadrage, montage, habillage, textes.",
      },
    ],
    related: ["contenus-copywriting", "branding-identite", "campagnes-publicitaires"],
    cta: "Confiez-nous vos réseaux",
  },
  {
    slug: "contenus-copywriting",
    icon: "contenu",
    bg: "bg-sun",
    title: "Contenus & copywriting",
    desc: "Articles, pages, posts : des mots qui travaillent pour votre image et votre SEO.",
    tagline: (
      <>
        Des mots qui <span className="text-mint-dark">font agir</span>
      </>
    ),
    subtitle:
      "Un bon texte vend, rassure, référence. Pages de site, articles de blog, newsletters, posts : on écrit dans votre ton des contenus que vos clients lisent, et que Google et les IA adorent.",
    words: ["Copywriting", "Blog", "Storytelling", "SEO", "Ton de marque"],
    features: [
      "Pages de vente et d'accueil qui convertissent",
      "Articles de blog optimisés SEO, publiés régulièrement",
      "Ton de marque défini et tenu sur tous les supports",
      "Storytelling : raconter votre entreprise, pas juste la décrire",
      "Réécriture de l'existant qui a mal vieilli",
      "Contenus pensés aussi pour être cités par les IA (GEO)",
    ],
    stats: [
      { big: 2, suffix: "×", label: "un blog actif peut doubler le trafic d'un site en un an" },
      { big: 0, suffix: " jargon", label: "des textes que vos clients comprennent vraiment" },
      { big: 4, suffix: " articles", label: "par mois : le rythme de croisière que l'on recommande" },
    ],
    steps: [
      { n: "01", title: "Immersion", desc: "On apprend votre métier, vos clients et votre façon de parler." },
      { n: "02", title: "Stratégie", desc: "Sujets, mots-clés, calendrier : chaque contenu a un objectif." },
      { n: "03", title: "Rédaction", desc: "Écriture, relecture avec vous, ajustements jusqu'au bon ton." },
      { n: "04", title: "Publication", desc: "Mise en ligne optimisée, diffusion et mesure des retombées." },
    ],
    faq: [
      {
        q: "Utilisez-vous l'IA pour rédiger ?",
        a: "Comme outil, jamais comme rédacteur final. Chaque texte est pensé, structuré et relu par un humain qui connaît votre dossier, l'IA nous fait gagner du temps, pas de la qualité.",
      },
      {
        q: "Combien de temps pour voir l'effet SEO d'un blog ?",
        a: "Les premiers articles se positionnent généralement sous 2 à 4 mois. L'effet est cumulatif : chaque nouvel article renforce les précédents.",
      },
    ],
    related: ["seo", "reseaux-sociaux", "emailing-newsletters"],
    cta: "Donnez-nous la plume",
  },
  {
    slug: "branding-identite",
    icon: "brand",
    bg: "bg-mint",
    title: "Branding & identité",
    desc: "Logo, couleurs, ton : une identité cohérente qui reste en tête, du site aux réseaux.",
    tagline: (
      <>
        Une identité <span className="text-mint-dark">qui reste en tête</span>
      </>
    ),
    subtitle:
      "Votre marque, c'est ce qu'il reste quand on a fermé l'onglet. Logo, palette, typographies, ton : on construit une identité cohérente et mémorable, déclinée partout où votre entreprise apparaît.",
    words: ["Logo", "Palette", "Typographie", "Charte", "Cohérence"],
    features: [
      "Logo et déclinaisons (couleur, noir & blanc, favicon…)",
      "Palette de couleurs et typographies qui vous ressemblent",
      "Charte graphique claire, utilisable par tous vos prestataires",
      "Ton de voix : comment votre marque parle et écrit",
      "Templates réseaux sociaux et supports print de base",
      "Refonte en douceur d'une identité vieillissante",
    ],
    stats: [
      { big: 3, suffix: " pistes", label: "créatives proposées, pour choisir en confiance" },
      { big: 1, suffix: " charte", label: "un document de référence pour ne plus jamais improviser" },
      { big: 10, suffix: " ans", label: "une bonne identité est faite pour durer" },
    ],
    steps: [
      { n: "01", title: "Exploration", desc: "Votre histoire, vos valeurs, vos concurrents : on cherche l'angle juste." },
      { n: "02", title: "Pistes", desc: "Trois directions créatives argumentées, vous choisissez, on affine." },
      { n: "03", title: "Déclinaison", desc: "Logo, couleurs, typos, ton : l'identité complète prend forme." },
      { n: "04", title: "Charte", desc: "Tout est documenté pour une cohérence durable, partout." },
    ],
    faq: [
      {
        q: "J'ai déjà un logo, faut-il tout refaire ?",
        a: "Pas forcément. On évalue ce qui fonctionne encore et on propose soit un rafraîchissement en douceur, soit une refonte, en préservant ce que vos clients reconnaissent.",
      },
      {
        q: "Que contient exactement la charte graphique ?",
        a: "Le logo et ses règles d'usage, la palette exacte, les typographies, des exemples d'application, et le ton de voix. Tout prestataire peut travailler proprement à partir d'elle.",
      },
    ],
    related: ["sites-vitrine", "reseaux-sociaux", "contenus-copywriting"],
    cta: "Construisons votre marque",
  },
  {
    slug: "campagnes-publicitaires",
    icon: "ads",
    bg: "bg-caramel",
    title: "Campagnes publicitaires",
    desc: "Google Ads et social ads ciblés, pour un retour sur investissement mesurable et rapide.",
    tagline: (
      <>
        Chaque euro investi <span className="text-mint-dark">se justifie</span>
      </>
    ),
    subtitle:
      "Google Ads pour capter l'intention, social ads pour créer la demande : on conçoit, lance et optimise des campagnes dont chaque euro est suivi, visibilité immédiate, résultats mesurables.",
    words: ["Google Ads", "Social Ads", "Ciblage", "ROI", "Conversion"],
    features: [
      "Campagnes Google Ads : recherche, display, shopping",
      "Social ads Meta, LinkedIn, TikTok selon votre cible",
      "Landing pages dédiées qui convertissent le clic",
      "Ciblage précis : zone, audience, intention",
      "Tests A/B permanents sur annonces et visuels",
      "Budget maîtrisé : vous fixez le plafond, on maximise le rendement",
    ],
    stats: [
      { big: 24, suffix: "h", label: "pour être visible : la pub, c'est immédiat" },
      { big: 100, suffix: "%", label: "des conversions tracées, pas de dépense aveugle" },
      { big: 0, suffix: " engagement", label: "de durée : les budgets s'ajustent chaque mois" },
    ],
    steps: [
      { n: "01", title: "Objectifs", desc: "Leads, ventes, notoriété : on fixe la cible et le coût acceptable." },
      { n: "02", title: "Construction", desc: "Campagnes, annonces, landing pages : tout est prêt à convertir." },
      { n: "03", title: "Lancement", desc: "Mise en ligne progressive et surveillance quotidienne des débuts." },
      { n: "04", title: "Optimisation", desc: "Coupes et renforts chaque semaine selon les données réelles." },
    ],
    faq: [
      {
        q: "Quel budget publicitaire minimum ?",
        a: "On recommande rarement moins de 500 €/mois de média pour obtenir des données exploitables. En dessous, mieux vaut souvent investir dans le SEO, on vous le dira franchement.",
      },
      {
        q: "SEO ou publicité, que choisir ?",
        a: "La pub apporte des résultats immédiats, le SEO des résultats durables. La stratégie idéale : la pub finance le court terme pendant que le SEO construit le long terme.",
      },
    ],
    related: ["seo", "e-commerce", "data-reporting"],
    cta: "Lancez votre campagne",
  },
  {
    slug: "emailing-newsletters",
    icon: "mail",
    bg: "bg-sun",
    title: "Emailing & newsletters",
    desc: "Des e-mails bien tournés et esthétiques, le seul canal dont vous êtes vraiment propriétaire.",
    tagline: (
      <>
        Le canal dont vous êtes <span className="text-mint-dark">propriétaire</span>
      </>
    ),
    subtitle:
      "Les algorithmes changent, votre liste d'e-mails reste. Newsletters soignées, séquences automatiques, campagnes ponctuelles : on fait de votre boîte d'envoi un canal de vente régulier et rentable.",
    words: ["Newsletter", "Automation", "Brevo", "Délivrabilité", "Fidélité"],
    features: [
      "Newsletters designées, agréables à lire sur mobile",
      "Séquences automatiques : bienvenue, relance panier, fidélité",
      "Croissance propre de votre liste (formulaires, aimants)",
      "Délivrabilité soignée : arriver en boîte de réception, pas en spam",
      "Segmentation : le bon message à la bonne personne",
      "Conformité RGPD complète, désinscription propre",
    ],
    stats: [
      { big: 36, suffix: "×", label: "le retour moyen de l'e-mail : 36 € par euro investi" },
      { big: 100, suffix: "%", label: "votre liste vous appartient, aucun algorithme ne la confisque" },
      { big: 1, suffix: " clic", label: "pour se désinscrire, le respect fidélise aussi" },
    ],
    steps: [
      { n: "01", title: "Fondations", desc: "Outil (Brevo ou autre), domaine d'envoi, import propre de vos contacts." },
      { n: "02", title: "Gabarits", desc: "Des modèles à votre image, testés sur toutes les messageries." },
      { n: "03", title: "Automatisations", desc: "Les séquences qui travaillent seules : bienvenue, relances, fidélité." },
      { n: "04", title: "Rythme", desc: "Un calendrier tenable et des campagnes qui donnent envie d'ouvrir." },
    ],
    faq: [
      {
        q: "Je n'ai pas encore de liste d'e-mails, par où commencer ?",
        a: "Par la collecte : un formulaire bien placé, un aimant utile (guide, réduction, checklist) et quelques semaines suffisent pour démarrer une liste saine, cent vrais abonnés valent mieux que mille contacts achetés.",
      },
      {
        q: "À quelle fréquence envoyer ?",
        a: "La régularité prime sur le volume : une bonne newsletter mensuelle bat quatre e-mails improvisés. On définit un rythme que vous pouvez tenir dans la durée.",
      },
    ],
    related: ["contenus-copywriting", "e-commerce", "data-reporting"],
    cta: "Écrivons votre première newsletter",
  },
  {
    slug: "data-reporting",
    icon: "data",
    bg: "bg-mint",
    title: "Data & reporting",
    desc: "Positions SEO, performances des campagnes : des rapports clairs pour décider vite.",
    tagline: (
      <>
        Des chiffres qui <span className="text-mint-dark">parlent enfin clair</span>
      </>
    ),
    subtitle:
      "Trafic, positions, conversions, coût par lead : on mesure tout ce qui compte et on vous le restitue dans des rapports lisibles en cinq minutes. Fini de piloter à l'aveugle.",
    words: ["Analytics", "KPI", "Tableaux de bord", "Conversions", "Décisions"],
    features: [
      "Google Analytics 4 et Search Console configurés proprement",
      "Suivi des conversions : appels, formulaires, ventes",
      "Tableau de bord unique regroupant tous vos canaux",
      "Rapport mensuel commenté en français clair",
      "Alertes en cas d'anomalie (chute de trafic, bug de suivi)",
      "Recommandations concrètes, priorisées par impact",
    ],
    stats: [
      { big: 5, suffix: " min", label: "pour lire votre rapport mensuel et tout comprendre" },
      { big: 1, suffix: " dashboard", label: "tous vos canaux réunis au même endroit" },
      { big: 0, suffix: " vanity", label: "on mesure ce qui remplit le carnet de commandes" },
    ],
    steps: [
      { n: "01", title: "Plan de mesure", desc: "Quels chiffres comptent pour votre activité ? On les définit ensemble." },
      { n: "02", title: "Installation", desc: "Outils configurés, conversions tracées, données fiables." },
      { n: "03", title: "Tableau de bord", desc: "Une vue unique, lisible, mise à jour automatiquement." },
      { n: "04", title: "Pilotage", desc: "Chaque mois : ce qui a marché, ce qu'on ajuste, ce qu'on teste." },
    ],
    faq: [
      {
        q: "Mes données Analytics actuelles sont-elles fiables ?",
        a: "C'est la première chose que l'on vérifie : filtres manquants, conversions non tracées, spam… Un audit rapide dit si vos chiffres reflètent la réalité, souvent, il y a des surprises.",
      },
      {
        q: "Est-ce conforme au RGPD ?",
        a: "Oui : bandeau de consentement propre, anonymisation, durées de conservation maîtrisées. Mesurer sérieusement et respecter vos visiteurs vont très bien ensemble.",
      },
    ],
    related: ["seo", "campagnes-publicitaires", "e-commerce"],
    cta: "Reprenez le contrôle de vos chiffres",
  },
];

/* ── Traductions anglaises (champs textuels uniquement) ───────── */
const EN = {
  "sites-vitrine": {
    title: "Showcase websites",
    desc: "Your business presented with care, designed to turn visitors into enquiries.",
    tagline: (
      <>
        A website that makes people <span className="text-mint-dark">want to call you</span>
      </>
    ),
    subtitle:
      "Restaurants, practices, craftspeople, freelancers: your online showcase works for you 24/7. We make it beautiful, fast, and above all designed to turn a curious visitor into a real enquiry.",
    words: ["Showcase", "Design", "Fast", "Conversion", "Luxembourg"],
    features: [
      "Custom design aligned with your identity, never a generic template",
      "Structure built to convert: clear journey, visible calls to action",
      "Flawless responsive: mobile, tablet, desktop",
      "Copy crafted with you, in your tone of voice",
      "Essential SEO built in from day one",
      "Hands-on training so you stay autonomous",
    ],
    stats: [
      { big: 3, suffix: " wks", label: "average turnaround for a showcase site, discovery included" },
      { big: 100, suffix: "%", label: "custom-built, designed for your business and your clients" },
      { big: 1, suffix: " month", label: "of free support after launch" },
    ],
    steps: [
      { n: "01", title: "Discovery", desc: "We listen to your business, your clients and your goals, over a coffee." },
      { n: "02", title: "Mockup", desc: "A design that feels like you, approved together before a single line of code." },
      { n: "03", title: "Development", desc: "Polished build, subtle animations, performance that delivers." },
      { n: "04", title: "Launch", desc: "Go-live, Google indexing and tracking of your first enquiries." },
    ],
    faq: [
      {
        q: "How much does a showcase website cost?",
        a: "It depends on the number of pages and features. We put together a free quote after a first chat, no commitment and no jargon.",
      },
      {
        q: "Will I be able to edit the content myself?",
        a: "Yes. We train you on the admin and the editing interface is designed to be simple. You stay in full control of your copy and photos.",
      },
    ],
    cta: "Let's talk about your website",
  },
  "e-commerce": {
    title: "E-commerce",
    desc: "Fast, reassuring online stores, from catalogue to checkout.",
    tagline: (
      <>
        A store that <span className="text-mint-dark">sells while you sleep</span>
      </>
    ),
    subtitle:
      "Catalogue, cart, payment, shipping: we build fast, reassuring online stores where every step of the buying journey is optimized to reduce abandonment.",
    words: ["Store", "Cart", "Payment", "Shipping", "Conversion"],
    features: [
      "Clear product catalogue with effective search and filters",
      "Checkout funnel optimized to cut cart abandonment",
      "Secure payments: cards, PayPal, Payconiq…",
      "Built-in stock and shipping management",
      "SEO-minded product pages that attract free traffic",
      "A simple dashboard to track your sales",
    ],
    stats: [
      { big: 24, suffix: "/7", label: "your store keeps taking orders, even on public holidays" },
      { big: 3, suffix: " clicks", label: "at most between a customer arriving and paying" },
      { big: 100, suffix: "%", label: "GDPR-compliant, with legal notices included" },
    ],
    steps: [
      { n: "01", title: "Scoping", desc: "Catalogue, payment methods, shipping: we define the exact scope." },
      { n: "02", title: "Design", desc: "A smooth, reassuring shopping experience, mocked up page by page." },
      { n: "03", title: "Integration", desc: "Products, payments, carriers: everything wired up and tested." },
      { n: "04", title: "Opening", desc: "Launch, first buyers, and optimizations based on real data." },
    ],
    faq: [
      {
        q: "WordPress/WooCommerce or custom?",
        a: "For most stores, WooCommerce offers the best balance of flexibility and budget. For very specific needs or high volumes, we build custom. We advise you honestly based on your case.",
      },
      {
        q: "Do you handle compliance (GDPR, terms of sale)?",
        a: "We take care of legal notices, cookie management and GDPR best practices. For your terms of sale, we provide a solid base for your lawyer to validate.",
      },
    ],
    cta: "Let's talk about your store",
  },
  "developpement-sur-mesure": {
    title: "Custom development",
    desc: "SaaS, platforms, business tools: code tailored to your needs, that grows with you.",
    tagline: (
      <>
        Code tailored <span className="text-mint-dark">to your business</span>
      </>
    ),
    subtitle:
      "When a template is no longer enough: SaaS, client portals, internal tools, specific integrations. We build robust applications that fit your processes, not the other way around.",
    words: ["SaaS", "Platform", "API", "React", "Performance"],
    features: [
      "Architecture designed to evolve with your business",
      "Modern React interfaces, fast and a pleasure to use",
      "Integrations with your existing tools (CRM, invoicing, APIs…)",
      "Secure client areas and dashboards",
      "Optimal performance and loading speed",
      "Documented, maintainable code that belongs to you",
    ],
    stats: [
      { big: 0, suffix: " templates", label: "everything is built for your exact processes" },
      { big: 99, suffix: ".9%", label: "uptime targeted on our deployments" },
      { big: 100, suffix: "%", label: "yours: you own the source code" },
    ],
    steps: [
      { n: "01", title: "Specifications", desc: "We turn your business needs into concrete, prioritized features." },
      { n: "02", title: "Prototype", desc: "A first clickable version to validate the journeys quickly." },
      { n: "03", title: "Development", desc: "Short sprints, regular demos: you watch the product take shape." },
      { n: "04", title: "Deployment", desc: "Go-live, training and long-term support." },
    ],
    faq: [
      {
        q: "What budget for custom work?",
        a: "Custom development usually starts at a few thousand euros and depends heavily on scope. After scoping, you receive a detailed quote broken down by feature, and you decide what makes it into V1.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The source code is delivered with its documentation and you hold full ownership. No forced dependency on us.",
      },
    ],
    cta: "Tell us about your idea",
  },
  seo: {
    title: "SEO",
    desc: "Put your site at the top of Google with a lasting strategy, without paying for ads.",
    tagline: (
      <>
        At the top of Google, <span className="text-mint-dark">there to stay</span>
      </>
    ),
    subtitle:
      "Organic search is the most profitable marketing asset over time: deep work on your site's technical health, content and authority, to capture qualified traffic without paying for every click.",
    words: ["Google", "Keywords", "Content", "Backlinks", "Rankings"],
    features: [
      "Full technical audit: speed, indexing, structure",
      "Keyword research based on your real market",
      "Optimization of existing pages (tags, content, internal linking)",
      "A content strategy that attracts qualified traffic",
      "Clean link building to strengthen your authority",
      "Monthly rank tracking and a clear report",
    ],
    stats: [
      { big: 90, suffix: "+", label: "PageSpeed score targeted on the sites we optimize" },
      { big: 0, suffix: " €", label: "per click: SEO traffic is free once earned" },
      { big: 12, suffix: " months", label: "the horizon of real SEO work, and we're upfront about it" },
    ],
    steps: [
      { n: "01", title: "Audit", desc: "Technical and competitive review: where you stand, where to go." },
      { n: "02", title: "Foundations", desc: "Technical fixes and optimization of your strategic pages." },
      { n: "03", title: "Content", desc: "Regular production of pages and articles that rank." },
      { n: "04", title: "Authority", desc: "Link building and reputation to lock in the rankings you've won." },
    ],
    faq: [
      {
        q: "How long before we see results?",
        a: "The first gains often show within 3 months, solid results between 6 and 12. SEO is a long-term investment, not a sprint, so beware of anyone promising the top spot in 30 days.",
      },
      {
        q: "Does SEO still work in the age of AI?",
        a: "More than ever: AI engines rely on well-ranked content. That's why we systematically pair SEO with GEO, see our dedicated expertise.",
      },
    ],
    cta: "Request your SEO audit",
  },
  "geo-visibilite-ia": {
    title: "GEO: AI visibility",
    desc: "Get found and cited by ChatGPT, Perplexity and Gemini: next-generation search optimization.",
    tagline: (
      <>
        Cited by <span className="text-mint-dark">ChatGPT and Perplexity</span>
      </>
    ),
    subtitle:
      "Your future clients no longer just ask Google: they ask ChatGPT, Perplexity or Gemini. GEO (Generative Engine Optimization) makes your business the answer AI assistants recommend.",
    words: ["ChatGPT", "Perplexity", "Gemini", "Citations", "GEO"],
    features: [
      "Audit of your current visibility in AI engines",
      "Content structured to be understood and cited by LLMs",
      "Structured data (schema.org) implemented properly",
      "Stronger presence on the sources AI engines consult",
      "Consistent name-address-phone details across the whole web",
      "Ongoing watch: AI engines evolve fast, so does your strategy",
    ],
    stats: [
      { big: 800, suffix: " M+", label: "people already use AI assistants every week" },
      { big: 1, suffix: "st", label: "in Luxembourg to offer a structured GEO service" },
      { big: 2, suffix: " in 1", label: "GEO also strengthens your classic SEO" },
    ],
    steps: [
      { n: "01", title: "Diagnosis", desc: "What do ChatGPT and Perplexity answer when asked about your sector?" },
      { n: "02", title: "Structuring", desc: "Content, structured data, authority: we make your site readable by AI." },
      { n: "03", title: "Distribution", desc: "Presence on the sources AI engines consult and cite." },
      { n: "04", title: "Measurement", desc: "Citation tracking and adjustments as AI keeps evolving." },
    ],
    faq: [
      {
        q: "Does GEO replace SEO?",
        a: "No, it complements it. AI engines lean heavily on well-ranked content: solid SEO is the foundation, GEO is the floor above. We always work on both together.",
      },
      {
        q: "How do you measure GEO results?",
        a: "We regularly query the main AI assistants on your target questions and document your brand's citations, with a before/after report.",
      },
    ],
    cta: "Test your AI visibility",
  },
  "seo-local-luxembourg": {
    title: "Local SEO Luxembourg",
    desc: "Be visible to clients in your area: Google Maps, local listings, Greater Region.",
    tagline: (
      <>
        The go-to choice <span className="text-mint-dark">for your neighbours</span>
      </>
    ),
    subtitle:
      "“Restaurant Esch”, “plumber Luxembourg City”, “web agency Greater Region”: when your clients search near them, your business needs to come out on top, on Google Maps and in classic results alike.",
    words: ["Google Maps", "Local listing", "Reviews", "Greater Region", "Proximity"],
    features: [
      "Google Business Profile optimized from A to Z",
      "Client review strategy: earn more reviews, respond well",
      "Local pages targeted by town and neighbourhood",
      "Consistent contact details across every directory",
      "Regular photos and posts on your listing",
      "Tracking of calls, directions and clicks generated",
    ],
    stats: [
      { big: 46, suffix: "%", label: "of Google searches have local intent" },
      { big: 3, suffix: "-pack", label: "the goal: Google Maps' top-three spots" },
      { big: 5, suffix: " stars", label: "we help you earn them and show them off" },
    ],
    steps: [
      { n: "01", title: "Baseline", desc: "Audit of your listing, your reviews and your current local visibility." },
      { n: "02", title: "Optimization", desc: "Complete profile, accurate categories, pro photos, consistent details." },
      { n: "03", title: "Reviews", desc: "A simple system to collect regular reviews and respond to them." },
      { n: "04", title: "Reach", desc: "Local pages and citations to widen your catchment area." },
    ],
    faq: [
      {
        q: "I don't have a physical shop, does local SEO apply to me?",
        a: "Yes, if your clients are in a geographic area: tradespeople, home services, independent professionals… A service area ranks very well too.",
      },
      {
        q: "What about negative reviews?",
        a: "Respond quickly and professionally, which is often more convincing than a perfect score. We provide response templates and support you.",
      },
    ],
    cta: "Own your area",
  },
  "reseaux-sociaux": {
    title: "Social media",
    desc: "We run your accounts to build a community and make your brand shine.",
    tagline: (
      <>
        A brand <span className="text-mint-dark">people want to follow</span>
      </>
    ),
    subtitle:
      "Instagram, LinkedIn, Facebook, TikTok: we set the strategy, create the content, publish and reply. Your brand lives on social, and you focus on your business.",
    words: ["Instagram", "LinkedIn", "TikTok", "Community", "Engagement"],
    features: [
      "Editorial strategy aligned with your business goals",
      "A publishing calendar we actually keep, no gaps, no improvising",
      "Visuals and videos created in your identity",
      "Community management: replies, messages, moderation",
      "Trend watching to ride the wave at the right moment",
      "Monthly reporting: reach, engagement, growth",
    ],
    stats: [
      { big: 12, suffix: " posts", label: "per month minimum to truly exist in the feeds" },
      { big: 24, suffix: "h", label: "maximum response time to your communities" },
      { big: 1, suffix: " voice", label: "one consistent tone across all your channels" },
    ],
    steps: [
      { n: "01", title: "Editorial line", desc: "Tone, themes, formats: the thread that makes your brand recognizable." },
      { n: "02", title: "Production", desc: "Visuals, copy, videos: a full month of content prepared in advance." },
      { n: "03", title: "Publishing", desc: "Posting, replies, interactions: your community is well looked after." },
      { n: "04", title: "Analysis", desc: "What works gets amplified, what doesn't gets rethought." },
    ],
    faq: [
      {
        q: "Which networks should we be on?",
        a: "The ones your clients use, not necessarily all of them. A B2B company will bet on LinkedIn, a restaurant on Instagram. Together we pick 2 or 3 channels and do them really well.",
      },
      {
        q: "Do I need to provide photos and videos?",
        a: "Ideally some raw material from your day-to-day, as that's what feels most genuine. We handle everything else: framing, editing, styling, copy.",
      },
    ],
    cta: "Hand us your socials",
  },
  "contenus-copywriting": {
    title: "Content & copywriting",
    desc: "Articles, pages, posts: words that work for your image and your SEO.",
    tagline: (
      <>
        Words that <span className="text-mint-dark">make people act</span>
      </>
    ),
    subtitle:
      "Good copy sells, reassures, ranks. Website pages, blog articles, newsletters, posts: we write content in your tone that your clients actually read, and that Google and AI love.",
    words: ["Copywriting", "Blog", "Storytelling", "SEO", "Brand voice"],
    features: [
      "Sales and home pages that convert",
      "SEO-optimized blog articles, published regularly",
      "A brand voice defined and upheld across every channel",
      "Storytelling: telling your company's story, not just describing it",
      "Rewriting existing copy that hasn't aged well",
      "Content also designed to be cited by AI (GEO)",
    ],
    stats: [
      { big: 2, suffix: "×", label: "an active blog can double a site's traffic in a year" },
      { big: 0, suffix: " jargon", label: "copy your clients actually understand" },
      { big: 4, suffix: " articles", label: "per month: the cruising pace we recommend" },
    ],
    steps: [
      { n: "01", title: "Immersion", desc: "We learn your business, your clients and the way you speak." },
      { n: "02", title: "Strategy", desc: "Topics, keywords, calendar: every piece of content has a goal." },
      { n: "03", title: "Writing", desc: "Drafting, review with you, refining until the tone is right." },
      { n: "04", title: "Publishing", desc: "Optimized publication, distribution and measurement of the impact." },
    ],
    faq: [
      {
        q: "Do you use AI to write?",
        a: "As a tool, never as the final writer. Every text is thought through, structured and proofread by a human who knows your file. AI saves us time, not quality.",
      },
      {
        q: "How long before a blog shows SEO results?",
        a: "The first articles usually rank within 2 to 4 months. The effect compounds: every new article strengthens the previous ones.",
      },
    ],
    cta: "Hand us the pen",
  },
  "branding-identite": {
    title: "Branding & identity",
    desc: "Logo, colours, tone: a consistent identity that sticks, from your website to your socials.",
    tagline: (
      <>
        An identity <span className="text-mint-dark">people remember</span>
      </>
    ),
    subtitle:
      "Your brand is what's left once the tab is closed. Logo, palette, typography, tone: we build a consistent, memorable identity, rolled out everywhere your company shows up.",
    words: ["Logo", "Palette", "Typography", "Guidelines", "Consistency"],
    features: [
      "Logo and variations (colour, black & white, favicon…)",
      "A colour palette and typography that feel like you",
      "Clear brand guidelines any of your partners can use",
      "Tone of voice: how your brand speaks and writes",
      "Social media templates and essential print materials",
      "Gentle refresh of an ageing identity",
    ],
    stats: [
      { big: 3, suffix: " concepts", label: "creative directions proposed, so you choose with confidence" },
      { big: 1, suffix: " guide", label: "one reference document, so you never improvise again" },
      { big: 10, suffix: " years", label: "a good identity is built to last" },
    ],
    steps: [
      { n: "01", title: "Exploration", desc: "Your story, your values, your competitors: we look for the right angle." },
      { n: "02", title: "Directions", desc: "Three reasoned creative directions. You choose, we refine." },
      { n: "03", title: "Roll-out", desc: "Logo, colours, type, tone: the full identity takes shape." },
      { n: "04", title: "Guidelines", desc: "Everything documented for lasting consistency, everywhere." },
    ],
    faq: [
      {
        q: "I already have a logo, do we start from scratch?",
        a: "Not necessarily. We assess what still works and propose either a gentle refresh or a redesign, preserving what your clients recognize.",
      },
      {
        q: "What exactly do the brand guidelines contain?",
        a: "The logo and its usage rules, the exact palette, the typefaces, application examples, and the tone of voice. Any partner can work cleanly from it.",
      },
    ],
    cta: "Let's build your brand",
  },
  "campagnes-publicitaires": {
    title: "Advertising campaigns",
    desc: "Targeted Google Ads and social ads, for a fast, measurable return on investment.",
    tagline: (
      <>
        Every euro invested <span className="text-mint-dark">earns its keep</span>
      </>
    ),
    subtitle:
      "Google Ads to capture intent, social ads to create demand: we design, launch and optimize campaigns where every euro is tracked. Instant visibility, measurable results.",
    words: ["Google Ads", "Social Ads", "Targeting", "ROI", "Conversion"],
    features: [
      "Google Ads campaigns: search, display, shopping",
      "Meta, LinkedIn and TikTok social ads depending on your audience",
      "Dedicated landing pages that convert the click",
      "Precise targeting: area, audience, intent",
      "Continuous A/B testing on ads and creatives",
      "Budget under control: you set the ceiling, we maximize the return",
    ],
    stats: [
      { big: 24, suffix: "h", label: "to get visible: advertising is instant" },
      { big: 100, suffix: "%", label: "of conversions tracked, no blind spending" },
      { big: 0, suffix: " lock-in", label: "budgets adjust every single month" },
    ],
    steps: [
      { n: "01", title: "Goals", desc: "Leads, sales, awareness: we set the target and the acceptable cost." },
      { n: "02", title: "Build", desc: "Campaigns, ads, landing pages: everything ready to convert." },
      { n: "03", title: "Launch", desc: "Progressive go-live with daily monitoring of the early days." },
      { n: "04", title: "Optimization", desc: "Cuts and boosts every week, driven by real data." },
    ],
    faq: [
      {
        q: "What's the minimum ad budget?",
        a: "We rarely recommend less than €500/month in media spend to get usable data. Below that, SEO is often the better investment, and we'll tell you so frankly.",
      },
      {
        q: "SEO or advertising, which should I choose?",
        a: "Ads bring immediate results, SEO brings lasting ones. The ideal strategy: ads fund the short term while SEO builds the long term.",
      },
    ],
    cta: "Launch your campaign",
  },
  "emailing-newsletters": {
    title: "Email & newsletters",
    desc: "Well-crafted, good-looking emails: the only channel you truly own.",
    tagline: (
      <>
        The channel you truly <span className="text-mint-dark">own</span>
      </>
    ),
    subtitle:
      "Algorithms change; your email list stays. Polished newsletters, automated sequences, one-off campaigns: we turn your outbox into a steady, profitable sales channel.",
    words: ["Newsletter", "Automation", "Brevo", "Deliverability", "Loyalty"],
    features: [
      "Designed newsletters that are a pleasure to read on mobile",
      "Automated sequences: welcome, cart recovery, loyalty",
      "Clean list growth (forms, lead magnets)",
      "Careful deliverability: landing in the inbox, not in spam",
      "Segmentation: the right message to the right person",
      "Full GDPR compliance, clean unsubscribe",
    ],
    stats: [
      { big: 36, suffix: "×", label: "email's average return: €36 for every euro invested" },
      { big: 100, suffix: "%", label: "your list belongs to you, no algorithm can take it away" },
      { big: 1, suffix: " click", label: "to unsubscribe: respect builds loyalty too" },
    ],
    steps: [
      { n: "01", title: "Foundations", desc: "Tool (Brevo or other), sending domain, clean import of your contacts." },
      { n: "02", title: "Templates", desc: "Templates in your image, tested across every mail client." },
      { n: "03", title: "Automations", desc: "The sequences that work on their own: welcome, follow-ups, loyalty." },
      { n: "04", title: "Rhythm", desc: "A sustainable calendar and campaigns people want to open." },
    ],
    faq: [
      {
        q: "I don't have an email list yet, where do I start?",
        a: "With collection: a well-placed form, a useful lead magnet (guide, discount, checklist) and a few weeks are enough to start a healthy list. A hundred real subscribers beat a thousand bought contacts.",
      },
      {
        q: "How often should we send?",
        a: "Consistency beats volume: one good monthly newsletter beats four improvised emails. We set a rhythm you can sustain over time.",
      },
    ],
    cta: "Let's write your first newsletter",
  },
  "data-reporting": {
    title: "Data & reporting",
    desc: "SEO rankings, campaign performance: clear reports so you can decide fast.",
    tagline: (
      <>
        Numbers that <span className="text-mint-dark">finally make sense</span>
      </>
    ),
    subtitle:
      "Traffic, rankings, conversions, cost per lead: we measure everything that matters and hand it back in reports you can read in five minutes. No more flying blind.",
    words: ["Analytics", "KPIs", "Dashboards", "Conversions", "Decisions"],
    features: [
      "Google Analytics 4 and Search Console configured properly",
      "Conversion tracking: calls, forms, sales",
      "One dashboard bringing all your channels together",
      "A monthly report explained in plain English",
      "Alerts when something's off (traffic drop, tracking bug)",
      "Concrete recommendations, prioritized by impact",
    ],
    stats: [
      { big: 5, suffix: " min", label: "to read your monthly report and understand everything" },
      { big: 1, suffix: " dashboard", label: "all your channels in one place" },
      { big: 0, suffix: " vanity", label: "we measure what fills the order book" },
    ],
    steps: [
      { n: "01", title: "Measurement plan", desc: "Which numbers matter for your business? We define them together." },
      { n: "02", title: "Setup", desc: "Tools configured, conversions tracked, reliable data." },
      { n: "03", title: "Dashboard", desc: "A single, readable view, updated automatically." },
      { n: "04", title: "Steering", desc: "Every month: what worked, what we adjust, what we test." },
    ],
    faq: [
      {
        q: "Is my current Analytics data reliable?",
        a: "That's the first thing we check: missing filters, untracked conversions, spam… A quick audit tells you whether your numbers reflect reality, and there are often surprises.",
      },
      {
        q: "Is it GDPR-compliant?",
        a: "Yes: a clean consent banner, anonymization, controlled retention periods. Measuring seriously and respecting your visitors go very well together.",
      },
    ],
    cta: "Take back control of your numbers",
  },
};

export function getExpertises(lang = "fr") {
  if (lang === "fr") return EXPERTISES;
  return EXPERTISES.map((e) => ({ ...e, ...EN[e.slug] }));
}

export const getExpertise = (slug, lang = "fr") => getExpertises(lang).find((e) => e.slug === slug);
