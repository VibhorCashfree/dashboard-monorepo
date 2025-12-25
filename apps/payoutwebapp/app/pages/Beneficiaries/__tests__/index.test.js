import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Pages
import Beneficiaries from '..';

const renderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/batch' }]}>
    <Theme>
      <MerchantContext.Provider value={mockMerchantProvider}>
        <AccountContext.Provider value={mockAccountProvider}>
          <ListProvider>
            <BatchDetailsProvider>{children}</BatchDetailsProvider>
          </ListProvider>
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

describe('In Beneficiaries page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <Beneficiaries />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks Beneficiaries', async () => {
    render(<Beneficiaries />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(screen.queryByText('Uploaded At')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Invalid')).toBeInTheDocument();
      expect(screen.queryByText('Uploaded By')).toBeInTheDocument();
      expect(screen.queryByText('No data found!')).toBeInTheDocument();
      expect(screen.queryByText('Uploaded By')).toBeInTheDocument();
      expect(screen.queryByText('Last 7 days')).toBeInTheDocument();
      expect(
        screen.queryByText('How to add Beneficiaries?'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('All Beneficiaries including batch are shown here.'),
      );
    });
  });
});
