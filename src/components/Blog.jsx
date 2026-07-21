import React from "react";
import { motion } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { SectionLabel, ArrowUpRight, Bean, Spark, Cup } from "../lib/ui.jsx";
import { useEggSpeed } from "./EasterEggs.jsx";
import { useLang, useT } from "../lib/lang.jsx";

const POSTS = {
  fr: [
    {
      tag: "SEO",
      date: "Juin 2025",
      title: "Référencement local au Luxembourg : ce qui change en 2025",
      desc: "Le marché local luxembourgeois a ses particularités. On décortique les stratégies SEO qui fonctionnent vraiment dans la Grande Région.",
      deco: "seo",
      bg: "bg-mint",
    },
    {
      tag: "GEO",
      date: "Mai 2025",
      title: "GEO : pourquoi votre site doit être cité par les IA",
      desc: "ChatGPT, Perplexity, Gemini... Comment optimiser son contenu pour être mentionné dans les réponses des assistants IA.",
      deco: "geo",
      bg: "bg-caramel",
    },
    {
      tag: "Site web",
      date: "Avril 2025",
      title: "WordPress vs sur mesure : comment choisir en 2025",
      desc: "Un guide sans jargon pour choisir entre WordPress et un développement sur mesure, selon votre budget et vos objectifs.",
      deco: "web",
      bg: "bg-sun",
    },
  ],
  en: [
    {
      tag: "SEO",
      date: "June 2025",
      title: "Local SEO in Luxembourg: what's changing in 2025",
      desc: "The Luxembourg market has its own quirks. We break down the SEO strategies that actually work in the Greater Region.",
      deco: "seo",
      bg: "bg-mint",
    },
    {
      tag: "GEO",
      date: "May 2025",
      title: "GEO: why AI assistants should be citing your website",
      desc: "ChatGPT, Perplexity, Gemini... How to optimize your content to get mentioned in AI assistants' answers.",
      deco: "geo",
      bg: "bg-caramel",
    },
    {
      tag: "Website",
      date: "April 2025",
      title: "WordPress vs custom-built: how to choose in 2025",
      desc: "A jargon-free guide to choosing between WordPress and custom development, based on your budget and goals.",
      deco: "web",
      bg: "bg-sun",
    },
  ],
};

function Deco({ kind }) {
  const eggSpeed = useEggSpeed();
  if (kind === "seo")
    return (
      <motion.div whileHover={{ rotate: 8 }} className="flex items-end gap-1.5 h-16">
        {[7, 11, 8, 14, 16].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200, damping: 14 }}
            className="w-3 rounded-t bg-ink origin-bottom"
            style={{ height: `${h * 4}px` }}
          />
        ))}
      </motion.div>
    );
  if (kind === "geo")
    return (
      <div className="relative h-16 w-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: (8) / eggSpeed, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <Spark className="w-8 h-8 text-ink" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: (12) / eggSpeed, ease: "linear" }}
          className="absolute inset-0"
        >
          <Bean className="w-5 h-5 absolute top-0 right-2" fill="#0A0F0D" />
        </motion.div>
      </div>
    );
  return <Cup className="w-14 h-14" stroke="#0A0F0D" />;
}

export default function Blog() {
  const { lang } = useLang();
  const t = useT();
  const posts = POSTS[lang];
  return (
    <section id="blog" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>{t("( Sur le blog )", "( On the blog )")}</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold text-4xl md:text-6xl text-ink mt-4 leading-[0.95]"
            >
              {lang === "en" ? (
                <>
                  Ideas <span className="text-mint-dark">freshly roasted</span>
                </>
              ) : (
                <>
                  Des idées <span className="text-mint-dark">fraîchement torréfiées</span>
                </>
              )}
            </motion.h2>
          </div>
          <Link
            to="/lexique"
            data-cursor={t("Explorer", "Explore")}
            className="group inline-flex items-center gap-2 font-display font-bold text-ink border-b-[3px] border-mint pb-1 hover:gap-4 transition-all"
          >
            {t("Explorer le lexique du web", "Explore the web glossary")}
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 17 }}
              whileHover={{ y: -10 }}
              data-cursor={t("Lire", "Read")}
              className="group rounded-3xl bg-white border-[3px] border-ink overflow-hidden shadow-[6px_6px_0_#0A0F0D] hover:shadow-[10px_10px_0_#1FCE8A] transition-shadow duration-300 flex flex-col"
            >
              <div className={`${p.bg} px-7 pt-7 pb-6 border-b-[3px] border-ink relative overflow-hidden`}>
                <div className="flex items-center justify-between mb-5">
                  <span className="rounded-full bg-ink text-cream font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/60">{p.date}</span>
                </div>
                <Deco kind={p.deco} />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-display font-extrabold text-xl leading-snug text-ink group-hover:text-mint-dark transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-ink/70 font-medium leading-relaxed flex-1">{p.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-ink">
                  {t("Lire l'article", "Read the article")}
                  <span className="inline-block w-6 h-[2.5px] bg-mint group-hover:w-10 transition-all duration-300" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
