// app/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol, unitToSlug } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.category];
  if (!cat) return {};
  return { title: cat.title, description: cat.description };
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES[params.category];
  if (!cat) notFound();

  const unitKeys = Object.keys(cat.units);

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
              <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
                Koverts
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[120px] md:max-w-[200px]">
              {cat.label}
            </span>
          </div>
        </header>

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
                <Link key={`${p.from}-${p.to}`}
                  href={`/${params.category}/${unitToSlug(p.from)}-to-${unitToSlug(p.to)}`}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm">
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
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← All converters</Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
        </footer>
      </div>
    </main>
  );
}
