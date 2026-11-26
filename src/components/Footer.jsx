import React, { useState } from 'react';

export default function Footer({ onOpenModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-black text-white py-20 px-6 md:px-14">
      <div className="w-full">
        {/* Newsletter Block */}
        <div className="max-w-xl mb-16">
          <h3 className="font-sans text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
            Setiap minggu, materi dan gagasan baru untuk Anda.
          </h3>
          <p className="text-neutral-400 text-sm font-sans mb-6">
            Jadwal sesi terdekat, link materi presentasi, rekaman video, dan kabar inovasi insan BPS se-Sumatera Utara.
          </p>
          {subscribed ? (
            <div className="p-3 bg-neutral-900 border border-neutral-700 rounded-full text-xs text-white">
              Terima kasih telah bergabung! Kabar sesi Wego akan dikirimkan ke email Anda.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan alamat email..." 
                required
                className="border border-neutral-800 bg-neutral-950 px-4 py-3 rounded-full text-xs text-white focus:outline-none focus:border-neutral-500 flex-1"
              />
              <button 
                type="submit"
                className="btn-pill bg-white text-black text-xs font-semibold px-6 py-3 border-transparent hover:bg-neutral-200"
              >
                Berlangganan
              </button>
            </form>
          )}
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-neutral-900 pt-12 text-xs text-neutral-400 font-sans">
          <div>
            <span className="text-white block font-semibold mb-3">Tentang Wego</span>
            <ul className="space-y-2">
              <li><a href="#profiles" className="hover:text-white transition-colors">Wegoers</a></li>
              <li><a href="#/sesi" className="hover:text-white transition-colors">Arsip Sesi Wego</a></li>
            </ul>
          </div>
          <div>
            <span className="text-white block font-semibold mb-3">Partisipasi</span>
            <ul className="space-y-2">
              <li><button onClick={onOpenModal} className="hover:text-white transition-colors">Daftar Pemateri</button></li>
              <li><button onClick={onOpenModal} className="hover:text-white transition-colors">Kirim Usulan Topik</button></li>
              <li><a href="#ads" className="hover:text-white transition-colors">Papan Kolaborasi</a></li>
            </ul>
          </div>
          <div>
            <span className="text-white block font-semibold mb-3">Reformasi Birokrasi</span>
            <ul className="space-y-2">
              <li><span className="text-neutral-500">Zona Integritas WBK/WBBM</span></li>
              <li><span className="text-neutral-500">6 Area Perubahan RB</span></li>
              <li><span className="text-neutral-500">Manajemen Perubahan</span></li>
            </ul>
          </div>
          <div>
            <span className="text-white block font-semibold mb-3">Penyelenggara</span>
            <p className="text-neutral-500 leading-relaxed mb-2">
              Badan Pusat Statistik Provinsi Sumatera Utara<br />
              Jl. Asrama No. 179 Medan, 20123
            </p>
            <span className="text-[11px] text-neutral-600 block">sumut.bps.go.id</span>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between text-[11px] text-neutral-600 font-sans">
          <span>© 2026 Tim Kerja Inovasi & Reformasi Birokrasi BPS Provinsi Sumatera Utara.</span>
          <span className="mt-2 sm:mt-0">Wadah Edukasi dan Gagasan Optimal (Wego-RB).</span>
        </div>
      </div>
    </footer>
  );
}
