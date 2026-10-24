import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders nine cells and an occupied cell keeps its mark on re-click', () => {
  const { container } = render(<App />);
  expect(screen.getByText(/Made by Tiger Hong/i)).toBeInTheDocument();
  // CRA Jest maps CSS modules to their key names, so grid cells carry
  // the class "gridItem".
  const cells = container.querySelectorAll('.gridItem');
  expect(cells).toHaveLength(9);
  // First move: the stale-closure turn logic in App marks the first
  // clicked cell "X" (Player 2 in the app's labelling).
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toBe('X');
  // Re-clicking the occupied cell must not change it (turn-flip fix).
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toBe('X');
});
