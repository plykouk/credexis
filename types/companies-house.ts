export interface CompanySearchResult {
  items: CompanySearchItem[]
  total_results: number
  items_per_page: number
  start_index: number
}

export interface CompanySearchItem {
  company_number: string
  title: string
  company_type: string
  company_status: string
  date_of_creation: string
  address: {
    premises?: string
    address_line_1?: string
    address_line_2?: string
    locality?: string
    region?: string
    postal_code?: string
    country?: string
  }
  matches?: {
    title?: number[]
    snippet?: string
  }
}

export interface CompanyProfile {
  company_name: string
  company_number: string
  type: string
  jurisdiction: string
  company_status: string
  date_of_creation: string
  registered_office_address: Address
  sic_codes?: string[]
  has_been_liquidated?: boolean
  has_charges?: boolean
  accounts?: {
    next_due?: string
    last_accounts?: {
      made_up_to?: string
      type?: string
    }
    next_made_up_to?: string
    accounting_reference_date?: {
      day?: string
      month?: string
    }
    overdue?: boolean
  }
  confirmation_statement?: {
    next_due?: string
    overdue?: boolean
    last_made_up_to?: string
  }
  links?: {
    self?: string
    filing_history?: string
    officers?: string
    persons_with_significant_control?: string
    charges?: string
  }
}

export interface Address {
  premises?: string
  address_line_1?: string
  address_line_2?: string
  locality?: string
  region?: string
  postal_code?: string
  country?: string
  care_of?: string
  po_box?: string
}

export interface FilingHistoryList {
  items: FilingHistoryItem[]
  total_count: number
  items_per_page: number
  start_index: number
}

export interface FilingHistoryItem {
  category: string
  date: string
  description: string
  description_values?: Record<string, string>
  type: string
  pages?: number
  barcode?: string
  transaction_id: string
  links?: {
    self?: string
    document_metadata?: string
  }
  paper_filed?: boolean
}

export interface OfficerList {
  items: Officer[]
  total_results: number
  items_per_page: number
  start_index: number
  active_count?: number
  resigned_count?: number
}

export interface Officer {
  name: string
  officer_role: string
  appointed_on?: string
  resigned_on?: string
  date_of_birth?: {
    month?: number
    year?: number
  }
  nationality?: string
  country_of_residence?: string
  occupation?: string
  address: Address
  links?: {
    self?: string
    officer?: {
      appointments?: string
    }
  }
}