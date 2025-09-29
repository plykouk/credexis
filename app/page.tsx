'use client'

import { useRouter } from 'next/navigation'
import { ModernSearchBar, SearchType } from '@/components/ui/modern-search-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Building2,
  TrendingUp,
  FileText,
  Users,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Lock
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (query: string, searchType: SearchType) => {
    router.push(`/search?q=${encodeURIComponent(query)}&search_type=${searchType}`)
  }

  const features = [
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
      icon: Users,
      title: 'Director Information',
      description: 'Track current and past directors, their appointments, resignations, and other directorships.',
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-blue-50 opacity-40" />
        <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
              <Zap className="h-4 w-4" />
              Powered by Official Companies House API
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
              UK Company Intelligence
              <span className="block text-orange-600">Made Simple</span>
            </h1>

            <p className="mb-12 text-xl text-gray-600 lg:text-2xl">
              Search millions of UK companies. Access official filings, financial data, and director information instantly.
            </p>

            <div className="mx-auto max-w-2xl">
              <ModernSearchBar onSearch={handleSearch} layout="hero" />
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-gray-100 bg-white py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
              Everything you need for company research
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Professional-grade tools for due diligence, compliance, and business intelligence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="group relative overflow-hidden border-gray-200 bg-white transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
              Start your company research today
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Join thousands of professionals using Credexis for company intelligence and due diligence.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-orange-600 px-8 text-white hover:bg-orange-700"
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
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Credexis</h3>
              <p className="mb-4 text-gray-600">
                Professional UK company intelligence platform powered by official Companies House data.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-gray-600">
                  <Globe className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-600">
                  <Lock className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-600">
                  <BarChart3 className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/search" className="hover:text-gray-900">Company Search</Link></li>
                <li><Link href="#features" className="hover:text-gray-900">Features</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Pricing</Link></li>
                <li><Link href="#" className="hover:text-gray-900">API Access</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">About</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Privacy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Credexis. All rights reserved. Powered by Companies House API.</p>
          </div>
        </div>
      </footer>
    </>
  )
}