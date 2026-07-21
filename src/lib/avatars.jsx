import React from "react";

/* ── Avatars illustrés de l'équipe : trois tasses, trois caractères ──
   Source unique, partagée par la page Équipe et la mascotte flottante.
   viewBox 200×200, 100% vectoriel. */

export function AvatarStan({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {/* soucoupe */}
      <ellipse cx="100" cy="168" rx="62" ry="12" fill="#141A17" opacity="0.12" />
      {/* tasse */}
      <path d="M52 78 h96 v46 a48 34 0 0 1 -96 0 z" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      <path d="M148 88 h14 a16 16 0 0 1 0 32 h-16" fill="none" stroke="#141A17" strokeWidth="6" strokeLinecap="round" />
      {/* mousse */}
      <path d="M50 78 q10 -12 25 -6 q8 -10 25 -6 q14 -8 25 2 q14 -4 23 10 z" fill="#F5EFE2" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* lunettes rondes */}
      <circle cx="82" cy="112" r="12" fill="#fff" stroke="#141A17" strokeWidth="5" />
      <circle cx="118" cy="112" r="12" fill="#fff" stroke="#141A17" strokeWidth="5" />
      <line x1="94" y1="112" x2="106" y2="112" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      <circle cx="82" cy="112" r="3.5" fill="#141A17" />
      <circle cx="118" cy="112" r="3.5" fill="#141A17" />
      {/* sourire */}
      <path d="M88 136 q12 10 24 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      {/* vapeur */}
      <path d="M84 52 q6 -8 0 -16" fill="none" stroke="#17A46E" strokeWidth="5" strokeLinecap="round" />
      <path d="M106 48 q7 -9 0 -19" fill="none" stroke="#17A46E" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarPinoo({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <ellipse cx="100" cy="170" rx="58" ry="11" fill="#141A17" opacity="0.12" />
      {/* gobelet to-go */}
      <path d="M62 74 l10 88 a8 8 0 0 0 8 7 h40 a8 8 0 0 0 8 -7 l10 -88 z" fill="#F4A259" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* manchon */}
      <path d="M66 106 l68 0 l-3 26 l-62 0 z" fill="#F5EFE2" stroke="#141A17" strokeWidth="5" strokeLinejoin="round" />
      {/* couvercle + casquette */}
      <rect x="56" y="62" width="88" height="14" rx="7" fill="#141A17" />
      <path d="M64 62 q36 -26 72 0 z" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      <path d="M128 56 q26 -4 30 8 l-24 4" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* clin d'œil */}
      <circle cx="86" cy="118" r="3.5" fill="#141A17" />
      <path d="M108 116 q6 4 12 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      {/* grand sourire */}
      <path d="M84 138 q16 12 32 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarFlo({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <ellipse cx="100" cy="170" rx="58" ry="11" fill="#141A17" opacity="0.12" />
      {/* verre latte */}
      <path d="M66 64 h68 l-8 96 a10 10 0 0 1 -10 9 h-32 a10 10 0 0 1 -10 -9 z" fill="#FFD166" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      <path d="M70 90 h60" stroke="#F5EFE2" strokeWidth="14" strokeLinecap="round" />
      {/* paille */}
      <path d="M116 20 l10 4 -14 44" fill="none" stroke="#17A46E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* casque audio */}
      <path d="M64 110 a36 36 0 0 1 72 0" fill="none" stroke="#141A17" strokeWidth="7" strokeLinecap="round" />
      <rect x="58" y="104" width="14" height="24" rx="7" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      <rect x="128" y="104" width="14" height="24" rx="7" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      {/* yeux + sourire */}
      <circle cx="88" cy="122" r="3.5" fill="#141A17" />
      <circle cx="112" cy="122" r="3.5" fill="#141A17" />
      <path d="M88 140 q12 10 24 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Méta mascotte : identité + réplique perso de chacun ──────────
   Utilisé par la mascotte flottante pour se présenter selon le
   personnage tiré au sort. `line` = [FR, EN]. */
export const MASCOTS = [
  {
    id: "stan",
    name: "Stan",
    Avatar: AvatarStan,
    line: ["Moi c'est Stan, le stratège. On cadre, tu avances.", "I'm Stan, the strategist. We plan, you move forward."],
  },
  {
    id: "pinoo",
    name: "Pinoo",
    Avatar: AvatarPinoo,
    line: ["Moi c'est Pinoo — toujours entre deux idées et trois écrans.", "I'm Pinoo — always between two ideas and three screens."],
  },
  {
    id: "flo",
    name: "Flo",
    Avatar: AvatarFlo,
    line: ["Moi c'est Flo, l'œil créa. Je rends tout plus beau.", "I'm Flo, the creative eye. I make everything prettier."],
  },
];
