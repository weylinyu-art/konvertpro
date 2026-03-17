"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
      aboutTitle: "About Koverts",
      aboutDesc: "Fast, clean unit conversion with practical AI utilities. Free to use, no signup required.",
      aboutLink: "Learn more",
      title: "Share this tool with your team",
      desc: "Share with your network using localized preview copy.",
      copied: "Copied",
      copy: "Copy share text",
      text: "Still struggling with unit conversions? I found a super useful tool: length, weight, temperature, shoe size, currency and more. Free, no signup, instant results. It also includes practical AI tools - all in one page:",
    },
    zh: {
      aboutTitle: "关于 Koverts",
      aboutDesc: "一个更快、更干净的换算工具，覆盖单位、汇率与实用 AI 工具，免费且无需注册。",
      aboutLink: "了解更多",
      title: "把这个实用工具分享给同事/朋友",
      desc: "按当前语言一键分享给你的社交网络。",
      copied: "已复制",
      copy: "复制链接+文案",
      text: "还在为各种单位换算头疼？我发现了一个超好用的工具：长度、重量、温度、鞋码、货币……几乎你能想到的都能换！免费、无需注册、打开即用，秒级出结果。还有实用 AI 工具，一个网页全搞定。",
    },
    es: {
      aboutTitle: "Acerca de Koverts",
      aboutDesc: "Conversiones rapidas y limpias, con utilidades de IA practicas. Gratis y sin registro.",
      aboutLink: "Saber mas",
      title: "Comparte esta herramienta util",
      desc: "Comparte con tu red usando texto de vista previa localizado.",
      copied: "Copiado",
      copy: "Copiar texto",
      text: "Todavia te complican las conversiones de unidades? Encontre una herramienta muy util: longitud, peso, temperatura, talla de calzado, divisas y mucho mas. Gratis, sin registro y con resultados al instante. Tambien incluye herramientas de IA practicas, todo en una sola pagina:",
    },
    fr: {
      aboutTitle: "A propos de Koverts",
      aboutDesc: "Des conversions rapides et nettes avec des outils IA pratiques. Gratuit, sans inscription.",
      aboutLink: "En savoir plus",
      title: "Partagez cet outil pratique",
      desc: "Partagez avec votre reseau avec un texte localise.",
      copied: "Copie",
      copy: "Copier le texte",
      text: "Vous en avez assez des conversions d'unites? J'ai trouve un outil ultra pratique: longueur, poids, temperature, pointures, devises... presque tout y est. Gratuit, sans inscription et resultat instantane. En plus, il propose des outils IA utiles, tout sur une seule page:",
    },
    ru: {
      aboutTitle: "О Koverts",
      aboutDesc: "Быстрые и удобные конвертации плюс полезные AI-инструменты. Бесплатно и без регистрации.",
      aboutLink: "Подробнее",
      title: "Поделитесь этим удобным инструментом",
      desc: "Поделитесь с вашей сетью с локализованным текстом.",
      copied: "Скопировано",
      copy: "Копировать текст",
      text: "Устали от постоянных пересчетов единиц? Я нашел очень удобный инструмент: длина, вес, температура, размер обуви, валюты и многое другое. Бесплатно, без регистрации, результат за секунду. Плюс полезные AI-инструменты - все на одной странице:",
    },
    ar: {
      aboutTitle: "حول Koverts",
      aboutDesc: "تحويلات سريعة وواضحة مع أدوات ذكاء اصطناعي عملية. مجاني وبدون تسجيل.",
      aboutLink: "اعرف المزيد",
      title: "شارك هذه الأداة العملية",
      desc: "شارك مع شبكتك باستخدام نص معاينة مناسب للغة.",
      copied: "تم النسخ",
      copy: "نسخ النص",
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
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMsg = encodeURIComponent(text.text);

  const links = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <path d="M13.5 8.5H11V7c0-.7.5-1 1-1h1.5V3.5H11c-2.4 0-4 1.6-4 4V8.5H4.5V11H7v7h3.5v-7h2.4l.6-2.5z" />,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMsg}`,
      icon: <path d="M4 4h3.2l3 4 3.4-4H17l-5 5.8L17.5 17h-3.2l-3.4-4.5L7 17H3.5l5.3-6.1z" />,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <>
          <rect x="4.2" y="7.6" width="2.3" height="8.2" />
          <circle cx="5.35" cy="5.3" r="1.2" />
          <path d="M8.6 7.6H11v1.2h.1c.4-.7 1.2-1.5 2.6-1.5 2.1 0 3.3 1.4 3.3 3.9v4.6h-2.5v-4.1c0-1.1-.4-1.9-1.4-1.9s-1.6.5-1.9 1.1c-.1.2-.1.5-.1.7v4.2H8.6z" />
        </>
      ),
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedMsg}%20${encodedUrl}`,
      icon: <path d="M10.7 3.5a6.7 6.7 0 0 0-5.8 10l-.8 2.9 3-.8a6.7 6.7 0 1 0 3.6-12.1zm0 11.8a5.1 5.1 0 0 1-2.6-.7l-.2-.1-1.7.5.5-1.6-.1-.2a5.1 5.1 0 1 1 4.1 2.1zm2.8-3.8c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1l-.5.6c-.1.1-.2.1-.4 0a4.1 4.1 0 0 1-1.2-.7 4.5 4.5 0 0 1-.8-1c-.1-.2 0-.3.1-.4l.3-.3.2-.3v-.3c0-.1-.4-1-.6-1.4-.2-.4-.3-.3-.4-.3h-.3c-.1 0-.3.1-.4.2-.1.2-.6.6-.6 1.4 0 .8.6 1.6.7 1.7.1.1 1.2 2 3 2.7 1.8.8 1.8.5 2.1.5.3 0 1.1-.5 1.2-.9.2-.4.2-.8.1-.9z" />,
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMsg}`,
      icon: <path d="M17.3 4.8 3.8 10c-.9.4-.9 1 .2 1.3l3.4 1.1 1.3 4.1c.2.6.1.9.8.9.5 0 .7-.2.9-.5l1.8-1.8 3.7 2.7c.7.4 1.2.2 1.4-.7l2.3-10.7c.3-1.1-.4-1.6-1.3-1.2zm-1.2 2.1-6.8 6.2-.3 3-1-3.2-2.7-.9 10.8-4.1z" />,
    },
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

  return (
    <section className="border-t border-[#e4e0da] bg-[#f5f3ee]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-2xl border border-[#ddd7cf] bg-white p-5 md:p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-base font-semibold text-[#1a1814]">{text.aboutTitle}</h3>
              <p className="text-sm text-[#6f6a61] mt-2 leading-relaxed">{text.aboutDesc}</p>
              <Link href="/about" className="inline-block mt-3 text-sm text-[#3d6b4f] hover:text-[#31563f] underline">
                {text.aboutLink}
              </Link>
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#1a1814]">{text.title}</h4>
              <p className="text-sm text-[#6f6a61] mt-2">{text.desc}</p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {links.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                    title={item.name}
                    className="w-11 h-11 rounded-full bg-[#34435c] text-white flex items-center justify-center hover:bg-[#28364d] transition-colors"
                  >
                    <svg viewBox="0 0 22 22" className="w-5 h-5 fill-current">
                      {item.icon}
                    </svg>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={onCopy}
                  aria-label={text.copy}
                  title={text.copy}
                  className="w-11 h-11 rounded-full bg-[#3d6b4f] text-white flex items-center justify-center hover:bg-[#31563f] transition-colors"
                >
                  {copied ? (
                    <svg viewBox="0 0 22 22" className="w-5 h-5 fill-current">
                      <path d="M8.8 14.8 5.1 11l1.4-1.4 2.3 2.4 6.6-6.6 1.4 1.4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 22 22" className="w-5 h-5 fill-current">
                      <path d="M6 7h8v2H8v6H6zm4-4h6v6h-2V6.4L7.7 12.7l-1.4-1.4L12.6 5H10z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

