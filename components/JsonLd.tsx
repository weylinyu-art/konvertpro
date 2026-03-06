// components/JsonLd.tsx
// Injects JSON-LD structured data into the page <head>
// Used for FAQ, HowTo, Dataset, and SoftwareApplication schemas

interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
