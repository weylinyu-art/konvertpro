import { buildPageAlternates } from "@/lib/seo";

export default function Head() {
  const alternates = buildPageAlternates("/conversion-tips");
  const languages = alternates.languages ?? {};
  const canonicalHref = alternates.canonical ? String(alternates.canonical) : undefined;
  const languageEntries = Object.entries(languages).filter(
    ([, href]) => typeof href === "string" && href.length > 0
  ) as Array<[string, string]>;

  return (
    <>
      {canonicalHref ? <link rel="canonical" href={canonicalHref} /> : null}
      {languageEntries.map(([hrefLang, href]) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}
      <meta property="og:title" content="Unit Conversion Tips & Basics | Koverts" />
      <meta property="og:description" content="Practical unit conversion tips and common pitfalls for daily work and study." />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Koverts" />
      {canonicalHref ? <meta property="og:url" content={canonicalHref} /> : null}
      <meta property="og:image" content="https://koverts.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Unit Conversion Tips & Basics | Koverts" />
      <meta name="twitter:description" content="A practical guide to more accurate conversion results." />
      <meta name="twitter:image" content="https://koverts.com/og-image.png" />
    </>
  );
}

