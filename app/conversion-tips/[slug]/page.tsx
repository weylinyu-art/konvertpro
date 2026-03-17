import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LocaleText } from "@/components/LocaleText";
import { BASE_URL, buildPageAlternates, buildSocialMetadata } from "@/lib/seo";
import ArticleMiniConverter from "@/components/ArticleMiniConverter";
import {
  TIP_MODULES,
  getAllFlatTipArticles,
  getTipArticleBySlug,
  getTipDetailBySlug,
  getTipWidgetPresetBySlug,
} from "@/lib/conversion-tips-data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllFlatTipArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getTipArticleBySlug(params.slug);
  if (!article) return {};
  const detail = getTipDetailBySlug(params.slug);
  const path = `/conversion-tips/${params.slug}`;
  return {
    title: `${article.title.en} | Koverts`,
    description: detail?.overview.en ?? article.summary.en,
    alternates: buildPageAlternates(path),
    ...buildSocialMetadata({
      path,
      title: `${article.title.en} | Koverts`,
      description: detail?.overview.en ?? article.summary.en,
      type: "article",
    }),
  };
}

export default function ConversionTipsArticlePage({ params }: Props) {
  const article = getTipArticleBySlug(params.slug);
  if (!article) notFound();
  const detail = getTipDetailBySlug(params.slug);
  const widgetPreset = getTipWidgetPresetBySlug(params.slug);

  const related = getAllFlatTipArticles()
    .filter((a) => a.slug !== article.slug && a.moduleKey === article.moduleKey)
    .slice(0, 6);
  const relatedCrossModule = getAllFlatTipArticles()
    .filter((a) => a.slug !== article.slug && a.moduleKey !== article.moduleKey)
    .slice(0, 4);

  const module = TIP_MODULES.find((m) => m.key === article.moduleKey);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Conversion Tips", item: `${BASE_URL}/conversion-tips` },
      { "@type": "ListItem", position: 3, name: article.title.en, item: `${BASE_URL}/conversion-tips/${article.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title.en,
    description: detail?.overview.en ?? article.summary.en,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Koverts" },
    publisher: { "@type": "Organization", name: "Koverts" },
    mainEntityOfPage: `${BASE_URL}/conversion-tips/${article.slug}`,
  };

  const faqSchema = detail?.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detail.faq.map((item) => ({
          "@type": "Question",
          name: item.q.en,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a.en,
          },
        })),
      }
    : null;

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}

      <div className="max-w-4xl mx-auto px-6">
        <header className="pt-8">
          <Link href="/conversion-tips" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
            ← <LocaleText en="Back to tips" zh="返回小常识列表" />
          </Link>
        </header>

        <article className="py-10">
          <p className="text-xs font-mono text-[#9a948a] uppercase tracking-[0.1em] mb-3">
            <LocaleText en={module?.title.en ?? "Conversion Tips"} zh={module?.title.zh ?? "换算小常识"} />
          </p>
          <h1 className="text-[clamp(30px,5vw,52px)] font-bold leading-[1.1] tracking-tight mb-5">
            <LocaleText en={article.title.en} zh={article.title.zh} />
          </h1>
          <p className="text-base leading-relaxed text-[#5a554d] mb-8">
            <LocaleText en={detail?.overview.en ?? article.summary.en} zh={detail?.overview.zh ?? article.summary.zh} />
          </p>

          <ArticleMiniConverter
            defaultCategory={widgetPreset.category}
            defaultFrom={widgetPreset.from}
            defaultTo={widgetPreset.to}
            defaultValue={widgetPreset.value}
          />

          {detail ? (
            <div className="space-y-6 text-sm leading-relaxed text-[#4a4540]">
              {detail.sections.map((section, idx) => (
                <section key={idx}>
                  <h2 className="text-lg font-semibold text-[#1a1814] mb-2">
                    <LocaleText en={section.heading.en} zh={section.heading.zh} />
                  </h2>
                  <p>
                    <LocaleText en={section.body.en} zh={section.body.zh} />
                  </p>
                </section>
              ))}
            </div>
          ) : (
            <div className="space-y-4 text-sm leading-relaxed text-[#4a4540]">
              <p>
                <LocaleText
                  en="This article expands one practical conversion theme. You can use it as a quick reference in travel, shopping, engineering, or daily communication."
                  zh="本文围绕一个实用换算主题展开，适合在旅行、购物、工程协作和日常沟通中快速查阅。"
                />
              </p>
              <p>
                <LocaleText
                  en="For high-stakes scenarios, always verify the unit system first (metric vs imperial, mass vs volume, or regional standards) before applying formulas."
                  zh="在高风险场景中，先确认单位体系（公制/英制、质量/体积、地区标准）再套公式，是避免错误的关键。"
                />
              </p>
            </div>
          )}
        </article>

        {detail?.faq ? (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">
              <LocaleText en="FAQ" zh="常见问题" />
            </h2>
            <div className="space-y-2">
              {detail.faq.map((item, idx) => (
                <details key={idx} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                    <span className="font-medium text-sm text-[#1a1814] pr-4">
                      <LocaleText en={item.q.en} zh={item.q.zh} />
                    </span>
                    <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                  </summary>
                  <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                    <LocaleText en={item.a.en} zh={item.a.zh} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-4">
            <LocaleText en="Related articles" zh="相关文章" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/conversion-tips/${item.slug}`} className="bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] transition-colors">
                <p className="font-medium text-sm text-[#1a1814] mb-1">
                  <LocaleText en={item.title.en} zh={item.title.zh} />
                </p>
                <p className="text-xs text-[#6a6460]">
                  <LocaleText en={item.summary.en} zh={item.summary.zh} />
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-4">
            <LocaleText en="Explore other modules" zh="跨模块阅读推荐" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedCrossModule.map((item) => (
              <Link key={item.slug} href={`/conversion-tips/${item.slug}`} className="bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] transition-colors">
                <p className="text-xs text-[#9a948a] mb-1">
                  <LocaleText en={item.moduleTitle.en} zh={item.moduleTitle.zh} />
                </p>
                <p className="font-medium text-sm text-[#1a1814] mb-1">
                  <LocaleText en={item.title.en} zh={item.title.zh} />
                </p>
                <p className="text-xs text-[#6a6460]">
                  <LocaleText en={item.summary.en} zh={item.summary.zh} />
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

