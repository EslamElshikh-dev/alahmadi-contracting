import Link from "next/link";
import type { Article } from "@/app/lib/articles";
import type { Service } from "@/app/lib/services";
import { Icon } from "./Icons";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <article className="service-card" data-reveal style={{ "--delay": `${(index ?? 0) % 3 * 80}ms` } as React.CSSProperties}>
      <div className="service-card-top">
        <span className="service-icon"><Icon name={service.icon as Parameters<typeof Icon>[0]["name"]} size={27} /></span>
        <span className="service-index">{String((index ?? 0) + 1).padStart(2, "0")}</span>
      </div>
      <div>
        <span className="card-kicker">{service.category}</span>
        <h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3>
        <p>{service.description}</p>
      </div>
      <Link className="text-link" href={`/services/${service.slug}`}>تفاصيل الخدمة <Icon name="arrow" size={18} /></Link>
    </article>
  );
}

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article className="article-card" data-reveal style={{ "--delay": `${index % 3 * 80}ms` } as React.CSSProperties}>
      <Link className={`article-visual tone-${(index % 5) + 1}`} href={`/blog/${article.slug}`} aria-label={article.title}>
        <span className="article-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="article-line" />
        <Icon name={index % 2 === 0 ? "building" : "tools"} size={34} />
      </Link>
      <div className="article-card-body">
        <div className="article-meta"><span>{article.category}</span><span>{article.readingTime}</span></div>
        <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <Link className="text-link" href={`/blog/${article.slug}`}>اقرأ الدليل <Icon name="arrow" size={18} /></Link>
      </div>
    </article>
  );
}
