import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Hooks
import useBoolean from '../useBoolean';

// eslint-disable-next-line react/prop-types
const TestComponent = ({ initialValue }) => {
  const [loading, setLoading] = useBoolean(initialValue);

  const handleClick = () => {
    setLoading((prev) => !prev);
  };

  return (
    <button type="button" onClick={handleClick}>
      {loading ? 'foo' : 'bar'}
    </button>
  );
};

describe('useBoolean hooks', () => {
  test('useBoolean()', () => {
    const { unmount } = render(<TestComponent initialValue />);

    expect(screen.queryByText('foo'));
    fireEvent.click(screen.queryByText('foo'));
    expect(screen.queryByText('bar'));

    unmount();

    render(<TestComponent initialValue={false} />);

    expect(screen.queryByText('bar'));
    fireEvent.click(screen.queryByText('bar'));
    expect(screen.queryByText('foo'));
  });
});
