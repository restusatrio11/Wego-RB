# Panduan Pembuatan Google Sheets CMS (Wego-RB)

Panduan ini ditujukan bagi pengelola / panitia Wego BPS Provinsi Sumatera Utara untuk membuat dan mengelola spreadsheet yang bertindak sebagai database dinamis landing page Wego-RB.

---

## Langkah 1: Buat Spreadsheet Baru di Google Drive

1. Buka [Google Sheets](https://sheets.new) di browser Anda dengan akun Google BPS Sumut.
2. Beri nama spreadsheet: **`Wego-RB Database (BPS Sumut)`**.
3. Buat **3 Sheet (Tab)** dengan nama persis sebagai berikut (perhatikan huruf besar/kecil):
   - **`Seminars`**
   - **`Speakers`**
   - **`SiteSettings`**

---

## Langkah 2: Struktur Kolom Tiap Sheet

### Tab 1: `Seminars`
Isi baris pertama (Header) dengan kolom berikut:
```csv
id,session_number,title,category,speaker_name,speaker_role,date,time,location,flyer_url,materials_url,recording_url,zoom_url,is_featured,status,description
```

Contoh Baris Data:
- `id`: `WEGO-11`
- `session_number`: `11`
- `title`: `Pemanfaatan Web Scraping & Machine Learning untuk Statistik Harga Pangan`
- `category`: `Teknologi & Data Science` *(Kategori lain: `Reformasi Birokrasi & ZI`, `Visualisasi & Komunikasi`, `Statistik Sektoral`)*
- `speaker_name`: `Hafiz Siregar, S.Tr.Stat`
- `speaker_role`: `Data Scientist / IPDS BPS Prov. Sumut`
- `date`: `2026-12-05`
- `time`: `09:00 - 11:30 WIB`
- `location`: `Zoom Meeting & Aula BPS Sumut`
- `flyer_url`: *(Link share Google Drive gambar poster flyer)*
- `materials_url`: *(Link share Google Drive file slide PPT/PDF)*
- `recording_url`: *(Link rekaman YouTube)*
- `zoom_url`: *(Link pendaftaran / link Zoom meeting)*
- `is_featured`: `TRUE` *(jika ingin ditampilkan di spotlight Upcoming)*
- `status`: `UPCOMING` atau `COMPLETED`
- `description`: *(Ringkasan materi seminar 1-2 kalimat)*

---

### Tab 2: `Speakers`
Isi baris pertama (Header) dengan kolom berikut:
```csv
id,name,satker,role,avatar_url,quote,topics
```

Contoh Baris Data:
- `id`: `SPK-01`
- `name`: `Hafiz Siregar, S.Tr.Stat`
- `satker`: `BPS Prov. Sumut`
- `role`: `Data Scientist / IPDS`
- `avatar_url`: *(Link share Google Drive foto narasumber)*
- `quote`: `Data tanpa visualisasi ibarat kopi tanpa gula: pahit diinterpretasi.`
- `topics`: `Machine Learning, Web Scraping, Python`

---

### Tab 3: `SiteSettings`
Isi baris pertama (Header) dengan kolom berikut:
```csv
key,value
```

Baris-baris konfigurasi:
| key | value |
| :--- | :--- |
| `hero_title` | `Ruang berbagi insight & inovasi bagi para wegoers se-Sumatera Utara.` |
| `hero_tagline` | `Wego adalah program seminar berkala BPS Provinsi Sumatera Utara untuk mempercepat budaya Reformasi Birokrasi (RB), memperluas wawasan statistik, dan menumbuhkan insan inovatif.` |
| `running_ticker` | `✦ WEGO BPS PROVINSI SUMATERA UTARA • EPISODE 11: JUMAT, 5 DESEMBER 2026 • 35+ SESI BERBAGI • ZONA INTEGRITAS MENUJU WBK/WBBM • KAMI BERBAGI KAMI BERKEMBANG` |
| `kotak_gagasan_url` | `https://docs.google.com/forms/d/e/.../viewform` *(Link Google Form pendaftaran pemateri / request topik)* |
| `total_sesi` | `35` |
| `total_wegoers` | `42` |
| `contact_email` | `bps1200@bps.go.id` |

---

## Langkah 3: Pengaturan Hak Akses (Publish)

Agar landing page dapat membaca data tanpa API Key:
1. Klik tombol **Bagikan (Share)** di pojok kanan atas Google Sheets.
2. Pada bagian *Akses Umum (General Access)*, ubah dari *Dibatasi (Restricted)* menjadi **"Siapa saja yang memiliki link" (Anyone with the link)** dengan peran **Pelihat (Viewer)**.
3. Salin URL Spreadsheet, misalnya:
   `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
4. Ambil kode **Spreadsheet ID** di tengah URL tersebut:
   `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
5. Masukkan Spreadsheet ID ini ke dalam file konfigurasi web `src/config.js` atau `.env`.

> [!TIP]
> File template CSV siap pakai tersedia di folder [docs/sheets-template/](file:///D:/Pekerjaan%20BPS1200/Tim%20Inovasi/Website/LandingPage/Wego-RB/docs/sheets-template/). Anda cukup mengimpor file-file CSV tersebut langsung ke dalam Google Sheets melalui menu **File > Import > Upload**.
