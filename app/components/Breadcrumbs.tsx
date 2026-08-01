import Link from "next/link";
import type { BreadcrumbItem } from "@/app/lib/site";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs container" aria-label="مسار الصفحة">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
