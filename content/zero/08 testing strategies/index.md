---
title: "Testing Strategies That Actually Work"
date: "2026-05-23"
description: "Practical testing approaches I learned from shipping production code - what to test, what to skip, and how to test efficiently"
tags: ["testing", "jest", "react-testing", "tdd", "quality"]
---

## The Testing Reality Check

I used to write tests for everything. Then I realized most of those tests didn't catch bugs—they just slowed me down. Here's what I learned about testing strategies that actually matter.

## The Testing Pyramid

### Unit Tests (Base - Most)

Fast, isolated tests for individual functions/components:

```javascript
// math.utils.test.js
import { calculateTotal, applyDiscount } from "./math.utils"

describe("calculateTotal", () => {
  it("should sum all prices", () => {
    const items = [{ price: 10 }, { price: 20 }, { price: 30 }]
    expect(calculateTotal(items)).toBe(60)
  })

  it("should handle empty array", () => {
    expect(calculateTotal([])).toBe(0)
  })

  it("should handle negative prices", () => {
    const items = [{ price: -10 }, { price: 20 }]
    expect(calculateTotal(items)).toBe(10)
  })
})

describe("applyDiscount", () => {
  it("should apply percentage discount", () => {
    expect(applyDiscount(100, 10)).toBe(90)
  })

  it("should handle 0 discount", () => {
    expect(applyDiscount(100, 0)).toBe(100)
  })

  it("should handle 100% discount", () => {
    expect(applyDiscount(100, 100)).toBe(0)
  })
})
```

### Integration Tests (Middle)

Test how different parts work together:

```javascript
// user.service.test.js
import { UserService } from "./user.service"
import { db } from "./db"
import { emailService } from "./email.service"

jest.mock("./db")
jest.mock("./email.service")

describe("UserService", () => {
  it("should create user and send welcome email", async () => {
    const mockUser = { id: 1, email: "test@example.com" }
    db.user.create.mockResolvedValue(mockUser)
    emailService.send.mockResolvedValue(true)

    const user = await UserService.createUser({
      email: "test@example.com",
      name: "Test User",
    })

    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        email: "test@example.com",
        name: "Test User",
      },
    })
    expect(emailService.send).toHaveBeenCalledWith({
      to: "test@example.com",
      subject: "Welcome!",
      template: "welcome",
    })
    expect(user).toEqual(mockUser)
  })
})
```

### E2E Tests (Top - Fewest)

Test complete user flows:

```javascript
// user-registration.e2e.test.js
import { test, expect } from "@playwright/test"

test("user can register and login", async ({ page }) => {
  // Register
  await page.goto("/register")
  await page.fill('[name="email"]', "test@example.com")
  await page.fill('[name="password"]', "password123")
  await page.fill('[name="name"]', "Test User")
  await page.click('button[type="submit"]')

  // Should redirect to login
  await expect(page).toHaveURL("/login")

  // Login
  await page.fill('[name="email"]', "test@example.com")
  await page.fill('[name="password"]', "password123")
  await page.click('button[type="submit"]')

  // Should be logged in
  await expect(page.locator("text=Welcome, Test User")).toBeVisible()
})
```

## What to Test (And What Not To)

### Test Business Logic

```javascript
// Business logic should be tested
function calculateShippingCost(order) {
  if (order.total > 100) return 0 // Free shipping over $100
  if (order.items.some(item => item.weight > 10)) return 15 // Heavy items
  return 5 // Standard shipping
}

// Test it!
describe("calculateShippingCost", () => {
  it("should provide free shipping for orders over $100", () => {
    const order = { total: 101, items: [] }
    expect(calculateShippingCost(order)).toBe(0)
  })

  it("should charge $15 for heavy items", () => {
    const order = { total: 50, items: [{ weight: 15 }] }
    expect(calculateShippingCost(order)).toBe(15)
  })

  it("should charge $5 for standard orders", () => {
    const order = { total: 50, items: [{ weight: 5 }] }
    expect(calculateShippingCost(order)).toBe(5)
  })
})
```

### Test Edge Cases

```javascript
// Always test edge cases
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero")
  return a / b
}

describe("divide", () => {
  it("should throw error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero")
  })

  it("should handle negative numbers", () => {
    expect(divide(-10, 2)).toBe(-5)
  })

  it("should handle decimal results", () => {
    expect(divide(1, 3)).toBeCloseTo(0.333, 3)
  })
})
```

### Don't Test Implementation Details

```javascript
// Testing implementation details (not recommended)
it("should call setState with new count", () => {
  const setState = jest.fn()
  incrementCount(setState)
  expect(setState).toHaveBeenCalledWith(expect.any(Function))
})

// Testing behavior instead
it("should increment count", () => {
  const [count, setCount] = useState(0)
  incrementCount(setCount)
  expect(count).toBe(1)
})
```

### Don't Test Third-Party Code

```javascript
// Testing library code directly (not necessary)
it("should format date with moment", () => {
  const date = moment("2023-01-01")
  expect(date.format("YYYY-MM-DD")).toBe("2023-01-01")
})

// Test your usage of it instead
it("should display formatted date", () => {
  const formatted = formatUserDate("2023-01-01")
  expect(formatted).toBe("Jan 1, 2023")
})
```

## React Component Testing

### Testing User Interactions

```javascript
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Counter } from "./Counter"

describe("Counter", () => {
  it("should increment when button is clicked", async () => {
    render(<Counter />)

    const button = screen.getByRole("button", { name: /increment/i })
    const count = screen.getByText(/count: 0/i)

    expect(count).toBeInTheDocument()

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
    })
  })

  it("should handle async actions", async () => {
    render(<UserProfile userId="123" />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    })
  })
})
```

### Testing Hooks

```javascript
import { renderHook, act } from "@testing-library/react"
import { useCounter } from "./useCounter"

describe("useCounter", () => {
  it("should increment count", () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

## API Testing

### Mocking API Calls

```javascript
// Mock fetch globally
global.fetch = jest.fn()

describe("fetchUser", () => {
  it("should fetch and return user data", async () => {
    const mockUser = { id: 1, name: "John Doe" }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    })

    const user = await fetchUser(1)

    expect(fetch).toHaveBeenCalledWith("/api/users/1")
    expect(user).toEqual(mockUser)
  })

  it("should handle errors", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"))

    await expect(fetchUser(1)).rejects.toThrow("Network error")
  })
})
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```javascript
// Testing implementation details (not recommended)
it("should call API service with correct parameters", () => {
  // Testing implementation details
})

// Testing behavior instead
it("should display user data after loading", async () => {
  // Testing what user sees
})
```

### 2. Use Descriptive Test Names

```javascript
// Unclear test names
it("test 1", () => {})
it("works", () => {})

// Descriptive test names
it("should calculate total price including tax", () => {})
it("should show error message when email is invalid", () => {})
```

### 3. Arrange-Act-Assert Pattern

```javascript
it("should add item to cart", () => {
  // Arrange - set up test data
  const cart = new Cart()
  const product = { id: 1, name: "Product", price: 10 }

  // Act - perform the action
  cart.addItem(product)

  // Assert - verify the result
  expect(cart.items).toHaveLength(1)
  expect(cart.items[0]).toEqual(product)
})
```

### 4. Keep Tests Independent

```javascript
// Tests that depend on each other (problematic)
let counter = 0

it("should set counter to 1", () => {
  counter = 1
  expect(counter).toBe(1)
})

it("should increment counter", () => {
  counter++ // Depends on previous test!
  expect(counter).toBe(2)
})

// Each test should be independent
it("should set counter to 1", () => {
  const counter = new Counter()
  counter.setValue(1)
  expect(counter.value).toBe(1)
})

it("should increment counter", () => {
  const counter = new Counter()
  counter.setValue(1)
  counter.increment()
  expect(counter.value).toBe(2)
})
```

## When to Write Tests

### Write Tests For:

- Business logic and calculations
- Complex conditional logic
- User-facing features
- Critical paths (payment, auth, data)
- Bug fixes (regression tests)

### Skip Tests For:

- Simple getters/setters
- Third-party library code
- Configuration files
- Static content
- Trivial utilities

## Test Coverage Reality

```javascript
// Aim for high coverage on critical code
// But don't chase 100% coverage - it's not worth it

// Critical functions: 90%+ coverage
// Utilities: 70-80% coverage
// Components: 60-70% coverage (focus on interactions)
// E2E: Cover main user flows only
```

## What I Learned

1. **Test what matters**: Business logic, edge cases, user flows
2. **Don't test everything**: Some code doesn't need tests
3. **Focus on behavior**: What users see, not implementation details
4. **Write tests that fail**: Tests that always pass aren't useful
5. **Tests are documentation**: Good tests explain how code should work
6. **Balance speed and coverage**: Fast tests > comprehensive tests

The key insight: **Good tests prevent bugs and give confidence. Bad tests slow you down without adding value. Know the difference.**
