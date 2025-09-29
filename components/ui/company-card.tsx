import Link from 'next/link'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { formatDate, formatAddress } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CompanySearchItem } from '@/types/companies-house'

interface CompanyCardProps {
  company: CompanySearchItem
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getStatusVariant = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'active') return 'default'
    if (s === 'dissolved') return 'destructive'
    if (s === 'liquidation') return 'secondary'
    return 'outline'
  }

  return (
    <Link href={`/company/${company.company_number}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-1">
                {company.title}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                #{company.company_number}
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant(company.company_status)} className="ml-2 text-xs">
              {company.company_status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {company.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground line-clamp-2">
                {formatAddress(company.address)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">
              Incorporated {formatDate(company.date_of_creation)}
            </span>
          </div>

          <div className="flex items-center justify-end pt-2 text-primary">
            <span className="text-xs font-medium">View Details</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}