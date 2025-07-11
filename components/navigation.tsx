"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, Sparkles, Home, Info, Zap, FileText, Calculator } from "lucide-react"
import React from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className="w-full z-50 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 left-0 right-0 h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 h-16">
        {/* Logo and main nav */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Enhanced logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            
            <span className="text-2xl sm:text-3xl font-bold font-title bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              🐾 ReceivePets!
            </span>
          </Link>
        </div>
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg group hover:scale-105"
          >
            <Home className="h-5 w-5 group-hover:animate-bounce-fun" />
            <span>Home</span>
          </Link>
          <Link
            href="/adopt-me-wfl"
            className="flex items-center space-x-2 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg group hover:scale-105"
          >
            <Calculator className="h-5 w-5 group-hover:animate-bounce-fun" />
            <span>Trading Value</span>
          </Link>
         
          <Link 
            href="/blog" 
            className="flex items-center space-x-2 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg group hover:scale-105"
          >
            <FileText className="h-5 w-5 group-hover:animate-bounce-fun" />
            <span>Blog</span>
          </Link>
          {/* <Link 
            href="/about" 
            className="flex items-center space-x-2 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg group hover:scale-105"
          >
            <Info className="h-5 w-5 group-hover:animate-bounce-fun" />
            <span>About</span>
          </Link>
          <Link
            href="/how-it-works"
            className="flex items-center space-x-2 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg group hover:scale-105"
          >
            <Zap className="h-5 w-5 group-hover:animate-bounce-fun" />
            <span>How It Works</span>
          </Link> */}
          
          <Button
            asChild
            className="btn-bubbly bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-purple-800 font-bold text-base sm:text-lg font-title px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl"
          >
            <Link href="/free-adopt-me-pets" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>GET A FREE PET! 🐶</span>
            </Link>
          </Button>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 text-purple-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-10 w-10"
            aria-label="Open menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 flex flex-col md:hidden">
          <div className="relative bg-white/95 backdrop-blur-md w-full max-w-full p-4 pt-6 flex flex-col gap-2 animate-slide-in-up overflow-y-auto min-h-screen">
            {/* Close button at top right */}
            <button
              className="absolute top-2 right-2 text-purple-700 bg-white rounded-full p-2 shadow-md z-50"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-4 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 group"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5 group-hover:animate-bounce-fun" />
              <span>Home</span>
            </Link>
            <Link
              href="/adopt-me-wfl"
              className="flex items-center space-x-2 px-3 py-3 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-base sm:text-lg rounded-2xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 group"
              onClick={() => setIsOpen(false)}
            >
              <Calculator className="h-5 w-5 group-hover:animate-bounce-fun" />
              <span>Trading Value</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-2 px-3 py-3 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-base sm:text-lg rounded-2xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 group"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-5 w-5 group-hover:animate-bounce-fun" />
              <span>Blog</span>
            </Link>
            {/* <Link
              href="/about"
              className="flex items-center space-x-3 px-4 py-4 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 group"
              onClick={() => setIsOpen(false)}
            >
              <Info className="h-5 w-5 group-hover:animate-bounce-fun" />
              <span>About</span>
            </Link>
            <Link
              href="/how-it-works"
              className="flex items-center space-x-3 px-4 py-4 text-purple-700 hover:text-pink-600 transition-all duration-300 font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 group"
              onClick={() => setIsOpen(false)}
            >
              <Zap className="h-5 w-5 group-hover:animate-bounce-fun" />
              <span>How It Works</span>
            </Link> */}
            
           
            <div className="px-1 py-2">
              <Button
                asChild
                className="w-full btn-bubbly bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-purple-800 font-bold text-base sm:text-lg font-title py-3 sm:py-4 shadow-lg hover:shadow-xl"
              >
                <Link href="/free-adopt-me-pets" onClick={() => setIsOpen(false)} className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>GET A FREE PET! 🐶</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
