import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { store } from '../utils';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

const Wrapper = ({ children, contextValues = [] }) => {
  const [
    merchantProviderValue = merchantProviderMock,
    accountProviderValue = accountProviderMock,
  ] = contextValues;

  return (
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <Provider store={store}>
        <Theme>
          <MerchantContext.Provider value={merchantProviderValue}>
            <AccountContext.Provider value={accountProviderValue}>
              {children}
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </Provider>
    </MemoryRouter>
  );
};

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
  contextValues: PropTypes.array,
};

export default Wrapper;
