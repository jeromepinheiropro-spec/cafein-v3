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
      "Design sur mesure aligné avec votre identité — jamais de template générique",
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
      { n: "01", title: "Découverte", desc: "On écoute votre métier, vos clients, vos objectifs — autour d'un café." },
      { n: "02", title: "Maquette", desc: "Un design qui vous ressemble, validé ensemble avant la moindre ligne de code." },
      { n: "03", title: "Développement", desc: "Intégration soignée, animations légères, performance au rendez-vous." },
      { n: "04", title: "Lancement", desc: "Mise en ligne, indexation Google et suivi des premiers contacts." },
    ],
    faq: [
      {
        q: "Combien coûte un site vitrine ?",
        a: "Cela dépend du nombre de pages et des fonctionnalités. On établit un devis gratuit après un premier échange — sans engagement et sans jargon.",
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
      "Quand un template ne suffit plus : SaaS, portails clients, outils internes, intégrations spécifiques. On conçoit des applications robustes qui épousent vos processus — pas l'inverse.",
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
        a: "Un développement sur mesure commence généralement à quelques milliers d'euros et dépend fortement du périmètre. Après cadrage, vous recevez un devis détaillé par fonctionnalité — vous décidez de ce qui entre dans la V1.",
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
      { big: 12, suffix: " mois", label: "l'horizon d'un vrai travail SEO — on est francs là-dessus" },
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
        a: "Les premières progressions arrivent souvent sous 3 mois, les résultats solides entre 6 et 12 mois. Le SEO est un investissement durable, pas un sprint — méfiez-vous de ceux qui promettent la première position en 30 jours.",
      },
      {
        q: "Le SEO fonctionne-t-il encore avec l'IA ?",
        a: "Plus que jamais : les moteurs IA s'appuient sur les contenus bien référencés. C'est pour ça qu'on couple systématiquement SEO et GEO — voir notre expertise dédiée.",
      },
    ],
    related: ["geo-visibilite-ia", "seo-local-luxembourg", "contenus-copywriting"],
    cta: "Demandez votre audit SEO",
  },
  {
    slug: "geo-visibilite-ia",
    icon: "geo",
    bg: "bg-sun",
    title: "GEO — visibilité IA",
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
      "« Restaurant Esch », « plombier Luxembourg-ville », « agence web Grande Région » : quand vos clients cherchent près de chez eux, votre entreprise doit sortir en premier — sur Google Maps comme dans les résultats classiques.",
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
        a: "Y répondre vite, avec professionnalisme — c'est souvent plus convaincant qu'une note parfaite. On vous fournit des trames de réponse et on vous accompagne.",
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
      "Instagram, LinkedIn, Facebook, TikTok : on définit la stratégie, on crée les contenus, on publie, on répond. Votre marque vit sur les réseaux — et vous, vous vous concentrez sur votre métier.",
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
        a: "Ceux où sont vos clients — pas forcément tous. Un B2B misera sur LinkedIn, un restaurant sur Instagram. On choisit ensemble 2 ou 3 canaux et on les traite très bien.",
      },
      {
        q: "Devrai-je fournir les photos et vidéos ?",
        a: "Idéalement quelques matières brutes de votre quotidien — c'est ce qui sonne le plus vrai. On s'occupe de tout le reste : cadrage, montage, habillage, textes.",
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
      "Un bon texte vend, rassure, référence. Pages de site, articles de blog, newsletters, posts : on écrit dans votre ton des contenus que vos clients lisent — et que Google et les IA adorent.",
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
        a: "Comme outil, jamais comme rédacteur final. Chaque texte est pensé, structuré et relu par un humain qui connaît votre dossier — l'IA nous fait gagner du temps, pas de la qualité.",
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
      { n: "02", title: "Pistes", desc: "Trois directions créatives argumentées — vous choisissez, on affine." },
      { n: "03", title: "Déclinaison", desc: "Logo, couleurs, typos, ton : l'identité complète prend forme." },
      { n: "04", title: "Charte", desc: "Tout est documenté pour une cohérence durable, partout." },
    ],
    faq: [
      {
        q: "J'ai déjà un logo, faut-il tout refaire ?",
        a: "Pas forcément. On évalue ce qui fonctionne encore et on propose soit un rafraîchissement en douceur, soit une refonte — en préservant ce que vos clients reconnaissent.",
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
      "Google Ads pour capter l'intention, social ads pour créer la demande : on conçoit, lance et optimise des campagnes dont chaque euro est suivi — visibilité immédiate, résultats mesurables.",
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
      { big: 100, suffix: "%", label: "des conversions tracées — pas de dépense aveugle" },
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
        a: "On recommande rarement moins de 500 €/mois de média pour obtenir des données exploitables. En dessous, mieux vaut souvent investir dans le SEO — on vous le dira franchement.",
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
      { big: 1, suffix: " clic", label: "pour se désinscrire — le respect fidélise aussi" },
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
        a: "Par la collecte : un formulaire bien placé, un aimant utile (guide, réduction, checklist) et quelques semaines suffisent pour démarrer une liste saine — cent vrais abonnés valent mieux que mille contacts achetés.",
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
        a: "C'est la première chose que l'on vérifie : filtres manquants, conversions non tracées, spam… Un audit rapide dit si vos chiffres reflètent la réalité — souvent, il y a des surprises.",
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

export const getExpertise = (slug) => EXPERTISES.find((e) => e.slug === slug);
