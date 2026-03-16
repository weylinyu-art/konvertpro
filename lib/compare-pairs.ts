export interface ComparePair {
  slug: string;
  category: string;
  a: string;
  b: string;
  title: string;
  description: string;
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

