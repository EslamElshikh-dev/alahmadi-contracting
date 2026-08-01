import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "الأحمدي للمقاولات",
    short_name: "الأحمدي",
    description: "تأسيس وصيانة وتشطيبات للمنازل والفلل داخل مدينة الرياض.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffefa",
    theme_color: "#102522",
    lang: "ar",
    dir: "rtl",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
