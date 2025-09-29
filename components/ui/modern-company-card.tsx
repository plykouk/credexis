import Link from 'next/link'
import { Building2, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatAddress } from '@/lib/utils'
import type { CompanySearchItem } from '@/types/companies-house'

interface ModernCompanyCardProps {
  company: CompanySearchItem
}

export function ModernCompanyCard({ company }: ModernCompanyCardProps) {
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case 'active':
        return 'default'
      case 'dissolved':
        return 'destructive'
      case 'liquidation':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <Link href={`/company/${company.company_number}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 border-slate-200 group cursor-pointer overflow-hidden">
        <CardContent className="p-4 sm:p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {company.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-mono">
                {company.company_number}
              </p>
            </div>
            <Badge
              variant={getStatusVariant(company.company_status)}
              className="ml-2 text-xs capitalize whitespace-nowrap"
            >
              {company.company_status}
            </Badge>
          </div>

          <div className="space-y-2">
            {company.address && (
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
                <span className="line-clamp-2 leading-relaxed">
                  {formatAddress(company.address)}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
              <span>Incorporated {formatDate(company.date_of_creation)}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">View details</span>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}