import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import { LangProvider } from "./lib/lang.jsx";
import Cursor from "./components/Cursor.jsx";
import { RouteCurtain, ScrollBrew } from "./components/RouteFX.jsx";
import { EggProvider } from "./components/EasterEggs.jsx";
import Preloader from "./components/Preloader.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Barista from "./components/Barista.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

import Home from "./pages/Home.jsx";
import CreationSite from "./pages/CreationSite.jsx";
import SeoGeo from "./pages/SeoGeo.jsx";
import Communication from "./pages/Communication.jsx";
import Lexique from "./pages/Lexique.jsx";
import Expertise from "./pages/Expertise.jsx";
import ExpertiseDetail from "./pages/ExpertiseDetail.jsx";
import ProjetDetail from "./pages/ProjetDetail.jsx";
import Equipe from "./pages/Equipe.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Legal from "./pages/Legal.jsx";
import Moderation from "./pages/Moderation.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  /* Défilement doux (Lenis) + ancres */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
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

  /* Retour en haut à chaque changement de page (+ ancre éventuelle) */
  useEffect(() => {
    const lenis = window.__lenis;
    if (location.hash) {
      /* Ancre : quand on arrive depuis une AUTRE page (ex. le bouton du
         SiteBuilder sur /creation-site-web vers /#contact), le contenu vient
         de changer et Lenis ne connaît pas encore la nouvelle hauteur. On
         recalcule (resize) puis on vise la cible, avec quelques passes pour
         corriger si la mise en page se stabilise après les animations. */
      let n = 0;
      const go = () => {
        const el = document.querySelector(location.hash);
        if (el) {
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(el, { offset: -80, duration: 1.0 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
        if (++n < 5) setTimeout(go, 260);
      };
      setTimeout(go, 120);
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  /* Bloque le scroll pendant le préloader */
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <LangProvider>
    <EggProvider>
    <div className="grain egg-scope">
      <Cursor />
      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Nav />
      <ScrollBrew />
      <RouteCurtain />
      <main>
        <Routes>
          {/* Routes publiques : rendues à la racine (FR) ET sous /en (EN).
              La langue est déduite de l'URL par LangProvider. */}
          {[
            { path: "/", element: <Home started={!loading} /> },
            { path: "/creation-site-web", element: <CreationSite /> },
            { path: "/seo-geo", element: <SeoGeo /> },
            { path: "/communication", element: <Communication /> },
            { path: "/lexique", element: <Lexique /> },
            { path: "/notre-expertise", element: <Expertise /> },
            { path: "/notre-expertise/:slug", element: <ExpertiseDetail /> },
            { path: "/realisations/:slug", element: <ProjetDetail /> },
            { path: "/equipe", element: <Equipe /> },
            { path: "/blog/:slug", element: <BlogPost /> },
            { path: "/mentions-legales", element: <Legal kind="mentions" /> },
            { path: "/confidentialite", element: <Legal kind="confidentialite" /> },
            { path: "/politique-cookies", element: <Legal kind="cookies" /> },
          ].flatMap((r) => [
            <Route key={r.path} path={r.path} element={r.element} />,
            <Route
              key={"/en" + r.path}
              path={r.path === "/" ? "/en" : "/en" + r.path}
              element={r.element}
            />,
          ])}
          {/* Modération : espace équipe, non traduit, noindex */}
          <Route path="/moderation" element={<Moderation />} />
          <Route path="*" element={<Home started={!loading} />} />
        </Routes>
      </main>
      <Footer />
      <Barista />
      <CookieConsent />
    </div>
    </EggProvider>
    </LangProvider>
  );
}
