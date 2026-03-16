// app/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol, unitToSlug } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import { FAQHeading, PopularHeading, AllConversionsHeading } from "@/components/PageLabels";

const BASE_URL = "https://koverts.com";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.category];
  if (!cat) return {};
  const pageUrl = `${BASE_URL}/${params.category}`;
  const unitCount = Object.keys(cat.units).length;
  return {
    title: `${cat.title} — Free Online ${cat.label} Converter`,
    description: `${cat.description} Convert between ${unitCount} ${cat.label.toLowerCase()} units instantly. Free, no signup required.`,
    keywords: [
      `${cat.label.toLowerCase()} converter`,
      `convert ${cat.label.toLowerCase()}`,
      `${cat.label.toLowerCase()} conversion`,
      `free ${cat.label.toLowerCase()} calculator`,
      ...Object.values(cat.units).slice(0, 4).map(u => u.label.toLowerCase()),
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${cat.title} — Free Online ${cat.label} Converter`,
      description: cat.description,
      url: pageUrl, type: "website",
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES[params.category];
  if (!cat) notFound();

  const unitKeys = Object.keys(cat.units);
  const pageUrl  = `${BASE_URL}/${params.category}`;
  const relatedCategories = Object.values(CATEGORIES)
    .filter((c) => c.slug !== params.category)
    .slice(0, 8);

  // ── Structured Data ──────────────────────────────────────────

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${cat.label} Unit Conversion Reference`,
    "description": `Reference table for ${cat.label.toLowerCase()} unit conversions. Covers ${unitKeys.length} units: ${Object.values(cat.units).slice(0, 5).map((u: any) => u.label).join(", ")}.`,
    "url": pageUrl,
    "creator": { "@type": "Organization", "name": "Koverts", "url": BASE_URL },
    "variableMeasured": unitKeys.map((k) => ({
      "@type": "PropertyValue",
      "name": cat.units[k].label,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": cat.label, "item": pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is a ${cat.label.toLowerCase()} converter?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${cat.label.toLowerCase()} converter is a tool that instantly converts values between different ${cat.label.toLowerCase()} units. Koverts supports ${unitKeys.length} ${cat.label.toLowerCase()} units including ${Object.values(cat.units).slice(0, 3).map(u => u.label).join(", ")}, and more.`,
        },
      },
      {
        "@type": "Question",
        "name": `How do I convert ${cat.label.toLowerCase()} units?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To convert ${cat.label.toLowerCase()} units, enter your value in the input field, select your source unit and target unit, and the result will appear instantly. No signup or download required.`,
        },
      },
      {
        "@type": "Question",
        "name": `Which ${cat.label.toLowerCase()} units does Koverts support?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Koverts supports ${unitKeys.length} ${cat.label.toLowerCase()} units: ${Object.values(cat.units).map(u => u.label).join(", ")}.`,
        },
      },
    ],
  };

  const relatedCategoriesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Related ${cat.label} conversion categories`,
    "itemListElement": relatedCategories.map((c, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": c.label,
      "url": `${BASE_URL}/${c.slug}`,
    })),
  };

  return (
    <main className="relative z-10">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(relatedCategoriesSchema) }} />

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
<PopularHeading />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cat.popular.map((p) => {
              const result = convert(p.val, p.from, p.to, params.category);
              const fromSymbol = getSymbol(p.from, params.category);
              const toSymbol   = getSymbol(p.to,   params.category);
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

        {/* FAQ */}
        <section className="mb-12">
<FAQHeading />
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

        {/* All conversions table */}
        <section className="mb-16">
<AllConversionsHeading />
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

        {/* Related category links for crawl depth */}
        <section className="mb-16 bg-white border border-[#e4e0da] rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-sans font-bold text-xl md:text-2xl mb-3">Explore More Converter Categories</h2>
          <p className="text-[#6a6460] text-sm leading-relaxed mb-4">
            Looking for other conversion tools? Browse more categories below to find the exact unit converter you need.
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="px-3 py-2 text-xs md:text-sm rounded-lg bg-[#f7f5f2] border border-[#e4e0da] text-[#1a1814] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all"
              >
                {c.icon} {c.label}
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
