import React, { useState } from 'react';
import SeminarDetailModal from './SeminarDetailModal';

export default function SeminarCatalog({ seminars = [] }) {
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  return (
    <section id="seminar" className="px-6 md:px-14 py-16 border-t border-neutral-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Katalog Pembelajaran</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Jelajahi <span className="small-pill font-bold">sesi seminar</span> terbuka untuk insan statistik ↗
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            • Terbuka untuk seluruh pegawai BPS se-Sumatera Utara.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#/sesi" className="text-xs text-neutral-600 hover:text-black font-medium hidden sm:inline-block">
            Lihat Semua Sesi ↗
          </a>
          <div className="flex gap-1">
            <button className="btn-arrow" aria-label="Previous">‹</button>
            <button className="btn-arrow" aria-label="Next">›</button>
          </div>
        </div>
      </div>

      {/* Grid of Portrait Flyer Poster Cards (3:4 aspect ratio) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {seminars.map((item) => {
          const isUpcoming = item.status === 'upcoming';
          const flyerImage = item.thumb || item.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';

          return (
            <div 
              key={item.id} 
              role="button"
              tabIndex={0}
              aria-label={`Buka detail sesi ${item.title}`}
              onClick={() => setSelectedSeminar(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSeminar(item);
                }
              }}
              className="group cursor-pointer bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 hover:border-neutral-900/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <div>
                {/* 3:4 Aspect Ratio Portrait Flyer Frame */}
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4 relative border border-neutral-100">
                  <img 
                    src={flyerImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                      isUpcoming 
                        ? 'bg-neutral-900 text-white' 
                        : 'bg-white/95 text-neutral-700 border border-neutral-200'
                    }`}>
                      {isUpcoming ? 'Akan Datang' : 'Selesai'}
                    </span>
                  </div>
                </div>

                {/* Date & Schedule */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-medium text-neutral-400">
                    {item.date || 'Jadwal Segera Diumumkan'}
                  </span>
                  {item.time && (
                    <>
                      <span className="text-neutral-300">•</span>
                      <span className="text-[11px] text-neutral-400">{item.time}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-sans font-bold text-lg sm:text-xl text-neutral-900 tracking-tight leading-snug mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2">
                  {item.title}
                </h4>

                {/* Speaker */}
                {item.speaker && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-neutral-800">
                      {item.speaker}
                    </span>
                    {item.speakerRole && (
                      <span className="text-[11px] text-neutral-400 truncate">
                        • {item.speakerRole.split('•')[0].trim()}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action Trigger */}
              <div className="pt-3 border-t border-neutral-100 flex justify-between items-center text-xs">
                <span className="font-medium text-neutral-900 group-hover:underline">
                  Lihat Detail & Presensi ↗
                </span>
                <span className="text-[11px] text-neutral-400">
                  {item.venue || 'Online'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Modal */}
      <SeminarDetailModal 
        isOpen={Boolean(selectedSeminar)}
        seminar={selectedSeminar}
        onClose={() => setSelectedSeminar(null)}
      />
    </section>
  );
}
