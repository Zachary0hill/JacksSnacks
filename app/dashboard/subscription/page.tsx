'use client'

import { useState } from 'react'
import { 
  CreditCard, 
  Truck, 
  Calendar, 
  Check, 
  Star,
  MapPin,
  Clock,
  Package
} from 'lucide-react'

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium')

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 89,
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
      price: 139,
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
      price: 199,
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
        <p className="text-gray-600 mt-2">
          Manage your meal prep subscription and delivery preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan & Billing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Premium Plan</h3>
                  <p className="text-gray-600">12 meals per week</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">$139</p>
                  <p className="text-gray-600 text-sm">per week</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Next delivery</p>
                <p className="font-medium">Monday, Dec 18</p>
              </div>
              <div>
                <p className="text-gray-600">Billing cycle</p>
                <p className="font-medium">Weekly</p>
              </div>
            </div>
          </div>

          {/* Plan Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Plan</h2>
            
            <div className="grid gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <span className="absolute -top-2 left-4 bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">/week</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {plan.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPlan === plan.id && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Update Plan
            </button>
          </div>

          {/* Delivery Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Delivery Address</h3>
                  <p className="text-gray-600">123 Main Street, San Francisco, CA 94102</p>
                  <button className="text-green-600 text-sm hover:text-green-700 mt-1">
                    Change address
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Delivery Schedule</h3>
                  <p className="text-gray-600">Mondays between 8 AM - 6 PM</p>
                  <button className="text-green-600 text-sm hover:text-green-700 mt-1">
                    Change schedule
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Special Instructions</h3>
                  <p className="text-gray-600">Leave at front door, ring doorbell</p>
                  <button className="text-green-600 text-sm hover:text-green-700 mt-1">
                    Update instructions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Billing Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-gray-600 text-sm">Expires 12/25</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Next charge</span>
                  <span className="font-medium">$139.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">Dec 18, 2023</span>
                </div>
              </div>
              
              <button className="w-full text-green-600 text-sm hover:text-green-700 mt-4">
                Update payment method
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-gray-700 hover:text-green-600 py-2">
                Skip next delivery
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-green-600 py-2">
                Pause subscription
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-green-600 py-2">
                Gift a subscription
              </button>
              <hr className="my-2" />
              <button className="w-full text-left text-sm text-red-600 hover:text-red-700 py-2">
                Cancel subscription
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Our support team is here to help with any questions about your subscription.
            </p>
            <button className="w-full bg-white text-green-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 