"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, Heart, Star, Sparkles } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Are the pets really FREE?",
    answer: "Yes! All our adoptme pets are 100% FREE! No hidden costs, no tricks - just pure fun! We believe every kid deserves to have an amazing adoptme pet friend! 🎉",
    icon: "💖"
  },
  {
    id: 2,
    question: "How do I adopt a pet?",
    answer: "It's super easy! Just click on any pet you like, fill out a simple form, and BOOM! You'll have your new best friend instantly! No waiting, no complicated steps! 🚀",
    icon: "🐾"
  },
  {
    id: 3,
    question: "Can I have more than one pet?",
    answer: "Absolutely! You can adopt as many pets as you want! Each pet is unique and special, so why not have a whole family of adoptme friends? 🏠",
    icon: "🏠"
  },
  {
    id: 4,
    question: "Are the pets safe for kids?",
    answer: "100% safe! We designed everything with kids in mind. No scary content, no inappropriate material - just cute, friendly pets that bring joy and happiness! 🛡️",
    icon: "🛡️"
  },
  {
    id: 5,
    question: "What types of pets are available?",
    answer: "We have TONS of different pets! Cats, dogs, fish, rabbits, birds, dragons, and many more! Each pet has its own unique personality and special abilities! 🦄",
    icon: "🦄"
  },
  {
    id: 6,
    question: "Can I play with my pet?",
    answer: "Of course! Your adoptme pets love to play! They can dance, sing, fly, swim, and do all sorts of fun activities! They're always ready for an adventure! 🎊",
    icon: "🎊"
  },
  {
    id: 7,
    question: "Do I need to feed or take care of my pet?",
    answer: "Nope! These are magical adoptme pets that don't need feeding or cleaning. They're always happy and healthy, ready to play whenever you want! ✨",
    icon: "✨"
  },
  {
    id: 8,
    question: "Can I share my pets with friends?",
    answer: "Yes! You can show off your amazing pets to all your friends! They'll be so jealous of your cool adoptme pet collection! 🌟",
    icon: "🌟"
  }
]

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleToggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 text-4xl animate-float opacity-20">❓</div>
        <div className="absolute top-16 right-16 text-3xl animate-wiggle opacity-20">💭</div>
        <div className="absolute bottom-16 left-16 text-5xl animate-bounce-fun opacity-20">🤔</div>
        <div className="absolute bottom-8 right-8 text-4xl animate-float opacity-20">💡</div>
        <div className="absolute top-1/3 left-1/3 text-3xl animate-wiggle opacity-15">🎯</div>
        <div className="absolute bottom-1/3 right-1/3 text-4xl animate-bounce-fun opacity-15">✨</div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-blue-200 mb-8">
            <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-4 animate-slide-in-up">
              🤔 Frequently Asked Questions! 🤔
            </h2>
            <p className="text-lg sm:text-xl text-purple-600 max-w-3xl mx-auto font-bold animate-slide-in-up stagger-1">
              🌟 Got questions? We've got answers! Everything you need to know about adopting your perfect adoptme pet! 🎉
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <Card
              key={faq.id}
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-4 border-blue-200 rounded-3xl hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => handleToggleFaq(faq.id)}
                  className="w-full p-6 sm:p-8 text-left hover:bg-blue-50/50 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl sm:text-4xl animate-bounce-fun">
                        {faq.icon}
                      </div>
                      <h3 className="font-title text-lg sm:text-xl font-bold text-purple-800 group-hover:text-purple-600 transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="h-5 w-5 text-blue-400" />
                      {openFaq === faq.id ? (
                        <ChevronUp className="h-6 w-6 text-purple-600 animate-slide-in-up" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-purple-600 group-hover:translate-y-1 transition-transform duration-300" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Answer */}
                {openFaq === faq.id && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 animate-slide-in-up">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 sm:p-6 border-2 border-purple-200">
                      <p className="text-purple-700 leading-relaxed font-medium text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="font-title text-2xl sm:text-3xl font-bold text-purple-800 mb-4">
              🌟 Still Have Questions? 🌟
            </h3>
            <p className="text-purple-600 font-bold text-lg mb-6">
              We're here to help! Our friendly team is ready to answer any questions you might have! 💖
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="mr-2 h-5 w-5 animate-scale-pulse" />
                Contact Us
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-purple-500 text-purple-700 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5 animate-sparkle" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 