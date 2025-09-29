import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export function formatAddress(address: any): string {
  if (!address) return 'No address available'

  const parts = [
    address.premises,
    address.address_line_1,
    address.address_line_2,
    address.locality,
    address.region,
    address.postal_code,
    address.country
  ].filter(Boolean)

  return parts.join(', ') || 'No address available'
}

export function getCompanyStatusColor(status: string): string {
  const statusLower = status?.toLowerCase() || ''

  switch (statusLower) {
    case 'active':
      return 'text-green-600 bg-green-50'
    case 'dissolved':
      return 'text-red-600 bg-red-50'
    case 'liquidation':
    case 'receivership':
    case 'administration':
      return 'text-orange-600 bg-orange-50'
    case 'voluntary-arrangement':
    case 'insolvency-proceedings':
      return 'text-yellow-600 bg-yellow-50'
    case 'dormant':
      return 'text-gray-600 bg-gray-50'
    default:
      return 'text-blue-600 bg-blue-50'
  }
}
