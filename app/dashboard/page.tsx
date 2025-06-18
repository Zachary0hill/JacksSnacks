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
    targetFat: 73,
    currentStreak: 7,
    longestStreak: 12,
    totalMealsLogged: 84,
    macrosHitThisWeek: 5
  }

  const mockWeekMeals = [
    { day: 'Mon', meals: ['Chicken Teriyaki Bowl', 'Greek Salad', 'Beef Stir Fry'], calories: 2180, completed: true },
    { day: 'Tue', meals: ['Salmon Quinoa', 'Turkey Wrap', 'Pasta Primavera'], calories: 2240, completed: true },
    { day: 'Wed', meals: ['Veggie Buddha Bowl', 'Chicken Caesar', 'Pork Tenderloin'], calories: 2190, completed: false },
    { day: 'Thu', meals: ['Breakfast Burrito', 'Tuna Poke', 'Lamb Curry'], calories: 2260, completed: false },
    { day: 'Fri', meals: ['Protein Pancakes', 'Chicken Tikka', 'Beef Tacos'], calories: 2200, completed: false },
    { day: 'Sat', meals: ['Avocado Toast', 'Shrimp Salad', 'Steak Dinner'], calories: 2220, completed: false },
    { day: 'Sun', meals: ['Egg Benedict', 'Fish & Chips', 'Chicken Parmesan'], calories: 2300, completed: false }
  ]

  const mockMacros = {
    calories: { current: 1650, target: 2200, percentage: 75 },
    protein: { current: 125, target: 150, percentage: 83 },
    carbs: { current: 180, target: 275, percentage: 65 },
    fat: { current: 58, target: 73, percentage: 79 }
  }

  const mockDelivery = {
    date: 'Friday',
    time: '8:00 AM - 12:00 PM',
    meals: 12,
    courier: 'FreshDirect',
    tracking: 'FD123456789',
    estimatedArrival: 'this Friday'
  }

  const upcomingMeals = [
    { 
      id: 1, 
      name: 'Honey Garlic Salmon', 
      image: '/api/placeholder/300/200',
      description: 'Wild-caught salmon with roasted vegetables',
      calories: 520,
      tags: ['High Protein', 'Omega-3']
    },
    { 
      id: 2, 
      name: 'Mediterranean Chicken', 
      image: '/api/placeholder/300/200',
      description: 'Herb-crusted chicken with quinoa tabbouleh',
      calories: 480,
      tags: ['Lean Protein', 'Fresh Herbs']
    },
    { 
      id: 3, 
      name: 'Thai Beef Bowl', 
      image: '/api/placeholder/300/200',
      description: 'Spicy beef with jasmine rice and veggies',
      calories: 550,
      tags: ['Bold Flavors', 'Satisfying']
    },
    { 
      id: 4, 
      name: 'Veggie Power Bowl', 
      image: '/api/placeholder/300/200',
      description: 'Quinoa, roasted vegetables, and tahini',
      calories: 420,
      tags: ['Plant-Based', 'Nutrient Dense']
    },
    { 
      id: 5, 
      name: 'BBQ Pulled Pork', 
      image: '/api/placeholder/300/200',
      description: 'Slow-cooked pork with sweet potato mash',
      calories: 580,
      tags: ['Comfort Food', 'Protein Rich']
    }
  ]

  // Dynamic motivational messages based on user behavior
  const getMotivationalMessage = () => {
    if (mockProfile.currentStreak >= 7) {
      return `You've hit your macros ${mockProfile.macrosHitThisWeek} days this week—you're absolutely crushing it!`
    } else if (mockProfile.macrosHitThisWeek >= 3) {
      return `${mockProfile.macrosHitThisWeek} days of perfect nutrition this week. Your body is thanking you!`
    } else if (mockProfile.currentStreak >= 3) {
      return `${mockProfile.currentStreak} days strong! Consistency is the key to lasting change.`
    } else {
      return `Every healthy choice matters. You're building something amazing, one meal at a time!`
    }
  }

  // Dynamic hero message based on time and progress
  const getHeroMessage = () => {
    const hour = new Date().getHours()
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
    
    if (mockProfile.currentStreak >= 7) {
      return `You're absolutely crushing your goals, ${mockProfile.name.split(' ')[0]}!`
    } else if (mockProfile.macrosHitThisWeek >= 4) {
      return `You're fueling your goals perfectly, ${mockProfile.name.split(' ')[0]}!`
    } else {
      return `Good ${timeOfDay}, ${mockProfile.name.split(' ')[0]}! Ready to fuel greatness?`
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
    setCurrentMealIndex((prev) => (prev + 1) % upcomingMeals.length)
  }

  const prevMeal = () => {
    setCurrentMealIndex((prev) => (prev - 1 + upcomingMeals.length) % upcomingMeals.length)
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
              You've logged {mockProfile.totalMealsLogged} meals and built a {mockProfile.currentStreak}-day streak
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">{mockProfile.currentStreak} day streak</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">{mockProfile.macrosHitThisWeek}/7 days on track</span>
              </div>
            </div>
          </div>
          
          <div className="text-right ml-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
              <span className="text-4xl">
                {mockProfile.currentStreak >= 7 ? '🔥' : 
                 mockProfile.macrosHitThisWeek >= 4 ? '💪' : '⚡'}
              </span>
            </div>
            <div className="text-sm text-green-100">
              Personal best: {mockProfile.longestStreak} days
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfile.macrosHitThisWeek}/7</div>
          <div className="text-sm text-gray-600 mb-2">Days hitting macros</div>
          <div className="text-xs text-green-600 font-medium">+2 from last week</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{mockProfile.currentStreak}</div>
          <div className="text-sm text-gray-600 mb-2">Day streak</div>
          <div className="text-xs text-orange-500 font-medium">
            {mockProfile.currentStreak === mockProfile.longestStreak ? 'Personal best!' : `${mockProfile.longestStreak - mockProfile.currentStreak} from your best`}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">94%</div>
          <div className="text-sm text-gray-600 mb-2">Weekly consistency</div>
          <div className="text-xs text-blue-500 font-medium">Excellent progress!</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-2xl">📦</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{mockDelivery.meals}</div>
          <div className="text-sm text-gray-600 mb-2">Meals coming {mockDelivery.estimatedArrival}</div>
          <div className="text-xs text-purple-500 font-medium">Fresh & ready!</div>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-white">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {mockDelivery.meals} fresh meals are on the way {mockDelivery.estimatedArrival}! 🎉
              </h3>
              <p className="text-gray-600">
                Your delicious, perfectly portioned meals will arrive between {mockDelivery.time}. 
                We can't wait for you to try them!
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition-colors text-sm font-medium">
              Track Your Box
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-200 transition-colors text-sm font-medium">
              Adjust Delivery
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Week at a Glance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Week at a Glance</h2>
              <button className="text-green-500 hover:text-green-600 text-sm font-medium flex items-center gap-1">
                Plan Next Week <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {mockWeekMeals.map((day, index) => (
                <div key={day.day} className={`flex items-center justify-between p-4 rounded-2xl ${
                  index === 0 ? 'bg-green-50 border border-green-100' : 
                  day.completed ? 'bg-blue-50 border border-blue-100' :
                  'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-sm font-bold ${
                        index === 0 ? 'text-green-600' : 
                        day.completed ? 'text-blue-600' :
                        'text-gray-700'
                      }`}>
                        {day.day}
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-green-500 font-medium">Today</div>
                      )}
                      {day.completed && index !== 0 && (
                        <div className="text-xs text-blue-500 font-medium">✓ Done</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-1">
                        {day.meals.map((meal, mealIndex) => (
                          <span
                            key={mealIndex}
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              day.completed ? 'bg-blue-100 text-blue-700' :
                              index === 0 ? 'bg-green-100 text-green-700' :
                              'bg-white text-gray-700 border border-gray-200'
                            }`}
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{day.calories} cal</div>
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
          {/* Today's Macros */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">You're doing amazing today! 🌟</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <MacroRing macro={mockMacros.calories} size={80} />
                <div className="mt-3">
                  <div className="text-sm font-bold text-gray-900">Calories</div>
                  <div className="text-xs text-green-500 font-medium">{mockMacros.calories.percentage}% there!</div>
                </div>
              </div>
              <div className="text-center">
                <MacroRing macro={mockMacros.protein} size={80} />
                <div className="mt-3">
                  <div className="text-sm font-bold text-gray-900">Protein</div>
                  <div className="text-xs text-green-500 font-medium">{mockMacros.protein.percentage}% crushed!</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Carbs</span>
                  <span className="font-bold text-gray-900">{mockMacros.carbs.current}g / {mockMacros.carbs.target}g</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${mockMacros.carbs.percentage}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Fat</span>
                  <span className="font-bold text-gray-900">{mockMacros.fat.current}g / {mockMacros.fat.target}g</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${mockMacros.fat.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Meals Carousel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Can't wait for you to try these! 😋</h2>
            <p className="text-gray-600 text-sm">Your upcoming meals are going to be incredible</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevMeal}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextMeal}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentMealIndex * 25}%)` }}
          >
            {upcomingMeals.map((meal, index) => (
              <div key={meal.id} className="w-1/4 flex-shrink-0 px-2">
                <div className="bg-gray-100 rounded-2xl aspect-video mb-3 flex items-center justify-center text-gray-400">
                  <ChefHat className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{meal.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{meal.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">{meal.calories} cal</span>
                  <div className="flex gap-1">
                    {meal.tags.slice(0, 1).map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 mb-1">
              {getMotivationalMessage()}
            </p>
            <p className="text-sm text-gray-600">
              Keep up the incredible work - your future self will thank you! 💜
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 