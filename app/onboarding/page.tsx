'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { ChefHat, ArrowRight, ArrowLeft } from 'lucide-react'
import { 
  calculateBMR, 
  calculateTDEE, 
  calculateTargetCalories, 
  calculateMacroTargets,
  ONBOARDING_STEPS,
  DIETARY_RESTRICTIONS,
  VALIDATION_MESSAGES 
} from '@/lib/constants'
import { createClient } from '@/lib/supabase'
import type { OnboardingData } from '@/types'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Let\'s get you started' },
  { id: 'basic_info', title: 'Basic Info', description: 'Tell us about yourself' },
  { id: 'goals', title: 'Goals', description: 'What do you want to achieve?' },
  { id: 'activity_level', title: 'Activity', description: 'How active are you?' },
  { id: 'dietary_restrictions', title: 'Diet', description: 'Any dietary preferences?' },
  { id: 'meal_preferences', title: 'Preferences', description: 'Meal planning preferences' },
  { id: 'complete', title: 'Complete', description: 'All set!' }
]

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<OnboardingData>({
    step: 0,
    completed: false,
    basic_info: {
      full_name: user?.fullName || '',
      age: 25,
      gender: 'male',
      height_feet: 5,
      height_inches: 8,
      weight: 150
    },
    goals: {
      primary_goal: 'maintain'
    },
    activity_level: 'moderately_active',
    dietary_restrictions: [],
    meal_preferences: {
      meal_prep_frequency: 'weekly',
      preferred_cuisines: ['American', 'Italian'],
      cooking_experience: 'intermediate',
      time_available: 30
    }
  })

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (steps[currentStep].id) {
      case 'basic_info':
        if (!formData.basic_info.full_name) {
          newErrors.full_name = VALIDATION_MESSAGES.required
        }
        if (formData.basic_info.age < 13 || formData.basic_info.age > 120) {
          newErrors.age = VALIDATION_MESSAGES.age
        }
        if (formData.basic_info.weight < 50 || formData.basic_info.weight > 500) {
          newErrors.weight = VALIDATION_MESSAGES.weight
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    if (!user?.id) return
    
    setLoading(true)
    try {
      // Calculate nutritional targets
      const heightInches = (formData.basic_info.height_feet * 12) + formData.basic_info.height_inches
      const bmr = calculateBMR(
        formData.basic_info.weight,
        heightInches,
        formData.basic_info.age,
        formData.basic_info.gender
      )
      const tdee = calculateTDEE(bmr, formData.activity_level)
      const targetCalories = calculateTargetCalories(tdee, formData.goals.primary_goal)
      const macros = calculateMacroTargets(targetCalories, 'balanced')

      const supabase = createClient()
      
      // Update or insert profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.basic_info.full_name,
          email: user.emailAddresses[0]?.emailAddress || '',
          age: formData.basic_info.age,
          gender: formData.basic_info.gender,
          height_feet: formData.basic_info.height_feet,
          height_inches: formData.basic_info.height_inches,
          weight: formData.basic_info.weight,
          activity_level: formData.activity_level,
          primary_goal: formData.goals.primary_goal,
          dietary_restrictions: formData.dietary_restrictions,
          meal_prep_frequency: formData.meal_preferences.meal_prep_frequency,
          target_calories: targetCalories,
          target_protein: macros.protein,
          target_carbs: macros.carbs,
          target_fat: macros.fat,
          onboarding_completed: true,
          plan_tier: 'free'
        })

      if (error) throw error

      router.push('/dashboard')
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <ChefHat className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Jack's Snacks!
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Let's set up your profile and calculate your personalized nutrition targets. 
                This will only take a few minutes.
              </p>
            </div>
          </div>
        )

      case 'basic_info':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Help us understand your current situation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.basic_info.full_name}
                  onChange={(e) => setFormData({
                    ...formData,
                    basic_info: { ...formData.basic_info, full_name: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.basic_info.age}
                  onChange={(e) => setFormData({
                    ...formData,
                    basic_info: { ...formData.basic_info, age: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="13"
                  max="120"
                />
                {errors.age && (
                  <p className="text-red-600 text-sm mt-1">{errors.age}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.basic_info.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    basic_info: { ...formData.basic_info, gender: e.target.value as 'male' | 'female' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <div className="flex space-x-2">
                  <select
                    value={formData.basic_info.height_feet}
                    onChange={(e) => setFormData({
                      ...formData,
                      basic_info: { ...formData.basic_info, height_feet: parseInt(e.target.value) }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[3, 4, 5, 6, 7, 8].map(feet => (
                      <option key={feet} value={feet}>{feet} ft</option>
                    ))}
                  </select>
                  <select
                    value={formData.basic_info.height_inches}
                    onChange={(e) => setFormData({
                      ...formData,
                      basic_info: { ...formData.basic_info, height_inches: parseInt(e.target.value) }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inches => (
                      <option key={inches} value={inches}>{inches} in</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Weight (lbs)
                </label>
                <input
                  type="number"
                  value={formData.basic_info.weight}
                  onChange={(e) => setFormData({
                    ...formData,
                    basic_info: { ...formData.basic_info, weight: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="50"
                  max="500"
                  step="0.1"
                />
                {errors.weight && (
                  <p className="text-red-600 text-sm mt-1">{errors.weight}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Goals</h2>
              <p className="text-gray-600">What's your primary fitness goal?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'lose', title: 'Lose Weight', description: 'Create a calorie deficit' },
                { value: 'maintain', title: 'Maintain Weight', description: 'Stay at current weight' },
                { value: 'gain', title: 'Gain Weight', description: 'Build muscle mass' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => setFormData({
                    ...formData,
                    goals: { ...formData.goals, primary_goal: goal.value as any }
                  })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.goals.primary_goal === goal.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </button>
              ))}
            </div>
          </div>
        )

      case 'activity_level':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Activity Level</h2>
              <p className="text-gray-600">How active are you on a typical week?</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'sedentary', title: 'Sedentary', description: 'Little to no exercise' },
                { value: 'lightly_active', title: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
                { value: 'moderately_active', title: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
                { value: 'very_active', title: 'Very Active', description: 'Heavy exercise 6-7 days/week' },
                { value: 'extremely_active', title: 'Extremely Active', description: 'Very heavy exercise, physical job' }
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setFormData({
                    ...formData,
                    activity_level: level.value as any
                  })}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.activity_level === level.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{level.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                </button>
              ))}
            </div>
          </div>
        )

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <ChefHat className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                You're All Set!
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                We've calculated your personalized nutrition targets. 
                Ready to start planning your meals?
              </p>
            </div>
            <button
              onClick={handleComplete}
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Enter Dashboard'}
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold">Jack's Snacks</span>
            </div>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {renderStepContent()}
            
            {/* Navigation */}
            {steps[currentStep].id !== 'welcome' && steps[currentStep].id !== 'complete' && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {steps[currentStep].id === 'welcome' && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 