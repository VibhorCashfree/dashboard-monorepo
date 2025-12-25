import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Constants
import { SUBMENU, PATH_BY_SUBMENU } from 'constants/menuItems';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Pages
import OneEscrow from '..';

jest.mock('pages/Agreements', () => () => <div>Agreements Page</div>);

jest.mock('containers/VirtualAccountDetails', () => () => (
  <div>Virtual Account Details Page</div>
));

jest.mock('containers/EscrowAccount', () => () => (
  <div>Escrow Account Page</div>
));

const renderer = new ShallowRenderer();

describe('OneEscrow Component', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Theme>
          <MerchantContext.Provider value={mockMerchantProvider}>
            <AccountContext.Provider value={mockAccountProvider}>
              <OneEscrow />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('should render Agreements component for /agreements route', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: `/${PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]}/*` },
        ]}
      >
        <Theme>
          <MerchantContext.Provider value={mockMerchantProvider}>
            <AccountContext.Provider value={mockAccountProvider}>
              <OneEscrow />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Agreements Page')).toBeInTheDocument();
    });
  });

  test('should render VirtualAccountDetails component for /escrow-account/virtual-accounts/details route', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: `/${PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]}/${
              PATH_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]
            }/${PATH_BY_SUBMENU[SUBMENU.DETAILS]}/*`,
          },
        ]}
      >
        <Theme>
          <MerchantContext.Provider value={mockMerchantProvider}>
            <AccountContext.Provider value={mockAccountProvider}>
              <OneEscrow />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Virtual Account Details Page'),
      ).toBeInTheDocument();
    });
  });

  test('should render EscrowAccount component for /escrow-account route', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: `/${PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]}/*` },
        ]}
      >
        <Theme>
          <MerchantContext.Provider value={mockMerchantProvider}>
            <AccountContext.Provider value={mockAccountProvider}>
              <OneEscrow />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Escrow Account Page')).toBeInTheDocument();
    });
  });

  test('should redirect to Agreements component for unknown route', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/unknown' }]}>
        <Theme>
          <MerchantContext.Provider value={mockMerchantProvider}>
            <AccountContext.Provider value={mockAccountProvider}>
              <OneEscrow />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Agreements Page')).toBeInTheDocument();
    });
  });
});
