// app/sitemap.ts
import { MetadataRoute } from "next";
import { CATEGORIES, getAllConversionPaths } from "@/lib/units";

const COMPARE_SLUGS = [
  "celsius-vs-fahrenheit", "celsius-vs-kelvin",
  "kg-vs-lbs", "oz-vs-grams",
  "miles-vs-kilometers", "feet-vs-meters", "inches-vs-centimeters",
  "cups-vs-ml", "gallons-vs-liters",
  "mph-vs-kmh", "acres-vs-hectares", "mb-vs-gb", "gb-vs-tb",
];
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

  // Compare pages
  const comparePages: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // High-value numeric direct-answer pages
  const NUMERIC_PAIRS = [
    { cat: "length",      from: "mile",       to: "kilometer" },
    { cat: "length",      from: "foot",       to: "meter" },
    { cat: "length",      from: "inch",       to: "centimeter" },
    { cat: "weight",      from: "pound",      to: "kilogram" },
    { cat: "weight",      from: "ounce",      to: "gram" },
    { cat: "temperature", from: "fahrenheit", to: "celsius" },
    { cat: "volume",      from: "cup",        to: "milliliter" },
    { cat: "volume",      from: "gallon_us",  to: "liter" },
    { cat: "speed",       from: "mph",        to: "kph" },
  ];
  const NUMERIC_VALUES = [1, 5, 10, 25, 50, 100, 200, 500, 1000];
  const numericPages: MetadataRoute.Sitemap = NUMERIC_PAIRS.flatMap(({ cat, from, to }) =>
    NUMERIC_VALUES.map((v) => ({
      url: `${BASE_URL}/${cat}/${v}-${from.replace(/_/g, "-")}-to-${to.replace(/_/g, "-")}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  );

  return [...home, ...staticPages, ...aiPages, ...categoryPages, ...conversionPages, ...comparePages, ...numericPages];
}
