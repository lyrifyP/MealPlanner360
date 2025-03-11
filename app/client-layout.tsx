"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChefHat } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleHowItWorksClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#how-it-works'
    }
  }

  const handleRequestRecipeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('request-recipe')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#request-recipe'
    }
  }

  return (
    <body className={cn("min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950")}>
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-none border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
          <div className="container flex h-14 items-center px-4">
            <Link href="/" className="flex items-center">
              <ChefHat className="h-6 w-6 text-emerald-500" />
              <span className="ml-2 text-lg font-semibold text-white hidden sm:inline">
                The Dine-In Club
              </span>
            </Link>
            {/* How it Works Section - commented out */}
            {/* <Button 
              variant="ghost" 
              className="text-zinc-400 hover:text-white text-sm sm:text-base px-2 sm:px-4"
              onClick={handleHowItWorksClick}
            >
              How it Works
            </Button> */}
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              <Link href="/restaurants">
                <Button variant="ghost" className="text-zinc-400 hover:text-white text-sm sm:text-base px-2 sm:px-4">
                  Restaurants
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-white text-sm sm:text-base px-2 sm:px-4"
                onClick={handleRequestRecipeClick}
              >
                Request a Recipe
              </Button>
              {/* Cookbook Vault link - commented out for now */}
              {/* <Link href="/creator-marketplace">
                <Button variant="ghost" className="text-zinc-400 hover:text-white text-sm sm:text-base px-2 sm:px-4">
                  Cookbook Vault
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
        {/* How it Works Section - commented out */}
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

        {children}
      </div>
    </body>
  )
} 