import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Code2, Terminal, Wifi, Zap, Database } from 'lucide-react'
import useDevToolsStore from '../../store/useDevToolsStore'

const tabs = [
  { id: 'elements', name: 'Elements', icon: Code2, color: 'blue' },
  { id: 'console', name: 'Console', icon: Terminal, color: 'green' },
  { id: 'network', name: 'Network', icon: Wifi, color: 'purple' },
  { id: 'performance', name: 'Performance', icon: Zap, color: 'yellow' },
  { id: 'application', name: 'Application', icon: Database, color: 'orange' },
]

const colorMap = {
  blue: 'border-blue-500 text-blue-400 bg-blue-500/10',
  green: 'border-green-500 text-green-400 bg-green-500/10',
  purple: 'border-purple-500 text-purple-400 bg-purple-500/10',
  yellow: 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
  orange: 'border-orange-500 text-orange-400 bg-orange-500/10',
}

const TabNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { activeTab, setActiveTab, getTabProgress } = useDevToolsStore()
  
  const currentTab = location.pathname.slice(1) || 'elements'

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    navigate(`/${tabId}`)
  }

  return (
    <div className="flex items-center space-x-1 overflow-x-auto scrollbar-thin scrollbar-track-dark-800 scrollbar-thumb-dark-600">
      {tabs.map((tab, index) => {
        const isActive = currentTab === tab.id
        const progress = getTabProgress(tab.id)
        const Icon = tab.icon

        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              relative flex items-center space-x-2 px-4 py-3 rounded-t-lg border-b-2 transition-all duration-200 whitespace-nowrap
              ${isActive 
                ? `${colorMap[tab.color]} border-b-2` 
                : 'text-dark-400 hover:text-white hover:bg-dark-800 border-transparent'
              }
            `}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Tab Icon */}
            <Icon className="w-4 h-4" />
            
            {/* Tab Name */}
            <span className="font-medium text-sm">{tab.name}</span>
            
            {/* Progress Indicator */}
            {progress.overallCompleted && (
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* Active Tab Indicator */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* Hover Glow Effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-t-lg opacity-20"
                style={{ 
                  background: `linear-gradient(135deg, ${tab.color === 'blue' ? '#3b82f6' : 
                    tab.color === 'green' ? '#10b981' : 
                    tab.color === 'purple' ? '#8b5cf6' : 
                    tab.color === 'yellow' ? '#f59e0b' : '#f97316'} 0%, transparent 100%)`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        )
      })}
      
      {/* Keyboard Shortcuts Hint */}
      <div className="hidden lg:flex items-center ml-6 px-3 py-2 bg-dark-800/50 rounded-lg">
        <span className="text-xs text-dark-500">
          Ctrl+1-5 to switch tabs
        </span>
      </div>
    </div>
  )
}

export default TabNavigation
