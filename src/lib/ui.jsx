import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ── Logo : la feuille Cafein (reprise du V1) ─────────────────── */
export function LeafMark({ className = "h-5 w-auto", leaf1 = "#1FCE8A", leaf2 = "#F2F7F5" }) {
  return (
    <svg viewBox="0 0 30 41" className={className} aria-hidden="true" fill="none">
      <path
        d="M0 0.558716V23.2477C0 27.7947 1.72257 32.2022 4.91942 35.4301C5.29187 35.8026 5.69536 36.1751 6.12989 36.5475C10.801 40.4739 15.9222 40.8153 17.443 40.8618V18.3902C17.443 14.2466 16.0308 10.2116 13.315 7.07675C13.1909 6.93707 13.0823 6.81292 12.9581 6.67325C8.0542 1.35019 1.62946 0.66735 0 0.558716Z"
        fill={leaf1}
      />
      <path
        d="M29.92 7.71301V19.492C29.92 21.8509 29.0199 24.1477 27.375 25.8238C27.1732 26.0256 26.9715 26.2118 26.7542 26.398C24.3333 28.431 21.6796 28.6173 20.8882 28.6328V16.9779C20.8882 14.8363 21.6175 12.7257 23.0297 11.1117C23.0918 11.0341 23.1539 10.972 23.216 10.91C25.7455 8.11652 29.0665 7.77509 29.92 7.71301Z"
        fill={leaf2}
      />
    </svg>
  );
}

/* ── Wordmark : Cafein avec le point du i vert ────────────────── */
export function Wordmark({ className = "text-2xl", dark = false }) {
  return (
    <span className={`font-display font-bold tracking-tight ${dark ? "text-cream" : "text-ink"} ${className}`}>
      Cafe
      <span className="relative inline-block">
        ı
        <span className="absolute left-1/2 top-[0.06em] h-[0.14em] w-[0.14em] -translate-x-1/2 rounded-[30%] bg-mint" />
      </span>
      n
    </span>
  );
}

/* ── Effet magnétique ─────────────────────────────────────────── */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.5 });

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Label de section  ( COMME ÇA ) ───────────────────────────── */
export function SectionLabel({ children, dark = false, className = "" }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`font-mono text-xs md:text-sm tracking-[0.35em] uppercase ${
        dark ? "text-mint" : "text-mint-dark"
      } ${className}`}
    >
      {children}
    </motion.p>
  );
}

/* ── Grain de café SVG ────────────────────────────────────────── */
export function Bean({ className = "w-8 h-8", fill = "#1FCE8A", style }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true" fill="none">
      <ellipse cx="24" cy="24" rx="15" ry="21" transform="rotate(28 24 24)" fill={fill} />
      <path
        d="M15 10 C 26 18, 22 30, 33 38"
        stroke="#0A0F0D"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Tasse de café SVG (traits, style doodle) ─────────────────── */
export function Cup({ className = "w-10 h-10", stroke = "#0A0F0D" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 26h32v12c0 8.8-7.2 16-16 16s-16-7.2-16-16V26z"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M44 30h6a6 6 0 0 1 0 12h-6"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M22 18c0-3 3-3 3-6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M31 18c0-3 3-3 3-6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Étoile ✦ en SVG ──────────────────────────────────────────── */
export function Spark({ className = "w-4 h-4", fill = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c1.2 6.5 5.5 10.8 12 12-6.5 1.2-10.8 5.5-12 12-1.2-6.5-5.5-10.8-12-12C6.5 10.8 10.8 6.5 12 0z" fill={fill} />
    </svg>
  );
}

/* ── Flèche diagonale ─────────────────────────────────────────── */
export function ArrowUpRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
