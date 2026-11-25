import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer, MobileCallBar } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion";
import { seasonal, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Property Maintenance Barrie | Lawn Care & Snow Removal | J.T. Property Maintenance",
    template: "%s",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#005b2d" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: site.name,
  url: site.url,
  telephone: "+1-705-721-9335",
  email: site.email,
  image: `${site.url}/images/og.jpg`,
  logo: `${site.url}/images/jt-logo.png`,
  foundingDate: String(site.founded),
  areaServed: { "@type": "City", name: "Barrie", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
  address: { "@type": "PostalAddress", addressLocality: "Barrie", addressRegion: "ON", addressCountry: "CA" },
  award: ["Consumer Choice Award 2020 – Lawn Maintenance", "Consumer Choice Award 2026 – Lawn Maintenance"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property maintenance services",
    itemListElement: [...seasonal.warm, ...seasonal.winter.slice(0, 3)].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
          Skip to content
        </a>
        <SmoothScroll>
          {/* Clips Reveal's off-screen x offsets so phones don't widen the page; clip (not hidden) keeps sticky + Lenis working. Must not be on body: mobile Chrome ignores it there. */}
          <div className="overflow-x-clip">
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <MobileCallBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
