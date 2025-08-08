import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useDevToolsStore from '../store/useDevToolsStore'

const useKeyboardShortcuts = () => {
  const navigate = useNavigate()
  const { setActiveTab, preferences } = useDevToolsStore()

  useEffect(() => {
    if (!preferences.keyboardShortcutsEnabled) return

    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when user is typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }

      const { ctrlKey, metaKey, key } = event
      const isModifierPressed = ctrlKey || metaKey

      // Tab switching shortcuts (Ctrl/Cmd + 1-5)
      if (isModifierPressed && ['1', '2', '3', '4', '5'].includes(key)) {
        event.preventDefault()
        
        const tabMap = {
          '1': 'elements',
          '2': 'console', 
          '3': 'network',
          '4': 'performance',
          '5': 'application'
        }
        
        const targetTab = tabMap[key]
        if (targetTab) {
          setActiveTab(targetTab)
          navigate(`/${targetTab}`)
        }
      }

      // Additional shortcuts can be added here
      // For example:
      // - Ctrl+K for search focus
      // - Ctrl+Shift+C for console clear
      // - etc.
    }

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate, setActiveTab, preferences.keyboardShortcutsEnabled])
}

export default useKeyboardShortcuts
