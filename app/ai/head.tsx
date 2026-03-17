import { buildPageAlternates } from "@/lib/seo";

export default function Head() {
  const alternates = buildPageAlternates("/ai");
  const languages = alternates.languages ?? {};
  const canonicalHref = alternates.canonical ? String(alternates.canonical) : undefined;
  const socialTitle = "AI Utility Tools for Developers | Koverts";
  const socialDescription = "Estimate tokens, model memory, API costs, and context windows with practical calculators.";
  const socialImage = "https://koverts.com/og-image.png";
  const languageEntries = Object.entries(languages).filter(
    ([, href]) => typeof href === "string" && href.length > 0
  ) as Array<[string, string]>;

  return (
    <>
      {canonicalHref ? <link rel="canonical" href={canonicalHref} /> : null}
      {languageEntries.map(([hrefLang, href]) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Koverts" />
      {canonicalHref ? <meta property="og:url" content={canonicalHref} /> : null}
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content="Koverts AI utility tools" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={socialImage} />
    </>
  );
}

