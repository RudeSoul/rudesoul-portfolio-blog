---
title: "State Management Beyond Redux: Modern Patterns"
date: "2026-05-22"
description: "Exploring modern state management solutions - Zustand, Jotai, React Query, and when to use each"
tags: ["react", "state-management", "zustand", "react-query", "patterns"]
---

## The State Management Evolution

Coming back to React development, I expected Redux to still be the go-to solution. Instead, I discovered a landscape of simpler, more flexible tools. Here's what I learned about modern state management.

## Understanding State Types

Not all state needs global management:

### Local State

```javascript
// Component-specific state
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Server State

```javascript
// Data from APIs that needs caching, synchronization
const { data: users } = useQuery("users", fetchUsers)
```

### Global UI State

```javascript
// Theme, modals, sidebars, notifications
const { theme, setTheme } = useThemeStore()
```

### Form State

```javascript
// Complex forms with validation
const form = useForm({
  /* ... */
})
```

## Zustand: Simple Global State

Perfect for global UI state and small to medium applications:

```javascript
import create from "zustand"

// Simple store
const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// Usage
function Counter() {
  const { count, increment, decrement } = useStore()
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

### Complex Zustand Example

```javascript
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

const useAuthStore = create(
  devtools(
    persist(
      set => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: async (email, password) => {
          const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          })
          const { user, token } = await response.json()

          set({
            user,
            token,
            isAuthenticated: true,
          })
        },

        logout: () =>
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          }),

        updateUser: updates =>
          set(state => ({
            user: { ...state.user, ...updates },
          })),
      }),
      {
        name: "auth-storage", // localStorage key
        partialize: state => ({
          token: state.token,
          user: state.user,
        }), // Only persist these fields
      }
    ),
    { name: "AuthStore" } // Redux DevTools name
  )
)
```

### Zustand with Immer (Complex State Updates)

```javascript
import create from "zustand"
import { immer } from "zustand/middleware/immer"

const useCartStore = create(
  immer(set => ({
    items: [],
    total: 0,

    addItem: product =>
      set(state => {
        const existingItem = state.items.find(item => item.id === product.id)

        if (existingItem) {
          existingItem.quantity++
        } else {
          state.items.push({ ...product, quantity: 1 })
        }

        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
      }),

    removeItem: productId =>
      set(state => {
        state.items = state.items.filter(item => item.id !== productId)
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
      }),

    updateQuantity: (productId, quantity) =>
      set(state => {
        const item = state.items.find(item => item.id === productId)
        if (item) {
          item.quantity = quantity
          state.total = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )
        }
      }),
  }))
)
```

## React Query: Server State Management

Perfect for API data, caching, and synchronization:

```javascript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// Fetching data
function UsersList() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users")
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// Mutations
function CreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async newUser => {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      })
      return response.json()
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return (
    <button
      onClick={() =>
        mutation.mutate({ name: "John", email: "john@example.com" })
      }
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? "Creating..." : "Create User"}
    </button>
  )
}
```

### Advanced React Query Patterns

```javascript
// Dependent queries
function UserProfile({ userId }) {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  })

  // Only fetch posts after user is loaded
  const { data: posts } = useQuery({
    queryKey: ["user", userId, "posts"],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // Only run when user exists
  })
}

// Optimistic updates
function LikeButton({ postId }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => likePost(postId),
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["post", postId] })

      // Snapshot previous value
      const previousPost = queryClient.getQueryData(["post", postId])

      // Optimistically update
      queryClient.setQueryData(["post", postId], old => ({
        ...old,
        likes: old.likes + 1,
        liked: true,
      }))

      return { previousPost }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(["post", postId], context.previousPost)
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
    },
  })

  return <button onClick={() => mutation.mutate()}>Like</button>
}
```

## Jotai: Atomic State Management

Great for fine-grained reactivity:

```javascript
import { atom, useAtom } from "jotai"

// Atomic state
const countAtom = atom(0)
const doubleCountAtom = atom(get => get(countAtom) * 2)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [doubleCount] = useAtom(doubleCountAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// Async atoms
const userAtom = atom(async () => {
  const response = await fetch("/api/user")
  return response.json()
})

function UserProfile() {
  const [user] = useAtom(userAtom) // Automatically handles async
  return <div>{user.name}</div>
}
```

## Context API for Theme/UI State

Sometimes the built-in Context is enough:

```javascript
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
```

## Hybrid Approach: Combining Tools

In real applications, you'll use multiple tools:

```javascript
// Zustand for UI state
const useUIStore = create(set => ({
  sidebarOpen: false,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
}))

// React Query for server state
const { data: posts } = useQuery(["posts"], fetchPosts)

// Local state for component-specific state
const [searchQuery, setSearchQuery] = useState("")

// Context for theme
const { theme } = useTheme()
```

## When to Use What

### Use Local State When:

- State is only used in one component
- State doesn't need to persist
- State is simple (a few values)

### Use Zustand When:

- You need global UI state (modals, sidebars, theme)
- Simple state management without boilerplate
- Medium-sized applications

### Use React Query When:

- Working with server data (APIs)
- Need caching and synchronization
- Want automatic refetching and background updates

### Use Jotai When:

- Need fine-grained reactivity
- Want composable state atoms
- Building complex state dependencies

### Use Context When:

- Sharing state with a small subtree
- Infrequent updates
- Simple theme/preference management

### Use Redux When:

- Very large applications with complex state
- Need time-travel debugging
- Team already knows Redux well

## Form State: React Hook Form

```javascript
import { useForm } from "react-hook-form"

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    await createUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

## What I Learned

1. **Not all state needs global management**: Start with local state
2. **Different tools for different needs**: Server state ≠ UI state
3. **Zustand is great for simple global state**: Much less boilerplate than Redux
4. **React Query is essential for server state**: Handles caching, refetching, and more
5. **You can combine tools**: Use the right tool for each job
6. **Start simple**: Add complexity only when needed

The key insight: **Modern state management is about using the right tool for the job, not forcing one solution everywhere.**
