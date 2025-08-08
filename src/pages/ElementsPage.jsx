import React from 'react'
import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import TutorialCard from '../components/tutorial/TutorialCard'
import Challenge from '../components/challenge/Challenge'
import CodeRunner from '../components/interactive/CodeRunner'
import useDevToolsStore from '../store/useDevToolsStore'
import { tutorialData } from '../data/tutorialData'

const ElementsPage = () => {
  const { 
    tutorialProgress, 
    nextTutorialStep, 
    prevTutorialStep, 
    preferences 
  } = useDevToolsStore()
  
  const currentProgress = tutorialProgress.elements
  const currentStep = tutorialData.elements.steps[currentProgress.currentStep]
  const isLastStep = currentProgress.currentStep === tutorialData.elements.steps.length - 1

  const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sample Page</title>
  <style>
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #007bff; color: white; padding: 20px; border-radius: 8px; }
    .content { margin: 20px 0; }
    .btn { background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    .btn:hover { background: #218838; }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Welcome to DevTools Explorer</h1>
      <p>Learn to inspect and modify HTML elements</p>
    </header>
    
    <main class="content">
      <h2>Interactive Demo</h2>
      <p>This is a sample paragraph that you can inspect and modify.</p>
      <button class="btn" onclick="alert('Button clicked!')">Click Me</button>
      
      <div style="margin-top: 20px;">
        <h3>List Example</h3>
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    </main>
  </div>
</body>
</html>`

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Elements Panel</h1>
            <p className="text-dark-400">Inspect and manipulate the DOM structure</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tutorial Section */}
        <div className="space-y-6">
          <TutorialCard
            step={currentStep}
            currentStep={currentProgress.currentStep}
            totalSteps={tutorialData.elements.steps.length}
            onNext={() => nextTutorialStep('elements')}
            onPrev={() => prevTutorialStep('elements')}
            showProTips={preferences.showProTips}
          />

          {/* Challenge Section - Show after completing tutorial */}
          {isLastStep && (
            <Challenge 
              challenge={tutorialData.elements.challenge}
              tabId="elements"
            />
          )}
        </div>

        {/* Interactive Demo Section */}
        <div className="space-y-6">
          {/* DOM Tree Visualization */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span>DOM Tree Structure</span>
            </h3>
            
            <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="space-y-1 text-dark-200">
                <div className="text-purple-400">html</div>
                <div className="ml-4">
                  <div className="text-purple-400">head</div>
                  <div className="ml-8 text-green-400">title</div>
                  <div className="ml-8 text-green-400">style</div>
                </div>
                <div className="ml-4">
                  <div className="text-purple-400">body</div>
                  <div className="ml-8">
                    <div className="text-purple-400">div.container</div>
                    <div className="ml-12">
                      <div className="text-purple-400">header.header</div>
                      <div className="ml-16 text-green-400">h1</div>
                      <div className="ml-16 text-green-400">p</div>
                    </div>
                    <div className="ml-12">
                      <div className="text-purple-400">main.content</div>
                      <div className="ml-16 text-green-400">h2</div>
                      <div className="ml-16 text-green-400">p</div>
                      <div className="ml-16 text-blue-400">button.btn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-dark-400">
              <p>💡 In real DevTools, you can click on any element to inspect it and see its styles, attributes, and computed properties.</p>
            </div>
          </motion.div>

          {/* CSS Styles Panel */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Styles Panel</h3>
            
            <div className="space-y-4">
              <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-2">element.style</div>
                <div className="font-mono text-sm text-green-400">
                  background-color: #007bff;<br/>
                  color: white;<br/>
                  padding: 20px;<br/>
                  border-radius: 8px;
                </div>
              </div>
              
              <div className="bg-dark-900/90 border border-dark-700 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-2">.header</div>
                <div className="font-mono text-sm text-blue-400">
                  background: #007bff;<br/>
                  color: white;<br/>
                  padding: 20px;<br/>
                  border-radius: 8px;
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-dark-400">
              <p>💡 Click the checkbox next to any property to toggle it on/off. Double-click values to edit them.</p>
            </div>
          </motion.div>

          {/* Interactive Code Editor */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Try It Yourself</h3>
            <CodeRunner
              initialCode={`// Try these DOM manipulation commands:
document.querySelector('h1').textContent = 'New Title';
document.querySelector('.btn').style.backgroundColor = 'red';
document.querySelector('p').innerHTML = '<strong>Bold text!</strong>';

// Log element information
console.log('Page title:', document.title);
console.log('All paragraphs:', document.querySelectorAll('p').length);`}
              language="javascript"
              showConsole={true}
            />
          </motion.div>
        </div>
      </div>

      {/* Sample HTML Preview */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Sample HTML Structure</h3>
        <CodeRunner
          initialCode={sampleHTML}
          language="html"
          readOnly={true}
          showConsole={false}
        />
        <div className="mt-4 text-sm text-dark-400">
          <p>💡 This is the HTML structure you would see in the Elements panel. In real DevTools, you can expand/collapse elements and see the full DOM tree.</p>
        </div>
      </motion.div>
    </div>
  )
}

export default ElementsPage
