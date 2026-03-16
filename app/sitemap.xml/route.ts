import { BASE_URL } from "@/lib/sitemap-data";
import { buildSitemapIndexXml } from "@/lib/sitemap-xml";

export function GET() {
  const xml = buildSitemapIndexXml([
    `${BASE_URL}/sitemap-core.xml`,
    `${BASE_URL}/sitemap-ai.xml`,
    `${BASE_URL}/sitemap-conversion.xml`,
  ]);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

