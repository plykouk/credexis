// Simple in-memory cache for API responses
// In production, consider using Redis or similar

interface CacheEntry {
  data: unknown
  expiry: number
}

class Cache {
  private store = new Map<string, CacheEntry>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes default

  // Clean up expired entries periodically
  constructor() {
    setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of this.store.entries()) {
        if (entry.expiry < now) {
          this.store.delete(key)
        }
      }
    }, 60000) // Clean every minute
  }

  get(key: string): unknown | null {
    const entry = this.store.get(key)

    if (!entry) {
      return null
    }

    if (entry.expiry < Date.now()) {
      this.store.delete(key)
      return null
    }

    return entry.data
  }

  set(key: string, data: unknown, ttlMs?: number): void {
    const ttl = ttlMs || this.defaultTTL
    this.store.set(key, {
      data,
      expiry: Date.now() + ttl
    })
  }

  delete(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }

  size(): number {
    return this.store.size
  }
}

// Create singleton instance
const cache = new Cache()

// Cache key generators for different API endpoints
export function getSearchCacheKey(query: string, searchType: string, itemsPerPage: number, startIndex: number): string {
  return `search:${searchType}:${query}:${itemsPerPage}:${startIndex}`
}

export function getCompanyCacheKey(companyNumber: string): string {
  return `company:${companyNumber}`
}

export function getFilingHistoryCacheKey(companyNumber: string, itemsPerPage: number, startIndex: number): string {
  return `filing:${companyNumber}:${itemsPerPage}:${startIndex}`
}

export function getOfficersCacheKey(companyNumber: string, itemsPerPage: number, startIndex: number): string {
  return `officers:${companyNumber}:${itemsPerPage}:${startIndex}`
}

// Cache TTL values (in milliseconds)
export const CACHE_TTL = {
  SEARCH: 5 * 60 * 1000,        // 5 minutes for search results
  COMPANY: 10 * 60 * 1000,       // 10 minutes for company profiles
  FILING: 5 * 60 * 1000,         // 5 minutes for filing history
  OFFICERS: 10 * 60 * 1000,      // 10 minutes for officers
}

export default cache