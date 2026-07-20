import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Magnetic, Bean, Spark, ArrowUpRight, Cup } from "../lib/ui.jsx";
import { useEgg, useEggSpeed } from "./EasterEggs.jsx";
import { useLang, useT } from "../lib/lang.jsx";

const letters = ["C", "a", "f", "e", "i", "n"];

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

      {/* Grains flottants */}
      <motion.div aria-hidden style={{ y: yBeans }} className="absolute inset-0 pointer-events-none">
        <motion.div style={beanStyle(40, 30)} className="absolute top-[15%] left-[40%] hidden sm:block">
          <motion.div animate={{ y: [0, -14, 0], rotate: [0, 14, 0] }} transition={{ repeat: Infinity, duration: (5) / eggSpeed }}>
            <Bean className="w-9 h-9 md:w-12 md:h-12 opacity-90" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(-55, 45)} className="absolute top-[26%] right-[12%]">
          <motion.div animate={{ y: [0, 16, 0], rotate: [0, -18, 0] }} transition={{ repeat: Infinity, duration: (6.5) / eggSpeed }}>
            <Bean className="w-7 h-7 md:w-10 md:h-10 opacity-80" fill="#F4A259" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(30, -40)} className="absolute bottom-[30%] right-[22%] hidden md:block">
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 24, 0] }} transition={{ repeat: Infinity, duration: (7) / eggSpeed }}>
            <Bean className="w-8 h-8 opacity-70" fill="#FFD166" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(-35, -25)} className="absolute bottom-[22%] left-[16%] hidden md:block">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: (16) / eggSpeed, ease: "linear" }}>
            <Spark className="w-6 h-6 text-mint" />
          </motion.div>
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
                    className="inline-block cursor-default"
                  >
                    {l === "i" ? (
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
                      l
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
