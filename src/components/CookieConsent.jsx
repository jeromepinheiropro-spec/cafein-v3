import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { useT } from "../lib/lang.jsx";

/*
  Bandeau de consentement cookies (RGPD). Google Analytics (mesure d'audience)
  n'est chargé QUE si le visiteur accepte. Le choix est mémorisé localement.
  On peut le rouvrir via l'événement "cafein-open-consent" (lien dans la
  politique de cookies).
*/

const GA_ID = "G-2L0MMZ5EGC";
const KEY = "cafein-consent";

function loadGA() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export default function CookieConsent() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let choice = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {
      /* stockage indisponible */
    }
    if (choice === "granted") loadGA();
    else if (choice !== "denied") setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener("cafein-open-consent", reopen);
    return () => window.removeEventListener("cafein-open-consent", reopen);
  }, []);

  function choose(granted) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    if (granted) loadGA();
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[9300] md:max-w-sm rounded-2xl bg-white border-[3px] border-ink p-5 shadow-[8px_8px_0_#0A0F0D]"
        >
          <p className="font-display font-extrabold text-ink text-base">{t("Un cookie avec le café ?", "A cookie with your coffee?")}</p>
          <p className="mt-2 text-sm text-ink/70 font-medium leading-snug">
            {t(
              "On aimerait mesurer l'audience du site (Google Analytics) pour l'améliorer. Ces cookies ne se déclenchent qu'avec votre accord.",
              "We'd like to measure site traffic (Google Analytics) to improve it. These cookies only run with your consent.",
            )}{" "}
            <Link to="/politique-cookies" className="text-mint-dark font-semibold hover:underline">
              {t("En savoir plus", "Learn more")}
            </Link>
          </p>
          <div className="mt-4 flex gap-2.5">
            <button
              onClick={() => choose(true)}
              className="flex-1 rounded-full bg-mint text-ink font-display font-bold text-sm px-4 py-2.5 border-2 border-ink shadow-[3px_3px_0_#0A0F0D] hover:shadow-[1px_1px_0_#0A0F0D] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {t("Accepter", "Accept")}
            </button>
            <button
              onClick={() => choose(false)}
              className="flex-1 rounded-full bg-white text-ink font-display font-bold text-sm px-4 py-2.5 border-2 border-ink hover:bg-cream-2 transition-colors"
            >
              {t("Refuser", "Decline")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
