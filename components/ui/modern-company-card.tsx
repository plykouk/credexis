import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatAddress } from '@/lib/utils'
import type { CompanySearchItem } from '@/types/companies-house'

interface ModernCompanyCardProps {
  company: CompanySearchItem
}

export function ModernCompanyCard({ company }: ModernCompanyCardProps) {
  const status = company.company_status.toLowerCase()

  const statusStyles = {
    active: 'bg-green-50 text-green-700',
    dissolved: 'bg-red-50 text-red-700',
    liquidation: 'bg-yellow-50 text-yellow-700',
  } as const

  const badgeClass =
    statusStyles[(status as keyof typeof statusStyles)] ?? 'bg-gray-100 text-gray-600'

  return (
    <Link href={`/company/${company.company_number}`}>
      <Card className="border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="flex items-center justify-between p-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 truncate">
              {company.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {company.company_number}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              {company.address && (
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{formatAddress(company.address)}</span>
                </div>
              )}
            </div>
            <div className="mt-2">
              <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
                {company.company_status}
              </span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
        </CardContent>
      </Card>
    </Link>
  )
}