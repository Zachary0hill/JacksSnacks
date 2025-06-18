export const NUTRITIONAL_CONSTANTS = {
  // Macronutrient calories per gram
  PROTEIN_CALORIES_PER_GRAM: 4,
  CARB_CALORIES_PER_GRAM: 4,
  FAT_CALORIES_PER_GRAM: 9,
  ALCOHOL_CALORIES_PER_GRAM: 7,

  // Activity multipliers for TDEE calculation
  ACTIVITY_MULTIPLIERS: {
    sedentary: 1.2,      // Little to no exercise
    lightly_active: 1.375, // Light exercise 1-3 days/week
    moderately_active: 1.55, // Moderate exercise 3-5 days/week
    very_active: 1.725,   // Heavy exercise 6-7 days/week
    extremely_active: 1.9  // Very heavy exercise, physical job
  },

  // Goal-based calorie adjustments
  GOAL_ADJUSTMENTS: {
    lose: -500,    // 500 calorie deficit for 1lb/week loss
    maintain: 0,   // No adjustment
    gain: 300      // 300 calorie surplus for lean gains
  },

  // Macro distribution presets (as percentages)
  MACRO_PRESETS: {
    balanced: { protein: 25, carbs: 45, fat: 30 },
    high_protein: { protein: 35, carbs: 35, fat: 30 },
    low_carb: { protein: 30, carbs: 20, fat: 50 },
    keto: { protein: 25, carbs: 5, fat: 70 },
    athletic: { protein: 25, carbs: 50, fat: 25 }
  }
} as const

// BMR calculation using Mifflin-St Jeor equation
export function calculateBMR(
  weight: number, // in pounds
  height: number, // in inches
  age: number,
  gender: 'male' | 'female'
): number {
  // Convert to metric
  const weightKg = weight * 0.453592
  const heightCm = height * 2.54
  
  if (gender === 'male') {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
  } else {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161
  }
}

// TDEE calculation
export function calculateTDEE(
  bmr: number,
  activityLevel: keyof typeof NUTRITIONAL_CONSTANTS.ACTIVITY_MULTIPLIERS
): number {
  return Math.round(bmr * NUTRITIONAL_CONSTANTS.ACTIVITY_MULTIPLIERS[activityLevel])
}

// Target calories based on goal
export function calculateTargetCalories(
  tdee: number,
  goal: keyof typeof NUTRITIONAL_CONSTANTS.GOAL_ADJUSTMENTS
): number {
  return Math.round(tdee + NUTRITIONAL_CONSTANTS.GOAL_ADJUSTMENTS[goal])
}

// Macro targets in grams
export function calculateMacroTargets(
  targetCalories: number,
  preset: keyof typeof NUTRITIONAL_CONSTANTS.MACRO_PRESETS
) {
  const macros = NUTRITIONAL_CONSTANTS.MACRO_PRESETS[preset]
  
  return {
    protein: Math.round((targetCalories * (macros.protein / 100)) / NUTRITIONAL_CONSTANTS.PROTEIN_CALORIES_PER_GRAM),
    carbs: Math.round((targetCalories * (macros.carbs / 100)) / NUTRITIONAL_CONSTANTS.CARB_CALORIES_PER_GRAM),
    fat: Math.round((targetCalories * (macros.fat / 100)) / NUTRITIONAL_CONSTANTS.FAT_CALORIES_PER_GRAM)
  }
}

// Plan tier definitions for subscription management
export const PLAN_TIERS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    maxRecipes: 10,
    maxMealPlans: 2,
    features: ['Basic meal planning', 'Simple grocery lists', 'Basic recipes'],
    aiFeatures: false,
    visionScanning: false
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 9.99,
    maxRecipes: 100,
    maxMealPlans: 10,
    features: ['Advanced meal planning', 'Smart grocery lists', 'Recipe scaling', 'Nutrition tracking'],
    aiFeatures: true,
    visionScanning: false
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    maxRecipes: -1, // unlimited
    maxMealPlans: -1, // unlimited
    features: ['Everything in Starter', 'AI meal suggestions', 'Vision scanning', 'Advanced analytics', 'Recipe remixing'],
    aiFeatures: true,
    visionScanning: true
  }
} as const

// Dietary restrictions and their exclusions
export const DIETARY_RESTRICTIONS = {
  vegetarian: {
    name: 'Vegetarian',
    excludes: ['meat', 'poultry', 'fish', 'seafood']
  },
  vegan: {
    name: 'Vegan',
    excludes: ['meat', 'poultry', 'fish', 'seafood', 'dairy', 'eggs', 'honey']
  },
  gluten_free: {
    name: 'Gluten-Free',
    excludes: ['wheat', 'barley', 'rye', 'triticale', 'malt']
  },
  dairy_free: {
    name: 'Dairy-Free',
    excludes: ['milk', 'cheese', 'butter', 'cream', 'yogurt']
  },
  nut_free: {
    name: 'Nut-Free',
    excludes: ['almonds', 'walnuts', 'cashews', 'pecans', 'pistachios', 'hazelnuts', 'macadamia']
  },
  keto: {
    name: 'Keto',
    maxCarbsPerDay: 20,
    excludes: ['bread', 'pasta', 'rice', 'potatoes', 'sugar', 'fruit']
  },
  paleo: {
    name: 'Paleo',
    excludes: ['grains', 'legumes', 'dairy', 'processed_foods', 'sugar']
  }
} as const

// Cuisine types for recipe filtering
export const CUISINE_TYPES = [
  'American', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Indian', 
  'Thai', 'Chinese', 'Japanese', 'French', 'Greek', 'Middle Eastern',
  'Latin American', 'African', 'German', 'Korean'
] as const

// Meal types and timing
export const MEAL_TYPES = {
  breakfast: { name: 'Breakfast', timeRange: '6:00-10:00', caloriePercent: 25 },
  lunch: { name: 'Lunch', timeRange: '11:00-14:00', caloriePercent: 35 },
  dinner: { name: 'Dinner', timeRange: '17:00-20:00', caloriePercent: 35 },
  snack: { name: 'Snack', timeRange: 'Anytime', caloriePercent: 5 }
} as const

// Recipe difficulty levels
export const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', prepTime: 15, cookTime: 15, skillLevel: 1 },
  medium: { name: 'Medium', prepTime: 30, cookTime: 30, skillLevel: 2 },
  hard: { name: 'Hard', prepTime: 45, cookTime: 60, skillLevel: 3 }
} as const

// Common ingredient units for conversions
export const INGREDIENT_UNITS = {
  volume: ['cup', 'tablespoon', 'teaspoon', 'fluid ounce', 'milliliter', 'liter'],
  weight: ['pound', 'ounce', 'gram', 'kilogram'],
  count: ['piece', 'slice', 'clove', 'item'],
  custom: ['pinch', 'dash', 'to taste']
} as const

// Grocery store sections for organized shopping
export const GROCERY_SECTIONS = {
  produce: 'Produce',
  meat: 'Meat & Seafood',
  dairy: 'Dairy & Eggs',
  pantry: 'Pantry & Dry Goods',
  frozen: 'Frozen',
  bakery: 'Bakery',
  deli: 'Deli',
  beverages: 'Beverages',
  snacks: 'Snacks',
  health: 'Health & Personal Care',
  household: 'Household Items'
} as const

// Default onboarding flow steps
export const ONBOARDING_STEPS = [
  'welcome',
  'basic_info',
  'goals',
  'activity_level',
  'dietary_restrictions',
  'meal_preferences',
  'complete'
] as const

// Error messages for form validation
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  number: 'Must be a valid number',
  positiveNumber: 'Must be a positive number',
  weight: 'Weight must be between 50 and 500 pounds',
  height: 'Height must be between 48 and 96 inches',
  age: 'Age must be between 13 and 120 years'
} as const 