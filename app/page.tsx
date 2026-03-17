"use client";
// app/page.tsx

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import HomeAiSpotlight from "@/components/HomeAiSpotlight";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel } from "@/lib/i18n";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const BASE_URL = "https://koverts.com";

// Ordered by global search volume (2025-2026)
const CATEGORY_ORDER = [
  "length", "weight", "temperature", "volume", "speed",
  "area", "time", "data", "cooking", "energy",
  "pressure", "power", "fuel", "angle", "shoe", "numbase",
];

const HOME_POPULAR_LINKS = [
  { href: "/length/mile-to-kilometer", en: "Miles to Kilometers", zh: "英里转公里", es: "Millas a kilómetros", fr: "Miles en kilomètres", ru: "Мили в километры", ar: "أميال إلى كيلومترات" },
  { href: "/length/foot-to-meter", en: "Feet to Meters", zh: "英尺转米", es: "Pies a metros", fr: "Pieds en mètres", ru: "Футы в метры", ar: "قدم إلى متر" },
  { href: "/weight/pound-to-kilogram", en: "Pounds to Kilograms", zh: "磅转千克", es: "Libras a kilogramos", fr: "Livres en kilogrammes", ru: "Фунты в килограммы", ar: "رطل إلى كيلوغرام" },
  { href: "/temperature/fahrenheit-to-celsius", en: "Fahrenheit to Celsius", zh: "华氏度转摄氏度", es: "Fahrenheit a Celsius", fr: "Fahrenheit en Celsius", ru: "Фаренгейт в Цельсий", ar: "فهرنهايت إلى مئوية" },
  { href: "/volume/gallon-us-to-liter", en: "US Gallons to Liters", zh: "美制加仑转升", es: "Galones US a litros", fr: "Gallons US en litres", ru: "Галлоны США в литры", ar: "غالون أمريكي إلى لتر" },
  { href: "/speed/mph-to-kph", en: "MPH to KM/H", zh: "英里/时转千米/时", es: "MPH a KM/H", fr: "MPH en KM/H", ru: "Миль/ч в км/ч", ar: "ميل/س إلى كم/س" },
  { href: "/currency", en: "Currency Converter", zh: "货币汇率换算", es: "Conversor de divisas", fr: "Convertisseur de devises", ru: "Конвертер валют", ar: "محول العملات" },
  { href: "/ai/token-calculator", en: "AI Token Calculator", zh: "AI Token 计算器", es: "Calculadora de tokens IA", fr: "Calculateur de tokens IA", ru: "Калькулятор токенов AI", ar: "حاسبة رموز الذكاء الاصطناعي" },
];

const GLOBAL_TESTIMONIALS = [
  {
    name: "Mia",
    initials: "MI",
    country: { en: "United States", zh: "美国", es: "Estados Unidos", fr: "Etats-Unis", ru: "США", ar: "الولايات المتحدة" },
    role: { en: "E-commerce operator", zh: "电商运营", es: "Operadora e-commerce", fr: "Operatrice e-commerce", ru: "Оператор e-commerce", ar: "مشغلة تجارة إلكترونية" },
    quote: {
      en: "The shoe-size and weight converters saved me from repeated listing mistakes.",
      zh: "鞋码和重量换算帮我避免了反复改商品规格的问题。",
      es: "Los conversores de talla y peso evitaron errores repetidos en mis fichas.",
      fr: "Les convertisseurs de pointure et de poids m'evitent des erreurs repetitives.",
      ru: "Конвертеры размеров и веса помогли избежать повторяющихся ошибок в карточках товаров.",
      ar: "محولات المقاسات والوزن أنقذتني من أخطاء متكررة في إدراج المنتجات.",
    },
    likes: 128,
    tool: "shoe-size",
  },
  {
    name: "Luca",
    initials: "LU",
    country: { en: "Italy", zh: "意大利", es: "Italia", fr: "Italie", ru: "Италия", ar: "إيطاليا" },
    role: { en: "Travel blogger", zh: "旅行博主", es: "Bloguero de viajes", fr: "Blogueur voyage", ru: "Тревел-блогер", ar: "مدون سفر" },
    quote: {
      en: "I use the temperature and distance converters every time I publish destination guides.",
      zh: "每次写目的地攻略，我都会先用温度和距离换算校对一遍。",
      es: "Uso conversiones de temperatura y distancia en cada guia de destino.",
      fr: "J'utilise les conversions de temperature et distance pour chaque guide destination.",
      ru: "Использую конвертер температуры и расстояния при публикации каждого гайда.",
      ar: "أستخدم تحويل الحرارة والمسافة في كل دليل سفر أنشره.",
    },
    likes: 96,
    tool: "travel-pack",
  },
  {
    name: "Sofia",
    initials: "SO",
    country: { en: "Spain", zh: "西班牙", es: "España", fr: "Espagne", ru: "Испания", ar: "إسبانيا" },
    role: { en: "Data analyst", zh: "数据分析师", es: "Analista de datos", fr: "Analyste data", ru: "Дата-аналитик", ar: "محللة بيانات" },
    quote: {
      en: "The MB/GB and API cost tools are now part of my weekly dashboard workflow.",
      zh: "MB/GB 和 API 成本工具已经变成我每周看板流程的一部分。",
      es: "MB/GB y coste API ya son parte de mi flujo semanal.",
      fr: "MB/GB et cout API font desormais partie de mon workflow hebdomadaire.",
      ru: "Инструменты MB/GB и API cost стали частью моего еженедельного процесса.",
      ar: "أدوات MB/GB وتكلفة API أصبحت جزءًا من سير عملي الأسبوعي.",
    },
    likes: 113,
    tool: "api-cost",
  },
  {
    name: "Yuki",
    initials: "YU",
    country: { en: "Japan", zh: "日本", es: "Japon", fr: "Japon", ru: "Япония", ar: "اليابان" },
    role: { en: "Frontend developer", zh: "前端开发", es: "Desarrolladora frontend", fr: "Developpeuse frontend", ru: "Frontend-разработчик", ar: "مطورة واجهات" },
    quote: {
      en: "I like the clean layout and instant results. It's fast enough for daily team handoffs.",
      zh: "界面很清爽，结果秒出，日常跨团队交接时非常省事。",
      es: "Me encanta el diseno limpio y la respuesta instantanea para trabajo diario.",
      fr: "J'aime la mise en page claire et les resultats immediats pour le travail quotidien.",
      ru: "Нравится чистый интерфейс и мгновенный результат для ежедневной работы команды.",
      ar: "أحب الواجهة النظيفة والنتائج الفورية للاستخدام اليومي مع الفريق.",
    },
    likes: 84,
    tool: "length",
  },
  {
    name: "Omar",
    initials: "OM",
    country: { en: "United Arab Emirates", zh: "阿联酋", es: "EAU", fr: "EAU", ru: "ОАЭ", ar: "الإمارات" },
    role: { en: "Procurement manager", zh: "采购经理", es: "Gerente de compras", fr: "Responsable achats", ru: "Менеджер по закупкам", ar: "مدير مشتريات" },
    quote: {
      en: "Fuel and pressure conversions helped us unify supplier specs across regions.",
      zh: "油耗和压强换算帮我们把不同地区供应商参数统一了。",
      es: "Las conversiones de combustible y presion unificaron especificaciones de proveedores.",
      fr: "Les conversions de carburant et pression ont harmonise les specs fournisseurs.",
      ru: "Конвертация топлива и давления помогла унифицировать параметры поставщиков.",
      ar: "تحويلات الوقود والضغط ساعدتنا على توحيد مواصفات الموردين بين المناطق.",
    },
    likes: 77,
    tool: "fuel",
  },
  {
    name: "Anya",
    initials: "AN",
    country: { en: "Russia", zh: "俄罗斯", es: "Rusia", fr: "Russie", ru: "Россия", ar: "روسيا" },
    role: { en: "Engineering student", zh: "工程专业学生", es: "Estudiante de ingenieria", fr: "Etudiante ingenierie", ru: "Студентка инженерии", ar: "طالبة هندسة" },
    quote: {
      en: "I use tips + calculator together while studying. It makes formulas easier to remember.",
      zh: "我会边看 Tips 边用计算器练习，公式记忆效率明显提升。",
      es: "Uso consejos y calculadora juntos para estudiar y recordar formulas.",
      fr: "J'utilise astuces + calculateur ensemble pour mieux retenir les formules.",
      ru: "Использую советы и калькулятор вместе при учебе, формулы запоминаются легче.",
      ar: "أستخدم النصائح مع الحاسبة أثناء الدراسة وهذا يسهل تذكر الصيغ.",
    },
    likes: 101,
    tool: "tips",
  },
];

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const [mobileAllExpanded, setMobileAllExpanded] = useState(false);
  const localeText = <T,>(m: { en: T; zh: T; es: T; fr: T; ru: T; ar: T }) => m[locale];

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];

  const seoText = {
    introTitle: localeText({
      en: "Why Use Koverts",
      zh: "为什么选择 Koverts",
      es: "Por qué usar Koverts",
      fr: "Pourquoi utiliser Koverts",
      ru: "Почему выбирают Koverts",
      ar: "لماذا تستخدم Koverts",
    }),
    introBody: localeText({
      en: "Koverts is a fast online unit converter covering length, weight, temperature, volume, speed, area, data, time, pressure, angle, fuel efficiency, shoe size, and more.",
      zh: "Koverts 是一个可直接使用的在线换算工具，覆盖长度、重量、温度、体积、速度、面积、数据、时间、压强、角度、油耗、鞋码等多个场景。",
      es: "Koverts es un conversor online rápido que cubre longitud, peso, temperatura, volumen, velocidad, área, datos, tiempo, presión, ángulo y más.",
      fr: "Koverts est un convertisseur en ligne rapide couvrant longueur, poids, température, volume, vitesse, surface, données, temps, pression, angle et plus.",
      ru: "Koverts — быстрый онлайн-конвертер единиц: длина, вес, температура, объем, скорость, площадь, данные, время, давление, углы и другое.",
      ar: "Koverts أداة تحويل وحدات سريعة عبر الإنترنت تشمل الطول والوزن والحرارة والحجم والسرعة والمساحة والبيانات والوقت والضغط والزوايا وغيرها.",
    }),
    introBody2: localeText({
      en: "Use the popular links below for high-frequency queries. All results are instant and no signup is required.",
      zh: "如果你需要高频查询（如英里转公里、磅转千克、华氏度转摄氏度、美元汇率换算），可以直接使用下方热门入口。所有结果均实时计算，无需下载和注册。",
      es: "Para consultas frecuentes, usa los accesos rápidos de abajo. Los resultados son instantáneos y no requieren registro.",
      fr: "Pour les recherches fréquentes, utilisez les raccourcis ci-dessous. Résultats instantanés, sans inscription.",
      ru: "Для частых запросов используйте быстрые ссылки ниже. Результаты мгновенные и без регистрации.",
      ar: "للاستعلامات المتكررة استخدم الروابط الشائعة أدناه. النتائج فورية ولا يلزم التسجيل.",
    }),
    guidesTitle: localeText({
      en: "Popular Conversion Guides",
      zh: "热门换算入口",
      es: "Guías de conversión populares",
      fr: "Guides de conversion populaires",
      ru: "Популярные конвертации",
      ar: "أدلة التحويل الشائعة",
    }),
    faqTitle: localeText({
      en: "FAQ",
      zh: "常见问题",
      es: "Preguntas frecuentes",
      fr: "FAQ",
      ru: "Частые вопросы",
      ar: "الأسئلة الشائعة",
    }),
    faq: [
      {
        q: localeText({
          en: "What units can I convert on Koverts?",
          zh: "Koverts 支持哪些单位换算？",
          es: "¿Qué unidades puedo convertir en Koverts?",
          fr: "Quelles unités puis-je convertir sur Koverts ?",
          ru: "Какие единицы можно конвертировать в Koverts?",
          ar: "ما الوحدات التي يمكن تحويلها في Koverts؟",
        }),
        a: localeText({
          en: "You can convert across length, weight, temperature, volume, speed, area, data, time, energy, pressure, angle, power, fuel, cooking, shoe size, and number base.",
          zh: "支持长度、重量、温度、体积、速度、面积、数据、时间、能量、压强、角度、功率、油耗、烹饪、鞋码与进制转换等常见场景。",
          es: "Puedes convertir longitud, peso, temperatura, volumen, velocidad, área, datos, tiempo, energía, presión, ángulo, potencia, combustible, cocina, talla y base numérica.",
          fr: "Vous pouvez convertir longueur, poids, température, volume, vitesse, surface, données, temps, énergie, pression, angle, puissance, carburant, cuisine, pointure et base numérique.",
          ru: "Поддерживаются длина, вес, температура, объем, скорость, площадь, данные, время, энергия, давление, углы, мощность, топливо, кулинария, размеры обуви и системы счисления.",
          ar: "يمكنك تحويل الطول والوزن والحرارة والحجم والسرعة والمساحة والبيانات والوقت والطاقة والضغط والزوايا والقدرة والوقود والطبخ ومقاسات الأحذية وأنظمة الأعداد.",
        }),
      },
      {
        q: localeText({
          en: "Are the conversion results instant?",
          zh: "换算结果是否实时？",
          es: "¿Los resultados son instantáneos?",
          fr: "Les résultats sont-ils instantanés ?",
          ru: "Результаты конвертации мгновенные?",
          ar: "هل نتائج التحويل فورية؟",
        }),
        a: localeText({
          en: "Yes. Results are calculated instantly after entering a value and selecting source and target units.",
          zh: "是。输入数值并选择单位后会立即计算结果，适合移动端和桌面端快速查询。",
          es: "Sí. El resultado se calcula al instante al ingresar el valor y elegir las unidades.",
          fr: "Oui. Le résultat est calculé immédiatement après la saisie et le choix des unités.",
          ru: "Да. Результат рассчитывается сразу после ввода значения и выбора единиц.",
          ar: "نعم. يتم حساب النتيجة فور إدخال القيمة واختيار الوحدات.",
        }),
      },
      {
        q: localeText({
          en: "Do I need to create an account?",
          zh: "是否需要注册才能使用？",
          es: "¿Necesito crear una cuenta?",
          fr: "Faut-il créer un compte ?",
          ru: "Нужно ли создавать аккаунт?",
          ar: "هل أحتاج إلى إنشاء حساب؟",
        }),
        a: localeText({
          en: "No. Koverts is free to use with no signup required.",
          zh: "不需要。Koverts 可直接免费使用，适合日常学习、工作和跨单位协作。",
          es: "No. Koverts es gratuito y no requiere registro.",
          fr: "Non. Koverts est gratuit et sans inscription.",
          ru: "Нет. Koverts бесплатен и не требует регистрации.",
          ar: "لا. Koverts مجاني ولا يتطلب تسجيلًا.",
        }),
      },
    ],
  };

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoText.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: localeText({
      en: "Koverts Unit Converter",
      zh: "Koverts 单位换算器",
      es: "Conversor de unidades Koverts",
      fr: "Convertisseur d'unités Koverts",
      ru: "Конвертер единиц Koverts",
      ar: "محول الوحدات Koverts",
    }),
    url: BASE_URL,
    inLanguage: locale === "zh" ? "zh-Hans" : locale,
    description: seoText.introBody,
    isPartOf: {
      "@type": "WebSite",
      name: "Koverts",
      url: BASE_URL,
    },
  };

  const popularLinksItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seoText.guidesTitle,
    itemListElement: HOME_POPULAR_LINKS.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: localeText({ en: item.en, zh: item.zh, es: item.es, fr: item.fr, ru: item.ru, ar: item.ar }),
      url: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(popularLinksItemListSchema) }} />
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814]">
              Koverts
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
          </div>
          {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
        </header>

        {/* Hero */}
        <section className="text-center py-14">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] animate-pulse" />
            {t.heroBadge}
          </div>
          <h1 className="font-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.05] tracking-tight mb-4">
            {t.heroTitle} <em className="italic text-[#3d6b4f]">{t.heroTitleEm}</em>
            <br />{t.heroTitleSuffix}
          </h1>
          <p className="text-[#9a948a] font-light text-base max-w-sm mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </section>

        <ConverterWidget />

        <HomeAiSpotlight />

        <section className="mb-12">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-mono tracking-[0.1em] text-[#3d6b4f] uppercase">
                {localeText({ en: "Community Voices", zh: "用户推荐", es: "Comunidad", fr: "Communaute", ru: "Сообщество", ar: "آراء المجتمع" })}
              </p>
              <h2 className="font-sans font-bold text-xl md:text-2xl text-[#1a1814]">
                {localeText({
                  en: "Loved by users worldwide",
                  zh: "来自全球用户的真实好评",
                  es: "Valorado por usuarios globales",
                  fr: "Adopte par des utilisateurs du monde entier",
                  ru: "Отзывы пользователей по всему миру",
                  ar: "موصى به من مستخدمين حول العالم",
                })}
              </h2>
            </div>
            <Link href="/conversion-tips" className="text-xs font-mono text-[#3d6b4f] hover:underline">
              {localeText({
                en: "Join the community →",
                zh: "加入社区讨论 →",
                es: "Unete a la comunidad →",
                fr: "Rejoindre la communaute →",
                ru: "Присоединиться →",
                ar: "انضم إلى المجتمع →",
              })}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {GLOBAL_TESTIMONIALS.map((item) => (
              <article key={`${item.name}-${item.country.en}`} className="bg-white border border-[#e4e0da] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#edf4f0] text-[#3d6b4f] text-xs font-bold">
                      {item.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1814]">{item.name}</p>
                      <p className="text-xs text-[#8f8880]">{localeText(item.role)}</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-[#f4f2ef] text-[#6f6a61]">
                    {localeText(item.country)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#4f4942] mb-3">"{localeText(item.quote)}"</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8f8880]">❤️ {item.likes}</span>
                  <span className="px-2 py-1 rounded-full border border-[#e4e0da] text-[#6f6a61]">
                    #{item.tool}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Crawlable SEO content */}
        <section className="mt-14 mb-12 bg-white border border-[#e4e0da] rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-sans font-bold text-2xl md:text-3xl mb-4">{seoText.introTitle}</h2>
          <p className="text-[#6a6460] leading-relaxed text-sm md:text-base mb-3">{seoText.introBody}</p>
          <p className="text-[#6a6460] leading-relaxed text-sm md:text-base">{seoText.introBody2}</p>
        </section>

        {/* Popular SEO links */}
        <section className="mb-12">
          <h2 className="font-sans font-bold text-xl md:text-2xl mb-4">{seoText.guidesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {HOME_POPULAR_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-[#e4e0da] rounded-xl px-4 py-3 text-sm text-[#1a1814] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all shadow-sm"
              >
                {localeText({ en: item.en, zh: item.zh, es: item.es, fr: item.fr, ru: item.ru, ar: item.ar })}
              </Link>
            ))}
          </div>
        </section>

        {/* Homepage FAQ */}
        <section className="mb-14">
          <h2 className="font-sans font-bold text-xl md:text-2xl mb-4">{seoText.faqTitle}</h2>
          <div className="space-y-2">
            {seoText.faq.map((item, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">{item.q}</span>
                  <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* All categories grid */}
        <section className="mt-16 mb-20">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // {t.allConverters}
          </p>

          {/* Mobile: collapsed by default */}
          <div className="md:hidden mb-4 flex justify-center">
            <button
              onClick={() => setMobileAllExpanded((v) => !v)}
              className="px-4 py-2 rounded-full text-xs font-medium border border-[#e4e0da] bg-[#f8f6f2] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all"
            >
              {mobileAllExpanded ? t.showLess : t.moreCategories}
            </button>
          </div>

          <div className={`${mobileAllExpanded ? "grid" : "hidden"} md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3`}>

            {/* Currency - highest traffic */}
            <Link href="/currency"
              className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">💱</span>
              <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                {t.currency}
              </span>
              <p className="text-xs text-[#9a948a] mt-1">49 {t.units} · {localeText({ en: "live", zh: "实时", es: "en vivo", fr: "en direct", ru: "онлайн", ar: "مباشر" })}</p>
            </Link>

            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <span className="text-2xl mb-3 block">{cat.icon}</span>
                <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                  {getCategoryLabel(cat.slug, t)}
                </span>
                <p className="text-xs text-[#9a948a] mt-1">{Object.keys(cat.units).length} {t.units}</p>
              </Link>
            ))}

            {/* AI Tools */}
            <Link href="/ai"
              className="group bg-[#edf4f0] border border-[#3d6b4f]/30 rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#3d6b4f] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">🤖</span>
              <span className="font-semibold text-sm text-[#3d6b4f] group-hover:text-white transition-colors block">
                {t.aiTools}
              </span>
              <p className="text-xs text-[#3d6b4f]/60 group-hover:text-white/70 mt-1">5 {localeText({ en: "tools", zh: "工具", es: "herramientas", fr: "outils", ru: "инструментов", ar: "أدوات" })}</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
          <div className="flex gap-4 flex-wrap">
            <Link href="/currency" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {t.currency}
            </Link>
            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
                {getCategoryLabel(cat.slug, t)}
              </Link>
            ))}
            <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {t.aiTools}
            </Link>
            <Link href="/compare" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {localeText({ en: "Compare", zh: "对比", es: "Comparar", fr: "Comparer", ru: "Сравнить", ar: "مقارنة" })}
            </Link>
            <Link href="/faq" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {localeText({ en: "FAQ", zh: "常见问题", es: "FAQ", fr: "FAQ", ru: "FAQ", ar: "الأسئلة الشائعة" })}
            </Link>
            <Link href="/conversion-tips" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {localeText({ en: "Tips", zh: "小常识", es: "Consejos", fr: "Astuces", ru: "Советы", ar: "نصائح" })}
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
