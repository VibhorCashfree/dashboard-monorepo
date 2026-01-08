import React from 'react';
import { Image } from '@cashfree-intl/coherent';
import {
  StyledAlert,
  StyledActions as Actions,
  StyledContent as Content,
} from './styled';
import type { AlertProps } from './types';

const Alert = ({
  type = 'info',
  compact = false,
  bordered = false,
  rounded = false,
  size = 'md',
  iconSrc,
  children,
  ...props
}: AlertProps) => (
  <StyledAlert
    type={type}
    size={size}
    compact={compact}
    bordered={bordered}
    rounded={rounded}
    {...props}
  >
    {iconSrc && (
      <Image
        inline
        src={iconSrc}
        style={{
          flex: 1,
          maxWidth: 'fit-content',
        }}
      />
    )}
    {children}
  </StyledAlert>
);

Alert.Content = Content;
Alert.Actions = Actions;

export default Alert;
export type { AlertProps } from './types';
