'use client'

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
  Loader2,
  Download,
  ExternalLink,
  TrendingUp,
  Shield
} from 'lucide-react'
import { formatDate, formatAddress } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { FilingHistoryList, OfficerList } from '@/types/companies-house'

export default function CompanyDetailPage() {
  const params = useParams()
  const companyNumber = params.companyNumber as string

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
    active: 'bg-green-100 text-green-700',
    dissolved: 'bg-red-100 text-red-700',
    liquidation: 'bg-yellow-100 text-yellow-700',
    receivership: 'bg-yellow-100 text-yellow-700',
    administration: 'bg-yellow-100 text-yellow-700',
    dormant: 'bg-gray-100 text-gray-600'
  }

  const statusClass = statusStyles[company?.company_status?.toLowerCase() || ''] || 'bg-gray-100 text-gray-600'

  if (companyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    )
  }

  if (companyError || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <Card className="max-w-md border-red-200 bg-red-50">
          <CardContent className="p-6 text-center text-red-700">
            Company not found or an error occurred.
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatFilingDescription = (description?: string) => {
    if (!description) return "";
    const cleaned = description
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-semibold text-brand capitalize">
                  {company.company_name.toLowerCase()}
                </h1>
                <p className="text-xl text-gray-600">
                  Company number: {company.company_number}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-4 py-2 text-base font-medium ${statusClass}`}>
                  {company.company_status}
                </span>
              </div>
            </div>

            {/* Key Info Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-gray-200">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500">Registered Office</p>
                    <p className="text-base text-gray-900">{formatAddress(company.registered_office_address)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500">Incorporated</p>
                    <p className="text-base text-gray-900">{formatDate(company.date_of_creation)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500">Company Type</p>
                    <p className="text-base text-gray-900">{company.type || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="filings">Filing History</TabsTrigger>
              <TabsTrigger value="officers">Officers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {latestAccounts && latestAccounts.links?.document_metadata && (
                <Card className="border-brand-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-brand-700">
                      <FileText className="h-5 w-5" />
                      Latest Accounts Available
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-base text-gray-700">
                      {latestAccounts.description_values?.made_up_date
                        ? `Made up to ${formatDate(latestAccounts.description_values.made_up_date)}`
                        : `Filed on ${formatDate(latestAccounts.date)}`}
                      {latestAccounts.pages && ` • ${latestAccounts.pages} pages`}
                    </p>
                    <Button
                      onClick={() => {
                        const documentUrl = `/api/companies/document?url=${encodeURIComponent(latestAccounts.links?.document_metadata || '')}`
                        window.open(documentUrl, '_blank')
                      }}
                      className=""
                    >
                      <Download className="mr-2 h-4 w-4" />
                      View Latest Accounts
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-brand" />
                      Financial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-base text-gray-500">Next accounts due</p>
                      <p className={`font-medium ${company?.accounts?.overdue ? 'text-red-600' : 'text-gray-900'}`}>
                        {company?.accounts?.next_due ? formatDate(company.accounts.next_due) : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-500">Accounts status</p>
                      <p className={`font-medium ${company?.accounts?.overdue ? 'text-red-600' : 'text-green-600'}`}>
                        {company?.accounts?.overdue ? 'Overdue' : 'Up to date'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-brand" />
                      Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-base text-gray-500">Confirmation statement due</p>
                      <p className="font-medium text-gray-900">
                        {company?.confirmation_statement?.next_due ? formatDate(company.confirmation_statement.next_due) : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-500">SIC codes</p>
                      <p className="font-medium text-gray-900">
                        {company?.sic_codes && company.sic_codes.length > 0 ? company.sic_codes.join(', ') : 'Not supplied'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="filings" className="space-y-4">
              {filingsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-brand" />
                </div>
              ) : filingHistory && filingHistory.items.length > 0 ? (
                <div className="space-y-4">
                  {filingHistory.items.map((filing) => (
                    <Card key={filing.transaction_id} className="border-gray-200">
                      <CardContent className="flex items-start justify-between p-6">
                        <div>
                          <h3 className="text-lg font-semibold text-brand">{formatFilingDescription(filing.description)}</h3>
                          <p className="mt-1 text-base text-gray-500">
                            {formatDate(filing.date)} • {filing.type}
                            {filing.pages && ` • ${filing.pages} pages`}
                          </p>
                          {filing.description_values?.made_up_date && (
                            <p className="mt-1 text-base text-gray-500">
                              Made up to {formatDate(filing.description_values.made_up_date)}
                            </p>
                          )}
                        </div>
                        {filing.links?.document_metadata && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const documentUrl = `/api/companies/document?url=${encodeURIComponent(filing.links?.document_metadata || '')}`
                              window.open(documentUrl, '_blank')
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No filing history available.</p>
              )}
            </TabsContent>

            <TabsContent value="officers" className="space-y-4">
              {officersLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-brand" />
                </div>
              ) : officers && officers.items && officers.items.length > 0 ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-brand">Current & Previous Officers</h3>
                    <div className="rounded-lg bg-white px-3 py-1.5 text-base text-brand-700 shadow-sm">
                      {officers.active_count || 0} active • {officers.resigned_count || 0} resigned
                    </div>
                  </div>
                  <div className="space-y-4">
                    {officers.items.map((officer, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="flex items-start justify-between p-6">
                          <div className="flex gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-[0_10px_25px_-18px_rgba(220,121,87,0.8)]">
                              <Users className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-semibold text-brand">{officer.name}</h4>
                              <p className="text-base text-gray-600 capitalize">
                                {officer.officer_role.toLowerCase().replace(/_/g, ' ')}
                              </p>
                              {officer.appointed_on && (
                                <p className="text-base text-gray-500">
                                  Appointed: {formatDate(officer.appointed_on)}
                                </p>
                              )}
                              {officer.resigned_on && (
                                <p className="text-base text-red-600">
                                  Resigned: {formatDate(officer.resigned_on)}
                                </p>
                              )}
                              {officer.address && (
                                <p className="text-base text-gray-500">
                                  {formatAddress(officer.address)}
                                </p>
                              )}
                            </div>
                          </div>
                          {!officer.resigned_on && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                              Active
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500">No officers information available.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}