import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SpeakerProfiles from '../components/SpeakerProfiles';

const MOCK_SPEAKERS = [
  {
    id: '1',
    name: 'Lexie Siregar',
    satker: 'BPS Prov. Sumut',
    role: 'Data Scientist / IPDS',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
  },
  {
    id: '2',
    name: 'Michelle Pontvert',
    satker: 'BPS Kota Medan',
    role: 'Statistisi Ahli Muda / Tim RB',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
  },
  {
    id: '3',
    name: 'Melody Hansen',
    satker: 'BPS Kab. Deli Serdang',
    role: 'Pranata Komputer / Otomasi',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
  },
  {
    id: '4',
    name: 'Chelli Tampubolon',
    satker: 'BPS Kab. Toba',
    role: 'Analis SDM Aparatur / Pelayanan',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'
  }
];

describe('SpeakerProfiles Component (Auto-sliding Carousel Seam)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders section header, speaker counter, and initial cards', () => {
    render(<SpeakerProfiles speakers={MOCK_SPEAKERS} />);

    expect(screen.getByText(/Profil Narasumber/i)).toBeInTheDocument();
    expect(screen.getByText(/Kenali/i)).toBeInTheDocument();
    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Lexie Siregar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Michelle Pontvert/i).length).toBeGreaterThan(0);
  });

  it('advances slide automatically every 3.5 seconds', () => {
    render(<SpeakerProfiles speakers={MOCK_SPEAKERS} />);

    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3500);
    });

    expect(screen.getByText(/02 \/ 04/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3500);
    });

    expect(screen.getByText(/03 \/ 04/i)).toBeInTheDocument();
  });

  it('pauses auto-sliding when hovered and resumes on mouse leave', () => {
    render(<SpeakerProfiles speakers={MOCK_SPEAKERS} />);

    const carousel = screen.getByTestId('speaker-carousel');

    // Hover pauses
    fireEvent.mouseEnter(carousel);

    act(() => {
      vi.advanceTimersByTime(7000);
    });

    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();

    // Mouse leave resumes
    fireEvent.mouseLeave(carousel);

    act(() => {
      vi.advanceTimersByTime(3500);
    });

    expect(screen.getByText(/02 \/ 04/i)).toBeInTheDocument();
  });

  it('navigates forward and backward via arrow buttons', () => {
    render(<SpeakerProfiles speakers={MOCK_SPEAKERS} />);

    const nextBtn = screen.getByRole('button', { name: /Next speaker/i });
    const prevBtn = screen.getByRole('button', { name: /Previous speaker/i });

    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText(/02 \/ 04/i)).toBeInTheDocument();

    fireEvent.click(prevBtn);
    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();
  });

  it('respects prefers-reduced-motion by keeping carousel static', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    render(<SpeakerProfiles speakers={MOCK_SPEAKERS} />);

    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(10500);
    });

    // Should stay on slide 1
    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();
  });

  it('handles touch gestures for swiping slides', () => {
    render(<SpeakerProfiles speakers={MOCK_SPEAKERS} />);

    const carousel = screen.getByTestId('speaker-carousel');

    // Swipe left (next)
    fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 100 }] });

    expect(screen.getByText(/02 \/ 04/i)).toBeInTheDocument();

    // Swipe right (prev)
    fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 200 }] });

    expect(screen.getByText(/01 \/ 04/i)).toBeInTheDocument();
  });
});
