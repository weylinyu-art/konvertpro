// app/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol, unitToSlug } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://koverts.com";

interface Props { params: { category: string } }

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.category];
  if (!cat) return {};
  const pageUrl = `${BASE_URL}/${params.category}`;
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: cat.title,
      description: cat.description,
      url: pageUrl,
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.svg`, width: 1200, height: 630, alt: cat.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: cat.title,
      description: cat.description,
      images: [`${BASE_URL}/og-image.svg`],
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES[params.category];
  if (!cat) notFound();

  const pageUrl  = `${BASE_URL}/${params.category}`;
  const unitKeys = Object.keys(cat.units);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": cat.label, "item": pageUrl  },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <main className="relative z-10">
        <div className="max-w-4xl mx-auto px-6">

          <header className="flex items-center justify-between pt-8">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-serif text-[28px] tracking-tight">Koverts</span>
              <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
            </Link>
            <nav className="font-mono text-xs text-[#9a948a] flex gap-2">
              <Link href="/" className="hover:text-[#3d6b4f]">Home</Link>
              <span>/</span>
              <span>{cat.label}</span>
            </nav>
          </header>

          <section className="py-12">
            <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
              {cat.icon} {cat.label}
            </div>
            <h1 className="font-serif text-[clamp(32px,5vw,56px)] tracking-tight leading-tight mb-3">
              {cat.title}
            </h1>
            <p className="text-[#9a948a] text-sm max-w-lg leading-relaxed">{cat.description}</p>
          </section>

          <ConverterWidget defaultCategory={params.category} />

          {/* All conversions grid */}
          <section className="mt-16 mb-20">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
              // All {cat.label.toLowerCase()} conversions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {unitKeys.flatMap((from) =>
                unitKeys
                  .filter((to) => to !== from)
                  .map((to) => {
                    const result = formatNumber(convert(1, from, to, params.category));
                    const fromSym = getSymbol(from, params.category);
                    const toSym   = getSymbol(to,   params.category);
                    return (
                      <Link
                        key={`${from}-${to}`}
                        href={`/${params.category}/${unitToSlug(from)}-to-${unitToSlug(to)}`}
                        className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm"
                      >
                        <p className="font-mono text-xs text-[#9a948a] group-hover:text-[#3d6b4f] mb-1">
                          {fromSym} → {toSym}
                        </p>
                        <p className="text-sm text-[#1a1814] font-medium truncate">
                          1 {fromSym} = {result} {toSym}
                        </p>
                      </Link>
                    );
                  })
              )}
            </div>
          </section>

          <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
            <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← All converters</Link>
            <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
          </footer>

        </div>
      </main>
    </>
  );
}
