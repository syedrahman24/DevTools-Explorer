import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Play, Square, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react'
import TutorialCard from '../components/tutorial/TutorialCard'
import Challenge from '../components/challenge/Challenge'
import CodeRunner from '../components/interactive/CodeRunner'
import useDevToolsStore from '../store/useDevToolsStore'
import { tutorialData } from '../data/tutorialData'

const PerformancePage = () => {
  const { 
    tutorialProgress, 
    nextTutorialStep, 
    prevTutorialStep, 
    preferences 
  } = useDevToolsStore()
  
  const [isRecording, setIsRecording] = useState(false)
  const [performanceData, setPerformanceData] = useState(null)
  
  const currentProgress = tutorialProgress.performance
  const currentStep = tutorialData.performance.steps[currentProgress.currentStep]
  const isLastStep = currentProgress.currentStep === tutorialData.performance.steps.length - 1

  // Mock performance data
  const mockPerformanceData = {
    coreWebVitals: {
      lcp: { value: 2.1, rating: 'good', threshold: 2.5 },
      fid: { value: 85, rating: 'good', threshold: 100 },
      cls: { value: 0.08, rating: 'good', threshold: 0.1 }
    },
    metrics: {
      fps: 58,
      cpuUsage: 45,
      memoryUsage: 128,
      jsHeapSize: 89
    },
    timeline: [
      { name: 'DOM Content Loaded', time: 450, type: 'milestone' },
      { name: 'Load Event', time: 680, type: 'milestone' },
      { name: 'First Paint', time: 320, type: 'paint' },
      { name: 'First Contentful Paint', time: 380, type: 'paint' },
      { name: 'Largest Contentful Paint', time: 2100, type: 'paint' }
    ],
    flamegraph: [
      { function: 'main()', duration: 1200, children: [
        { function: 'loadData()', duration: 800, children: [
          { function: 'fetchAPI()', duration: 600, children: [] },
          { function: 'parseJSON()', duration: 150, children: [] }
        ]},
        { function: 'renderUI()', duration: 300, children: [
          { function: 'createElement()', duration: 120, children: [] },
          { function: 'appendChild()', duration: 80, children: [] }
        ]}
      ]}
    ]
  }

  const startRecording = () => {
    setIsRecording(true)
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setPerformanceData(mockPerformanceData)
    }, 3000)
  }

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'good': return 'text-green-400'
      case 'needs-improvement': return 'text-yellow-400'
      case 'poor': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const FlameGraphNode = ({ node, depth = 0, maxDuration }) => {
    const width = (node.duration / maxDuration) * 100
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500']
    const colorClass = colors[depth % colors.length]

    return (
      <div className="space-y-1">
        <motion.div
          className={`${colorClass} text-white text-xs px-2 py-1 rounded relative`}
          style={{ width: `${Math.max(width, 10)}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(width, 10)}%` }}
          transition={{ duration: 0.5, delay: depth * 0.1 }}
        >
          <span className="font-mono">{node.function}</span>
          <span className="float-right">{node.duration}ms</span>
        </motion.div>
        {node.children && node.children.map((child, index) => (
          <div key={index} className="ml-4">
            <FlameGraphNode node={child} depth={depth + 1} maxDuration={maxDuration} />
          </div>
        ))}
      </div>
    )
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
            <div className="absolute inset-0 bg-yellow-500/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Performance Panel</h1>
            <p className="text-dark-400">Analyze runtime performance and optimize your application</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tutorial Section */}
        <div className="space-y-6">
          <TutorialCard
            step={currentStep}
            currentStep={currentProgress.currentStep}
            totalSteps={tutorialData.performance.steps.length}
            onNext={() => nextTutorialStep('performance')}
            onPrev={() => prevTutorialStep('performance')}
            showProTips={preferences.showProTips}
          />

          {/* Challenge Section */}
          {isLastStep && (
            <Challenge 
              challenge={tutorialData.performance.challenge}
              tabId="performance"
            />
          )}
        </div>

        {/* Performance Monitor Section */}
        <div className="space-y-6">
          {/* Recording Controls */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Performance Profiler</span>
              </h3>
              
              <motion.button
                onClick={startRecording}
                disabled={isRecording}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isRecording
                    ? 'bg-red-600 text-white'
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }`}
                whileHover={!isRecording ? { scale: 1.05 } : {}}
                whileTap={!isRecording ? { scale: 0.95 } : {}}
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4" />
                    <span>Recording... (3s)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Start Recording</span>
                  </>
                )}
              </motion.button>
            </div>

            {isRecording && (
              <motion.div
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center justify-center space-x-2 text-red-400">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                  <span>Recording performance data...</span>
                </div>
                <p className="text-sm text-red-300 mt-2">
                  Interact with the page to capture performance metrics
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Core Web Vitals */}
          {performanceData && (
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>Core Web Vitals</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(performanceData.coreWebVitals).map(([metric, data]) => (
                  <motion.div
                    key={metric}
                    className="bg-dark-800/50 rounded-lg p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="text-xs text-dark-400 uppercase tracking-wider mb-1">
                      {metric.toUpperCase()}
                    </div>
                    <div className={`text-2xl font-bold ${getRatingColor(data.rating)}`}>
                      {data.value}{metric === 'fid' ? 'ms' : metric === 'lcp' ? 's' : ''}
                    </div>
                    <div className="text-xs text-dark-400 mt-1">
                      Threshold: {data.threshold}{metric === 'fid' ? 'ms' : metric === 'lcp' ? 's' : ''}
                    </div>
                    <div className={`text-xs mt-1 ${getRatingColor(data.rating)}`}>
                      {data.rating.replace('-', ' ')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Performance Metrics */}
          {performanceData && (
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Runtime Metrics</span>
              </h3>
              
              <div className="space-y-4">
                {Object.entries(performanceData.metrics).map(([metric, value]) => {
                  const percentage = metric === 'fps' ? (value / 60) * 100 : 
                                   metric === 'cpuUsage' ? value :
                                   metric === 'memoryUsage' ? (value / 256) * 100 :
                                   (value / 128) * 100
                  
                  return (
                    <div key={metric} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-400 capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <span className="text-white">
                          {value}{metric === 'fps' ? ' fps' : 
                                  metric === 'cpuUsage' ? '%' :
                                  metric.includes('memory') || metric.includes('heap') ? ' MB' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            percentage > 80 ? 'bg-red-500' :
                            percentage > 60 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(percentage, 100)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Flame Graph */}
      {performanceData && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Flame Graph</h3>
          <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4">
            <div className="mb-4 text-sm text-dark-400">
              Function call stack visualization - wider bars indicate longer execution times
            </div>
            {performanceData.flamegraph.map((node, index) => (
              <FlameGraphNode 
                key={index} 
                node={node} 
                maxDuration={node.duration}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Performance Testing Code */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Performance Testing</h3>
        <CodeRunner
          initialCode={`// Performance measurement examples
console.log('🚀 Starting performance tests...');

// 1. Measure function execution time
console.time('Array Processing');
const largeArray = Array.from({length: 100000}, (_, i) => i);
const doubled = largeArray.map(x => x * 2);
const filtered = doubled.filter(x => x % 2 === 0);
console.timeEnd('Array Processing');

// 2. Memory usage (approximate)
const memoryBefore = performance.memory ? performance.memory.usedJSHeapSize : 'N/A';
console.log('Memory before:', memoryBefore);

// Create some objects
const objects = [];
for (let i = 0; i < 10000; i++) {
  objects.push({ id: i, data: 'test'.repeat(10) });
}

const memoryAfter = performance.memory ? performance.memory.usedJSHeapSize : 'N/A';
console.log('Memory after:', memoryAfter);

// 3. Performance marks and measures
performance.mark('start-operation');
// Simulate some work
for (let i = 0; i < 1000000; i++) {
  Math.random();
}
performance.mark('end-operation');
performance.measure('operation-duration', 'start-operation', 'end-operation');

// Get the measurement
const measures = performance.getEntriesByType('measure');
console.log('Custom measurement:', measures[measures.length - 1].duration + 'ms');

// 4. Navigation timing
if (performance.navigation) {
  console.log('Page load type:', performance.navigation.type);
  console.log('Redirects:', performance.navigation.redirectCount);
}

// 5. Resource timing
const resources = performance.getEntriesByType('resource');
console.log('Total resources loaded:', resources.length);

console.log('✅ Performance tests completed!');`}
          language="javascript"
          showConsole={true}
        />
      </motion.div>
    </div>
  )
}

export default PerformancePage
