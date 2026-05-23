---
title: "Code Architecture Patterns: Building Maintainable Systems"
date: "2026-05-24"
description: "Architectural patterns I learned from maintaining large codebases - folder structures, separation of concerns, and clean code principles"
tags: ["architecture", "patterns", "clean-code", "maintainability", "design"]
---

## The Architecture Reality

After inheriting a codebase with everything in one folder and no clear structure, I learned that good architecture isn't about fancy patterns—it's about making code easy to understand, modify, and extend.

## Folder Structure Patterns

### Feature-Based Structure (Recommended)

```
src/
  features/
    auth/
      components/
        LoginForm.tsx
        SignupForm.tsx
      hooks/
        useAuth.ts
      services/
        authService.ts
      types/
        auth.types.ts
      index.ts
    posts/
      components/
        PostList.tsx
        PostCard.tsx
      hooks/
        usePosts.ts
      services/
        postService.ts
      types/
        post.types.ts
      index.ts
  shared/
    components/
      Button.tsx
      Input.tsx
    hooks/
      useDebounce.ts
    utils/
      formatDate.ts
    types/
      common.types.ts
  app/
    layout.tsx
    page.tsx
```

### Benefits

- Related code stays together
- Easy to find features
- Scales well
- Clear boundaries

## Separation of Concerns

### Layered Architecture

```javascript
// Presentation Layer (Components)
// components/PostCard.tsx
function PostCard({ post, onLike }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <button onClick={() => onLike(post.id)}>Like</button>
    </div>
  )
}

// Business Logic Layer (Hooks/Services)
// hooks/usePosts.ts
function usePosts() {
  const [posts, setPosts] = useState([])

  const likePost = async postId => {
    await postService.likePost(postId)
    // Update local state
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  return { posts, likePost }
}

// Data Access Layer (Services)
// services/postService.ts
class PostService {
  async getPosts() {
    const response = await fetch("/api/posts")
    return response.json()
  }

  async likePost(postId) {
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
    })
    return response.json()
  }
}

export const postService = new PostService()
```

## Design Patterns in Practice

### Repository Pattern

```javascript
// Abstract data access
interface UserRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  create(user: UserData): Promise<User>
  update(id: string, data: Partial<UserData>): Promise<User>
}

// Implementation
class PrismaUserRepository implements UserRepository {
  async findById(id: string) {
    return db.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return db.user.findUnique({ where: { email } })
  }

  async create(data: UserData) {
    return db.user.create({ data })
  }

  async update(id: string, data: Partial<UserData>) {
    return db.user.update({ where: { id }, data })
  }
}

// Usage - easy to swap implementations
const userRepository: UserRepository = new PrismaUserRepository()
```

### Service Layer Pattern

```javascript
// services/UserService.ts
class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(data: UserRegistrationData) {
    // Business logic
    if (await this.userRepository.findByEmail(data.email)) {
      throw new Error('Email already exists')
    }

    // Validation
    this.validatePassword(data.password)

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create user
    const user = await this.userRepository.create({
      ...data,
      passwordHash: hashedPassword
    })

    // Send welcome email
    await emailService.sendWelcomeEmail(user.email)

    return user
  }

  private validatePassword(password: string) {
    if (password.length < 8) {
      throw new Error('Password too short')
    }
  }
}
```

### Factory Pattern

```javascript
// factories/NotificationFactory.ts
interface Notification {
  send(): Promise<void>
}

class EmailNotification implements Notification {
  constructor(private recipient: string, private message: string) {}

  async send() {
    await emailService.send(this.recipient, this.message)
  }
}

class SMSNotification implements Notification {
  constructor(private phone: string, private message: string) {}

  async send() {
    await smsService.send(this.phone, this.message)
  }
}

class NotificationFactory {
  static create(type: 'email' | 'sms', recipient: string, message: string): Notification {
    switch (type) {
      case 'email':
        return new EmailNotification(recipient, message)
      case 'sms':
        return new SMSNotification(recipient, message)
      default:
        throw new Error(`Unknown notification type: ${type}`)
    }
  }
}

// Usage
const notification = NotificationFactory.create('email', 'user@example.com', 'Hello')
await notification.send()
```

## Dependency Injection

```javascript
// Without DI - hard to test
class UserController {
  private userService = new UserService() // Hard dependency

  async createUser(req, res) {
    const user = await this.userService.registerUser(req.body)
    res.json(user)
  }
}

// With DI - easy to test
class UserController {
  constructor(private userService: UserService) {} // Injected dependency

  async createUser(req, res) {
    const user = await this.userService.registerUser(req.body)
    res.json(user)
  }
}

// Usage
const userRepository = new PrismaUserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

// Testing
const mockUserService = { registerUser: jest.fn() }
const controller = new UserController(mockUserService)
```

## Configuration Management

```javascript
// config/index.ts
const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || "2"),
      max: parseInt(process.env.DB_POOL_MAX || "10"),
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRY || "15m",
  },
}

// Validate required config
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"]
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`)
  }
})

export default config
```

## Error Handling Architecture

```javascript
// errors/AppError.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

// errors/errorTypes.ts
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND', { resource, id })
  }
}

// middleware/errorHandler.ts
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        details: err.details
      }
    })
  }

  // Log unexpected errors
  console.error('Unexpected error:', err)

  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }
  })
}
```

## API Layer Organization

```javascript
// routes/users.routes.ts
import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authenticate } from '../middleware/auth'
import { validate } from '../middleware/validation'
import { createUserSchema } from '../schemas/user.schema'

const router = Router()
const userController = new UserController()

router.post(
  '/',
  validate(createUserSchema),
  userController.create.bind(userController)
)

router.get(
  '/:id',
  authenticate,
  userController.getById.bind(userController)
)

export default router

// app.ts
import express from 'express'
import userRoutes from './routes/users.routes'
import postRoutes from './routes/posts.routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use(errorHandler)

export default app
```

## Shared Utilities

```javascript
// utils/response.ts
export function successResponse(data: any, meta?: any) {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  }
}

export function errorResponse(message: string, code: string, details?: any) {
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

// utils/asyncHandler.ts
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// Usage
router.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await userService.getAll()
    res.json(successResponse(users))
  })
)
```

## Type Definitions

```javascript
// types/user.types.ts
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'user' | 'moderator'

export interface CreateUserData {
  email: string
  name: string
  password: string
}

export interface UpdateUserData {
  name?: string
  email?: string
}

// types/api.types.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    code: string
    details?: any
  }
  meta?: {
    timestamp: string
    pagination?: PaginationMeta
  }
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}
```

## Testing Architecture

```javascript
// __tests__/setup.ts
import { setupTestDB } from "./helpers/db"
import { cleanup } from "./helpers/cleanup"

beforeAll(async () => {
  await setupTestDB()
})

afterEach(async () => {
  await cleanup()
})

afterAll(async () => {
  await cleanup()
})

// __tests__/services/UserService.test.ts
import { UserService } from "../../services/UserService"
import { MockUserRepository } from "../mocks/UserRepository"

describe("UserService", () => {
  let userService: UserService
  let mockRepository: MockUserRepository

  beforeEach(() => {
    mockRepository = new MockUserRepository()
    userService = new UserService(mockRepository)
  })

  it("should create user", async () => {
    const userData = {
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    }

    const user = await userService.registerUser(userData)

    expect(user.email).toBe(userData.email)
    expect(mockRepository.create).toHaveBeenCalled()
  })
})
```

## What I Learned

1. **Organize by feature**: Keep related code together
2. **Separate concerns**: Presentation, business logic, and data access
3. **Use patterns wisely**: Not every pattern fits every situation
4. **Dependency injection**: Makes code testable and flexible
5. **Centralize configuration**: One place for all config
6. **Type everything**: TypeScript/Flow helps catch errors early

The key insight: **Good architecture makes code easy to understand and modify. It's not about using the latest patterns—it's about clarity and maintainability.**
