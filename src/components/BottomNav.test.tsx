import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
  it('marks the active destination and renders all tabs', () => {
    render(<BottomNav currentTab="home" onSelectTab={vi.fn()} />);
    expect(screen.getByRole('button', { name: /home/i })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: /transactions/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /goals/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument();
  });
  it('notifies the parent when a tab is selected', () => {
    const onSelectTab = vi.fn();
    render(<BottomNav currentTab="home" onSelectTab={onSelectTab} />);
    fireEvent.click(screen.getByRole('button', { name: /transactions/i }));
    expect(onSelectTab).toHaveBeenCalledWith('transactions');
  });
});
