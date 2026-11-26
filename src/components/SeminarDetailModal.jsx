import React, { useEffect } from 'react';
import { handleDriveImageError } from '../services/dataService';

export default function SeminarDetailModal({ isOpen, seminar, onClose, onOpenFeedback }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !seminar) return null;

  const isUpcoming = seminar.status === 'upcoming';
  const flyerImage = seminar.thumb || seminar.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';
  const slideLink = seminar.slideUrl || seminar.deckUrl || '#';
  const videoLink = seminar.videoUrl || '#';
  const zoomLink = seminar.zoomUrl || '#';
  const presensiLink = seminar.presensiUrl || '#';
  const vbgLink = seminar.vbgUrl || '#';

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Rincian Operasional Sesi"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden relative shadow-2xl border border-neutral-200">
        {/* Close Button: floating high-contrast badge safe on all viewport sizes */}
        <button 
          onClick={onClose}
          aria-label="Tutup Detail"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-all shadow-md active:scale-95"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[92vh] md:max-h-[86vh] overflow-y-auto">
          {/* Left Column: Portrait Flyer Poster (Responsive scaling so details are never pushed off-screen on mobile) */}
          <div className="md:col-span-5 bg-neutral-900/5 relative min-h-[190px] sm:min-h-[240px] md:min-h-full flex items-center justify-center p-3 sm:p-4 md:p-5 overflow-hidden border-b md:border-b-0 md:border-r border-neutral-100">
            {/* Ambient subtle blur of the poster for seamless framing */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${flyerImage})` }}
            />
            
            {/* Full Poster with responsive max-height */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              <img 
                src={flyerImage} 
                alt={seminar.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleDriveImageError(e)}
                className="w-full h-auto max-h-[35vh] sm:max-h-[44vh] md:max-h-[70vh] object-contain rounded-2xl shadow-md border border-neutral-200/60"
              />
            </div>

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
              <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-2xs ${
                isUpcoming 
                  ? 'bg-neutral-900 text-white' 
                  : 'bg-white/95 text-neutral-700 border border-neutral-200'
              }`}>
                {isUpcoming ? 'Akan Datang' : 'Selesai'}
              </span>
            </div>
          </div>

          {/* Right Column: Operational Details */}
          <div className="md:col-span-7 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="font-display italic text-xs text-neutral-500 block mb-1">
                Sesi Wego • Pembelajaran & Inovasi
              </span>
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-neutral-900 leading-snug tracking-tight mb-3">
                {seminar.title}
              </h3>

              {/* Speaker Card */}
              {seminar.speaker && (
                <div className="mb-4 pb-4 border-b border-neutral-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-700">
                    {seminar.speaker.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Wegoers
                    </span>
                    <span className="font-sans font-bold text-sm text-neutral-900 block">
                      {seminar.speaker}
                    </span>
                    {seminar.speakerRole && (
                      <span className="text-xs text-neutral-500 block">
                        {seminar.speakerRole}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Schedule and Venue Box */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 mb-5 space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-neutral-400 font-medium w-16 flex-shrink-0">Jadwal:</span>
                  <div className="text-neutral-900 font-medium">
                    <span>{seminar.date || 'Jadwal segera diumumkan'}</span>
                    {seminar.time && (
                      <span className="block text-neutral-500 mt-0.5">{seminar.time}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-neutral-400 font-medium w-16 flex-shrink-0">Lokasi:</span>
                  <span className="text-neutral-900 font-medium">
                    {seminar.venue || 'Zoom Cloud Meetings'}
                  </span>
                </div>
              </div>

              {/* Description */}
              {seminar.desc && (
                <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                  {seminar.desc}
                </p>
              )}
            </div>

            {/* Action Buttons Matrix */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {isUpcoming ? (
                  <a 
                    href={zoomLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-pill bg-neutral-900 !text-white hover:bg-black text-center text-xs font-semibold justify-center flex items-center shadow-xs"
                  >
                    Gabung Sesi Zoom ↗
                  </a>
                ) : (
                  <a 
                    href={videoLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-pill bg-neutral-900 !text-white hover:bg-black text-center text-xs font-semibold justify-center flex items-center shadow-xs"
                  >
                    Tonton Rekaman ↗
                  </a>
                )}
                
                <a 
                  href={presensiLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-pill bg-white text-neutral-900 border-neutral-300 hover:border-black text-center text-xs justify-center"
                >
                  Presensi Kehadiran ↗
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a 
                  href={vbgLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-pill text-neutral-600 border-neutral-200 hover:border-neutral-400 text-center text-xs justify-center"
                >
                  Virtual Background ↗
                </a>

                <a 
                  href={slideLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-pill text-neutral-600 border-neutral-200 hover:border-neutral-400 text-center text-xs justify-center"
                >
                  Unduh Slide Materi ↗
                </a>
              </div>

              {onOpenFeedback && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenFeedback(seminar);
                  }}
                  className="btn-pill bg-neutral-50 text-neutral-800 border-neutral-300 hover:border-black text-center text-xs justify-center flex items-center gap-1.5 w-full mt-2 transition-all hover:bg-neutral-100"
                >
                  <span>✹</span>
                  <span>Beri Nilai & Evaluasi Sesi Ini ↗</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
