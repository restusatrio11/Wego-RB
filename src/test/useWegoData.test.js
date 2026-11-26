import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { parseGvizResponse, useWegoData, DEFAULT_DATA } from '../services/dataService';

describe('useWegoData & parseGvizResponse (GViz Data Pipeline Seam)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('parseGvizResponse', () => {
    it('unwraps setResponse JSON wrapper and parses columns/rows into clean objects', () => {
      const mockGviz = `/*O_o*/\ngoogle.visualization.Query.setResponse({
        "version": "0.6",
        "status": "ok",
        "table": {
          "cols": [
            {"id": "A", "label": "id", "type": "string"},
            {"id": "B", "label": "name", "type": "string"},
            {"id": "C", "label": "satker", "type": "string"},
            {"id": "D", "label": "role", "type": "string"},
            {"id": "E", "label": "image", "type": "string"}
          ],
          "rows": [
            {
              "c": [
                {"v": "spk-10"},
                {"v": "Dr. Pratama Siregar"},
                {"v": "BPS Prov. Sumut"},
                {"v": "Koordinator IPDS"},
                {"v": "https://drive.google.com/file/d/test-id-123/view"}
              ]
            }
          ]
        }
      });`;

      const result = parseGvizResponse(mockGviz);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('spk-10');
      expect(result[0].name).toBe('Dr. Pratama Siregar');
      expect(result[0].satker).toBe('BPS Prov. Sumut');
      expect(result[0].role).toBe('Koordinator IPDS');
      // Automatic Google Drive URL conversion to CDN thumbnail
      expect(result[0].image).toBe('https://drive.google.com/thumbnail?id=test-id-123&sz=w1200');
    });

    it('extracts all operational seminar fields and normalizes drive links', () => {
      const mockGviz = `google.visualization.Query.setResponse({
        "status": "ok",
        "table": {
          "cols": [
            {"id": "A", "label": "id", "type": "string"},
            {"id": "B", "label": "title", "type": "string"},
            {"id": "C", "label": "speaker", "type": "string"},
            {"id": "D", "label": "speakerRole", "type": "string"},
            {"id": "E", "label": "date", "type": "string"},
            {"id": "F", "label": "time", "type": "string"},
            {"id": "G", "label": "venue", "type": "string"},
            {"id": "H", "label": "status", "type": "string"},
            {"id": "I", "label": "thumb", "type": "string"},
            {"id": "J", "label": "vbgUrl", "type": "string"},
            {"id": "K", "label": "presensiUrl", "type": "string"},
            {"id": "L", "label": "zoomUrl", "type": "string"},
            {"id": "M", "label": "slideUrl", "type": "string"}
          ],
          "rows": [
            {
              "c": [
                {"v": "sem-100"},
                {"v": "Workshop Inovasi Pelayanan Publik"},
                {"v": "Dr. Pratama Siregar"},
                {"v": "Koordinator IPDS"},
                {"v": "Kamis, 15 April 2026"},
                {"v": "09.00 - 11.30 WIB"},
                {"v": "Zoom Cloud Meetings"},
                {"v": "upcoming"},
                {"v": "https://drive.google.com/file/d/flyer-drive-id/view"},
                {"v": "https://drive.google.com/file/d/vbg-drive-id/view"},
                {"v": "https://s.bps.go.id/presensi-test"},
                {"v": "https://zoom.us/j/12345"},
                {"v": "https://drive.google.com/file/d/slide-drive-id/view"}
              ]
            }
          ]
        }
      });`;

      const result = parseGvizResponse(mockGviz);
      expect(result).toHaveLength(1);
      const sem = result[0];
      expect(sem.id).toBe('sem-100');
      expect(sem.title).toBe('Workshop Inovasi Pelayanan Publik');
      expect(sem.speaker).toBe('Dr. Pratama Siregar');
      expect(sem.date).toBe('Kamis, 15 April 2026');
      expect(sem.time).toBe('09.00 - 11.30 WIB');
      expect(sem.venue).toBe('Zoom Cloud Meetings');
      expect(sem.status).toBe('upcoming');
      expect(sem.thumb).toBe('https://drive.google.com/thumbnail?id=flyer-drive-id&sz=w1200');
      expect(sem.vbgUrl).toBe('https://drive.google.com/thumbnail?id=vbg-drive-id&sz=w1200');
      expect(sem.presensiUrl).toBe('https://s.bps.go.id/presensi-test');
      expect(sem.zoomUrl).toBe('https://zoom.us/j/12345');
    });

    it('throws an error on malformed or invalid GViz string', () => {
      expect(() => parseGvizResponse('invalid-data-string')).toThrow(/Invalid GViz response format/);
    });

    it('throws when payload status is error', () => {
      const errorGviz = `google.visualization.Query.setResponse({ "status": "error", "errors": [{"message": "Sheet not found"}] });`;
      expect(() => parseGvizResponse(errorGviz)).toThrow(/GViz API error/);
    });
  });

  describe('useWegoData hook lifecycle & resilience', () => {
    it('returns DEFAULT_DATA immediately with loading=false when sheetId is empty', () => {
      const { result } = renderHook(() => useWegoData(''));
      expect(result.current.loading).toBe(false);
      expect(result.current.speakers).toEqual(DEFAULT_DATA.speakers);
      expect(result.current.seminars).toEqual(DEFAULT_DATA.seminars);
      expect(result.current.seminars[0]).toHaveProperty('speaker');
      expect(result.current.seminars[0]).toHaveProperty('date');
      expect(result.current.seminars[0]).toHaveProperty('time');
      expect(result.current.seminars[0]).toHaveProperty('venue');
      expect(result.current.seminars[0]).toHaveProperty('status');
      expect(result.current.seminars[0]).toHaveProperty('presensiUrl');
      expect(result.current.seminars[0]).toHaveProperty('vbgUrl');
      expect(result.current.seminars[0]).toHaveProperty('zoomUrl');
      expect(result.current.error).toBe(null);
    });

    it('falls back to DEFAULT_DATA without throwing when network fails (500)', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const { result } = renderHook(() => useWegoData('test-sheet-id'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Validates fallback resilience
      expect(result.current.speakers).toEqual(DEFAULT_DATA.speakers);
      expect(result.current.seminars).toEqual(DEFAULT_DATA.seminars);
      expect(result.current.error).toBeTruthy();
    });

    it('fetches and updates state when Google Sheets returns valid payload', async () => {
      const mockPayload = `google.visualization.Query.setResponse({
        "status": "ok",
        "table": {
          "cols": [
            {"id": "A", "label": "id", "type": "string"},
            {"id": "B", "label": "title", "type": "string"},
            {"id": "C", "label": "desc", "type": "string"},
            {"id": "D", "label": "thumb", "type": "string"},
            {"id": "E", "label": "videoUrl", "type": "string"},
            {"id": "F", "label": "deckUrl", "type": "string"}
          ],
          "rows": [
            {
              "c": [
                {"v": "sem-99"},
                {"v": "Otomasi Satu Data Indonesia"},
                {"v": "Integrasi metadata sektoral"},
                {"v": "https://drive.google.com/d/live-thumb-id"},
                {"v": "https://youtube.com/live"},
                {"v": "https://drive.google.com/file/d/slide-id/view"}
              ]
            }
          ]
        }
      });`;

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: async () => mockPayload
      });

      const { result } = renderHook(() => useWegoData('valid-sheet-id'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.seminars[0].id).toBe('sem-99');
      expect(result.current.seminars[0].title).toBe('Otomasi Satu Data Indonesia');
      expect(result.current.seminars[0].thumb).toBe('https://drive.google.com/thumbnail?id=live-thumb-id&sz=w1200');
    });
  });
});
