import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

describe('SmoothScrollProvider Component (Motion Engine Seam)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders child components cleanly', () => {
    render(
      <SmoothScrollProvider>
        <div data-testid="child-element">Wego Content</div>
      </SmoothScrollProvider>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Wego Content')).toBeInTheDocument();
  });

  it('safely handles unmount and tears down scroll ticker without throwing', () => {
    const { unmount } = render(
      <SmoothScrollProvider>
        <div>Content to Unmount</div>
      </SmoothScrollProvider>
    );

    expect(() => unmount()).not.toThrow();
  });

  it('renders children even when prefers-reduced-motion is active', () => {
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

    render(
      <SmoothScrollProvider>
        <div data-testid="accessible-child">Reduced Motion Mode</div>
      </SmoothScrollProvider>
    );

    expect(screen.getByTestId('accessible-child')).toBeInTheDocument();
  });
});
