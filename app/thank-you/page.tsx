"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Share2, Home, Sparkles, Download, Trophy, Star } from "lucide-react"

interface RobloxUser {
  id: number
  username: string
  image: string
}

export default function ThankYouPage() {
  const [claimData, setClaimData] = useState<any>(null)
  const [showFireworks, setShowFireworks] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem("claimedPet")
    if (data) {
      setClaimData(JSON.parse(data))
    }

    // Hide fireworks after 5 seconds
    setTimeout(() => setShowFireworks(false), 5000)
  }, [])

  const handleShare = () => {
    const shareText = claimData?.robloxUser
      ? `🎉 I just claimed ${claimData.pet.name} on ReceivePets! My Roblox avatar ${claimData.robloxUser.username} now has the COOLEST pet ever! 🐾`
      : `🎉 I just claimed ${claimData?.pet.name} on ReceivePets! Check out my AWESOME new adoptme pet! 🐾`

    if (navigator.share && claimData) {
      navigator.share({
        title: `🎉 I got ${claimData.pet.name}! 🎉`,
        text: shareText,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(`${shareText} Check it out at ${window.location.origin}`)
    }
  }

  const downloadImage = () => {
    // Create a canvas to combine the images
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 600

    if (ctx) {
      // Add a colorful background
      const gradient = ctx.createLinearGradient(0, 0, 800, 600)
      gradient.addColorStop(0, "#ff6b6b")
      gradient.addColorStop(0.5, "#4ecdc4")
      gradient.addColorStop(1, "#45b7d1")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 800, 600)

      // Add text
      ctx.fillStyle = "white"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`🎉 ${claimData?.username} got ${claimData?.pet.name}! 🎉`, 400, 100)

      // Download the image
      const link = document.createElement("a")
      link.download = `${claimData?.pet.name}-claim.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  if (!claimData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center relative overflow-hidden">
        {/* Fun floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-6xl animate-bounce-fun opacity-50">😢</div>
          <div className="absolute top-20 right-20 text-5xl animate-float opacity-50">❓</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-wiggle opacity-50">🤔</div>
        </div>

        <Card className="max-w-2xl mx-auto border-4 border-yellow-400 rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="text-8xl mb-6 animate-bounce-fun">😅</div>
            <h1 className="font-title text-3xl font-bold text-purple-800 mb-6">OOPS! NO PET FOUND!</h1>
            <p className="text-purple-600 font-bold text-xl mb-8">
              🎈 Looks like you haven't claimed a pet yet! Let's go get you an AWESOME one! 🎈
            </p>
            <Button
              asChild
              className="btn-bubbly bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-xl px-8 py-4"
            >
              <Link href="/">🏠 Go Get A Pet!</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-8 sm:py-16 relative overflow-x-hidden overflow-hidden px-2 sm:px-4 md:px-8">
      {/* Fun floating elements or celebratory icons can be added here if desired */}
      <div className="relative max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mt-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-6xl sm:text-9xl animate-bounce-fun">🏆</div>
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 sm:h-16 sm:w-16 text-yellow-500 animate-spin" />
              <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 sm:h-12 sm:w-12 text-pink-500 animate-pulse" />
              <Trophy className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 text-yellow-600 animate-bounce" />
            </div>
          </div>
          <h1 className="font-title text-3xl sm:text-6xl font-bold text-purple-800 mb-4 sm:mb-8 animate-wiggle">
            🎊 MISSION ACCOMPLISHED! 🎊
          </h1>
          <div className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-yellow-400">
            <p className="font-title text-xl sm:text-3xl text-white font-bold">🚀 YOU'RE NOW A LEGENDARY PET OWNER! 🚀</p>
          </div>
        </div>
        {/* Pet and Avatar Display */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-8">
          {claimData.robloxUser ? (
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="relative">
                  <Image
                    src={claimData.robloxUser.image || "/placeholder.svg"}
                    alt={claimData.robloxUser.username}
                    width={150}
                    height={150}
                    className="rounded-3xl border-4 border-blue-400 shadow-xl"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Star className="h-6 w-6 text-yellow-800" />
                  </div>
                </div>
                <p className="font-title text-xl font-bold text-blue-800 mt-3">YOU!</p>
              </div>

              <div className="text-6xl animate-bounce-fun">+</div>

              <div className="text-center">
                <div className="w-40 h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl p-4 flex items-center justify-center shadow-xl border-4 border-pink-400">
                  <Image
                    src={claimData.pet.image || "/placeholder.svg"}
                    alt={claimData.pet.name}
                    width={120}
                    height={120}
                    className="rounded-2xl"
                  />
                </div>
                <p className="font-title text-xl font-bold text-pink-800 mt-3">YOUR PET!</p>
              </div>
            </div>
          ) : (
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl p-6 flex items-center justify-center shadow-2xl animate-pulse">
              <Image
                src={claimData.pet.image || "/placeholder.svg"}
                alt={claimData.pet.name}
                width={200}
                height={200}
                className="rounded-2xl"
              />
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleShare}
            className="btn-bubbly bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4"
          >
            <Share2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />📱 SHARE YOUR WIN! 📱
          </Button>
          <Button
            onClick={downloadImage}
            className="btn-bubbly bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4"
          >
            <Download className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />💾 DOWNLOAD IMAGE! 💾
          </Button>
          <Button
            asChild
            className="btn-bubbly bg-gradient-to-r from-pink-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 text-white font-bold text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4"
          >
            <Link href="/">
              <Home className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />🏠 GET MORE PETS! 🏠
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
