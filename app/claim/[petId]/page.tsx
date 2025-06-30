import { ClaimForm } from "@/components/claim-form"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const PETS_API_URL = "https://elvebredd.com/data/Pets.json"

type Props = {
  params: { petId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(PETS_API_URL)
    if (!res.ok) {
      return {
        title: "Pet Not Found | ReceivePets",
        description: "Sorry, this pet couldn't be found. Try choosing another amazing pet!",
      }
    }
    
    const data = await res.json()
    const pet = data[params.petId]

    if (!pet) {
      return {
        title: "Pet Not Found | ReceivePets",
        description: "Sorry, this pet couldn't be found. Try choosing another amazing pet!",
      }
    }

    return {
      title: `Claim ${pet.name} | ReceivePets 🐾`,
      description: `🎉 Claim your ${pet.name} adoptme pet today! Join thousands of happy kids and get your FREE pet now!`,
      keywords: [`${pet.name}`, "adoptme pet", "free pet", "pet adoption", "roblox pet", "kids game"],
      openGraph: {
        title: `Claim ${pet.name} | ReceivePets 🐾`,
        description: `🎉 Claim your ${pet.name} adoptme pet today!`,
        images: [
          {
            url: pet.image ? `https://elvebredd.com${pet.image}` : "/placeholder.svg",
            width: 300,
            height: 300,
            alt: `${pet.name} - ${pet.rarity || 'adoptme Pet'}`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Claim ${pet.name} | ReceivePets 🐾`,
        description: `🎉 Claim your ${pet.name} adoptme pet today!`,
        images: [pet.image ? `https://elvebredd.com${pet.image}` : "/placeholder.svg"],
      },
    }
  } catch (error) {
    return {
      title: "Pet Not Found | ReceivePets",
      description: "Sorry, this pet couldn't be found. Try choosing another amazing pet!",
    }
  }
}

export default async function ClaimPage({ params }: Props) {
  try {
    const res = await fetch(PETS_API_URL)
    if (!res.ok) {
      notFound()
    }
    
    const data = await res.json()
    const pet = data[params.petId]

    if (!pet) {
      notFound()
    }

    // Add full image URL and safe defaults for ClaimForm
    const petWithDefaults = {
      ...pet,
      image: pet.image ? `https://elvebredd.com${pet.image}` : "/placeholder.svg",
      color: pet.color || "from-blue-200 via-purple-200 to-pink-200",
      powers: Array.isArray(pet.powers) ? pet.powers : ["Super Cuteness"],
      personality: pet.personality || "Adorable and friendly!",
      rarity: pet.rarity || "Common",
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
           

            <ClaimForm pet={petWithDefaults} petId={params.petId} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
