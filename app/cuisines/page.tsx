import { UtensilsCrossed } from "lucide-react"
import Link from "next/link"

export default function CuisinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">FoodPlanner360</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="#features" className="text-zinc-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-zinc-300 hover:text-white transition-colors">
                How it Works
              </Link>
            </div>
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Explore Cuisines</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample cuisine cards - you can expand this list */}
          {[
            { name: "Italian", description: "Pizza, pasta, and Mediterranean flavors" },
            { name: "Japanese", description: "Sushi, ramen, and traditional dishes" },
            { name: "Mexican", description: "Tacos, enchiladas, and spicy specialties" },
            { name: "Indian", description: "Curries, tandoori, and aromatic spices" },
            { name: "Chinese", description: "Stir-fries, dumplings, and regional specialties" },
            { name: "Thai", description: "Pad thai, curry, and fresh herbs" },
          ].map((cuisine) => (
            <div
              key={cuisine.name}
              className="bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800/70 transition-colors cursor-pointer"
            >
              <h2 className="text-xl font-bold text-white mb-2">{cuisine.name}</h2>
              <p className="text-zinc-400">{cuisine.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 