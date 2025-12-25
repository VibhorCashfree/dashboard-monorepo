// NotificationPopover.js

import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';

const NotificationPopoverMF = lazy(() =>
  // eslint-disable-next-line import/no-unresolved
  import('CommonModule/NotificationPopover'),
);

const NotificationPopoverLazyComponent = ({ isShellV2 }) => (
  <Suspense fallback={<></>}>
    <NotificationPopoverMF isShellV2={isShellV2} />
  </Suspense>
);

NotificationPopoverLazyComponent.propTypes = {
  isShellV2: PropTypes.bool,
};

/**
 * This explicit component with ErrorBoundary is needed because when we place
 * ErrorBoundary directly in NotificationPopoverLazyComponent, error does not get
 * captured by it, and bubbles up to its parent, causing the app crash.
 */
const NotificationPopover = ({ isShellV2 }) => (
  <ErrorBoundary fallback={<></>}>
    <NotificationPopoverLazyComponent isShellV2={isShellV2} />
  </ErrorBoundary>
);

NotificationPopover.propTypes = {
  isShellV2: PropTypes.bool,
};

export default NotificationPopover;
