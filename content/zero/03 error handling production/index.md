---
title: "Error Handling Patterns That Actually Work in Production"
date: "2026-05-16"
description: "Real-world error handling strategies I learned from debugging production issues - patterns that save you hours of troubleshooting"
tags: ["error-handling", "production", "debugging", "monitoring"]
---

## The Pain of Production Errors

After my first production incident where a single unhandled error brought down an entire service, I realized error handling isn't just about try-catch blocks. It's about building resilient systems that fail gracefully and give you the context you need to fix issues quickly.

## The Three Layers of Error Handling

### Layer 1: User-Facing Errors

Users should never see technical errors. Always provide friendly, actionable messages:

```javascript
// Bad - users see stack traces
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()
  return data
}

// Good - graceful degradation
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`)

    if (!response.ok) {
      if (response.status === 404) {
        return { error: "User not found", data: null }
      }
      if (response.status >= 500) {
        return {
          error: "Service temporarily unavailable. Please try again later.",
          data: null,
        }
      }
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    return { error: null, data }
  } catch (error) {
    // Log for debugging, return user-friendly message
    console.error("Failed to fetch user:", error)
    return {
      error: "Unable to load user information. Please refresh the page.",
      data: null,
    }
  }
}
```

### Layer 2: Application-Level Error Boundaries

In React, use error boundaries to catch component errors:

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log to your error tracking service
    this.setState({
      error,
      errorInfo,
    })

    // Send to monitoring service
    logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage - wrap critical sections
;<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

### Layer 3: Monitoring and Alerting

Catch errors before users report them:

```javascript
// Error tracking service wrapper
class ErrorTracker {
  static init() {
    // Initialize your service (Sentry, LogRocket, etc.)
    this.client = new Sentry.Client({ dsn: process.env.SENTRY_DSN })
  }

  static captureException(error, context = {}) {
    this.client.captureException(error, {
      tags: context.tags || {},
      extra: {
        userId: context.userId,
        url: context.url,
        timestamp: new Date().toISOString(),
        ...context.extra,
      },
    })
  }

  static captureMessage(message, level = "info", context = {}) {
    this.client.captureMessage(message, {
      level,
      tags: context.tags || {},
      extra: context.extra || {},
    })
  }
}

// Usage in async functions
async function processOrder(orderId) {
  try {
    const order = await fetchOrder(orderId)
    await processPayment(order)
    await sendConfirmation(order)
  } catch (error) {
    ErrorTracker.captureException(error, {
      tags: { feature: "order-processing", severity: "high" },
      extra: { orderId, userId: order.userId },
    })

    // Re-throw to let caller handle
    throw new ProcessingError("Order processing failed", { cause: error })
  }
}
```

## Custom Error Classes for Better Debugging

Create domain-specific error types:

```javascript
// Base error class
class AppError extends Error {
  constructor(message, { statusCode = 500, code, details, cause } = {}) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.details = details
    this.cause = cause
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
    }
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message, details) {
    super(message, {
      statusCode: 400,
      code: "VALIDATION_ERROR",
      details,
    })
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} not found`, {
      statusCode: 404,
      code: "NOT_FOUND",
      details: { resource, id },
    })
  }
}

class AuthorizationError extends AppError {
  constructor(action, resource) {
    super(`Not authorized to ${action} ${resource}`, {
      statusCode: 403,
      code: "UNAUTHORIZED",
      details: { action, resource },
    })
  }
}

class RateLimitError extends AppError {
  constructor(limit, retryAfter) {
    super("Rate limit exceeded", {
      statusCode: 429,
      code: "RATE_LIMIT",
      details: { limit, retryAfter },
    })
  }
}

// Usage
function validateUserInput(data) {
  if (!data.email) {
    throw new ValidationError("Email is required", { field: "email" })
  }

  if (!isValidEmail(data.email)) {
    throw new ValidationError("Invalid email format", {
      field: "email",
      value: data.email,
    })
  }
}

// Error handler middleware
function errorHandler(err, req, res, next) {
  // Log error
  console.error("Error:", err)

  // Send appropriate response
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJSON())
  }

  // Unknown errors - don't expose details
  return res.status(500).json({
    error: "Internal server error",
    code: "INTERNAL_ERROR",
  })
}
```

## Retry Patterns with Exponential Backoff

Network errors are often transient. Implement smart retries:

```javascript
class RetryableError extends Error {
  constructor(message, { retryable = true, retryAfter } = {}) {
    super(message)
    this.retryable = retryable
    this.retryAfter = retryAfter
  }
}

async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryable = error => error instanceof RetryableError,
  } = options

  let lastError
  let delay = initialDelay

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      // Don't retry if not retryable or on last attempt
      if (!retryable(error) || attempt === maxRetries) {
        throw error
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay))

      // Exponential backoff with jitter
      delay = Math.min(delay * backoffFactor, maxDelay)
      delay = delay + Math.random() * 1000 // Add jitter
    }
  }

  throw lastError
}

// Usage
async function fetchWithRetry(url) {
  return retryWithBackoff(
    async () => {
      const response = await fetch(url)

      if (response.status >= 500) {
        throw new RetryableError("Server error", { retryAfter: 5000 })
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`) // Don't retry client errors
      }

      return response.json()
    },
    {
      maxRetries: 3,
      initialDelay: 1000,
    }
  )
}
```

## Circuit Breaker Pattern

Prevent cascading failures:

```javascript
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn
    this.threshold = options.threshold || 5
    this.timeout = options.timeout || 60000
    this.failureCount = 0
    this.state = "CLOSED" // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now()
  }

  async call(...args) {
    if (this.state === "OPEN") {
      if (Date.now() < this.nextAttempt) {
        throw new Error("Circuit breaker is OPEN")
      }
      this.state = "HALF_OPEN"
    }

    try {
      const result = await this.fn(...args)
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  onSuccess() {
    this.failureCount = 0
    this.state = "CLOSED"
  }

  onFailure() {
    this.failureCount++

    if (this.failureCount >= this.threshold) {
      this.state = "OPEN"
      this.nextAttempt = Date.now() + this.timeout
    }
  }
}

// Usage
const fetchUser = new CircuitBreaker(
  async userId => {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch")
    return response.json()
  },
  {
    threshold: 5,
    timeout: 30000,
  }
)

// All calls go through circuit breaker
try {
  const user = await fetchUser.call(123)
} catch (error) {
  // Circuit breaker prevented further calls
}
```

## Error Context Collection

Collect context automatically:

```javascript
function withErrorContext(fn, context = {}) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      // Attach context to error
      error.context = {
        ...context,
        timestamp: new Date().toISOString(),
        args: args.map(arg => {
          // Don't log sensitive data
          if (arg && typeof arg === "object" && arg.password) {
            return { ...arg, password: "[REDACTED]" }
          }
          return arg
        }),
      }

      throw error
    }
  }
}

// Usage
const processPayment = withErrorContext(
  async (orderId, amount) => {
    // Payment processing logic
  },
  { feature: "payment", version: "2.0" }
)
```

## What I Learned

1. **Always have three layers**: User-facing, application, and monitoring
2. **Use custom error types**: Makes debugging 10x easier
3. **Implement retries**: Most errors are transient
4. **Use circuit breakers**: Protect your system from cascading failures
5. **Collect context**: The more context you have, the faster you fix bugs
6. **Never expose internals**: Users shouldn't see stack traces or database errors

The key insight: **Error handling isn't about preventing errors—it's about handling them gracefully and learning from them.**
