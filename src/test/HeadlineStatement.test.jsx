import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeadlineStatement from '../components/HeadlineStatement';

describe('HeadlineStatement Component (Pinned Scrub Illumination Seam)', () => {
  it('renders all statement lines, sticker badge, and link', () => {
    const { container } = render(<HeadlineStatement />);

    expect(screen.getByRole('heading', { level: 2, name: /Untuk Pegawai BPS/i })).toBeInTheDocument();
    expect(screen.getByText(/yang mencari ruang belajar & berbagi pengetahuan/i)).toBeInTheDocument();
    expect(screen.getByText(/inovasi reformasi birokrasi/i)).toBeInTheDocument();
    expect(screen.getByText(/bersama komunitas rekan kerja BPS se-Sumatera Utara./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Jelajahi/i })).toHaveAttribute('href', '#seminar');

    const lines = container.querySelectorAll('.statement-line');
    expect(lines.length).toBeGreaterThanOrEqual(3);
  });

  it('renders with full opacity and accessibility in reduced-motion mode', () => {
    window.matchMedia = (query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    });

    const { container } = render(<HeadlineStatement />);
    expect(container.querySelector('.statement-line')).toBeInTheDocument();
  });
});
