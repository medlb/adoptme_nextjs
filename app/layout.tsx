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
    default: "ReceivePets - Get Free Adopt Me Pets & WFL Calculator | #1 Adopt Me Site 🐾",
    template: "%s | ReceivePets 🐾",
  },
  description:
    "🎉 Get FREE Adopt Me pets & use our advanced WFL calculator! Claim legendary pets, rare pets & exclusive pets for free. Check trade values with our Adopt Me calculator. Join 100,000+ satisfied players getting free pets daily!",
  keywords: [
    "free adopt me pets", 
    "adopt me wfl calculator", 
    "adopt me pets free", 
    "adopt me trade calculator", 
    "free pets adopt me", 
    "adopt me pet values", 
    "adopt me pets giveaway", 
    "adopt me calculator", 
    "adopt me pets 2025", 
    "roblox adopt me pets", 
    "adopt me pets worth", 
    "legendary pets free", 
    "rare pets adopt me", 
    "adopt me trading", 
    "receivepets"
  ],
  authors: [{ name: "ReceivePets Team" }],
  creator: "ReceivePets",
  publisher: "ReceivePets",
  category: "Gaming",
  classification: "Games, Virtual Pets, Trading Calculator",
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
    title: "ReceivePets - Get Free Adopt Me Pets & WFL Calculator",
    description:
      "🎉 Get FREE Adopt Me pets & use our advanced WFL calculator! Claim legendary pets, rare pets & exclusive pets for free. Join 100,000+ satisfied players getting free pets daily!",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ReceivePets - Free Adopt Me Pets and WFL Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ReceivePets",
    creator: "@ReceivePets",
    title: "ReceivePets - Get Free Adopt Me Pets & WFL Calculator",
    description:
      "🎉 Get FREE Adopt Me pets & use our advanced WFL calculator! Claim legendary pets, rare pets & exclusive pets for free. Join 100,000+ players!",
    images: ["/images/og-image.jpg"],
  },
  applicationName: "ReceivePets",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5CF6" },
    { media: "(prefers-color-scheme: dark)", color: "#7C3AED" }
  ],
  verification: {
    google: "5NDZFIy2moA7Nq6yT7m2f0WKlULDMuLap43NJw5mw28",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ReceivePets",
    "description": "Get FREE Adopt Me pets & use our advanced WFL calculator! The #1 destination for free Adopt Me pets and trading calculations.",
    "url": "https://receivepets.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://receivepets.com/free-adopt-me-pets?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReceivePets",
      "url": "https://receivepets.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://receivepets.com/images/logo.png"
      }
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "ReceivePets WFL Calculator",
      "applicationCategory": "Game",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        
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

