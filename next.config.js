/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Output standalone: wajib untuk cPanel Node.js App ───────────────────
  // Menghasilkan folder .next/standalone yang self-contained,
  // tidak perlu node_modules penuh di server.
  output: 'standalone',

  // ─── Image optimization ───────────────────────────────────────────────────
  images: {
    // Hapus 'image/avif' — proses encoding AVIF sangat berat (WebAssembly),
    // penyebab utama "WebAssembly.instantiate(): Out of memory" di shared hosting.
    // Cukup webp yang jauh lebih ringan saat build.
    formats: ['image/webp'],

    // Kurangi breakpoint agar jumlah varian gambar yang di-generate lebih sedikit
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256],

    // Nonaktifkan remote patterns yang tidak dipakai di project ini
    // (tidak ada gambar dari unsplash di kode)
    remotePatterns: [],

    // Minimumkan TTL cache gambar (default 60s) — tidak perlu ubah untuk production
    minimumCacheTTL: 60,
  },

  // ─── Kompresi & performa ──────────────────────────────────────────────────
  compress: true,
  reactStrictMode: true,

  // ─── Nonaktifkan fitur yang tidak diperlukan ──────────────────────────────
  // Matikan powered-by header (minor security + bandwidth)
  poweredByHeader: false,

  // ─── Webpack: optimasi memory saat build ─────────────────────────────────
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      // Kurangi paralelisme webpack agar tidak OOM di shared hosting
      config.parallelism = 1

      // Nonaktifkan source map di production untuk hemat memory & disk
      config.devtool = false

      // Minimizer: matikan parallel pada terser agar hemat RAM
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options.parallel = false
          }
        })
      }
    }

    return config
  },

  // ─── Security headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)\\.(js|css)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
