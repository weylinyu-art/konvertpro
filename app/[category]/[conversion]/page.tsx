// app/[category]/[conversion]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES, convert, formatNumber, getSymbol,
  slugToUnit, unitToSlug, getAllConversionPaths,
} from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";

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
  const cat = CATEGORIES[params.category];
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
    title: `${fromLabel} to ${toLabel} Converter — Free & Instant`,
    description: `Convert ${fromLabel} to ${toLabel} instantly. 1 ${fromSym} = ${example} ${toSym}. Free online ${cat.label.toLowerCase()} converter, no signup needed.`,
    keywords: [
      `${fromLabel} to ${toLabel}`,
      `convert ${fromSym} to ${toSym}`,
      `${fromSym} to ${toSym} converter`,
      `${fromLabel} ${toLabel} conversion`,
      `how many ${toSym} in ${fromSym}`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${fromLabel} to ${toLabel} Converter`,
      description: `1 ${fromSym} = ${example} ${toSym}. Free instant converter.`,
      url: pageUrl, type: "website",
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

  const fromLabel = cat.units[from].label;
  const toLabel   = cat.units[to].label;
  const fromSym   = getSymbol(from, params.category);
  const toSym     = getSymbol(to,   params.category);
  const oneResult = convert(1, from, to, params.category);
  const pageUrl   = `${BASE_URL}/${params.category}/${params.conversion}`;

  const related = Object.keys(cat.units)
    .filter((u) => u !== from && u !== to)
    .slice(0, 4)
    .map((u) => ({ unit: u, label: cat.units[u].label, sym: getSymbol(u, params.category) }));

  // ── Structured Data ──────────────────────────────────────────

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",        "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": cat.label,     "item": `${BASE_URL}/${params.category}` },
      { "@type": "ListItem", "position": 3, "name": `${fromLabel} to ${toLabel}`, "item": pageUrl },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to convert ${fromLabel} to ${toLabel}`,
    "description": `Step-by-step guide to convert ${fromLabel} (${fromSym}) to ${toLabel} (${toSym}).`,
    "totalTime": "PT10S",
    "tool": [{ "@type": "HowToTool", "name": "Koverts unit converter" }],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter your value",
        "text": `Type the number of ${fromLabel} you want to convert in the input field.`,
        "url": pageUrl,
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select units",
        "text": `Make sure the "From" field is set to ${fromLabel} and the "To" field is set to ${toLabel}.`,
        "url": pageUrl,
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Read the result",
        "text": `The converted value appears instantly. For example, 1 ${fromSym} = ${formatNumber(oneResult)} ${toSym}.`,
        "url": pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How many ${toLabel} are in a ${fromLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `1 ${fromSym} equals ${formatNumber(oneResult)} ${toSym}. To convert ${fromLabel} to ${toLabel}, multiply your value by ${formatNumber(oneResult)}.`,
        },
      },
      {
        "@type": "Question",
        "name": `How do I convert ${fromLabel} to ${toLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To convert from ${fromLabel} to ${toLabel}, use the formula: ${toSym} = ${fromSym} × ${formatNumber(oneResult)}. For example, 10 ${fromSym} = ${formatNumber(convert(10, from, to, params.category))} ${toSym}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is ${formatNumber(convert(100, from, to, params.category))} ${toSym} in ${fromLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${formatNumber(convert(100, from, to, params.category))} ${toSym} is equal to 100 ${fromSym}.`,
        },
      },
    ],
  };

  return (
    <main className="relative z-10">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            <Link href={`/${params.category}`}
              className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors flex-shrink-0">
              {cat.label}
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[80px] md:max-w-[160px]">
              {fromSym} → {toSym}
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {cat.icon} {cat.label} Converter
          </div>
          <h1 className="font-sans font-bold text-[clamp(32px,5vw,56px)] tracking-tight leading-tight mb-3">
            {fromLabel} to {toLabel}
          </h1>
          <p className="text-[#9a948a] text-sm leading-relaxed max-w-lg">
            1 {fromSym} = <strong className="text-[#3d6b4f] font-semibold">{formatNumber(oneResult)} {toSym}</strong>
            &nbsp;· Free instant converter, no signup required.
          </p>
        </section>

        <ConverterWidget defaultCategory={params.category} defaultFrom={from} defaultTo={to} />

        {/* Reference table */}
        <section className="mt-14 mb-12">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // {fromLabel} to {toLabel} conversion table
          </p>
          <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{fromLabel} ({fromSym})</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{toLabel} ({toSym})</th>
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

        {/* How to convert */}
        <section className="mb-12 bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
          <h2 className="font-sans font-bold text-2xl mb-4">How to convert {fromLabel} to {toLabel}</h2>
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

        {/* FAQ */}
        <section className="mb-12">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // Frequently Asked Questions
          </p>
          <div className="space-y-2">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">{faq.name}</span>
                  <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related conversions */}
        <section className="mb-16">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // Related {cat.label.toLowerCase()} conversions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link key={r.unit}
                href={`/${params.category}/${unitToSlug(from)}-to-${unitToSlug(r.unit)}`}
                className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm text-center">
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
  );
}
