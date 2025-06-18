import { redirect } from 'next/navigation'
import { ChefHat, Target, ShoppingCart, BarChart3 } from 'lucide-react'
import Link from 'next/link'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">Jack's Snacks</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Smart Meal Planning
          <span className="text-green-600 block">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Plan your meals, track nutrition, and generate smart grocery lists with our 
          desktop-first meal prep platform designed for serious meal planners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard"
            className="px-8 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Planning Free
          </Link>
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 text-lg rounded-lg hover:bg-green-50 transition-colors">
            View Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Everything You Need for Meal Planning Success
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Nutrition</h3>
            <p className="text-gray-600">
              Track macros and calories with precision. Set goals and let our algorithms guide your meal choices.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Recipe Library</h3>
            <p className="text-gray-600">
              Thousands of recipes with detailed nutrition info. Filter by cuisine, diet, and cooking time.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Grocery Lists</h3>
            <p className="text-gray-600">
              Automatically generate organized grocery lists from your meal plans. Never forget an ingredient again.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
            <p className="text-gray-600">
              Track your nutrition progress with detailed analytics and insights to reach your goals faster.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-green-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Meal Planning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have simplified their meal prep with Jack's Snacks.
          </p>
          <Link 
            href="/dashboard"
            className="px-8 py-3 bg-white text-green-600 text-lg rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8">
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">Jack's Snacks</span>
            </div>
            <p className="text-gray-600">© 2024 Jack's Snacks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  // For now, just show the landing page without auth
  return <LandingPage />
} 