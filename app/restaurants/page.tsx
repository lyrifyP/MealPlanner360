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
import { Utensils, Loader2 } from "lucide-react"

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
  const [isLoading, setIsLoading] = useState(true)
  const [isMealsLoading, setIsMealsLoading] = useState(false)
  
  const supabase = createClientComponentClient()

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Restaurant Favorites</h1>
      
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
                className="bg-zinc-800/50 rounded-lg overflow-hidden hover:bg-zinc-800/70 transition-colors flex flex-col h-full"
              >
                {/* Meal Image */}
                <div className="h-48 bg-zinc-700 relative flex-shrink-0">
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
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{meal.meal_name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      meal.vegetarian_non_veg === 'Vegetarian' 
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {meal.vegetarian_non_veg}
                    </span>
                  </div>

                  {/* Cuisine */}
                  <div className="text-sm text-zinc-400 mb-4">
                    Cuisine: {meal.cuisine}
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
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

                  {/* Ingredients */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-zinc-300 mb-2">Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(meal.ingredients) ? (
                        meal.ingredients.map((ingredient, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded"
                          >
                            {typeof ingredient === 'object' && 'quantity' in ingredient
                              ? `${ingredient.quantity} ${ingredient.ingredientName}`
                              : ingredient}
                          </span>
                        ))
                      ) : (
                        Object.entries(meal.ingredients as Record<string, Ingredient>).map(([key, value], index) => (
                          <span 
                            key={index}
                            className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded"
                          >
                            {`${value.quantity} ${value.ingredientName}`}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                      View Recipe
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