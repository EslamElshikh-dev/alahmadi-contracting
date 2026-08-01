import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ServiceCard } from "@/app/components/Cards";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { getServicesByCategory, serviceCategories, services, servicesIndexFaqs } from "@/app/lib/services";
import { absoluteUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "خدمات المقاولات والتأسيس والصيانة والتشطيب في الرياض",
  description:
    "11 خدمة مقاولات للمنازل والفلل في الرياض، مقسمة إلى تأسيسات كهرباء وسباكة وصرف، صيانة أعطال، وتشطيبات سيراميك وواجهات ودهانات وإنارة.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات الأحمدي للمقاولات في الرياض",
    description: "تأسيسات، صيانة، وتشطيبات ضمن نطاق واضح ومراحل قابلة للمراجعة.",
    url: "/services",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "خدمات الأحمدي للمقاولات",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesIndexFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 2, name: "الخدمات", item: absoluteUrl("/services") },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "الخدمات" }]} />
      <header className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">11 خدمة · 3 مسارات</span>
          <h1>خدمات تبدأ من داخل الجدار، وتنتهي بما تراه كل يوم.</h1>
          <p>اختر الخدمة مباشرة أو ابدأ من تصنيف المشروع. لكل صفحة وصف تفصيلي يتجاوز العنوان العام، وخطوات تنفيذ ونقاط جودة وأسئلة تساعدك على تجهيز الموقع قبل التواصل.</p>
          <div className="hero-meta-row">
            <span><Icon name="building" size={18} /> فلل ومنازل</span>
            <span><Icon name="location" size={18} /> مدينة الرياض</span>
            <span><Icon name="check" size={18} /> صفحات خدمة مستقلة</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {serviceCategories.map((category, categoryIndex) => {
            const categoryServices = getServicesByCategory(category.key);
            const categoryOffset = serviceCategories
              .slice(0, categoryIndex)
              .reduce((total, item) => total + getServicesByCategory(item.key).length, 0);
            return (
              <div className="category-block" key={category.key} id={category.key}>
                <div className="category-header" data-reveal>
                  <div><span className="card-kicker">{category.eyebrow}</span><h2>{category.title}</h2></div>
                  <p>{category.description}</p>
                </div>
                <div className="service-grid">
                  {categoryServices.map((service, index) => (
                    <ServiceCard key={service.slug} service={service} index={categoryOffset + index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section surface-ink" aria-labelledby="service-order">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow light">في المشاريع المتعددة</span>
            <h2 id="service-order">الترتيب يحمي العمل الذي سبقه.</h2>
            <p>ليس كل مشروع متشابهًا، لكن هذه المراحل الأربع تمنع إغلاق شبكة قبل اختبارها أو تعريض تشطيب نهائي لأعمال خشنة لاحقة.</p>
          </div>
          <div className="process-grid">
            <article className="process-card" data-reveal><h3>تخطيط وحصر</h3><p>المقاسات والنقاط والمواد ومسؤولية كل بند قبل بدء التكسير أو التمديد.</p></article>
            <article className="process-card" data-reveal><h3>أعمال مخفية</h3><p>كهرباء وسباكة وصرف ومسارات مرتبطة بتوزيع الفراغ النهائي.</p></article>
            <article className="process-card" data-reveal><h3>فحص وإغلاق</h3><p>مراجعة الشبكات وتوثيقها ثم العزل والإغلاق وتجهيز الأسطح.</p></article>
            <article className="process-card" data-reveal><h3>تشطيب وتركيب</h3><p>أرضيات ودهانات وإنارة وأدوات نهائية مع قائمة استلام موحدة.</p></article>
          </div>
        </div>
      </section>

      <ContactBand title="غير متأكد من اسم الخدمة؟" text="أرسل وصف النتيجة المطلوبة أو العطل مع صور آمنة للموقع، وسنساعدك على تحديد التصنيف الأقرب قبل ترتيب المعاينة." />
      <FAQSection faqs={servicesIndexFaqs} title="أسئلة عن اختيار وتنظيم الخدمات" />
    </main>
  );
}
