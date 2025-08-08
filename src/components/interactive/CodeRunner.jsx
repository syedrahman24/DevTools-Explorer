import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Copy, Check, AlertTriangle } from 'lucide-react'
import useDevToolsStore from '../../store/useDevToolsStore'

const CodeRunner = ({ 
  initialCode = '', 
  language = 'javascript',
  readOnly = false,
  showConsole = true 
}) => {
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef(null)
  
  const { addConsoleOutput, consoleOutput } = useDevToolsStore()

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
  }

  const safeEval = (code) => {
    try {
      // Create a sandboxed console object
      const sandboxConsole = {
        log: (...args) => {
          addConsoleOutput({
            type: 'log',
            content: args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ')
          })
        },
        warn: (...args) => {
          addConsoleOutput({
            type: 'warn',
            content: args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ')
          })
        },
        error: (...args) => {
          addConsoleOutput({
            type: 'error',
            content: args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ')
          })
        },
        table: (data) => {
          addConsoleOutput({
            type: 'table',
            content: JSON.stringify(data, null, 2)
          })
        },
        clear: () => {
          // This would clear the console in the store
        }
      }

      // Create a sandboxed environment
      const sandbox = {
        console: sandboxConsole,
        Math,
        Date,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean,
        // Add more safe globals as needed
      }

      // Create function with sandboxed context
      const func = new Function(
        ...Object.keys(sandbox),
        `
        try {
          ${code}
        } catch (error) {
          console.error('Runtime Error: ' + error.message);
        }
        `
      )

      // Execute with sandbox values
      func(...Object.values(sandbox))
      
    } catch (error) {
      addConsoleOutput({
        type: 'error',
        content: `Syntax Error: ${error.message}`
      })
    }
  }

  const handleRunCode = () => {
    if (!code.trim()) return
    
    setIsRunning(true)
    
    // Add execution indicator
    addConsoleOutput({
      type: 'info',
      content: '> Executing code...'
    })
    
    // Simulate execution delay for better UX
    setTimeout(() => {
      safeEval(code)
      setIsRunning(false)
    }, 300)
  }

  const handleKeyDown = (e) => {
    // Handle tab indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      
      // Set cursor position after tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
    
    // Run code with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRunCode()
    }
  }

  return (
    <div className="space-y-4">
      {/* Code Editor */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-dark-400 font-medium uppercase tracking-wider">
            {language} Editor
          </span>
          <div className="flex items-center space-x-2">
            {!readOnly && (
              <motion.button
                onClick={handleReset}
                className="text-xs text-dark-400 hover:text-white transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </motion.button>
            )}
            
            <motion.button
              onClick={handleCopyCode}
              className="text-xs text-dark-400 hover:text-white transition-colors flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className={`
              w-full h-32 p-4 bg-dark-900/90 border border-dark-700 rounded-lg
              font-mono text-sm text-white placeholder-dark-400 resize-none
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
              ${readOnly ? 'cursor-default' : 'cursor-text'}
            `}
            placeholder="// Write your JavaScript code here..."
            spellCheck={false}
          />
          
          {!readOnly && (
            <motion.button
              onClick={handleRunCode}
              disabled={isRunning || !code.trim()}
              className={`
                absolute bottom-3 right-3 flex items-center space-x-2 px-3 py-1.5 rounded-lg
                text-sm font-medium transition-all duration-200
                ${isRunning || !code.trim()
                  ? 'bg-dark-700 text-dark-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-soft hover:shadow-medium'
                }
              `}
              whileHover={!isRunning && code.trim() ? { scale: 1.05 } : {}}
              whileTap={!isRunning && code.trim() ? { scale: 0.95 } : {}}
            >
              <Play className="w-3 h-3" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </motion.button>
          )}
        </div>

        {/* Keyboard Shortcuts Hint */}
        {!readOnly && (
          <div className="text-xs text-dark-500 mt-2">
            Press Ctrl+Enter to run code • Tab for indentation
          </div>
        )}
      </div>

      {/* Console Output */}
      {showConsole && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-400 font-medium uppercase tracking-wider">
              Console Output
            </span>
            <motion.button
              onClick={() => useDevToolsStore.getState().clearConsoleOutput()}
              className="text-xs text-dark-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
          </div>
          
          <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4 h-32 overflow-y-auto scrollbar-thin scrollbar-track-dark-800 scrollbar-thumb-dark-600">
            {consoleOutput.length === 0 ? (
              <div className="text-dark-500 text-sm italic">
                Console output will appear here...
              </div>
            ) : (
              <div className="space-y-1">
                {consoleOutput.map((output) => (
                  <motion.div
                    key={output.id}
                    className={`text-sm font-mono flex items-start space-x-2 ${
                      output.type === 'error' ? 'text-red-400' :
                      output.type === 'warn' ? 'text-yellow-400' :
                      output.type === 'info' ? 'text-blue-400' :
                      'text-green-400'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {output.type === 'error' && <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />}
                    <span className="break-all">{output.content}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeRunner
