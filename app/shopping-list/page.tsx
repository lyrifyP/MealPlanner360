"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

type Meal = {
  id: number
  meal_name: string
  ingredients: Ingredient[]
  image_url: string | null
}

type Ingredient = {
  quantity: string
  ingredientName: string
}

type CombinedIngredients = {
  [key: string]: {
    quantity: string
    meals: string[]
  }
}

export default function ShoppingListPage() {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [combinedIngredients, setCombinedIngredients] = useState<CombinedIngredients>({})
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchSelectedMeals() {
      try {
        const storedData = localStorage.getItem('selectedMealIds')
        const selectedIds = storedData ? JSON.parse(storedData) : []

        if (selectedIds.length === 0) {
          setIsLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('meals')
          .select('id, meal_name, ingredients, image_url')
          .in('id', selectedIds)

        if (error) throw error

        setSelectedMeals(data || [])
        combineIngredients(data)
      } catch (err) {
        console.error('Error fetching meals:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSelectedMeals()
  }, [])

  const combineIngredients = (meals: Meal[]) => {
    console.log('Combining ingredients for meals:', meals)
    const combined: CombinedIngredients = {}
    
    meals.forEach(meal => {
      console.log('Processing meal:', meal.meal_name)
      console.log('Ingredients:', meal.ingredients)
      
      meal.ingredients.forEach(ingredient => {
        const { ingredientName, quantity } = ingredient
        
        if (!combined[ingredientName]) {
          combined[ingredientName] = {
            quantity,
            meals: [meal.meal_name]
          }
        } else {
          combined[ingredientName].meals.push(meal.meal_name)
          // Note: In a real app, you'd want to handle unit conversion and quantity addition here
          combined[ingredientName].quantity = `${quantity} + ${combined[ingredientName].quantity}`
        }
      })
    })

    console.log('Combined ingredients:', combined)
    setCombinedIngredients(combined)
  }

  const clearShoppingList = () => {
    localStorage.setItem('selectedMealIds', '[]')
    setSelectedMeals([])
    setCombinedIngredients({})
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto" />
          <p className="text-white mt-4">Loading your shopping list...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-500">Debug Info:</p>
          <p className="text-white">{error}</p>
          <p className="text-zinc-400 mt-2">localStorage content:</p>
          <pre className="text-zinc-400 text-sm mt-1">
            {JSON.stringify(localStorage.getItem('selectedMealIds'), null, 2)}
          </pre>
        </div>
        <Link href="/cuisines">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cuisines
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/cuisines">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Meals
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Shopping List</h1>
        </div>
        {selectedMeals.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={clearShoppingList}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear List
          </Button>
        )}
      </div>

      {selectedMeals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-400">No meals selected. Add some meals to create your shopping list!</p>
          <Link href="/cuisines">
            <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600">
              Browse Meals
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Selected Meals */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Selected Meals</h2>
            <div className="space-y-4">
              {selectedMeals.map(meal => (
                <div 
                  key={meal.id}
                  className="bg-zinc-800/50 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="h-16 w-16 bg-zinc-700 rounded overflow-hidden">
                    {meal.image_url ? (
                      <img 
                        src={meal.image_url} 
                        alt={meal.meal_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500">
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{meal.meal_name}</h3>
                    <p className="text-sm text-zinc-400">{meal.ingredients.length} ingredients</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Ingredients */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Combined Ingredients</h2>
            <div className="bg-zinc-800/50 rounded-lg p-6">
              <div className="space-y-4">
                {Object.entries(combinedIngredients).map(([ingredient, details]) => (
                  <div key={ingredient} className="flex justify-between items-start pb-4 border-b border-zinc-700">
                    <div>
                      <p className="text-white font-medium">{ingredient}</p>
                      <p className="text-sm text-zinc-400">Used in: {details.meals.join(', ')}</p>
                    </div>
                    <span className="text-emerald-500 font-medium">{details.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 