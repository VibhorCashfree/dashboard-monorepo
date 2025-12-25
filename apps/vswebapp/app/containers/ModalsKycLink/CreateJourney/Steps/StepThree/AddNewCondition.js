import React, { useState, useEffect, useContext } from 'react';
import _some from 'lodash/some';
import _isEmpty from 'lodash/isEmpty';
import {
  Modal,
  ModalHeader,
  ModalContent,
  Button,
  Cross,
  Space,
  Text,
  Icon as CoherentIcon,
  Conditional,
  DropdownItem,
  DropdownMenu,
  Checkbox,
  InputField,
} from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _keys from 'lodash/keys';

// Components
import Icon from 'components/Icon';
import LogicInput from './LogicInput';

// Helpers
import {
  getConditionOutput,
  toDropdownOptions,
  validateConditions,
} from './helpers';

// Styled
import { BtnContainer, Divider } from 'styled/common';
import { ConditionalContainer, StyledDropdown } from './styled';

// Constants
import { LOGICAL_OPERATORS } from './constants';

// Store
import useStore from '../../store';

const AddNewCondition = ({ onClose, screen }) => {
  const {
    nodes,
    getNode,
    saveCondition,
    onAddConditionals,
    onUpdateConditionals,
  } = useStore(state => ({
    nodes: state.nodes,
    getNode: state.getNode,
    saveCondition: state.saveCondition,
    onAddConditionals: state.onAddConditionals,
    onUpdateConditionals: state.onUpdateConditionals,
  }));
  const nodeDetails = getNode(screen);
  const { blocks } = nodeDetails.data;

  const [allOutput, setAllOutput] = useState([]);
  const [allCondition, setAllCondition] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [conditions, setConditions] = useState({
    if: [],
    elseIf: [],
  });
  const [disabled, setDisabled] = useState(false);

  const blockOptions = blocks.map((block, index) => ({
    key: index,
    text: `Block ${index + 1}`,
    value: index,
  }));

  useEffect(() => {
    const conditionals = blocks.reduce((acc, block) => {
      const blockCondition = {
        if: [...block.conditions.if],
        elseIf: [...block.conditions.elseIf],
      };

      return [...acc, blockCondition];
    }, []);

    setAllCondition(prev => [...prev, ...conditionals]);
  }, []);

  useEffect(() => {
    const outputs = getConditionOutput(blocks[selectedBlock].products);
    const conditionals = blocks[selectedBlock].conditions;

    setConditions(conditionals);
    setAllOutput(outputs);
  }, [selectedBlock]);

  useEffect(() => {
    const validation = validateConditions(allCondition);

    setDisabled(validation);
  }, [allCondition]);

  const handleConditions = (
    type,
    index,
    key,
    value,
    selectMultiple = false,
  ) => {
    const typeCondition = allCondition[selectedBlock][type];
    const conditionObj = allCondition[selectedBlock][type][index];

    if (key === 'checked') {
      if (selectMultiple) {
        const valueExist = conditionObj.checked.includes(value);

        if (valueExist) {
          conditionObj.checked = conditionObj.checked.filter(
            checkedVal => checkedVal !== value,
          );
        } else {
          conditionObj.checked.push(value);
        }
      } else {
        conditionObj.checked = [value];
      }
    } else if (key === 'output') {
      conditionObj[key] = String(value);
      conditionObj.checked = [];
    } else {
      conditionObj[key] = String(value);
    }

    typeCondition[index] = conditionObj;

    setAllCondition(prev =>
      prev.map((block, blockIndex) => {
        if (blockIndex === selectedBlock) {
          block[type] = typeCondition;
        }

        return block;
      }),
    );
  };

  const handleDelete = (type, index) => {
    const filteredCondition = allCondition[selectedBlock][type]
      .filter((condition, conditionIndex) => conditionIndex !== index)
      .map((prev, index) => ({
        ...prev,
        key: `${type}_${index}`,
      }));

    setAllCondition(prev =>
      prev.map((block, blockIndex) => {
        if (blockIndex === selectedBlock) {
          block[type] = filteredCondition;
        }

        return block;
      }),
    );
  };

  const saveConditions = () => {
    saveCondition(screen, allCondition);

    const isUpdating = nodes.some(
      node => _get(node.data, 'parent', '') === screen,
    );

    if (isUpdating) {
      onUpdateConditionals(screen);
    } else {
      onAddConditionals(screen);
    }
    onClose();
  };

  const renderDropdown = (type, index, output, checked) => {
    const outputType = _find(allOutput, { key: output });
    const outputValueOptions = _get(outputType, 'options', []);
    const selectMultiple = _get(outputType, 'selectMultiple', false);
    const isInput = !selectMultiple && !!outputType?.inputType;

    if (isInput) {
      return (
        <InputField
          name="input"
          type="number"
          min={0}
          max={1}
          value={selectMultiple ? `Enter Value` : checked[0]}
          onChange={(e, { value }) =>
            handleConditions(type, index, 'checked', value, selectMultiple)
          }
          style={{ minWidth: '210px' }}
        />
      );
    }

    return (
      <StyledDropdown
        placeholder={
          selectMultiple
            ? `${checked.length} Selected`
            : checked.length
            ? checked[0]
            : 'Select Value'
        }
        icon="chevron down"
        value={selectMultiple ? `${checked.length} Selected` : checked[0]}
        minWidth={210}
        selection
      >
        <DropdownMenu>
          {toDropdownOptions(outputValueOptions).map(option => (
            <DropdownItem
              key={option.key}
              className="pointer"
              onClick={() =>
                handleConditions(
                  type,
                  index,
                  'checked',
                  option.value,
                  selectMultiple,
                )
              }
              selected={checked.includes(option.value)}
            >
              <Space gap={1} direction="row">
                <Conditional if={selectMultiple}>
                  <Checkbox
                    onMouseDown={() =>
                      handleConditions(
                        type,
                        index,
                        'checked',
                        option.value,
                        selectMultiple,
                      )
                    }
                    checked={checked.includes(option.value)}
                  />
                </Conditional>
                <Text>{option.text}</Text>
              </Space>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </StyledDropdown>
    );
  };

  const renderCondition = type =>
    allCondition[selectedBlock]?.[type].map(
      ({ output, operator, checked, logicOperator }, index) => (
        <Space direction="column" gap={2}>
          <Conditional if={index}>
            <LogicInput
              logic={logicOperator}
              onChange={value =>
                handleConditions(type, index, 'logicOperator', value)
              }
            />
          </Conditional>
          <Space gap={2} alignItems="flex-end">
            <Space direction="column" gap={1}>
              <Text>When Output</Text>
              <StyledDropdown
                onChange={(e, { value }) =>
                  handleConditions(type, index, 'output', value)
                }
                placeholder="Select Output"
                options={allOutput}
                selection
                icon="chevron down"
                value={output}
                minWidth={250}
              />
            </Space>
            <Space direction="column" gap={1}>
              <Text>Is</Text>
              <StyledDropdown
                onChange={(e, { value }) =>
                  handleConditions(type, index, 'operator', value)
                }
                placeholder="Select Operator"
                options={
                  _find(allOutput, { key: output })?.numeralOperator === true
                    ? LOGICAL_OPERATORS
                    : LOGICAL_OPERATORS.slice(0, 2)
                }
                selection
                icon="chevron down"
                value={operator}
                minWidth={210}
              />
            </Space>
            <Space direction="column" gap={1}>
              <Text>Value</Text>
              {renderDropdown(type, index, output, checked)}
            </Space>
            <Conditional
              if={index || allCondition[selectedBlock]?.[type].length <= 1}
            >
              <Icon
                name="delete"
                width={18}
                height={18}
                style={{ marginBottom: '12px' }}
                className="pointer"
                onClick={() => handleDelete(type, index)}
              />
            </Conditional>
          </Space>
        </Space>
      ),
    );

  return (
    <Modal open $maxWidth="814">
      <ModalHeader>
        <Space gap={2} alignItems="center">
          <Text variant="h20">Define Conditions</Text>
        </Space>
        <Cross onClick={onClose} />
      </ModalHeader>
      <ModalContent className="p-3">
        <Space direction="column">
          <Space direction="column" gap={1}>
            <Text>Define Conditions On</Text>
            <StyledDropdown
              onChange={(e, { value }) => setSelectedBlock(value)}
              placeholder="Select Output"
              options={blockOptions}
              selection
              value={selectedBlock}
              icon="chevron down"
              style={{ width: '250px' }}
            />
          </Space>
          <Divider />
          <Space
            direction="column"
            gap={2}
            alignItems="flex-start"
            style={{ width: '767px' }}
          >
            <Text variant="h16" color="placeholder">
              Condition:{' '}
              <Text as="span" variant="h16">
                If
              </Text>
            </Text>
            <ConditionalContainer
              direction="column"
              gap={2}
              alignItems="flex-start"
              fullWidth
              showContainer={allCondition[selectedBlock]?.if.length}
            >
              {renderCondition('if')}
              <Conditional if={allCondition[selectedBlock]?.if.length <= 2}>
                <Button
                  variant="link"
                  icon={<CoherentIcon name="add" />}
                  className="p-0"
                  onClick={() =>
                    setAllCondition(prev =>
                      prev.map((block, index) => {
                        if (index === selectedBlock) {
                          block.if.push({
                            key: `if_${block.if.length}`,
                            output: '',
                            operator: '',
                            checked: [],
                            logicOperator: 'AND',
                          });
                        }

                        return block;
                      }),
                    )
                  }
                >
                  Add New Condition
                </Button>
              </Conditional>
            </ConditionalContainer>
          </Space>
          <Divider />
          <Space
            direction="column"
            gap={2}
            alignItems="flex-start"
            style={{ width: '767px' }}
          >
            <Text variant="h16" color="placeholder">
              Condition:{' '}
              <Text as="span" variant="h16">
                Else If
              </Text>
            </Text>
            <ConditionalContainer
              direction="column"
              gap={2}
              alignItems="flex-start"
              fullWidth
              showContainer={allCondition[selectedBlock]?.elseIf.length}
            >
              {renderCondition('elseIf')}
              <Conditional if={allCondition[selectedBlock]?.elseIf.length <= 2}>
                <Button
                  variant="link"
                  icon={<CoherentIcon name="add" />}
                  className="p-0"
                  onClick={() =>
                    setAllCondition(prev =>
                      prev.map((block, index) => {
                        if (index === selectedBlock) {
                          block.elseIf.push({
                            key: `elseIf_${block.elseIf.length}`,
                            output: '',
                            operator: '',
                            checked: [],
                            logicOperator: 'AND',
                          });
                        }

                        return block;
                      }),
                    )
                  }
                >
                  Add New Condition
                </Button>
              </Conditional>
            </ConditionalContainer>
          </Space>
        </Space>
      </ModalContent>
      <Divider className="my-0" contain />
      <BtnContainer className="m-2">
        <Button
          primary
          type="submit"
          disabled={!disabled}
          onClick={saveConditions}
        >
          Save & Update
        </Button>
      </BtnContainer>
    </Modal>
  );
};

export default AddNewCondition;
