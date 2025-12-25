import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Image,
  Text,
  Space,
  Accordion,
  Icon as CoherentIcon,
  InputField,
  Label,
  Checkbox,
  Conditional,
  UploadFile,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keys from 'lodash/keys';

// Comstants
import { PRODUCTS } from 'constants/products';
import { ALL_FIELD_MAPPING, checkList } from './constants';

// Component
import Icon from 'components/Icon';

// Helpers
import { getAllProducts } from './helpers';

// Styled
import {
  StyledConfig,
  StyledInfo,
  StyledHeader,
  ParentAccordion,
  StyledAddNewButton,
  ChildAccordion,
  StyledRightConfig,
} from './styled';
import { VerticalDivider } from '../../styled';
import { Divider } from 'styled/common';

// Images
import SelectSceen from 'images/select-screen.svg';

// Store
import useStore from '../../store';

// Utils
import { showDelete } from './utils';

const ProductConfig = ({
  selectedScreen = [],
  handleAddProduct,
  handleAddCondition,
  handleDeleteScreen,
  isPublished,
}) => {
  const { COLORS } = useContext(ThemeContext);
  const { nodes, edges, onRemoveProduct, onNameOptional, getNode } = useStore(
    state => ({
      nodes: state.nodes,
      edges: state.edges,
      onRemoveProduct: state.onRemoveProduct,
      onNameOptional: state.onNameOptional,
    }),
  );
  const [openParent, setOpenParent] = useState([]);
  const [openCondition, setOpenCondition] = useState(true);
  const [openChild, setOpenChild] = useState([]);

  const showConfig =
    selectedScreen && !['start', 'end'].includes(selectedScreen.id);

  const accordionHandle = blockIndex => {
    const blocksExist = openParent.includes(blockIndex);

    if (blocksExist) {
      return setOpenParent(prev => prev.filter(block => block !== blockIndex));
    }

    setOpenParent(prev => [...prev, blockIndex]);
  };

  const accordionChildHandle = childIndex => {
    const blocksExist = openChild.includes(childIndex);

    if (blocksExist) {
      return setOpenChild(prev => prev.filter(child => child !== childIndex));
    }

    setOpenChild(prev => [...prev, childIndex]);
  };

  const blocks = _get(selectedScreen, 'data.blocks', []);
  const disableCondition = !getAllProducts(blocks).length;

  return (
    <StyledConfig>
      {showConfig ? (
        <Space direction="column" fullWidth>
          <StyledHeader justifyContent="space-between">
            <Text variant="h16">Screen {selectedScreen.id}</Text>
            <Conditional
              if={
                showDelete(
                  selectedScreen.id,
                  selectedScreen.data,
                  nodes,
                  edges,
                ) && !isPublished
              }
            >
              <Icon
                name="delete"
                width={18}
                height={18}
                className="pointer"
                onClick={() => handleDeleteScreen(selectedScreen.id)}
              />
            </Conditional>
          </StyledHeader>
          <StyledRightConfig direction="column" fullWidth fullHeight>
            {blocks.map((block, blockIndex) => (
              <ParentAccordion>
                <Accordion.Title onClick={() => accordionHandle(blockIndex)}>
                  <Space justifyContent="space-between">
                    <Space gap={1} alignItems="center">
                      <Text variant="h16">Block {blockIndex + 1}</Text>
                    </Space>
                    <Icon
                      name={
                        openParent.includes(blockIndex)
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      fill={COLORS.bodyLight}
                      width={18}
                      height={18}
                    />
                  </Space>
                </Accordion.Title>
                <Accordion.Content active={openParent.includes(blockIndex)}>
                  {block.products?.map((product, index) => (
                    <ChildAccordion>
                      <ChildAccordion.Title
                        onClick={() => accordionChildHandle(index)}
                      >
                        <Space
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Space gap={1} alignItems="center">
                            <Icon
                              name={PRODUCTS[product]?.icon || 'InputField'}
                              width={16}
                              height={16}
                            />
                            <Text variant="h16">
                              {ALL_FIELD_MAPPING[product].displayText}
                            </Text>
                          </Space>
                          <Space gap={0.8} alignItems="center">
                            <Conditional if={!isPublished}>
                              <Icon
                                name="delete"
                                width={16}
                                height={16}
                                onClick={e => {
                                  e.stopPropagation();
                                  onRemoveProduct(
                                    selectedScreen.id,
                                    blockIndex,
                                    product,
                                  );
                                }}
                              />
                            </Conditional>
                            <VerticalDivider height={18} />
                            <Icon
                              name={
                                openChild.includes(index)
                                  ? 'chevron-up'
                                  : 'chevron-down'
                              }
                              fill={COLORS.placeholder}
                              width={16}
                              height={16}
                            />
                          </Space>
                        </Space>
                      </ChildAccordion.Title>
                      <ChildAccordion.Content
                        active={openChild.includes(index)}
                      >
                        <Divider />
                        <Space direction="column" gap={2}>
                          {ALL_FIELD_MAPPING[product].inputFields.map(field => {
                            const inputLabel =
                              field === 'Name' &&
                              ALL_FIELD_MAPPING[product].optionalNameMatch ? (
                                <Space
                                  gap={1}
                                  alignItems="center"
                                  className="mb-1"
                                >
                                  <Checkbox
                                    checked={block.optionalName[product]}
                                    onClick={() =>
                                      onNameOptional(
                                        selectedScreen.id,
                                        blockIndex,
                                        product,
                                      )
                                    }
                                  />
                                  <Text color="bodyLight">Name</Text>
                                  <Label size="mini">Optional</Label>
                                </Space>
                              ) : (
                                field
                              );

                            return (
                              <>
                                <Conditional
                                  if={
                                    !!ALL_FIELD_MAPPING[product].upload === true
                                  }
                                >
                                  <UploadFile
                                    accept=".png, .jpg, .jpeg"
                                    checkList={checkList}
                                    label={inputLabel}
                                    sizeLimit={5000}
                                    onError={error => console.log(error)}
                                    onChange={response => console.log(response)}
                                  />
                                </Conditional>
                                <Conditional
                                  if={
                                    !!ALL_FIELD_MAPPING[product].upload ===
                                    false
                                  }
                                >
                                  <InputField
                                    label={inputLabel}
                                    name="input"
                                    value="Get User Input"
                                    disabled
                                  />
                                </Conditional>
                              </>
                            );
                          })}
                        </Space>
                      </ChildAccordion.Content>
                    </ChildAccordion>
                  ))}
                  <Conditional
                    if={!(block.products.length === 6) && !isPublished}
                  >
                    <StyledAddNewButton
                      onClick={() =>
                        handleAddProduct(selectedScreen.id, `${blockIndex}`)
                      }
                      size="small"
                      icon={<CoherentIcon name="add" />}
                      fluid
                    >
                      Add New Block
                    </StyledAddNewButton>
                  </Conditional>
                </Accordion.Content>
              </ParentAccordion>
            ))}

            <ParentAccordion>
              <Accordion.Title onClick={() => setOpenCondition(prev => !prev)}>
                <Space justifyContent="space-between">
                  <Text variant="h16">Conditions</Text>
                  {/* <Icon
                    name={openParent ? 'chevron-up' : 'chevron-down'}
                    fill={COLORS.bodyLight}
                    width={18}
                    height={18}
                  /> */}
                </Space>
              </Accordion.Title>
              <Accordion.Content active={true}>
                <Conditional if={!isPublished}>
                  <StyledAddNewButton
                    onClick={() => handleAddCondition(selectedScreen.id)}
                    size="small"
                    icon={
                      <CoherentIcon
                        name="add"
                        fill={
                          disableCondition ? COLORS.placeholder : COLORS.primary
                        }
                      />
                    }
                    fluid
                    disabled={disableCondition}
                  >
                    Add & Edit Conditions
                  </StyledAddNewButton>
                </Conditional>
              </Accordion.Content>
            </ParentAccordion>
          </StyledRightConfig>
        </Space>
      ) : (
        <StyledInfo
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
          className="p-3"
          fullWidth
        >
          <Image src={SelectSceen} width={50} height={50} />
          <Text variant="b14" style={{ textAlign: 'center' }}>
            Select a Screen from the canvas to view and edit properties
          </Text>
        </StyledInfo>
      )}
    </StyledConfig>
  );
};

export default ProductConfig;
