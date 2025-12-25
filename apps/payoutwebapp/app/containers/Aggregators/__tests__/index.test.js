import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Mocks
import { mockAccountProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { MENU, PATH_BY_MENU } from 'constants/menuItems';
import { MODAL_TYPE } from 'containers/AllFundSources/constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from 'containers/AllFundSources/components/Modals';

// Containers
import Aggregators from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper
    contextValues={[
      undefined,
      {
        ...mockAccountProvider,
        yesBusinessType: {
          businessType: 'Private Limited',
          connectAllowed: true,
        },
      },
    ]}
  >
    {children}
  </Wrapper>
);

const mockNavigate = jest.fn();

const mockRequiredValidation = jest.fn();
const mockAmountValidation = jest.fn();
const mockRemarksValidation = jest.fn();
const mockCardNumberValidation = jest.fn();
const mockExpiryValidation = jest.fn();
const mockCVVValidation = jest.fn();
const mockNameValidation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest
    .spyOn(ValidationUtil, 'amountValidation')
    .mockImplementation(mockAmountValidation);

  jest
    .spyOn(ValidationUtil, 'remarksValidation')
    .mockImplementation(mockRemarksValidation);

  jest
    .spyOn(ValidationUtil, 'cardNumberValidation')
    .mockImplementation(mockCardNumberValidation);

  jest
    .spyOn(ValidationUtil, 'expiryValidation')
    .mockImplementation(mockExpiryValidation);

  jest
    .spyOn(ValidationUtil, 'cvvValidation')
    .mockImplementation(mockCVVValidation);

  jest
    .spyOn(ValidationUtil, 'nameValidation')
    .mockImplementation(mockNameValidation);

  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'getAllLeads').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 100,
          leadType: 'NTB',
          status: 'PROD_CREDS_SHARED_WITH_MERCHANT',
          addedOn: '2024-07-24T16:06:42+05:30',
          data: [
            {
              label: 'Account Number',
              property: 'Account Number',
              value: '1234567',
            },
          ],
        },
        {
          id: 200,
          leadType: 'NTB',
          status: 'PROD_CREDS_SHARED_WITH_MERCHANT',
          addedOn: '2024-07-24T16:06:42+05:30',
          data: [
            {
              label: 'Account Number',
              property: 'Account Number',
              value: '9876543',
            },
          ],
        },
        {
          id: 300,
          leadType: 'NTB',
          status: 'PROD_CREDS_SHARED_WITH_MERCHANT',
          addedOn: '2024-07-24T16:06:42+05:30',
          data: [
            {
              label: 'Account Number',
              property: 'Account Number',
              value: '45676543456',
            },
          ],
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(FundSourcesService, 'getAllFS').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          fundSourceId: 14576,
          fsType: 'CONNECTED',
          fsDisplayType: 'BANK_ACCOUNT',
          paymentInstrumentId: 'RBL_CONNECTED',
          displayName: 'ICICI-124',
          fsDescription: 'Rbl Connected payment instrument',
          accountHolderName: 'CASHFREE PAYMENTS PRIVATE LIMITED',
          isDefault: true,
          isPayoutWallet: false,
          isMainAccount: false,
          bankAccount: '234005000876',
          ifsc: 'ICIC0002340',
          cfBankId: 0,
          cfBankName: 'RBL_CONNECTED',
          connBankName: 'RBL_CONNECTED',
          cfBankType: '',
          cfCredId: 238,
          cfGatewayId: 46,
          preferences: {
            FUND_SOURCE_WEIGHTAGE: '0',
          },
          fsBalance: {
            balance: '0',
            availableBalance: '0',
            fundsOnHold: '0',
            overdraft: '0',
            lastUpdated: '',
          },
          supportedModes: ['banktransfer'],
          status: 'ACTIVE',
          addedOn: '2022-04-12T00:00:00+05:30',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(FundSourcesService, 'getAllFSCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(FundSourcesService, 'recharge')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'create')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getDetails')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'connect')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'updateDetails')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'addBalance')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In FundSources Container', () => {
  test('checks render', async () => {
    render(<Aggregators />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText('Payout Aggregator')).toBeInTheDocument();
      expect(
        screen.queryByText('Wallet/connected acc. from Razorypay, juspay etc.'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Routing Configurations')).toBeInTheDocument();

      expect(screen.queryByText('Add Bank / Aggregator')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Add/manage payout aggregators or bank accounts to configure your payment routing preferences.',
        ),
      ).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.UPDATE_DETAILS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{
          fundSourceId: 39240,
          paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        }}
        setSelectedRow={jest.fn()}
        modalData={{
          type: 'positive',
        }}
        setModalData={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Update Details')).toBeInTheDocument();
    expect(
      screen.queryByText('Latest Credit Card Statement'),
    ).not.toBeInTheDocument();

    expect(screen.queryByText('File type: .pdf')).not.toBeInTheDocument();

    const submitButton = screen.queryByRole('button', {
      name: 'Update',
    });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toBeInTheDocument();

    const displayNameInput = getByTestId('display-name').querySelector('input');

    await userEvent.type(displayNameInput, 'foobar');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    expect(FundSourcesService.updateDetails).toHaveBeenCalledWith(39240, {
      displayName: 'foobar',
    });

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.ADD_BALANCE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{
          fundSourceId: 39240,
          paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        }}
        setSelectedRow={jest.fn()}
        modalData={{
          type: 'positive',
        }}
        setModalData={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Recharge')).toBeInTheDocument();
    expect(screen.queryAllByText('Optional').length).toBe(3);

    const submitButton = screen.queryByRole('button', {
      name: 'Confirm',
    });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toBeInTheDocument();

    const amountInput = getByTestId('amount').querySelector('input');
    const rechargeIdInput = getByTestId('recharge-id').querySelector('input');
    const utrInput = getByTestId('utr').querySelector('input');
    const remarksInput = getByTestId('remarks');

    await userEvent.type(amountInput, '100');
    expect(mockAmountValidation).toHaveBeenCalledTimes(3);

    await userEvent.type(rechargeIdInput, 'foo');

    await userEvent.type(utrInput, 'bar');

    await userEvent.type(remarksInput, 'baz');
    expect(mockRemarksValidation).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    expect(FundSourcesService.addBalance).toHaveBeenCalledWith(
      'CREDIT_CARD_102_c5fecd2',
      {
        amount: 100,
        rechargeId: 'foo',
        remarks: 'baz',
        utr: 'bar',
      },
    );

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.ADD_BALANCE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{
          fundSourceId: 39240,
          paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        }}
        setSelectedRow={jest.fn()}
        modalData={{
          type: 'positive',
        }}
        setModalData={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Reference ID')).toBeInTheDocument();

      expect(screen.queryAllByText(/Optional/i).length).toBe(3);

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  // test('checks Modals render', async () => {
  //   const setModalType = jest.fn();
  //   const setFetchCounter = jest.fn();

  //   render(
  //     <Modals
  //       modalType={MODAL_TYPE.CREATE_ROUTER_BANK_ACCOUNT}
  //       setModalType={setModalType}
  //       setFetchCounter={setFetchCounter}
  //       selectedRow={{
  //         fundSourceId: 39240,
  //         paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
  //       }}
  //       setSelectedRow={jest.fn()}
  //       modalData={{
  //         type: 'positive',
  //       }}
  //       setModalData={jest.fn()}
  //     />,
  //     { wrapper: CustomWrapper },
  //   );

  //   await waitFor(() => {
  //     expect(screen.queryByText('Add Connected Account')).toBeInTheDocument();

  //     const cancelButton = screen.queryByText('Cancel');

  //     expect(cancelButton).not.toBeDisabled();
  //     expect(cancelButton).toBeInTheDocument();

  //     // fireEvent.click(cancelButton);

  //     // expect(setModalType).toHaveBeenCalled();
  //   });
  // });

  // test('checks Modals render', async () => {
  //   const setModalType = jest.fn();
  //   const setFetchCounter = jest.fn();

  //   render(
  //     <Modals
  //       modalType={MODAL_TYPE.APPROVE_ICIC}
  //       setModalType={setModalType}
  //       setFetchCounter={setFetchCounter}
  //       selectedRow={{
  //         fundSourceId: 39240,
  //         paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
  //       }}
  //       setSelectedRow={jest.fn()}
  //       modalData={{
  //         type: 'positive',
  //       }}
  //       setModalData={jest.fn()}
  //     />,
  //     { wrapper: CustomWrapper },
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText('Approval Request Sent To ICICI'),
  //     ).toBeInTheDocument();

  //     expect(screen.queryByText('Access ICICI Portal')).toBeInTheDocument();

  //     const submitButton = screen.queryByRole('button', {
  //       name: 'Access ICICI Portal',
  //     });

  //     expect(submitButton).toHaveClass('ml-2');
  //     expect(submitButton).toBeInTheDocument();

  //     fireEvent.click(submitButton);

  //     const cancelButton = screen.queryByText('I will do it later');

  //     expect(cancelButton).not.toBeDisabled();
  //     expect(cancelButton).toBeInTheDocument();

  //     fireEvent.click(cancelButton);

  //     expect(setModalType).toHaveBeenCalled();
  //   });
  // });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.APPROVE_YESB}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{
          fundSourceId: 39240,
          paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        }}
        setSelectedRow={jest.fn()}
        modalData={{
          type: 'positive',
        }}
        setModalData={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Fund Source Verified & Added'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          'We have sent your details to YES bank representatives to assist you in activating the fund source.',
        ),
      ).toBeInTheDocument();

      expect(screen.queryByText('1234567890')).toBeInTheDocument();
      expect(
        screen.queryByText('kisley.shirish+cfmain@cashfree.com'),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Ok, got it',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Row click', async () => {
    render(<Aggregators />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/14576/details`,
    );
  });
});
