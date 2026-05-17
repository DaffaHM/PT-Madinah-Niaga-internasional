import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'PT Madinah Niaga Internasional',
  description: 'Your premier gateway for strategic sourcing and seamless logistics between Saudi Arabia and Indonesia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  )
}