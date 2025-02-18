"use client"

import Link from "next/link"
import { ChefHat, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleExplore = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a short loading state before navigation
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push('/cuisines');
  };

  return (
    <div>
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
            Plan your meals, generate shopping lists, and discover new recipes tailored to your preferences and dietary needs.
          </p>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ChefHat className="absolute top-20 left-20 h-12 w-12 text-emerald-500/20 animate-float" />
          <ShoppingCart className="absolute bottom-20 left-32 h-14 w-14 text-emerald-500/20 animate-float" />
        </div>
      </div>

      {/* Meal Selection Section */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cuisine Type Card */}
          <div 
            className="bg-zinc-800/50 rounded-lg p-5 sm:p-8 hover:bg-zinc-800/70 transition-all duration-300 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className={`absolute inset-0 bg-emerald-500/10 transform transition-transform duration-500 ease-in-out ${
              isHovering ? 'scale-100' : 'scale-0'
            }`} />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 relative z-10">Browse by Cuisine</h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6 relative z-10">
              Explore dishes from Italian, Japanese, Mexican, Indian, and many more cuisines from around the world.
            </p>
            <div className="flex justify-center relative z-10">
              <Button 
                onClick={handleExplore}
                disabled={isLoading}
                className={`bg-emerald-500 hover:bg-emerald-600 text-white transform transition-all duration-300 ${
                  isHovering && !isLoading ? 'scale-105 shadow-lg shadow-emerald-500/20' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  'Explore Cuisines'
                )}
              </Button>
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