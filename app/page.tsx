"use client";
// app/page.tsx

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import HomeAiSpotlight from "@/components/HomeAiSpotlight";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel, getUnitLabel } from "@/lib/i18n";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getAllDetailedTipArticles } from "@/lib/conversion-tips-data";

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

// 场景分组：度量 / 生活 / 专业 / 趣味（细分后每类 4–6 项）
const CONVERTER_SCENARIOS: Array<{
  key: string;
  title: { en: string; zh: string; es: string; fr: string; ru: string; ar: string };
  items: Array<{ type: "currency" } | { type: "ai" } | { type: "category"; slug: string }>;
}> = [
  {
    key: "measure",
    title: { en: "Measurements", zh: "度量换算", es: "Medidas", fr: "Mesures", ru: "Измерения", ar: "القياسات" },
    items: [
      { type: "category", slug: "length" },
      { type: "category", slug: "weight" },
      { type: "category", slug: "temperature" },
      { type: "category", slug: "volume" },
      { type: "category", slug: "speed" },
      { type: "category", slug: "area" },
    ],
  },
  {
    key: "life",
    title: { en: "Daily life", zh: "生活换算", es: "Vida diaria", fr: "Quotidien", ru: "Повседневное", ar: "الحياة اليومية" },
    items: [
      { type: "currency" },
      { type: "category", slug: "time" },
      { type: "category", slug: "cooking" },
      { type: "category", slug: "shoe" },
    ],
  },
  {
    key: "professional",
    title: { en: "Professional tools", zh: "专业工具", es: "Herramientas profesionales", fr: "Outils professionnels", ru: "Профессиональные", ar: "أدوات احترافية" },
    items: [
      { type: "category", slug: "data" },
      { type: "category", slug: "energy" },
      { type: "category", slug: "pressure" },
      { type: "category", slug: "power" },
      { type: "category", slug: "fuel" },
    ],
  },
  {
    key: "more",
    title: { en: "More tools", zh: "趣味换算", es: "Más herramientas", fr: "Plus d'outils", ru: "Прочее", ar: "المزيد من الأدوات" },
    items: [
      { type: "category", slug: "angle" },
      { type: "category", slug: "numbase" },
      { type: "ai" },
    ],
  },
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
  const [converterTab, setConverterTab] = useState<"measure" | "life" | "professional" | "more">("measure");
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const localeText = <T,>(m: { en: T; zh: T; es?: T; fr?: T; ru?: T; ar?: T }) =>
    m[locale as keyof typeof m] ?? m.en;

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];
  const tipsPreview = getAllDetailedTipArticles().slice(0, 2);

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
          en: "Koverts supports 16+ categories: length, weight, temperature, volume, speed, area, time, data, energy, pressure, angle, power, fuel, cooking, shoe size, and number base. Currency exchange and AI tools (token calculator, cost estimator) are also available. Use the converter hub below to jump to any category.",
          zh: "Koverts 支持 16+ 种换算：长度、重量、温度、体积、速度、面积、时间、数据、能量、压强、角度、功率、油耗、烹饪、鞋码、进制等。另提供货币汇率与 AI 工具（Token 计算器、成本估算）。请使用下方「所有转换器」导航直达各分类。",
          es: "Koverts soporta 16+ categorías: longitud, peso, temperatura, volumen, velocidad, área, tiempo, datos, energía, presión, ángulo, potencia, combustible, cocina, talla y base numérica. También divisas y herramientas IA (calculadora de tokens, estimador de costes). Usa el hub de conversores más abajo para acceder a cada categoría.",
          fr: "Koverts prend en charge 16+ catégories : longueur, poids, température, volume, vitesse, surface, temps, données, énergie, pression, angle, puissance, carburant, cuisine, pointure et base numérique. Devises et outils IA (calculateur de tokens, estimation de coûts) inclus. Utilisez le hub ci-dessous pour accéder à chaque catégorie.",
          ru: "Koverts поддерживает 16+ категорий: длина, вес, температура, объём, скорость, площадь, время, данные, энергия, давление, углы, мощность, топливо, кулинария, размеры обуви и системы счисления. Также курс валют и AI-инструменты. Используйте навигацию ниже для быстрого доступа.",
          ar: "يدعم Koverts أكثر من 16 فئة: الطول والوزن والحرارة والحجم والسرعة والمساحة والوقت والبيانات والطاقة والضغط والزوايا والقدرة والوقود والطبخ ومقاسات الأحذية وأنظمة الأعداد. كما يتوفر سعر الصرف وأدوات الذكاء الاصطناعي. استخدم المركز أدناه للانتقال إلى أي فئة.",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

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
        <section className="text-center py-10 md:py-12">
          <h1 className="font-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.05] tracking-tight mb-4">
            {t.heroTitle} <em className="italic text-[#3d6b4f]">{t.heroTitleEm}</em>
            <br />{t.heroTitleSuffix}
          </h1>
          <p className="text-[#9a948a] font-light text-base max-w-md mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </section>

        <ConverterWidget />

        <section className="mt-8 mb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/conversion-tips" className="group bg-white border border-[#e8e4df] rounded-xl px-4 py-4 hover:border-[#3d6b4f] transition-colors min-h-[72px] flex flex-col justify-center">
            <p className="text-xs text-[#3d6b4f] mb-1">📘 {localeText({ en: "Tips", zh: "Tips", es: "Tips", fr: "Astuces", ru: "Советы", ar: "نصائح" })}</p>
            <p className="text-[15px] sm:text-sm font-medium text-[#1a1814] group-hover:text-[#3d6b4f] leading-snug">{localeText({ en: "Practical guides", zh: "实用指南", es: "Guías prácticas", fr: "Guides pratiques", ru: "Практические гайды", ar: "أدلة عملية" })}</p>
          </Link>
          <Link href="/ai" className="group bg-white border border-[#e8e4df] rounded-xl px-4 py-4 hover:border-[#3d6b4f] transition-colors min-h-[72px] flex flex-col justify-center">
            <p className="text-xs text-[#3d6b4f] mb-1">🤖 {t.aiTools}</p>
            <p className="text-[15px] sm:text-sm font-medium text-[#1a1814] group-hover:text-[#3d6b4f] leading-snug">{localeText({ en: "Token / Cost / Context", zh: "Token / 成本 / 上下文", es: "Token / Coste / Contexto", fr: "Token / Coût / Contexte", ru: "Токены / Стоимость / Контекст", ar: "الرموز / التكلفة / السياق" })}</p>
          </Link>
          <Link href="/compare" className="group bg-white border border-[#e8e4df] rounded-xl px-4 py-4 hover:border-[#3d6b4f] transition-colors min-h-[72px] flex flex-col justify-center">
            <p className="text-xs text-[#3d6b4f] mb-1">⚖️ {localeText({ en: "Compare", zh: "对比", es: "Comparar", fr: "Comparer", ru: "Сравнить", ar: "مقارنة" })}</p>
            <p className="text-[15px] sm:text-sm font-medium text-[#1a1814] group-hover:text-[#3d6b4f] leading-snug">{localeText({ en: "Popular pairs", zh: "热门单位对比", es: "Pares populares", fr: "Paires populaires", ru: "Популярные пары", ar: "مقارنات شائعة" })}</p>
          </Link>
        </section>

        {/* AI quick tools — 移动端默认收起；桌面端隐藏 details 内部标题避免重复 */}
        <details open={!isMobile} className="group mb-10 md:mb-12">
          <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-[#e8e4df] md:border-0 md:py-0 md:mb-4 [&::-webkit-details-marker]:hidden">
            <h2 className="font-sans font-bold text-xl md:text-2xl text-[#1a1814]">
              {localeText({ en: "AI quick tools", zh: "AI 快捷工具", es: "Herramientas IA rápidas", fr: "Outils IA rapides", ru: "Быстрые AI-инструменты", ar: "أدوات ذكاء اصطناعي سريعة" })}
            </h2>
            <div className="flex items-center gap-2">
              <Link href="/ai" className="text-xs font-mono text-[#3d6b4f] hover:underline hidden md:inline">
                {localeText({ en: "All AI →", zh: "全部 AI →", es: "Todo IA →", fr: "Tout IA →", ru: "Все AI →", ar: "كل أدوات AI →" })}
              </Link>
              <span className="text-[#c5bdb4] text-sm md:hidden">{localeText({ en: "Expand", zh: "展开", es: "Expandir", fr: "Développer", ru: "Развернуть", ar: "توسيع" })} ▾</span>
            </div>
          </summary>
          <div className="pt-4 md:pt-0">
            <HomeAiSpotlight hideHeader />
          </div>
        </details>

        {/* Tips picks — 移动端只展示 1 条 */}
        <section className="mb-10">
          <div className="flex items-end justify-between gap-3 mb-4">
            <h2 className="font-sans font-bold text-xl md:text-2xl text-[#1a1814]">
              {localeText({
                en: "Tips picks",
                zh: "Tips 精选",
                es: "Tips destacados",
                fr: "Astuces choisies",
                ru: "Выборка Tips",
                ar: "مختارات Tips",
              })}
            </h2>
            <Link href="/conversion-tips" className="text-xs font-mono text-[#3d6b4f] hover:underline">
              {localeText({ en: "View all →", zh: "查看全部 →", es: "Ver todo →", fr: "Tout voir →", ru: "Смотреть все →", ar: "عرض الكل →" })}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(isMobile ? tipsPreview.slice(0, 1) : tipsPreview).map((item) => (
              <Link key={item.slug} href={`/conversion-tips/${item.slug}`} className="group bg-white border border-[#e8e4df] rounded-lg p-5 hover:border-[#3d6b4f] transition-colors">
                <p className="text-xs text-[#9a948a] mb-1">{localeText(item.moduleTitle)}</p>
                <p className="font-medium text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors mb-2">{localeText(item.title)}</p>
                <p className="text-sm text-[#6a6460] leading-relaxed">{localeText(item.summary)}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* User reviews — 移动端默认收起 */}
        <details open={!isMobile} className="group mb-10">
          <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-[#e8e4df] md:border-0 md:py-0 [&::-webkit-details-marker]:hidden">
            <h2 className="font-sans font-bold text-xl md:text-2xl text-[#1a1814]">
              {localeText({ en: "User reviews", zh: "用户评价", es: "Reseñas", fr: "Avis", ru: "Отзывы", ar: "آراء" })}
            </h2>
            <span className="text-[#c5bdb4] text-sm md:hidden">{localeText({ en: "Expand", zh: "展开", es: "Expandir", fr: "Développer", ru: "Развернуть", ar: "توسيع" })} ▾</span>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 md:pt-4">
            {GLOBAL_TESTIMONIALS.slice(0, 4).map((item) => (
              <article key={`${item.name}-${item.country.en}`} className="bg-white border border-[#e8e4df] rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-[#1a1814]">{item.name}</p>
                  <span className="text-[11px] text-[#8f8880]">{localeText(item.country)}</span>
                </div>
                <p className="text-xs text-[#8f8880] mb-2">{localeText(item.role)}</p>
                <p className="text-sm leading-relaxed text-[#4f4942]">"{localeText(item.quote)}"</p>
              </article>
            ))}
          </div>
        </details>

        {/* Popular SEO links — 移动端默认收起 */}
        <details open={!isMobile} className="group mb-10">
          <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-[#e8e4df] md:border-0 md:py-0 [&::-webkit-details-marker]:hidden">
            <h2 className="font-sans font-bold text-lg md:text-xl text-[#1a1814]">
              {seoText.guidesTitle}
            </h2>
            <span className="text-[#c5bdb4] text-sm md:hidden">{localeText({ en: "Expand", zh: "展开", es: "Expandir", fr: "Développer", ru: "Развернуть", ar: "توسيع" })} ▾</span>
          </summary>
          <div className="flex flex-wrap gap-2 pt-4 md:pt-3">
            {HOME_POPULAR_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-[#e8e4df] rounded-full px-3 py-1.5 text-xs text-[#1a1814] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-colors"
              >
                {localeText({ en: item.en, zh: item.zh, es: item.es, fr: item.fr, ru: item.ru, ar: item.ar })}
              </Link>
            ))}
          </div>
        </details>

        {/* Homepage FAQ */}
        <section className="mb-14">
          <h2 className="font-sans font-bold text-xl md:text-2xl mb-4">{seoText.faqTitle}</h2>
          <div className="space-y-2">
            {seoText.faq.map((item, i) => (
              <details key={i} open={i === 0 && !isMobile} className="group bg-white border border-[#e8e4df] rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#fafaf8] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">{item.q}</span>
                  <span className="text-[11px] text-[#c5bdb4] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▾</span>
                </summary>
                <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* All converters — 标签切换，精简布局；链接直达分类二级页 */}
        <section className="mt-10 mb-14">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3 md:mb-4">
            // {t.allConverters}
          </p>
          {/* 移动端：横向滚动；桌面端：flex 换行 */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide md:flex-wrap md:overflow-visible">
            {CONVERTER_SCENARIOS.map((scenario) => (
              <button
                key={scenario.key}
                onClick={() => setConverterTab(scenario.key as "measure" | "life" | "professional" | "more")}
                className={`flex-shrink-0 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                  converterTab === scenario.key
                    ? "bg-[#3d6b4f] text-white"
                    : "bg-white border border-[#e8e4df] text-[#6a6460] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
                }`}
              >
                {localeText(scenario.title)}
              </button>
            ))}
          </div>
          {isMobile ? (
            <div className="mt-2 rounded-xl border border-[#e8e4df] bg-white divide-y divide-[#e8e4df]">
              {(CONVERTER_SCENARIOS.find((s) => s.key === converterTab)?.items ?? []).map((item) => {
                if (item.type === "currency") {
                  return (
                    <Link
                      key="currency"
                      href="/currency"
                      className="flex items-center justify-between px-4 py-3 active:bg-[#f7f5f2]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">💱</span>
                        <span className="font-medium text-sm text-[#1a1814]">{t.currency}</span>
                      </div>
                      <span className="text-xs text-[#c5bdb4]">›</span>
                    </Link>
                  );
                }
                if (item.type === "ai") {
                  return (
                    <Link
                      key="ai"
                      href="/ai"
                      className="flex items-center justify-between px-4 py-3 active:bg-[#f7f5f2]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🤖</span>
                        <span className="font-medium text-sm text-[#1a1814]">{t.aiTools}</span>
                      </div>
                      <span className="text-xs text-[#c5bdb4]">›</span>
                    </Link>
                  );
                }
                const cat = CATEGORIES[item.slug];
                if (!cat) return null;
                return (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="flex items-center justify-between px-4 py-3 active:bg-[#f7f5f2]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-medium text-sm text-[#1a1814]">
                        {getCategoryLabel(cat.slug, t)}
                      </span>
                    </div>
                    <span className="text-xs text-[#c5bdb4]">›</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {(CONVERTER_SCENARIOS.find((s) => s.key === converterTab)?.items ?? []).map((item) => {
                if (item.type === "currency") {
                  return (
                    <Link key="currency" href="/currency" className="group bg-white border border-[#e8e4df] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all flex items-center gap-3 min-h-[100px]">
                      <span className="text-2xl flex-shrink-0">💱</span>
                      <div className="min-w-0">
                        <span className="font-semibold text-[15px] sm:text-base text-[#1a1814] block">{t.currency}</span>
                        <p className="text-xs text-[#9a948a] mt-0.5">49 {t.units}</p>
                      </div>
                    </Link>
                  );
                }
                if (item.type === "ai") {
                  return (
                    <Link key="ai" href="/ai" className="group bg-[#f8faf8] border border-[#3d6b4f]/20 rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#3d6b4f] transition-colors flex items-center gap-3 min-h-[100px]">
                      <span className="text-2xl flex-shrink-0">🤖</span>
                      <div className="min-w-0">
                        <span className="font-semibold text-[15px] sm:text-base text-[#3d6b4f] block group-hover:text-white">{t.aiTools}</span>
                        <p className="text-xs text-[#3d6b4f]/70 mt-0.5">5 {localeText({ en: "tools", zh: "工具", es: "herramientas", fr: "outils", ru: "инструментов", ar: "أدوات" })}</p>
                      </div>
                    </Link>
                  );
                }
                const cat = CATEGORIES[item.slug];
                if (!cat) return null;
                const subLinks = (cat.popular || []).slice(0, 2).map((p) => ({
                  href: `/${cat.slug}/${String(p.from).replace(/_/g, "-")}-to-${String(p.to).replace(/_/g, "-")}`,
                  label: `${getUnitLabel(p.from, locale)} → ${getUnitLabel(p.to, locale)}`,
                }));
                return (
                  <div key={cat.slug} className="bg-white border border-[#e8e4df] rounded-xl p-4 sm:p-4 hover:border-[#3d6b4f] hover:bg-[#f8faf8] transition-colors min-h-[120px] flex flex-col">
                    <Link href={`/${cat.slug}`} className="flex items-center gap-3 mb-2 block min-h-[44px]">
                      <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-[15px] sm:text-base text-[#1a1814] block leading-tight">{getCategoryLabel(cat.slug, t)}</span>
                        <p className="text-xs text-[#9a948a] mt-0.5">{Object.keys(cat.units).length} {t.units}</p>
                      </div>
                    </Link>
                    {subLinks.length > 0 && (
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-2 mt-2 sm:pl-11">
                        {subLinks.map((s) => (
                          <Link key={s.href} href={s.href} className="text-[13px] sm:text-xs text-[#6a6460] hover:text-[#3d6b4f] border-b border-dotted border-[#c5bdb4] hover:border-[#3d6b4f] py-0.5 w-fit leading-relaxed">
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Crawlable SEO content — 移动端默认收起 */}
        <details open={!isMobile} className="group mb-12">
          <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-[#e8e4df] md:border-0 md:py-0 md:mb-4 [&::-webkit-details-marker]:hidden">
            <h2 className="font-sans font-bold text-lg md:text-2xl text-[#1a1814]">
              {seoText.introTitle}
            </h2>
            <span className="text-[#c5bdb4] text-sm md:hidden">{localeText({ en: "Expand", zh: "展开", es: "Expandir", fr: "Développer", ru: "Развернуть", ar: "توسيع" })} ▾</span>
          </summary>
          <section className="bg-white border border-[#e8e4df] rounded-lg p-6 md:p-8 mt-4 md:mt-8">
            <p className="text-[#6a6460] leading-relaxed text-sm md:text-base mb-3">{seoText.introBody}</p>
            <p className="text-[#6a6460] leading-relaxed text-sm md:text-base">{seoText.introBody2}</p>
          </section>
        </details>

        {/* Footer — 移除冗余换算入口，强化 Compare / FAQ / Tips */}
        <footer className="border-t border-[#e4e0da] pt-8 pb-6 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-[#9a948a] mb-3">{t.copyright}</p>
              <p className="text-sm text-[#6a6460] max-w-md leading-relaxed">
                {localeText({
                  en: "Fast, clean unit conversion with practical AI utilities. Free to use, no signup required.",
                  zh: "轻量、实用的单位换算与 AI 工具。免费使用，无需注册。",
                  es: "Conversión de unidades rápida y limpia con utilidades IA. Gratis, sin registro.",
                  fr: "Conversion d'unités rapide et propre avec outils IA. Gratuit, sans inscription.",
                  ru: "Быстрая конвертация единиц с AI-инструментами. Бесплатно, без регистрации.",
                  ar: "تحويل وحدات سريع ونظيف مع أدوات الذكاء الاصطناعي. مجاني، بدون تسجيل.",
                })}
              </p>
              <Link href="/about" className="inline-block mt-2 text-xs font-medium text-[#3d6b4f] hover:underline">
                {localeText({ en: "Learn more →", zh: "了解更多 →", es: "Saber más →", fr: "En savoir plus →", ru: "Подробнее →", ar: "اعرف المزيد ←" })}
              </Link>
            </div>
            <div className="flex flex-col gap-2 min-w-[160px]">
              <p className="font-semibold text-xs text-[#1a1814] mb-1">
                {localeText({ en: "Quick links", zh: "快捷入口", es: "Enlaces rápidos", fr: "Liens rapides", ru: "Быстрые ссылки", ar: "روابط سريعة" })}
              </p>
              <Link href="/compare" className="text-sm text-[#6a6460] hover:text-[#3d6b4f] transition-colors">
                {localeText({ en: "Compare units", zh: "单位对比", es: "Comparar unidades", fr: "Comparer unités", ru: "Сравнить единицы", ar: "مقارنة الوحدات" })}
              </Link>
              <Link href="/faq" className="text-sm text-[#6a6460] hover:text-[#3d6b4f] transition-colors">
                {localeText({ en: "FAQ", zh: "常见问题", es: "FAQ", fr: "FAQ", ru: "FAQ", ar: "الأسئلة الشائعة" })}
              </Link>
              <Link href="/conversion-tips" className="text-sm text-[#6a6460] hover:text-[#3d6b4f] transition-colors">
                {localeText({ en: "Conversion tips", zh: "换算小常识", es: "Consejos de conversión", fr: "Astuces de conversion", ru: "Советы по конвертации", ar: "نصائح التحويل" })}
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
