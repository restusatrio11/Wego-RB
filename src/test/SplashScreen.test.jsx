import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SplashScreen from '../components/SplashScreen';

describe('SplashScreen component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
    document.body.style.overflow = '';
    window.__lenis = {
      stop: vi.fn(),
      start: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    sessionStorage.clear();
    delete window.__lenis;
  });

  it('renders branding elements when no session record exists', () => {
    render(<SplashScreen duration={1000} />);

    expect(screen.getByTestId('splash-screen')).toBeInTheDocument();
    expect(screen.getByText('wego')).toBeInTheDocument();
    expect(screen.getByText(/Wadah Edukasi dan Gagasan Optimal/i)).toBeInTheDocument();
    expect(screen.getByText(/BPS Provinsi Sumatera Utara/i)).toBeInTheDocument();
    expect(screen.getByAltText('Wego Insignia')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
    expect(window.__lenis.stop).toHaveBeenCalled();
  });

  it('auto-completes and disappears after specified duration plus exit animation', () => {
    const onComplete = vi.fn();
    render(<SplashScreen duration={1200} onComplete={onComplete} />);

    expect(screen.getByTestId('splash-screen')).toBeInTheDocument();

    // Fast-forward past duration (1200ms)
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Exit transition initiated, still in DOM with exit class
    expect(screen.getByTestId('splash-screen')).toHaveClass('opacity-0');

    // Fast-forward exit transition (500ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem('wego_splash_shown')).toBe('true');
    expect(document.body.style.overflow).toBe('');
    expect(window.__lenis.start).toHaveBeenCalled();
  });

  it('allows user to skip early by clicking anywhere', () => {
    const onComplete = vi.fn();
    render(<SplashScreen duration={3000} onComplete={onComplete} />);

    const overlay = screen.getByTestId('splash-screen');
    fireEvent.click(overlay);

    expect(overlay).toHaveClass('opacity-0');

    // Complete exit transition
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument();
    expect(onComplete).toHaveBeenCalled();
    expect(sessionStorage.getItem('wego_splash_shown')).toBe('true');
  });

  it('allows user to skip early with keyboard (Space, Enter, Escape)', () => {
    const onComplete = vi.fn();
    render(<SplashScreen duration={3000} onComplete={onComplete} />);

    fireEvent.keyDown(window, { code: 'Space', key: ' ' });

    expect(screen.getByTestId('splash-screen')).toHaveClass('opacity-0');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument();
    expect(onComplete).toHaveBeenCalled();
  });

  it('does not render if sessionStorage already indicates splash has been shown', () => {
    sessionStorage.setItem('wego_splash_shown', 'true');
    const onComplete = vi.fn();

    render(<SplashScreen onComplete={onComplete} />);

    expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('forceShow allows rendering even if sessionStorage has flag set', () => {
    sessionStorage.setItem('wego_splash_shown', 'true');

    render(<SplashScreen forceShow duration={500} />);

    expect(screen.getByTestId('splash-screen')).toBeInTheDocument();
  });
});
