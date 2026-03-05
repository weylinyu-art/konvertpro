// lib/seo-content.ts
// Static SEO content for conversion pages.
// Add more entries using the same structure — key format: "category/from-to"

export interface ConversionContent {
  fromDesc: string;    // What is the "from" unit?
  toDesc: string;      // What is the "to" unit?
  uses: string[];      // Common real-world uses
  quickTip: string;    // A memorable mental shortcut
  funFact?: string;    // Optional interesting fact
}

const content: Record<string, ConversionContent> = {

  // ── LENGTH ──────────────────────────────────────────────────────────────────

  "length/mile-to-kilometer": {
    fromDesc: "The mile is a unit of length used primarily in the United States and United Kingdom. One mile equals 5,280 feet or 1,760 yards, originating from the Roman 'mille passuum' (thousand paces).",
    toDesc: "The kilometer is the standard unit of distance in the metric system, used by most countries worldwide. It equals 1,000 meters and is the go-to unit for road distances outside the US and UK.",
    uses: [
      "Road distances and speed limits in the US and UK",
      "Running and cycling race distances",
      "Aviation and GPS navigation",
      "Converting US road signs when traveling abroad",
    ],
    quickTip: "A quick mental estimate: multiply miles by 1.6 to get kilometers. For example, 10 miles ≈ 16 km.",
    funFact: "The marathon distance of 26.2 miles is exactly 42.195 kilometers.",
  },

  "length/kilometer-to-mile": {
    fromDesc: "The kilometer (km) is the primary unit for measuring road distances in most countries. It is part of the International System of Units (SI) and equals 1,000 meters.",
    toDesc: "The mile is used for road distances in the United States, United Kingdom, and a few other countries. It equals approximately 1.609 kilometers.",
    uses: [
      "Converting European road signs to miles for US drivers",
      "Understanding international race distances",
      "Speed conversion between km/h and mph",
    ],
    quickTip: "Divide kilometers by 1.6 (or multiply by 0.6) to get a quick mile estimate. So 100 km ≈ 60 miles.",
    funFact: "The US is one of only three countries that still officially uses miles — alongside Liberia and Myanmar.",
  },

  "length/foot-to-meter": {
    fromDesc: "The foot (ft) is an imperial unit of length equal to 12 inches. It remains widely used in the United States for everyday measurements like height, room dimensions, and altitude.",
    toDesc: "The meter (m) is the base unit of length in the metric system. It is defined as the distance light travels in a vacuum in 1/299,792,458 of a second.",
    uses: [
      "Converting US building dimensions to metric",
      "Aviation altitude (feet) to metric systems",
      "Human height conversion for international contexts",
      "Construction and architecture across different regions",
    ],
    quickTip: "One foot is roughly 30 centimeters (exactly 30.48 cm). So 10 feet ≈ 3 meters.",
  },

  "length/inch-to-centimeter": {
    fromDesc: "The inch (in) is an imperial unit equal to 1/12 of a foot. It is used for screen sizes, paper sizes, and small measurements in the US and UK.",
    toDesc: "The centimeter (cm) is 1/100 of a meter and is used globally for everyday measurements like clothing sizes, screen dimensions, and height.",
    uses: [
      "TV and monitor screen size conversions",
      "International clothing and shoe sizing",
      "Tire and wheel diameter specifications",
      "Engineering and technical drawings",
    ],
    quickTip: "1 inch = 2.54 cm exactly. To estimate, multiply inches by 2.5 for a quick approximation.",
    funFact: "The inch was historically defined as the width of a human thumb — which is why it varies slightly by country in old texts.",
  },

  // ── WEIGHT ──────────────────────────────────────────────────────────────────

  "weight/pound-to-kilogram": {
    fromDesc: "The pound (lb) is an imperial unit of mass used in the United States and United Kingdom. One pound equals 16 ounces and is commonly used for body weight and food portions.",
    toDesc: "The kilogram (kg) is the base unit of mass in the metric system. It is the most widely used unit for body weight and food measurement outside the US.",
    uses: [
      "Body weight conversion for international travel",
      "Food and recipe ingredient conversions",
      "Gym and fitness equipment weight settings",
      "Shipping and postal weight limits",
    ],
    quickTip: "Divide pounds by 2.2 to get kilograms. So 150 lbs ÷ 2.2 ≈ 68 kg.",
    funFact: "The kilogram was the last SI base unit still defined by a physical object (a platinum-iridium cylinder in Paris) until 2019.",
  },

  "weight/kilogram-to-pound": {
    fromDesc: "The kilogram (kg) is the standard unit of mass in the metric system, used by most countries for body weight, food, and commerce.",
    toDesc: "The pound (lb) is used primarily in the US and UK for body weight, food, and everyday measurements. One pound equals approximately 0.453 kilograms.",
    uses: [
      "Understanding US weight references in media",
      "Converting body weight for US doctors or gyms",
      "Food package weight conversion",
      "Sports weight classes (boxing, wrestling, etc.)",
    ],
    quickTip: "Multiply kilograms by 2.2 to get pounds. So 70 kg × 2.2 ≈ 154 lbs.",
  },

  "weight/ounce-to-gram": {
    fromDesc: "The ounce (oz) is an imperial unit of mass equal to 1/16 of a pound. It is widely used in cooking, food packaging, and precious metal trading in the US.",
    toDesc: "The gram (g) is 1/1000 of a kilogram and is used globally in cooking, nutrition labels, and scientific measurements.",
    uses: [
      "Recipe conversions between US and international cookbooks",
      "Nutrition label comparison across countries",
      "Coffee and tea measurement for brewing",
      "Precious metal and gemstone weight",
    ],
    quickTip: "1 ounce ≈ 28 grams. A useful cooking shorthand: 4 oz ≈ 113g, 8 oz ≈ 227g.",
  },

  // ── TEMPERATURE ─────────────────────────────────────────────────────────────

  "temperature/celsius-to-fahrenheit": {
    fromDesc: "Celsius (°C) is the standard temperature scale used in most countries and all scientific contexts. Water freezes at 0°C and boils at 100°C.",
    toDesc: "Fahrenheit (°F) is used primarily in the United States. Water freezes at 32°F and boils at 212°F.",
    uses: [
      "Understanding US weather forecasts",
      "Cooking with American recipes",
      "Medical temperature readings in US hospitals",
      "Oven temperature conversion for baking",
    ],
    quickTip: "A quick estimate: double the Celsius value and add 30. So 20°C → 40+30 = 70°F (actual: 68°F). Close enough for weather!",
    funFact: "The two scales cross at exactly -40°: -40°C = -40°F.",
  },

  "temperature/fahrenheit-to-celsius": {
    fromDesc: "Fahrenheit (°F) is the temperature scale used in the United States. It was proposed by physicist Daniel Gabriel Fahrenheit in 1724.",
    toDesc: "Celsius (°C) is the metric temperature scale used worldwide. It was designed around the freezing and boiling points of water.",
    uses: [
      "Converting US weather reports for international visitors",
      "Understanding body temperature (98.6°F = 37°C)",
      "Reading American recipes in metric kitchens",
    ],
    quickTip: "Subtract 32, then divide by 2 for a rough estimate. So 72°F → (72-32)/2 = 20°C (actual: 22.2°C).",
    funFact: "Normal human body temperature is 98.6°F (37°C) — one of the most commonly converted temperature values.",
  },

  // ── VOLUME ──────────────────────────────────────────────────────────────────

  "volume/gallon_us-to-liter": {
    fromDesc: "The US gallon is a unit of volume used in the United States. It equals 4 quarts, 8 pints, or 128 fluid ounces. Note that the US gallon differs from the UK (imperial) gallon.",
    toDesc: "The liter (L) is the standard unit of volume in the metric system, used worldwide for liquids including fuel, beverages, and cooking.",
    uses: [
      "Fuel economy conversion (mpg vs L/100km)",
      "Understanding US fuel prices when traveling",
      "Large beverage container comparisons",
      "Pool and tank volume calculations",
    ],
    quickTip: "1 US gallon ≈ 3.8 liters. A useful shortcut: multiply gallons by 4, then subtract 5% for a quick estimate.",
    funFact: "A US gallon is about 20% smaller than a UK (imperial) gallon — always check which gallon is being used!",
  },

  "volume/cup-to-milliliter": {
    fromDesc: "The cup is a US cooking measurement equal to 8 fluid ounces or half a pint. It is one of the most common units in American recipes.",
    toDesc: "The milliliter (mL) is 1/1000 of a liter and is the standard unit for liquid volume in metric recipes, medicine dosages, and nutrition labels worldwide.",
    uses: [
      "Adapting US recipes to metric measurements",
      "Measuring liquid medicine doses",
      "Coffee and tea brewing ratios",
      "Baking with international recipe books",
    ],
    quickTip: "1 cup = 240 mL exactly. Half a cup = 120 mL, quarter cup = 60 mL — easy to remember in multiples.",
  },

  // ── SPEED ────────────────────────────────────────────────────────────────────

  "speed/mph-to-kph": {
    fromDesc: "Miles per hour (mph) is the standard speed unit in the United States and United Kingdom, used for road speed limits, vehicle speedometers, and weather wind speeds.",
    toDesc: "Kilometers per hour (km/h) is the standard speed unit in most countries worldwide, used for road signs, vehicle speeds, and wind measurements.",
    uses: [
      "Reading speed limits when driving abroad",
      "Understanding international weather reports",
      "Sports statistics (baseball pitch speed, tennis serve speed)",
      "Converting vehicle speedometers",
    ],
    quickTip: "Multiply mph by 1.6 to get km/h. Common reference: 60 mph = 96 km/h, 100 mph = 161 km/h.",
    funFact: "Formula 1 cars reach over 370 km/h (230 mph) on straight sections — the top speed record is 397 km/h (247 mph).",
  },

  "speed/kph-to-mph": {
    fromDesc: "Kilometers per hour (km/h) is the metric unit for speed used in most countries for road travel, weather, and sports.",
    toDesc: "Miles per hour (mph) is used in the US and UK for road speed, vehicle performance, and weather reporting.",
    uses: [
      "Converting international speed limits for US/UK drivers",
      "Understanding European car specifications",
      "Wind speed in weather reports",
    ],
    quickTip: "Divide km/h by 1.6 (or multiply by 0.6) for a quick mph estimate. So 120 km/h ÷ 1.6 = 75 mph.",
  },

  // ── AREA ─────────────────────────────────────────────────────────────────────

  "area/acre-to-sq_meter": {
    fromDesc: "The acre is a unit of land area used in the US, UK, and other countries. One acre is equivalent to 43,560 square feet and was historically the area a yoke of oxen could plow in a day.",
    toDesc: "The square meter (m²) is the SI unit of area, used worldwide for everything from room sizes to land parcels.",
    uses: [
      "Real estate listings conversion (US to international)",
      "Agricultural land measurement",
      "National park and nature reserve sizes",
      "Golf course area descriptions",
    ],
    quickTip: "1 acre ≈ 4,047 m². A rough mental image: one acre is roughly the size of an American football field.",
    funFact: "Central Park in New York City covers about 843 acres (341 hectares).",
  },

  "area/hectare-to-acre": {
    fromDesc: "The hectare (ha) is the standard metric unit for land area, equal to 10,000 square meters or 100 × 100 meters. It is used in agriculture, forestry, and real estate worldwide.",
    toDesc: "The acre is the traditional unit of land measurement in the US and UK, equal to 43,560 square feet.",
    uses: [
      "International farmland comparisons",
      "Forestry and conservation area conversions",
      "Real estate for international buyers",
    ],
    quickTip: "1 hectare ≈ 2.47 acres. A simple rule: multiply hectares by 2.5 for a quick acre estimate.",
  },

  // ── DATA ─────────────────────────────────────────────────────────────────────

  "data/gigabyte-to-megabyte": {
    fromDesc: "The gigabyte (GB) is a unit of digital storage equal to 1,024 megabytes. It is the standard size reference for phone storage, RAM, and file downloads.",
    toDesc: "The megabyte (MB) is a unit of digital information equal to 1,024 kilobytes. It is commonly used for file sizes, email attachments, and app sizes.",
    uses: [
      "Understanding phone and computer storage capacity",
      "Estimating how many files fit on a drive",
      "Comparing internet data plan allowances",
      "Video and photo file size reference",
    ],
    quickTip: "1 GB = 1,024 MB. A 1-minute HD video is roughly 100–200 MB, so 1 GB holds about 5–10 minutes of HD footage.",
    funFact: "A typical smartphone photo is 3–5 MB, meaning 1 GB can store roughly 200–300 photos.",
  },

  "data/megabyte-to-kilobyte": {
    fromDesc: "The megabyte (MB) is commonly used for file sizes, app sizes, and email attachments. 1 MB = 1,024 kilobytes.",
    toDesc: "The kilobyte (KB) is one of the smallest practical units of digital storage, equal to 1,024 bytes. It is used for small files like text documents and images.",
    uses: [
      "Understanding small file sizes",
      "Web page size optimization",
      "Email attachment size limits",
    ],
    quickTip: "1 MB = 1,024 KB. A plain text document is typically 10–50 KB, while a high-resolution image is 500 KB–5 MB.",
  },
};

export function getConversionContent(
  category: string,
  from: string,
  to: string
): ConversionContent | null {
  const key = `${category}/${from}-to-${to}`;
  return content[key] ?? null;
}
