'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { ModernCompanyCard } from '@/components/ui/modern-company-card'
import { useAdvancedSearch } from '@/hooks/use-advanced-search'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-4">
        <div className="pt-6 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Search Results</h1>

          <ModernSearchBar
            onSearch={handleSearch}
            defaultSearchType={searchType}
            layout="light"
          />
        </div>

        <div className="pb-16">
          {isLoading && (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              An error occurred while searching. Please try again.
            </div>
          )}

          {data && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  {data.total_results.toLocaleString()} results
                  {searchType === 'sic_code' && ` for SIC "${searchQuery}"`}
                  {searchType === 'nature_of_business' && ` for "${searchQuery}"`}
                  {searchType === 'name' && ` for "${searchQuery}"`}
                </p>
              </div>

              {data.items.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">No companies found</h3>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.items.map((company) => (
                    <ModernCompanyCard key={company.company_number} company={company} />
                  ))}
                </div>
              )}

              {data.total_results > data.items.length && (
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
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