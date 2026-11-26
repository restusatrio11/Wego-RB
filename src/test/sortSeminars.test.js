import { describe, it, expect } from 'vitest';
import { parseDateValue, extractSessionNumber, sortSeminarsNewestFirst } from '../services/dataService';

describe('sortSeminarsNewestFirst & parseDateValue (Chronological Sorting Seam)', () => {
  describe('parseDateValue', () => {
    it('parses Google Sheets GViz Date(YYYY, MM, DD) format', () => {
      const timestamp = parseDateValue('Date(2026, 9, 28)');
      const date = new Date(timestamp);
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(9); // October (0-indexed)
      expect(date.getDate()).toBe(28);
    });

    it('parses Indonesian string date format', () => {
      const timestamp = parseDateValue('Rabu, 28 Oktober 2026');
      const date = new Date(timestamp);
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(9); // October
      expect(date.getDate()).toBe(28);
    });

    it('parses DD/MM/YYYY slash format', () => {
      const timestamp = parseDateValue('15/04/2026');
      const date = new Date(timestamp);
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(3); // April
      expect(date.getDate()).toBe(15);
    });

    it('returns 0 for invalid or empty dates gracefully', () => {
      expect(parseDateValue(null)).toBe(0);
      expect(parseDateValue(undefined)).toBe(0);
      expect(parseDateValue('')).toBe(0);
      expect(parseDateValue('invalid-date-string')).toBe(0);
    });
  });

  describe('extractSessionNumber', () => {
    it('extracts numeric session identifiers', () => {
      expect(extractSessionNumber('WEGO-01')).toBe(1);
      expect(extractSessionNumber('WEGO-12')).toBe(12);
      expect(extractSessionNumber('sem-3')).toBe(3);
      expect(extractSessionNumber(null)).toBe(0);
    });
  });

  describe('sortSeminarsNewestFirst', () => {
    it('prioritizes upcoming sessions first, followed by newest completed sessions', () => {
      const input = [
        { id: 'WEGO-01', title: 'Sesi Oktober', date: '28 Oktober 2026', status: 'completed' },
        { id: 'WEGO-02', title: 'Sesi November', date: '15 November 2026', status: 'completed' },
        { id: 'WEGO-03', title: 'Sesi Desember (Upcoming)', date: '10 Desember 2026', status: 'upcoming' },
        { id: 'WEGO-04', title: 'Sesi Januari (Upcoming)', date: '15 Januari 2027', status: 'upcoming' }
      ];

      const sorted = sortSeminarsNewestFirst(input);

      // Upcoming first (soonest first)
      expect(sorted[0].id).toBe('WEGO-03');
      expect(sorted[1].id).toBe('WEGO-04');
      // Completed next (newest date first)
      expect(sorted[2].id).toBe('WEGO-02');
      expect(sorted[3].id).toBe('WEGO-01');
    });

    it('sorts multiple completed sessions by descending date (newest completed first)', () => {
      const input = [
        { id: 'WEGO-01', title: 'Sesi 1', date: '10 Januari 2026', status: 'completed' },
        { id: 'WEGO-02', title: 'Sesi 2', date: '25 Februari 2026', status: 'completed' },
        { id: 'WEGO-03', title: 'Sesi 3', date: '10 Maret 2026', status: 'completed' }
      ];

      const sorted = sortSeminarsNewestFirst(input);

      expect(sorted.map(s => s.id)).toEqual(['WEGO-03', 'WEGO-02', 'WEGO-01']);
    });

    it('falls back to ID descending when dates are missing or identical', () => {
      const input = [
        { id: 'WEGO-01', title: 'Sesi 1', status: 'completed' },
        { id: 'WEGO-03', title: 'Sesi 3', status: 'completed' },
        { id: 'WEGO-02', title: 'Sesi 2', status: 'completed' }
      ];

      const sorted = sortSeminarsNewestFirst(input);

      expect(sorted.map(s => s.id)).toEqual(['WEGO-03', 'WEGO-02', 'WEGO-01']);
    });

    it('handles empty or non-array inputs safely', () => {
      expect(sortSeminarsNewestFirst(null)).toEqual([]);
      expect(sortSeminarsNewestFirst(undefined)).toEqual([]);
      expect(sortSeminarsNewestFirst([])).toEqual([]);
    });
  });
});
