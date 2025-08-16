import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adopt Me WFL Calculator - Win Fair Lose Trade Calculator | ReceivePets",
  description: "🔥 Use our advanced Adopt Me WFL (Win, Fair, Lose) calculator to check if your trades are fair! Get accurate pet values, compare trades, and make smart trading decisions. Free Adopt Me trade calculator with real-time values.",
  keywords: [
    "adopt me wfl",
    "adopt me calculator",
    "wfl calculator adopt me",
    "adopt me trade calculator",
    "adopt me pet values",
    "adopt me worth calculator",
    "adopt me pets worth",
    "wfl adopt me",
    "adopt me trading calculator",
    "adopt me value list",
    "adopt me pets value calculator",
    "roblox adopt me calculator"
  ],
  openGraph: {
    title: "Adopt Me WFL Calculator - Win Fair Lose Trade Calculator",
    description: "🔥 Use our advanced Adopt Me WFL calculator to check if your trades are fair! Get accurate pet values and make smart trading decisions.",
    type: "website",
    url: "https://receivepets.com/adopt-me-wfl",
    images: [
      {
        url: "/images/wfl-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Adopt Me WFL Calculator - Trade Value Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adopt Me WFL Calculator - Win Fair Lose Trade Calculator",
    description: "🔥 Use our advanced Adopt Me WFL calculator to check if your trades are fair! Get accurate pet values and make smart trading decisions.",
    images: ["/images/wfl-calculator-og.jpg"],
  },
  alternates: {
    canonical: "https://receivepets.com/adopt-me-wfl",
  },
};

export default function WFLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
