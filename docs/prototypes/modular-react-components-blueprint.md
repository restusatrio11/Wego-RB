# Modular React Component Architecture Blueprint

**Project**: Landing Page Wego-RB (BPS Provinsi Sumatera Utara)  
**Ticket**: Resolves [#4](https://github.com/restusatrio11/Wego-RB/issues/4)  
**Parent Map**: [#1](https://github.com/restusatrio11/Wego-RB/issues/1)  
**Branch**: `prototype/modular-react-components`  

---

## 1. Overview & Komponen Modular

Sesuai dengan keputusan desain (*ilovecreatives style*) dan arsitektur data spreadsheet (*Google Visualization API*), landing page Wego-RB dipecah menjadi 10 komponen modular mandiri:

```
src/
├── components/
│   ├── Header.jsx                 // Sticky navigation bar, branding, badges, CTA button
│   ├── MarqueeTicker.jsx          // Running text ticker tape tanpa jeda (pengumuman jadwal & RB)
│   ├── HeroSection.jsx            // Typography-first editorial hero, sticker pill, quick metrics
│   ├── UpcomingSpotlight.jsx      // Episode terdekat, countdown timer, speaker highlight, Zoom link
│   ├── SpeakersHallOfFame.jsx     // Grid Wegoers (grayscale-to-color hover, satker badge, quote)
│   ├── SeminarArchive.jsx         // Katalog filterable (kategori, search bar, link video & materi)
│   ├── WegoWall.jsx               // Wall of impact testimoni rekan BPS se-Sumut
│   ├── KotakGagasanSection.jsx    // Call for speakers & polling request topik
│   ├── GagasanModal.jsx           // Dialog modal terhubung langsung ke Google Form
│   └── Footer.jsx                 // Footer gelap editorial, kontak BPS Sumut, hak cipta
├── services/
│   └── googleSheets.js            // Hook useWegoData & helper convertDriveUrl (dari Tiket #3)
└── App.jsx                        // Root assembly & state orchestrator
```

---

## 2. Kontrak Data & Props (Props Contract)

### 2.1 `UpcomingSpotlight`
- `seminar`: Objek `Seminar` dengan status `UPCOMING` atau `isFeatured: true`.
- Fitur:
  - Countdown timer interaktif (Hari, Jam, Menit).
  - Integrasi link Zoom dan tombol simpan ke kalender.
  - Kartu foto pemateri yang diproses lewat `convertDriveUrl`.

### 2.2 `SpeakersHallOfFame`
- `speakers`: Array objek `Speaker` (ID, Nama, Satker, Role, Foto Google Drive, Quote, Topik Keahlian).
- Interaksi: Klik kartu pemateri menampilkan profil lengkap dan riwayat seminar yang dibawakan.

### 2.3 `SeminarArchive`
- `seminars`: Array seluruh sesi seminar.
- Filter:
  - Tombol pill kategori (`Teknologi & Data Science`, `Reformasi Birokrasi & ZI`, `Visualisasi & Komunikasi`).
  - Input pencarian langsung (`searchQuery`) menyaring judul dan nama pemateri.
  - Dua tombol aksi per kartu: `Tonton Video 📺` dan `Unduh Slide 💾`.

### 2.4 `KotakGagasanSection` & `GagasanModal`
- `formUrl`: URL Google Form resmi panitia Wego dari tab `SiteSettings`.
- `onOpenGagasan`: Handler untuk membuka modal interaktif tanpa berpindah halaman secara mendadak.

---

## 3. Integrasi Data Dinamis (Google Sheets + React Hook)

Aplikasi dapat langsung mengonsumsi data dari Google Spreadsheet publik panitia:

```jsx
// src/App.jsx
import { useWegoData } from './services/googleSheets';

function App() {
  const SPREADSHEET_ID = "YOUR_GOOGLE_SPREADSHEET_ID";
  const { seminars, speakers, settings, isLoading } = useWegoData(SPREADSHEET_ID);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const upcoming = seminars.find(s => s.status === 'UPCOMING') || seminars[0];

  return (
    <div>
      <Header />
      <MarqueeTicker text={settings.runningTicker} />
      <HeroSection settings={settings} />
      <UpcomingSpotlight seminar={upcoming} />
      <SpeakersHallOfFame speakers={speakers} />
      <SeminarArchive seminars={seminars} />
      <WegoWall />
      <KotakGagasanSection />
      <Footer settings={settings} />
    </div>
  );
}
```

---

## 4. Validasi Prototipe Interaktif

File prototipe mandiri `prototype.html` telah dirakit lengkap dengan ke-10 modul tersebut:
- **Lokasi**: [prototype.html](file:///D:/Pekerjaan%20BPS1200/Tim%20Inovasi/Website/LandingPage/Wego-RB/prototype.html).
- **Pengujian**: Buka langsung di browser apa pun untuk menguji responsivitas, filter arsip seminar, pencarian teks, dan dialog modal.
