import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Lightbulb, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const TutorialCard = ({ 
  step, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  showProTips = true 
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    if (step.code) {
      try {
        await navigator.clipboard.writeText(step.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy code:', err)
      }
    }
  }

  return (
    <motion.div
      className="glass-card p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {step.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-dark-400">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <div className="w-24 h-1 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="text-dark-200 leading-relaxed">
          {step.content}
        </p>

        {/* Highlights */}
        {step.highlights && step.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {step.highlights.map((highlight, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-sm text-brand-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {highlight}
              </motion.span>
            ))}
          </div>
        )}

        {/* Code Block */}
        {step.code && (
          <div className="relative">
            <div className="code-block">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-dark-400 font-medium">CODE EXAMPLE</span>
                <motion.button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 text-xs text-dark-400 hover:text-white transition-colors"
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
              <pre className="text-sm text-dark-100 overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Pro Tip */}
        {showProTips && step.proTip && (
          <motion.div
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">Pro Tip</h4>
                <p className="text-sm text-yellow-200">{step.proTip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-700">
        <motion.button
          onClick={onPrev}
          disabled={currentStep === 0}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${currentStep === 0 
              ? 'text-dark-500 cursor-not-allowed' 
              : 'text-white hover:bg-dark-700'
            }
          `}
          whileHover={currentStep > 0 ? { x: -2 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </motion.button>

        <div className="flex space-x-1">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${index <= currentStep ? 'bg-brand-500' : 'bg-dark-600'}
              `}
            />
          ))}
        </div>

        <motion.button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${currentStep === totalSteps - 1
              ? 'text-dark-500 cursor-not-allowed'
              : 'btn-primary'
            }
          `}
          whileHover={currentStep < totalSteps - 1 ? { x: 2 } : {}}
          whileTap={currentStep < totalSteps - 1 ? { scale: 0.95 } : {}}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default TutorialCard
