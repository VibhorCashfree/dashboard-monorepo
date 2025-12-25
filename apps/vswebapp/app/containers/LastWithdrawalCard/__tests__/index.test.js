import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Services
import * as AccountsService from 'services/accounts';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import { SelfWithdrawalModal } from '../components/SelfWithdrawalModal';
import { Modals } from '../components/Modals';

// Containers
import LastWithdrawalCard from '..';

beforeEach(() => {
  jest.mock('services/accounts');

  jest.spyOn(AccountsService, 'getSelfWithdrawals').mockImplementation(() =>
    Promise.resolve({
      amount: '1',
      utr: 'N174221298398913',
      addedOn: '2022-06-23T17:32:10+05:30',
      status: 'SUCCESS',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In LastWithdrawalCard Container', () => {
  test('checks render', async () => {
    render(<LastWithdrawalCard />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(AccountsService.getSelfWithdrawals).toHaveBeenCalled();
    });

    expect(screen.queryByText('N174221298398913')).toBeInTheDocument();
    expect(screen.queryByText(/23 Jun 2022/)).toBeInTheDocument();
    expect(screen.queryByText('Last Withdrawal')).toBeInTheDocument();
    expect(screen.queryByText('Success')).toBeInTheDocument();

    const submitButton = screen.queryByRole('button', {
      name: 'Withdraw',
    });

    await userEvent.click(submitButton);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.SUCCESS}
        setModalType={setModalType}
        data={{ amount: '100' }}
        setData={jest.fn()}
        withdrawBalance={jest.fn()}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Withdrawal of ₹ 100 was initiated successfully'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED}
        setModalType={setModalType}
        data={{ amount: '100' }}
        setData={jest.fn()}
        withdrawBalance={jest.fn()}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Withdrawal of ₹ 100 failed'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('<SelfWithdrawalModal />', async () => {
    const onResponse = jest.fn();
    const onClose = jest.fn();

    jest
      .spyOn(AccountsService, 'selfWithdrawals')
      .mockImplementation(() => Promise.resolve({ error: true }));

    render(
      <SelfWithdrawalModal
        balance="200"
        onResponse={onResponse}
        onClose={onClose}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(
      async () => {
        expect(await screen.findByText('Self Withdrawal')).toBeInTheDocument();
        expect(screen.queryByText('Raj Nandan Sharma')).toBeInTheDocument();
        expect(screen.queryByText('111111111111')).toBeInTheDocument();
        expect(screen.queryByText('₹ 200.00')).toHaveClass('pl-1');

        expect(
          screen.queryByText('Maximum 200 characters allowed'),
        ).toBeInTheDocument();

        const submitButton = screen.queryByRole('button', {
          name: 'Withdraw',
        });

        expect(submitButton).toHaveClass('ml-4');
        expect(submitButton).toBeInTheDocument();

        const amountInput = screen.queryByPlaceholderText('Amount');

        await userEvent.clear(amountInput);
        await userEvent.type(amountInput, '10');

        expect(amountInput.value).toBe('10');

        await userEvent.clear(amountInput);
        await userEvent.type(amountInput, '100');

        expect(submitButton).not.toBeDisabled();
        fireEvent.click(submitButton);

        expect(AccountsService.selfWithdrawals).toHaveBeenCalledWith({
          amount: '100',
        });

        const cancelButton = screen.queryByText('Cancel');

        expect(cancelButton).not.toBeDisabled();
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 8000 },
    );
  });

  test('<SelfWithdrawalModal />', async () => {
    const onResponse = jest.fn();
    const onClose = jest.fn();

    jest
      .spyOn(AccountsService, 'selfWithdrawals')
      .mockImplementation(() =>
        Promise.resolve({ withdrawalStatus: 'FAILURE' }),
      );

    render(
      <SelfWithdrawalModal
        balance="200"
        onResponse={onResponse}
        onClose={onClose}
      />,
      { wrapper: Wrapper },
    );

    // await waitFor(
    expect(await screen.findByText('Self Withdrawal')).toBeInTheDocument();
    // );
    expect(await screen.queryByText('Raj Nandan Sharma')).toBeInTheDocument();
    expect(await screen.queryByText('111111111111')).toBeInTheDocument();
    expect(await screen.queryByText('₹ 200.00')).toHaveClass('pl-1');
    expect(
      await screen.queryByText('Maximum 200 characters allowed'),
    ).toBeInTheDocument();
    const submitButton = await screen.queryByRole('button', {
      name: 'Withdraw',
    });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeInTheDocument();

    const amountInput = await screen.queryByPlaceholderText('Amount');

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '300');

    expect(amountInput.value).toBe('300');

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '100');

    expect(submitButton).not.toBeDisabled();
    await userEvent.click(submitButton);

    expect(AccountsService.selfWithdrawals).toHaveBeenCalledWith({
      amount: '100',
    });
    expect(onResponse).toHaveBeenCalledWith(
      { withdrawalStatus: 'FAILURE' },
      '100',
    );

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });
});
