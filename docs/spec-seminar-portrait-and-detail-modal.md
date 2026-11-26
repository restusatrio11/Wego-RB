# Spec: Katalog Pembelajaran Potrait, Modal Detail Sesi, dan Penyembunyian Pojok Unduhan

## Problem Statement

Pegawai BPS se-Sumatera Utara yang mengakses halaman Wego memerlukan media publikasi seminar yang selaras dengan format poster kegiatan resmi BPS (vertikal/potrait), serta memerlukan akses cepat ke seluruh instrumen operasional seminar dalam satu tempat tanpa harus berpindah halaman atau mencari tautan di kanal lain. Format horizontal yang sebelumnya digunakan membatasi keterbacaan flyer dan tidak menyediakan informasi penting seperti jadwal tanggal/jam, tautan presensi, tautan virtual background, dan tautan akses pertemuan secara terpadu. Selain itu, seksi Pojok Unduhan belum memiliki materi siap pakai sehingga perlu disembunyikan agar tidak membingungkan pengguna.

## Solution

1. Mengubah Kartu Sesi pada Katalog Pembelajaran menjadi format potrait vertikal (rasio poster 3:4 atau 4:5) dengan penekanan visual pada poster flyer, pill badge status kegiatan, judul sesi, nama Wegoers, dan jadwal ringkas.
2. Menyediakan Modal Detail Sesi interaktif yang terbuka saat Kartu Sesi diklik. Modal ini menyajikan poster resolusi penuh, deskripsi sesi, jadwal lengkap, lokasi/platform, serta tautan langsung untuk presensi, unduh virtual background resmi, gabung Zoom / tonton rekaman, dan unduh slide materi.
3. Memperluas skema data seminar pada pipeline Google Sheets CMS dan dataset default offline agar seluruh atribut operasional dapat dikelola secara dinamis.
4. Menyembunyikan seksi Pojok Unduhan dari perenderan halaman utama dan membersihkan tautan navigasi terkait dari Navbar dan Footer.

## User Stories

1. As a BPS employee, I want to view seminar cards in portrait poster format, so that the visual presentation matches official BPS event flyers.
2. As a BPS employee, I want to click any seminar card, so that I can view complete operational details in a focused modal dialog without leaving the page.
3. As a seminar participant, I want to see the exact date, day, and time of a session in the detail modal, so that I can schedule my participation accurately.
4. As a seminar participant, I want to access the attendance registration link directly from the detail modal, so that I can record my presence easily.
5. As a seminar participant, I want to download the official virtual background directly from the detail modal, so that I can use it during the virtual conference.
6. As a seminar participant, I want a direct action button to join the live Zoom meeting or watch the session recording, so that I can access the knowledge sharing session with one click.
7. As a seminar participant, I want to download presentation slides from the detail modal, so that I can review the learning materials offline.
8. As a website visitor, I want to close the detail modal using a close button, clicking the backdrop, or pressing the Escape key, so that navigation feels smooth and intuitive.
9. As a site administrator, I want to update seminar dates, venues, virtual background URLs, and attendance URLs via Google Sheets without touching source code, so that event operations remain agile.
10. As a visitor browsing the landing page, I want inactive sections like Pojok Unduhan to remain hidden, so that every section and link on the page provides real, ready-to-use content.
11. As a mobile visitor, I want the portrait seminar cards and the detail modal to be responsive and easy to read on smaller screens, so that I can access seminar details from my smartphone.
12. As a visitor using keyboard navigation, I want the detail modal to manage focus properly and close when Escape is pressed, so that accessibility standards are respected.

## Implementation Decisions

### 1. Perubahan Kartu Sesi Menjadi Potrait (SeminarCatalog.jsx)
- Format kartu diubah menjadi rasio potrait vertikal (aspect ratio 3:4 atau 4:5).
- Menampilkan poster flyer sesi di bagian atas kartu, pill badge status kegiatan (*Akan Datang* / *Selesai*), tanggal ringkas, judul sesi, dan nama narasumber (Wegoers).
- Kartu memiliki kursor pointer dan indikator interaksi hover yang mengindikasikan bahwa kartu dapat diklik untuk membuka modal rincian.
- Layout menggunakan grid responsif: 1 kolom pada ponsel, 2 kolom pada tablet, dan 3 kolom pada layar desktop.

### 2. Komponen Modal Detail Sesi (SeminarDetailModal.jsx)
- Komponen modal dialog baru dengan backdrop semi-transparan dan animasi fade-in halus.
- Struktur isi modal:
  - Header dengan tombol tutup (X).
  - Kolom visual flyer resolusi tinggi.
  - Kolom informasi teks:
    - Kicker status dan topik seminar.
    - Judul lengkap Sesi Wego.
    - Nama dan profil ringkas pemateri (Wegoers).
    - Kotak metadata: Tanggal dan Waktu (hari, tanggal, jam WIB), Tempat/Platform (Zoom / Ruang Rapat).
    - Grup tombol aksi:
      - Tautan Presensi (Google Form presensi).
      - Tautan Virtual Background (Google Drive download link).
      - Tautan Pertemuan / Rekaman (Zoom link jika aktif, YouTube link jika rekaman).
      - Tautan Unduh Slide Materi.
- Aksesibilitas: Menutup saat tombol Esc ditekan, saat backdrop diklik, atau saat tombol X diklik.

### 3. Pembaruan Skema Data & Google Sheets Pipeline (dataService.js)
- Setiap item pada koleksi `seminars` memiliki struktur data berikut:
```javascript
{
  id: string,
  title: string,
  speaker: string,
  speakerRole: string,
  date: string,
  time: string,
  venue: string,
  status: 'upcoming' | 'completed',
  image: string,
  desc: string,
  slideUrl: string,
  videoUrl: string,
  presensiUrl: string,
  vbgUrl: string,
  zoomUrl: string
}
```
- Fungsi `parseGvizResponse` memetakan kolom baru dari Google Sheets jika tersedia.
- Dataset fallback `DEFAULT_DATA.seminars` diperkaya dengan seluruh data operasional valid untuk demonstrasi offline.

### 4. Penyembunyian Pojok Unduhan & Pembersihan Navigasi
- Komponen `DownloadableTemplates` tidak dirender pada `App.jsx`.
- Tautan `Unduhan` pada `Navbar.jsx` dan `Footer.jsx` dihapus agar tidak menyisakan broken anchor.

## Testing Decisions

- Pengujian memverifikasi perilaku eksternal pengguna dan kontrak data tanpa menguji detail implementasi privat.
- Seam 1 (Data Normalizer & Fallback): Menguji bahwa `parseGvizResponse` memetakan kolom operasional baru dan `DEFAULT_DATA` memuat atribut tanggal, lokasi, presensiUrl, vbgUrl, dan zoomUrl.
- Seam 2 (Komponen Seminar Detail Modal): Menguji pembukaan modal, keterbacaan seluruh informasi operasional, fungsionalitas seluruh tautan aksi, dan penutupan melalui tombol X, klik backdrop, serta tombol Escape.
- Seam 3 (Full-Page End-to-End Navigation): Menguji alur pengguna saat mengklik Kartu Sesi di Katalog Pembelajaran hingga modal terbuka dan dapat ditutup kembali, serta memastikan Pojok Unduhan tidak ada dalam DOM.
- Prior art: Mengikuti pola pengujian yang telah mapan di `src/test/SubmissionModal.test.jsx` dan `src/test/App.e2e.test.jsx`.

## Out of Scope

- Autentikasi SSO pegawai untuk pengisian presensi (presensi menggunakan tautan Google Form BPS).
- Sistem pemesanan tiket seminar atau pendaftaran berbayar (seluruh sesi bersifat gratis untuk pegawai BPS).
- Modifikasi tabel Google Sheets selain lembar kerja `Seminars`.

## Further Notes

- Seluruh tautan Google Drive untuk flyer atau virtual background dinormalisasi otomatis menggunakan fungsi `convertDriveUrl` agar langsung dapat ditampilkan atau diunduh tanpa kendala preview web.
- Tampilan visual mempertahankan konsistensi tipografi Didone Bodoni Moda, editorial italic Instrument Serif, dan clean grotesk Inter tanpa unsur neo-brutalisme atau ornamen emosional non-standar.
