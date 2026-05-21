# Panduan Deployment ke cPanel Shared Hosting (Build Lokal)

## Strategi Deploy

> **Build dilakukan di komputer lokal, bukan di server.**
> Server cPanel hanya menjalankan hasil build — tidak perlu `npm install` atau `npm run build` di server.
> Ini menghindari error `ThreadPoolBuildError: Resource temporarily unavailable` akibat resource limit shared hosting.

---

## Alur Kerja

```
Komputer Lokal                    Server cPanel
──────────────                    ─────────────
npm run build          →  upload  →  .next/standalone/
                                     server.js
                                     ↓
                                  node server.js  (cPanel start)
```

---

## Langkah 1 — Build di Komputer Lokal

```bash
npm run build
```

Script ini otomatis menjalankan dua tahap:
1. `next build` — compile dan optimasi production
2. `postbuild` — menyalin `public/` dan `.next/static/` ke dalam `.next/standalone/`

Setelah selesai, folder `.next/standalone/` sudah self-contained dan siap upload.

---

## Langkah 2 — File yang Diupload ke cPanel

Upload **hanya** dua item berikut ke root aplikasi di cPanel:

```
Yang diupload:
├── server.js                    ← entry point cPanel (ada di root project)
└── .next/
    └── standalone/              ← seluruh folder ini
        ├── server.js            ← standalone server Next.js
        ├── package.json
        ├── node_modules/        ← dependencies minimal (sudah include)
        ├── public/              ← gambar & aset (sudah di-copy otomatis)
        └── .next/
            ├── static/          ← JS, CSS chunks (sudah di-copy otomatis)
            └── server/          ← server-side bundles
```

**Jangan upload:**
- `node_modules/` di root project (besar, tidak diperlukan)
- `src/` (source code, tidak diperlukan di production)
- `.git/`
- `*.ts`, `*.tsx` (source files)

---

## Langkah 3 — Struktur Akhir di Server cPanel

```
/home/username/madinahniaga.com/
├── server.js                    ← startup file (set di cPanel Node.js App)
└── .next/
    └── standalone/
        ├── server.js
        ├── package.json
        ├── node_modules/
        ├── public/
        │   ├── logo-navv.png
        │   ├── kurma.png
        │   └── ... (semua gambar)
        └── .next/
            ├── static/
            │   ├── chunks/
            │   └── css/
            └── server/
```

---

## Langkah 4 — Konfigurasi Node.js App di cPanel

Masuk ke **cPanel → Node.js App → Create Application** (atau Edit jika sudah ada):

| Setting | Value |
|---|---|
| Node.js version | **18.x** atau **20.x** |
| Application mode | **Production** |
| Application root | `/home/username/madinahniaga.com` |
| Application URL | `madinahniaga.com` |
| **Application startup file** | **`server.js`** |

> Startup file adalah `server.js` di root aplikasi (bukan yang di dalam standalone).
> File ini akan mem-forward ke `.next/standalone/server.js` secara otomatis.

---

## Langkah 5 — Environment Variables di cPanel

Di **cPanel → Node.js App → Environment Variables**, tambahkan:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://madinahniaga.com` |

> `PORT` dan `HOSTNAME` sudah di-handle otomatis oleh `server.js`.

---

## Langkah 6 — Start Aplikasi

Klik tombol **Run JS Script** atau **Restart** di cPanel Node.js App.

Atau via Terminal cPanel:

```bash
# Tidak perlu npm install atau npm run build!
# Cukup restart aplikasi
touch /home/username/madinahniaga.com/tmp/restart.txt
```

---

## Update / Redeploy

Setiap ada perubahan kode:

```bash
# Di komputer lokal:
npm run build

# Upload ulang ke cPanel:
# - server.js (jika berubah)
# - .next/standalone/ (selalu upload ulang)

# Restart di cPanel Node.js App
```

---

## Troubleshooting

### Aplikasi tidak start / error 500
- Cek log di cPanel → Node.js App → Log
- Pastikan `server.js` ada di root aplikasi
- Pastikan folder `.next/standalone/` sudah diupload lengkap

### Gambar tidak muncul
- Pastikan folder `public/` ada di dalam `.next/standalone/public/`
- Jalankan ulang `npm run build` di lokal (postbuild akan copy otomatis)

### Error "Cannot find module"
- Pastikan `.next/standalone/node_modules/` ikut terupload
- Folder ini berisi dependencies minimal yang sudah di-bundle Next.js

### Port conflict
- cPanel biasanya assign port otomatis via variabel `PORT`
- `server.js` sudah membaca `process.env.PORT` secara otomatis

---

## Catatan Penting

- **Tidak perlu** `npm install` di server
- **Tidak perlu** `npm run build` di server  
- **Tidak perlu** `node_modules/` root di server
- Semua dependencies sudah ada di `.next/standalone/node_modules/`
- `public/` dan `.next/static/` sudah otomatis di-copy ke standalone saat `npm run build`
