import { useState, useEffect } from 'react';

/**
 * Transforms any Google Drive share link into a direct CDN image link.
 */
export function convertDriveUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('drive.google.com')) return url;
  
  const idMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                  url.match(/id=([a-zA-Z0-9_-]+)/) ||
                  url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
  }
  return url;
}

// Fallback curated dataset matching BPS Sumatera Utara domain
export const HEADER_ALIAS_MAP = {
  title: ['title', 'judul', 'topik', 'tema', 'sesi', 'namasesi', 'namaworkshop', 'namaacara', 'materiutama'],
  desc: ['desc', 'description', 'deskripsi', 'ringkasan', 'keterangan', 'detail', 'uraian'],
  speaker: ['speaker', 'pemateri', 'narasumber', 'pembicara', 'namapemateri', 'namanarasumber', 'speakername', 'nama', 'name', 'wegoers'],
  speakerRole: ['speakerrole', 'role', 'jabatan', 'peran', 'posisi', 'unitkerja', 'satkerpemateri'],
  satker: ['satker', 'unitkerja', 'asalsatker', 'instansi', 'agency', 'kantor', 'lokasisatker', 'location', 'lokasi'],
  date: ['date', 'tanggal', 'tgl', 'hari'],
  time: ['time', 'waktu', 'jam', 'pukul'],
  venue: ['venue', 'tempat', 'ruangan', 'platform'],
  status: ['status', 'state', 'statuskegiatan'],
  thumb: ['thumb', 'thumbnail', 'flyer', 'fotoflyer', 'poster', 'cover', 'banner', 'gambaran', 'fotoposter'],
  image: ['image', 'foto', 'fotonarasumber', 'avatar', 'avatarurl', 'fotoprofil', 'profile', 'gambar', 'url', 'photourl', 'fotourl'],
  presensiUrl: ['presensiurl', 'linkpresensi', 'presensi', 'daftarhadir', 'linkdaftarhadir', 'absen', 'absensi'],
  zoomUrl: ['zoomurl', 'linkzoom', 'zoom', 'linkmeeting', 'meetinglink', 'linkwebinar'],
  vbgUrl: ['vbgurl', 'linkvbg', 'virtualbackground', 'vbg', 'background'],
  slideUrl: ['slideurl', 'linkslide', 'materi', 'slide', 'bahantayang', 'deckurl', 'ppt', 'deck', 'filemateri'],
  videoUrl: ['videourl', 'linkrekaman', 'rekaman', 'video', 'youtube', 'recording', 'linkvideo', 'tautanvideo'],
  type: ['type', 'jenis', 'kategori', 'tipe', 'tag'],
  text: ['text', 'teks', 'pesan', 'aspirasi', 'usulan', 'isi', 'ringkasangagasan'],
  action: ['action', 'aksi', 'tombol', 'cta', 'link', 'tautan']
};

const INVERTED_HEADER_LOOKUP = Object.entries(HEADER_ALIAS_MAP).reduce((acc, [canonical, aliases]) => {
  aliases.forEach((alias) => {
    acc[alias] = canonical;
  });
  return acc;
}, {});

export function normalizeHeader(header) {
  if (!header || typeof header !== 'string') return header;
  const clean = header.trim().toLowerCase().replace(/[\s_-]+/g, '');
  return INVERTED_HEADER_LOOKUP[clean] || header.trim();
}

export const DEFAULT_DATA = {
  speakers: [
    {
      id: "1",
      name: "Lexie Siregar",
      satker: "BPS Prov. Sumut",
      role: "Data Scientist / IPDS",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "2",
      name: "Michelle Pontvert",
      satker: "BPS Kota Medan",
      role: "Statistisi Ahli Muda / Tim RB",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "3",
      name: "Melody Hansen",
      satker: "BPS Kab. Deli Serdang",
      role: "Pranata Komputer / Otomasi",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "4",
      name: "Chelli Tampubolon",
      satker: "BPS Kab. Toba",
      role: "Analis SDM Aparatur / Pelayanan",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80"
    }
  ],
  seminars: [
    {
      id: "sem-1",
      title: "Pemanfaatan Web Scraping & Machine Learning Harga Pangan",
      desc: "Metode ekstraksi data harga komoditas dari portal online menggunakan Python untuk melengkapi validasi data inflasi harian di 33 kabupaten/kota se-Sumatera Utara.",
      thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      speaker: "Melody Hansen",
      speakerRole: "Pranata Komputer • BPS Kab. Deli Serdang",
      date: "Kamis, 15 April 2026",
      time: "09.00 - 11.30 WIB",
      venue: "Zoom Cloud Meetings & Aula BPS Sumut",
      status: "upcoming",
      zoomUrl: "https://zoom.us/j/wego-bps-sumut",
      presensiUrl: "https://s.bps.go.id/presensi-wego-01",
      vbgUrl: "https://drive.google.com/file/d/vbg-sample-01/view",
      slideUrl: "https://drive.google.com/file/d/slide-sample-01/view",
      deckUrl: "https://drive.google.com/file/d/slide-sample-01/view",
      videoUrl: "https://youtube.com/live"
    },
    {
      id: "sem-2",
      title: "Strategi Sukses Membangun Zona Integritas Menuju WBK/WBBM",
      desc: "Langkah nyata implementasi 6 area perubahan Reformasi Birokrasi dan panduan penyusunan Lembar Kerja Evaluasi yang aplikatif dan terukur.",
      thumb: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      speaker: "Michelle Pontvert",
      speakerRole: "Statistisi Ahli Muda • BPS Kota Medan",
      date: "Selasa, 10 Maret 2026",
      time: "09.00 - 11.30 WIB",
      venue: "Ruang Vicon BPS Sumut",
      status: "completed",
      zoomUrl: "https://zoom.us/j/wego-bps-sumut",
      presensiUrl: "https://s.bps.go.id/presensi-wego-02",
      vbgUrl: "https://drive.google.com/file/d/vbg-sample-02/view",
      slideUrl: "https://drive.google.com/file/d/slide-sample-02/view",
      deckUrl: "https://drive.google.com/file/d/slide-sample-02/view",
      videoUrl: "https://youtube.com/watch?v=rekaman-wego-02"
    },
    {
      id: "sem-3",
      title: "Otomasi Rekonsiliasi Data PDRB Menggunakan R Shiny",
      desc: "Pengembangan dashboard interaktif untuk mempercepat rekonsiliasi angka PDRB antar kabupaten/kota dengan deteksi inkonsistensi otomatis.",
      thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      speaker: "Lexie Siregar",
      speakerRole: "Statistisi Ahli Pertama • BPS Prov. Sumut",
      date: "Rabu, 25 Februari 2026",
      time: "13.30 - 15.30 WIB",
      venue: "Zoom Cloud Meetings",
      status: "completed",
      zoomUrl: "https://zoom.us/j/wego-bps-sumut",
      presensiUrl: "https://s.bps.go.id/presensi-wego-03",
      vbgUrl: "https://drive.google.com/file/d/vbg-sample-03/view",
      slideUrl: "https://drive.google.com/file/d/slide-sample-03/view",
      deckUrl: "https://drive.google.com/file/d/slide-sample-03/view",
      videoUrl: "https://youtube.com/watch?v=rekaman-wego-03"
    }
  ],
  templates: [
    {
      id: "tpl-1",
      title: "Official Wego Slide Deck PPTX",
      desc: "Template presentasi berstandar BPS dengan tipografi editorial bersih, bagan terstruktur, dan tata letak minimalis.",
      tag: "PPTX",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tpl-2",
      title: "Starter Pack Web Scraping Python",
      desc: "Skrip template BeautifulSoup & Pandas siap pakai untuk pemantauan harga pasar dan berita daerah.",
      tag: "Python",
      price: "Kode Terbuka",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tpl-3",
      title: "Lembar Kerja Evaluasi (LKE) ZI Mandiri",
      desc: "Spreadsheet panduan mandiri penilaian 6 area perubahan Reformasi Birokrasi menuju predikat WBK.",
      tag: "Excel",
      price: "Internal BPS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ],
  communityAds: [
    {
      type: "Usulan Topik",
      location: "BPS Kab. Asahan",
      text: "Ingin mempelajari otomasi rekonsiliasi data PDRB dengan Python. Rekan yang memiliki pengalaman dipersilakan berbagi di sesi mendatang.",
      action: "Dukung Topik →"
    },
    {
      type: "Siap Berbagi",
      location: "BPS Prov. Sumut",
      text: "Membuka sesi bedah teknis dashboard visualisasi Tableau dan Power BI untuk publikasi daerah dalam angka.",
      action: "Hubungi Pemateri →"
    },
    {
      type: "Pojok RB",
      location: "BPS Kab. Karo",
      text: "Praktik baik inovasi pelayanan statistik terpadu ramah disabilitas dan digitalisasi buku tamu survei.",
      action: "Lihat Bukti Dukung →"
    },
    {
      type: "Pengumuman",
      location: "Sekretariat Tim RB",
      text: "Jadwal pendaftaran narasumber sesi Wego Q1 telah dibuka. Setiap satker didorong mengajukan minimal 1 gagasan unggulan.",
      action: "Daftar Sekarang →"
    }
  ],
  regionalGems: [
    {
      title: "Portal Satu Data Sumut",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      tags: ["portal", "integrasi data", "provinsi"]
    },
    {
      title: "Dashboard Pemantauan Inflasi",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      tags: ["data science", "monitoring", "visualisasi"]
    }
  ],
  galleryPhotos: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80"
  ]
};

/**
 * Unwraps and parses JSON from Google Visualization API callback wrapper
 */
export function parseGvizResponse(rawText) {
  const jsonStart = rawText.indexOf('{');
  const jsonEnd = rawText.lastIndexOf('}');
  
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Invalid GViz response format from Google Sheets');
  }

  const jsonString = rawText.substring(jsonStart, jsonEnd + 1);
  const payload = JSON.parse(jsonString);

  if (payload.status !== 'ok') {
    throw new Error(`GViz API error: ${payload.errors ? JSON.stringify(payload.errors) : payload.status}`);
  }

  const table = payload.table;
  const cols = table.cols || [];
  let rows = table.rows || [];

  // Check if cols have meaningful labels (or just generic column letters A, B, C...)
  const hasColLabels = cols.some(col => col.label && col.label.trim().length > 0);
  
  let headers = [];
  if (!hasColLabels && rows.length > 0) {
    // Check if the first row values are string headers
    const firstRowVals = (rows[0].c || []).map(cell => cell && cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : '');
    const looksLikeHeader = firstRowVals.some(val => {
      const clean = val.toLowerCase().replace(/[\s_-]+/g, '');
      return Boolean(INVERTED_HEADER_LOOKUP[clean]) || ['id', 'nama', 'judul', 'satker', 'kategori', 'keterangan'].includes(clean);
    });
    if (looksLikeHeader) {
      headers = firstRowVals;
      rows = rows.slice(1);
    }
  }

  if (headers.length === 0) {
    headers = cols.map((col, idx) => {
      if (col.label && col.label.trim()) {
        return col.label.trim();
      }
      return col.id || `col_${idx}`;
    });
  }

  return rows.map(row => {
    const item = {};
    headers.forEach((header, idx) => {
      if (!header) return;
      const cell = row.c && row.c[idx] ? row.c[idx] : null;
      let val = null;
      if (cell) {
        if (cell.f && typeof cell.v === 'string' && cell.v.startsWith('Date(')) {
          val = cell.f;
        } else if (cell.v !== null && cell.v !== undefined) {
          val = cell.v;
        } else if (cell.f) {
          val = cell.f;
        }
      }
      if (typeof val === 'string' && val.includes('drive.google.com')) {
        val = convertDriveUrl(val);
      }
      const canonicalKey = normalizeHeader(header);
      item[canonicalKey] = val;
      if (canonicalKey !== header) {
        item[header] = val;
      }
    });
    // Ensure symmetric compatibility between alias properties
    if (item.thumb && !item.image) item.image = item.thumb;
    if (item.image && !item.thumb) item.thumb = item.image;
    if (item.slideUrl && !item.deckUrl) item.deckUrl = item.slideUrl;
    if (item.deckUrl && !item.slideUrl) item.slideUrl = item.deckUrl;
    return item;
  });
}

/**
 * Fetches a single sheet tab by name via GViz API
 */
export async function fetchSheetTab(sheetId, tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}&_t=${Date.now()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status} fetching tab ${tabName}`);
  const text = await res.text();
  return parseGvizResponse(text);
}

/**
 * Custom React hook to fetch live CMS data from Google Sheets across multiple tabs with instant fallback.
 */
export function useWegoData(sheetId) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sheetId) return;

    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          fetchSheetTab(sheetId, 'Seminars'),
          fetchSheetTab(sheetId, 'Speakers'),
          fetchSheetTab(sheetId, 'CommunityAds'),
          fetchSheetTab(sheetId, 'Gallery')
        ]);

        if (!isMounted) return;

        const updates = {};
        const errors = [];

        // Tab 0: Seminars
        if (results[0].status === 'fulfilled' && Array.isArray(results[0].value) && results[0].value.length > 0) {
          updates.seminars = results[0].value.map(sem => ({
            ...sem,
            thumb: sem.thumb || sem.image,
            image: sem.image || sem.thumb,
            status: sem.status ? String(sem.status).toLowerCase() : 'upcoming'
          }));
        } else if (results[0].status === 'rejected') {
          errors.push(`Seminars: ${results[0].reason?.message || 'failed'}`);
        }

        // Tab 1: Speakers
        if (results[1].status === 'fulfilled' && Array.isArray(results[1].value) && results[1].value.length > 0) {
          updates.speakers = results[1].value.map(spk => ({
            ...spk,
            image: spk.image || spk.thumb
          }));
        } else if (results[1].status === 'rejected') {
          errors.push(`Speakers: ${results[1].reason?.message || 'failed'}`);
        }

        // Tab 2: CommunityAds
        if (results[2].status === 'fulfilled' && Array.isArray(results[2].value) && results[2].value.length > 0) {
          updates.communityAds = results[2].value.map(ad => ({
            type: ad.type || ad.kategori || 'Usulan Topik',
            location: ad.location || ad.satker || 'BPS Sumut',
            text: ad.text || ad.teks || '',
            action: ad.action || ad.aksi || 'Dukung Topik →'
          }));
        } else if (results[2].status === 'rejected') {
          errors.push(`CommunityAds: ${results[2].reason?.message || 'failed'}`);
        }

        // Tab 3: Gallery
        if (results[3].status === 'fulfilled' && Array.isArray(results[3].value) && results[3].value.length > 0) {
          const urls = results[3].value
            .map(row => row.foto_url || row.image || row.thumb || row.url || Object.values(row).find(v => typeof v === 'string' && (v.startsWith('http') || v.includes('drive.google.com'))))
            .filter(Boolean)
            .map(convertDriveUrl);
          if (urls.length > 0) {
            updates.galleryPhotos = urls;
          }
        } else if (results[3].status === 'rejected') {
          errors.push(`Gallery: ${results[3].reason?.message || 'failed'}`);
        }

        // Fallback for single-tab legacy spreadsheets (if all 4 multi-tab requests failed)
        if (Object.keys(updates).length === 0 && errors.length === 4) {
          const fallbackUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
          const fallbackRes = await fetch(fallbackUrl);
          if (fallbackRes.ok) {
            const fallbackText = await fallbackRes.text();
            const fallbackRecords = parseGvizResponse(fallbackText);
            if (fallbackRecords.length > 0) {
              if (fallbackRecords[0].title && (fallbackRecords[0].thumb || fallbackRecords[0].image)) {
                updates.seminars = fallbackRecords;
              } else if (fallbackRecords[0].name && fallbackRecords[0].satker) {
                updates.speakers = fallbackRecords;
              }
            }
          }
        }

        setData(prev => ({
          ...prev,
          ...updates
        }));

        if (errors.length > 0 && Object.keys(updates).length === 0) {
          setError(errors.join('; '));
        } else {
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.warn("[Wego Data] Using fallback curated data:", err.message);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [sheetId]);

  return { ...data, loading, error };
}
