'use client'

import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SearchType = 'name' | 'sic_code' | 'nature_of_business'

interface AdvancedSearchBarProps {
  onSearch: (query: string, searchType: SearchType) => void
  placeholder?: string
  className?: string
  defaultSearchType?: SearchType
}

const searchTypes = [
  {
    value: 'name' as SearchType,
    label: 'Company Name/Number',
    placeholder: 'Search by company name or number...',
    description: 'e.g., "Tesco" or "00445790"'
  },
  {
    value: 'sic_code' as SearchType,
    label: 'SIC Code',
    placeholder: 'Enter SIC code...',
    description: 'e.g., "43330" for floor covering'
  },
  {
    value: 'nature_of_business' as SearchType,
    label: 'Business Type',
    placeholder: 'Enter business description...',
    description: 'e.g., "kitchen furniture"'
  }
]

export function AdvancedSearchBar({
  onSearch,
  className,
  defaultSearchType = 'name'
}: AdvancedSearchBarProps) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>(defaultSearchType)

  const currentType = searchTypes.find(t => t.value === searchType) || searchTypes[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), searchType)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="space-y-3">
        {/* Search Type Selector */}
        <Select value={searchType} onValueChange={(value) => setSearchType(value as SearchType)}>
          <SelectTrigger className="w-full sm:w-[200px] bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {searchTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex flex-col">
                  <span className="font-medium">{type.label}</span>
                  <span className="text-xs text-muted-foreground">{type.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Input */}
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentType.placeholder}
              className="w-full h-11 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button
            type="submit"
            className="px-6"
            disabled={!query.trim()}
          >
            Search
          </Button>
        </div>

        {/* Help text */}
        <p className="text-xs text-muted-foreground text-center">
          {searchType === 'sic_code' && 'SIC codes classify business activities (e.g., 47110 for retail)'}
          {searchType === 'nature_of_business' && 'Search by industry or business type'}
          {searchType === 'name' && 'Enter company name or 8-digit registration number'}
        </p>
      </div>
    </form>
  )
}