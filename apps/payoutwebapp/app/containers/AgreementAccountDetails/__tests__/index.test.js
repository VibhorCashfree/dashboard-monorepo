import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Services
import * as AgreementsService from 'services/agreements';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import AgreementAccountDetails from '..';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {},
  }),
  useParams: () => ({
    id: '123',
  }),
}));

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/agreements');

  jest.spyOn(AgreementsService, 'getStatement').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 42,
          agreement_id: 42,
          account_id: 459045,
          purpose: 'Testing',
          status: 'REJECTED',
          total_amount: '1000',
          start_date: '2023-10-12T05:30:00+05:30',
          expiry_date: '2023-10-13T05:30:00+05:30',
          remarks: 'BENE_KYC_FAILED_FOR_BENEID_38355010021319177_2235103',
          added_on: '2023-10-12T13:43:20+05:30',
          updated_on: '2023-10-12T13:43:37+05:30',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(AgreementsService, 'getStatementCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest.spyOn(AgreementsService, 'getBalance').mockImplementation(() =>
    Promise.resolve({
      bank_account_number: '1234567890',
      ifsc: 'SBIN0005943',
      bank_name: 'SBI Bank India',
      balance: '100',
      available_balance: '34',
      funds_on_hold: '11',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AgreementAccountDetails Container', () => {
  test('checks render', async () => {
    render(<AgreementAccountDetails />, { wrapper: CustomWrapper });

    expect(AgreementsService.getBalance).toHaveBeenCalledWith(123);

    expect(AgreementsService.getStatement).toHaveBeenCalledWith(
      123,
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(AgreementsService.getStatementCount).toHaveBeenCalledWith(
      123,
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Last 7 days')).toBeInTheDocument();
      expect(screen.queryByText('Statements')).toBeInTheDocument();
      expect(screen.queryByText('1234567890')).toBeInTheDocument();
      expect(screen.queryByText('₹ 34.00')).toBeInTheDocument();
      expect(screen.queryByText('SBIN0005943')).toBeInTheDocument();
      expect(screen.queryByText('Available Balance')).toBeInTheDocument();
      expect(screen.queryByText('Debit')).toBeInTheDocument();
      expect(screen.queryByText('Remarks')).toBeInTheDocument();
      expect(screen.queryByText('Closing Balance')).toBeInTheDocument();
    });
  });
});
