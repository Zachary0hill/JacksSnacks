'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Plus, 
  RotateCcw, 
  Target, 
  Clock,
  ChefHat,
  Flame,
  X,
  Check,
  ArrowLeftRight,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function MealPlanPage() {
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<any>(null)
  const [draggedMeal, setDraggedMeal] = useState<any>(null)

  // Mock meal data - would come from Supabase
  const mockMeals = [
    { id: '1', name: 'Honey Garlic Salmon', calories: 520, protein: 35, carbs: 45, fat: 18, cookTime: 25, difficulty: 'Easy', image: '🐟' },
    { id: '2', name: 'Mediterranean Chicken', calories: 480, protein: 32, carbs: 38, fat: 22, cookTime: 20, difficulty: 'Easy', image: '🍗' },
    { id: '3', name: 'Thai Beef Bowl', calories: 450, protein: 28, carbs: 35, fat: 20, cookTime: 15, difficulty: 'Medium', image: '🥩' },
    { id: '4', name: 'Veggie Power Bowl', calories: 420, protein: 15, carbs: 52, fat: 14, cookTime: 20, difficulty: 'Easy', image: '🥗' },
    { id: '5', name: 'BBQ Pulled Pork', calories: 580, protein: 30, carbs: 25, fat: 18, cookTime: 35, difficulty: 'Medium', image: '🍖' },
    { id: '6', name: 'Quinoa Buddha Bowl', calories: 380, protein: 18, carbs: 48, fat: 16, cookTime: 15, difficulty: 'Easy', image: '🍲' },
    { id: '7', name: 'Grilled Chicken Caesar', calories: 460, protein: 38, carbs: 28, fat: 22, cookTime: 20, difficulty: 'Easy', image: '🥙' },
    { id: '8', name: 'Teriyaki Tofu Stir-fry', calories: 390, protein: 20, carbs: 42, fat: 18, cookTime: 18, difficulty: 'Easy', image: '🥢' }
  ]

  // Mock weekly plan - would come from meal_plans table
  const [weeklyPlan, setWeeklyPlan] = useState({
    'Mon': [
      { slot: 'breakfast', meal: mockMeals[0] },
      { slot: 'lunch', meal: mockMeals[1] },
      { slot: 'dinner', meal: mockMeals[2] }
    ],
    'Tue': [
      { slot: 'breakfast', meal: mockMeals[3] },
      { slot: 'lunch', meal: mockMeals[4] },
      { slot: 'dinner', meal: mockMeals[5] }
    ],
    'Wed': [
      { slot: 'breakfast', meal: null },
      { slot: 'lunch', meal: mockMeals[0] },
      { slot: 'dinner', meal: mockMeals[1] }
    ],
    'Thu': [
      { slot: 'breakfast', meal: mockMeals[2] },
      { slot: 'lunch', meal: null },
      { slot: 'dinner', meal: mockMeals[3] }
    ],
    'Fri': [
      { slot: 'breakfast', meal: mockMeals[4] },
      { slot: 'lunch', meal: mockMeals[5] },
      { slot: 'dinner', meal: null }
    ],
    'Sat': [
      { slot: 'breakfast', meal: null },
      { slot: 'lunch', meal: null },
      { slot: 'dinner', meal: mockMeals[0] }
    ],
    'Sun': [
      { slot: 'breakfast', meal: mockMeals[1] },
      { slot: 'lunch', meal: mockMeals[2] },
      { slot: 'dinner', meal: mockMeals[3] }
    ]
  })

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const mealSlots = [
    { id: 'breakfast', name: 'Breakfast', time: '8:00 AM', icon: '🌅' },
    { id: 'lunch', name: 'Lunch', time: '12:30 PM', icon: '☀️' },
    { id: 'dinner', name: 'Dinner', time: '7:00 PM', icon: '🌙' }
  ]

  // Calculate daily totals
  const calculateDayTotals = (dayMeals: any[]) => {
    return dayMeals.reduce((totals, slot) => {
      if (slot.meal) {
        return {
          calories: totals.calories + slot.meal.calories,
          protein: totals.protein + slot.meal.protein,
          carbs: totals.carbs + slot.meal.carbs,
          fat: totals.fat + slot.meal.fat
        }
      }
      return totals
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
  }

  // Calculate weekly totals
  const calculateWeeklyTotals = () => {
    const weekTotals = { calories: 0, protein: 0, carbs: 0, fat: 0, meals: 0 }
    
    Object.values(weeklyPlan).forEach(dayMeals => {
      const dayTotals = calculateDayTotals(dayMeals)
      weekTotals.calories += dayTotals.calories
      weekTotals.protein += dayTotals.protein
      weekTotals.carbs += dayTotals.carbs
      weekTotals.fat += dayTotals.fat
      weekTotals.meals += dayMeals.filter(slot => slot.meal).length
    })
    
    return weekTotals
  }

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, meal: any) => {
    setDraggedMeal(meal)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, day: string, slot: string) => {
    e.preventDefault()
    if (draggedMeal) {
      setWeeklyPlan(prev => ({
        ...prev,
        [day]: prev[day as keyof typeof prev].map(mealSlot => 
          mealSlot.slot === slot 
            ? { ...mealSlot, meal: draggedMeal }
            : mealSlot
        )
      }))
      setDraggedMeal(null)
    }
  }

  // Handle meal swap
  const handleSwapMeal = (day: string, slot: string, currentMeal: any) => {
    setSelectedMeal({ day, slot, currentMeal })
    setShowSwapModal(true)
  }

  const swapMeal = (newMeal: any) => {
    if (selectedMeal) {
      setWeeklyPlan(prev => ({
        ...prev,
        [selectedMeal.day]: prev[selectedMeal.day as keyof typeof prev].map(mealSlot => 
          mealSlot.slot === selectedMeal.slot 
            ? { ...mealSlot, meal: newMeal }
            : mealSlot
        )
      }))
    }
    setShowSwapModal(false)
    setSelectedMeal(null)
  }

  const removeMeal = (day: string, slot: string) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: prev[day as keyof typeof prev].map(mealSlot => 
        mealSlot.slot === slot 
          ? { ...mealSlot, meal: null }
          : mealSlot
      )
    }))
  }

  const weeklyTotals = calculateWeeklyTotals()
  const targetCalories = 2200 // Would come from user profile
  const targetProtein = 150

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Meal Plan</h1>
          <p className="text-gray-600 mt-1 text-lg">
            Plan your perfect week of nutrition 🍽️
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm">
            <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              Dec 18 - 24, 2023
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <button className="bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition-colors flex items-center gap-2 font-medium">
            <Zap className="w-4 h-4" />
            Auto-Fill Week
          </button>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl">🍽️</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{weeklyTotals.meals}</div>
          <div className="text-sm text-gray-600 mb-2">Meals Planned</div>
          <div className="text-xs text-green-600 font-medium">
            {Math.round((weeklyTotals.meals / 21) * 100)}% of week
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-2xl">⚡</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{Math.round(weeklyTotals.calories / 7)}</div>
          <div className="text-sm text-gray-600 mb-2">Avg Calories/Day</div>
          <div className="text-xs text-orange-500 font-medium">
            {Math.round((weeklyTotals.calories / 7 / targetCalories) * 100)}% of target
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-2xl">💪</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{Math.round(weeklyTotals.protein / 7)}g</div>
          <div className="text-sm text-gray-600 mb-2">Avg Protein/Day</div>
          <div className="text-xs text-blue-500 font-medium">
            {Math.round((weeklyTotals.protein / 7 / targetProtein) * 100)}% of target
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{Math.round((weeklyTotals.calories / 7 / targetCalories) * 100)}%</div>
          <div className="text-sm text-gray-600 mb-2">Goal Progress</div>
          <div className="text-xs text-purple-500 font-medium">
            {Math.round((weeklyTotals.calories / 7 / targetCalories) * 100) >= 90 ? 'Excellent!' : 'Keep going!'}
          </div>
        </div>
      </div>

      {/* Meal Plan Calendar */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Weekly Plan</h2>
          <p className="text-gray-600 text-sm mt-1">Drag meals from below to plan your week</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-4 font-medium text-gray-500 text-sm">MEAL</div>
              {daysOfWeek.map(day => (
                <div key={day} className="p-4 text-center">
                  <div className="font-bold text-gray-900">{day}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {calculateDayTotals(weeklyPlan[day as keyof typeof weeklyPlan]).calories} cal
                  </div>
                </div>
              ))}
            </div>

            {/* Meal Slots */}
            {mealSlots.map(slot => (
              <div key={slot.id} className="grid grid-cols-8 border-b border-gray-50 last:border-b-0 min-h-[100px]">
                <div className="p-4 bg-gray-50 flex items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{slot.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{slot.name}</div>
                      <div className="text-xs text-gray-500">{slot.time}</div>
                    </div>
                  </div>
                </div>
                
                {daysOfWeek.map(day => {
                  const dayMeal = weeklyPlan[day as keyof typeof weeklyPlan].find(m => m.slot === slot.id)
                  const meal = dayMeal?.meal
                  
                  return (
                    <div
                      key={`${day}-${slot.id}`}
                      className="p-3 border-r border-gray-50 last:border-r-0 flex items-center"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, day, slot.id)}
                    >
                      {meal ? (
                        <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 relative group hover:shadow-sm transition-all">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={() => handleSwapMeal(day, slot.id, meal)}
                              className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 flex items-center justify-center"
                            >
                              <ArrowLeftRight className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeMeal(day, slot.id)}
                              className="w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{meal.image}</span>
                            <h4 className="font-medium text-gray-900 text-sm pr-12">{meal.name}</h4>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-orange-500" />
                              <span className="font-medium">{meal.calories} cal</span>
                            </div>
                            <div className="text-gray-500">
                              {meal.protein}p • {meal.carbs}c • {meal.fat}f
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-center text-gray-400 hover:border-green-400 hover:bg-green-50 transition-colors min-h-[60px]">
                          <div className="text-center">
                            <Plus className="w-5 h-5 mx-auto mb-1" />
                            <div className="text-xs">Add meal</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Meals */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Available Meals</h2>
            <p className="text-gray-600 text-sm mt-1">Drag these delicious meals into your weekly plan</p>
          </div>
          <button className="text-green-500 hover:text-green-600 text-sm font-medium">
            View All Meals →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMeals.map(meal => (
            <div
              key={meal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, meal)}
              className="border border-gray-200 rounded-2xl p-4 cursor-move hover:border-green-400 hover:bg-green-50 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{meal.image}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{meal.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      meal.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      meal.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {meal.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span className="font-medium">{meal.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{meal.cookTime}min</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {meal.protein}g protein • {meal.carbs}g carbs • {meal.fat}g fat
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Swap {selectedMeal.currentMeal?.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">Choose a replacement meal</p>
              </div>
              <button
                onClick={() => setShowSwapModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockMeals
                .filter(meal => meal.id !== selectedMeal.currentMeal?.id)
                .map(meal => (
                <button
                  key={meal.id}
                  onClick={() => swapMeal(meal)}
                  className="border border-gray-200 rounded-2xl p-4 text-left hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{meal.image}</span>
                    <h4 className="font-medium text-gray-900">{meal.name}</h4>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>{meal.calories} calories • {meal.protein}g protein</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        meal.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        meal.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {meal.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {meal.cookTime} minutes
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 