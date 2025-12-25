import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { ACCOUNT_PREFERENCE } from '../constants';

// Providers
import { BankAccountSelfServeContext } from '../providers';

// Components
import Wrapper from '__tests__/components/Wrapper';
import RouterAccountDetails from '../components/RouterAccountDetails';

const mockFundSourceNameValidation = jest.fn();
const mockAccountNumberValidation = jest.fn();
const mockIfscValidation = jest.fn();

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'fundSourceNameValidation')
    .mockImplementation(mockFundSourceNameValidation);

  jest
    .spyOn(ValidationUtil, 'accountNumberValidation')
    .mockImplementation(mockAccountNumberValidation);

  jest
    .spyOn(ValidationUtil, 'ifscValidation')
    .mockImplementation(mockIfscValidation);

  jest.mock('services/fundSources');

  jest
    .spyOn(FundSourcesService, 'create')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('BankAccountSelfServe', () => {
  test('<RouterAccountDetails /> renders correctly', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={''}
            formObj={{}}
            errorObj={{}}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(screen.getByText('Account Details')).toBeInTheDocument();

    expect(
      screen.getByText('I have an API Banking enabled bank account.'),
    ).toBeInTheDocument();

    const radios = screen.getAllByRole('radio');

    expect(radios.length).toBe(3);

    expect(radios[0]).not.toBeChecked();
    expect(radios[0]).toHaveAttribute('value', ACCOUNT_PREFERENCE.FIRST);
    expect(radios[1]).not.toBeChecked();
    expect(radios[1]).toHaveAttribute('value', ACCOUNT_PREFERENCE.SECOND);
    expect(radios[2]).not.toBeChecked();
    expect(radios[2]).toHaveAttribute('value', ACCOUNT_PREFERENCE.THIRD);

    expect(screen.queryByText('Yes Bank')).not.toBeInTheDocument();
    expect(screen.queryByText('Choose a bank')).not.toBeInTheDocument();
    expect(screen.queryByText('Reference Name')).not.toBeInTheDocument();
    expect(screen.queryByText('IFSC')).not.toBeInTheDocument();
  });

  test('<RouterAccountDetails /> FIRST radio', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={''}
            formObj={{ accountPreference: ACCOUNT_PREFERENCE.FIRST }}
            errorObj={{}}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(
      screen.queryByText('I have an API Banking enabled bank account.'),
    ).toBeInTheDocument();

    const radios = screen.getAllByRole('radio');

    expect(radios.length).toBe(3);

    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
    expect(radios[2]).not.toBeChecked();

    expect(screen.getByText('Yes Bank')).toBeInTheDocument();
    expect(screen.getByText('Choose a bank')).toBeInTheDocument();
    expect(screen.queryByText('Reference Name')).toBeInTheDocument();
    expect(screen.getByText('IFSC')).toBeInTheDocument();
  });

  test('<RouterAccountDetails /> SECOND radio', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={''}
            formObj={{ accountPreference: ACCOUNT_PREFERENCE.SECOND }}
            errorObj={{}}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(
      screen.queryByText('I have an API Banking enabled bank account.'),
    ).toBeInTheDocument();

    const radios = screen.getAllByRole('radio');

    expect(radios.length).toBe(3);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();

    expect(screen.queryByText('Yes Bank')).not.toBeInTheDocument();
    expect(screen.queryByText('Choose a bank')).not.toBeInTheDocument();
    expect(screen.queryByText('Reference Name')).not.toBeInTheDocument();
    expect(screen.queryByText('IFSC')).not.toBeInTheDocument();
  });

  test('<RouterAccountDetails /> THIRD radio', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={ACTION_TYPE.SUBMIT}
            formObj={{ accountPreference: ACCOUNT_PREFERENCE.THIRD }}
            errorObj={{}}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(
      screen.queryByText('I have an API Banking enabled bank account.'),
    ).toBeInTheDocument();

    const radios = screen.getAllByRole('radio');

    expect(radios.length).toBe(3);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).not.toBeChecked();
    expect(radios[2]).toBeChecked();

    expect(screen.queryByText('Yes Bank')).not.toBeInTheDocument();
    expect(screen.queryByText('Choose a bank')).not.toBeInTheDocument();
    expect(screen.queryByText('Reference Name')).not.toBeInTheDocument();
    expect(screen.queryByText('IFSC')).not.toBeInTheDocument();

    expect(
      screen.queryByText('New Bank Account for API Banking'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/To open an API-enabled bank account/),
    ).toBeInTheDocument();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    const proceedButton = screen.queryByText('Proceed');

    expect(proceedButton).not.toBeDisabled();
    expect(proceedButton).toBeInTheDocument();

    fireEvent.click(proceedButton);
  });

  test('<RouterAccountDetails /> handleChange()', async () => {
    const wizardData = {
      bankName: undefined,
      fundSourceId: undefined,
      lead: undefined,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    const { getByTestId } = render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={''}
            formObj={{ accountPreference: ACCOUNT_PREFERENCE.FIRST }}
            errorObj={{}}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(screen.queryByText('Account Preference')).toBeInTheDocument();

    const displayNameInput = getByTestId('display-name').querySelector('input');
    const accountNumberInput =
      getByTestId('bank-account').querySelector('input');
    const ifscInput = getByTestId('ifsc').querySelector('input');
    const accountHolderNameInput = getByTestId(
      'account-holder-name',
    ).querySelector('input');

    await userEvent.type(displayNameInput, 'foobar');

    expect(setFormObj).toHaveBeenCalledTimes(6);
    expect(setErrorObj).toHaveBeenCalledTimes(7);
    expect(mockFundSourceNameValidation).toHaveBeenCalledTimes(6);

    await userEvent.type(accountNumberInput, '234005000999');
    expect(setFormObj).toHaveBeenCalledTimes(6 + 12);
    expect(setErrorObj).toHaveBeenCalledTimes(7 + 12);
    expect(mockAccountNumberValidation).toHaveBeenCalledTimes(12);

    await userEvent.type(ifscInput, 'ICIC0006666');
    expect(setFormObj).toHaveBeenCalledTimes(6 + 12 + 11);
    expect(setErrorObj).toHaveBeenCalledTimes(7 + 12 + 11);
    expect(mockIfscValidation).toHaveBeenCalledTimes(11);

    await userEvent.type(accountHolderNameInput, 'Jerry Ringmaster');

    expect(
      screen.queryByText('IFSC should include 11 characters.'),
    ).not.toBeInTheDocument();

    await userEvent.clear(ifscInput);

    // await userEvent.type(ifscInput, '333');

    // expect(screen.getByText('IFSC should include 11 characters.')).toHaveClass(
    //   'ui pointing above prompt label',
    // );
  });

  test('<RouterAccountDetails /> formObj and errorObj prop', () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    const { getByTestId } = render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={''}
            formObj={{
              displayName: 'Well349',
              accountHolderName: 'Yo Yo Singh',
              accountPreference: ACCOUNT_PREFERENCE.FIRST,
            }}
            errorObj={{
              bankAccount: 'something is wrong with bank account',
              ifsc: 'something is wrong with IFSC',
            }}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    const displayNameInput = getByTestId('display-name').querySelector('input');
    const accountHolderNameInput = getByTestId(
      'account-holder-name',
    ).querySelector('input');

    expect(displayNameInput.value).toBe('Well349');
    expect(accountHolderNameInput.value).toBe('Yo Yo Singh');

    expect(screen.getByText('something is wrong with IFSC')).toHaveClass(
      'ui pointing above prompt label',
    );

    expect(
      screen.getByText('something is wrong with bank account'),
    ).toHaveClass('ui pointing above prompt label');
  });

  test('<RouterAccountDetails /> actionType prop', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <RouterAccountDetails
            actionType={ACTION_TYPE.SUBMIT}
            formObj={{
              accountPreference: ACCOUNT_PREFERENCE.FIRST,
            }}
            errorObj={{}}
            lead={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.create).toHaveBeenCalledWith({
        bank: {
          accountHolderName: undefined,
          bankAccount: undefined,
          bankName: undefined,
          ifsc: undefined,
        },
        displayName: undefined,
        fsDisplayType: 'BANK_ACCOUNT',
        supportedModes: ['banktransfer'],
      });
      expect(onDone).toHaveBeenCalledWith();
    });
  });
});
