# Product Requirements Document (PRD) & Technical Architecture Specification

**Project**: Landing Page Wego-RB (Badan Pusat Statistik Provinsi Sumatera Utara)  
**Destination Deliverable**: Map [#1](https://github.com/restusatrio11/Wego-RB/issues/1)  
**Resolves**: Ticket [#5](https://github.com/restusatrio11/Wego-RB/issues/5)  
**Author / Lead**: Tim Inovasi BPS Provinsi Sumatera Utara  
**Repository**: `https://github.com/restusatrio11/Wego-RB`  
**Status**: Ready for Implementation  

---

## 1. Project Background & Destination

### 1.1 Apa itu Wego?
**Wego** (*Wadah Edukasi & Gagasan Orang BPS*) adalah program seminar dan ruang berbagi pengetahuan berkala yang diselenggarakan oleh BPS Provinsi Sumatera Utara. Program ini bertujuan untuk:
- Membangun dan mempercepat budaya literasi **Reformasi Birokrasi (RB)** dan **Zona Integritas (ZI)** menuju predikat WBK/WBBM.
- Menjadi panggung terbuka bagi seluruh insan statistik di BPS Provinsi dan 33 BPS Kabupaten/Kota se-Sumatera Utara untuk menularkan keahlian teknologi data, metodologi statistik, dan soft skills.
- Menyediakan repositori terbuka (*open knowledge base*) berisi materi presentasi (PPT/PDF) dan rekaman sesi webinar yang dapat diakses kapan pun.

### 1.2 Tujuan Landing Page
Menyediakan portal web modern, responsif, dan dinamis yang:
1. Menampilkan jadwal sesi terdekat dengan hitung mundur (*countdown*) dan link Zoom/RSVP.
2. Mendokumentasikan direktori narasumber internal BPS (**Wegoers Hall of Fame**).
3. Menyediakan katalog seminar yang dapat difilter dan dicari berdasarkan topik/pemateri.
4. Membuka saluran partisipasi aktif (**Kotak Gagasan**) bagi pegawai untuk mengajukan diri sebagai pemateri atau mengusulkan topik baru.
5. Menampilkan kutipan dampak dan testimoni (**Wego Wall of Impact**).
6. Berjalan tanpa server database berbayar, memanfaatkan **Google Sheets** sebagai CMS dinamis yang dapat diedit langsung oleh tim pengelola non-teknis.

---

## 2. Visual Design System (ilovecreatives Theme)

Landing page ini mengadopsi estetika editorial bergaya **`ilovecreatives`** (sesuai referensi `home (1).webp`):

### 2.1 Typography Pairing
- **Serif Display**: `"Playfair Display", Georgia, serif` (Google Fonts) — Digunakan untuk headline utama, nama pemateri, dan judul sesi seminar dengan aksen miring (*italics*) berbobot 400 dan 700.
- **Sans-Serif Body**: `"Plus Jakarta Sans", sans-serif` (Google Fonts) — Digunakan untuk teks body, deskripsi seminar, dan navigasi (bobot 400, 500, 600, 700).
- **Monospace Accent**: `"Space Mono", monospace` (Google Fonts) — Digunakan untuk pill badges, status episode, tanggal, dan running marquee ticker (bobot 400 dan 700).

### 2.2 Color Tokens & Editorial Styling
- **Latar Belakang Bersih (`#FFFFFF` & `#FBFBFA`)**: Latar belakang putih bersih dan abu-abu sangat muda yang lapang dan elegan, menghindari kesan kaku atau tebal.
- **Tipografi Hitam Pekat (`#111111`)**: Teks hitam dengan kontras tinggi yang mudah dibaca.
- **Warna Aksen Halus**: Palet netral abu-abu lembut (`#767672`) untuk teks keterangan sekunder dan border halus (`#E8E8E4`).
- **Garis & Sudut Halus**: Sudut membulat lembut (`rounded-2xl`, `rounded-3xl`, `rounded-full`), garis border tipis 1px abu-abu netral, tanpa bayangan hitam tebal (non-brutalism).
- **Bebas Emoticon**: Menggunakan teks murni dan tipografi editorial berkualitas tinggi tanpa ikon emoji/emoticon yang berlebihan.

---

## 3. Data Architecture (Google Sheets CMS)

Sistem menggunakan **Google Visualization API (`/gviz/tq`)** yang bebas API Key, tanpa dependency eksternal, dan langsung mengenali nama tab Google Sheets:

### 3.1 Endpoint Template
```
https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet={TAB_NAME}
```

### 3.2 Tiga Tab Google Sheets:
1. **`Seminars`**:
   - `id`, `session_number`, `title`, `category`, `speaker_name`, `speaker_role`, `date`, `time`, `location`, `flyer_url`, `materials_url`, `recording_url`, `zoom_url`, `is_featured`, `status`, `description`
2. **`Speakers`**:
   - `id`, `name`, `satker`, `role`, `avatar_url`, `quote`, `topics`
3. **`SiteSettings`**:
   - `key`, `value` (`hero_title`, `hero_tagline`, `running_ticker`, `kotak_gagasan_url`, `total_sesi`, `total_wegoers`, `contact_email`)

### 3.3 Google Drive Asset Converter Pipeline
Seluruh URL share Google Drive (`/view`, `?id=`, `/uc?`) diubah secara otomatis oleh frontend menjadi URL thumbnail resolusi tinggi:
```
https://drive.google.com/thumbnail?id={FILE_ID}&sz=w800
```
Menghindari galat 403 Forbidden dan anti-hotlinking dari Google Drive.

---

## 4. Component Structure & Assembly

Aplikasi React dipecah menjadi 10 komponen modular:
1. `Header.jsx`: Navigasi sticky, badge satker BPS Sumut, link navigasi, dan tombol "Ajukan Ide".
2. `MarqueeTicker.jsx`: Animasi teks berjalan tanpa henti berisi slogan RB, pengumuman jadwal, dan jumlah sesi.
3. `HeroSection.jsx`: Headline tipografi editorial dengan sticker pill dan metrik ringkas.
4. `UpcomingSpotlight.jsx`: Sorotan seminar terdekat dengan hitung mundur dinamis dan link Zoom.
5. `SpeakersHallOfFame.jsx`: Grid foto narasumber dengan efek hover dari hitam-putih menjadi berwarna (*grayscale-to-color*).
6. `SeminarArchive.jsx`: Katalog sesi dengan filter pill kategori dan pencarian instan (*live search*).
7. `WegoWall.jsx`: Kutipan dampak dan testimoni insan BPS.
8. `KotakGagasanSection.jsx`: Kotak partisipasi topik dan pemateri dengan polling topik populer.
9. `GagasanModal.jsx`: Modal popup yang terhubung langsung ke Google Form pengajuan.
10. `Footer.jsx`: Footer editorial gelap dengan info kontak dan hak cipta.

---

## 5. Deployment & CI/CD Specification

- **Build Engine**: Vite + React.js + Tailwind CSS.
- **Hosting Target**: GitHub Pages (gratis, tanpa server).
- **CI/CD Pipeline**: GitHub Actions (`.github/workflows/deploy.yml`) yang otomatis melakukan *lint*, *build*, dan mempublikasikan hasil `dist/` ke environment `github-pages` setiap ada push ke branch `main`.
