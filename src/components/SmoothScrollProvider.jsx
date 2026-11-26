import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const SmoothScrollContext = createContext({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check for window and matchMedia support
    const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
    const prefersReducedMotion = hasMatchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // In reduced-motion mode, skip smooth scrolling
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        smoothTouch: false, // Native momentum touch on mobile/tablets
        autoRaf: false // Driven exclusively via GSAP ticker
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Unified GSAP Ticker clock
      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Two-way refresh listener for dynamic content adjustments
      const refreshListener = () => {
        lenis.resize();
      };
      ScrollTrigger.addEventListener('refresh', refreshListener);

      return () => {
        ScrollTrigger.removeEventListener('refresh', refreshListener);
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (e) {
      console.warn('[SmoothScroll] Initializing fallback scroll:', e.message);
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
