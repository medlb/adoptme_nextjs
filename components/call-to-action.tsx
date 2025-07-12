import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart, Sparkles, Star, Users } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 relative overflow-hidden">
      {/* Enhanced floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-6xl animate-bounce-fun opacity-70">🎈</div>
        <div className="absolute top-20 right-20 text-5xl animate-float opacity-70">🌟</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-wiggle opacity-70">🎉</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce-fun opacity-70">🦄</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-float opacity-70">✨</div>
        <div className="absolute top-1/3 right-1/3 text-6xl animate-wiggle opacity-70">🎊</div>
        <div className="absolute bottom-1/3 left-1/3 text-5xl animate-float opacity-50">🌈</div>
        <div className="absolute top-1/4 right-1/4 text-4xl animate-bounce-fun opacity-50">🚀</div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Enhanced main icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full shadow-2xl border-4 border-white/30">
            <div className="text-6xl sm:text-8xl animate-pulse">🐾</div>
          </div>
        </div>

        {/* Enhanced main heading */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/20 mb-8">
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-in-up leading-tight">
            🎉 READY FOR YOUR NEW BEST FRIEND?! 🎉
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-bold animate-slide-in-up stagger-1">
            🌈 Join THOUSANDS of happy kids who found their perfect pet! Your adventure starts RIGHT NOW! 🚀
          </p>
        </div>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-slide-in-up stagger-2">
          <Button
            asChild
            size="lg"
            className="btn-bubbly bg-gradient-to-r from-white to-yellow-100 text-purple-600 hover:from-yellow-100 hover:to-orange-100 px-12 py-6 text-xl sm:text-2xl font-bold font-title shadow-2xl hover:shadow-3xl group"
          >
            <Link href="#pets" className="flex items-center space-x-3">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 animate-scale-pulse" />
              <span>🐶 GET MY PET NOW! 🐱</span>
              <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>

          
        </div>

        {/* Enhanced social proof section */}
        <div className="animate-slide-in-up stagger-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/30">
            <div className="bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-800 px-8 py-4 rounded-full font-bold text-xl shadow-xl animate-pulse mb-6 inline-block">
              🎊 OVER 10,000 HAPPY KIDS! 🎊
            </div>
            
            {/* Enhanced stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-2xl p-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-full">
                  <Star className="h-5 w-5 text-white fill-current" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-2xl text-white">10,000+</div>
                  <div className="text-white/90 font-semibold">Happy Kids</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-2xl p-4">
                <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-white fill-current" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-2xl text-white">50,000+</div>
                  <div className="text-white/90 font-semibold">Pets Adopted</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-2xl p-4">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-2 rounded-full">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-2xl text-white">100%</div>
                  <div className="text-white/90 font-semibold">Free Forever</div>
                </div>
              </div>
            </div>
            
            <p className="text-white/90 font-bold text-lg mt-6">
              🌟 Join the most fun adoptme pet community ever! 🌟
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
