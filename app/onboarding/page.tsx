'use client'

import { useState } from 'react'
import { 
  User, 
  Target, 
  Activity, 
  AlertTriangle, 
  Utensils,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    heightFeet: 5,
    heightInches: 8,
    weight: 165,
    
    // Goals & Activity
    dietGoal: 'maintain', // maintain, lose, gain
    activityLevel: 'moderate', // sedentary, light, moderate, active, very_active
    
    // Preferences
    mealsPerDay: 3,
    allergies: [] as string[],
    dietaryRestrictions: [] as string[]
  })

  const totalSteps = 5

  const dietGoals = [
    { id: 'lose', label: 'Lose Weight', description: 'Create a caloric deficit to lose fat' },
    { id: 'maintain', label: 'Maintain Weight', description: 'Keep current weight and build healthy habits' },
    { id: 'gain', label: 'Gain Weight', description: 'Build muscle and increase overall mass' }
  ]

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light', label: 'Lightly Active', description: '1-3 days per week' },
    { id: 'moderate', label: 'Moderately Active', description: '3-5 days per week' },
    { id: 'active', label: 'Very Active', description: '6-7 days per week' },
    { id: 'very_active', label: 'Extremely Active', description: '2x per day or intense training' }
  ]

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat/Gluten', 
    'Fish', 'Shellfish', 'Sesame', 'Corn'
  ]

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 
    'Low Carb', 'High Protein', 'Dairy Free', 'Gluten Free'
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    // Here you would save to Supabase profiles table
    console.log('Saving profile:', formData)
    
    // Calculate target macros based on the data
    const bmr = calculateBMR(formData)
    const tdee = calculateTDEE(bmr, formData.activityLevel)
    const targets = calculateMacroTargets(tdee, formData.dietGoal)
    
    console.log('Calculated targets:', { bmr, tdee, targets })
    
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  const calculateBMR = (data: typeof formData) => {
    // Mifflin-St Jeor Equation (assuming male for simplicity)
    const heightCm = (data.heightFeet * 12 + data.heightInches) * 2.54
    const weightKg = data.weight * 0.453592
    return 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5 // Assuming age 25
  }

  const calculateTDEE = (bmr: number, activityLevel: string) => {
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    return bmr * (multipliers[activityLevel] || 1.55)
  }

  const calculateMacroTargets = (tdee: number, goal: string) => {
    let calories = tdee
    if (goal === 'lose') calories *= 0.8
    if (goal === 'gain') calories *= 1.2
    
    return {
      calories: Math.round(calories),
      protein: Math.round(calories * 0.3 / 4), // 30% protein
      carbs: Math.round(calories * 0.4 / 4),   // 40% carbs  
      fat: Math.round(calories * 0.3 / 9)      // 30% fat
    }
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item]
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Let's get to know you</h2>
              <p className="text-gray-600 mt-2">We'll use this to create your personalized meal plan</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.heightFeet}
                      onChange={(e) => setFormData({...formData, heightFeet: Number(e.target.value)})}
                      className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {[4,5,6,7].map(ft => (
                        <option key={ft} value={ft}>{ft} ft</option>
                      ))}
                    </select>
                    <select
                      value={formData.heightInches}
                      onChange={(e) => setFormData({...formData, heightInches: Number(e.target.value)})}
                      className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {Array.from({length: 12}, (_, i) => (
                        <option key={i} value={i}>{i} in</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    min="80"
                    max="400"
                  />
                </div>
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">What's your goal?</h2>
              <p className="text-gray-600 mt-2">This helps us calculate your daily calorie needs</p>
            </div>
            
            <div className="space-y-3">
              {dietGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setFormData({...formData, dietGoal: goal.id})}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    formData.dietGoal === goal.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{goal.label}</h3>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                    {formData.dietGoal === goal.id && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">How active are you?</h2>
              <p className="text-gray-600 mt-2">This affects your daily calorie requirements</p>
            </div>
            
            <div className="space-y-3">
              {activityLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setFormData({...formData, activityLevel: level.id})}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    formData.activityLevel === level.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{level.label}</h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                    {formData.activityLevel === level.id && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Any allergies or restrictions?</h2>
              <p className="text-gray-600 mt-2">We'll make sure to avoid these in your meal plans</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Food Allergies</h3>
              <div className="grid grid-cols-2 gap-2">
                {commonAllergies.map((allergy) => (
                  <button
                    key={allergy}
                    onClick={() => setFormData({
                      ...formData, 
                      allergies: toggleArrayItem(formData.allergies, allergy)
                    })}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      formData.allergies.includes(allergy)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Dietary Preferences</h3>
              <div className="grid grid-cols-2 gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({
                      ...formData, 
                      dietaryRestrictions: toggleArrayItem(formData.dietaryRestrictions, option)
                    })}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      formData.dietaryRestrictions.includes(option)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Final preferences</h2>
              <p className="text-gray-600 mt-2">How many meals would you like per day?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Meals per day
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[2, 3, 4].map((meals) => (
                    <button
                      key={meals}
                      onClick={() => setFormData({...formData, mealsPerDay: meals})}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        formData.mealsPerDay === meals
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl font-bold text-gray-900">{meals}</div>
                      <div className="text-sm text-gray-600">
                        {meals === 2 ? 'Lunch + Dinner' : 
                         meals === 3 ? 'Breakfast + Lunch + Dinner' :
                         'Breakfast + Lunch + Snack + Dinner'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Your Profile Summary</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Height:</strong> {formData.heightFeet}'{formData.heightInches}"</p>
                  <p><strong>Weight:</strong> {formData.weight} lbs</p>
                  <p><strong>Goal:</strong> {dietGoals.find(g => g.id === formData.dietGoal)?.label}</p>
                  <p><strong>Activity:</strong> {activityLevels.find(a => a.id === formData.activityLevel)?.label}</p>
                  <p><strong>Meals/day:</strong> {formData.mealsPerDay}</p>
                  {formData.allergies.length > 0 && (
                    <p><strong>Allergies:</strong> {formData.allergies.join(', ')}</p>
                  )}
                  {formData.dietaryRestrictions.length > 0 && (
                    <p><strong>Diet:</strong> {formData.dietaryRestrictions.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleFinish}
              disabled={!formData.name}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Setup
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStep === 1 && !formData.name}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 