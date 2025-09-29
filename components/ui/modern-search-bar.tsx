'use client'

import { useEffect, useState } from 'react'
import { Search, Building2, Hash, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type SearchType = 'name' | 'sic_code' | 'nature_of_business'

interface ModernSearchBarProps {
  onSearch: (query: string, searchType: SearchType) => void
  className?: string
  defaultSearchType?: SearchType
  layout?: 'default' | 'stacked'
}

const searchTypes = [
  {
    value: 'name' as SearchType,
    label: 'Company Name',
    icon: Building2,
    placeholder: 'Enter company name or number',
    description: 'Search by name or registration number',
  },
  {
    value: 'sic_code' as SearchType,
    label: 'SIC Code',
    icon: Hash,
    placeholder: 'Enter SIC code (e.g., 43330)',
    description: 'Search by industry classification',
  },
  {
    value: 'nature_of_business' as SearchType,
    label: 'Business Type',
    icon: Briefcase,
    placeholder: 'Enter business type (e.g., software)',
    description: 'Search by business description',
  },
]

export function ModernSearchBar({
  onSearch,
  className,
  defaultSearchType = 'name',
  layout = 'default',
}: ModernSearchBarProps) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>(defaultSearchType)

  useEffect(() => {
    setSearchType(defaultSearchType)
  }, [defaultSearchType])

  const currentType = searchTypes.find(t => t.value === searchType) || searchTypes[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), searchType)
    }
  }

  const containerClasses = layout === 'stacked'
    ? 'rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg'
    : 'rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.55)] backdrop-blur'

  const inputClasses = layout === 'stacked'
    ? 'h-12 w-full rounded-2xl border-none bg-white/80 pl-12 pr-4 text-base text-slate-900 shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500'
    : 'h-12 w-full rounded-full border-none bg-slate-100/60 pl-12 pr-4 text-base text-slate-900 shadow-inner focus-visible:ring-2 focus-visible:ring-emerald-500'

  const buttonClasses = layout === 'stacked'
    ? 'mt-3 h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-base font-semibold shadow-[0_20px_40px_-25px_rgba(16,185,129,0.8)] transition hover:from-emerald-600 hover:to-green-700'
    : 'mt-3 h-12 w-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-base font-semibold shadow-[0_10px_30px_-15px_rgba(16,185,129,0.9)] transition hover:from-emerald-600 hover:to-green-700 sm:mt-0 sm:w-auto sm:px-6'

  const typeButtonClasses = layout === 'stacked'
    ? {
        active: 'border-transparent bg-white text-slate-900 shadow',
        inactive: 'border-white/40 bg-white/10 text-white/80 hover:bg-white/20'
      }
    : {
        active: 'border-transparent bg-slate-900 text-white shadow',
        inactive: 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-slate-900'
      }

  const helperTextClasses = layout === 'stacked'
    ? 'mt-3 text-xs text-white/70'
    : 'mt-3 text-xs text-slate-500'

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className={containerClasses}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <div className="relative flex-1">
            <Search className={cn('pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4', layout === 'stacked' ? 'text-slate-400' : 'text-slate-400')} />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentType.placeholder}
              className={inputClasses}
            />
          </div>
          <Button type="submit" className={buttonClasses}>
            Search
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {searchTypes.map((type) => {
            const TypeIcon = type.icon
            const isActive = searchType === type.value

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setSearchType(type.value)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
                  isActive ? typeButtonClasses.active : typeButtonClasses.inactive
                )}
              >
                <TypeIcon className="h-4 w-4" />
                <span>{type.label}</span>
              </button>
            )
          })}
        </div>

        <p className={helperTextClasses}>
          {searchType === 'sic_code' && 'Use industry SIC codes like 47110 to pinpoint sectors.'}
          {searchType === 'nature_of_business' && 'Describe the business type (e.g. software, retail, manufacturing).'}
          {searchType === 'name' && 'Search by company name or registration number to get started.'}
        </p>
      </div>
    </form>
  )
}