import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpinPage from './SpinPage';

describe('SpinPage', () => {
  const scheduled: Array<() => void> = [];

  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.25);
    vi.spyOn(window, 'setTimeout').mockImplementation(((callback: TimerHandler) => {
      scheduled.push(() => {
        if (typeof callback === 'function') {
          callback();
        }
      });
      return scheduled.length;
    }) as typeof window.setTimeout);
  });

  afterEach(() => {
    scheduled.length = 0;
    vi.restoreAllMocks();
  });

  it('renders category prompts and spins within the selected category', async () => {
    render(
      <MemoryRouter>
        <SpinPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('combobox', { name: /category/i }), { target: { value: 'Technology' } });
    fireEvent.click(screen.getByRole('button', { name: /spin lever/i }));

    expect(screen.getByRole('button', { name: /spin lever/i })).toBeDisabled();
    expect(screen.getByRole('combobox', { name: /category/i })).toBeDisabled();

    await act(async () => {
      scheduled.shift()?.();
    });

    expect(screen.getByRole('button', { name: /spin lever/i })).not.toBeDisabled();
    expect(screen.getByRole('combobox', { name: /category/i })).not.toBeDisabled();

    expect(screen.getByText('The most useful app on your phone', { selector: '.topic-slot--center' })).toBeInTheDocument();
  });

  it('re-enables controls after the animation settles', async () => {
    render(
      <MemoryRouter>
        <SpinPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /spin lever/i }));
    expect(screen.getByRole('button', { name: /spin lever/i })).toBeDisabled();

    await act(async () => {
      scheduled.shift()?.();
    });

    expect(screen.getByRole('button', { name: /spin lever/i })).not.toBeDisabled();
  });
});
