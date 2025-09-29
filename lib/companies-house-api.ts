import axios from 'axios'
import type {
  CompanySearchResult,
  CompanyProfile,
  FilingHistoryList,
  OfficerList
} from '@/types/companies-house'

const API_BASE_URL = 'https://api.company-information.service.gov.uk'

class CompaniesHouseAPI {
  private apiKey: string
  private axiosInstance

  constructor() {
    this.apiKey = process.env.COMPANIES_HOUSE_API_KEY || ''

    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      auth: {
        username: this.apiKey,
        password: ''
      },
      headers: {
        'Accept': 'application/json',
      },
    })

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          console.error('API Error:', error.response.status, error.response.data)
        }
        throw error
      }
    )
  }

  // Search for companies
  async searchCompanies(query: string, itemsPerPage = 20, startIndex = 0): Promise<CompanySearchResult> {
    const response = await this.axiosInstance.get('/search/companies', {
      params: {
        q: query,
        items_per_page: itemsPerPage,
        start_index: startIndex,
      }
    })
    return response.data
  }

  // Advanced search for companies
  async advancedSearchCompanies(
    params: {
      companyNameIncludes?: string
      sicCodes?: string
      natureOfBusiness?: string
      itemsPerPage?: number
      startIndex?: number
    }
  ): Promise<any> {
    const searchParams: any = {
      items_per_page: params.itemsPerPage || 20,
      start_index: params.startIndex || 0,
    }

    if (params.companyNameIncludes) {
      searchParams.company_name_includes = params.companyNameIncludes
    }
    if (params.sicCodes) {
      searchParams.sic_codes = params.sicCodes
    }
    if (params.natureOfBusiness) {
      searchParams.nature_of_business = params.natureOfBusiness
    }

    const response = await this.axiosInstance.get('/advanced-search/companies', {
      params: searchParams
    })

    // Transform the response to match our CompanySearchResult interface
    return {
      items: response.data.items || [],
      total_results: response.data.hits || 0,
      items_per_page: params.itemsPerPage || 20,
      start_index: params.startIndex || 0
    }
  }

  // Get company profile
  async getCompanyProfile(companyNumber: string): Promise<CompanyProfile> {
    const response = await this.axiosInstance.get(`/company/${companyNumber}`)
    return response.data
  }

  // Get filing history
  async getFilingHistory(
    companyNumber: string,
    itemsPerPage = 25,
    startIndex = 0
  ): Promise<FilingHistoryList> {
    const response = await this.axiosInstance.get(
      `/company/${companyNumber}/filing-history`,
      {
        params: {
          items_per_page: itemsPerPage,
          start_index: startIndex,
        }
      }
    )
    return response.data
  }

  // Get officers
  async getOfficers(
    companyNumber: string,
    itemsPerPage = 25,
    startIndex = 0
  ): Promise<OfficerList> {
    const response = await this.axiosInstance.get(
      `/company/${companyNumber}/officers`,
      {
        params: {
          items_per_page: itemsPerPage,
          start_index: startIndex,
        }
      }
    )
    return response.data
  }

  // Get filing history document
  getDocumentUrl(transactionId: string): string {
    // This returns the URL to download the document
    // In production, this should be proxied through your server
    return `${API_BASE_URL}/company/${transactionId}/filing-history/${transactionId}/document`
  }
}

export default CompaniesHouseAPI