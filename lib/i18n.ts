// lib/i18n.ts
// Internationalization for 6 UN working languages
// EN, ZH, ES, FR, RU, AR

export type Locale = "en" | "zh" | "es" | "fr" | "ru" | "ar";

export const LOCALES: Locale[] = ["en", "zh", "es", "fr", "ru", "ar"];

export const LOCALE_META: Record<Locale, {
  name: string;       // Native name
  label: string;      // English label
  dir: "ltr" | "rtl";
  browserCodes: string[]; // navigator.language prefixes
}> = {
  en: { name: "English",    label: "English",  dir: "ltr", browserCodes: ["en"] },
  zh: { name: "中文",        label: "Chinese",  dir: "ltr", browserCodes: ["zh"] },
  es: { name: "Español",    label: "Spanish",  dir: "ltr", browserCodes: ["es"] },
  fr: { name: "Français",   label: "French",   dir: "ltr", browserCodes: ["fr"] },
  ru: { name: "Русский",    label: "Russian",  dir: "ltr", browserCodes: ["ru"] },
  ar: { name: "العربية",    label: "Arabic",   dir: "rtl", browserCodes: ["ar"] },
};

export interface Translations {
  // Navigation
  home: string;
  allConverters: string;
  aiTools: string;

  // Hero
  heroTitle: string;
  heroTitleEm: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  heroBadge: string;

  // Converter UI
  from: string;
  to: string;
  result: string;
  swap: string;
  popularConversions: string;

  // Category labels
  length: string;
  weight: string;
  temperature: string;
  volume: string;
  speed: string;
  area: string;
  data: string;
  time: string;
  energy: string;
  pressure: string;
  angle: string;
  power: string;

  // Page elements
  units: string;
  freeInstant: string;
  noSignup: string;
  howToConvert: string;
  conversionTable: string;
  relatedConversions: string;
  allConversions: string;
  didYouKnow: string;
  quickTip: string;
  commonUses: string;
  aboutTool: string;
  faq: string;

  // Footer
  copyright: string;
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  en: {
    home: "Home",
    allConverters: "All converters",
    aiTools: "AI Tools",
    heroTitle: "Convert",
    heroTitleEm: "anything",
    heroTitleSuffix: "in seconds",
    heroSubtitle: "Length, weight, temperature, volume, speed, area — all in one clean tool.",
    heroBadge: "Free · No signup · Instant",
    from: "From",
    to: "To",
    result: "Result",
    swap: "Swap",
    popularConversions: "Popular conversions",
    length: "Length",
    weight: "Weight",
    temperature: "Temperature",
    volume: "Volume",
    speed: "Speed",
    area: "Area",
    data: "Data",
    time: "Time",
    energy: "Energy",
    pressure: "Pressure",
    angle: "Angle",
    power: "Power",
    units: "units",
    freeInstant: "Free · Instant",
    noSignup: "No signup required",
    howToConvert: "How to convert",
    conversionTable: "Conversion table",
    relatedConversions: "Related conversions",
    allConversions: "All conversions",
    didYouKnow: "Did You Know?",
    quickTip: "Quick Tip",
    commonUses: "Common Uses",
    aboutTool: "About this tool",
    faq: "Frequently Asked Questions",
    copyright: "© 2025 Koverts",
  },

  zh: {
    home: "首页",
    allConverters: "所有转换器",
    aiTools: "AI 工具",
    heroTitle: "换算",
    heroTitleEm: "任何单位",
    heroTitleSuffix: "秒级完成",
    heroSubtitle: "长度、重量、温度、体积、速度、面积 — 一个工具全搞定。",
    heroBadge: "免费 · 无需注册 · 即时换算",
    from: "从",
    to: "换算为",
    result: "结果",
    swap: "互换",
    popularConversions: "常用换算",
    length: "长度",
    weight: "重量",
    temperature: "温度",
    volume: "体积",
    speed: "速度",
    area: "面积",
    data: "数据",
    time: "时间",
    energy: "能量",
    pressure: "压强",
    angle: "角度",
    power: "功率",
    units: "个单位",
    freeInstant: "免费 · 即时",
    noSignup: "无需注册",
    howToConvert: "如何换算",
    conversionTable: "换算表",
    relatedConversions: "相关换算",
    allConversions: "所有换算",
    didYouKnow: "你知道吗？",
    quickTip: "快速技巧",
    commonUses: "常见用途",
    aboutTool: "关于此工具",
    faq: "常见问题",
    copyright: "© 2025 Koverts",
  },

  es: {
    home: "Inicio",
    allConverters: "Todos los conversores",
    aiTools: "Herramientas IA",
    heroTitle: "Convierte",
    heroTitleEm: "cualquier cosa",
    heroTitleSuffix: "en segundos",
    heroSubtitle: "Longitud, peso, temperatura, volumen, velocidad, área — todo en una herramienta.",
    heroBadge: "Gratis · Sin registro · Instantáneo",
    from: "De",
    to: "A",
    result: "Resultado",
    swap: "Intercambiar",
    popularConversions: "Conversiones populares",
    length: "Longitud",
    weight: "Peso",
    temperature: "Temperatura",
    volume: "Volumen",
    speed: "Velocidad",
    area: "Área",
    data: "Datos",
    time: "Tiempo",
    energy: "Energía",
    pressure: "Presión",
    angle: "Ángulo",
    power: "Potencia",
    units: "unidades",
    freeInstant: "Gratis · Instantáneo",
    noSignup: "Sin registro requerido",
    howToConvert: "Cómo convertir",
    conversionTable: "Tabla de conversión",
    relatedConversions: "Conversiones relacionadas",
    allConversions: "Todas las conversiones",
    didYouKnow: "¿Sabías que?",
    quickTip: "Consejo rápido",
    commonUses: "Usos comunes",
    aboutTool: "Sobre esta herramienta",
    faq: "Preguntas frecuentes",
    copyright: "© 2025 Koverts",
  },

  fr: {
    home: "Accueil",
    allConverters: "Tous les convertisseurs",
    aiTools: "Outils IA",
    heroTitle: "Convertissez",
    heroTitleEm: "tout",
    heroTitleSuffix: "en secondes",
    heroSubtitle: "Longueur, poids, température, volume, vitesse, surface — tout en un outil.",
    heroBadge: "Gratuit · Sans inscription · Instantané",
    from: "De",
    to: "En",
    result: "Résultat",
    swap: "Inverser",
    popularConversions: "Conversions populaires",
    length: "Longueur",
    weight: "Poids",
    temperature: "Température",
    volume: "Volume",
    speed: "Vitesse",
    area: "Surface",
    data: "Données",
    time: "Temps",
    energy: "Énergie",
    pressure: "Pression",
    angle: "Angle",
    power: "Puissance",
    units: "unités",
    freeInstant: "Gratuit · Instantané",
    noSignup: "Sans inscription",
    howToConvert: "Comment convertir",
    conversionTable: "Table de conversion",
    relatedConversions: "Conversions associées",
    allConversions: "Toutes les conversions",
    didYouKnow: "Le saviez-vous ?",
    quickTip: "Astuce rapide",
    commonUses: "Utilisations courantes",
    aboutTool: "À propos de cet outil",
    faq: "Questions fréquentes",
    copyright: "© 2025 Koverts",
  },

  ru: {
    home: "Главная",
    allConverters: "Все конвертеры",
    aiTools: "ИИ инструменты",
    heroTitle: "Конвертируйте",
    heroTitleEm: "что угодно",
    heroTitleSuffix: "за секунды",
    heroSubtitle: "Длина, вес, температура, объём, скорость, площадь — всё в одном инструменте.",
    heroBadge: "Бесплатно · Без регистрации · Мгновенно",
    from: "Из",
    to: "В",
    result: "Результат",
    swap: "Поменять",
    popularConversions: "Популярные конвертации",
    length: "Длина",
    weight: "Вес",
    temperature: "Температура",
    volume: "Объём",
    speed: "Скорость",
    area: "Площадь",
    data: "Данные",
    time: "Время",
    energy: "Энергия",
    pressure: "Давление",
    angle: "Угол",
    power: "Мощность",
    units: "единиц",
    freeInstant: "Бесплатно · Мгновенно",
    noSignup: "Без регистрации",
    howToConvert: "Как конвертировать",
    conversionTable: "Таблица конвертации",
    relatedConversions: "Похожие конвертации",
    allConversions: "Все конвертации",
    didYouKnow: "Вы знали?",
    quickTip: "Быстрый совет",
    commonUses: "Частые случаи использования",
    aboutTool: "Об этом инструменте",
    faq: "Часто задаваемые вопросы",
    copyright: "© 2025 Koverts",
  },

  ar: {
    home: "الرئيسية",
    allConverters: "جميع المحوّلات",
    aiTools: "أدوات الذكاء الاصطناعي",
    heroTitle: "حوّل",
    heroTitleEm: "أي شيء",
    heroTitleSuffix: "في ثوانٍ",
    heroSubtitle: "الطول، الوزن، الحرارة، الحجم، السرعة، المساحة — كل شيء في أداة واحدة.",
    heroBadge: "مجاني · بدون تسجيل · فوري",
    from: "من",
    to: "إلى",
    result: "النتيجة",
    swap: "تبديل",
    popularConversions: "التحويلات الشائعة",
    length: "الطول",
    weight: "الوزن",
    temperature: "الحرارة",
    volume: "الحجم",
    speed: "السرعة",
    area: "المساحة",
    data: "البيانات",
    time: "الوقت",
    energy: "الطاقة",
    pressure: "الضغط",
    angle: "الزاوية",
    power: "الطاقة الكهربائية",
    units: "وحدات",
    freeInstant: "مجاني · فوري",
    noSignup: "لا يلزم التسجيل",
    howToConvert: "كيفية التحويل",
    conversionTable: "جدول التحويل",
    relatedConversions: "تحويلات ذات صلة",
    allConversions: "جميع التحويلات",
    didYouKnow: "هل تعلم؟",
    quickTip: "نصيحة سريعة",
    commonUses: "الاستخدامات الشائعة",
    aboutTool: "حول هذه الأداة",
    faq: "الأسئلة الشائعة",
    copyright: "© 2025 Koverts",
  },
};

export function getTranslations(locale: Locale): Translations {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}

// Category label lookup using translations
export function getCategoryLabel(slug: string, t: Translations): string {
  const map: Record<string, keyof Translations> = {
    length: "length", weight: "weight", temperature: "temperature",
    volume: "volume", speed: "speed", area: "area", data: "data",
    time: "time", energy: "energy", pressure: "pressure",
    angle: "angle", power: "power",
  };
  const key = map[slug];
  return key ? String(t[key]) : slug;
}
