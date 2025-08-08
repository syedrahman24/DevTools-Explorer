import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, CheckCircle, Circle, Play, RotateCcw } from 'lucide-react'
import useDevToolsStore from '../../store/useDevToolsStore'

const Challenge = ({ challenge, tabId }) => {
  const [completedTasks, setCompletedTasks] = useState(new Set())
  const [isStarted, setIsStarted] = useState(false)
  const { completeChallenge, resetChallenge, challengeProgress } = useDevToolsStore()
  
  const isCompleted = challengeProgress[tabId]
  const allTasksCompleted = completedTasks.size === challenge.tasks.length

  const handleTaskToggle = (taskIndex) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskIndex)) {
      newCompleted.delete(taskIndex)
    } else {
      newCompleted.add(taskIndex)
    }
    setCompletedTasks(newCompleted)
    
    // Auto-complete challenge when all tasks are done
    if (newCompleted.size === challenge.tasks.length) {
      setTimeout(() => {
        completeChallenge(tabId)
      }, 500)
    }
  }

  const handleStartChallenge = () => {
    setIsStarted(true)
    resetChallenge(tabId)
    setCompletedTasks(new Set())
  }

  const handleResetChallenge = () => {
    setIsStarted(false)
    resetChallenge(tabId)
    setCompletedTasks(new Set())
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
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              {challenge.title}
            </h3>
            <p className="text-dark-400 text-sm">
              {challenge.description}
            </p>
          </div>
        </div>

        {/* Challenge Status */}
        <div className="text-right">
          {isCompleted ? (
            <motion.div
              className="flex items-center space-x-2 text-green-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Completed!</span>
            </motion.div>
          ) : (
            <div className="text-sm text-dark-400">
              {completedTasks.size}/{challenge.tasks.length} tasks
            </div>
          )}
        </div>
      </div>

      {/* Challenge Content */}
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="start"
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-medium text-white mb-2">
                Ready for the Challenge?
              </h4>
              <p className="text-dark-400 max-w-md mx-auto">
                Test your knowledge by completing these hands-on tasks. 
                Each task will help reinforce what you've learned.
              </p>
            </div>
            
            <motion.button
              onClick={handleStartChallenge}
              className="btn-primary flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4" />
              <span>Start Challenge</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="tasks"
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-400">Progress</span>
                <span className="text-sm text-white font-medium">
                  {Math.round((completedTasks.size / challenge.tasks.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedTasks.size / challenge.tasks.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {challenge.tasks.map((task, index) => {
                const isTaskCompleted = completedTasks.has(index)
                
                return (
                  <motion.div
                    key={index}
                    className={`
                      flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer
                      ${isTaskCompleted 
                        ? 'bg-green-500/10 border-green-500/30 text-green-100' 
                        : 'bg-dark-800/50 border-dark-600 text-white hover:bg-dark-700/50'
                      }
                    `}
                    onClick={() => handleTaskToggle(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: isTaskCompleted ? 1.1 : 1,
                        rotate: isTaskCompleted ? 360 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {isTaskCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-dark-400" />
                      )}
                    </motion.div>
                    
                    <span className={`flex-1 ${isTaskCompleted ? 'line-through' : ''}`}>
                      {task}
                    </span>
                    
                    {isTaskCompleted && (
                      <motion.div
                        className="text-green-400 text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        ✓ Done
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {allTasksCompleted && (
                <motion.div
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Congratulations! 🎉
                  </h4>
                  <p className="text-green-200 text-sm">
                    You've successfully completed all the challenge tasks!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset Button */}
            <div className="flex justify-center pt-4">
              <motion.button
                onClick={handleResetChallenge}
                className="btn-ghost flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Challenge</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Challenge
