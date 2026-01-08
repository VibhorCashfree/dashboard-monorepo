import React from 'react';
import PropTypes from 'prop-types';
import { NotificationPopover } from '@dashboard-monorepo/shared';
import ErrorBoundary from '../ErrorBoundary';

const NotificationPopoverWrapper = ({ isShellV2 }) => (
  <NotificationPopover errorBoundary={ErrorBoundary} isShellV2={isShellV2} />
);

NotificationPopoverWrapper.propTypes = {
  isShellV2: PropTypes.bool,
};

export default NotificationPopoverWrapper;
