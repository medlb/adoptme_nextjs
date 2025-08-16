import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, AlertCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | ReceivePets',
  description: 'Oops! The page you were looking for could not be found. Return to ReceivePets to find free Adopt Me pets and use our WFL calculator.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-700 mb-4">
            Oops! Pet Not Found! 🐾
          </h2>
          <p className="text-lg text-purple-600 mb-8">
            The page you're looking for seems to have wandered off like a curious pet! 
            Don't worry, let's get you back to finding amazing free Adopt Me pets.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <Link href="/free-adopt-me-pets" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Find Free Pets
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-purple-500">
            <p>Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Link href="/free-adopt-me-pets" className="text-purple-600 hover:underline">Free Pets</Link>
              <span>•</span>
              <Link href="/adopt-me-wfl" className="text-purple-600 hover:underline">WFL Calculator</Link>  
              <span>•</span>
              <Link href="/blog" className="text-purple-600 hover:underline">Blog</Link>
              <span>•</span>
              <Link href="/about" className="text-purple-600 hover:underline">About</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
