import React from 'react';

export default function SpeakerProfiles({ speakers = [] }) {
  return (
    <section id="profiles" className="px-6 md:px-14 py-12 border-t border-neutral-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Profil Pemateri</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Kenali <span className="small-pill font-bold">para narasumber</span> dan temukan inspirasi gagasan.
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <a href="#ads" className="text-xs text-neutral-600 hover:text-black font-medium hidden sm:inline-block">
            Semua Wegoers ↗
          </a>
          <div className="flex gap-1">
            <button className="btn-arrow" aria-label="Previous">‹</button>
            <button className="btn-arrow" aria-label="Next">›</button>
          </div>
        </div>
      </div>

      {/* 4 Large Portrait Cards (Properly sized!) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {speakers.map((spk) => (
          <div key={spk.id} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-3.5">
              <img 
                src={spk.image} 
                alt={spk.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300"
              />
            </div>
            <div className="mb-2">
              <span className="location-tag">{spk.satker}</span>
            </div>
            <h4 className="font-sans font-bold text-base text-neutral-900 leading-snug group-hover:underline">
              {spk.name}
            </h4>
            <p className="text-xs text-neutral-500 leading-tight mt-0.5">
              {spk.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
