import React, { lazy, Suspense } from 'react';

// Components
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackComponent from 'components/FallbackComponent';

const NotificationPopoverMF = lazy(() =>
  import(/* webpackPrefetch: true */ 'CommonModule/NotificationPopover').catch(
    () => ({
      default: FallbackComponent,
    }),
  ),
);

const NotificationPopover = () => (
  <ErrorBoundary fallback={<></>}>
    <Suspense fallback={<></>}>
      <NotificationPopoverMF isShellV2 />
    </Suspense>
  </ErrorBoundary>
);

export default NotificationPopover;
