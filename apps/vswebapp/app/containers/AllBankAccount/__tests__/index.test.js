import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as BAVService from 'services/bav';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import VerifyModal from '../components/VerifyModal';

// Containers
import AllBankAccount from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/bav');

  jest.spyOn(BAVService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1621935,
          processedOn: '2023-02-01T15:01:00+05:30',
          verificationId: 'BV1621935',
          bankAccount: '026291800001191',
          ifsc: 'YESB0000262',
          phone: '9999999999',
          nameProvided: 'JOHN DOE',
          nameAtBank: 'JOHN DOE',
          accountStatus: 'VALID',
          nameMatchScore: '100.00',
          nameMatchResult: 'DIRECT_MATCH',
        },
        {
          id: 1621936,
          processedOn: '2023-02-01T15:01:00+05:30',
          verificationId: 'BV1621936',
          bankAccount: '026291800001192',
          ifsc: 'YESB0000263',
          phone: '9999999991',
          nameProvided: 'JOHN DOE2',
          nameAtBank: 'JOHN DOE2',
          accountStatus: 'INVALID',
          nameMatchScore: '100.00',
          nameMatchResult: 'DIRECT_MATCH',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BAVService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AllBankAccount Container', () => {
  test('checks render', async () => {
    render(<AllBankAccount />, { wrapper: CustomWrapper });

    expect(BAVService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(BAVService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('YESB0000262')).toBeInTheDocument();
      expect(screen.queryByText('026291800001191')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Bank account details and the verification statuses are shown here.',
        ),
      ).toBeInTheDocument();
      document.getElementsByClassName('ui inline dropdown')[0].click();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(screen.queryByText(/Last 7 days/));
    fireEvent.click(screen.queryByText(/Last Month/));

    expect(BAVService.getAll).toHaveBeenCalled();
    expect(BAVService.getAllCount).toHaveBeenCalled();
    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const validOption = document.getElementsByName('INVALID')[0];
    const rejectedOption = document.getElementsByName('REJECTED')[0];

    await fireEvent.click(rejectedOption);
    await fireEvent.click(validOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(screen.queryByText(/Rejected/)).toBeInTheDocument();

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    document.querySelector('tbody tr').click();
  });

  test('checks render > onPageChange', async () => {
    render(<AllBankAccount />, { wrapper: CustomWrapper });

    expect(BAVService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(BAVService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      expect(BAVService.getAll).toHaveBeenCalled();
      expect(BAVService.getAllCount).toHaveBeenCalled();
    });
  });

  test('checks Modals render > Verify', async () => {
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

    await waitFor(() => {
      expect(screen.queryByText('Verify Bank Account')).toBeInTheDocument();
      expect(screen.queryByText('Account Holder Name')).toBeInTheDocument();
      expect(screen.queryByText('Phone Number')).toBeInTheDocument();
      expect(
        screen.queryByText(
          '₹ 3.00 will be deducted from your available balance',
        ),
      ).toBeInTheDocument();
      expect(screen.queryAllByText('Optional').length).toBe(2);

      const submitButton = screen.queryByRole('button', {
        name: 'Verify',
      });

      expect(submitButton).toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      const cancelButton = screen.queryByText('Cancel');

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
        modalType={MODAL_TYPES.EXIST}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Bank Account is Valid')).toBeInTheDocument();
      expect(screen.queryByText('City')).toBeInTheDocument();
      expect(screen.queryByText('Name at Bank')).toBeInTheDocument();
      expect(screen.queryByText('Bank A/c No.')).toBeInTheDocument();

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
        modalType={MODAL_TYPES.NOT_EXIST}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Bank Account is Invalid')).toBeInTheDocument();
      expect(screen.queryByText('Account Status')).toBeInTheDocument();
      expect(screen.queryByText('Name Provided')).toBeInTheDocument();
      expect(screen.queryByText('Bank A/c No.')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('check handleChange function in VerifyModal', () => {
    jest
      .spyOn(BAVService, 'verifyBankAccount')
      .mockImplementation(() => Promise.resolve({}));

    render(<VerifyModal onClose={jest.fn()} onVerify={jest.fn()} />, {
      wrapper: CustomWrapper,
    });

    const input = screen.queryByPlaceholderText('Account Holder Name');
    const input2 = screen.queryByPlaceholderText('Account Number');
    const input3 = screen.queryByPlaceholderText('IFSC');
    const input4 = screen.queryByPlaceholderText('Phone Number');

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.change(input2, { target: { value: 'John Doe' } });
    fireEvent.change(input3, { target: { value: 'John Doe' } });
    fireEvent.change(input4, { target: { value: 'John Doe' } });

    expect(input.value).toBe('John Doe');
    expect(
      screen.queryByText('IFSC should include 11 characters.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Phone number should include 10 digits.'),
    ).toBeInTheDocument();

    expect(screen.queryByText('Verify')).toBeDisabled();

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.change(input2, { target: { value: '234232342342323' } });
    fireEvent.change(input3, { target: { value: 'HDFC0000123' } });
    fireEvent.change(input4, { target: { value: '7597309570' } });

    expect(screen.queryByText('Verify')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Verify'));

    expect(BAVService.verifyBankAccount).toHaveBeenCalledWith({
      bankAccount: '234232342342323',
      ifsc: 'HDFC0000123',
      name: 'John Doe',
      phone: '7597309570',
    });
  });

  test('VerifyModal API response > FAILED', async () => {
    jest
      .spyOn(BAVService, 'verifyBankAccount')
      .mockImplementation(() =>
        Promise.resolve({ error: { message: 'oops thats an error' } }),
      );
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    const input = screen.queryByPlaceholderText('Account Holder Name');
    const input2 = screen.queryByPlaceholderText('Account Number');
    const input3 = screen.queryByPlaceholderText('IFSC');
    const input4 = screen.queryByPlaceholderText('Phone Number');

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.change(input2, { target: { value: '234232342342323' } });
    fireEvent.change(input3, { target: { value: 'HDFC0000123' } });
    fireEvent.change(input4, { target: { value: '7597309570' } });

    expect(screen.queryByText('Verify')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Verify'));

    expect(BAVService.verifyBankAccount).toHaveBeenCalled();
  });

  test('VerifyModal API response > Account Does not Exist', async () => {
    jest
      .spyOn(BAVService, 'verifyBankAccount')
      .mockImplementation(() => Promise.resolve({ accountExists: 'NO' }));
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    const input = screen.queryByPlaceholderText('Account Holder Name');
    const input2 = screen.queryByPlaceholderText('Account Number');
    const input3 = screen.queryByPlaceholderText('IFSC');
    const input4 = screen.queryByPlaceholderText('Phone Number');

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.change(input2, { target: { value: '234232342342323' } });
    fireEvent.change(input3, { target: { value: 'HDFC0000123' } });
    fireEvent.change(input4, { target: { value: '7597309570' } });

    expect(screen.queryByText('Verify')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Verify'));

    expect(BAVService.verifyBankAccount).toHaveBeenCalled();
  });

  test('VerifyModal API response > Account Does not Exist', async () => {
    jest
      .spyOn(BAVService, 'verifyBankAccount')
      .mockImplementation(() => Promise.resolve({ accountExists: 'YES' }));
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    const input = screen.queryByPlaceholderText('Account Holder Name');
    const input2 = screen.queryByPlaceholderText('Account Number');
    const input3 = screen.queryByPlaceholderText('IFSC');
    const input4 = screen.queryByPlaceholderText('Phone Number');

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.change(input2, { target: { value: '234232342342323' } });
    fireEvent.change(input3, { target: { value: 'HDFC0000123' } });
    fireEvent.change(input4, { target: { value: '7597309570' } });

    expect(screen.queryByText('Verify')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Verify'));

    expect(BAVService.verifyBankAccount).toHaveBeenCalled();
  });
});
