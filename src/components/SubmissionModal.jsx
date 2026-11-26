import React, { useState, useEffect } from 'react';
import { handleDriveImageError } from '../services/dataService';

const SCORE_LABELS = {
  1: 'Kurang Memuaskan',
  2: 'Cukup Bermanfaat',
  3: 'Baik & Informatif',
  4: 'Sangat Baik & Aplikatif',
  5: 'Luar Biasa / Sangat Menginspirasi'
};

export default function SubmissionModal({ 
  isOpen, 
  onClose, 
  seminars = [],
  initialType = 'Usulan Topik',
  initialSession = '',
  selectedSeminar = null
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoverScore, setHoverScore] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    satker: '',
    type: initialType || 'Usulan Topik',
    sessionId: initialSession || selectedSeminar?.title || '',
    score: 5,
    desc: ''
  });

  // Sync initial type, session, and selected seminar only when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        satker: '',
        type: initialType || 'Usulan Topik',
        sessionId: initialSession || selectedSeminar?.title || '',
        score: 5,
        desc: ''
      });
      setSubmitted(false);
      setSubmitting(false);
    }
  }, [isOpen, initialType, initialSession, selectedSeminar]);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Lock document body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Pause Lenis smooth scrolling so background page never scrolls
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isFeedbackType = formData.type.toLowerCase().includes('evaluasi') || 
                         formData.type.toLowerCase().includes('feedback');

  // Find the exact seminar being evaluated
  const activeSeminar = selectedSeminar || seminars.find(s => s.title === formData.sessionId || s.id === formData.sessionId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const webhookUrl = import.meta.env.VITE_SUBMISSION_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbyk5KtjOLM3IJ456etM5Kbud4sntMHnrFFukvydZjl8VM1DQ-KeByRhvnPOqBcPhEWZ/exec';
    if (webhookUrl && typeof fetch === 'function') {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString()
          })
        }).catch((err) => {
          console.warn('Submission webhook warning (proceeding):', err);
        });
      } catch (err) {
        console.warn('Submission webhook warning (proceeding):', err);
      }
    }

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2100);
  };

  const currentRating = hoverScore || formData.score;

  return (
    <div 
      data-lenis-prevent="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto overscroll-contain"
    >
      <div 
        data-lenis-prevent="true"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-neutral-200 my-8 overscroll-contain"
      >
        <button 
          onClick={onClose}
          aria-label="✕"
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:border-black transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <span className="text-4xl block mb-3 animate-bounce">✹</span>
            <h4 className="font-sans font-bold text-xl text-neutral-900 mb-2">
              {isFeedbackType ? 'Penilaian Berhasil Dikirimkan!' : 'Gagasan Berhasil Terkirim!'}
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              {isFeedbackType 
                ? `Terima kasih atas penilaian dan ulasan Anda untuk sesi "${formData.sessionId || 'Wego-RB'}". Data telah tersimpan ke database spreadsheet.`
                : 'Terima kasih atas kontribusi Anda. Data telah tersimpan ke sistem database Wego-RB BPS Sumatera Utara.'}
            </p>
          </div>
        ) : (
          <div>
            <span className="location-tag mb-3">
              {isFeedbackType ? 'Evaluasi Sesi Wego' : 'Kotak Partisipasi & Feedback Wego'}
            </span>
            <h3 className="font-sans font-bold text-2xl text-neutral-900 tracking-tight mb-2">
              {isFeedbackType ? 'Beri Nilai & Evaluasi Sesi Ini' : 'Kirimkan Gagasan atau Daftar Pemateri'}
            </h3>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              {isFeedbackType 
                ? 'Nilai kualitas materi serta penyampaian narasumber, dan berikan catatan perbaikan untuk sesi Wego mendatang.'
                : 'Bagikan usulan topik, daftar menjadi narasumber, atau berikan evaluasi dan skor penilaian untuk sesi seminar Wego yang telah Anda ikuti.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* If opened specifically to evaluate a chosen session, display the Locked Session Summary Card */}
              {isFeedbackType && activeSeminar && (
                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/90 flex items-center gap-3.5 shadow-2xs">
                  {activeSeminar.thumb || activeSeminar.image ? (
                    <img 
                      src={activeSeminar.thumb || activeSeminar.image} 
                      alt={activeSeminar.title} 
                      referrerPolicy="no-referrer"
                      onError={(e) => handleDriveImageError(e)}
                      className="w-12 h-16 rounded-xl object-contain bg-neutral-100 shrink-0 border border-neutral-200 shadow-2xs" 
                    />
                  ) : (
                    <div className="w-12 h-16 rounded-xl bg-neutral-200 flex items-center justify-center text-xs font-bold shrink-0">
                      WEGO
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                      Sesi yang Dievaluasi:
                    </span>
                    <h4 className="font-sans font-bold text-sm text-neutral-900 leading-snug line-clamp-2">
                      {activeSeminar.title}
                    </h4>
                    {activeSeminar.speaker && (
                      <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1.5 truncate">
                        <span className="font-medium text-neutral-700">{activeSeminar.speaker}</span>
                        {activeSeminar.satker && <span>• {activeSeminar.satker}</span>}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Show category select only if not opened specifically for session evaluation with locked seminar */}
              {(!isFeedbackType || !activeSeminar) && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Kategori Partisipasi</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black bg-white"
                  >
                    <option value="Usulan Topik">Usulan Topik Seminar</option>
                    <option value="Evaluasi & Feedback Sesi Seminar">Evaluasi & Feedback Sesi Seminar</option>
                    <option value="Siap Menjadi Narasumber (Wegoers)">Siap Menjadi Narasumber (Wegoers)</option>
                    <option value="Pojok Gagasan Inovasi RB">Pojok Gagasan Inovasi RB</option>
                  </select>
                </div>
              )}

              {/* If feedback mode but no specific seminar was locked, let user pick from dropdown */}
              {isFeedbackType && !activeSeminar && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Pilih Sesi yang Dinilai
                  </label>
                  <select
                    value={formData.sessionId}
                    onChange={(e) => setFormData({ ...formData, sessionId: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 bg-white focus:outline-none focus:border-black"
                  >
                    {seminars.length > 0 ? (
                      seminars.map((s, idx) => (
                        <option key={s.id || idx} value={s.title}>
                          {s.title} ({s.speaker || s.satker})
                        </option>
                      ))
                    ) : (
                      <option value="Sesi Terakhir Wego-RB">Sesi Terakhir Wego-RB</option>
                    )}
                  </select>
                </div>
              )}

              {/* Interactive Star Rating Block for Feedback Mode */}
              {isFeedbackType && (
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2 animate-fade-in">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-neutral-800">
                      Skor Penilaian Acara
                    </label>
                    <span className="text-[11px] font-semibold text-neutral-700">
                      {SCORE_LABELS[currentRating] || ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Beri skor ${star} dari 5`}
                        onClick={() => setFormData({ ...formData, score: star })}
                        onMouseEnter={() => setHoverScore(star)}
                        onMouseLeave={() => setHoverScore(0)}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg transition-all ${
                          star <= currentRating
                            ? 'bg-neutral-900 text-white border-neutral-900 scale-105 shadow-2xs'
                            : 'bg-white text-neutral-300 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        ✹
                      </button>
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-neutral-800">
                      {currentRating} / 5
                    </span>
                  </div>
                </div>
              )}

              {/* Name & Satker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Pratama Siregar" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Satuan Kerja</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: BPS Kabupaten Langkat" 
                    value={formData.satker}
                    onChange={(e) => setFormData({ ...formData, satker: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Notes / Feedback */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isFeedbackType ? 'Catatan & Saran Perbaikan' : 'Uraian Ringkas Gagasan'}
                </label>
                <textarea 
                  rows={3}
                  required
                  placeholder={
                    isFeedbackType 
                      ? "Tuliskan kesan, manfaat materi, dan masukan untuk sesi berikutnya..."
                      : "Tuliskan gagasan, ringkasan materi, atau tools yang ingin dibagikan..."
                  }
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-pill bg-black !text-white hover:bg-neutral-800 py-3 text-xs font-bold transition-all disabled:opacity-50"
                >
                  {submitting 
                    ? 'Mengirim Data...' 
                    : (isFeedbackType ? 'Kirimkan Nilai & Evaluasi ↗' : 'Kirimkan Sekarang →')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
