// app/compare/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol, slugToUnit, unitToSlug } from "@/lib/units";
import { FAQHeading, MoreComparisonsHeading, FullConverterLink } from "@/components/PageLabels";

const BASE_URL = "https://koverts.com";

// Curated high-search-volume compare pairs
const COMPARE_PAIRS: {
  slug: string; category: string;
  a: string; b: string;
  title: string; description: string;
}[] = [
  // Temperature
  { slug: "celsius-vs-fahrenheit", category: "temperature", a: "celsius", b: "fahrenheit",
    title: "Celsius vs Fahrenheit", description: "The two most common temperature scales explained and compared." },
  { slug: "celsius-vs-kelvin",     category: "temperature", a: "celsius", b: "kelvin",
    title: "Celsius vs Kelvin",     description: "How Celsius and Kelvin relate and when to use each." },
  // Weight
  { slug: "kg-vs-lbs",    category: "weight", a: "kilogram", b: "pound",
    title: "Kilograms vs Pounds",   description: "Metric vs imperial weight units compared." },
  { slug: "oz-vs-grams",  category: "weight", a: "ounce",    b: "gram",
    title: "Ounces vs Grams",       description: "Ounces and grams side by side for cooking and more." },
  // Length
  { slug: "miles-vs-kilometers",   category: "length", a: "mile",       b: "kilometer",
    title: "Miles vs Kilometers",   description: "Miles and kilometers compared with conversion reference." },
  { slug: "feet-vs-meters",        category: "length", a: "foot",       b: "meter",
    title: "Feet vs Meters",        description: "Imperial feet vs metric meters explained." },
  { slug: "inches-vs-centimeters", category: "length", a: "inch",       b: "centimeter",
    title: "Inches vs Centimeters", description: "Inches and centimeters compared for everyday use." },
  // Volume
  { slug: "cups-vs-ml",       category: "volume", a: "cup",    b: "milliliter",
    title: "Cups vs Milliliters",   description: "US cups vs milliliters for cooking and baking." },
  { slug: "gallons-vs-liters", category: "volume", a: "gallon_us", b: "liter",
    title: "Gallons vs Liters",     description: "Gallons and liters compared for fuel and liquids." },
  // Speed
  { slug: "mph-vs-kmh", category: "speed", a: "mph", b: "kph",
    title: "MPH vs KM/H",           description: "Miles per hour vs kilometers per hour — full comparison." },
  // Area
  { slug: "acres-vs-hectares", category: "area", a: "acre", b: "hectare",
    title: "Acres vs Hectares",     description: "Acres and hectares compared for land measurement." },
  // Data
  { slug: "mb-vs-gb",  category: "data", a: "megabyte",  b: "gigabyte",
    title: "MB vs GB",              description: "Megabytes vs gigabytes — storage size explained." },
  { slug: "gb-vs-tb",  category: "data", a: "gigabyte",  b: "terabyte",
    title: "GB vs TB",              description: "Gigabytes vs terabytes — when do you need more storage?" },
];

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return COMPARE_PAIRS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pair = COMPARE_PAIRS.find((p) => p.slug === params.slug);
  if (!pair) return {};
  const pageUrl = `${BASE_URL}/compare/${pair.slug}`;
  const cat = CATEGORIES[pair.category];
  const aSym = getSymbol(pair.a, pair.category);
  const bSym = getSymbol(pair.b, pair.category);
  return {
    title: `${pair.title} — Difference & Conversion | Koverts`,
    description: `${pair.description} Complete conversion table, formula, and examples. Free online converter.`,
    keywords: [
      pair.title.toLowerCase(),
      `${pair.a} vs ${pair.b}`,
      `${aSym} vs ${bSym}`,
      `difference between ${pair.a} and ${pair.b}`,
      `${pair.a} to ${pair.b} conversion`,
      `${pair.b} to ${pair.a} conversion`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${pair.title} — Full Comparison & Converter`,
      description: pair.description,
      url: pageUrl, type: "website",
    },
  };
}

const COMPARE_VALUES = [1, 5, 10, 20, 25, 50, 100, 200, 500, 1000];

export default function ComparePage({ params }: Props) {
  const pair = COMPARE_PAIRS.find((p) => p.slug === params.slug);
  if (!pair) notFound();

  const cat  = CATEGORIES[pair.category];
  if (!cat || !cat.units[pair.a] || !cat.units[pair.b]) notFound();

  const aLabel = cat.units[pair.a].label;
  const bLabel = cat.units[pair.b].label;
  const aSym   = getSymbol(pair.a, pair.category);
  const bSym   = getSymbol(pair.b, pair.category);
  const aToB   = convert(1, pair.a, pair.b, pair.category);
  const bToA   = convert(1, pair.b, pair.a, pair.category);
  const pageUrl = `${BASE_URL}/compare/${pair.slug}`;

  // ── Structured Data ──────────────────────────────────────────

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Compare", "item": `${BASE_URL}/compare` },
      { "@type": "ListItem", "position": 3, "name": pair.title, "item": pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the difference between ${aLabel} and ${bLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${aLabel} (${aSym}) and ${bLabel} (${bSym}) are both units of ${cat.label.toLowerCase()}. 1 ${aSym} = ${formatNumber(aToB)} ${bSym}, and 1 ${bSym} = ${formatNumber(bToA)} ${aSym}.`,
        },
      },
      {
        "@type": "Question",
        "name": `How do you convert ${aLabel} to ${bLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To convert ${aLabel} to ${bLabel}, multiply by ${formatNumber(aToB)}. Formula: ${bSym} = ${aSym} × ${formatNumber(aToB)}.`,
        },
      },
      {
        "@type": "Question",
        "name": `How do you convert ${bLabel} to ${aLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To convert ${bLabel} to ${aLabel}, multiply by ${formatNumber(bToA)}. Formula: ${aSym} = ${bSym} × ${formatNumber(bToA)}.`,
        },
      },
    ],
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${aLabel} vs ${bLabel} Conversion Table`,
    "description": `Side-by-side comparison of ${aLabel} and ${bLabel} values.`,
    "url": pageUrl,
    "creator": { "@type": "Organization", "name": "Koverts", "url": BASE_URL },
  };

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center pt-6 md:pt-8">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
              <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">Koverts</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f]">Compare</span>
          </div>
        </header>

        {/* Hero */}
        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {cat.icon} {cat.label} · Comparison
          </div>
          <h1 className="font-sans font-bold text-[clamp(32px,5vw,56px)] tracking-tight leading-tight mb-3">
            {pair.title}
          </h1>
          <p className="text-[#9a948a] text-sm leading-relaxed max-w-lg">{pair.description}</p>
        </section>

        {/* Quick answer cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-3">1 {aSym} equals</p>
            <p className="font-sans font-bold text-3xl text-[#3d6b4f] mb-1">{formatNumber(aToB)} <span className="text-xl">{bSym}</span></p>
            <p className="text-xs text-[#9a948a]">{aLabel} → {bLabel}</p>
<FullConverterLink href={`/${pair.category}/${unitToSlug(pair.a)}-to-${unitToSlug(pair.b)}`} />
          </div>
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-3">1 {bSym} equals</p>
            <p className="font-sans font-bold text-3xl text-[#3d6b4f] mb-1">{formatNumber(bToA)} <span className="text-xl">{aSym}</span></p>
            <p className="text-xs text-[#9a948a]">{bLabel} → {aLabel}</p>
<FullConverterLink href={`/${pair.category}/${unitToSlug(pair.b)}-to-${unitToSlug(pair.a)}`} />
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-12">
<p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">// Side-by-side</p>
          <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{aLabel} ({aSym})</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{bLabel} ({bSym})</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{aLabel} ({aSym}) ←</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_VALUES.map((v) => (
                  <tr key={v} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                    <td className="px-6 py-3 font-mono text-[#1a1814]">{v} {aSym}</td>
                    <td className="px-6 py-3 font-mono text-[#3d6b4f] font-medium">
                      {formatNumber(convert(v, pair.a, pair.b, pair.category))} {bSym}
                    </td>
                    <td className="px-6 py-3 font-mono text-[#9a948a] text-xs">
                      {v} {bSym} = {formatNumber(convert(v, pair.b, pair.a, pair.category))} {aSym}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Formulas */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <h2 className="font-sans font-semibold text-base mb-3">{aLabel} to {bLabel} formula</h2>
            <div className="bg-[#f7f5f2] rounded-xl px-5 py-3 font-mono text-sm text-[#3d6b4f]">
              {bSym} = {aSym} × {formatNumber(aToB)}
            </div>
          </div>
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <h2 className="font-sans font-semibold text-base mb-3">{bLabel} to {aLabel} formula</h2>
            <div className="bg-[#f7f5f2] rounded-xl px-5 py-3 font-mono text-sm text-[#3d6b4f]">
              {aSym} = {bSym} × {formatNumber(bToA)}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
<FAQHeading />
          <div className="space-y-2">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5]">
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

        {/* Other comparisons */}
        <section className="mb-16">
<MoreComparisonsHeading />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COMPARE_PAIRS.filter((p) => p.slug !== params.slug).slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/compare/${p.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm">
                <p className="font-sans font-medium text-sm text-[#1a1814] group-hover:text-[#3d6b4f]">{p.title}</p>
                <p className="text-xs text-[#9a948a] mt-0.5">{CATEGORIES[p.category]?.label}</p>
              </Link>
            ))}
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
