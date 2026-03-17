"use client";
// components/LocaleProvider.tsx
// Global locale context — wraps entire app so all components share same locale state

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale, LOCALES, LOCALE_META } from "@/lib/i18n";

const STORAGE_KEY = "koverts-locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const maybePathLocale = (pathParts[0] === "l" ? pathParts[1] : pathParts[0]) as Locale | undefined;
  if (maybePathLocale && LOCALES.includes(maybePathLocale)) return maybePathLocale;
  const queryLocale = new URLSearchParams(window.location.search).get("lang") as Locale | null;
  if (queryLocale && LOCALES.includes(queryLocale)) return queryLocale;
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;
  const lang = navigator.language?.toLowerCase() ?? "en";
  for (const locale of LOCALES) {
    if (LOCALE_META[locale].browserCodes.some((c) => lang.startsWith(c))) return locale;
  }
  return "en";
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  mounted: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  mounted: false,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale,  setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    const l = detectLocale();
    setLocaleState(l);
    document.documentElement.lang = l === "zh" ? "zh-Hans" : LOCALE_META[l].browserCodes[0];
    document.documentElement.dir = LOCALE_META[l].dir;
    document.documentElement.setAttribute("data-locale", l);
    setMounted(true);
  }, []);

  const setLocale = (l: Locale) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLocaleState(l);
    document.documentElement.dir = LOCALE_META[l].dir;
    document.documentElement.lang = l === "zh" ? "zh-Hans" : LOCALE_META[l].browserCodes[0];
    document.documentElement.setAttribute("data-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, mounted }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
