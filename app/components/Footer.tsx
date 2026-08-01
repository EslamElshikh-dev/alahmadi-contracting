import Link from "next/link";
import { articles } from "@/app/lib/articles";
import { services } from "@/app/lib/services";
import { PHONE_DISPLAY, PHONE_LINK, SITE_NAME, WHATSAPP_LINK } from "@/app/lib/site";
import { Icon } from "./Icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta-wrap container">
        <section className="footer-cta" aria-labelledby="footer-cta-title">
          <div>
            <span className="eyebrow light">مشروعك يبدأ بصورة أو مكالمة</span>
            <h2 id="footer-cta-title">أرسل تفاصيل الخدمة والحي في الرياض</h2>
            <p>اذكر نوع العقار، الخدمة المطلوبة، وصور الحالة إن وجدت لنبدأ بفهم نطاق العمل.</p>
          </div>
          <div className="footer-cta-actions">
            <a className="button button-white" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> واتساب</a>
            <a className="button button-ghost-light" href={PHONE_LINK}><Icon name="phone" /> اتصال</a>
          </div>
        </section>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark" aria-hidden="true"><span>أ</span></span>
            <span className="brand-copy"><strong>الأحمدي</strong><small>للمقاولات · الرياض</small></span>
          </Link>
          <p>تأسيس وصيانة وتشطيبات للمنازل والفلل داخل مدينة الرياض، بمراحل واضحة ومحتوى يساعدك على فهم الخدمة قبل التواصل.</p>
          <a className="footer-number" href={PHONE_LINK} dir="ltr">{PHONE_DISPLAY}</a>
        </div>

        <div>
          <h3>الخدمات</h3>
          <ul>
            {services.slice(0, 6).map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.shortTitle}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3>الأدلة</h3>
          <ul>
            {articles.slice(0, 5).map((article) => <li key={article.slug}><Link href={`/blog/${article.slug}`}>{article.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3>روابط مهمة</h3>
          <ul>
            <li><Link href="/areas/riyadh">أحياء ومناطق الخدمة</Link></li>
            <li><Link href="/about">عن {SITE_NAME}</Link></li>
            <li><Link href="/contact">طلب خدمة</Link></li>
            <li><Link href="/privacy">سياسة الخصوصية</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
        <p>نطاق الخدمة المعلن: مدينة الرياض</p>
      </div>
    </footer>
  );
}
