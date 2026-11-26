import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

describe('App Full-Page Landmark & Navigation Integration (Highest Seam)', () => {
  it('renders all core editorial sections without layout crash or error', () => {
    const { container } = render(<App />);

    // 1. Hero Brand Wordmark & Official Title
    expect(screen.getByRole('heading', { level: 1, name: /wegoberbagi/i })).toBeInTheDocument();
    expect(screen.getByText(/Wadah Edukasi dan Gagasan Optimal • BPS Sumatera Utara/i)).toBeInTheDocument();

    // 2. Statement Headline
    expect(screen.getByRole('heading', { level: 2, name: /Untuk Pegawai BPS/i })).toBeInTheDocument();

    // 3. Profiles (Wegoers)
    expect(screen.getByText(/Profil Narasumber/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Lexie Siregar/i).length).toBeGreaterThan(0);

    // 4. Seminars
    expect(screen.getByText(/Katalog Pembelajaran/i)).toBeInTheDocument();
    expect(screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i)).toBeInTheDocument();

    // 5. Mid Banner CTA
    expect(screen.getByText(/Inovasi Bersama/i)).toBeInTheDocument();

    // 6. Templates (Pojok Unduhan hidden)
    expect(screen.queryByText(/Official Wego Slide Deck PPTX/i)).not.toBeInTheDocument();

    // 7. Community Board & Marquee Ticker
    expect(screen.getByText(/BPS Kab. Asahan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pita Pengumuman Berjalan Wego-RB/i)).toBeInTheDocument();

    // 8. Regional Innovations (Inspirasi & Rujukan hidden)
    expect(screen.queryByText(/Inspirasi & Rujukan/i)).not.toBeInTheDocument();

    // 9. Social Gallery
    expect(screen.getByText(/@bpsprovsumut/i)).toBeInTheDocument();

    // 10. Footer
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('verifies all navigation links correspond to valid section anchor targets', () => {
    const { container } = render(<App />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();

    const expectedAnchors = ['#seminar', '#profiles', '#ads'];

    expectedAnchors.forEach((hash) => {
      const link = nav.querySelector(`a[href="${hash}"]`);
      expect(link).toBeInTheDocument();
      
      const targetId = hash.replace('#', '');
      const targetElement = container.querySelector(`#${targetId}`);
      expect(targetElement).toBeInTheDocument();
    });
  });

  it('completes the newsletter subscription flow in the footer', () => {
    const { container } = render(<App />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();

    const emailInput = within(footer).getByPlaceholderText(/Masukkan alamat email/i);
    const subscribeBtn = within(footer).getByRole('button', { name: /Berlangganan/i });

    fireEvent.change(emailInput, { target: { value: 'insan.statistik@bps.go.id' } });
    fireEvent.click(subscribeBtn);

    expect(within(footer).getByText(/Terima kasih telah bergabung!/i)).toBeInTheDocument();
  });

  it('opens submission modal when trigger buttons across sections are clicked', () => {
    render(<App />);

    // Initially modal is closed
    expect(screen.queryByText(/Kirimkan Gagasan atau Daftar Pemateri/i)).not.toBeInTheDocument();

    // Click banner CTA button
    const bannerCta = screen.getByRole('button', { name: /Kirimkan Gagasan Inovasi Anda →/i });
    fireEvent.click(bannerCta);

    // Modal is open
    expect(screen.getByText(/Kirimkan Gagasan atau Daftar Pemateri/i)).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /✕/i });
    fireEvent.click(closeBtn);

    // Modal is closed
    expect(screen.queryByText(/Kirimkan Gagasan atau Daftar Pemateri/i)).not.toBeInTheDocument();
  });

  it('opens SeminarDetailModal when a portrait seminar card is clicked in App', () => {
    render(<App />);

    expect(screen.queryByLabelText(/Tutup Detail/i)).not.toBeInTheDocument();

    const seminarCard = screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i);
    fireEvent.click(seminarCard);

    expect(screen.getByLabelText(/Tutup Detail/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Presensi Kehadiran/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Virtual Background/i })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Tutup Detail/i));
    expect(screen.queryByLabelText(/Tutup Detail/i)).not.toBeInTheDocument();
  });

  it('navigates seamlessly between Landing Page and Arsip Sesi Wego via hash routing', () => {
    window.location.hash = '';
    render(<App />);

    // Initially on landing page
    expect(screen.getByRole('heading', { level: 1, name: /wegoberbagi/i })).toBeInTheDocument();
    expect(screen.getByText(/Lihat Semua Sesi ↗/i)).toHaveAttribute('href', '#/sesi');

    // Simulate navigation to #/sesi
    window.location.hash = '#/sesi';
    fireEvent(window, new HashChangeEvent('hashchange'));

    // Archive view should now be displayed
    expect(screen.getByRole('heading', { level: 1, name: /Arsip Sesi Wego/i })).toBeInTheDocument();
    expect(screen.getByText(/Kembali ke Beranda/i)).toBeInTheDocument();

    // Navigate back to home
    window.location.hash = '';
    fireEvent(window, new HashChangeEvent('hashchange'));

    // Landing page is restored
    expect(screen.getByRole('heading', { level: 1, name: /wegoberbagi/i })).toBeInTheDocument();
  });
});
