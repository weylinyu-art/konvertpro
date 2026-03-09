"use client";
// components/PageLabels.tsx
// Client component that provides translated section headings for server-rendered pages
// Usage: <PageLabels.FAQ />, <PageLabels.HowTo from="mile" to="kilometer" />

import { useLocale } from "@/components/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

export function FAQHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
      // {t.frequentlyAsked}
    </p>
  );
}

export function HowToHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return <h2 className="font-sans font-bold text-2xl mb-4">{t.howToConvert}</h2>;
}

export function ConversionTableHeading({ from, to }: { from: string; to: string }) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
      // {from} {t.conversionTableHeading} {to}
    </p>
  );
}

export function PopularHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
      // {t.popularConversionsHeading}
    </p>
  );
}

export function AllConversionsHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
      // {t.allConversionsHeading}
    </p>
  );
}

export function RelatedHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
      // {t.relatedConversionsHeading}
    </p>
  );
}

export function FormulaHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return <h2 className="font-sans font-semibold text-base mb-3">{t.formulaHeading}</h2>;
}

export function MoreComparisonsHeading() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
      // {t.moreComparisons}
    </p>
  );
}

export function FullConverterLink({ href }: { href: string }) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return (
    <a href={href} className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-[#3d6b4f] hover:underline">
      {t.fullConverter} →
    </a>
  );
}
