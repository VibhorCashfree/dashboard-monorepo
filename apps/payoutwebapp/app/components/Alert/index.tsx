import React from 'react';
import { Image } from '@cashfree-intl/coherent';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import {
  StyledAlert,
  StyledActions as Actions,
  StyledContent as Content,
} from './styled';

// Types
import type { Props } from './types';

const Alert = ({
  type = 'info',
  compact = false,
  bordered = false,
  rounded = false,
  size = 'md',
  children,
  ...props
}: Props) => (
  <StyledAlert
    type={type}
    size={size}
    compact={compact}
    bordered={bordered}
    rounded={rounded}
    {...props}
  >
    <Image
      inline
      src={getAlertIcon(type, 'md')}
      style={{
        flex: 1,
        maxWidth: 'fit-content',
      }}
    />
    {children}
  </StyledAlert>
);

Alert.Content = Content;
Alert.Actions = Actions;

export default Alert;
