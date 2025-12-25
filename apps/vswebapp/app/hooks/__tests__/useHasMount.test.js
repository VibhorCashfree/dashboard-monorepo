import React from 'react';
import { render, screen } from '@testing-library/react';

// Hooks
import useHasMount from '../useHasMount';

const TestComponent = () => {
  const mounted = useHasMount();

  return <div>{mounted ? 'foo' : 'bar'}</div>;
};

describe('useHasMount hooks', () => {
  test('useHasMount()', () => {
    render(<TestComponent />);

    expect(screen.queryByText('foo'));
  });
});
