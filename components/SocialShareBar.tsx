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
    en: {
      title: "Share this tool with your team",
      desc: "One click to share a practical converter page, with localized preview text.",
      copied: "Copied",
      copy: "Copy link",
      native: "System share",
      text: "I found a fast converter on Koverts. Instant result, clean page, no signup needed:",
    },
    zh: {
      title: "把这个实用工具分享给同事/朋友",
      desc: "一键分享当前页面，预览文案会按语言自动适配。",
      copied: "已复制",
      copy: "复制链接+文案",
      native: "系统分享",
      text: "我刚用 Koverts 快速完成换算：结果秒出、页面干净、无需注册，推荐你试试：",
    },
    es: {
      title: "Comparte esta herramienta util",
      desc: "Comparte esta pagina con texto de vista previa adaptado al idioma.",
      copied: "Copiado",
      copy: "Copiar enlace",
      native: "Compartir",
      text: "Acabo de usar Koverts para una conversion rapida. Resultado instantaneo y sin registro:",
    },
    fr: {
      title: "Partagez cet outil pratique",
      desc: "Partage en un clic avec un texte d'aperçu adapte a la langue.",
      copied: "Copie",
      copy: "Copier le lien",
      native: "Partager",
      text: "Je viens d'utiliser Koverts pour une conversion rapide. Resultat instantane, sans inscription :",
    },
    ru: {
      title: "Поделитесь этим удобным инструментом",
      desc: "Ссылка и превью-текст автоматически подстраиваются под язык.",
      copied: "Скопировано",
      copy: "Копировать ссылку",
      native: "Поделиться",
      text: "Нашел удобный конвертер Koverts: мгновенный результат и без регистрации:",
    },
    ar: {
      title: "شارك هذه الأداة العملية",
      desc: "مشاركة بنقرة واحدة مع نص معاينة مناسب للغة.",
      copied: "تم النسخ",
      copy: "نسخ الرابط",
      native: "مشاركة النظام",
      text: "استخدمت Koverts للتحويل بسرعة: نتيجة فورية وبدون تسجيل:",
    },
  } as const;
  return map[locale as keyof typeof map] ?? map.en;
}

export default function SocialShareBar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = basePathFromCurrent(pathname || "/");
    return `${window.location.origin}/l/${locale}${base === "/" ? "" : base}`;
  }, [pathname, locale]);

  const shouldHide = (pathname || "").startsWith("/l/");
  if (shouldHide) return null;

  const text = labels(locale);
  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMsg = encodeURIComponent(text.text);

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
      await navigator.clipboard.writeText(`${text.text} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Ignore clipboard permission errors.
    }
  }

  async function onNativeShare() {
    if (!shareUrl || typeof navigator === "undefined" || !("share" in navigator)) return;
    try {
      await navigator.share({ url: shareUrl, title: "Koverts", text: text.text });
    } catch {
      // User cancelled or share failed.
    }
  }

  return (
    <section className="border-t border-[#e4e0da] bg-[#fbfaf7]">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#1a1814]">{text.title}</h3>
            <p className="text-xs text-[#6f6a61] mt-1">{text.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3 py-1.5 rounded-md border border-[#ddd7cf] bg-white hover:bg-[#f3f0eb] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              type="button"
              onClick={onCopy}
              className="text-xs px-3 py-1.5 rounded-md border border-[#ddd7cf] bg-white hover:bg-[#f3f0eb] transition-colors"
            >
              {copied ? text.copied : text.copy}
            </button>
            {canNativeShare ? (
              <button
                type="button"
                onClick={onNativeShare}
                className="text-xs px-3 py-1.5 rounded-md bg-[#edf4f0] text-[#3d6b4f] hover:bg-[#dce9e1] transition-colors"
              >
                {text.native}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

