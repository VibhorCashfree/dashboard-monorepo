import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Services
import * as SettingsService from 'services/settings';
import * as AccountsService from 'services/accounts';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import EmailNotifications from '../components/EmailNotifications';
import SetThreshold from '../components/SetThreshold';

beforeEach(() => {
  jest.mock('services/settings');

  jest.mock('services/accounts');

  jest.spyOn(SettingsService, 'getCategories').mockImplementation(() =>
    Promise.resolve([
      {
        notifType: 'TRANSFER',
        notifSubType: 'AGEING_REPORT',
        name: 'Ageing Report',
        description: 'Get notified about daily pending payout transfers.',
        enabled: true,
        recipients: ['sunil.tomar@cashfree.com', 'vaibhav.gupta@cashfree.com'],
      },
      {
        notifType: 'ACCOUNT',
        notifSubType: 'CREDIT_CONFIRMATION',
        name: 'Credit Confirmation Emails',
        description:
          'Get notified when recharge made to the Cashfree virtual account is successfully credited to your Cashfree Payout account.',
        enabled: true,
        recipients: [],
      },
    ]),
  );

  jest
    .spyOn(SettingsService, 'toggleCategory')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(SettingsService, 'removeRecipient')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(AccountsService, 'getLowBalanceThreshold').mockImplementation(() =>
    Promise.resolve({
      lowBalance: '200',
      isActive: true,
    }),
  );

  jest
    .spyOn(AccountsService, 'setLowBalanceThreshold')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(SettingsService, 'addNewRecipient').mockImplementation(() =>
    Promise.resolve({
      status: 'bar',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Settings Container', () => {
  test('checks EmailNotifications render', async () => {
    render(<EmailNotifications />, { wrapper: Wrapper });

    expect(SettingsService.getCategories).toHaveBeenCalledWith({
      selectedAccountId: 7447,
    });

    await waitFor(async () => {
      expect(
        await screen.findByText(
          'Configure the email category that you want to get notified about. Click Add Recipient to add members in your organization to receive the emails.',
        ),
      ).toBeInTheDocument();

      expect(screen.queryByText('Merchant Notifications')).toBeInTheDocument();
      expect(screen.queryByText('Ageing Report')).toBeInTheDocument();
      expect(
        screen.queryByText('Learn how the Settings help'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Get notified about daily pending payout transfers.',
        ),
      ).toBeInTheDocument();

      const addButton = screen.queryByRole('button', {
        name: 'Add Recipient',
      });

      expect(addButton).not.toBeDisabled();
      expect(addButton).toBeInTheDocument();

      expect(
        screen.queryByText('sunil.tomar@cashfree.com'),
      ).not.toBeInTheDocument();

      const toggleEl = screen
        .getByTestId('AGEING_REPORT')
        .querySelector('.indicator');

      expect(toggleEl).toBeInTheDocument();

      fireEvent.click(toggleEl);

      expect(SettingsService.toggleCategory).toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('AGEING_REPORT'));

      expect(
        screen.queryByText('sunil.tomar@cashfree.com'),
      ).toBeInTheDocument();

      const crossEl = screen.getByTestId('sunil.tomar@cashfree.com-cross');

      expect(crossEl).toHaveClass('pl-1');
      fireEvent.click(crossEl);

      expect(SettingsService.removeRecipient).toHaveBeenCalled();
    });
  });

  test.skip('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.ADD_RECIPIENT}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedAccountId="7447"
        data={{}}
      />,
      { wrapper: Wrapper },
    );

    expect(await screen.findByText('Add Recipient')).toBeInTheDocument();

    expect(
      await screen.findByText('Select Email Categories'),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        'Maximum of 10 recipients are allowed. Multiple email IDs can be seperated using a comma.',
      ),
    ).toBeInTheDocument();

    const submitButton = screen.queryByRole('button', {
      name: 'Submit',
    });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toBeInTheDocument();

    const emailsInput = screen.getByTestId('emails').querySelector('input');
    expect(emailsInput).toBeInTheDocument();

    await waitFor(
      async () => {
        await userEvent.clear(emailsInput);
        await userEvent.type(emailsInput, 'anyone@what.com');

        expect(emailsInput.value).toBe('anyone@what.com');
        expect(submitButton).not.toBeDisabled();

        fireEvent.click(submitButton);

        expect(SettingsService.addNewRecipient).toHaveBeenCalledWith(
          { selectedAccountId: '7447' },
          {
            product: 'PAYOUT',
            notifType: [],
            notifSubType: [],
            recipients: ['anyone@what.com'],
          },
        );

        expect(setModalType).toHaveBeenCalled();
        expect(setFetchCounter).toHaveBeenCalled();

        const cancelButton = screen.queryByText('Cancel');

        expect(cancelButton).not.toBeDisabled();
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(setModalType).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={jest.fn()}
        selectedAccountId="7447"
        data={{}}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Recipient Added Successfully'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText('Notifications will be sent to the recipient.'),
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
        modalType={MODAL_TYPES.ERROR}
        setModalType={setModalType}
        setFetchCounter={jest.fn()}
        selectedAccountId="7447"
        data={{}}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Something went wrong. Please try again later.'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test.skip('<SetThreshold />', async () => {
    render(<SetThreshold />, { wrapper: Wrapper });

    await waitFor(async () => {
      expect(screen.queryByText('Set Threshold')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Set a minimum balance you want to maintain in your fund source.',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Minimum Balance')).toBeInTheDocument();

      expect(AccountsService.getLowBalanceThreshold).toHaveBeenCalledWith({
        fundSourceId: 516730,
      });

      const submitButton = screen.queryByRole('button', {
        name: 'Confirm',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      const amountInput = screen.getByPlaceholderText('Amount');

      expect(amountInput).toBeInTheDocument();

      await userEvent.clear(amountInput);

      await userEvent.type(amountInput, '100');

      expect(amountInput.value).toBe('100');

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();
    });
    expect(
      await screen.queryByText(
        'Set a minimum balance you want to maintain in your fund source.',
      ),
    ).toBeInTheDocument();
    expect(await screen.queryByText('Minimum Balance')).toBeInTheDocument();

    expect(AccountsService.getLowBalanceThreshold).toHaveBeenCalledWith({
      fundSourceId: 516730,
    });

    const submitButton = screen.queryByRole('button', {
      name: 'Confirm',
    });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText('Amount');

    expect(amountInput).toBeInTheDocument();

    await userEvent.clear(amountInput);

    await userEvent.type(amountInput, '100');

    expect(amountInput.value).toBe('100');

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();
  });
});
