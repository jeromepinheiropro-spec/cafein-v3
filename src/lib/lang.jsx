import React, { createContext, useContext, useEffect, useState } from "react";

/*
  Langue du site : FR (défaut) / EN.
  - Persistée dans localStorage ("cafein-lang")
  - useLang() → { lang, setLang }
  - useT() → t("texte fr", "english text")  (retombe sur le FR si l'EN manque)
*/

const LangCtx = createContext({ lang: "fr", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("cafein-lang");
      if (saved === "fr" || saved === "en") return saved;
    } catch {
      /* privé / SSR */
    }
    return "fr";
  });

  useEffect(() => {
    try {
      localStorage.setItem("cafein-lang", lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

export function useT() {
  const { lang } = useLang();
  return (fr, en) => (lang === "en" && en !== undefined ? en : fr);
}
