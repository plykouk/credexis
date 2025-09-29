import { Check } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'

const tiers = [
  {
    name: 'Free',
    price: '£0',
    frequency: 'per month',
    description:
      'Get started with a streamlined Companies House experience designed for occasional checks.',
    cta: 'Start for free',
    buttonVariant: 'default' as const,
    highlighted: false,
    tone: 'light' as const,
    features: [
      '50 company searches every month',
      'Core company overview & filings timeline',
      'Watchlist up to 5 companies with weekly alerts',
      'CSV export disabled',
    ],
  },
  {
    name: 'Pro',
    price: '£29',
    frequency: 'per month',
    description:
      'Unlock professional tooling, deeper insights, and faster workflows for due diligence.',
    cta: 'Upgrade to Pro',
    buttonVariant: 'default' as const,
    highlighted: true,
    tone: 'dark' as const,
    features: [
      '1,000 searches per month with soft throttling',
      'Full filings history with analytics widgets',
      'Watchlists & alerts for up to 200 companies (daily emails)',
      'CSV exports and API access with fair-use limits',
      'Priority in-app and email support',
    ],
  },
]

export default function PricingPage() {
  return (
    <>
      <div className="min-h-[40vh] bg-[rgba(220,121,87,0.05)]">
      <section className="relative overflow-hidden bg-gradient-to-r from-white via-[rgba(220,121,87,0.08)] to-[rgba(220,121,87,0.12)]">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pricing-grid" width="180" height="180" patternUnits="userSpaceOnUse">
                <path d="M0 0h180v180" fill="none" stroke="rgba(220,121,87,0.16)" strokeWidth="1.1" />
                <path d="M0 60h180M60 0v180" fill="none" stroke="rgba(220,121,87,0.12)" strokeWidth="0.7" />
                <circle cx="60" cy="120" r="5" fill="rgba(220,121,87,0.18)" />
                <circle cx="140" cy="40" r="4" fill="rgba(220,121,87,0.15)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pricing-grid)" />
          </svg>
        </div>
        <div className="container relative mx-auto px-4 py-24 text-center lg:px-8 lg:py-32">
          <span className="mb-4 inline-flex rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
            Pricing
          </span>
          <h1 className="mx-auto mb-6 max-w-3xl text-5xl font-semibold text-brand lg:text-6xl">
            Choose the right plan for your workflow.
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 lg:text-2xl">
            Keep the ease of Credexis while staying within Companies House rate limits. Upgrade when you need deeper insight and automation.
          </p>
        </div>
      </section>

      </div>

      <section className="container mx-auto -mt-20 px-4 pb-24 lg:px-8">
        <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-stretch lg:justify-center">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex w-full max-w-xl flex-col rounded-3xl px-6 pb-10 text-left ${
                tier.tone === 'dark'
                  ? 'border-transparent bg-brand text-white shadow-[0_35px_70px_-35px_rgba(220,121,87,0.7)]'
                  : 'border-brand-100/70 bg-white text-gray-900 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.4)]'
              }`}
            >
              <CardHeader className="space-y-4 px-6 pb-0 pt-8 text-left">
                <CardTitle
                  className={`text-4xl font-semibold ${tier.tone === 'dark' ? 'text-white' : 'text-brand'}`}
                >
                  {tier.name}
                </CardTitle>
                <p className={`${tier.tone === 'dark' ? 'text-white/80' : 'text-gray-600'} text-lg`}>{tier.description}</p>
                <div
                  className={`mt-6 flex items-baseline gap-2 ${
                    tier.tone === 'dark' ? 'text-white' : 'text-brand'
                  }`}
                >
                  <span className="text-6xl font-semibold">{tier.price}</span>
                  <span className={`text-lg font-medium ${tier.tone === 'dark' ? 'text-white/70' : 'text-gray-500'}`}>
                    {tier.frequency}
                  </span>
                </div>
                <div className="mb-4" />
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between space-y-8 px-6 pb-0">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`text-base ${
                        tier.tone === 'dark' ? 'text-white/85' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Check
                          className={`h-5 w-5 flex-shrink-0 ${
                            tier.tone === 'dark' ? 'text-white' : 'text-brand'
                          }`}
                        />
                        <span>{feature}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  variant={tier.buttonVariant}
                  className={`mt-6 w-full border-none ${
                    tier.tone === 'dark'
                      ? 'border border-white/70 bg-brand text-white hover:bg-brand'
                      : 'bg-[rgba(220,121,87,0.6)] text-white hover:bg-[rgba(220,121,87,0.75)]'
                  }`}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </section>

      <Footer />
    </>
  )
}