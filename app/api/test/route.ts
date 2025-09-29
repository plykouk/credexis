import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const apiKey = process.env.COMPANIES_HOUSE_API_KEY

    // Check if API key exists
    if (!apiKey) {
      return NextResponse.json({
        status: 'error',
        message: 'COMPANIES_HOUSE_API_KEY environment variable is not set',
        apiKeyExists: false,
        apiKeyLength: 0
      })
    }

    // Try a simple API call to validate the key
    const testResponse = await axios.get(
      'https://api.company-information.service.gov.uk/company/00000001',
      {
        auth: {
          username: apiKey,
          password: ''
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    )

    return NextResponse.json({
      status: 'success',
      message: 'API key is valid and working',
      apiKeyExists: true,
      apiKeyLength: apiKey.length,
      testResponseStatus: testResponse.status
    })
  } catch (error) {
    const axiosError = error as { response?: { status?: number; statusText?: string } }

    return NextResponse.json({
      status: 'error',
      message: 'API test failed',
      apiKeyExists: !!process.env.COMPANIES_HOUSE_API_KEY,
      apiKeyLength: process.env.COMPANIES_HOUSE_API_KEY?.length || 0,
      errorStatus: axiosError.response?.status,
      errorMessage: axiosError.response?.statusText,
      suggestion: axiosError.response?.status === 401
        ? 'API key is invalid or not authorized'
        : 'Check network connection and API availability'
    })
  }
}