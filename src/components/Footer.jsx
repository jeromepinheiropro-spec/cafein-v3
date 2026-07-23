import React from "react";
import { motion } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { LeafMark } from "../lib/ui.jsx";
import { HuntBean, useEggSpeed } from "./EasterEggs.jsx";
import { useLang, useT } from "../lib/lang.jsx";

const LINKS = {
  fr: [
    { label: "Expertise", to: "/notre-expertise" },
    { label: "Création", to: "/creation-site-web" },
    { label: "SEO & GEO", to: "/seo-geo" },
    { label: "Communication", to: "/communication" },
    { label: "L'équipe", to: "/equipe" },
    { label: "Lexique", to: "/lexique" },
    { label: "Blog", to: "/#blog" },
    { label: "Contact", to: "/#contact" },
  ],
  en: [
    { label: "Expertise", to: "/notre-expertise" },
    { label: "Web design", to: "/creation-site-web" },
    { label: "SEO & GEO", to: "/seo-geo" },
    { label: "Communication", to: "/communication" },
    { label: "The team", to: "/equipe" },
    { label: "Glossary", to: "/lexique" },
    { label: "Blog", to: "/#blog" },
    { label: "Contact", to: "/#contact" },
  ],
};
/* « CAFEIN » lu « CAFE·IN » : les lettres « IN » passent en vert (le jeu de
   mots), la feuille reste sur le I. Toutes les animations sont conservées. */
const WORD = [
  { c: "C" }, { c: "A" }, { c: "F" }, { c: "E" },
  { c: ".", accent: true },
  { c: "I", accent: true, leaf: true },
  { c: "N", accent: true },
];

export default function Footer() {
  const eggSpeed = useEggSpeed();
  const { lang } = useLang();
  const t = useT();
  return (
    <footer
      className="relative bg-espresso border-t-4 border-mint overflow-hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS[lang].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-mint transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-cream/50">
              FR / EN
            </span>
            <motion.a
              href="#top"
              data-cursor={t("Hop !", "Up we go!")}
              whileHover={{ y: -4 }}
              className="grid place-items-center w-11 h-11 rounded-full border-2 border-mint text-mint hover:bg-mint hover:text-ink transition-colors"
              aria-label={t("Retour en haut", "Back to top")}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V4m0 0l-6 6m6-6l6 6" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* CAFEIN géant */}
        <div className="mt-14 select-none" aria-hidden="true">
          <div className="flex justify-between items-end">
            {WORD.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 150, damping: 16 }}
                whileHover={{ y: -20, color: "#1FCE8A", transition: { type: "spring", stiffness: 400, damping: 12 } }}
                style={l.accent ? { color: "#1FCE8A" } : undefined}
                className="font-display font-extrabold text-cream leading-none cursor-default text-[clamp(3rem,14vw,13rem)]"
              >
                {l.leaf ? (
                  <span className="relative inline-block">
                    {l.c}
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: (4) / eggSpeed }}
                      className="absolute -top-[0.18em] left-1/2 -translate-x-1/2"
                    >
                      <LeafMark className="h-[0.24em] w-auto" />
                    </motion.span>
                  </span>
                ) : (
                  l.c
                )}
              </motion.span>
            ))}
          </div>
        </div>

        {/* liens légaux */}
        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
          {[
            { to: "/mentions-legales", fr: "Mentions légales", en: "Legal notice" },
            { to: "/confidentialite", fr: "Confidentialité", en: "Privacy" },
            { to: "/politique-cookies", fr: "Cookies", en: "Cookies" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-mint transition-colors"
            >
              {lang === "en" ? l.en : l.fr}
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-cream/10 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/40">
            © 2026 · Luxembourg
          </p>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/40 flex items-center gap-2">
            {lang === "en" ? (
              <>Made with <span className="text-mint">lots</span> of coffee</>
            ) : (
              <>Fait avec <span className="text-mint">beaucoup</span> de café</>
            )}
            <HuntBean id="footer" className="w-4 h-4" />
          </p>
        </div>
      </div>
    </footer>
  );
}
