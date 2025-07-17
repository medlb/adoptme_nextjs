"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Heart, ArrowRightLeft, Star, Gift, Zap, Users, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Animated blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-gradient-to-r from-blue-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Floating stickers with enhanced positioning */}
        <div className="absolute top-16 left-8 w-12 h-12 sm:w-16 sm:h-16 animate-gentle-float opacity-90 hover:scale-110 transition-transform duration-300">
        <Image 
            src="/stickers/New_Fallow_Deer_sticker.webp" 
            alt="Adopt Me Deer" 
            width={80}
            height={80}
            className="object-cover w-full h-full drop-shadow-lg"
            priority
          />
        </div>
        <div className="absolute top-32 right-12 w-10 h-10 sm:w-14 sm:h-14 animate-soft-bounce opacity-90 hover:scale-110 transition-transform duration-300">
          <Image 
            src="/stickers/Dragon_Breath_Animated_Sticker.webp" 
            alt="Adopt Me Dragon" 
            width={56}
            height={56}
            className="object-cover w-full h-full drop-shadow-lg"
            priority
          />
        </div>
        <div className="absolute bottom-32 left-12  h-14  sm:h-20 animate-smooth-wiggle opacity-90 hover:scale-110 transition-transform duration-300">
          <Image 
            src="/stickers/Bee_Sticker.webp" 
            alt="Adopt Me Bee" 
            width={64}
            height={64}
            className="object-cover w-full h-full drop-shadow-lg"
            priority
          />
        </div>
        <div className="absolute bottom-16 right-8 w-12 h-12 sm:w-16 sm:h-16 animate-gentle-float opacity-90 hover:scale-110 transition-transform duration-300">
          <Image 
            src="/stickers/New_Penguin_sticker.webp" 
            alt="Adopt Me Penguin" 
            width={64}
            height={64}
            className="object-cover w-full h-full drop-shadow-lg"
            priority
          />
        </div>

        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle opacity-80"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-sparkle animation-delay-2000 opacity-80"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-sparkle animation-delay-4000 opacity-80"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          
          
          {/* Main heading with enhanced typography and animations */}
          <h1 className={`font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 delay-200`}>
            <span className="block mb-2 sm:mb-3 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
              Get Free
            </span>
            <span className="block mb-2 sm:mb-3 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
              Adopt Me Pets
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              + Smart W/F/L Calculator
            </span>
          </h1>

          {/* Enhanced subtitle with features */}
          <p className={`max-w-3xl sm:max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed font-medium ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 delay-400`}>
            Claim free Adopt Me pets and use our intelligent trade calculator to determine if your trades are 
            <span className="font-bold text-purple-600"> win</span>, 
            <span className="font-bold text-yellow-600"> fair</span>, or 
            <span className="font-bold text-red-600"> lose</span>
          </p>

          

          {/* Enhanced CTA buttons with premium styling */}
          <div className={`flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-8 sm:mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 delay-800`}>
            {/* Primary CTA - FREE ADOPT ME PETS */}
            <Button
              asChild
              size="lg"
              className="group relative w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-10 sm:px-16 py-5 sm:py-7 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-0 rounded-2xl"
            >
              <Link href="/free-adopt-me-pets" className="flex items-center justify-center relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <Heart className="mr-3 h-6 w-6 animate-scale-pulse group-hover:animate-bounce text-pink-200" />
                <span className="relative z-10 font-extrabold tracking-wide">FREE ADOPT ME PETS</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            </Button>

            {/* Secondary CTA - Trade Calculator */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group relative w-full sm:w-auto bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 hover:from-yellow-100 hover:via-orange-100 hover:to-red-100 text-purple-800 hover:text-purple-900 px-10 sm:px-16 py-5 sm:py-7 text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500 rounded-2xl overflow-hidden"
            >
              <Link href="/adopt-me-wfl" className="flex items-center justify-center relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-orange-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <ArrowRightLeft className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 text-yellow-600" />
                <span className="relative z-10 font-extrabold tracking-wide">Trade Calculator</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </Link>
            </Button>
          </div>

         
        </div>
      </div>

      
    </section>
  )
}
