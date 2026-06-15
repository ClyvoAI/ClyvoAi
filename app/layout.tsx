import type { Metadata, Viewport } from 'next'
import { Syne, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { AppLoader } from '@/components/clyvo/app-loader'
import { GoogleAnalytics } from '@/components/analytics'

const syne = Syne({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--font-syne', display: 'swap' })
const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono', display: 'swap' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400','500','600','700'], style: ['normal','italic'], variable: '--font-playfair', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F5F0E8',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://clyvoai.in'),
  title: 'Clyvo AI | Custom AI. Real Results.',
  description: 'Clyvo AI builds end-to-end, custom AI systems for B2B businesses — from scratch, for your exact operations.',
  openGraph: {
    title: 'Clyvo AI | Custom AI. Real Results.',
    description: 'We build end-to-end AI systems for B2B businesses — from scratch, for your exact operations.',
    url: 'https://clyvoai.in',
    siteName: 'Clyvo AI',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Clyvo AI | Custom AI. Real Results.', images: ['/og-image.png'] },
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: 'jmIGJ3M5zNwHEHUYPuUlihl-d1QBhRXtXmSfVnj-mY0',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
      style={{ background: '#F5F0E8' }}>
      <body className="antialiased" style={{ background: '#F5F0E8', color: '#1A1A1A', minHeight: '100vh' }}>
        <GoogleAnalytics />
        <Providers>
          <AppLoader>
            {children}
          </AppLoader>
        </Providers>
      </body>
    </html>
  )
}
