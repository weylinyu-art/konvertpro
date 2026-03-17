import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";
import { BASE_URL, buildSocialMetadata } from "@/lib/seo";
import { getCoreUrls, getAiUrls, getConversionUrls } from "@/lib/sitemap-data";
import { CATEGORIES, formatNumber, convert, slugToUnit } from "@/lib/units";
import { AI_TOOLS } from "@/lib/ai-units";
import { COMPARE_PAIRS } from "@/lib/compare-pairs";
import { getLocalizedSocialCopy } from "@/lib/social-i18n";

interface Props {
  params: { locale: string; slug?: string[] };
}

function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

function joinSlug(slug?: string[]) {
  return slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
}

function parseConversion(conversion: string): { from: string; to: string; value: number | null } | null {
  const idx = conversion.lastIndexOf("-to-");
  if (idx === -1) return null;
  const fromRaw = conversion.slice(0, idx);
  const toRaw = conversion.slice(idx + 4);
  const numMatch = fromRaw.match(/^(\d+(?:\.\d+)?)-(.+)$/);
  if (numMatch) {
    return { from: slugToUnit(numMatch[2]), to: slugToUnit(toRaw), value: parseFloat(numMatch[1]) };
  }
  return { from: slugToUnit(fromRaw), to: slugToUnit(toRaw), value: null };
}

function buildLocaleAlternates(path: string) {
  const normalized = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    const hrefLang = locale === "zh" ? "zh-Hans" : locale;
    languages[hrefLang] = `${BASE_URL}/l/${locale}${normalized}/`;
  }
  languages["x-default"] = `${BASE_URL}${normalized || "/"}`;
  return {
    canonical: `${BASE_URL}${normalized || "/"}`,
    languages,
  };
}

export async function generateStaticParams() {
  const allUrls = [...getCoreUrls(), ...getAiUrls(), ...getConversionUrls()];
  const paths = Array.from(new Set(allUrls.map((url) => new URL(url).pathname)));
  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      slug: path === "/" ? [] : path.split("/").filter(Boolean),
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const path = joinSlug(params.slug);
  const segments = params.slug ?? [];

  let social = getLocalizedSocialCopy(locale, { kind: "home" });
  if (path === "/about") {
    social = getLocalizedSocialCopy(locale, { kind: "about" });
  } else if (path === "/currency") {
    social = getLocalizedSocialCopy(locale, { kind: "currency" });
  } else if (path === "/ai") {
    social = getLocalizedSocialCopy(locale, { kind: "ai" });
  } else if (segments[0] === "ai" && segments[1]) {
    const tool = AI_TOOLS.find((t) => t.slug === segments[1]);
    social = getLocalizedSocialCopy(locale, { kind: "ai-tool", toolTitle: tool?.title });
  } else if (path === "/compare") {
    social = getLocalizedSocialCopy(locale, { kind: "compare" });
  } else if (segments[0] === "compare" && segments[1]) {
    const pair = COMPARE_PAIRS.find((p) => p.slug === segments[1]);
    social = getLocalizedSocialCopy(locale, { kind: "compare-detail", compareTitle: pair?.title });
  } else if (segments[0] && segments.length === 1 && CATEGORIES[segments[0]]) {
    social = getLocalizedSocialCopy(locale, { kind: "category", categoryLabel: CATEGORIES[segments[0]].label });
  } else if (segments[0] && segments[1] && CATEGORIES[segments[0]]) {
    const parsed = parseConversion(segments[1]);
    if (parsed) {
      const cat = CATEGORIES[segments[0]];
      const fromLabel = cat.units[parsed.from]?.label;
      const toLabel = cat.units[parsed.to]?.label;
      const value = parsed.value ?? 1;
      const valueText = fromLabel && toLabel
        ? `${value} ${fromLabel} = ${formatNumber(convert(value, parsed.from, parsed.to, cat.slug))} ${toLabel}`
        : undefined;
      social = getLocalizedSocialCopy(locale, {
        kind: "conversion",
        fromLabel,
        toLabel,
        conversionValueText: valueText,
      });
    }
  }

  const localePath = `/l/${locale}${path === "/" ? "" : path}`;
  return {
    title: social.title,
    description: social.description,
    alternates: buildLocaleAlternates(path),
    robots: {
      index: false,
      follow: true,
    },
    ...buildSocialMetadata({
      path: localePath,
      title: social.title,
      description: social.description,
      imageAlt: social.title,
    }),
  };
}

export default function LocalizedSharePage({ params }: Props) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();
  const path = joinSlug(params.slug);
  const targetUrl = `${path}${path.includes("?") ? "&" : "?"}lang=${locale}`;

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1a1814] grid place-items-center p-6">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(targetUrl)});`,
        }}
      />
      <div className="max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-3">Redirecting...</h1>
        <p className="text-[#6f6a61] mb-4">Opening the localized page now.</p>
        <Link href={targetUrl} className="text-[#3d6b4f] underline">
          Continue manually
        </Link>
      </div>
    </main>
  );
}

