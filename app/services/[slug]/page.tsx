import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { articles } from "@/app/lib/articles";
import { getService, services } from "@/app/lib/services";
import { absoluteUrl, PHONE_E164, PHONE_LINK, SITE_NAME, whatsappMessage } from "@/app/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.seoTitle.replace(" | الأحمدي للمقاولات", ""),
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: service.seoTitle,
      description: service.metaDescription,
      url: path,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedServices = services
    .filter((item) => item.slug !== service.slug && (item.categoryKey === service.categoryKey || item.category === service.category))
    .slice(0, 3);
  const relatedArticles = articles
    .filter((article) => article.relatedServiceSlug === service.slug)
    .concat(articles.filter((article) => article.relatedServiceSlug !== service.slug))
    .slice(0, 3);
  const path = `/services/${service.slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: service.title,
      description: service.description,
      url: absoluteUrl(path),
      serviceType: service.title,
      areaServed: { "@type": "City", name: "الرياض" },
      provider: {
        "@type": "GeneralContractor",
        "@id": `${absoluteUrl()}#business`,
        name: SITE_NAME,
        telephone: PHONE_E164,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((faq) => ({
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
        { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(path) },
      ],
    },
  ];

  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "الخدمات", href: "/services" }, { name: service.title }]} />

      <header className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">{service.category} · الرياض</span>
          <h1>{service.title} في مدينة الرياض</h1>
          <p>{service.lead}</p>
          <div className="hero-meta-row">
            <span><Icon name="location" size={18} /> جميع جهات الرياض حسب الموعد</span>
            <span><Icon name="check" size={18} /> نطاق وخطوات واضحة</span>
            <span><Icon name="shield" size={18} /> فحص قبل الإغلاق أو التشغيل</span>
          </div>
          <div className="button-row">
            <a className="button button-primary" href={whatsappMessage(`مرحبًا، أرغب في الاستفسار عن خدمة ${service.title} في الرياض.`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> استفسار واتساب</a>
            <a className="button button-secondary" href={PHONE_LINK}><Icon name="phone" /> اتصال مباشر</a>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container content-layout">
          <article className="prose">
            <span className="eyebrow">نطاق الخدمة بالتفصيل</span>
            <h2>ما الذي تعنيه خدمة {service.shortTitle}؟</h2>
            {service.longIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="lead-box"><p>{service.description}</p></div>

            <h2>ما الذي يمكن أن يشمله نطاق العمل؟</h2>
            <p>تُعتمد البنود النهائية بعد معرفة حالة الموقع، لكن القائمة التالية توضح الهيكل المهني المعتاد للخدمة وما ينبغي مناقشته قبل التنفيذ:</p>
            <div className="check-grid">
              {service.deliverables.map((item) => <div className="check-item" key={item}><Icon name="check" size={19} /> <span>{item}</span></div>)}
            </div>

            <h2>خطوات التنفيذ من المعاينة إلى المراجعة</h2>
            <div className="steps-list">
              {service.steps.map((step, index) => (
                <div className="step-row" key={step.title} data-reveal>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </div>
              ))}
            </div>

            <h2>نقاط جودة نراجعها أثناء {service.shortTitle}</h2>
            <p>لا تظهر جودة العمل في الصورة النهائية وحدها؛ لذلك نربط الاستلام بنقاط يمكن ملاحظتها أو اختبارها في الوقت المناسب، ونوضح ما يقع داخل نطاق الخدمة وما يحتاج تخصصًا إضافيًا.</p>
            <ul>
              {service.qualityPoints.map((point) => <li key={point}>{point}</li>)}
            </ul>

            <h2>متى تحتاج إلى فحص بدل تأجيل العمل؟</h2>
            <p>{service.warningSigns}</p>
            <p>إذا ارتبطت الحالة بخطر مباشر، مثل دخان كهربائي أو تسريب قرب مصدر كهرباء أو سقوط أجزاء من واجهة، فالأولوية لعزل المكان والاتصال بخدمات الطوارئ المختصة عند الحاجة، ثم يأتي تقييم الصيانة بعد تأمين الموقع.</p>

            <h2>هل تناسب الخدمة منزلًا قائمًا؟</h2>
            <p>{service.existingHome}</p>

            <h2>قبل أن تتواصل معنا</h2>
            <p>{service.preparation}</p>
          </article>

          <aside>
            <div className="sidebar-card">
              <span className="card-kicker">طلب هذه الخدمة</span>
              <h3>{service.shortTitle}</h3>
              <p>أرسل الحي ونوع العقار وصورًا آمنة وواضحة لنفهم الحالة قبل تحديد الخطوة التالية.</p>
              <a className="button button-primary" href={whatsappMessage(`مرحبًا، أحتاج خدمة ${service.title}. الحي: ـــــ، نوع العقار: ـــــ.`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> واتساب</a>
              <a className="button button-secondary" href={PHONE_LINK}><Icon name="phone" /> اتصل الآن</a>
              <ul className="sidebar-list">
                <li><Icon name="location" size={17} /> نطاق الخدمة: مدينة الرياض</li>
                <li><Icon name="clock" size={17} /> الموعد حسب حجم ونوع العمل</li>
                <li><Icon name="check" size={17} /> توضيح النطاق قبل التنفيذ</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="related-guides">
        <div className="container">
          <div className="section-heading" data-reveal><span className="eyebrow">اقرأ قبل التنفيذ</span><h2 id="related-guides">أدلة مرتبطة بهذه الخدمة</h2><p>محتوى يساعدك على تجهيز القرارات والأسئلة وفهم مراحل الفحص والاستلام.</p></div>
          <div className="related-strip">
            {relatedArticles.map((article) => <Link className="related-link" href={`/blog/${article.slug}`} key={article.slug}><span>{article.category} · {article.readingTime}</span><strong>{article.title}</strong></Link>)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="related-services">
        <div className="container">
          <div className="section-heading" data-reveal><span className="eyebrow">قد تحتاج أيضًا</span><h2 id="related-services">خدمات مرتبطة في نفس المرحلة</h2></div>
          <div className="related-strip">
            {relatedServices.map((item) => <Link className="related-link" href={`/services/${item.slug}`} key={item.slug}><span>{item.category}</span><strong>{item.title}</strong></Link>)}
          </div>
        </div>
      </section>

      <ContactBand title={`هل تريد مناقشة ${service.shortTitle}؟`} text="أرسل وصفًا وصورًا آمنة للموقع والحي، أو اتصل لشرح الحالة مباشرة." message={`مرحبًا، أرغب في مناقشة خدمة ${service.title} في الرياض.`} />
      <FAQSection faqs={service.faq} title={`أسئلة شائعة عن ${service.shortTitle}`} />
    </main>
  );
}
