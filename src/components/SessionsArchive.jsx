import React, { useState, useMemo } from 'react';
import SeminarDetailModal from './SeminarDetailModal';
import { handleDriveImageError, sortSeminarsNewestFirst } from '../services/dataService';

export default function SessionsArchive({ 
  seminars = [], 
  onNavigateHome,
  onOpenSubmissionModal 
}) {
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'upcoming' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate status counts
  const counts = useMemo(() => {
    const total = seminars.length;
    const upcoming = seminars.filter((s) => s.status === 'upcoming').length;
    const completed = seminars.filter((s) => s.status === 'completed').length;
    return { all: total, upcoming, completed };
  }, [seminars]);

  // Sort and filter seminars: upcoming first, then completed/others
  const filteredSeminars = useMemo(() => {
    // 1. Filter by status
    let result = seminars;
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter);
    }

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((s) => {
        const titleMatch = s.title && s.title.toLowerCase().includes(q);
        const speakerMatch = s.speaker && s.speaker.toLowerCase().includes(q);
        const satkerMatch = s.satker && s.satker.toLowerCase().includes(q);
        const roleMatch = s.speakerRole && s.speakerRole.toLowerCase().includes(q);
        const categoryMatch = s.category && s.category.toLowerCase().includes(q);
        const dateMatch = s.date && s.date.toLowerCase().includes(q);
        return titleMatch || speakerMatch || satkerMatch || roleMatch || categoryMatch || dateMatch;
      });
    }

    // 3. Sort: upcoming first (soonest first), then completed (newest date first)
    return sortSeminarsNewestFirst(result);
  }, [seminars, statusFilter, searchQuery]);

  const handleResetFilters = () => {
    setStatusFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white text-page-text selection:bg-neutral-100 selection:text-black">
      {/* Top Navigation Bar */}
      <nav 
        aria-label="Navigasi Halaman Arsip"
        className="w-full px-6 md:px-14 py-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-white/90"
      >
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-600 hover:text-black transition-colors group"
        >
          <span className="text-base leading-none group-hover:-translate-x-1 transition-transform">←</span>
          Kembali ke Beranda
        </button>

        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
          }}
          className="flex items-center gap-2 group"
        >
          <img 
            src="./WEGOSID!%20(2).webp" 
            alt="Logo WEGOSID!" 
            className="h-6 md:h-7 w-auto object-contain" 
          />
          <span className="font-bodoni text-2xl lowercase tracking-tighter text-black">
            wego
          </span>
        </a>
      </nav>

      {/* Main Archive Content */}
      <main className="px-6 md:px-14 py-12 md:py-16 max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-10 md:mb-14">
          <span className="font-display italic text-sm md:text-base text-neutral-500 block mb-2">
            Repositori Pembelajaran • Wadah Edukasi dan Gagasan Optimal
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
            Arsip <span className="small-pill font-bold align-middle">Sesi Wego</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-600 max-w-3xl leading-relaxed">
            Telusuri seluruh dokumentasi sesi seminar, materi presentasi, dan tautan rekaman pembelajaran bersama insan BPS se-Sumatera Utara dalam mendukung percepatan Reformasi Birokrasi.
          </p>
        </header>

        {/* Toolbar: Status Tabs & Instant Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200/80">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter status sesi">
            <button
              role="tab"
              aria-selected={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                statusFilter === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Semua ({counts.all})
            </button>
            <button
              role="tab"
              aria-selected={statusFilter === 'upcoming'}
              onClick={() => setStatusFilter('upcoming')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                statusFilter === 'upcoming'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Akan Datang ({counts.upcoming})
            </button>
            <button
              role="tab"
              aria-selected={statusFilter === 'completed'}
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                statusFilter === 'completed'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Selesai ({counts.completed})
            </button>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik, pemateri, atau satker..."
              aria-label="Cari sesi Wego"
              className="w-full text-xs md:text-sm pl-9 pr-8 py-2 bg-neutral-50 rounded-full border border-neutral-200 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-neutral-400 text-xs pointer-events-none">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Bersihkan pencarian"
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-900 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Result Counter & Active Query Status */}
        <div className="flex justify-between items-center mb-8">
          <span className="font-mono text-xs text-neutral-500 tracking-wider">
            Menampilkan {filteredSeminars.length} dari {seminars.length} sesi pembelajaran
          </span>
          {(statusFilter !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-neutral-600 hover:text-black font-medium underline"
            >
              Reset Filter ↺
            </button>
          )}
        </div>

        {/* 3:4 Portrait Cards Grid */}
        {filteredSeminars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredSeminars.map((item) => {
              const isUpcoming = item.status === 'upcoming';
              const flyerImage = item.thumb || item.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Buka rincian sesi ${item.title}`}
                  onClick={() => setSelectedSeminar(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedSeminar(item);
                    }
                  }}
                  className="group cursor-pointer bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 hover:border-neutral-900/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  <div>
                    {/* 3:4 Aspect Ratio Portrait Flyer Frame */}
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4 relative border border-neutral-100">
                      <img
                        src={flyerImage}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleDriveImageError(e)}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                          isUpcoming
                            ? 'bg-neutral-900 text-white'
                            : 'bg-white/95 text-neutral-700 border border-neutral-200'
                        }`}>
                          {isUpcoming ? 'Akan Datang' : 'Selesai'}
                        </span>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-medium text-neutral-400">
                        {item.date || 'Jadwal Segera Diumumkan'}
                      </span>
                      {item.time && (
                        <>
                          <span className="text-neutral-300">•</span>
                          <span className="text-[11px] text-neutral-400">{item.time}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="font-sans font-bold text-lg text-neutral-900 tracking-tight leading-snug mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>

                    {/* Speaker */}
                    {item.speaker && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-semibold text-neutral-800">
                          {item.speaker}
                        </span>
                        {item.speakerRole && (
                          <span className="text-[11px] text-neutral-400 truncate">
                            • {item.speakerRole.split('•')[0].trim()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Trigger */}
                  <div className="pt-3 border-t border-neutral-100 flex justify-between items-center text-xs">
                    <span className="font-medium text-neutral-900 group-hover:underline">
                      Lihat Detail & Presensi ↗
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {item.venue || 'Online'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Editorial Empty State */
          <div className="py-20 text-center border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50">
            <span className="text-3xl mb-3 block">✹</span>
            <h3 className="font-sans font-bold text-lg text-neutral-900 mb-2">
              Tidak Ada Sesi yang Ditemukan
            </h3>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md mx-auto mb-6">
              Tidak ditemukan sesi pembelajaran yang cocok dengan filter atau kata kunci &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
            >
              Tampilkan Semua Sesi ↺
            </button>
          </div>
        )}

        {/* Bottom Submission Proposal Callout */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="font-display italic text-sm text-neutral-500 block mb-1">
              Punya Praktik Baik di Unit Kerja Anda?
            </span>
            <h3 className="font-sans text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
              Jadilah narasumber sesi Wego berikutnya.
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xl">
              Daftarkan usulan topik seminar atau inisiatif reformasi birokrasi dari satker Anda melalui Kotak Aspirasi.
            </p>
          </div>
          {onOpenSubmissionModal && (
            <button
              onClick={onOpenSubmissionModal}
              className="btn-pill bg-white text-xs whitespace-nowrap hover:bg-neutral-900 hover:text-white"
            >
              Ajukan Usulan Sesi ↗
            </button>
          )}
        </div>
      </main>

      {/* Operational Detail Modal */}
      <SeminarDetailModal 
        isOpen={Boolean(selectedSeminar)}
        seminar={selectedSeminar} 
        onClose={() => setSelectedSeminar(null)} 
        onOpenFeedback={onOpenSubmissionModal ? (sem) => onOpenSubmissionModal('Evaluasi & Feedback Sesi Seminar', sem.title) : undefined}
      />

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 bg-neutral-900 text-white px-6 md:px-14 py-10 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} BPS Provinsi Sumatera Utara • Wego-RB</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors"
          >
            Kembali ke Atas ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
