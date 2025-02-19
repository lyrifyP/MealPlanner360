import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import ClientLayout from './client-layout'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'The Dine-In Club',
  description: 'Restaurant recipes at home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${fontSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <ClientLayout>
        {children}
      </ClientLayout>
    </html>
  )
}
