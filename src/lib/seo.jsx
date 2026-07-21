import { useEffect } from "react";
import { useLang } from "./lang.jsx";

/* ── SEO léger pour SPA, bilingue FR/EN ────────────────────────
   Met à jour <title>, meta description, canonical, Open Graph,
   les balises hreflang (fr / en / x-default) et injecte le JSON-LD.
   `path` = chemin NEUTRE (version FR, ex. "/seo-geo") ; la version EN
   est déduite en préfixant /en. La langue vient de l'URL (useLang).
   Zéro rendu : le composant retourne null. */

export const SITE = "https://www.cafein.lu";
export const SITE_NAME = "Cafein";

/* Construit l'URL absolue d'un chemin neutre pour une langue donnée.
   FR : SITE/ , SITE/seo-geo   |   EN : SITE/en , SITE/en/seo-geo */
function urlFor(path, lang) {
  const neutral = path === "/" ? "" : path;
  if (lang === "en") return SITE + "/en" + neutral;
  return SITE + (neutral || "/");
}

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]:not([hreflang])`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/* Réécrit proprement les balises hreflang (une par langue + x-default).
   On retire TOUTES les alternates existantes, y compris celles statiques
   d'index.html, pour éviter les doublons pointant vers la mauvaise page. */
function setHreflang(frUrl, enUrl) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
  const alts = [
    ["fr", frUrl],
    ["en", enUrl],
    ["x-default", frUrl],
  ];
  for (const [hl, href] of alts) {
    const l = document.createElement("link");
    l.setAttribute("rel", "alternate");
    l.setAttribute("hreflang", hl);
    l.setAttribute("href", href);
    l.setAttribute("data-i18n", "1");
    document.head.appendChild(l);
  }
}

export default function Seo({ title, titleEn, description, descriptionEn, path = "/", jsonLd = [], noindex = false }) {
  const { lang } = useLang();
  const t = lang === "en" && titleEn ? titleEn : title;
  const d = lang === "en" && descriptionEn ? descriptionEn : description;

  useEffect(() => {
    const frUrl = urlFor(path, "fr");
    const enUrl = urlFor(path, "en");
    const canonical = lang === "en" ? enUrl : frUrl;

    document.title = t;
    /* index par défaut ; noindex pour les pages en duplicate content
       (ex. réalisations reprises de Nooki) — on suit tout de même les liens. */
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    upsertMeta("name", "description", d);
    upsertLink("canonical", canonical);
    upsertMeta("property", "og:title", t);
    upsertMeta("property", "og:description", d);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", lang === "en" ? "en_US" : "fr_FR");
    upsertMeta("property", "og:locale:alternate", lang === "en" ? "fr_FR" : "en_US");
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", t);
    upsertMeta("name", "twitter:description", d);

    setHreflang(frUrl, enUrl);

    /* JSON-LD : un seul script géré par route */
    document.getElementById("seo-jsonld")?.remove();
    const blocks = [ORG_LD, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])].filter(Boolean);
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "seo-jsonld";
    s.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
    document.head.appendChild(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, d, path, lang, noindex, JSON.stringify(jsonLd)]);
  return null;
}

/* ── Blocs schema.org réutilisables ───────────────────────────── */

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": SITE + "/#cafein",
  name: "Cafein",
  url: SITE + "/",
  logo: SITE + "/favicon.svg",
  description:
    "Agence de marketing web au Luxembourg : création de sites internet, référencement SEO & GEO, communication digitale.",
  areaServed: [
    { "@type": "Country", name: "Luxembourg" },
    { "@type": "Place", name: "Grande Région" },
  ],
  address: { "@type": "PostalAddress", addressCountry: "LU" },
  priceRange: "€€",
  knowsAbout: [
    "Création de site internet",
    "SEO",
    "GEO (Generative Engine Optimization)",
    "Communication digitale",
    "E-commerce",
  ],
};

export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd(name, description, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: SITE + path,
    provider: { "@id": SITE + "/#cafein" },
    areaServed: { "@type": "Country", name: "Luxembourg" },
  };
}

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE + it.path,
    })),
  };
}

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cafein",
  url: SITE + "/",
  inLanguage: "fr",
};
