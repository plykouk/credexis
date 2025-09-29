import { NextRequest, NextResponse } from 'next/server'
import CompaniesHouseAPI from '@/lib/companies-house-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { companyNumber: string } }
) {
  try {
    const { companyNumber } = params
    const searchParams = request.nextUrl.searchParams
    const itemsPerPage = parseInt(searchParams.get('items_per_page') || '25')
    const startIndex = parseInt(searchParams.get('start_index') || '0')

    if (!companyNumber) {
      return NextResponse.json(
        { error: 'Company number is required' },
        { status: 400 }
      )
    }

    const api = new CompaniesHouseAPI()
    const filingHistory = await api.getFilingHistory(
      companyNumber,
      itemsPerPage,
      startIndex
    )

    return NextResponse.json(filingHistory)
  } catch (error: any) {
    console.error('Filing History API Error:', error)

    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch filing history' },
      { status: 500 }
    )
  }
}