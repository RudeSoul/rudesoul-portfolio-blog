---
title: "Authentication & Authorization: Building Secure Systems"
date: "2026-05-20"
description: "Real-world auth patterns I learned from building production systems - from JWT security to role-based access control"
tags: ["authentication", "authorization", "security", "jwt", "rbac"]
---

## The Security Wake-Up Call

After implementing authentication for the first time in years, I realized how much has changed. What I thought was "secure" was actually full of vulnerabilities. This is what I learned about building proper auth systems.

## The Fundamentals

### Authentication vs Authorization

- **Authentication (AuthN)**: "Who are you?" - Verifying identity
- **Authorization (AuthZ)**: "What can you do?" - Verifying permissions

```javascript
// Authentication
async function login(email, password) {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) throw new Error("Invalid credentials")

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) throw new Error("Invalid credentials")

  // Create session/token after successful authentication
  const token = createJWT(user)
  return { user, token }
}

// Authorization
function canEditPost(user, post) {
  return user.id === post.authorId || user.role === "admin"
}
```

## JWT Deep Dive

### Secure JWT Implementation

```javascript
const jwt = require("jsonwebtoken")

// Secure JWT implementation
class TokenService {
  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET
    this.refreshSecret = process.env.JWT_REFRESH_SECRET
    this.accessExpiry = "15m"
    this.refreshExpiry = "7d"
  }

  generateAccessToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      this.accessSecret,
      { expiresIn: this.accessExpiry }
    )
  }

  generateRefreshToken(user) {
    return jwt.sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
      this.refreshSecret,
      { expiresIn: this.refreshExpiry }
    )
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessSecret)
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired")
      }
      throw new Error("Invalid token")
    }
  }

  async refreshTokens(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, this.refreshSecret)
      const user = await db.user.findUnique({
        where: { id: payload.userId },
      })

      // Check if token version matches (for logout/reissue)
      if (user.tokenVersion !== payload.tokenVersion) {
        throw new Error("Token revoked")
      }

      return {
        accessToken: this.generateAccessToken(user),
        refreshToken: this.generateRefreshToken(user),
      }
    } catch (error) {
      throw new Error("Invalid refresh token")
    }
  }
}
```

### JWT Best Practices

```javascript
// Don't store sensitive data in JWT
const token = jwt.sign(
  {
    userId: user.id,
    password: user.password, // NEVER!
    creditCard: user.creditCard, // NEVER!
  },
  secret
)

// Use minimal, non-sensitive data instead
const token = jwt.sign(
  {
    userId: user.id,
    role: user.role,
  },
  secret
)

// Always set expiration
const token = jwt.sign({ userId: user.id }, secret)

// Short-lived access tokens are best practice
const token = jwt.sign(
  { userId: user.id },
  secret,
  { expiresIn: "15m" } // Short expiry
)
```

## Password Security

### Hashing Passwords

```javascript
const bcrypt = require("bcrypt")

class PasswordService {
  static async hash(password) {
    const saltRounds = 12 // Higher = more secure but slower
    return await bcrypt.hash(password, saltRounds)
  }

  static async verify(password, hash) {
    return await bcrypt.compare(password, hash)
  }

  static validateStrength(password) {
    const minLength = 8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*]/.test(password)

    if (password.length < minLength) {
      throw new Error("Password must be at least 8 characters")
    }
    if (!hasUpper || !hasLower) {
      throw new Error(
        "Password must contain both uppercase and lowercase letters"
      )
    }
    if (!hasNumber) {
      throw new Error("Password must contain a number")
    }
    if (!hasSpecial) {
      throw new Error("Password must contain a special character")
    }

    return true
  }
}

// Usage
async function changePassword(userId, oldPassword, newPassword) {
  const user = await db.user.findUnique({ where: { id: userId } })

  // Verify old password
  const isValid = await PasswordService.verify(oldPassword, user.passwordHash)
  if (!isValid) {
    throw new Error("Current password is incorrect")
  }

  // Validate new password strength
  PasswordService.validateStrength(newPassword)

  // Hash and save new password
  const newHash = await PasswordService.hash(newPassword)
  await db.user.update({
    where: { id: userId },
    data: { passwordHash: newHash },
  })
}
```

## Role-Based Access Control (RBAC)

### Implementing RBAC

```javascript
// Define roles and permissions
const ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  GUEST: "guest",
}

const PERMISSIONS = {
  POST_CREATE: "post:create",
  POST_EDIT: "post:edit",
  POST_DELETE: "post:delete",
  USER_BAN: "user:ban",
  USER_DELETE: "user:delete",
}

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MODERATOR]: [
    PERMISSIONS.POST_EDIT,
    PERMISSIONS.POST_DELETE,
    PERMISSIONS.USER_BAN,
  ],
  [ROLES.USER]: [PERMISSIONS.POST_CREATE, PERMISSIONS.POST_EDIT],
  [ROLES.GUEST]: [],
}

// Authorization middleware
function requirePermission(permission) {
  return (req, res, next) => {
    const user = req.user

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const userPermissions = ROLE_PERMISSIONS[user.role] || []

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: "Forbidden" })
    }

    next()
  }
}

// Usage
app.delete(
  "/posts/:id",
  authenticate, // Middleware to verify JWT
  requirePermission(PERMISSIONS.POST_DELETE),
  async (req, res) => {
    await deletePost(req.params.id)
    res.json({ success: true })
  }
)
```

### Resource-Based Authorization

Sometimes permissions depend on resource ownership:

```javascript
async function canEditPost(user, post) {
  // Admins can edit anything
  if (user.role === ROLES.ADMIN) return true

  // Moderators can edit any post
  if (user.role === ROLES.MODERATOR) return true

  // Users can only edit their own posts
  if (user.role === ROLES.USER && user.id === post.authorId) return true

  return false
}

// Middleware for resource-based auth
function authorizeResource(checkFn) {
  return async (req, res, next) => {
    const resource = await getResource(req) // Fetch the resource
    const canAccess = await checkFn(req.user, resource)

    if (!canAccess) {
      return res.status(403).json({ error: "Forbidden" })
    }

    req.resource = resource
    next()
  }
}

// Usage
app.put(
  "/posts/:id",
  authenticate,
  authorizeResource(canEditPost),
  async (req, res) => {
    const post = req.resource
    const updated = await updatePost(post.id, req.body)
    res.json(updated)
  }
)
```

## Session Management

### Secure Session Handling

```javascript
class SessionService {
  static async createSession(userId, req) {
    const session = await db.session.create({
      data: {
        userId,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    return session.id
  }

  static async validateSession(sessionId, req) {
    const session = await db.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    })

    if (!session) {
      throw new Error("Invalid session")
    }

    if (session.expiresAt < new Date()) {
      await this.destroySession(sessionId)
      throw new Error("Session expired")
    }

    // Optional: Verify IP/User-Agent changes (security enhancement)
    if (session.ipAddress !== req.ip) {
      // Log suspicious activity
      console.warn("Session IP mismatch", {
        sessionId,
        oldIp: session.ipAddress,
        newIp: req.ip,
      })
    }

    return session.user
  }

  static async destroySession(sessionId) {
    await db.session.delete({ where: { id: sessionId } })
  }

  static async destroyAllUserSessions(userId) {
    await db.session.deleteMany({ where: { userId } })
  }
}
```

## OAuth Integration

### Implementing OAuth Flow

```javascript
class OAuthService {
  static async initiateOAuth(provider) {
    const config = {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
        scope: "email profile",
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        redirectUri: process.env.GITHUB_REDIRECT_URI,
        scope: "user:email",
      },
    }

    const params = new URLSearchParams({
      client_id: config[provider].clientId,
      redirect_uri: config[provider].redirectUri,
      scope: config[provider].scope,
      response_type: "code",
      state: this.generateState(), // CSRF protection
    })

    return `https://${provider}.com/oauth/authorize?${params}`
  }

  static async handleCallback(provider, code) {
    // Exchange code for token
    const tokenResponse = await fetch(`https://${provider}.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env[`${provider.toUpperCase()}_CLIENT_ID`],
        client_secret: process.env[`${provider.toUpperCase()}_CLIENT_SECRET`],
        redirect_uri: process.env[`${provider.toUpperCase()}_REDIRECT_URI`],
      }),
    })

    const { access_token } = await tokenResponse.json()

    // Fetch user info
    const userResponse = await fetch(`https://${provider}.com/api/user`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const oauthUser = await userResponse.json()

    // Find or create user
    let user = await db.user.findUnique({
      where: { [`${provider}Id`]: oauthUser.id },
    })

    if (!user) {
      user = await db.user.create({
        data: {
          email: oauthUser.email,
          name: oauthUser.name,
          [`${provider}Id`]: oauthUser.id,
          emailVerified: true, // OAuth emails are pre-verified
        },
      })
    }

    return user
  }
}
```

## Security Best Practices

### Rate Limiting Auth Endpoints

```javascript
const rateLimit = require("express-rate-limit")

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
})

app.post("/login", authLimiter, loginHandler)
```

### Protecting Against Common Attacks

```javascript
// CSRF Protection
const csrf = require("csurf")
const csrfProtection = csrf({ cookie: true })

app.use(csrfProtection)

// XSS Protection
app.use(helmet())

// SQL Injection Prevention (Prisma handles this, but be careful with raw queries)
// Never use string concatenation for queries
// const query = `SELECT * FROM users WHERE email = '${email}'`

// Always use parameterized queries
const user = await db.user.findUnique({ where: { email } })
```

## What I Learned

1. **JWT tokens should be short-lived**: Use refresh tokens for long-term sessions
2. **Always hash passwords**: Use bcrypt with sufficient rounds
3. **Implement RBAC properly**: Roles and permissions should be clearly defined
4. **Protect against common attacks**: Rate limiting, CSRF, XSS protection
5. **Session management matters**: Track sessions for security and logout functionality
6. **Never trust client-side**: Always verify permissions on the server

The key insight: **Security is not a feature—it's a requirement. Build it in from the start, not as an afterthought.**
