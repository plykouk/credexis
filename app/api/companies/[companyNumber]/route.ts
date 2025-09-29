import { NextRequest, NextResponse } from 'next/server'
import CompaniesHouseAPI from '@/lib/companies-house-api'
import { rateLimitMiddleware, addRateLimitHeaders } from '@/lib/rate-limiter'
import cache, { getCompanyCacheKey, CACHE_TTL } from '@/lib/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyNumber: string }> }
) {
  // Apply rate limiting
  const rateLimitResponse = rateLimitMiddleware(request)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const { companyNumber } = await params

    if (!companyNumber) {
      return NextResponse.json(
        { error: 'Company number is required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = getCompanyCacheKey(companyNumber)
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      const response = NextResponse.json(cachedData)
      response.headers.set('X-Cache', 'HIT')
      response.headers.set('Cache-Control', 'public, max-age=600') // 10 minutes
      return addRateLimitHeaders(response, request)
    }

    const api = new CompaniesHouseAPI()
    const profile = await api.getCompanyProfile(companyNumber)

    // Store in cache
    cache.set(cacheKey, profile, CACHE_TTL.COMPANY)

    // Return response with cache and rate limit headers
    const response = NextResponse.json(profile)
    response.headers.set('X-Cache', 'MISS')
    response.headers.set('Cache-Control', 'public, max-age=600') // 10 minutes
    return addRateLimitHeaders(response, request)
  } catch (error) {
    console.error('Company Profile API Error:', error)

    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number } }
      if (axiosError.response?.status === 404) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch company profile' },
      { status: 500 }
    )
  }
}