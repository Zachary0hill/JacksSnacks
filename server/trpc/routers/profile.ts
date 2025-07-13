import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const profileRouter = createTRPCRouter({
  // Get current user's profile
  get: protectedProcedure.query(async ({ ctx }) => {
    const { data: profile, error } = await ctx.supabase
      .from('profiles')
      .select('*')
      .eq('id', ctx.user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return profile
  }),

  // Update user profile
  update: protectedProcedure
    .input(
      z.object({
        full_name: z.string().optional(),
        age: z.number().optional(),
        gender: z.enum(['male', 'female']).optional(),
        height_feet: z.number().optional(),
        height_inches: z.number().optional(),
        weight: z.number().optional(),
        activity_level: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']).optional(),
        primary_goal: z.enum(['lose', 'maintain', 'gain']).optional(),
        dietary_restrictions: z.array(z.string()).optional(),
        meal_prep_frequency: z.enum(['daily', 'weekly', 'biweekly']).optional(),
        target_calories: z.number().optional(),
        target_protein: z.number().optional(),
        target_carbs: z.number().optional(),
        target_fat: z.number().optional(),
        onboarding_completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('profiles')
        .update(input)
        .eq('id', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update profile: ${error.message}`)
      }

      return data
    }),

  // Get dashboard stats
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    // Get current streak from nutrition logs
    const { data: recentLogs } = await ctx.supabase
      .from('nutrition_logs')
      .select('date')
      .eq('owner', ctx.user.id)
      .order('date', { ascending: false })
      .limit(30)

    let currentStreak = 0
    if (recentLogs && recentLogs.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      const dates = recentLogs.map(log => log.date).sort()
      
      // Calculate streak (simplified logic)
      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i])
        const expectedDate = new Date()
        expectedDate.setDate(expectedDate.getDate() - i)
        
        if (date.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
          currentStreak++
        } else {
          break
        }
      }
    }

    // Get total meals logged
    const { count: totalMealsLogged } = await ctx.supabase
      .from('nutrition_logs')
      .select('*', { count: 'exact', head: true })
      .eq('owner', ctx.user.id)

    // Get this week's macro adherence
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    
    const { data: thisWeekLogs } = await ctx.supabase
      .from('nutrition_logs')
      .select('date, calories, protein, carbs, fat')
      .eq('owner', ctx.user.id)
      .gte('date', weekStart.toISOString().split('T')[0])

    const macrosHitThisWeek = thisWeekLogs ? 
      new Set(thisWeekLogs.map(log => log.date)).size : 0

    return {
      currentStreak,
      longestStreak: Math.max(currentStreak, 12), // Placeholder
      totalMealsLogged: totalMealsLogged || 0,
      macrosHitThisWeek,
    }
  }),
}) 