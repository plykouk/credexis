import { NextRequest, NextResponse } from 'next/server'
import { rateLimitMiddleware, addRateLimitHeaders } from '@/lib/rate-limiter'
import cache, { getOfficersCacheKey, CACHE_TTL } from '@/lib/cache'

const API_KEY = process.env.COMPANIES_HOUSE_API_KEY
const API_URL = 'https://api.company-information.service.gov.uk'

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

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Check cache first
    const cacheKey = getOfficersCacheKey(companyNumber, 25, 0)
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      const response = NextResponse.json(cachedData)
      response.headers.set('X-Cache', 'HIT')
      response.headers.set('Cache-Control', 'public, max-age=600') // 10 minutes
      return addRateLimitHeaders(response, request)
    }

    // Fetch officers from Companies House API
    const apiResponse = await fetch(
      `${API_URL}/company/${companyNumber}/officers`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
        },
      }
    )

    if (!apiResponse.ok) {
      if (apiResponse.status === 404) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }
      throw new Error(`API responded with status ${apiResponse.status}`)
    }

    const data = await apiResponse.json()

    // Store in cache
    cache.set(cacheKey, data, CACHE_TTL.OFFICERS)

    // Return response with cache and rate limit headers
    const response = NextResponse.json(data)
    response.headers.set('X-Cache', 'MISS')
    response.headers.set('Cache-Control', 'public, max-age=600') // 10 minutes
    return addRateLimitHeaders(response, request)
  } catch (error) {
    console.error('Error fetching officers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch officers' },
      { status: 500 }
    )
  }
}