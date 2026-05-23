---
title: "API Design for Scale: Patterns That Work"
date: "2026-05-21"
description: "API design patterns I learned from building systems that handle millions of requests - versioning, pagination, and more"
tags: ["api", "design", "rest", "graphql", "scalability"]
---

## The API Design Journey

When I started designing APIs again, I thought REST endpoints were straightforward. Then I built something that needed to scale. That's when I learned that good API design is about more than just endpoints—it's about building systems that can grow.

## RESTful API Principles

### Resource-Based Design

```javascript
// Action-based URLs (not recommended)
POST /createUser
GET /getUserById
POST /updateUser
POST /deleteUser

// Resource-based URLs (RESTful approach)
POST /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

// Nested resources
GET /users/:userId/posts
POST /users/:userId/posts
GET /posts/:postId/comments
```

### HTTP Methods and Status Codes

```javascript
// GET - Retrieve resource
app.get("/users/:id", async (req, res) => {
  const user = await getUser(req.params.id)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }
  res.status(200).json(user)
})

// POST - Create resource
app.post("/users", async (req, res) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user) // 201 Created
  } catch (error) {
    res.status(400).json({ error: error.message }) // 400 Bad Request
  }
})

// PUT - Update entire resource
app.put("/users/:id", async (req, res) => {
  const user = await updateUser(req.params.id, req.body)
  res.status(200).json(user)
})

// PATCH - Partial update
app.patch("/users/:id", async (req, res) => {
  const user = await patchUser(req.params.id, req.body)
  res.status(200).json(user)
})

// DELETE - Remove resource
app.delete("/users/:id", async (req, res) => {
  await deleteUser(req.params.id)
  res.status(204).send() // 204 No Content
})
```

### Consistent Response Format

```javascript
// Standard response wrapper
class APIResponse {
  static success(data, meta = {}) {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    }
  }

  static error(message, code = "ERROR", details = {}) {
    return {
      success: false,
      error: {
        message,
        code,
        details,
        timestamp: new Date().toISOString(),
      },
    }
  }

  static paginated(data, pagination) {
    return {
      success: true,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
        hasMore: pagination.hasMore,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    }
  }
}

// Usage
app.get("/users", async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const result = await getUsersPaginated(page, limit)

  res.json(
    APIResponse.paginated(result.items, {
      page,
      limit,
      total: result.total,
      hasMore: result.hasMore,
    })
  )
})
```

## Versioning Strategies

### URL Versioning (Recommended)

```javascript
// Version in URL path
app.use("/api/v1", v1Routes)
app.use("/api/v2", v2Routes)

// v1 routes
router.get("/users", getUsersV1)
router.get("/users/:id", getUserV1)

// v2 routes (improved)
router.get("/users", getUsersV2) // Different response structure
router.get("/users/:id", getUserV2)
```

### Header Versioning

```javascript
function apiVersionMiddleware(req, res, next) {
  const version = req.headers["api-version"] || "v1"
  req.apiVersion = version
  next()
}

app.use(apiVersionMiddleware)

app.get("/users", (req, res) => {
  if (req.apiVersion === "v2") {
    return getUsersV2(req, res)
  }
  return getUsersV1(req, res)
})
```

### Query Parameter Versioning

```javascript
// Less common, but sometimes useful
app.get("/users", (req, res) => {
  const version = req.query.version || "v1"
  if (version === "v2") {
    return getUsersV2(req, res)
  }
  return getUsersV1(req, res)
})
```

## Advanced Pagination

### Cursor-Based Pagination

```javascript
async function getUsersPaginated(cursor, limit = 20) {
  const users = await db.user.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "asc" },
  })

  const hasMore = users.length > limit
  const items = hasMore ? users.slice(0, -1) : users
  const nextCursor = hasMore ? items[items.length - 1].id : null

  return {
    items,
    nextCursor,
    hasMore,
  }
}

// API endpoint
app.get("/users", async (req, res) => {
  const { cursor, limit = 20 } = req.query
  const result = await getUsersPaginated(cursor, parseInt(limit))

  res.json({
    data: result.items,
    pagination: {
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
    },
  })
})
```

### Offset-Based Pagination (for smaller datasets)

```javascript
async function getUsersOffset(page = 1, limit = 20) {
  const skip = (page - 1) * limit
  const [users, total] = await Promise.all([
    db.user.findMany({ skip, take: limit }),
    db.user.count(),
  ])

  return {
    items: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}
```

## Filtering and Sorting

### Query Parameter Parsing

```javascript
class QueryParser {
  static parseFilters(query) {
    const filters = {}

    // Support multiple filter formats
    // ?status=active
    // ?status[eq]=active
    // ?price[gte]=100&price[lte]=500

    Object.keys(query).forEach(key => {
      if (key.startsWith("_")) return // Skip metadata params

      const value = query[key]

      if (typeof value === "object") {
        // Range queries: ?price[gte]=100&price[lte]=500
        filters[key] = {}
        Object.keys(value).forEach(operator => {
          filters[key][operator] = value[operator]
        })
      } else {
        // Simple equality: ?status=active
        filters[key] = value
      }
    })

    return filters
  }

  static parseSort(query) {
    const sortParam = query.sort || query.orderBy

    if (!sortParam) return { createdAt: "desc" }

    // Support: ?sort=name (asc) or ?sort=-name (desc)
    // Or: ?sort=name:asc
    if (sortParam.startsWith("-")) {
      return { [sortParam.slice(1)]: "desc" }
    }

    if (sortParam.includes(":")) {
      const [field, direction] = sortParam.split(":")
      return { [field]: direction }
    }

    return { [sortParam]: "asc" }
  }
}

// Usage
app.get("/posts", async (req, res) => {
  const filters = QueryParser.parseFilters(req.query)
  const sort = QueryParser.parseSort(req.query)
  const { cursor, limit = 20 } = req.query

  const posts = await db.post.findMany({
    where: filters,
    orderBy: sort,
    take: parseInt(limit) + 1,
    cursor: cursor ? { id: cursor } : undefined,
  })

  res.json(APIResponse.success(posts))
})
```

## Error Handling in APIs

### Standardized Error Responses

```javascript
class APIError extends Error {
  constructor(
    message,
    statusCode = 500,
    code = "INTERNAL_ERROR",
    details = {}
  ) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }
}

class ValidationError extends APIError {
  constructor(message, details) {
    super(message, 400, "VALIDATION_ERROR", details)
  }
}

class NotFoundError extends APIError {
  constructor(resource, id) {
    super(`${resource} not found`, 404, "NOT_FOUND", { resource, id })
  }
}

class UnauthorizedError extends APIError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED")
  }
}

// Error handler middleware
function errorHandler(err, req, res, next) {
  if (err instanceof APIError) {
    return res
      .status(err.statusCode)
      .json(APIResponse.error(err.message, err.code, err.details))
  }

  // Unknown errors
  console.error("Unhandled error:", err)
  res
    .status(500)
    .json(APIResponse.error("Internal server error", "INTERNAL_ERROR"))
}
```

## Rate Limiting

### Per-User Rate Limiting

```javascript
const rateLimit = require("express-rate-limit")
const RedisStore = require("rate-limit-redis")

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: async req => {
    // Different limits for different user types
    if (req.user?.role === "premium") return 1000
    if (req.user?.role === "pro") return 500
    return 100
  },
  keyGenerator: req => {
    // Rate limit per user or IP
    return req.user?.id || req.ip
  },
  message: APIResponse.error("Too many requests", "RATE_LIMIT_EXCEEDED"),
})

app.use("/api", limiter)
```

## API Documentation

### OpenAPI/Swagger Integration

```javascript
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Cursor for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: List of users
 */
app.get("/users", getUsers)
```

## GraphQL Considerations

### When to Use GraphQL

```javascript
// GraphQL is great when:
// 1. Clients need flexible data fetching
// 2. Multiple frontends with different data needs
// 3. Complex relationships between entities

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    author: User!
    comments: [Comment!]!
  }
  
  type Query {
    user(id: ID!): User
    users(limit: Int, cursor: String): UserConnection!
  }
`

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return db.user.findUnique({ where: { id } })
    },
    users: async (_, { limit = 20, cursor }) => {
      return getUsersPaginated(cursor, limit)
    },
  },
  User: {
    posts: async user => {
      return db.post.findMany({ where: { authorId: user.id } })
    },
  },
}
```

## What I Learned

1. **Consistency is key**: Use standard response formats and status codes
2. **Version from the start**: You'll need to change APIs, plan for it
3. **Cursor pagination scales**: Better than offset for large datasets
4. **Document everything**: Good docs save hours of debugging
5. **Rate limiting is essential**: Protect your API from abuse
6. **Error handling matters**: Standardized errors help client developers

The key insight: **Good API design is about making it easy for consumers to use your API correctly. Consistency, clear errors, and good documentation go a long way.**
