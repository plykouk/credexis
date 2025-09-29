import { NextRequest, NextResponse } from 'next/server'
import CompaniesHouseAPI from '@/lib/companies-house-api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const searchType = searchParams.get('search_type') || 'name' // name, sic_code, or nature_of_business
    const itemsPerPage = parseInt(searchParams.get('items_per_page') || '20')
    const startIndex = parseInt(searchParams.get('start_index') || '0')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const api = new CompaniesHouseAPI()
    let results

    if (searchType === 'name') {
      // Regular search by company name/number
      results = await api.searchCompanies(query, itemsPerPage, startIndex)
    } else {
      // Advanced search by SIC code or nature of business
      const advancedParams: Record<string, string | number> = {
        itemsPerPage,
        startIndex
      }

      if (searchType === 'sic_code') {
        // If it's a number, treat it as SIC code
        advancedParams.sicCodes = query.replace(/\s+/g, '')
      } else if (searchType === 'nature_of_business') {
        // Search by nature of business description
        advancedParams.natureOfBusiness = query
      }

      results = await api.advancedSearchCompanies(advancedParams)
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API Error:', error)

    // Check if API key is configured
    if (!process.env.COMPANIES_HOUSE_API_KEY) {
      console.error('Missing COMPANIES_HOUSE_API_KEY environment variable')
      return NextResponse.json(
        { error: 'API key not configured. Please set COMPANIES_HOUSE_API_KEY environment variable.' },
        { status: 500 }
      )
    }

    // Handle axios errors with more detail
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: unknown } }
      console.error('API Response Error:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data
      })

      if (axiosError.response?.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed. Please check your API key.' },
          { status: 401 }
        )
      }
      if (axiosError.response?.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to search companies. Please try again.' },
      { status: 500 }
    )
  }
}