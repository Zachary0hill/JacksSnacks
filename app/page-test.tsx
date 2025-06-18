'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function TestPage() {
  const [connectionStatus, setConnectionStatus] = useState('🔍 Testing...')
  const [details, setDetails] = useState<string[]>([])

  useEffect(() => {
    async function testConnection() {
      const supabase = createClient()
      const newDetails: string[] = []
      
      try {
        // Test environment variables
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (!url || !key) {
          setConnectionStatus('❌ Missing environment variables')
          setDetails(['Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'])
          return
        }
        
        newDetails.push('✅ Environment variables loaded')
        newDetails.push(`📡 URL: ${url}`)
        newDetails.push(`🔑 Key: ${key.substring(0, 20)}...`)
        
        // Test basic connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count(*)')
          .limit(1)
        
        if (error) {
          if (error.code === 'PGRST116') {
            setConnectionStatus('⚠️ Connection OK, but tables not found')
            newDetails.push('Database connected but schema needs setup')
          } else {
            setConnectionStatus('❌ Database error')
            newDetails.push(`Error: ${error.message}`)
          }
        } else {
          setConnectionStatus('✅ Supabase fully connected!')
          newDetails.push('Database and tables accessible')
        }
        
        // Test auth
        const { data: authData, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
          newDetails.push(`⚠️ Auth error: ${authError.message}`)
        } else {
          newDetails.push('✅ Auth service accessible')
        }
        
      } catch (error) {
        setConnectionStatus('❌ Connection failed')
        newDetails.push(`Error: ${error}`)
      }
      
      setDetails(newDetails)
    }
    
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">🧪 Jack's Snacks - Supabase Connection Test</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Connection Status:</h2>
            <p className="text-xl">{connectionStatus}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Details:</h2>
            <ul className="space-y-1">
              {details.map((detail, index) => (
                <li key={index} className="text-sm text-gray-700">{detail}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>1. ✅ Verify environment variables are set</li>
              <li>2. 🗄️ Run database migrations if tables not found</li>
              <li>3. 🔐 Set up Clerk authentication keys</li>
              <li>4. 🚀 Test full application flow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 