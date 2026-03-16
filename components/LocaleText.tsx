"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel, getCategoryTitle, getUnitLabel, type Translations } from "@/lib/i18n";

export function LocaleText({
  en,
  zh,
}: {
  en: string;
  zh: string;
}) {
  const { locale } = useLocale();
  return <>{locale === "zh" ? zh : en}</>;
}

export function TransKey({
  k,
  fallback,
}: {
  k: keyof Translations;
  fallback?: string;
}) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return <>{String(t[k] ?? fallback ?? "")}</>;
}

export function CategoryLabelText({
  slug,
  fallback,
}: {
  slug: string;
  fallback?: string;
}) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  return <>{getCategoryLabel(slug, t) || fallback || slug}</>;
}

export function CategoryTitleText({
  slug,
  fallback,
}: {
  slug: string;
  fallback?: string;
}) {
  const { locale } = useLocale();
  return <>{getCategoryTitle(slug, locale) || fallback || slug}</>;
}

export function UnitLabelText({
  unitKey,
  fallback,
}: {
  unitKey: string;
  fallback?: string;
}) {
  const { locale } = useLocale();
  return <>{getUnitLabel(unitKey, locale) || fallback || unitKey}</>;
}

