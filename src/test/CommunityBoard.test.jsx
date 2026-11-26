import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CommunityBoard from '../components/CommunityBoard';

describe('CommunityBoard Component (Aspiration Carousel Seam)', () => {
  const mockAds = [
    {
      type: 'Usulan Topik',
      location: 'BPS Kab. Asahan',
      text: 'Ingin mempelajari otomasi rekonsiliasi data PDRB dengan Python.'
    },
    {
      type: 'Praktik Baik',
      location: 'BPS Kota Medan',
      text: 'Siap berbagi pengalaman implementasi ZI WBK WBBM dan inovasi pelayanan.'
    }
  ];

  it('renders section header, aspiration cards, and opens modal', () => {
    const handleOpenModal = vi.fn();
    render(<CommunityBoard communityAds={mockAds} onOpenModal={handleOpenModal} />);

    expect(screen.getByText(/Papan Gagasan Bersama/i)).toBeInTheDocument();
    expect(screen.getByText(/Kotak/i)).toBeInTheDocument();
    expect(screen.getByText(/BPS Kab. Asahan/i)).toBeInTheDocument();
    expect(screen.getByText(/BPS Kota Medan/i)).toBeInTheDocument();

    const cta = screen.getByRole('button', { name: /Pasang Usulan Anda/i });
    fireEvent.click(cta);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  it('renders carousel track with responsive cards and functional arrow controls', () => {
    render(<CommunityBoard communityAds={mockAds} onOpenModal={vi.fn()} />);

    const carousel = screen.getByTestId('community-carousel');
    expect(carousel).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /Previous gagasan/i });
    const nextBtn = screen.getByRole('button', { name: /Next gagasan/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
  });
});
