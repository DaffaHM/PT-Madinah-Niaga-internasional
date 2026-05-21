# Panduan Deployment ke cPanel Shared Hosting (Node.js App)

## Prasyarat

- cPanel dengan fitur **Node.js App** (Phusion Passenger)
- Node.js versi **18.x atau 20.x** (pilih di cPanel)
- Akses SSH atau Terminal di cPanel

---

## Struktur Folder di Server

```
/home/username/
└── madinahniaga.com/          ← Document Root / Application Root
    ├── .next/                 ← Hasil build (jangan dihapus)
    │   └── standalone/        ← Server standalone (output mode)
    │       ├── server.js      ← Entry point utama
    │       ├── .next/
    │       └── node_modules/  ← Dependencies minimal (auto-generated)
    ├── public/                ← Static assets (gambar, dll)
    ├── node_modules/          ← Dependencies (hasil npm install)
    ├── package.json
    ├── next.config.js
    └── .env.production        ← Environment variables production
```

---

## Langkah Deployment

### 1. Upload File ke Server

Upload semua file project ke folder aplikasi di server **kecuali**:
- `node_modules/` (akan di-install ulang di server)
- `.next/` (akan di-build ulang di server)
- `.git/`

Gunakan File Manager cPanel, FTP, atau Git.

### 2. Buat File Environment Variables

Di folder aplikasi, buat file `.env.production`:

```bash
NEXT_PUBLIC_SITE_URL=https://madinahniaga.com
NODE_ENV=production
PORT=3000
```

Atau set via **cPanel → Node.js App → Environment Variables**.

### 3. Konfigurasi Node.js App di cPanel

Masuk ke **cPanel → Node.js App → Create Application**:

| Setting | Value |
|---|---|
| Node.js version | 18.x atau 20.x |
| Application mode | Production |
| Application root | `/home/username/madinahniaga.com` |
| Application URL | `madinahniaga.com` |
| Application startup file | `server.js` |

> **Catatan:** Startup file `server.js` adalah wrapper yang akan kita buat di langkah 6.

### 4. Install Dependencies via Terminal cPanel

Buka **Terminal** di cPanel atau SSH, lalu:

```bash
cd /home/username/madinahniaga.com
npm install --production=false
```

> `--production=false` diperlukan agar devDependencies (TypeScript, dll) ikut ter-install untuk proses build.

### 5. Build Aplikasi

```bash
cd /home/username/madinahniaga.com
npm run build
```

Proses build membutuhkan waktu 3–10 menit tergantung resource server.  
Flag `--max-old-space-size=512` sudah dikonfigurasi di `package.json` untuk mencegah OOM.

### 6. Pastikan File `server.js` Ada di Root Aplikasi

File `server.js` sudah disertakan di project ini (di root folder).  
cPanel Passenger akan otomatis menggunakannya sebagai entry point.

> Jika cPanel meminta nama file berbeda (misal `app.js`), cukup rename atau set di konfigurasi Node.js App.

### 7. Copy Static Assets ke Standalone

Setelah build selesai, jalankan perintah ini untuk menyalin `public/` ke folder standalone:

```bash
cd /home/username/madinahniaga.com
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

> Ini wajib dilakukan agar gambar dan aset statis bisa diakses.

### 8. Restart Node.js App

Di cPanel → Node.js App → klik tombol **Restart** pada aplikasi Anda.

Atau via Terminal:

```bash
# Jika menggunakan Passenger
touch /home/username/madinahniaga.com/tmp/restart.txt
```

---

## Cara Menjalankan Ulang Setelah Update

```bash
# 1. Upload file baru (kecuali node_modules)
# 2. SSH/Terminal ke server
cd /home/username/madinahniaga.com

# 3. Install dependencies (jika ada perubahan package.json)
npm install --production=false

# 4. Build ulang
npm run build

# 5. Copy static assets
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 6. Restart app
touch tmp/restart.txt
```

---

## Troubleshooting

### Error: "WebAssembly.instantiate(): Out of memory"
- Sudah diatasi: format AVIF dinonaktifkan di `next.config.js`
- Build menggunakan `--max-old-space-size=512` (cukup untuk shared hosting)

### Error: "Cannot find module 'next'"
- Pastikan `npm install` sudah dijalankan di server
- Pastikan Node.js version ≥ 18

### Aplikasi tidak bisa diakses setelah restart
- Cek log di cPanel → Node.js App → Log
- Pastikan `server.js` ada di root aplikasi
- Pastikan PORT sesuai dengan yang dikonfigurasi cPanel

### Gambar tidak muncul
- Pastikan sudah menjalankan perintah `cp` di langkah 7
- Cek apakah folder `public/` ada di `.next/standalone/`

---

## Environment Variables yang Diperlukan

| Variable | Wajib | Keterangan |
|---|---|---|
| `NODE_ENV` | Ya | Harus `production` |
| `PORT` | Tidak | Default `3000`, cPanel biasanya set otomatis |
| `NEXT_PUBLIC_SITE_URL` | Ya | URL publik website, digunakan untuk metadata SEO |

---

## Catatan Penting

- Jangan commit `.env.production` ke Git (sudah ada di `.gitignore`)
- Setiap kali ada perubahan kode, ulangi langkah build dan restart
- Shared hosting biasanya membatasi memory ~512MB–1GB, build sudah dioptimasi untuk ini
