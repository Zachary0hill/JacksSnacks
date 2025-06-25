import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const recipeRouter = createTRPCRouter({
  // Get public recipes and user's own recipes
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { data: recipes, error } = await ctx.supabase
      .from('recipes')
      .select('*')
      .or(`visibility.eq.public,owner.eq.${ctx.user.id}`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching recipes:', error)
      return []
    }

    return recipes || []
  }),

  // Get featured recipes for dashboard
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    // Return mock data for now since we don't have public recipes yet
    return [
      {
        id: '1',
        title: 'Honey Garlic Salmon',
        description: 'Wild-caught salmon with roasted vegetables',
        image_url: null,
        macros: { calories: 520, protein: 35, carbs: 25, fat: 28 },
        tags: ['High Protein', 'Omega-3'],
        difficulty: 'medium',
        prep_time: 15,
        cook_time: 20,
      },
      {
        id: '2', 
        title: 'Mediterranean Chicken',
        description: 'Herb-crusted chicken with quinoa tabbouleh',
        image_url: null,
        macros: { calories: 480, protein: 40, carbs: 35, fat: 18 },
        tags: ['Lean Protein', 'Fresh Herbs'],
        difficulty: 'easy',
        prep_time: 10,
        cook_time: 25,
      },
      {
        id: '3',
        title: 'Thai Beef Bowl', 
        description: 'Spicy beef with jasmine rice and veggies',
        image_url: null,
        macros: { calories: 550, protein: 32, carbs: 45, fat: 22 },
        tags: ['Bold Flavors', 'Satisfying'],
        difficulty: 'medium',
        prep_time: 20,
        cook_time: 15,
      }
    ]
  }),

  // Get recipe by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data: recipe, error } = await ctx.supabase
        .from('recipes')
        .select('*')
        .eq('id', input.id)
        .or(`visibility.eq.public,owner.eq.${ctx.user.id}`)
        .single()

      if (error) {
        console.error('Error fetching recipe:', error)
        return null
      }

      return recipe
    }),

  // Create new recipe
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        prepTime: z.number(),
        cookTime: z.number(),
        servings: z.number(),
        difficulty: z.enum(['easy', 'medium', 'hard']),
        cuisineType: z.string(),
        ingredients: z.array(z.any()),
        steps: z.array(z.string()),
        macros: z.object({
          calories: z.number(),
          protein: z.number(),
          carbs: z.number(),
          fat: z.number(),
        }),
        tags: z.array(z.string()),
        visibility: z.enum(['private', 'public']).default('private'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('recipes')
        .insert({
          owner: ctx.user.id,
          title: input.title,
          description: input.description,
          image_url: input.imageUrl,
          prep_time: input.prepTime,
          cook_time: input.cookTime,
          servings: input.servings,
          difficulty: input.difficulty,
          cuisine_type: input.cuisineType,
          ingredients: input.ingredients,
          steps: input.steps,
          macros: input.macros,
          tags: input.tags,
          visibility: input.visibility,
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to create recipe: ${error.message}`)
      }

      return data
    }),

  // Update recipe
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        prepTime: z.number().optional(),
        cookTime: z.number().optional(),
        servings: z.number().optional(),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
        cuisineType: z.string().optional(),
        ingredients: z.array(z.any()).optional(),
        steps: z.array(z.string()).optional(),
        macros: z.object({
          calories: z.number(),
          protein: z.number(),
          carbs: z.number(),
          fat: z.number(),
        }).optional(),
        tags: z.array(z.string()).optional(),
        visibility: z.enum(['private', 'public']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input
      
      const { data, error } = await ctx.supabase
        .from('recipes')
        .update({
          ...updates,
          image_url: updates.imageUrl,
          prep_time: updates.prepTime,
          cook_time: updates.cookTime,
          cuisine_type: updates.cuisineType,
        })
        .eq('id', id)
        .eq('owner', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update recipe: ${error.message}`)
      }

      return data
    }),

  // Delete recipe
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('recipes')
        .delete()
        .eq('id', input.id)
        .eq('owner', ctx.user.id)

      if (error) {
        throw new Error(`Failed to delete recipe: ${error.message}`)
      }

      return { success: true }
    }),
}) 