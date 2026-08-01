import Link from "next/link";
import { ArticleCard, ServiceCard } from "@/app/components/Cards";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { articles } from "@/app/lib/articles";
import { getServicesByCategory, serviceCategories } from "@/app/lib/services";
import {
  absoluteUrl,
  featuredNeighborhoods,
  homeFaqs,
  PHONE_LINK,
  SITE_NAME,
  whatsappMessage,
} from "@/app/lib/site";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl()}#faq`,
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <main id="main-content">
      <JsonLd data={faqSchema} />

      <section className="home-hero" aria-labelledby="home-title">
        <div className="container home-hero-grid">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">مقاولات منزلية · مدينة الرياض</span>
            <h1 id="home-title">من التأسيس المخفي<br />إلى <span>آخر لمسة</span> في التشطيب.</h1>
            <p>
              {SITE_NAME} يجمع أعمال الكهرباء والسباكة والصرف والصيانة والأرضيات
              والواجهات والدهانات والإنارة ضمن مسار واضح، لتعرف ما الذي سيُنفذ
              ومتى يجب فحصه قبل الانتقال إلى المرحلة التالية.
            </p>
            <div className="button-row">
              <a className="button button-primary" href={whatsappMessage("مرحبًا، أرغب في طلب خدمة من الأحمدي للمقاولات داخل مدينة الرياض.")} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> ابدأ عبر واتساب
              </a>
              <a className="button button-secondary" href={PHONE_LINK}><Icon name="phone" /> اتصال مباشر</a>
            </div>
            <div className="hero-trust" aria-label="مميزات الموقع والخدمة">
              <span><Icon name="check" size={17} /> 11 خدمة متخصصة</span>
              <span><Icon name="location" size={17} /> تغطية مدينة الرياض</span>
              <span><Icon name="shield" size={17} /> خطوات فحص واضحة</span>
            </div>
          </div>

          <div className="hero-blueprint" data-reveal style={{ "--delay": "120ms" } as React.CSSProperties} aria-label="مخطط بصري لمنزل يمثل خدمات التأسيس والتشطيب">
            <div className="blueprint-building">
              <div className="blueprint-windows"><span /><span /></div>
              <span className="blueprint-door" />
            </div>
            <span className="blueprint-path" />
            <div className="blueprint-card"><small>نطاق الخدمة</small><strong>الرياض</strong></div>
            <div className="blueprint-stamp">تأسيس<br />صيانة<br />تشطيب</div>
          </div>
        </div>
      </section>

      <div className="proof-strip">
        <div className="container proof-grid">
          <div className="proof-item"><Icon name="building" /><div><strong>فلل ومنازل</strong><span>مشاريع جديدة وقائمة</span></div></div>
          <div className="proof-item"><Icon name="tools" /><div><strong>تشخيص منظم</strong><span>قبل الاستبدال أو التكسير</span></div></div>
          <div className="proof-item"><Icon name="check" /><div><strong>استلام مرحلي</strong><span>قبل إغلاق الأعمال المخفية</span></div></div>
          <div className="proof-item"><Icon name="location" /><div><strong>داخل الرياض</strong><span>الأحياء مرتبة حسب المناطق</span></div></div>
        </div>
      </div>

      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">الخدمات في ثلاثة مسارات</span>
            <h2 id="services-heading">كل مرحلة في مكانها الصحيح.</h2>
            <p>قسمنا الخدمات بحسب دورها في المشروع حتى ترى العلاقة بين الشبكات المخفية، إصلاح الأعطال، واللمسات النهائية التي تُستلم بصريًا.</p>
          </div>

          {serviceCategories.map((category, categoryIndex) => {
            const categoryServices = getServicesByCategory(category.key);
            const categoryOffset = serviceCategories
              .slice(0, categoryIndex)
              .reduce((total, item) => total + getServicesByCategory(item.key).length, 0);
            return (
              <div className="category-block" key={category.key}>
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

      <section className="section surface-ink" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow light">من الرسالة إلى الاستلام</span>
            <h2 id="process-heading">أربع خطوات تقلل المفاجآت.</h2>
            <p>يتغير حجم كل خطوة بحسب الخدمة، لكن وضوح المطلوب والفحص قبل الإغلاق يظلان أساس أي تنفيذ منظم.</p>
          </div>
          <div className="process-grid">
            <article className="process-card" data-reveal><h3>فهم الاحتياج</h3><p>الخدمة، الحي، نوع العقار، الصور، والمخططات أو المقاسات المتاحة.</p></article>
            <article className="process-card" data-reveal style={{ "--delay": "70ms" } as React.CSSProperties}><h3>تحديد النطاق</h3><p>البنود والمواد ونقاط التداخل وما يحتاج معاينة قبل اعتماد العمل.</p></article>
            <article className="process-card" data-reveal style={{ "--delay": "140ms" } as React.CSSProperties}><h3>تنفيذ مرحلي</h3><p>ترتيب الأعمال المخفية والحماية والتشطيب وفق اعتماد كل مرحلة.</p></article>
            <article className="process-card" data-reveal style={{ "--delay": "210ms" } as React.CSSProperties}><h3>فحص وتسليم</h3><p>اختبار ما يمكن اختباره، مراجعة الملاحظات، وتوثيق الأعمال المهمة.</p></article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="areas-heading">
        <div className="container areas-preview">
          <div className="area-map" data-reveal aria-hidden="true">
            <span className="map-center">الرياض</span>
            <span className="map-dot">شمال</span>
            <span className="map-dot">شرق</span>
            <span className="map-dot">غرب</span>
            <span className="map-dot">جنوب</span>
          </div>
          <div data-reveal>
            <span className="eyebrow">نطاق خدمة محلي وواضح</span>
            <h2 id="areas-heading">نبدأ بالأحياء الأعلى طلبًا، ونغطي مدينة الرياض.</h2>
            <p>تظهر الأحياء ضمن سياق جغرافي مفيد للزائر ومحركات البحث، مع ترتيب يبدأ بحطين والملقا والنرجس والياسمين ثم بقية جهات الرياض، دون تكرار صفحات ضعيفة أو حشو أسماء.</p>
            <div className="neighborhood-cloud">
              {featuredNeighborhoods.map((name) => <span className="neighborhood-chip" key={name}>{name}</span>)}
            </div>
            <Link className="button button-secondary" href="/areas/riyadh"><Icon name="location" /> جميع أحياء الرياض</Link>
          </div>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="blog-heading">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">محتوى يساعدك قبل القرار</span>
            <h2 id="blog-heading">دليل عملي للمقاولات المنزلية.</h2>
            <p>مقالات أصلية تربط بين التخطيط والتنفيذ والاستلام، وتجيب عن أسئلة الكهرباء والسباكة والترميم والتشطيب بلغة واضحة.</p>
          </div>
          <div className="article-grid">
            {articles.slice(0, 6).map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}
          </div>
          <div className="button-row" style={{ marginTop: 32 }}><Link className="button button-secondary" href="/blog">عرض المقالات العشرة <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <ContactBand />
      <FAQSection faqs={homeFaqs} title="أسئلة عن الأحمدي للمقاولات" />
    </main>
  );
}
