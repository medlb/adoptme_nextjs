import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Heart, ArrowRightLeft , Star, Gift } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="h-screen relative overflow-x-hidden overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-40 lg:py-12 sm:py-20 md:py-32">
      {/* Enhanced floating elements with better positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative elements: consider hiding some on xs screens if performance is an issue */}
        <div className="absolute top-10 left-10 w-10 h-10 sm:w-16 sm:h-16 animate-gentle-float opacity-80">
          <Image 
            src="/stickers/Bee_Sticker.webp" 
            alt="Adopt Me" 
            width={64}
            height={64}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute top-24 right-8 w-8 h-8 sm:top-32 sm:right-32 sm:w-12 sm:h-12 animate-soft-bounce opacity-80">
          <Image 
            src="/stickers/Dragon_Breath_Animated_Sticker.webp" 
            alt="Adopt Me" 
            width={48}
            height={48}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute bottom-24 left-8 w-12 h-12 sm:bottom-32 sm:left-32 sm:w-20 sm:h-20 animate-smooth-wiggle opacity-80">
          <Image 
            src="/stickers/New_Fallow_Deer_sticker.webp" 
            alt="Adopt Me" 
            width={80}
            height={80}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute bottom-10 right-10 w-10 h-10 sm:bottom-20 sm:right-20 sm:w-14 sm:h-14 animate-gentle-float opacity-80">
          <Image 
            src="/stickers/New_Penguin_sticker.webp" 
            alt="Adopt Me" 
            width={56}
            height={56}
            className="object-cover w-full h-full"
            priority
          />
        </div>
       
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center">
          

          {/* Enhanced main heading with better typography */}
          <h1 className="font-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-6 sm:mb-8 animate-slide-in-up stagger-1 leading-tight">
            <span className="block mb-1 sm:mb-2">Get Free</span>
            <span className="block text-magical animate-gradient-shift mb-1 sm:mb-2">Adopt Me Pets + Smart W/F/L</span>
            <span className="block"> Trades calculator</span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="max-w-2xl sm:max-w-4xl mx-auto text-base xs:text-lg sm:text-xl md:text-2xl text-purple-700 mb-8 sm:mb-12 leading-relaxed font-bold animate-slide-in-up stagger-2">
          Claim free Adopt Me pets in seconds and use smart trade calculator to check if your trade is win, fair, or lose
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex-col xs:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 sm:mb-16 animate-slide-in-up stagger-3 flex text-xs">
            <Button
              asChild
              size="lg"
              className="w-full xs:w-auto btn-magical bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white px-6 sm:px-12 py-4 sm:py-6 sm:text-xl md:text-2xl font-extrabold shadow-2xl hover:shadow-3xl text-base"
            >
              <Link href="/freeadoptmepets" className="">
                <Heart className="mr-2 sm:mr-3 h-5 w-5 sm:h-8 sm:w-8 animate-scale-pulse" />
                FREE ADOPT ME PETS
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full xs:w-auto btn-magical border-4 border-yellow-400 bg-gradient-to-r from-yellow-100 to-orange-100 text-purple-700 hover:from-yellow-200 hover:to-orange-200 px-6 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl md:text-2xl font-bold shadow-2xl hover:shadow-3xl"
            >
              <Link href="/tradingvalue">
                <ArrowRightLeft className="mr-2 sm:mr-3 h-5 w-5 sm:h-8 sm:w-8 " />
                Trade Calculator
              </Link>
            </Button>
          </div>

          {/* Enhanced feature badges */}
          {/* <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 text-sm xs:text-base sm:text-lg text-purple-600 font-bold animate-slide-in-up stagger-4">
            <div className="flex items-center bg-gradient-to-r from-green-200 to-emerald-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3 animate-scale-pulse"></div>
              <span>🆓 100% FREE!</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-blue-200 to-cyan-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-blue-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3 animate-scale-pulse"></div>
              <span>⚡ SUPER FAST!</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-pink-200 to-purple-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-pink-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full mr-2 sm:mr-3 animate-scale-pulse"></div>
              <span>🎉 SO MUCH FUN!</span>
            </div>
          </div> */}

          {/* New trust indicators */}
          {/* <div className="mt-10 sm:mt-16 animate-slide-in-up stagger-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-purple-200 max-w-2xl sm:max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-purple-700">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 fill-current" />
                  <span className="font-bold text-xs sm:text-base">Trusted by 10,000+ Kids</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  <span className="font-bold text-xs sm:text-base">No Hidden Costs</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 fill-current" />
                  <span className="font-bold text-xs sm:text-base">Made with Love</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
