// server.js — Entry point untuk cPanel Node.js App (Phusion Passenger)
//
// STRATEGI DEPLOY:
// Build dilakukan LOKAL, lalu folder hasil build diupload ke server.
// File ini hanya mem-forward ke .next/standalone/server.js yang sudah
// berisi semua yang dibutuhkan (Next.js + dependencies minimal).
//
// Struktur yang diupload ke cPanel:
//   /home/user/app/
//   ├── server.js              ← file ini (entry point cPanel)
//   ├── .next/
//   │   ├── standalone/        ← hasil build (self-contained server)
//   │   └── static/            ← static assets (JS, CSS, dll)
//   └── public/                ← gambar dan aset publik

'use strict'

const path = require('path')

// Set environment sebelum load standalone server
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || '3000'
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0'

// Jalankan standalone server hasil build Next.js
require(path.join(__dirname, '.next', 'standalone', 'server.js'))
