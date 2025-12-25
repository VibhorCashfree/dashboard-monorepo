import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Tabs from '../components/Tabs';

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

jest.mock('containers/AgreementOverview', () => () => (
  <div>AgreementOverview</div>
));
jest.mock('containers/AgreementAccountDetails', () => () => (
  <div>AgreementAccountDetails</div>
));

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('Tabs Component', () => {
  test('should render the Tabs component with the correct default active tab', () => {
    render(<Tabs />, { wrapper: Wrapper });

    expect(screen.getByText('AgreementAccountDetails')).toBeInTheDocument();

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Account Details')).toHaveClass('active');
  });

  test('should switch tabs and render AgreementAccountDetails on tab change', () => {
    render(<Tabs />, { wrapper: Wrapper });

    expect(screen.getByText('AgreementAccountDetails')).toBeInTheDocument();
    expect(screen.queryByText('AgreementOverview')).toBeNull();

    // Simulate clicking the "Account Details" tab
    fireEvent.click(screen.getByText('Overview'));

    // Ensure the AccountDetails component is rendered
    expect(screen.getByText('AgreementOverview')).toBeInTheDocument();
    expect(screen.queryByText('AgreementAccountDetails')).toBeNull();

    // Check if navigate function is called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith(
      '/one-escrow/agreements/details/overview',
    );
  });
});
