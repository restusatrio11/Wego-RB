import React from 'react';

export default function MarqueeTicker({ onOpenModal }) {
  // Row 1 Content Block
  const row1Items = (
    <div className="flex items-center shrink-0">
      <span className="font-sans font-semibold text-xl md:text-2xl text-neutral-900 mx-5">
        Wego Berbagi bersama Insan BPS Sumatera Utara
      </span>
      <span className="inline-flex items-center gap-2 border border-neutral-200 rounded-lg p-1.5 bg-neutral-50/80 mx-4 shadow-2xs">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
          alt="Thumbnail" 
          className="w-7 h-7 rounded object-cover" 
        />
        <span className="text-xs font-sans font-medium text-neutral-800 pr-1">
          Sesi 01: Scraping & ML Harga Pangan →
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-4 py-0.5 text-xs md:text-sm font-bold text-neutral-900 mx-4">
        ✹ Ikuti Sesi
      </span>
      <span className="font-sans font-semibold text-xl md:text-2xl text-neutral-900 mx-5">
        Wadah Edukasi dan Gagasan Optimal
      </span>
      <span className="inline-flex items-center gap-2 border border-neutral-200 rounded-lg p-1.5 bg-neutral-50/80 mx-4 shadow-2xs">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
          alt="Thumbnail" 
          className="w-7 h-7 rounded object-cover" 
        />
        <span className="text-xs font-sans font-medium text-neutral-800 pr-1">
          Sesi 02: Tata Kelola Transformasi Digital →
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-4 py-0.5 text-xs md:text-sm font-bold text-neutral-900 mx-4">
        ✹ Diskusi RB
      </span>
    </div>
  );

  // Row 2 Content Block (Didone Editorial Statement)
  const row2Items = (
    <div className="flex items-center shrink-0">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-900 text-xs font-mono font-bold text-neutral-900 mx-4">
        wb
      </span>
      <span className="font-display italic text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-4">
        katalog inovasi satker BPS se-Sumatera Utara
      </span>
      <span className="font-sans text-xl md:text-2xl text-neutral-400 mx-4">—</span>
      <span className="font-sans font-bold text-xl md:text-2xl lg:text-3xl text-neutral-900 tracking-tight mx-4">
        bagikan praktik baik di unit kerja anda.
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-900 text-xs font-mono font-bold text-neutral-900 mx-4">
        rb
      </span>
      <span className="font-display italic text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-4">
        akselerasi reformasi birokrasi & zona integritas
      </span>
      <span className="font-sans text-xl md:text-2xl text-neutral-400 mx-4">—</span>
      <span className="font-sans font-bold text-xl md:text-2xl lg:text-3xl text-neutral-900 tracking-tight mx-4">
        ruang kolaborasi bersama insan BPS.
      </span>
    </div>
  );

  // Row 3 Content Block (Repetitive Pill CTA)
  const row3Items = (
    <div className="flex items-center shrink-0">
      <span className="font-sans font-medium text-lg md:text-xl text-neutral-900 mx-4">
        Setiap hari kerja sebelum kurasi sesi.
      </span>
      <button 
        onClick={onOpenModal} 
        className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-5 py-1 text-xs md:text-sm font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors align-middle mx-3 active:scale-95"
      >
        Ajukan Usulan ↗
      </button>
      <span className="font-sans font-medium text-lg md:text-xl text-neutral-900 mx-4">
        Kirimkan gagasan inovasi satker Anda.
      </span>
      <button 
        onClick={onOpenModal} 
        className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-5 py-1 text-xs md:text-sm font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors align-middle mx-3 active:scale-95"
      >
        Ajukan Usulan ↗
      </button>
      <span className="font-sans font-medium text-lg md:text-xl text-neutral-900 mx-4">
        Bersama Wego-RB BPS Sumatera Utara.
      </span>
      <button 
        onClick={onOpenModal} 
        className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-5 py-1 text-xs md:text-sm font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors align-middle mx-3 active:scale-95"
      >
        Ajukan Usulan ↗
      </button>
    </div>
  );

  return (
    <section 
      aria-label="Pita Pengumuman Berjalan Wego-RB" 
      className="border-t border-b border-neutral-200 bg-white select-none py-1 md:py-2 overflow-hidden"
    >
      {/* Row 1: Sesi Wego & Mini Thumbnails (Moving Left) */}
      <div className="border-b border-neutral-200/80 py-3 md:py-4 overflow-hidden marquee-container">
        <div className="animate-marquee">
          {row1Items}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {row1Items}
          </div>
        </div>
      </div>

      {/* Row 2: Didone Editorial Statement (Moving Right / Reverse) */}
      <div className="border-b border-neutral-200/80 py-3 md:py-4 overflow-hidden marquee-container">
        <div className="animate-marquee-reverse">
          {row2Items}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {row2Items}
          </div>
        </div>
      </div>

      {/* Row 3: Repetitive Pill CTA (Moving Left) */}
      <div className="py-3 md:py-4 overflow-hidden marquee-container">
        <div className="animate-marquee">
          {row3Items}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {row3Items}
          </div>
        </div>
      </div>
    </section>
  );
}
