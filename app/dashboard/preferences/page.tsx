'use client'

import { useState } from 'react'
import { 
  Heart, 
  X, 
  Check, 
  Star, 
  Clock, 
  Users, 
  Flame, 
  Leaf, 
  Fish, 
  Apple,
  ChefHat,
  Filter,
  Search
} from 'lucide-react'

export default function PreferencesPage() {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['vegetarian'])
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(['nuts'])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['italian', 'asian'])
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['meal1', 'meal3'])
  const [activeTab, setActiveTab] = useState('dietary')
  const [searchTerm, setSearchTerm] = useState('')

  const dietaryPreferences = [
    { id: 'vegetarian', name: 'Vegetarian', icon: Leaf, color: 'green' },
    { id: 'vegan', name: 'Vegan', icon: Leaf, color: 'green' },
    { id: 'pescatarian', name: 'Pescatarian', icon: Fish, color: 'blue' },
    { id: 'keto', name: 'Keto', icon: Flame, color: 'orange' },
    { id: 'paleo', name: 'Paleo', icon: Apple, color: 'red' },
    { id: 'gluten-free', name: 'Gluten-Free', icon: Apple, color: 'yellow' },
    { id: 'dairy-free', name: 'Dairy-Free', icon: Apple, color: 'purple' },
    { id: 'low-carb', name: 'Low Carb', icon: Flame, color: 'orange' },
    { id: 'high-protein', name: 'High Protein', icon: Flame, color: 'red' },
  ]

  const allergies = [
    'Nuts', 'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Soy', 'Gluten', 'Sesame'
  ]

  const cuisineTypes = [
    { id: 'italian', name: 'Italian', flag: '🇮🇹' },
    { id: 'asian', name: 'Asian', flag: '🥢' },
    { id: 'mexican', name: 'Mexican', flag: '🇲🇽' },
    { id: 'mediterranean', name: 'Mediterranean', flag: '🫒' },
    { id: 'american', name: 'American', flag: '🇺🇸' },
    { id: 'indian', name: 'Indian', flag: '🇮🇳' },
    { id: 'thai', name: 'Thai', flag: '🇹🇭' },
    { id: 'french', name: 'French', flag: '🇫🇷' },
  ]

  const weeklyMeals = [
    {
      id: 'meal1',
      name: 'Honey Garlic Salmon',
      description: 'Wild-caught salmon with roasted vegetables and quinoa',
      image: '/api/placeholder/300/200',
      calories: 520,
      protein: 35,
      carbs: 45,
      fat: 18,
      cookTime: 25,
      difficulty: 'Easy',
      tags: ['High Protein', 'Omega-3', 'Gluten-Free'],
      cuisine: 'American',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 'meal2',
      name: 'Mediterranean Chicken Bowl',
      description: 'Herb-crusted chicken with quinoa tabbouleh and tzatziki',
      image: '/api/placeholder/300/200',
      calories: 480,
      protein: 42,
      carbs: 38,
      fat: 16,
      cookTime: 30,
      difficulty: 'Medium',
      tags: ['Mediterranean', 'High Protein', 'Fresh Herbs'],
      cuisine: 'Mediterranean',
      rating: 4.6,
      reviews: 187
    },
    {
      id: 'meal3',
      name: 'Thai Beef Stir Fry',
      description: 'Tender beef with jasmine rice and crisp vegetables',
      image: '/api/placeholder/300/200',
      calories: 550,
      protein: 38,
      carbs: 52,
      fat: 20,
      cookTime: 20,
      difficulty: 'Easy',
      tags: ['Bold Flavors', 'Satisfying', 'Quick Cook'],
      cuisine: 'Thai',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 'meal4',
      name: 'Vegetarian Pasta Primavera',
      description: 'Fresh seasonal vegetables with whole wheat pasta',
      image: '/api/placeholder/300/200',
      calories: 420,
      protein: 18,
      carbs: 68,
      fat: 12,
      cookTime: 25,
      difficulty: 'Easy',
      tags: ['Vegetarian', 'Seasonal', 'Colorful'],
      cuisine: 'Italian',
      rating: 4.5,
      reviews: 201
    },
    {
      id: 'meal5',
      name: 'Keto Zucchini Lasagna',
      description: 'Layered zucchini with ricotta and meat sauce',
      image: '/api/placeholder/300/200',
      calories: 380,
      protein: 28,
      carbs: 12,
      fat: 26,
      cookTime: 45,
      difficulty: 'Hard',
      tags: ['Keto', 'Low Carb', 'Comfort Food'],
      cuisine: 'Italian',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 'meal6',
      name: 'Teriyaki Tofu Bowl',
      description: 'Crispy tofu with steamed rice and vegetables',
      image: '/api/placeholder/300/200',
      calories: 390,
      protein: 22,
      carbs: 48,
      fat: 14,
      cookTime: 20,
      difficulty: 'Easy',
      tags: ['Vegan', 'Plant-Based', 'Asian Fusion'],
      cuisine: 'Asian',
      rating: 4.4,
      reviews: 145
    }
  ]

  const filteredMeals = weeklyMeals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDiet = selectedDiets.length === 0 || 
                       selectedDiets.some(diet => 
                         meal.tags.some(tag => tag.toLowerCase().includes(diet.replace('-', ' ')))
                       )
    
    const matchesCuisine = selectedCuisines.length === 0 ||
                          selectedCuisines.some(cuisine => 
                            meal.cuisine.toLowerCase() === cuisine
                          )
    
    return matchesSearch && matchesDiet && matchesCuisine
  })

  const toggleDiet = (dietId: string) => {
    setSelectedDiets(prev => 
      prev.includes(dietId) 
        ? prev.filter(id => id !== dietId)
        : [...prev, dietId]
    )
  }

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    )
  }

  const toggleCuisine = (cuisineId: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineId) 
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    )
  }

  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    )
  }

  const tabs = [
    { id: 'dietary', name: 'Dietary Preferences', icon: Apple },
    { id: 'allergies', name: 'Allergies & Restrictions', icon: X },
    { id: 'cuisines', name: 'Favorite Cuisines', icon: ChefHat },
    { id: 'meals', name: 'Weekly Meal Selection', icon: Heart },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Preferences</h1>
        <p className="text-gray-600">Customize your meal preferences and select your weekly meals</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        {/* Dietary Preferences Tab */}
        {activeTab === 'dietary' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">What are your dietary preferences?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {dietaryPreferences.map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => toggleDiet(diet.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedDiets.includes(diet.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${diet.color}-100`}>
                      <diet.icon className={`h-5 w-5 text-${diet.color}-600`} />
                    </div>
                    <span className="font-medium text-gray-900">{diet.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Allergies Tab */}
        {activeTab === 'allergies' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Do you have any allergies or restrictions?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleAllergy(allergy)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedAllergies.includes(allergy)
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">{allergy}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cuisines Tab */}
        {activeTab === 'cuisines' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">What cuisines do you enjoy?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine.id}
                  onClick={() => toggleCuisine(cuisine.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCuisines.includes(cuisine.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{cuisine.flag}</div>
                    <span className="font-medium text-gray-900">{cuisine.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Select Your Weekly Meals</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search meals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {selectedMeals.length} of 12 meals selected
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
                    selectedMeals.includes(meal.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleMeal(meal.id)}
                >
                  <div className="relative">
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedMeals.includes(meal.id)
                          ? 'border-green-500 bg-green-500'
                          : 'border-white bg-white'
                      }`}>
                        {selectedMeals.includes(meal.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-white text-xs">{meal.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{meal.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{meal.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {meal.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Flame className="h-4 w-4" />
                        <span>{meal.calories} cal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{meal.cookTime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Your preferences will be saved automatically
            </div>
            <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 