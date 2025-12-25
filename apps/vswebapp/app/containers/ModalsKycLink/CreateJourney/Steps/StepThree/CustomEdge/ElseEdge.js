import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useWorkFlow,
  getSmoothStepPath,
} from '@cashfree-intl/workflow';
import { Text, Space } from '@cashfree-intl/coherent';
import _capitalize from 'lodash/capitalize';

// Components
import Icon from 'components/Icon';

// Styled
import { StyledElseEdge } from '../styled';

// Store
import useStore from '../../../store';

export default function ElseEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) {
  const onAddScreen = useStore(state => state.onAddScreen);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleClick = () => {
    onAddScreen(id);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />

      <EdgeLabelRenderer>
        <span
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            zIndex: 100,
          }}
          className="nodrag nopan pointer"
        >
          <Space direction="column" gap={4} alignItems="center">
            <StyledElseEdge gap={0.5} alignItems="center">
              <Icon name="condition" width={14} height={14} />
              <Text variant="b12">{_capitalize(data.condition)}</Text>
            </StyledElseEdge>
            <Icon name="plus-edge" onClick={handleClick} />
          </Space>
        </span>
      </EdgeLabelRenderer>
    </>
  );
}
