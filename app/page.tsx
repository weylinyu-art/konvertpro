"use client";
// app/page.tsx — with i18n support
import Link from "next/link";
import { CATEGORIES } from "@/lib/units";
import { getTranslations, getCategoryLabel, LOCALE_META } from "@/lib/i18n";
import ConverterWidget from "@/components/ConverterWidget";
import LocaleSwitcher, { useLocale } from "@/components/LocaleSwitcher";

export default function HomePage() {
  const { locale, changeLocale, mounted } = useLocale();
  const t   = getTranslations(locale);
  const dir = LOCALE_META[locale].dir;

  return (
    <main className="relative z-10" dir={dir}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-8 pb-0">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[28px] tracking-tight text-[#1a1814]">Koverts</span>
            <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#9a948a] tracking-widest hidden md:block">
              // instant conversions
            </span>
            {mounted && (
              <LocaleSwitcher currentLocale={locale} onLocaleChange={changeLocale} />
            )}
          </div>
        </header>

        {/* Hero */}
        <section className="text-center py-14">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] animate-pulse" />
            {t.heroBadge}
          </div>
          <h1 className="font-serif text-[clamp(40px,7vw,72px)] leading-[1.05] tracking-[-2px] mb-4">
            {t.heroTitle} <em className="italic text-[#3d6b4f]">{t.heroTitleEm}</em>
            <br />{t.heroTitleSuffix}
          </h1>
          <p className="text-[#9a948a] font-light text-base max-w-sm mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </section>

        {/* Converter */}
        <ConverterWidget locale={locale} />

        {/* Categories grid */}
        <section className="mt-16 mb-20">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // {t.allConverters}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

            <Link href="/ai"
              className="group col-span-2 md:col-span-3 lg:col-span-4 bg-[#edf4f0] border border-[#3d6b4f]/30 rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#e0ede6] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <span className="font-semibold text-sm text-[#3d6b4f]">{t.aiTools}</span>
                    <p className="text-xs text-[#6a8a72] mt-0.5">
                      Token calculator · Model size · API cost · Context window
                    </p>
                  </div>
                </div>
                <span className="font-mono text-sm text-[#3d6b4f] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {Object.values(CATEGORIES).map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-2xl mb-3 block">{cat.icon}</span>
                <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
                  {getCategoryLabel(cat.slug, t)}
                </span>
                <p className="text-xs text-[#9a948a] mt-1">
                  {Object.keys(cat.units).length} {t.units}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
          <div className="flex gap-5 flex-wrap">
            <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">{t.aiTools}</Link>
            {Object.values(CATEGORIES).map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">
                {getCategoryLabel(cat.slug, t)}
              </Link>
            ))}
          </div>
        </footer>

      </div>
    </main>
  );
}
