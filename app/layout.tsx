import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Jack's Snacks - Smart Meal Planning",
  description: 'Desktop-first meal prep app with smart nutrition tracking, recipe management, and grocery planning.',
  keywords: ['meal planning', 'nutrition', 'recipes', 'grocery list', 'meal prep'],
  authors: [{ name: 'Jack\'s Snacks Team' }],
  creator: 'Jack\'s Snacks',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: "Jack's Snacks - Smart Meal Planning",
    description: 'Desktop-first meal prep app with smart nutrition tracking, recipe management, and grocery planning.',
    siteName: "Jack's Snacks",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jack's Snacks - Smart Meal Planning",
    description: 'Desktop-first meal prep app with smart nutrition tracking, recipe management, and grocery planning.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
} 