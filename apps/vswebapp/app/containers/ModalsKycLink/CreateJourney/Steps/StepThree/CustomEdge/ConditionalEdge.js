import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useWorkFlow,
  getSmoothStepPath,
} from '@cashfree-intl/workflow';
import { Text, Space } from '@cashfree-intl/coherent';
import _upperCase from 'lodash/upperCase';

// Components
import Icon from 'components/Icon';

// Helpers
import { getCondition } from '../helpers';

// Styled
import { StyledConditionEdge } from '../styled';

export default function ConditionalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  style,
}) {
  const { condition, conditionLogic, stroke, background } = data;
  const [, blockIndex, conditionType] = condition.split('>');
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ ...style }} />

      <EdgeLabelRenderer>
        <span
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            zIndex: 100,
            background: '#fff',
            borderRadius: 24,
            minWidth: '83px',
          }}
          className="nodrag nopan pointer"
        >
          <StyledConditionEdge
            gap={1}
            alignItems="center"
            $background={background}
            $border={stroke}
          >
            <Icon fill={stroke} name="condition" width={14} height={14} />
            <Space direction="column" alignItems="center">
              <Text
                variant="b12"
                color={Number(blockIndex) ? 'warning' : 'info'}
              >
                {_upperCase(conditionType)}
              </Text>

              <Space direction="column" gap={0.5}>
                {getCondition(conditionLogic)?.map(condition => (
                  <Text variant="b12" color="bodyLight">
                    {condition}
                  </Text>
                ))}
              </Space>
            </Space>
          </StyledConditionEdge>
        </span>
      </EdgeLabelRenderer>
    </>
  );
}
