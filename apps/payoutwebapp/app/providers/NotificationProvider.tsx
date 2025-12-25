import React, { lazy, Suspense } from 'react';

// Components
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackComponent from 'components/FallbackComponent';

const NotificationProviderMF = lazy(() =>
  import(/* webpackPrefetch: true */ 'CommonModule/NotificationProvider').catch(
    () => ({
      default: FallbackComponent,
    }),
  ),
);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary fallback={<></>}>
    <Suspense fallback={<></>}>
      <NotificationProviderMF>{children}</NotificationProviderMF>
    </Suspense>
  </ErrorBoundary>
);

export default NotificationProvider;
