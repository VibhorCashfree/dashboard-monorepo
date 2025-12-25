import React from 'react';
import classNames from 'classnames';
import { Text } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { StyledSwitch } from '../styled';

// Types
import type { SwitchProps } from '../types';

const Switch: React.FC<SwitchProps> = ({ value, options, onChange }) => (
  <StyledSwitch>
    {options.map((option) => (
      <Text
        as="span"
        variant="b12"
        className={classNames({
          selected: value === option.key,
        })}
        key={option.key}
        onClick={() => onChange(option.key)}
      >
        {option.displayName}
      </Text>
    ))}
  </StyledSwitch>
);

export default withErrorBoundary(Switch);
