import React from 'react';

export default function RegionalInnovations({ regionalGems = [] }) {
  return (
    <section id="gems" className="px-6 md:px-14 py-16 border-t border-neutral-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Inspirasi & Rujukan</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Karya & Inovasi Terpilih Daerah
          </h3>
        </div>
        <div>
          <a href="#gems" className="text-xs text-neutral-600 hover:text-black font-medium">
            Katalog Inovasi ↗
          </a>
        </div>
      </div>

      {/* 2 Wide Generous Cards (1:1 with ilovecreatives Internet Gems) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {regionalGems.map((gem, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 mb-4 border border-neutral-200/50">
              <img 
                src={gem.image} 
                alt={gem.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="font-sans font-bold text-lg text-neutral-900 mb-2 group-hover:underline">
              {gem.title}
            </h4>
            <div className="flex gap-2">
              {gem.tags.map((t, i) => (
                <span key={i} className="location-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Ticker / Marquee Banner */}
      <div className="mt-16 py-6 border-y border-neutral-200 overflow-hidden whitespace-nowrap text-xs font-medium uppercase tracking-wider text-neutral-500">
        <div className="inline-flex gap-8 items-center">
          <span>Wego BPS Provinsi Sumatera Utara</span>
          <span>•</span>
          <span>Wadah Edukasi dan Gagasan Optimal</span>
          <span>•</span>
          <span>Kolaborasi 33 Kabupaten & Kota</span>
          <span>•</span>
          <span>Wego BPS Provinsi Sumatera Utara</span>
          <span>•</span>
          <span>Wadah Edukasi dan Gagasan Optimal</span>
        </div>
      </div>
    </section>
  );
}
