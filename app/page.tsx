'use client'

import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, TrendingUp, FileText, Users, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (query: string, searchType: SearchType) => {
    router.push(`/search?q=${encodeURIComponent(query)}&search_type=${searchType}`)
  }

  const features = [
    {
      icon: Building2,
      title: 'Company Profiles',
      description: 'Detailed information about UK companies',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Filing History',
      description: 'Annual accounts and returns',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Financial Data',
      description: 'Performance analysis',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Directors',
      description: 'Key personnel information',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const stats = [
    { label: 'Companies', value: '5M+', icon: Building2 },
    { label: 'Documents', value: '100M+', icon: FileText },
    { label: 'Updates Daily', value: '50K+', icon: Zap },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium mb-4">
              <Shield className="h-3.5 w-3.5" />
              Official Companies House Data
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              UK Company Information
              <span className="block text-blue-600 mt-1">at Your Fingertips</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Search millions of UK companies. Access financial accounts, filing history, and director information instantly.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <ModernSearchBar onSearch={handleSearch} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-12">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-100 mb-2">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Everything You Need
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive company data from the official UK register
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${feature.color} mb-3`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} CREDEXIS. Powered by Companies House API.
            </p>
            <p className="text-xs mt-2 text-slate-400">
              Company data provided by the UK government's official register.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}