// app/sitemap.ts
import { MetadataRoute } from "next";
import { CATEGORIES, getAllConversionPaths, unitToSlug } from "@/lib/units";

const BASE_URL = "https://konvertpro.pages.dev"; // 换成你的域名

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "monthly" },
  ];

  // Category pages
  for (const slug of Object.keys(CATEGORIES)) {
    entries.push({
      url: `${BASE_URL}/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
    });
  }

  // All conversion pages
  for (const { category, conversion } of getAllConversionPaths()) {
    entries.push({
      url: `${BASE_URL}/${category}/${conversion}`,
      priority: 0.6,
      changeFrequency: "yearly",
    });
  }

  return entries;
}
