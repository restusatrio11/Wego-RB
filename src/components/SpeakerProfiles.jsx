import React, { useState, useEffect, useRef } from 'react';

export default function SpeakerProfiles({ speakers = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const containerRef = useRef(null);
  const firstCardRef = useRef(null);
  const touchStartXRef = useRef(null);

  const hasSpeakers = Array.isArray(speakers) && speakers.length > 0;
  // Duplicate 3 times for a seamless circular loop
  const extendedSpeakers = hasSpeakers ? [...speakers, ...speakers, ...speakers] : [];

  const updateCardWidth = () => {
    if (firstCardRef.current) {
      setCardWidth(firstCardRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, [hasSpeakers]);

  const handleNext = () => {
    if (!hasSpeakers || speakers.length <= 1) return;
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!hasSpeakers || speakers.length <= 1) return;
    if (currentIndex === 0) {
      setWithTransition(false);
      setCurrentIndex(speakers.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          setCurrentIndex(speakers.length - 1);
        });
      });
    } else {
      setWithTransition(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= speakers.length) {
      setWithTransition(false);
      setCurrentIndex(0);
    }
  };

  // Auto-slide every 3.5s unless hovered, reduced-motion active, or only 1 speaker
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isHovered || prefersReducedMotion || !hasSpeakers || speakers.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, hasSpeakers, speakers.length, currentIndex]);

  const handleTouchStart = (e) => {
    setIsHovered(true);
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    setIsHovered(false);
    if (touchStartXRef.current === null) return;
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartXRef.current;
      if (diff > 50) {
        handlePrev();
      } else if (diff < -50) {
        handleNext();
      }
    }
    touchStartXRef.current = null;
  };

  const stepSize = cardWidth > 0 ? cardWidth + 24 : 280;
  const currentSpeakerNumber = hasSpeakers ? (currentIndex % speakers.length) + 1 : 0;

  return (
    <section id="profiles" className="px-6 md:px-14 py-12 border-t border-neutral-100 overflow-hidden">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-display italic text-sm text-neutral-500 block mb-1">Profil Narasumber</span>
          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
            Kenali <span className="small-pill font-bold">para narasumber</span> dan temukan inspirasi gagasan ✹
          </h3>
        </div>
        <div className="flex items-center gap-4">
          {hasSpeakers && (
            <span className="text-xs font-mono text-neutral-400 tracking-wider">
              {String(currentSpeakerNumber).padStart(2, '0')} / {String(speakers.length).padStart(2, '0')}
            </span>
          )}
          <a href="#ads" className="text-xs text-neutral-600 hover:text-black font-medium hidden sm:inline-block">
            Semua Wegoers ↗
          </a>
          <div className="flex gap-1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <button 
              className="btn-arrow" 
              aria-label="Previous speaker"
              onClick={handlePrev}
            >
              ‹
            </button>
            <button 
              className="btn-arrow" 
              aria-label="Next speaker"
              onClick={handleNext}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Auto-sliding Carousel Track */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-testid="speaker-carousel"
      >
        <div 
          className={`flex gap-6 ${withTransition ? 'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'transition-none'}`}
          style={{ transform: `translateX(-${currentIndex * stepSize}px)` }}
          onTransitionEnd={handleTransitionEnd}
          data-testid="speaker-track"
        >
          {extendedSpeakers.map((spk, idx) => (
            <div 
              key={`${spk.id}-${idx}`} 
              ref={idx === 0 ? firstCardRef : null}
              className="w-[78vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-3.5">
                <img 
                  src={spk.image} 
                  alt={spk.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300 pointer-events-none"
                  loading="lazy"
                />
              </div>
              <div className="mb-2">
                <span className="location-tag">{spk.satker}</span>
              </div>
              <h4 className="font-sans font-bold text-base text-neutral-900 leading-snug group-hover:underline">
                {spk.name || spk.speaker || spk.nama}
              </h4>
              <p className="text-xs text-neutral-500 leading-tight mt-0.5">
                {spk.role || spk.speakerRole || spk.peran}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
