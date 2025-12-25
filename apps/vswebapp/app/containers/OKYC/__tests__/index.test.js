import React from 'react';
import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as OKYCService from 'services/okyc';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import OKYC from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/okyc');

  jest.spyOn(OKYCService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          status: 'VALID',
          message: 'Aadhaar Card Exists',
          careOf: 'S/O: Fakkirappa Dollin',
          address:
            'Shri Kanaka Nilaya,,Umashankar Nagar 1st Main 5th Cross,Ranebennur,Haveri-Karnataka,India',
          dob: '02-02-1995',
          email: '',
          gender: 'M',
          name: 'Mallesh Fakkirappa Dollin',
          splitAddress: {
            country: 'India',
            dist: 'Haveri',
            house: 'Shri Kanaka Nilaya',
            landmark: '',
            pincode: '581115',
            po: 'Ranebennur',
            state: 'Karnataka',
            street: 'Umashankar Nagar 1st Main 5th Cross',
            subdist: 'Ranibennur',
            vtc: 'Ranibennur',
          },
          yearOfBirth: '',
          refId: '3276',
          id: 3276,
          serviceCharge: '0',
          serviceTax: '0',
          gateway: '',
          processedOn: '2023-02-02 00:51:59',
          aadhaarReference: '',
          mobileHash: 'ed189eb73247cb90b769e7e8d7dfd2',
          photoLink: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(OKYCService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In OKYC Container', () => {
  test('checks render', async () => {
    render(<OKYC />, { wrapper: CustomWrapper });

    jest
      .spyOn(OKYCService, 'sendOTP')
      .mockImplementation(() => Promise.resolve({ status: 'SUCCESS' }));

    expect(OKYCService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(OKYCService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Mallesh Fakkirappa Dollin'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Male')).toBeInTheDocument();
      expect(screen.queryByText('Karnataka')).toBeInTheDocument();
      expect(screen.queryByText('3276')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Aadhaar and the verification statuses are shown here.',
        ),
      ).toBeInTheDocument();

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const searchFilter = screen.queryByText(/Search & Filter/);

      fireEvent.click(screen.queryByText(/Last 7 days/));
      fireEvent.click(screen.queryByText(/Last Month/));

      expect(OKYCService.getAll).toHaveBeenCalled();
      expect(OKYCService.getAllCount).toHaveBeenCalled();
      expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
      expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

      fireEvent.click(searchFilter);

      expect(screen.queryByText('Apply')).toBeDisabled();

      screen.debug(undefined, Infinity);

      const initiatedOption = document.getElementsByName('INITIATED')[0];

      fireEvent.click(initiatedOption);

      expect(screen.queryByText('Apply')).not.toBeDisabled();

      fireEvent.click(screen.queryByText('Apply'));

      expect(screen.queryByText(/Initiated/)).toBeInTheDocument();

      fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

      document.querySelector('tbody tr').click();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      fireEvent.click(screen.queryByText('Verify Aadhaar'));

      const aadhaarInput = document.getElementsByName('aadhaarNo')[0];

      userEvent.type(aadhaarInput, '237823782378');

      const submitButton = screen.queryByRole('button', {
        name: 'Verify',
      });

      fireEvent.click(submitButton);

      screen.debug(undefined, Infinity);
    });
  });

  xit('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const setFetchCounter = jest.fn();
    const handleRedirect = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        modalData={{
          aadhaarNo: 'YYYYZZZTTT',
          refId: 'foo',
        }}
        setModalData={setModalData}
        setFetchCounter={setFetchCounter}
        handleRedirect={handleRedirect}
      />,
      { wrapper: CustomWrapper },
    );

    expect(await screen.queryByText('Verify Aadhaar')).toBeInTheDocument();
    expect(
      await screen.queryByText(
        '₹ 1.30 will be deducted from your available balance',
      ),
    ).toBeInTheDocument();

    const submitButton = await screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    expect(
      await screen.queryByText('Aadhaar number should include 12 digits.'),
    ).not.toBeInTheDocument();

    const aadhaarInput = await screen.queryByPlaceholderText(
      'Ex. XXXXXXXX1234',
    );
    console.log(prettyDOM(aadhaarInput));
    await userEvent.clear(aadhaarInput);
    await userEvent.type(aadhaarInput, '100');
    console.log(prettyDOM(aadhaarInput));
    // await waitFor(async () => {
    //   await expect(aadhaarInput.value).toBe('100');
    // });

    expect(
      screen.queryByText('Aadhaar number should include 12 digits.'),
    ).toBeInTheDocument();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
    expect(setFetchCounter).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const setFetchCounter = jest.fn();
    const handleRedirect = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.INSUFFICIENT_BALANCE}
        setModalType={setModalType}
        modalData={{
          aadhaarNo: 'YYYYZZZTTT',
          refId: 'foo',
        }}
        setModalData={setModalData}
        setFetchCounter={setFetchCounter}
        handleRedirect={handleRedirect}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Aadhaar Verification Failed'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Failed to verify aadhaar due to insufficient balance in cashfree wallet recharge your account for running verifications',
        ),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
      expect(setFetchCounter).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const setFetchCounter = jest.fn();
    const handleRedirect = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.INVALID}
        setModalType={setModalType}
        modalData={{
          aadhaarNo: 'YYYYZZZTTT',
          refId: 'foo',
        }}
        setModalData={setModalData}
        setFetchCounter={setFetchCounter}
        handleRedirect={handleRedirect}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Aadhaar is Invalid')).toBeInTheDocument();

      expect(
        screen.queryByText('Please retry using valid Aadhaar Number'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Aadhaar Number:')).toBeInTheDocument();
      expect(screen.queryByText('XXXX XXXX TT')).toBeInTheDocument();
      expect(screen.queryByText('Verification ID:')).toBeInTheDocument();
      expect(screen.queryByText('foo')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
      expect(setFetchCounter).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const setFetchCounter = jest.fn();
    const handleRedirect = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VALID}
        setModalType={setModalType}
        modalData={{
          aadhaarNo: 'YYYYZZZTTT',
          name: 'foo',
          address: 'bar',
        }}
        setModalData={setModalData}
        setFetchCounter={setFetchCounter}
        handleRedirect={handleRedirect}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Aadhaar is Valid')).toBeInTheDocument();

      expect(screen.queryByText('Aadhaar Number:')).toBeInTheDocument();
      expect(screen.queryByText('XXXX XXXX TT')).toBeInTheDocument();
      expect(screen.queryByText('Date of Birth:')).toBeInTheDocument();
      expect(screen.queryByText('foo')).toBeInTheDocument();
      expect(screen.queryByText('bar')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
      expect(setFetchCounter).toHaveBeenCalled();

      const confirmButton = screen.queryByRole('button', {
        name: 'View more details',
      });

      expect(confirmButton).not.toBeDisabled();
      expect(confirmButton).toBeInTheDocument();

      fireEvent.click(confirmButton);

      expect(handleRedirect).toHaveBeenCalled();
    });
  });
});
