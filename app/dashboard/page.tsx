import { CalendarDays, Target, Utensils, ShoppingCart, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

// Mock data - will be replaced with real data from Supabase
const mockTodaysMeals = [
  {
    id: '1',
    type: 'breakfast',
    recipe: 'Overnight Oats with Berries',
    time: '8:00 AM',
    calories: 350,
    protein: 12,
    carbs: 65,
    fat: 8,
    prepared: true
  },
  {
    id: '2', 
    type: 'lunch',
    recipe: 'Grilled Chicken Salad',
    time: '12:30 PM',
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 22,
    prepared: false
  },
  {
    id: '3',
    type: 'dinner', 
    recipe: 'Salmon with Quinoa',
    time: '7:00 PM',
    calories: 580,
    protein: 40,
    carbs: 45,
    fat: 28,
    prepared: false
  }
]

// Mock profile data
const mockProfile = {
  full_name: 'John Doe',
  target_calories: 2000,
  target_protein: 150,
  target_carbs: 200,
  target_fat: 70
}

function MacroRing({ current, target, label, color }: { 
  current: number
  target: number
  label: string
  color: string 
}) {
  const percentage = Math.min((current / target) * 100, 100)
  const circumference = 2 * Math.PI * 40
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={color}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold">{current}</div>
            <div className="text-xs text-gray-500">/{target}</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-700">{label}</div>
    </div>
  )
}

export default function DashboardPage() {
  const profile = mockProfile

  // Calculate today's totals from mock data
  const todayTotals = mockTodaysMeals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fat: acc.fat + meal.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  const currentStreak = 7 // Mock streak data
  const completedMeals = mockTodaysMeals.filter(meal => meal.prepared).length

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Good morning, {profile.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-lg opacity-90">
              You're on a {currentStreak}-day meal prep streak. Keep it up!
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">Today's Progress</div>
            <div className="text-2xl font-bold">{completedMeals}/3 meals</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Plans</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+2 from last week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recipes Saved</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Utensils className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+5 this week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Grocery Saved</p>
              <p className="text-2xl font-bold text-gray-900">$127</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">vs dining out</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">{currentStreak} days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Personal best!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Meals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Meals</h2>
              <Link 
                href="/dashboard/planner"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                View Planner →
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockTodaysMeals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${meal.prepared ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{meal.recipe}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{meal.time}</span>
                        <span>•</span>
                        <span className="capitalize">{meal.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{meal.calories} cal</div>
                    <div className="text-xs text-gray-500">
                      P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Macro Tracking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Macros</h2>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-6">
            <MacroRing
              current={todayTotals.calories}
              target={profile.target_calories || 2000}
              label="Calories"
              color="text-green-500"
            />
            
            <div className="grid grid-cols-3 gap-4">
              <MacroRing
                current={todayTotals.protein}
                target={profile.target_protein || 150}
                label="Protein"
                color="text-blue-500"
              />
              <MacroRing
                current={todayTotals.carbs}
                target={profile.target_carbs || 200}
                label="Carbs"
                color="text-purple-500"
              />
              <MacroRing
                current={todayTotals.fat}
                target={profile.target_fat || 70}
                label="Fat"
                color="text-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link 
            href="/dashboard/planner"
            className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <CalendarDays className="h-6 w-6 text-green-600" />
            <span className="font-medium text-green-700">Plan This Week</span>
          </Link>
          
          <Link 
            href="/dashboard/recipes"
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Utensils className="h-6 w-6 text-blue-600" />
            <span className="font-medium text-blue-700">Browse Recipes</span>
          </Link>
          
          <Link 
            href="/dashboard/grocery"
            className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-purple-600" />
            <span className="font-medium text-purple-700">Grocery List</span>
          </Link>
          
          <Link 
            href="/dashboard/analytics"
            className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <span className="font-medium text-orange-700">View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 