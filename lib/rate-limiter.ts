import { NextRequest, NextResponse } from 'next/server'

// Rate limiting implementation based on Companies House API guidelines
// 600 requests per 5 minutes (300 seconds)
const RATE_LIMIT = 600
const WINDOW_MS = 5 * 60 * 1000 // 5 minutes in milliseconds

// In-memory store for rate limiting (in production, use Redis or similar)
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 60000) // Clean every minute

export function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting (in production, consider using user ID if authenticated)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'
  return `rate-limit:${ip}`
}

export function checkRateLimit(request: NextRequest): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const key = getRateLimitKey(request)
  const now = Date.now()

  let entry = rateLimitStore.get(key)

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired one
    entry = {
      count: 1,
      resetTime: now + WINDOW_MS
    }
    rateLimitStore.set(key, entry)
    return {
      allowed: true,
      remaining: RATE_LIMIT - 1,
      resetTime: entry.resetTime
    }
  }

  if (entry.count >= RATE_LIMIT) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }

  // Increment count
  entry.count++
  rateLimitStore.set(key, entry)

  return {
    allowed: true,
    remaining: RATE_LIMIT - entry.count,
    resetTime: entry.resetTime
  }
}

export function rateLimitMiddleware(request: NextRequest): NextResponse | null {
  const { allowed, remaining, resetTime } = checkRateLimit(request)

  if (!allowed) {
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)

    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Companies House API allows 600 requests per 5 minutes.',
        retryAfter: `${retryAfter} seconds`
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
          'Retry-After': retryAfter.toString()
        }
      }
    )
  }

  // Return null to continue with the request
  // The calling function should add these headers to the response
  return null
}

export function addRateLimitHeaders(response: NextResponse, request: NextRequest): NextResponse {
  const { remaining, resetTime } = checkRateLimit(request)

  response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString())
  response.headers.set('X-RateLimit-Remaining', Math.max(0, remaining - 1).toString())
  response.headers.set('X-RateLimit-Reset', resetTime.toString())

  return response
}