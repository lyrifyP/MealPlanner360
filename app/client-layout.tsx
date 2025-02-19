"use client"

import { ChefHat } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

  return (
    <body className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-none border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
          <div className="container flex h-14 items-center px-4">
            <Link href="/" className="flex items-center">
              <ChefHat className="h-6 w-6 text-emerald-500" />
              <span className="ml-2 text-lg font-semibold text-white">The Dine-In Club</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-white"
                onClick={handleHowItWorksClick}
              >
                How it Works
              </Button>
              <Link href="/restaurants">
                <Button variant="ghost" className="text-zinc-400 hover:text-white">
                  Restaurants
                </Button>
              </Link>
              <Link href="/shopping-list">
                <Button variant="ghost" className="text-zinc-400 hover:text-white">
                  Shopping List
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </body>
  )
} 