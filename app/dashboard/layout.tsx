'use client'

import { useState, useEffect, useRef } from 'react'
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
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Meal Plans', href: '/dashboard/meal-plan', icon: Calendar },
  { name: 'Preferences', href: '/dashboard/preferences', icon: Settings },
  { name: 'Recipes', href: '/dashboard/recipes', icon: ChefHat },
  { name: 'Planner', href: '/dashboard/planner', icon: BarChart3 },
  { name: 'Subscriptions', href: '/dashboard/subscription', icon: Package },
  { name: 'Account Settings', href: '/dashboard/account', icon: User },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <button className="text-xs text-green-600 hover:text-green-700">Mark all read</button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Meal selection reminder</p>
                              <p className="text-xs text-gray-600">Choose your meals for next week by Tuesday</p>
                              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Delivery confirmed</p>
                              <p className="text-xs text-gray-600">Your meals will arrive Friday between 8-12 PM</p>
                              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Payment processed</p>
                              <p className="text-xs text-gray-600">Your subscription renewal was successful</p>
                              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <Link
                          href="/dashboard/account"
                          className="block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                          onClick={() => setShowNotifications(false)}
                        >
                          Notification Settings
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all"
                >
                  <User className="h-5 w-5 text-white" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <div className="p-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900">Alex Johnson</p>
                        <p className="text-sm text-gray-600">alex@example.com</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Premium Member
                        </span>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          href="/dashboard/account"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span className="text-sm">Account Settings</span>
                        </Link>
                        
                        <Link
                          href="/dashboard/subscription"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <Package className="h-4 w-4" />
                          <span className="text-sm">Subscription</span>
                        </Link>
                        
                        <Link
                          href="/support"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <Bell className="h-4 w-4" />
                          <span className="text-sm">Help & Support</span>
                        </Link>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100">
                        <button className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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