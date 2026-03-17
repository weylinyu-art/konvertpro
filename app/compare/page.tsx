import type { Metadata } from "next";
import Link from "next/link";
import { COMPARE_PAIRS } from "@/lib/compare-pairs";
import { CATEGORIES } from "@/lib/units";
import { CategoryLabelText, UnitLabelText } from "@/components/LocaleText";
import { buildPageAlternates, buildSocialMetadata } from "@/lib/seo";

const BASE_URL = "https://koverts.com";

export const metadata: Metadata = {
  title: "Unit Comparison Hub | Koverts",
  description: "Compare popular units side by side with formulas, quick tables, and instant converter shortcuts.",
  alternates: buildPageAlternates("/compare"),
  ...buildSocialMetadata({
    path: "/compare",
    title: "Unit Comparison Hub | Koverts",
    description: "Miles vs kilometers, kg vs lbs, celsius vs fahrenheit - all key comparisons in one place.",
    imageAlt: "Koverts unit comparison hub",
  }),
};

export default function CompareIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${BASE_URL}/compare` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: COMPARE_PAIRS.map((pair, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: pair.title,
      url: `${BASE_URL}/compare/${pair.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1a1814]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#9a948a] mb-5">
          <Link href="/" className="hover:text-[#3d6b4f]">Home</Link>
          <span className="mx-2">/</span>
          <span>Compare</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Unit Comparison Hub</h1>
        <p className="text-[#5a554d] max-w-3xl mb-8">
          Explore high-intent unit comparisons with formulas, quick tables, and direct converter links.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPARE_PAIRS.map((pair) => {
            const category = CATEGORIES[pair.category];
            const categoryExists = Boolean(category?.units[pair.a] && category?.units[pair.b]);
            if (!categoryExists) return null;
            return (
              <Link
                key={pair.slug}
                href={`/compare/${pair.slug}`}
                className="group border border-[#e4e0da] rounded-xl bg-white p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-colors"
              >
                <p className="text-xs uppercase tracking-wide text-[#9a948a] mb-2">
                  <CategoryLabelText slug={pair.category} fallback={pair.category} />
                </p>
                <h2 className="text-lg font-semibold text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors mb-1">
                  <UnitLabelText unitKey={pair.a} fallback={pair.a} /> vs <UnitLabelText unitKey={pair.b} fallback={pair.b} />
                </h2>
                <p className="text-sm text-[#6f6a61]">{pair.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

