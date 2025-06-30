import Link from "next/link"
import { Heart, Twitter, Github, Mail, Star, Gift, Sparkles, ArrowRight, Zap, Shield, Users } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white relative overflow-hidden">

      {/* Main content with enhanced styling */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        

        {/* Enhanced main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16">
          

          {/* Enhanced Quick Links */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 group">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-300 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-xl">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "🏠 Home", icon: "🏠" },
                { href: "/about", label: "ℹ️ About Us", icon: "ℹ️" },
                { href: "/how-it-works", label: "⚡ How It Works", icon: "⚡" },
                { href: "/blog", label: "📝 Fun Blog", icon: "📝" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center justify-between text-white hover:text-yellow-300 transition-all duration-300 text-base sm:text-lg font-semibold py-3 px-4 rounded-xl hover:bg-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label.replace(/^[^\s]+\s/, '')}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Legal Links */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 group">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-300 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-xl">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <span>Legal Stuff</span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/legal/privacy-policy", label: "🔒 Privacy Policy", icon: "🔒" },
                { href: "/legal/terms-of-service", label: "📜 Terms of Service", icon: "📜" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-white hover:text-yellow-300 transition-all duration-300 text-base sm:text-lg font-semibold py-3 px-4 rounded-xl hover:bg-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label.replace(/^[^\s]+\s/, '')}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
         {/* Enhanced features highlight */}
         <div className="flex flex-wrap justify-center items-center gap-4 mb-12 sm:mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-2 rounded-xl">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">100% Safe</p>
                    <p className="text-white/70 text-sm">Kid-friendly</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-2 rounded-xl">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Instant Fun</p>
                    <p className="text-white/70 text-sm">No waiting</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Always Free</p>
                    <p className="text-white/70 text-sm">Forever</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Enhanced bottom section */}
        <div className="border-t-2 border-gradient-to-r from-yellow-400/50 to-pink-400/50 pt-8 sm:pt-12">
          
          {/* Enhanced copyright */}
          <div className="text-center">
            <p className="text-white/80 font-semibold text-base sm:text-lg">
              &copy; {new Date().getFullYear()} <span className="text-yellow-300 font-bold">ReceivePets</span>. All rights reserved.
            </p>
            <p className="text-white/60 text-sm sm:text-base mt-2">
              💖 Made with lots of fun and love! 🌈
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
