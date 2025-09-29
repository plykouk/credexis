'use client'

import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, TrendingUp, FileText, Users, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (query: string, searchType: SearchType) => {
    router.push(`/search?q=${encodeURIComponent(query)}&search_type=${searchType}`)
  }

  const features = [
    {
      icon: Building2,
      title: 'Company Profiles',
      description: 'Detailed information'
    },
    {
      icon: FileText,
      title: 'Filing History',
      description: 'Accounts and returns'
    },
    {
      icon: TrendingUp,
      title: 'Financial Data',
      description: 'Performance metrics'
    },
    {
      icon: Users,
      title: 'Directors',
      description: 'Key personnel'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-4">
        <section className="pt-12 pb-8">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">
              Search UK Company Information
            </p>
          </div>

          <ModernSearchBar onSearch={handleSearch} layout="light" />
        </section>

        <section className="pb-16">
          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-gray-200 bg-white shadow-sm">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                        <Icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <footer className="border-t border-gray-200 py-8 mt-auto">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} CREDEXIS
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Powered by Companies House API
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}