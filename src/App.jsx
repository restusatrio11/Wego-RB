import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import HeadlineStatement from './components/HeadlineStatement';
import SpeakerProfiles from './components/SpeakerProfiles';
import SeminarCatalog from './components/SeminarCatalog';
import MidBanner from './components/MidBanner';
import DownloadableTemplates from './components/DownloadableTemplates';
import CommunityBoard from './components/CommunityBoard';
import RegionalInnovations from './components/RegionalInnovations';
import SocialGallery from './components/SocialGallery';
import Footer from './components/Footer';
import SubmissionModal from './components/SubmissionModal';
import { useWegoData } from './services/dataService';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Connects to Google Sheets if configured in Vite env, otherwise uses curated default data
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID || '';
  const { speakers, seminars, templates, communityAds, regionalGems, galleryPhotos } = useWegoData(sheetId);

  return (
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

      {/* 5. Downloadable Templates */}
      <DownloadableTemplates templates={templates} />

      {/* 6. Community Board (Kotak Aspirasi) */}
      <CommunityBoard 
        communityAds={communityAds} 
        onOpenModal={() => setModalOpen(true)} 
      />

      {/* 7. Regional Innovations */}
      <RegionalInnovations regionalGems={regionalGems} />

      {/* 8. Social Gallery */}
      <SocialGallery galleryPhotos={galleryPhotos} />

      {/* 9. Footer & Newsletter */}
      <Footer onOpenModal={() => setModalOpen(true)} />

      {/* 10. Interactive Submission Modal */}
      <SubmissionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
