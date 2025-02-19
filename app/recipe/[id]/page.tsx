"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Clock, Users, ChefHat, UtensilsCrossed, ScrollText } from "lucide-react"
import Link from "next/link"

type Recipe = {
  id: number
  meal_name: string
  ingredients: Ingredient[]
  recipe: {
    Steps: string[]
    Servings: number
    "Cooking Time": string
  }
  image_url: string | null
  must_have_tool: string | null
  tool_description: string | null
  tool_image_url: string | null
  tool_affiliate_link: string | null
  key_ingredient: string | null
  ingredient_description: string | null
  ingredient_image_url: string | null
  ingredient_affiliate_link: string | null
  time_saving_shortcut: string | null
  shortcut_description: string | null
  shortcut_image_url: string | null
  shortcut_affiliate_link: string | null
}

type Ingredient = {
  quantity: string
  ingredientName: string
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('instructions')
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data, error } = await supabase
          .from('meals')
          .select('*, must_have_tool, tool_description, tool_image_url, tool_affiliate_link, key_ingredient, ingredient_description, ingredient_image_url, ingredient_affiliate_link, time_saving_shortcut, shortcut_description, shortcut_image_url, shortcut_affiliate_link')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        if (data) {
          // Parse JSONB data if needed
          const parsedRecipe = {
            ...data,
            recipe: typeof data.recipe === 'string' 
              ? JSON.parse(data.recipe) 
              : data.recipe
          }
          console.log('Parsed recipe:', parsedRecipe) // Debug log
          setRecipe(parsedRecipe)
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [params.id])

  const TabButton = ({ tab, label, icon: Icon }: { 
    tab: 'ingredients' | 'instructions', 
    label: string,
    icon: React.ElementType
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors
        ${activeTab === tab 
          ? 'bg-emerald-500 text-white' 
          : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-zinc-400">Recipe not found</p>
          <Link href="/restaurants">
            <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600">
              Back to Restaurants
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/restaurants">
          <Button variant="ghost" className="text-zinc-400 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{recipe.meal_name}</h1>
      </div>

      {/* Image and Quick Info */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden mb-6">
          {recipe.image_url ? (
            <img 
              src={recipe.image_url} 
              alt={recipe.meal_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat className="h-12 w-12 text-zinc-600" />
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          {recipe.recipe["Cooking Time"] && (
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <Clock className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm text-zinc-400">Cooking Time</p>
              <p className="text-white font-medium">{recipe.recipe["Cooking Time"]}</p>
            </div>
          )}
          {recipe.recipe.Servings && (
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <Users className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm text-zinc-400">Servings</p>
              <p className="text-white font-medium">{recipe.recipe.Servings}</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="max-w-2xl mx-auto">
        <div className="flex rounded-t-lg overflow-hidden mb-6">
          <TabButton 
            tab="instructions" 
            label="Recipe" 
            icon={ScrollText}
          />
          <TabButton 
            tab="ingredients" 
            label="Ingredients" 
            icon={UtensilsCrossed}
          />
        </div>

        {/* Content */}
        <div className="bg-zinc-800/50 rounded-lg p-6">
          {activeTab === 'instructions' ? (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Recipe</h2>
              <div className="space-y-6">
                {recipe.recipe.Steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <span className="text-sm text-emerald-500 font-medium">{index + 1}</span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients
                  .sort((a, b) => a.ingredientName.localeCompare(b.ingredientName))
                  .map((ingredient, index) => (
                    <li 
                      key={index}
                      className="flex justify-between text-sm border-b border-zinc-700 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-zinc-300">{ingredient.ingredientName}</span>
                      <span className="text-emerald-500 font-medium">{ingredient.quantity}</span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Chef's Top Picks Section */}
      <div className="max-w-2xl mx-auto mt-8 mb-8 px-4 sm:px-0">
        <h2 className="text-xl font-semibold text-white mb-4">Chef's Top Picks</h2>
        <div className="space-y-4">
          {/* Must-Have Tool Card */}
          {recipe.must_have_tool && (
            <div className="bg-zinc-800/50 rounded-lg p-4 flex flex-col sm:flex-row items-start">
              <div className="flex-shrink-0">
                {recipe.tool_image_url && (
                  <img 
                    src={recipe.tool_image_url} 
                    alt={recipe.must_have_tool} 
                    className="w-24 h-auto rounded-lg mb-2 sm:mb-0 sm:mr-4" 
                  />
                )}
              </div>
              <div className="flex-grow">
                <span className="font-bold text-lg">{recipe.must_have_tool} 🔪</span>
                <p className="text-sm">{recipe.tool_description || 'No description available.'}</p>
                {recipe.tool_affiliate_link && (
                  <a 
                    href={recipe.tool_affiliate_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-500 hover:underline"
                  >
                    View Here
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Key Ingredient Card */}
          {recipe.key_ingredient && (
            <div className="bg-zinc-800/50 rounded-lg p-4 flex flex-col sm:flex-row items-start">
              <div className="flex-shrink-0">
                {recipe.ingredient_image_url && (
                  <img 
                    src={recipe.ingredient_image_url} 
                    alt={recipe.key_ingredient} 
                    className="w-24 h-auto rounded-lg mb-2 sm:mb-0 sm:mr-4" 
                  />
                )}
              </div>
              <div className="flex-grow">
                <span className="font-bold text-lg">{recipe.key_ingredient} 🌶️</span>
                <p className="text-sm">{recipe.ingredient_description || 'No description available.'}</p>
                {recipe.ingredient_affiliate_link && (
                  <a 
                    href={recipe.ingredient_affiliate_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-500 hover:underline"
                  >
                    View Here
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Time-Saving Shortcut Card */}
          {recipe.time_saving_shortcut && (
            <div className="bg-zinc-800/50 rounded-lg p-4 flex flex-col sm:flex-row items-start">
              <div className="flex-shrink-0">
                {recipe.shortcut_image_url && (
                  <img 
                    src={recipe.shortcut_image_url} 
                    alt={recipe.time_saving_shortcut} 
                    className="w-24 h-auto rounded-lg mb-2 sm:mb-0 sm:mr-4" 
                  />
                )}
              </div>
              <div className="flex-grow">
                <span className="font-bold text-lg">{recipe.time_saving_shortcut} ⏳</span>
                <p className="text-sm">{recipe.shortcut_description || 'No description available.'}</p>
                {recipe.shortcut_affiliate_link && (
                  <a 
                    href={recipe.shortcut_affiliate_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-500 hover:underline"
                  >
                    View Here
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 