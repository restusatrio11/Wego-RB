import React, { useState, useEffect } from 'react';

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
  initialSession = ''
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoverScore, setHoverScore] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    satker: '',
    type: initialType || 'Usulan Topik',
    sessionId: initialSession || (seminars.length > 0 ? seminars[0]?.title : ''),
    score: 5,
    desc: ''
  });

  // Sync initial type and session only when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        satker: '',
        type: initialType || 'Usulan Topik',
        sessionId: initialSession || (seminars.length > 0 ? seminars[0]?.title : ''),
        score: 5,
        desc: ''
      });
      setSubmitted(false);
      setSubmitting(false);
    }
  }, [isOpen, initialType, initialSession]);

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

  if (!isOpen) return null;

  const isFeedbackType = formData.type.toLowerCase().includes('evaluasi') || 
                         formData.type.toLowerCase().includes('feedback');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const webhookUrl = import.meta.env.VITE_SUBMISSION_WEBHOOK_URL || '';
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-neutral-200 my-8">
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
            <h4 className="font-sans font-bold text-xl text-neutral-900 mb-2">Gagasan Berhasil Terkirim!</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              Terima kasih atas kontribusi Anda. Data telah tersimpan ke sistem database Wego-RB BPS Sumatera Utara.
            </p>
          </div>
        ) : (
          <div>
            <span className="location-tag mb-3">Kotak Partisipasi & Feedback Wego</span>
            <h3 className="font-sans font-bold text-2xl text-neutral-900 tracking-tight mb-2">
              Kirimkan Gagasan atau Daftar Pemateri
            </h3>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Bagikan usulan topik, daftar menjadi narasumber, atau berikan evaluasi dan skor penilaian untuk sesi seminar Wego yang telah Anda ikuti.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Conditional Evaluation Fields */}
              {isFeedbackType && (
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3.5 animate-fade-in">
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

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold text-neutral-800">
                        Skor Penilaian Acara
                      </label>
                      <span className="text-[11px] font-medium text-neutral-500">
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
                </div>
              )}

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
                  {submitting ? 'Mengirim Data...' : 'Kirimkan Sekarang →'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
