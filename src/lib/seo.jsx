import { useEffect } from "react";

/* ── SEO léger pour SPA ────────────────────────────────────────
   Met à jour <title>, meta description, canonical, Open Graph
   et injecte le JSON-LD (schema.org) propre à chaque route.
   Zéro dépendance, zéro rendu : le composant retourne null. */

export const SITE = "https://www.cafein.lu";
export const SITE_NAME = "Cafein";

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
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, path = "/", jsonLd = [] }) {
  useEffect(() => {
    const url = SITE + (path === "/" ? "/" : path);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "fr_FR");
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    /* JSON-LD : un seul script géré par route */
    document.getElementById("seo-jsonld")?.remove();
    const blocks = [ORG_LD, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])].filter(Boolean);
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "seo-jsonld";
    s.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
    document.head.appendChild(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, JSON.stringify(jsonLd)]);
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
