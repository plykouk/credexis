'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { ModernCompanyCard } from '@/components/ui/modern-company-card'
import { useAdvancedSearch } from '@/hooks/use-advanced-search'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-3xl font-semibold text-brand">Company Search</h1>
            <ModernSearchBar
              onSearch={handleSearch}
              defaultSearchType={searchType}
              layout="light"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-center text-red-700">
              An error occurred while searching. Please try again.
            </div>
          )}

          {data && (
            <>
              <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-brand">
                    Search Results
                  </h2>
                  <p className="mt-1 text-lg text-gray-600">
                    Found {data.total_results.toLocaleString()} companies
                    {searchType === 'sic_code' && ` with SIC code "${searchQuery}"`}
                    {searchType === 'nature_of_business' && ` for "${searchQuery}"`}
                    {searchType === 'name' && ` matching "${searchQuery}"`}
                  </p>
                </div>

                {data.total_results > 0 && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <div className="rounded-lg bg-brand-50 px-3 py-1.5 text-base text-brand-700">
                      {data.items.length} of {data.total_results.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {data.items.length === 0 ? (
                <div className="mx-auto max-w-md py-16 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-brand">No companies found</h3>
                  <p className="text-lg text-gray-600">
                    Try adjusting your search terms or using a different search type.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {data.items.map((company) => (
                    <ModernCompanyCard key={company.company_number} company={company} />
                  ))}
                </div>
              )}

              {data.total_results > data.items.length && (
                <div className="mt-12 text-center">
                  <p className="text-base text-gray-500">
                    Showing {data.items.length} of {data.total_results.toLocaleString()} results
                  </p>
                  <Button className="mt-4">
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}