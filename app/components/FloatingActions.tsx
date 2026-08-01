import { PHONE_LINK, WHATSAPP_LINK } from "@/app/lib/site";
import { Icon } from "./Icons";

export function FloatingActions() {
  return (
    <aside className="floating-actions" aria-label="تواصل سريع">
      <a className="float-action float-whatsapp" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">
        <Icon name="whatsapp" size={27} />
        <span>واتساب</span>
      </a>
      <a className="float-action float-call" href={PHONE_LINK} aria-label="اتصل الآن">
        <Icon name="phone" size={23} />
        <span>اتصال</span>
      </a>
    </aside>
  );
}
