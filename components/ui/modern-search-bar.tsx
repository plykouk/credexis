'use client'

import { useEffect, useState } from 'react'
import { Search, Building2, Hash, Briefcase } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type SearchType = 'name' | 'sic_code' | 'nature_of_business'

interface ModernSearchBarProps {
  onSearch: (query: string, searchType: SearchType) => void
  className?: string
  defaultSearchType?: SearchType
  layout?: 'default' | 'stacked' | 'light' | 'hero'
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

  const containerClasses = layout === 'hero'
    ? 'rounded-2xl bg-white border border-gray-200 p-8 shadow-2xl'
    : layout === 'light'
    ? 'rounded-2xl bg-white border border-gray-200 p-4 shadow-sm'
    : layout === 'stacked'
    ? 'rounded-3xl bg-white/15 p-4 backdrop-blur-lg'
    : 'rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.55)] backdrop-blur'

  const inputClasses = layout === 'hero'
    ? 'h-20 w-full rounded-xl border-2 border-gray-200 bg-white pl-16 pr-6 text-[1.25rem] text-gray-900 placeholder-gray-500 focus:!border-brand focus:outline-none focus:!ring-4 focus:!ring-brand/20 focus-visible:!border-brand focus-visible:!ring-brand/20'
    : layout === 'light'
    ? 'h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-base text-gray-900 placeholder-gray-500 focus:bg-white focus:!border-brand focus-visible:!ring-0 focus-visible:!border-brand'
    : layout === 'stacked'
    ? 'h-12 w-full rounded-2xl border-none bg-white/80 pl-12 pr-4 text-base text-slate-900 shadow-sm focus-visible:!ring-2 focus-visible:!ring-brand focus-visible:!border-brand'
    : 'h-12 w-full rounded-full border-none bg-slate-100/60 pl-12 pr-4 text-base text-slate-900 shadow-inner focus-visible:!ring-2 focus-visible:!ring-brand focus-visible:!border-brand'

  const buttonClasses = layout === 'hero'
    ? 'h-20 w-full sm:w-auto rounded-xl bg-brand px-12 text-white text-lg font-medium transition hover:bg-brand-600 flex items-center justify-center'
    : layout === 'light'
    ? 'h-12 w-full sm:w-auto rounded-xl bg-brand text-white text-base font-medium transition hover:bg-brand-600 px-6 flex items-center justify-center'
    : layout === 'stacked'
    ? 'h-12 w-full rounded-2xl bg-brand text-base text-white font-semibold shadow-[0_20px_40px_-25px_rgba(220,121,87,0.8)] transition hover:bg-brand-600 flex items-center justify-center'
    : 'h-12 w-full rounded-full bg-brand text-base text-white font-semibold shadow-[0_10px_30px_-15px_rgba(220,121,87,0.9)] transition hover:bg-brand-600 flex items-center justify-center'

  const typeButtonClasses = layout === 'hero'
    ? {
        active: 'border-brand bg-brand-50 text-brand',
        inactive: 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
      }
    : layout === 'light'
    ? {
        active: 'border-brand bg-brand-50 text-brand',
        inactive: 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
      }
    : layout === 'stacked'
    ? {
        active: 'border-transparent bg-white text-slate-900 shadow',
        inactive: 'border-white/30 bg-white/5 text-white/80 hover:bg-white/15'
      }
    : {
        active: 'border-transparent bg-slate-900 text-white shadow',
        inactive: 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-slate-900'
      }

  const helperTextClasses = 'mt-3 text-xs text-slate-500'

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className={cn(containerClasses, layout === 'hero' ? 'mb-16' : '')}>
        <div className={layout === 'hero' ? 'flex flex-col gap-4 sm:flex-row sm:gap-3' : layout === 'light' ? 'flex gap-3' : 'flex flex-col gap-3'}>
          <div className="relative w-full">
            <Search className={cn('pointer-events-none absolute left-5 top-1/2 -translate-y-1/2', layout === 'hero' ? 'h-6 w-6 text-brand' : 'h-4 w-4', layout === 'light' || layout === 'hero' ? 'text-gray-400' : 'text-slate-400')} />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentType.placeholder}
              className={inputClasses}
            />
          </div>
          <button type="submit" className={buttonClasses}>
            Search
          </button>
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
                  'flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-base font-medium transition',
                  isActive ? typeButtonClasses.active : typeButtonClasses.inactive
                )}
              >
                <TypeIcon className="h-4 w-4" />
                <span>{type.label}</span>
              </button>
            )
          })}
        </div>

        {layout === 'default' && (
          <p className={helperTextClasses}>
            {searchType === 'sic_code' && 'Use industry SIC codes like 47110 to pinpoint sectors.'}
            {searchType === 'nature_of_business' && 'Describe the business type (e.g. software, retail, manufacturing).'}
            {searchType === 'name' && 'Search by company name or registration number to get started.'}
          </p>
        )}
      </div>
    </form>
  )
}