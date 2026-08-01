import type { MetadataRoute } from "next";
import { articles } from "@/app/lib/articles";
import { services } from "@/app/lib/services";
import { absoluteUrl } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-01T00:00:00+03:00");
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/areas/riyadh"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/privacy"), lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.85,
  }));
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.72,
  }));
  return [...staticPages, ...servicePages, ...articlePages];
}
