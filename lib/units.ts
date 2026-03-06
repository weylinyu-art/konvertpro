// lib/units.ts
// Central data store for all unit categories, units, and conversion logic

export type UnitKey = string;

export interface UnitDef {
  label: string;
  factor?: number;
}

export interface Category {
  slug: string;
  label: string;
  icon: string;
  title: string;
  baseUnit: string;
  units: Record<UnitKey, UnitDef>;
  popular: Array<{ from: UnitKey; to: UnitKey; val: number }>;
  description: string;
}

export const CATEGORIES: Record<string, Category> = {

  // ── ORIGINAL 7 ──────────────────────────────────────────────────────────────

  length: {
    slug: "length", label: "Length", icon: "📏", title: "Length Converter",
    baseUnit: "meter",
    description: "Convert between meters, kilometers, miles, feet, inches and more length units instantly.",
    units: {
      meter:        { label: "Meter (m)",          factor: 1 },
      kilometer:    { label: "Kilometer (km)",      factor: 1000 },
      centimeter:   { label: "Centimeter (cm)",     factor: 0.01 },
      millimeter:   { label: "Millimeter (mm)",     factor: 0.001 },
      mile:         { label: "Mile (mi)",           factor: 1609.344 },
      yard:         { label: "Yard (yd)",           factor: 0.9144 },
      foot:         { label: "Foot (ft)",           factor: 0.3048 },
      inch:         { label: "Inch (in)",           factor: 0.0254 },
      nautical_mile:{ label: "Nautical Mile (nmi)", factor: 1852 },
    },
    popular: [
      { from: "mile",      to: "kilometer",  val: 1 },
      { from: "foot",      to: "meter",      val: 1 },
      { from: "inch",      to: "centimeter", val: 1 },
      { from: "kilometer", to: "mile",       val: 1 },
    ],
  },

  weight: {
    slug: "weight", label: "Weight", icon: "⚖️", title: "Weight & Mass Converter",
    baseUnit: "kilogram",
    description: "Convert between kilograms, pounds, ounces, grams, stones and more weight units.",
    units: {
      kilogram:  { label: "Kilogram (kg)",   factor: 1 },
      gram:      { label: "Gram (g)",        factor: 0.001 },
      milligram: { label: "Milligram (mg)",  factor: 0.000001 },
      pound:     { label: "Pound (lb)",      factor: 0.453592 },
      ounce:     { label: "Ounce (oz)",      factor: 0.0283495 },
      ton:       { label: "Metric Ton (t)",  factor: 1000 },
      stone:     { label: "Stone (st)",      factor: 6.35029 },
    },
    popular: [
      { from: "pound",    to: "kilogram", val: 1 },
      { from: "kilogram", to: "pound",    val: 1 },
      { from: "ounce",    to: "gram",     val: 1 },
      { from: "ton",      to: "kilogram", val: 1 },
    ],
  },

  temperature: {
    slug: "temperature", label: "Temperature", icon: "🌡️", title: "Temperature Converter",
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
    slug: "volume", label: "Volume", icon: "🧪", title: "Volume Converter",
    baseUnit: "liter",
    description: "Convert between liters, gallons, milliliters, cups, fluid ounces and more.",
    units: {
      liter:       { label: "Liter (L)",           factor: 1 },
      milliliter:  { label: "Milliliter (mL)",      factor: 0.001 },
      gallon_us:   { label: "Gallon US (gal)",      factor: 3.78541 },
      quart:       { label: "Quart (qt)",           factor: 0.946353 },
      pint:        { label: "Pint (pt)",            factor: 0.473176 },
      cup:         { label: "Cup (c)",              factor: 0.236588 },
      fluid_oz:    { label: "Fluid Ounce (fl oz)",  factor: 0.0295735 },
      cubic_meter: { label: "Cubic Meter (m³)",     factor: 1000 },
    },
    popular: [
      { from: "gallon_us", to: "liter",      val: 1 },
      { from: "liter",     to: "gallon_us",  val: 1 },
      { from: "cup",       to: "milliliter", val: 1 },
      { from: "fluid_oz",  to: "milliliter", val: 1 },
    ],
  },

  speed: {
    slug: "speed", label: "Speed", icon: "⚡", title: "Speed Converter",
    baseUnit: "mps",
    description: "Convert between km/h, mph, m/s, knots and other speed units.",
    units: {
      mps:  { label: "Meters/sec (m/s)", factor: 1 },
      kph:  { label: "Km/hour (km/h)",   factor: 0.277778 },
      mph:  { label: "Miles/hour (mph)", factor: 0.44704 },
      knot: { label: "Knot (kn)",        factor: 0.514444 },
      fps:  { label: "Feet/sec (ft/s)",  factor: 0.3048 },
    },
    popular: [
      { from: "mph",  to: "kph", val: 60 },
      { from: "kph",  to: "mph", val: 100 },
      { from: "knot", to: "kph", val: 1 },
      { from: "mph",  to: "mps", val: 1 },
    ],
  },

  area: {
    slug: "area", label: "Area", icon: "⬛", title: "Area Converter",
    baseUnit: "sq_meter",
    description: "Convert between square meters, acres, hectares, square feet and more area units.",
    units: {
      sq_meter:     { label: "Sq. Meter (m²)",    factor: 1 },
      sq_kilometer: { label: "Sq. Kilometer (km²)",factor: 1e6 },
      sq_foot:      { label: "Sq. Foot (ft²)",    factor: 0.092903 },
      sq_inch:      { label: "Sq. Inch (in²)",    factor: 0.00064516 },
      sq_yard:      { label: "Sq. Yard (yd²)",    factor: 0.836127 },
      acre:         { label: "Acre",              factor: 4046.86 },
      hectare:      { label: "Hectare (ha)",      factor: 10000 },
      sq_mile:      { label: "Sq. Mile (mi²)",    factor: 2.59e6 },
    },
    popular: [
      { from: "acre",    to: "sq_meter",     val: 1 },
      { from: "hectare", to: "acre",         val: 1 },
      { from: "sq_foot", to: "sq_meter",     val: 100 },
      { from: "sq_mile", to: "sq_kilometer", val: 1 },
    ],
  },

  data: {
    slug: "data", label: "Data", icon: "💾", title: "Data Size Converter",
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

  // ── NEW 5 ───────────────────────────────────────────────────────────────────

  time: {
    slug: "time", label: "Time", icon: "⏱️", title: "Time Converter",
    baseUnit: "second",
    description: "Convert between seconds, minutes, hours, days, weeks, months and years instantly.",
    units: {
      second:      { label: "Second (s)",      factor: 1 },
      millisecond: { label: "Millisecond (ms)", factor: 0.001 },
      microsecond: { label: "Microsecond (μs)", factor: 0.000001 },
      minute:      { label: "Minute (min)",    factor: 60 },
      hour:        { label: "Hour (hr)",       factor: 3600 },
      day:         { label: "Day (d)",         factor: 86400 },
      week:        { label: "Week (wk)",       factor: 604800 },
      month:       { label: "Month (mo)",      factor: 2629800 },   // average
      year:        { label: "Year (yr)",       factor: 31557600 },  // 365.25 days
    },
    popular: [
      { from: "hour",   to: "minute", val: 1 },
      { from: "day",    to: "hour",   val: 1 },
      { from: "week",   to: "day",    val: 1 },
      { from: "year",   to: "day",    val: 1 },
    ],
  },

  energy: {
    slug: "energy", label: "Energy", icon: "🔋", title: "Energy Converter",
    baseUnit: "joule",
    description: "Convert between joules, calories, kilowatt-hours, BTU and more energy units.",
    units: {
      joule:       { label: "Joule (J)",             factor: 1 },
      kilojoule:   { label: "Kilojoule (kJ)",        factor: 1000 },
      calorie:     { label: "Calorie (cal)",         factor: 4.184 },
      kilocalorie: { label: "Kilocalorie (kcal)",    factor: 4184 },
      watt_hour:   { label: "Watt-hour (Wh)",        factor: 3600 },
      kwh:         { label: "Kilowatt-hour (kWh)",   factor: 3600000 },
      btu:         { label: "BTU",                   factor: 1055.06 },
      electronvolt:{ label: "Electronvolt (eV)",     factor: 1.60218e-19 },
    },
    popular: [
      { from: "kilocalorie", to: "kilojoule", val: 1 },
      { from: "kwh",         to: "kilojoule", val: 1 },
      { from: "calorie",     to: "joule",     val: 100 },
      { from: "btu",         to: "kilojoule", val: 1 },
    ],
  },

  pressure: {
    slug: "pressure", label: "Pressure", icon: "💧", title: "Pressure Converter",
    baseUnit: "pascal",
    description: "Convert between pascal, bar, PSI, atm, mmHg and more pressure units.",
    units: {
      pascal:      { label: "Pascal (Pa)",       factor: 1 },
      kilopascal:  { label: "Kilopascal (kPa)",  factor: 1000 },
      megapascal:  { label: "Megapascal (MPa)",  factor: 1000000 },
      bar:         { label: "Bar",               factor: 100000 },
      millibar:    { label: "Millibar (mbar)",   factor: 100 },
      atm:         { label: "Atmosphere (atm)",  factor: 101325 },
      psi:         { label: "PSI (psi)",         factor: 6894.76 },
      mmhg:        { label: "mmHg (Torr)",       factor: 133.322 },
    },
    popular: [
      { from: "psi",  to: "bar",        val: 1 },
      { from: "bar",  to: "psi",        val: 1 },
      { from: "atm",  to: "pascal",     val: 1 },
      { from: "psi",  to: "kilopascal", val: 14.7 },
    ],
  },

  angle: {
    slug: "angle", label: "Angle", icon: "📐", title: "Angle Converter",
    baseUnit: "degree",
    description: "Convert between degrees, radians, gradians and other angle units.",
    units: {
      degree:     { label: "Degree (°)",      factor: 1 },
      radian:     { label: "Radian (rad)",    factor: 180 / Math.PI },
      gradian:    { label: "Gradian (grad)",  factor: 0.9 },
      arcminute:  { label: "Arcminute (′)",   factor: 1/60 },
      arcsecond:  { label: "Arcsecond (″)",   factor: 1/3600 },
      revolution: { label: "Revolution (rev)",factor: 360 },
    },
    popular: [
      { from: "degree", to: "radian",  val: 180 },
      { from: "radian", to: "degree",  val: 1 },
      { from: "degree", to: "gradian", val: 90 },
      { from: "degree", to: "arcminute", val: 1 },
    ],
  },

  power: {
    slug: "power", label: "Power", icon: "💡", title: "Power Converter",
    baseUnit: "watt",
    description: "Convert between watts, kilowatts, horsepower, BTU/hr and more power units.",
    units: {
      watt:       { label: "Watt (W)",            factor: 1 },
      kilowatt:   { label: "Kilowatt (kW)",        factor: 1000 },
      megawatt:   { label: "Megawatt (MW)",        factor: 1000000 },
      horsepower: { label: "Horsepower (hp)",      factor: 745.7 },
      btu_hr:     { label: "BTU/hour (BTU/hr)",    factor: 0.293071 },
      calorie_s:  { label: "Calorie/sec (cal/s)",  factor: 4.184 },
      foot_lb_s:  { label: "Foot-lb/sec (ft·lb/s)",factor: 1.35582 },
    },
    popular: [
      { from: "horsepower", to: "kilowatt", val: 1 },
      { from: "kilowatt",   to: "horsepower", val: 1 },
      { from: "watt",       to: "kilowatt",  val: 1000 },
      { from: "megawatt",   to: "kilowatt",  val: 1 },
    ],
  },

  // ── NEW HIGH-TRAFFIC 4 ───────────────────────────────────────────────────────

  cooking: {
    slug: "cooking", label: "Cooking", icon: "🍳", title: "Cooking Measurement Converter",
    baseUnit: "ml",
    description: "Convert cups to ml, tablespoons to teaspoons, ounces to grams and more cooking measurements.",
    units: {
      ml:        { label: "Milliliter (ml)",    factor: 1 },
      liter:     { label: "Liter (L)",          factor: 1000 },
      tsp:       { label: "Teaspoon (tsp)",      factor: 4.92892 },
      tbsp:      { label: "Tablespoon (tbsp)",   factor: 14.7868 },
      fl_oz:     { label: "Fluid Ounce (fl oz)", factor: 29.5735 },
      cup:       { label: "Cup (cup)",           factor: 236.588 },
      pint:      { label: "Pint (pt)",           factor: 473.176 },
      quart:     { label: "Quart (qt)",          factor: 946.353 },
      gallon:    { label: "Gallon (gal)",        factor: 3785.41 },
      gram:      { label: "Gram (g)",            factor: 1 },       // special: used for dry
      oz_weight: { label: "Ounce weight (oz)",   factor: 28.3495 }, // special: dry ounce
      pound:     { label: "Pound (lb)",          factor: 453.592 },
    },
    popular: [
      { from: "cup",  to: "ml",   val: 1 },
      { from: "tbsp", to: "tsp",  val: 1 },
      { from: "fl_oz",to: "ml",   val: 1 },
      { from: "cup",  to: "tbsp", val: 1 },
    ],
  },

  fuel: {
    slug: "fuel", label: "Fuel", icon: "⛽", title: "Fuel Consumption Converter",
    baseUnit: "lper100km",
    description: "Convert between MPG, L/100km, km/L and other fuel economy and consumption units.",
    units: {
      lper100km: { label: "L/100km",           factor: 1 },
      mpg_us:    { label: "MPG (US)",           factor: 235.215 },  // stored as reciprocal factor
      mpg_uk:    { label: "MPG (UK)",           factor: 282.481 },
      kml:       { label: "km/L",               factor: 100 },      // km/L = 100/L/100km
      mpl:       { label: "Miles/Liter (mi/L)", factor: 62.1371 },
    },
    popular: [
      { from: "mpg_us",    to: "lper100km", val: 30 },
      { from: "lper100km", to: "mpg_us",    val: 8  },
      { from: "kml",       to: "mpg_us",    val: 15 },
      { from: "mpg_uk",    to: "mpg_us",    val: 40 },
    ],
  },

  shoe: {
    slug: "shoe", label: "Shoe Size", icon: "👟", title: "Shoe Size Converter",
    baseUnit: "us_m",
    description: "Convert shoe sizes between US, UK, EU, CM and other international sizing systems.",
    units: {
      us_m:  { label: "US Men's",    factor: 1 },
      us_w:  { label: "US Women's",  factor: 1.5 },       // Women's = Men's + 1.5
      uk:    { label: "UK",          factor: -0.5 },      // UK = US - 0.5 (offset handled below)
      eu:    { label: "EU / FR",     factor: 33.5 },      // EU = US + 33.5 (offset)
      cm:    { label: "CM (foot)",   factor: 0.6667 },    // rough: US = (cm - 14.7) / 0.6667
      jp:    { label: "Japan (cm)",  factor: 0.6667 },
    },
    popular: [
      { from: "us_m", to: "eu",   val: 9  },
      { from: "eu",   to: "us_m", val: 42 },
      { from: "us_w", to: "eu",   val: 8  },
      { from: "us_m", to: "uk",   val: 10 },
    ],
  },

  numbase: {
    slug: "numbase", label: "Number Base", icon: "🔢", title: "Number Base Converter",
    baseUnit: "decimal",
    description: "Convert between decimal, binary, hexadecimal, octal and other number bases.",
    units: {
      decimal: { label: "Decimal (Base 10)", factor: 1 },
      binary:  { label: "Binary (Base 2)",   factor: 2 },
      octal:   { label: "Octal (Base 8)",    factor: 8 },
      hex:     { label: "Hex (Base 16)",     factor: 16 },
      base32:  { label: "Base 32",           factor: 32 },
      base64:  { label: "Base 36",           factor: 36 },
    },
    popular: [
      { from: "decimal", to: "binary",  val: 255 },
      { from: "binary",  to: "decimal", val: 1010 },
      { from: "decimal", to: "hex",     val: 255 },
      { from: "hex",     to: "decimal", val: 255 },
    ],
  },

};

// ── Conversion engine ────────────────────────────────────────────────────────

function convertTemp(val: number, from: UnitKey, to: UnitKey): number {
  let celsius: number;
  if (from === "celsius")     celsius = val;
  else if (from === "fahrenheit") celsius = (val - 32) * 5 / 9;
  else celsius = val - 273.15;

  if (to === "celsius")    return celsius;
  if (to === "fahrenheit") return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}

// Fuel: reciprocal conversion (L/100km ↔ MPG)
function convertFuel(val: number, from: UnitKey, to: UnitKey): number {
  // Convert everything to L/100km first, then to target
  const toLper100km: Record<string, (v: number) => number> = {
    lper100km: (v) => v,
    mpg_us:    (v) => 235.215 / v,
    mpg_uk:    (v) => 282.481 / v,
    kml:       (v) => 100 / v,
    mpl:       (v) => 62.1371 / v,
  };
  const fromLper100km: Record<string, (v: number) => number> = {
    lper100km: (v) => v,
    mpg_us:    (v) => 235.215 / v,
    mpg_uk:    (v) => 282.481 / v,
    kml:       (v) => 100 / v,
    mpl:       (v) => 62.1371 / v,
  };
  const base = toLper100km[from]?.(val) ?? val;
  return fromLper100km[to]?.(base) ?? base;
}

// Shoe: offset-based conversion
function convertShoe(val: number, from: UnitKey, to: UnitKey): number {
  // Convert to US Men's first
  const toUSMen: Record<string, (v: number) => number> = {
    us_m: (v) => v,
    us_w: (v) => v - 1.5,
    uk:   (v) => v + 0.5,
    eu:   (v) => v - 33.5,
    cm:   (v) => (v - 14.7) / 0.6667,
    jp:   (v) => (v - 14.7) / 0.6667,
  };
  const fromUSMen: Record<string, (v: number) => number> = {
    us_m: (v) => v,
    us_w: (v) => v + 1.5,
    uk:   (v) => v - 0.5,
    eu:   (v) => v + 33.5,
    cm:   (v) => v * 0.6667 + 14.7,
    jp:   (v) => v * 0.6667 + 14.7,
  };
  const base = toUSMen[from]?.(val) ?? val;
  return fromUSMen[to]?.(base) ?? base;
}

// Number base conversion
function convertNumbase(val: number, from: UnitKey, to: UnitKey): number {
  const baseMap: Record<string, number> = {
    decimal: 10, binary: 2, octal: 8, hex: 16, base32: 32, base64: 36,
  };
  const fromBase = baseMap[from] ?? 10;
  const toBase   = baseMap[to]   ?? 10;
  // Parse from source base then convert to decimal
  const decVal = parseInt(String(Math.floor(val)), fromBase);
  if (isNaN(decVal)) return NaN;
  if (toBase === 10) return decVal;
  // Return as decimal number representing the target base string
  return parseInt(decVal.toString(toBase), 10);
}

export function convert(val: number, from: UnitKey, to: UnitKey, categorySlug: string): number {
  if (from === to) return val;
  const cat = CATEGORIES[categorySlug];
  if (!cat) throw new Error(`Unknown category: ${categorySlug}`);
  if (categorySlug === "temperature") return convertTemp(val, from, to);
  if (categorySlug === "fuel")        return convertFuel(val, from, to);
  if (categorySlug === "shoe")        return convertShoe(val, from, to);
  if (categorySlug === "numbase")     return convertNumbase(val, from, to);
  const fromFactor = cat.units[from]?.factor ?? 1;
  const toFactor   = cat.units[to]?.factor   ?? 1;
  return (val * fromFactor) / toFactor;
}

// ── URL helpers ───────────────────────────────────────────────────────────────

export const unitToSlug = (u: UnitKey) => u.replace(/_/g, "-");
export const slugToUnit = (s: string)  => s.replace(/-/g, "_");

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
