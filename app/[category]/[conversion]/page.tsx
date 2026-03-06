// app/[category]/[conversion]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES, convert, formatNumber, getSymbol,
  slugToUnit, unitToSlug, getAllConversionPaths,
} from "@/lib/units";
import { getConversionContent } from "@/lib/seo-content";
import ConverterWidget from "@/components/ConverterWidget";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://koverts.com";

interface Props {
  params: { category: string; conversion: string };
}

function parseConversion(conversion: string) {
  const idx = conversion.lastIndexOf("-to-");
  if (idx === -1) return null;
  return {
    from: slugToUnit(conversion.slice(0, idx)),
    to:   slugToUnit(conversion.slice(idx + 4)),
  };
}

export async function generateStaticParams() {
  return getAllConversionPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat    = CATEGORIES[params.category];
  const parsed = parseConversion(params.conversion);
  if (!cat || !parsed) return {};
  const { from, to } = parsed;
  if (!cat.units[from] || !cat.units[to]) return {};

  const fromLabel = cat.units[from].label;
  const toLabel   = cat.units[to].label;
  const fromSym   = getSymbol(from, params.category);
  const toSym     = getSymbol(to,   params.category);
  const example   = formatNumber(convert(1, from, to, params.category));
  const pageUrl   = `${BASE_URL}/${params.category}/${params.conversion}`;

  return {
    title: `${fromLabel} to ${toLabel} Converter`,
    description: `Convert ${fromLabel} to ${toLabel} instantly. 1 ${fromSym} = ${example} ${toSym}. Free online converter, no signup needed.`,
    keywords: [
      `${fromLabel} to ${toLabel}`,
      `convert ${fromSym} to ${toSym}`,
      `${fromSym} ${toSym} converter`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${fromLabel} to ${toLabel} Converter`,
      description: `1 ${fromSym} = ${example} ${toSym}. Free instant converter.`,
      url: pageUrl,
      type: "website",
    },
  };
}

const REFERENCE_VALUES = [1, 2, 5, 10, 20, 25, 50, 100, 250, 500, 1000];

export default function ConversionPage({ params }: Props) {
  const cat    = CATEGORIES[params.category];
  const parsed = parseConversion(params.conversion);
  if (!cat || !parsed) notFound();

  const { from, to } = parsed;
  if (!cat.units[from] || !cat.units[to]) notFound();

  const fromLabel  = cat.units[from].label;
  const toLabel    = cat.units[to].label;
  const fromSym    = getSymbol(from, params.category);
  const toSym      = getSymbol(to,   params.category);
  const oneResult  = convert(1, from, to, params.category);
  const seoContent = getConversionContent(params.category, from, to);
  const pageUrl    = `${BASE_URL}/${params.category}/${params.conversion}`;

  // ── Structured data ──
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",        "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": cat.label,     "item": `${BASE_URL}/${params.category}` },
      { "@type": "ListItem", "position": 3, "name": `${fromSym} to ${toSym}`, "item": pageUrl },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to convert ${fromLabel} to ${toLabel}`,
    "description": `Step-by-step guide to convert ${fromLabel} (${fromSym}) to ${toLabel} (${toSym})`,
    "step": [
      { "@type": "HowToStep", "position": 1, "text": `Enter the value in ${fromLabel} you want to convert.` },
      { "@type": "HowToStep", "position": 2, "text": `Multiply by ${formatNumber(oneResult)} to get the result in ${toLabel}.` },
      { "@type": "HowToStep", "position": 3, "text": `The result is displayed instantly in ${toSym}.` },
    ],
    "url": pageUrl,
  };

  const related = Object.keys(cat.units)
    .filter((u) => u !== from && u !== to)
    .slice(0, 4)
    .map((u) => ({ unit: u, label: cat.units[u].label, sym: getSymbol(u, params.category) }));

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />

      <main className="relative z-10">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <header className="flex items-center justify-between pt-8">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-serif text-[28px] tracking-tight">Konvert</span>
              <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
            </Link>
            <nav className="font-mono text-xs text-[#9a948a] flex gap-2">
              <Link href={`/${params.category}`} className="hover:text-[#3d6b4f]">{cat.label}</Link>
              <span>/</span>
              <span>{fromSym} → {toSym}</span>
            </nav>
          </header>

          {/* Hero */}
          <section className="py-12">
            <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
              {cat.icon} {cat.label} Converter
            </div>
            <h1 className="font-serif text-[clamp(32px,5vw,56px)] tracking-tight leading-tight mb-3">
              {fromLabel} to {toLabel}
            </h1>
            <p className="text-[#9a948a] text-sm leading-relaxed max-w-lg">
              1 {fromSym} = <strong className="text-[#3d6b4f] font-semibold">{formatNumber(oneResult)} {toSym}</strong>
              &nbsp;· Free instant converter, no signup required.
            </p>
          </section>

          {/* Converter widget */}
          <ConverterWidget
            defaultCategory={params.category}
            defaultFrom={from}
            defaultTo={to}
          />

          {/* SEO Content Block */}
          {seoContent && (
            <section className="mt-14 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
                  <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
                    What is a {fromLabel.split(" ")[0]}?
                  </p>
                  <p className="text-sm text-[#4a4540] leading-relaxed">{seoContent.fromDesc}</p>
                </div>
                <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
                  <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
                    What is a {toLabel.split(" ")[0]}?
                  </p>
                  <p className="text-sm text-[#4a4540] leading-relaxed">{seoContent.toDesc}</p>
                </div>
              </div>

              <div className="bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl p-6 flex gap-4">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <p className="font-mono text-[11px] text-[#3d6b4f] tracking-[0.1em] uppercase mb-2">Quick Tip</p>
                  <p className="text-sm text-[#2a4a35] leading-relaxed">{seoContent.quickTip}</p>
                </div>
              </div>

              <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
                <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">Common Uses</p>
                <ul className="space-y-2">
                  {seoContent.uses.map((use, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#4a4540]">
                      <span className="text-[#3d6b4f] mt-0.5 flex-shrink-0">→</span>
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              {seoContent.funFact && (
                <div className="bg-[#faf8f4] border border-[#e4e0da] rounded-2xl p-6 flex gap-4">
                  <span className="text-2xl flex-shrink-0">🌍</span>
                  <div>
                    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2">Did You Know?</p>
                    <p className="text-sm text-[#4a4540] leading-relaxed">{seoContent.funFact}</p>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* How to convert */}
          <section className="mt-6 mb-8 bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl mb-4">How to convert {fromLabel} to {toLabel}</h2>
            <p className="text-[#9a948a] text-sm leading-relaxed mb-4">
              To convert from {fromLabel} ({fromSym}) to {toLabel} ({toSym}), multiply your value by{" "}
              <strong className="text-[#1a1814]">{formatNumber(oneResult)}</strong>.
            </p>
            <div className="bg-[#f7f5f2] rounded-xl px-6 py-4 font-mono text-sm text-[#3d6b4f]">
              {toSym} = {fromSym} × {formatNumber(oneResult)}
            </div>
            <p className="text-[#9a948a] text-sm leading-relaxed mt-4">
              For example, 10 {fromSym} = {formatNumber(convert(10, from, to, params.category))} {toSym}.
            </p>
          </section>

          {/* Reference table */}
          <section className="mb-12">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
              // {fromLabel} to {toLabel} conversion table
            </p>
            <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                    <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{fromLabel}</th>
                    <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{toLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_VALUES.map((v) => (
                    <tr key={v} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                      <td className="px-6 py-3 font-mono text-[#1a1814]">{v} {fromSym}</td>
                      <td className="px-6 py-3 font-mono text-[#3d6b4f] font-medium">
                        {formatNumber(convert(v, from, to, params.category))} {toSym}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Related conversions */}
          <section className="mb-16">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
              // Related {cat.label.toLowerCase()} conversions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map((r) => (
                <Link
                  key={r.unit}
                  href={`/${params.category}/${unitToSlug(from)}-to-${unitToSlug(r.unit)}`}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm text-center"
                >
                  <p className="font-mono text-xs text-[#9a948a] group-hover:text-[#3d6b4f]">
                    {fromSym} → {r.sym}
                  </p>
                  <p className="text-xs text-[#1a1814] mt-1 truncate">{r.label}</p>
                </Link>
              ))}
            </div>
          </section>

          <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
            <Link href={`/${params.category}`} className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">
              ← {cat.label} converters
            </Link>
            <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
          </footer>

        </div>
      </main>
    </>
  );
}
