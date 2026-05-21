import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const siteUrl = 'https://madinahniaga.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PT Madinah Niaga Internasional',
    template: '%s | PT Madinah Niaga Internasional',
  },
  description:
    'PT Madinah Niaga Internasional adalah perusahaan perdagangan internasional yang menghubungkan Indonesia dan Arab Saudi. Sourcing produk premium, kurma, barang industri, dan logistik end-to-end.',
  keywords: [
    'PT Madinah Niaga Internasional',
    'Madinah Niaga Internasional',
    'PT Madinah Niaga',
    'perusahaan trading Indonesia Arab Saudi',
    'sourcing produk Arab Saudi',
    'impor dari Arab Saudi',
    'kurma import Indonesia',
    'logistik Indonesia Arab Saudi',
    'trading company Indonesia',
    'jasa sourcing Arab Saudi',
  ],
  authors: [{ name: 'PT Madinah Niaga Internasional', url: siteUrl }],
  creator: 'PT Madinah Niaga Internasional',
  publisher: 'PT Madinah Niaga Internasional',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'PT Madinah Niaga Internasional',
    description:
      'Perusahaan perdagangan internasional Indonesia–Arab Saudi. Sourcing produk premium, kurma, barang industri, dan logistik end-to-end.',
    url: siteUrl,
    siteName: 'PT Madinah Niaga Internasional',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Madinah Niaga Internasional',
    description:
      'Perusahaan perdagangan internasional Indonesia–Arab Saudi. Sourcing produk premium dan logistik end-to-end.',
    creator: '@madinahniaga',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  verification: {
    google: 'oDeNL4xtRUyOKsqsxCLRPqptrkglciKl6oOVPeweCEE',
  },
}

// JSON-LD Structured Data — Organization schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'PT Madinah Niaga Internasional',
      alternateName: ['Madinah Niaga Internasional', 'PT Madinah Niaga'],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
        width: 280,
        height: 56,
      },
      description:
        'PT Madinah Niaga Internasional adalah perusahaan perdagangan internasional yang bergerak di bidang sourcing produk premium dari Arab Saudi ke Indonesia, mencakup kurma, barang industri, consumer goods, dan logistik end-to-end.',
      foundingLocation: {
        '@type': 'Place',
        name: 'Indonesia',
      },
      areaServed: ['Indonesia', 'Saudi Arabia'],
      knowsAbout: [
        'Sourcing produk Arab Saudi',
        'Impor kurma Indonesia',
        'Logistik internasional',
        'Perdagangan Indonesia Arab Saudi',
        'Quality assurance produk impor',
      ],
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'PT Madinah Niaga Internasional',
      description:
        'Website resmi PT Madinah Niaga Internasional — perusahaan sourcing dan logistik Indonesia–Arab Saudi.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: ['id', 'en'],
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'PT Madinah Niaga Internasional',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      description:
        'Halaman utama PT Madinah Niaga Internasional — gateway terpercaya untuk sourcing dan logistik antara Arab Saudi dan Indonesia.',
      inLanguage: ['id', 'en'],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/logo-navv.png" as="image" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
