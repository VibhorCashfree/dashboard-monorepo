import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import PANPitchPage from '..';

describe('PANPitchPage', () => {
  test('shallow render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <PANPitchPage />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<PANPitchPage />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Start verifying user’s identity using the PAN OCR APIs',
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          'With our PAN OCR APIs, you can quickly verify if the PAN is valid, identify the registered name of the card holder for both individual or business.',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Try PAN Verification')).toBeInTheDocument();
      expect(screen.queryByText('Integrate PAN OCR API')).toBeInTheDocument();
      expect(screen.queryByText('Image Capture or Upload')).toBeInTheDocument();
      expect(screen.queryByText('API Response')).toBeInTheDocument();
    });
  });

  test('checks Modals render (Verify)', async () => {
    render(<Modals modalType={MODAL_TYPES.VERIFY} setModalType={jest.fn()} />, {
      wrapper: Wrapper,
    });

    expect(screen.queryByText('Verify PAN - OCR'));

    const verifyButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(verifyButton).toBeDisabled();
    expect(
      screen.queryByText('₹ 1.00 will be deducted from your available balance'),
    ).toBeInTheDocument();
  });

  test('checks Modals render (Valid)', async () => {
    render(<Modals modalType={MODAL_TYPES.VALID} setModalType={jest.fn()} />, {
      wrapper: Wrapper,
    });

    expect(screen.queryByText('Pan is Valid'));
  });

  test('checks Modals render (Invalid)', async () => {
    render(
      <Modals modalType={MODAL_TYPES.INVALID} setModalType={jest.fn()} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.queryByText('Pan is Invalid'));
  });
});
