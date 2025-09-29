import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { CompanyProfile } from '@/types/companies-house'

export function useCompanyProfile(companyNumber: string | undefined) {
  return useQuery<CompanyProfile>({
    queryKey: ['company-profile', companyNumber],
    queryFn: async () => {
      if (!companyNumber) throw new Error('Company number is required')

      const response = await axios.get(`/api/companies/${companyNumber}`)
      return response.data
    },
    enabled: !!companyNumber,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}