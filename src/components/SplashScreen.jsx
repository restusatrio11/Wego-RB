import React, { useState, useEffect, useCallback } from 'react';

/**
 * SplashScreen - Editorial monochrome intro overlay for Wego-RB
 * Shows once per user session (using sessionStorage) with Didone branding,
 * official insignia, and smooth curtain exit.
 *
 * @param {Object} props
 * @param {Function} [props.onComplete] Callback fired when splash finishes exit transition
 * @param {number} [props.duration=1800] Display duration in ms before auto-exit
 * @param {boolean} [props.forceShow=false] Bypass sessionStorage for previews or test suites
 */
export default function SplashScreen({ onComplete, duration = 1800, forceShow = false }) {
  const [shouldRender, setShouldRender] = useState(() => {
    if (forceShow) return true;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem('wego_splash_shown') !== 'true';
      }
    } catch (e) {
      // Ignore storage errors in restricted iframe/browser modes
    }
    return true;
  });

  const [isExiting, setIsExiting] = useState(false);

  const handleFinish = useCallback(() => {
    setIsExiting(true);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('wego_splash_shown', 'true');
      }
    } catch (e) {
      // Ignore storage errors
    }

    // Allow exit animation (500ms) to complete before unmounting and restoring scroll
    const exitTimer = setTimeout(() => {
      setShouldRender(false);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if (typeof window !== 'undefined' && window.__lenis?.start) {
        window.__lenis.start();
      }
      onComplete?.();
    }, 500);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  // Handle auto-exit timer and lock background scroll while active
  useEffect(() => {
    if (!shouldRender) return;

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    if (typeof window !== 'undefined' && window.__lenis?.stop) {
      window.__lenis.stop();
    }

    const timer = setTimeout(() => {
      handleFinish();
    }, duration);

    const handleKeyDown = (e) => {
      if (['Space', 'Enter', 'Escape'].includes(e.code) || [' ', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if (typeof window !== 'undefined' && window.__lenis?.start) {
        window.__lenis.start();
      }
    };
  }, [shouldRender, duration, handleFinish]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Layar Pembuka Wego"
      data-testid="splash-screen"
      onClick={handleFinish}
      className={`fixed inset-0 z-[100] bg-neutral-950 text-white flex flex-col justify-between items-center p-6 sm:p-10 select-none cursor-pointer transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Header Tag */}
      <div className="w-full max-w-5xl flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 border-b border-neutral-800/80 pb-4">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          BPS Provinsi Sumatera Utara
        </span>
        <span className="hidden sm:inline text-neutral-500">Inovasi RB & Zona Integritas</span>
        <span className="text-neutral-500">2026/2027</span>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center justify-center text-center my-auto px-4 max-w-2xl">
        {/* Emblem / Insignia */}
        <div className="relative mb-6 group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-2xl p-2.5 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105">
            <img
              src="/WEGOSID! (2).webp"
              alt="Wego Insignia"
              className="w-full h-full object-contain filter drop-shadow brightness-110"
              loading="eager"
            />
          </div>
          <span className="absolute -top-1.5 -right-1.5 text-xs text-neutral-400">✹</span>
        </div>

        {/* Brand Typography */}
        <div className="font-bodoni text-6xl sm:text-8xl md:text-9xl font-light tracking-tight text-white leading-none mb-3 sm:mb-4">
          wego
        </div>

        <p className="text-xs sm:text-sm font-light text-neutral-300 max-w-md tracking-wider uppercase">
          Wadah Edukasi dan Gagasan Optimal
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-32 sm:w-48 h-[2px] bg-neutral-850 rounded-full mt-8 overflow-hidden relative">
          <div
            className="h-full bg-white rounded-full transition-all ease-linear"
            style={{
              animation: `splashProgress ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
            }}
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="w-full max-w-5xl flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest text-neutral-500 pt-4 border-t border-neutral-800/80">
        <span className="flex items-center gap-1.5">
          <span>✹</span>
          <span>Ruang Berbagi Pengetahuan</span>
        </span>
        <span className="text-neutral-400 hover:text-white transition-colors duration-200">
          Ketuk untuk melewati <span className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
        </span>
      </div>

      {/* Embedded CSS for keyframe progress */}
      <style>{`
        @keyframes splashProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
