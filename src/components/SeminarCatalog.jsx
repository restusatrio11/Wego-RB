import React from 'react';

export default function SeminarCatalog({ seminars = [] }) {
  return (
    <section id="seminar" className="px-6 md:px-14 py-16 border-t border-neutral-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Katalog Pembelajaran</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Sesi Seminar Wego untuk Insan Statistik
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            • Terbuka untuk seluruh pegawai BPS se-Sumatera Utara.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#ads" className="text-xs text-neutral-600 hover:text-black font-medium hidden sm:inline-block">
            Lihat Semua Sesi ↗
          </a>
          <div className="flex gap-1">
            <button className="btn-arrow" aria-label="Previous">‹</button>
            <button className="btn-arrow" aria-label="Next">›</button>
          </div>
        </div>
      </div>

      {/* Exactly 2 large wide cards per row (1:1 with ilovecreatives) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {seminars.map((item) => (
          <div key={item.id} className="group bg-neutral-50/50 rounded-3xl p-6 border border-neutral-200/60 hover:border-neutral-300 transition-all">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-200 mb-6">
              <img 
                src={item.thumb} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            
            <h4 className="font-sans font-bold text-xl md:text-2xl text-neutral-900 tracking-tight mb-2.5">
              {item.title}
            </h4>
            
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed mb-6">
              {item.desc}
            </p>
            
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-200/50">
              <a 
                href={item.videoUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-pill bg-white hover:bg-neutral-900 hover:text-white"
              >
                Tonton Rekaman
              </a>
              <a 
                href={item.deckUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-pill text-neutral-600 border-transparent hover:border-neutral-300"
              >
                Unduh Slide Materi
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
