import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../lib/ui.jsx";
import { useLang, useT } from "../lib/lang.jsx";

export const FAQS = [
  {
    q: "Vous travaillez avec quel type d'entreprises ?",
    a: "Principalement des PME, indépendants et commerces luxembourgeois qui veulent un site professionnel et une vraie visibilité locale. Vitrine, e-commerce ou plateforme spécifique : on s'adapte à votre secteur et à votre budget.",
  },
  {
    q: "Combien coûte un site web ?",
    a: "Ça dépend du projet : un site vitrine n'a pas le même budget qu'un e-commerce ou une plateforme sur mesure. On établit un devis clair et sans surprise après un premier échange, gratuit, évidemment. Vous savez exactement ce que vous payez, et pourquoi.",
  },
  {
    q: "En combien de temps peut-on être visible sur Google ?",
    a: "Le SEO est un travail de fond : comptez généralement 3 à 6 mois pour des résultats significatifs sur des mots-clés locaux. Certaines optimisations techniques donnent des effets plus rapides, et on suit les positions ensemble, mois après mois.",
  },
];

const FAQS_EN = [
  {
    q: "What kind of businesses do you work with?",
    a: "Mostly Luxembourg-based SMEs, freelancers and local shops that want a professional website and real local visibility. Showcase site, e-commerce or a custom platform: we adapt to your industry and your budget.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on the project: a showcase site doesn't cost the same as an e-commerce store or a bespoke platform. We put together a clear, no-surprise quote after a first chat, free of charge, of course. You know exactly what you're paying for, and why.",
  },
  {
    q: "How long before we show up on Google?",
    a: "SEO is a long game: expect 3 to 6 months for meaningful results on local keywords. Some technical optimisations pay off faster, and we track your rankings together, month after month.",
  },
];

function Item({ faq, i, open, toggle }) {
  const isOpen = open === i;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.08 }}
      className={`rounded-3xl border-[3px] border-ink overflow-hidden transition-colors duration-300 ${
        isOpen ? "bg-mint" : "bg-white hover:bg-cream-2"
      }`}
    >
      <button
        onClick={() => toggle(i)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-6 md:px-8 py-6"
      >
        <span className="font-display font-extrabold text-lg md:text-2xl text-ink">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={`shrink-0 grid place-items-center w-11 h-11 rounded-full border-[3px] border-ink ${
            isOpen ? "bg-ink text-mint" : "bg-mint text-ink"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          >
            <p className="px-6 md:px-8 pb-7 text-ink/85 font-medium leading-relaxed text-base md:text-lg max-w-3xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const { lang } = useLang();
  const t = useT();
  const faqs = lang === "en" ? FAQS_EN : FAQS;
  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionLabel>{t("( Questions fréquentes )", "( Frequently asked questions )")}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-4xl md:text-6xl text-ink mt-4 mb-12 leading-[0.95]"
        >
          {lang === "en" ? (
            <>Everything that keeps you <span className="squiggle">wondering</span></>
          ) : (
            <>Tout ce qui vous <span className="squiggle">turlupine</span></>
          )}
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Item key={i} faq={f} i={i} open={open} toggle={(n) => setOpen(open === n ? -1 : n)} />
          ))}
        </div>
      </div>
    </section>
  );
}
