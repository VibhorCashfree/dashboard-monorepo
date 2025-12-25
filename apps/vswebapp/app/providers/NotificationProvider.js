// providers/NotificationProvider.js

import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'components/ErrorBoundary';

const CommonModuleNotificationProvider = lazy(() =>
  // eslint-disable-next-line import/no-unresolved
  import('CommonModule/NotificationProvider'),
);

const NotificationProvider = ({ children }) => (
  /**
   * fallback must be set to `children`, to ensure if an error is thrown by module-federation-plugin
   * ErrorBoundary can catch it & will replace the Provider with its `children`.
   * This way it won't block the rendering of host app.
   */
  <ErrorBoundary fallback={<>{children}</>}>
    <Suspense fallback={<></>}>
      <CommonModuleNotificationProvider>
        {children}
      </CommonModuleNotificationProvider>
    </Suspense>
  </ErrorBoundary>
);

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
