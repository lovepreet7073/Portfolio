import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import { SmoothHashScroll } from "@/components/SmoothHashScroll";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-ten-livid-ek61h6djfu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lovepreet Kaur — React.js & MERN Developer",
    template: "%s · Lovepreet Kaur",
  },
  description:
    "React.js Developer with 2+ years of experience building fast, responsive web apps. Specializing in MERN stack, Shopify, and WordPress.",
  applicationName: "Lovepreet Kaur Portfolio",
  keywords: [
    "Lovepreet Kaur",
    "React Developer",
    "MERN Stack Developer",
    "Shopify Developer",
    "WordPress Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "Web Developer Punjab",
    "Web Developer India",
  ],
  authors: [{ name: "Lovepreet Kaur", url: SITE_URL }],
  creator: "Lovepreet Kaur",
  publisher: "Lovepreet Kaur",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Lovepreet Kaur — Portfolio",
    title: "Lovepreet Kaur — React.js & MERN Developer",
    description:
      "React.js Developer with 2+ years of experience. MERN · Shopify · WordPress.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovepreet Kaur — React.js & MERN Developer",
    description:
      "React.js Developer with 2+ years of experience. MERN · Shopify · WordPress.",
    creator: "@lovepreetkaur",
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
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F2025", // design-ignore: literal meta theme-color, mirrors --surface (see DESIGN.md)
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lovepreet Kaur",
  alternateName: "LK",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "React.js & MERN Developer",
  description:
    "React.js Developer with 2+ years of experience building production-grade web applications across the MERN stack, Shopify, and WordPress.",
  email: "mailto:lovepreetkaur7073@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Kodion Softwares",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rupnagar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Shopify",
    "Liquid",
    "WordPress",
    "JavaScript",
    "TypeScript",
    "Socket.IO",
    "REST APIs",
  ],
  sameAs: [
    "https://github.com/lovepreet7073",
    "https://www.linkedin.com/in/lovepreetkaur2611",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lovepreet Kaur — Portfolio",
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: "Lovepreet Kaur" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${onest.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SmoothHashScroll />
        {children}
      </body>
    </html>
  );
}
