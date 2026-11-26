# Spec: Halaman Arsip Sesi Wego (All Sessions Archive Page)

## Problem Statement

Landing page Wego-RB saat ini menyajikan seksi "Katalog Pembelajaran" yang dibatasi hanya menampilkan beberapa sesi pilihan teratas agar halaman beranda tetap ringkas dan tidak terlalu panjang. Namun, seiring bertambahnya sesi seminar dari Google Sheets CMS, pegawai BPS se-Sumatera Utara membutuhkan halaman arsip menyeluruh (*Arsip Sesi Wego*) untuk menelusuri seluruh riwayat sesi pembelajaran yang telah berlangsung maupun agenda sesi yang akan datang. Pengunjung membutuhkan fitur pencarian topik/narasumber, filter status kegiatan, dan urutan prioritas yang rapi, dengan tetap mempertahankan estetika desain majalah editorial (*zero AI-slop*), rasio poster potrait 3:4, dan akses ke instrumen operasional seminar melalui modal detail yang konsisten.

## Solution

1. **Arsitektur SPA Hash Routing (`#/sesi`)**: Mengimplementasikan routing berbasis hash yang ringan dan ramah deployment statis (GitHub Pages bebas 404). Ketika URL bernilai `#/sesi`, aplikasi merender tampilan `SessionsArchive`, dan kembali merender landing page beranda saat URL bernilai `#` atau kosong.
2. **Komponen Halaman Arsip (`SessionsArchive.jsx`)**:
   - Navbar khusus dengan tombol `← Kembali ke Beranda` di sisi kiri dan wordmark Didone `wegoberbagi` di sisi kanan.
   - Header editorial dengan tipografi majalah: judul Didone `Arsip Sesi Wego`, deskripsi program, dan ringkasan statistik.
   - Bar kontrol filter: Tab filter status (`Semua`, `Akan Datang`, `Selesai`) dan input pencarian teks minimalis (*real-time filter*).
   - Penghitung hasil monospaced (misal `Menampilkan 6 dari 6 sesi pembelajaran`).
   - Grid kartu poster 3:4 yang terintegrasi langsung dengan `SeminarDetailModal`.
   - *Empty state* bertema editorial jika hasil pencarian tidak ditemukan, dilengkapi tombol `Reset Filter ↺`.
   - Footer penutup yang konsisten.
3. **Titik Masuk Terpadu dari Beranda**:
   - Menghubungkan tombol `Lihat Semua Sesi ↗` di `SeminarCatalog.jsx` ke `#/sesi`.
   - Menghubungkan tautan navigasi `Katalog Sesi` di `Navbar.jsx` dan `Footer.jsx` ke `#/sesi`.
4. **Perilaku Navigasi & Inersia Gulir**:
   - Mengatur scroll otomatis kembali ke atas (`window.scrollTo(0, 0)`) setiap kali terjadi pergantian tampilan.
   - Menjaga seluruh tampilan tetap dibungkus dalam `SmoothScrollProvider` agar pengalaman inersia gulir (*Lenis smooth scroll*) tetap aktif.

## User Stories

1. As a BPS employee browsing the landing page, I want to click "Lihat Semua Sesi ↗" in the seminar catalog, so that I am taken directly to the full sessions archive page.
2. As a visitor on the sessions archive page, I want to see a clear "← Kembali ke Beranda" button, so that I can easily return to the main landing page anytime.
3. As a visitor looking for upcoming learning opportunities, I want upcoming sessions to be displayed first at the top, so that I can promptly discover active registration links and schedules.
4. As a visitor searching for a specific topic, speaker, or satker, I want to type keywords into an instant search box, so that the card list updates immediately.
5. As a visitor browsing historical recordings, I want to filter sessions by "Selesai", so that I can access past session slide decks and video recordings.
6. As a participant viewing an archive card, I want to click the card to open the operational detail modal, so that I can access attendance links, virtual backgrounds, Zoom links, and slides.
7. As a visitor entering a search query with no matching sessions, I want to see a clean editorial empty state with a "Reset Filter" action, so that I am never stuck on a blank screen.
8. As a user refreshing the page or sharing a link with `#/sesi`, I want the browser to directly display the archive page without throwing a 404 error on GitHub Pages.
9. As a keyboard and accessibility user, I want page view transitions to maintain valid semantic landmarks (`header`, `main`, `footer`) and clear document titles.

## Implementation Decisions

### 1. Hash Routing Controller (`App.jsx`)
- Menggunakan state `currentRoute` yang disinkronkan dengan event `window.addEventListener('hashchange', ...)` dan inisialisasi awal dari `window.location.hash`.
- Jika `window.location.hash.startsWith('#/sesi')`, aplikasi merender komponen `SessionsArchive`.
- Jika sebaliknya, aplikasi merender struktur beranda landing page yang sudah ada.
- Saat rute berganti, dipanggil `window.scrollTo(0, 0)` dan `ScrollTrigger.refresh()`.

### 2. Komponen Arsip Sesi (`SessionsArchive.jsx`)
- Menerima props `seminars` (dari `useWegoData`) dan callback `onBackToHome` / `onOpenModal`.
- State internal: `statusFilter` (`'all' | 'upcoming' | 'completed'`) dan `searchQuery` (string).
- Algoritma pengurutan:
  - Sesi berstatus `upcoming` ditempatkan di awal.
  - Sesi berstatus `completed` diurutkan setelahnya berdasarkan tanggal terbaru.
- Algoritma penyaringan:
  - Memfilter berdasarkan kecocokan `statusFilter`.
  - Memfilter kecocokan string `searchQuery` pada `title`, `speaker`, `satker`, `category`, dan `dateText`.

### 3. Pembaruan Tautan Navigasi Beranda
- `SeminarCatalog.jsx`: Mengubah href tombol `Lihat Semua Sesi ↗` dari `#ads` menjadi `#/sesi`.
- `Navbar.jsx`: Mengubah href tautan `Katalog Sesi` menjadi `#/sesi`.
- `Footer.jsx`: Mengubah tautan katalog di footer menjadi `#/sesi`.

## Testing Decisions

- **Seam 1 (SessionsArchive Filter & Search Seam)**: Menguji rendering header arsip, filter tab status, input pencarian realtime, penghitung jumlah hasil, tombol reset filter, dan pembukaan detail modal saat kartu diklik.
- **Seam 2 (Hash Navigation & App Integration Seam)**: Menguji transisi antar tampilan saat hash berubah (`#/sesi` ↔ `#`), verifikasi tautan `Lihat Semua Sesi ↗` membawa pengguna ke arsip, dan tombol `← Kembali ke Beranda` membawa pengguna kembali ke landing page.
- **Seam 3 (Full Suite & Build)**: Memastikan seluruh test suite (unit + E2E) lulus 100% dan build produksi bebas error.

## Out of Scope

- Paginasi server-side database (data dikelola via Google Sheets CMS).
- Sistem autentikasi / login multi-user.
