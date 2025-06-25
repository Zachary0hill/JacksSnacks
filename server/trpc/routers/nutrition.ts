import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const nutritionRouter = createTRPCRouter({
  // Get today's nutrition
  getToday: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date().toISOString().split('T')[0]
    
    const { data: logs, error } = await ctx.supabase
      .from('nutrition_logs')
      .select('*')
      .eq('owner', ctx.user.id)
      .eq('date', today)

    if (error) {
      console.error('Error fetching nutrition logs:', error)
      return {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        logs: []
      }
    }

    // Calculate totals
    const totals = logs?.reduce(
      (acc, log) => ({
        calories: acc.calories + log.calories,
        protein: acc.protein + log.protein,
        carbs: acc.carbs + log.carbs,
        fat: acc.fat + log.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    ) || { calories: 0, protein: 0, carbs: 0, fat: 0 }

    return {
      ...totals,
      logs: logs || []
    }
  }),

  // Get nutrition for date range
  getRange: protectedProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { data: logs, error } = await ctx.supabase
        .from('nutrition_logs')
        .select('*')
        .eq('owner', ctx.user.id)
        .gte('date', input.startDate)
        .lte('date', input.endDate)
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching nutrition logs:', error)
        return []
      }

      return logs || []
    }),

  // Add nutrition log
  addLog: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
        calories: z.number(),
        protein: z.number(),
        carbs: z.number(),
        fat: z.number(),
        recipeId: z.string().optional(),
        customFoodName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('nutrition_logs')
        .insert({
          owner: ctx.user.id,
          date: input.date,
          meal_type: input.mealType,
          calories: input.calories,
          protein: input.protein,
          carbs: input.carbs,
          fat: input.fat,
          recipe_id: input.recipeId,
          custom_food_name: input.customFoodName,
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to add nutrition log: ${error.message}`)
      }

      return data
    }),

  // Get week overview for dashboard
  getWeekOverview: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const { data: logs } = await ctx.supabase
      .from('nutrition_logs')
      .select('date, calories, protein, carbs, fat')
      .eq('owner', ctx.user.id)
      .gte('date', weekStart.toISOString().split('T')[0])
      .lte('date', weekEnd.toISOString().split('T')[0])

    // Group by date and calculate daily totals
    const dailyTotals = (logs || []).reduce((acc: any, log) => {
      const date = log.date
      if (!acc[date]) {
        acc[date] = { calories: 0, protein: 0, carbs: 0, fat: 0, completed: false }
      }
      acc[date].calories += log.calories
      acc[date].protein += log.protein
      acc[date].carbs += log.carbs
      acc[date].fat += log.fat
      return acc
    }, {})

    // Create week array with proper day names
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weekData = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      const dayData = dailyTotals[dateStr] || { calories: 0, protein: 0, carbs: 0, fat: 0, completed: false }
      
      weekData.push({
        day: weekDays[i],
        date: dateStr,
        ...dayData,
        completed: dayData.calories > 0, // Simple completion logic
      })
    }

    return weekData
  }),
}) 