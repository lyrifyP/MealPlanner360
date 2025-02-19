"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChefHat, ShoppingCart, Search, ListChecks, UtensilsCrossed, Loader2, Book } from "lucide-react"
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
            <h2 className="text-xl font-bold text-white mb-3 text-center">Browse Recipes from Top Restaurants</h2>
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
            <h2 className="text-xl font-bold text-white mb-3 text-center">Access Recipe Books</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Access a vast collection of hand picked recipe books from around the world.
            </p>
            <Button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => router.push('/creator-marketplace')}
            >
              <Book className="mr-2 h-4 w-4" />
              Enter the Cookbook Vault
            </Button>
          </div>
        </div>
      </div>

      {/* How it Works Section - removed entire section */}
      {/* <div id="how-it-works" className="container mx-auto px-4 py-16"> */}
      {/*   <div className="text-center mb-12"> */}
      {/*     <h2 className="text-2xl md:text-3xl font-bold text-white mb-4"> */}
      {/*       How it Works */}
      {/*     </h2> */}
      {/*     <p className="text-zinc-400 max-w-2xl mx-auto"> */}
      {/*       Three simple steps to recreate your favourite restaurant dishes at home */}
      {/*     </p> */}
      {/*   </div> */}
      {/*   <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"> */}
      {/*     ... steps ... */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}