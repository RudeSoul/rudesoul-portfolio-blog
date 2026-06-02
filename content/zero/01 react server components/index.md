---
title: "Understanding React Server Components"
date: "2026-05-07"
description: "Learning how React Server Components work in Next.js 15 and why they matter for modern web development"
tags: ["react", "nextjs", "server-components"]
---

## Why Server Components?

After years away from frontend development, I discovered that React has fundamentally changed how we think about rendering. Server Components let us run React on the server, reducing the JavaScript we ship to the browser. This was a game-changer for me—it's like going from shipping entire libraries to only sending what the user actually needs.

## The Key Difference

The fundamental difference is **where** and **when** components render:

- **Client Components**: Render in the browser, require JavaScript to be sent to the client
- **Server Components**: Render on the server, only the result (HTML/JSON) is sent to the client

### Client Component (Old Way)

```jsx
"use client"
import { useState, useEffect } from "react"

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

**Problems with this approach:**

- The entire component code is bundled and sent to the browser
- We wait for hydration before showing content (or show a loading state)
- Extra network request needed to fetch data
- More JavaScript = slower page loads

### Server Component (New Way)

```jsx
// No "use client" directive = Server Component by default in Next.js 13+
import { db } from "@/lib/database"

export default async function UserList() {
  // Direct database access - runs on the server!
  const users = await db.users.findMany()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

**Benefits:**

- Zero JavaScript sent to the browser for this component
- Data fetching happens on the server (faster, more secure)
- Rendered HTML is sent directly (better SEO, faster initial render)
- Can directly access databases, file systems, and APIs

## Key Benefits of Server Components

### 1. **Reduced Bundle Size**

Server Components don't add to your JavaScript bundle. This means:

- Faster page loads
- Better performance on mobile devices
- Lower bandwidth usage

```jsx
// Heavy library usage in Server Component - doesn't bloat client bundle
import fs from "fs"
import { complexDataProcessor } from "@/lib/heavy-library"

export default async function DataProcessor({ filePath }) {
  const data = fs.readFileSync(filePath, "utf-8")
  const processed = complexDataProcessor(data)

  return <div>{processed}</div>
}
```

### 2. **Direct Access to Backend Resources**

Server Components can directly access:

- Databases
- File systems
- Environment variables
- Internal APIs
- Server-only packages

```jsx
import { prisma } from "@/lib/prisma"

export default async function BlogPost({ slug }) {
  // Direct database query - no API route needed!
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, comments: true },
  })

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

### 3. **Better Security**

Sensitive operations and API keys stay on the server:

```jsx
const API_KEY = process.env.SECRET_API_KEY // Safe!

export default async function SecureData() {
  const data = await fetch("https://api.example.com/data", {
    headers: { Authorization: `Bearer ${API_KEY}` },
  }).then(res => res.json())

  return <div>{data.content}</div>
}
```

### 4. **Improved SEO and Initial Load**

Content is rendered on the server and sent as HTML, which means:

- Search engines can index it immediately
- Users see content faster (no waiting for JavaScript)
- Better for users with slow connections

## When to Use Server vs Client Components

### Use Server Components for:

- Fetching data
- Accessing backend resources (databases, file systems)
- Keeping sensitive information (API keys, tokens)
- Large dependencies that would bloat the client bundle
- Static or infrequently changing content

### Use Client Components for:

- Interactivity (onClick, onChange, etc.)
- Browser-only APIs (localStorage, geolocation)
- State management (useState, useReducer)
- Effects (useEffect, useLayoutEffect)
- Event listeners

### Mixing Both: A Practical Example

Here's how you'd combine them in a real application:

```jsx
// app/posts/page.js - Server Component
import { db } from "@/lib/database"
import PostCard from "@/components/PostCard"
import LikeButton from "@/components/LikeButton" // Client Component

export default async function PostsPage() {
  // Server Component - fetches data
  const posts = await db.posts.findMany()

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <PostCard post={post} /> {/* Can be Server Component */}
          <LikeButton postId={post.id} /> {/* Must be Client Component */}
        </div>
      ))}
    </div>
  )
}
```

```jsx
// components/LikeButton.jsx - Client Component
"use client"

import { useState } from "react"

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    setLiked(!liked)
    await fetch(`/api/posts/${postId}/like`, { method: "POST" })
  }

  return <button onClick={handleLike}>{liked ? "❤️ Liked" : "🤍 Like"}</button>
}
```

## Important Limitations

Server Components have some restrictions:

1. **No Browser APIs**: Can't use `window`, `document`, `localStorage`, etc.
2. **No State or Effects**: Can't use `useState`, `useEffect`, or other React hooks
3. **No Event Handlers**: Can't have `onClick`, `onChange`, etc.
4. **Props Must Be Serializable**: Can't pass functions, classes, or complex objects as props to Client Components

```jsx
// This won't work - functions can't be passed as props
export default function ServerComponent() {
  const handleClick = () => console.log("clicked") // Function

  return <ClientComponent onClick={handleClick} /> // Error!
}

// Instead, pass data and handle events in Client Component
export default function ServerComponent() {
  return <ClientComponent userId={123} /> // Primitive data
}
```

## Real-World Pattern: Server Component with Client Interactivity

Here's a complete example combining both:

```jsx
// app/products/[id]/page.js - Server Component
import { db } from "@/lib/database"
import ProductDetails from "@/components/ProductDetails"
import AddToCart from "@/components/AddToCart"

export default async function ProductPage({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { reviews: true, category: true },
  })

  return (
    <div>
      <ProductDetails product={product} />
      <AddToCart productId={product.id} />
    </div>
  )
}
```

```jsx
// components/AddToCart.jsx - Client Component
"use client"

import { useState, useTransition } from "react"

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1)
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = () => {
    startTransition(async () => {
      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      })
    })
  }

  return (
    <div>
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={handleAddToCart} disabled={isPending}>
        {isPending ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  )
}
```

## Best Practices

1. **Default to Server Components**: Start with Server Components and only add `"use client"` when you need interactivity
2. **Keep Client Components Small**: Move logic to Server Components when possible
3. **Pass Data, Not Functions**: Serialize data and pass it down, handle events in Client Components
4. **Use Streaming**: Leverage Next.js Suspense for better loading experiences
5. **Optimize Data Fetching**: Use Server Components to fetch data closer to the source

```jsx

"use client"

export default function SearchInput({ onSearch }) {
  return <input onChange={(e) => onSearch(e.target.value)} />
}


export default async function SearchPage({ searchParams }) {
  const results = await searchDatabase(searchParams.q)
  return <SearchResults results={results} />
}
```

## What I Learned Today

Coming back to React development, Server Components feel like a natural evolution. They solve real problems:

- **Performance**: Smaller bundles, faster loads
- **Security**: Keep sensitive code on the server
- **Developer Experience**: Direct database access, simpler data flow
- **User Experience**: Faster initial renders, better SEO

The mental model shift is interesting—you're no longer just building client-side components. You're building a hybrid system where components live where they make the most sense.

## Next Steps

I want to dive deeper into:

- Streaming and Suspense with Server Components
- Advanced patterns for data fetching
- Caching strategies
- Performance optimization techniques

This is just the beginning. React Server Components, combined with Next.js, are reshaping how we build web applications. I'm excited to see where this journey takes me!

---

**Resources that helped me:**

- [Next.js Server Components Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Server Components RFC](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Server Components vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
