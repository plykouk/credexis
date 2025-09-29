'use client'

import { useState } from 'react'
import { Search, ChevronDown, Building2, Hash, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export type SearchType = 'name' | 'sic_code' | 'nature_of_business'

interface ModernSearchBarProps {
  onSearch: (query: string, searchType: SearchType) => void
  className?: string
  defaultSearchType?: SearchType
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
}: ModernSearchBarProps) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>(defaultSearchType)

  const currentType = searchTypes.find(t => t.value === searchType) || searchTypes[0]
  const Icon = currentType.icon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), searchType)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-between min-w-[160px] h-11 border-slate-200 bg-white hover:bg-slate-50"
              >
                <div className="flex items-center">
                  <Icon className="h-4 w-4 mr-2 text-slate-600" />
                  <span className="text-slate-700">{currentType.label}</span>
                </div>
                <ChevronDown className="h-4 w-4 ml-2 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              {searchTypes.map((type) => {
                const TypeIcon = type.icon
                return (
                  <DropdownMenuItem
                    key={type.value}
                    onClick={() => setSearchType(type.value)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-start space-x-2">
                      <TypeIcon className="h-4 w-4 mt-0.5 text-slate-600" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-slate-500">{type.description}</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentType.placeholder}
              className="pl-10 pr-24 h-11 border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Help text for mobile */}
        <p className="text-xs text-slate-500 px-1">
          {searchType === 'sic_code' && 'SIC codes classify business activities (e.g., 47110 for retail)'}
          {searchType === 'nature_of_business' && 'Try "construction", "software", or "retail"'}
          {searchType === 'name' && 'Enter a company name or registration number'}
        </p>
      </div>
    </form>
  )
}