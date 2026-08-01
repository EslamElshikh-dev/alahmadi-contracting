import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import {
  absoluteUrl,
  PHONE_DISPLAY,
  PHONE_E164,
  PHONE_LINK,
  SITE_NAME,
  WHATSAPP_LINK,
  whatsappMessage,
  type FAQ,
} from "@/app/lib/site";

export const metadata: Metadata = {
  title: "اتصل بالأحمدي للمقاولات في الرياض",
  description:
    "اتصل أو تواصل عبر واتساب مع الأحمدي للمقاولات على 0555389493 لطلب خدمات الكهرباء والسباكة والترميم والتشطيبات داخل مدينة الرياض.",
  alternates: { canonical: "/contact" },
  openGraph: { title: `تواصل مع ${SITE_NAME}`, description: "اتصال وواتساب لطلب خدمات المقاولات داخل مدينة الرياض.", url: "/contact" },
};

const contactFaqs: FAQ[] = [
  { question: "ما رقم التواصل مع الأحمدي للمقاولات؟", answer: "رقم الاتصال وواتساب هو 0555389493، ويمكن استخدام الأزرار الظاهرة في الصفحة أو الأيقونات العائمة. يظهر الرقم بصيغة محلية للقراءة ويُفتح الاتصال بصيغته الدولية الصحيحة على الأجهزة الداعمة." },
  { question: "ما الذي أرسله في أول رسالة واتساب؟", answer: "اكتب اسم الخدمة، الحي داخل الرياض، نوع العقار، هل الموقع جديد أم قائم، ووصفًا مختصرًا. أرفق صورًا واضحة وآمنة ومقاسات تقريبية أو مخططًا إن وجد، وحدد الوقت المناسب لإعادة التواصل." },
  { question: "هل يمكن إعطاء سعر نهائي من الصور؟", answer: "قد تساعد الصور في تقدير أولي لبعض البنود الواضحة، لكن الأعمال المخفية والأعطال المتقطعة والواجهات والمساحات غير المقاسة تحتاج غالبًا معاينة أو معلومات إضافية. السعر النهائي يرتبط بنطاق ومواد ومسؤوليات محددة." },
  { question: "هل يجب إرسال الموقع الدقيق من أول رسالة؟", answer: "يكفي اسم الحي في البداية. يُطلب الموقع الدقيق عند الاتفاق على معاينة أو زيارة، ولا حاجة لإرسال بيانات شخصية إضافية لا تخدم طلب الخدمة." },
  { question: "هل التواصل عبر الموقع يحجز موعدًا تلقائيًا؟", answer: "لا يوجد حجز آلي في الموقع. المكالمة أو رسالة واتساب تبدأ المحادثة، ثم يُؤكد الموعد بعد معرفة الخدمة والحي والمدة المتوقعة وجدول العمل." },
  { question: "ماذا أفعل في حالة خطر كهربائي أو تسريب كبير؟", answer: "اعزل المصدر فقط إذا كان ذلك ممكنًا بأمان، وأبعد الأشخاص عن المنطقة، ولا تلمس كهرباء مبللة أو أسلاكًا مكشوفة. عند حريق أو دخان أو خطر مباشر اتصل بخدمات الطوارئ المختصة أولًا، ثم اطلب الصيانة بعد تأمين الموقع." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `التواصل مع ${SITE_NAME}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "GeneralContractor",
      "@id": `${absoluteUrl()}#business`,
      name: SITE_NAME,
      telephone: PHONE_E164,
      areaServed: "مدينة الرياض",
    },
  },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: contactFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "تواصل معنا" }]} />
      <header className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">اتصال وواتساب</span>
          <h1>أرسل التفاصيل التي تجعل أول رد أكثر فائدة.</h1>
          <p>اسم الخدمة والحي وصورتان واضحتان قد تختصر أسئلة كثيرة. لا تفك غطاء كهرباء ولا تقترب من موضع خطر للحصول على صورة؛ السلامة أولًا.</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card contact-card-dark" data-reveal>
            <span className="eyebrow light">قنوات التواصل</span>
            <h2>تواصل مباشرة</h2>
            <p>نطاق الخدمة مدينة الرياض. تأكيد المعاينة أو الموعد يتم بعد معرفة نوع العمل والحي.</p>
            <a className="contact-option" href={PHONE_LINK}>
              <span className="contact-option-icon"><Icon name="phone" /></span>
              <span><small>اتصال</small><strong dir="ltr">{PHONE_DISPLAY}</strong></span>
            </a>
            <a className="contact-option" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <span className="contact-option-icon"><Icon name="whatsapp" /></span>
              <span><small>واتساب</small><strong dir="ltr">{PHONE_DISPLAY}</strong></span>
            </a>
            <div className="contact-option">
              <span className="contact-option-icon"><Icon name="location" /></span>
              <span><small>نطاق الخدمة</small><strong>مدينة الرياض</strong></span>
            </div>
          </div>

          <div className="contact-card" data-reveal style={{ "--delay": "90ms" } as React.CSSProperties}>
            <span className="eyebrow">قالب رسالة جاهز</span>
            <h2>أربع معلومات تكفي للبدء</h2>
            <p>استخدم القالب التالي، ثم أضف صورًا أو مخططًا إذا كان ذلك آمنًا ومتاحًا.</p>
            <div className="message-template">
              <div className="template-row"><strong>الخدمة</strong><span>مثال: تأسيس سباكة / صيانة كهرباء / دهانات</span></div>
              <div className="template-row"><strong>الحي</strong><span>مثال: حطين، الملقا، قرطبة، أو أي حي داخل الرياض</span></div>
              <div className="template-row"><strong>نوع العقار</strong><span>فيلا، منزل، دور، ملحق، وموقع جديد أو قائم</span></div>
              <div className="template-row"><strong>التفاصيل</strong><span>عدد النقاط أو المساحة، وصف العطل، وصور واضحة إن وجدت</span></div>
            </div>
            <div className="button-row" style={{ marginTop: 26 }}>
              <a className="button button-primary" href={whatsappMessage("مرحبًا الأحمدي للمقاولات، الخدمة: ـــــ، الحي: ـــــ، نوع العقار: ـــــ، التفاصيل: ـــــ.")} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> افتح القالب في واتساب</a>
              <a className="button button-secondary" href={PHONE_LINK}><Icon name="phone" /> اتصال مباشر</a>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} title="أسئلة قبل التواصل" />
    </main>
  );
}
