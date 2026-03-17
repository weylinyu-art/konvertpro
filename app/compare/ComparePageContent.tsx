"use client";

import Link from "next/link";
import { COMPARE_PAIRS, getCompareDescription } from "@/lib/compare-pairs";
import { CATEGORIES } from "@/lib/units";
import { CategoryLabelText, UnitLabelText } from "@/components/LocaleText";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

export default function ComparePageContent() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#9a948a] mb-5">
        <Link href="/" className="hover:text-[#3d6b4f]">
          {t.home}
        </Link>
        <span className="mx-2">/</span>
        <span>{t.compare}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        {t.comparePageTitle}
      </h1>
      <p className="text-[#5a554d] max-w-3xl mb-8">{t.comparePageSubtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPARE_PAIRS.map((pair) => {
          const category = CATEGORIES[pair.category];
          const categoryExists = Boolean(
            category?.units[pair.a] && category?.units[pair.b]
          );
          if (!categoryExists) return null;
          return (
            <Link
              key={pair.slug}
              href={`/compare/${pair.slug}`}
              className="group border border-[#e4e0da] rounded-xl bg-white p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-colors"
            >
              <p className="text-xs uppercase tracking-wide text-[#9a948a] mb-2">
                <CategoryLabelText slug={pair.category} fallback={pair.category} />
              </p>
              <h2 className="text-lg font-semibold text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors mb-1">
                <UnitLabelText unitKey={pair.a} fallback={pair.a} /> vs{" "}
                <UnitLabelText unitKey={pair.b} fallback={pair.b} />
              </h2>
              <p className="text-sm text-[#6f6a61]">
                {getCompareDescription(pair.slug, locale)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
