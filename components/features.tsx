import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, Shield, Users, Star, Gift, Sparkles } from "lucide-react"

const features = [
  {
    icon: Heart,
    emoji: "💖",
    title: "100% FREE!",
    description: "All pets are totally FREE! No money needed, no tricks - just pure fun! 🎉",
    color: "from-pink-400 to-red-400",
    gradient: "bg-gradient-to-r from-pink-100 to-red-100",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "SUPER FAST!",
    description: "Get your pet in seconds! Click, claim, and BOOM - you have a new best friend! 🚀",
    color: "from-yellow-400 to-orange-400",
    gradient: "bg-gradient-to-r from-yellow-100 to-orange-100",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "TOTALLY SAFE!",
    description: "Your pets are protected and secure! We keep everything safe just for you! 🔒",
    color: "from-green-400 to-blue-400",
    gradient: "bg-gradient-to-r from-green-100 to-blue-100",
  },
  {
    icon: Users,
    emoji: "👫",
    title: "TONS OF FRIENDS!",
    description: "Join thousands of kids who love their virtual pets! Make friends and have fun! 🎈",
    color: "from-purple-400 to-pink-400",
    gradient: "bg-gradient-to-r from-purple-100 to-pink-100",
  },
]

export function Features() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-x-hidden overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 text-3xl sm:top-10 sm:left-10 sm:text-5xl animate-float opacity-10">🌟</div>
        <div className="absolute top-14 right-6 text-2xl sm:top-20 sm:right-20 sm:text-4xl animate-wiggle opacity-10">🎈</div>
        <div className="absolute bottom-14 left-6 text-4xl sm:bottom-20 sm:left-20 sm:text-6xl animate-bounce-fun opacity-10">🎉</div>
        <div className="absolute bottom-6 right-6 text-3xl sm:bottom-10 sm:right-10 sm:text-5xl animate-float opacity-10">🦄</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Enhanced header section */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-green-200 mb-6 sm:mb-8">
            <h2 className="font-title text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-purple-800 mb-4 sm:mb-6 animate-slide-in-up">
              🌟 WHY KIDS LOVE US! 🌟
            </h2>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-purple-600 max-w-2xl sm:max-w-4xl mx-auto font-bold animate-slide-in-up stagger-1">
              We make getting virtual pets SUPER easy and SUPER fun! 🎊
            </p>
          </div>
        </div>

        {/* Enhanced features grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-4 hover:rotate-1 border-4 border-yellow-300 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm group hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-4 sm:p-6 md:p-8">
                {/* Enhanced icon container */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r ${feature.color} rounded-full mb-4 sm:mb-6 shadow-xl animate-bounce-fun group-hover:scale-110 transition-transform duration-300 border-4 border-white`}
                >
                  <span className="text-xl sm:text-2xl md:text-4xl">{feature.emoji}</span>
                </div>

                {/* Enhanced content */}
                <div className="space-y-2 sm:space-y-4">
                  <h3 className="font-title text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-purple-800 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-purple-600 leading-relaxed font-semibold text-sm xs:text-base sm:text-lg group-hover:text-purple-500 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative background */}
                <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl sm:rounded-3xl -z-10`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New trust section */}
        <div className="mt-12 sm:mt-20 animate-slide-in-up stagger-5">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-white">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center">
              <h3 className="font-title text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 mb-4 sm:mb-6">
                🎊 JOIN OUR AMAZING COMMUNITY! 🎊
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 sm:p-3 rounded-full">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-current" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg sm:text-2xl text-purple-800">10,000+</div>
                    <div className="text-purple-600 font-semibold text-xs sm:text-base">Happy Kids</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-2 sm:p-3 rounded-full">
                    <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg sm:text-2xl text-purple-800">50,000+</div>
                    <div className="text-purple-600 font-semibold text-xs sm:text-base">Pets Adopted</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-2 sm:p-3 rounded-full">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg sm:text-2xl text-purple-800">100%</div>
                    <div className="text-purple-600 font-semibold text-xs sm:text-base">Free Forever</div>
                  </div>
                </div>

              </div>
              <p className="text-base xs:text-lg sm:text-xl text-purple-700 font-bold">
                🌟 Be part of the most fun virtual pet community ever! 🌟
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

