import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Fredoka, Nunito } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
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
      <body className={`bg-fun-pattern ${fredoka.variable} ${nunito.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}

