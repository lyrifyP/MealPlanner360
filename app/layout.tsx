import type { Metadata } from 'next'
import './globals.css'
import { UtensilsCrossed } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
          <nav className="border-b border-zinc-800" aria-label="Main navigation">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2" aria-label="FoodPlanner360 home">
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
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
