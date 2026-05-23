---
title: "React Performance Optimization: Beyond Memoization"
date: "2026-05-23"
description: "Real-world React performance patterns - when to optimize, what actually works, and avoiding premature optimization"
tags: ["react", "performance", "optimization", "rendering"]
---

## The Performance Awakening

After building a React app that started lagging, I learned that performance optimization isn't about adding `React.memo` everywhere. It's about understanding when and why components re-render, and fixing the actual bottlenecks.

## Understanding React Rendering

### When Components Re-Render

```javascript
// Component re-renders when:
// 1. State changes
// 2. Props change
// 3. Parent re-renders (by default)

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("John")

  // This component re-renders when either state changes
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setName("Jane")}>Change Name</button>
    </div>
  )
}
```

## React.memo: When It Helps

### Basic Usage

```javascript
// Not useful for primitive props
const ExpensiveComponent = React.memo(({ count }) => {
  // Expensive computation
  const result = expensiveCalculation()
  return <div>{result}</div>
})

// Parent re-renders don't cause child to re-render IF props haven't changed
function Parent() {
  const [otherState, setOtherState] = useState(0)
  return (
    <div>
      <button onClick={() => setOtherState(otherState + 1)}>Other State</button>
      <ExpensiveComponent count={5} /> {/* Won't re-render when otherState changes */}
    </div>
  )
}
```

### With Object/Function Props

```javascript
// Problem - new object created every render
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <ExpensiveComponent
      user={{ name: "John" }} // New object every render!
      onClick={() => {}} // New function every render!
    />
  )
}

// Solution - Move outside or use useMemo/useCallback
function Parent() {
  const [count, setCount] = useState(0)
  const user = useMemo(() => ({ name: "John" }), [])
  const handleClick = useCallback(() => {
    // Handler logic
  }, [])

  return <ExpensiveComponent user={user} onClick={handleClick} />
}

// Alternative - Custom comparison function
const ExpensiveComponent = React.memo(
  ({ user, onClick }) => {
    return <div>{user.name}</div>
  },
  (prevProps, nextProps) => {
    return prevProps.user.name === nextProps.user.name
  }
)
```

## useMemo and useCallback

### useMemo for Expensive Calculations

```javascript
// Recalculates on every render
function ExpensiveList({ items }) {
  const sortedItems = items.sort((a, b) => a.value - b.value)
  const filteredItems = sortedItems.filter(item => item.active)
  const transformedItems = filteredItems.map(item => ({
    ...item,
    displayValue: item.value * 2,
  }))

  return (
    <ul>
      {transformedItems.map(item => (
        <li key={item.id}>{item.displayValue}</li>
      ))}
    </ul>
  )
}

// Memoize expensive calculations
function ExpensiveList({ items }) {
  const transformedItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .sort((a, b) => a.value - b.value)
      .map(item => ({
        ...item,
        displayValue: item.value * 2,
      }))
  }, [items]) // Only recalculate when items change

  return (
    <ul>
      {transformedItems.map(item => (
        <li key={item.id}>{item.displayValue}</li>
      ))}
    </ul>
  )
}
```

### useCallback for Function Props

```javascript
// New function created every render
function Parent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("John")

  const handleClick = () => {
    console.log("Clicked")
  }

  return (
    <div>
      <ChildComponent onClick={handleClick} /> {/* New function every render */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

// Memoize function to prevent recreation
function Parent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("John")

  const handleClick = useCallback(() => {
    console.log("Clicked")
  }, []) // Function never changes

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}
```

## Code Splitting and Lazy Loading

### React.lazy for Route-Based Splitting

```javascript
import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Lazy load components
const Dashboard = lazy(() => import("./Dashboard"))
const Profile = lazy(() => import("./Profile"))
const Settings = lazy(() => import("./Settings"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

### Component-Level Lazy Loading

```javascript
function ModalWrapper({ isOpen, children }) {
  const [Modal, setModal] = useState(null)

  useEffect(() => {
    if (isOpen && !Modal) {
      // Lazy load modal only when needed
      import("./HeavyModal").then(module => {
        setModal(() => module.default)
      })
    }
  }, [isOpen, Modal])

  if (!isOpen || !Modal) return null

  return <Modal>{children}</Modal>
}
```

## Virtualizing Long Lists

### Using react-window

```javascript
import { FixedSizeList } from "react-window"

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => <div style={style}>{items[index].name}</div>

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}

// Only renders visible items!
```

## State Structure Optimization

### Flatten State When Possible

```javascript
// Deep nesting causes unnecessary re-renders
const [state, setState] = useState({
  user: {
    profile: {
      settings: {
        theme: "dark",
      },
    },
  },
})

// Flat structure is better
const [theme, setTheme] = useState("dark")

// Or use separate state for different concerns
const [user, setUser] = useState(null)
const [theme, setTheme] = useState("dark")
```

### Colocate State

```javascript
// Lifting state too high
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent count={count} setCount={setCount} />
      <Footer />
    </div>
  )
}

// State closer to where it's used
function MainContent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

## Context Optimization

### Split Contexts

```javascript
// Everything in one context causes all consumers to re-render
const AppContext = createContext()
function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState("dark")
  const [notifications, setNotifications] = useState([])

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
        notifications,
        setUser,
        setTheme,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Split into separate contexts to prevent unnecessary re-renders
const UserContext = createContext()
const ThemeContext = createContext()
const NotificationContext = createContext()

// Only components using UserContext re-render when user changes
```

### Memoize Context Values

```javascript
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")

  // New object every render causes re-renders
  const value = { theme, setTheme }

  // Memoize context value to prevent re-renders
  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
```

## Debouncing and Throttling

### Debounce Search Input

```javascript
import { useState, useEffect } from "react"

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

function SearchInput() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      // Only search after user stops typing
      performSearch(debouncedQuery)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

## Image Optimization

```javascript
// Lazy load images
function OptimizedImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      })
    })

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef}>
      {isLoaded && <img src={src} alt={alt} loading="lazy" />}
    </div>
  )
}
```

## When NOT to Optimize

### Premature Optimization Anti-Patterns

```javascript
// Unnecessary memoization for simple components
const SimpleComponent = React.memo(({ text }) => {
  return <p>{text}</p> // Simple rendering, no need for memo
})

// Don't memoize everything
const Button = React.memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
})

// Only optimize when you have a performance problem
// Measure first, optimize second
```

## Performance Profiling

### React DevTools Profiler

```javascript
// Use React DevTools Profiler to identify:
// 1. Components that re-render unnecessarily
// 2. Slow renders
// 3. Components with expensive renders
```

### Console.time for Measurements

```javascript
function ExpensiveComponent() {
  console.time("ExpensiveComponent render")

  // Component logic
  const result = expensiveCalculation()

  console.timeEnd("ExpensiveComponent render")

  return <div>{result}</div>
}
```

## What I Learned

1. **Measure first**: Don't optimize without profiling
2. **React.memo helps**: But only when props actually don't change
3. **Split contexts**: Prevent unnecessary re-renders
4. **Code splitting**: Lazy load routes and heavy components
5. **Virtualize lists**: Essential for long lists
6. **Don't over-optimize**: Simple components don't need memoization

The key insight: **Most performance issues come from unnecessary re-renders. Fix those first before adding complex optimizations.**
