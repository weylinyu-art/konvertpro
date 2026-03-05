# Konvert — Unit Converter

A clean, SEO-optimized unit converter built with Next.js 14 + Tailwind CSS.

## Project Structure

```
konvert/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design tokens + global styles
│   ├── sitemap.ts              # Auto-generated sitemap (all URLs)
│   └── [category]/
│       ├── page.tsx            # /length, /weight, /temperature …
│       └── [conversion]/
│           └── page.tsx        # /length/miles-to-kilometers …
├── components/
│   └── ConverterWidget.tsx     # Interactive client component
├── lib/
│   └── units.ts                # All unit data + conversion logic
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## URL Structure (SEO)

| URL | Page |
|-----|------|
| `/` | Homepage with all categories |
| `/length` | Length category with all unit links |
| `/length/miles-to-kilometers` | Specific conversion with table + content |

7 categories × ~56 conversions = **~400 indexed pages** from day one.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel            # follow prompts, deploys in ~60 seconds
```

## Adding New Categories

Edit `lib/units.ts` — add a new entry to `CATEGORIES`. All pages, sitemap, and navigation update automatically.

## Monetization

- **Google AdSense**: Add script to `app/layout.tsx`
- **Affiliate**: Add relevant product links to conversion pages
- **API**: Expose `/api/convert?from=mile&to=km&val=5` (route stub ready)
