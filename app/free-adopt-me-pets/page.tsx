import { PetGrid } from "@/components/pet-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Adopt Me Pets - Get Amazing Pets for Free! | ReceivePets",
  description: "🎉 Discover and claim FREE Adopt Me pets! Browse through hundreds of rare pets, legendary pets, and exclusive pets. Get your favorite Adopt Me pets for free today! Join thousands of players getting free pets.",
  keywords: [
    "free adopt me pets",
    "adopt me pets free",
    "free pets adopt me",
    "adopt me free pets 2025",
    "free legendary pets adopt me",
    "adopt me pets giveaway",
    "free rare pets adopt me",
    "adopt me pets claim",
    "free adopt me legendary",
    "adopt me pets no cost"
  ],
  openGraph: {
    title: "Free Adopt Me Pets - Get Amazing Pets for Free!",
    description: "🎉 Discover and claim FREE Adopt Me pets! Browse through hundreds of rare pets, legendary pets, and exclusive pets. Get your favorite Adopt Me pets for free today!",
    type: "website",
    url: "https://receivepets.com/free-adopt-me-pets",
    images: [
      {
        url: "/images/free-pets-og.jpg",
        width: 1200,
        height: 630,
        alt: "Free Adopt Me Pets Collection - ReceivePets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Adopt Me Pets - Get Amazing Pets for Free!",
    description: "🎉 Discover and claim FREE Adopt Me pets! Browse through hundreds of rare pets, legendary pets, and exclusive pets.",
    images: ["/images/free-pets-og.jpg"],
  },
  alternates: {
    canonical: "https://receivepets.com/free-adopt-me-pets",
  },
};

export default function FreeAdoptMePetsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-x-hidden">
      {/* SEO Content Section */}
      <div className="relative z-10">
        
        <PetGrid />
        
        {/* Additional SEO Content */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/80 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Why Choose ReceivePets for Free Adopt Me Pets?
          </h2>
          <div className="text-left space-y-3 text-purple-700">
            <p>
              <strong>Largest Selection:</strong> We offer the biggest collection of free Adopt Me pets, including rare legendary pets, 
              exclusive pets, and seasonal pets that are hard to find elsewhere.
            </p>
            <p>
              <strong>Regular Updates:</strong> Our pet collection is updated daily with new free pets, ensuring you always have 
              access to the latest and most popular Adopt Me pets.
            </p>
            <p>
              <strong>Community Trusted:</strong> Join over 100,000+ satisfied users who have successfully claimed their free pets 
              through ReceivePets - your trusted source for free Adopt Me pets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 