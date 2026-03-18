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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#e4e0da] bg-white/70 text-[11px] text-[#7a746b] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-colors"
      >
        <span>{LOCALE_META[currentLocale].name}</span>
        <span className="text-[9px] text-[#c0b8ae]">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-[#e8e4df] rounded-lg overflow-hidden min-w-[120px] shadow-sm">
            {LOCALES.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => {
                  onLocaleChange(locale);
                  setOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 text-[11px] text-left hover:bg-[#f7f5f2] transition-colors ${
                  locale === currentLocale ? "text-[#3d6b4f] font-medium bg-[#f7f5f2]" : "text-[#3a352f]"
                } ${LOCALE_META[locale].dir === "rtl" ? "flex-row-reverse text-right" : ""}`}
              >
                <span className="truncate">{LOCALE_META[locale].name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
