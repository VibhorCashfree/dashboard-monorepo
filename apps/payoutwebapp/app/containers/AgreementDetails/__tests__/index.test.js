import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Containers
import AgreementDetails from 'containers/AgreementDetails';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';

// Components
import Wrapper from '__tests__/components/Wrapper';

const mockNavigate = jest.fn();

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useMatch: () => ({
    pathname: '/one-escrow/agreements/details/account-details',
  }),
  useLocation: () => ({
    pathname: '/',
    state: {},
  }),
  useParams: () => ({
    tabId: 'account-details',
  }),
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('AgreementDetails', () => {
  test('should render correctly', () => {
    render(<AgreementDetails />, { wrapper: Wrapper });

    expect(screen.getByText('Agreements Details')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Account Details')).toHaveClass('active');

    expect(screen.getByText('Account Number')).toBeInTheDocument();

    expect(screen.getByText('IFSC Code')).toBeInTheDocument();
    expect(screen.getByText('₹ 0.00')).toBeInTheDocument();
    expect(screen.getByText('Last 7 days')).toBeInTheDocument();
    expect(screen.getByText('Date & Time')).toBeInTheDocument();
    expect(screen.getByText('Debit')).toBeInTheDocument();
    expect(screen.getByText('Remarks')).toBeInTheDocument();

    expect(screen.getAllByTestId('table-header-cell').length).toBe(6);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('back button is functional', async () => {
    render(<AgreementDetails />, { wrapper: Wrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
        PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]
      }`,
    );
  });
});
