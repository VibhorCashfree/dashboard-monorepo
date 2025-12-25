// NotificationBar.js

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../ErrorBoundary';

const NotificationBarMF = lazy(() =>
  // eslint-disable-next-line import/no-unresolved
  import('CommonModule/NotificationBar'),
);

const NotificationBarLazyComponent = () => (
  <Suspense fallback={<></>}>
    <NotificationBarMF />
  </Suspense>
);

/**
 * This explicit component with ErrorBoundary is needed because when we place
 * ErrorBoundary directly in NotificationPopoverLazyComponent, error does not get
 * captured by it, and bubbles up to its parent, causing the app crash.
 */
const NotificationBar = () => (
  <ErrorBoundary fallback={<></>}>
    <NotificationBarLazyComponent />
  </ErrorBoundary>
);

export default NotificationBar;
