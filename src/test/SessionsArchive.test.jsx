import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SessionsArchive from '../components/SessionsArchive';

const MOCK_SEMINARS = [
  {
    id: 's-1',
    title: 'Pemanfaatan Web Scraping & Machine Learning Harga Pangan',
    speaker: 'Lexie Siregar',
    satker: 'BPS Prov. Sumut',
    speakerRole: 'Data Scientist / IPDS',
    date: 'Jumat, 15 November 2024',
    time: '09:00 - 11:30 WIB',
    status: 'completed',
    venue: 'Online via Zoom',
    presensiUrl: 'https://s.bps.go.id/presensi-1',
    vbgUrl: 'https://drive.google.com/vbg-1',
    zoomUrl: 'https://youtube.com/watch?v=1',
    slideUrl: 'https://drive.google.com/slide-1'
  },
  {
    id: 's-2',
    title: 'Modernisasi Survei Pertanian Berbasis Citra Satelit',
    speaker: 'Michelle Pontvert',
    satker: 'BPS Kota Medan',
    speakerRole: 'Statistisi Ahli Muda',
    date: 'Jumat, 29 November 2024',
    time: '09:00 - 11:30 WIB',
    status: 'upcoming',
    venue: 'Online via Zoom',
    presensiUrl: 'https://s.bps.go.id/presensi-2',
    vbgUrl: 'https://drive.google.com/vbg-2',
    zoomUrl: 'https://zoom.us/j/2',
    slideUrl: 'https://drive.google.com/slide-2'
  },
  {
    id: 's-3',
    title: 'Otomasi Pengolahan Data dengan Python & RPA',
    speaker: 'Melody Hansen',
    satker: 'BPS Kab. Deli Serdang',
    speakerRole: 'Pranata Komputer',
    date: 'Jumat, 25 Oktober 2024',
    time: '09:00 - 11:30 WIB',
    status: 'completed',
    venue: 'Online via Zoom',
    presensiUrl: '',
    vbgUrl: '',
    zoomUrl: '',
    slideUrl: ''
  }
];

describe('SessionsArchive Component (All Sessions View Seam)', () => {
  it('renders archive header, navigation bar, and all cards', () => {
    const handleBack = vi.fn();
    render(<SessionsArchive seminars={MOCK_SEMINARS} onNavigateHome={handleBack} />);

    expect(screen.getByText(/Kembali ke Beranda/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Arsip Sesi Wego/i })).toBeInTheDocument();
    expect(screen.getByText(/Menampilkan 3 dari 3 sesi pembelajaran/i)).toBeInTheDocument();

    // Upcoming session should be present
    expect(screen.getByText(/Modernisasi Survei Pertanian Berbasis Citra Satelit/i)).toBeInTheDocument();
    // Completed sessions should be present
    expect(screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i)).toBeInTheDocument();
  });

  it('invokes onNavigateHome when clicking Kembali ke Beranda button', () => {
    const handleBack = vi.fn();
    render(<SessionsArchive seminars={MOCK_SEMINARS} onNavigateHome={handleBack} />);

    fireEvent.click(screen.getByText(/Kembali ke Beranda/i));
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('filters sessions by status tab (Akan Datang and Selesai)', () => {
    render(<SessionsArchive seminars={MOCK_SEMINARS} />);

    // Click 'Akan Datang' tab
    fireEvent.click(screen.getByRole('tab', { name: /Akan Datang/i }));

    expect(screen.getByText(/Menampilkan 1 dari 3 sesi pembelajaran/i)).toBeInTheDocument();
    expect(screen.getByText(/Modernisasi Survei Pertanian Berbasis Citra Satelit/i)).toBeInTheDocument();
    expect(screen.queryByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i)).not.toBeInTheDocument();

    // Click 'Selesai' tab
    fireEvent.click(screen.getByRole('tab', { name: /Selesai/i }));

    expect(screen.getByText(/Menampilkan 2 dari 3 sesi pembelajaran/i)).toBeInTheDocument();
    expect(screen.queryByText(/Modernisasi Survei Pertanian Berbasis Citra Satelit/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i)).toBeInTheDocument();

    // Click 'Semua' tab
    fireEvent.click(screen.getByRole('tab', { name: /Semua/i }));
    expect(screen.getByText(/Menampilkan 3 dari 3 sesi pembelajaran/i)).toBeInTheDocument();
  });

  it('filters sessions in realtime via search input', () => {
    render(<SessionsArchive seminars={MOCK_SEMINARS} />);

    const searchInput = screen.getByPlaceholderText(/Cari topik, pemateri, atau satker.../i);

    // Search by satker
    fireEvent.change(searchInput, { target: { value: 'Deli Serdang' } });

    expect(screen.getByText(/Menampilkan 1 dari 3 sesi pembelajaran/i)).toBeInTheDocument();
    expect(screen.getByText(/Otomasi Pengolahan Data dengan Python & RPA/i)).toBeInTheDocument();
    expect(screen.queryByText(/Modernisasi Survei Pertanian/i)).not.toBeInTheDocument();
  });

  it('displays editorial empty state with reset button when no sessions match', () => {
    render(<SessionsArchive seminars={MOCK_SEMINARS} />);

    const searchInput = screen.getByPlaceholderText(/Cari topik, pemateri, atau satker.../i);

    fireEvent.change(searchInput, { target: { value: 'kata-kunci-tidak-ada-12345' } });

    expect(screen.getByText(/Tidak Ada Sesi yang Ditemukan/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tampilkan Semua Sesi ↺/i })).toBeInTheDocument();

    // Click reset
    fireEvent.click(screen.getByRole('button', { name: /Tampilkan Semua Sesi ↺/i }));

    expect(screen.getByText(/Menampilkan 3 dari 3 sesi pembelajaran/i)).toBeInTheDocument();
  });

  it('opens SeminarDetailModal when clicking any portrait session card', () => {
    render(<SessionsArchive seminars={MOCK_SEMINARS} />);

    const cardButton = screen.getByRole('button', {
      name: /Buka rincian sesi Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i
    });

    fireEvent.click(cardButton);

    // Modal dialog should be visible with action links
    expect(screen.getByRole('dialog', { name: /Rincian Operasional Sesi/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Presensi Kehadiran ↗/i })).toHaveAttribute(
      'href',
      'https://s.bps.go.id/presensi-1'
    );
  });
});
