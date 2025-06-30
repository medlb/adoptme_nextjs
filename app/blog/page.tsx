import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "📝 Fun Blog - Cool Pet Stories! 📝",
  description:
    "🎉 Read the coolest stories, tips, and news from the ReceivePets family! Learn awesome stuff about adoptme pets! 🐾",
}

const blogPosts = [
  {
    id: "getting-started-guide",
    title: "🌟 The ULTIMATE Guide to Getting Your First Pet! 🌟",
    excerpt:
      "🎉 Everything you need to know about claiming and loving your first adoptme pet! From picking the coolest pet to becoming best friends forever! 🐾",
    author: "The ReceivePets Team",
    date: "2024-01-15",
    category: "Super Guide",
    readTime: "5 min read",
    emoji: "📚",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: "pet-rarity-explained",
    title: "✨ Pet Rarities Explained: From Common to LEGENDARY! ✨",
    excerpt:
      "🚀 Learn about all the different types of pets and what makes each one SUPER special! Discover secrets to finding the rarest pets! 🌈",
    author: "Pet Expert Sarah",
    date: "2024-01-10",
    category: "Cool Facts",
    readTime: "3 min read",
    emoji: "🏆",
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: "community-spotlight",
    title: "🎊 Community Spotlight: The Most AMAZING Pet Collections! 🎊",
    excerpt:
      "🌟 Check out the coolest adoptme pet collections from kids just like you! Get inspired and see what awesome pets you can collect! 🎈",
    author: "Community Manager Alex",
    date: "2024-01-05",
    category: "Friends",
    readTime: "4 min read",
    emoji: "👥",
    color: "from-blue-400 to-green-400",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 py-16 relative overflow-hidden">
      {/* Fun floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-6xl animate-bounce-fun opacity-30">📖</div>
        <div className="absolute top-20 right-20 text-5xl animate-float opacity-30">✏️</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-wiggle opacity-30">📝</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce-fun opacity-30">📚</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-float opacity-30">💭</div>
        <div className="absolute top-1/3 right-1/3 text-6xl animate-wiggle opacity-30">🎨</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-title text-6xl sm:text-7xl font-bold text-purple-800 mb-8 animate-bounce-fun">
            📝 RECEIVEPETS FUN BLOG! 📝
          </h1>
          <div className="bg-gradient-to-r from-yellow-300 to-pink-300 rounded-3xl p-8 shadow-2xl border-4 border-purple-400">
            <p className="text-2xl sm:text-3xl text-purple-800 max-w-4xl mx-auto leading-relaxed font-bold">
              🎉 Read the COOLEST stories, tips, and news from our amazing pet family! Learn awesome stuff and have fun!
              🌟
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="border-4 border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 hover:rotate-1 rounded-3xl bg-white/90 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className={`bg-gradient-to-r ${post.color} rounded-t-3xl`}>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-white/90 text-purple-800 font-bold text-lg px-4 py-2 rounded-full">
                    {post.emoji} {post.category}
                  </Badge>
                  <span className="text-white font-bold text-lg bg-purple-600 px-3 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="font-title text-2xl font-bold text-white leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-purple-600 mb-6 leading-relaxed font-bold text-lg">{post.excerpt}</p>

                <div className="flex items-center justify-between text-lg text-purple-500 mb-6 font-bold">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center btn-bubbly bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg px-6 py-3 rounded-2xl transition-colors"
                >
                  🎉 Read More Fun!
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="border-4 border-green-400 bg-gradient-to-r from-green-300 to-blue-300 rounded-3xl shadow-2xl">
            <CardContent className="p-12">
              <div className="text-8xl mb-6 animate-wiggle">✍️</div>
              <h2 className="font-title text-4xl font-bold text-white mb-6">🌟 WANT TO WRITE FOR US?! 🌟</h2>
              <p className="text-white/95 mb-6 font-bold text-xl">
                🎈 Have a COOL story about your adoptme pet or awesome tips to share with other kids?
              </p>
              <div className="bg-yellow-300 text-purple-800 inline-block px-8 py-4 rounded-full font-bold text-xl shadow-xl">
                📧 Email us at: blog@receivepets.com 📧
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
