import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from '@/components/providers/session-provider'
import { CartProvider } from '@/providers/cart-provider'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Moomel | Beauté Naturelle du Sénégal',
  description: 'Découvrez des produits de beauté bio haut de gamme fabriqués au Sénégal. Soins du visage, soins capillaires et cosmétiques naturels d&apos;entrepreneurs locaux.',
  generator: 'v0.app',
  keywords: ['beauté', 'bio', 'naturel', 'Sénégal', 'soins', 'cosmétiques', 'beauté africaine'],
  metadataBase: new URL('https://moomel.sn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Moomel | Beauté Naturelle du Sénégal',
    description: 'Découvrez des produits de beauté bio haut de gamme fabriqués au Sénégal.',
    url: 'https://moomel.sn',
    siteName: 'Moomel',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Moomel - Beauté Naturelle du Sénégal',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moomel | Beauté Naturelle du Sénégal',
    description: 'Produits de beauté bio haut de gamme d&apos;entrepreneurs sénégalais.',
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
    <html lang="fr" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
        <Toaster position="top-right" />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
