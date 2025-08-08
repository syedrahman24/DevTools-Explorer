import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useDevToolsStore = create(
  persist(
    (set, get) => ({
      // Current active tab
      activeTab: 'elements',
      
      // Tutorial progress for each tab
      tutorialProgress: {
        elements: { currentStep: 0, completed: false, totalSteps: 5 },
        console: { currentStep: 0, completed: false, totalSteps: 4 },
        network: { currentStep: 0, completed: false, totalSteps: 6 },
        performance: { currentStep: 0, completed: false, totalSteps: 5 },
        application: { currentStep: 0, completed: false, totalSteps: 4 },
      },
      
      // Search state
      searchQuery: '',
      searchResults: [],
      isSearching: false,
      
      // Challenge completion status
      challengeProgress: {
        elements: false,
        console: false,
        network: false,
        performance: false,
        application: false,
      },
      
      // User preferences
      preferences: {
        showProTips: true,
        autoAdvanceTutorials: false,
        keyboardShortcutsEnabled: true,
      },
      
      // Console output for interactive code
      consoleOutput: [],
      
      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSearchResults: (results) => set({ searchResults: results }),
      
      setIsSearching: (isSearching) => set({ isSearching }),
      
      // Tutorial progress actions
      nextTutorialStep: (tab) => set((state) => {
        const currentProgress = state.tutorialProgress[tab]
        const nextStep = Math.min(currentProgress.currentStep + 1, currentProgress.totalSteps - 1)
        const completed = nextStep === currentProgress.totalSteps - 1
        
        return {
          tutorialProgress: {
            ...state.tutorialProgress,
            [tab]: {
              ...currentProgress,
              currentStep: nextStep,
              completed,
            }
          }
        }
      }),
      
      prevTutorialStep: (tab) => set((state) => {
        const currentProgress = state.tutorialProgress[tab]
        const prevStep = Math.max(currentProgress.currentStep - 1, 0)
        
        return {
          tutorialProgress: {
            ...state.tutorialProgress,
            [tab]: {
              ...currentProgress,
              currentStep: prevStep,
              completed: false,
            }
          }
        }
      }),
      
      resetTutorialProgress: (tab) => set((state) => ({
        tutorialProgress: {
          ...state.tutorialProgress,
          [tab]: {
            ...state.tutorialProgress[tab],
            currentStep: 0,
            completed: false,
          }
        }
      })),
      
      // Challenge actions
      completeChallenge: (tab) => set((state) => ({
        challengeProgress: {
          ...state.challengeProgress,
          [tab]: true,
        }
      })),
      
      resetChallenge: (tab) => set((state) => ({
        challengeProgress: {
          ...state.challengeProgress,
          [tab]: false,
        }
      })),
      
      // Console actions
      addConsoleOutput: (output) => set((state) => ({
        consoleOutput: [...state.consoleOutput, {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...output
        }]
      })),
      
      clearConsoleOutput: () => set({ consoleOutput: [] }),
      
      // Preferences actions
      updatePreferences: (newPreferences) => set((state) => ({
        preferences: {
          ...state.preferences,
          ...newPreferences,
        }
      })),
      
      // Computed getters
      getTotalProgress: () => {
        const { tutorialProgress, challengeProgress } = get()
        const totalTutorials = Object.values(tutorialProgress).length
        const completedTutorials = Object.values(tutorialProgress).filter(p => p.completed).length
        const totalChallenges = Object.values(challengeProgress).length
        const completedChallenges = Object.values(challengeProgress).filter(Boolean).length
        
        return {
          tutorials: { completed: completedTutorials, total: totalTutorials },
          challenges: { completed: completedChallenges, total: totalChallenges },
          overall: Math.round(((completedTutorials + completedChallenges) / (totalTutorials + totalChallenges)) * 100)
        }
      },
      
      getTabProgress: (tab) => {
        const { tutorialProgress, challengeProgress } = get()
        const tutorial = tutorialProgress[tab]
        const challenge = challengeProgress[tab]
        
        return {
          tutorialProgress: Math.round((tutorial.currentStep / (tutorial.totalSteps - 1)) * 100),
          tutorialCompleted: tutorial.completed,
          challengeCompleted: challenge,
          overallCompleted: tutorial.completed && challenge,
        }
      },
    }),
    {
      name: 'devtools-explorer-storage',
      partialize: (state) => ({
        tutorialProgress: state.tutorialProgress,
        challengeProgress: state.challengeProgress,
        preferences: state.preferences,
      }),
    }
  )
)

export default useDevToolsStore
