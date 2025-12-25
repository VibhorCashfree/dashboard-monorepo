import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Hooks
import useClickOutside from '../useClickOutside';

const callback = jest.fn();

const TestComponent = () => {
  const wrapperRef = React.useRef(null);

  useClickOutside(wrapperRef, callback);

  return (
    <>
      <div ref={wrapperRef}>
        <button type="button" data-testid="1">
          bar
        </button>
      </div>
      <button type="button" data-testid="2">
        zzz
      </button>
    </>
  );
};

describe('useClickOutside hooks', () => {
  test('useClickOutside()', () => {
    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseDown(getByTestId('2'));

    expect(callback).toHaveBeenCalled();
  });
});
