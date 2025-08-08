export const tutorialData = {
  elements: {
    title: "Elements Panel",
    description: "Learn to inspect and manipulate the DOM structure",
    icon: "Code2",
    color: "blue",
    steps: [
      {
        id: 0,
        title: "Welcome to Elements Panel",
        content: "The Elements panel shows the HTML structure of your webpage. You can inspect, edit, and debug your DOM here.",
        code: `<div class="container">
  <h1>Hello World</h1>
  <p>This is a paragraph</p>
</div>`,
        highlights: ["DOM tree", "HTML elements", "CSS styles"],
        proTip: "Use Ctrl+Shift+C to quickly inspect any element on a webpage"
      },
      {
        id: 1,
        title: "Inspecting Elements",
        content: "Click on any element in the DOM tree to select it. The selected element will be highlighted on the page.",
        code: `<!-- Click on this element -->
<button class="btn primary">
  Click me!
</button>`,
        highlights: ["Element selection", "DOM navigation", "Element highlighting"],
        proTip: "Right-click any element and choose 'Inspect' to jump directly to it"
      },
      {
        id: 2,
        title: "Editing HTML",
        content: "Double-click on any HTML tag or text to edit it directly. Changes are applied immediately.",
        code: `<h1>Original Title</h1>
<!-- Double-click to edit -->
<h1>New Title</h1>`,
        highlights: ["Live editing", "HTML modification", "Real-time updates"],
        proTip: "Press F2 or double-click to edit element content quickly"
      },
      {
        id: 3,
        title: "CSS Styles Panel",
        content: "The Styles panel shows all CSS rules applied to the selected element. You can edit, add, or disable styles.",
        code: `.btn {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}`,
        highlights: ["CSS rules", "Style inheritance", "Computed styles"],
        proTip: "Click the checkbox next to any CSS property to toggle it on/off"
      },
      {
        id: 4,
        title: "Box Model Visualization",
        content: "The box model shows margin, border, padding, and content dimensions of the selected element.",
        code: `/* Box model example */
.element {
  margin: 20px;
  padding: 15px;
  border: 2px solid #ccc;
  width: 200px;
  height: 100px;
}`,
        highlights: ["Box model", "Margin", "Padding", "Border", "Content"],
        proTip: "Hover over the box model diagram to highlight different areas on the page"
      }
    ],
    challenge: {
      title: "Elements Challenge",
      description: "Complete these tasks to master the Elements panel",
      tasks: [
        "Inspect the header element",
        "Change the text content of a paragraph",
        "Add a new CSS class to an element",
        "Toggle a CSS property on/off"
      ]
    }
  },
  
  console: {
    title: "Console Panel",
    description: "Execute JavaScript, debug errors, and log information",
    icon: "Terminal",
    color: "green",
    steps: [
      {
        id: 0,
        title: "Welcome to Console",
        content: "The Console is your JavaScript playground. Execute code, debug errors, and interact with your webpage.",
        code: `console.log("Hello, DevTools!");
console.warn("This is a warning");
console.error("This is an error");`,
        highlights: ["JavaScript execution", "Console methods", "Debugging"],
        proTip: "Use console.table() to display arrays and objects in a nice table format"
      },
      {
        id: 1,
        title: "Executing JavaScript",
        content: "Type JavaScript code directly in the console and press Enter to execute it immediately.",
        code: `// Try these commands:
2 + 2
Math.random()
new Date()
document.title`,
        highlights: ["Code execution", "Immediate results", "DOM interaction"],
        proTip: "Use the up/down arrow keys to navigate through command history"
      },
      {
        id: 2,
        title: "Debugging with Console",
        content: "Use various console methods to debug your code and understand what's happening.",
        code: `// Debugging methods
console.log("Debug info:", variable);
console.time("Performance test");
console.timeEnd("Performance test");
console.trace("Stack trace");`,
        highlights: ["Debug methods", "Performance timing", "Stack traces"],
        proTip: "Use console.clear() to clear the console output"
      },
      {
        id: 3,
        title: "Error Handling",
        content: "The console shows JavaScript errors with line numbers and stack traces to help you debug.",
        code: `// This will cause an error
try {
  undefinedFunction();
} catch (error) {
  console.error("Caught error:", error.message);
}`,
        highlights: ["Error messages", "Stack traces", "Error handling"],
        proTip: "Click on error line numbers to jump directly to the source code"
      }
    ],
    challenge: {
      title: "Console Challenge",
      description: "Master the console with these interactive tasks",
      tasks: [
        "Execute a mathematical calculation",
        "Log the current page title",
        "Create and log an array of numbers",
        "Use console.time to measure execution time"
      ]
    }
  },
  
  network: {
    title: "Network Panel",
    description: "Monitor network requests, responses, and performance",
    icon: "Wifi",
    color: "purple",
    steps: [
      {
        id: 0,
        title: "Welcome to Network Panel",
        content: "The Network panel shows all network requests made by your webpage, including timing and response data.",
        code: `// Network request example
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));`,
        highlights: ["HTTP requests", "Response data", "Network timing"],
        proTip: "Use Ctrl+R to reload and capture all network requests from page load"
      },
      {
        id: 1,
        title: "Request Types",
        content: "Different types of requests are color-coded: HTML (blue), CSS (purple), JS (yellow), Images (green), XHR (red).",
        code: `<!-- Different request types -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
<img src="image.jpg" alt="Example">`,
        highlights: ["Request types", "Color coding", "Resource loading"],
        proTip: "Filter requests by type using the filter buttons at the top"
      },
      {
        id: 2,
        title: "Request Details",
        content: "Click on any request to see detailed information including headers, response, timing, and cookies.",
        code: `// Request headers example
{
  "Content-Type": "application/json",
  "Authorization": "Bearer token123",
  "User-Agent": "Mozilla/5.0..."
}`,
        highlights: ["Request headers", "Response headers", "Request payload"],
        proTip: "Right-click requests to copy as cURL, fetch, or other formats"
      },
      {
        id: 3,
        title: "Network Timing",
        content: "The timing tab shows detailed breakdown of request phases: DNS lookup, connection, SSL, sending, waiting, receiving.",
        code: `// Timing phases:
// DNS Lookup: 2ms
// Initial Connection: 15ms
// SSL: 45ms
// Request Sent: 1ms
// Waiting (TTFB): 120ms
// Content Download: 8ms`,
        highlights: ["DNS lookup", "Connection time", "TTFB", "Download time"],
        proTip: "Look for long waiting times to identify server performance issues"
      },
      {
        id: 4,
        title: "Network Throttling",
        content: "Test your site's performance under different network conditions using the throttling dropdown.",
        code: `// Network conditions:
// Fast 3G: 1.6 Mbps down, 750 Kbps up
// Slow 3G: 400 Kbps down, 400 Kbps up
// Offline: No network connection`,
        highlights: ["Network throttling", "Performance testing", "Mobile simulation"],
        proTip: "Always test your site with throttling to ensure good mobile experience"
      },
      {
        id: 5,
        title: "Caching and Headers",
        content: "Understand caching behavior by examining cache-related headers and the 'Disable cache' option.",
        code: `// Cache headers
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
If-None-Match: "abc123"`,
        highlights: ["Cache headers", "ETags", "Cache validation"],
        proTip: "Enable 'Disable cache' while developing to always get fresh resources"
      }
    ],
    challenge: {
      title: "Network Challenge",
      description: "Master network monitoring with these tasks",
      tasks: [
        "Identify the largest resource by size",
        "Find requests that took longest to complete",
        "Filter to show only failed requests",
        "Export network data as HAR file"
      ]
    }
  },
  
  performance: {
    title: "Performance Panel",
    description: "Analyze runtime performance and optimize your application",
    icon: "Zap",
    color: "yellow",
    steps: [
      {
        id: 0,
        title: "Welcome to Performance Panel",
        content: "The Performance panel helps you analyze your app's runtime performance, including CPU usage, memory, and rendering.",
        code: `// Performance measurement
performance.mark('start-operation');
// ... some operation
performance.mark('end-operation');
performance.measure('operation-time', 'start-operation', 'end-operation');`,
        highlights: ["Performance profiling", "CPU analysis", "Memory usage"],
        proTip: "Record performance while interacting with your app to capture real usage patterns"
      },
      {
        id: 1,
        title: "Recording Performance",
        content: "Click the record button to start capturing performance data. Interact with your app, then stop recording.",
        code: `// What gets recorded:
// - JavaScript execution
// - Rendering and painting
// - Network requests
// - User interactions
// - Memory allocations`,
        highlights: ["Performance recording", "User interactions", "Runtime analysis"],
        proTip: "Keep recordings short (5-10 seconds) to make analysis easier"
      },
      {
        id: 2,
        title: "Flame Chart Analysis",
        content: "The flame chart shows function call stacks over time. Wider bars indicate longer execution times.",
        code: `// Function call stack example
function slowFunction() {
  // This function takes 100ms
  for (let i = 0; i < 1000000; i++) {
    // CPU-intensive work
  }
}`,
        highlights: ["Flame chart", "Call stacks", "Execution time"],
        proTip: "Look for wide bars in the flame chart - these are performance bottlenecks"
      },
      {
        id: 3,
        title: "Core Web Vitals",
        content: "Monitor Core Web Vitals: LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift).",
        code: `// Core Web Vitals thresholds:
// LCP: < 2.5s (good), < 4s (needs improvement)
// FID: < 100ms (good), < 300ms (needs improvement)  
// CLS: < 0.1 (good), < 0.25 (needs improvement)`,
        highlights: ["Core Web Vitals", "LCP", "FID", "CLS"],
        proTip: "Focus on improving Core Web Vitals for better user experience and SEO"
      },
      {
        id: 4,
        title: "Memory and Rendering",
        content: "Analyze memory usage patterns and rendering performance to identify leaks and jank.",
        code: `// Memory optimization
// - Avoid global variables
// - Remove event listeners
// - Clear intervals/timeouts
// - Minimize DOM manipulations`,
        highlights: ["Memory leaks", "Rendering performance", "DOM optimization"],
        proTip: "Use the Memory tab to take heap snapshots and compare memory usage over time"
      }
    ],
    challenge: {
      title: "Performance Challenge",
      description: "Optimize performance with these analysis tasks",
      tasks: [
        "Record a performance profile",
        "Identify the slowest function in the flame chart",
        "Measure Core Web Vitals scores",
        "Find potential memory leaks"
      ]
    }
  },
  
  application: {
    title: "Application Panel",
    description: "Manage storage, service workers, and progressive web app features",
    icon: "Database",
    color: "orange",
    steps: [
      {
        id: 0,
        title: "Welcome to Application Panel",
        content: "The Application panel manages local storage, cookies, service workers, and other web app features.",
        code: `// Local storage example
localStorage.setItem('user', 'john_doe');
localStorage.getItem('user');
localStorage.removeItem('user');
localStorage.clear();`,
        highlights: ["Local storage", "Session storage", "Cookies", "Service workers"],
        proTip: "Use Application panel to debug storage issues and PWA functionality"
      },
      {
        id: 1,
        title: "Storage Management",
        content: "View and edit localStorage, sessionStorage, and IndexedDB data directly in the browser.",
        code: `// Different storage types
localStorage.setItem('theme', 'dark');
sessionStorage.setItem('temp', 'data');
document.cookie = 'user=john; path=/';`,
        highlights: ["localStorage", "sessionStorage", "IndexedDB", "Cookies"],
        proTip: "Right-click storage items to edit, delete, or clear all data"
      },
      {
        id: 2,
        title: "Service Workers",
        content: "Monitor and debug service workers for offline functionality and background sync.",
        code: `// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW registration failed'));
}`,
        highlights: ["Service workers", "Offline functionality", "Background sync"],
        proTip: "Use the 'Update on reload' checkbox to always get the latest service worker during development"
      },
      {
        id: 3,
        title: "Progressive Web App",
        content: "Check PWA manifest, installability, and app-like features of your web application.",
        code: `// PWA manifest example
{
  "name": "DevTools Explorer",
  "short_name": "DevTools",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0ea5e9",
  "background_color": "#0f172a"
}`,
        highlights: ["PWA manifest", "App installation", "Standalone mode"],
        proTip: "Test PWA installation by clicking 'Add to Home Screen' in the manifest section"
      }
    ],
    challenge: {
      title: "Application Challenge",
      description: "Master application storage and PWA features",
      tasks: [
        "Store and retrieve data from localStorage",
        "Inspect and modify cookie values",
        "Check PWA manifest validity",
        "Test service worker functionality"
      ]
    }
  }
}

export const searchableContent = [
  // Elements
  { tab: 'elements', title: 'DOM inspection', content: 'inspect HTML elements DOM tree structure' },
  { tab: 'elements', title: 'CSS editing', content: 'edit CSS styles properties live editing' },
  { tab: 'elements', title: 'Box model', content: 'margin padding border content dimensions' },
  
  // Console
  { tab: 'console', title: 'JavaScript execution', content: 'run JavaScript code console commands' },
  { tab: 'console', title: 'Debugging', content: 'console.log debug errors stack trace' },
  { tab: 'console', title: 'Console methods', content: 'console.warn console.error console.table' },
  
  // Network
  { tab: 'network', title: 'HTTP requests', content: 'network requests responses headers timing' },
  { tab: 'network', title: 'Network throttling', content: 'slow 3G fast 3G offline testing' },
  { tab: 'network', title: 'Caching', content: 'cache headers ETags cache validation' },
  
  // Performance
  { tab: 'performance', title: 'Performance profiling', content: 'CPU usage memory flame chart' },
  { tab: 'performance', title: 'Core Web Vitals', content: 'LCP FID CLS performance metrics' },
  { tab: 'performance', title: 'Memory analysis', content: 'memory leaks heap snapshots' },
  
  // Application
  { tab: 'application', title: 'Local storage', content: 'localStorage sessionStorage data storage' },
  { tab: 'application', title: 'Service workers', content: 'offline functionality background sync PWA' },
  { tab: 'application', title: 'Cookies', content: 'HTTP cookies session management' },
]
