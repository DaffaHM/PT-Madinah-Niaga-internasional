# Panduan Deployment ke cPanel Shared Hosting (Static Export)

## Strategi Deploy

> Website ini di-export sebagai **file HTML/CSS/JS statis murni**.
> Tidak memerlukan Node.js App, tidak perlu build di server.
> Cukup upload folder `out/` ke cPanel seperti website biasa.

---

## Langkah 1 — Build di Komputer Lokal

```bash
npm run build
```

Hasil build ada di folder `out/` yang berisi:

```
out/
├── index.html          ← halaman utama
├── 404.html            ← halaman not found
├── robots.txt
├── sitemap.xml
├── *.png / *.svg       ← semua gambar dari public/
└── _next/
    ├── static/
    │   ├── chunks/     ← JavaScript bundles
    │   └── css/        ← CSS bundles
    └── ...
```

---

## Langkah 2 — Upload ke cPanel

### Opsi A — File Manager cPanel (Recommended)

1. Login ke **cPanel → File Manager**
2. Masuk ke folder `public_html` (atau subfolder domain/subdomain)
3. Klik **Upload** → upload semua isi folder `out/` (bukan folder `out/`-nya, tapi **isinya**)
4. Pastikan `index.html` ada langsung di `public_html/`

### Opsi B — FTP (FileZilla, dll)

1. Connect ke server via FTP
2. Upload semua isi folder `out/` ke `public_html/`

### Opsi C — Git + cPanel Git Version Control

1. Push ke repository
2. Di cPanel → Git Version Control → pull
3. Set document root ke folder `out/`

---

## Langkah 3 — Struktur Akhir di Server

```
public_html/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── logo-navv.png
├── kurma.png
├── ... (semua gambar)
└── _next/
    └── static/
        ├── chunks/
        └── css/
```

---

## Langkah 4 — Konfigurasi .htaccess (Opsional tapi Direkomendasikan)

Buat file `.htaccess` di `public_html/` untuk handle routing dan error page:

```apache
# Aktifkan mod_rewrite
Options -MultiViews
RewriteEngine On

# Redirect ke HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle 404
ErrorDocument 404 /404.html

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|webp|svg|ico|woff2?)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Cache HTML — jangan cache terlalu lama
<FilesMatch "\.html$">
  Header set Cache-Control "public, max-age=3600"
</FilesMatch>
```

---

## Update / Redeploy

Setiap ada perubahan kode:

```bash
# Di komputer lokal:
npm run build

# Upload ulang isi folder out/ ke public_html/
# (timpa file lama)
```

---

## Checklist Sebelum Upload

- [ ] `npm run build` berhasil tanpa error
- [ ] Folder `out/` terbentuk dan ada `index.html` di dalamnya
- [ ] Semua gambar ada di `out/` (bukan hanya di `public/`)
- [ ] Upload **isi** folder `out/`, bukan folder `out/`-nya sendiri
- [ ] `index.html` ada langsung di `public_html/`

---

## Catatan Penting

- **Tidak perlu** Node.js App di cPanel
- **Tidak perlu** `npm install` di server
- **Tidak perlu** `npm run build` di server
- Website ini adalah **file statis murni** — bisa di-host di hosting manapun
- Semua animasi GSAP tetap berjalan karena dijalankan di browser (client-side)
- `next/image` menggunakan `unoptimized: true` — gambar di-serve langsung tanpa transformasi server
