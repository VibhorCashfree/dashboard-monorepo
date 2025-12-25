import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

// Pages
import Ifsc from '..';

// Utils
import pitchPage from 'utils/pitchPage';

const renderer = new ShallowRenderer();

jest
  .mock('utils/pitchPage')
  .spyOn(pitchPage, 'get')
  .mockImplementation(() => ['UPI', 'PAN', 'AADHAAR', 'GSTIN']);

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/ifsc', key: 'testKey' }]}>
    <Theme>
      <MerchantContext.Provider value={merchantProviderMock}>
        <AccountContext.Provider value={accountProviderMock}>
          {children}
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

describe('In Ifsc page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <MemoryRouter initialEntries={[{ pathname: '/ifsc', key: 'testKey' }]}>
        <Theme>
          <MerchantContext.Provider value={merchantProviderMock}>
            <AccountContext.Provider value={accountProviderMock}>
              <Ifsc />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<Ifsc />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Verify IFSC')).toBeInTheDocument();
      expect(screen.queryByText('Enter IFSC')).toBeInTheDocument();
      expect(
        screen.queryByText('IFSC must be 11 characters'),
      ).toBeInTheDocument();

      expect(screen.queryByText('How to verify an IFSC?'));
    });
  });

  test('checks render', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['IFSC', 'PAN', 'AADHAAR']);

    render(<Ifsc />, { wrapper: Wrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Try IFSC Verification/));
    });
  });
});
