'use client'

import { useState } from 'react'
import { 
  User, 
  CreditCard, 
  Settings, 
  Shield, 
  Bell, 
  Trash2, 
  Edit,
  Save,
  X,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Pause,
  Play
} from 'lucide-react'

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    full_name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    dietary_restrictions: ['vegetarian', 'gluten-free'],
    emergency_contact: 'Jane Johnson - +1 (555) 123-4568'
  })

  const [subscription, setSubscription] = useState({
    plan: 'Premium',
    status: 'active',
    next_billing: '2024-02-15',
    amount: '$29.99/month',
    card_last_four: '4242'
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard },
    { id: 'subscription', name: 'Subscription', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
  ]

  const handleSaveProfile = () => {
    // TODO: Implement save to Supabase
    setIsEditing(false)
    // Show success toast
  }

  const handlePauseSubscription = () => {
    // TODO: Implement subscription pause
    setSubscription(prev => ({ ...prev, status: 'paused' }))
  }

  const handleResumeSubscription = () => {
    // TODO: Implement subscription resume
    setSubscription(prev => ({ ...prev, status: 'active' }))
  }

  const handleCancelSubscription = () => {
    // TODO: Implement subscription cancellation
    if (confirm('Are you sure you want to cancel your subscription? This action cannot be undone.')) {
      setSubscription(prev => ({ ...prev, status: 'cancelled' }))
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and subscription</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-2xl p-6 h-fit shadow-sm">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                  <div className="flex flex-wrap gap-2">
                    {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'low-carb', 'keto'].map((restriction) => (
                      <button
                        key={restriction}
                        onClick={() => {
                          if (!isEditing) return
                          setProfile(prev => ({
                            ...prev,
                            dietary_restrictions: prev.dietary_restrictions.includes(restriction)
                              ? prev.dietary_restrictions.filter(r => r !== restriction)
                              : [...prev.dietary_restrictions, restriction]
                          }))
                        }}
                        disabled={!isEditing}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          profile.dietary_restrictions.includes(restriction)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {restriction}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment & Billing</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Update Card
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• {subscription.card_last_four}</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">Premium Subscription</p>
                        <p className="text-sm text-gray-500">Jan 15, 2024</p>
                      </div>
                      <p className="font-medium text-gray-900">$29.99</p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">Premium Subscription</p>
                        <p className="text-sm text-gray-500">Dec 15, 2023</p>
                      </div>
                      <p className="font-medium text-gray-900">$29.99</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Management</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{subscription.plan} Plan</h3>
                      <p className="text-sm text-gray-500">
                        Status: <span className={`font-medium ${
                          subscription.status === 'active' ? 'text-green-600' : 
                          subscription.status === 'paused' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{subscription.amount}</p>
                      <p className="text-sm text-gray-500">Next billing: {subscription.next_billing}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {subscription.status === 'active' && (
                      <button
                        onClick={handlePauseSubscription}
                        className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                      >
                        <Pause className="h-4 w-4" />
                        <span>Pause Subscription</span>
                      </button>
                    )}
                    
                    {subscription.status === 'paused' && (
                      <button
                        onClick={handleResumeSubscription}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        <span>Resume Subscription</span>
                      </button>
                    )}

                    <button
                      onClick={handleCancelSubscription}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel Subscription</span>
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Options</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4 text-center">
                      <h4 className="font-semibold text-gray-900">Basic</h4>
                      <p className="text-2xl font-bold text-gray-900">$9.99</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                    <div className="border border-green-500 rounded-xl p-4 text-center bg-green-50">
                      <h4 className="font-semibold text-gray-900">Premium</h4>
                      <p className="text-2xl font-bold text-gray-900">$29.99</p>
                      <p className="text-sm text-gray-500">per month</p>
                      <p className="text-xs text-green-600 font-medium">CURRENT</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 text-center">
                      <h4 className="font-semibold text-gray-900">Pro</h4>
                      <p className="text-2xl font-bold text-gray-900">$49.99</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                {[
                  { id: 'meal_reminders', label: 'Meal Selection Reminders', description: 'Get notified when it\'s time to choose your meals' },
                  { id: 'delivery_updates', label: 'Delivery Updates', description: 'Receive updates about your delivery status' },
                  { id: 'subscription_renewals', label: 'Subscription Renewals', description: 'Get notified before your subscription renews' },
                  { id: 'special_offers', label: 'Special Offers', description: 'Receive notifications about deals and promotions' },
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.label}</h3>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Delete Account</h4>
                      <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 