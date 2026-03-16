// lib/indexing.ts
// Centralized indexing strategy for high-value numeric conversion pages

export const NUMERIC_INDEX_VALUES = [1, 10, 100] as const;

export const NUMERIC_INDEX_PAIRS = [
  { category: "length", from: "mile", to: "kilometer" },
  { category: "length", from: "foot", to: "meter" },
  { category: "length", from: "inch", to: "centimeter" },
  { category: "weight", from: "pound", to: "kilogram" },
  { category: "weight", from: "ounce", to: "gram" },
  { category: "temperature", from: "fahrenheit", to: "celsius" },
  { category: "volume", from: "cup", to: "milliliter" },
  { category: "volume", from: "gallon_us", to: "liter" },
  { category: "speed", from: "mph", to: "kph" },
] as const;

