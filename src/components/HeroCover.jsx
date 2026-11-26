import React from 'react';

export default function HeroCover() {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] bg-neutral-900 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2200&q=85" 
        alt="Wego BPS Sumatera Utara"
        className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
      />

      {/* Brand Wordmark: The Awesome Serif, perfectly centered and GIGANTIC */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 text-center pointer-events-none">
        <h1 className="font-awesome text-[8.5vw] sm:text-[9vw] md:text-[8.5vw] lg:text-[8vw] xl:text-[7.8vw] leading-[0.88] text-white font-normal tracking-[-0.035em] select-none opacity-95 text-center max-w-7xl mx-auto drop-shadow-md">
          Wadah Edukasi<br />
          dan Gagasan Optimal
        </h1>
      </div>

      {/* Subtle small editorial note on the bottom-left */}
      <div className="absolute bottom-6 left-6 md:left-14 max-w-sm text-white/70 text-[11px] leading-relaxed font-sans hidden sm:block pointer-events-none">
        Ruang bertukar pikiran serta peningkatan kompetensi bagi insan BPS Sumatera Utara.
      </div>
    </div>
  );
}
