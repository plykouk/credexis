import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.COMPANIES_HOUSE_API_KEY
const API_URL = 'https://api.company-information.service.gov.uk'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyNumber: string }> }
) {
  try {
    const { companyNumber } = await params

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Fetch officers from Companies House API
    const response = await fetch(
      `${API_URL}/company/${companyNumber}/officers`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching officers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch officers' },
      { status: 500 }
    )
  }
}