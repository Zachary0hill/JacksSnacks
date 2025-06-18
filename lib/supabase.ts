import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Types for our database schema
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          email: string
          age: number | null
          gender: 'male' | 'female' | null
          height_feet: number | null
          height_inches: number | null
          weight: number | null
          activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active' | null
          primary_goal: 'lose' | 'maintain' | 'gain' | null
          dietary_restrictions: string[]
          meal_prep_frequency: 'daily' | 'weekly' | 'biweekly'
          target_calories: number | null
          target_protein: number | null
          target_carbs: number | null
          target_fat: number | null
          plan_tier: 'free' | 'starter' | 'pro'
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          email: string
          age?: number | null
          gender?: 'male' | 'female' | null
          height_feet?: number | null
          height_inches?: number | null
          weight?: number | null
          activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active' | null
          primary_goal?: 'lose' | 'maintain' | 'gain' | null
          dietary_restrictions?: string[]
          meal_prep_frequency?: 'daily' | 'weekly' | 'biweekly'
          target_calories?: number | null
          target_protein?: number | null
          target_carbs?: number | null
          target_fat?: number | null
          plan_tier?: 'free' | 'starter' | 'pro'
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string
          age?: number | null
          gender?: 'male' | 'female' | null
          height_feet?: number | null
          height_inches?: number | null
          weight?: number | null
          activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active' | null
          primary_goal?: 'lose' | 'maintain' | 'gain' | null
          dietary_restrictions?: string[]
          meal_prep_frequency?: 'daily' | 'weekly' | 'biweekly'
          target_calories?: number | null
          target_protein?: number | null
          target_carbs?: number | null
          target_fat?: number | null
          plan_tier?: 'free' | 'starter' | 'pro'
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          owner: string
          title: string
          description: string | null
          image_url: string | null
          prep_time: number
          cook_time: number
          servings: number
          difficulty: 'easy' | 'medium' | 'hard'
          cuisine_type: string
          ingredients: any
          steps: string[]
          macros: any
          tags: string[]
          visibility: 'private' | 'public'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner: string
          title: string
          description?: string | null
          image_url?: string | null
          prep_time?: number
          cook_time?: number
          servings?: number
          difficulty?: 'easy' | 'medium' | 'hard'
          cuisine_type: string
          ingredients?: any
          steps?: string[]
          macros?: any
          tags?: string[]
          visibility?: 'private' | 'public'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner?: string
          title?: string
          description?: string | null
          image_url?: string | null
          prep_time?: number
          cook_time?: number
          servings?: number
          difficulty?: 'easy' | 'medium' | 'hard'
          cuisine_type?: string
          ingredients?: any
          steps?: string[]
          macros?: any
          tags?: string[]
          visibility?: 'private' | 'public'
          created_at?: string
          updated_at?: string
        }
      }
      meal_plans: {
        Row: {
          id: string
          owner: string
          title: string
          week_start: string
          days: any
          total_calories: number
          total_protein: number
          total_carbs: number
          total_fat: number
          grocery_list_generated: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner: string
          title: string
          week_start: string
          days?: any
          total_calories?: number
          total_protein?: number
          total_carbs?: number
          total_fat?: number
          grocery_list_generated?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner?: string
          title?: string
          week_start?: string
          days?: any
          total_calories?: number
          total_protein?: number
          total_carbs?: number
          total_fat?: number
          grocery_list_generated?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      grocery_lists: {
        Row: {
          id: string
          owner: string
          meal_plan_id: string
          title: string
          items: any
          total_estimated_cost: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner: string
          meal_plan_id: string
          title: string
          items?: any
          total_estimated_cost?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner?: string
          meal_plan_id?: string
          title?: string
          items?: any
          total_estimated_cost?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Create a browser client
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// Create a server client
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
} 