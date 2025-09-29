'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useCompanyProfile } from '@/hooks/use-company-profile'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Building2,
  MapPin,
  Calendar,
  FileText,
  Users,
  Loader2
} from 'lucide-react'
import { formatDate, formatAddress, getCompanyStatusColor } from '@/lib/utils'
import type { FilingHistoryList, OfficerList } from '@/types/companies-house'

export default function CompanyDetailPage() {
  const params = useParams()
  const companyNumber = params.companyNumber as string
  const [activeTab, setActiveTab] = useState<'overview' | 'filings' | 'officers'>('overview')

  const { data: company, isLoading: companyLoading, error: companyError } = useCompanyProfile(companyNumber)

  const { data: filingHistory, isLoading: filingsLoading } = useQuery<FilingHistoryList>({
    queryKey: ['filing-history', companyNumber],
    queryFn: async () => {
      const response = await axios.get(`/api/companies/${companyNumber}/filing-history`)
      return response.data
    },
    enabled: !!companyNumber,
  })

  const { data: officers, isLoading: officersLoading } = useQuery<OfficerList>({
    queryKey: ['officers', companyNumber],
    queryFn: async () => {
      const response = await axios.get(`/api/company/${companyNumber}/officers`)
      return response.data
    },
    enabled: !!companyNumber,
  })

  // Find the latest accounts filing
  const latestAccounts = filingHistory?.items?.find(
    item => item.category === 'accounts' || item.type === 'AA'
  )

  if (companyLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (companyError || !company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Company not found or an error occurred.
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {company.company_name}
            </h1>
            <p className="text-sm text-gray-600">
              Company Number: {company.company_number}
            </p>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${getCompanyStatusColor(
              company.company_status
            )}`}
          >
            {company.company_status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Registered Office</p>
                <p className="text-sm text-gray-600">
                  {formatAddress(company.registered_office_address)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Incorporation Date</p>
                <p className="text-sm text-gray-600">
                  {formatDate(company.date_of_creation)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Company Type</p>
                <p className="text-sm text-gray-600">
                  {company.type}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {company.accounts && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Accounts</p>
                  <p className="text-sm text-gray-600">
                    Next due: {company.accounts.next_due ? formatDate(company.accounts.next_due) : 'N/A'}
                  </p>
                  {company.accounts.overdue && (
                    <p className="text-sm text-red-600 font-medium">OVERDUE</p>
                  )}
                </div>
              </div>
            )}

            {company.confirmation_statement && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Confirmation Statement</p>
                  <p className="text-sm text-gray-600">
                    Next due: {company.confirmation_statement.next_due ? formatDate(company.confirmation_statement.next_due) : 'N/A'}
                  </p>
                  {company.confirmation_statement.overdue && (
                    <p className="text-sm text-red-600 font-medium">OVERDUE</p>
                  )}
                </div>
              </div>
            )}

            {company.sic_codes && company.sic_codes.length > 0 && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">SIC Codes</p>
                  <p className="text-sm text-gray-600">
                    {company.sic_codes.join(', ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('filings')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'filings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Filing History
            </button>
            <button
              onClick={() => setActiveTab('officers')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'officers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Officers
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {latestAccounts && latestAccounts.links?.document_metadata && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-green-900">Latest Accounts Available</h4>
                      <p className="text-sm text-green-700 mt-1">
                        {latestAccounts.description_values?.made_up_date
                          ? `Made up to ${formatDate(latestAccounts.description_values.made_up_date)}`
                          : `Filed on ${formatDate(latestAccounts.date)}`}
                        {latestAccounts.pages && ` • ${latestAccounts.pages} pages`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const documentUrl = `/api/companies/document?url=${encodeURIComponent(latestAccounts.links?.document_metadata || '')}`
                        window.open(documentUrl, '_blank')
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                      disabled={!latestAccounts.links?.document_metadata}
                    >
                      <FileText className="h-5 w-5" />
                      View Latest Accounts
                    </button>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
                <dl className="grid md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Jurisdiction</dt>
                    <dd className="text-sm text-gray-900">{company.jurisdiction || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Has Charges</dt>
                    <dd className="text-sm text-gray-900">{company.has_charges ? 'Yes' : 'No'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Has Been Liquidated</dt>
                    <dd className="text-sm text-gray-900">{company.has_been_liquidated ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'filings' && (
            <div>
              {filingsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : filingHistory && filingHistory.items.length > 0 ? (
                <div className="space-y-3">
                  {filingHistory.items.map((filing) => {
                    const isAccounts = filing.category === 'accounts' || filing.type === 'AA'
                    const handleViewDocument = () => {
                      if (filing.links?.document_metadata) {
                        // Open document in new tab
                        const documentUrl = `/api/companies/document?url=${encodeURIComponent(filing.links.document_metadata)}`
                        window.open(documentUrl, '_blank')
                      }
                    }

                    return (
                      <div
                        key={filing.transaction_id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {filing.description}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(filing.date)} • {filing.type}
                              {filing.pages && ` • ${filing.pages} pages`}
                            </p>
                            {filing.description_values?.made_up_date && (
                              <p className="text-xs text-gray-500 mt-1">
                                Made up to: {formatDate(filing.description_values.made_up_date)}
                              </p>
                            )}
                          </div>
                          {filing.links?.document_metadata && (
                            <button
                              onClick={handleViewDocument}
                              className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4" />
                              {isAccounts ? 'View Accounts' : 'View Document'}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-600">No filing history available.</p>
              )}
            </div>
          )}

          {activeTab === 'officers' && (
            <div>
              {officersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : officers && officers.items && officers.items.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Current & Previous Officers
                    </h3>
                    <div className="text-sm text-gray-500">
                      {officers.active_count ? `${officers.active_count} active` : ''}
                      {officers.active_count && officers.resigned_count ? ', ' : ''}
                      {officers.resigned_count ? `${officers.resigned_count} resigned` : ''}
                    </div>
                  </div>
                  {officers.items.map((officer, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-gray-400" />
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">
                                {officer.name}
                              </h4>
                              <p className="text-sm text-gray-600 capitalize">
                                {officer.officer_role.toLowerCase().replace(/_/g, ' ')}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 space-y-2">
                            {officer.appointed_on && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Appointed:</span> {formatDate(officer.appointed_on)}
                              </p>
                            )}
                            {officer.resigned_on && (
                              <p className="text-sm text-red-600">
                                <span className="font-medium">Resigned:</span> {formatDate(officer.resigned_on)}
                              </p>
                            )}
                            {officer.nationality && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Nationality:</span> {officer.nationality}
                              </p>
                            )}
                            {officer.country_of_residence && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Country of Residence:</span> {officer.country_of_residence}
                              </p>
                            )}
                            {officer.occupation && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Occupation:</span> {officer.occupation}
                              </p>
                            )}
                            {officer.date_of_birth && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Date of Birth:</span>{' '}
                                {officer.date_of_birth.month && officer.date_of_birth.year
                                  ? `${officer.date_of_birth.month}/${officer.date_of_birth.year}`
                                  : 'N/A'}
                              </p>
                            )}
                            {officer.address && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Address:</span> {formatAddress(officer.address)}
                              </p>
                            )}
                          </div>
                        </div>
                        {!officer.resigned_on && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No officers information available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}