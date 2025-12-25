import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { DetailsContext } from 'containers/FundSourceDetails/providers';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as AccountService from 'services/accounts';

// Constants
import { MODAL_TYPE } from '../constants';

// Containers
import LastInternalTransferCard from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import Option from '../components/Option';
import InternalTransferModal from '../components/InternalTransferModal';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <DetailsContext.Provider value={mockDetailsProvider}>
      {children}
    </DetailsContext.Provider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/accounts');

  jest
    .spyOn(AccountService, 'internalTransfer')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(AccountService, 'getAccountList').mockImplementation(() =>
    Promise.resolve([
      {
        accountId: 7447,
        accountType: 'PAYOUT_CURRENT',
        accountName: 'Raj Nandan Sharma',
        rechargeAccount: '70707010J15S',
        availableBalance: '16.29',
      },
    ]),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In LastInternalTransferCard Container', () => {
  test('checks render', async () => {
    render(
      <LastInternalTransferCard
        data={{
          amount: '1',
          status: 'SUCCESS',
          addedOn: '2022-04-12T17:28:51+05:30',
        }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('₹ 1.00')).toBeInTheDocument();
      expect(screen.queryByText(/12 Apr 2022/)).toBeInTheDocument();
      expect(screen.queryByText('Last Internal Transfer')).toBeInTheDocument();
      expect(screen.queryByText('Success')).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.SUCCESS}
        setModalType={setModalType}
        nonConnectedAccounts={[]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Internal fund transfer of ₹ undefined was successful',
        ),
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
        modalType={MODAL_TYPE.FAILED}
        setModalType={setModalType}
        nonConnectedAccounts={[]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Internal fund transfer of ₹ undefined failed'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('<InternalTransferModal />', async () => {
    const onResponse = jest.fn();
    const onClose = jest.fn();

    render(
      <InternalTransferModal
        nonConnectedAccounts={[]}
        balance="100"
        onResponse={onResponse}
        onClose={onClose}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(
      async () => {
        expect(screen.queryByText('Select Account')).toBeInTheDocument();
        expect(screen.queryByText('Raj Nandan Sharma')).toBeInTheDocument();

        expect(
          screen.queryByText('Maximum 200 characters allowed'),
        ).toBeInTheDocument();

        const submitButton = screen.queryByRole('button', {
          name: 'Transfer',
        });

        expect(submitButton).toHaveClass('ml-4');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        const amountInput = screen.queryByPlaceholderText('Amount');

        await userEvent.clear(amountInput);
        await userEvent.type(amountInput, '100');

        expect(amountInput.value).toBe('100');

        const cancelButton = screen.queryByText('Cancel');

        expect(cancelButton).not.toBeDisabled();
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 5000 },
    );
  });

  test('<Option />', async () => {
    render(<Option name="foo" amount="100" />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(screen.queryByText('₹ 100.00')).toBeInTheDocument();
      expect(screen.queryByText('foo')).toBeInTheDocument();
    });
  });
});
