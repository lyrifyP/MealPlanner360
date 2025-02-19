"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChefHat, ShoppingCart, Search, ListChecks, UtensilsCrossed, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false)
  const [isLoadingShoppingList, setIsLoadingShoppingList] = useState(false)
  const router = useRouter()

  const handleRestaurantsClick = async () => {
    setIsLoadingRestaurants(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    router.push('/restaurants')
  }

  const handleShoppingListClick = async () => {
    setIsLoadingShoppingList(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    router.push('/shopping-list')
  }

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Hero Section - removed button, reduced padding */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
              The Dine-In Club
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            Love Exclusive Restaurant Dishes But Hate the Price? Recreate Them at Home with The Dine-In Club!
          </p>
        </div>
      </div>

      {/* Features Grid - moved up */}
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Restaurant Selection Card */}
          <div className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors">
            <h2 className="text-xl font-bold text-white mb-3">Browse Recipes from Top Restaurants</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Explore dishes from your favourite restaurants. From fine dining to popular chains, we've got them all covered.
            </p>
            <Button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handleRestaurantsClick}
              disabled={isLoadingRestaurants}
            >
              {isLoadingRestaurants ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ChefHat className="mr-2 h-4 w-4" />
                  <span>View Restaurants</span>
                </div>
              )}
            </Button>
          </div>

          {/* Creator Marketplace for Recipes Section */}
          <div className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors">
            <h2 className="text-xl font-bold text-white mb-3">Creator Marketplace for Recipes</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Promote your recipe books and connect with food enthusiasts.
            </p>
            <Button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => router.push('/creator-marketplace')}
            >
              <ChefHat className="mr-2 h-4 w-4" />
              Go to Creator Marketplace
            </Button>
          </div>
        </div>
      </div>

      {/* How it Works Section - added id */}
      <div id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            How it Works
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Three simple steps to recreate your favourite restaurant dishes at home
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-zinc-800/30 rounded-lg p-6 text-center relative group hover:bg-zinc-800/50 transition-all">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-all">
              <Search className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Find Your Dish
            </h3>
            <p className="text-sm text-zinc-400">
              Browse through our collection of popular restaurant dishes and select your favourites
            </p>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                1
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-zinc-800/30 rounded-lg p-6 text-center relative group hover:bg-zinc-800/50 transition-all">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-all">
              <ListChecks className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Get Your Shopping List
            </h3>
            <p className="text-sm text-zinc-400">
              Select multiple dishes and get an instant, organized list of all ingredients needed
            </p>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                2
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-zinc-800/30 rounded-lg p-6 text-center relative group hover:bg-zinc-800/50 transition-all">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-all">
              <UtensilsCrossed className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Cook Like a Pro
            </h3>
            <p className="text-sm text-zinc-400">
              Follow our detailed recipes to recreate restaurant-quality dishes in your own kitchen
            </p>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}