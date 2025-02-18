import Link from "next/link"
import { UtensilsCrossed, ChefHat, ShoppingCart, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">FoodPlanner360</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-zinc-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-zinc-300 hover:text-white transition-colors">
                How it Works
              </Link>
              <Link href="#recipes" className="text-zinc-300 hover:text-white transition-colors">
                Recipes
              </Link>
            </div>
            <div className="flex items-center">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

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
            Plan your meals, generate shopping lists, and discover new recipes tailored to your preferences and dietary
            needs.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white min-w-[200px]">
              Start Planning
            </Button>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ChefHat className="absolute top-20 left-20 h-12 w-12 text-emerald-500/20 animate-float" />
          <Calendar className="absolute top-40 right-32 h-16 w-16 text-emerald-500/20 animate-float-delayed" />
          <ShoppingCart className="absolute bottom-20 left-32 h-14 w-14 text-emerald-500/20 animate-float" />
        </div>
      </div>
    </div>
  )
}

