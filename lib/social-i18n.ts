import type { Locale } from "@/lib/i18n";

type SocialKind =
  | "home"
  | "about"
  | "currency"
  | "ai"
  | "ai-tool"
  | "compare"
  | "compare-detail"
  | "category"
  | "conversion";

interface SocialContext {
  kind: SocialKind;
  categoryLabel?: string;
  fromLabel?: string;
  toLabel?: string;
  toolSlug?: string;
  compareFromLabel?: string;
  compareToLabel?: string;
  conversionValueText?: string;
}

const COPY: Record<Locale, Record<SocialKind, { title: string; description: string }>> = {
  en: {
    home: { title: "Koverts - Convert Any Unit in Seconds", description: "From miles to km and currency to AI tools. Fast results, no signup." },
    about: { title: "About Koverts - Fast Converters, Zero Friction", description: "See how Koverts delivers instant unit, currency, and AI conversions." },
    currency: { title: "Currency Converter - Live Rates in Seconds", description: "Convert major currencies instantly with fresh ECB rates." },
    ai: { title: "AI Utility Tools for Developers | Koverts", description: "Estimate tokens, model memory, API cost, and context windows." },
    "ai-tool": { title: "AI Tool | Koverts", description: "Practical AI calculator with instant results." },
    compare: { title: "Unit Comparison Hub | Koverts", description: "Popular unit comparisons, formulas, and quick conversion tables." },
    "compare-detail": { title: "Unit Comparison | Koverts", description: "Difference, formula, and quick side-by-side values." },
    category: { title: "Unit Converter | Koverts", description: "Convert units instantly with practical examples and tables." },
    conversion: { title: "Instant Conversion | Koverts", description: "Get a direct conversion answer with formula and reference table." },
  },
  zh: {
    home: { title: "Koverts - 秒级单位换算工具", description: "长度、重量、温度、汇率与 AI 工具，一站式快速换算。" },
    about: { title: "关于 Koverts - 快速、清爽、好用", description: "了解 Koverts 如何提供即时换算体验，无注册、无干扰。" },
    currency: { title: "汇率换算器 - 实时汇率秒查", description: "基于 ECB 数据，主流货币实时换算，打开即用。" },
    ai: { title: "AI 开发工具集 | Koverts", description: "支持 Token、显存、API 成本与上下文窗口估算。" },
    "ai-tool": { title: "AI 工具 | Koverts", description: "实用 AI 计算工具，结果即时可用。" },
    compare: { title: "单位对比中心 | Koverts", description: "常见单位差异、公式与对照表一页看全。" },
    "compare-detail": { title: "单位对比详情 | Koverts", description: "快速查看差异、换算关系与实用参考值。" },
    category: { title: "单位换算器 | Koverts", description: "覆盖多类单位，输入即得结果，附表格与示例。" },
    conversion: { title: "即时换算结果 | Koverts", description: "直接答案 + 公式 + 对照表，分享更清晰。" },
  },
  es: {
    home: { title: "Koverts - Convierte cualquier unidad al instante", description: "Unidades, divisas y herramientas IA en una experiencia rápida." },
    about: { title: "Sobre Koverts - Conversión rápida y limpia", description: "Descubre cómo Koverts ofrece conversiones instantáneas sin registro." },
    currency: { title: "Conversor de divisas - Tasas en tiempo real", description: "Convierte divisas principales al instante con datos del BCE." },
    ai: { title: "Herramientas de IA para desarrolladores | Koverts", description: "Calcula tokens, memoria, coste API y ventana de contexto." },
    "ai-tool": { title: "Herramienta de IA | Koverts", description: "Calculadora práctica de IA con resultados instantáneos." },
    compare: { title: "Centro de comparación de unidades | Koverts", description: "Comparaciones populares con fórmulas y tablas rápidas." },
    "compare-detail": { title: "Comparación de unidades | Koverts", description: "Diferencias, fórmula y valores lado a lado." },
    category: { title: "Conversor de unidades | Koverts", description: "Convierte unidades al instante con ejemplos y tablas." },
    conversion: { title: "Conversión instantánea | Koverts", description: "Respuesta directa, fórmula y tabla de referencia." },
  },
  fr: {
    home: { title: "Koverts - Convertissez n'importe quelle unité instantanément", description: "Unités, devises et outils IA dans une interface rapide." },
    about: { title: "À propos de Koverts - Rapide et sans friction", description: "Comment Koverts fournit des conversions instantanées sans inscription." },
    currency: { title: "Convertisseur de devises - Taux en direct", description: "Convertissez les principales devises avec les taux BCE." },
    ai: { title: "Outils IA pour développeurs | Koverts", description: "Estimez tokens, mémoire, coût API et fenêtre de contexte." },
    "ai-tool": { title: "Outil IA | Koverts", description: "Calculateur IA pratique avec résultats immédiats." },
    compare: { title: "Centre de comparaison d'unités | Koverts", description: "Comparaisons populaires avec formules et tableaux rapides." },
    "compare-detail": { title: "Comparaison d'unités | Koverts", description: "Différences, formule et valeurs côte à côte." },
    category: { title: "Convertisseur d'unités | Koverts", description: "Conversion instantanée avec exemples et tableaux." },
    conversion: { title: "Conversion instantanée | Koverts", description: "Réponse directe, formule et tableau de référence." },
  },
  ru: {
    home: { title: "Koverts - Мгновенный конвертер единиц", description: "Единицы, валюты и AI-инструменты в одном быстром сервисе." },
    about: { title: "О проекте Koverts - Быстро и без лишнего", description: "Как Koverts делает конвертацию мгновенной и удобной." },
    currency: { title: "Конвертер валют - Курсы в реальном времени", description: "Мгновенная конвертация популярных валют по данным ЕЦБ." },
    ai: { title: "AI-инструменты для разработчиков | Koverts", description: "Токены, память модели, стоимость API и контекстное окно." },
    "ai-tool": { title: "AI-инструмент | Koverts", description: "Практичный AI-калькулятор с быстрым результатом." },
    compare: { title: "Центр сравнений единиц | Koverts", description: "Популярные сравнения единиц, формулы и таблицы." },
    "compare-detail": { title: "Сравнение единиц | Koverts", description: "Разница, формула и значения в одной таблице." },
    category: { title: "Конвертер единиц | Koverts", description: "Мгновенная конвертация с примерами и таблицами." },
    conversion: { title: "Мгновенная конвертация | Koverts", description: "Прямой ответ, формула и справочная таблица." },
  },
  ar: {
    home: { title: "Koverts - تحويل أي وحدة خلال ثوانٍ", description: "تحويل الوحدات والعملات وأدوات الذكاء الاصطناعي بسرعة وسهولة." },
    about: { title: "حول Koverts - سريع وواضح", description: "تعرّف كيف يقدّم Koverts تحويلات فورية بدون تسجيل." },
    currency: { title: "محول العملات - أسعار مباشرة", description: "تحويل العملات الرئيسية فورًا باستخدام بيانات البنك المركزي الأوروبي." },
    ai: { title: "أدوات ذكاء اصطناعي للمطورين | Koverts", description: "تقدير الرموز وذاكرة النموذج وتكلفة API وسعة السياق." },
    "ai-tool": { title: "أداة ذكاء اصطناعي | Koverts", description: "آلة حاسبة عملية للذكاء الاصطناعي بنتائج فورية." },
    compare: { title: "مركز مقارنة الوحدات | Koverts", description: "مقارنات شائعة مع الصيغ والجداول السريعة." },
    "compare-detail": { title: "مقارنة الوحدات | Koverts", description: "الفروقات والصيغة والقيم جنبًا إلى جنب." },
    category: { title: "محول وحدات | Koverts", description: "تحويل فوري للوحدات مع أمثلة وجداول." },
    conversion: { title: "تحويل فوري | Koverts", description: "إجابة مباشرة مع الصيغة وجدول مرجعي." },
  },
};

const TOOL_TITLE_I18N: Record<string, Record<Locale, string>> = {
  "token-calculator": {
    en: "Token Calculator",
    zh: "Token 计算器",
    es: "Calculadora de tokens",
    fr: "Calculateur de tokens",
    ru: "Калькулятор токенов",
    ar: "حاسبة الرموز",
  },
  "model-size": {
    en: "Model Size Estimator",
    zh: "模型显存估算",
    es: "Estimador de memoria del modelo",
    fr: "Estimateur de mémoire modèle",
    ru: "Оценка памяти модели",
    ar: "تقدير ذاكرة النموذج",
  },
  "api-cost": {
    en: "API Cost Calculator",
    zh: "API 成本计算",
    es: "Calculadora de coste API",
    fr: "Calculateur de coût API",
    ru: "Калькулятор стоимости API",
    ar: "حاسبة تكلفة API",
  },
  "context-window": {
    en: "Context Window",
    zh: "上下文窗口",
    es: "Ventana de contexto",
    fr: "Fenêtre de contexte",
    ru: "Контекстное окно",
    ar: "نافذة السياق",
  },
  "compute-units": {
    en: "Compute Unit Converter",
    zh: "算力单位换算",
    es: "Conversor de unidades de cómputo",
    fr: "Convertisseur d'unités de calcul",
    ru: "Конвертер вычислительных единиц",
    ar: "محول وحدات القدرة الحاسوبية",
  },
};

export function getLocalizedSocialCopy(locale: Locale, context: SocialContext) {
  const pack = COPY[locale][context.kind];
  if (context.kind === "category" && context.categoryLabel) {
    return {
      title: `${context.categoryLabel} | Koverts`,
      description: pack.description,
    };
  }
  if (context.kind === "conversion" && context.fromLabel && context.toLabel) {
    return {
      title: `${context.fromLabel} → ${context.toLabel} | Koverts`,
      description: context.conversionValueText ? `${context.conversionValueText}. ${pack.description}` : pack.description,
    };
  }
  if (context.kind === "ai-tool" && context.toolSlug) {
    const localizedToolTitle = TOOL_TITLE_I18N[context.toolSlug]?.[locale] ?? TOOL_TITLE_I18N[context.toolSlug]?.en;
    return {
      title: `${localizedToolTitle ?? pack.title} | Koverts`,
      description: pack.description,
    };
  }
  if (context.kind === "compare-detail" && context.compareFromLabel && context.compareToLabel) {
    return {
      title: `${context.compareFromLabel} vs ${context.compareToLabel} | Koverts`,
      description: pack.description,
    };
  }
  return pack;
}

