import { createTRPCRouter, publicProcedure } from '../trpc'

export const demoRouter = createTRPCRouter({
  // Get demo profile for unauthenticated users
  getProfile: publicProcedure.query(async () => {
    return {
      id: 'demo-user',
      full_name: 'Demo User',
      email: 'demo@jacksnacks.com',
      target_calories: 2200,
      target_protein: 150,
      target_carbs: 275,
      target_fat: 73,
      primary_goal: 'maintain',
      activity_level: 'moderately_active',
      onboarding_completed: true,
    }
  }),

  // Get demo dashboard stats
  getDashboardStats: publicProcedure.query(async () => {
    return {
      currentStreak: 7,
      longestStreak: 12,
      totalMealsLogged: 84,
      macrosHitThisWeek: 5,
    }
  }),

  // Get demo today's nutrition
  getTodayNutrition: publicProcedure.query(async () => {
    return {
      calories: 1650,
      protein: 125,
      carbs: 180,
      fat: 58,
      logs: []
    }
  }),

  // Get demo week overview
  getWeekOverview: publicProcedure.query(async () => {
    return [
      { day: 'Sun', date: '2024-01-07', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
      { day: 'Mon', date: '2024-01-08', calories: 2180, protein: 145, carbs: 270, fat: 68, completed: true },
      { day: 'Tue', date: '2024-01-09', calories: 2240, protein: 155, carbs: 280, fat: 71, completed: true },
      { day: 'Wed', date: '2024-01-10', calories: 1650, protein: 125, carbs: 180, fat: 58, completed: false },
      { day: 'Thu', date: '2024-01-11', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
      { day: 'Fri', date: '2024-01-12', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
      { day: 'Sat', date: '2024-01-13', calories: 0, protein: 0, carbs: 0, fat: 0, completed: false },
    ]
  }),

  // Get demo upcoming delivery
  getUpcomingDelivery: publicProcedure.query(async () => {
    return {
      date: 'Friday',
      time: '8:00 AM - 12:00 PM',
      meals: 12,
      courier: 'FreshDirect',
      tracking: 'FD123456789',
      estimatedArrival: 'this Friday'
    }
  }),
}) 