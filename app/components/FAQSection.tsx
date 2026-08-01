import type { FAQ } from "@/app/lib/site";
import { Icon } from "./Icons";

export function FAQSection({
  faqs,
  title = "أسئلة شائعة",
  intro = "إجابات مباشرة عن أكثر التفاصيل التي يسأل عنها أصحاب المنازل قبل بدء العمل.",
}: {
  faqs: FAQ[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="section faq-section" aria-labelledby="faq-heading">
      <div className="container faq-layout">
        <div className="section-heading sticky-heading" data-reveal>
          <span className="eyebrow">إجابات واضحة</span>
          <h2 id="faq-heading">{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="faq-item" data-reveal style={{ "--delay": `${Math.min(index, 4) * 70}ms` } as React.CSSProperties}>
              <summary><span>{faq.question}</span><span className="faq-icon"><Icon name="chevron" size={20} /></span></summary>
              <div className="faq-answer"><p>{faq.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
