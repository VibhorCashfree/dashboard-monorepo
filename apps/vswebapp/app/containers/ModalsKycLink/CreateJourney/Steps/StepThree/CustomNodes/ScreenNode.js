import React, { memo } from 'react';
import { Space, Text, Conditional } from '@cashfree-intl/coherent';
import {
  useWorkFlow,
  Handle,
  getIncomers,
  getOutgoers,
} from '@cashfree-intl/workflow';
import _keys from 'lodash/keys';

// Constants
import { PRODUCTS } from 'constants/products';
import { ALL_FIELD_MAPPING } from '../constants';

// Components
import Icon from 'components/Icon';

// Store
import useStore from '../../../store';

// Styled
import {
  StyledScreen,
  StyledText,
  StyledTab,
  StyledBlock,
  StyledOR,
  OrDivider,
} from '../styled';
import { Divider } from 'styled/common';

// Utils
import { showDelete } from '../utils';

const ScreenNode = ({
  data,
  selected,
  handleAddProduct,
  handleDeleteScreen,
  id,
  isPublished,
  position,
  ...props
}) => {
  const { nodes, edges, onCollativeAddScreen } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onCollativeAddScreen: state.onCollativeAddScreen,
  }));

  const incomers = getIncomers({ id: id }, nodes, edges);

  const ORCondition = () => (
    <Space
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ position: 'relative' }}
    >
      <StyledOR selected={selected} alignItems="center" justifyContent="center">
        <Text as="span" color={selected ? 'primary' : ''}>
          Or
        </Text>
      </StyledOR>
      <OrDivider noMargin selected={selected} />
    </Space>
  );

  return (
    <StyledScreen selected={selected}>
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
              onClick={() => onCollativeAddScreen(id)}
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
      <Space direction="column" gap={2}>
        <Space justifyContent="space-between" alignItems="center">
          <StyledText variant="b12" color="placeholder">
            SCREEN {id}
          </StyledText>
          <Space gap={1}>
            <Conditional if={data.blocks.length !== 2 && !isPublished}>
              <Icon
                name="primary-plus"
                onClick={() => handleAddProduct(id)}
                className="pointer"
              />
            </Conditional>
            <Conditional
              if={showDelete(id, data, nodes, edges) && !isPublished}
            >
              <Icon
                className="pointer"
                name="delete"
                onClick={() => handleDeleteScreen(id)}
              />
            </Conditional>
          </Space>
        </Space>
        {data.blocks.map((block, index) => (
          <>
            <Conditional if={index !== 0}>
              <ORCondition />
            </Conditional>
            <StyledBlock direction="column" gap={1.2} block={index}>
              <Space justifyContent="space-between" alignItems="center">
                <StyledText variant="b12" color="placeholder">
                  BLOCK {index + 1}
                </StyledText>
                <Space gap={1}>
                  <Conditional
                    if={!(block.products.length === 6) && !isPublished}
                  >
                    <Icon
                      name="primary-plus"
                      onClick={() => handleAddProduct(id, `${index}`)}
                      className="pointer"
                    />
                  </Conditional>
                </Space>
              </Space>
              {block?.products.map(product => (
                <StyledTab gap={1} alignItems="center">
                  <Icon
                    name={PRODUCTS[product]?.icon || 'InputField'}
                    width={16}
                    height={16}
                  />
                  <Text variant="b14">
                    {ALL_FIELD_MAPPING[product].displayText}
                  </Text>
                </StyledTab>
              ))}
            </StyledBlock>
          </>
        ))}
      </Space>
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555', width: '10px', height: '10px' }}
      />
    </StyledScreen>
  );
};

export default memo(ScreenNode);
