import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wifi, Download, Upload, Clock, AlertCircle, CheckCircle, Filter } from 'lucide-react'
import TutorialCard from '../components/tutorial/TutorialCard'
import Challenge from '../components/challenge/Challenge'
import CodeRunner from '../components/interactive/CodeRunner'
import useDevToolsStore from '../store/useDevToolsStore'
import { tutorialData } from '../data/tutorialData'

const NetworkPage = () => {
  const { 
    tutorialProgress, 
    nextTutorialStep, 
    prevTutorialStep, 
    preferences 
  } = useDevToolsStore()
  
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [filterType, setFilterType] = useState('all')
  
  const currentProgress = tutorialProgress.network
  const currentStep = tutorialData.network.steps[currentProgress.currentStep]
  const isLastStep = currentProgress.currentStep === tutorialData.network.steps.length - 1

  // Mock network requests data
  const mockRequests = [
    {
      id: 1,
      name: 'index.html',
      type: 'document',
      status: 200,
      method: 'GET',
      size: '2.1 KB',
      time: '245ms',
      timeline: { dns: 2, connect: 15, ssl: 45, send: 1, wait: 120, receive: 8 },
      headers: {
        request: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept-Language': 'en-US,en;q=0.5'
        },
        response: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Length': '2156',
          'Cache-Control': 'max-age=3600'
        }
      }
    },
    {
      id: 2,
      name: 'styles.css',
      type: 'stylesheet',
      status: 200,
      method: 'GET',
      size: '15.3 KB',
      time: '89ms',
      timeline: { dns: 0, connect: 0, ssl: 0, send: 1, wait: 75, receive: 13 },
      headers: {
        request: {
          'Accept': 'text/css,*/*;q=0.1',
          'Referer': 'https://example.com/'
        },
        response: {
          'Content-Type': 'text/css',
          'Content-Length': '15678',
          'ETag': '"abc123"'
        }
      }
    },
    {
      id: 3,
      name: 'app.js',
      type: 'script',
      status: 200,
      method: 'GET',
      size: '45.7 KB',
      time: '156ms',
      timeline: { dns: 0, connect: 0, ssl: 0, send: 1, wait: 140, receive: 15 },
      headers: {
        request: {
          'Accept': '*/*',
          'Referer': 'https://example.com/'
        },
        response: {
          'Content-Type': 'application/javascript',
          'Content-Length': '46823'
        }
      }
    },
    {
      id: 4,
      name: 'api/users',
      type: 'xhr',
      status: 200,
      method: 'GET',
      size: '3.2 KB',
      time: '320ms',
      timeline: { dns: 0, connect: 0, ssl: 0, send: 2, wait: 310, receive: 8 },
      headers: {
        request: {
          'Accept': 'application/json',
          'Authorization': 'Bearer token123'
        },
        response: {
          'Content-Type': 'application/json',
          'Content-Length': '3276'
        }
      }
    },
    {
      id: 5,
      name: 'image.jpg',
      type: 'image',
      status: 404,
      method: 'GET',
      size: '0 B',
      time: '45ms',
      timeline: { dns: 0, connect: 0, ssl: 0, send: 1, wait: 44, receive: 0 },
      headers: {
        request: {
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
        },
        response: {
          'Content-Type': 'text/html',
          'Content-Length': '0'
        }
      }
    }
  ]

  const getTypeColor = (type) => {
    const colors = {
      document: 'text-blue-400',
      stylesheet: 'text-purple-400',
      script: 'text-yellow-400',
      xhr: 'text-red-400',
      image: 'text-green-400',
      font: 'text-pink-400'
    }
    return colors[type] || 'text-gray-400'
  }

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400'
    if (status >= 300 && status < 400) return 'text-yellow-400'
    if (status >= 400) return 'text-red-400'
    return 'text-gray-400'
  }

  const filteredRequests = filterType === 'all' 
    ? mockRequests 
    : mockRequests.filter(req => req.type === filterType)

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
            <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
              <Wifi className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Network Panel</h1>
            <p className="text-dark-400">Monitor network requests, responses, and performance</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tutorial Section */}
        <div className="space-y-6">
          <TutorialCard
            step={currentStep}
            currentStep={currentProgress.currentStep}
            totalSteps={tutorialData.network.steps.length}
            onNext={() => nextTutorialStep('network')}
            onPrev={() => prevTutorialStep('network')}
            showProTips={preferences.showProTips}
          />

          {/* Challenge Section */}
          {isLastStep && (
            <Challenge 
              challenge={tutorialData.network.challenge}
              tabId="network"
            />
          )}
        </div>

        {/* Network Monitor Section */}
        <div className="space-y-6">
          {/* Network Overview */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-purple-400" />
              <span>Network Overview</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-dark-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Download className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-dark-400">Downloaded</span>
                </div>
                <div className="text-lg font-semibold text-white">66.3 KB</div>
              </div>
              
              <div className="bg-dark-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-dark-400">Load Time</span>
                </div>
                <div className="text-lg font-semibold text-white">855ms</div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['all', 'document', 'stylesheet', 'script', 'xhr', 'image'].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterType === type
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-dark-700 text-dark-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Requests Table */}
            <div className="bg-dark-900/90 border border-dark-700 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-2 p-3 bg-dark-800/50 text-xs text-dark-400 font-medium border-b border-dark-700">
                <div className="col-span-4">Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Time</div>
              </div>
              
              <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-dark-800 scrollbar-thumb-dark-600">
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`grid grid-cols-12 gap-2 p-3 text-sm cursor-pointer transition-all duration-200 border-b border-dark-800/50 hover:bg-dark-800/30 ${
                      selectedRequest?.id === request.id ? 'bg-purple-500/10 border-purple-500/30' : ''
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="col-span-4 text-white truncate">{request.name}</div>
                    <div className={`col-span-2 ${getStatusColor(request.status)} flex items-center space-x-1`}>
                      {request.status >= 200 && request.status < 300 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      <span>{request.status}</span>
                    </div>
                    <div className={`col-span-2 ${getTypeColor(request.type)}`}>{request.type}</div>
                    <div className="col-span-2 text-dark-300">{request.size}</div>
                    <div className="col-span-2 text-dark-300">{request.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Request Details */}
          {selectedRequest && (
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Request Details</h3>
              
              <div className="space-y-4">
                {/* General Info */}
                <div className="bg-dark-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">General</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-dark-400">Request URL:</span>
                      <span className="text-white">{selectedRequest.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-400">Request Method:</span>
                      <span className="text-white">{selectedRequest.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-400">Status Code:</span>
                      <span className={getStatusColor(selectedRequest.status)}>
                        {selectedRequest.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timing */}
                <div className="bg-dark-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Timing</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedRequest.timeline).map(([phase, time]) => (
                      <div key={phase} className="flex items-center space-x-2">
                        <span className="text-dark-400 text-sm w-20 capitalize">{phase}:</span>
                        <div className="flex-1 bg-dark-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${(time / 200) * 100}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-12">{time}ms</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headers */}
                <div className="bg-dark-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Response Headers</h4>
                  <div className="space-y-1 text-sm font-mono">
                    {Object.entries(selectedRequest.headers.response).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-blue-400 w-32">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Network Simulation */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Network Request Simulation</h3>
        <CodeRunner
          initialCode={`// Simulate network requests with fetch API
async function fetchUserData() {
  try {
    console.log('🚀 Starting network request...');
    console.time('API Request');
    
    // Simulate API call
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    console.timeEnd('API Request');
    
    console.log('✅ Request successful!');
    console.log('User data:', userData);
    
    // Log response headers
    console.log('Response headers:');
    for (let [key, value] of response.headers.entries()) {
      console.log(\`  \${key}: \${value}\`);
    }
    
    return userData;
  } catch (error) {
    console.error('❌ Network request failed:', error.message);
  }
}

// Execute the request
fetchUserData();

// You can also try:
// - Different HTTP methods (POST, PUT, DELETE)
// - Request headers and authentication
// - Error handling for different status codes`}
          language="javascript"
          showConsole={true}
        />
      </motion.div>
    </div>
  )
}

export default NetworkPage
