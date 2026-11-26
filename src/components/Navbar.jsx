import React from 'react';

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-14 py-5 flex justify-between items-center text-white text-xs font-medium">
      <div className="flex items-center gap-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <img 
            src="./WEGOSID!%20(2).webp" 
            alt="Logo WEGOSID!" 
            className="h-7 md:h-8 w-auto object-contain brightness-110 drop-shadow-xs group-hover:opacity-90 transition-opacity" 
          />
          {/* <span className="font-display italic text-lg tracking-tight font-bold hidden sm:inline">
            wego.rb
          </span> */}
        </a>
        <nav className="hidden md:flex items-center gap-6 text-white/80 text-[13px]">
          <a href="#seminar" className="hover:text-white transition-colors">Sesi Seminar</a>
          <a href="#/sesi" className="hover:text-white transition-colors">Arsip Sesi</a>
          <a href="#profiles" className="hover:text-white transition-colors">Wegoers</a>
          <a href="#ads" className="hover:text-white transition-colors">Papan Gagasan</a>
        </nav>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <img 
          src="./Logo%20BPS%20Sumut%20Putih.webp" 
          alt="Badan Pusat Statistik Provinsi Sumatera Utara" 
          className="h-7 md:h-8 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity drop-shadow-xs" 
        />
        <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
        <img 
          src="./Logo%20STMJ%20Putih.webp" 
          alt="Logo STMJ BPS Sumut" 
          className="h-6 md:h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity hidden sm:block drop-shadow-xs" 
        />
      </div>
    </div>
  );
}
