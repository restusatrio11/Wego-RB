/**
 * Google Apps Script Webhook untuk Wego-RB (BPS Provinsi Sumatera Utara)
 * 
 * Fungsi: Menerima data Usulan Ide, Pendaftaran Pemateri, dan Evaluasi/Feedback Sesi Seminar
 * dari website Wego-RB dan menyimpannya secara otomatis ke spreadsheet.
 * 
 * CARA MEMASANG (HANYA 1 MENIT):
 * 1. Buka spreadsheet Wego-RB di Google Sheets.
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script".
 * 3. Hapus kode yang ada, lalu tempelkan (paste) seluruh kode di bawah ini.
 * 4. Klik tombol "Simpan" (ikon disket) atau Ctrl+S.
 * 5. Klik tombol biru "Terapkan" (Deploy) di kanan atas > "Penerapan baru" (New deployment).
 * 6. Klik ikon roda gigi di sebelah kiri "Pilih jenis" > pilih "Aplikasi Web" (Web app).
 * 7. Atur:
 *    - Deskripsi: Wego-RB Webhook
 *    - Jalankan sebagai: Saya (email Anda)
 *    - Yang memiliki akses: Siapa saja (Anyone) -> PENTING agar website bisa mengirim data.
 * 8. Klik "Terapkan" (Deploy) > Berikan izin (Review Permissions) jika diminta.
 * 9. Salin "URL Aplikasi Web" (contoh: https://script.google.com/macros/s/AKfycb.../exec).
 * 10. Masukkan URL tersebut ke file .env website Anda sebagai:
 *     VITE_SUBMISSION_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var contents = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    
    var timestamp = new Date();
    var name = contents.name || 'Anonim';
    var satker = contents.satker || 'BPS Sumut';
    var type = contents.type || 'Usulan Topik';
    var session = contents.sessionId || contents.session || '-';
    var score = contents.score || '-';
    var desc = contents.desc || contents.text || '';
    
    // Tentukan sheet tujuan berdasarkan kategori
    var isFeedback = type.toLowerCase().indexOf('evaluasi') !== -1 || type.toLowerCase().indexOf('feedback') !== -1;
    var targetSheetName = isFeedback ? "Feedback_Sesi" : "Submissions";
    
    var sheet = ss.getSheetByName(targetSheetName);
    if (!sheet) {
      sheet = ss.insertSheet(targetSheetName);
      if (isFeedback) {
        sheet.appendRow(["Timestamp", "Nama", "Satker", "Kategori", "Sesi Seminar", "Skor Penilaian (1-5)", "Masukan & Catatan"]);
      } else {
        sheet.appendRow(["Timestamp", "Nama", "Satker", "Kategori Partisipasi", "Deskripsi Gagasan / Usulan"]);
      }
      sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight("bold").setBackground("#F3F4F6");
      sheet.setFrozenRows(1);
    }
    
    // Simpan baris data
    if (isFeedback) {
      sheet.appendRow([timestamp, name, satker, type, session, score, desc]);
    } else {
      sheet.appendRow([timestamp, name, satker, type, desc]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data berhasil disimpan ke Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Wego-RB Webhook Endpoint Aktif."
  })).setMimeType(ContentService.MimeType.JSON);
}
