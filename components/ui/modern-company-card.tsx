import Link from 'next/link'
import { MapPin, Calendar, ArrowRight, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate, formatAddress } from '@/lib/utils'
import type { CompanySearchItem } from '@/types/companies-house'

interface ModernCompanyCardProps {
  company: CompanySearchItem
}

export function ModernCompanyCard({ company }: ModernCompanyCardProps) {
  const status = company.company_status.toLowerCase()

  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    dissolved: 'bg-red-100 text-red-700',
    liquidation: 'bg-yellow-100 text-yellow-700',
  } as const

  const badgeClass =
    statusStyles[(status as keyof typeof statusStyles)] ?? 'bg-gray-100 text-gray-600'

  return (
    <Link href={`/company/${company.company_number}`}>
      <Card className="group h-full border-gray-200 bg-white transition-all hover:shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Building2 className="h-6 w-6" />
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}>
              {company.company_status}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600">
            {company.title}
          </h3>

          <p className="mb-4 font-mono text-sm text-gray-500">
            {company.company_number}
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            {company.address && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                <span className="line-clamp-2">{formatAddress(company.address)}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Incorporated {formatDate(company.date_of_creation)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm font-medium text-orange-600 opacity-0 transition-opacity group-hover:opacity-100">
            View details
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}