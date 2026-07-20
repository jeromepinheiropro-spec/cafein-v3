import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "../lib/ui.jsx";
import { useLang, useT } from "../lib/lang.jsx";

const TEXT = {
  fr: "Cafein conçoit des sites web sur mesure pour les entreprises luxembourgeoises, gère votre communication digitale et travaille votre visibilité : référencement naturel (SEO) et référencement pour les intelligences artificielles (GEO).",
  en: "Cafein designs tailor-made websites for Luxembourg businesses, manages your digital communication and grows your visibility: organic search rankings (SEO) and visibility with artificial intelligences (GEO).",
};

const HIGHLIGHTS = {
  fr: ["sur", "mesure", "(SEO)", "(GEO)", "(GEO).", "visibilité"],
  en: ["tailor-made", "(SEO)", "(GEO)", "(GEO).", "visibility:", "visibility"],
};

function Word({ children, range, progress }) {
  const { lang } = useLang();
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const isHl = HIGHLIGHTS[lang].includes(children);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] ${isHl ? "text-mint" : "text-cream"}`}
    >
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const { lang } = useLang();
  const t = useT();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = TEXT[lang].split(" ");

  return (
    <section className="relative bg-espresso py-28 md:py-44 overflow-hidden">
      {/* halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-mint/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-5xl px-6 md:px-10">
        <SectionLabel dark className="mb-8">{t("( Le manifeste )", "( The manifesto )")}</SectionLabel>
        <p className="font-display font-bold text-2xl md:text-4xl lg:text-[2.75rem] leading-snug md:leading-snug">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = Math.min(1, start + 1.5 / words.length);
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
