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
import { ChevronDown, Utensils, Clock, Loader2 } from "lucide-react"

type Meal = {
  id: number
  meal_name: string
  ingredients: string[]
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

export default function CuisinesPage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("")
  const [cuisines, setCuisines] = useState<string[]>([])
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMealsLoading, setIsMealsLoading] = useState(false)
  
  const supabase = createClientComponentClient()

  // Fetch unique cuisines for dropdown
  useEffect(() => {
    async function fetchCuisines() {
      try {
        const { data, error } = await supabase
          .from('meals')
          .select('cuisine')
          .order('cuisine')

        if (error) throw error
        
        // Get unique cuisines using Set
        const uniqueCuisines = [...new Set(data.map(item => item.cuisine))];
        setCuisines(uniqueCuisines)
      } catch (error) {
        console.error('Error fetching cuisines:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCuisines()
  }, [])

  // Fetch meals when cuisine is selected
  useEffect(() => {
    async function fetchMealsByCuisine() {
      if (!selectedCuisine) return
      
      setIsMealsLoading(true)
      try {
        const { data, error } = await supabase
          .from('meals')
          .select('*')
          .eq('cuisine', selectedCuisine)
        
        if (error) throw error
        
        setMeals(data)
      } catch (error) {
        console.error('Error fetching meals:', error)
      } finally {
        setIsMealsLoading(false)
      }
    }

    fetchMealsByCuisine()
  }, [selectedCuisine])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Explore Cuisines</h1>
      
      {/* Cuisine Selector */}
      <div className="max-w-md mx-auto mb-12">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : (
          <Select onValueChange={setSelectedCuisine}>
            <SelectTrigger className="w-full bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="Select a cuisine" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700">
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine} className="hover:bg-zinc-700">
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Meals Grid */}
      {selectedCuisine && (
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

                  {/* Complexity */}
                  <div className="text-sm text-zinc-400 mb-4">
                    Complexity: {meal.complexity}
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
                      {meal.ingredients.map((ingredient: Ingredient, index: number) => (
                        <span 
                          key={index}
                          className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded"
                        >
                          {ingredient.quantity} {ingredient.ingredientName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {meal.tags && meal.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {meal.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                    View Recipe
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
} 