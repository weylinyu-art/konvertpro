import type { Metadata } from "next";

export const BASE_URL = "https://koverts.com";

const LOCALE_TO_HREFLANG = {
  en: "en",
  zh: "zh-Hans",
  es: "es",
  fr: "fr",
  ru: "ru",
  ar: "ar",
} as const;

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function buildPageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const normalizedPath = normalizePath(path);
  const canonical = normalizedPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;

  const languages: Record<string, string> = {};
  for (const [locale, hrefLang] of Object.entries(LOCALE_TO_HREFLANG)) {
    languages[hrefLang] = `${canonical}?lang=${locale}`;
  }
  languages["x-default"] = canonical;

  return {
    canonical,
    languages,
  };
}

