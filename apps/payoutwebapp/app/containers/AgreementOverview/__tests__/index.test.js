import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Services
import * as AgreementsService from 'services/agreements';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import AgreementOverview from '..';

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

  jest.spyOn(AgreementsService, 'getDetails').mockImplementation(() =>
    Promise.resolve({
      id: 42,
      agreement_id: 42,
      purpose: 'Testing',
      status: 'REFUND',
      total_amount: '200',
      start_date: '2023-10-12T05:30:00+05:30',
      expiry_date: '2023-10-13T05:30:00+05:30',
      remarks: 'AGREEMENT_MARKED_SIGNED',
      added_on: '2023-10-12T13:43:20+05:30',
      updated_on: '2023-10-12T13:43:37+05:30',
      parties: [
        {
          type: 'BUYER',
          pan: 'xyz',
          name: 'John Doe',
          bene_Id: 'zzzz',
          phone: '90009834391',
          email: 'john@example.com',
          address: '',
          bank_account: '12345678',
          ifsc: 'CITI0000009',
          transfer_detail: {
            transfer_id: '77893vhgd',
            added_on: '2023-10-12T13:43:20+05:30',
            transfer_status: 'PENDING',
            amount: '136',
          },
        },
        {
          type: 'SELLER',
          pan: 'ABC',
          name: 'Kerry Von',
          bene_Id: 'yyyy',
          phone: '88889834391',
          email: 'kerry@example.com',
          address: '',
          bank_account: '98766543',
          ifsc: 'ICIC0000011',
          transfer_detail: {
            transfer_id: '90723caf',
            added_on: '2023-10-12T13:43:20+05:30',
            transfer_status: 'FAILED',
            amount: '55',
          },
        },
      ],
    }),
  );

  jest
    .spyOn(AgreementsService, 'download')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(AgreementsService, 'markTerminalStatus')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AgreementOverview Container', () => {
  test('checks render', async () => {
    render(<AgreementOverview />, { wrapper: CustomWrapper });

    expect(AgreementsService.getDetails).toHaveBeenCalledWith(123);

    await waitFor(() => {
      expect(screen.queryByText('Testing')).toBeInTheDocument();
      expect(screen.queryByText('₹ 200.00')).toBeInTheDocument();
      expect(screen.queryByText('Refund')).toBeInTheDocument();
      expect(screen.queryByText('Transfer Details')).toBeInTheDocument();

      const downloadButton = screen.queryByText('Download Agreement');

      expect(downloadButton).not.toBeDisabled();
      expect(downloadButton).toBeInTheDocument();

      expect(screen.queryByText('Buyer 1')).toBeInTheDocument();
      expect(screen.queryAllByText('John Doe').length).toBe(2);

      expect(screen.queryByText('john@example.com')).not.toBeInTheDocument();
      expect(screen.queryByText('90009834391')).not.toBeInTheDocument();
      expect(screen.queryByText('CITI0000009')).not.toBeInTheDocument();
      expect(screen.queryByText('xyz')).not.toBeInTheDocument();
      expect(screen.queryByText('12345678')).not.toBeInTheDocument();

      fireEvent.click(screen.queryAllByRole('chevron-down')[0]);

      expect(screen.queryByText('john@example.com')).toBeInTheDocument();
      expect(screen.queryByText('90009834391')).toBeInTheDocument();
      expect(screen.queryByText('CITI0000009')).toBeInTheDocument();
      expect(screen.queryByText('xyz')).toBeInTheDocument();
      expect(screen.queryByText('12345678')).toBeInTheDocument();

      expect(screen.queryByText('Seller 1')).toBeInTheDocument();
      expect(screen.queryByText('Kerry Von')).toBeInTheDocument();

      expect(screen.queryByText('kerry@example.com')).not.toBeInTheDocument();
      expect(screen.queryByText('88889834391')).not.toBeInTheDocument();
      expect(screen.queryByText('ICIC0000011')).not.toBeInTheDocument();
      expect(screen.queryByText('ABC')).not.toBeInTheDocument();
      expect(screen.queryByText('98766543')).not.toBeInTheDocument();

      fireEvent.click(screen.queryAllByRole('chevron-down')[0]);

      expect(screen.queryByText('kerry@example.com')).toBeInTheDocument();
      expect(screen.queryByText('88889834391')).toBeInTheDocument();
      expect(screen.queryByText('ICIC0000011')).toBeInTheDocument();
      expect(screen.queryByText('ABC')).toBeInTheDocument();
      expect(screen.queryByText('98766543')).toBeInTheDocument();

      expect(screen.queryByText('Transferred To')).toBeInTheDocument();

      expect(screen.queryByText('77893vhgd')).toBeInTheDocument();
      expect(screen.queryByText('Pending')).toBeInTheDocument();
      expect(screen.queryByText('zzzz')).toBeInTheDocument();
      expect(screen.queryByText('₹ 136.00')).toBeInTheDocument();

      expect(screen.queryByText('90723caf')).not.toBeInTheDocument();
      expect(screen.queryByText('Failed')).not.toBeInTheDocument();
      expect(screen.queryByText('yyyy')).not.toBeInTheDocument();
      expect(screen.queryByText('₹ 55.00')).not.toBeInTheDocument();
    });
  });
});
