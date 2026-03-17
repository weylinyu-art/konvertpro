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

interface SocialMetaInput {
  path: string;
  title: string;
  description: string;
  imagePath?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

export function buildSocialMetadata(input: SocialMetaInput): Pick<Metadata, "openGraph" | "twitter"> {
  const normalizedPath = normalizePath(input.path);
  const pageUrl = normalizedPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
  const imagePath = input.imagePath ?? "/og-image.png";
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${BASE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;

  return {
    openGraph: {
      title: input.title,
      description: input.description,
      url: pageUrl,
      type: input.type ?? "website",
      siteName: "Koverts",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: input.imageAlt ?? input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
  };
}

