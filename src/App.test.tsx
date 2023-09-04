import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Calculator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
