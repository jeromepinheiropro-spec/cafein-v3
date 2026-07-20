import React, { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
  Langue du site : FR (défaut) / EN, pilotée par l'URL pour un vrai SEO.
  - FR  → URLs racine :      /            /seo-geo       /realisations/x
  - EN  → URLs préfixées :   /en          /en/seo-geo    /en/realisations/x
  La langue se DÉDUIT du chemin ; le toggle NAVIGUE vers la version miroir.
  API inchangée pour les composants :
    useLang() → { lang, setLang }
    useT()    → t("texte fr", "english text")  (retombe sur le FR si l'EN manque)
    useLocalize() → fn(path) qui préfixe /en quand on est en anglais
*/

const LangCtx = createContext({ lang: "fr", setLang: () => {}, localize: (p) => p });

/* /en, /en/... → EN ; tout le reste → FR */
export function langFromPath(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/* Retire le préfixe /en pour obtenir le chemin « neutre » (version FR) */
export function stripLang(pathname) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

/* Préfixe un chemin interne avec /en quand la langue est l'anglais.
   Laisse intacts : ancres pures (#...), liens externes, mailto, tel. */
export function localize(path, lang) {
  if (lang !== "en" || typeof path !== "string") return path;
  if (!path.startsWith("/")) return path; // #ancre, http(s), mailto:, tel:
  if (path === "/en" || path.startsWith("/en/")) return path; // déjà préfixé
  if (path.startsWith("/#")) return "/en" + path.slice(1); // "/#contact" → "/en#contact"
  if (path === "/") return "/en";
  return "/en" + path;
}

export function LangProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(location.pathname);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    if (next !== "fr" && next !== "en") return;
    const base = stripLang(location.pathname); // chemin FR neutre
    let target;
    if (next === "en") target = base === "/" ? "/en" : "/en" + base;
    else target = base;
    navigate(target + location.search + location.hash);
    try {
      localStorage.setItem("cafein-lang", next);
    } catch {
      /* mode privé */
    }
  };

  const value = { lang, setLang, localize: (p) => localize(p, lang) };
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
export const useLocalize = () => useContext(LangCtx).localize;

export function useT() {
  const { lang } = useLang();
  return (fr, en) => (lang === "en" && en !== undefined ? en : fr);
}
