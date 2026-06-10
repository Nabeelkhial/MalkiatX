"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Dict } from "@/lib/content/en";
import { ur } from "@/lib/content/ur";

export type Lang = "en" | "ur";

const dicts: Record<Lang, Dict> = { en, ur };

interface LangContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<LangContext>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("mx-lang");
    if (saved === "ur" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("mx-lang", l);
    } catch {
      // private mode — keep in-memory only
    }
  };

  return <Ctx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
