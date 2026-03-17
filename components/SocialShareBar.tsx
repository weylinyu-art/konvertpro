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
      copy: "Copy share text",
      native: "System share",
      text: "Still struggling with unit conversions? I found a super useful tool: length, weight, temperature, shoe size, currency and more. Free, no signup, instant results. It also includes practical AI tools - all in one page:",
    },
    zh: {
      title: "把这个实用工具分享给同事/朋友",
      desc: "一键分享当前页面，预览文案会按语言自动适配。",
      copied: "已复制",
      copy: "复制链接+文案",
      native: "系统分享",
      text: "还在为各种单位换算头疼？我发现了一个超好用的工具：长度、重量、温度、鞋码、货币……几乎你能想到的都能换！免费、无需注册、打开即用，秒级出结果。还有实用 AI 工具，一个网页全搞定。",
    },
    es: {
      title: "Comparte esta herramienta util",
      desc: "Comparte esta pagina con texto de vista previa adaptado al idioma.",
      copied: "Copiado",
      copy: "Copiar texto",
      native: "Compartir",
      text: "Todavia te complican las conversiones de unidades? Encontre una herramienta muy util: longitud, peso, temperatura, talla de calzado, divisas y mucho mas. Gratis, sin registro y con resultados al instante. Tambien incluye herramientas de IA practicas, todo en una sola pagina:",
    },
    fr: {
      title: "Partagez cet outil pratique",
      desc: "Partage en un clic avec un texte d'aperçu adapte a la langue.",
      copied: "Copie",
      copy: "Copier le texte",
      native: "Partager",
      text: "Vous en avez assez des conversions d'unites? J'ai trouve un outil ultra pratique: longueur, poids, temperature, pointures, devises... presque tout y est. Gratuit, sans inscription et resultat instantane. En plus, il propose des outils IA utiles, tout sur une seule page:",
    },
    ru: {
      title: "Поделитесь этим удобным инструментом",
      desc: "Ссылка и превью-текст автоматически подстраиваются под язык.",
      copied: "Скопировано",
      copy: "Копировать текст",
      native: "Поделиться",
      text: "Устали от постоянных пересчетов единиц? Я нашел очень удобный инструмент: длина, вес, температура, размер обуви, валюты и многое другое. Бесплатно, без регистрации, результат за секунду. Плюс полезные AI-инструменты - все на одной странице:",
    },
    ar: {
      title: "شارك هذه الأداة العملية",
      desc: "مشاركة بنقرة واحدة مع نص معاينة مناسب للغة.",
      copied: "تم النسخ",
      copy: "نسخ النص",
      native: "مشاركة النظام",
      text: "هل ما زلت تعاني مع تحويل الوحدات؟ اكتشفت أداة رائعة: الطول والوزن ودرجة الحرارة ومقاسات الأحذية والعملات وغيرها الكثير. مجانية وبدون تسجيل وتعمل فورًا بنتيجة خلال ثوانٍ. وتضم أيضًا أدوات ذكاء اصطناعي عملية، كل ذلك في صفحة واحدة:",
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

