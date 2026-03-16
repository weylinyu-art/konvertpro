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
  fuel: string;
  currency: string;
  cooking: string;
  shoe: string;
  numbase: string;

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

  // Page section headings (used in server-rendered pages)
  conversionTableHeading: string;
  frequentlyAsked: string;
  popularConversionsHeading: string;
  allConversionsHeading: string;
  relatedConversionsHeading: string;
  compareHeading: string;
  formulaHeading: string;
  moreComparisons: string;
  fullConverter: string;

  // Category expand/collapse (mobile)
  moreCategories: string;
  showLess: string;
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
    fuel: "Fuel",
    currency: "Currency",
    cooking: "Cooking",
    shoe: "Shoe Size",
    numbase: "Number Base",
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
    conversionTableHeading: "Conversion table",
    frequentlyAsked: "Frequently Asked Questions",
    popularConversionsHeading: "Popular conversions",
    allConversionsHeading: "All conversions",
    relatedConversionsHeading: "Related conversions",
    compareHeading: "Side-by-side comparison table",
    formulaHeading: "Formula",
    moreComparisons: "More comparisons",
    fullConverter: "Full converter",
    moreCategories: "More",
    showLess: "Show less",
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
    fuel: "油耗",
    currency: "货币",
    cooking: "烹饪",
    shoe: "鞋码",
    numbase: "进制转换",
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
    conversionTableHeading: "换算表",
    frequentlyAsked: "常见问题",
    popularConversionsHeading: "常用换算",
    allConversionsHeading: "所有换算",
    relatedConversionsHeading: "相关换算",
    compareHeading: "对比表格",
    formulaHeading: "计算公式",
    moreComparisons: "更多对比",
    fullConverter: "完整换算器",
    moreCategories: "更多",
    showLess: "收起",
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
    fuel: "Combustible",
    currency: "Divisa",
    cooking: "Cocina",
    shoe: "Talla de zapato",
    numbase: "Base numérica",
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
    conversionTableHeading: "Tabla de conversión",
    frequentlyAsked: "Preguntas frecuentes",
    popularConversionsHeading: "Conversiones populares",
    allConversionsHeading: "Todas las conversiones",
    relatedConversionsHeading: "Conversiones relacionadas",
    compareHeading: "Tabla comparativa",
    formulaHeading: "Fórmula",
    moreComparisons: "Más comparaciones",
    fullConverter: "Conversor completo",
    moreCategories: "Más",
    showLess: "Ver menos",
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
    fuel: "Carburant",
    currency: "Devise",
    cooking: "Cuisine",
    shoe: "Pointure",
    numbase: "Base numérique",
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
    conversionTableHeading: "Table de conversion",
    frequentlyAsked: "Questions fréquentes",
    popularConversionsHeading: "Conversions populaires",
    allConversionsHeading: "Toutes les conversions",
    relatedConversionsHeading: "Conversions associées",
    compareHeading: "Tableau comparatif",
    formulaHeading: "Formule",
    moreComparisons: "Plus de comparaisons",
    fullConverter: "Convertisseur complet",
    moreCategories: "Plus",
    showLess: "Réduire",
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
    fuel: "Топливо",
    currency: "Валюта",
    cooking: "Кулинария",
    shoe: "Размер обуви",
    numbase: "Система счисления",
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
    conversionTableHeading: "Таблица конвертации",
    frequentlyAsked: "Часто задаваемые вопросы",
    popularConversionsHeading: "Популярные конвертации",
    allConversionsHeading: "Все конвертации",
    relatedConversionsHeading: "Похожие конвертации",
    compareHeading: "Сравнительная таблица",
    formulaHeading: "Формула",
    moreComparisons: "Больше сравнений",
    fullConverter: "Полный конвертер",
    moreCategories: "Ещё",
    showLess: "Свернуть",
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
    fuel: "الوقود",
    currency: "العملة",
    cooking: "الطبخ",
    shoe: "مقاس الحذاء",
    numbase: "نظام الأعداد",
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
    conversionTableHeading: "جدول التحويل",
    frequentlyAsked: "الأسئلة الشائعة",
    popularConversionsHeading: "التحويلات الشائعة",
    allConversionsHeading: "جميع التحويلات",
    relatedConversionsHeading: "تحويلات ذات صلة",
    compareHeading: "جدول مقارنة",
    formulaHeading: "الصيغة",
    moreComparisons: "مزيد من المقارنات",
    fullConverter: "المحوّل الكامل",
    moreCategories: "المزيد",
    showLess: "إظهار أقل",
  },
};


// ── Unit label translations ───────────────────────────────────────────────────
// Key = unit key from units.ts, Value = translated label (without symbol)
// Symbol in parentheses stays the same across all languages
export type UnitLabelMap = Record<string, string>;

export const UNIT_LABELS: Record<Locale, UnitLabelMap> = {
  en: {
    // Length
    meter: "Meter (m)", kilometer: "Kilometer (km)", centimeter: "Centimeter (cm)",
    millimeter: "Millimeter (mm)", mile: "Mile (mi)", yard: "Yard (yd)",
    foot: "Foot (ft)", inch: "Inch (in)", nautical_mile: "Nautical Mile (nmi)",
    // Weight
    kilogram: "Kilogram (kg)", gram: "Gram (g)", milligram: "Milligram (mg)",
    pound: "Pound (lb)", ounce: "Ounce (oz)", ton: "Metric Ton (t)", stone: "Stone (st)",
    // Temperature
    celsius: "Celsius (°C)", fahrenheit: "Fahrenheit (°F)", kelvin: "Kelvin (K)",
    // Volume
    liter: "Liter (L)", milliliter: "Milliliter (mL)", gallon_us: "Gallon US (gal)",
    quart: "Quart (qt)", pint: "Pint (pt)", cup: "Cup (c)",
    fluid_oz: "Fluid Ounce (fl oz)", cubic_meter: "Cubic Meter (m³)",
    // Speed
    mps: "Meters/sec (m/s)", kph: "Km/hour (km/h)", mph: "Miles/hour (mph)",
    knot: "Knot (kn)", fps: "Feet/sec (ft/s)",
    // Area
    sq_meter: "Sq. Meter (m²)", sq_kilometer: "Sq. Kilometer (km²)",
    sq_foot: "Sq. Foot (ft²)", sq_inch: "Sq. Inch (in²)", sq_yard: "Sq. Yard (yd²)",
    acre: "Acre", hectare: "Hectare (ha)", sq_mile: "Sq. Mile (mi²)",
    // Data
    bit: "Bit (b)", byte: "Byte (B)", kilobyte: "Kilobyte (KB)",
    megabyte: "Megabyte (MB)", gigabyte: "Gigabyte (GB)", terabyte: "Terabyte (TB)",
    // Time
    second: "Second (s)", millisecond: "Millisecond (ms)", microsecond: "Microsecond (μs)",
    minute: "Minute (min)", hour: "Hour (hr)", day: "Day (d)",
    week: "Week (wk)", month: "Month (mo)", year: "Year (yr)",
    // Energy
    joule: "Joule (J)", kilojoule: "Kilojoule (kJ)", calorie: "Calorie (cal)",
    kilocalorie: "Kilocalorie (kcal)", watt_hour: "Watt-hour (Wh)",
    kwh: "Kilowatt-hour (kWh)", btu: "BTU", electronvolt: "Electronvolt (eV)",
    // Pressure
    pascal: "Pascal (Pa)", kilopascal: "Kilopascal (kPa)", megapascal: "Megapascal (MPa)",
    bar: "Bar", millibar: "Millibar (mbar)", atm: "Atmosphere (atm)",
    psi: "PSI (psi)", mmhg: "mmHg (Torr)",
    // Angle
    degree: "Degree (°)", radian: "Radian (rad)", gradian: "Gradian (grad)",
    arcminute: "Arcminute (′)", arcsecond: "Arcsecond (″)", revolution: "Revolution (rev)",
    // Power
    watt: "Watt (W)", kilowatt: "Kilowatt (kW)", megawatt: "Megawatt (MW)",
    horsepower: "Horsepower (hp)", btu_hr: "BTU/hour (BTU/hr)",
    calorie_s: "Calorie/sec (cal/s)", foot_lb_s: "Foot-lb/sec (ft·lb/s)",
    // Cooking
    tsp: "Teaspoon (tsp)", tbsp: "Tablespoon (tbsp)", fl_oz: "Fluid Ounce (fl oz)",
    gallon: "Gallon (gal)", oz_weight: "Ounce weight (oz)",
    // Fuel
    lper100km: "L/100km", mpg_us: "MPG (US)", mpg_uk: "MPG (UK)",
    kml: "km/L", mpl: "Miles/Liter (mi/L)",
    // Shoe
    us_m: "US Men's", us_w: "US Women's", uk: "UK", eu: "EU / FR",
    cm: "CM (foot)", jp: "Japan (cm)",
    // Number base
    decimal: "Decimal (Base 10)", binary: "Binary (Base 2)",
    octal: "Octal (Base 8)", hex: "Hex (Base 16)", base32: "Base 32", base64: "Base 36",
  },

  zh: {
    // Length
    meter: "米 (m)", kilometer: "千米 (km)", centimeter: "厘米 (cm)",
    millimeter: "毫米 (mm)", mile: "英里 (mi)", yard: "码 (yd)",
    foot: "英尺 (ft)", inch: "英寸 (in)", nautical_mile: "海里 (nmi)",
    // Weight
    kilogram: "千克 (kg)", gram: "克 (g)", milligram: "毫克 (mg)",
    pound: "磅 (lb)", ounce: "盎司 (oz)", ton: "公吨 (t)", stone: "英石 (st)",
    // Temperature
    celsius: "摄氏度 (°C)", fahrenheit: "华氏度 (°F)", kelvin: "开尔文 (K)",
    // Volume
    liter: "升 (L)", milliliter: "毫升 (mL)", gallon_us: "美制加仑 (gal)",
    quart: "夸脱 (qt)", pint: "品脱 (pt)", cup: "杯 (c)",
    fluid_oz: "液盎司 (fl oz)", cubic_meter: "立方米 (m³)",
    // Speed
    mps: "米/秒 (m/s)", kph: "千米/时 (km/h)", mph: "英里/时 (mph)",
    knot: "节 (kn)", fps: "英尺/秒 (ft/s)",
    // Area
    sq_meter: "平方米 (m²)", sq_kilometer: "平方千米 (km²)",
    sq_foot: "平方英尺 (ft²)", sq_inch: "平方英寸 (in²)", sq_yard: "平方码 (yd²)",
    acre: "英亩", hectare: "公顷 (ha)", sq_mile: "平方英里 (mi²)",
    // Data
    bit: "比特 (b)", byte: "字节 (B)", kilobyte: "千字节 (KB)",
    megabyte: "兆字节 (MB)", gigabyte: "吉字节 (GB)", terabyte: "太字节 (TB)",
    // Time
    second: "秒 (s)", millisecond: "毫秒 (ms)", microsecond: "微秒 (μs)",
    minute: "分钟 (min)", hour: "小时 (hr)", day: "天 (d)",
    week: "周 (wk)", month: "月 (mo)", year: "年 (yr)",
    // Energy
    joule: "焦耳 (J)", kilojoule: "千焦 (kJ)", calorie: "卡路里 (cal)",
    kilocalorie: "千卡 (kcal)", watt_hour: "瓦时 (Wh)",
    kwh: "千瓦时 (kWh)", btu: "英热单位 (BTU)", electronvolt: "电子伏特 (eV)",
    // Pressure
    pascal: "帕斯卡 (Pa)", kilopascal: "千帕 (kPa)", megapascal: "兆帕 (MPa)",
    bar: "巴 (bar)", millibar: "毫巴 (mbar)", atm: "大气压 (atm)",
    psi: "磅/平方英寸 (psi)", mmhg: "毫米汞柱 (mmHg)",
    // Angle
    degree: "度 (°)", radian: "弧度 (rad)", gradian: "百分度 (grad)",
    arcminute: "角分 (′)", arcsecond: "角秒 (″)", revolution: "转 (rev)",
    // Power
    watt: "瓦特 (W)", kilowatt: "千瓦 (kW)", megawatt: "兆瓦 (MW)",
    horsepower: "马力 (hp)", btu_hr: "英热/时 (BTU/hr)",
    calorie_s: "卡/秒 (cal/s)", foot_lb_s: "英尺磅/秒 (ft·lb/s)",
    // Cooking
    tsp: "茶匙 (tsp)", tbsp: "汤匙 (tbsp)", fl_oz: "液盎司 (fl oz)",
    gallon: "加仑 (gal)", oz_weight: "重量盎司 (oz)",
    // Fuel
    lper100km: "升/百公里", mpg_us: "英里/加仑(美)", mpg_uk: "英里/加仑(英)",
    kml: "公里/升", mpl: "英里/升 (mi/L)",
    // Shoe
    us_m: "美码男款", us_w: "美码女款", uk: "英码", eu: "欧码 / 法码",
    cm: "厘米 (脚长)", jp: "日本码 (cm)",
    // Number base
    decimal: "十进制 (Base 10)", binary: "二进制 (Base 2)",
    octal: "八进制 (Base 8)", hex: "十六进制 (Base 16)", base32: "三十二进制", base64: "三十六进制",
  },

  es: {
    meter: "Metro (m)", kilometer: "Kilómetro (km)", centimeter: "Centímetro (cm)",
    millimeter: "Milímetro (mm)", mile: "Milla (mi)", yard: "Yarda (yd)",
    foot: "Pie (ft)", inch: "Pulgada (in)", nautical_mile: "Milla náutica (nmi)",
    kilogram: "Kilogramo (kg)", gram: "Gramo (g)", milligram: "Miligramo (mg)",
    pound: "Libra (lb)", ounce: "Onza (oz)", ton: "Tonelada métrica (t)", stone: "Stone (st)",
    celsius: "Celsius (°C)", fahrenheit: "Fahrenheit (°F)", kelvin: "Kelvin (K)",
    liter: "Litro (L)", milliliter: "Mililitro (mL)", gallon_us: "Galón US (gal)",
    quart: "Cuarto (qt)", pint: "Pinta (pt)", cup: "Taza (c)",
    fluid_oz: "Onza líquida (fl oz)", cubic_meter: "Metro cúbico (m³)",
    mps: "Metros/seg (m/s)", kph: "Km/hora (km/h)", mph: "Millas/hora (mph)",
    knot: "Nudo (kn)", fps: "Pies/seg (ft/s)",
    sq_meter: "Metro² (m²)", sq_kilometer: "Kilómetro² (km²)",
    sq_foot: "Pie² (ft²)", sq_inch: "Pulgada² (in²)", sq_yard: "Yarda² (yd²)",
    acre: "Acre", hectare: "Hectárea (ha)", sq_mile: "Milla² (mi²)",
    bit: "Bit (b)", byte: "Byte (B)", kilobyte: "Kilobyte (KB)",
    megabyte: "Megabyte (MB)", gigabyte: "Gigabyte (GB)", terabyte: "Terabyte (TB)",
    second: "Segundo (s)", millisecond: "Milisegundo (ms)", microsecond: "Microsegundo (μs)",
    minute: "Minuto (min)", hour: "Hora (hr)", day: "Día (d)",
    week: "Semana (wk)", month: "Mes (mo)", year: "Año (yr)",
    joule: "Julio (J)", kilojoule: "Kilojulio (kJ)", calorie: "Caloría (cal)",
    kilocalorie: "Kilocaloría (kcal)", watt_hour: "Vatio-hora (Wh)",
    kwh: "Kilovatio-hora (kWh)", btu: "BTU", electronvolt: "Electronvoltio (eV)",
    pascal: "Pascal (Pa)", kilopascal: "Kilopascal (kPa)", megapascal: "Megapascal (MPa)",
    bar: "Bar", millibar: "Milibar (mbar)", atm: "Atmósfera (atm)",
    psi: "PSI (psi)", mmhg: "mmHg (Torr)",
    degree: "Grado (°)", radian: "Radián (rad)", gradian: "Gradián (grad)",
    arcminute: "Minuto de arco (′)", arcsecond: "Segundo de arco (″)", revolution: "Revolución (rev)",
    watt: "Vatio (W)", kilowatt: "Kilovatio (kW)", megawatt: "Megavatio (MW)",
    horsepower: "Caballo de vapor (hp)", btu_hr: "BTU/hora (BTU/hr)",
    calorie_s: "Caloría/seg (cal/s)", foot_lb_s: "Pie-lb/seg (ft·lb/s)",
    tsp: "Cucharadita (tsp)", tbsp: "Cucharada (tbsp)", fl_oz: "Onza líquida (fl oz)",
    gallon: "Galón (gal)", oz_weight: "Onza peso (oz)",
    lper100km: "L/100km", mpg_us: "MPG (EE.UU.)", mpg_uk: "MPG (UK)",
    kml: "km/L", mpl: "Millas/Litro (mi/L)",
    us_m: "Talla US Hombre", us_w: "Talla US Mujer", uk: "Talla UK", eu: "Talla EU / FR",
    cm: "CM (pie)", jp: "Talla Japón (cm)",
    decimal: "Decimal (Base 10)", binary: "Binario (Base 2)",
    octal: "Octal (Base 8)", hex: "Hexadecimal (Base 16)", base32: "Base 32", base64: "Base 36",
  },

  fr: {
    meter: "Mètre (m)", kilometer: "Kilomètre (km)", centimeter: "Centimètre (cm)",
    millimeter: "Millimètre (mm)", mile: "Mile (mi)", yard: "Yard (yd)",
    foot: "Pied (ft)", inch: "Pouce (in)", nautical_mile: "Mille marin (nmi)",
    kilogram: "Kilogramme (kg)", gram: "Gramme (g)", milligram: "Milligramme (mg)",
    pound: "Livre (lb)", ounce: "Once (oz)", ton: "Tonne métrique (t)", stone: "Stone (st)",
    celsius: "Celsius (°C)", fahrenheit: "Fahrenheit (°F)", kelvin: "Kelvin (K)",
    liter: "Litre (L)", milliliter: "Millilitre (mL)", gallon_us: "Gallon US (gal)",
    quart: "Quart (qt)", pint: "Pinte (pt)", cup: "Tasse (c)",
    fluid_oz: "Once liquide (fl oz)", cubic_meter: "Mètre cube (m³)",
    mps: "Mètres/sec (m/s)", kph: "Km/heure (km/h)", mph: "Miles/heure (mph)",
    knot: "Nœud (kn)", fps: "Pieds/sec (ft/s)",
    sq_meter: "Mètre² (m²)", sq_kilometer: "Kilomètre² (km²)",
    sq_foot: "Pied² (ft²)", sq_inch: "Pouce² (in²)", sq_yard: "Yard² (yd²)",
    acre: "Acre", hectare: "Hectare (ha)", sq_mile: "Mile² (mi²)",
    bit: "Bit (b)", byte: "Octet (B)", kilobyte: "Kilooctet (KB)",
    megabyte: "Mégaoctet (MB)", gigabyte: "Gigaoctet (GB)", terabyte: "Téraoctet (TB)",
    second: "Seconde (s)", millisecond: "Milliseconde (ms)", microsecond: "Microseconde (μs)",
    minute: "Minute (min)", hour: "Heure (hr)", day: "Jour (d)",
    week: "Semaine (wk)", month: "Mois (mo)", year: "An (yr)",
    joule: "Joule (J)", kilojoule: "Kilojoule (kJ)", calorie: "Calorie (cal)",
    kilocalorie: "Kilocalorie (kcal)", watt_hour: "Watt-heure (Wh)",
    kwh: "Kilowatt-heure (kWh)", btu: "BTU", electronvolt: "Électronvolt (eV)",
    pascal: "Pascal (Pa)", kilopascal: "Kilopascal (kPa)", megapascal: "Mégapascal (MPa)",
    bar: "Bar", millibar: "Millibar (mbar)", atm: "Atmosphère (atm)",
    psi: "PSI (psi)", mmhg: "mmHg (Torr)",
    degree: "Degré (°)", radian: "Radian (rad)", gradian: "Grade (grad)",
    arcminute: "Minute d'arc (′)", arcsecond: "Seconde d'arc (″)", revolution: "Tour (rev)",
    watt: "Watt (W)", kilowatt: "Kilowatt (kW)", megawatt: "Mégawatt (MW)",
    horsepower: "Cheval-vapeur (hp)", btu_hr: "BTU/heure (BTU/hr)",
    calorie_s: "Calorie/sec (cal/s)", foot_lb_s: "Pied-lb/sec (ft·lb/s)",
    tsp: "Cuillère à café (tsp)", tbsp: "Cuillère à soupe (tbsp)", fl_oz: "Once liquide (fl oz)",
    gallon: "Gallon (gal)", oz_weight: "Once poids (oz)",
    lper100km: "L/100km", mpg_us: "MPG (É.-U.)", mpg_uk: "MPG (UK)",
    kml: "km/L", mpl: "Miles/Litre (mi/L)",
    us_m: "Pointure US Homme", us_w: "Pointure US Femme", uk: "Pointure UK", eu: "Pointure EU / FR",
    cm: "CM (pied)", jp: "Pointure Japon (cm)",
    decimal: "Décimal (Base 10)", binary: "Binaire (Base 2)",
    octal: "Octal (Base 8)", hex: "Hexadécimal (Base 16)", base32: "Base 32", base64: "Base 36",
  },

  ru: {
    meter: "Метр (m)", kilometer: "Километр (km)", centimeter: "Сантиметр (cm)",
    millimeter: "Миллиметр (mm)", mile: "Миля (mi)", yard: "Ярд (yd)",
    foot: "Фут (ft)", inch: "Дюйм (in)", nautical_mile: "Морская миля (nmi)",
    kilogram: "Килограмм (kg)", gram: "Грамм (g)", milligram: "Миллиграмм (mg)",
    pound: "Фунт (lb)", ounce: "Унция (oz)", ton: "Метрическая тонна (t)", stone: "Стоун (st)",
    celsius: "Цельсий (°C)", fahrenheit: "Фаренгейт (°F)", kelvin: "Кельвин (K)",
    liter: "Литр (L)", milliliter: "Миллилитр (mL)", gallon_us: "Галлон США (gal)",
    quart: "Кварта (qt)", pint: "Пинта (pt)", cup: "Чашка (c)",
    fluid_oz: "Жидкая унция (fl oz)", cubic_meter: "Кубический метр (m³)",
    mps: "Метры/сек (m/s)", kph: "Км/час (km/h)", mph: "Миль/час (mph)",
    knot: "Узел (kn)", fps: "Футы/сек (ft/s)",
    sq_meter: "Кв. метр (m²)", sq_kilometer: "Кв. километр (km²)",
    sq_foot: "Кв. фут (ft²)", sq_inch: "Кв. дюйм (in²)", sq_yard: "Кв. ярд (yd²)",
    acre: "Акр", hectare: "Гектар (ha)", sq_mile: "Кв. миля (mi²)",
    bit: "Бит (b)", byte: "Байт (B)", kilobyte: "Килобайт (KB)",
    megabyte: "Мегабайт (MB)", gigabyte: "Гигабайт (GB)", terabyte: "Терабайт (TB)",
    second: "Секунда (s)", millisecond: "Миллисекунда (ms)", microsecond: "Микросекунда (μs)",
    minute: "Минута (min)", hour: "Час (hr)", day: "День (d)",
    week: "Неделя (wk)", month: "Месяц (mo)", year: "Год (yr)",
    joule: "Джоуль (J)", kilojoule: "Килоджоуль (kJ)", calorie: "Калория (cal)",
    kilocalorie: "Килокалория (kcal)", watt_hour: "Ватт-час (Wh)",
    kwh: "Киловатт-час (kWh)", btu: "БТЕ (BTU)", electronvolt: "Электронвольт (eV)",
    pascal: "Паскаль (Pa)", kilopascal: "Килопаскаль (kPa)", megapascal: "Мегапаскаль (MPa)",
    bar: "Бар", millibar: "Миллибар (mbar)", atm: "Атмосфера (atm)",
    psi: "PSI (psi)", mmhg: "мм рт.ст. (mmHg)",
    degree: "Градус (°)", radian: "Радиан (rad)", gradian: "Градиан (grad)",
    arcminute: "Угловая минута (′)", arcsecond: "Угловая секунда (″)", revolution: "Оборот (rev)",
    watt: "Ватт (W)", kilowatt: "Киловатт (kW)", megawatt: "Мегаватт (MW)",
    horsepower: "Лошадиная сила (hp)", btu_hr: "БТЕ/час (BTU/hr)",
    calorie_s: "Кал/сек (cal/s)", foot_lb_s: "Фут-фунт/сек (ft·lb/s)",
    tsp: "Чайная ложка (tsp)", tbsp: "Столовая ложка (tbsp)", fl_oz: "Жидкая унция (fl oz)",
    gallon: "Галлон (gal)", oz_weight: "Унция весовая (oz)",
    lper100km: "Л/100км", mpg_us: "Миль/галлон (США)", mpg_uk: "Миль/галлон (UK)",
    kml: "км/л", mpl: "Миль/литр (mi/L)",
    us_m: "Размер США (муж.)", us_w: "Размер США (жен.)", uk: "Размер UK", eu: "Размер EU / FR",
    cm: "СМ (длина ступни)", jp: "Японский размер (cm)",
    decimal: "Десятичная (Base 10)", binary: "Двоичная (Base 2)",
    octal: "Восьмеричная (Base 8)", hex: "Шестнадцатеричная (Base 16)", base32: "Base 32", base64: "Base 36",
  },

  ar: {
    meter: "متر (m)", kilometer: "كيلومتر (km)", centimeter: "سنتيمتر (cm)",
    millimeter: "ميليمتر (mm)", mile: "ميل (mi)", yard: "ياردة (yd)",
    foot: "قدم (ft)", inch: "بوصة (in)", nautical_mile: "ميل بحري (nmi)",
    kilogram: "كيلوغرام (kg)", gram: "غرام (g)", milligram: "ميليغرام (mg)",
    pound: "رطل (lb)", ounce: "أوقية (oz)", ton: "طن متري (t)", stone: "ستون (st)",
    celsius: "مئوية (°C)", fahrenheit: "فهرنهايت (°F)", kelvin: "كلفن (K)",
    liter: "لتر (L)", milliliter: "ميلليلتر (mL)", gallon_us: "غالون أمريكي (gal)",
    quart: "كوارت (qt)", pint: "باينت (pt)", cup: "كوب (c)",
    fluid_oz: "أوقية سائلة (fl oz)", cubic_meter: "متر مكعب (m³)",
    mps: "متر/ثانية (m/s)", kph: "كم/ساعة (km/h)", mph: "ميل/ساعة (mph)",
    knot: "عقدة (kn)", fps: "قدم/ثانية (ft/s)",
    sq_meter: "متر² (m²)", sq_kilometer: "كيلومتر² (km²)",
    sq_foot: "قدم² (ft²)", sq_inch: "بوصة² (in²)", sq_yard: "ياردة² (yd²)",
    acre: "فدان", hectare: "هكتار (ha)", sq_mile: "ميل² (mi²)",
    bit: "بت (b)", byte: "بايت (B)", kilobyte: "كيلوبايت (KB)",
    megabyte: "ميغابايت (MB)", gigabyte: "غيغابايت (GB)", terabyte: "تيرابايت (TB)",
    second: "ثانية (s)", millisecond: "ميليثانية (ms)", microsecond: "ميكروثانية (μs)",
    minute: "دقيقة (min)", hour: "ساعة (hr)", day: "يوم (d)",
    week: "أسبوع (wk)", month: "شهر (mo)", year: "سنة (yr)",
    joule: "جول (J)", kilojoule: "كيلوجول (kJ)", calorie: "سعرة (cal)",
    kilocalorie: "كيلوسعرة (kcal)", watt_hour: "واط-ساعة (Wh)",
    kwh: "كيلوواط-ساعة (kWh)", btu: "وحدة حرارية (BTU)", electronvolt: "إلكترون فولت (eV)",
    pascal: "باسكال (Pa)", kilopascal: "كيلوباسكال (kPa)", megapascal: "ميغاباسكال (MPa)",
    bar: "بار", millibar: "ميليبار (mbar)", atm: "ضغط جوي (atm)",
    psi: "باوند/بوصة² (psi)", mmhg: "ملم زئبق (mmHg)",
    degree: "درجة (°)", radian: "راديان (rad)", gradian: "غراديان (grad)",
    arcminute: "دقيقة قوسية (′)", arcsecond: "ثانية قوسية (″)", revolution: "دورة (rev)",
    watt: "واط (W)", kilowatt: "كيلوواط (kW)", megawatt: "ميغاواط (MW)",
    horsepower: "حصان (hp)", btu_hr: "وحدة حرارية/ساعة (BTU/hr)",
    calorie_s: "سعرة/ثانية (cal/s)", foot_lb_s: "قدم-رطل/ثانية (ft·lb/s)",
    tsp: "ملعقة صغيرة (tsp)", tbsp: "ملعقة كبيرة (tbsp)", fl_oz: "أوقية سائلة (fl oz)",
    gallon: "غالون (gal)", oz_weight: "أوقية وزن (oz)",
    lper100km: "لتر/100كم", mpg_us: "ميل/غالون (أمريكي)", mpg_uk: "ميل/غالون (بريطاني)",
    kml: "كم/لتر", mpl: "ميل/لتر (mi/L)",
    us_m: "مقاس أمريكي رجالي", us_w: "مقاس أمريكي نسائي", uk: "مقاس بريطاني", eu: "مقاس أوروبي",
    cm: "سم (طول القدم)", jp: "مقاس ياباني (cm)",
    decimal: "عشري (Base 10)", binary: "ثنائي (Base 2)",
    octal: "ثماني (Base 8)", hex: "سداسي عشر (Base 16)", base32: "Base 32", base64: "Base 36",
  },
};

export function getUnitLabel(unitKey: string, locale: Locale): string {
  return UNIT_LABELS[locale]?.[unitKey] ?? UNIT_LABELS.en[unitKey] ?? unitKey;
}

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
    fuel: "fuel", currency: "currency",
    cooking: "cooking", shoe: "shoe", numbase: "numbase",
  };
  const key = map[slug];
  return key ? String(t[key]) : slug;
}

// Category full title (e.g. "长度换算器" for zh, "Length Converter" for en)
const CATEGORY_TITLES: Record<Locale, Record<string, string>> = {
  en: {
    length: "Length Converter", weight: "Weight & Mass Converter", temperature: "Temperature Converter",
    volume: "Volume Converter", speed: "Speed Converter", area: "Area Converter",
    data: "Data Storage Converter", time: "Time Converter", energy: "Energy Converter",
    pressure: "Pressure Converter", power: "Power Converter", fuel: "Fuel Efficiency Converter",
    angle: "Angle Converter", cooking: "Cooking Converter", shoe: "Shoe Size Converter",
    numbase: "Number Base Converter",
  },
  zh: {
    length: "长度换算器", weight: "重量换算器", temperature: "温度换算器",
    volume: "体积换算器", speed: "速度换算器", area: "面积换算器",
    data: "数据存储换算器", time: "时间换算器", energy: "能量换算器",
    pressure: "压强换算器", power: "功率换算器", fuel: "油耗换算器",
    angle: "角度换算器", cooking: "烹饪换算器", shoe: "鞋码换算器",
    numbase: "进制换算器",
  },
  es: {
    length: "Conversor de longitud", weight: "Conversor de peso", temperature: "Conversor de temperatura",
    volume: "Conversor de volumen", speed: "Conversor de velocidad", area: "Conversor de área",
    data: "Conversor de almacenamiento", time: "Conversor de tiempo", energy: "Conversor de energía",
    pressure: "Conversor de presión", power: "Conversor de potencia", fuel: "Conversor de combustible",
    angle: "Conversor de ángulo", cooking: "Conversor de cocina", shoe: "Conversor de talla",
    numbase: "Conversor de base numérica",
  },
  fr: {
    length: "Convertisseur de longueur", weight: "Convertisseur de poids", temperature: "Convertisseur de température",
    volume: "Convertisseur de volume", speed: "Convertisseur de vitesse", area: "Convertisseur d'aire",
    data: "Convertisseur de stockage", time: "Convertisseur de temps", energy: "Convertisseur d'énergie",
    pressure: "Convertisseur de pression", power: "Convertisseur de puissance", fuel: "Convertisseur de carburant",
    angle: "Convertisseur d'angle", cooking: "Convertisseur culinaire", shoe: "Convertisseur de pointure",
    numbase: "Convertisseur de base numérique",
  },
  ru: {
    length: "Конвертер длины", weight: "Конвертер веса", temperature: "Конвертер температуры",
    volume: "Конвертер объёма", speed: "Конвертер скорости", area: "Конвертер площади",
    data: "Конвертер хранения данных", time: "Конвертер времени", energy: "Конвертер энергии",
    pressure: "Конвертер давления", power: "Конвертер мощности", fuel: "Конвертер расхода топлива",
    angle: "Конвертер углов", cooking: "Кулинарный конвертер", shoe: "Конвертер размера обуви",
    numbase: "Конвертер систем счисления",
  },
  ar: {
    length: "محوّل الطول", weight: "محوّل الوزن", temperature: "محوّل الحرارة",
    volume: "محوّل الحجم", speed: "محوّل السرعة", area: "محوّل المساحة",
    data: "محوّل التخزين", time: "محوّل الوقت", energy: "محوّل الطاقة",
    pressure: "محوّل الضغط", power: "محوّل القدرة", fuel: "محوّل استهلاك الوقود",
    angle: "محوّل الزوايا", cooking: "محوّل الطبخ", shoe: "محوّل مقاس الحذاء",
    numbase: "محوّل نظام الأعداد",
  },
};

export function getCategoryTitle(slug: string, locale: Locale): string {
  return CATEGORY_TITLES[locale]?.[slug] ?? CATEGORY_TITLES.en[slug] ?? slug;
}
