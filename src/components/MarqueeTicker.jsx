import React from 'react';

export default function MarqueeTicker({ onOpenModal }) {
  // Row 1 Content Block (Serif Display + Mini Flyer Preview + Oval Badge)
  const row1Items = (
    <div className="flex items-center shrink-0">
      <span className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-5">
        Wego Berbagi bersama Insan BPS Sumatera Utara
      </span>
      {/* <span className="inline-flex items-center gap-2.5 border border-neutral-300 rounded-lg p-1.5 bg-white mx-4 shadow-2xs">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
          alt="Thumbnail Flyer Sesi 01" 
          className="w-8 h-8 rounded object-cover shrink-0" 
          referrerPolicy="no-referrer"
          onError={(e) => handleDriveImageError(e)}
        />
        <span className="text-xs font-sans font-medium text-neutral-800 pr-1 flex flex-col text-left leading-tight">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            Sesi 01:{' '}
          </span>
          <span className="text-xs font-semibold text-neutral-900">
            Scraping & ML Harga Pangan →
          </span>
        </span>
      </span> */}
      <span className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-4 py-1 text-xs md:text-sm font-sans font-bold text-neutral-900 mx-4">
        ✹ Ikuti Sesi
      </span>
      <span className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-5">
        Wadah Edukasi dan Gagasan Optimal
      </span>
      {/* <span className="inline-flex items-center gap-2.5 border border-neutral-300 rounded-lg p-1.5 bg-white mx-4 shadow-2xs">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
          alt="Thumbnail Flyer Sesi 02" 
          className="w-8 h-8 rounded object-cover shrink-0" 
        />
        <span className="text-xs font-sans font-medium text-neutral-800 pr-1 flex flex-col text-left leading-tight">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            Sesi 02:{' '}
          </span>
          <span className="text-xs font-semibold text-neutral-900">
            Tata Kelola Transformasi Digital →
          </span>
        </span>
      </span> */}
      <span className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-4 py-1 text-xs md:text-sm font-sans font-bold text-neutral-900 mx-4">
        ✹ Diskusi Seminar
      </span>
    </div>
  );

  // Row 2 Content Block (Circular Badge + Sans-Serif Statement + Em Dash + Didone Serif)
  const row2Items = (
    <div className="flex items-center shrink-0">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-900 text-xs font-mono font-bold text-neutral-900 mx-4 shrink-0">
        wb
      </span>
      <span className="font-sans font-medium text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-2">
        katalog inovasi satker BPS se-Sumatera Utara
      </span>
      <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-400 mx-2">–</span>
      <span className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-2">
        bagikan praktik baik di unit kerja anda.
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-900 text-xs font-mono font-bold text-neutral-900 mx-4 shrink-0">
        rb
      </span>
      <span className="font-sans font-medium text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-2">
        akselerasi reformasi birokrasi & zona integritas
      </span>
      <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-400 mx-2">–</span>
      <span className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight mx-2">
        ruang kolaborasi bersama insan BPS.
      </span>
    </div>
  );

  // Row 3 Content Block (Sans Headline + Interactive Pill CTA)
  const row3Items = (
    <div className="flex items-center shrink-0">
      <span className="font-sans font-medium text-lg md:text-xl lg:text-2xl text-neutral-900 mx-4 tracking-tight">
        Setiap hari kerja sebelum kurasi sesi.
      </span>
      <button 
        onClick={onOpenModal} 
        className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-5 py-1 text-xs md:text-sm font-sans font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all align-middle mx-3 active:scale-95 shadow-2xs"
      >
        Ajukan Usulan ↗
      </button>
      <span className="font-sans font-medium text-lg md:text-xl lg:text-2xl text-neutral-900 mx-4 tracking-tight">
        Kirimkan gagasan inovasi satker Anda.
      </span>
      <button 
        onClick={onOpenModal} 
        className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-5 py-1 text-xs md:text-sm font-sans font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all align-middle mx-3 active:scale-95 shadow-2xs"
      >
        Ajukan Usulan ↗
      </button>
      <span className="font-sans font-medium text-lg md:text-xl lg:text-2xl text-neutral-900 mx-4 tracking-tight">
        Bersama Wego-RB BPS Sumatera Utara.
      </span>
      <button 
        onClick={onOpenModal} 
        className="inline-flex items-center gap-1.5 border border-neutral-900 rounded-full px-5 py-1 text-xs md:text-sm font-sans font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all align-middle mx-3 active:scale-95 shadow-2xs"
      >
        Ajukan Usulan ↗
      </button>
    </div>
  );

  return (
    <section 
      aria-label="Pita Pengumuman Berjalan Wego-RB" 
      className="border-t border-b border-neutral-200 bg-white select-none py-1 overflow-hidden"
    >
      {/* Row 1: Sesi Wego & Mini Thumbnails (Moving Left) */}
      <div className="border-b border-neutral-200 py-3.5 md:py-4.5 overflow-hidden marquee-container flex items-center">
        <div className="animate-marquee">
          {row1Items}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {row1Items}
          </div>
        </div>
      </div>

      {/* Row 2: Alternating Sans & Didone Statement (Moving Right / Reverse) */}
      <div className="border-b border-neutral-200 py-3.5 md:py-4.5 overflow-hidden marquee-container flex items-center">
        <div className="animate-marquee-reverse">
          {row2Items}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {row2Items}
          </div>
        </div>
      </div>

      {/* Row 3: Sans Statement & Repetitive Pill CTA (Moving Left) */}
      <div className="py-3.5 md:py-4.5 overflow-hidden marquee-container flex items-center">
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
