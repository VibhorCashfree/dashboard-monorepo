import React from 'react';
import { NotificationBar } from '@dashboard-monorepo/shared';

// Components
import ErrorBoundary from 'components/ErrorBoundary';

const NotificationBarWrapper = () => (
  <NotificationBar errorBoundary={ErrorBoundary} />
);

export default NotificationBarWrapper;
