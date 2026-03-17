import { CATEGORIES, getAllConversionPaths } from "@/lib/units";
import { AI_TOOLS } from "@/lib/ai-units";
import { NUMERIC_INDEX_PAIRS, NUMERIC_INDEX_VALUES } from "@/lib/indexing";
import { COMPARE_PAIRS } from "@/lib/compare-pairs";

export const BASE_URL = "https://koverts.com";

export function getCoreUrls() {
  const urls = [
    BASE_URL,
    `${BASE_URL}/about`,
    `${BASE_URL}/faq`,
    `${BASE_URL}/conversion-tips`,
    `${BASE_URL}/currency`,
    `${BASE_URL}/compare`,
    ...Object.keys(CATEGORIES).map((slug) => `${BASE_URL}/${slug}`),
    ...COMPARE_PAIRS.map((pair) => `${BASE_URL}/compare/${pair.slug}`),
  ];
  return Array.from(new Set(urls));
}

export function getAiUrls() {
  return [
    `${BASE_URL}/ai`,
    ...AI_TOOLS.map((tool) => `${BASE_URL}/ai/${tool.slug}`),
  ];
}

export function getConversionUrls() {
  const base = getAllConversionPaths().map(({ category, conversion }) => `${BASE_URL}/${category}/${conversion}`);
  const numeric = NUMERIC_INDEX_PAIRS.flatMap(({ category, from, to }) =>
    NUMERIC_INDEX_VALUES.map((v) => `${BASE_URL}/${category}/${v}-${from.replace(/_/g, "-")}-to-${to.replace(/_/g, "-")}`)
  );
  return Array.from(new Set([...base, ...numeric]));
}

