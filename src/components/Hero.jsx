import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Magnetic, Bean, Spark, ArrowUpRight, Cup } from "../lib/ui.jsx";
import { Link } from "../lib/link.jsx";
import { useEgg, useEggSpeed } from "./EasterEggs.jsx";
import { useLang, useT } from "../lib/lang.jsx";

/* « Cafein » lu « Cafe·in » : les lettres « in » passent en vert (comme le
   footer), le grain de café reste le point du i. Animations conservées. */
const letters = [
  { c: "C" }, { c: "a" }, { c: "f" }, { c: "e" },
  { c: ".", accent: true, dot: true },
  { c: "i", accent: true, bean: true },
  { c: "n", accent: true },
];

/* Badge circulaire qui tourne */
function RotatingBadge() {
  const eggSpeed = useEggSpeed();
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: (14) / eggSpeed, ease: "linear" }}
      className="relative w-28 h-28 md:w-36 md:h-36"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="circlePath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        {/* pas de textLength : Safari le gère mal sur textPath, l'espacement
            est calibré pour boucler exactement sur la circonférence (27 × 8.84px) */}
        <text className="font-mono uppercase" fontSize="9.5" letterSpacing="3.1" fill="#0A0F0D">
          <textPath href="#circlePath">agence · web · luxembourg ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Cup className="w-9 h-9 md:w-11 md:h-11" />
      </div>
    </motion.div>
  );
}

export default function Hero({ started }) {
  const eggSpeed = useEggSpeed();
  const ref = useRef(null);
  const { collect, curious } = useEgg();
  const { lang } = useLang();
  const t = useT();

  /* Preuve sociale tournante : à chaque visite, une réalisation réelle
     différente, avec sa propre couleur. Aucune donnée inventée. */
  const PROOF = [
    {
      client: "Le 101",
      kicker: t("Résultat vérifié · SEO/GEO", "Verified result · SEO/GEO"),
      metric: "+119%",
      label: t("d'impressions Google · 4 mois", "Google impressions · 4 months"),
      sector: t("Galerie d'art · Bordeaux", "Art gallery · Bordeaux"),
      to: "/realisations/le-101",
      from: "#1FCE8A", toc: "#17A46E", head: "#F5EFE2", // vert
    },
    {
      client: "7 Plis",
      kicker: t("Résultat vérifié · Publicité", "Verified result · Ads"),
      metric: "+400",
      label: t("conversions · Google Ads", "conversions · Google Ads"),
      sector: t("Boutique éco-responsable", "Eco-responsible shop"),
      to: "/realisations/7-plis",
      from: "#F4A259", toc: "#E08636", head: "#0A0F0D", // orange
    },
    {
      client: "Efluenz",
      kicker: t("Création de site", "Website build"),
      metric: "100%",
      label: t("sur-mesure · jamais de template", "custom-built · never a template"),
      sector: t("Agence d'influence · Europe", "Influencer agency · Europe"),
      to: "/realisations/efluenz",
      from: "#FFD166", toc: "#F5B92E", head: "#0A0F0D", // jaune
    },
    {
      client: "Cerberion",
      kicker: t("Réalisation complète", "Full build"),
      metric: "360°",
      label: t("site + identité + SEO/GEO + plugin", "site + brand + SEO/GEO + plugin"),
      sector: t("Sécurité · Luxembourg", "Security · Luxembourg"),
      to: "/realisations/cerberion",
      from: "#F2A0AE", toc: "#E1738A", head: "#F5EFE2", // rose
    },
  ];
  const [proofIdx] = useState(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("proof");
      if (q !== null && q !== "") return Math.abs(parseInt(q, 10)) % PROOF.length;
    } catch (e) {}
    return Math.floor(Math.random() * PROOF.length);
  });
  const proof = PROOF[proofIdx];

  function onBeanClick(e) {
    e.stopPropagation();
    collect("hero");
    curious();
  }
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yBeans = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Parallaxe à la souris pour les grains flottants */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const beanStyle = (fx, fy) => ({
    x: useTransform(smx, (v) => v * fx),
    y: useTransform(smy, (v) => v * fy),
  });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-cream pt-28 pb-16"
    >
      {/* Blobs de fond */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-40 w-[38rem] h-[38rem] rounded-full bg-mint/15 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: (9) / eggSpeed, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-caramel/15 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ repeat: Infinity, duration: (11) / eggSpeed, ease: "easeInOut" }}
      />

      {/* Grains flottants — nuée dense (piste 1) */}
      <motion.div aria-hidden style={{ y: yBeans }} className="absolute inset-0 pointer-events-none">
        {/* zone haute */}
        <motion.div style={beanStyle(40, 30)} className="absolute top-[14%] left-[40%] hidden sm:block">
          <motion.div animate={{ y: [0, -14, 0], rotate: [0, 14, 0] }} transition={{ repeat: Infinity, duration: (5) / eggSpeed }}>
            <Bean className="w-9 h-9 md:w-12 md:h-12 opacity-90" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(48, -26)} className="absolute top-[11%] right-[30%] hidden md:block">
          <motion.div animate={{ y: [0, 12, 0], rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: (6.2) / eggSpeed }}>
            <Bean className="w-7 h-7 opacity-70" fill="#17A46E" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(-55, 45)} className="absolute top-[20%] right-[9%]">
          <motion.div animate={{ y: [0, 16, 0], rotate: [0, -18, 0] }} transition={{ repeat: Infinity, duration: (6.5) / eggSpeed }}>
            <Bean className="w-8 h-8 md:w-11 md:h-11 opacity-85" fill="#F4A259" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(34, 26)} className="absolute top-[37%] right-[31%] hidden md:block">
          <motion.div animate={{ y: [0, -12, 0], rotate: [0, 22, 0] }} transition={{ repeat: Infinity, duration: (7.4) / eggSpeed }}>
            <Bean className="w-6 h-6 opacity-60" fill="#FFD166" />
          </motion.div>
        </motion.div>
        {/* arc de grains qui descend vers la tasse (piste 2) */}
        <motion.div style={beanStyle(-40, 34)} className="absolute top-[48%] right-[38%] hidden lg:block">
          <motion.div animate={{ y: [0, 14, 0], rotate: [0, -14, 0] }} transition={{ repeat: Infinity, duration: (5.8) / eggSpeed }}>
            <Bean className="w-7 h-7 opacity-80" fill="#1FCE8A" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(28, -30)} className="absolute top-[64%] right-[32%] hidden lg:block">
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 18, 0] }} transition={{ repeat: Infinity, duration: (6.8) / eggSpeed }}>
            <Bean className="w-6 h-6 opacity-70" fill="#F4A259" />
          </motion.div>
        </motion.div>
        {/* bas gauche : étoile + grain */}
        <motion.div style={beanStyle(-35, -25)} className="absolute bottom-[22%] left-[16%] hidden md:block">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: (16) / eggSpeed, ease: "linear" }}>
            <Spark className="w-6 h-6 text-mint" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(26, 22)} className="absolute bottom-[14%] left-[31%] hidden lg:block">
          <motion.div animate={{ y: [0, -8, 0], rotate: [0, -16, 0] }} transition={{ repeat: Infinity, duration: (7) / eggSpeed }}>
            <Bean className="w-6 h-6 opacity-50" fill="#17A46E" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Preuve sociale tournante (piste 3) — réalisation réelle, couleur variable */}
      <motion.div
        style={beanStyle(-16, -14)}
        className="absolute bottom-[11%] right-[25%] hidden lg:block z-[2]"
      >
        <motion.div
          key={proofIdx}
          initial={{ opacity: 0, y: 30, rotate: -5 }}
          animate={started ? { opacity: 1, y: 0, rotate: -2.5 } : {}}
          transition={{ delay: 1.1, type: "spring", stiffness: 120, damping: 15 }}
          whileHover={{ rotate: 0, y: -5 }}
        >
          <Link
            to={proof.to}
            data-cursor={t("Voir le cas", "See the case")}
            className="group block w-[13.5rem] rounded-2xl border-[3px] border-ink bg-white shadow-[6px_6px_0_#0A0F0D] overflow-hidden"
          >
            {/* bandeau coloré (couleur = réalisation) */}
            <div
              className="relative px-3.5 py-2.5"
              style={{ background: `linear-gradient(135deg, ${proof.from}, ${proof.toc})`, color: proof.head }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-[15px] leading-none">{proof.client}</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: proof.head }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: proof.head }} />
                </span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.14em] uppercase" style={{ color: proof.head, opacity: 0.85 }}>
                {proof.kicker}
              </span>
            </div>
            {/* chiffre / punch */}
            <div className="px-3.5 py-2.5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-[1.9rem] leading-none text-ink">{proof.metric}</span>
                <span className="text-[10px] font-semibold text-ink/65 leading-tight">{proof.label}</span>
              </div>
            </div>
            {/* pied : secteur + flèche */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-cream-2 border-t-[3px] border-ink">
              <span className="font-mono text-[8.5px] tracking-wide text-ink/55 truncate pr-2">{proof.sector}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: yTitle, opacity }} className="relative mx-auto max-w-7xl px-6 md:px-10 w-full">
        {/* Sur-titre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-white/60 px-4 py-1.5 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
            </span>
            {t("Agence basée au Luxembourg", "Agency based in Luxembourg")}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-6">
          <div>
            {/* Titre géant lettre par lettre */}
            <h1 className="font-display font-extrabold leading-[0.85] tracking-tight text-ink text-[clamp(4.5rem,17vw,15rem)] select-none">
              <span className="sr-only">{t("Cafein, agence de communication digitale au Luxembourg", "Cafein, digital communication agency in Luxembourg")}</span>
              <span aria-hidden className="inline-flex">
                {letters.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%", rotate: i % 2 ? 8 : -8, opacity: 0 }}
                    animate={started ? { y: "0%", rotate: 0, opacity: 1 } : {}}
                    transition={{
                      delay: 0.25 + i * 0.07,
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                    }}
                    whileHover={{ y: -18, rotate: i % 2 ? -6 : 6, color: "#1FCE8A", transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    style={l.accent ? { color: "#1FCE8A" } : undefined}
                    className="inline-block cursor-default"
                  >
                    {l.bean ? (
                      <span className="relative inline-block">
                        ı
                        {/* le point du i : un grain de café qui tombe */}
                        <motion.span
                          initial={{ y: -120, opacity: 0 }}
                          animate={started ? { y: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.85, type: "spring", stiffness: 320, damping: 11 }}
                          onClick={onBeanClick}
                          data-cursor="Grain !"
                          whileTap={{ scale: 0.8 }}
                          className="absolute left-1/2 top-[0.02em] w-[0.16em] h-[0.16em] cursor-pointer pointer-events-auto"
                          style={{ marginLeft: "-0.08em" }}
                          role="button"
                          aria-label="Un grain de café curieux"
                        >
                          <motion.span
                            animate={{ rotate: [0, 360] }}
                            transition={{ repeat: Infinity, duration: (10) / eggSpeed, ease: "linear", delay: 1.6 }}
                            className="block w-full h-full"
                          >
                            <Bean className="w-full h-full" />
                          </motion.span>
                        </motion.span>
                      </span>
                    ) : (
                      l.c
                    )}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 max-w-xl text-lg md:text-2xl text-ink/80 font-medium leading-relaxed"
            >
              {lang === "en" ? (
                <>
                  Your <span className="squiggle font-bold text-ink">web marketing</span> agency in
                  Luxembourg. Tailor-made websites, digital communication and visibility:{" "}
                  <span className="font-bold text-mint-dark">SEO&nbsp;&amp;&nbsp;GEO</span>. All of it,
                  served extra strong.
                </>
              ) : (
                <>
                  Votre agence de <span className="squiggle font-bold text-ink">marketing web</span> au
                  Luxembourg. Sites sur mesure, communication digitale et visibilité :{" "}
                  <span className="font-bold text-mint-dark">SEO&nbsp;&amp;&nbsp;GEO</span>. Le tout, servi
                  bien serré.
                </>
              )}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  data-hiss
                  data-cursor={t("C'est parti", "Let's go")}
                  className="group inline-flex items-center gap-3 rounded-full bg-mint text-ink font-display font-bold text-base md:text-lg px-7 py-4 border-2 border-ink shadow-[5px_5px_0_#0A0F0D] hover:shadow-[0px_0px_0_#0A0F0D] hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200"
                >
                  {t("Parlons de votre projet", "Let's talk about your project")}
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#realisations"
                  data-cursor={t("Mater", "Take a peek")}
                  className="inline-flex items-center gap-3 rounded-full bg-transparent text-ink font-display font-bold text-base md:text-lg px-7 py-4 border-2 border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
                >
                  {t("Voir nos réalisations", "See our work")}
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Badge rotatif */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={started ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 1, type: "spring", stiffness: 150, damping: 15 }}
            className="hidden lg:block mb-6"
          >
            <RotatingBadge />
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 inset-x-0 flex items-center justify-between px-6 md:px-10 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-ink/50"
      >
        <span className="hidden sm:block">{t("Sites web · SEO/GEO · Communication", "Websites · SEO/GEO · Communication")}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: (1.6) / eggSpeed }}
          className="flex items-center gap-2"
        >
          Scroll
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
        <span>FR / EN</span>
      </motion.div>
    </section>
  );
}
