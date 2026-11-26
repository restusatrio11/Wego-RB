# Design Tokens & Component Blueprint (ilovecreatives Theme)

Spesifikasi design tokens, tipografi, palet warna, dan blueprint komponen Tailwind CSS untuk landing page **Wego-RB** BPS Provinsi Sumatera Utara. Dibuat berdasarkan referensi visual `home (1).webp`.

---

## 1. Typography Tokens

Menggunakan kombinasi kontras tinggi antara serif editorial, sans-serif modern, dan monospace badge:

| Token | Font Family | Google Fonts Import | Penggunaan |
| :--- | :--- | :--- | :--- |
| `font-serif` | `"Playfair Display", Georgia, serif` | Weights: `400, 700, 900`, Italics | Headline utama, judul sesi seminar, nama pemateri |
| `font-sans` | `"Plus Jakarta Sans", sans-serif` | Weights: `400, 500, 600, 700` | Teks body, deskripsi seminar, tombol navigasi |
| `font-mono` | `"Space Mono", monospace` | Weights: `400, 700` | Badge kategori, running marquee, tanggal, status |

---

## 2. Color Palette Tokens

Mengadopsi latar belakang *warm off-white* khas majalah editorial dipadukan dengan aksen warna khas BPS (Biru, Oranye, Hijau) berbalut nuansa pastel:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: '#FBF8F3',       // Background utama halaman
          card: '#F4EFE6',     // Background section alternatif & card
          text: '#121212',     // Warna teks hitam kontras tinggi
          muted: '#66635D',    // Teks keterangan sekunder
          border: '#222222',   // Garis border tegas 1px / 2px
          accent: '#EAE3D6',
        },
        bps: {
          blue: '#0284C7',     // Biru khas BPS
          navy: '#0C4A6E',
          orange: '#EA580C',   // Oranye inovasi
          green: '#16A34A',    // Hijau statistik
          yellow: '#FACC15',   // Kuning highlight / asterisk
          pastelBlue: '#DDF4FF',   // Tag kategori Teknologi/Data
          pastelOrange: '#FFE9D5', // Tag kategori Reformasi Birokrasi
          pastelGreen: '#E3FBE3',  // Tag kategori Statistik Sektoral
          pastelPurple: '#F3E8FF', // Tag kategori Visualisasi & Softskill
        }
      }
    }
  }
}
```

---

## 3. Komponen Utama

### A. Editorial Badge (Pill Tag)
Badge oval berkontur garis hitam 1px dengan font monospace huruf kapital:
```html
<span class="inline-flex items-center gap-1 border border-black rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider bg-white">
  TEKNOLOGI & DATA SCIENCE ✦
</span>
```

### B. Pill CTA Button
Tombol melengkung penuh (pill) dengan efek hover kontras terbalik:
```html
<!-- Light Variant -->
<button class="inline-flex items-center justify-center border border-black rounded-full px-5 py-2 text-xs font-semibold bg-white text-black hover:bg-black hover:text-white transition-all">
  Tonton Sesi 📺
</button>

<!-- Dark Variant -->
<button class="inline-flex items-center justify-center border border-black rounded-full px-5 py-2 text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-all">
  Unduh Slide 💾
</button>
```

### C. Retro Hard Shadow (Ilustrasi Kartu)
Efek bayangan padat khas desain editorial:
```css
box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
```

### D. Continuous Marquee Ticker
Animasi berjalan tanpa jeda untuk pengumuman jadwal terdekat dan quote RB:
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 25s linear infinite;
}
```

---

## 4. Prototipe Interaktif
File prototipe interaktif telah dibuat dan dapat langsung dibuka di browser:
- **File**: `prototype.html` di root repositori.
- **Varian**:
  - `?variant=A` : **Pure Editorial Magazine** (Format 1:1 mengikuti estetika `ilovecreatives` dengan kartu narasumber, arsip edutainment, dan kotak gagasan).
  - `?variant=B` : **Live & Upcoming Spotlight** (Menonjolkan sesi berikutnya yang akan tayang beserta hitung mundur dan link Zoom).
  - `?variant=C` : **Split-Curator Index** (Layout split-screen dengan index di sebelah kiri dan feed seminar di sebelah kanan).
