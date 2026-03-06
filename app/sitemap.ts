// app/sitemap.ts
import { MetadataRoute } from "next";
import { CATEGORIES, getAllConversionPaths } from "@/lib/units";
import { AI_TOOLS } from "@/lib/ai-units";

const BASE_URL = "https://koverts.com";
const LOCALES  = ["en", "zh", "es", "fr", "ru", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Homepage
  const home: MetadataRoute.Sitemap = [{
    url: BASE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  }];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/about`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/currency`, lastModified: now, changeFrequency: "daily",   priority: 0.9 },
  ];

  // AI tools pages
  const aiPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/ai`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...AI_TOOLS.map((tool) => ({
      url: `${BASE_URL}/ai/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Individual conversion pages
  const conversionPages: MetadataRoute.Sitemap = getAllConversionPaths().map(({ category, conversion }) => ({
    url: `${BASE_URL}/${category}/${conversion}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...home, ...staticPages, ...aiPages, ...categoryPages, ...conversionPages];
}
