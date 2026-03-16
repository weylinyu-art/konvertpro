import { buildPageAlternates } from "@/lib/seo";

export default function Head() {
  const alternates = buildPageAlternates("/about");
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
    </>
  );
}

