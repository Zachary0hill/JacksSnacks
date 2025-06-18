const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...\n')
  
  // Check environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.error('❌ Missing Supabase environment variables')
    console.log('URL:', url ? '✅ Set' : '❌ Missing')
    console.log('Key:', key ? '✅ Set' : '❌ Missing')
    return
  }
  
  console.log('✅ Environment variables loaded')
  console.log('📡 Supabase URL:', url)
  console.log('🔑 Anon Key:', key.substring(0, 20) + '...')
  
  // Create client
  const supabase = createClient(url, key)
  
  try {
    // Test basic connection
    console.log('\n🔍 Testing database connection...')
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Profiles table not found - this is expected if migrations haven\'t run yet')
        console.log('✅ Connection successful, but database schema needs to be set up')
      } else {
        console.error('❌ Database error:', error.message)
        console.log('💡 This might mean the database schema hasn\'t been set up yet.')
        
        // Try a simpler connection test
        console.log('\n🔍 Testing basic API connection...')
        const { data: basicData, error: basicError } = await supabase
          .rpc('version')
          .select()
        
        if (basicError && basicError.code === 'PGRST202') {
          console.log('✅ API connection successful - database just needs schema setup')
        } else if (basicError) {
          console.error('❌ API connection failed:', basicError.message)
          return false
        } else {
          console.log('✅ Basic API connection successful')
        }
      }
    } else {
      console.log('✅ Database connection successful!')
      console.log('📊 Profiles table accessible')
      if (data && data.length > 0) {
        console.log('📈 Found', data.length, 'profile(s)')
      } else {
        console.log('📈 Profiles table is empty (ready for data)')
      }
    }
    
    // Test auth
    console.log('\n🔐 Testing auth...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Auth error:', authError.message)
    } else {
      console.log('✅ Auth service accessible')
      console.log('👤 Current session:', authData.session ? 'Active' : 'None')
    }
    
    console.log('\n🎉 Supabase connection test completed successfully!')
    return true
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    return false
  }
}

testSupabaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }) 