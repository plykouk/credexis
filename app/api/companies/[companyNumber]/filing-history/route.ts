import { NextRequest, NextResponse } from 'next/server'
import CompaniesHouseAPI from '@/lib/companies-house-api'
import { rateLimitMiddleware, addRateLimitHeaders } from '@/lib/rate-limiter'
import cache, { getFilingHistoryCacheKey, CACHE_TTL } from '@/lib/cache'

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
    const searchParams = request.nextUrl.searchParams
    const itemsPerPage = parseInt(searchParams.get('items_per_page') || '25')
    const startIndex = parseInt(searchParams.get('start_index') || '0')

    if (!companyNumber) {
      return NextResponse.json(
        { error: 'Company number is required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = getFilingHistoryCacheKey(companyNumber, itemsPerPage, startIndex)
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      const response = NextResponse.json(cachedData)
      response.headers.set('X-Cache', 'HIT')
      response.headers.set('Cache-Control', 'public, max-age=300') // 5 minutes
      return addRateLimitHeaders(response, request)
    }

    const api = new CompaniesHouseAPI()
    const filingHistory = await api.getFilingHistory(
      companyNumber,
      itemsPerPage,
      startIndex
    )

    // Store in cache
    cache.set(cacheKey, filingHistory, CACHE_TTL.FILING)

    // Return response with cache and rate limit headers
    const response = NextResponse.json(filingHistory)
    response.headers.set('X-Cache', 'MISS')
    response.headers.set('Cache-Control', 'public, max-age=300') // 5 minutes
    return addRateLimitHeaders(response, request)
  } catch (error) {
    console.error('Filing History API Error:', error)

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
      { error: 'Failed to fetch filing history' },
      { status: 500 }
    )
  }
}