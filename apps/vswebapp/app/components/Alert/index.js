import React from 'react';
import PropTypes from 'prop-types';
import { Alert as SharedAlert } from '@dashboard-monorepo/shared';
import getAlertIcon from 'utils/getAlertIcon';

// Re-export styled components for backward compatibility
export { StyledAlert, StyledActions, StyledContent } from './styled';

const Alert = ({
  type = 'info',
  size = 'md',
  ...props
}) => (
  <SharedAlert
    type={type}
    size={size}
    iconSrc={getAlertIcon(type, size)}
    {...props}
  />
);

// Re-export sub-components from shared
Alert.Content = SharedAlert.Content;
Alert.Actions = SharedAlert.Actions;

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  children: PropTypes.node.isRequired,
};

export default Alert;
