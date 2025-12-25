import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { DetailsContext } from 'containers/FundSourceDetails/providers';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import SelfWithdrawalModal from '../components/SelfWithdrawalModal';

// Containers
import LastWithdrawalCard from '..';

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

  jest.spyOn(FundSourcesService, 'getSelfWithdrawals').mockImplementation(() =>
    Promise.resolve({
      amount: '1',
      utr: 'N174221298398913',
      addedOn: '2022-06-23T17:32:10+05:30',
      status: 'SUCCESS',
    }),
  );

  jest
    .spyOn(FundSourcesService, 'selfWithdrawals')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In LastWithdrawalCard Container', () => {
  test('checks render', async () => {
    render(<LastWithdrawalCard />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(FundSourcesService.getSelfWithdrawals).toHaveBeenCalledWith(39240);
    });

    await waitFor(() => {
      expect(screen.queryByText('N174221298398913')).toBeInTheDocument();
      expect(screen.queryByText(/23 Jun 2022/)).toBeInTheDocument();
      expect(screen.queryByText('Last Withdrawal')).toBeInTheDocument();
      expect(screen.queryByText('Success')).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.SUCCESS}
        setModalType={setModalType}
        data={{ amount: '100' }}
        setData={jest.fn()}
      />,
      { wrapper: CustomWrapper },
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
        modalType={MODAL_TYPE.FAILED}
        setModalType={setModalType}
        data={{ amount: '100' }}
        setData={jest.fn()}
      />,
      { wrapper: CustomWrapper },
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

    render(<SelfWithdrawalModal onResponse={onResponse} onClose={onClose} />, {
      wrapper: CustomWrapper,
    });

    await waitFor(
      async () => {
        expect(await screen.findByText('Self Withdrawal')).toBeInTheDocument();
        expect(screen.queryByText('Raj Nandan Sharma')).toBeInTheDocument();
        expect(screen.queryByText('111111111111')).toBeInTheDocument();
        expect(screen.queryByText('₹ 19.44')).toHaveClass('pl-1');

        expect(
          screen.queryByText('Maximum 200 characters allowed'),
        ).toBeInTheDocument();

        const submitButton = screen.queryByRole('button', {
          name: 'Withdraw',
        });

        expect(submitButton).toHaveClass('ml-4');
        expect(submitButton).toBeInTheDocument();

        const amountInput = screen.queryByPlaceholderText('Amount');

        await act(async () => {
          await userEvent.clear(amountInput);
          await userEvent.type(amountInput, '10');
        });

        expect(amountInput.value).toBe('10');

        expect(submitButton).not.toBeDisabled();
        fireEvent.click(submitButton);

        expect(FundSourcesService.selfWithdrawals).toHaveBeenCalledWith({
          amount: '10',
          paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        });
        expect(onResponse).toHaveBeenCalledWith({}, '10');

        const cancelButton = screen.queryByText('Cancel');

        expect(cancelButton).not.toBeDisabled();
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 8000 },
    );
  });
});
