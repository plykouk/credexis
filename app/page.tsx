'use client'

import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, TrendingUp, FileText, Users, Shield, Zap, Sparkles, ArrowUpRight } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (query: string, searchType: SearchType) => {
    router.push(`/search?q=${encodeURIComponent(query)}&search_type=${searchType}`)
  }

  const quickSuggestions: Array<{ label: string; value: string; type: SearchType }> = [
    { label: 'Fintech scaleups', value: 'fintech', type: 'nature_of_business' },
    { label: 'SIC 62012', value: '62012', type: 'sic_code' },
    { label: 'Climate tech', value: 'climate', type: 'nature_of_business' }
  ]

  const features = [
    {
      icon: Building2,
      title: 'Company Profiles',
      description: 'Detailed information about UK companies',
      color: 'from-green-700 to-green-800'
    },
    {
      icon: FileText,
      title: 'Filing History',
      description: 'Annual accounts and returns',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: TrendingUp,
      title: 'Financial Data',
      description: 'Performance analysis',
      color: 'from-green-700 to-green-800'
    },
    {
      icon: Users,
      title: 'Directors',
      description: 'Key personnel information',
      color: 'from-green-600 to-green-700'
    }
  ]

  const stats = [
    { label: 'Companies', value: '5M+', icon: Building2 },
    { label: 'Documents', value: '100M+', icon: FileText },
    { label: 'Updates Daily', value: '50K+', icon: Zap },
  ]

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/95 to-emerald-950 text-white">
        <div className="absolute inset-x-0 top-[-220px] h-[420px] rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute inset-y-0 right-[-160px] w-[380px] bg-emerald-400/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl justify-center px-4 pt-12 pb-20 sm:px-6 sm:pb-28">
          <div className="w-full max-w-xl space-y-8 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-medium text-white/90 backdrop-blur">
              <Shield className="h-4 w-4" />
              Official Companies House partner experience
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Your mobile command centre for UK company data
              </h1>
              <p className="text-sm text-white/70 sm:text-base">
                Discover verified filings, directors, and financial insights crafted for small screens and quick decisions.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-1.5 text-left backdrop-blur-lg">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-200">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Search across millions of UK companies</p>
                    <p className="mt-1 text-xs text-white/60">Smart filters, adaptive insights, and instant filing access.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <ModernSearchBar onSearch={handleSearch} />
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {quickSuggestions.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSearch(item.value, item.type)}
                        className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/20"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center shadow-[0_18px_45px_-30px_rgba(15,23,42,0.6)]">
                        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-lg font-semibold text-white sm:text-xl">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 rounded-t-[36px] bg-white px-4 pb-16 pt-12 shadow-[0_-30px_60px_-35px_rgba(15,23,42,0.35)] sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Everything you need, beautifully organised</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Tailored for quick swipes, taps, and confident decisions on the go.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="group h-full rounded-3xl border border-slate-100 bg-slate-50/80 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_25px_40px_-30px_rgba(15,23,42,0.45)]">
                  <CardContent className="p-6">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-inner`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600">
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} CREDEXIS. Powered by Companies House API.
            </p>
            <p className="text-xs mt-2 text-slate-400">
              Company data provided by the UK government&apos;s official register.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}