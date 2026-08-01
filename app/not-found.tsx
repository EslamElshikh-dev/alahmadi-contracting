import Link from "next/link";
import { Icon } from "@/app/components/Icons";

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container page-hero-inner" data-reveal>
          <span className="eyebrow">404 · الصفحة غير موجودة</span>
          <h1>يبدو أن هذا المسار لم يعد هنا.</h1>
          <p>يمكنك العودة للرئيسية، استعراض الخدمات، أو فتح صفحة أحياء الرياض للوصول إلى المعلومات المطلوبة.</p>
          <div className="button-row">
            <Link className="button button-primary" href="/">العودة للرئيسية</Link>
            <Link className="button button-secondary" href="/services"><Icon name="tools" /> الخدمات</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
