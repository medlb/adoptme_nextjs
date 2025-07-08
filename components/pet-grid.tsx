'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { OptimizedImage } from "@/components/ui/image"
import { Badge } from "@/components/ui/badge"
import { Heart, Zap, Search, ChevronDown, Loader2 } from "lucide-react"
import React, { useEffect, useState, useRef, useCallback } from "react"

const PETS_API_URL = "https://elvebredd.com/data/Pets.json"
const PAGE_SIZE = 20

// Skeleton component for loading states
const PetCardSkeleton = () => (
  <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-3xl shadow-lg">
    <CardContent className="relative p-4 sm:p-6 flex flex-col items-center">
      {/* Image skeleton */}
      <div className="relative mb-4 w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-3 shadow-inner">
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl"></div>
      </div>
      
      {/* Text skeleton */}
      <div className="w-full text-center space-y-3">
        <div className="h-6 bg-gray-200 animate-pulse rounded mx-auto w-3/4"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded mx-auto w-1/2"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="mt-4 w-full h-10 bg-gray-200 animate-pulse rounded-xl"></div>
    </CardContent>
  </Card>
)

export function PetGrid() {
  const [pets, setPets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(PETS_API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format received from API')
        }
        
        const petsArr = Object.values(data)
          .map((pet: any) => ({
            id: pet.id || Math.random().toString(36).substr(2, 9),
            name: pet.name || 'Unknown Pet',
            image: pet.image ? `https://elvebredd.com${pet.image}` : "/placeholder.svg",
            rvalueNoPotion: pet["rvalue - nopotion"] || pet.rvalue || 0,
          }))
          .filter((pet) => pet.name && pet.name !== 'Unknown Pet' && pet.image && pet.image !== "/placeholder.svg")
          .sort((a, b) => b.rvalueNoPotion - a.rvalueNoPotion)
        
        setPets(petsArr)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching pets:', error)
        setError("Failed to load pets. Please try again later.")
        setLoading(false)
      })
  }, [])

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search)
      setDisplayCount(PAGE_SIZE) // Reset pagination on new search
    }, 300)
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [search])

  // Filtered pets
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  // Handle pet selection with loading state
  const handlePetSelection = (petId: string) => {
    setSelectedPetId(petId)
    
    // Clear the loading state after a short delay to allow navigation
    // This prevents the loading state from persisting if navigation is fast
    setTimeout(() => {
      setSelectedPetId(null)
    }, 3000) // Clear after 3 seconds as a fallback
  }

  // Handle navigation start
  const handleNavigationStart = (petId: string) => {
    setSelectedPetId(petId)
  }

  // Handle navigation end (when component unmounts or navigation completes)
  useEffect(() => {
    const handleBeforeUnload = () => {
      setSelectedPetId(null)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      setSelectedPetId(null)
    }
  }, [])

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (loading || isLoadingMore) return
    const scrollY = window.scrollY || window.pageYOffset
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight
    if (scrollY + windowHeight + 1000 >= docHeight && displayCount < filteredPets.length) {
      setIsLoadingMore(true)
      setTimeout(() => {
        setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, filteredPets.length))
        setIsLoadingMore(false)
      }, 300)
    }
  }, [loading, isLoadingMore, displayCount, filteredPets.length])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Load more handler (manual button)
  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, filteredPets.length))
      setIsLoadingMore(false)
    }, 300)
  }

  if (loading) {
    return (
      <section id="pets" className="py-8 sm:py-10 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden min-h-screen">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-12 bg-gray-200 animate-pulse rounded mx-auto w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded mx-auto w-3/4"></div>
          </div>
          
          {/* Search skeleton */}
          <div className="mb-8 sm:mb-12 flex justify-center">
            <div className="h-12 bg-gray-200 animate-pulse rounded-2xl w-full max-w-md"></div>
          </div>
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <PetCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-600 font-bold text-lg mb-4">{error}</div>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <section id="pets" className="py-8 sm:py-10 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Free Adopt Me Pets
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover a magical collection of super cute pets! Claim your favorite for FREE and start your adventure. New pets added every week!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pets by name..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-pink-400 outline-none shadow-lg text-base bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-xl focus:scale-105"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search pets by name"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <p className="text-gray-600 font-medium">
            Showing {Math.min(displayCount, filteredPets.length)} of {filteredPets.length} pets
          </p>
        </div>

        {/* Pet Grid */}
        <div ref={containerRef} className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-8">
          {filteredPets.slice(0, displayCount).map((pet, index) => {
            const isSelected = selectedPetId === pet.id
            
            return (
              <Card
                key={pet.id}
                className={`group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-purple-200 hover:border-pink-400 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  isSelected ? 'ring-4 ring-purple-400 ring-opacity-50 pet-card-loading pet-card-selected' : ''
                }`}
                tabIndex={0}
                aria-label={`Pet card: ${pet.name}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Loading overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl loading-overlay">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
                      <p className="text-purple-700 font-semibold text-sm">Loading...</p>
                    </div>
                  </div>
                )}
                
                <CardContent className="relative p-4 sm:p-6 flex flex-col items-center h-full">
                  {/* Image container */}
                  <div className="relative mb-3 w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-2 shadow-inner flex-shrink-0">
                    
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-full h-full  transition-transform duration-300  z-10  object-scale-down" 
                      loading="lazy"
                      
                    />
                  </div>

                  {/* Pet info */}
                  <div className="w-full text-center space-y-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800 group-hover:text-purple-700 transition-colors duration-300 truncate">
                      {pet.name}
                    </h3>
                    
                    {/* Smaller, more subtle rarity badge */}
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <span className="font-medium">Rarity: {pet.rvalueNoPotion}</span>
                    </div>
                  </div>

                  {/* Claim button */}
                  <Button 
                    asChild 
                    size="sm" 
                    className={`mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                      isSelected ? 'button-loading' : ''
                    }`}
                    onClick={() => handlePetSelection(pet.id)}
                    disabled={isSelected}
                  >
                    <Link href={`/claim/${pet.id}`}>
                      {isSelected ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Claim Pet
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Loading indicator for auto-load */}
        {isLoadingMore && (
          <div className="flex justify-center py-6">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-400 border-t-transparent"></div>
              <span className="text-purple-600 font-medium">Loading more pets...</span>
            </div>
          </div>
        )}

        {/* Load More Button (fallback for users who prefer manual loading) */}
        {displayCount < filteredPets.length && !isLoadingMore && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center">
                <ChevronDown className="w-5 h-5 mr-2" />
                Load More Pets
              </div>
            </Button>
          </div>
        )}

        {/* No results message */}
        {!loading && filteredPets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 text-xl font-medium mb-4">No pets found</div>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        )}

        {/* End of results message */}
        {!loading && filteredPets.length > 0 && displayCount >= filteredPets.length && (
          <div className="text-center py-8">
            <div className="text-purple-600 font-medium text-lg">🎉 You've seen all the pets!</div>
            <p className="text-gray-500 mt-2">Check back later for new additions</p>
          </div>
        )}
      </div>
    </section>
  )
}
