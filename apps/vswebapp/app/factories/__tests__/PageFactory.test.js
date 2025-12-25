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
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

// Factories
import PageFactory from '../PageFactory';

const renderer = new ShallowRenderer();

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

describe('PageFactory', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <PageFactory componentName="ifsc" />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<PageFactory componentName="ifsc" />, { wrapper: Wrapper });
  });

  test('checks render Summary', async () => {
    renderer.render(
      <Wrapper>
        <PageFactory componentName="summary" />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
