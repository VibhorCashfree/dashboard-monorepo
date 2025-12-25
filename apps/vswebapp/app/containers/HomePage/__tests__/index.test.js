import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import HomePage from '..';

const renderer = new ShallowRenderer();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    activePageId: 'ifsc',
  }),
}));

describe('In HomePage Container', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <HomePage />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<HomePage />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Raj Nandan Sharma'));
      expect(screen.queryByText('Verification Suite'));
      expect(screen.queryByText('Summary'));
      expect(screen.queryByText('PAN'));
      expect(screen.queryByText('OKYC'));
      expect(screen.queryByText('UPI VPA'));
    });
  });
});
