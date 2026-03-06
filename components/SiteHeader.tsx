"use client";
// components/SiteHeader.tsx
// Shared header for all pages — back navigation + locale switcher

import Link from "next/link";
import { useLocale } from "@/components/LocaleSwitcher";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface Props {
  breadcrumbs?: Breadcrumb[];
}

export default function SiteHeader({ breadcrumbs }: Props) {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);

  return (
    <header className="flex items-center justify-between pt-6 pb-2">
      {/* Left: Logo + breadcrumb nav */}
      <div className="flex items-center gap-1.5 min-w-0">
        <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
          <span className="font-serif text-[22px] md:text-[26px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
            Koverts
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
        </Link>

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 min-w-0 overflow-hidden">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1 min-w-0">
                <span className="text-[#c5bdb4] text-xs">/</span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors truncate max-w-[80px] md:max-w-[140px]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[80px] md:max-w-[140px]">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Right: locale switcher */}
      {mounted && (
        <div className="flex-shrink-0 ml-2">
          <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />
        </div>
      )}
    </header>
  );
}
