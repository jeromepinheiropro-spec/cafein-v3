import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "../lib/ui.jsx";
import { Link } from "../lib/link.jsx";
import { useT } from "../lib/lang.jsx";

/*
  Avant / après CONCEPTUEL : pas de photo, mais deux wireframes qui parlent
  d'eux-mêmes, un « avant » daté (lent, invisible) vs un « après » Cafein
  (rapide, esthétique, optimisé). On tire la poignée pour comparer, et des
  puces de valeur projettent le bénéfice. Dès qu'on a de vraies captures d'un
  projet Nooki, renseigner BEFORE_IMG / AFTER_IMG et elles remplacent les
  wireframes.
*/
const BEFORE_IMG = "";
const AFTER_IMG = "";

/* ── Wireframe « avant » : site daté, terne ────────────────────── */
function MockBefore({ t }) {
  return (
    <div className="absolute inset-0 bg-[#EDE5D3] text-ink select-none overflow-hidden p-6 md:p-9 flex flex-col">
      <span className="self-start rounded-lg bg-ink text-cream font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1.5">
        {t("Avant : site existant", "Before: existing site")}
      </span>
      <div className="mt-7 space-y-3 max-w-[62%]">
        <div className="h-4 w-2/3 rounded bg-ink/25" />
        <div className="h-2.5 w-full rounded bg-ink/12" />
        <div className="h-2.5 w-full rounded bg-ink/12" />
        <div className="h-2.5 w-4/5 rounded bg-ink/12" />
        <div className="h-8 w-28 rounded bg-ink/15 mt-3" />
      </div>
      <span className="mt-auto font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-ink/35">
        {t("Lent · Daté · Invisible sur Google", "Slow · Dated · Invisible on Google")}
      </span>
    </div>
  );
}

/* ── Wireframe « après » : refonte Cafein, nette et moderne ─────── */
function MockAfter({ t }) {
  return (
    <div className="absolute inset-0 bg-espresso text-cream select-none overflow-hidden p-6 md:p-9 flex flex-col items-end text-right">
      <span className="rounded-lg bg-mint text-ink font-mono text-[10px] md:text-xs font-extrabold tracking-widest uppercase px-3 py-1.5">
        {t("Après Cafein", "After Cafein")}
      </span>
      <div className="mt-7 w-full max-w-[64%] flex flex-col items-end space-y-3">
        <div className="h-9 w-3/4 rounded-xl bg-white" />
        <div className="h-2.5 w-full rounded bg-white/25" />
        <div className="h-2.5 w-5/6 rounded bg-white/15" />
        <div className="h-9 w-40 rounded-full bg-mint mt-3 shadow-[3px_3px_0_#0A0F0D]" />
      </div>
      <span className="mt-auto font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-mint">
        {t("Refonte optimisée : UX mobile + structure SEO", "Optimised rebuild: mobile UX + SEO structure")}
      </span>
    </div>
  );
}

export default function BeforeAfter() {
  const t = useT();
  const [pos, setPos] = useState(50);
  const boxRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(3, Math.min(97, p)));
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

  const benefits = [
    { icon: "⚡", label: t("Plus rapide", "Faster") },
    { icon: "✨", label: t("Plus esthétique", "More beautiful") },
    { icon: "🔍", label: t("Mieux référencé", "Better ranked") },
    { icon: "📱", label: t("100% responsive", "Fully responsive") },
    { icon: "🤖", label: t("Prêt pour l'IA (GEO)", "AI-ready (GEO)") },
    { icon: "🚀", label: t("Pensé pour convertir", "Built to convert") },
  ];

  return (
    <section className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel>{t("( Avant / après )", "( Before / after )")}</SectionLabel>
        <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.95] text-ink tracking-tight max-w-2xl">
            {t("Un site repensé de A à Z", "A site rethought from A to Z")}
          </h2>
          <span className="font-mono text-xs md:text-sm tracking-[0.22em] uppercase text-ink/40 pb-2">
            {t("← Glissez le curseur →", "← Drag the slider →")}
          </span>
        </div>

        {/* comparateur */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          className="mt-9"
        >
          <div
            ref={boxRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="relative w-full aspect-[16/11] sm:aspect-[16/8] lg:aspect-[16/6] rounded-[1.4rem] overflow-hidden border-[3px] border-ink bg-cream shadow-[10px_10px_0_#0A0F0D] cursor-ew-resize select-none"
          >
            {/* APRÈS (dessous, plein) */}
            {AFTER_IMG ? (
              <img src={AFTER_IMG} alt={t("Après, Cafein", "After, Cafein")} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
            ) : (
              <MockAfter t={t} />
            )}

            {/* AVANT (dessus, rogné à gauche) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <div className="absolute inset-0" style={{ width: boxRef.current ? boxRef.current.getBoundingClientRect().width : "100%" }}>
                {BEFORE_IMG ? (
                  <img src={BEFORE_IMG} alt={t("Avant", "Before")} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
                ) : (
                  <MockBefore t={t} />
                )}
              </div>
            </div>

            {/* poignée : barre + rond toujours solidaires, centrés sur pos */}
            <div className="absolute inset-y-0 z-10 pointer-events-none" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 w-1 bg-mint shadow-[0_0_0_1px_rgba(0,0,0,0.35)]" />
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-mint border-[3px] border-ink shadow-[3px_3px_0_#0A0F0D]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* puces de valeur : projettent le bénéfice, même sans photo */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {benefits.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-ink px-4 py-2 font-semibold text-sm text-ink shadow-[2px_2px_0_#0A0F0D]"
              >
                <span aria-hidden>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          <div className="mt-9">
            <Link
              to="/#contact"
              data-cursor={t("Go !", "Go!")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-mint text-ink font-display font-bold text-lg px-7 py-3.5 border-[3px] border-ink shadow-[5px_5px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200"
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
