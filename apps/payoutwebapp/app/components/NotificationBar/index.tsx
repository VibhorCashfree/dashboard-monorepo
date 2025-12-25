import React, { lazy, Suspense } from 'react';

// Components
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackComponent from 'components/FallbackComponent';

const NotificationBarMF = lazy(() =>
  import(/* webpackPrefetch: true */ 'CommonModule/NotificationBar').catch(
    () => ({
      default: FallbackComponent,
    }),
  ),
);

const NotificationBar = () => (
  <ErrorBoundary fallback={<></>}>
    <Suspense fallback={<></>}>
      <NotificationBarMF />
    </Suspense>
  </ErrorBoundary>
);

export default NotificationBar;
