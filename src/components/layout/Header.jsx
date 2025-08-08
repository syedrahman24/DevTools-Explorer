import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Github, Share2, Sparkles, Trophy, Target, Zap, Clock, Activity, TrendingUp, Star } from 'lucide-react'
import useDevToolsStore from '../../store/useDevToolsStore'

const Header = () => {
  const { getTotalProgress, activeTab } = useDevToolsStore()
  const progress = getTotalProgress()
  const [showAchievement, setShowAchievement] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Show achievement when progress milestones are reached
  useEffect(() => {
    if (progress.overall > 0 && progress.overall % 25 === 0) {
      setShowAchievement(true)
      setTimeout(() => setShowAchievement(false), 3000)
    }
  }, [progress.overall])

  const achievements = [
    { threshold: 25, icon: Target, title: "Getting Started!", message: "You're on your way to mastering DevTools!" },
    { threshold: 50, icon: Zap, title: "Halfway There!", message: "You're becoming a DevTools expert!" },
    { threshold: 75, icon: Sparkles, title: "Almost Done!", message: "You're nearly a DevTools master!" },
    { threshold: 100, icon: Trophy, title: "DevTools Master!", message: "Congratulations! You've mastered all DevTools!" }
  ]

  const currentAchievement = achievements.find(a => a.threshold === progress.overall)

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && currentAchievement && (
          <motion.div
            className="fixed top-20 right-4 z-60 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-2xl max-w-sm"
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <currentAchievement.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{currentAchievement.title}</h4>
                <p className="text-xs opacity-90">{currentAchievement.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header 
        className="sticky top-0 z-50 bg-gradient-to-r from-dark-900/95 via-dark-800/95 to-dark-900/95 backdrop-blur-xl border-b border-gradient-to-r from-dark-700/30 via-brand-500/20 to-dark-700/30 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-to-br from-purple-500/10 to-green-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent blur-sm"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo and Title */}
            <motion.div 
              className="flex items-center space-x-5"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-brand-500/30 via-purple-500/30 to-green-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="relative bg-gradient-to-br from-brand-500 via-purple-500 to-brand-600 p-4 rounded-2xl shadow-2xl border border-white/10"
                  whileHover={{ 
                    rotate: [0, -15, 15, 0],
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)"
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <Code2 className="w-8 h-8 text-white drop-shadow-lg" />
                </motion.div>
                
                {/* Floating particles */}
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ 
                    y: [-5, -15, -5],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                  className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full"
                  animate={{ 
                    y: [5, 15, 5],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                />
              </div>
              
              <div className="space-y-1">
                <motion.h1 
                  className="text-3xl font-bold bg-gradient-to-r from-white via-brand-200 to-purple-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  DevTools Explorer
                </motion.h1>
                <motion.p 
                  className="text-dark-300 text-sm font-medium flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>FAANG-Level Interactive Learning Platform</span>
                </motion.p>
              </div>
            </motion.div>

            {/* Enhanced Stats and Progress */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Live Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {/* Current Time */}
                <motion.div 
                  className="group relative p-3 bg-dark-800/50 rounded-xl border border-dark-600/50 hover:border-brand-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-brand-400" />
                    <div>
                      <div className="text-xs text-dark-400">Time</div>
                      <div className="text-sm font-mono text-white font-bold">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Active Tab */}
                <motion.div 
                  className="group relative p-3 bg-dark-800/50 rounded-xl border border-dark-600/50 hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-xs text-dark-400">Active</div>
                      <div className="text-sm font-bold text-purple-300 capitalize">
                        {activeTab}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Progress */}
                <motion.div 
                  className="group relative p-3 bg-dark-800/50 rounded-xl border border-dark-600/50 hover:border-green-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <div className="flex-1">
                      <div className="text-xs text-dark-400 mb-1">Progress</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.overall}%` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-xs font-bold text-green-400">
                          {progress.overall}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Completion Stats */}
                <motion.div 
                  className="group relative p-3 bg-dark-800/50 rounded-xl border border-dark-600/50 hover:border-yellow-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <div>
                      <div className="text-xs text-dark-400">Completed</div>
                      <div className="text-sm font-bold text-yellow-300">
                        {progress.tutorials.completed + progress.challenges.completed}/
                        {progress.tutorials.total + progress.challenges.total}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                className="group relative overflow-hidden p-4 bg-gradient-to-r from-dark-800/60 to-dark-700/60 hover:from-gray-700/60 hover:to-gray-600/60 border border-dark-600/50 hover:border-gray-400/50 rounded-2xl backdrop-blur-sm transition-all duration-500"
                whileHover={{ scale: 1.1, y: -3, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://github.com/syedrahman24', '_blank')}
                title="View Syed Rahman's GitHub"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-400/20 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <Github className="relative w-6 h-6 text-dark-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-lg" />
              </motion.button>
              
              <motion.button
                className="group relative overflow-hidden p-4 bg-gradient-to-r from-dark-800/60 to-dark-700/60 hover:from-blue-700/60 hover:to-blue-600/60 border border-dark-600/50 hover:border-blue-400/50 rounded-2xl backdrop-blur-sm transition-all duration-500"
                whileHover={{ scale: 1.1, y: -3, rotateY: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'DevTools Explorer by Syed Rahman',
                      text: 'Learn browser developer tools interactively with FAANG-level UI!',
                      url: window.location.href
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                title="Share this amazing app"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ x: [100, -100] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <Share2 className="relative w-6 h-6 text-dark-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-lg" />
              </motion.button>

              <motion.div
                className="hidden sm:flex items-center space-x-3 px-5 py-3 bg-gradient-to-r from-brand-500/15 via-purple-500/15 to-green-500/15 border border-brand-500/30 rounded-2xl backdrop-blur-md shadow-lg"
                initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-brand-400" />
                </motion.div>
                <div className="text-left">
                  <div className="text-xs text-brand-300 font-medium">Quick Search</div>
                  <div className="text-xs text-dark-300">Press <kbd className="px-1 py-0.5 bg-dark-700/50 rounded text-xs">/</kbd> to search</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  )
}

export default Header
