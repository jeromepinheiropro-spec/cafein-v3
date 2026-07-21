import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "../lib/ui.jsx";
import { Link } from "../lib/link.jsx";
import { useT, useLang } from "../lib/lang.jsx";

/*
  Slider avant/après : on tire la poignée pour révéler l'ancien site vs le
  nouveau (projet réel). Preuve de valeur très concrète, et ça se partage bien.

  IMAGES : dès que les captures réelles sont dispo, renseigner BEFORE_IMG /
  AFTER_IMG (ex. "/reveal/xucom-avant.jpg"). Tant qu'elles sont vides, deux
  maquettes stylisées servent de démonstration.
*/
const BEFORE_IMG = "";
const AFTER_IMG = "";
const PROJECT = "Xucom"; // projet mis en avant

/* ── Maquettes de secours (avant clés en main) ─────────────────── */
function MockBefore() {
  return (
    <div className="absolute inset-0 bg-[#dfe0d8] text-[#3a3a34] select-none overflow-hidden">
      <div className="h-7 md:h-9 bg-[#b9bdae] border-b border-[#8a8f7e] flex items-center px-3 gap-2">
        <span className="font-serif text-[10px] md:text-xs font-bold tracking-tight">{PROJECT}™</span>
        <span className="ml-auto font-serif text-[8px] md:text-[10px] underline">Accueil · Produits · Contact</span>
      </div>
      <div className="p-4 md:p-6">
        <p className="font-serif text-sm md:text-lg font-bold underline decoration-2">Bienvenue sur notre site&nbsp;!</p>
        <p className="mt-2 font-serif text-[10px] md:text-xs leading-snug max-w-md">
          Nous sommes une entreprise sérieuse. Cliquez ici pour découvrir nos produits et services de qualité depuis 2004.
        </p>
        <div className="mt-3 inline-block bg-[#c9ccbe] border border-[#8a8f7e] px-3 py-1 font-serif text-[10px] md:text-xs">
          » En savoir plus «
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-16 h-12 md:w-24 md:h-16 bg-[#cfd2c4] border border-[#9a9f8e]" />
          ))}
        </div>
        <p className="mt-4 font-mono text-[8px] md:text-[10px] text-[#6b6f60]">Visiteurs : 0000481 · Best viewed in 1024×768</p>
      </div>
    </div>
  );
}

function MockAfter({ accent = "#1FCE8A" }) {
  return (
    <div className="absolute inset-0 bg-white text-ink select-none overflow-hidden">
      <div className="h-7 md:h-9 flex items-center px-3 md:px-4 gap-2 border-b border-ink/10">
        <span className="grid place-items-center w-4 h-4 md:w-5 md:h-5 rounded-md text-white font-display font-extrabold text-[9px] md:text-[11px]" style={{ backgroundColor: accent }}>
          {PROJECT[0]}
        </span>
        <span className="font-display font-extrabold text-[11px] md:text-sm">{PROJECT}</span>
        <span className="ml-auto flex items-center gap-2 text-[9px] md:text-[11px] font-medium text-ink/55">
          <span className="hidden sm:inline">Solutions</span>
          <span className="rounded-full px-2.5 py-1 text-white font-semibold text-[9px] md:text-[11px]" style={{ backgroundColor: accent }}>
            Contact
          </span>
        </span>
      </div>
      <div className="p-4 md:p-7">
        <span className="inline-block rounded-full px-2.5 py-1 font-mono text-[8px] md:text-[9px] tracking-widest uppercase mb-2 md:mb-3" style={{ backgroundColor: accent + "22", color: accent }}>
          B2B · Tech
        </span>
        <h3 className="font-display font-extrabold text-lg md:text-3xl leading-[1.02] tracking-tight max-w-md">
          La technologie qui<span style={{ color: accent }}> travaille pour vous.</span>
        </h3>
        <p className="mt-2 text-ink/55 font-medium text-[10px] md:text-sm max-w-sm">
          Des solutions sur mesure, une expérience limpide, des résultats mesurables.
        </p>
        <div className="mt-3 md:mt-4 flex items-center gap-2">
          <span className="rounded-full px-3 md:px-4 py-1.5 md:py-2 text-white font-display font-bold text-[10px] md:text-sm shadow-sm" style={{ backgroundColor: accent }}>
            Demander une démo
          </span>
          <span className="rounded-full px-3 md:px-4 py-1.5 md:py-2 border border-ink/15 font-semibold text-[10px] md:text-sm text-ink/60">
            Nos services
          </span>
        </div>
        <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg md:rounded-xl border border-ink/10 p-2 md:p-2.5">
              <div className="w-4 h-4 md:w-6 md:h-6 rounded-md mb-1.5 md:mb-2" style={{ backgroundColor: accent, opacity: 0.85 - i * 0.22 }} />
              <div className="h-1 md:h-1.5 rounded bg-ink/15 mb-1 md:mb-1.5" />
              <div className="h-1 md:h-1.5 w-2/3 rounded bg-ink/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const t = useT();
  const { lang } = useLang();
  const [pos, setPos] = useState(52);
  const boxRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setFromClientX(x);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [setFromClientX]);

  const startDrag = (e) => {
    dragging.current = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setFromClientX(x);
  };

  return (
    <section className="relative bg-espresso text-cream py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <SectionLabel dark>{t("( Avant / après )", "( Before / after )")}</SectionLabel>
          <h2 className="mt-4 font-display font-extrabold text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tight">
            {t("Tirez pour voir", "Drag to see")}
            <br />
            <span className="text-mint">{t("la différence.", "the difference.")}</span>
          </h2>
          <p className="mt-5 text-lg text-cream/70 font-medium max-w-lg leading-relaxed">
            {t(
              "Le même projet, avant et après notre passage. On glisse la poignée — le reste parle tout seul.",
              "The same project, before and after our work. Slide the handle — the rest speaks for itself.",
            )}
          </p>
        </div>

        {/* comparateur */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          className="mt-10 md:mt-14"
        >
          <div
            ref={boxRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-[1.4rem] overflow-hidden border-[3px] border-ink bg-white shadow-[12px_12px_0_#000] cursor-ew-resize select-none"
          >
            {/* APRÈS (dessous, plein) */}
            {AFTER_IMG ? (
              <img src={AFTER_IMG} alt={t("Après — site Cafein", "After — Cafein site")} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
            ) : (
              <MockAfter />
            )}

            {/* AVANT (dessus, rogné à gauche) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <div className="absolute inset-0" style={{ width: boxRef.current ? boxRef.current.getBoundingClientRect().width : "100%" }}>
                {BEFORE_IMG ? (
                  <img src={BEFORE_IMG} alt={t("Avant", "Before")} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
                ) : (
                  <MockBefore />
                )}
              </div>
            </div>

            {/* étiquettes */}
            <span className="absolute top-3 left-3 rounded-full bg-ink/80 text-cream font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 pointer-events-none">
              {t("Avant", "Before")}
            </span>
            <span className="absolute top-3 right-3 rounded-full bg-mint text-ink font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 pointer-events-none">
              {t("Après", "After")}
            </span>

            {/* poignée */}
            <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
              <div className="w-1 h-full bg-mint shadow-[0_0_0_1px_rgba(0,0,0,0.4)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-mint border-[3px] border-ink shadow-[3px_3px_0_#000]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
                </svg>
              </div>
            </div>
          </div>

          {!AFTER_IMG && (
            <p className="mt-3 font-mono text-[11px] tracking-wide text-cream/40">
              {t("Maquette de démonstration — bientôt un vrai projet.", "Demo mockup — a real project coming soon.")}
            </p>
          )}

          <div className="mt-8">
            <Link
              to="/#contact"
              data-hiss
              data-cursor={t("Go !", "Go!")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-mint text-ink font-display font-bold text-lg px-7 py-3.5 border-[3px] border-ink shadow-[5px_5px_0_#000] hover:shadow-[0_0_0_#000] hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200"
            >
              {t("On refait le vôtre ?", "Shall we redo yours?")}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
