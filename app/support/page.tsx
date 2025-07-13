'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react'

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I get started with Jack\'s Snacks?',
      answer: 'Getting started is easy! Sign up for an account, complete your profile with dietary preferences and health goals, then choose your subscription plan. You can start selecting meals right away for your first delivery.'
    },
    {
      id: 2,
      category: 'Meal Plans',
      question: 'Can I customize my meal plans?',
      answer: 'Absolutely! You can set dietary restrictions, choose from various cuisine types, and select specific meals from our weekly rotating menu. You can also adjust portion sizes and specify any allergies or dislikes.'
    },
    {
      id: 3,
      category: 'Subscription',
      question: 'How does the subscription work?',
      answer: 'Our subscriptions are flexible and designed around your schedule. You can choose weekly, bi-weekly, or monthly deliveries. You can pause, modify, or cancel your subscription anytime through your account settings.'
    },
    {
      id: 4,
      category: 'Delivery',
      question: 'What are your delivery areas and times?',
      answer: 'We currently deliver to major metropolitan areas across the United States. Deliveries typically arrive between 8 AM and 8 PM on your selected delivery day. You\'ll receive tracking information once your order ships.'
    },
    {
      id: 5,
      category: 'Meal Plans',
      question: 'How long do the meals stay fresh?',
      answer: 'Our meals are prepared fresh and packaged with care. Refrigerated meals stay fresh for 4-7 days, and frozen meals can be stored for up to 6 months. Each meal comes with specific storage and heating instructions.'
    },
    {
      id: 6,
      category: 'Subscription',
      question: 'Can I skip weeks or pause my subscription?',
      answer: 'Yes! You can skip any week or pause your subscription through your account dashboard. Just make sure to make changes before the weekly cutoff (typically Tuesday at midnight) to avoid charges.'
    },
    {
      id: 7,
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. Your payment method is securely stored and charged automatically based on your subscription schedule.'
    },
    {
      id: 8,
      category: 'Nutrition',
      question: 'Do you provide nutritional information?',
      answer: 'Yes! Every meal comes with detailed nutritional information including calories, macronutrients, ingredients, and allergen information. You can also track your nutrition goals through our app.'
    },
    {
      id: 9,
      category: 'Dietary Restrictions',
      question: 'Do you accommodate special dietary needs?',
      answer: 'We offer meals for various dietary preferences including vegetarian, vegan, gluten-free, dairy-free, keto, paleo, and more. You can set your dietary restrictions in your profile to see only suitable meals.'
    },
    {
      id: 10,
      category: 'Orders',
      question: 'What if I\'m not satisfied with my meal?',
      answer: 'Your satisfaction is our priority! If you\'re not happy with a meal, contact our support team within 48 hours of delivery. We\'ll provide a refund or credit for future orders.'
    }
  ]

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
            <p className="text-xl text-gray-600 mb-8">Find answers to common questions or get in touch with our support team</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-500 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Contact Options */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Need More Help?</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:support@jackssnacks.com"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Email Support</span>
                  </a>
                  <a
                    href="tel:+1-800-JACKS-01"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Call Us</span>
                  </a>
                  <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors w-full">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Live Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <Mail className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Get help via email</p>
                <a
                  href="mailto:support@jackssnacks.com"
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  Send Email
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <Phone className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-4">Mon-Fri 9AM-6PM EST</p>
                <a
                  href="tel:+1-800-JACKS-01"
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  Call Now
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Chat with our team</p>
                <button className="inline-block px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                  Start Chat
                </button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No questions found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-xl">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <div>
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mr-3">
                            {faq.category}
                          </span>
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Help */}
            <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-green-100 mb-6">
                Our support team is here to help you with any questions or issues you might have. 
                Don't hesitate to reach out!
              </p>
              <div className="flex space-x-4">
                <a
                  href="mailto:support@jackssnacks.com"
                  className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
                <button className="px-6 py-3 border border-white text-white rounded-xl font-medium hover:bg-white/10 transition-colors">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 