import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Fredoka, Nunito } from "next/font/google"

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
    default: "🐾 ReceivePets - Claim Your Super Cute Virtual Pet! 🌟",
    template: "%s | ReceivePets 🐾",
  },
  description:
    "🎉 Discover and claim AMAZING virtual pets! Join thousands of kids and pet lovers in our super fun virtual pet adoption adventure! 🐶🐱🦄",
  keywords: ["virtual pet", "cute pets", "kids games", "pet adoption", "fun games", "digital pets", "adopt me pets"],
  authors: [{ name: "ReceivePets Team" }],
  creator: "ReceivePets",
  publisher: "ReceivePets",
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
    title: "🐾 ReceivePets - Claim Your Super Cute Virtual Pet! 🌟",
    description:
      "🎉 Discover and claim AMAZING virtual pets! Join thousands of kids and pet lovers in our super fun virtual pet adoption adventure! 🐶🐱🦄",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ReceivePets - Virtual Pet Adoption",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🐾 ReceivePets - Claim Your Super Cute Virtual Pet! 🌟",
    description:
      "🎉 Discover and claim AMAZING virtual pets! Join thousands of kids and pet lovers in our super fun virtual pet adoption adventure! 🐶🐱🦄",
    images: ["/images/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
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
      </body>
    </html>
  )
}

