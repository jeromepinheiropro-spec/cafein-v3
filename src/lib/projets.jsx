import React from "react";

/*
  Les réalisations du groupe (menées avec Nooki, notre agence sœur).
  Chaque projet a sa page dédiée : /realisations/:slug
*/

export const PROJETS = [
  {
    slug: "kinteraction",
    n: "01",
    year: "2025",
    title: "Kinteraction",
    tags: "Site web · Graphisme",
    tagList: ["Site web", "Graphisme", "SEO", "UX"],
    img: "https://nooki.fr/wp-content/uploads/2025/07/projet-kinteraction.webp",
    alt: "Projet Kinteraction : création de site web et identité visuelle",
    shadow: "#1FCE8A",
    bg: "bg-mint",
    client:
      "Jeune marque éducative, Kinteraction aide les parents à initier leurs enfants à l'anglais dès le plus jeune âge, naturellement, et sans écran.",
    tagline: (
      <>
        Un site aussi ludique que <span className="text-mint-dark">la méthode qu'il présente</span>
      </>
    ),
    mission: [
      "Pour accompagner le lancement de la marque, il fallait un site capable de faire deux choses à la fois : séduire les enfants par son univers, et rassurer les parents par son sérieux. Nous avons conçu un design coloré et immersif, qui met en avant l'approche scientifique de la méthode sans jamais devenir austère.",
      "Chaque box thématique (BathTime, BedTime…) a son univers visuel, la navigation guide naturellement vers l'achat, et un travail spécifique sur le SEO et l'UX permet aujourd'hui à Kinteraction de gagner en visibilité et de convertir ses visiteurs en clients.",
    ],
    done: [
      "Site e-commerce ludique et rassurant, pensé pour les parents",
      "Univers visuel coloré et immersif pour chaque box thématique",
      "Parcours d'achat simplifié, de la découverte au paiement",
      "Mise en avant de l'approche scientifique de la méthode",
      "Optimisation SEO pour la visibilité sur Google",
      "Travail UX complet pour encourager la découverte",
    ],
    stats: null,
    words: ["E-commerce", "Design ludique", "UX", "SEO", "Éducation"],
    related: ["sites-vitrine", "e-commerce", "branding-identite"],
  },
  {
    slug: "le-101",
    n: "02",
    year: "2024",
    title: "Le 101",
    tags: "Référencement SEO",
    tagList: ["SEO", "Contenus", "Visibilité locale"],
    img: "https://nooki.fr/wp-content/uploads/2025/07/projet-le-101.webp",
    alt: "Projet Le 101 : stratégie de référencement naturel SEO pour une galerie d'art",
    shadow: "#F4A259",
    bg: "bg-caramel",
    client:
      "Le 101 est une galerie d'art moderne et contemporain en plein cœur de Bordeaux, fréquentée par les amateurs d'art comme les collectionneurs.",
    tagline: (
      <>
        Faire rayonner une galerie d'art <span className="text-mint-dark">sur Google</span>
      </>
    ),
    mission: [
      "L'objectif : attirer les amateurs d'art et les collectionneurs en positionnant Le 101 comme un lieu incontournable de la scène bordelaise. Le référencement a été travaillé en profondeur autour des expositions, des artistes et des œuvres, un contenu vivant, qui évolue au rythme de la galerie.",
      "En quatre mois, le trafic organique a décollé : les impressions ont plus que doublé et la galerie s'est installée en première position sur des mots-clés stratégiques de son univers.",
    ],
    done: [
      "Audit SEO complet du site et de la concurrence locale",
      "Optimisation des contenus : expositions, artistes, œuvres",
      "Stratégie de mots-clés ciblée sur l'univers de l'art",
      "Amélioration du positionnement local à Bordeaux",
      "Suivi mensuel des positions et du trafic",
      "Renforcement de l'image avant-gardiste de la galerie",
    ],
    stats: [
      { big: 119, prefix: "+", suffix: "%", label: "d'impressions dans Google en 4 mois" },
      { big: 67, prefix: "+", suffix: "", label: "nouveaux mots-clés indexés" },
      { big: 6, prefix: "+", suffix: "", label: "mots-clés en position n°1" },
    ],
    words: ["SEO", "Galerie d'art", "Contenus", "Top 1", "Bordeaux"],
    related: ["seo", "seo-local-luxembourg", "contenus-copywriting"],
  },
  {
    slug: "efluenz",
    n: "03",
    year: "2026",
    title: "Efluenz",
    tags: "Site web · Graphisme",
    tagList: ["Site web", "Graphisme", "Multilingue"],
    img: "https://nooki.fr/wp-content/uploads/2026/06/efluenz-projet.webp",
    alt: "Projet Efluenz : site web multilingue pour une agence d'influence marketing",
    shadow: "#FFD166",
    bg: "bg-sun",
    client:
      "Efluenz est une agence d'influence marketing européenne qui connecte les marques avec des nano et micro-influenceurs pour des campagnes authentiques et performantes.",
    tagline: (
      <>
        Un site multilingue pour une agence <span className="text-mint-dark">qui parle à deux publics</span>
      </>
    ),
    mission: [
      "Le défi d'Efluenz : s'adresser à deux cibles très différentes sur un même site. D'un côté les marques qui cherchent des campagnes d'influence performantes, de l'autre les créateurs de contenu qui veulent rejoindre le réseau. Chacun devait trouver son chemin en quelques secondes.",
      "Nous avons conçu une architecture claire à double entrée, avec une expérience pensée pour guider chaque visiteur vers la bonne action, demander une campagne ou postuler comme influenceur, le tout en plusieurs langues, à l'image de son positionnement européen.",
    ],
    done: [
      "Site web multilingue à l'image du positionnement européen",
      "Architecture à double entrée : marques et créateurs",
      "Parcours utilisateur guidé vers la bonne action",
      "Mise en valeur de l'expertise influence marketing",
      "Formulaires d'inscription simples pour les influenceurs",
      "Design premium aligné sur l'univers des réseaux sociaux",
    ],
    stats: null,
    words: ["Multilingue", "Influence", "UX", "Site web", "Europe"],
    related: ["sites-vitrine", "reseaux-sociaux", "branding-identite"],
  },
  {
    slug: "xucom",
    n: "04",
    year: "2025",
    title: "Xucom",
    tags: "Graphisme · Web design · SEO",
    tagList: ["Graphisme", "Web design", "SEO"],
    img: "https://nooki.fr/wp-content/uploads/2025/07/projet-xucom.webp",
    alt: "Projet Xucom : refonte de site, identité visuelle et SEO pour une agence print",
    shadow: "#FFD166",
    bg: "bg-cream-2",
    client:
      "Xucom, agence de communication print installée en Lorraine, voulait une présence en ligne à la hauteur de la qualité de ses services.",
    tagline: (
      <>
        Une refonte complète, <span className="text-mint-dark">du pixel au référencement</span>
      </>
    ),
    mission: [
      "Le site historique de Xucom ne reflétait plus la qualité du travail de l'agence. Nous avons entièrement repensé sa présence en ligne : identité visuelle affirmée, design épuré et navigation fluide, pour une expérience à la fois professionnelle et engageante.",
      "En parallèle, un travail de fond sur le SEO a été mené pour renforcer sa visibilité sur les moteurs de recherche. Le nouveau site valorise les expertises de l'agence et facilite la prise de contact et les demandes de devis.",
    ],
    done: [
      "Refonte complète du site web de l'agence",
      "Identité visuelle affirmée et design épuré",
      "Navigation fluide et hiérarchie claire des services",
      "Optimisation SEO de fond sur l'ensemble des pages",
      "Parcours de contact et de devis simplifié",
      "Valorisation des réalisations print de l'agence",
    ],
    stats: null,
    words: ["Refonte", "Web design", "SEO", "Identité", "Print"],
    related: ["sites-vitrine", "seo", "branding-identite"],
  },
  {
    slug: "7-plis",
    n: "05",
    year: "2024",
    title: "7 Plis",
    tags: "Campagnes SEA",
    tagList: ["SEA", "Google Ads", "E-commerce"],
    img: "https://nooki.fr/wp-content/uploads/2025/07/projet-7-plis.webp",
    alt: "Projet 7 Plis : campagnes Google Ads pour un shop de skateboards recyclés",
    shadow: "#1FCE8A",
    bg: "bg-mint",
    client:
      "7 Plis est un shop en ligne qui crée des accessoires uniques à partir de skateboards recyclés, une marque street et écoresponsable.",
    tagline: (
      <>
        Des campagnes Google Ads <span className="text-mint-dark">qui roulent toutes seules</span>
      </>
    ),
    mission: [
      "La mission : attirer un maximum de passionnés vers la boutique et booster les ventes en ligne, avec un budget maîtrisé de 200 € par mois. Les annonces jouent à fond sur l'image street et écoresponsable de la marque pour capter les visiteurs en quête de produits originaux.",
      "Résultat : en neuf mois, des campagnes ciblées et ajustées en continu ont généré plus de 400 conversions pour un coût par clic de 0,13 €, sur un marché pourtant concurrentiel. La preuve qu'un petit budget bien piloté peut faire de grandes choses.",
    ],
    done: [
      "Stratégie Google Ads adaptée à un budget de 200 €/mois",
      "Annonces alignées sur l'image street et écoresponsable",
      "Ciblage des acheteurs en quête de produits originaux",
      "Optimisation continue des enchères et des annonces",
      "Suivi précis des conversions et du retour sur investissement",
      "ROAS de 2,38 pour un panier moyen élevé",
    ],
    stats: [
      { big: 775, prefix: "", suffix: "k", label: "impressions en 9 mois de campagne" },
      { big: 400, prefix: "+", suffix: "", label: "conversions générées sur la boutique" },
      { big: 0.13, prefix: "", suffix: " €", label: "de coût par clic moyen", raw: "0,13 €" },
    ],
    words: ["Google Ads", "SEA", "E-commerce", "ROAS 2,38", "Éco-responsable"],
    related: ["campagnes-publicitaires", "e-commerce", "data-reporting"],
  },
  {
    slug: "agria",
    n: "06",
    year: "2026",
    title: "Agria Grand Est",
    tags: "Site web · Graphisme",
    tagList: ["Site web", "Graphisme", "Refonte"],
    img: "https://nooki.fr/wp-content/uploads/2026/01/header-agria.webp",
    alt: "Projet Agria Grand Est : refonte du site web d'un collectif agroalimentaire",
    shadow: "#F4A259",
    bg: "bg-caramel",
    client:
      "Agria Grand Est fédère entreprises, recherche et enseignement pour accompagner l'innovation et le développement durable des filières agroalimentaires du Grand Est.",
    tagline: (
      <>
        Rendre lisible un collectif <span className="text-mint-dark">aux multiples expertises</span>
      </>
    ),
    mission: [
      "Trois structures réunies (ARIA, CRITT et CDT), des expertises multiples et des publics très variés : le défi d'Agria Grand Est était avant tout un défi de clarté. Nous avons mené une refonte complète du site pour refléter son rôle central dans l'écosystème agroalimentaire et la bioéconomie de la région.",
      "L'arborescence, les contenus et l'expérience utilisateur ont été repensés autour d'un discours plus pédagogique et fédérateur, soutenu par une identité visuelle moderne et institutionnelle. Le site met désormais en avant les expertises, les projets et les formations du collectif.",
    ],
    done: [
      "Refonte complète du site web du collectif",
      "Arborescence repensée pour des publics variés",
      "Positionnement clarifié : ARIA, CRITT et CDT réunis",
      "Discours pédagogique et fédérateur",
      "Identité visuelle moderne et institutionnelle",
      "Mise en avant des expertises, projets et formations",
    ],
    stats: null,
    words: ["Refonte", "Institutionnel", "UX", "Arborescence", "Grand Est"],
    related: ["sites-vitrine", "developpement-sur-mesure", "contenus-copywriting"],
  },
];

/* ── Traductions anglaises (champs textuels uniquement) ───────── */
const EN = {
  kinteraction: {
    tags: "Website · Graphic design",
    tagList: ["Website", "Graphic design", "SEO", "UX"],
    alt: "Kinteraction project: website creation and visual identity",
    client:
      "A young educational brand, Kinteraction helps parents introduce their children to English from the earliest age, naturally and screen-free.",
    tagline: (
      <>
        A site as playful as <span className="text-mint-dark">the method it showcases</span>
      </>
    ),
    mission: [
      "To support the brand's launch, we needed a site that could do two things at once: charm children with its world, and reassure parents with its seriousness. We designed a colourful, immersive look that highlights the method's scientific approach without ever feeling austere.",
      "Each themed box (BathTime, BedTime…) has its own visual world, the navigation guides naturally towards purchase, and dedicated SEO and UX work now helps Kinteraction gain visibility and turn its visitors into customers.",
    ],
    done: [
      "A playful, reassuring e-commerce site designed for parents",
      "A colourful, immersive visual world for each themed box",
      "A streamlined buying journey, from discovery to checkout",
      "The method's scientific approach put front and centre",
      "SEO optimization for visibility on Google",
      "Full UX work to encourage exploration",
    ],
    words: ["E-commerce", "Playful design", "UX", "SEO", "Education"],
  },
  "le-101": {
    tags: "SEO",
    tagList: ["SEO", "Content", "Local visibility"],
    alt: "Le 101 project: organic SEO strategy for an art gallery",
    client:
      "Le 101 is a modern and contemporary art gallery in the heart of Bordeaux, visited by art lovers and collectors alike.",
    tagline: (
      <>
        Making an art gallery shine <span className="text-mint-dark">on Google</span>
      </>
    ),
    mission: [
      "The goal: attract art lovers and collectors by positioning Le 101 as a must-visit spot on the Bordeaux scene. We worked the SEO in depth around exhibitions, artists and artworks, living content that evolves at the gallery's own pace.",
      "In four months, organic traffic took off: impressions more than doubled and the gallery settled into first place on strategic keywords in its field.",
    ],
    done: [
      "Full SEO audit of the site and local competition",
      "Content optimization: exhibitions, artists, artworks",
      "A keyword strategy focused on the art world",
      "Improved local rankings in Bordeaux",
      "Monthly tracking of rankings and traffic",
      "A stronger avant-garde image for the gallery",
    ],
    stats: [
      { big: 119, prefix: "+", suffix: "%", label: "more impressions on Google in 4 months" },
      { big: 67, prefix: "+", suffix: "", label: "new keywords indexed" },
      { big: 6, prefix: "+", suffix: "", label: "keywords ranking at no.1" },
    ],
    words: ["SEO", "Art gallery", "Content", "Top 1", "Bordeaux"],
  },
  efluenz: {
    tags: "Website · Graphic design",
    tagList: ["Website", "Graphic design", "Multilingual"],
    alt: "Efluenz project: multilingual website for an influencer marketing agency",
    client:
      "Efluenz is a European influencer marketing agency that connects brands with nano and micro-influencers for authentic, high-performing campaigns.",
    tagline: (
      <>
        A multilingual site for an agency <span className="text-mint-dark">that speaks to two audiences</span>
      </>
    ),
    mission: [
      "Efluenz's challenge: addressing two very different audiences on a single site. On one side, brands looking for high-performing influencer campaigns; on the other, content creators wanting to join the network. Each had to find their way in a matter of seconds.",
      "We designed a clear dual-entry architecture, with an experience built to guide each visitor towards the right action, request a campaign or apply as an influencer, all in several languages, in keeping with its European positioning.",
    ],
    done: [
      "A multilingual website matching its European positioning",
      "A dual-entry architecture: brands and creators",
      "A user journey guided towards the right action",
      "Influencer marketing expertise brought to the fore",
      "Simple sign-up forms for influencers",
      "A premium design aligned with the world of social media",
    ],
    words: ["Multilingual", "Influence", "UX", "Website", "Europe"],
  },
  xucom: {
    tags: "Graphic design · Web design · SEO",
    tagList: ["Graphic design", "Web design", "SEO"],
    alt: "Xucom project: site redesign, visual identity and SEO for a print agency",
    client:
      "Xucom, a print communication agency based in Lorraine, wanted an online presence worthy of the quality of its services.",
    tagline: (
      <>
        A complete redesign, <span className="text-mint-dark">from pixel to search ranking</span>
      </>
    ),
    mission: [
      "Xucom's old site no longer reflected the quality of the agency's work. We completely rethought its online presence: a bold visual identity, a clean design and smooth navigation, for an experience that is both professional and engaging.",
      "In parallel, deep SEO work was carried out to strengthen its visibility on search engines. The new site showcases the agency's expertise and makes it easy to get in touch and request a quote.",
    ],
    done: [
      "Complete redesign of the agency's website",
      "A bold visual identity and a clean design",
      "Smooth navigation and a clear hierarchy of services",
      "In-depth SEO optimization across every page",
      "A streamlined contact and quote journey",
      "The agency's print work showcased",
    ],
    words: ["Redesign", "Web design", "SEO", "Identity", "Print"],
  },
  "7-plis": {
    tags: "SEA campaigns",
    tagList: ["SEA", "Google Ads", "E-commerce"],
    alt: "7 Plis project: Google Ads campaigns for a recycled skateboard shop",
    client:
      "7 Plis is an online shop that creates unique accessories from recycled skateboards, a street and eco-responsible brand.",
    tagline: (
      <>
        Google Ads campaigns <span className="text-mint-dark">that roll on their own</span>
      </>
    ),
    mission: [
      "The mission: draw as many enthusiasts as possible to the shop and boost online sales, on a controlled budget of €200 a month. The ads lean fully into the brand's street, eco-responsible image to capture visitors looking for original products.",
      "The result: in nine months, targeted campaigns adjusted continuously generated over 400 conversions at a cost per click of €0.13, in a competitive market no less. Proof that a small, well-managed budget can do great things.",
    ],
    done: [
      "A Google Ads strategy tailored to a €200/month budget",
      "Ads aligned with the street, eco-responsible image",
      "Targeting buyers looking for original products",
      "Continuous optimization of bids and ads",
      "Precise tracking of conversions and return on investment",
      "A ROAS of 2.38 for a high average basket",
    ],
    stats: [
      { big: 775, prefix: "", suffix: "k", label: "impressions over 9 months of campaigns" },
      { big: 400, prefix: "+", suffix: "", label: "conversions generated for the shop" },
      { big: 0.13, prefix: "", suffix: " €", label: "average cost per click", raw: "0,13 €" },
    ],
    words: ["Google Ads", "SEA", "E-commerce", "ROAS 2.38", "Eco-responsible"],
  },
  agria: {
    tags: "Website · Graphic design",
    tagList: ["Website", "Graphic design", "Redesign"],
    alt: "Agria Grand Est project: website redesign for a food industry collective",
    client:
      "Agria Grand Est brings together businesses, research and education to support innovation and sustainable development across the Grand Est region's food industries.",
    tagline: (
      <>
        Making sense of a collective <span className="text-mint-dark">with many areas of expertise</span>
      </>
    ),
    mission: [
      "Three organizations united (ARIA, CRITT and CDT), multiple areas of expertise and very varied audiences: Agria Grand Est's challenge was above all one of clarity. We carried out a complete site redesign to reflect its central role in the region's food industry and bioeconomy ecosystem.",
      "The site structure, content and user experience were rethought around a more educational, unifying message, backed by a modern, institutional visual identity. The site now highlights the collective's expertise, projects and training programmes.",
    ],
    done: [
      "Complete redesign of the collective's website",
      "A site structure rethought for varied audiences",
      "Clarified positioning: ARIA, CRITT and CDT united",
      "An educational, unifying message",
      "A modern, institutional visual identity",
      "Expertise, projects and training brought to the fore",
    ],
    words: ["Redesign", "Institutional", "UX", "Site structure", "Grand Est"],
  },
};

export function getProjets(lang = "fr") {
  if (lang === "fr") return PROJETS;
  return PROJETS.map((p) => ({ ...p, ...EN[p.slug] }));
}

export const getProjet = (slug, lang = "fr") => getProjets(lang).find((p) => p.slug === slug);
