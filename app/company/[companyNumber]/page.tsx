'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCompanyProfile } from '@/hooks/use-company-profile'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Building2,
  MapPin,
  Calendar,
  FileText,
  Users,
  Loader2,
  ArrowLeft,
  ChevronRight
} from 'lucide-react'
import { formatDate, formatAddress } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
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

  const latestAccounts = filingHistory?.items?.find(
    item => item.category === 'accounts' || item.type === 'AA'
  )

  const statusStyles: Record<string, string> = {
    active: 'bg-green-50 text-green-700',
    dissolved: 'bg-red-50 text-red-700',
    liquidation: 'bg-yellow-50 text-yellow-700',
    receivership: 'bg-yellow-50 text-yellow-700',
    administration: 'bg-yellow-50 text-yellow-700',
    dormant: 'bg-gray-100 text-gray-600'
  }

  const statusClass = statusStyles[company?.company_status?.toLowerCase() || ''] || 'bg-gray-100 text-gray-600'

  if (companyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (companyError || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center text-red-700">
          Company not found or an error occurred.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-4">
        <div className="pt-6 pb-4">
          <Link href="/search" className="inline-flex items-center gap-2 text-gray-600 mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to search</span>
          </Link>

          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {company.company_name}
            </h1>
            <p className="text-sm text-gray-500">
              Company number: {company.company_number}
            </p>
            <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${statusClass}`}>
              {company.company_status}
            </span>
          </div>

          <Card className="mt-4 border-gray-200 bg-white">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Registered office</p>
                  <p className="text-sm text-gray-700">{formatAddress(company.registered_office_address)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Incorporated</p>
                  <p className="text-sm text-gray-700">{formatDate(company.date_of_creation)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Company type</p>
                  <p className="text-sm text-gray-700">{company.type || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <nav className="flex items-center gap-1 border-b border-gray-200 mb-4">
          {(['overview', 'filings', 'officers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'filings' && 'Filings'}
              {tab === 'officers' && 'Officers'}
            </button>
          ))}
        </nav>

        <div className="pb-16">
          {activeTab === 'overview' && (
            <div className="space-y-3">
              {latestAccounts && latestAccounts.links?.document_metadata && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-blue-700">Latest accounts</p>
                        <p className="text-sm text-blue-600 mt-1">
                          {latestAccounts.description_values?.made_up_date
                            ? `Made up to ${formatDate(latestAccounts.description_values.made_up_date)}`
                            : `Filed on ${formatDate(latestAccounts.date)}`}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const documentUrl = `/api/companies/document?url=${encodeURIComponent(latestAccounts.links?.document_metadata || '')}`
                          window.open(documentUrl, '_blank')
                        }}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View accounts
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-gray-200 bg-white">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Next accounts due</p>
                    <p className={`text-sm font-medium ${company?.accounts?.overdue ? 'text-red-600' : 'text-gray-700'}`}>
                      {company?.accounts?.next_due ? formatDate(company.accounts.next_due) : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Confirmation statement due</p>
                    <p className="text-sm font-medium text-gray-700">
                      {company?.confirmation_statement?.next_due ? formatDate(company.confirmation_statement.next_due) : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">SIC codes</p>
                    <p className="text-sm font-medium text-gray-700">
                      {company?.sic_codes && company.sic_codes.length > 0 ? company.sic_codes.join(', ') : 'Not supplied'}
                    </p>
                  </div>
                </CardContent>
              </Card>
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
                  {filingHistory.items.map((filing) => (
                    <Card key={filing.transaction_id} className="border-gray-200 bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{filing.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(filing.date)}
                              {filing.pages && ` • ${filing.pages} pages`}
                            </p>
                          </div>
                          {filing.links?.document_metadata && (
                            <button
                              onClick={() => {
                                const documentUrl = `/api/companies/document?url=${encodeURIComponent(filing.links.document_metadata)}`
                                window.open(documentUrl, '_blank')
                              }}
                              className="ml-3"
                            >
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">No filing history available</p>
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
                <div className="space-y-3">
                  <div className="text-sm text-gray-500 mb-3">
                    {officers.active_count} active • {officers.resigned_count || 0} resigned
                  </div>
                  {officers.items.map((officer, index) => (
                    <Card key={index} className="border-gray-200 bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{officer.name}</h4>
                            <p className="text-xs text-gray-500 mt-1 capitalize">
                              {officer.officer_role.toLowerCase().replace(/_/g, ' ')}
                            </p>
                            {officer.appointed_on && (
                              <p className="text-xs text-gray-500 mt-1">
                                Appointed {formatDate(officer.appointed_on)}
                              </p>
                            )}
                            {officer.resigned_on && (
                              <p className="text-xs text-red-600 mt-1">
                                Resigned {formatDate(officer.resigned_on)}
                              </p>
                            )}
                          </div>
                          {!officer.resigned_on && (
                            <span className="inline-flex rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                              Active
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">No officers information available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}