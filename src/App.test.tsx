import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing', () => {
  it('renders top nav and routes to spin by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /spin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /timer/i })).toBeInTheDocument();
    expect(screen.getByText(/pick a category and pull the lever/i)).toBeInTheDocument();
  });
});
