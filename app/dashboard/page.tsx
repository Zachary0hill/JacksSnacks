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
  Activity,
  Heart,
  Star,
  ChevronLeft,
  Sparkles,
  ChefHat,
  Plus,
  ArrowRight
} from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const [currentMealIndex, setCurrentMealIndex] = useState(0)
  
  // Demo data for immediate functionality (will be replaced with real data once auth is set up)
  const profile = {
    full_name: 'Demo User',
    target_calories: 2200,
    target_protein: 150,
    target_carbs: 275,
    target_fat: 73,
  }

  const dashboardStats = {
    currentStreak: 7,
    longestStreak: 12,
    totalMealsLogged: 84,
    macrosHitThisWeek: 5,
  }

  const todayNutrition = {
    calories: 1650,
    protein: 125,
    carbs: 180,
    fat: 58,
  }

  const weekNutrition = [
    { day: 'Sun', date: '2024-01-07', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
    { day: 'Mon', date: '2024-01-08', calories: 2180, protein: 145, carbs: 270, fat: 68, completed: true },
    { day: 'Tue', date: '2024-01-09', calories: 2240, protein: 155, carbs: 280, fat: 71, completed: true },
    { day: 'Wed', date: '2024-01-10', calories: 1650, protein: 125, carbs: 180, fat: 58, completed: false },
    { day: 'Thu', date: '2024-01-11', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
    { day: 'Fri', date: '2024-01-12', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
    { day: 'Sat', date: '2024-01-13', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
  ]

  const featuredRecipes = [
    {
      id: '1',
      title: 'Honey Garlic Salmon',
      description: 'Wild-caught salmon with roasted vegetables',
      image_url: null,
      macros: { calories: 520 },
      tags: ['High Protein', 'Omega-3'],
    },
    {
      id: '2', 
      title: 'Mediterranean Chicken',
      description: 'Herb-crusted chicken with quinoa tabbouleh',
      image_url: null,
      macros: { calories: 480 },
      tags: ['Lean Protein', 'Fresh Herbs'],
    },
    {
      id: '3',
      title: 'Thai Beef Bowl', 
      description: 'Spicy beef with jasmine rice and veggies',
      image_url: null,
      macros: { calories: 550 },
      tags: ['Bold Flavors', 'Satisfying'],
    }
  ]

  const upcomingDelivery = {
    date: 'Friday',
    time: '8:00 AM - 12:00 PM',
    meals: 12,
    courier: 'FreshDirect',
    tracking: 'FD123456789',
    estimatedArrival: 'this Friday'
  }

  // Calculate macro percentages based on targets
  const macros = {
    calories: {
      current: todayNutrition.calories,
      target: profile.target_calories,
      percentage: Math.round((todayNutrition.calories / profile.target_calories) * 100)
    },
    protein: {
      current: todayNutrition.protein,
      target: profile.target_protein,
      percentage: Math.round((todayNutrition.protein / profile.target_protein) * 100)
    },
    carbs: {
      current: todayNutrition.carbs,
      target: profile.target_carbs,
      percentage: Math.round((todayNutrition.carbs / profile.target_carbs) * 100)
    },
    fat: {
      current: todayNutrition.fat,
      target: profile.target_fat,
      percentage: Math.round((todayNutrition.fat / profile.target_fat) * 100)
    }
  }

  // Use featured recipes as upcoming meals for now
  const mealsToShow = featuredRecipes.map(recipe => ({
    id: recipe.id,
    name: recipe.title,
    image: recipe.image_url || '/api/placeholder/300/200',
    description: recipe.description,
    calories: recipe.macros?.calories || 0,
    tags: recipe.tags || []
  }))

  // Dynamic motivational messages based on user behavior
  const getMotivationalMessage = () => {
    const streak = dashboardStats.currentStreak
    const macrosHit = dashboardStats.macrosHitThisWeek
    
    if (streak >= 7) {
      return `You've hit your macros ${macrosHit} days this week—you're absolutely crushing it!`
    } else if (macrosHit >= 3) {
      return `${macrosHit} days of perfect nutrition this week. Your body is thanking you!`
    } else if (streak >= 3) {
      return `${streak} days strong! Consistency is the key to lasting change.`
    } else {
      return `Every healthy choice matters. You're building something amazing, one meal at a time!`
    }
  }

  // Dynamic hero message based on time and progress
  const getHeroMessage = () => {
    const hour = new Date().getHours()
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
    const firstName = profile.full_name?.split(' ')[0] || 'there'
    const streak = dashboardStats.currentStreak
    const macrosHit = dashboardStats.macrosHitThisWeek
    
    if (streak >= 7) {
      return `You're absolutely crushing your goals, ${firstName}!`
    } else if (macrosHit >= 4) {
      return `You're fueling your goals perfectly, ${firstName}!`
    } else {
      return `Good ${timeOfDay}, ${firstName}! Ready to fuel greatness?`
    }
  }

  const MacroRing = ({ macro, size = 80 }: { macro: any, size?: number }) => {
    const radius = (size - 16) / 2
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
            stroke="#f1f5f9"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#22c55e"
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold text-gray-900">{macro.current}</span>
          <span className="text-xs text-gray-500">of {macro.target}</span>
        </div>
      </div>
    )
  }

  const nextMeal = () => {
    setCurrentMealIndex((prev) => (prev + 1) % mealsToShow.length)
  }

  const prevMeal = () => {
    setCurrentMealIndex((prev) => (prev - 1 + mealsToShow.length) % mealsToShow.length)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              {getHeroMessage()}
            </h1>
            <p className="text-green-50 mb-6 text-lg font-medium">
              {getMotivationalMessage()}
            </p>
            
            {/* Progress Stats */}
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{dashboardStats.currentStreak}</div>
                <div className="text-green-100 text-sm">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{dashboardStats.totalMealsLogged}</div>
                <div className="text-green-100 text-sm">Meals Logged</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{dashboardStats.macrosHitThisWeek}</div>
                <div className="text-green-100 text-sm">Perfect Days</div>
              </div>
            </div>
          </div>
          
          {/* Achievement Badge */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-2" />
            <div className="font-bold">Nutrition Master</div>
            <div className="text-green-100 text-sm">Keep it up!</div>
          </div>
        </div>
      </div>

      {/* Today's Macros */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Today's Nutrition</h2>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(macros).map(([key, macro]) => (
            <div key={key} className="text-center">
              <MacroRing macro={macro} size={100} />
              <div className="mt-4">
                <div className="font-bold text-gray-900 capitalize">{key}</div>
                <div className="text-sm text-gray-500">
                  {macro.percentage}% of target
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* This Week Overview & Upcoming Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Week Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">This Week</h3>
          <div className="space-y-3">
            {weekNutrition.slice(0, 7).map((day: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${day.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="font-medium text-gray-900">{day.day}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {day.calories > 0 ? `${day.calories} cal` : 'Not logged'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meals */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Featured Recipes</h3>
            <div className="flex space-x-2">
              <button 
                onClick={prevMeal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextMeal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {mealsToShow && mealsToShow.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl mb-4 flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-orange-500" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                {mealsToShow[currentMealIndex]?.name || 'Featured Recipe'}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {mealsToShow[currentMealIndex]?.description || 'Delicious and nutritious'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">
                  {mealsToShow[currentMealIndex]?.calories || 0} calories
                </span>
                <div className="flex space-x-1">
                  {(mealsToShow[currentMealIndex]?.tags || []).slice(0, 2).map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Info */}
      {upcomingDelivery && (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Next Delivery</h3>
                <p className="text-gray-600">
                  {upcomingDelivery.date} • {upcomingDelivery.time}
                </p>
                <p className="text-sm text-gray-500">
                  {upcomingDelivery.meals} meals via {upcomingDelivery.courier}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Tracking</div>
              <div className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                {upcomingDelivery.tracking}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white rounded-2xl p-6 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Log Meal</div>
              <div className="text-sm text-gray-500">Track your nutrition</div>
            </div>
          </div>
        </button>
        
        <button className="bg-white rounded-2xl p-6 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Plan Week</div>
              <div className="text-sm text-gray-500">Create meal plan</div>
            </div>
          </div>
        </button>
        
        <button className="bg-white rounded-2xl p-6 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Browse Recipes</div>
              <div className="text-sm text-gray-500">Find new meals</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
} 