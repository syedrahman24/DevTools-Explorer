import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Github, 
  Twitter, 
  Linkedin, 
  Code2, 
  Star, 
  Users, 
  Zap,
  ArrowUp,
  Sparkles,
  Award,
  Coffee,
  Globe,
  Mail,
  ExternalLink,
  Briefcase
} from 'lucide-react'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stats = [
    { icon: Users, label: 'Learners', value: '15K+', color: 'from-blue-400 to-blue-600' },
    { icon: Code2, label: 'Tutorials', value: '25+', color: 'from-green-400 to-green-600' },
    { icon: Zap, label: 'Challenges', value: '15+', color: 'from-yellow-400 to-yellow-600' },
    { icon: Star, label: 'GitHub Stars', value: '3.2K+', color: 'from-purple-400 to-purple-600' }
  ]

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/syedrahman24', 
      label: 'GitHub',
      color: 'hover:bg-gray-800',
      gradient: 'from-gray-400 to-gray-600'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/syedabdurrahmanuddin/', 
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      icon: Mail, 
      href: 'mailto:rahmansyed862@gmail.com', 
      label: 'Email',
      color: 'hover:bg-green-600',
      gradient: 'from-green-400 to-green-600'
    },
    { 
      icon: Globe, 
      href: 'https://syedrahman.dev', 
      label: 'Portfolio',
      color: 'hover:bg-purple-600',
      gradient: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-full shadow-2xl hover:shadow-brand-500/25 transition-all duration-300"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.footer 
        className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border-t border-dark-700/30 mt-auto overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-16">
          {/* Hero Stats Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-full h-full bg-dark-800 rounded-2xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="text-3xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-dark-400 text-sm font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Brand Section */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <motion.div 
                className="relative group"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/40 via-purple-500/40 to-green-500/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-brand-500 via-purple-500 to-brand-600 p-5 rounded-3xl shadow-2xl border border-white/10">
                  <Code2 className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </motion.div>
              <div className="text-left">
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-white via-brand-300 to-purple-300 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  DevTools Explorer
                </motion.h3>
                <motion.p 
                  className="text-dark-300 text-xl font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Master developer tools like a FAANG engineer
                </motion.p>
              </div>
            </div>
            
            <motion.div 
              className="mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-dark-200 text-xl leading-relaxed mb-6">
                Learn browser developer tools through interactive tutorials, hands-on challenges, 
                and real-world examples. Built with enterprise-grade architecture and FAANG-level polish.
              </p>
              
              {/* Developer Credit */}
              <motion.div 
                className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-dark-800/50 via-dark-700/50 to-dark-800/50 rounded-2xl border border-dark-600/30 backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Briefcase className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-dark-300 text-sm font-medium">Crafted by</span>
                      <Award className="w-4 h-4 text-yellow-400" />
                    </div>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-brand-300 bg-clip-text text-transparent">
                      Syed Rahman
                    </h4>
                    <p className="text-brand-400 text-sm font-medium">Full-Stack Developer</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-dark-400">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs">Powered by passion & coffee</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div 
              className="flex items-center justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 30, rotateY: -90 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                    
                    {/* Button */}
                    <div className={`relative p-5 rounded-2xl bg-dark-800/60 border border-dark-600/50 hover:border-dark-400 backdrop-blur-sm transition-all duration-300 ${social.color}`}>
                      <Icon className="w-7 h-7 text-dark-400 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-lg" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-dark-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                      {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-700" />
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Built with Love - Enhanced */}
            <motion.div 
              className="flex flex-col items-center space-y-4 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center justify-center space-x-3 text-dark-300">
                <span className="text-lg">Built with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6 text-red-400" />
                </motion.div>
                <span className="text-lg">and</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <span className="text-lg">for the developer community</span>
              </div>
              
              <motion.div 
                className="flex items-center space-x-4 text-sm text-dark-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center space-x-1">
                  <Code2 className="w-4 h-4" />
                  <span>React 18</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>Framer Motion</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>TailwindCSS</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Bottom Bar */}
          <motion.div 
            className="pt-12 mt-8 border-t border-gradient-to-r from-transparent via-dark-600/50 to-transparent text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <motion.p 
                className="text-dark-400 text-sm flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <span>© 2025 DevTools Explorer by</span>
                <span className="font-semibold text-brand-400">Syed Rahman</span>
                <span>• All rights reserved</span>
              </motion.p>
              
              <motion.div 
                className="flex items-center space-x-4 text-xs text-dark-500"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
              >
                <motion.a 
                  href="#privacy" 
                  className="hover:text-brand-400 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  Privacy Policy
                </motion.a>
                <span>•</span>
                <motion.a 
                  href="#terms" 
                  className="hover:text-brand-400 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  Terms of Service
                </motion.a>
                <span>•</span>
                <motion.span 
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <span>Made in</span>
                  <span className="text-green-400">🇧🇩</span>
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  )
}

export default Footer
