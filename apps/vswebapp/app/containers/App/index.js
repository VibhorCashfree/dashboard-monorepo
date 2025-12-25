import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Theme,
  ToastContainer,
  Conditional,
  GlobalStyle as CashfreeGlobalStyle,
} from '@cashfree-intl/coherent';
import Analytics from '@cashfree-intl/analytics';
import { AppEnv, AuthProvider, ProductName } from '@cashfree-intl/auth';

import * as Sentry from '@sentry/react';

// Providers
import { MerchantContext, MerchantProvider } from 'providers/MerchantProvider';
import { AccountProvider } from 'providers/AccountProvider';

// Utils
import Env from 'utils/env';
import { getThemeConfig } from './utils';
import getQuery from 'utils/getQuery';

// Constants
import { TEST, PROD } from 'constants/common';

// Components
import PitchPage from 'components/PitchPage';
import Routes from './components/Routes';
import OTPModal from './components/OTPModal';
import GlobalStyle from '../../global-styles';
import AccountSwitcherModal from './components/AccountSwitcherModal';
import Loader from 'components/Loader';
import SessionTimeoutModal from './components/SessionTimeoutModal';

// Layout
import BaseLayout from 'containers/Layout';
import ErrorBoundary from 'components/ErrorBoundary';

export const App = () => {
  const navigate = useNavigate();
  const query = getQuery();

  const [env, setEnv] = useState(() => query.get('env'));

  useEffect(() => {
    if (!env) {
      return;
    }

    Env.set(env);

    window.location.href = window.location.pathname;
  }, [env]);

  const onEnvSwitch = () => {
    const newEnv = Env.get() === PROD ? TEST : PROD;
    navigate({
      search: `?env=${newEnv}`,
    });

    setEnv(newEnv);
  };

  return (
    <Theme theme={getThemeConfig()}>
      <ErrorBoundary>
        <MerchantProvider>
          <AccountProvider>
            <AuthProvider
              product={ProductName.VRS}
              appEnv={process.env.NODE_ENV}
              loader={<Loader />}
            >
              <MerchantContext.Consumer>
                {({ activationDetails }) => {
                  const isActivated = activationDetails.VRS === 'APPROVED';
                  const showPitchPage = !(isActivated || Env.isTest());
                  if (activationDetails.VRS === 'APPROVED') {
                    Analytics.init({
                      product: 'VRS',
                      token: localStorage.getItem('merchantToken'),
                      isDebug: process.env.NODE_ENV !== 'prod',
                    });
                  }
                  return (
                    <>
                      <BaseLayout onEnvSwitch={onEnvSwitch}>
                        <Conditional if={showPitchPage}>
                          <div className="ml-6 p-4">
                            <PitchPage productCode="VRS" />
                          </div>
                        </Conditional>
                        <Conditional if={!showPitchPage}>
                          <Routes />
                          <OTPModal />
                          <AccountSwitcherModal />
                        </Conditional>
                      </BaseLayout>
                    </>
                  );
                }}
              </MerchantContext.Consumer>
            </AuthProvider>
          </AccountProvider>
        </MerchantProvider>
        {/* <SessionTimeoutModal /> */}
        <CashfreeGlobalStyle />
        <GlobalStyle />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          stacked
        />
      </ErrorBoundary>
    </Theme>
  );
};

export default Sentry.withProfiler(App);

console.log('App starts', process.env.NODE_ENV, process.env.APP_ENV);
