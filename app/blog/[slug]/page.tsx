import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react"
import { notFound } from "next/navigation"

// Blog post data - in a real app, this would come from a CMS or database
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
    content: `
      <h2>🎉 Welcome to the AMAZING World of adoptme Pets! 🎉</h2>
      
      <p>Hey there, pet lovers! Are you ready to start your incredible journey with adoptme pets? This guide will show you everything you need to know to get your very first pet and become the best pet parent ever! 🌟</p>
      
      <h3>🐾 Step 1: Choose Your Perfect Pet! 🐾</h3>
      <p>First things first - you need to pick your new best friend! We have so many amazing pets to choose from:</p>
      <ul>
        <li>🐕 Super cute puppies that love to play</li>
        <li>🐱 Adorable kittens that purr with joy</li>
        <li>🐰 Bouncy bunnies that hop around</li>
        <li>🐦 Colorful birds that sing beautiful songs</li>
        <li>🐠 Magical fish that swim in rainbow colors</li>
      </ul>
      
      <h3>🎯 Step 2: Claim Your Pet! 🎯</h3>
      <p>Once you've found your perfect pet, it's time to make them yours forever! Here's how:</p>
      <ol>
        <li>Click on the pet you love the most</li>
        <li>Fill out the super simple claim form</li>
        <li>Tell us your name and why you want this pet</li>
        <li>Click "Claim My Pet!" and celebrate! 🎊</li>
      </ol>
      
      <h3>💖 Step 3: Love and Care for Your Pet! 💖</h3>
      <p>Now that your pet is yours, it's time to show them lots of love! Here are some fun things you can do:</p>
      <ul>
        <li>🎮 Play fun games together</li>
        <li>🍎 Feed them their favorite treats</li>
        <li>🎨 Give them cool accessories and outfits</li>
        <li>📸 Take awesome photos together</li>
        <li>🌟 Train them to do amazing tricks</li>
      </ul>
      
      <h3>🏆 Step 4: Become a Pet Expert! 🏆</h3>
      <p>The more you play with your pet, the more you'll learn! You can:</p>
      <ul>
        <li>📚 Read books about different pet types</li>
        <li>🎓 Take fun pet care classes</li>
        <li>👥 Join our awesome pet community</li>
        <li>🏅 Earn cool badges and rewards</li>
        <li>🌟 Share your pet adventures with friends</li>
      </ul>
      
      <h3>🎊 Ready to Start Your Adventure? 🎊</h3>
      <p>You're all set to become an amazing pet parent! Remember, the most important thing is to have fun and show your pet lots of love. Every pet is special and unique, just like you! 🌈</p>
      
      <p><strong>Pro Tip:</strong> Don't forget to give your pet a super cool name that matches their personality! 🎯</p>
      
      <h3>🌟 What's Next? 🌟</h3>
      <p>Now that you know how to get your first pet, why not:</p>
      <ul>
        <li>🎯 Browse our pet collection to find your perfect match</li>
        <li>📖 Read about different pet rarities</li>
        <li>👥 Join our community to meet other pet lovers</li>
        <li>🎮 Start playing with your new best friend!</li>
      </ul>
      
      <p>Happy pet parenting! 🐾✨</p>
    `,
  },
  {
    id: "pet-rarity-explained",
    title: "✨ Pet Rarities Explained: From Common to LEGENDARY! ✨",
    excerpt:
      "🚀 Learn about all the different types of pets and what makes each one SUPER special! Discover secrets to finding the rarest pets! 🌈",
    author: "Pet Expert Sarah",
    date: "2025-01-10",
    category: "Cool Facts",
    readTime: "3 min read",
    emoji: "🏆",
    color: "from-yellow-400 to-orange-400",
    content: `
      <h2>🌈 Welcome to the Magical World of Pet Rarities! 🌈</h2>
      
      <p>Hey pet collectors! Ever wondered why some pets are super common while others are incredibly rare? Let's dive into the exciting world of pet rarities and discover what makes each pet special! ✨</p>
      
      <h3>🌟 Common Pets - Your Everyday Friends! 🌟</h3>
      <p>Common pets are like your friendly neighborhood pets - they're everywhere and super lovable!</p>
      <ul>
        <li>🐕 Regular puppies and dogs</li>
        <li>🐱 Normal kittens and cats</li>
        <li>🐰 Standard bunnies</li>
        <li>🐦 Common birds</li>
        <li>🐠 Basic fish</li>
      </ul>
      <p><strong>Rarity Level:</strong> 🌟 (1 star)<br>
      <strong>Chance to Find:</strong> Super easy! You'll see these everywhere.</p>
      
      <h3>✨ Uncommon Pets - A Bit More Special! ✨</h3>
      <p>Uncommon pets have something extra that makes them stand out from the crowd!</p>
      <ul>
        <li>🐕 Puppies with special colors</li>
        <li>🐱 Cats with unique patterns</li>
        <li>🐰 Bunnies with fancy ears</li>
        <li>🐦 Birds with rainbow feathers</li>
        <li>🐠 Fish that glow in the dark</li>
      </ul>
      <p><strong>Rarity Level:</strong> ✨✨ (2 stars)<br>
      <strong>Chance to Find:</strong> Pretty common, but still exciting!</p>
      
      <h3>💎 Rare Pets - The Special Ones! 💎</h3>
      <p>Rare pets are like finding a hidden treasure - they're special and not easy to find!</p>
      <ul>
        <li>🐕 Dogs with magical powers</li>
        <li>🐱 Cats that can fly</li>
        <li>🐰 Bunnies that change colors</li>
        <li>🐦 Birds that talk</li>
        <li>🐠 Fish that can breathe air</li>
      </ul>
      <p><strong>Rarity Level:</strong> 💎💎💎 (3 stars)<br>
      <strong>Chance to Find:</strong> You'll need some luck to find these!</p>
      
      <h3>🔥 Epic Pets - The Amazing Ones! 🔥</h3>
      <p>Epic pets are like superheroes - they have incredible powers and are super rare!</p>
      <ul>
        <li>🐕 Dogs that can teleport</li>
        <li>🐱 Cats that can turn invisible</li>
        <li>🐰 Bunnies that can time travel</li>
        <li>🐦 Birds that control the weather</li>
        <li>🐠 Fish that can walk on land</li>
      </ul>
      <p><strong>Rarity Level:</strong> 🔥🔥🔥🔥 (4 stars)<br>
      <strong>Chance to Find:</strong> Very rare - you'll be super lucky to find one!</p>
      
      <h3>👑 Legendary Pets - The ULTIMATE! 👑</h3>
      <p>Legendary pets are the rarest of the rare - they're like finding a pot of gold at the end of a rainbow!</p>
      <ul>
        <li>🐕 Dogs that can grant wishes</li>
        <li>🐱 Cats that can see the future</li>
        <li>🐰 Bunnies that can create portals</li>
        <li>🐦 Birds that can bring back memories</li>
        <li>🐠 Fish that can control the ocean</li>
      </ul>
      <p><strong>Rarity Level:</strong> 👑👑👑👑👑 (5 stars)<br>
      <strong>Chance to Find:</strong> Extremely rare - only the luckiest collectors find these!</p>
      
      <h3>🎯 How to Find Rare Pets! 🎯</h3>
      <p>Want to increase your chances of finding rare pets? Here are some tips:</p>
      <ul>
        <li>🎮 Play the game regularly - rare pets appear randomly</li>
        <li>🌟 Complete special missions and challenges</li>
        <li>🎁 Open mystery boxes and surprise packages</li>
        <li>🏆 Participate in special events and competitions</li>
        <li>👥 Trade with other collectors</li>
        <li>📅 Check back daily - new pets appear all the time!</li>
      </ul>
      
      <h3>💡 Pro Tips for Collectors! 💡</h3>
      <p><strong>Remember:</strong> Every pet is special, no matter how rare they are! The most important thing is to love and care for your pets, whether they're common or legendary. 🌈</p>
      
      <p><strong>Fun Fact:</strong> Sometimes common pets can become rare if you train them enough! 🎯</p>
      
      <h3>🌟 Ready to Start Collecting? 🌟</h3>
      <p>Now that you know all about pet rarities, you're ready to become an expert collector! Start your collection today and see how many different types of pets you can find! 🐾</p>
      
      <p>Happy collecting! May the rarest pets find their way to you! ✨👑</p>
    `,
  },
  {
    id: "community-spotlight",
    title: "🎊 Community Spotlight: The Most AMAZING Pet Collections! 🎊",
    excerpt:
      "🌟 Check out the coolest adoptme pet collections from kids just like you! Get inspired and see what awesome pets you can collect! 🎈",
    author: "Community Manager Alex",
    date: "2025-04-05",
    category: "Friends",
    readTime: "4 min read",
    emoji: "👥",
    color: "from-blue-400 to-green-400",
    content: `
      <h2>🌟 Meet Our Amazing Pet Collectors! 🌟</h2>
      
      <p>Welcome to our very first Community Spotlight! Today we're celebrating the incredible pet collections from kids just like you who love adoptme pets as much as we do! 🎉</p>
      
      <h3>👑 Emma's Magical Menagerie 👑</h3>
      <p><strong>Age:</strong> 9 years old<br>
      <strong>Collection Size:</strong> 47 pets<br>
      <strong>Favorite Pet:</strong> Sparkle the Rainbow Unicorn Cat</p>
      
      <p>Emma has one of the most colorful collections we've ever seen! She loves collecting pets with rainbow colors and magical powers. Her collection includes:</p>
      <ul>
        <li>🌈 15 rainbow-colored pets</li>
        <li>✨ 8 pets with magical powers</li>
        <li>🌟 3 legendary pets (including Sparkle!)</li>
        <li>🎨 12 pets with custom accessories</li>
      </ul>
      
      <p><strong>Emma's Tip:</strong> "I check the pet store every morning before school. That's how I found Sparkle!" 🌟</p>
      
      <h3>🚀 Jake's Adventure Squad 🚀</h3>
      <p><strong>Age:</strong> 11 years old<br>
      <strong>Collection Size:</strong> 32 pets<br>
      <strong>Favorite Pet:</strong> Rocket the Space Dog</p>
      
      <p>Jake loves pets that can go on adventures! His collection is full of pets with special abilities:</p>
      <ul>
        <li>🚀 10 pets that can fly or teleport</li>
        <li>🌍 7 pets from different planets</li>
        <li>⚡ 5 pets with super speed</li>
        <li>🔮 3 pets with psychic powers</li>
      </ul>
      
      <p><strong>Jake's Tip:</strong> "I always complete the daily missions. That's where I found most of my adventure pets!" 🎯</p>
      
      <h3>🎨 Sofia's Artistic Zoo 🎨</h3>
      <p><strong>Age:</strong> 8 years old<br>
      <strong>Collection Size:</strong> 28 pets<br>
      <strong>Favorite Pet:</strong> Picasso the Painting Cat</p>
      
      <p>Sofia loves pets that are creative and artistic! Her collection is like a living art gallery:</p>
      <ul>
        <li>🎨 12 pets that can paint or draw</li>
        <li>🎭 8 pets that can perform</li>
        <li>🎪 5 pets that can do magic tricks</li>
        <li>🎵 3 pets that can sing</li>
      </ul>
      
      <p><strong>Sofia's Tip:</strong> "I love dressing up my pets in colorful outfits. It makes them even more special!" 💖</p>
      
      <h3>🏆 Collection Showdown: Who Has the Most? 🏆</h3>
      <p>Here's how our top collectors compare:</p>
      <ul>
        <li>🥇 Emma: 47 pets (Most Colorful Collection)</li>
        <li>🥈 Jake: 32 pets (Most Adventurous Collection)</li>
        <li>🥉 Sofia: 28 pets (Most Artistic Collection)</li>
      </ul>
      
      <h3>🌟 Special Achievements! 🌟</h3>
      <p>These collectors have earned some amazing badges:</p>
      <ul>
        <li>🏆 Emma: "Rainbow Master" badge for collecting 15 rainbow pets</li>
        <li>🚀 Jake: "Adventure Hero" badge for completing 50 missions</li>
        <li>🎨 Sofia: "Creative Genius" badge for customizing 20 pets</li>
      </ul>
      
      <h3>💡 Tips from Our Top Collectors! 💡</h3>
      <p><strong>Emma says:</strong> "Be patient! Rare pets will come to you when you least expect it!" 🌈</p>
      
      <p><strong>Jake says:</strong> "Always check for special events. That's where the coolest pets hide!" 🎯</p>
      
      <p><strong>Sofia says:</strong> "Don't just collect pets - make them your friends and give them love!" 💖</p>
      
      <h3>🎊 Want to Be Featured? 🎊</h3>
      <p>Do you have an amazing pet collection? We'd love to feature you in our next Community Spotlight! Here's how:</p>
      <ul>
        <li>📸 Take photos of your favorite pets</li>
        <li>📝 Write a short story about your collection</li>
        <li>🎯 Share your best collecting tips</li>
        <li>📧 Send everything to: community@receivepets.com</li>
      </ul>
      
      <h3>🌟 Community Challenge! 🌟</h3>
      <p>This month's challenge: <strong>"The Rainbow Challenge"</strong> 🌈</p>
      <p>Try to collect at least 5 pets with rainbow colors! The collector with the most rainbow pets will get a special "Rainbow Master" badge! 🏆</p>
      
      <h3>🎉 Keep Collecting! 🎉</h3>
      <p>Remember, every collection is special and unique! Whether you have 5 pets or 50 pets, what matters most is the love you give them! 🌟</p>
      
      <p>Stay tuned for our next Community Spotlight, where we'll feature even more amazing collectors! 🐾✨</p>
    `,
  },
]

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.id === params.slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.id === params.slug)

  if (!post) {
    notFound()
  }

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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to blog button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center btn-bubbly bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg px-6 py-3 rounded-2xl transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            🎉 Back to Fun Blog!
          </Link>
        </div>

        {/* Blog post card */}
        <Card className="border-4 border-blue-400 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl mb-12">
          <CardHeader className={`bg-gradient-to-r ${post.color} rounded-t-3xl`}>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-white/90 text-purple-800 font-bold text-lg px-4 py-2 rounded-full">
                {post.emoji} {post.category}
              </Badge>
              <div className="flex items-center text-white font-bold text-lg">
                <Clock className="h-5 w-5 mr-2" />
                {post.readTime}
              </div>
            </div>
            <CardTitle className="font-title text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {post.title}
            </CardTitle>
            <p className="text-white/95 text-xl font-bold leading-relaxed">{post.excerpt}</p>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Author and date info */}
            <div className="flex items-center justify-between text-lg text-purple-600 mb-8 font-bold border-b-2 border-purple-200 pb-4">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(post.date).toLocaleDateString()}
              </div>
            </div>

            {/* Blog content */}
            <div 
              className="prose prose-lg max-w-none text-purple-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t-2 border-purple-200">
              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 mr-2 text-purple-600" />
                <span className="text-purple-600 font-bold text-lg">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full">
                  🐾 adoptme Pets
                </Badge>
                <Badge className="bg-pink-100 text-pink-800 font-bold px-3 py-1 rounded-full">
                  🎮 Gaming
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
                  👥 Community
                </Badge>
                <Badge className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full">
                  🌟 Fun
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related posts section */}
        <div className="text-center">
          <h2 className="font-title text-3xl font-bold text-purple-800 mb-8">🌟 More Fun Articles! 🌟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((relatedPost) => relatedPost.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="border-4 border-green-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl bg-white/90 backdrop-blur-sm"
                >
                  <CardHeader className={`bg-gradient-to-r ${relatedPost.color} rounded-t-3xl`}>
                    <Badge className="bg-white/90 text-purple-800 font-bold text-lg px-4 py-2 rounded-full w-fit">
                      {relatedPost.emoji} {relatedPost.category}
                    </Badge>
                    <CardTitle className="font-title text-xl font-bold text-white leading-tight">
                      {relatedPost.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-purple-600 mb-4 leading-relaxed font-bold">{relatedPost.excerpt}</p>
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="inline-flex items-center btn-bubbly bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      🎉 Read More!
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 