import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LeafMark } from "../lib/ui.jsx";
import { HuntBean } from "./EasterEggs.jsx";

const LINKS = [
  { label: "Création", to: "/creation-site-web" },
  { label: "SEO & GEO", to: "/seo-geo" },
  { label: "Communication", to: "/communication" },
  { label: "Lexique", to: "/lexique" },
  { label: "Blog", to: "/#blog" },
  { label: "Contact", to: "/#contact" },
];
const WORD = ["C", "A", "F", "E", "I", "N"];

export default function Footer() {
  return (
    <footer className="relative bg-espresso border-t-4 border-mint overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
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
              data-cursor="Hop !"
              whileHover={{ y: -4 }}
              className="grid place-items-center w-11 h-11 rounded-full border-2 border-mint text-mint hover:bg-mint hover:text-ink transition-colors"
              aria-label="Retour en haut"
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
                className="font-display font-extrabold text-cream leading-none cursor-default text-[clamp(3rem,14vw,13rem)]"
              >
                {l === "I" ? (
                  <span className="relative inline-block">
                    I
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="absolute -top-[0.18em] left-1/2 -translate-x-1/2"
                    >
                      <LeafMark className="h-[0.24em] w-auto" />
                    </motion.span>
                  </span>
                ) : (
                  l
                )}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/40">
            © 2026 — Luxembourg
          </p>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/40 flex items-center gap-2">
            Fait avec <span className="text-mint">beaucoup</span> de café
            <LeafMark className="h-3.5 w-auto" />
          </p>
        </div>
      </div>
    </footer>
  );
}
