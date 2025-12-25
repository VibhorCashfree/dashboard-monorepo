import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import TnCModal from '..';

const shallowRenderer = new ShallowRenderer();

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('TnCModal', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <TnCModal
          // tnc={{ tncLink: 'https://www.google.com', name: 'terms link' }}
          onConfirm={jest.fn()}
        />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    const onConfirm = jest.fn();

    render(
      <TnCModal
        // tnc={{ tncLink: 'https://www.google.com', name: 'terms link' }}
        onConfirm={onConfirm}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Terms and Conditions')).toBeInTheDocument();
      expect(
        screen.queryByText(/You agree that fees for services along/),
      ).toBeInTheDocument();

      const button = screen.queryByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();

      fireEvent.click(button);

      expect(onConfirm).toHaveBeenCalled();
    });
  });
});
