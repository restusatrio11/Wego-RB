import React from 'react';

export default function HeroCover() {
  return (
    <div className="relative w-full h-[68vh] md:h-[82vh] bg-neutral-900 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2200&q=85" 
        alt="Wego BPS Sumatera Utara"
        className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
      />

      {/* Brand Wordmark: The Awesome Serif style stretching from left to right */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14 pb-16 md:pb-24 pointer-events-none">
        <h1 className="font-awesome text-[7.5vw] sm:text-[6.5vw] md:text-[5.4vw] lg:text-[4.8vw] xl:text-[4.6vw] leading-[0.9] text-white font-normal tracking-[-0.035em] select-none opacity-95 text-left w-full">
          Wadah Edukasi dan Gagasan Optimal
        </h1>
      </div>

      {/* Subtle small editorial note on the bottom-left */}
      <div className="absolute bottom-6 left-6 md:left-14 max-w-sm text-white/70 text-[11px] leading-relaxed font-sans hidden sm:block pointer-events-none">
        Ruang bertukar pikiran serta peningkatan kompetensi bagi insan BPS Sumatera Utara.
      </div>
    </div>
  );
}
