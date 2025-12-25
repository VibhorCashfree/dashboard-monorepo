import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Services
import * as BeneficiariesService from 'services/beneficiaries';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import BeneficiaryDetails from '..';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      fromBatch: true,
      rowDetails: { id: 'foo', beneId: 'VIMOB4370', status: 'REDEEMED' },
    },
  }),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.mock('services/beneficiaries');

  jest.spyOn(BeneficiariesService, 'getDetails').mockImplementation(() =>
    Promise.resolve({
      name: 'suniltest',
      email: 'test@cashfree.com',
      phone: '9999999999',
      address1: 'test',
      bankAccount: '203784782973928',
      ifsc: 'SBIN0003455',
      vpa: '8218745248@ybl',
      addedOn: '2022-11-29 00:17:50.0',
      reason: '',
      benePurpose: 'CORP_CC',
      beneficiaryKycDocData: [],
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BeneficiaryDetails Container', () => {
  test('checks render', async () => {
    render(<BeneficiaryDetails />, { wrapper: Wrapper });

    expect(BeneficiariesService.getDetails).toHaveBeenCalledWith('foo');

    await waitFor(() => {
      expect(screen.queryByText('UPI VPA')).toBeInTheDocument();
      expect(screen.queryByText(/203784782973928/)).toBeInTheDocument();
      expect(screen.queryByText('9999999999')).toBeInTheDocument();
      expect(screen.queryByText('test@cashfree.com')).toBeInTheDocument();
    });
  });

  test('back button is functional', async () => {
    render(<BeneficiaryDetails />, { wrapper: Wrapper });
    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
