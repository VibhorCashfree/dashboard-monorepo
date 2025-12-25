import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Hooks
import useToggle from '../useToggle';

// eslint-disable-next-line react/prop-types
const TestComponent = () => {
  const [value, setToggle] = useToggle(true);

  const handleClick = () => {
    setToggle();
  };

  return (
    <button type="button" onClick={handleClick}>
      {value ? 'foo' : 'bar'}
    </button>
  );
};

describe('useToggle hooks', () => {
  test('useToggle()', () => {
    render(<TestComponent />);

    expect(screen.queryByText('foo'));
    fireEvent.click(screen.queryByText('foo'));
    expect(screen.queryByText('bar'));
  });
});
