import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { articles, getArticle } from "@/app/lib/articles";
import { getService } from "@/app/lib/services";
import { absoluteUrl, SITE_NAME, whatsappMessage } from "@/app/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = `/blog/${article.slug}`;
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.metaDescription,
      url: path,
      publishedTime: "2026-08-01T00:00:00+03:00",
      modifiedTime: "2026-08-01T00:00:00+03:00",
      authors: [SITE_NAME],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const service = getService(article.relatedServiceSlug);
  const path = `/blog/${article.slug}`;
  const relatedArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(path)}#article`,
      headline: article.title,
      description: article.metaDescription,
      url: absoluteUrl(path),
      mainEntityOfPage: absoluteUrl(path),
      inLanguage: "ar-SA",
      datePublished: "2026-08-01T00:00:00+03:00",
      dateModified: "2026-08-01T00:00:00+03:00",
      author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
      publisher: { "@type": "Organization", "@id": `${absoluteUrl()}#business`, name: SITE_NAME },
      about: service?.title ?? article.category,
      image: absoluteUrl("/og-card.svg"),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "دليل المقاولات", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(path) },
      ],
    },
  ];

  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "دليل المقاولات", href: "/blog" }, { name: article.title }]} />

      <header className="page-hero">
        <div className="container article-header" data-reveal>
          <span className="eyebrow">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="article-byline">
            <span><Icon name="clock" size={17} /> {article.readingTime}</span>
            <span><Icon name="building" size={17} /> إعداد {SITE_NAME}</span>
            <span><Icon name="location" size={17} /> سياق الخدمة: الرياض</span>
            <span>آخر مراجعة: أغسطس 2026</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container content-layout">
          <article className="prose article-prose">
            {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {article.sections.map((section, index) => (
              <section className="article-section" id={`section-${index + 1}`} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && (
                  <ul className="article-points">
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <div className="lead-box">
              <p>خلاصة عملية: جهّز المخططات والصور والأسئلة، وافحص كل عمل مخفي قبل تغطيته، ولا تتعامل مع علامة خطر كهربائية أو تسريب قرب الكهرباء كتجربة منزلية.</p>
            </div>
          </article>

          <aside>
            <div className="sidebar-card toc">
              <strong>في هذا الدليل</strong>
              <ol>
                {article.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{section.heading}</a></li>)}
              </ol>
            </div>
            {service && (
              <div className="sidebar-card">
                <span className="card-kicker">الخدمة المرتبطة</span>
                <h3>{service.title}</h3>
                <p>{service.lead}</p>
                <Link className="button button-secondary" href={`/services/${service.slug}`}>تفاصيل الخدمة <Icon name="arrow" size={18} /></Link>
                <a className="button button-primary" href={whatsappMessage(`مرحبًا، قرأت مقال «${article.title}» وأرغب في الاستفسار عن ${service.title}.`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> اسأل عبر واتساب</a>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="read-next">
        <div className="container">
          <div className="section-heading" data-reveal><span className="eyebrow">تابع القراءة</span><h2 id="read-next">أدلة تكمل الصورة</h2></div>
          <div className="related-strip">
            {relatedArticles.map((item) => <Link className="related-link" key={item.slug} href={`/blog/${item.slug}`}><span>{item.category} · {item.readingTime}</span><strong>{item.title}</strong></Link>)}
          </div>
        </div>
      </section>

      <ContactBand title="هل تحتاج تطبيقًا عمليًا على موقعك؟" text="المقال يساعدك على فهم القرار؛ أما التنفيذ فيبدأ من حالة الموقع الفعلية. أرسل وصفًا وصورًا آمنة والحي في الرياض." message={`مرحبًا، لدي استفسار بعد قراءة مقال: ${article.title}`} />
      <FAQSection faqs={article.faq} title={`أسئلة شائعة مرتبطة بموضوع: ${article.title}`} />
    </main>
  );
}
