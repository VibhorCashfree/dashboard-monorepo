import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Factories
import PageFactory from '../PageFactory';

const renderer = new ShallowRenderer();

// Mocking MFE Module
jest.mock('RiskShieldWebApp/RiskShield', () => {}, { virtual: true });

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
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

describe('PageFactory', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <PageFactory componentName="account" />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<PageFactory componentName="account" />, { wrapper: Wrapper });
  });
});
