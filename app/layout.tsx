import type { Metadata, Viewport } from "next";
import { Footer } from "@/app/components/Footer";
import { FloatingActions } from "@/app/components/FloatingActions";
import { Header } from "@/app/components/Header";
import { JsonLd } from "@/app/components/JsonLd";
import { RevealObserver } from "@/app/components/Reveal";
import { services } from "@/app/lib/services";
import {
  absoluteUrl,
  DEFAULT_SITE_URL,
  PHONE_E164,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/app/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_SITE_URL),
  title: {
    default: `${SITE_NAME} | مقاول تأسيس وصيانة وتشطيبات بالرياض`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "الأحمدي للمقاولات يقدم خدمات تأسيس وصيانة الكهرباء والسباكة والصرف الصحي، السيراميك، ترميم الواجهات، الدهانات والإنارة في مدينة الرياض.",
  applicationName: SITE_NAME,
  category: "مقاولات وصيانة منازل",
  keywords: [
    "مقاول بالرياض",
    "مقاولات الرياض",
    "سباك بالرياض",
    "كهربائي بالرياض",
    "ترميم فلل الرياض",
    "تشطيبات منازل الرياض",
    "الأحمدي للمقاولات",
  ],
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | تأسيس وصيانة وتشطيبات بالرياض`,
    description: SITE_TAGLINE,
    url: "/",
    images: [{ url: "/og-card.svg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | مقاولات الرياض`,
    description: SITE_TAGLINE,
    images: ["/og-card.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "format-detection": "telephone=yes",
    "geo.region": "SA-01",
    "geo.placename": "Riyadh",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#102522",
  colorScheme: "light",
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": `${absoluteUrl()}#business`,
  name: SITE_NAME,
  url: absoluteUrl(),
  image: absoluteUrl("/og-card.svg"),
  logo: absoluteUrl("/favicon.svg"),
  telephone: PHONE_E164,
  description:
    "خدمات تأسيس وصيانة وتشطيب للمنازل والفلل داخل مدينة الرياض، تشمل الكهرباء والسباكة والصرف والأرضيات والواجهات والدهانات والإنارة.",
  areaServed: {
    "@type": "City",
    name: "الرياض",
    alternateName: "Riyadh",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_E164,
    contactType: "customer service",
    areaServed: "SA",
    availableLanguage: ["Arabic"],
  },
  knowsAbout: services.map((service) => service.title),
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      areaServed: "مدينة الرياض",
    },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a>
        <JsonLd data={businessSchema} />
        <Header />
        {children}
        <Footer />
        <FloatingActions />
        <RevealObserver />
      </body>
    </html>
  );
}
