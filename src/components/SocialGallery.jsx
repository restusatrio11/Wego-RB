import React from 'react';

export default function SocialGallery({ galleryPhotos = [] }) {
  return (
    <section className="py-24 px-6 md:px-14 bg-white text-center">
      <h2 className="font-bodoni text-6xl md:text-8xl lg:text-9xl font-normal tracking-[-0.05em] text-neutral-900 mb-10 select-none lowercase">
        @bpsprovsumut
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3 w-full">
        {galleryPhotos.map((url, idx) => (
          <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100">
            <img 
              src={url} 
              alt="Dokumentasi BPS Sumut" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
