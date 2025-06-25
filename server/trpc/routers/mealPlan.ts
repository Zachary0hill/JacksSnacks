import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const mealPlanRouter = createTRPCRouter({
  // Get current week's meal plan
  getCurrentWeek: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay()) // Start of week (Sunday)

    const { data: mealPlan, error } = await ctx.supabase
      .from('meal_plans')
      .select(`
        *,
        grocery_lists (*)
      `)
      .eq('owner', ctx.user.id)
      .eq('week_start', weekStart.toISOString().split('T')[0])
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Error fetching meal plan:', error)
      return null
    }

    return mealPlan || null
  }),

  // Get meal plan by week
  getByWeek: protectedProcedure
    .input(z.object({
      weekStart: z.string(), // ISO date string
    }))
    .query(async ({ ctx, input }) => {
      const { data: mealPlan, error } = await ctx.supabase
        .from('meal_plans')
        .select(`
          *,
          grocery_lists (*)
        `)
        .eq('owner', ctx.user.id)
        .eq('week_start', input.weekStart)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching meal plan:', error)
        return null
      }

      return mealPlan || null
    }),

  // Create new meal plan
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        weekStart: z.string(),
        days: z.array(z.any()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('meal_plans')
        .insert({
          owner: ctx.user.id,
          title: input.title,
          week_start: input.weekStart,
          days: input.days,
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to create meal plan: ${error.message}`)
      }

      return data
    }),

  // Update meal plan
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        days: z.array(z.any()).optional(),
        totalCalories: z.number().optional(),
        totalProtein: z.number().optional(),
        totalCarbs: z.number().optional(),
        totalFat: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input
      
      const { data, error } = await ctx.supabase
        .from('meal_plans')
        .update({
          ...updates,
          total_calories: updates.totalCalories,
          total_protein: updates.totalProtein,
          total_carbs: updates.totalCarbs,
          total_fat: updates.totalFat,
        })
        .eq('id', id)
        .eq('owner', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update meal plan: ${error.message}`)
      }

      return data
    }),

  // Get upcoming meals for dashboard
  getUpcomingMeals: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())

    const { data: mealPlan } = await ctx.supabase
      .from('meal_plans')
      .select('days')
      .eq('owner', ctx.user.id)
      .eq('week_start', weekStart.toISOString().split('T')[0])
      .single()

    if (!mealPlan || !mealPlan.days) {
      return []
    }

    // Extract today's and upcoming meals
    const todayIndex = today.getDay()
    const days = mealPlan.days as any[]
    const upcomingMeals = []

    for (let i = todayIndex; i < Math.min(days.length, todayIndex + 3); i++) {
      if (days[i] && days[i].meals) {
        upcomingMeals.push(...days[i].meals)
      }
    }

    return upcomingMeals.slice(0, 5) // Return max 5 upcoming meals
  }),
}) 