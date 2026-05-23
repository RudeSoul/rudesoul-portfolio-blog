---
title: "Database Query Optimization: Patterns That Actually Matter"
date: "2026-05-17"
description: "Real database optimization strategies I learned the hard way - from N+1 queries to indexing strategies that work"
tags: ["database", "optimization", "sql", "performance", "prisma"]
---

## The Slow Query Wake-Up Call

I once spent 3 hours debugging why a page took 8 seconds to load. Turns out, one innocent-looking query was making 200+ database calls. That day, I learned that database optimization isn't optional—it's essential.

## The N+1 Query Problem

This is the #1 performance killer I see in codebases:

```javascript
// TERRIBLE - N+1 queries
async function getPostsWithAuthors() {
  const posts = await db.post.findMany()

  // This makes N additional queries (one per post!)
  const postsWithAuthors = await Promise.all(
    posts.map(async post => {
      const author = await db.user.findUnique({ where: { id: post.authorId } })
      return { ...post, author }
    })
  )

  return postsWithAuthors
}

// GOOD - Single query with join
async function getPostsWithAuthors() {
  return await db.post.findMany({
    include: {
      author: true, // Single query with JOIN
    },
  })
}
```

## Understanding Query Patterns

### Pattern 1: Eager Loading vs Lazy Loading

```javascript
// Lazy loading - multiple queries
const user = await db.user.findUnique({ where: { id: 1 } })
const posts = await db.post.findMany({ where: { authorId: user.id } })
const comments = await db.comment.findMany({
  where: { postId: { in: posts.map(p => p.id) } },
})

// Eager loading - single query
const user = await db.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      include: {
        comments: true,
      },
    },
  },
})
```

### Pattern 2: Selective Field Loading

Only fetch what you need:

```javascript
//Fetches all fields
const users = await db.user.findMany()

// Fetch only needed fields
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    // Skip password, createdAt, etc. if not needed
  },
})
```

### Pattern 3: Pagination Done Right

```javascript
// Offset pagination (slow on large datasets)
async function getPosts(page = 1, limit = 10) {
  const skip = (page - 1) * limit
  return await db.post.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  })
}

// Cursor-based pagination (faster)
async function getPosts(cursor, limit = 10) {
  const posts = await db.post.findMany({
    take: limit + 1, // Fetch one extra to check if there's more
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "asc" },
  })

  const hasMore = posts.length > limit
  const items = hasMore ? posts.slice(0, -1) : posts
  const nextCursor = hasMore ? items[items.length - 1].id : null

  return { items, nextCursor, hasMore }
}
```

## Indexing Strategies

### Understanding Indexes

Indexes are like a book's index—they help you find data quickly:

```sql
-- Single column index
CREATE INDEX idx_user_email ON users(email);

-- Composite index (multiple columns)
CREATE INDEX idx_post_author_date ON posts(author_id, created_at);

-- Partial index (only index some rows)
CREATE INDEX idx_active_users ON users(email) WHERE active = true;
```

### When to Add Indexes

```javascript
// Add index on foreign keys (most common)
model Post {
  id        Int    @id @default(autoincrement())
  authorId  Int
  author    User   @relation(fields: [authorId], references: [id])

  @@index([authorId]) // Index foreign key
}

// Add index on frequently queried fields
model User {
  id        Int    @id @default(autoincrement())
  email     String @unique
  username  String

  @@index([email]) // Already unique, but index helps lookups
  @@index([username]) // If you search by username often
}

// Composite indexes for WHERE + ORDER BY
model Post {
  id        Int      @id @default(autoincrement())
  authorId  Int
  status    String
  createdAt DateTime

  @@index([authorId, status, createdAt]) // For queries like:
  // WHERE authorId = X AND status = 'published' ORDER BY createdAt
}
```

### Index Pitfalls

```javascript
// Too many indexes - slows down writes
model Post {
  @@index([title])
  @@index([content])
  @@index([authorId])
  @@index([createdAt])
  @@index([updatedAt])
  @@index([status])
  // Every INSERT/UPDATE has to update all these indexes!
}

// Composite index covers multiple queries
model Post {
  @@index([authorId, status, createdAt]) // Covers multiple query patterns
}
```

## Query Optimization Techniques

### Use EXPLAIN to Understand Queries

```sql
EXPLAIN ANALYZE
SELECT * FROM posts
WHERE author_id = 1
  AND status = 'published'
ORDER BY created_at DESC
LIMIT 10;
```

Look for:

- **Seq Scan**: Bad—full table scan
- **Index Scan**: Good—using index
- **Nested Loop**: Might be slow
- **Execution Time**: Should be < 10ms for simple queries

### Batch Operations

```javascript
//  Multiple individual inserts
for (const item of items) {
  await db.item.create({ data: item })
}

// Batch insert
await db.item.createMany({
  data: items,
})

// Transaction for atomicity
await db.$transaction(items.map(item => db.item.create({ data: item })))
```

### Aggregations at Database Level

```javascript
// Fetch all, aggregate in JS
const orders = await db.order.findMany({ where: { userId } })
const total = orders.reduce((sum, order) => sum + order.amount, 0)

// Aggregate in database
const result = await db.order.aggregate({
  where: { userId },
  _sum: {
    amount: true,
  },
})
const total = result._sum.amount
```

## Common Query Patterns

### Pattern 1: Conditional Queries

```javascript
function buildPostQuery(filters) {
  const where = {}

  if (filters.authorId) {
    where.authorId = filters.authorId
  }

  if (filters.status) {
    where.status = filters.status
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { content: { contains: filters.search } },
    ]
  }

  return db.post.findMany({ where })
}
```

### Pattern 2: Count vs Exists

```javascript
//  Counting when you just need to know if exists
const count = await db.post.count({ where: { authorId: 1 } })
const hasPosts = count > 0

//  Use exists (faster - stops at first match)
const firstPost = await db.post.findFirst({
  where: { authorId: 1 },
  select: { id: true },
})
const hasPosts = !!firstPost
```

### Pattern 3: Avoiding SELECT \*

```javascript
// Fetch everything
const user = await db.user.findUnique({ where: { id: 1 } })

// Fetch only what you need
const user = await db.user.findUnique({
  where: { id: 1 },
  select: {
    id: true,
    name: true,
    email: true,
    // Skip password, tokens, etc.
  },
})
```

## Real-World Example: Optimized Feed Query

Here's a complete example of an optimized query:

```javascript
async function getFeed(userId, cursor, limit = 20) {
  // Get user's followed authors (single query)
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      following: {
        select: { id: true },
      },
    },
  })

  const followingIds = user.following.map(f => f.id)

  // Get posts with all needed data in one query
  const posts = await db.post.findMany({
    where: {
      authorId: { in: followingIds },
      status: "published",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
  })

  const hasMore = posts.length > limit
  const items = hasMore ? posts.slice(0, -1) : posts

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
    hasMore,
  }
}
```

## Monitoring Query Performance

```javascript
// Add query logging in development
const db = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
  ],
})

db.$on("query", e => {
  if (e.duration > 100) {
    // Log slow queries (> 100ms)
    console.warn("Slow query detected:", {
      query: e.query,
      duration: `${e.duration}ms`,
      params: e.params,
    })
  }
})
```

## What I Learned

1. **N+1 queries are the silent killer**: Always use includes/joins
2. **Index strategically**: Foreign keys, frequently queried fields, and composite indexes
3. **Pagination matters**: Cursor-based > offset-based for large datasets
4. **Profile your queries**: Use EXPLAIN to understand what's happening
5. **Batch operations**: Group multiple operations when possible
6. **Select only what you need**: Reduces memory and network usage

The key insight: **Most database performance issues come from query patterns, not database choice. Optimize your queries first, then worry about scaling.**
