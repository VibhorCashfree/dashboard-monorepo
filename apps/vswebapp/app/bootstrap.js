import '@babel/polyfill';
import React from 'react';
import {
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

import { I18nSetup } from '@cashfree-intl/coherent';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import _get from 'lodash/get';

import errorMessages from '../externaliseError/validationErrors.json';

import PackageJson from '/package.json';

// Providers
import NotificationProvider from 'providers/NotificationProvider';

// Constants
import { PROD } from 'constants/common';

// Containers
import App from 'containers/App';

// Stores
import configureStore from 'redux/configureStore';

const store = configureStore({});

const root = createRoot(document.getElementById('app'));

const basename = process.env.PUBLIC_PATH;
const env = process.env.NODE_ENV;

const render = () => {
  root.render(
    <BrowserRouter basename={basename.slice(0, basename.length - 1)}>
      <I18nSetup messages={{ en: errorMessages }}>
        <Provider store={store}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </Provider>
      </I18nSetup>
    </BrowserRouter>,
  );
};

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    root.unmount();
    render();
  });
}

if (env === PROD) {
  TagManager.initialize({
    gtmId: process.env.GTM_ID,
  });
}

if (env === PROD) {
  Sentry.init({
    dsn:
      'https://d845e8a714e0e517f0f0e7659b4f2c7f@o330525.ingest.sentry.io/4506025870295040',
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
    ],
    // Performance monitoring
    tracesSampleRate: 0.1, // 10% of transactions
    replaysSessionSampleRate: 0.01, // 1% of sessions
    replaysOnErrorSampleRate: 1.0, // Always capture on errors
    release: `vs-webapp-${PackageJson.version}`,
    environment: env,
    ignoreErrors: [
      'Unauthorized',
      /401/,
      /(bot\/bot)/,
      /Cannot read properties of null (reading 'style')/,
      /Loading chunk/,
      /li\.lms-analytics/,
      /require is not defined/,
      /chrome-extension:/i,
    ],
    beforeBreadcrumb: (breadcrumb, hint) => {
      const isXhr = _get(breadcrumb, 'category') === 'xhr';
      const statusCode = _get(breadcrumb, 'data.status_code', 200);

      if (isXhr) {
        const request = _get(breadcrumb, 'data');
        const response = _get(hint, 'xhr.response');

        if (request.url.includes(process.env.DASHBOARD_URL)) {
          // eslint-disable-next-line no-param-reassign
          breadcrumb.message = {
            request,
            response,
          };
        }

        if (isXhr && statusCode >= 400 && statusCode <= 600) {
          return { ...breadcrumb, ignore: true };
        }
      }

      return breadcrumb;
    },
    beforeSend: event => {
      if (event.tags && _get(event.tags, 'priority') === 'p0') {
        return event;
      }

      const hasIgnoredXhr = event.breadcrumbs?.some(crumb =>
        _get(crumb, 'ignore', false),
      );
      if (hasIgnoredXhr) {
        return null; // Drop the event
      }

      return event;
    },
  });
}

render();
