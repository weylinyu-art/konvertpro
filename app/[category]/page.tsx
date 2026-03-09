// app/[category]/page.tsx
"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol, unitToSlug } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES[params.category];
  if (!cat) notFound();

  const { locale } = useLocale();
  const t = getTranslations(locale);
  const unitKeys = Object.keys(cat.units);

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        <SiteHeader crumbs={[{ label: cat.label }]} />

        {/* Hero */}
        <section className="py-12 text-center">
          <div className="text-4xl mb-4">{cat.icon}</div>
          <h1 className="font-sans font-bold text-[clamp(36px,6vw,60px)] tracking-tight mb-3">
            {cat.title}
          </h1>
          <p className="text-[#9a948a] max-w-md mx-auto text-sm leading-relaxed">
            {cat.description}
          </p>
        </section>

        <ConverterWidget defaultCategory={params.category} />

        {/* Popular conversions */}
        <section className="mt-14 mb-8">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // Popular {cat.label.toLowerCase()} conversions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cat.popular.map((p) => {
              const result = convert(p.val, p.from, p.to, params.category);
              const fromSymbol = getSymbol(p.from, params.category);
              const toSymbol   = getSymbol(p.to, params.category);
              return (
                <Link
                  key={`${p.from}-${p.to}`}
                  href={`/${params.category}/${unitToSlug(p.from)}-to-${unitToSlug(p.to)}`}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm"
                >
                  <p className="font-mono text-sm text-[#1a1814]">{p.val} {fromSymbol} →</p>
                  <p className="text-xs text-[#9a948a] mt-0.5 group-hover:text-[#3d6b4f] transition-colors">
                    {formatNumber(result)} {toSymbol}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All conversions table */}
        <section className="mb-16">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // All {cat.label.toLowerCase()} conversions
          </p>
          <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                  <th className="text-left px-5 py-3 font-mono text-xs text-[#9a948a] tracking-wider">FROM</th>
                  <th className="text-left px-5 py-3 font-mono text-xs text-[#9a948a] tracking-wider">TO</th>
                  <th className="text-right px-5 py-3 font-mono text-xs text-[#9a948a] tracking-wider">LINK</th>
                </tr>
              </thead>
              <tbody>
                {unitKeys.flatMap((from) =>
                  unitKeys.filter((to) => to !== from).slice(0, 3).map((to) => (
                    <tr key={`${from}-${to}`} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                      <td className="px-5 py-3 text-[#1a1814]">{cat.units[from].label}</td>
                      <td className="px-5 py-3 text-[#9a948a]">{cat.units[to].label}</td>
                      <td className="px-5 py-3 text-right">
                        <Link href={`/${params.category}/${unitToSlug(from)}-to-${unitToSlug(to)}`}
                          className="text-[#3d6b4f] font-mono text-xs hover:underline">
                          Convert →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← {t.allConverters}</Link>
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
        </footer>
      </div>
    </main>
  );
}
