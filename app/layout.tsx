import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothHashScroll } from "@/components/SmoothHashScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lovepreet Kaur — React.js & MERN Developer",
  description:
    "React.js Developer with 2+ years of experience building fast, responsive web apps. Specializing in MERN stack, Shopify, and WordPress.",
  keywords: [
    "Lovepreet Kaur",
    "React Developer",
    "MERN Stack",
    "Shopify Developer",
    "WordPress",
    "Frontend Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Lovepreet Kaur" }],
  openGraph: {
    title: "Lovepreet Kaur — React.js & MERN Developer",
    description:
      "React.js Developer with 2+ years of experience. MERN · Shopify · WordPress.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
