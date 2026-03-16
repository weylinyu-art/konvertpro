// app/compare/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol, slugToUnit, unitToSlug } from "@/lib/units";
import { FAQHeading, MoreComparisonsHeading, FullConverterLink } from "@/components/PageLabels";
import { CategoryLabelText, LocaleText, UnitLabelText } from "@/components/LocaleText";
import { COMPARE_PAIRS } from "@/lib/compare-pairs";
import { buildPageAlternates } from "@/lib/seo";

const BASE_URL = "https://koverts.com";

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
    alternates: buildPageAlternates(`/compare/${pair.slug}`),
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
            <span className="font-mono text-xs text-[#3d6b4f]"><LocaleText en="Compare" zh="对比" es="Comparar" fr="Comparer" ru="Сравнение" ar="مقارنة" /></span>
          </div>
        </header>

        {/* Hero */}
        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {cat.icon} <CategoryLabelText slug={cat.slug} fallback={cat.label} /> · <LocaleText en="Comparison" zh="对比" es="Comparación" fr="Comparaison" ru="Сравнение" ar="مقارنة" />
          </div>
          <h1 className="font-sans font-bold text-[clamp(32px,5vw,56px)] tracking-tight leading-tight mb-3">
            <UnitLabelText unitKey={pair.a} fallback={aLabel} /> vs <UnitLabelText unitKey={pair.b} fallback={bLabel} />
          </h1>
          <p className="text-[#9a948a] text-sm leading-relaxed max-w-lg">
            <LocaleText
              en="See the key differences, formulas, and conversion table."
              zh="查看核心差异、换算公式与参考表。"
              es="Consulta diferencias clave, fórmulas y tabla de conversión."
              fr="Consultez les différences clés, les formules et le tableau de conversion."
              ru="Смотрите ключевые различия, формулы и таблицу конвертации."
              ar="اطّلع على الفروقات الأساسية والصيغ وجدول التحويل."
            />
          </p>
        </section>

        {/* Quick answer cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-3">1 {aSym} <LocaleText en="equals" zh="等于" es="equivale a" fr="équivaut à" ru="равно" ar="يساوي" /></p>
            <p className="font-sans font-bold text-3xl text-[#3d6b4f] mb-1">{formatNumber(aToB)} <span className="text-xl">{bSym}</span></p>
            <p className="text-xs text-[#9a948a]"><UnitLabelText unitKey={pair.a} fallback={aLabel} /> → <UnitLabelText unitKey={pair.b} fallback={bLabel} /></p>
<FullConverterLink href={`/${pair.category}/${unitToSlug(pair.a)}-to-${unitToSlug(pair.b)}`} />
          </div>
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-3">1 {bSym} <LocaleText en="equals" zh="等于" es="equivale a" fr="équivaut à" ru="равно" ar="يساوي" /></p>
            <p className="font-sans font-bold text-3xl text-[#3d6b4f] mb-1">{formatNumber(bToA)} <span className="text-xl">{aSym}</span></p>
            <p className="text-xs text-[#9a948a]"><UnitLabelText unitKey={pair.b} fallback={bLabel} /> → <UnitLabelText unitKey={pair.a} fallback={aLabel} /></p>
<FullConverterLink href={`/${pair.category}/${unitToSlug(pair.b)}-to-${unitToSlug(pair.a)}`} />
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-12">
<p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">// <LocaleText en="Side-by-side" zh="并排对照" es="Lado a lado" fr="Côte à côte" ru="Бок о бок" ar="جنبًا إلى جنب" /></p>
          <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider"><UnitLabelText unitKey={pair.a} fallback={aLabel} /> ({aSym})</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider"><UnitLabelText unitKey={pair.b} fallback={bLabel} /> ({bSym})</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider"><UnitLabelText unitKey={pair.a} fallback={aLabel} /> ({aSym}) ←</th>
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
            <h2 className="font-sans font-semibold text-base mb-3"><UnitLabelText unitKey={pair.a} fallback={aLabel} /> <LocaleText en="to" zh="转" es="a" fr="vers" ru="в" ar="إلى" /> <UnitLabelText unitKey={pair.b} fallback={bLabel} /> <LocaleText en="formula" zh="公式" es="fórmula" fr="formule" ru="формула" ar="الصيغة" /></h2>
            <div className="bg-[#f7f5f2] rounded-xl px-5 py-3 font-mono text-sm text-[#3d6b4f]">
              {bSym} = {aSym} × {formatNumber(aToB)}
            </div>
          </div>
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
            <h2 className="font-sans font-semibold text-base mb-3"><UnitLabelText unitKey={pair.b} fallback={bLabel} /> <LocaleText en="to" zh="转" es="a" fr="vers" ru="в" ar="إلى" /> <UnitLabelText unitKey={pair.a} fallback={aLabel} /> <LocaleText en="formula" zh="公式" es="fórmula" fr="formule" ru="формула" ar="الصيغة" /></h2>
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
                <p className="font-sans font-medium text-sm text-[#1a1814] group-hover:text-[#3d6b4f]">
                  <UnitLabelText unitKey={p.a} fallback={CATEGORIES[p.category]?.units[p.a]?.label || p.a} /> vs{" "}
                  <UnitLabelText unitKey={p.b} fallback={CATEGORIES[p.category]?.units[p.b]?.label || p.b} />
                </p>
                <p className="text-xs text-[#9a948a] mt-0.5"><CategoryLabelText slug={p.category} fallback={CATEGORIES[p.category]?.label || p.category} /></p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← <LocaleText en="All converters" zh="所有换算器" es="Todos los conversores" fr="Tous les convertisseurs" ru="Все конвертеры" ar="كل المحوّلات" /></Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
        </footer>
      </div>
    </main>
  );
}
