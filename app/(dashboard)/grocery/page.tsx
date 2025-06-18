'use client'

import { useState } from 'react'
import { Plus, ShoppingCart, Check, Trash2, Calendar } from 'lucide-react'

// Mock grocery data
const mockGroceryLists = [
  {
    id: '1',
    title: 'This Week\'s Groceries',
    meal_plan_title: 'Healthy Week Plan',
    created_at: '2024-06-17',
    total_estimated_cost: 127.50,
    completed: false,
    items: [
      { id: '1', name: 'Rolled Oats', quantity: 2, unit: 'cups', category: 'Grains', checked: true, estimated_cost: 3.50 },
      { id: '2', name: 'Mixed Berries', quantity: 1, unit: 'container', category: 'Produce', checked: false, estimated_cost: 5.99 },
      { id: '3', name: 'Greek Yogurt', quantity: 2, unit: 'containers', category: 'Dairy', checked: false, estimated_cost: 8.99 },
      { id: '4', name: 'Chicken Breast', quantity: 2, unit: 'lbs', category: 'Meat', checked: false, estimated_cost: 12.99 },
      { id: '5', name: 'Mixed Greens', quantity: 2, unit: 'bags', category: 'Produce', checked: true, estimated_cost: 7.98 },
      { id: '6', name: 'Salmon Fillets', quantity: 1, unit: 'lb', category: 'Seafood', checked: false, estimated_cost: 15.99 },
      { id: '7', name: 'Quinoa', quantity: 1, unit: 'bag', category: 'Grains', checked: false, estimated_cost: 4.99 },
      { id: '8', name: 'Bell Peppers', quantity: 3, unit: 'pieces', category: 'Produce', checked: false, estimated_cost: 4.50 },
      { id: '9', name: 'Olive Oil', quantity: 1, unit: 'bottle', category: 'Pantry', checked: true, estimated_cost: 6.99 },
      { id: '10', name: 'Garlic', quantity: 1, unit: 'bulb', category: 'Produce', checked: false, estimated_cost: 0.99 }
    ]
  }
]

const categories = ['All', 'Produce', 'Meat', 'Seafood', 'Dairy', 'Grains', 'Pantry']

export default function GroceryPage() {
  const [groceryLists, setGroceryLists] = useState(mockGroceryLists)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [newItem, setNewItem] = useState('')
  const [showAddItem, setShowAddItem] = useState(false)

  const currentList = groceryLists[0] // For now, just use the first list

  const toggleItemCheck = (itemId: string) => {
    setGroceryLists(prevLists =>
      prevLists.map(list =>
        list.id === currentList.id
          ? {
              ...list,
              items: list.items.map(item =>
                item.id === itemId
                  ? { ...item, checked: !item.checked }
                  : item
              )
            }
          : list
      )
    )
  }

  const removeItem = (itemId: string) => {
    setGroceryLists(prevLists =>
      prevLists.map(list =>
        list.id === currentList.id
          ? {
              ...list,
              items: list.items.filter(item => item.id !== itemId)
            }
          : list
      )
    )
  }

  const addNewItem = () => {
    if (!newItem.trim()) return

    const newGroceryItem = {
      id: Date.now().toString(),
      name: newItem,
      quantity: 1,
      unit: 'piece',
      category: 'Pantry',
      checked: false,
      estimated_cost: 0
    }

    setGroceryLists(prevLists =>
      prevLists.map(list =>
        list.id === currentList.id
          ? {
              ...list,
              items: [...list.items, newGroceryItem]
            }
          : list
      )
    )

    setNewItem('')
    setShowAddItem(false)
  }

  const filteredItems = selectedCategory === 'All' 
    ? currentList.items 
    : currentList.items.filter(item => item.category === selectedCategory)

  const groupedItems = filteredItems.reduce((groups, item) => {
    const category = item.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
    return groups
  }, {} as Record<string, typeof currentList.items>)

  const completedItems = currentList.items.filter(item => item.checked).length
  const totalItems = currentList.items.length
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  const totalCost = currentList.items
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.estimated_cost, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grocery Lists</h1>
          <p className="text-gray-600 mt-1">Organize your shopping and track your spending</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Generate from Plan</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New List</span>
          </button>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentList.title}</h2>
            <p className="opacity-90">
              From meal plan: {currentList.meal_plan_title}
            </p>
            <div className="mt-4">
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <span>{completedItems} of {totalItems} items completed</span>
                <span>•</span>
                <span>Total spent: ${totalCost.toFixed(2)}</span>
              </div>
              <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">Progress</div>
            <div className="text-3xl font-bold">{completionPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Filter */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => {
                const count = category === 'All' 
                  ? currentList.items.length 
                  : currentList.items.filter(item => item.category === category).length
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="text-sm text-gray-500">{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Add Item */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {showAddItem ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={addNewItem}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddItem(false)
                        setNewItem('')
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddItem(true)}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:text-green-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grocery List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedCategory === 'All' ? 'All Items' : selectedCategory}
                </h3>
                <div className="text-sm text-gray-500">
                  {filteredItems.length} items
                </div>
              </div>
            </div>

            <div className="p-6">
              {selectedCategory === 'All' ? (
                // Group by category
                <div className="space-y-6">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {items.map(item => (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                              item.checked 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <button
                                onClick={() => toggleItemCheck(item.id)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  item.checked
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-gray-300 hover:border-green-400'
                                }`}
                              >
                                {item.checked && <Check className="h-3 w-3 text-white" />}
                              </button>
                              <div className="flex-1">
                                <div className={`font-medium ${item.checked ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.quantity} {item.unit} • ${item.estimated_cost.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Single category view
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                        item.checked 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={() => toggleItemCheck(item.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            item.checked
                              ? 'bg-green-600 border-green-600'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {item.checked && <Check className="h-3 w-3 text-white" />}
                        </button>
                        <div className="flex-1">
                          <div className={`font-medium ${item.checked ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.quantity} {item.unit} • ${item.estimated_cost.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No items in this category</h3>
                  <p className="text-gray-600">Add some items to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 