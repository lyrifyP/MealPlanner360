import Link from "next/link"
import { UtensilsCrossed, ChefHat, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">FoodPlanner360</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="#features" className="text-zinc-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-zinc-300 hover:text-white transition-colors">
                How it Works
              </Link>
            </div>
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Transform Your Meal Planning with{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
              FoodPlanner360
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Plan your meals, generate shopping lists, and discover new recipes tailored to your preferences and dietary
            needs.
          </p>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ChefHat className="absolute top-20 left-20 h-12 w-12 text-emerald-500/20 animate-float" />
          <ShoppingCart className="absolute bottom-20 left-32 h-14 w-14 text-emerald-500/20 animate-float" />
        </div>
      </div>

      {/* Meal Selection Section */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Cuisine Type Card */}
          <div className="bg-zinc-800/50 rounded-lg p-5 sm:p-8 hover:bg-zinc-800/70 transition-colors cursor-pointer">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Browse by Cuisine</h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6">
              Explore dishes from Italian, Japanese, Mexican, Indian, and many more cuisines from around the world.
            </p>
            <div className="flex justify-center">
              <Link href="/cuisines">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Explore Cuisines
                </Button>
              </Link>
            </div>
          </div>

          {/* Popular Restaurant Card */}
          <div className="bg-zinc-800/50 rounded-lg p-5 sm:p-8 hover:bg-zinc-800/70 transition-colors cursor-pointer">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Popular Restaurant Dishes</h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6">
              Learn to make your favorite restaurant meals at home with our curated collection of copycat recipes.
            </p>
            <div className="flex justify-center">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                View Restaurant Dishes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

