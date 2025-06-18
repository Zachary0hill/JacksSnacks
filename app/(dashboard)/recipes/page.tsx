'use client'

import { useState } from 'react'
import { Search, Filter, Clock, Users, Star, Heart, Plus } from 'lucide-react'

// Mock recipe data
const mockRecipes = [
  {
    id: '1',
    title: 'Overnight Oats with Berries',
    description: 'Creamy overnight oats topped with fresh berries and a drizzle of honey',
    prep_time: 10,
    cook_time: 0,
    servings: 2,
    difficulty: 'easy',
    cuisine_type: 'breakfast',
    calories: 350,
    protein: 12,
    carbs: 65,
    fat: 8,
    tags: ['healthy', 'quick', 'make-ahead'],
    image_url: '/api/placeholder/400/300',
    rating: 4.8,
    saved: false
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens with perfectly grilled chicken breast and balsamic vinaigrette',
    prep_time: 15,
    cook_time: 20,
    servings: 4,
    difficulty: 'easy',
    cuisine_type: 'american',
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 22,
    tags: ['protein', 'low-carb', 'gluten-free'],
    image_url: '/api/placeholder/400/300',
    rating: 4.6,
    saved: true
  },
  {
    id: '3',
    title: 'Salmon with Quinoa',
    description: 'Pan-seared salmon served over fluffy quinoa with roasted vegetables',
    prep_time: 10,
    cook_time: 25,
    servings: 2,
    difficulty: 'medium',
    cuisine_type: 'healthy',
    calories: 580,
    protein: 40,
    carbs: 45,
    fat: 28,
    tags: ['omega-3', 'protein', 'whole-grain'],
    image_url: '/api/placeholder/400/300',
    rating: 4.9,
    saved: false
  },
  {
    id: '4',
    title: 'Vegetable Stir Fry',
    description: 'Colorful mix of seasonal vegetables stir-fried with aromatic ginger and garlic',
    prep_time: 15,
    cook_time: 15,
    servings: 3,
    difficulty: 'easy',
    cuisine_type: 'asian',
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 14,
    tags: ['vegetarian', 'quick', 'colorful'],
    image_url: '/api/placeholder/400/300',
    rating: 4.4,
    saved: true
  },
  {
    id: '5',
    title: 'Mediterranean Bowl',
    description: 'Fresh Mediterranean ingredients in a nourishing bowl with tahini dressing',
    prep_time: 20,
    cook_time: 0,
    servings: 2,
    difficulty: 'easy',
    cuisine_type: 'mediterranean',
    calories: 450,
    protein: 18,
    carbs: 52,
    fat: 24,
    tags: ['fresh', 'no-cook', 'mediterranean'],
    image_url: '/api/placeholder/400/300',
    rating: 4.7,
    saved: false
  },
  {
    id: '6',
    title: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, creamy tomato-based sauce with aromatic spices',
    prep_time: 30,
    cook_time: 45,
    servings: 6,
    difficulty: 'hard',
    cuisine_type: 'indian',
    calories: 520,
    protein: 32,
    carbs: 18,
    fat: 35,
    tags: ['spicy', 'comfort-food', 'traditional'],
    image_url: '/api/placeholder/400/300',
    rating: 4.8,
    saved: true
  }
]

const cuisineTypes = ['all', 'american', 'asian', 'mediterranean', 'indian', 'breakfast', 'healthy']
const difficultyLevels = ['all', 'easy', 'medium', 'hard']

export default function RecipesPage() {
  const [recipes, setRecipes] = useState(mockRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const toggleSaveRecipe = (recipeId: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, saved: !recipe.saved }
          : recipe
      )
    )
  }

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine_type === selectedCuisine
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty

    return matchesSearch && matchesCuisine && matchesDifficulty
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recipe Library</h1>
          <p className="text-gray-600 mt-1">Discover and save your favorite recipes</p>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Recipe</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Type
                </label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {difficultyLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Sort by:</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Prep Time</option>
            <option>Calories</option>
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Recipe Image */}
            <div className="relative h-48 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Recipe Image
              </div>
              <button
                onClick={() => toggleSaveRecipe(recipe.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Heart className={`h-4 w-4 ${recipe.saved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Recipe Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{recipe.title}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{recipe.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {recipe.description}
              </p>

              {/* Recipe Stats */}
              <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prep_time + recipe.cook_time} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                  {recipe.difficulty}
                </div>
              </div>

              {/* Macros */}
              <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                <span>{recipe.calories} cal</span>
                <span>P: {recipe.protein}g</span>
                <span>C: {recipe.carbs}g</span>
                <span>F: {recipe.fat}g</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{recipe.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  View Recipe
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Add to Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
} 