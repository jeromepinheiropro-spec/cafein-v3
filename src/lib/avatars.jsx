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

/* ── Maélie : la team thé. Tasse à thé (infusion rosée) + étiquette
   de sachet qui pend, béret créa, boucles d'oreilles, étincelle « idées ».
   La seule au thé dans une agence de café. */
export function AvatarMaelie({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <ellipse cx="100" cy="170" rx="60" ry="11" fill="#141A17" opacity="0.12" />
      {/* étincelle « idée » */}
      <path d="M44 46 c1.3 5 3.4 7.2 8.4 8.5 c-5 1.3 -7.1 3.5 -8.4 8.5 c-1.3 -5 -3.4 -7.2 -8.4 -8.5 c5 -1.3 7.1 -3.5 8.4 -8.5 z" fill="#FFD166" stroke="#141A17" strokeWidth="3" strokeLinejoin="round" />
      {/* ficelle + étiquette du sachet de thé */}
      <path d="M122 82 q12 -20 27 -25" fill="none" stroke="#141A17" strokeWidth="2.6" />
      <g transform="rotate(-14 152 50)">
        <rect x="143" y="42" width="19" height="16" rx="2.5" fill="#F5EFE2" stroke="#141A17" strokeWidth="3" />
        <path d="M152.5 46.5 q-3 -3 -5.5 0 q-2 2.2 5.5 7.5 q7.5 -5.3 5.5 -7.5 q-2.5 -3 -5.5 0 z" fill="#F0876B" />
      </g>
      {/* tasse à thé */}
      <path d="M52 82 h96 v40 a48 32 0 0 1 -96 0 z" fill="#F0876B" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* anse */}
      <path d="M148 92 h13 a15 15 0 0 1 0 30 h-15" fill="none" stroke="#141A17" strokeWidth="6" strokeLinecap="round" />
      {/* surface du thé */}
      <ellipse cx="100" cy="82" rx="48" ry="8.5" fill="#E86A4E" stroke="#141A17" strokeWidth="6" />
      {/* béret créatif incliné */}
      <g transform="rotate(-12 92 70)">
        <ellipse cx="92" cy="72" rx="40" ry="14" fill="#1FCE8A" stroke="#141A17" strokeWidth="6" />
        <path d="M60 74 q32 9 64 0" fill="none" stroke="#141A17" strokeWidth="3.5" opacity="0.45" />
        <circle cx="112" cy="58" r="5.5" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      </g>
      {/* boucles d'oreilles */}
      <circle cx="50" cy="108" r="6" fill="none" stroke="#141A17" strokeWidth="4" />
      <circle cx="150" cy="108" r="6" fill="none" stroke="#141A17" strokeWidth="4" />
      {/* joues */}
      <circle cx="74" cy="110" r="5" fill="#E8623E" opacity="0.35" />
      <circle cx="126" cy="110" r="5" fill="#E8623E" opacity="0.35" />
      {/* yeux doux + cils au coin externe */}
      <circle cx="84" cy="106" r="4" fill="#141A17" />
      <circle cx="116" cy="106" r="4" fill="#141A17" />
      <path d="M79 103.5 l-5 -2.5" stroke="#141A17" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M79 106.5 l-5 0.5" stroke="#141A17" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M121 103.5 l5 -2.5" stroke="#141A17" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M121 106.5 l5 0.5" stroke="#141A17" strokeWidth="2.6" strokeLinecap="round" />
      {/* sourire */}
      <path d="M88 120 q12 10 24 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Fève, le barista : mascotte dédiée au chat IA ───────────────
   Un mélange des trois de l'équipe, en tasse : les lunettes rondes de
   Stan, le clin d'œil de Pinoo et le casque audio de Flo. */
export function AvatarBarista({ className = "w-full h-auto" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {/* ombre au sol */}
      <ellipse cx="100" cy="184" rx="42" ry="8" fill="#141A17" opacity="0.12" />
      {/* grand gobelet à emporter (silhouette haute et fuselée, façon Pinoo/Flo) */}
      <path d="M60 72 L74 166 Q75 172 82 172 H118 Q125 172 126 166 L140 72 Z" fill="#F4A259" stroke="#141A17" strokeWidth="6" strokeLinejoin="round" />
      {/* rebord du gobelet */}
      <path d="M56 72 H144" stroke="#141A17" strokeWidth="6" strokeLinecap="round" />
      {/* manchon (bandeau to-go) */}
      <path d="M70 132 H130 L127 152 H73 Z" fill="#F5EFE2" stroke="#141A17" strokeWidth="5" strokeLinejoin="round" />
      {/* casque audio de Flo : arceau + oreillettes */}
      <path d="M60 72 Q100 40 140 72" fill="none" stroke="#141A17" strokeWidth="7" strokeLinecap="round" />
      <rect x="50" y="78" width="15" height="26" rx="7" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      <rect x="135" y="78" width="15" height="26" rx="7" fill="#1FCE8A" stroke="#141A17" strokeWidth="5" />
      {/* joues */}
      <circle cx="74" cy="112" r="4.5" fill="#E8623E" opacity="0.4" />
      <circle cx="126" cy="112" r="4.5" fill="#E8623E" opacity="0.4" />
      {/* lunettes rondes de Stan */}
      <circle cx="82" cy="100" r="11" fill="#fff" stroke="#141A17" strokeWidth="5" />
      <circle cx="118" cy="100" r="11" fill="#fff" stroke="#141A17" strokeWidth="5" />
      <line x1="93" y1="100" x2="107" y2="100" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
      {/* œil gauche ouvert, œil droit qui fait le clin d'œil de Pinoo */}
      <circle cx="82" cy="100" r="3.4" fill="#141A17" />
      <path d="M112 100 q6 4 12 0" fill="none" stroke="#141A17" strokeWidth="4.5" strokeLinecap="round" />
      {/* sourire */}
      <path d="M88 118 q12 9 24 0" fill="none" stroke="#141A17" strokeWidth="5" strokeLinecap="round" />
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
  {
    id: "maelie",
    name: "Maélie",
    Avatar: AvatarMaelie,
    line: ["Moi c'est Maélie — la team thé, et les idées qui infusent.", "I'm Maélie — team tea, and the ideas that brew."],
  },
];
