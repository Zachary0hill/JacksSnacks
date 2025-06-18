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
  ArrowLeftRight
} from 'lucide-react'

export default function MealPlanPage() {
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<any>(null)
  const [draggedMeal, setDraggedMeal] = useState<any>(null)

  // Mock meal data - would come from Supabase
  const mockMeals = [
    { id: '1', name: 'Chicken Teriyaki Bowl', calories: 520, protein: 35, carbs: 45, fat: 18, cookTime: 25, difficulty: 'Easy' },
    { id: '2', name: 'Salmon Quinoa Salad', calories: 480, protein: 32, carbs: 38, fat: 22, cookTime: 20, difficulty: 'Easy' },
    { id: '3', name: 'Beef Stir Fry', calories: 450, protein: 28, carbs: 35, fat: 20, cookTime: 15, difficulty: 'Medium' },
    { id: '4', name: 'Greek Chicken Bowl', calories: 490, protein: 38, carbs: 42, fat: 16, cookTime: 30, difficulty: 'Easy' },
    { id: '5', name: 'Turkey Meatballs', calories: 410, protein: 30, carbs: 25, fat: 18, cookTime: 35, difficulty: 'Medium' },
    { id: '6', name: 'Veggie Buddha Bowl', calories: 380, protein: 15, carbs: 52, fat: 14, cookTime: 20, difficulty: 'Easy' }
  ]

  // Mock weekly plan - would come from meal_plans table
  const [weeklyPlan, setWeeklyPlan] = useState({
    'Monday': [
      { slot: 'breakfast', meal: mockMeals[0] },
      { slot: 'lunch', meal: mockMeals[1] },
      { slot: 'dinner', meal: mockMeals[2] }
    ],
    'Tuesday': [
      { slot: 'breakfast', meal: mockMeals[3] },
      { slot: 'lunch', meal: mockMeals[4] },
      { slot: 'dinner', meal: mockMeals[5] }
    ],
    'Wednesday': [
      { slot: 'breakfast', meal: null },
      { slot: 'lunch', meal: mockMeals[0] },
      { slot: 'dinner', meal: mockMeals[1] }
    ],
    'Thursday': [
      { slot: 'breakfast', meal: mockMeals[2] },
      { slot: 'lunch', meal: null },
      { slot: 'dinner', meal: mockMeals[3] }
    ],
    'Friday': [
      { slot: 'breakfast', meal: mockMeals[4] },
      { slot: 'lunch', meal: mockMeals[5] },
      { slot: 'dinner', meal: null }
    ],
    'Saturday': [
      { slot: 'breakfast', meal: null },
      { slot: 'lunch', meal: null },
      { slot: 'dinner', meal: mockMeals[0] }
    ],
    'Sunday': [
      { slot: 'breakfast', meal: mockMeals[1] },
      { slot: 'lunch', meal: mockMeals[2] },
      { slot: 'dinner', meal: mockMeals[3] }
    ]
  })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const mealSlots = ['breakfast', 'lunch', 'dinner']

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Meal Plan</h1>
          <p className="text-gray-600 mt-1">
            Drag and drop meals to plan your week
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            Week of Dec 18, 2023
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Auto-Fill Week
          </button>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Week Summary</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{weeklyTotals.meals}</div>
            <div className="text-sm text-gray-600">Meals Planned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(weeklyTotals.calories / 7)}</div>
            <div className="text-sm text-gray-600">Avg Calories/Day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round(weeklyTotals.protein / 7)}g</div>
            <div className="text-sm text-gray-600">Avg Protein/Day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round((weeklyTotals.calories / 7 / targetCalories) * 100)}%</div>
            <div className="text-sm text-gray-600">Target Achievement</div>
          </div>
        </div>
      </div>

      {/* Meal Plan Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 bg-gray-50 font-medium text-gray-900">Time</div>
          {daysOfWeek.map(day => (
            <div key={day} className="p-4 bg-gray-50 font-medium text-gray-900 text-center">
              {day}
              <div className="text-xs text-gray-500 mt-1">
                {calculateDayTotals(weeklyPlan[day as keyof typeof weeklyPlan]).calories} cal
              </div>
            </div>
          ))}
        </div>

        {mealSlots.map(slot => (
          <div key={slot} className="grid grid-cols-8 border-b border-gray-200 min-h-[120px]">
            <div className="p-4 bg-gray-50 flex items-center">
              <div>
                <div className="font-medium text-gray-900 capitalize">{slot}</div>
                <div className="text-xs text-gray-500">
                  {slot === 'breakfast' ? '8:00 AM' : 
                   slot === 'lunch' ? '12:30 PM' : '7:00 PM'}
                </div>
              </div>
            </div>
            
            {daysOfWeek.map(day => {
              const dayMeal = weeklyPlan[day as keyof typeof weeklyPlan].find(m => m.slot === slot)
              const meal = dayMeal?.meal
              
              return (
                <div
                  key={`${day}-${slot}`}
                  className="p-3 border-r border-gray-200 last:border-r-0"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, slot)}
                >
                  {meal ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 h-full relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={() => handleSwapMeal(day, slot, meal)}
                          className="w-6 h-6 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 flex items-center justify-center"
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeMeal(day, slot)}
                          className="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600 flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 text-sm mb-2 pr-12">{meal.name}</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {meal.calories} cal
                        </div>
                        <div>P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g</div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {meal.cookTime}min
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex items-center justify-center text-gray-400 hover:border-green-400 hover:bg-green-50 transition-colors">
                      <Plus className="w-6 h-6" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Available Meals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Meals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMeals.map(meal => (
            <div
              key={meal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, meal)}
              className="border border-gray-200 rounded-lg p-4 cursor-move hover:border-green-400 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <ChefHat className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-gray-900">{meal.name}</h3>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Calories: {meal.calories}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    meal.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    meal.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {meal.difficulty}
                  </span>
                </div>
                <div>Protein: {meal.protein}g • Carbs: {meal.carbs}g • Fat: {meal.fat}g</div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  {meal.cookTime} minutes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Swap {selectedMeal.currentMeal?.name}
              </h3>
              <button
                onClick={() => setShowSwapModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockMeals
                .filter(meal => meal.id !== selectedMeal.currentMeal?.id)
                .map(meal => (
                <button
                  key={meal.id}
                  onClick={() => swapMeal(meal)}
                  className="border border-gray-200 rounded-lg p-4 text-left hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-2">{meal.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Calories: {meal.calories} • Protein: {meal.protein}g</div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meal.cookTime} minutes • {meal.difficulty}
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