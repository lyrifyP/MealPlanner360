"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Utensils, Loader2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Reuse the same types from cuisines page
type Meal = {
  id: number
  meal_name: string
  ingredients: (string | Ingredient)[]
  protein: number
  carbs: number
  fat: number
  calories: number
  vegetarian_non_veg: "Vegetarian" | "Non Veg"
  tags: string[]
  category: string
  cuisine: string
  complexity: "Simple" | "Moderate" | "Complex"
  popular_restaurant: string | null
  recipe: any
  image_url: string | null
}

type Ingredient = {
  quantity: string;
  ingredientName: string;
}

export default function RestaurantsPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("")
  const [restaurants, setRestaurants] = useState<string[]>([])
  const [meals, setMeals] = useState<Meal[]>([])
  const [selectedMeals, setSelectedMeals] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [isMealsLoading, setIsMealsLoading] = useState(false)
  const [loadingRecipeId, setLoadingRecipeId] = useState<number | null>(null)
  
  const supabase = createClientComponentClient()
  const router = useRouter()

  // Fetch unique restaurants for dropdown
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data, error } = await supabase
          .from('meals')
          .select('popular_restaurant')
          .not('popular_restaurant', 'is', null)
          .order('popular_restaurant')

        if (error) throw error
        
        const uniqueRestaurants = [...new Set(data.map(item => item.popular_restaurant))].filter(Boolean);
        setRestaurants(uniqueRestaurants as string[])
      } catch (error) {
        console.error('Error fetching restaurants:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  // Fetch meals when restaurant is selected
  useEffect(() => {
    async function fetchMealsByRestaurant() {
      if (!selectedRestaurant) return
      
      setIsMealsLoading(true)
      try {
        const { data, error } = await supabase
          .from('meals')
          .select('*')
          .eq('popular_restaurant', selectedRestaurant)
          .order('meal_name')
        
        if (error) throw error
        
        setMeals(data)
      } catch (error) {
        console.error('Error fetching meals:', error)
      } finally {
        setIsMealsLoading(false)
      }
    }

    fetchMealsByRestaurant()
  }, [selectedRestaurant])

  // Add this to both pages after the selectedMeals state declaration
  useEffect(() => {
    const storedMealIds = JSON.parse(localStorage.getItem('selectedMealIds') || '[]')
    setSelectedMeals(new Set(storedMealIds))
  }, [])

  const toggleMealSelection = (mealId: number) => {
    setSelectedMeals(prev => {
      const newSelection = new Set(prev)
      if (newSelection.has(mealId)) {
        newSelection.delete(mealId)
      } else {
        newSelection.add(mealId)
      }
      
      // Store in localStorage
      localStorage.setItem('selectedMealIds', JSON.stringify([...newSelection]))
      
      return newSelection
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Popular Restaurants</h1>
      </div>

      {/* Mobile view - Shopping List Button */}
      {selectedMeals.size > 0 && (
        <div className="mb-6">
          <Link href="/shopping-list" className="block">
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white">
              View Shopping List ({selectedMeals.size})
            </Button>
          </Link>
        </div>
      )}
      
      {/* Restaurant Selector */}
      <div className="max-w-md mx-auto mb-12">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : (
          <Select onValueChange={setSelectedRestaurant}>
            <SelectTrigger className="w-full bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="Select a restaurant" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700">
              {restaurants.map((restaurant) => (
                <SelectItem key={restaurant} value={restaurant} className="hover:bg-zinc-700">
                  {restaurant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Meals Grid */}
      {selectedRestaurant && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isMealsLoading ? (
            <div className="col-span-full flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            meals.map((meal) => (
              <div 
                key={meal.id}
                className="bg-zinc-800/50 rounded-lg overflow-hidden hover:bg-zinc-800/70 transition-colors"
              >
                {/* Meal Image */}
                <div className="h-48 bg-zinc-700 relative">
                  {meal.image_url ? (
                    <img 
                      src={meal.image_url} 
                      alt={meal.meal_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                      <Utensils className="w-12 h-12" />
                    </div>
                  )}
                </div>

                {/* Meal Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{meal.meal_name}</h3>
                  <p className="text-sm text-zinc-400 mb-4">Cuisine: {meal.cuisine}</p>

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {[
                      { label: 'Protein', value: meal.protein },
                      { label: 'Carbs', value: meal.carbs },
                      { label: 'Fat', value: meal.fat },
                      { label: 'Calories', value: meal.calories }
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <div className="text-emerald-500 font-semibold">{value}</div>
                        <div className="text-xs text-zinc-500">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                      onClick={() => {
                        setLoadingRecipeId(meal.id)
                        router.push(`/recipe/${meal.id}`)
                      }}
                      disabled={loadingRecipeId === meal.id}
                    >
                      {loadingRecipeId === meal.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Smart AI
                        </>
                      ) : (
                        'View Recipe'
                      )}
                    </Button>
                    <Button 
                      className={`flex-1 ${
                        selectedMeals.has(meal.id) 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-zinc-700 hover:bg-zinc-600'
                      } text-white`}
                      onClick={() => toggleMealSelection(meal.id)}
                    >
                      {selectedMeals.has(meal.id) ? 'Remove Ingredients' : 'Add Ingredients'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}