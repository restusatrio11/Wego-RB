import React from 'react';

export default function DownloadableTemplates({ templates = [] }) {
  return (
    <section id="templates" className="px-6 md:px-14 py-16 border-t border-neutral-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Pojok Unduhan</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Koleksi <span className="small-pill font-bold">perangkat kerja</span> & template siap pakai •
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            • Modul presentasi, skrip otomatisasi data, dan formulir evaluasi mandiri.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#templates" className="text-xs text-neutral-600 hover:text-black font-medium hidden sm:inline-block">
            Semua Aset ↗
          </a>
          <div className="flex gap-1">
            <button className="btn-arrow" aria-label="Previous">‹</button>
            <button className="btn-arrow" aria-label="Next">›</button>
          </div>
        </div>
      </div>

      {/* 3 Wide Cards (1:1 with ilovecreatives Shop section) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4 border border-neutral-100">
              <img 
                src={tpl.image} 
                alt={tpl.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-sans font-bold text-base text-neutral-900 group-hover:underline">
                {tpl.title}
              </h4>
              <span className="text-xs font-semibold text-neutral-900 ml-2">
                {tpl.price}
              </span>
            </div>
            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3">
              {tpl.desc}
            </p>
            <div>
              <span className="location-tag">{tpl.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
