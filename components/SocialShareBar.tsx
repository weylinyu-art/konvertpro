"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

const SUPPORTED = new Set(["en", "zh", "es", "fr", "ru", "ar"]);

function basePathFromCurrent(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "l" && parts[1] && SUPPORTED.has(parts[1])) {
    const rest = parts.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

function labels(locale: string) {
  const map = {
    en: { share: "Share", copied: "Copied", copy: "Copy link", native: "Share" },
    zh: { share: "分享", copied: "已复制", copy: "复制链接", native: "系统分享" },
    es: { share: "Compartir", copied: "Copiado", copy: "Copiar enlace", native: "Compartir" },
    fr: { share: "Partager", copied: "Copie", copy: "Copier le lien", native: "Partager" },
    ru: { share: "Поделиться", copied: "Скопировано", copy: "Копировать ссылку", native: "Поделиться" },
    ar: { share: "مشاركة", copied: "تم النسخ", copy: "نسخ الرابط", native: "مشاركة" },
  } as const;
  return map[locale as keyof typeof map] ?? map.en;
}

export default function SocialShareBar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = basePathFromCurrent(pathname || "/");
    return `${window.location.origin}/l/${locale}${base === "/" ? "" : base}`;
  }, [pathname, locale]);

  const text = labels(locale);
  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMsg = encodeURIComponent("Koverts");

  const links = [
    { name: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMsg}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMsg}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodedMsg}%20${encodedUrl}` },
  ];

  async function onCopy() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Ignore clipboard permission errors.
    }
  }

  async function onNativeShare() {
    if (!shareUrl || typeof navigator === "undefined" || !("share" in navigator)) return;
    try {
      await navigator.share({ url: shareUrl, title: "Koverts" });
    } catch {
      // User cancelled or share failed.
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-[#3d6b4f] text-white px-4 py-2 text-sm shadow-md hover:bg-[#31563f] transition-colors"
      >
        {text.share}
      </button>

      {open ? (
        <div className="mt-2 w-64 rounded-xl border border-[#e4e0da] bg-white shadow-lg p-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-2 py-1 rounded-md border border-[#ddd7cf] hover:bg-[#f3f0eb] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="flex-1 text-xs px-2 py-2 rounded-md border border-[#ddd7cf] hover:bg-[#f3f0eb] transition-colors"
            >
              {copied ? text.copied : text.copy}
            </button>
            {canNativeShare ? (
              <button
                type="button"
                onClick={onNativeShare}
                className="flex-1 text-xs px-2 py-2 rounded-md bg-[#edf4f0] text-[#3d6b4f] hover:bg-[#dce9e1] transition-colors"
              >
                {text.native}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

