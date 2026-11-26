import React from 'react';

export default function CommunityBoard({ communityAds = [], onOpenModal }) {
  return (
    <section id="ads" className="px-6 md:px-14 py-16 border-t border-neutral-100 bg-neutral-50/40">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Papan Gagasan Bersama</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Kotak <span className="small-pill font-bold">aspirasi</span> dan kolaborasi inovasi satker ✹
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            • Dipublikasikan rutin setiap edisi seminar Wego.
          </p>
        </div>
        <div>
          <button 
            onClick={onOpenModal} 
            className="btn-pill bg-white text-xs hover:bg-neutral-900 hover:text-white"
          >
            Pasang Usulan Anda ↗
          </button>
        </div>
      </div>

      {/* Grid of rounded-2xl clean cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityAds.map((ad, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between hover:border-neutral-400 transition-colors min-h-[180px]">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">{ad.type}</span>
                <span className="text-[10px] font-medium text-neutral-500">{ad.location}</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                {ad.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
