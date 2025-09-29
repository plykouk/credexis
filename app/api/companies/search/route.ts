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
    return NextResponse.json(
      { error: 'Failed to search companies' },
      { status: 500 }
    )
  }
}