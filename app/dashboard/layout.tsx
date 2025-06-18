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

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Meal Plan', href: '/dashboard/meal-plan', icon: Calendar },
  { name: 'Deliveries', href: '/dashboard/deliveries', icon: Truck },
  { name: 'Nutrition Tracker', href: '/dashboard/nutrition', icon: BarChart3 },
  { name: 'Tools & Add-ons', href: '/dashboard/tools', icon: Package },
  { name: 'Account/Billing', href: '/dashboard/account', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Jack's Snacks</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search recipes, meals, ingredients..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Bell className="h-6 w-6" />
              </button>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors group"
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-green-600" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Quick Action Button */}
      <button className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-20">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  )
} 