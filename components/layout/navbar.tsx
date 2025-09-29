'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search Companies' },
    { href: '/pricing', label: 'Pricing' },
    { href: '#features', label: 'Features' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/credexis-logo.svg" alt="Credexis" width={40} height={40} priority />
            <span className="text-xl font-semibold text-brand">Credexis</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-gray-900 ${
                  pathname === link.href ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="default" className="hidden md:inline-flex hover:bg-brand-50 hover:text-brand">
              Sign In
            </Button>
            <Button size="default">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}