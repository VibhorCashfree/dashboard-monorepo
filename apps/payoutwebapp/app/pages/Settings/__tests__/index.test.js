import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Pages
import Settings from '..';

const renderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
    <Theme>
      <MerchantContext.Provider value={mockMerchantProvider}>
        <AccountContext.Provider value={mockAccountProvider}>
          {children}
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

describe('In Settings page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <Settings />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks Settings', async () => {
    render(<Settings />, { wrapper: CustomWrapper });

    await waitFor(async () => {
      expect(
        await screen.findByText('Merchant Notifications'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Add Recipient')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Configure the email category that you want to get notified about. Click Add Recipient to add members in your organization to receive the emails.',
        ),
      ).toBeInTheDocument();
    });
  });
});
