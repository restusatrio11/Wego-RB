import { describe, it, expect } from 'vitest';
import { convertDriveUrl } from '../services/dataService';

describe('convertDriveUrl (Google Drive CDN Transformer Seam)', () => {
  it('converts standard Google Drive /file/d/{id}/view share links into thumbnail CDN URL', () => {
    const input = 'https://drive.google.com/file/d/1A2b3C4d5E_6F-xyz/view?usp=sharing';
    const expected = 'https://drive.google.com/thumbnail?id=1A2b3C4d5E_6F-xyz&sz=w1200';
    expect(convertDriveUrl(input)).toBe(expected);
  });

  it('converts Google Drive query parameter links id={id} into thumbnail CDN URL', () => {
    const input = 'https://drive.google.com/open?id=1A2b3C4d5E_6F-xyz';
    const expected = 'https://drive.google.com/thumbnail?id=1A2b3C4d5E_6F-xyz&sz=w1200';
    expect(convertDriveUrl(input)).toBe(expected);
  });

  it('converts Google Drive short /d/{id} links into thumbnail CDN URL', () => {
    const input = 'https://drive.google.com/d/1A2b3C4d5E_6F-xyz';
    const expected = 'https://drive.google.com/thumbnail?id=1A2b3C4d5E_6F-xyz&sz=w1200';
    expect(convertDriveUrl(input)).toBe(expected);
  });

  it('converts uc?id={id}&export=download links into thumbnail CDN URL', () => {
    const input = 'https://drive.google.com/uc?id=1A2b3C4d5E_6F-xyz&export=download';
    const expected = 'https://drive.google.com/thumbnail?id=1A2b3C4d5E_6F-xyz&sz=w1200';
    expect(convertDriveUrl(input)).toBe(expected);
  });

  it('preserves non-Google Drive URLs untouched', () => {
    const unsplash = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700';
    expect(convertDriveUrl(unsplash)).toBe(unsplash);
    
    const localAsset = '/images/banner.jpg';
    expect(convertDriveUrl(localAsset)).toBe(localAsset);
  });

  it('handles edge cases gracefully without throwing errors', () => {
    expect(convertDriveUrl(null)).toBe(null);
    expect(convertDriveUrl(undefined)).toBe(undefined);
    expect(convertDriveUrl('')).toBe('');
    expect(convertDriveUrl(12345)).toBe(12345);
    expect(convertDriveUrl('https://drive.google.com/invalid-path')).toBe('https://drive.google.com/invalid-path');
  });
});
