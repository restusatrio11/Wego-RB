import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SubmissionModal from '../components/SubmissionModal';

describe('SubmissionModal Component (User Interaction Seam)', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<SubmissionModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with required inputs and labels when isOpen is true', () => {
    render(<SubmissionModal isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByText(/Kirimkan Gagasan atau Daftar Pemateri/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Pratama Siregar/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kabupaten Langkat/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Kirimkan Sekarang/i })).toBeInTheDocument();
  });

  it('calls onClose when close button (✕) is clicked', () => {
    const handleClose = vi.fn();
    render(<SubmissionModal isOpen={true} onClose={handleClose} />);
    
    const closeBtn = screen.getByRole('button', { name: /✕/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal dialog (backdrop)', () => {
    const handleClose = vi.fn();
    const { container } = render(<SubmissionModal isOpen={true} onClose={handleClose} />);
    
    const backdrop = container.querySelector('.fixed.inset-0');
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<SubmissionModal isOpen={true} onClose={handleClose} />);
    
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('shows success feedback and calls onClose after form submission', async () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    render(<SubmissionModal isOpen={true} onClose={handleClose} />);
    
    const nameInput = screen.getByPlaceholderText(/Pratama Siregar/i);
    const satkerInput = screen.getByPlaceholderText(/Kabupaten Langkat/i);
    const descInput = screen.getByPlaceholderText(/Tuliskan gagasan/i);
    const submitBtn = screen.getByRole('button', { name: /Kirimkan Sekarang/i });

    fireEvent.change(nameInput, { target: { value: 'Budi Santoso' } });
    fireEvent.change(satkerInput, { target: { value: 'BPS Kab. Asahan' } });
    fireEvent.change(descInput, { target: { value: 'Usulan materi otomatisasi PDRB dengan Python' } });

    fireEvent.click(submitBtn);

    expect(screen.getByText(/Gagasan Berhasil Terkirim!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2100);
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('renders session select and interactive star rating when choosing Evaluasi Sesi Seminar', () => {
    const mockSeminars = [
      { id: 'sem-1', title: 'Web Scraping Harga Pangan', speaker: 'Lexie Siregar' }
    ];
    render(<SubmissionModal isOpen={true} onClose={vi.fn()} seminars={mockSeminars} />);

    const selectCategory = screen.getByRole('combobox');
    fireEvent.change(selectCategory, { target: { value: 'Evaluasi & Feedback Sesi Seminar' } });

    expect(screen.getByText(/Sesi yang Dievaluasi|Pilih Sesi yang Dinilai/i)).toBeInTheDocument();
    expect(screen.getByText(/Skor Penilaian Acara/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Beri skor 5 dari 5/i)).toBeInTheDocument();

    const star4 = screen.getByLabelText(/Beri skor 4 dari 5/i);
    fireEvent.click(star4);
    expect(screen.getByText(/4 \/ 5/i)).toBeInTheDocument();
  });

  it('renders locked session summary card when opened specifically with selectedSeminar', () => {
    const mockSeminar = {
      id: 'sem-1',
      title: 'Pemanfaatan Web Scraping & Machine Learning Harga Pangan',
      speaker: 'Lexie Siregar, S.Tr.Stat',
      satker: 'BPS Prov. Sumut'
    };
    render(
      <SubmissionModal 
        isOpen={true} 
        onClose={vi.fn()} 
        initialType="Evaluasi & Feedback Sesi Seminar"
        selectedSeminar={mockSeminar}
      />
    );

    expect(screen.getByText(/Sesi yang Dievaluasi:/i)).toBeInTheDocument();
    expect(screen.getByText(/Pemanfaatan Web Scraping & Machine Learning Harga Pangan/i)).toBeInTheDocument();
    expect(screen.getByText(/Lexie Siregar, S.Tr.Stat/i)).toBeInTheDocument();
    expect(screen.getByText(/Beri Nilai & Evaluasi Sesi Ini/i)).toBeInTheDocument();
  });
});
