import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SeminarDetailModal from '../components/SeminarDetailModal';

describe('SeminarDetailModal Component (Modal Interaction Seam)', () => {
  const mockSeminar = {
    id: 'sem-test',
    title: 'Pemanfaatan Web Scraping Harga Pangan',
    desc: 'Metode ekstraksi data harga komoditas dari portal online.',
    thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    speaker: 'Melody Hansen',
    speakerRole: 'Pranata Komputer • BPS Kab. Deli Serdang',
    date: 'Kamis, 15 April 2026',
    time: '09.00 - 11.30 WIB',
    venue: 'Zoom Cloud Meetings & Aula BPS Sumut',
    status: 'upcoming',
    zoomUrl: 'https://zoom.us/j/123456789',
    presensiUrl: 'https://s.bps.go.id/presensi-test',
    vbgUrl: 'https://drive.google.com/file/d/vbg-test/view',
    slideUrl: 'https://drive.google.com/file/d/slide-test/view',
    videoUrl: 'https://youtube.com/live'
  };

  it('does not render when isOpen is false or seminar is null', () => {
    const { container: c1 } = render(<SeminarDetailModal isOpen={false} seminar={mockSeminar} onClose={vi.fn()} />);
    expect(c1.firstChild).toBeNull();

    const { container: c2 } = render(<SeminarDetailModal isOpen={true} seminar={null} onClose={vi.fn()} />);
    expect(c2.firstChild).toBeNull();
  });

  it('renders complete operational details, schedule, and speaker profile', () => {
    render(<SeminarDetailModal isOpen={true} seminar={mockSeminar} onClose={vi.fn()} />);

    expect(screen.getByText('Pemanfaatan Web Scraping Harga Pangan')).toBeInTheDocument();
    expect(screen.getByText('Melody Hansen')).toBeInTheDocument();
    expect(screen.getByText(/Pranata Komputer • BPS Kab. Deli Serdang/i)).toBeInTheDocument();
    expect(screen.getByText(/Kamis, 15 April 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/09.00 - 11.30 WIB/i)).toBeInTheDocument();
    expect(screen.getByText(/Zoom Cloud Meetings & Aula BPS Sumut/i)).toBeInTheDocument();
    expect(screen.getByText(/Akan Datang/i)).toBeInTheDocument();
  });

  it('provides all actionable links: presensi, vbg, zoom/recording, and slides', () => {
    render(<SeminarDetailModal isOpen={true} seminar={mockSeminar} onClose={vi.fn()} />);

    const presensiLink = screen.getByRole('link', { name: /Presensi Kehadiran/i });
    expect(presensiLink).toHaveAttribute('href', 'https://s.bps.go.id/presensi-test');
    expect(presensiLink).toHaveAttribute('target', '_blank');

    const vbgLink = screen.getByRole('link', { name: /Virtual Background/i });
    expect(vbgLink).toHaveAttribute('href', 'https://drive.google.com/file/d/vbg-test/view');
    expect(vbgLink).toHaveAttribute('target', '_blank');

    const zoomLink = screen.getByRole('link', { name: /Gabung Sesi Zoom/i });
    expect(zoomLink).toHaveAttribute('href', 'https://zoom.us/j/123456789');

    const slideLink = screen.getByRole('link', { name: /Unduh Slide Materi/i });
    expect(slideLink).toHaveAttribute('href', 'https://drive.google.com/file/d/slide-test/view');
  });

  it('shows recording link when session status is completed', () => {
    const completedSeminar = {
      ...mockSeminar,
      status: 'completed',
      videoUrl: 'https://youtube.com/watch?v=rekaman'
    };

    render(<SeminarDetailModal isOpen={true} seminar={completedSeminar} onClose={vi.fn()} />);
    const videoLink = screen.getByRole('link', { name: /Tonton Rekaman/i });
    expect(videoLink).toHaveAttribute('href', 'https://youtube.com/watch?v=rekaman');
    expect(screen.getByText(/Selesai/i)).toBeInTheDocument();
  });

  it('calls onClose when close button (✕) is clicked', () => {
    const handleClose = vi.fn();
    render(<SeminarDetailModal isOpen={true} seminar={mockSeminar} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /Tutup Detail|✕/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking backdrop outside modal card', () => {
    const handleClose = vi.fn();
    const { container } = render(<SeminarDetailModal isOpen={true} seminar={mockSeminar} onClose={handleClose} />);

    const backdrop = container.querySelector('.fixed.inset-0');
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<SeminarDetailModal isOpen={true} seminar={mockSeminar} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
