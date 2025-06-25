import Link from 'next/link'
import { ArrowLeft, Home, Search, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-green-500 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-center space-x-2 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>

          <Link
            href="/support"
            className="flex items-center justify-center space-x-2 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Get Help</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Can't find what you're looking for?
          </p>
          <div className="flex space-x-4 text-sm">
            <Link
              href="/support"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Contact Support
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/dashboard/recipes"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Browse Recipes
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/dashboard/meal-plan"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Meal Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 