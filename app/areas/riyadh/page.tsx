import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { services } from "@/app/lib/services";
import {
  absoluteUrl,
  allNeighborhoods,
  featuredNeighborhoods,
  neighborhoodGroups,
  SITE_NAME,
  type FAQ,
} from "@/app/lib/site";

export const metadata: Metadata = {
  title: "مقاولات وصيانة في أحياء الرياض | نطاق الخدمة",
  description:
    "نطاق خدمات الأحمدي للمقاولات في أحياء الرياض، يبدأ بحطين والملقا والنرجس والياسمين والعقيق ثم شمال وشرق وغرب ووسط وجنوب الرياض.",
  alternates: { canonical: "/areas/riyadh" },
  openGraph: {
    title: "أحياء ومناطق خدمة الأحمدي للمقاولات في الرياض",
    description: "تغطية مرتبة للأحياء الأعلى طلبًا ثم جميع جهات مدينة الرياض.",
    url: "/areas/riyadh",
  },
};

const areaFaqs: FAQ[] = [
  {
    question: "ما أحياء الرياض التي تبدأ بها قائمة التغطية؟",
    answer:
      "تبدأ القائمة بالأحياء الأعلى طلبًا في مشاريع الفلل والتجديد، ومنها حطين والملقا والنرجس والياسمين والعقيق والغدير والصحافة والربيع والعارض والقيروان والنخيل والمحمدية والرحمانية والورود. هذا ترتيب عرض للمساعدة في التصفح، وليس قصرًا للخدمة عليها.",
  },
  {
    question: "هل تشمل الخدمة شمال وشرق وغرب وجنوب ووسط الرياض؟",
    answer:
      "نعم، نطاق الخدمة المعلن هو مدينة الرياض، وقد جُمعت الأحياء في الصفحة حسب الجهات لتسهيل الوصول. تأكيد الزيارة يعتمد على نوع الخدمة وحجم العمل والحي وجدول المواعيد، لذلك نطلب اسم الحي عند التواصل.",
  },
  {
    question: "هل وجود اسم الحي في الصفحة يعني توفر موعد فوري؟",
    answer:
      "وجود الحي يعني أنه ضمن نطاق الرياض الذي يستهدفه الموقع، لكنه لا يمثل وعدًا بموعد فوري. يتم تأكيد الوقت بعد معرفة طبيعة العمل والمسافة والمدة المتوقعة والجدول القائم.",
  },
  {
    question: "هل تختلف الخدمات المتاحة من حي إلى آخر؟",
    answer:
      "الخدمات الأساسية واحدة داخل مدينة الرياض، لكن قابلية تنفيذ عمل معين تتحدد من حالة العقار وطريقة الوصول واشتراطات الموقع وحجم المشروع. قد تحتاج بعض الأعمال معاينة قبل تأكيد النطاق، خصوصًا الواجهات والأعمال المخفية.",
  },
  {
    question: "ما المعلومات المطلوبة مع اسم الحي؟",
    answer:
      "اذكر نوع العقار، الخدمة المطلوبة، هل الموقع جديد أم قائم، صورًا واضحة وآمنة، والمقاسات أو عدد النقاط إن أمكن. لا ترسل موقعًا دقيقًا أو بيانات شخصية أكثر من اللازم قبل الاتفاق على زيارة.",
  },
  {
    question: "هل تنشئون صفحة منفصلة لكل حي؟",
    answer:
      "اخترنا صفحة تغطية شاملة ومفيدة بدل عشرات الصفحات المتشابهة التي تبدل اسم الحي فقط. هذا يحافظ على جودة المحتوى ويمنع الحشو، بينما تظهر الأحياء داخل قوائم منظمة وبيانات خدمة مترابطة مع الصفحات المتخصصة.",
  },
  {
    question: "هل يمكن طلب أكثر من خدمة في نفس الموقع؟",
    answer:
      "نعم، أرسل قائمة البنود مثل سباكة وكهرباء ودهان أو سيراميك، وسنرتبها حسب الاعتماد بين المراحل. تحديد نطاق موحد مفيد خصوصًا في الترميم، لكنه يحتاج معاينة أو صورًا ومقاسات أكثر تفصيلًا.",
  },
  {
    question: "كيف أتأكد أن الحي غير المذكور ضمن نطاق الخدمة؟",
    answer:
      "القائمة واسعة لكنها ليست حصرًا إداريًا نهائيًا لكل مخطط حديث. إذا كان موقعك داخل مدينة الرياض ولم تجد الاسم، أرسله عبر واتساب مع نوع الخدمة لتأكيد إمكانية الوصول والموعد.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `خدمات ${SITE_NAME} في أحياء الرياض`,
    url: absoluteUrl("/areas/riyadh"),
    provider: { "@type": "GeneralContractor", "@id": `${absoluteUrl()}#business`, name: SITE_NAME },
    serviceType: services.map((service) => service.title),
    areaServed: allNeighborhoods.map((name) => ({
      "@type": "AdministrativeArea",
      name: `حي ${name}، الرياض`,
      containedInPlace: { "@type": "City", name: "الرياض" },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: areaFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 2, name: "أحياء الرياض", item: absoluteUrl("/areas/riyadh") },
    ],
  },
];

export default function RiyadhAreasPage() {
  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "أحياء الرياض" }]} />
      <header className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">نطاق الخدمة · مدينة الرياض</span>
          <h1>خدمات مقاولات في أحياء الرياض، مرتبة لتصل أسرع.</h1>
          <p>نبدأ بالأحياء الأعلى طلبًا في مشاريع الفلل والتجديد، ثم نجمع شمال وشرق وغرب ووسط وجنوب الرياض في مجموعات واضحة. اسم الحي يساعد على فهم نطاق الوصول، بينما تعتمد تفاصيل التنفيذ على حالة الموقع والخدمة المطلوبة.</p>
          <div className="hero-meta-row">
            <span><Icon name="location" size={18} /> {allNeighborhoods.length}+ حيًا ومخططًا</span>
            <span><Icon name="building" size={18} /> فلل ومنازل قائمة وجديدة</span>
            <span><Icon name="check" size={18} /> 11 خدمة مترابطة</span>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="premium-areas">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">البداية حسب الطلب</span>
            <h2 id="premium-areas">الأحياء الأعلى طلبًا في مشاريع الفلل والتشطيب</h2>
            <p>يظهر هذا الترتيب أولًا لتسهيل الوصول إلى أكثر نطاقات البحث المحلية شيوعًا، مع بقاء الخدمة متاحة لبقية مدينة الرياض وفق الموعد ونوع المشروع.</p>
          </div>
          <div className="featured-areas-grid">
            {featuredNeighborhoods.map((name) => <div className="featured-area" data-reveal key={name}><strong>حي {name}</strong><small>مدينة الرياض</small></div>)}
          </div>
        </div>
      </section>

      <section className="section surface-sand" aria-labelledby="all-areas">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">تغطية حسب الجهات</span>
            <h2 id="all-areas">أحياء شمال وشرق وغرب ووسط وجنوب الرياض</h2>
            <p>بعض الأحياء تظهر في مجموعة البداية ثم تتكرر منطقيًا داخل جهتها الجغرافية لتسهيل القراءة؛ لكنها لا تنشئ صفحات مكررة أو محتوى آليًا ضعيفًا.</p>
          </div>
          <div className="area-groups">
            {neighborhoodGroups.slice(1).map((group) => (
              <article className="area-group" data-reveal key={group.title}>
                <div><h2>{group.title}</h2><p>{group.description}</p></div>
                <div className="area-group-list">
                  {group.neighborhoods.map((name) => <span key={name}>حي {name}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="area-services">
        <div className="container">
          <div className="section-heading" data-reveal><span className="eyebrow">الخدمة لا تتغير بتغير الحي</span><h2 id="area-services">اختر التخصص، ثم أرسل اسم الحي.</h2><p>كل صفحة خدمة تشرح النطاق والخطوات ونقاط الجودة، وتستطيع الانتقال منها مباشرة إلى واتساب برسالة تحمل اسم الخدمة.</p></div>
          <div className="related-strip">
            {services.slice(0, 6).map((service) => <Link className="related-link" href={`/services/${service.slug}`} key={service.slug}><span>{service.category}</span><strong>{service.title}</strong></Link>)}
          </div>
        </div>
      </section>

      <ContactBand title="هل حيّك داخل الرياض وغير ظاهر في القائمة؟" text="أرسل اسم الحي ونوع الخدمة؛ فالقائمة تغطي الأسماء الأكثر تداولًا وليست بديلًا عن تأكيد الموقع والموعد." message="مرحبًا، أرغب في تأكيد توفر الخدمة. الحي: ـــــ، الخدمة: ـــــ." />
      <FAQSection faqs={areaFaqs} title="أسئلة عن نطاق الخدمة في الرياض" />
    </main>
  );
}
