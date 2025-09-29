import { NextRequest, NextResponse } from 'next/server'
import CompaniesHouseAPI from '@/lib/companies-house-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { companyNumber: string } }
) {
  try {
    const { companyNumber } = params

    if (!companyNumber) {
      return NextResponse.json(
        { error: 'Company number is required' },
        { status: 400 }
      )
    }

    const api = new CompaniesHouseAPI()
    const profile = await api.getCompanyProfile(companyNumber)

    return NextResponse.json(profile)
  } catch (error: any) {
    console.error('Company Profile API Error:', error)

    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch company profile' },
      { status: 500 }
    )
  }
}