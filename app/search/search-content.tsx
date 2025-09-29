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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-4xl mx-auto">
            <ModernSearchBar
              onSearch={handleSearch}
              defaultSearchType={searchType}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              An error occurred while searching. Please try again.
            </div>
          )}

          {data && (
            <>
              {/* Results Header */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Search Results
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">
                    Found {data.total_results.toLocaleString()} companies
                    {searchType === 'sic_code' && ` with SIC code "${searchQuery}"`}
                    {searchType === 'nature_of_business' && ` for "${searchQuery}"`}
                    {searchType === 'name' && ` matching "${searchQuery}"`}
                  </p>
                </div>

                {data.total_results > 0 && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Building2 className="h-4 w-4" />
                    <span>{data.items.length} of {data.total_results.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {data.items.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">No companies found</h2>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Try adjusting your search terms or using a different search type.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.items.map((company) => (
                    <ModernCompanyCard key={company.company_number} company={company} />
                  ))}
                </div>
              )}

              {/* Pagination placeholder */}
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