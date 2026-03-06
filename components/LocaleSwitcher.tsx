"use client";
// components/LocaleSwitcher.tsx
// Detects browser language on first visit, saves preference to localStorage

import { useState, useEffect } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "koverts-locale";

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  // Check saved preference first
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;
  // Detect from browser
  const browserLang = navigator.language?.toLowerCase() ?? "en";
  for (const locale of LOCALES) {
    const codes = LOCALE_META[locale].browserCodes;
    if (codes.some((c) => browserLang.startsWith(c))) return locale;
  }
  return "en";
}

export function saveLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
  }
}

interface Props {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function LocaleSwitcher({ currentLocale, onLocaleChange }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (locale: Locale) => {
    saveLocale(locale);
    onLocaleChange(locale);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e4e0da] text-xs font-mono text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all"
      >
        <span className="text-sm">🌐</span>
        {LOCALE_META[currentLocale].name}
        <span className="text-[10px] opacity-60">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-[#e4e0da] rounded-2xl shadow-lg overflow-hidden min-w-[160px]">
            {LOCALES.map((locale) => (
              <button
                key={locale}
                onClick={() => handleSelect(locale)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-[#edf4f0] transition-colors ${
                  locale === currentLocale ? "bg-[#f7f5f2] font-medium text-[#3d6b4f]" : "text-[#1a1814]"
                } ${LOCALE_META[locale].dir === "rtl" ? "flex-row-reverse text-right" : ""}`}
              >
                <span className="font-mono text-xs text-[#9a948a] w-6">{locale.toUpperCase()}</span>
                <span>{LOCALE_META[locale].name}</span>
                {locale === currentLocale && <span className="ml-auto text-[#3d6b4f] text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Hook for use in page components
export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setMounted(true);
  }, []);

  const changeLocale = (newLocale: Locale) => {
    saveLocale(newLocale);
    setLocale(newLocale);
    // Update html dir for RTL support
    document.documentElement.dir = LOCALE_META[newLocale].dir;
    document.documentElement.lang = newLocale;
  };

  return { locale, changeLocale, mounted };
}
