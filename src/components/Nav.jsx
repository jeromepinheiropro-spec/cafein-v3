import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { LeafMark, Wordmark, Magnetic } from "../lib/ui.jsx";
import { useEgg } from "./EasterEggs.jsx";

const LINKS = [
  { label: "Notre expertise", to: "/notre-expertise" },
  { label: "Création de site", to: "/creation-site-web" },
  { label: "SEO & GEO", to: "/seo-geo" },
  { label: "Communication", to: "/communication" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { toggleOverdrive, toggleDecaf } = useEgg();

  /* Eggs mobiles : 5 taps rapides sur le logo → surcaféiné ; appui long → décaféiné */
  const taps = useRef({ n: 0, t: 0 });
  const pressTimer = useRef(null);

  function onLogoClick(e) {
    const now = Date.now();
    taps.current = now - taps.current.t < 500 ? { n: taps.current.n + 1, t: now } : { n: 1, t: now };
    if (taps.current.n > 1) e.preventDefault(); /* on reste sur place pendant la série */
    if (taps.current.n >= 5) {
      taps.current = { n: 0, t: 0 };
      toggleOverdrive();
    }
  }
  function onLogoPressStart() {
    clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => toggleDecaf(), 1100);
  }
  function onLogoPressEnd() {
    clearTimeout(pressTimer.current);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed top-0 inset-x-0 z-[500] px-4 md:px-8 pt-4"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between rounded-2xl bg-cream/80 backdrop-blur-xl border-2 border-ink/10 px-4 md:px-6 py-3 shadow-[0_8px_30px_rgba(10,15,13,0.08)]">
          <Link
            to="/"
            className="flex items-center gap-2 select-none"
            style={{ WebkitTouchCallout: "none" }}
            data-cursor="Hello"
            aria-label="Cafein, accueil"
            onClick={onLogoClick}
            onTouchStart={onLogoPressStart}
            onTouchEnd={onLogoPressEnd}
            onTouchMove={onLogoPressEnd}
            onContextMenu={(e) => e.preventDefault()}
          >
            <motion.div whileHover={{ rotate: -14, scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}>
              <LeafMark className="h-6 w-auto" leaf2="#0A0F0D" />
            </motion.div>
            <Wordmark className="text-xl" />
          </Link>

          {/* Liens desktop */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `group relative px-4 py-2 font-body font-semibold text-sm transition-colors ${
                    isActive ? "text-mint-dark" : "text-ink/80 hover:text-ink"
                  }`
                }
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-[2.5px] rounded-full bg-mint origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href="/#contact"
                data-cursor="Go !"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-cream font-semibold text-sm px-5 py-2.5 border-2 border-ink hover:bg-mint hover:text-ink hover:border-mint transition-colors duration-300"
              >
                Un café ?
                <span className="inline-block w-2 h-2 rounded-full bg-mint group-hover:bg-ink" />
              </a>
            </Magnetic>

            {/* Burger mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-11 h-11 rounded-full border-2 border-ink/15 flex flex-col items-center justify-center gap-[5px]"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} className="block w-5 h-[2.5px] rounded bg-ink" />
              <motion.span animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="block w-5 h-[2.5px] rounded bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[400] bg-espresso flex flex-col justify-center px-8"
          >
            {[...LINKS, { label: "Contact", to: "/#contact" }].map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.07 } }}
                exit={{ opacity: 0 }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display font-extrabold text-4xl text-cream py-3 flex items-center gap-4 group"
                >
                  <span className="font-mono text-sm text-mint">0{i + 1}</span>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-8 font-mono text-xs tracking-[0.3em] text-cream/40 uppercase"
            >
              Luxembourg · FR / EN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
