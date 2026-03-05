// lib/units.ts
// Central data store for all unit categories, units, and conversion logic

export type UnitKey = string;

export interface UnitDef {
  label: string;       // Display name e.g. "Kilometer (km)"
  factor?: number;     // Multiply by this to get base unit (temperature uses custom logic)
}

export interface Category {
  slug: string;
  label: string;
  icon: string;
  title: string;
  baseUnit: string;    // The reference unit (factor = 1)
  units: Record<UnitKey, UnitDef>;
  popular: Array<{ from: UnitKey; to: UnitKey; val: number }>;
  description: string; // Used for SEO meta description
}

export const CATEGORIES: Record<string, Category> = {
  length: {
    slug: "length",
    label: "Length",
    icon: "📏",
    title: "Length Converter",
    baseUnit: "meter",
    description: "Convert between meters, kilometers, miles, feet, inches and more length units instantly.",
    units: {
      meter:        { label: "Meter (m)",         factor: 1 },
      kilometer:    { label: "Kilometer (km)",     factor: 1000 },
      centimeter:   { label: "Centimeter (cm)",    factor: 0.01 },
      millimeter:   { label: "Millimeter (mm)",    factor: 0.001 },
      mile:         { label: "Mile (mi)",          factor: 1609.344 },
      yard:         { label: "Yard (yd)",          factor: 0.9144 },
      foot:         { label: "Foot (ft)",          factor: 0.3048 },
      inch:         { label: "Inch (in)",          factor: 0.0254 },
      nautical_mile:{ label: "Nautical Mile (nmi)",factor: 1852 },
    },
    popular: [
      { from: "mile",      to: "kilometer", val: 1 },
      { from: "foot",      to: "meter",     val: 1 },
      { from: "inch",      to: "centimeter",val: 1 },
      { from: "kilometer", to: "mile",      val: 1 },
    ],
  },

  weight: {
    slug: "weight",
    label: "Weight",
    icon: "⚖️",
    title: "Weight & Mass Converter",
    baseUnit: "kilogram",
    description: "Convert between kilograms, pounds, ounces, grams, stones and more weight units.",
    units: {
      kilogram:  { label: "Kilogram (kg)",     factor: 1 },
      gram:      { label: "Gram (g)",          factor: 0.001 },
      milligram: { label: "Milligram (mg)",    factor: 0.000001 },
      pound:     { label: "Pound (lb)",        factor: 0.453592 },
      ounce:     { label: "Ounce (oz)",        factor: 0.0283495 },
      ton:       { label: "Metric Ton (t)",    factor: 1000 },
      stone:     { label: "Stone (st)",        factor: 6.35029 },
    },
    popular: [
      { from: "pound",    to: "kilogram", val: 1 },
      { from: "kilogram", to: "pound",    val: 1 },
      { from: "ounce",    to: "gram",     val: 1 },
      { from: "ton",      to: "kilogram", val: 1 },
    ],
  },

  temperature: {
    slug: "temperature",
    label: "Temperature",
    icon: "🌡️",
    title: "Temperature Converter",
    baseUnit: "celsius",
    description: "Convert between Celsius, Fahrenheit and Kelvin temperature scales.",
    units: {
      celsius:    { label: "Celsius (°C)" },
      fahrenheit: { label: "Fahrenheit (°F)" },
      kelvin:     { label: "Kelvin (K)" },
    },
    popular: [
      { from: "celsius",    to: "fahrenheit", val: 100 },
      { from: "fahrenheit", to: "celsius",    val: 32 },
      { from: "celsius",    to: "kelvin",     val: 0 },
      { from: "kelvin",     to: "celsius",    val: 273.15 },
    ],
  },

  volume: {
    slug: "volume",
    label: "Volume",
    icon: "🧪",
    title: "Volume Converter",
    baseUnit: "liter",
    description: "Convert between liters, gallons, milliliters, cups, fluid ounces and more.",
    units: {
      liter:      { label: "Liter (L)",          factor: 1 },
      milliliter: { label: "Milliliter (mL)",     factor: 0.001 },
      gallon_us:  { label: "Gallon US (gal)",     factor: 3.78541 },
      quart:      { label: "Quart (qt)",          factor: 0.946353 },
      pint:       { label: "Pint (pt)",           factor: 0.473176 },
      cup:        { label: "Cup (c)",             factor: 0.236588 },
      fluid_oz:   { label: "Fluid Ounce (fl oz)", factor: 0.0295735 },
      cubic_meter:{ label: "Cubic Meter (m³)",    factor: 1000 },
    },
    popular: [
      { from: "gallon_us", to: "liter",      val: 1 },
      { from: "liter",     to: "gallon_us",  val: 1 },
      { from: "cup",       to: "milliliter", val: 1 },
      { from: "fluid_oz",  to: "milliliter", val: 1 },
    ],
  },

  speed: {
    slug: "speed",
    label: "Speed",
    icon: "⚡",
    title: "Speed Converter",
    baseUnit: "mps",
    description: "Convert between km/h, mph, m/s, knots and other speed units.",
    units: {
      mps:  { label: "Meters/sec (m/s)",  factor: 1 },
      kph:  { label: "Km/hour (km/h)",    factor: 0.277778 },
      mph:  { label: "Miles/hour (mph)",  factor: 0.44704 },
      knot: { label: "Knot (kn)",         factor: 0.514444 },
      fps:  { label: "Feet/sec (ft/s)",   factor: 0.3048 },
    },
    popular: [
      { from: "mph",  to: "kph", val: 60 },
      { from: "kph",  to: "mph", val: 100 },
      { from: "knot", to: "kph", val: 1 },
      { from: "mph",  to: "mps", val: 1 },
    ],
  },

  area: {
    slug: "area",
    label: "Area",
    icon: "⬛",
    title: "Area Converter",
    baseUnit: "sq_meter",
    description: "Convert between square meters, acres, hectares, square feet and more area units.",
    units: {
      sq_meter:    { label: "Sq. Meter (m²)",   factor: 1 },
      sq_kilometer:{ label: "Sq. Kilometer (km²)",factor: 1e6 },
      sq_foot:     { label: "Sq. Foot (ft²)",   factor: 0.092903 },
      sq_inch:     { label: "Sq. Inch (in²)",   factor: 0.00064516 },
      sq_yard:     { label: "Sq. Yard (yd²)",   factor: 0.836127 },
      acre:        { label: "Acre",             factor: 4046.86 },
      hectare:     { label: "Hectare (ha)",     factor: 10000 },
      sq_mile:     { label: "Sq. Mile (mi²)",   factor: 2.59e6 },
    },
    popular: [
      { from: "acre",      to: "sq_meter",    val: 1 },
      { from: "hectare",   to: "acre",        val: 1 },
      { from: "sq_foot",   to: "sq_meter",    val: 100 },
      { from: "sq_mile",   to: "sq_kilometer",val: 1 },
    ],
  },

  data: {
    slug: "data",
    label: "Data",
    icon: "💾",
    title: "Data Size Converter",
    baseUnit: "byte",
    description: "Convert between bytes, kilobytes, megabytes, gigabytes and terabytes.",
    units: {
      bit:      { label: "Bit (b)",       factor: 0.125 },
      byte:     { label: "Byte (B)",      factor: 1 },
      kilobyte: { label: "Kilobyte (KB)", factor: 1024 },
      megabyte: { label: "Megabyte (MB)", factor: 1048576 },
      gigabyte: { label: "Gigabyte (GB)", factor: 1073741824 },
      terabyte: { label: "Terabyte (TB)", factor: 1099511627776 },
    },
    popular: [
      { from: "megabyte", to: "kilobyte", val: 1 },
      { from: "gigabyte", to: "megabyte", val: 1 },
      { from: "terabyte", to: "gigabyte", val: 1 },
      { from: "gigabyte", to: "byte",     val: 1 },
    ],
  },
};

// ─── Conversion engine ────────────────────────────────────────────────────────

function convertTemp(val: number, from: UnitKey, to: UnitKey): number {
  let celsius: number;
  if (from === "celsius")    celsius = val;
  else if (from === "fahrenheit") celsius = (val - 32) * 5 / 9;
  else celsius = val - 273.15; // kelvin

  if (to === "celsius")    return celsius;
  if (to === "fahrenheit") return celsius * 9 / 5 + 32;
  return celsius + 273.15; // kelvin
}

export function convert(
  val: number,
  from: UnitKey,
  to: UnitKey,
  categorySlug: string
): number {
  if (from === to) return val;
  const cat = CATEGORIES[categorySlug];
  if (!cat) throw new Error(`Unknown category: ${categorySlug}`);

  if (categorySlug === "temperature") return convertTemp(val, from, to);

  const fromFactor = cat.units[from]?.factor ?? 1;
  const toFactor   = cat.units[to]?.factor   ?? 1;
  return (val * fromFactor) / toFactor;
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

/** "mile" → "mile", "nautical_mile" → "nautical-mile" */
export const unitToSlug = (u: UnitKey) => u.replace(/_/g, "-");
export const slugToUnit = (s: string)  => s.replace(/-/g, "_");

/** Get short symbol from label: "Kilometer (km)" → "km" */
export function getSymbol(unitKey: UnitKey, categorySlug: string): string {
  const label = CATEGORIES[categorySlug]?.units[unitKey]?.label ?? unitKey;
  const match = label.match(/\(([^)]+)\)/);
  return match ? match[1] : label;
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  if (Math.abs(n) < 1e-6) return n.toExponential(4);
  if (Number.isInteger(n)) return n.toLocaleString("en");
  return parseFloat(n.toPrecision(8)).toLocaleString("en", { maximumFractionDigits: 6 });
}

// ─── Static path generation helpers ──────────────────────────────────────────

/** All [category, from-to] pairs for generateStaticParams */
export function getAllConversionPaths() {
  const paths: { category: string; conversion: string }[] = [];
  for (const [catSlug, cat] of Object.entries(CATEGORIES)) {
    const unitKeys = Object.keys(cat.units);
    for (const from of unitKeys) {
      for (const to of unitKeys) {
        if (from !== to) {
          paths.push({
            category: catSlug,
            conversion: `${unitToSlug(from)}-to-${unitToSlug(to)}`,
          });
        }
      }
    }
  }
  return paths;
}
