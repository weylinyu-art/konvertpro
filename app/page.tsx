"use client";
// app/page.tsx

import Link from "next/link";
import { CATEGORIES } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

// Same order as ConverterWidget tabs — by popularity
const CATEGORY_ORDER = [
  "length", "weight", "temperature", "volume", "cooking",
  "speed", "area", "time", "data", "shoe",
  "energy", "pressure", "power", "angle", "numbase",
];

export default function HomePage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        <SiteHeader />

        {/* Hero */}
        <section className="text-center py-14">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] animate-pulse" />
            {t.badge}
          </div>
          <h1 className="font-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.05] tracking-tight mb-4">
            {t.heroLine1} <em className="italic text-[#3d6b4f]">{t.heroEmphasis}</em>
            <br />{t.heroLine2}
          </h1>
          <p className="text-[#9a948a] font-light text-base max-w-sm mx-auto leading-relaxed">
            {t.heroSub}
          </p>
        </section>

        {/* Converter widget */}
        <ConverterWidget />

        {/* All categories grid */}
        <section className="mt-16 mb-20">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // {t.allConverters}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

            {/* Currency — first because it's highest traffic */}
            <Link href="/currency"
              className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">💱</span>
              <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                Currency
              </span>
              <p className="text-xs text-[#9a948a] mt-1">32 currencies · live</p>
            </Link>

            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <span className="text-2xl mb-3 block">{cat.icon}</span>
                <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                  {cat.label}
                </span>
                <p className="text-xs text-[#9a948a] mt-1">
                  {Object.keys(cat.units).length} {t.units}
                </p>
              </Link>
            ))}

            {/* AI Tools — last */}
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
            <Link href="/currency" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">Currency</Link>
            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
                {cat.label}
              </Link>
            ))}
            <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">{t.aiTools}</Link>
            <Link href="/about" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">About</Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
