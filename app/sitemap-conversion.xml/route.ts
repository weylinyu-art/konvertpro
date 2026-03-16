import { getConversionUrls } from "@/lib/sitemap-data";
import { buildUrlsetXml } from "@/lib/sitemap-xml";

export function GET() {
  const xml = buildUrlsetXml(getConversionUrls());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

