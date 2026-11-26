# Spec: Motion & Editorial Scroll Experience (Lenis + GSAP ScrollTrigger)

## Problem Statement

Halaman muka Wego-RB memiliki tipografi editorial berstandar tinggi yang menyerupai majalah digital modern. Namun, pengalaman interaksi gulir (*scroll experience*) saat ini masih menggunakan pengguliran native yang kaku dan belum memanfaatkan dinamika visual berbasis posisi gulir (*scroll-driven motion*). Pengunjung yang menelusuri halaman membutuhkan sensasi inersia yang mulus (*inertia smooth scroll*), transisi kedalaman visual yang halus (*depth parallax*), dan penekanan pesan deklarasi program (*pinned scrubbed illumination*) yang memikat, tanpa membebani performa laptop kerja pegawai BPS atau mengorbankan aksesibilitas.

## Solution

Mengintegrasikan arsitektur motion modern menggunakan **Lenis Smooth Scroll** dan **GSAP ScrollTrigger**:
1. Menghadirkan inersia gulir lembut (*inertia smooth scroll*) pada viewport desktop melalui Lenis dengan clock tersinkronisasi pada `gsap.ticker`.
2. Menerapkan efek *subtle depth parallax* pada gambar latar belakang Hero Cover (`wegoberbagi`).
3. Menerapkan efek *pinned scrub reveal* pada seksi Headline Statement, di mana pernyataan program tertahan sejenak saat digulir dan setiap baris teks teriluminasi secara berurutan (*opacity 0.25 → 1.0*).
4. Menyediakan penanganan aksesibilitas penuh untuk preferensi pengguna (*prefers-reduced-motion: reduce*) dan menjaga responsivitas sentuhan native pada perangkat seluler/tablet (*smoothTouch: false*).
5. Memastikan sinkronisasi titik picu (*ScrollTrigger.refresh()*) otomatis saat data dinamis dari Google Sheets CMS selesai dimuat.

## User Stories

1. As a desktop visitor, I want smooth, gentle scroll momentum when using my mouse wheel or trackpad, so that browsing the landing page feels fluid and high-end.
2. As a visitor browsing the hero section, I want the background image to move at a subtle secondary speed relative to the text, so that the page conveys a refined sense of visual depth.
3. As a BPS employee reading the program headline statement, I want the text to remain comfortably pinned while each line progressively illuminates as I scroll, so that the mission of Wego-RB is emphasized clearly and dramatically.
4. As a mobile phone user, I want touch scrolling to remain completely native and lag-free, so that gestures feel responsive to my device's high refresh rate screen.
5. As a visitor with vestibular motion sensitivity or system battery saver mode active, I want all animations and smooth scrolling to gracefully deactivate, so that I can read all content statically without discomfort.
6. As a site visitor viewing sessions populated dynamically from Google Sheets, I want the page layout and scroll trigger positions to automatically recalibrate, so that animations never drift or trigger at incorrect scroll positions.
7. As a keyboard navigator, I want page scrolling via arrow keys, Page Down, and spacebar to function reliably without interference from the smooth scroll layer.
8. As a developer maintaining the application, I want all animation timelines to be properly scoped and garbage collected on unmount, so that hot module replacement and React Strict Mode do not cause memory leaks or double tickers.

## Implementation Decisions

### 1. Library Dependencies & Unified Clock Architecture
- Menambahkan dependensi resmi `lenis` (v1.1+) dan `gsap` (v3.12+) beserta `@gsap/react`.
- Mengimpor `lenis/dist/lenis.css` pada entry point aplikasi untuk menjamin kestabilan layout dokumen dan pointer events.
- Mengatur Lenis dengan `autoRaf: false` dan menggerakkannya secara eksklusif melalui `gsap.ticker`:
```javascript
// Pattern dari hasil riset arsitektur
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
- Menghubungkan event scroll Lenis ke ScrollTrigger:
```javascript
lenis.on('scroll', ScrollTrigger.update);
```
- Menghindari penggunaan `ScrollTrigger.scrollerProxy` pada window scroll karena Lenis menggunakan scroll native browser (`window.scrollY`).

### 2. Provider Scroll Global (SmoothScrollProvider.jsx)
- Membuat komponen wrapper yang menginisialisasi Lenis dan GSAP ticker sekali di tingkat atas aplikasi (`App.jsx`).
- Melakukan pendeteksian `window.matchMedia('(prefers-reduced-motion: reduce)')`. Jika aktif, Lenis tidak diaktifkan dan ScrollTrigger disetel tanpa scrubbing.
- Pada perangkat sentuh mobile (`'ontouchstart' in window`), Lenis disetel dengan opsi sentuhan non-intrusif (`smoothTouch: false`).
- Melakukan cleanup menyeluruh saat unmount (`lenis.destroy()`, pencabutan ticker callback).

### 3. Pinned Statement Scrub Reveal (HeadlineStatement.jsx)
- Menggunakan hook `useGSAP` dengan cakupan `scope` pada kontainer seksi pernyataan.
- Timeline ScrollTrigger:
  - `trigger`: elemen kontainer pernyataan.
  - `start`: `'top 15%'`.
  - `end`: `'+=100%'`.
  - `pin`: `true` (jika bukan reduced-motion).
  - `scrub`: `0.6`.
  - `anticipatePin`: `1`.
- Setiap baris teks (`.statement-line`) dimulai dari `opacity: 0.25` dan bertransisi menuju `opacity: 1.0` secara berurutan.

### 4. Hero Cover Parallax (HeroCover.jsx)
- Pembungkus gambar latar belakang diberikan kelonggaran vertikal (*vertical bleed* -10% hingga +10%).
- Animasi GSAP ScrollTrigger menggeser gambar dengan `yPercent: 18` secara linear dengan `scrub: true`.

### 5. Sinkronisasi Data Dinamis Google Sheets
- Pada saat hook `useWegoData` menyelesaikan pembaruan data `seminars` atau `speakers`, dipanggil `ScrollTrigger.refresh()` untuk memperbarui kalkulasi posisi pin setelah tinggi DOM bertambah.

## Testing Decisions

- Pengujian memverifikasi antarmuka publik dan stabilitas komponen tanpa menguji internal timing library pihak ketiga.
- Seam 1 (SmoothScrollProvider & Accessibility Seam): Menguji bahwa provider merender children secara transparan, menangani preferensi `prefers-reduced-motion` tanpa crash, dan melakukan cleanup ticker pada saat unmount.
- Seam 2 (HeadlineStatement & HeroCover Integration Seam): Menguji bahwa teks pernyataan dan elemen visual hero tetap berada dalam DOM, dapat dibaca oleh screen reader, dan tidak memicu error saat dijalankan di lingkungan virtual JSDOM.
- Seam 3 (Full-Page Integration & Production Build): Memastikan seluruh test suite (33 existing tests + motion tests) lulus 100% dan bundle build produksi tetap ringan serta bebas warning.

## Out of Scope

- Model 3D WebGL / Three.js.
- Efek 3D card zoom atau rotasi 3D berlebihan yang memicu motion sickness.
- Modifikasi terhadap data pipeline Google Sheets yang sudah ada.

## Further Notes

- Konfigurasi Lenis menggunakan kurva easing eksponensial `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` dengan durasi 1.2 detik untuk menghasilkan kenyamanan gulir maksimal.
- Semua animasi menghormati aturan zero AI-slop dan non-brutalisme sesuai ADR 0001 dan ADR 0002.
