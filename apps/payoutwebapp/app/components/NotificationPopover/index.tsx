import React from 'react';
import { NotificationPopover } from '@dashboard-monorepo/shared';

// Components
import ErrorBoundary from 'components/ErrorBoundary';

const NotificationPopoverWrapper = () => (
  <NotificationPopover errorBoundary={ErrorBoundary} isShellV2 />
);

export default NotificationPopoverWrapper;
