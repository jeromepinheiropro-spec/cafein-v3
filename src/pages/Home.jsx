import React from "react";

import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import Manifesto from "../components/Manifesto.jsx";
import Services from "../components/Services.jsx";
import Stats from "../components/Stats.jsx";
import Process from "../components/Process.jsx";
import Showcase from "../components/Showcase.jsx";
import Why from "../components/Why.jsx";
import Blog from "../components/Blog.jsx";
import Faq from "../components/Faq.jsx";
import Contact from "../components/Contact.jsx";

export default function Home({ started }) {
  return (
    <>
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
