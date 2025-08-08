import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, HardDrive, Cookie, Settings, Trash2, Plus, Edit3 } from 'lucide-react'
import TutorialCard from '../components/tutorial/TutorialCard'
import Challenge from '../components/challenge/Challenge'
import CodeRunner from '../components/interactive/CodeRunner'
import useDevToolsStore from '../store/useDevToolsStore'
import { tutorialData } from '../data/tutorialData'

const ApplicationPage = () => {
  const { 
    tutorialProgress, 
    nextTutorialStep, 
    prevTutorialStep, 
    preferences 
  } = useDevToolsStore()
  
  const [activeStorageTab, setActiveStorageTab] = useState('localStorage')
  const [storageData, setStorageData] = useState({
    localStorage: [],
    sessionStorage: [],
    cookies: []
  })
  const [newItem, setNewItem] = useState({ key: '', value: '' })
  const [editingItem, setEditingItem] = useState(null)
  
  const currentProgress = tutorialProgress.application
  const currentStep = tutorialData.application.steps[currentProgress.currentStep]
  const isLastStep = currentProgress.currentStep === tutorialData.application.steps.length - 1

  // Load storage data on component mount
  useEffect(() => {
    loadStorageData()
  }, [])

  const loadStorageData = () => {
    // Load localStorage
    const localItems = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && !key.startsWith('devtools-explorer-storage')) {
        localItems.push({ key, value: localStorage.getItem(key) })
      }
    }

    // Load sessionStorage
    const sessionItems = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key) {
        sessionItems.push({ key, value: sessionStorage.getItem(key) })
      }
    }

    // Load cookies (simplified)
    const cookieItems = document.cookie.split(';').map(cookie => {
      const [key, value] = cookie.trim().split('=')
      return { key: key || '', value: value || '' }
    }).filter(item => item.key)

    setStorageData({
      localStorage: localItems,
      sessionStorage: sessionItems,
      cookies: cookieItems
    })
  }

  const addStorageItem = () => {
    if (!newItem.key || !newItem.value) return

    try {
      if (activeStorageTab === 'localStorage') {
        localStorage.setItem(newItem.key, newItem.value)
      } else if (activeStorageTab === 'sessionStorage') {
        sessionStorage.setItem(newItem.key, newItem.value)
      } else if (activeStorageTab === 'cookies') {
        document.cookie = `${newItem.key}=${newItem.value}; path=/`
      }
      
      setNewItem({ key: '', value: '' })
      loadStorageData()
    } catch (error) {
      console.error('Error adding storage item:', error)
    }
  }

  const deleteStorageItem = (key) => {
    try {
      if (activeStorageTab === 'localStorage') {
        localStorage.removeItem(key)
      } else if (activeStorageTab === 'sessionStorage') {
        sessionStorage.removeItem(key)
      } else if (activeStorageTab === 'cookies') {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
      
      loadStorageData()
    } catch (error) {
      console.error('Error deleting storage item:', error)
    }
  }

  const clearAllStorage = () => {
    try {
      if (activeStorageTab === 'localStorage') {
        // Only clear non-app storage items
        const keysToRemove = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && !key.startsWith('devtools-explorer-storage')) {
            keysToRemove.push(key)
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key))
      } else if (activeStorageTab === 'sessionStorage') {
        sessionStorage.clear()
      } else if (activeStorageTab === 'cookies') {
        document.cookie.split(";").forEach(cookie => {
          const eqPos = cookie.indexOf("=")
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        })
      }
      
      loadStorageData()
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  const mockServiceWorker = {
    status: 'activated',
    scope: '/',
    scriptURL: '/sw.js',
    state: 'activated',
    lastUpdated: new Date().toISOString()
  }

  const mockManifest = {
    name: 'DevTools Explorer',
    short_name: 'DevTools',
    start_url: '/',
    display: 'standalone',
    theme_color: '#0ea5e9',
    background_color: '#0f172a',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Application Panel</h1>
            <p className="text-dark-400">Manage storage, service workers, and progressive web app features</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tutorial Section */}
        <div className="space-y-6">
          <TutorialCard
            step={currentStep}
            currentStep={currentProgress.currentStep}
            totalSteps={tutorialData.application.steps.length}
            onNext={() => nextTutorialStep('application')}
            onPrev={() => prevTutorialStep('application')}
            showProTips={preferences.showProTips}
          />

          {/* Challenge Section */}
          {isLastStep && (
            <Challenge 
              challenge={tutorialData.application.challenge}
              tabId="application"
            />
          )}
        </div>

        {/* Storage Management Section */}
        <div className="space-y-6">
          {/* Storage Tabs */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <HardDrive className="w-5 h-5 text-orange-400" />
                <span>Storage Management</span>
              </h3>
              
              <motion.button
                onClick={clearAllStorage}
                className="btn-ghost p-2 text-red-400 hover:text-red-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Clear all storage"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Storage Type Tabs */}
            <div className="flex space-x-1 mb-4">
              {['localStorage', 'sessionStorage', 'cookies'].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setActiveStorageTab(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeStorageTab === type
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-dark-700 text-dark-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>

            {/* Add New Item */}
            <div className="bg-dark-800/50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={newItem.key}
                  onChange={(e) => setNewItem({ ...newItem, key: e.target.value })}
                  className="input-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                  className="input-primary text-sm"
                />
              </div>
              <motion.button
                onClick={addStorageItem}
                disabled={!newItem.key || !newItem.value}
                className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  newItem.key && newItem.value
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-dark-700 text-dark-400 cursor-not-allowed'
                }`}
                whileHover={newItem.key && newItem.value ? { scale: 1.02 } : {}}
                whileTap={newItem.key && newItem.value ? { scale: 0.98 } : {}}
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </motion.button>
            </div>

            {/* Storage Items List */}
            <div className="bg-dark-900/90 border border-dark-700 rounded-lg max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-dark-800 scrollbar-thumb-dark-600">
              {storageData[activeStorageTab].length === 0 ? (
                <div className="p-4 text-center text-dark-500 text-sm">
                  No {activeStorageTab} items found
                </div>
              ) : (
                <div className="divide-y divide-dark-700">
                  {storageData[activeStorageTab].map((item, index) => (
                    <motion.div
                      key={`${item.key}-${index}`}
                      className="p-3 hover:bg-dark-800/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {item.key}
                          </div>
                          <div className="text-xs text-dark-400 truncate">
                            {item.value}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <motion.button
                            onClick={() => setEditingItem(item)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit3 className="w-3 h-3" />
                          </motion.button>
                          <motion.button
                            onClick={() => deleteStorageItem(item.key)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Service Worker Status */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <span>Service Worker</span>
            </h3>
            
            <div className="bg-dark-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-dark-400">Status</span>
                <span className="text-green-400 text-sm font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>{mockServiceWorker.status}</span>
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-400">Scope:</span>
                  <span className="text-white font-mono">{mockServiceWorker.scope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Script URL:</span>
                  <span className="text-white font-mono">{mockServiceWorker.scriptURL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">State:</span>
                  <span className="text-white">{mockServiceWorker.state}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PWA Manifest */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Cookie className="w-5 h-5 text-purple-400" />
              <span>PWA Manifest</span>
            </h3>
            
            <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4">
              <pre className="text-sm text-dark-200 overflow-x-auto">
                <code>{JSON.stringify(mockManifest, null, 2)}</code>
              </pre>
            </div>
            
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-sm text-green-400">Manifest is valid and installable</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Storage API Examples */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Storage API Examples</h3>
        <CodeRunner
          initialCode={`// Storage API examples
console.log('🗄️ Testing Web Storage APIs...');

// 1. localStorage - persists until explicitly cleared
localStorage.setItem('user_preference', 'dark_theme');
localStorage.setItem('last_visit', new Date().toISOString());
console.log('localStorage user_preference:', localStorage.getItem('user_preference'));

// Store complex data as JSON
const userData = { name: 'John', age: 30, preferences: ['coding', 'coffee'] };
localStorage.setItem('user_data', JSON.stringify(userData));
const retrievedData = JSON.parse(localStorage.getItem('user_data'));
console.log('Retrieved user data:', retrievedData);

// 2. sessionStorage - persists only for the session
sessionStorage.setItem('temp_token', 'abc123');
sessionStorage.setItem('current_tab', 'application');
console.log('sessionStorage temp_token:', sessionStorage.getItem('temp_token'));

// 3. Cookies - can be configured with expiration, domain, etc.
document.cookie = 'session_id=xyz789; path=/; max-age=3600';
document.cookie = 'theme=dark; path=/; expires=Fri, 31 Dec 2024 23:59:59 GMT';
console.log('All cookies:', document.cookie);

// 4. Storage events (listen for changes)
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', {
    key: e.key,
    oldValue: e.oldValue,
    newValue: e.newValue,
    storageArea: e.storageArea === localStorage ? 'localStorage' : 'sessionStorage'
  });
});

// 5. Check storage quota (if supported)
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(estimate => {
    console.log('Storage quota:', {
      used: Math.round(estimate.usage / 1024 / 1024) + ' MB',
      available: Math.round(estimate.quota / 1024 / 1024) + ' MB',
      percentage: Math.round((estimate.usage / estimate.quota) * 100) + '%'
    });
  });
}

// 6. Clear storage
console.log('localStorage length before clear:', localStorage.length);
// localStorage.clear(); // Uncomment to clear all localStorage
console.log('✅ Storage API examples completed!');`}
          language="javascript"
          showConsole={true}
        />
      </motion.div>
    </div>
  )
}

export default ApplicationPage
