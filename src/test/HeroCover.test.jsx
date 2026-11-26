import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroCover from '../components/HeroCover';

describe('HeroCover Component (Depth Parallax & Display Seam)', () => {
  it('renders brand wordmark, official title badge, and editorial subtitle', () => {
    render(<HeroCover />);

    expect(screen.getByRole('heading', { level: 1, name: /wego/i })).toBeInTheDocument();
    expect(screen.getByText(/Wadah Edukasi dan Gagasan Optimal • BPS Sumatera Utara/i)).toBeInTheDocument();
    expect(screen.getByText(/Ruang bertukar pikiran serta peningkatan kompetensi/i)).toBeInTheDocument();
  });

  it('renders parallax image wrapper with vertical bleed container', () => {
    const { container } = render(<HeroCover />);

    const heroImg = container.querySelector('img[alt="Wego BPS Sumatera Utara"]');
    expect(heroImg).toBeInTheDocument();
    expect(heroImg.closest('.hero-parallax-container')).toBeInTheDocument();
  });
});
