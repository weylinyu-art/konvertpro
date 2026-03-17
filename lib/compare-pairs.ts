import type { Locale } from "@/lib/i18n";

export interface ComparePair {
  slug: string;
  category: string;
  a: string;
  b: string;
  title: string;
  description: string;
}

// Multilingual descriptions for compare pair cards (slug -> locale -> text)
export const COMPARE_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "celsius-vs-fahrenheit": { en: "The two most common temperature scales explained and compared.", zh: "两种最常用温标的说明与对比。", es: "Las dos escalas de temperatura más usadas, explicadas y comparadas.", fr: "Les deux échelles de température les plus courantes expliquées et comparées.", ru: "Две самые распространённые шкалы температуры — объяснение и сравнение.", ar: "المقياسان الأكثر شيوعًا لدرجة الحرارة، شرح ومقارنة." },
  "celsius-vs-kelvin": { en: "How Celsius and Kelvin relate and when to use each.", zh: "摄氏度与开尔文的关系及适用场景。", es: "Cómo se relacionan Celsius y Kelvin y cuándo usar cada uno.", fr: "Relation entre Celsius et Kelvin et quand utiliser chacune.", ru: "Связь Цельсия и Кельвина и когда что использовать.", ar: "علاقة الدرجة المئوية بكلفن ومتى تستخدم كلًا منهما." },
  "kg-vs-lbs": { en: "Metric vs imperial weight units compared.", zh: "公制与英制重量单位对照。", es: "Kilogramos vs libras — unidades métricas e imperiales comparadas.", fr: "Unités métriques vs impériales pour le poids comparées.", ru: "Метрические и имперские единицы веса в сравнении.", ar: "وحدات الوزن المترية والإمبراطورية — مقارنة." },
  "oz-vs-grams": { en: "Ounces and grams side by side for cooking and more.", zh: "盎司与克的对照，适用于烹饪等场景。", es: "Onzas y gramos comparados para cocinar y más.", fr: "Onces et grammes comparés pour la cuisine et plus.", ru: "Унции и граммы — сравнение для кулинарии и не только.", ar: "أونصات وغرامات جنبًا إلى جنب للطبخ وأكثر." },
  "miles-vs-kilometers": { en: "Miles and kilometers compared with conversion reference.", zh: "英里与千米对照及换算参考。", es: "Millas y kilómetros comparados con referencia de conversión.", fr: "Miles et kilomètres comparés avec référence de conversion.", ru: "Мили и километры — сравнение и таблица перевода.", ar: "مقارنة الأميال والكيلومترات مع مرجع التحويل." },
  "feet-vs-meters": { en: "Imperial feet vs metric meters explained.", zh: "英尺与米的对照说明。", es: "Pies imperiales vs metros métricos explicados.", fr: "Pieds impériaux vs mètres métriques expliqués.", ru: "Имперские футы и метрические метры — объяснение.", ar: "قدم إمبراطوري مقابل متر — شرح." },
  "inches-vs-centimeters": { en: "Inches and centimeters compared for everyday use.", zh: "英寸与厘米的日常对照。", es: "Pulgadas y centímetros comparados para uso diario.", fr: "Pouces et centimètres comparés pour un usage quotidien.", ru: "Дюймы и сантиметры — сравнение для повседневного использования.", ar: "مقارنة البوصات والسنتيمترات للاستخدام اليومي." },
  "cups-vs-ml": { en: "US cups vs milliliters for cooking and baking.", zh: "美制杯与毫升的烹饪烘焙对照。", es: "Tazas US vs mililitros para cocinar y hornear.", fr: "Tasses US vs millilitres pour la cuisine et la pâtisserie.", ru: "Чашки US и миллилитры — для готовки и выпечки.", ar: "أكواب أمريكية مقابل ميلي لتر للطبخ والخبز." },
  "gallons-vs-liters": { en: "Gallons and liters compared for fuel and liquids.", zh: "加仑与升的燃油与液体对照。", es: "Galones y litros comparados para combustible y líquidos.", fr: "Gallons et litres comparés pour carburant et liquides.", ru: "Галлоны и литры — сравнение для топлива и жидкостей.", ar: "مقارنة الجالونات واللترات للوقود والسوائل." },
  "mph-vs-kmh": { en: "Miles per hour vs kilometers per hour — full comparison.", zh: "英里/时与千米/时的完整对照。", es: "Millas por hora vs kilómetros por hora — comparación completa.", fr: "Miles/h vs km/h — comparaison complète.", ru: "Миль/ч и км/ч — полное сравнение.", ar: "ميل/س مقابل كم/س — مقارنة شاملة." },
  "acres-vs-hectares": { en: "Acres and hectares compared for land measurement.", zh: "英亩与公顷的土地面积对照。", es: "Acres y hectáreas comparados para medición de tierras.", fr: "Acres et hectares comparés pour la mesure des terrains.", ru: "Акры и гектары — сравнение для измерения земли.", ar: "مقارنة الأفدنة والهكتارات لقياس الأراضي." },
  "mb-vs-gb": { en: "Megabytes vs gigabytes — storage size explained.", zh: "兆字节与吉字节的存储大小说明。", es: "Megabytes vs gigabytes — tamaño de almacenamiento explicado.", fr: "Mo vs Go — taille de stockage expliquée.", ru: "МБ и ГБ — объяснение объёма хранения.", ar: "ميغابايت مقابل جيجابايت — شرح حجم التخزين." },
  "gb-vs-tb": { en: "Gigabytes vs terabytes — when do you need more storage?", zh: "吉字节与太字节——何时需要更大存储？", es: "Gigabytes vs terabytes — ¿cuándo necesitas más almacenamiento?", fr: "Go vs To — quand faut-il plus de stockage?", ru: "ГБ и ТБ — когда нужен больший объём?", ar: "جيجابايت مقابل تيرابايت — متى تحتاج تخزينًا أكبر؟" },
};

export function getCompareDescription(slug: string, locale: Locale): string {
  return COMPARE_DESCRIPTIONS[slug]?.[locale] ?? COMPARE_PAIRS.find((p) => p.slug === slug)?.description ?? "";
}

// Curated high-search-volume compare pairs
export const COMPARE_PAIRS: ComparePair[] = [
  // Temperature
  { slug: "celsius-vs-fahrenheit", category: "temperature", a: "celsius", b: "fahrenheit", title: "Celsius vs Fahrenheit", description: "The two most common temperature scales explained and compared." },
  { slug: "celsius-vs-kelvin", category: "temperature", a: "celsius", b: "kelvin", title: "Celsius vs Kelvin", description: "How Celsius and Kelvin relate and when to use each." },
  // Weight
  { slug: "kg-vs-lbs", category: "weight", a: "kilogram", b: "pound", title: "Kilograms vs Pounds", description: "Metric vs imperial weight units compared." },
  { slug: "oz-vs-grams", category: "weight", a: "ounce", b: "gram", title: "Ounces vs Grams", description: "Ounces and grams side by side for cooking and more." },
  // Length
  { slug: "miles-vs-kilometers", category: "length", a: "mile", b: "kilometer", title: "Miles vs Kilometers", description: "Miles and kilometers compared with conversion reference." },
  { slug: "feet-vs-meters", category: "length", a: "foot", b: "meter", title: "Feet vs Meters", description: "Imperial feet vs metric meters explained." },
  { slug: "inches-vs-centimeters", category: "length", a: "inch", b: "centimeter", title: "Inches vs Centimeters", description: "Inches and centimeters compared for everyday use." },
  // Volume
  { slug: "cups-vs-ml", category: "volume", a: "cup", b: "milliliter", title: "Cups vs Milliliters", description: "US cups vs milliliters for cooking and baking." },
  { slug: "gallons-vs-liters", category: "volume", a: "gallon_us", b: "liter", title: "Gallons vs Liters", description: "Gallons and liters compared for fuel and liquids." },
  // Speed
  { slug: "mph-vs-kmh", category: "speed", a: "mph", b: "kph", title: "MPH vs KM/H", description: "Miles per hour vs kilometers per hour — full comparison." },
  // Area
  { slug: "acres-vs-hectares", category: "area", a: "acre", b: "hectare", title: "Acres vs Hectares", description: "Acres and hectares compared for land measurement." },
  // Data
  { slug: "mb-vs-gb", category: "data", a: "megabyte", b: "gigabyte", title: "MB vs GB", description: "Megabytes vs gigabytes — storage size explained." },
  { slug: "gb-vs-tb", category: "data", a: "gigabyte", b: "terabyte", title: "GB vs TB", description: "Gigabytes vs terabytes — when do you need more storage?" },
];

