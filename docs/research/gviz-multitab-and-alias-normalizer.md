# Architecture Research: GViz Multi-Tab Parallel Fetching & Alias Normalizer

**Issue Reference**: [#32](https://github.com/restusatrio11/Wego-RB/issues/32) (Part of Map [#31](https://github.com/restusatrio11/Wego-RB/issues/31))  
**Branch**: `research/gviz-multitab-pipeline`  
**Status**: Recommended Architecture & Implementation Blueprint  

---

## 1. Context & Problem Statement

The Wego-RB landing page uses Google Sheets as a zero-cost, zero-API-key headless CMS. However, the initial single-tab implementation had critical architectural bottlenecks:
1. **Single Tab Limitation**: Only one default sheet was fetched. Data for speakers, seminars, community aspirasi, and documentation gallery could not be retrieved concurrently.
2. **Brittle Header Dependency**: Indonesian civil servants managing the sheet frequently vary column headers between Indonesian and English (`Judul` vs `title`, `Pemateri` vs `speaker`, `Link Presensi` vs `presensiUrl`, `Foto Flyer` vs `thumb`, etc.), causing silent binding failures in UI components.
3. **Lack of Tab-Level Fault Isolation**: If fetching fails on any non-critical tab, the entire application risked losing live updates and dropping back to static defaults.
4. **Data Shape Variations**: The `Gallery` section expects a plain `string[]` of URLs, while `CommunityAds` and `Seminars` expect structured entity records.

This research establishes the production-grade multi-tab parallel fetching architecture with deterministic header normalization and resilient fallback strategies.

---

## 2. Multi-Tab GViz Querying Architecture

### 2.1 The GViz Endpoint Structure
Google Visualization API serves individual tabs by title using:
```
https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}
```

**Key Parameters**:
- `tqx=out:json`: Returns a response formatted as JSON wrapped in `/*O_o*/\ngoogle.visualization.Query.setResponse({...});`.
- `sheet=${encodeURIComponent(sheetName)}`: Targets the worksheet by its human-readable title. This avoids numeric `gid`s that break when tabs are duplicated or moved.
- `_t=${Date.now()}`: Cache-buster timestamp parameter ensuring fresh content on reload without Google Sheets CDN latency.

### 2.2 Unwrapping the GViz Response
The GViz response format wraps data in a JavaScript callback. The parser unwraps the outer wrapper using substring extraction:
```javascript
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
```

---

## 3. Parallel Fetching & Fault Isolation with `Promise.allSettled`

### 3.1 Architectural Comparison: `Promise.all` vs `Promise.allSettled`

| Criterion | `Promise.all` | `Promise.allSettled` (Adopted) |
| :--- | :--- | :--- |
| **Failure Mode** | Short-circuits on first rejected promise | Awaits all requests regardless of individual tab status |
| **Fault Isolation** | None (1 tab error crashes all 4 tabs) | High (tab failures isolated to that specific dataset) |
| **Partial Updates** | Impossible (all or nothing) | Allowed (e.g. `Seminars` and `Speakers` update live while `Gallery` falls back) |
| **Resilience** | Brittle in multi-tab CMS | Production-grade robustness |

---

## 4. Header Alias Normalizer Design

### 4.1 Canonicalization Algorithm
Spreadsheet column headers undergo a two-step transformation:
1. **Sanitization**: Trim whitespace, lowercase, and strip punctuation/spaces/underscores/dashes:
   `cleaned = header.trim().toLowerCase().replace(/[\s_-]+/g, '')`
2. **Dictionary Lookup**: Map the cleaned token to its canonical entity property via an inverted index table.

### 4.2 Comprehensive Header Alias Dictionary

```javascript
export const HEADER_ALIAS_MAP = {
  // Title & Topics
  title: ['title', 'judul', 'topik', 'tema', 'sesi', 'namasesi', 'namaworkshop', 'namaacara', 'materiutama'],
  desc: ['desc', 'description', 'deskripsi', 'ringkasan', 'keterangan', 'detail', 'uraian'],

  // Speaker / Narasumber
  speaker: ['speaker', 'pemateri', 'narasumber', 'pembicara', 'namapemateri', 'namanarasumber', 'speakername', 'nama', 'name', 'wegoers'],
  speakerRole: ['speakerrole', 'role', 'jabatan', 'peran', 'posisi', 'unitkerja', 'satkerpemateri'],

  // Satker / Institution
  satker: ['satker', 'unitkerja', 'asalsatker', 'instansi', 'agency', 'kantor', 'lokasisatker'],

  // Date, Time, Venue & Status
  date: ['date', 'tanggal', 'tgl', 'hari'],
  time: ['time', 'waktu', 'jam', 'pukul'],
  venue: ['venue', 'tempat', 'lokasi', 'ruangan', 'platform'],
  status: ['status', 'state', 'statuskegiatan'],

  // Visual Assets & Posters
  thumb: ['thumb', 'thumbnail', 'flyer', 'fotoflyer', 'poster', 'cover', 'banner', 'gambaran', 'fotoposter'],
  image: ['image', 'foto', 'fotonarasumber', 'avatar', 'avatarurl', 'fotoprofil', 'profile', 'gambar', 'url', 'photourl'],

  // Operational URLs & Links
  presensiUrl: ['presensiurl', 'linkpresensi', 'presensi', 'daftarhadir', 'linkdaftarhadir', 'absen', 'absensi'],
  zoomUrl: ['zoomurl', 'linkzoom', 'zoom', 'linkmeeting', 'meetinglink', 'linkwebinar'],
  vbgUrl: ['vbgurl', 'linkvbg', 'virtualbackground', 'vbg', 'background'],
  slideUrl: ['slideurl', 'linkslide', 'materi', 'slide', 'bahantayang', 'deckurl', 'ppt', 'deck', 'filemateri'],
  videoUrl: ['videourl', 'linkrekaman', 'rekaman', 'video', 'youtube', 'recording', 'linkvideo', 'tautanvideo'],

  // Community Board Aspirations
  type: ['type', 'jenis', 'kategori', 'tipe', 'tag'],
  location: ['location', 'lokasi', 'satker', 'unitkerja', 'asalsatker'],
  text: ['text', 'teks', 'pesan', 'aspirasi', 'usulan', 'isi', 'ringkasangagasan'],
  action: ['action', 'aksi', 'tombol', 'cta', 'link', 'tautan']
};
```

---

## 5. Google Drive CDN Thumbnail Integration

Google Drive direct download links (`/uc?export=view&id=...`) are blocked by Google's anti-abuse and cookie barriers, resulting in HTTP 403 Forbidden or broken images.
The solution is Google's globally distributed high-resolution thumbnail caching service:
```javascript
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
```

When row headers are normalized, any field containing a Google Drive URL is processed through `convertDriveUrl`, automatically ensuring that flyers, avatar photos, virtual backgrounds, and gallery images render seamlessly in `<img>` tags.

---

## 6. Conclusion & Recommendation

The proposed architecture resolves all requirements of **Issue #32**:
- Zero additional bundle dependencies (100% native `fetch` and `JSON.parse`).
- Resilient multi-tab ingestion with independent fault boundaries via `Promise.allSettled`.
- Full compatibility with Indonesian terminology used across BPS Sumatera Utara work units.
- Robust Google Drive hotlinking mitigation.
