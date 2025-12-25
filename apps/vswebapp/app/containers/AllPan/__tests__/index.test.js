import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as PANService from 'services/PAN';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import VerifyModal from '../components/VerifyModal';

// Containers
import AllPan from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/PAN');

  jest.spyOn(PANService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          pan: 'ABCPV1234D',
          type: 'Individual',
          id: 68070,
          nameProvided: 'Calvin',
          registeredName: 'JOHN DOE',
          fatherName: '',
          status: 'VALID',
          statusCode: '',
          message: 'PAN verified successfully',
          verifiedAt: '2023-02-02 00:51:48',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(PANService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AllPan Container', () => {
  test('checks render', async () => {
    render(<AllPan />, { wrapper: CustomWrapper });

    expect(PANService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(PANService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('ABCPV1234D')).toBeInTheDocument();
      expect(screen.queryByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(
        screen.queryByText('PAN verification statuses are shown here.'),
      ).toBeInTheDocument();

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const searchFilter = screen.queryByText(/Search & Filter/);

      fireEvent.click(screen.queryByText(/Last 7 days/));
      fireEvent.click(screen.queryByText(/Last Month/));

      expect(PANService.getAll).toHaveBeenCalled();
      expect(PANService.getAllCount).toHaveBeenCalled();
      expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
      expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

      fireEvent.click(searchFilter);

      expect(screen.queryByText('Apply')).toBeDisabled();

      const validOption = document.getElementsByName('VALID')[0];
      const rejectedOption = document.getElementsByName('REJECTED')[0];

      fireEvent.click(rejectedOption);
      fireEvent.click(validOption);

      expect(screen.queryByText('Apply')).not.toBeDisabled();

      fireEvent.click(screen.queryByText('Apply'));

      expect(screen.queryByText(/Rejected/)).toBeInTheDocument();

      fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

      document.querySelector('tbody tr').click();
    });
  });

  test('checks render > onPageChange', async () => {
    render(<AllPan />, { wrapper: CustomWrapper });

    expect(PANService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(PANService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      expect(PANService.getAll).toHaveBeenCalled();
      expect(PANService.getAllCount).toHaveBeenCalled();
    });
  });

  test('checks Modals render > Error API', async () => {
    jest
      .spyOn(PANService, 'verify')
      .mockImplementation(() => Promise.resolve({ error: true }));

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    const panInput = screen.queryByPlaceholderText('Ex. ABCP1234A1');
    const nameInput = screen.queryByPlaceholderText('Name');

    await fireEvent.change(panInput, { target: { value: 'BEBPJ5396E' } });
    await fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(screen.queryByText('Verify PAN')).toBeInTheDocument();
    expect(
      screen.queryByText('₹ 2.00 will be deducted from your available balance'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/PAN must be 10 characters/),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Optional')).toBeInTheDocument();

    const submitButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).not.toBeDisabled();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();

    fireEvent.click(submitButton);

    expect(PANService.verify).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    jest
      .spyOn(PANService, 'verify')
      .mockImplementation(() => Promise.resolve({ status: 'VALID' }));

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    const panInput = screen.queryByPlaceholderText('Ex. ABCP1234A1');
    const nameInput = screen.queryByPlaceholderText('Name');

    await fireEvent.change(panInput, { target: { value: 'BEBPJ5396E' } });
    await fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const submitButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    fireEvent.click(submitButton);

    expect(PANService.verify).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Unable to Validate')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VALID}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('PAN is Valid')).toBeInTheDocument();
      expect(screen.queryByText('PAN Ref. ID')).toBeInTheDocument();
      expect(screen.queryByText('Name Provided')).toBeInTheDocument();
      expect(screen.queryByText('PAN Type')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.INVALID}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('PAN is Invalid')).toBeInTheDocument();
      expect(screen.queryByText('PAN')).toBeInTheDocument();
      expect(screen.queryByText('Name Provided')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('check handleChange function in VerifyModal', () => {
    render(<VerifyModal onClose={jest.fn()} onVerify={jest.fn()} />, {
      wrapper: CustomWrapper,
    });

    const input = screen.queryByPlaceholderText('Name');
    const input2 = screen.queryByPlaceholderText('Ex. ABCP1234A1');

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.change(input2, { target: { value: 'John Doe' } });

    expect(input.value).toBe('John Doe');
    expect(
      screen.queryByText('PAN should include 10 characters.'),
    ).toBeInTheDocument();
  });
});
