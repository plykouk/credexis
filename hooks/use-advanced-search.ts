import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { CompanySearchResult } from '@/types/companies-house'
import type { SearchType } from '@/components/ui/advanced-search-bar'

export function useAdvancedSearch(
  query: string,
  searchType: SearchType = 'name',
  enabled = true
) {
  return useQuery<CompanySearchResult>({
    queryKey: ['company-search', query, searchType],
    queryFn: async () => {
      if (!query) throw new Error('Query is required')

      const response = await axios.get('/api/companies/search', {
        params: {
          q: query,
          search_type: searchType
        }
      })
      return response.data
    },
    enabled: enabled && !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}