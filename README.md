# RESTful API Webtoon dengan Node.js, NestJS, PostgreSQL, dan Prisma

Proyek ini adalah sebuah RESTful API untuk aplikasi webtoon yang dibangun menggunakan **Node.js**, **NestJS**, **Prisma**, dan **PostgreSQL**. API ini menyediakan berbagai fitur, termasuk manajemen pengguna, komik, bab (chapters), dan gambar, serta mengimplementasikan otentikasi dan otorisasi menggunakan **OAuth0** dengan **JWT**.

## Fitur Utama

- **Manajemen Pengguna:** Pendaftaran, autentikasi, dan otorisasi pengguna dengan OAuth0 dan JWT.
- **Manajemen Komik:** CRUD (Create, Read, Update, Delete) komik, termasuk detail dan informasi komik.
- **Manajemen Chapters:** CRUD untuk bab komik yang terhubung dengan komik tertentu.
- **Manajemen Gambar:** Penyimpanan dan pengelolaan gambar terkait dengan bab komik.
- **Otentikasi:** Menggunakan OAuth0 dan JWT untuk memastikan keamanan akses data.
- **Logging:** Integrasi dengan **Winston** untuk logging dan pemantauan aktivitas aplikasi secara real-time.

## Teknologi yang Digunakan

- **Node.js:** Runtime JavaScript untuk server-side.
- **NestJS:** Framework untuk membangun aplikasi backend yang modular dan terstruktur.
- **Prisma:** ORM (Object-Relational Mapping) untuk memudahkan interaksi dengan database PostgreSQL.
- **PostgreSQL:** Database relasional untuk penyimpanan data.
- **Winston:** Digunakan untuk logging aplikasi.
- **OAuth0 & JWT:** Untuk autentikasi dan otorisasi.

## Persyaratan

- **Node.js:** v16.x atau lebih baru
- **PostgreSQL:** v13.x atau lebih baru
- **Prisma:** v4.x atau lebih baru
- **NestJS CLI:** v9.x atau lebih baru

## Cara Menginstal

1. **Clone repository ini:**

   ```bash
   git clone https://github.com/nurmanhadi/RESTful-API-Webtoons-With-Node-JS--NestJS--PostgreSQL-and-Prisma.git

2. **Masuk ke direktori proyek:**

   ```bash
   cd Sinikomik

3. **Install dependencies:**

   ```bash
   npm install

4. **Konfigurasi database:**

   - Ubah file .env dengan konfigurasi database PostgreSQL Anda.
   - Jalankan migrasi Prisma untuk membuat skema database.

   ```bash
   npx prisma migrate dev

5. **Jalankan aplikasi:**

   ```bash
   npm run start

## Dokumentasi API

Dokumentasi lengkap API dapat diakses melalui endpoint /api setelah menjalankan aplikasi.

## Logging

Aplikasi ini menggunakan Winston untuk logging, yang mencakup:

- Log aktivitas pengguna.
- Log kesalahan dan error handling.

## Lisensi

Proyek ini menggunakan [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE). Lihat file LICENSE untuk informasi lebih lanjut.
