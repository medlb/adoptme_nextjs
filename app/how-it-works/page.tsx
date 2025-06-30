import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Heart, Share2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "⚡ How It Works - Super Easy Pet Getting! ⚡",
  description: "🎉 Learn how to claim your virtual pet in just 3 SUPER easy steps! Quick, fun, and totally FREE! 🐾",
}

const steps = [
  {
    number: 1,
    icon: Search,
    emoji: "🔍",
    title: "FIND YOUR DREAM PET!",
    description:
      "🌟 Look through our AMAZING collection of super cute pets! Each one is special with cool colors and awesome powers! Pick your favorite! 🎈",
    color: "from-purple-400 via-pink-400 to-blue-400",
  },
  {
    number: 2,
    icon: Heart,
    emoji: "💖",
    title: "CLAIM IT RIGHT NOW!",
    description:
      '🎉 Found the PERFECT pet? Click "CLAIM ME!" and type your cool name! BOOM - your pet is yours in seconds! So easy! 🚀',
    color: "from-pink-400 via-red-400 to-orange-400",
  },
  {
    number: 3,
    icon: Share2,
    emoji: "📱",
    title: "SHARE & HAVE FUN!",
    description:
      "🎊 Show off your awesome new pet to all your friends! Take screenshots, share everywhere, and be the coolest kid ever! 🌈",
    color: "from-blue-400 via-green-400 to-yellow-400",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 py-10 sm:py-16 relative overflow-x-hidden overflow-hidden px-2 sm:px-4 md:px-8">
      {/* Fun floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-6 left-6 text-3xl sm:top-10 sm:left-10 sm:text-6xl animate-bounce-fun opacity-30">🎯</div>
        <div className="absolute top-16 right-6 text-2xl sm:top-20 sm:right-20 sm:text-5xl animate-float opacity-30">⚡</div>
        <div className="absolute bottom-16 left-6 text-4xl sm:bottom-20 sm:left-20 sm:text-7xl animate-wiggle opacity-30">🎪</div>
        <div className="absolute bottom-6 right-6 text-2xl sm:bottom-10 sm:right-10 sm:text-5xl animate-bounce-fun opacity-30">🎭</div>
        <div className="absolute top-1/2 left-1/4 text-lg sm:text-4xl animate-float opacity-30">🌟</div>
        <div className="absolute top-1/3 right-1/3 text-2xl sm:text-6xl animate-wiggle opacity-30">🎨</div>
      </div>
      <div className="relative max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mt-8">
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-purple-800 mb-4 sm:mb-6 text-center">How It Works</h1>
        <p className="text-base sm:text-lg text-purple-700 leading-relaxed mb-4">
          Claiming your dream pet is super easy! Just follow these simple steps and start your adventure. 🎉
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8">
          <div className="border-4 border-green-400 bg-green-100 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl font-bold text-green-600 mb-2 sm:mb-4 animate-pulse">100%</div>
            <div className="font-title text-lg sm:text-2xl text-green-800 font-bold">🆓 TOTALLY FREE!</div>
          </div>
          <div className="border-4 border-blue-400 bg-blue-100 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl font-bold text-blue-600 mb-2 sm:mb-4 animate-bounce">{'<'}30s</div>
            <div className="font-title text-lg sm:text-2xl text-blue-800 font-bold">⚡ SUPER FAST!</div>
          </div>
          <div className="border-4 border-purple-400 bg-purple-100 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl font-bold text-purple-600 mb-2 sm:mb-4 animate-wiggle">50K+</div>
            <div className="font-title text-lg sm:text-2xl text-purple-800 font-bold">👫 HAPPY KIDS!</div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block bg-gradient-to-r from-green-300 to-blue-300 text-white font-bold px-6 py-3 rounded-full shadow-lg animate-glow text-base sm:text-lg">Start your magical pet journey now! 🦄</span>
        </div>
      </div>
    </div>
  )
}
