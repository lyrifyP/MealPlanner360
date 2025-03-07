"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChefHat, ShoppingCart, Search, ListChecks, UtensilsCrossed, Loader2, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Page() {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false)
  const [isLoadingShoppingList, setIsLoadingShoppingList] = useState(false)
  const [restaurant, setRestaurant] = useState("")
  const [meal, setMeal] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestStatus, setRequestStatus] = useState<"idle" | "success" | "error">("idle")
  const router = useRouter()
  
  // Initialize Supabase client with environment variables
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })

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

  const handleRecipeRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!restaurant.trim() || !meal.trim()) {
      alert("Please fill in both fields")
      return
    }
    
    setIsSubmitting(true)
    setRequestStatus("idle")
    
    try {
      // Log environment variables (without exposing sensitive data)
      console.log("Supabase URL available:", !!process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log("Supabase Anon Key available:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      // Insert data into the recipe_requests table
      const { data, error } = await supabase
        .from('recipe_requests')
        .insert([
          { 
            restaurant_name: restaurant.trim(), 
            meal_name: meal.trim() 
          }
        ])
        .select()
      
      if (error) {
        console.error("Supabase error:", error)
        // More detailed error logging
        if (error.code === "PGRST301") {
          console.error("Permission denied. Check RLS policies.")
        } else if (error.code === "22P02") {
          console.error("Invalid input syntax.")
        } else if (error.code === "23505") {
          console.error("Unique violation. This entry might already exist.")
        } else if (error.message.includes("connection")) {
          console.error("Connection error. Check Supabase URL and credentials.")
        }
        throw error
      }
      
      console.log("Recipe request submitted:", data)
      
      // Success message
      setRequestStatus("success")
      
      // Reset form
      setRestaurant("")
      setMeal("")
    } catch (error) {
      console.error("Error submitting recipe request:", error)
      setRequestStatus("error")
    } finally {
      setIsSubmitting(false)
    }
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

          {/* Request a Recipe Section */}
          <div className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors">
            <h2 className="text-xl font-bold text-white mb-3 text-center">Request a Recipe</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Can't find your favorite restaurant dish? Request it and we'll add it to our collection.
            </p>
            
            {requestStatus === "success" && (
              <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-md">
                <p className="text-emerald-400 text-sm text-center">
                  Thank you! Your recipe request has been submitted successfully.
                </p>
              </div>
            )}
            
            {requestStatus === "error" && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                <p className="text-red-400 text-sm text-center">
                  There was an error submitting your request. Please try again.
                </p>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleRecipeRequest}>
              <div>
                <label htmlFor="restaurant" className="block text-sm font-medium text-zinc-400 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  id="restaurant"
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                  placeholder="e.g. Cheesecake Factory"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="meal" className="block text-sm font-medium text-zinc-400 mb-1">
                  Meal Name
                </label>
                <input
                  type="text"
                  id="meal"
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  placeholder="e.g. Avocado Egg Rolls"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Submit Request</span>
                  </div>
                )}
              </Button>
            </form>
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