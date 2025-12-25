import React, { memo } from 'react';
import { Handle } from '@cashfree-intl/workflow';
import { Text } from '@cashfree-intl/coherent';

// Styled
import { StyledContainer, StyledStart } from '../styled';

const StartNode = () => {
  return (
    <StyledContainer>
      <StyledStart>
        <Text variant="h16" style={{ textAlign: 'center' }}>
          Start
        </Text>
        <Handle
          type="source"
          position="bottom"
          style={{ background: '#555', width: '10px', height: '10px' }}
        />
      </StyledStart>
    </StyledContainer>
  );
};

export default memo(StartNode);
