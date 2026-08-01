import type { Metadata } from "next";
import { ArticleCard } from "@/app/components/Cards";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { articles, blogIndexFaqs } from "@/app/lib/articles";
import { absoluteUrl, SITE_NAME } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "دليل المقاولات المنزلية في الرياض",
  description:
    "10 مقالات احترافية عن تأسيس وصيانة الكهرباء والسباكة، تمديد المياه والصرف، السيراميك، الواجهات، الدهانات وإنارة المنازل في الرياض.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `دليل المقاولات المنزلية | ${SITE_NAME}`,
    description: "أدلة عملية تساعدك على التخطيط والفحص والاستلام قبل بدء أعمال منزلك.",
    url: "/blog",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "دليل الأحمدي للمقاولات",
    description: "مقالات عربية متخصصة في المقاولات المنزلية داخل مدينة الرياض.",
    url: absoluteUrl("/blog"),
    publisher: { "@type": "Organization", "@id": `${absoluteUrl()}#business`, name: SITE_NAME },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: absoluteUrl(`/blog/${article.slug}`),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blogIndexFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function BlogPage() {
  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "دليل المقاولات" }]} />
      <header className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">10 مقالات أصلية</span>
          <h1>دليل المقاولات المنزلية: افهم المرحلة قبل أن تستلمها.</h1>
          <p>محتوى مبني حول الأسئلة التي تظهر في مشاريع الفلل والمنازل: ما الذي يجب حسمه قبل التأسيس؟ ما علامات العطل؟ وكيف يرتبط كل بند بالعزل والأرضيات والدهان والإنارة؟</p>
          <div className="hero-meta-row">
            <span><Icon name="clock" size={18} /> قراءة من 7 إلى 9 دقائق</span>
            <span><Icon name="building" size={18} /> مخصص للمنازل والفلل</span>
            <span><Icon name="shield" size={18} /> معلومات توعوية آمنة</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="article-grid">
            {articles.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}
          </div>
        </div>
      </section>

      <ContactBand title="تحولت المعلومة إلى مشروع فعلي؟" text="انتقل من الدليل إلى صفحة الخدمة، أو أرسل حالتك والحي وصورًا آمنة لنفهم ما تحتاجه قبل ترتيب أي خطوة." />
      <FAQSection faqs={blogIndexFaqs} title="أسئلة عن دليل المقاولات" />
    </main>
  );
}
