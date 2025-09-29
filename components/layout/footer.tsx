import Image from 'next/image'
import Link from 'next/link'
import { Globe, Lock, BarChart3 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[rgba(220,121,87,0.05)]">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image src="/credexis-logo.svg" alt="Credexis" width={40} height={40} />
              <h3 className="text-2xl font-semibold text-brand">Credexis</h3>
            </div>
            <p className="mb-4 text-lg text-gray-600">
              Professional UK company intelligence platform powered by official Companies House data.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-400 transition-colors hover:bg-brand-100 hover:text-brand">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-400 transition-colors hover:bg-brand-100 hover:text-brand">
                <Lock className="h-5 w-5" />
              </Link>
              <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-400 transition-colors hover:bg-brand-100 hover:text-brand">
                <BarChart3 className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-brand">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/search" className="text-base hover:text-gray-900">Company Search</Link></li>
              <li><Link href="#features" className="text-base hover:text-gray-900">Features</Link></li>
              <li><Link href="/pricing" className="text-base hover:text-gray-900">Pricing</Link></li>
              <li><Link href="#" className="text-base hover:text-gray-900">API Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-brand">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="#" className="text-base hover:text-gray-900">About</Link></li>
              <li><Link href="#" className="text-base hover:text-gray-900">Contact</Link></li>
              <li><Link href="#" className="text-base hover:text-gray-900">Privacy</Link></li>
              <li><Link href="#" className="text-base hover:text-gray-900">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-base text-gray-600">
          <p>© {new Date().getFullYear()} Credexis. All rights reserved. Powered by Companies House API.</p>
        </div>
      </div>
    </footer>
  )
}
