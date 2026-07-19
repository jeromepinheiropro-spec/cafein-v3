import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Cursor from "./components/Cursor.jsx";
import Preloader from "./components/Preloader.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Services from "./components/Services.jsx";
import Stats from "./components/Stats.jsx";
import Process from "./components/Process.jsx";
import Showcase from "./components/Showcase.jsx";
import Why from "./components/Why.jsx";
import Blog from "./components/Blog.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);

  /* Défilement doux (Lenis) + ancres */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  /* Bloque le scroll pendant le préloader */
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <div className="grain">
      <Cursor />
      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Nav />
      <main>
        <Hero started={!loading} />
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
      </main>
      <Footer />
    </div>
  );
}
