import React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import AadhaarPitchPage from '..';

// Services
import * as OkycService from 'services/okyc';

beforeEach(() => {
  jest.mock('services/okyc');
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('AadhaarPitchPage', () => {
  test('shallow render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <AadhaarPitchPage />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<AadhaarPitchPage />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Verify the Aadhaar information of your users'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          'With our Aadhaar OCR APIs, quickly verify whether the user identity matches the aadhar information.',
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Try Aadhaar Verification'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('How does AADHAAR OCR Verification work?'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Integrate Aadhaar OCR API'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Capture or Upload Image')).toBeInTheDocument();
      expect(screen.queryByText('View API Response')).toBeInTheDocument();

      fireEvent.click(screen.queryByText('Try Aadhaar Verification'));
    });
  });

  test('checks Modals render (Verify)', async () => {
    jest.spyOn(OkycService, 'verifyOcr').mockImplementation(() =>
      Promise.resolve({
        status: 'VALID',
        uid: '123',
        yob: 1994,
        name: 'Vibhor',
        address: 'Ladpura',
        father: 'rww',
        externalRefId: 45345,
        refId: 4223,
      }),
    );

    render(<Modals modalType={MODAL_TYPES.VERIFY} setModalType={jest.fn()} />, {
      wrapper: Wrapper,
    });

    expect(screen.queryByText('Verify Aadhaar - OCR'));

    const verifyButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(verifyButton).toBeDisabled();
    expect(
      screen.queryByText('₹ 2.00 will be deducted from your available balance'),
    ).toBeInTheDocument();

    const blob = new Blob(['<binaryImageDataHere>'], { type: 'image/jpeg' });

    // Create a File object from the Blob
    const file = new File([blob], 'mockImage.jpg', { type: 'image/jpeg' });

    const fileInput = screen.getAllByTestId('file-input');
    await userEvent.upload(fileInput[0], file);
    await userEvent.upload(fileInput[1], file);

    await waitForElementToBeRemoved(screen.getAllByText('Uploading ...'));

    expect(verifyButton).not.toBeDisabled();

    fireEvent.click(verifyButton);

    expect(OkycService.verifyOcr).toHaveBeenCalled();
  });

  test('checks Modals render (Valid)', async () => {
    render(<Modals modalType={MODAL_TYPES.VALID} setModalType={jest.fn()} />, {
      wrapper: Wrapper,
    });

    expect(screen.queryByText('Aadhaar is Valid'));

    fireEvent.click(screen.queryByText('Close'));
  });

  test('checks Modals render (Invalid)', async () => {
    render(
      <Modals modalType={MODAL_TYPES.INVALID} setModalType={jest.fn()} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.queryByText('Aadhaar is Invalid'));

    fireEvent.click(screen.queryByText('Close'));
  });
});
