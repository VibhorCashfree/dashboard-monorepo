import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';

// Providers
import { BankAccountSelfServeContext } from '../providers';

// Components
import Wrapper from '__tests__/components/Wrapper';
import AccountDetails from '../components/AccountDetails';

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

  jest.spyOn(FundSourcesService, 'searchLeads').mockImplementation(() =>
    Promise.resolve([
      {
        id: 123,
        leadId: 670,
        bankAccount: 'YESB0000262',
        ifsc: '026291800000092',
      },
    ]),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('BankAccountSelfServe', () => {
  test('<AccountDetails /> renders correctly', () => {
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
          <AccountDetails
            actionType={''}
            formObj={{}}
            errorObj={{}}
            modalData={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(screen.getByText('Account Details')).toBeInTheDocument();

    expect(screen.getByText('Yes Bank')).toBeInTheDocument();
    expect(screen.getByText('Choose a bank')).toBeInTheDocument();
    expect(screen.getByText('Fund Source Name')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Link your bank account with Cashfree and make payouts directly using your account.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('One Time Setup Fee')).toBeInTheDocument();
    expect(screen.getByText('Account Holder Name')).toBeInTheDocument();
    expect(screen.getByText('₹ 1,00,000.00')).toBeInTheDocument();
    expect(screen.getByText('IFSC')).toBeInTheDocument();
    expect(screen.getByText('24x7 Customer Support.')).toBeInTheDocument();
  });

  test('<AccountDetails /> One time setup fee modal', () => {
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
          <AccountDetails
            actionType={''}
            formObj={{}}
            errorObj={{}}
            modalData={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    const okayButton = screen.queryByText('Okay, Got It');
    expect(okayButton).not.toBeDisabled();

    expect(screen.getByText('One Time Setup Fee')).toBeInTheDocument();
    expect(screen.getByText('₹ 1,00,000.00')).toBeInTheDocument();
    expect(screen.getByText('24x7 Customer Support.')).toBeInTheDocument();

    fireEvent.click(okayButton);

    expect(screen.queryByText('One Time Setup Fee')).not.toBeInTheDocument();
    expect(screen.queryByText('₹ 5,000.00')).not.toBeInTheDocument();
    expect(
      screen.queryByText('24x7 Customer Support.'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText('Choose Payment Modes you need'),
    ).not.toBeInTheDocument();
  });

  test('<AccountDetails /> handleChange()', async () => {
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
          <AccountDetails
            actionType={''}
            formObj={{}}
            errorObj={{}}
            modalData={null}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    const displayNameInput = getByTestId('display-name').querySelector('input');
    const leadIdInput = getByTestId('lead-id').querySelector('input');
    const accountNumberInput =
      getByTestId('bank-account').querySelector('input');
    const ifscInput = getByTestId('ifsc').querySelector('input');
    const accountHolderNameInput = getByTestId(
      'account-holder-name',
    ).querySelector('input');

    await userEvent.type(displayNameInput, 'foobar');

    expect(setFormObj).toHaveBeenCalledTimes(6);
    expect(setErrorObj).toHaveBeenCalledTimes(6);
    expect(mockFundSourceNameValidation).toHaveBeenCalledTimes(6);

    await userEvent.type(accountNumberInput, '234005000999');
    expect(setFormObj).toHaveBeenCalledTimes(6 + 12);
    expect(setErrorObj).toHaveBeenCalledTimes(6 + 12);
    expect(mockAccountNumberValidation).toHaveBeenCalledTimes(12);

    await userEvent.type(ifscInput, 'ICIC0006666');
    expect(setFormObj).toHaveBeenCalledTimes(6 + 12 + 11);
    expect(setErrorObj).toHaveBeenCalledTimes(6 + 12 + 11);
    expect(mockIfscValidation).toHaveBeenCalledTimes(11);

    await userEvent.type(accountHolderNameInput, 'Jerry Ringmaster');

    await userEvent.type(leadIdInput, '673');

    // expect(FundSourcesService.searchLeads).toHaveBeenCalledWith({
    //   size: 1,
    //   previousId: 672,
    // });

    expect(
      screen.queryByText('IFSC should include 11 characters.'),
    ).not.toBeInTheDocument();

    await userEvent.clear(ifscInput);
    // await userEvent.type(ifscInput, '333');

    // expect(screen.getByText('IFSC should include 11 characters.')).toHaveClass(
    //   'ui pointing above prompt label',
    // );
  });

  test('<AccountDetails /> formObj and errorObj prop', () => {
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
          <AccountDetails
            actionType={ACTION_TYPE.HEADER_SETUP_FEE}
            formObj={{
              displayName: 'Well349',
              accountHolderName: 'Yo Yo Singh',
            }}
            errorObj={{
              bankAccount: 'something is wrong with bank account',
              ifsc: 'something is wrong with IFSC',
            }}
            modalData={null}
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

  test('<AccountDetails /> modalData prop', async () => {
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
          <AccountDetails
            actionType={ACTION_TYPE.HEADER_SETUP_FEE}
            formObj={{}}
            errorObj={{}}
            modalData={{
              lead: {
                id: 123,
                leadId: 670,
                bankAccount: 'YESB0000262',
                ifsc: '026291800000092',
              },
            }}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      // const leadIdInput = getByTestId('lead-id').querySelector('input');
      // const accountNumberInput =
      //   getByTestId('bank-account').querySelector('input');
      // const ifscInput = getByTestId('ifsc').querySelector('input');

      expect(setFormObj).toHaveBeenCalledWith({
        bankAccount: undefined,
        ifsc: undefined,
        leadId: 123,
      });

      // expect(leadIdInput.value).toBe(670);
      // expect(accountNumberInput.value).toBe('YESB0000262');
      // expect(ifscInput.value).toBe('026291800000092');
    });
  });

  test('<AccountDetails /> actionType prop', async () => {
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
          <AccountDetails
            actionType={ACTION_TYPE.SUBMIT}
            formObj={{}}
            errorObj={{}}
            modalData={null}
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
          leadId: 'undefined',
        },
        displayName: undefined,
        fsDisplayType: 'BANK_ACCOUNT',
        supportedModes: ['banktransfer'],
      });
      expect(onDone).toHaveBeenCalledWith();
    });
  });
});
