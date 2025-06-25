import { createServerSupabaseClient } from '@/lib/supabase'
import { type NextRequest } from 'next/server'

export async function createTRPCContext(opts: { req?: NextRequest }) {
  const supabase = createServerSupabaseClient()
  
  // Get the authenticated user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return {
    supabase,
    user: error ? null : user,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>> 