# 0001. Editorial Typography Pairing and Hybrid Section Anatomy

## Context
Landing page Wego-RB memerlukan identitas visual editorial modern berstandar tinggi yang setara dengan referensi *ilovecreatives*, tanpa menggunakan font komersial berbayar (seperti Editorial New atau Neue Montreal). Desain harus merefleksikan karakter profesional BPS namun tetap segar, berani, dan non-brutalis.

## Decision
1. **Display Serif**: Menggunakan **Instrument Serif** dari Google Fonts (alternatif terbuka untuk *Editorial New* dan *Canela Condensed*). Diterapkan pada judul hero, frasa kunci editorial, dan label kategori dengan `letter-spacing: -0.04em` dan line-height rapat (`leading-[1.0] - leading-[1.05]`).
2. **Body & Interface Sans**: Menggunakan **Inter** dari Google Fonts untuk seluruh paragraf, teks tombol, label satker, dan navigasi guna menjamin ketajaman neo-grotesk yang bersih.
3. **Hybrid Section Title Anatomy**: Setiap section menerapkan struktur hierarki hybrid yang konsisten:
   - *Kicker/Category Label*: Serif Italic ukuran kecil (`font-display italic text-sm text-neutral-500 mb-1`).
   - *Mixed Headline*: Gabungan teks sans/serif dengan kata kunci yang dilingkupi border kapsul bulat (`small-pill`), dilengkapi simbol monokrom SVG (`✹`, `↗`, `•`), menghindari emoji grafis berwarna.
