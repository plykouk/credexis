'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { ModernCompanyCard } from '@/components/ui/modern-company-card'
import { useAdvancedSearch } from '@/hooks/use-advanced-search'
import { Skeleton } from '@/components/ui/skeleton'
import { Building2, Search } from 'lucide-react'

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryParam = searchParams.get('q') || ''
  const searchTypeParam = (searchParams.get('search_type') || 'name') as SearchType
  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [searchType, setSearchType] = useState<SearchType>(searchTypeParam)
  const { data, isLoading, error } = useAdvancedSearch(searchQuery, searchType)

  useEffect(() => {
    setSearchQuery(queryParam)
    setSearchType(searchTypeParam)
  }, [queryParam, searchTypeParam])

  const handleSearch = (query: string, type: SearchType) => {
    setSearchQuery(query)
    setSearchType(type)
    router.push(`/search?q=${encodeURIComponent(query)}&search_type=${type}`)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/95 to-emerald-950 pb-20">
        <div className="absolute inset-x-0 top-[-240px] h-[420px] rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="relative mx-auto w-full max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-[36px] border border-white/10 bg-white/10 p-1.5 backdrop-blur">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-5">
              <div className="mb-6 flex items-center justify-between text-white/70">
                <div>
                  <h1 className="text-lg font-semibold text-white sm:text-xl">Search Companies</h1>
                  <p className="text-xs sm:text-sm">Refine filters and explore filings in a mobile native layout.</p>
                </div>
                <div className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium sm:inline-flex">
                  Real-time from Companies House
                </div>
              </div>
              <ModernSearchBar
                onSearch={handleSearch}
                defaultSearchType={searchType}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-16 rounded-t-[36px] bg-white px-4 pb-16 pt-12 shadow-[0_-40px_80px_-60px_rgba(15,23,42,0.6)] sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          {isLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-3xl" />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
              An error occurred while searching. Please try again.
            </div>
          )}

          {data && (
            <>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Search Results
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Found {data.total_results.toLocaleString()} companies
                    {searchType === 'sic_code' && ` with SIC code "${searchQuery}"`}
                    {searchType === 'nature_of_business' && ` for "${searchQuery}"`}
                    {searchType === 'name' && ` matching "${searchQuery}"`}
                  </p>
                </div>

                {data.total_results > 0 && (
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-600">
                    <Building2 className="h-4 w-4" />
                    <span>{data.items.length} of {data.total_results.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {data.items.length === 0 ? (
                <div className="py-12 text-center sm:py-16">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">No companies found</h3>
                  <p className="mx-auto max-w-md text-slate-500">
                    Try adjusting your search terms or using a different search type.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {data.items.map((company) => (
                    <ModernCompanyCard key={company.company_number} company={company} />
                  ))}
                </div>
              )}

              {data.total_results > data.items.length && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-500">
                    Showing {data.items.length} of {data.total_results.toLocaleString()} results
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}