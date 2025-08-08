import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import TabNavigation from './components/navigation/TabNavigation'
import SearchBar from './components/search/SearchBar'
import ElementsPage from './pages/ElementsPage'
import ConsolePage from './pages/ConsolePage'
import NetworkPage from './pages/NetworkPage'
import PerformancePage from './pages/PerformancePage'
import ApplicationPage from './pages/ApplicationPage'
import useDevToolsStore from './store/useDevToolsStore'
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'

function App() {
  const { activeTab, setActiveTab, preferences } = useDevToolsStore()
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts()
  
  // Handle tab switching via URL
  useEffect(() => {
    const path = window.location.pathname.slice(1)
    if (path && ['elements', 'console', 'network', 'performance', 'application'].includes(path)) {
      setActiveTab(path)
    }
  }, [setActiveTab])

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Header */}
      <Header />
      
      {/* Search Bar */}
      <motion.div 
        className="sticky top-16 z-40 bg-dark-950/80 backdrop-blur-md border-b border-dark-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-3">
          <SearchBar />
        </div>
      </motion.div>
      
      {/* Tab Navigation */}
      <motion.div 
        className="sticky top-28 z-30 bg-dark-900/90 backdrop-blur-md border-b border-dark-700"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <TabNavigation />
        </div>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Routes>
            <Route path="/" element={<Navigate to="/elements" replace />} />
            <Route path="/elements" element={<ElementsPage />} />
            <Route path="/console" element={<ConsolePage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/application" element={<ApplicationPage />} />
            <Route path="*" element={<Navigate to="/elements" replace />} />
          </Routes>
        </motion.div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
