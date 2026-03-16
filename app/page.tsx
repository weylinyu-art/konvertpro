"use client";
// app/page.tsx

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel } from "@/lib/i18n";
import LocaleSwitcher from "@/components/LocaleSwitcher";

// Ordered by global search volume (2025-2026)
const CATEGORY_ORDER = [
  "length", "weight", "temperature", "volume", "speed",
  "area", "time", "data", "cooking", "energy",
  "pressure", "power", "fuel", "angle", "shoe", "numbase",
];

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const [mobileAllExpanded, setMobileAllExpanded] = useState(false);

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814]">
              Koverts
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
          </div>
          {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
        </header>

        {/* Hero */}
        <section className="text-center py-14">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] animate-pulse" />
            {t.heroBadge}
          </div>
          <h1 className="font-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.05] tracking-tight mb-4">
            {t.heroTitle} <em className="italic text-[#3d6b4f]">{t.heroTitleEm}</em>
            <br />{t.heroTitleSuffix}
          </h1>
          <p className="text-[#9a948a] font-light text-base max-w-sm mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </section>

        <ConverterWidget />

        {/* All categories grid */}
        <section className="mt-16 mb-20">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // {t.allConverters}
          </p>

          {/* Mobile: collapsed by default */}
          <div className="md:hidden mb-4 flex justify-center">
            <button
              onClick={() => setMobileAllExpanded((v) => !v)}
              className="px-4 py-2 rounded-full text-xs font-medium border border-[#e4e0da] bg-[#f8f6f2] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all"
            >
              {mobileAllExpanded ? t.showLess : t.moreCategories}
            </button>
          </div>

          <div className={`${mobileAllExpanded ? "grid" : "hidden"} md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3`}>

            {/* Currency - highest traffic */}
            <Link href="/currency"
              className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">💱</span>
              <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                {t.currency}
              </span>
              <p className="text-xs text-[#9a948a] mt-1">49 {t.units} · live</p>
            </Link>

            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <span className="text-2xl mb-3 block">{cat.icon}</span>
                <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                  {getCategoryLabel(cat.slug, t)}
                </span>
                <p className="text-xs text-[#9a948a] mt-1">{Object.keys(cat.units).length} {t.units}</p>
              </Link>
            ))}

            {/* AI Tools */}
            <Link href="/ai"
              className="group bg-[#edf4f0] border border-[#3d6b4f]/30 rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#3d6b4f] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">🤖</span>
              <span className="font-semibold text-sm text-[#3d6b4f] group-hover:text-white transition-colors block">
                {t.aiTools}
              </span>
              <p className="text-xs text-[#3d6b4f]/60 group-hover:text-white/70 mt-1">5 tools</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
          <div className="flex gap-4 flex-wrap">
            <Link href="/currency" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {t.currency}
            </Link>
            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
                {getCategoryLabel(cat.slug, t)}
              </Link>
            ))}
            <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {t.aiTools}
            </Link>
            <Link href="/about" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              About
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
