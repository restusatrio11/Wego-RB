import React, { useRef } from 'react';

export default function CommunityBoard({ communityAds = [], onOpenModal }) {
  const scrollContainerRef = useRef(null);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild;
      const scrollStep = card ? card.clientWidth + 16 : 280;
      if (typeof scrollContainerRef.current.scrollBy === 'function') {
        scrollContainerRef.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollLeft -= scrollStep;
      }
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild;
      const scrollStep = card ? card.clientWidth + 16 : 280;
      if (typeof scrollContainerRef.current.scrollBy === 'function') {
        scrollContainerRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollLeft += scrollStep;
      }
    }
  };

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
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenModal} 
            className="btn-pill bg-white text-xs hover:bg-neutral-900 hover:text-white"
          >
            Pasang Usulan Anda ↗
          </button>
          <div className="flex gap-1">
            <button 
              className="btn-arrow bg-white" 
              aria-label="Previous gagasan"
              onClick={handlePrev}
            >
              ‹
            </button>
            <button 
              className="btn-arrow bg-white" 
              aria-label="Next gagasan"
              onClick={handleNext}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track of rounded-2xl clean cards */}
      <div 
        ref={scrollContainerRef}
        data-testid="community-carousel"
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-4 pt-1"
      >
        {communityAds.map((ad, idx) => (
          <div 
            key={idx} 
            className="w-[82vw] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] shrink-0 snap-start bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs flex flex-col justify-between hover:border-neutral-400 transition-colors min-h-[180px]"
          >
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
