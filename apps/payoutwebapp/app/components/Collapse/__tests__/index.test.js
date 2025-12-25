import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Collapse from '..';

const shallowRenderer = new ShallowRenderer();

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('Collapse', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <Collapse label="John Doe">
          <h1>Foo Bar</h1>
        </Collapse>
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(
      <Collapse label="John Doe">
        <h1>Foo Bar</h1>
      </Collapse>,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Show John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Foo Bar')).toBeInTheDocument();

      const button = screen.queryByRole('button');

      expect(button).toHaveClass('p-0 mb-2');
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      expect(screen.queryByText('Show John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Hide John Doe')).toBeInTheDocument();
    });
  });
});
