import React, { useState, useEffect } from 'react';

export default function SubmissionModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    satker: 'BPS Prov. Sumut',
    type: 'Usulan Topik',
    desc: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-neutral-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:border-black transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <span className="text-3xl block mb-3">✹</span>
            <h4 className="font-sans font-bold text-xl text-neutral-900 mb-2">Gagasan Berhasil Terkirim!</h4>
            <p className="text-xs text-neutral-500">Terima kasih atas kontribusi Anda. Tim Inovasi BPS Sumut akan segera meninjau aspirasi ini.</p>
          </div>
        ) : (
          <div>
            <span className="location-tag mb-3">Kotak Aspirasi Wego</span>
            <h3 className="font-sans font-bold text-2xl text-neutral-900 tracking-tight mb-2">
              Kirimkan Gagasan atau Daftar Pemateri
            </h3>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Punya ide perbaikan layanan, otomasi data, atau ingin menjadi narasumber di sesi Wego mendatang? Tuliskan di sini.
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
                  <option>Usulan Topik Seminar</option>
                  <option>Siap Menjadi Narasumber (Wegoers)</option>
                  <option>Pojok Gagasan Inovasi RB</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Uraian Ringkas Gagasan</label>
                <textarea 
                  rows={3} 
                  required
                  placeholder="Tuliskan gagasan, ringkasan materi, atau tools yang ingin dibagikan..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full btn-pill bg-black !text-white hover:bg-neutral-800 py-3 text-xs font-bold"
                >
                  Kirimkan Sekarang →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
