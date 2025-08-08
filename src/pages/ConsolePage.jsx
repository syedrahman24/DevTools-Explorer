import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Play, Trash2 } from 'lucide-react'
import TutorialCard from '../components/tutorial/TutorialCard'
import Challenge from '../components/challenge/Challenge'
import CodeRunner from '../components/interactive/CodeRunner'
import useDevToolsStore from '../store/useDevToolsStore'
import { tutorialData } from '../data/tutorialData'

const ConsolePage = () => {
  const { 
    tutorialProgress, 
    nextTutorialStep, 
    prevTutorialStep, 
    preferences,
    consoleOutput,
    addConsoleOutput,
    clearConsoleOutput
  } = useDevToolsStore()
  
  const [consoleInput, setConsoleInput] = useState('')
  const currentProgress = tutorialProgress.console
  const currentStep = tutorialData.console.steps[currentProgress.currentStep]
  const isLastStep = currentProgress.currentStep === tutorialData.console.steps.length - 1

  const handleConsoleCommand = (command) => {
    if (!command.trim()) return
    
    // Add the command to console output
    addConsoleOutput({
      type: 'command',
      content: `> ${command}`
    })
    
    // Execute the command
    try {
      const result = eval(command)
      addConsoleOutput({
        type: 'result',
        content: result !== undefined ? String(result) : 'undefined'
      })
    } catch (error) {
      addConsoleOutput({
        type: 'error',
        content: `Error: ${error.message}`
      })
    }
    
    setConsoleInput('')
  }

  const quickCommands = [
    { label: 'Get page title', command: 'document.title' },
    { label: 'Current time', command: 'new Date().toLocaleTimeString()' },
    { label: 'Random number', command: 'Math.floor(Math.random() * 100)' },
    { label: 'User agent', command: 'navigator.userAgent.split(" ")[0]' },
    { label: 'Page URL', command: 'window.location.href' },
    { label: 'Console methods', command: 'console.log("Hello"), console.warn("Warning"), console.error("Error")' }
  ]

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
            <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
              <Terminal className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Console Panel</h1>
            <p className="text-dark-400">Execute JavaScript, debug errors, and log information</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tutorial Section */}
        <div className="space-y-6">
          <TutorialCard
            step={currentStep}
            currentStep={currentProgress.currentStep}
            totalSteps={tutorialData.console.steps.length}
            onNext={() => nextTutorialStep('console')}
            onPrev={() => prevTutorialStep('console')}
            showProTips={preferences.showProTips}
          />

          {/* Challenge Section */}
          {isLastStep && (
            <Challenge 
              challenge={tutorialData.console.challenge}
              tabId="console"
            />
          )}
        </div>

        {/* Interactive Console Section */}
        <div className="space-y-6">
          {/* Live Console */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-green-400" />
                <span>Interactive Console</span>
              </h3>
              <motion.button
                onClick={clearConsoleOutput}
                className="btn-ghost p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Clear console"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Console Output */}
            <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4 h-64 overflow-y-auto scrollbar-thin scrollbar-track-dark-800 scrollbar-thumb-dark-600 mb-4">
              {consoleOutput.length === 0 ? (
                <div className="text-dark-500 text-sm italic">
                  Console output will appear here. Try running some JavaScript commands!
                </div>
              ) : (
                <div className="space-y-1 font-mono text-sm">
                  {consoleOutput.map((output) => (
                    <motion.div
                      key={output.id}
                      className={`${
                        output.type === 'command' ? 'text-blue-400' :
                        output.type === 'error' ? 'text-red-400' :
                        output.type === 'warn' ? 'text-yellow-400' :
                        output.type === 'result' ? 'text-green-400' :
                        'text-white'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {output.content}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Console Input */}
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 font-mono text-sm">
                  &gt;
                </span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleConsoleCommand(consoleInput)
                    }
                  }}
                  placeholder="Type JavaScript command and press Enter..."
                  className="w-full pl-8 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <motion.button
                onClick={() => handleConsoleCommand(consoleInput)}
                disabled={!consoleInput.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  consoleInput.trim() 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-dark-700 text-dark-400 cursor-not-allowed'
                }`}
                whileHover={consoleInput.trim() ? { scale: 1.05 } : {}}
                whileTap={consoleInput.trim() ? { scale: 0.95 } : {}}
              >
                <Play className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Commands */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Commands</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickCommands.map((cmd, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleConsoleCommand(cmd.command)}
                  className="text-left p-3 bg-dark-800/50 hover:bg-dark-700 border border-dark-600 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-sm font-medium text-white">{cmd.label}</div>
                  <div className="text-xs text-dark-400 font-mono mt-1 truncate">
                    {cmd.command}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Console Methods Reference */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Console Methods</h3>
            <div className="space-y-3">
              {[
                { method: 'console.log()', desc: 'Output general information', color: 'text-blue-400' },
                { method: 'console.warn()', desc: 'Output warning messages', color: 'text-yellow-400' },
                { method: 'console.error()', desc: 'Output error messages', color: 'text-red-400' },
                { method: 'console.table()', desc: 'Display data in table format', color: 'text-green-400' },
                { method: 'console.time()', desc: 'Start a timer', color: 'text-purple-400' },
                { method: 'console.timeEnd()', desc: 'End a timer and log duration', color: 'text-purple-400' },
                { method: 'console.clear()', desc: 'Clear the console', color: 'text-gray-400' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <code className={`font-mono text-sm ${item.color}`}>
                      {item.method}
                    </code>
                    <div className="text-xs text-dark-400 mt-1">{item.desc}</div>
                  </div>
                  <motion.button
                    onClick={() => handleConsoleCommand(item.method.replace('()', '("Example")'))}
                    className="text-xs text-dark-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try it
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Advanced Console Features */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Advanced Console Techniques</h3>
        <CodeRunner
          initialCode={`// Advanced console techniques
console.group('User Information');
console.log('Name: John Doe');
console.log('Age: 30');
console.log('Role: Developer');
console.groupEnd();

// Styling console output
console.log('%cStyled Text!', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');

// Performance timing
console.time('Array Operation');
const numbers = Array.from({length: 1000}, (_, i) => i);
const doubled = numbers.map(n => n * 2);
console.timeEnd('Array Operation');

// Conditional logging
const debug = true;
console.assert(debug, 'Debug mode is disabled');

// Table display
const users = [
  {name: 'Alice', age: 25, role: 'Designer'},
  {name: 'Bob', age: 30, role: 'Developer'},
  {name: 'Charlie', age: 35, role: 'Manager'}
];
console.table(users);`}
          language="javascript"
          showConsole={true}
        />
      </motion.div>
    </div>
  )
}

export default ConsolePage
