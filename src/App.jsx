import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import HeadlineStatement from './components/HeadlineStatement';
import SpeakerProfiles from './components/SpeakerProfiles';
import SeminarCatalog from './components/SeminarCatalog';
import MidBanner from './components/MidBanner';
import CommunityBoard from './components/CommunityBoard';
import MarqueeTicker from './components/MarqueeTicker';
import SocialGallery from './components/SocialGallery';
import Footer from './components/Footer';
import SubmissionModal from './components/SubmissionModal';
import SessionsArchive from './components/SessionsArchive';
import { useWegoData } from './services/dataService';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(() => {
    return typeof window !== 'undefined' ? window.location.hash : '';
  });
  
  // Connects to Google Sheets if configured in Vite env, otherwise uses curated default data
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID || '1j-g4KUlvcFejCJungNi7Cz4wLKZ3myfzCLu1WGw0bfA';
  const { speakers, seminars, communityAds, galleryPhotos } = useWegoData(sheetId);

  // Sync route with window hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo(0, 0);
      }
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // safe in test/headless
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Recalibrate ScrollTrigger trigger points when asynchronous CMS data updates
  useEffect(() => {
    try {
      ScrollTrigger.refresh();
    } catch (e) {
      // safe in headless/test environments
    }
  }, [speakers, seminars, currentHash]);

  const isArchiveRoute = currentHash.startsWith('#/sesi');

  return (
    <SmoothScrollProvider>
      {isArchiveRoute ? (
        <SessionsArchive
          seminars={seminars}
          onNavigateHome={() => {
            window.location.hash = '';
          }}
          onOpenSubmissionModal={() => setModalOpen(true)}
        />
      ) : (
        <div className="min-h-screen bg-white text-page-text selection:bg-neutral-100 selection:text-black">
          {/* 1. Hero & Statement */}
          <section className="relative">
            <Navbar />
            <HeroCover />
            <HeadlineStatement />
          </section>

          {/* 2. Speaker Profiles (Wegoers) */}
          <SpeakerProfiles speakers={speakers} />

          {/* 3. Seminar Catalog */}
          <SeminarCatalog seminars={seminars} />

          {/* 4. Mid CTA Banner */}
          <MidBanner onOpenModal={() => setModalOpen(true)} />

          {/* 6. Community Board (Kotak Aspirasi) */}
          <CommunityBoard 
            communityAds={communityAds} 
            onOpenModal={() => setModalOpen(true)} 
          />

          {/* 7. Multi-Row Editorial Marquee Ticker */}
          <MarqueeTicker onOpenModal={() => setModalOpen(true)} />

          {/* 8. Social Gallery */}
          <SocialGallery galleryPhotos={galleryPhotos} />

          {/* 9. Footer & Newsletter */}
          <Footer onOpenModal={() => setModalOpen(true)} />
        </div>
      )}

      {/* Global Interactive Submission & Feedback Modal */}
      <SubmissionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        seminars={seminars}
      />
    </SmoothScrollProvider>
  );
}
