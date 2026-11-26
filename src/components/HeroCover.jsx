import React from 'react';

export default function HeroCover() {
  return (
    <div className="relative w-full h-[72vh] md:h-[86vh] bg-neutral-900 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2200&q=85" 
        alt="Wego BPS Sumatera Utara"
        className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
      />

      {/* Brand Wordmark: Bodoni Moda Didone, all-lowercase, gigantic display centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 text-center pointer-events-none">
        <h1 className="font-bodoni text-[16vw] md:text-[14.5vw] lg:text-[13.5vw] leading-[0.8] text-white font-normal tracking-[-0.05em] select-none opacity-95 text-center w-full drop-shadow-md lowercase">
          wegoberbagi
        </h1>
        <p className="mt-4 md:mt-6 text-white/90 text-[11px] sm:text-xs md:text-sm font-sans font-medium tracking-wide uppercase px-4 py-1.5 rounded-full border border-white/25 bg-black/20 backdrop-blur-xs">
          Wadah Edukasi dan Gagasan Optimal • BPS Sumatera Utara
        </p>
      </div>

      {/* Subtle small editorial note on the bottom-left */}
      <div className="absolute bottom-6 left-6 md:left-14 max-w-sm text-white/70 text-[11px] leading-relaxed font-sans hidden sm:block pointer-events-none">
        Ruang bertukar pikiran serta peningkatan kompetensi bagi insan BPS Sumatera Utara.
      </div>
    </div>
  );
}
