import React from 'react';
import { Alert as SharedAlert } from '@dashboard-monorepo/shared';
import type { AlertProps } from '@dashboard-monorepo/shared';
import getAlertIcon from 'utils/getAlertIcon';

// Re-export styled components for backward compatibility
export { StyledAlert, StyledActions, StyledContent } from './styled';

const Alert = ({
  type = 'info',
  size = 'md',
  ...props
}: AlertProps) => (
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

export default Alert;
