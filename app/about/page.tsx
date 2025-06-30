import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Sparkles, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - The Coolest Pet Team Ever!",
  description: "Learn about ReceivePets and our super fun mission to make adoptme pet adoption AMAZING for kids! 🐾",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-10 sm:py-16 relative overflow-x-hidden overflow-hidden px-2 sm:px-4 md:px-8">
      {/* Fun floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-6 left-6 text-3xl sm:top-10 sm:left-10 sm:text-6xl animate-bounce-fun opacity-30">🎈</div>
        <div className="absolute top-16 right-6 text-2xl sm:top-20 sm:right-20 sm:text-5xl animate-float opacity-30">🌟</div>
        <div className="absolute bottom-16 left-6 text-4xl sm:bottom-20 sm:left-20 sm:text-7xl animate-wiggle opacity-30">🎉</div>
        <div className="absolute bottom-6 right-6 text-2xl sm:bottom-10 sm:right-10 sm:text-5xl animate-bounce-fun opacity-30">🦄</div>
        <div className="absolute top-1/2 left-1/4 text-lg sm:text-4xl animate-float opacity-30">✨</div>
        <div className="absolute top-1/3 right-1/3 text-2xl sm:text-6xl animate-wiggle opacity-30">🎊</div>
      </div>
      <div className="relative max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mt-8">
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-purple-800 mb-4 sm:mb-6 text-center">About ReceivePets</h1>
        <p className="text-base sm:text-lg text-purple-700 leading-relaxed mb-4">
          ReceivePets is a magical place where kids and pet lovers can claim super cute adoptme pets for FREE! Our mission is to make adoptme pet adoption fun, safe, and accessible for everyone. 🎉
        </p>
        <p className="text-base sm:text-lg text-purple-700 leading-relaxed mb-4">
          We believe every child deserves a fun and friendly digital companion. That's why we offer a huge variety of adorable pets, exciting quests, and a safe, welcoming community. 🦄
        </p>
        <p className="text-base sm:text-lg text-purple-700 leading-relaxed mb-4">
          Join thousands of happy kids and start your adventure today! 🚀
        </p>
        <div className="flex justify-center mt-6">
          <span className="inline-block bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold px-6 py-3 rounded-full shadow-lg animate-glow text-base sm:text-lg">Thank you for being part of our community! 💜</span>
        </div>
      </div>
    </div>
  )
}
