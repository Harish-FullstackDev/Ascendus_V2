import "./globals.css";
import "./font.css";
// import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import CookieConsent from "../components/Cookies/CookieConsent";
import TypographyGuard from "../components/TypographyGuard";
import ContactUsButton from "../components/Contactusbutton/contact_us_button";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { headers } from "next/headers";

// Every page must render per request to carry the CSP nonce (see
// src/middleware.ts). Reading headers() below does this for most routes; this
// also covers routes with generateStaticParams, which would otherwise be
// prerendered at build time without a nonce and have their scripts blocked.
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#2e3033",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ascendus | Enterprise SAP & IT Consulting GCC",
    template: "%s | Ascendus"
  },
  description: "Ascendus delivers SAP consulting, IT managed services and digital transformation for enterprises in Saudi Arabia, the UAE and the GCC.",
  authors: [{ name: "Ascendus", url: SITE_URL }],
  creator: "Ascendus",
  publisher: "Ascendus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ascendus",
    title: "Ascendus | Enterprise Technology, SAP and Managed Services",
    description: "Ascendus designs, builds and runs enterprise technology: SAP, cloud, data, AI, security and managed operations, under one team.",
    images: [
      {
        url: "/og-image.png?v=3",
        width: 512,
        height: 512,
        alt: "Ascendus Enterprise Solutions",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Search Console verification: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once
  // Google provides the code. No tag is emitted until then.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  twitter: {
    card: "summary",
    title: "Ascendus | Enterprise Technology, SAP and Managed Services",
    description: "Ascendus designs, builds and runs enterprise technology: SAP, cloud, data, AI, security and managed operations, under one team.",
    images: ["/og-image.png?v=3"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Reading the request headers renders every page per request, so each
  // response carries the fresh CSP nonce set by src/middleware.ts. Next.js adds
  // that nonce to its own scripts. The JSON-LD blocks below need none: they are
  // data, not executed, so CSP doesn't apply to them. (Browsers also hide the
  // nonce attribute from JavaScript, so setting it here causes a hydration
  // mismatch.)
  await headers();
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning style={{ "--lineWidth": "2px" } as React.CSSProperties}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white">
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        {/* <ScrollToTop /> */}
        {/* <ContactUsButton /> */}
        <CookieConsent />
        <TypographyGuard />
      </body>
    </html>
  );
}
