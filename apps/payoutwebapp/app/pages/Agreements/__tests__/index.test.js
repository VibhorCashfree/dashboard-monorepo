import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';

// Services
import * as AgreementsService from 'services/agreements';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Pages
import Agreements from '..';

const renderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/' }]}>
    <Theme>
      <MerchantContext.Provider value={mockMerchantProvider}>
        <AccountContext.Provider value={mockAccountProvider}>
          <ListProvider>{children}</ListProvider>
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

beforeEach(() => {
  jest.mock('services/agreements');

  jest.spyOn(AgreementsService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          agreement_id: 'test123',
          purpose: 'foo bar',
          total_amount: '120',
          start_date: '2023-12-09T00:00:00+05:30',
          expiry_date: '2023-12-30T00:00:00+05:30',
          status: 'REJECTED',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(AgreementsService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Agreements page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <Agreements />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks Agreements', async () => {
    render(<Agreements />, { wrapper: CustomWrapper });

    expect(AgreementsService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        lastId: '0',
        size: 10,
        status: [],
      }),
    );
    expect(AgreementsService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        lastId: '0',
        size: 10,
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Agreement ID')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Start Date')).toBeInTheDocument();
      expect(screen.queryByText('Expiry Date')).toBeInTheDocument();
      expect(screen.queryByText('Amount')).toBeInTheDocument();
      expect(screen.queryByText('Last 7 days')).toBeInTheDocument();

      expect(screen.queryByText('test123')).toBeInTheDocument();
      expect(screen.queryByText('foo bar')).toBeInTheDocument();
      expect(screen.queryByText('₹ 120.00')).toBeInTheDocument();
      expect(screen.queryByText('Rejected')).toBeInTheDocument();

      const button = screen.queryByRole('button', {
        name: 'Add Agreement',
      });

      expect(button).toBeInTheDocument();
    });
  });
});
