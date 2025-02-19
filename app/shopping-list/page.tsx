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
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
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
        <Link href="/restaurants">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping List</h1>

      {/* Combined Ingredients Section */}
      <div className="bg-zinc-800/50 rounded-lg p-6 mb-8 w-full">
        <h2 className="text-xl font-semibold text-white mb-4">Shopping List Summary</h2>
        <ul className="space-y-3">
          {Object.entries(combinedIngredients)
            .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
            .map(([name, data]) => (
              <li 
                key={name}
                className="flex justify-between text-sm border-b border-zinc-700 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-zinc-300">{name}</span>
                <span className="text-emerald-500 font-medium">{data.quantity}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Selected Meals Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedMeals.map(meal => (
          <div 
            key={meal.id}
            className="bg-zinc-800/50 rounded-lg p-4 flex items-center gap-4"
          >
            <div className="h-16 w-16 bg-zinc-700 rounded overflow-hidden flex-shrink-0">
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
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium truncate">{meal.meal_name}</h3>
              <p className="text-sm text-zinc-400">{meal.ingredients.length} ingredients</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 