import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SeminarCatalog from '../components/SeminarCatalog';

describe('SeminarCatalog Component (Portrait Catalog & Modal Integration Seam)', () => {
  const mockSeminars = [
    {
      id: 'sem-1',
      title: 'Pemanfaatan Web Scraping & Machine Learning Harga Pangan',
      desc: 'Metode ekstraksi data harga komoditas dari portal online.',
      thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      speaker: 'Melody Hansen',
      speakerRole: 'Pranata Komputer • BPS Kab. Deli Serdang',
      date: 'Kamis, 15 April 2026',
      time: '09.00 - 11.30 WIB',
      venue: 'Zoom Cloud Meetings & Aula BPS Sumut',
      status: 'upcoming',
      zoomUrl: 'https://zoom.us/j/123456789',
      presensiUrl: 'https://s.bps.go.id/presensi-test-1',
      vbgUrl: 'https://drive.google.com/file/d/vbg-test/view',
      slideUrl: 'https://drive.google.com/file/d/slide-test/view',
      videoUrl: 'https://youtube.com/live'
    },
    {
      id: 'sem-2',
      title: 'Strategi Sukses Membangun Zona Integritas Menuju WBK/WBBM',
      desc: 'Langkah nyata implementasi 6 area perubahan Reformasi Birokrasi.',
      thumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      speaker: 'Michelle Pontvert',
      speakerRole: 'Statistisi Ahli Muda • BPS Kota Medan',
      date: 'Selasa, 10 Maret 2026',
      time: '09.00 - 11.30 WIB',
      venue: 'Ruang Vicon BPS Sumut',
      status: 'completed',
      zoomUrl: 'https://zoom.us/j/123456789',
      presensiUrl: 'https://s.bps.go.id/presensi-test-2',
      vbgUrl: 'https://drive.google.com/file/d/vbg-test-2/view',
      slideUrl: 'https://drive.google.com/file/d/slide-test-2/view',
      videoUrl: 'https://youtube.com/watch?v=rekaman'
    }
  ];

  it('renders section header, category kicker, and portrait cards for all seminars', () => {
    render(<SeminarCatalog seminars={mockSeminars} />);

    expect(screen.getByText(/Katalog Pembelajaran/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /sesi seminar/i })).toBeInTheDocument();
    expect(screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i)).toBeInTheDocument();
    expect(screen.getByText(/Strategi Sukses Membangun Zona Integritas Menuju WBK\/WBBM/i)).toBeInTheDocument();
    expect(screen.getByText(/Melody Hansen/i)).toBeInTheDocument();
    expect(screen.getByText(/Michelle Pontvert/i)).toBeInTheDocument();
  });

  it('opens SeminarDetailModal when a portrait card is clicked', () => {
    render(<SeminarCatalog seminars={mockSeminars} />);

    // Initially modal is not open
    expect(screen.queryByLabelText(/Tutup Detail/i)).not.toBeInTheDocument();

    // Click first seminar card
    const firstCardTitle = screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i);
    fireEvent.click(firstCardTitle);

    // Modal is now open displaying full details and action links
    expect(screen.getByLabelText(/Tutup Detail/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Presensi Kehadiran/i })).toHaveAttribute('href', 'https://s.bps.go.id/presensi-test-1');
    expect(screen.getByRole('link', { name: /Gabung Sesi Zoom/i })).toHaveAttribute('href', 'https://zoom.us/j/123456789');

    // Close modal
    fireEvent.click(screen.getByLabelText(/Tutup Detail/i));
    expect(screen.queryByLabelText(/Tutup Detail/i)).not.toBeInTheDocument();
  });

  it('renders carousel track and allows clicking next and previous arrow navigation buttons', () => {
    render(<SeminarCatalog seminars={mockSeminars} />);

    const carousel = screen.getByTestId('seminar-carousel');
    expect(carousel).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /Previous seminar/i });
    const nextBtn = screen.getByRole('button', { name: /Next seminar/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    // Verify buttons can be clicked without throwing errors
    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
  });
});
