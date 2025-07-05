import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Fredoka, Nunito } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { PerformanceMonitor } from "@/components/performance-monitor"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
})

// Remove the Inter import and use the Google Fonts from CSS

export const metadata: Metadata = {
  title: {
    default: "ReceivePets - Claim and Check Adoptme Pets",
    template: "%s | ReceivePets 🐾",
  },
  description:
    "🎉 Discover and claim AMAZING adoptme pets! Join thousands of kids and pet lovers in our super fun adoptme pet adoption adventure! ",
  keywords: ["free adopt me pets", "adopt me pets value", "adopt me pets free", "buy adopt me pets", "adopt me pets trade", "how to get free pets in adopt me​", "adopt me free pets"],
  authors: [{ name: "ReceivePets Team" }],
  creator: "ReceivePets",
  publisher: "ReceivePets",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://receivepets.com",
    siteName: "ReceivePets",
    title: "ReceivePets - ReceivePets - Claim and Check Adoptme Pets",
    description:
      "🎉 Discover and claim AMAZING adoptme pets! Join thousands of kids and pet lovers in our super fun adoptme pet adoption adventure! ",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ReceivePets - adoptme Pet Adoption",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReceivePets - ReceivePets - Claim and Check Adoptme Pets",
    description:
      "🎉 Discover and claim AMAZING adoptme pets! Join thousands of kids and pet lovers in our super fun adoptme pet adoption adventure! ",
    images: ["/images/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical CSS to prevent layout shifts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent layout shifts during font loading */
            body {
              font-display: swap;
            }
            
            /* Ensure navigation height is consistent */
            nav {
              height: 64px !important;
              min-height: 64px !important;
            }
            
            /* Prevent image layout shifts */
            img {
              max-width: 100%;
              height: auto;
              display: block;
            }
            
            /* Ensure aspect ratios are maintained */
            .aspect-square {
              aspect-ratio: 1 / 1;
            }
            
            /* Prevent content jumping */
            .prevent-cls {
              min-height: 0;
              min-width: 0;
              overflow: hidden;
            }
            
            /* Skeleton loading states */
            .skeleton {
              background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
              background-size: 200% 100%;
              animation: shimmer 1.5s ease-in-out infinite;
            }
            
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `
        }} />
      </head>
      <body className={`bg-fun-pattern ${fredoka.variable} ${nunito.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
        <PerformanceMonitor />
      </body>
    </html>
  )
}

