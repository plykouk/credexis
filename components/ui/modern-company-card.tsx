import Link from 'next/link'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate, formatAddress } from '@/lib/utils'
import type { CompanySearchItem } from '@/types/companies-house'

interface ModernCompanyCardProps {
  company: CompanySearchItem
}

export function ModernCompanyCard({ company }: ModernCompanyCardProps) {
  const status = company.company_status.toLowerCase()

  const statusStyles = {
    active: 'bg-emerald-500/15 text-emerald-600',
    dissolved: 'bg-rose-500/15 text-rose-600',
    liquidation: 'bg-amber-500/15 text-amber-600',
  } as const

  const badgeClass =
    statusStyles[(status as keyof typeof statusStyles)] ?? 'bg-slate-500/10 text-slate-600'

  return (
    <Link href={`/company/${company.company_number}`}>
      <Card className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-[0_25px_45px_-35px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-emerald-50/60 opacity-0 transition group-hover:opacity-100" />
        <CardContent className="relative p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-slate-900">
                {company.title}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wide text-slate-400">
                {company.company_number}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeClass}`}>
              {company.company_status}
            </span>
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            {company.address && (
              <div className="flex gap-2">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
                  <MapPin className="h-4 w-4 text-slate-500" />
                </div>
                <span className="line-clamp-2 leading-relaxed text-slate-600">
                  {formatAddress(company.address)}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="h-4 w-4" />
              <span>Incorporated {formatDate(company.date_of_creation)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-medium text-emerald-600">
            <span>View company</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}