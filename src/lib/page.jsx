import React from "react";
import { motion } from "framer-motion";
import { Magnetic, ArrowUpRight, Spark, Bean, SectionLabel } from "./ui.jsx";

/* ── Hero de page intérieure (V3 : clair, joyeux, autocollants) ── */
export function PageHero({ n, tag, title, subtitle, children }) {
  return (
    <section className="relative bg-cream pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      {/* blobs décoratifs */}
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-blob bg-mint/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[22rem] h-[22rem] rounded-blob bg-sun/20 blur-2xl pointer-events-none" />
      {/* grains flottants */}
      {[
        { top: "18%", left: "6%", size: 26, delay: 0 },
        { top: "70%", left: "12%", size: 18, delay: 0.8 },
        { top: "24%", right: "8%", size: 22, delay: 0.4 },
      ].map((b, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -14, 0], rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 + i, delay: b.delay }}
          className="absolute pointer-events-none opacity-40 hidden md:block"
          style={{ top: b.top, left: b.left, right: b.right }}
          aria-hidden
        >
          <Bean style={{ width: b.size, height: b.size }} />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ rotate: -12 }}
              animate={{ rotate: [-12, -6, -12] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="grid place-items-center w-12 h-12 rounded-full bg-ink text-mint font-display font-bold border-[3px] border-mint shadow-[3px_3px_0_#1FCE8A]"
            >
              {n}
            </motion.span>
            <SectionLabel className="!mt-0">( {tag} )</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 font-display font-extrabold leading-[0.95] tracking-tight text-ink text-4xl md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-ink/70 font-medium leading-relaxed max-w-xl"
          >
            {subtitle}
          </motion.p>
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 16 }}
            className="hidden lg:block"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ── Bande CTA de fin de page (espresso, bouton cartoon) ─────── */
export function CtaBand({ title, sub, label }) {
  return (
    <section className="relative bg-espresso py-24 md:py-32 overflow-hidden border-t-4 border-mint">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-mint/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <Spark className="w-8 h-8 text-mint" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-3xl md:text-6xl text-cream leading-[0.95] tracking-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-lg text-cream/60 font-medium"
        >
          {sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-9 flex justify-center"
        >
          <Magnetic strength={0.25}>
            <a
              href="/#contact"
              data-cursor="Go !"
              className="group inline-flex items-center gap-3 rounded-full bg-mint text-ink font-display font-bold text-lg px-9 py-4 border-[3px] border-ink shadow-[6px_6px_0_#F5EFE2] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200"
            >
              {label}
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ compacte réutilisable (fond crème) ───────────────────── */
export function MiniFaq({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight mb-10"
        >
          Questions <span className="squiggle">fréquentes</span>
        </motion.h2>
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b-2 border-ink/15">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left py-6 group"
              >
                <span className={`font-display font-bold text-lg md:text-xl transition-colors ${isOpen ? "text-mint-dark" : "text-ink group-hover:text-mint-dark"}`}>
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`shrink-0 grid place-items-center w-9 h-9 rounded-full border-2 transition-colors ${isOpen ? "border-mint bg-mint text-ink" : "border-ink/30 text-ink"}`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-ink/75 font-medium leading-relaxed">{f.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Étapes numérotées (grille, cartes cartoon V3) ────────────── */
export function Steps({ title, steps, dark = false }) {
  return (
    <section className={`${dark ? "bg-espresso" : "bg-cream"} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={`font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-12 ${dark ? "text-cream" : "text-ink"}`}
        >
          {title}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
              whileHover={{ y: -6, rotate: i % 2 ? -1 : 1 }}
              className={`rounded-3xl border-[3px] p-7 ${
                dark
                  ? "border-mint/40 bg-espresso-2/70 shadow-[5px_5px_0_rgba(31,206,138,0.35)]"
                  : "border-ink bg-white shadow-[5px_5px_0_#1FCE8A]"
              }`}
            >
              <span className={`font-display font-extrabold text-4xl ${dark ? "text-mint" : "text-mint-dark"}`}>{s.n}</span>
              <h3 className={`mt-4 font-display font-extrabold text-xl tracking-tight ${dark ? "text-cream" : "text-ink"}`}>
                {s.title}
              </h3>
              <p className={`mt-3 font-medium leading-relaxed text-sm ${dark ? "text-cream/60" : "text-ink/70"}`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
