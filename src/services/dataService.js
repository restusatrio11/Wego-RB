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
      desc: "Metode ekstraksi data harga komoditas dari portal online menggunakan Python untuk melengkapi validasi data inflasi harian di 33 kabupaten/kota.",
      thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      videoUrl: "https://youtube.com",
      deckUrl: "https://drive.google.com"
    },
    {
      id: "sem-2",
      title: "Strategi Sukses Membangun Zona Integritas Menuju WBK/WBBM",
      desc: "Langkah nyata implementasi 6 area perubahan Reformasi Birokrasi dan panduan penyusunan Lembar Kerja Evaluasi yang aplikatif dan terukur.",
      thumb: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      videoUrl: "https://youtube.com",
      deckUrl: "https://drive.google.com"
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
  const headers = table.cols.map((col, idx) => {
    if (col.label && col.label.trim()) {
      return col.label.trim();
    }
    return col.id || `col_${idx}`;
  });

  return table.rows.map(row => {
    const item = {};
    headers.forEach((header, idx) => {
      let val = row.c && row.c[idx] ? row.c[idx].v : null;
      if (typeof val === 'string' && val.includes('drive.google.com')) {
        val = convertDriveUrl(val);
      }
      item[header] = val;
    });
    return item;
  });
}

/**
 * Custom React hook to fetch live CMS data from Google Sheets with instant fallback.
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
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const text = await res.text();
        const records = parseGvizResponse(text);

        if (isMounted && records && records.length > 0) {
          if (records[0].title && records[0].thumb) {
            setData(prev => ({
              ...prev,
              seminars: records
            }));
          } else if (records[0].name && records[0].satker) {
            setData(prev => ({
              ...prev,
              speakers: records
            }));
          }
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
