// app/about/metadata.ts
import type { Metadata } from "next";

const BASE_URL = "https://koverts.com";

export const metadata: Metadata = {
  title: "About Koverts — Free Unit Converter & AI Tools",
  description: "Koverts is a free, instant unit converter supporting 16 categories, 32 currencies, and 6 languages. Built for people who just need the answer — no ads, no signup.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About Koverts — Free Unit Converter & AI Tools",
    description: "Free instant converters for every unit. 16 categories, 32 currencies, 6 languages. No ads, no signup.",
    url: `${BASE_URL}/about`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.svg`, width: 1200, height: 630, alt: "About Koverts" }],
  },
};

// BreadcrumbList schema for About page
export const aboutBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",  "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE_URL}/about` },
  ],
};
