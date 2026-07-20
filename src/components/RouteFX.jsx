import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Cup } from "../lib/ui.jsx";
import { useEggSpeed } from "./EasterEggs.jsx";

/* ── Transition de page « portail espresso » ───────────────────
   À chaque navigation, un rideau espresso avec la tasse apparaît
   puis se referme en cercle, révélant la nouvelle page.
   Non bloquant (pointer-events none) et coupé si reduced-motion. */
export function RouteCurtain() {
  const location = useLocation();
  const eggSpeed = useEggSpeed();
  const [curtain, setCurtain] = useState(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCurtain(location.pathname);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {curtain && (
        <motion.div
          key={curtain}
          initial={{ clipPath: "circle(150% at 50% 45%)" }}
          animate={{ clipPath: "circle(0% at 50% 45%)" }}
          transition={{ duration: 0.75 / eggSpeed, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setCurtain(null)}
          className="fixed inset-0 z-[8000] bg-espresso grid place-items-center pointer-events-none"
          aria-hidden
        >
          <motion.div
            initial={{ scale: 1.1, rotate: -8, opacity: 1 }}
            animate={{ scale: 0.5, rotate: 8, opacity: 0 }}
            transition={{ duration: 0.55 / eggSpeed, ease: "easeIn" }}
          >
            <Cup className="w-20 h-20 md:w-24 md:h-24" stroke="#1FCE8A" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Barre de lecture menthe, en haut de page, partout ────────── */
export function ScrollBrew() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-mint z-[600] pointer-events-none"
      aria-hidden
    />
  );
}
