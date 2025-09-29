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
  Loader2,
  Sparkles
} from 'lucide-react'
import { formatDate, formatAddress } from '@/lib/utils'
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

  const statusStyles: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30',
    dissolved: 'bg-rose-500/15 text-rose-100 border border-rose-400/30',
    liquidation: 'bg-amber-500/15 text-amber-100 border border-amber-400/30',
    receivership: 'bg-amber-500/15 text-amber-100 border border-amber-400/30',
    administration: 'bg-amber-500/15 text-amber-100 border border-amber-400/30',
    dormant: 'bg-slate-500/15 text-slate-100 border border-slate-400/40'
  }

  const statusClass = statusStyles[company?.company_status?.toLowerCase() || ''] || 'bg-slate-500/20 text-slate-100 border border-slate-400/30'

  const heroHighlights = [
    {
      icon: Calendar,
      label: 'Incorporated',
      value: formatDate(company?.date_of_creation || '')
    },
    {
      icon: Building2,
      label: 'Company type',
      value: company?.type || 'N/A'
    },
    {
      icon: MapPin,
      label: 'Jurisdiction',
      value: company?.jurisdiction || 'N/A'
    }
  ]

  const overviewItems = [
    {
      label: 'Next accounts due',
      value: company?.accounts?.next_due ? formatDate(company.accounts.next_due) : 'Not provided',
      tone: company?.accounts?.overdue ? 'text-rose-600' : 'text-slate-700'
    },
    {
      label: 'Accounts status',
      value: company?.accounts?.overdue ? 'Overdue' : 'Up to date',
      tone: company?.accounts?.overdue ? 'text-rose-600' : 'text-emerald-600'
    },
    {
      label: 'Confirmation statement due',
      value: company?.confirmation_statement?.next_due ? formatDate(company.confirmation_statement.next_due) : 'Not provided',
      tone: 'text-slate-700'
    },
    {
      label: 'Has charges',
      value: company?.has_charges ? 'Yes' : 'No',
      tone: company?.has_charges ? 'text-emerald-600' : 'text-slate-700'
    },
    {
      label: 'Has been liquidated',
      value: company?.has_been_liquidated ? 'Yes' : 'No',
      tone: company?.has_been_liquidated ? 'text-rose-600' : 'text-slate-700'
    },
    {
      label: 'SIC codes',
      value: company?.sic_codes && company.sic_codes.length > 0 ? company.sic_codes.join(', ') : 'Not supplied',
      tone: 'text-slate-700'
    }
  ]

  if (companyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
      </div>
    )
  }

  if (companyError || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md rounded-3xl border border-rose-400/20 bg-rose-500/10 px-6 py-5 text-center text-rose-100 shadow-[0_25px_40px_-35px_rgba(244,63,94,0.65)]">
          Company not found or an error occurred.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/95 to-emerald-950 pb-24">
        <div className="absolute inset-x-0 top-[-240px] h-[420px] rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="relative mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6">
          <div className="rounded-[36px] border border-white/10 bg-white/10 p-1.5 backdrop-blur">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    <Sparkles className="h-4 w-4" />
                    Premium company profile
                  </div>
                  <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                    {company.company_name}
                  </h1>
                  <p className="text-sm text-white/70">
                    Company number {company.company_number}
                  </p>
                </div>
                <span className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                  {company.company_status}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {heroHighlights.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.6)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
                        <p className="text-sm font-medium text-white/90">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">Registered office</p>
                    <p className="text-sm text-white/80">{formatAddress(company.registered_office_address)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-16 rounded-t-[36px] bg-white px-4 pb-16 pt-12 shadow-[0_-40px_80px_-60px_rgba(15,23,42,0.6)] sm:px-6">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <nav className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-1 text-sm font-medium text-slate-600">
            {(['overview', 'filings', 'officers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl px-4 py-2 transition ${
                  activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'filings' && 'Filing history'}
                {tab === 'officers' && 'Officers'}
              </button>
            ))}
          </nav>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {latestAccounts && latestAccounts.links?.document_metadata && (
                  <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Latest accounts available</p>
                        <p className="mt-2 text-sm text-emerald-700">
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
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_20px_35px_-25px_rgba(16,185,129,0.8)] transition hover:bg-emerald-700 sm:w-auto"
                        disabled={!latestAccounts.links?.document_metadata}
                      >
                        <FileText className="h-4 w-4" />
                        View latest accounts
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {overviewItems.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                      <p className={`mt-2 text-sm font-semibold ${item.tone}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'filings' && (
              <div>
                {filingsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  </div>
                ) : filingHistory && filingHistory.items.length > 0 ? (
                  <div className="space-y-4">
                    {filingHistory.items.map((filing) => {
                      const isAccounts = filing.category === 'accounts' || filing.type === 'AA'
                      const handleViewDocument = () => {
                        if (filing.links?.document_metadata) {
                          const documentUrl = `/api/companies/document?url=${encodeURIComponent(filing.links.document_metadata)}`
                          window.open(documentUrl, '_blank')
                        }
                      }

                      return (
                        <div
                          key={filing.transaction_id}
                          className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{filing.description}</p>
                              <p className="mt-1 text-sm text-slate-500">
                                {formatDate(filing.date)} • {filing.type}
                                {filing.pages && ` • ${filing.pages} pages`}
                              </p>
                              {filing.description_values?.made_up_date && (
                                <p className="mt-1 text-xs text-slate-500">
                                  Made up to {formatDate(filing.description_values.made_up_date)}
                                </p>
                              )}
                            </div>
                            {filing.links?.document_metadata && (
                              <button
                                onClick={handleViewDocument}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                              >
                                <FileText className="h-4 w-4" />
                                {isAccounts ? 'View accounts' : 'View document'}
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No filing history available.</p>
                )}
              </div>
            )}

            {activeTab === 'officers' && (
              <div>
                {officersLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  </div>
                ) : officers && officers.items && officers.items.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">Current & previous officers</h3>
                      <div className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600">
                        {officers.active_count ? `${officers.active_count} active` : '0 active'}
                        {typeof officers.resigned_count === 'number' ? ` • ${officers.resigned_count} resigned` : ''}
                      </div>
                    </div>
                    {officers.items.map((officer, index) => (
                      <div
                        key={index}
                        className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex flex-1 gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white/90">
                              <Users className="h-5 w-5" />
                            </div>
                            <div className="space-y-1 text-sm text-slate-600">
                              <h4 className="text-base font-semibold text-slate-900">{officer.name}</h4>
                              <p className="capitalize text-slate-500">{officer.officer_role.toLowerCase().replace(/_/g, ' ')}</p>
                              {officer.appointed_on && (
                                <p>
                                  <span className="font-medium text-slate-500">Appointed:</span> {formatDate(officer.appointed_on)}
                                </p>
                              )}
                              {officer.resigned_on && (
                                <p className="text-rose-600">
                                  <span className="font-medium">Resigned:</span> {formatDate(officer.resigned_on)}
                                </p>
                              )}
                              {officer.occupation && (
                                <p>
                                  <span className="font-medium text-slate-500">Occupation:</span> {officer.occupation}
                                </p>
                              )}
                              {officer.nationality && (
                                <p>
                                  <span className="font-medium text-slate-500">Nationality:</span> {officer.nationality}
                                </p>
                              )}
                              {officer.country_of_residence && (
                                <p>
                                  <span className="font-medium text-slate-500">Country of residence:</span> {officer.country_of_residence}
                                </p>
                              )}
                              {officer.date_of_birth && (
                                <p>
                                  <span className="font-medium text-slate-500">Date of birth:</span>{' '}
                                  {officer.date_of_birth.month && officer.date_of_birth.year
                                    ? `${officer.date_of_birth.month}/${officer.date_of_birth.year}`
                                    : 'N/A'}
                                </p>
                              )}
                              {officer.address && (
                                <p>
                                  <span className="font-medium text-slate-500">Address:</span> {formatAddress(officer.address)}
                                </p>
                              )}
                            </div>
                          </div>
                          {!officer.resigned_on && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No officers information available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}