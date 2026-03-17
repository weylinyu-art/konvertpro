"use client";
// components/LocaleSwitcher.tsx
import { useState } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
export { useLocale } from "@/components/LocaleProvider";

interface Props {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function LocaleSwitcher({ currentLocale, onLocaleChange }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e8e4df] bg-white/80 text-xs text-[#6a6460] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-colors">
        <span className="text-[11px] opacity-70">{open ? "▲" : "▼"}</span>
        {LOCALE_META[currentLocale].name}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-[#e8e4df] rounded-lg overflow-hidden min-w-[140px]">
            {LOCALES.map((locale) => (
              <button key={locale} onClick={() => { onLocaleChange(locale); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-[#f7f5f2] transition-colors ${
                  locale === currentLocale ? "text-[#3d6b4f] font-medium" : "text-[#1a1814]"
                } ${LOCALE_META[locale].dir === "rtl" ? "flex-row-reverse text-right" : ""}`}>
                <span className="font-mono text-[10px] text-[#9a948a] w-5">{locale.toUpperCase()}</span>
                <span>{LOCALE_META[locale].name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
