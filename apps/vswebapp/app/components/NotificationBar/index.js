import React from 'react';
import { NotificationBar } from '@dashboard-monorepo/shared';
import ErrorBoundary from '../ErrorBoundary';

const NotificationBarWrapper = () => (
  <NotificationBar errorBoundary={ErrorBoundary} />
);

export default NotificationBarWrapper;
