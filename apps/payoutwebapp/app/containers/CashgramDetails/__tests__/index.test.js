import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Services
import * as CashgramsService from 'services/cashgrams';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import CashgramDetails from '..';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  }),
  useLocation: () => ({
    pathname: '/',
    state: {
      fromBatch: true,
      rowDetails: { cashgramId: 'VIMOB4370', status: 'REDEEMED' },
    },
  }),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.mock('services/cashgrams');

  jest.spyOn(CashgramsService, 'getDetails').mockImplementation(() =>
    Promise.resolve({
      beneficiary: { name: 'bzhhs', phone: '9765556171', email: '' },
      createdAt: '2022-11-16T13:03:33+05:30',
      validTill: '2022-12-17T00:00:00+05:30',
      addedBy: { name: 'Logesh', source: 'MOBILE' },
      link: 'https://cg.cashfree.com/wln6qou',
      status: 'REDEEMED',
      approvals: [],
      rejections: [],
      redemption: {
        redeemedAt: '2022-11-16T13:06:09+05:30',
        utr: '232013200707',
        transferMethod: 'UPI',
        accountHolder: 'bzhhs',
        accountNumber: '',
        ifsc: '',
        vpa: 'prakritimks@okhdfcbank',
        phone: '9765556171',
        maskedCard: '',
      },
      verificationDetails: { name: '', date: '', status: false },
      reason: '',
      type: '',
      description: '',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In CashgramDetails Container', () => {
  test('checks render', async () => {
    render(<CashgramDetails />, { wrapper: Wrapper });

    expect(CashgramsService.getDetails).toHaveBeenCalledWith(123, true);

    await waitFor(() => {
      expect(screen.queryByText('MOBILE')).toBeInTheDocument();
      expect(screen.queryByText('VIMOB4370')).toBeInTheDocument();
      expect(
        screen.queryByText('https://cg.cashfree.com/wln6qou'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Redeemed')).toBeInTheDocument();
    });
  });

  test('back button is functional', async () => {
    render(<CashgramDetails />, { wrapper: Wrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
