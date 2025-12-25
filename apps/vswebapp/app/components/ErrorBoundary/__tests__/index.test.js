import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';

// Components
import ErrorBoundary from '..';

const renderer = new ShallowRenderer();

jest.mock('utils/emitter', () => ({
  emit: jest.fn(),
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shallow render & match the snapshot', () => {
    renderer.render(
      <ErrorBoundary>
        <h3>`${() => new TypeError('UNKNOWN ERROR')}`</h3>
      </ErrorBoundary>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  it('renders without errors when there are no errors', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Some content</div>
      </ErrorBoundary>,
    );
    const contentElement = getByText('Some content');
    expect(contentElement).toBeInTheDocument();
  });
});
