import { Icon } from "./Icons";
import { PHONE_LINK, whatsappMessage } from "@/app/lib/site";

export function ContactBand({
  title = "هل لديك مشروع أو عطل يحتاج تقييمًا؟",
  text = "أرسل نوع الخدمة والحي وصور الموقع إن وجدت، أو اتصل مباشرة لمناقشة الخطوة المناسبة.",
  message = "مرحبًا، أرغب في الاستفسار عن إحدى خدمات الأحمدي للمقاولات في الرياض.",
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="contact-band section-sm">
      <div className="container contact-band-inner" data-reveal>
        <div>
          <span className="eyebrow light">خطوة أولى واضحة</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="button-row">
          <a className="button button-white" href={whatsappMessage(message)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> أرسل عبر واتساب</a>
          <a className="button button-ghost-light" href={PHONE_LINK}><Icon name="phone" /> اتصل الآن</a>
        </div>
      </div>
    </section>
  );
}
