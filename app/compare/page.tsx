import type { Metadata } from "next";
import { COMPARE_PAIRS } from "@/lib/compare-pairs";
import { buildPageAlternates, buildSocialMetadata } from "@/lib/seo";
import ComparePageContent from "./ComparePageContent";

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
      <ComparePageContent />
    </main>
  );
}

