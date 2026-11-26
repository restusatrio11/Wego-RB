import React from 'react';

export default function MidBanner({ onOpenModal }) {
  return (
    <div className="mx-6 md:mx-14 my-12 rounded-3xl overflow-hidden bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 p-8 md:p-16 relative">
      <div className="max-w-2xl relative z-10">
        <h3 className="font-display text-4xl sm:text-6xl text-white font-normal leading-[1.05] tracking-tight mb-4">
          Inovasi Bersama,<br />Birokrasi Berdampak.
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
          Program Wego BPS Provinsi Sumatera Utara membuka ruang seluas-luasnya bagi seluruh pegawai untuk mengajukan gagasan, membagikan praktik baik, dan mempercepat transformasi digital birokrasi.
        </p>
        <button 
          onClick={() => onOpenModal && onOpenModal('Pojok Gagasan Inovasi RB')}
          className="btn-pill bg-white text-neutral-900 font-semibold px-6 py-3 border-transparent shadow-sm hover:bg-neutral-100 active:scale-95 transition-transform"
        >
          Kirimkan Gagasan Inovasi Anda →
        </button>
      </div>

      <div className="absolute right-[-40px] bottom-[-40px] w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
    </div>
  );
}
