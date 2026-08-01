import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ContactBand } from "@/app/components/ContactBand";
import { FAQSection } from "@/app/components/FAQSection";
import { Icon } from "@/app/components/Icons";
import { JsonLd } from "@/app/components/JsonLd";
import { absoluteUrl, SITE_NAME, type FAQ } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "من نحن | الأحمدي للمقاولات بالرياض",
  description:
    "تعرف على طريقة عمل الأحمدي للمقاولات في تأسيس وصيانة وتشطيب المنازل والفلل داخل مدينة الرياض، من تحديد النطاق إلى الفحص والاستلام.",
  alternates: { canonical: "/about" },
  openGraph: { title: `عن ${SITE_NAME}`, description: "طريقة عمل واضحة تربط التأسيس بالصيانة والتشطيب داخل الرياض.", url: "/about" },
};

const aboutFaqs: FAQ[] = [
  { question: "ما تخصص الأحمدي للمقاولات؟", answer: "نركز على أعمال المنازل والفلل التي تجمع تأسيس الكهرباء والسباكة والصرف، صيانة الأعطال، وتمديدات المياه والأسلاك، إضافة إلى السيراميك والواجهات والدهانات وتركيب الإنارة والثريات داخل مدينة الرياض." },
  { question: "ما منهج العمل قبل بدء المشروع؟", answer: "نبدأ بوصف مكتوب وصور أو مخططات، ثم نحدد ما يمكن فهمه عن بُعد وما يحتاج معاينة. بعد ذلك تُفصل البنود والمواد ومراحل الاستلام، ويُوضح أي عمل خارج النطاق قبل البدء." },
  { question: "لماذا يضم الموقع معلومات تفصيلية عن كل خدمة؟", answer: "حتى يتمكن صاحب المنزل من معرفة الأسئلة المهمة والتداخلات بين التخصصات قبل الاتصال. الصفحة التفصيلية تقلل غموض العنوان العام، لكنها لا تستبدل تقييم الموقع الفعلي." },
  { question: "هل تعملون في المشاريع الجديدة والمنازل القائمة؟", answer: "تتناول الخدمات التأسيس الجديد والصيانة والتجديد في المنازل القائمة. يختلف أسلوب الحماية والوصول والتسلسل حسب حالة السكن والتشطيبات الموجودة، ولذلك يُقيّم كل نطاق منفصلًا." },
  { question: "هل المواد ضمن الخدمة دائمًا؟", answer: "يحدد الاتفاق مسؤولية توريد كل مادة ومواصفاتها وكمياتها. لا نفترض أن المواد أو الأجهزة ضمن بند عام؛ لأن الخيارات تختلف في الجودة والتصميم والسعر، ويجب توثيق ما سيوفره كل طرف." },
  { question: "كيف يتم التعامل مع تغيير نطاق العمل؟", answer: "إذا ظهر احتياج جديد أو تغير التصميم، يُحدد البند الإضافي وأثره في الوقت والمواد قبل تنفيذه. هذا يمنع اختلاط الملاحظات بأعمال جديدة ويحافظ على وضوح الاستلام." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "AboutPage", name: `عن ${SITE_NAME}`, url: absoluteUrl("/about"), about: { "@type": "GeneralContractor", "@id": `${absoluteUrl()}#business`, name: SITE_NAME } },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: aboutFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <JsonLd data={schemas} />
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "من نحن" }]} />
      <header className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">عن الأحمدي للمقاولات</span>
          <h1>نربط البنود ببعضها، لأن المنزل لا يُنفذ كجزر منفصلة.</h1>
          <p>هدفنا أن يكون نطاق العمل مفهومًا: ما الذي يحدث خلف الجدار، متى يُختبر، وكيف تنتقل المرحلة إلى ما بعدها دون أن تفسد تشطيبًا منجزًا أو تخفي ملاحظة قابلة للمعالجة.</p>
        </div>
      </header>

      <section className="section">
        <div className="container content-layout">
          <article className="prose">
            <span className="eyebrow">فكرة العمل</span>
            <h2>مقاولات منزلية بلغة يمكن لصاحب العقار متابعتها</h2>
            <p>قد يكون عنوان الخدمة بسيطًا مثل «تأسيس سباكة» أو «دهان واجهة»، لكن التنفيذ الحقيقي يتكون من قرارات ومسؤوليات ونقاط استلام. لذلك بُني هذا الموقع حول شرح النطاق، لا حول قائمة عناوين فقط. نوضح ما ينبغي حسمه قبل العمل، وما يجب فحصه في أثنائه، وما الذي يحتاج تخصصًا أو قرارًا إضافيًا.</p>
            <p>نطاقنا المعلن هو مدينة الرياض، ونخدم مشاريع الفلل والمنازل الجديدة والقائمة بحسب طبيعة العمل وجدول المواعيد. لا نستخدم عنوان شارع غير حقيقي ولا نصف منطقة بأنها مغطاة قبل تأكيد إمكانية الوصول إليها؛ لأن الوضوح في المعلومات هو بداية الوضوح في التنفيذ.</p>

            <h2>ثلاثة مبادئ تنظّم المشروع</h2>
            <div className="steps-list">
              <div className="step-row" data-reveal><span className="step-number">01</span><div><h3>النطاق قبل السعر</h3><p>حصر النقاط والمساحات والمواد والحماية والفك يمنح التقدير معنى، بينما قد يخفي السعر العام فروقًا كبيرة في العمل.</p></div></div>
              <div className="step-row" data-reveal><span className="step-number">02</span><div><h3>الفحص قبل الإغلاق</h3><p>الشبكات والعزل والمسارات تُراجع وهي قابلة للوصول، لأن اكتشاف الملاحظة بعد البلاط أو الدهان يضاعف أثرها.</p></div></div>
              <div className="step-row" data-reveal><span className="step-number">03</span><div><h3>التشخيص قبل التبديل</h3><p>في الصيانة نبحث عن سبب العرض قبل تغيير القطعة، ونوضح متى تكون المشكلة موضعية ومتى تحتاج نطاقًا أوسع.</p></div></div>
            </div>

            <h2>محتوى يخدم القرار لا يحشو الكلمات</h2>
            <p>تتضمن كل خدمة وصفًا أصليًا وخطوات وأسئلة، وتضم المدونة عشرة أدلة عملية. كما تظهر أحياء الرياض في صفحة تغطية مرتبة حسب الجهات، تبدأ بالأحياء الأعلى طلبًا ثم توسع النطاق. هذا الهيكل يسهّل على الزائر ومحرك البحث فهم العلاقة بين النشاط والخدمة والمدينة دون نسخ نفس الصفحة عشرات المرات باسم حي مختلف.</p>
          </article>

          <aside>
            <div className="sidebar-card">
              <span className="card-kicker">استكشف الموقع</span>
              <h3>ابدأ من احتياجك</h3>
              <p>اطلع على الخدمات أو راجع نطاق الأحياء، ثم تواصل بالعنوان الأقرب إلى حالتك.</p>
              <Link className="button button-primary" href="/services"><Icon name="tools" /> جميع الخدمات</Link>
              <Link className="button button-secondary" href="/areas/riyadh"><Icon name="location" /> أحياء الرياض</Link>
            </div>
          </aside>
        </div>
      </section>

      <ContactBand title="لديك مشروع متعدد البنود؟" text="أرسل قائمة مختصرة بالخدمات والموقع وصورًا أو مخططات متاحة، وسنرتب الأسئلة التي يجب حسمها قبل تحديد النطاق." />
      <FAQSection faqs={aboutFaqs} title="أسئلة عن طريقة عملنا" />
    </main>
  );
}
