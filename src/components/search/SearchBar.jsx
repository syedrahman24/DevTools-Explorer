import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Command, ArrowRight, Sparkles, Zap, Filter, TrendingUp, Cpu, Database, Globe, Code } from 'lucide-react'
import useDevToolsStore from '../../store/useDevToolsStore'
import { searchableContent } from '../../data/tutorialData'

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)
  
  const { 
    searchQuery, 
    setSearchQuery, 
    setSearchResults, 
    setIsSearching,
    setActiveTab 
  } = useDevToolsStore()

  // Handle search input changes
  const handleSearch = (query) => {
    setSearchQuery(query)
    
    if (query.trim().length > 0) {
      setIsSearching(true)
      
      // Filter searchable content
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      )
      
      setSearchResults(results)
      setSuggestions(results.slice(0, 5))
    } else {
      setIsSearching(false)
      setSearchResults([])
      setSuggestions([])
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setActiveTab(suggestion.tab)
    setSearchQuery('')
    setSuggestions([])
    setIsExpanded(false)
    inputRef.current?.blur()
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !isExpanded) {
        e.preventDefault()
        setIsExpanded(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
        setSearchQuery('')
        setSuggestions([])
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded, setSearchQuery])

  const popularSearches = [
    { term: "inspect element", icon: Code, category: "Elements", gradient: "from-blue-500 to-cyan-500" },
    { term: "console.log", icon: Command, category: "Console", gradient: "from-green-500 to-emerald-500" },
    { term: "network requests", icon: Globe, category: "Network", gradient: "from-purple-500 to-pink-500" },
    { term: "performance profiling", icon: Cpu, category: "Performance", gradient: "from-orange-500 to-red-500" },
    { term: "local storage", icon: Database, category: "Application", gradient: "from-yellow-500 to-amber-500" }
  ]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Enhanced Background Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-brand-500/15 via-purple-500/15 to-green-500/15 rounded-3xl blur-2xl"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 via-transparent to-pink-500/10 rounded-3xl blur-xl"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="relative"
        animate={{ 
          scale: isExpanded ? 1.02 : 1,
          y: isExpanded ? -2 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Search Input */}
        <div className="relative group">
          {/* Animated Search Icon */}
          <motion.div
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            animate={{ 
              rotate: isExpanded ? 360 : 0,
              scale: isExpanded ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Search className="w-5 h-5 text-brand-400" />
          </motion.div>
          
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="Search DevTools features, tutorials, and tips... (Press / to focus)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => {
              // Delay to allow suggestion clicks
              setTimeout(() => {
                if (!suggestions.length) setIsExpanded(false)
              }, 200)
            }}
            className={`
              w-full pl-14 pr-20 py-5 bg-gradient-to-r from-dark-800/90 via-dark-700/90 to-dark-800/90 
              backdrop-blur-xl border border-dark-600/50 rounded-3xl text-white placeholder-dark-300 
              focus:outline-none focus:ring-2 focus:ring-brand-400/60 focus:border-brand-400/60 
              transition-all duration-500 text-lg font-medium shadow-2xl
              ${isExpanded ? 'shadow-brand-500/20 border-brand-400/40 bg-dark-700/95' : 'hover:border-dark-500/70'}
            `}
            style={{
              background: isExpanded 
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.95))'
                : 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(51, 65, 85, 0.9))'
            }}
            whileFocus={{ scale: 1.005 }}
          />
          
          {/* Action Buttons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Search Stats */}
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-2 py-1 bg-brand-500/20 rounded-lg text-xs text-brand-400 font-medium"
                >
                  {suggestions.length} results
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Enhanced Clear Button */}
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  onClick={() => {
                    setSearchQuery('')
                    setSuggestions([])
                    inputRef.current?.focus()
                  }}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 p-3 text-dark-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <X className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search Suggestions & Popular Searches */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 bg-dark-800/95 backdrop-blur-xl border border-dark-600/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search Results */}
              {suggestions.length > 0 ? (
                <div className="p-4">
                  <div className="flex items-center space-x-2 px-2 py-2 mb-3">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span className="text-sm text-brand-400 font-medium">Search Results</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-brand-500/50 to-transparent" />
                  </div>
                  
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={`${suggestion.tab}-${index}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="group w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dark-700/50 transition-all duration-200 text-left border border-transparent hover:border-dark-600/50"
                        whileHover={{ x: 4, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                            <Search className="w-4 h-4 text-brand-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">
                              {suggestion.title}
                            </div>
                            <div className="text-xs text-dark-400 capitalize flex items-center space-x-1">
                              <span>in</span>
                              <span className="px-2 py-0.5 bg-dark-700 rounded text-xs font-medium">{suggestion.tab}</span>
                              <span>panel</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-brand-400 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Popular Searches */
                <div className="p-4">
                  <div className="flex items-center space-x-2 px-2 py-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400 font-medium">Popular Searches</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </div>
                  
                  <div className="mb-8">
                    <motion.h4 
                      className="text-lg font-bold text-white mb-4 flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Popular Searches
                      </span>
                    </motion.h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {popularSearches.map((search, index) => (
                        <motion.button
                          key={search.term}
                          onClick={() => {
                            setSearchQuery(search.term)
                            handleSearch(search.term)
                          }}
                          className="group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-dark-800/60 to-dark-700/60 border border-dark-600/30 hover:border-dark-500/50 transition-all duration-300 text-left"
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 20, rotateX: -15 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          {/* Gradient overlay */}
                          <motion.div 
                            className={`absolute inset-0 bg-gradient-to-r ${search.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                            initial={false}
                          />
                          
                          <div className="relative flex items-center space-x-3">
                            <motion.div 
                              className={`w-12 h-12 bg-gradient-to-br ${search.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <search.icon className="w-6 h-6 text-white drop-shadow-sm" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                                {search.term}
                              </div>
                              <div className="text-xs text-dark-400 group-hover:text-dark-300 transition-colors">
                                {search.category} Panel
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced Pro Tips */}
                  <motion.div 
                    className="mt-6 p-6 bg-gradient-to-br from-green-500/15 via-blue-500/15 to-purple-500/15 rounded-2xl border border-green-500/30 backdrop-blur-sm relative overflow-hidden"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Animated background */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-blue-400/5 to-purple-400/5"
                      animate={{ 
                        background: [
                          'linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))',
                          'linear-gradient(225deg, rgba(168, 85, 247, 0.05), rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))',
                          'linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6 text-green-400" />
                        </motion.div>
                        <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                          Pro Tips & Shortcuts
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-dark-200">
                            <kbd className="px-2 py-1 bg-dark-700/70 rounded-lg text-xs font-mono border border-dark-600">Ctrl+1-5</kbd>
                            <span>Switch DevTools tabs</span>
                          </div>
                          <div className="flex items-center space-x-2 text-dark-200">
                            <kbd className="px-2 py-1 bg-dark-700/70 rounded-lg text-xs font-mono border border-dark-600">/</kbd>
                            <span>Focus search instantly</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-dark-200">
                            <kbd className="px-2 py-1 bg-dark-700/70 rounded-lg text-xs font-mono border border-dark-600">ESC</kbd>
                            <span>Close search & modals</span>
                          </div>
                          <div className="flex items-center space-x-2 text-dark-200">
                            <kbd className="px-2 py-1 bg-dark-700/70 rounded-lg text-xs font-mono border border-dark-600">↑↓</kbd>
                            <span>Navigate suggestions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        <AnimatePresence>
          {isExpanded && searchQuery && suggestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-dark-800/95 backdrop-blur-md border border-dark-600 rounded-xl shadow-hard z-50"
            >
              <div className="p-4 text-center">
                <div className="text-dark-400 text-sm">
                  No results found for "{searchQuery}"
                </div>
                <div className="text-dark-500 text-xs mt-1">
                  Try searching for "DOM", "console", "network", etc.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick Tips */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center mt-3 space-x-4 text-xs text-dark-500"
        >
          <span>Press / to search</span>
          <span>•</span>
          <span>Ctrl+1-5 for tabs</span>
          <span>•</span>
          <span>ESC to close</span>
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar
