import React from 'react';
import { Image } from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import {
  StyledAlert,
  StyledActions as Actions,
  StyledContent as Content,
} from './styled';

const Alert = ({
  type = 'info',
  compact = false,
  bordered = false,
  rounded = false,
  size = 'md',
  children,
  ...props
}) => (
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

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  children: PropTypes.node.isRequired,
};

export default Alert;
