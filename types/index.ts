import { PLAN_TIERS, DIETARY_RESTRICTIONS, CUISINE_TYPES, MEAL_TYPES, DIFFICULTY_LEVELS } from '@/lib/constants'
import React from 'react'

// User profile types
export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string
  age: number
  gender: 'male' | 'female'
  height_feet: number
  height_inches: number
  weight: number
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
  primary_goal: 'lose' | 'maintain' | 'gain'
  dietary_restrictions: (keyof typeof DIETARY_RESTRICTIONS)[]
  meal_prep_frequency: 'daily' | 'weekly' | 'biweekly'
  target_calories: number
  target_protein: number
  target_carbs: number
  target_fat: number
  plan_tier: keyof typeof PLAN_TIERS
  created_at: string
  updated_at: string
}

// Recipe types
export interface Recipe {
  id: string
  owner: string
  title: string
  description: string | null
  image_url: string | null
  prep_time: number // minutes
  cook_time: number // minutes
  servings: number
  difficulty: keyof typeof DIFFICULTY_LEVELS
  cuisine_type: typeof CUISINE_TYPES[number]
  ingredients: RecipeIngredient[]
  steps: string[]
  macros: MacroNutrition
  tags: string[]
  visibility: 'private' | 'public'
  created_at: string
  updated_at: string
}

export interface RecipeIngredient {
  id: string
  name: string
  quantity: number
  unit: string
  notes?: string
  grocery_section?: string
}

export interface MacroNutrition {
  calories: number
  protein: number // grams
  carbs: number // grams
  fat: number // grams
  fiber?: number // grams
  sugar?: number // grams
  sodium?: number // mg
}

// Meal plan types
export interface MealPlan {
  id: string
  owner: string
  title: string
  week_start: string // ISO date string
  days: MealPlanDay[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  grocery_list_generated: boolean
  created_at: string
  updated_at: string
}

export interface MealPlanDay {
  date: string // ISO date string
  meals: MealPlanMeal[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
}

export interface MealPlanMeal {
  id: string
  meal_type: keyof typeof MEAL_TYPES
  recipe_id: string
  recipe?: Recipe // populated when needed
  servings: number
  calories: number
  protein: number
  carbs: number
  fat: number
  scheduled_time?: string // HH:MM format
}

// Grocery list types
export interface GroceryList {
  id: string
  owner: string
  meal_plan_id: string
  title: string
  items: GroceryItem[]
  total_estimated_cost: number
  completed: boolean
  created_at: string
  updated_at: string
}

export interface GroceryItem {
  id: string
  name: string
  quantity: number
  unit: string
  estimated_cost: number
  category: string
  in_pantry: boolean
  purchased: boolean
  notes?: string
}

// Pantry tracking
export interface PantryItem {
  id: string
  owner: string
  name: string
  quantity: number
  unit: string
  expiry_date?: string
  category: string
  last_updated: string
}

// Subscription and billing
export interface UserSubscription {
  id: string
  user_id: string
  plan_tier: keyof typeof PLAN_TIERS
  status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  current_period_start: string
  current_period_end: string  
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
  updated_at: string
}

// Analytics and tracking
export interface NutritionLog {
  id: string
  owner: string
  date: string
  meal_type: keyof typeof MEAL_TYPES
  calories: number
  protein: number
  carbs: number
  fat: number
  recipe_id?: string
  custom_food_name?: string
  created_at: string
}

export interface WeightLog {
  id: string
  owner: string
  date: string
  weight: number
  body_fat_percentage?: number
  muscle_mass?: number
  notes?: string
  created_at: string
}

// Onboarding types
export interface OnboardingData {
  step: number
  completed: boolean
  basic_info: {
    full_name: string
    age: number
    gender: 'male' | 'female'
    height_feet: number
    height_inches: number
    weight: number
  }
  goals: {
    primary_goal: 'lose' | 'maintain' | 'gain'
    target_weight?: number
    timeline?: string
  }  
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
  dietary_restrictions: (keyof typeof DIETARY_RESTRICTIONS)[]
  meal_preferences: {
    meal_prep_frequency: 'daily' | 'weekly' | 'biweekly'
    preferred_cuisines: typeof CUISINE_TYPES[number][]
    cooking_experience: 'beginner' | 'intermediate' | 'advanced'
    time_available: number // minutes per day
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface SignupForm {
  email: string
  password: string
  full_name: string
}

export interface RecipeForm {
  title: string
  description: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: keyof typeof DIFFICULTY_LEVELS
  cuisine_type: typeof CUISINE_TYPES[number]
  ingredients: RecipeIngredient[]
  steps: string[]
  tags: string[]
  visibility: 'private' | 'public'
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// Client state types (for Zustand)
export interface AppState {
  user: UserProfile | null
  currentMealPlan: MealPlan | null
  selectedRecipes: Recipe[]
  groceryList: GroceryList | null
  isOnboarding: boolean
  onboardingData: OnboardingData | null
}

// UI Component prop types
export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

// Drag and drop types for meal planning
export interface DragItem {
  id: string
  type: 'recipe' | 'meal'
  data: Recipe | MealPlanMeal
}

export interface DropTarget {
  date: string
  meal_type: keyof typeof MEAL_TYPES
  position: number
}

// Search and filter types
export interface RecipeFilters {
  cuisine_types: typeof CUISINE_TYPES[number][]
  dietary_restrictions: (keyof typeof DIETARY_RESTRICTIONS)[]
  difficulty_levels: (keyof typeof DIFFICULTY_LEVELS)[]
  max_prep_time: number
  max_cook_time: number
  min_protein: number
  max_calories: number
  tags: string[]
}

export interface SearchParams {
  query: string
  filters: RecipeFilters
  sort_by: 'relevance' | 'newest' | 'oldest' | 'prep_time' | 'calories' | 'protein'
  sort_order: 'asc' | 'desc'
} 