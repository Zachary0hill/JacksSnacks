import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export const subscriptionRouter = createTRPCRouter({
  // Get current user's subscription
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const { data: subscription, error } = await ctx.supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', ctx.user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // Not found error
      console.error('Error fetching subscription:', error)
      throw new Error('Failed to fetch subscription')
    }

    return subscription
  }),

  // Get available plans
  getPlans: protectedProcedure.query(async () => {
    // In a real app, you'd fetch this from Stripe or your database
    return [
      {
        id: 'basic',
        name: 'Basic Plan',
        price: 8999, // in cents
        interval: 'week',
        meals: 8,
        features: [
          '8 meals per week',
          'Classic recipes',
          'Basic nutrition tracking',
          'Email support'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Plan',
        price: 13999, // in cents
        interval: 'week',
        meals: 12,
        features: [
          '12 meals per week',
          'Premium & classic recipes',
          'Advanced nutrition tracking',
          'Dietary customization',
          'Priority support'
        ],
        popular: true
      },
      {
        id: 'family',
        name: 'Family Plan',
        price: 19999, // in cents
        interval: 'week',
        meals: 18,
        features: [
          '18 meals per week',
          'All recipe collections',
          'Family-sized portions',
          'Multiple dietary profiles',
          'Dedicated support',
          'Free delivery'
        ]
      }
    ]
  }),

  // Create checkout session
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get the plan details (in a real app, you'd fetch from your database)
      const plans = {
        basic: { priceId: process.env.STRIPE_BASIC_PRICE_ID!, name: 'Basic Plan' },
        premium: { priceId: process.env.STRIPE_PREMIUM_PRICE_ID!, name: 'Premium Plan' },
        family: { priceId: process.env.STRIPE_FAMILY_PRICE_ID!, name: 'Family Plan' },
      }

      const plan = plans[input.planId as keyof typeof plans]
      if (!plan) {
        throw new Error('Invalid plan ID')
      }

      try {
        const session = await stripe.checkout.sessions.create({
          customer_email: ctx.user.email,
          line_items: [
            {
              price: plan.priceId,
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          metadata: {
            userId: ctx.user.id,
            planId: input.planId,
          },
        })

        return { sessionId: session.id, url: session.url }
      } catch (error) {
        console.error('Stripe error:', error)
        throw new Error('Failed to create checkout session')
      }
    }),

  // Update subscription
  updateSubscription: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get current subscription
      const { data: currentSub } = await ctx.supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', ctx.user.id)
        .single()

      if (!currentSub?.stripe_subscription_id) {
        throw new Error('No active subscription found')
      }

      // Get plan details
      const plans = {
        basic: { priceId: process.env.STRIPE_BASIC_PRICE_ID! },
        premium: { priceId: process.env.STRIPE_PREMIUM_PRICE_ID! },
        family: { priceId: process.env.STRIPE_FAMILY_PRICE_ID! },
      }

      const plan = plans[input.planId as keyof typeof plans]
      if (!plan) {
        throw new Error('Invalid plan ID')
      }

      try {
        // Update subscription in Stripe
        const subscription = await stripe.subscriptions.retrieve(currentSub.stripe_subscription_id)
        
        await stripe.subscriptions.update(currentSub.stripe_subscription_id, {
          items: [{
            id: subscription.items.data[0].id,
            price: plan.priceId,
          }],
          proration_behavior: 'create_prorations',
        })

        // Update in database
        const { data: updatedSub, error } = await ctx.supabase
          .from('user_subscriptions')
          .update({
            plan_tier: input.planId,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', ctx.user.id)
          .select()
          .single()

        if (error) {
          throw new Error('Failed to update subscription in database')
        }

        return updatedSub
      } catch (error) {
        console.error('Subscription update error:', error)
        throw new Error('Failed to update subscription')
      }
    }),

  // Cancel subscription
  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const { data: currentSub } = await ctx.supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', ctx.user.id)
      .single()

    if (!currentSub?.stripe_subscription_id) {
      throw new Error('No active subscription found')
    }

    try {
      // Cancel in Stripe (at period end)
      await stripe.subscriptions.update(currentSub.stripe_subscription_id, {
        cancel_at_period_end: true,
      })

      // Update in database
      const { data: updatedSub, error } = await ctx.supabase
        .from('user_subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error('Failed to update subscription status')
      }

      return updatedSub
    } catch (error) {
      console.error('Subscription cancellation error:', error)
      throw new Error('Failed to cancel subscription')
    }
  }),

  // Pause subscription
  pauseSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const { data: currentSub } = await ctx.supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', ctx.user.id)
      .single()

    if (!currentSub?.stripe_subscription_id) {
      throw new Error('No active subscription found')
    }

    try {
      // Pause in Stripe
      await stripe.subscriptions.update(currentSub.stripe_subscription_id, {
        pause_collection: {
          behavior: 'keep_as_draft',
        },
      })

      // Update in database
      const { data: updatedSub, error } = await ctx.supabase
        .from('user_subscriptions')
        .update({
          status: 'paused',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error('Failed to update subscription status')
      }

      return updatedSub
    } catch (error) {
      console.error('Subscription pause error:', error)
      throw new Error('Failed to pause subscription')
    }
  }),

  // Resume subscription
  resumeSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const { data: currentSub } = await ctx.supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', ctx.user.id)
      .single()

    if (!currentSub?.stripe_subscription_id) {
      throw new Error('No subscription found')
    }

    try {
      // Resume in Stripe
      await stripe.subscriptions.update(currentSub.stripe_subscription_id, {
        pause_collection: '',
      })

      // Update in database
      const { data: updatedSub, error } = await ctx.supabase
        .from('user_subscriptions')
        .update({
          status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error('Failed to update subscription status')
      }

      return updatedSub
    } catch (error) {
      console.error('Subscription resume error:', error)
      throw new Error('Failed to resume subscription')
    }
  }),

  // Get billing history
  getBillingHistory: protectedProcedure.query(async ({ ctx }) => {
    const { data: subscription } = await ctx.supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', ctx.user.id)
      .single()

    if (!subscription?.stripe_customer_id) {
      return []
    }

    try {
      const invoices = await stripe.invoices.list({
        customer: subscription.stripe_customer_id,
        limit: 12,
      })

      return invoices.data.map(invoice => ({
        id: invoice.id,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        date: new Date(invoice.created * 1000).toISOString(),
        status: invoice.status,
        invoice_pdf: invoice.invoice_pdf,
        description: invoice.lines.data[0]?.description || 'Subscription',
      }))
    } catch (error) {
      console.error('Error fetching billing history:', error)
      return []
    }
  }),
}) 