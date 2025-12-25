import React from 'react';
import { Conditional } from '@cashfree-intl/coherent';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useWorkFlow,
  getSmoothStepPath,
} from '@cashfree-intl/workflow';

// Components
import Icon from 'components/Icon';

import useStore from '../../../store';

export default function PlusEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  isPublished,
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

      <Conditional if={!isPublished}>
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
            <Icon name="plus-edge" onClick={handleClick} />
          </span>
        </EdgeLabelRenderer>
      </Conditional>
    </>
  );
}
