import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bean, Cup, Spark } from "../lib/ui.jsx";

/*
  Easter eggs V4 :
  - Taper « cafein »  → mode surcaféiné (tout s'accélère)
  - Taper « decaf »   → mode décaféiné (noir & blanc, tout ramollit)
  - Konami code       → confettis + tasse géante qui traverse l'écran
  - 3 clics sur le grain du « i » du hero → pluie de grains + message caché
*/

const EggContext = createContext({
  overdrive: false,
  decaf: false,
  rain: () => {},
});

export const useEgg = () => useContext(EggContext);

const KONAMI = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a",
];

export function EggProvider({ children }) {
  const [overdrive, setOverdrive] = useState(false);
  const [decaf, setDecaf] = useState(false);
  const [raining, setRaining] = useState(false);
  const [konami, setKonami] = useState(false);

  const rain = useCallback(() => {
    setRaining(true);
    setTimeout(() => setRaining(false), 4200);
  }, []);

  /* Écoute clavier globale */
  useEffect(() => {
    let buffer = "";
    let konamiIdx = 0;

    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      const key = e.key.toLowerCase();

      /* Konami */
      if (key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          setKonami(true);
          setTimeout(() => setKonami(false), 3800);
        }
      } else {
        konamiIdx = key === KONAMI[0] ? 1 : 0;
      }

      /* Mots secrets */
      if (/^[a-z]$/.test(key)) {
        buffer = (buffer + key).slice(-12);
        if (buffer.endsWith("cafein")) {
          buffer = "";
          setOverdrive((v) => !v);
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

  /* Classes globales pour le CSS */
  useEffect(() => {
    document.documentElement.classList.toggle("egg-overdrive", overdrive);
    document.documentElement.classList.toggle("egg-decaf", decaf);
  }, [overdrive, decaf]);

  return (
    <EggContext.Provider value={{ overdrive, decaf, rain }}>
      {children}
      <EggLayer overdrive={overdrive} decaf={decaf} raining={raining} konami={konami} />
    </EggContext.Provider>
  );
}

/* ── Pluie de grains ──────────────────────────────────────────── */
function BeanRain() {
  const beans = Array.from({ length: 38 }, (_, i) => ({
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
          initial={{ y: -60, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: b.rot, opacity: [1, 1, 0.9] }}
          transition={{ duration: b.dur, delay: b.delay, ease: [0.3, 0, 0.8, 0.6] }}
          className="absolute top-0"
          style={{ left: `${b.left}%` }}
        >
          <Bean className="drop-shadow-lg" fill={b.fill} style={{ width: b.size, height: b.size }} />
        </motion.div>
      ))}
      {/* Message caché */}
      <motion.div
        initial={{ scale: 0, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 14 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-mint text-ink border-[3px] border-ink rounded-3xl px-8 py-6 shadow-[8px_8px_0_#0A0F0D] text-center max-w-sm mx-6">
          <p className="font-display font-extrabold text-2xl">Vous avez trouvé le grain rare !</p>
          <p className="mt-2 font-medium text-ink/80">
            Bravo — peu de gens cliquent là. Le premier café est pour nous.
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-ink/60">
            Easter egg 1/4 — il en reste à découvrir…
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Konami : confettis + tasse géante ────────────────────────── */
function KonamiShow() {
  const parts = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 1.6 + Math.random() * 1.4,
    c: ["#1FCE8A", "#F4A259", "#FFD166", "#F5EFE2"][i % 4],
    r: Math.random() * 720 - 360,
    shape: i % 3,
  }));
  return (
    <div className="fixed inset-0 z-[9500] pointer-events-none overflow-hidden">
      {parts.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -30, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", rotate: p.r, opacity: [1, 1, 0.8] }}
          transition={{ duration: p.dur, delay: p.delay, ease: [0.3, 0, 0.7, 0.5] }}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            width: p.shape === 0 ? 14 : 10,
            height: p.shape === 1 ? 14 : 10,
            backgroundColor: p.c,
            borderRadius: p.shape === 2 ? "50%" : "3px",
          }}
        />
      ))}
      {/* La tasse géante qui traverse */}
      <motion.div
        initial={{ x: "-30vw", rotate: -10 }}
        animate={{ x: "130vw", rotate: 10 }}
        transition={{ duration: 2.6, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          <Cup className="w-40 h-40 md:w-64 md:h-64" stroke="#1FCE8A" />
        </motion.div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 inset-x-0 text-center font-mono text-sm tracking-[0.4em] uppercase text-mint"
      >
        Konami débloqué — +30 de caféine
      </motion.p>
    </div>
  );
}

/* ── Badges de mode + calques ─────────────────────────────────── */
function EggLayer({ overdrive, decaf, raining, konami }) {
  return (
    <>
      <AnimatePresence>{raining && <BeanRain key="rain" />}</AnimatePresence>
      <AnimatePresence>{konami && <KonamiShow key="konami" />}</AnimatePresence>

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
