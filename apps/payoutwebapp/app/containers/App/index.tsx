import React from 'react';
import {
  Theme,
  ToastContainer,
  GlobalStyle as CashfreeGlobalStyle,
  Loader,
} from '@cashfree-intl/coherent';
import { AuthProvider, ProductName } from '@cashfree-intl/auth';

import * as Sentry from '@sentry/react';

// Providers
import { MerchantProvider } from 'providers/MerchantProvider';
import { AccountProvider } from 'providers/AccountProvider';
import NotificationProvider from 'providers/NotificationProvider';

// Containers
import BaseLayout from 'containers/BaseLayout';

// Components
import Dashboard from './components/Dashboard';

// Styled
import GlobalStyle from '../../global-styles';

const App: React.FC = () => (
  <Theme>
    <MerchantProvider>
      <AccountProvider>
        <AuthProvider
          product={ProductName.PAYOUTS}
          appEnv={process.env.APP_ENV as string}
          loader={<Loader active />}
        >
          <NotificationProvider>
            <BaseLayout>
              <Dashboard />
            </BaseLayout>
          </NotificationProvider>
        </AuthProvider>
      </AccountProvider>
    </MerchantProvider>
    <CashfreeGlobalStyle />
    <GlobalStyle />
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={true}
      stacked
    />
  </Theme>
);

export default Sentry.withProfiler(App);
