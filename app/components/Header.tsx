import Link from "next/link";
import { PHONE_DISPLAY, PHONE_LINK, primaryNav } from "@/app/lib/site";
import { Icon } from "./Icons";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-shell container">
        <Link className="brand" href="/" aria-label="الأحمدي للمقاولات - الرئيسية">
          <span className="brand-mark" aria-hidden="true"><span>أ</span></span>
          <span className="brand-copy">
            <strong>الأحمدي</strong>
            <small>للمقاولات · الرياض</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>

        <a className="header-call" href={PHONE_LINK} aria-label={`اتصل على ${PHONE_DISPLAY}`}>
          <span className="header-call-icon"><Icon name="phone" size={18} /></span>
          <span><small>تواصل مباشرة</small><b dir="ltr">{PHONE_DISPLAY}</b></span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="فتح قائمة الموقع"><Icon name="menu" size={26} /></summary>
          <nav aria-label="قائمة الجوال">
            {primaryNav.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
            <a className="mobile-menu-call" href={PHONE_LINK}><Icon name="phone" size={18} /> اتصال الآن</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
