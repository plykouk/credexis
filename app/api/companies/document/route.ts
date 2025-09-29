import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.COMPANIES_HOUSE_API_KEY || ''

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const documentUrl = searchParams.get('url')

    if (!documentUrl) {
      return NextResponse.json(
        { error: 'Document URL is required' },
        { status: 400 }
      )
    }

    // First get document metadata
    const metadataResponse = await axios.get(documentUrl, {
      auth: {
        username: API_KEY,
        password: ''
      },
      headers: {
        'Accept': 'application/json'
      }
    })

    const metadata = metadataResponse.data
    const contentUrl = metadata.links?.document

    if (!contentUrl) {
      return NextResponse.json(
        { error: 'Document content URL not found' },
        { status: 404 }
      )
    }

    // Fetch the actual document
    const documentResponse = await axios.get(contentUrl, {
      auth: {
        username: API_KEY,
        password: ''
      },
      headers: {
        'Accept': 'application/pdf'
      },
      responseType: 'arraybuffer'
    })

    // Return the PDF with appropriate headers
    return new NextResponse(documentResponse.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="company-document.pdf"`,
      }
    })
  } catch (error: any) {
    console.error('Document API Error:', error)

    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    )
  }
}