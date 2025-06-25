import { createTRPCRouter } from './trpc'
import { profileRouter } from './routers/profile'
import { mealPlanRouter } from './routers/mealPlan'
import { recipeRouter } from './routers/recipe'
import { nutritionRouter } from './routers/nutrition'
import { demoRouter } from './routers/demo'
import { subscriptionRouter } from './routers/subscription'

export const appRouter = createTRPCRouter({
  profile: profileRouter,
  mealPlan: mealPlanRouter,
  recipe: recipeRouter,
  nutrition: nutritionRouter,
  subscription: subscriptionRouter,
  demo: demoRouter,
})

export type AppRouter = typeof appRouter 