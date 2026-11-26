# Panduan Lengkap Operasional Google Sheets CMS (Wego-RB)

Panduan ini ditujukan bagi panitia dan pengelola konten **Wego-RB BPS Provinsi Sumatera Utara** untuk mengelola seluruh data website (seminar, narasumber, kotak aspirasi, dan galeri) secara dinamis menggunakan Google Sheets tanpa perlu menyentuh kode program.

---

## 1. Struktur 4 Tab Spreadsheet

Buat satu file spreadsheet baru di Google Drive dengan nama **`Wego-RB Database (BPS Sumut)`**, lalu buat **4 tab** dengan nama persis sebagai berikut:

| No | Nama Tab | Fungsi di Website |
| :---: | :--- | :--- |
| 1 | **`Seminars`** | Menyuplai Katalog Pembelajaran di beranda, Arsip Sesi Wego (`#/sesi`), dan Modal Detail Operasional. |
| 2 | **`Speakers`** | Menyuplai carousel otomatis Profil Narasumber (Wegoers) di beranda. |
| 3 | **`CommunityAds`** | Menyuplai kartu-kartu Kotak Aspirasi & Gagasan Satker pada Papan Gagasan Bersama. |
| 4 | **`Gallery`** | Menyuplai pita foto dokumentasi kegiatan pada seksi Galeri Sosial. |

> [!TIP]
> File template CSV siap pakai tersedia di folder [docs/sheets-template/](file:///D:/Pekerjaan%20BPS1200/Tim%20Inovasi/Website/LandingPage/Wego-RB/docs/sheets-template/). Anda cukup mengimpor file CSV ke tab masing-masing via menu **File > Import > Upload**.

---

## 2. Rincian Kolom Setiap Tab

### Tab 1: `Seminars`

Baris pertama (header) diisi dengan kolom-kolom berikut:

```csv
id,judul,pemateri,peran,satker,tanggal,waktu,tempat,status,foto_flyer,link_presensi,link_vbg,link_zoom,link_slide,link_rekaman,deskripsi
```

| Kolom | Keterangan & Format | Contoh Isian |
| :--- | :--- | :--- |
| `id` | Kode unik sesi | `WEGO-01` |
| `judul` | Judul lengkap sesi seminar | `Pemanfaatan Web Scraping & Machine Learning Harga Pangan` |
| `pemateri` | Nama lengkap narasumber beserta gelar | `Lexie Siregar, S.Tr.Stat` |
| `peran` | Jabatan atau bidang fungsional pemateri | `Data Scientist / IPDS` |
| `satker` | Asal unit kerja / satker BPS | `BPS Prov. Sumut` |
| `tanggal` | Format hari dan tanggal ramah bacaan | `Jumat, 15 November 2024` |
| `waktu` | Waktu pelaksanaan dalam WIB | `09:00 - 11:30 WIB` |
| `tempat` | Lokasi luring atau platform daring | `Online via Zoom & Aula BPS Sumut` |
| `status` | Status sesi: isi `upcoming` (Akan Datang) atau `completed` (Selesai) | `upcoming` |
| `foto_flyer` | Tautan Google Drive gambar poster vertikal (rasio 3:4) | `https://drive.google.com/file/d/1A2b3C.../view` |
| `link_presensi` | Tautan Google Form daftar hadir resmi | `https://s.bps.go.id/presensi-wego-01` |
| `link_vbg` | Tautan unduh Virtual Background resmi | `https://drive.google.com/file/d/1X9y8Z.../view` |
| `link_zoom` | Tautan pertemuan Zoom live | `https://zoom.us/j/123456789` |
| `link_slide` | Tautan Google Drive bahan tayang slide (PPTX/PDF) | `https://drive.google.com/file/d/1M3n4O.../view` |
| `link_rekaman` | Tautan video YouTube rekaman sesi (jika telah selesai) | `https://youtube.com/watch?v=sample` |
| `deskripsi` | Ringkasan materi seminar 1–2 kalimat | `Metode ekstraksi harga komoditas dari portal online...` |

---

### Tab 2: `Speakers`

Baris pertama (header) diisi dengan kolom-kolom berikut:

```csv
id,nama,satker,peran,foto
```

| Kolom | Keterangan | Contoh Isian |
| :--- | :--- | :--- |
| `id` | Kode unik narasumber | `SPK-01` |
| `nama` | Nama narasumber | `Michelle Pontvert, S.Si` |
| `satker` | Satker BPS narasumber | `BPS Kota Medan` |
| `peran` | Jabatan / tim narasumber | `Statistisi Ahli Muda / Tim RB` |
| `foto` | Tautan Google Drive foto profil narasumber | `https://drive.google.com/file/d/1F0t0.../view` |

---

### Tab 3: `CommunityAds`

Baris pertama (header) diisi dengan kolom-kolom berikut:

```csv
id,kategori,satker,teks,aksi
```

| Kolom | Keterangan | Contoh Isian |
| :--- | :--- | :--- |
| `id` | Kode unik aspirasi | `ADS-01` |
| `kategori` | Kategori usulan: `Usulan Topik`, `Kolaborasi RB`, atau `Praktik Baik` | `Usulan Topik` |
| `satker` | Satker pengusul | `BPS Kab. Asahan` |
| `teks` | Deskripsi ide, usulan, atau praktik baik yang ingin dibagikan | `Ingin mempelajari otomasi rekonsiliasi data PDRB...` |
| `aksi` | Label teks pada tombol tindakan kartu | `Dukung Topik →` |

---

### Tab 4: `Gallery`

Baris pertama (header) diisi dengan kolom-kolom berikut:

```csv
id,keterangan,foto_url
```

| Kolom | Keterangan | Contoh Isian |
| :--- | :--- | :--- |
| `id` | Kode unik foto | `GAL-01` |
| `keterangan` | Judul / deskripsi momen kegiatan | `Suasana Sesi Pembelajaran Wego di Aula BPS Sumut` |
| `foto_url` | Tautan Google Drive foto dokumentasi kegiatan | `https://drive.google.com/file/d/1D0k7.../view` |

---

## 3. Panduan Pengunggahan Foto / File ke Google Drive

Seluruh aset gambar (poster flyer, foto narasumber, virtual background, slide PPT/PDF, dan dokumentasi) dapat disimpan langsung di Google Drive:

1. Unggah file poster atau foto ke folder Google Drive BPS Sumut.
2. Klik kanan file > pilih **Bagikan (Share)** > ubah akses menjadi **"Siapa saja yang memiliki link" (Anyone with the link)** sebagai **Pelihat (Viewer)**.
3. Klik **Salin link (Copy link)**.
4. Tempelkan (*paste*) URL tersebut langsung ke dalam kolom Google Sheets yang sesuai (misal `https://drive.google.com/file/d/1aBcDeFgHiJkLmNo/view?usp=sharing`).
5. **Selesai!** Website Wego-RB secara otomatis mengonversi tautan share tersebut menjadi tautan CDN berkecepatan tinggi tanpa hambatan login atau blokir hotlinking.

---

## 4. Cara Mengaktifkan Spreadsheet ke Website

1. Buka spreadsheet yang telah Anda isi di Google Sheets.
2. Klik tombol **Bagikan (Share)** di pojok kanan atas.
3. Pada bagian *Akses Umum (General access)*, ubah dari *Dibatasi* menjadi **"Siapa saja yang memiliki link" (Anyone with the link)** dengan peran **Pelihat (Viewer)**.
4. Salin URL Spreadsheet dari browser, misalnya:
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   ```
5. Ambil kode **Spreadsheet ID** di tengah URL tersebut:
   `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
6. Masukkan Spreadsheet ID ini ke dalam environment variable repository GitHub:
   - Buka Repository GitHub > **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Tambahkan variable baru: `VITE_GOOGLE_SHEETS_ID` dengan nilai ID di atas.
   - Atau untuk pengujian lokal, isi pada file `.env`:
     ```
     VITE_GOOGLE_SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
     ```
