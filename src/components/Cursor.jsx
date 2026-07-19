import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/*
  Curseur custom :
  - petit point vert qui suit la souris exactement
  - anneau qui suit avec un ressort (lag doux)
  - grossit sur les éléments interactifs
  - affiche un label sur les éléments [data-cursor="..."]
*/
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const t = e.target.closest("[data-cursor]");
      const interactive = e.target.closest("a, button, [role='button'], input, textarea, [data-hover]");
      setLabel(t ? t.getAttribute("data-cursor") : null);
      setHovering(!!interactive || !!t);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mx, my]);

  if (!enabled) return null;

  const ringSize = label ? 84 : hovering ? 56 : 36;

  return (
    <>
      {/* Point central */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{ x: mx, y: my }}
      >
        <motion.div
          animate={{ scale: pressed ? 0.6 : 1 }}
          className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-mint"
        />
      </motion.div>

      {/* Anneau / bulle */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            scale: pressed ? 0.85 : 1,
            backgroundColor: label ? "#1FCE8A" : "rgba(31,206,138,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex items-center justify-center rounded-full border-2 border-mint -translate-x-1/2 -translate-y-1/2"
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="font-mono text-[10px] font-bold tracking-widest text-espresso uppercase text-center leading-tight px-1"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
