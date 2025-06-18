'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react'
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns'

// Mock recipe data
const mockRecipes = [
  {
    id: '1',
    title: 'Overnight Oats with Berries',
    prep_time: 10,
    cook_time: 0,
    calories: 350,
    protein: 12,
    image_url: '/api/placeholder/300/200'
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    prep_time: 15,
    cook_time: 20,
    calories: 420,
    protein: 35,
    image_url: '/api/placeholder/300/200'
  },
  {
    id: '3',
    title: 'Salmon with Quinoa',
    prep_time: 10,
    cook_time: 25,
    calories: 580,
    protein: 40,
    image_url: '/api/placeholder/300/200'
  },
  {
    id: '4',
    title: 'Vegetable Stir Fry',
    prep_time: 15,
    cook_time: 15,
    calories: 320,
    protein: 12,
    image_url: '/api/placeholder/300/200'
  }
]

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack']
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

type MealPlan = {
  [key: string]: {
    [mealType: string]: {
      id: string
      title: string
      calories: number
    } | null
  }
}

export default function PlannerPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [mealPlan, setMealPlan] = useState<MealPlan>({})
  const [draggedRecipe, setDraggedRecipe] = useState<any>(null)

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1))
  }

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1))
  }

  const handleDragStart = (recipe: any) => {
    setDraggedRecipe(recipe)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, day: Date, mealType: string) => {
    e.preventDefault()
    if (!draggedRecipe) return

    const dayKey = format(day, 'yyyy-MM-dd')
    setMealPlan(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealType]: {
          id: draggedRecipe.id,
          title: draggedRecipe.title,
          calories: draggedRecipe.calories
        }
      }
    }))
    setDraggedRecipe(null)
  }

  const removeMeal = (day: Date, mealType: string) => {
    const dayKey = format(day, 'yyyy-MM-dd')
    setMealPlan(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealType]: null
      }
    }))
  }

  const getDayTotalCalories = (day: Date) => {
    const dayKey = format(day, 'yyyy-MM-dd')
    const dayMeals = mealPlan[dayKey]
    if (!dayMeals) return 0
    
    return Object.values(dayMeals).reduce((total, meal) => {
      return total + (meal?.calories || 0)
    }, 0)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
          <p className="text-gray-600 mt-1">Drag recipes to plan your week</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Recipe</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Save Plan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Recipe Library */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipe Library</h2>
            <div className="space-y-3">
              {mockRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  draggable
                  onDragStart={() => handleDragStart(recipe)}
                  className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 text-sm">{recipe.title}</h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{recipe.prep_time + recipe.cook_time} min</span>
                    <span>{recipe.calories} cal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Week Navigation */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={handlePreviousWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-semibold text-gray-900">
                Week of {format(weekStart, 'MMM d, yyyy')}
              </h2>
              
              <button
                onClick={handleNextWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-8 gap-4">
                {/* Header Row */}
                <div className="font-medium text-gray-600 text-sm"></div>
                {weekDays.map((day) => (
                  <div key={day.toISOString()} className="text-center">
                    <div className="font-medium text-gray-900">
                      {format(day, 'EEE')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(day, 'MMM d')}
                    </div>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      {getDayTotalCalories(day)} cal
                    </div>
                  </div>
                ))}

                {/* Meal Rows */}
                {mealTypes.map((mealType) => (
                  <div key={mealType} className="contents">
                    <div className="font-medium text-gray-700 capitalize py-2">
                      {mealType}
                    </div>
                    {weekDays.map((day) => {
                      const dayKey = format(day, 'yyyy-MM-dd')
                      const meal = mealPlan[dayKey]?.[mealType]
                      
                      return (
                        <div
                          key={`${dayKey}-${mealType}`}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, day, mealType)}
                          className="min-h-[80px] border-2 border-dashed border-gray-200 rounded-lg p-2 hover:border-green-300 transition-colors"
                        >
                          {meal ? (
                            <div className="bg-green-50 border border-green-200 rounded-md p-2 group">
                              <h4 className="text-xs font-medium text-green-800 leading-tight">
                                {meal.title}
                              </h4>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-green-600">
                                  {meal.calories} cal
                                </span>
                                <button
                                  onClick={() => removeMeal(day, mealType)}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                              Drop recipe here
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
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h2>
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day) => {
            const totalCalories = getDayTotalCalories(day)
            const dayKey = format(day, 'yyyy-MM-dd')
            const mealsCount = Object.values(mealPlan[dayKey] || {}).filter(Boolean).length
            
            return (
              <div key={day.toISOString()} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 text-sm">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-bold text-green-600 mt-1">
                  {totalCalories}
                </div>
                <div className="text-xs text-gray-500">
                  {mealsCount} meals
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 