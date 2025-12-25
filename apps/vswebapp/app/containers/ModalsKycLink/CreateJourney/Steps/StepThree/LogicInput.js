import React, { useState, useEffect } from 'react';
import { Text } from '@cashfree-intl/coherent';

// Styled
import { StyledlogicInput, StyledOperator } from './styled';

const LogicInput = ({ logic, onChange }) => {
  const isAND = logic === 'AND';

  return (
    <StyledlogicInput>
      <StyledOperator
        selected={isAND}
        className="pointer"
        onClick={() => onChange('AND')}
      >
        <Text variant="b14" color={isAND ? 'white' : 'bodyLight'}>
          AND
        </Text>
      </StyledOperator>
      <StyledOperator
        selected={!isAND}
        className="pointer"
        onClick={() => onChange('OR')}
      >
        <Text variant="b14" color={!isAND ? 'white' : 'bodyLight'}>
          OR
        </Text>
      </StyledOperator>
    </StyledlogicInput>
  );
};

export default LogicInput;
