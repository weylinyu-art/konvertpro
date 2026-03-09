"use client";
// components/SiteHeader.tsx
// Unified header for ALL pages — Logo + breadcrumbs + locale switcher

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  crumbs?: Crumb[];
}

export default function SiteHeader({ crumbs }: Props) {
  const { locale, setLocale, mounted } = useLocale();

  return (
    <header className="flex items-center justify-between pt-6 md:pt-8 pb-0">
      {/* Left: Logo + breadcrumbs */}
      <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
        <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
          <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
            Koverts
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5 flex-shrink-0" />
        </Link>

        {crumbs?.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1 min-w-0">
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            {crumb.href ? (
              <Link href={crumb.href}
                className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors truncate max-w-[70px] md:max-w-[140px]">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[70px] md:max-w-[140px]">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
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
