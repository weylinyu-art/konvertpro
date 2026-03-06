// app/currency/metadata.ts
// Static metadata for currency page (separate from client component)
import type { Metadata } from "next";

const BASE_URL = "https://koverts.com";

export const metadata: Metadata = {
  title: "Currency Converter — Real-Time Exchange Rates",
  description: "Convert between 32 currencies with real-time exchange rates. USD to EUR, CNY to USD, GBP to JPY and more. Free, instant, no signup. Data from European Central Bank.",
  keywords: [
    "currency converter", "exchange rate", "USD to EUR", "USD to CNY",
    "real-time exchange rate", "free currency converter", "forex calculator",
    "dollar to euro", "dollar to yuan", "pound to dollar",
  ],
  alternates: { canonical: `${BASE_URL}/currency` },
  openGraph: {
    title: "Currency Converter — Real-Time Exchange Rates | Koverts",
    description: "Convert between 32 currencies with live ECB exchange rates. Free, instant, no signup.",
    url: `${BASE_URL}/currency`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.svg`, width: 1200, height: 630, alt: "Koverts Currency Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Converter — Real-Time Exchange Rates",
    description: "32 currencies, live ECB rates. Free, no signup.",
    images: [`${BASE_URL}/og-image.svg`],
  },
};

// FAQ schema for currency page
export const currencyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How often are exchange rates updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exchange rates are sourced from the European Central Bank (ECB) via the Frankfurter API and updated daily on business days. Rates are fetched in real-time each time you open the page.",
      },
    },
    {
      "@type": "Question",
      "name": "Which currencies does Koverts support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Koverts supports 32 major world currencies including USD, EUR, GBP, CNY, JPY, KRW, HKD, CAD, AUD, CHF, SGD, INR, and more.",
      },
    },
    {
      "@type": "Question",
      "name": "Are the exchange rates accurate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rates are sourced from the European Central Bank, which is one of the most authoritative sources for foreign exchange reference rates. However, actual transaction rates from banks may differ slightly.",
      },
    },
    {
      "@type": "Question",
      "name": "Is the currency converter free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Koverts currency converter is completely free. No account, subscription, or signup required.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the base currency for calculations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can select any currency as your base. The converter fetches the direct exchange rate between your chosen currency pair from the ECB.",
      },
    },
    {
      "@type": "Question",
      "name": "Does Koverts support cryptocurrency conversion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently Koverts focuses on traditional fiat currencies from the ECB dataset. Cryptocurrency support may be added in the future.",
      },
    },
  ],
};
