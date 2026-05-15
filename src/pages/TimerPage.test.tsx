import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TimerPage from './TimerPage';
import { act } from '@testing-library/react';

describe('TimerPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('starts, pauses, resets, and visually freezes', async () => {
    render(
      <MemoryRouter>
        <TimerPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('1:00')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByText('0:58')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(screen.getByText('0:58')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByText('0:58')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('1:00')).toBeInTheDocument();
  });
});
