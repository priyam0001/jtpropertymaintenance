import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer, MobileCallBar } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion";
import { award, pageMeta, seasonal, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageMeta.home.title,
    template: "%s",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#005b2d" }; // keep in sync with --color-primary in globals.css

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: site.name,
  url: site.url,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  image: `${site.url}${site.ogImage}`,
  logo: `${site.url}${site.logo.src}`,
  foundingDate: String(site.founded),
  areaServed: { "@type": "City", name: site.city, containedInPlace: { "@type": "AdministrativeArea", name: site.region } },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.regionCode, addressCountry: site.country },
  award: award ? `${award.name} – ${award.category} (${award.years})` : undefined,
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
