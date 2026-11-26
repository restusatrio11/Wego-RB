import React from 'react';

export default function HeroCover() {
  return (
    <div className="relative w-full h-[65vh] md:h-[78vh] bg-neutral-900 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2200&q=85" 
        alt="Wego BPS Sumatera Utara"
        className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
      />

      {/* Brand Wordmark (Instrument Serif condensed, tall, white, centered) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
        <h1 className="font-display italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] text-white font-normal tracking-[-0.04em] select-none opacity-95 max-w-5xl">
          Wadah Edukasi dan Gagasan Optimal
        </h1>
      </div>

      {/* Subtle small editorial note on the bottom-left */}
      <div className="absolute bottom-6 left-6 md:left-14 max-w-xs text-white/70 text-[11px] leading-relaxed font-sans hidden sm:block">
        Ruang bertukar pikiran serta peningkatan kompetensi bagi insan BPS Sumatera Utara.
      </div>
    </div>
  );
}
