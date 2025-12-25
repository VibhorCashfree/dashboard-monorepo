import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Theme, I18nSetup } from '@cashfree-intl/coherent';
import { AuthContext } from '@cashfree-intl/auth';

// Store
import configureStore from 'redux/configureStore';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
  mockFundSources,
} from '__mocks__/common.mock';

import errorMessages from '../../../translations/validationErrors.json';

const initialState = {
  fundSources: mockFundSources,
  downtimes: [],
  fetchFundSources: jest.fn(),
  fetchDowntimes: jest.fn(),
};

const store = configureStore(initialState);

const Wrapper = ({ children, contextValues = [] }) => {
  const [
    merchantProviderValue = mockMerchantProvider,
    accountProviderValue = mockAccountProvider,
  ] = contextValues;

  return (
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <I18nSetup messages={{ en: errorMessages }}>
        <Provider store={store}>
          <Theme>
            <MerchantContext.Provider value={merchantProviderValue}>
              <AccountContext.Provider value={accountProviderValue}>
                <AuthContext.Provider
                  value={{
                    loading: false,
                    permissionCodes: [],
                    isAlias: false,
                    updateUserDetails: jest.fn(),
                  }}
                >
                  {children}
                </AuthContext.Provider>
              </AccountContext.Provider>
            </MerchantContext.Provider>
          </Theme>
        </Provider>
      </I18nSetup>
    </MemoryRouter>
  );
};

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
  contextValues: PropTypes.array,
};

export default Wrapper;
