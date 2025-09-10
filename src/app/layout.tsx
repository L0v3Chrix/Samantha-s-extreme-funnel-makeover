import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import PostHogProvider from "@/components/providers/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Samantha's Extreme Funnel Makeover | Psychology-First Conversion System",
  description: "Transform your funnel with Samantha's psychology-first approach. Get 67%+ conversion rates with custom interactive tools and proven behavioral triggers. Alumni-only offer: $3,000 complete funnel transformation.",
  keywords: "funnel optimization, conversion psychology, behavioral triggers, conversion rate optimization, funnel design, psychology marketing",
  authors: [{ name: "Samantha", url: "https://raizethevibe.com" }],
  creator: "Samantha - Funnel Psychology Expert",
  openGraph: {
    title: "Samantha's Extreme Funnel Makeover",
    description: "Transform your funnel with psychology-first design. 67%+ conversion rates guaranteed.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/samantha-headshot.jpg",
        width: 400,
        height: 600,
        alt: "Samantha - Funnel Psychology Expert"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Samantha's Extreme Funnel Makeover",
    description: "Psychology-first funnel transformation with guaranteed 67%+ conversion rates.",
    images: ["/samantha-headshot.jpg"]
  },
  robots: {
    index: true,
    follow: true,
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/samantha-headshot.jpg" as="image" />
        <link rel="dns-prefetch" href="https://app.posthog.com" />
      </head>
      <body className={`antialiased ${inter.className}`}>
        <Suspense fallback={null}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}