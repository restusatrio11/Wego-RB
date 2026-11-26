import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarqueeTicker from '../components/MarqueeTicker';

describe('MarqueeTicker Component (Multi-Row Continuous Motion Seam)', () => {
  it('renders all three marquee rows with editorial typography and badges', () => {
    render(<MarqueeTicker onOpenModal={vi.fn()} />);

    // Row 1 items
    expect(screen.getAllByText(/Wego Berbagi bersama Insan BPS Sumatera Utara/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Wadah Edukasi dan Gagasan Optimal/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ikuti Sesi/i).length).toBeGreaterThan(0);

    // Row 2 items
    expect(screen.getAllByText(/katalog inovasi satker BPS se-Sumatera Utara/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/bagikan praktik baik di unit kerja anda./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/akselerasi reformasi birokrasi & zona integritas/i).length).toBeGreaterThan(0);

    // Row 3 items
    expect(screen.getAllByText(/Setiap hari kerja sebelum kurasi sesi./i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Ajukan Usulan ↗/i }).length).toBeGreaterThan(0);
  });

  it('triggers onOpenModal when clicking Ajukan Usulan CTA buttons', () => {
    const handleOpenModal = vi.fn();
    render(<MarqueeTicker onOpenModal={handleOpenModal} />);

    const ctaButtons = screen.getAllByRole('button', { name: /Ajukan Usulan ↗/i });
    expect(ctaButtons.length).toBeGreaterThan(0);

    fireEvent.click(ctaButtons[0]);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
