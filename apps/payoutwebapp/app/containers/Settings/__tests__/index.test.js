import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Services
import * as AccountsService from 'services/accounts';
import * as SettingsService from 'services/settings';
import * as FundSourcesService from 'services/fundSources';

// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Constants
import { INTERNAL_SERVER_ERROR } from 'constants/errors';
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import EmailNotifications from '../components/EmailNotifications';
import SetThreshold from '../components/SetThreshold';
import PayoutMethods from '../components/PayoutMethods';
import Preferences from '../components/Preferences';
import PreferenceList from '../components/PreferenceList';
import PreferenceOption from '../components/PreferenceOption';
import FundSourceCharges from '../components/FundSourceCharges';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@cashfree-intl/coherent', () => ({
  ...jest.requireActual('@cashfree-intl/coherent'),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

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

  jest.spyOn(AccountsService, 'setMerchantPreference').mockImplementation(() =>
    Promise.resolve({
      merchantPreferenceUpdated: true,
    }),
  );

  jest
    .spyOn(SettingsService, 'toggleCategory')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(SettingsService, 'removeRecipient')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getLowBalanceThreshold')
    .mockImplementation(() =>
      Promise.resolve({
        lowBalance: '200',
        isActive: true,
      }),
    );

  jest
    .spyOn(FundSourcesService, 'setLowBalanceThreshold')
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

      expect(screen.queryByText('Raj Nandan Sharma')).not.toBeInTheDocument();
      expect(screen.queryByText('70707010J15S')).not.toBeInTheDocument();

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

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.ADD_RECIPIENT}
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
      await screen.findByText(/Maximum of 10 recipients are allowed./),
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
        modalType={MODAL_TYPE.SUCCESS}
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
        modalType={MODAL_TYPE.ERROR}
        setModalType={setModalType}
        setFetchCounter={jest.fn()}
        selectedAccountId="7447"
        data={{}}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText(INTERNAL_SERVER_ERROR)).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('<SetThreshold />', async () => {
    render(<SetThreshold />, {
      wrapper: Wrapper,
    });

    await waitFor(
      async () => {
        expect(screen.queryByText('Set Threshold')).toBeInTheDocument();
        expect(
          screen.queryByText(
            'Set a minimum balance you want to maintain in your fund source.',
          ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Minimum Balance')).toBeInTheDocument();

        expect(
          FundSourcesService.getLowBalanceThreshold,
        ).not.toHaveBeenCalled();

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

        expect(submitButton).not.toBeDisabled();

        // fireEvent.click(submitButton);

        // expect(FundSourcesService.setLowBalanceThreshold).toHaveBeenCalledWith({
        //   lowBalance: '100',
        //   isActive: true,
        // });

        const cancelButton = screen.queryByText('Cancel');

        expect(cancelButton).not.toBeDisabled();
        expect(cancelButton).toBeInTheDocument();
      },
      { timeout: 7000 },
    );
  });

  test('<PayoutMethods /> should render correctly', () => {
    render(<PayoutMethods />, { wrapper: Wrapper });

    expect(screen.getByText('Payout Methods')).toBeInTheDocument();
    expect(
      screen.getByText(/Contact your Account Manager or write to us at/),
    ).toBeInTheDocument();

    expect(screen.getByText('care@cashfree.com')).toBeInTheDocument();
    expect(screen.getByText('IMPS')).toBeInTheDocument();
    expect(screen.getByText('UPI')).toBeInTheDocument();
    expect(screen.getByText('Amazon Pay Wallet')).toBeInTheDocument();
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  test('<PayoutMethods /> back button is functional', () => {
    render(<PayoutMethods />, { wrapper: Wrapper });

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('<SetThreshold /> back button is functional', () => {
    render(<SetThreshold />, { wrapper: Wrapper });

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('<Preferences /> back button is functional', () => {
    render(<Preferences />, { wrapper: Wrapper });

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('<PreferenceOption /> renders correctly', () => {
    render(
      <PreferenceOption
        preferenceType="Transfers"
        preferenceName="MAX_LOW_BALANCE_QUEUEING_TIME"
        canUpdate
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.queryByText('Maximum time for Low Balance Transfer Queuing'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        'Set a maximum time for low balance transfer queuing, transfers will be marked as failed if the fund source is not recharged within this queuing time (in hours)',
      ),
    ).toBeInTheDocument();

    {
      const chevronDownIcon = screen.queryByRole('chevron-down');
      const chevronUpIcon = screen.queryByRole('chevron-up');

      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(chevronUpIcon).not.toBeInTheDocument();

      expect(input).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();

      fireEvent.click(chevronDownIcon);
    }

    {
      const chevronDownIcon = screen.queryByRole('chevron-down');
      const chevronUpIcon = screen.queryByRole('chevron-up');

      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(button).toHaveClass('ml-4');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      expect(chevronDownIcon).not.toBeInTheDocument();
      expect(chevronUpIcon).toBeInTheDocument();
      expect(input).toHaveAttribute('name', 'MAX_LOW_BALANCE_QUEUEING_TIME');
      expect(input).toHaveAttribute('value', '100');
      expect(input).not.toHaveAttribute('readOnly');

      fireEvent.click(chevronUpIcon);
    }

    {
      const chevronDownIcon = screen.queryByRole('chevron-down');
      const chevronUpIcon = screen.queryByRole('chevron-up');

      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(chevronDownIcon).toBeInTheDocument();
      expect(chevronUpIcon).not.toBeInTheDocument();

      expect(input).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    }
  });

  test('<PreferenceOption /> renders correctly', () => {
    render(
      <PreferenceOption
        preferenceType="XXXX"
        preferenceName="DISABLE_RETRY_TRANSFER_PAYOUT"
        canUpdate
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.queryByText('Disable Transfer Retry'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Transfer will not be retried by Cashfree in case the first transfer attempt has Failed.',
      ),
    ).not.toBeInTheDocument();
  });

  test('<PreferenceOption /> renders correctly', () => {
    render(
      <PreferenceOption
        preferenceType="Transfers"
        preferenceName="MAX_LOW_BALANCE_QUEUEING_TIME"
        canUpdate={false}
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.queryByText('Maximum time for Low Balance Transfer Queuing'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        'Set a maximum time for low balance transfer queuing, transfers will be marked as failed if the fund source is not recharged within this queuing time (in hours)',
      ),
    ).toBeInTheDocument();

    {
      const chevronDownIcon = screen.queryByRole('chevron-down');
      const chevronUpIcon = screen.queryByRole('chevron-up');

      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(chevronUpIcon).not.toBeInTheDocument();

      expect(input).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();

      fireEvent.click(chevronDownIcon);
    }

    {
      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(button).toBeNull();

      expect(input).toHaveAttribute('name', 'MAX_LOW_BALANCE_QUEUEING_TIME');
      expect(input).toHaveAttribute('readOnly', '');
    }
  });

  test('<PreferenceOption /> form submit', () => {
    render(
      <PreferenceOption
        preferenceType="Transfers"
        preferenceName="MAX_LOW_BALANCE_QUEUEING_TIME"
        canUpdate
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.queryByRole('chevron-down'));

    const input = screen.queryByRole('textbox');
    const button = screen.queryByRole('button', {
      name: 'Update',
    });

    expect(input).toHaveAttribute('name', 'MAX_LOW_BALANCE_QUEUEING_TIME');

    expect(input).toHaveAttribute('value', '100');

    fireEvent.change(input, { target: { value: '330' } });

    expect(input).not.toHaveAttribute('readOnly');

    fireEvent.click(button);

    expect(AccountsService.setMerchantPreference).toHaveBeenCalledWith({
      property: 'MAX_LOW_BALANCE_QUEUEING_TIME',
      value: '330',
    });

    // expect(toast.success).toHaveBeenCalledWith(
    //   'Preference updated successfully',
    // );
  });

  test('<PreferenceList /> renders correctly', () => {
    render(<PreferenceList preferenceType="Transfers" canUpdate={true} />, {
      wrapper: Wrapper,
    });

    const chevronDownIcon = screen.queryByRole('chevron-down');
    const chevronUpIcon = screen.queryByRole('chevron-up');

    const input = screen.queryByRole('textbox');
    const button = screen.queryByRole('button', {
      name: 'Update',
    });

    expect(chevronUpIcon).not.toBeInTheDocument();

    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();

    fireEvent.click(chevronDownIcon);

    expect(screen.queryByText('Transfers')).toBeInTheDocument();
    expect(screen.queryByText('Disable Transfer Retry')).toBeInTheDocument();
    expect(screen.queryByText('Disable NEFT Retry')).toBeInTheDocument();
    expect(
      screen.queryByText(
        'If NEFT mode is enabled, retry will happen via NEFT mode.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Maximum time for Low Balance Transfer Queuing'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Name Match Threshold')).toBeInTheDocument();

    {
      const chevronDownIcon = screen.queryAllByRole('chevron-down')[2];

      fireEvent.click(chevronDownIcon);

      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(chevronUpIcon).not.toBeInTheDocument();

      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('name', 'TRANSFERS_MAX_RETRY_TIME');
      expect(input).toHaveAttribute('value', '20');
      expect(input).not.toHaveAttribute('readOnly');

      fireEvent.change(input, { target: { value: '40' } });

      fireEvent.click(button);
    }

    expect(AccountsService.setMerchantPreference).toHaveBeenCalledWith({
      property: 'TRANSFERS_MAX_RETRY_TIME',
      value: '40',
    });
  });

  test('<PreferenceList /> renders correctly', () => {
    render(
      <PreferenceList preferenceType="SomethingElse" canUpdate={false} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.queryByText('SomethingElse')).toBeInTheDocument();

    const chevronDownIcon = screen.queryByRole('chevron-down');

    fireEvent.click(chevronDownIcon);

    {
      const input = screen.queryByRole('textbox');
      const button = screen.queryByRole('button', {
        name: 'Update',
      });

      expect(screen.queryAllByRole('chevron-down').length).toBe(0);
      expect(input).toBeNull();
      expect(button).toBeNull();
    }
  });

  test('<FundSourceCharges /> renders correctly', () => {
    render(<FundSourceCharges mode="neft" fundSource={mockFundSources[1]} />, {
      wrapper: Wrapper,
    });
  });
});
