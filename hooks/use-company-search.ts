import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { CompanySearchResult } from '@/types/companies-house'

export function useCompanySearch(query: string, enabled = true) {
  return useQuery<CompanySearchResult>({
    queryKey: ['company-search', query],
    queryFn: async () => {
      if (!query) throw new Error('Query is required')

      const response = await axios.get('/api/companies/search', {
        params: { q: query }
      })
      return response.data
    },
    enabled: enabled && !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}