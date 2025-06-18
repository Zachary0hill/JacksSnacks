'use client'

import { 
  Calendar, 
  TrendingUp, 
  Truck, 
  Clock, 
  Target,
  Zap,
  Award,
  ChevronRight,
  Apple,
  Flame,
  Activity
} from 'lucide-react'

export default function DashboardPage() {
  // Mock data - would come from Supabase in real app
  const mockProfile = {
    name: 'Alex Johnson',
    height: { feet: 5, inches: 8 },
    weight: 165,
    goal: 'maintain',
    activityLevel: 'moderate',
    mealsPerDay: 3,
    targetCalories: 2200,
    targetProtein: 150,
    targetCarbs: 275,
    targetFat: 73
  }

  const mockWeekMeals = [
    { day: 'Mon', meals: ['Chicken Teriyaki Bowl', 'Greek Salad', 'Beef Stir Fry'], calories: 2180 },
    { day: 'Tue', meals: ['Salmon Quinoa', 'Turkey Wrap', 'Pasta Primavera'], calories: 2240 },
    { day: 'Wed', meals: ['Veggie Buddha Bowl', 'Chicken Caesar', 'Pork Tenderloin'], calories: 2190 },
    { day: 'Thu', meals: ['Breakfast Burrito', 'Tuna Poke', 'Lamb Curry'], calories: 2260 },
    { day: 'Fri', meals: ['Protein Pancakes', 'Chicken Tikka', 'Beef Tacos'], calories: 2200 },
    { day: 'Sat', meals: ['Avocado Toast', 'Shrimp Salad', 'Steak Dinner'], calories: 2220 },
    { day: 'Sun', meals: ['Egg Benedict', 'Fish & Chips', 'Chicken Parmesan'], calories: 2300 }
  ]

  const mockMacros = {
    calories: { current: 1650, target: 2200, percentage: 75 },
    protein: { current: 125, target: 150, percentage: 83 },
    carbs: { current: 180, target: 275, percentage: 65 },
    fat: { current: 58, target: 73, percentage: 79 }
  }

  const mockDelivery = {
    date: 'Tomorrow, Dec 19',
    time: '8:00 AM - 12:00 PM',
    meals: 12,
    courier: 'FreshDirect',
    tracking: 'FD123456789'
  }

  const MacroRing = ({ macro, size = 120 }: { macro: any, size?: number }) => {
    const radius = (size - 20) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (macro.percentage / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10b981"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-gray-900">{macro.current}</span>
          <span className="text-xs text-gray-500">of {macro.target}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, {mockProfile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your nutrition dashboard for today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            7-day streak! 🔥
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Week at a Glance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Week at a Glance</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                View Full Plan <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {mockWeekMeals.map((day, index) => (
                <div key={day.day} className={`flex items-center justify-between p-4 rounded-lg border ${
                  index === 0 ? 'border-green-200 bg-green-50' : 'border-gray-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-sm font-medium ${
                        index === 0 ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {day.day}
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-green-600 font-medium">Today</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-1">
                        {day.meals.map((meal, mealIndex) => (
                          <span
                            key={mealIndex}
                            className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{day.calories} cal</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((day.calories / mockProfile.targetCalories) * 100)}% of target
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Next Delivery Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6" />
              <h3 className="font-semibold">Next Delivery</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm opacity-90">{mockDelivery.date}</p>
              <p className="font-medium">{mockDelivery.time}</p>
              <p className="text-sm opacity-90">{mockDelivery.meals} meals • {mockDelivery.courier}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium transition-colors">
                Track Order
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium transition-colors">
                Reschedule
              </button>
            </div>
          </div>

          {/* Macro Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Today's Macros</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <MacroRing macro={mockMacros.calories} size={100} />
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-900">Calories</div>
                  <div className="text-xs text-gray-500">{mockMacros.calories.percentage}% complete</div>
                </div>
              </div>
              <div className="text-center">
                <MacroRing macro={mockMacros.protein} size={100} />
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-900">Protein</div>
                  <div className="text-xs text-gray-500">{mockMacros.protein.percentage}% complete</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Carbs</span>
                <span className="font-medium">{mockMacros.carbs.current}g / {mockMacros.carbs.target}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mockMacros.carbs.percentage}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Fat</span>
                <span className="font-medium">{mockMacros.fat.current}g / {mockMacros.fat.target}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mockMacros.fat.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">This Week</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Macro adherence</span>
                </div>
                <span className="font-medium text-green-600">94%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Weight trend</span>
                </div>
                <span className="font-medium text-gray-900">-0.8 lbs</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-700">Streak</span>
                </div>
                <span className="font-medium text-orange-600">7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 