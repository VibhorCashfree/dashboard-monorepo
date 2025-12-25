import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ErrorBoundary from '..';

const shallowRenderer = new ShallowRenderer();

const ComponentWithError = () => {
  throw new Error('Intentional error in ComponentWithError');
};

describe('ErrorBoundary', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <ErrorBoundary>
        <h3>2 + 2 = 5</h3>
      </ErrorBoundary>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(
      <ErrorBoundary>
        <div>
          <h3>2 + 2 = 5</h3>
          <ComponentWithError />
        </div>
      </ErrorBoundary>,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('2 + 2 = 5')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Something went wrong. Try again after some time.'),
      ).toBeInTheDocument();
    });
  });
});
