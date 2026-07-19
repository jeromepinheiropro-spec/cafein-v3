import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bean, Cup, Spark } from "../lib/ui.jsx";

/*
  Easter eggs V4 :
  - Chasse aux grains : 4 grains cachés dans le site → café offert
  - Taper « cafein »  → mode surcaféiné (onde de choc + tout s'accélère)
  - Taper « decaf »   → mode décaféiné (noir & blanc, tout ramollit)
  - Konami code       → écran arcade → LE BARISTA (jeu sur son propre domaine)
*/

export const GAME_URL = "https://cafein-game-production.up.railway.app";
const STORAGE_KEY = "cafein-grains";
const ALL_BEANS = ["hero", "methode", "resultats", "footer"];

const EggContext = createContext({
  overdrive: false,
  decaf: false,
  found: [],
  collect: () => {},
  curious: () => {},
});

export const useEgg = () => useContext(EggContext);

const KONAMI = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a",
];

export function EggProvider({ children }) {
  const [overdrive, setOverdrive] = useState(false);
  const [blast, setBlast] = useState(false);
  const [decaf, setDecaf] = useState(false);
  const [konami, setKonami] = useState(false);
  const [found, setFound] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);
  const [allFound, setAllFound] = useState(false);
  const [hint, setHint] = useState(false);
  const curiousClicks = useRef(0);

  /* 3 clics sur le grain du i → indice vers le jeu caché */
  const curious = useCallback(() => {
    curiousClicks.current += 1;
    if (curiousClicks.current % 3 === 0) {
      setHint(true);
    }
  }, []);

  /* Collecte d'un grain caché */
  const collect = useCallback(
    (id) => {
      setFound((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch { /* privé */ }
        if (next.length >= ALL_BEANS.length) {
          setAllFound(true);
          setTimeout(() => setAllFound(false), 7000);
        } else {
          setToast({ n: next.length, id });
          setTimeout(() => setToast(null), 2600);
        }
        return next;
      });
    },
    []
  );

  /* Écoute clavier globale */
  useEffect(() => {
    let buffer = "";
    let konamiIdx = 0;

    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      const key = e.key.toLowerCase();

      if (key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          setKonami(true);
          /* redirection vers le jeu après la séquence arcade */
          setTimeout(() => {
            window.location.href = GAME_URL + "?from=konami";
          }, 3200);
        }
      } else {
        konamiIdx = key === KONAMI[0] ? 1 : 0;
      }

      if (/^[a-z]$/.test(key)) {
        buffer = (buffer + key).slice(-12);
        if (buffer.endsWith("cafein")) {
          buffer = "";
          setOverdrive((v) => {
            const on = !v;
            if (on) {
              setBlast(true);
              setTimeout(() => setBlast(false), 1500);
            }
            return on;
          });
          setDecaf(false);
        } else if (buffer.endsWith("decaf")) {
          buffer = "";
          setDecaf((v) => !v);
          setOverdrive(false);
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("egg-overdrive", overdrive);
    document.documentElement.classList.toggle("egg-decaf", decaf);
  }, [overdrive, decaf]);

  return (
    <EggContext.Provider value={{ overdrive, decaf, found, collect, curious }}>
      {children}
      <EggLayer
        overdrive={overdrive}
        decaf={decaf}
        blast={blast}
        konami={konami}
        toast={toast}
        allFound={allFound}
        found={found}
        hint={hint}
        onCloseHint={() => setHint(false)}
      />
    </EggContext.Provider>
  );
}

/* ── Grain caché cliquable (la chasse) ────────────────────────── */
export function HuntBean({ id, className = "w-6 h-6", fill = "#1FCE8A" }) {
  const { found, collect } = useEgg();
  const done = found.includes(id);
  return (
    <motion.button
      type="button"
      onClick={() => collect(id)}
      data-cursor={done ? "Déjà trouvé" : "Grain !"}
      aria-label={done ? "Grain déjà trouvé" : "Un grain de café suspect…"}
      whileHover={{ scale: 1.35, rotate: 20 }}
      whileTap={{ scale: 0.7 }}
      animate={done ? { opacity: 0.35 } : { opacity: [0.55, 0.9, 0.55] }}
      transition={done ? {} : { repeat: Infinity, duration: 2.4 }}
      className={`inline-block align-middle cursor-pointer bg-transparent border-0 p-0 ${className}`}
    >
      <Bean className="w-full h-full" fill={done ? "#8a8a8a" : fill} />
    </motion.button>
  );
}

/* ── Pluie de grains + carte de victoire (4/4) ────────────────── */
function BeanRain({ title, sub, code }) {
  const beans = Array.from({ length: 44 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.2,
    dur: 2 + Math.random() * 1.6,
    size: 18 + Math.random() * 26,
    rot: Math.random() * 720 - 360,
    fill: ["#1FCE8A", "#F4A259", "#FFD166"][i % 3],
  }));
  return (
    <div className="fixed inset-0 z-[9500] pointer-events-none overflow-hidden">
      {beans.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: -60, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: b.rot, opacity: [1, 1, 0.9] }}
          transition={{ duration: b.dur, delay: b.delay, ease: [0.3, 0, 0.8, 0.6] }}
          className="absolute top-0"
          style={{ left: `${b.left}%` }}
        >
          <Bean className="drop-shadow-lg" fill={b.fill} style={{ width: b.size, height: b.size }} />
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 14 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-mint text-ink border-[3px] border-ink rounded-3xl px-8 py-7 shadow-[8px_8px_0_#0A0F0D] text-center max-w-md mx-6">
          <p className="font-display font-extrabold text-2xl md:text-3xl">{title}</p>
          <p className="mt-2 font-medium text-ink/80">{sub}</p>
          {code && (
            <p className="mt-4 inline-block bg-ink text-mint font-display font-bold tracking-[0.25em] px-6 py-2.5 rounded-xl">
              {code}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Onde de choc « Triple espresso » ─────────────────────────── */
function OverdriveBlast() {
  return (
    <div className="fixed inset-0 z-[9500] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* flash */}
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-mint"
      />
      {/* ondes */}
      {[0, 0.12, 0.24].map((d, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 14, opacity: 0 }}
          transition={{ duration: 1.2, delay: d, ease: "easeOut" }}
          className="absolute w-40 h-40 rounded-full border-8 border-mint"
        />
      ))}
      {/* tampon */}
      <motion.div
        initial={{ scale: 4, rotate: -18, opacity: 0 }}
        animate={{ scale: 1, rotate: -6, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 }}
        className="relative border-[6px] border-mint text-mint font-display font-extrabold uppercase text-3xl md:text-6xl tracking-tight px-8 py-4 bg-espresso/80 backdrop-blur"
      >
        Triple espresso
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="block text-center font-mono text-xs md:text-sm tracking-[0.4em] text-cream/70 mt-1"
        >
          Caféine : niveau maximum
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ── Écran arcade Konami → LE BARISTA ─────────────────────────── */
function KonamiArcade() {
  const lines = [
    "> CODE SECRET ACCEPTÉ",
    "> INITIALISATION DE LA MACHINE…",
    "> MOUTURE : EXTRA-FINE",
    "> LANCEMENT DE « LE BARISTA »",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9700] bg-espresso egg-scanlines flex flex-col items-center justify-center gap-8 px-6"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
      >
        <Cup className="w-24 h-24 md:w-32 md:h-32" stroke="#1FCE8A" />
      </motion.div>

      <div className="font-mono text-mint text-sm md:text-lg space-y-2 text-left">
        {lines.map((l, i) => (
          <motion.p
            key={l}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.55 }}
          >
            {l}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, type: "spring", stiffness: 200, damping: 12 }}
        className="font-display font-extrabold uppercase text-cream text-2xl md:text-4xl tracking-tight text-center"
      >
        Battez le record : <span className="text-sun">10% sur votre offre</span>
        <span className="block font-mono text-xs tracking-[0.4em] text-cream/50 mt-3">
          ou un café. Bonne chance, barista.
        </span>
      </motion.p>

      {/* barre de chargement */}
      <div className="w-64 h-2 border border-mint/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.9, ease: "easeInOut" }}
          className="h-full bg-mint"
        />
      </div>
    </motion.div>
  );
}

/* ── Carte indice « Curieux mais malin ! » (3 clics sur le grain) ── */
function CuriousHint({ onClose }) {
  const keys = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9650] bg-espresso/60 backdrop-blur-sm flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -6, y: 40, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-cream border-[3px] border-ink rounded-3xl px-8 py-8 shadow-[8px_8px_0_#1FCE8A] text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 14, -14, 0] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-mint border-[3px] border-ink mb-4"
        >
          <Bean className="w-8 h-8" fill="#141A17" />
        </motion.div>
        <p className="font-display font-extrabold text-2xl md:text-3xl text-ink">
          Curieux… mais malin !
        </p>
        <p className="mt-3 font-medium text-ink/75 leading-relaxed">
          Trois clics sur le même grain, on aime ça. Il existe un <b>jeu caché</b> quelque part :
          remportez-le et c'est <b className="text-mint-dark">10% sur votre offre de prix</b> — ou un café offert.
        </p>
        <p className="mt-5 font-mono text-[10px] tracking-[0.3em] uppercase text-ink/50">
          Indice — au clavier, quelque part sur ce site :
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5" aria-label="Konami code">
          {keys.map((k, i) => (
            <motion.span
              key={i}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.09, type: "spring", stiffness: 300, damping: 15 }}
              className="grid place-items-center min-w-8 h-8 px-2 rounded-lg bg-ink text-mint font-mono text-sm font-bold border-2 border-mint/50"
            >
              {k}
            </motion.span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 rounded-full bg-ink text-cream font-semibold text-sm px-6 py-2.5 border-2 border-ink hover:bg-mint hover:text-ink hover:border-mint transition-colors"
        >
          Compris, motus ☕
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Calques + HUD ────────────────────────────────────────────── */
function EggLayer({ overdrive, decaf, blast, konami, toast, allFound, found, hint, onCloseHint }) {
  return (
    <>
      <AnimatePresence>{blast && <OverdriveBlast key="blast" />}</AnimatePresence>
      <AnimatePresence>{konami && <KonamiArcade key="konami" />}</AnimatePresence>
      <AnimatePresence>{hint && <CuriousHint key="hint" onClose={onCloseHint} />}</AnimatePresence>
      <AnimatePresence>
        {allFound && (
          <BeanRain
            key="allfound"
            title="Les 4 grains rares !"
            sub="Chapeau, rien ne vous échappe. Montrez cet écran lors de notre premier échange : le café est pour nous."
            code="GRAINS-X4"
          />
        )}
      </AnimatePresence>

      {/* Toast de collecte */}
      <div className="fixed bottom-5 right-5 z-[9600] pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.n}
              initial={{ y: 60, opacity: 0, rotate: 4 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex items-center gap-3 bg-espresso text-cream border-2 border-mint rounded-2xl px-5 py-3 shadow-[5px_5px_0_rgba(31,206,138,0.4)]"
            >
              <Bean className="w-6 h-6" />
              <div>
                <p className="font-display font-bold text-sm">Grain trouvé ! {toast.n}/4</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/60">
                  {4 - toast.n} restant{4 - toast.n > 1 ? "s" : ""} — ouvrez l'œil
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compteur permanent (dès le premier grain) */}
      {found.length > 0 && found.length < 4 && !toast && (
        <div className="fixed bottom-5 right-5 z-[9590] pointer-events-none flex items-center gap-1.5 bg-espresso/80 backdrop-blur border border-cream/15 rounded-full px-3.5 py-2">
          {ALL_BEANS.map((b) => (
            <Bean key={b} className="w-4 h-4" fill={found.includes(b) ? "#1FCE8A" : "#3a423e"} />
          ))}
        </div>
      )}

      {/* Badges de mode */}
      <div className="fixed bottom-5 left-5 z-[9600] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {overdrive && (
            <motion.div
              key="over"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex items-center gap-2 bg-mint text-ink border-2 border-ink rounded-full px-4 py-2 font-mono text-[11px] font-bold tracking-[0.2em] uppercase shadow-[4px_4px_0_#0A0F0D]"
            >
              <motion.span animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                <Spark className="w-4 h-4" />
              </motion.span>
              Triple espresso activé
            </motion.div>
          )}
          {decaf && (
            <motion.div
              key="decaf"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="flex items-center gap-2 bg-cream-2 text-ink border-2 border-ink rounded-full px-4 py-2 font-mono text-[11px] font-bold tracking-[0.2em] uppercase shadow-[4px_4px_0_#0A0F0D]"
            >
              <Cup className="w-4 h-4" stroke="#141A17" />
              Mode décaféiné… zzz
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
