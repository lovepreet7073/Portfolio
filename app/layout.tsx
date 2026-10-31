import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-ten-livid-ek61h6djfu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lovepreet Kaur — Technical Product Designer & Design Engineer",
    template: "%s · Lovepreet Kaur",
  },
  description:
    "Technical Product Designer & Design Engineer with 2+ years of MERN development experience. UI/UX, design systems and AI-assisted product development.",
  applicationName: "Lovepreet Kaur Portfolio",
  keywords: [
    "Lovepreet Kaur",
    "Technical Product Designer",
    "Design Engineer",
    "UI/UX Designer",
    "Product Designer",
    "Design Systems",
    "React Developer",
    "MERN Stack Developer",
    "Shopify Developer",
    "WordPress Developer",
    "Frontend Developer",
    "Next.js Developer",
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
    title: "Lovepreet Kaur — Technical Product Designer & Design Engineer",
    description:
      "Technical Product Designer & Design Engineer, 2+ years of MERN development. UI/UX · Design Systems · AI-Assisted Development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovepreet Kaur — Technical Product Designer & Design Engineer",
    description:
      "Technical Product Designer & Design Engineer, 2+ years of MERN development. UI/UX · Design Systems · AI-Assisted Development.",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" }, // design-ignore: literal meta theme-color, mirrors --surface light
    { media: "(prefers-color-scheme: dark)", color: "#151823" }, // design-ignore: literal meta theme-color, mirrors --surface dark
  ],
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lovepreet Kaur",
  alternateName: "LK",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Technical Product Designer & Design Engineer",
  description:
    "Technical Product Designer & Design Engineer expanding from 2+ years of MERN development experience — UI/UX, design systems and AI-assisted product development, grounded in shipped production apps.",
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
    "UI/UX Design",
    "Product Design",
    "Design Systems",
    "Design Tokens",
    "Claude Code",
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Shopify",
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
    <html
      lang="en"
      className={`${onest.variable} ${mono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothHashScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
