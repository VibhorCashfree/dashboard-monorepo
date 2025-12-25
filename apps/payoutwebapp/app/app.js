import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import { I18nSetup, getSentryConfig } from '@cashfree-intl/coherent';
import Analytics from '@cashfree-intl/analytics';

import errorMessages from '../translations/validationErrors.json';

// Components
import App from 'containers/App';

// Utils
import Token from 'utils/token';

// Store
import configureStore from 'redux/configureStore';

const store = configureStore({});

const MOUNT_NODE = document.getElementById('app');

const { NODE_ENV: env, PUBLIC_PATH: basename } = process.env;

const root = createRoot(MOUNT_NODE);

const render = () =>
  root.render(
    <BrowserRouter basename={basename.slice(0, basename.length - 1)}>
      <I18nSetup messages={{ en: errorMessages }}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nSetup>
    </BrowserRouter>,
  );

if (module.hot) {
  // Hot reloadable React components
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    root.unmount();
    render();
  });
}

Analytics.init({
  product: 'Payouts',
  token: Token.get(),
  isDebug: process.env.NODE_ENV === 'development',
});

if (env === 'prod') {
  TagManager.initialize({
    gtmId: process.env.GTM_ID,
  });

  Sentry.init(
    getSentryConfig({
      dsn: 'https://0b8304c28e5749d6b13803bfe0cdf622@o330525.ingest.sentry.io/4504836192206848',
      integrations: [
        Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect: React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
        Sentry.captureConsoleIntegration(),
        Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
      ],
      release: 'payoutwebapp-10/12/2025',
    }),
  );
}

render();
