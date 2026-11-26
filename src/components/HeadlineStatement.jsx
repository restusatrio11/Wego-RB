import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function HeadlineStatement() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isTestEnv = typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom');

    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.statement-line');
    if (!lines || lines.length === 0) return;

    if (prefersReducedMotion) {
      // Ensure all lines remain fully illuminated for users with reduced-motion preference
      gsap.set(lines, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    try {
      // In test/jsdom environment, avoid DOM pin-spacer mutation that breaks virtual DOM teardown
      const shouldPin = !isTestEnv;

      // Initialize dim state for scrub illumination
      gsap.set(lines, { opacity: 0.25 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 15%',
          end: '+=100%',
          pin: shouldPin,
          scrub: 0.6,
          anticipatePin: 1
        }
      });

      lines.forEach((line) => {
        tl.to(line, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, '+=0.15');
      });
    } catch (e) {
      // Graceful fallback for non-layout environments
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full px-6 md:px-14 py-20 md:py-32 flex items-center bg-white border-b border-neutral-100">
      <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.6vw] lg:text-[5.2vw] xl:text-[5.6vw] leading-[1.08] tracking-[-0.035em] text-neutral-900 font-sans font-bold w-full">
        {/* Line 1 */}
        <span className="statement-line block transition-opacity">
          Untuk Pegawai BPS{' '}
          <span className="inline-block w-8 sm:w-12 md:w-14 lg:w-16 xl:w-20 h-10 sm:h-15 md:h-18 lg:h-20 xl:h-24 rounded-lg sm:rounded-xl overflow-hidden align-middle mx-1.5 sm:mx-3 border border-neutral-200 shadow-sm relative top-[-0.06em]">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
              alt="Insan BPS" 
              className="w-full h-full object-cover" 
            />
          </span>
        </span>

        {/* Line 2 */}
        <span className="statement-line block transition-opacity mt-2">
          yang mencari ruang belajar & berbagi pengetahuan
        </span>

        {/* Line 3 */}
        <span className="statement-line block transition-opacity mt-2">
          <span className="inline-flex items-center gap-2 sm:gap-3 border border-neutral-900 rounded-full px-3.5 sm:px-5 lg:px-6 py-0.5 sm:py-1 align-baseline mx-1.5 sm:mx-2.5 relative top-[-0.05em] whitespace-nowrap">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 fill-neutral-900 flex-shrink-0" viewBox="0 0 24 24">
              <polygon points="12,0 14.5,7 21.5,4 18,10.5 24,14 17,16.5 19,23.5 12,18.5 5,23.5 7,16.5 0,14 6,10.5 2.5,4 9.5,7" />
            </svg>
            <span className="font-sans font-bold tracking-tight text-neutral-900 text-[0.85em]">
              inovasi reformasi birokrasi
            </span>
          </span>{' '}
          <span className="font-display italic font-normal tracking-[-0.04em] text-neutral-900">
            bersama komunitas rekan kerja BPS se-Sumatera Utara.
          </span>
          <a
            href="#seminar"
            className="inline-block text-[11px] sm:text-xs md:text-sm font-sans font-normal text-neutral-600 hover:text-black leading-[1.2] tracking-normal ml-3 sm:ml-5 text-left not-italic align-middle"
          >
            Jelajahi
            <br />
            berbagi →
          </a>
        </span>
      </h2>
    </div>
  );
}
