'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Building2,
  TrendingUp,
  FileText,
  Bookmark,
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (query: string, searchType: SearchType) => {
    router.push(`/search?q=${encodeURIComponent(query)}&search_type=${searchType}`)
  }

  const features = [
    {
      icon: Bookmark,
      title: 'Watchlist',
      description: 'Create personalised watchlists to monitor the companies that matter to you and get quick access to their latest updates.',
    },
    {
      icon: Building2,
      title: 'Company Profiles',
      description: 'Access detailed information on over 5 million UK companies including registration details, status, and business activities.',
    },
    {
      icon: FileText,
      title: 'Filing History',
      description: 'View comprehensive filing history including annual accounts, confirmation statements, and corporate changes.',
    },
    {
      icon: TrendingUp,
      title: 'Financial Analysis',
      description: 'Analyze financial performance with key metrics, trends, and comparative data from official filings.',
    },
    {
      icon: Shield,
      title: 'Due Diligence',
      description: 'Comprehensive compliance checks with real-time updates from Companies House official records.',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications on filing updates and status changes for monitored companies.',
    },
  ]

  const stats = [
    { label: 'Companies', value: '5M+' },
    { label: 'Documents', value: '100M+' },
    { label: 'Daily Updates', value: '50K+' },
    { label: 'API Uptime', value: '99.9%' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[rgba(220,121,87,0.05)]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hero-grid" width="160" height="160" patternUnits="userSpaceOnUse">
                <path d="M160 0H0V160" fill="none" stroke="rgba(220,121,87,0.22)" strokeWidth="1.2" />
                <path d="M0 40H160M40 0V160" fill="none" stroke="rgba(220,121,87,0.16)" strokeWidth="0.8" />
                <circle cx="40" cy="40" r="6" fill="rgba(220,121,87,0.22)" />
                <circle cx="120" cy="120" r="4" fill="rgba(220,121,87,0.2)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-base font-medium text-brand-700">
              <Zap className="h-4 w-4" />
              Powered by Official Companies House API
            </div>

            <h1 className="mb-6 text-5xl font-semibold leading-tight text-brand lg:text-6xl">
              UK Company Intelligence
              <span className="block">Made Simple</span>
            </h1>

            <p className="mb-12 text-2xl text-gray-600 lg:text-3xl">
              Search millions of UK companies. Access official filings, financial data, and director information instantly.
            </p>

            <div className="mx-auto max-w-2xl">
              <ModernSearchBar onSearch={handleSearch} layout="hero" />
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-y-10">
              {stats.map((stat, index) => (
                <Fragment key={stat.label}>
                  <div className="flex flex-col items-center px-8 text-center sm:px-16">
                    <div className="text-3xl font-semibold text-brand">{stat.value}</div>
                    <div className="text-base text-gray-600">{stat.label}</div>
                  </div>
                  {index < stats.length - 1 && (
                    <span
                      className="hidden h-16 w-px bg-brand sm:inline-block"
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-gray-100 bg-white py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold text-brand lg:text-5xl">
              Everything you need for company research
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Professional-grade tools for due diligence, compliance, and business intelligence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="group relative overflow-hidden border-gray-200 bg-white transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-200 group-hover:text-brand-900">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-brand">{feature.title}</h3>
                    <p className="text-lg text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-4xl font-semibold text-brand lg:text-5xl">
              Start your company research today
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Join thousands of professionals using Credexis for company intelligence and due diligence.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="px-8"
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Searching
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}