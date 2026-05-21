/**
 * deploy-prepare.js
 *
 * Dijalankan otomatis setelah `npm run build` (via postbuild script).
 * Menyalin public/ dan .next/static/ ke dalam .next/standalone/
 * agar folder standalone benar-benar self-contained dan siap diupload ke cPanel.
 *
 * Setelah script ini selesai, folder yang perlu diupload ke cPanel adalah:
 *   - .next/standalone/   (termasuk public/ dan .next/static/ di dalamnya)
 *   - server.js           (entry point cPanel)
 */

'use strict'

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const STANDALONE = path.join(ROOT, '.next', 'standalone')

// ─── Helper: copy folder rekursif ────────────────────────────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`  [skip] tidak ditemukan: ${src}`)
    return
  }
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// ─── Validasi folder standalone ada ──────────────────────────────────────────
if (!fs.existsSync(STANDALONE)) {
  console.error('ERROR: .next/standalone tidak ditemukan.')
  console.error('Pastikan next.config.js memiliki output: "standalone"')
  process.exit(1)
}

console.log('\n📦 Menyiapkan folder deploy...\n')

// 1. Copy public/ → .next/standalone/public/
const publicSrc = path.join(ROOT, 'public')
const publicDest = path.join(STANDALONE, 'public')
console.log('  → Menyalin public/ ...')
copyDir(publicSrc, publicDest)
console.log('  ✓ public/ disalin ke .next/standalone/public/')

// 2. Copy .next/static/ → .next/standalone/.next/static/
const staticSrc = path.join(ROOT, '.next', 'static')
const staticDest = path.join(STANDALONE, '.next', 'static')
console.log('  → Menyalin .next/static/ ...')
copyDir(staticSrc, staticDest)
console.log('  ✓ .next/static/ disalin ke .next/standalone/.next/static/')

// ─── Tampilkan ringkasan ──────────────────────────────────────────────────────
console.log('\n✅ Folder deploy siap!\n')
console.log('Upload folder berikut ke cPanel (via FTP/File Manager):')
console.log('  📁 .next/standalone/   → upload ke root aplikasi cPanel')
console.log('  📄 server.js           → upload ke root aplikasi cPanel')
console.log('')
console.log('Struktur akhir di cPanel:')
console.log('  /home/user/app/')
console.log('  ├── server.js')
console.log('  ├── .next/')
console.log('  │   └── standalone/')
console.log('  │       ├── server.js')
console.log('  │       ├── node_modules/')
console.log('  │       ├── public/')
console.log('  │       └── .next/')
console.log('  │           └── static/')
console.log('')
console.log('Startup file di cPanel Node.js App: server.js')
console.log('')
