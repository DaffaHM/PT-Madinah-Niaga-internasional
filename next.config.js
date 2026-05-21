/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Static Export ────────────────────────────────────────────────────────
  // Menghasilkan folder `out/` berisi HTML/CSS/JS statis murni.
  // Tidak memerlukan Node.js di server — cukup upload ke cPanel shared hosting.
  output: 'export',

  // ─── Image: wajib unoptimized untuk static export ─────────────────────────
  // next/image optimization membutuhkan server Node.js.
  // Dengan unoptimized: true, gambar di-serve langsung tanpa transformasi.
  images: {
    unoptimized: true,
  },

  // ─── Trailing slash ───────────────────────────────────────────────────────
  // Memastikan setiap halaman menghasilkan folder/index.html
  // sehingga routing bekerja di static hosting (Apache/Nginx cPanel).
  trailingSlash: true,

  // ─── Kompresi & performa ──────────────────────────────────────────────────
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
