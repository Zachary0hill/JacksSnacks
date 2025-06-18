'use client'

import {
  Home,
  Calendar,
  ChefHat,
  ShoppingCart,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  User,
  Truck,
  Package
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Meal Plan', href: '/dashboard/meal-plan', icon: Calendar },
  { name: 'Deliveries', href: '/dashboard/deliveries', icon: Truck },
  { name: 'Nutrition', href: '/dashboard/nutrition', icon: BarChart3 },
  { name: 'Tools & Add-ons', href: '/dashboard/tools', icon: Package },
  { name: 'Settings', href: '/dashboard/account', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm fixed top-0 w-full z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Jack's Snacks</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search for food recipe"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Left Sidebar */}
        <nav className="w-72 bg-white fixed left-0 top-20 bottom-0 overflow-y-auto shadow-sm">
          <div className="p-6">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Alex Johnson</div>
                  <div className="text-sm text-gray-500">Premium Member</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all group ${
                      isActive
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <item.icon className={`mr-4 h-5 w-5 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-green-600'
                    }`} />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Add Recipe Card */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Add your own recipe</h3>
                  <p className="text-green-100 text-sm">Create and share your favorite recipes</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ChefHat className="w-8 h-8" />
                </div>
              </div>
              <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-3 px-4 rounded-xl transition-colors text-sm">
                Upload Recipe
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 ml-72">
          {children}
        </main>
      </div>
    </div>
  )
} 