import React, { memo } from 'react';
import { Handle, getIncomers, useNodeId } from '@cashfree-intl/workflow';
import { Text, Conditional } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Store
import useStore from '../../../store';

// Styled
import { StyledContainer, StyledEnd } from '../styled';

const EndNode = ({ isPublished }) => {
  const { nodes, edges, onCollativeAddScreen } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onCollativeAddScreen: state.onCollativeAddScreen,
  }));

  const nodeId = useNodeId();
  const incomers = getIncomers({ id: nodeId }, nodes, edges);

  return (
    <StyledContainer>
      {incomers.length > 1 ? (
        <Handle
          type="target"
          position="top"
          style={{ background: '#555', width: '10px', height: '10px' }}
        >
          <Conditional if={!isPublished}>
            <span
              style={{
                position: 'absolute',
                pointerEvents: 'all',
                zIndex: 100,
                bottom: '20px',
                right: '-12px',
                cursor: 'pointer',
                fontSize: '20px',
              }}
              className="nodrag nopan"
              onClick={() => onCollativeAddScreen(nodeId)}
            >
              <Icon name="plus-edge" />
            </span>
          </Conditional>
        </Handle>
      ) : (
        <Handle
          type="target"
          position="top"
          style={{ background: '#555', width: '10px', height: '10px' }}
        />
      )}
      <StyledEnd>
        <Text variant="h16" style={{ textAlign: 'center' }}>
          End
        </Text>
        <Handle
          type="target"
          position="top"
          style={{ background: '#555', width: '10px', height: '10px' }}
        />
      </StyledEnd>
    </StyledContainer>
  );
};

export default memo(EndNode);
