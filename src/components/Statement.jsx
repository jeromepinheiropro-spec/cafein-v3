import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { Spark, ArrowUpRight } from "../lib/ui.jsx";
import { useEggSpeed } from "./EasterEggs.jsx";

/*
  Section « statement » cinétique — l'effet waouw des pages service.
  Une phrase-choc géante qui se révèle mot à mot au scroll, sur un bloc de
  couleur plein cadre, avec un mot-clé surligné et des accents animés.

  Props :
    bg      : classe de fond (ex. "bg-espresso", "bg-mint", "bg-caramel")
    text    : classe de texte de base (ex. "text-cream", "text-ink")
    accent  : couleur du halo/étincelles (ex. "#1FCE8A")
    lines   : tableau de « lignes », chaque ligne = tableau de mots.
              Un mot peut être une string, ou { w, hl:true } pour le surligner.
    sub     : sous-texte (string)
    cta     : { to, label } lien optionnel
*/
export default function Statement({ bg = "bg-espresso", text = "text-cream", accent = "#1FCE8A", lines = [], sub, cta }) {
  const eggSpeed = useEggSpeed();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const gx = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const gr = useTransform(scrollYProgress, [0, 1], [0, 90]);

  let idx = 0;
  const dark = text.includes("cream");

  return (
    <section ref={ref} className={`relative ${bg} ${text} overflow-hidden py-24 md:py-36`}>
      {/* grain léger + halo */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1.5px)", backgroundSize: "28px 28px" }}
      />
      <motion.div
        style={{ x: gx }}
        className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-blob blur-3xl pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-blob" style={{ background: accent, opacity: 0.18 }} />
      </motion.div>

      {/* étoile qui tourne en parallaxe */}
      <motion.div style={{ rotate: gr }} className="absolute top-10 right-8 md:right-20 pointer-events-none hidden md:block" aria-hidden>
        <Spark className="w-10 h-10 md:w-16 md:h-16" style={{ color: accent }} />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="font-display font-extrabold tracking-tight leading-[0.92] text-[clamp(2.4rem,7.5vw,6.5rem)]">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const isObj = typeof word === "object";
                const w = isObj ? word.w : word;
                const hl = isObj && word.hl;
                const i = idx++;
                return (
                  <React.Fragment key={wi}>
                    <motion.span
                      initial={{ y: "60%", opacity: 0, rotate: i % 2 ? 3 : -3 }}
                      whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 18 }}
                      className="inline-block"
                    >
                      {hl ? (
                        <span className="relative inline-block" style={{ color: accent }}>
                          {w}
                          <motion.span
                            aria-hidden
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-15%" }}
                            transition={{ delay: i * 0.05 + 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 right-0 -bottom-1 h-[6px] md:h-[10px] rounded-full origin-left"
                            style={{ background: accent, opacity: 0.9 }}
                          />
                        </span>
                      ) : (
                        w
                      )}
                    </motion.span>{" "}
                  </React.Fragment>
                );
              })}
            </span>
          ))}
        </h2>

        {(sub || cta) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6"
          >
            {sub && <p className={`text-lg md:text-xl font-medium max-w-xl ${dark ? "text-cream/70" : "text-ink/70"}`}>{sub}</p>}
            {cta && (
              <Link
                to={cta.to}
                data-cursor="Go !"
                className={`group shrink-0 inline-flex items-center gap-2 rounded-full font-display font-bold text-lg px-7 py-3.5 border-[3px] border-ink transition-all ${
                  dark
                    ? "bg-mint text-ink shadow-[5px_5px_0_#F5EFE2] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]"
                    : "bg-ink text-cream shadow-[5px_5px_0_rgba(10,15,13,0.15)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px]"
                }`}
              >
                {cta.label}
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
