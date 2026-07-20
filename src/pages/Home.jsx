import React from "react";
import Seo, { WEBSITE_LD, faqLd } from "../lib/seo.jsx";

import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import Manifesto from "../components/Manifesto.jsx";
import Services from "../components/Services.jsx";
import Stats from "../components/Stats.jsx";
import Process from "../components/Process.jsx";
import Showcase from "../components/Showcase.jsx";
import Why from "../components/Why.jsx";
import Blog from "../components/Blog.jsx";
import Faq, { FAQS } from "../components/Faq.jsx";
import Contact from "../components/Contact.jsx";

export default function Home({ started }) {
  return (
    <>
      <Seo
        title="Cafein | Agence web & communication digitale au Luxembourg"
        description="Cafein, agence de marketing web au Luxembourg : création de sites internet sur mesure, référencement SEO & GEO, réseaux sociaux et communication digitale. Devis gratuit, conseils francs."
        path="/"
        jsonLd={[WEBSITE_LD, faqLd(FAQS)]}
      />
      <Hero started={started} />
      <Marquee />
      <Manifesto />
      <Services />
      <Stats />
      <Process />
      <Marquee tilt={2} dark />
      <Showcase />
      <Why />
      <Blog />
      <Faq />
      <Contact />
    </>
  );
}
