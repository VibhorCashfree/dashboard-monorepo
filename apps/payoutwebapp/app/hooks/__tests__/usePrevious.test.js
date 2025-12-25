import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Hooks
import usePrevious from '../usePrevious';

// eslint-disable-next-line react/prop-types
const TestComponent = () => {
  const [count, setCount] = useState(0);

  const previousCount = usePrevious(count);

  const handleClick = () => {
    setCount(count + 100);
  };

  return (
    <>
      <div>Count: {count}</div>
      <div>Previous Count: {previousCount}</div>
      <button type="button" onClick={handleClick}>
        Click
      </button>
    </>
  );
};

describe('usePrevious hooks', () => {
  test('usePrevious()', () => {
    render(<TestComponent initialValue />);

    expect(screen.queryByText('Count: 0'));
    expect(screen.queryByText('Previous Count:'));
    fireEvent.click(screen.queryByText('Click'));
    expect(screen.queryByText('Count: 100'));
    expect(screen.queryByText('Previous Count: 0'));
  });
});
