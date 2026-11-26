import React from 'react';

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-14 py-5 flex justify-between items-center text-white text-xs font-medium">
      <div className="flex items-center gap-8">
        <span className="font-display italic text-lg tracking-tight font-bold">wego.rb</span>
        <nav className="hidden md:flex items-center gap-6 text-white/80 text-[13px]">
          <a href="#seminar" className="hover:text-white transition-colors">Sesi Seminar</a>
          <a href="#profiles" className="hover:text-white transition-colors">Wegoers</a>
          <a href="#templates" className="hover:text-white transition-colors">Unduhan</a>
          <a href="#ads" className="hover:text-white transition-colors">Papan Gagasan</a>
          <a href="#gems" className="hover:text-white transition-colors">Inovasi Daerah</a>
        </nav>
      </div>
      <div>
        <span className="border border-white/30 rounded-full px-3 py-1 text-[11px] text-white/90">
          BPS PROVINSI SUMATERA UTARA
        </span>
      </div>
    </div>
  );
}
