import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Moomel | Natural Beauty from Senegal',
  description: 'Discover premium organic beauty products made in Senegal. Natural skincare, haircare, and cosmetics from local entrepreneurs.',
  generator: 'v0.app',
  keywords: ['beauty', 'organic', 'natural', 'Senegal', 'skincare', 'cosmetics', 'African beauty'],
  metadataBase: new URL('https://moomel.sn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Moomel | Natural Beauty from Senegal',
    description: 'Discover premium organic beauty products made in Senegal.',
    url: 'https://moomel.sn',
    siteName: 'Moomel',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Moomel - Natural Beauty from Senegal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moomel | Natural Beauty from Senegal',
    description: 'Premium organic beauty products from local Senegalese entrepreneurs.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#d4a574',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
