import { MetadataRoute } from 'next'

// Wajib untuk static export — memberitahu Next.js bahwa route ini
// harus di-generate sebagai file statis saat build.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://madinahniaga.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
