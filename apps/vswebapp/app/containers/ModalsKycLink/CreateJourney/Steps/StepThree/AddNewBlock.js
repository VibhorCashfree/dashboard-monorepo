import React, { useState, useEffect, useContext } from 'react';
import _some from 'lodash/some';
import _isEmpty from 'lodash/isEmpty';
import _keys from 'lodash/keys';
import {
  Modal,
  ModalHeader,
  ModalContent,
  Button,
  Cross,
  Space,
  Text,
  RadioButton,
  Dropdown,
  Conditional,
} from '@cashfree-intl/coherent';

// Styled
import { BtnContainer, Divider } from 'styled/common';

// Constants
import { KYC_LINK_PRODUCT_MAPPING, INPUT_FIELD_MAPPING } from './constants';

// Store
import useStore from '../../store';

const AddNewBlock = ({ onClose, screen, blockId }) => {
  const { onAddProduct, onAddProductByBlock, getNode } = useStore(state => ({
    onAddProduct: state.onAddProduct,
    onAddProductByBlock: state.onAddProductByBlock,
    getNode: state.getNode,
  }));
  const [type, setType] = useState('kyc-verification');
  const [operatorType, setOperatorType] = useState('AND');
  const [selected, setSelected] = useState();
  const nodeDetails = getNode(screen);
  const { blocks } = nodeDetails.data;
  const blocksExist = !!blocks.length;

  const kycOptions = Object.keys(KYC_LINK_PRODUCT_MAPPING).map(product => ({
    key: product,
    value: product,
    text: KYC_LINK_PRODUCT_MAPPING[product].displayText,
  }));

  const inputOptions = Object.keys(INPUT_FIELD_MAPPING).map(product => ({
    key: product,
    value: product,
    text: INPUT_FIELD_MAPPING[product].displayText,
  }));

  const handleSubmit = () => {
    if (blockId) {
      onAddProductByBlock(screen, selected, Number(blockId));
    } else {
      onAddProduct(screen, selected, operatorType);
    }
    onClose();
  };

  const disabled = !selected;

  return (
    <Modal open style={{ width: '376px' }}>
      <ModalHeader>
        <Space gap={2} alignItems="center">
          <Text variant="h20">
            {blockId ? `Add to Block ${Number(blockId) + 1}` : 'Add New Block'}
          </Text>
        </Space>
        <Cross
          data-event-name="Form_UploadBatchForm_Icon_Close"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent className="p-3">
        <Space direction="column" gap={2.2}>
          <Space gap={1.5} direction="column">
            <Text variant="b14" color="bodyLight">
              Choose the type of Block
            </Text>
            <Space gap={2}>
              <RadioButton
                key="kyc-verification"
                label="KYC Verification"
                name="type"
                value="kyc-verification"
                checked={type === 'kyc-verification'}
                onClick={() => setType('kyc-verification')}
              />
              <RadioButton
                key="input-field"
                label="Input Field"
                name="type"
                value="input-field"
                checked={type === 'input-field'}
                onClick={() => setType('input-field')}
              />
            </Space>
            <Space direction="column" gap={1}>
              <Text variant="b14" color="bodyLight">
                Select {type === 'input-field' ? 'Input Field' : 'Verification'}
              </Text>
              <Conditional if={type === 'input-field'}>
                <Dropdown
                  onChange={(e, { value }) => setSelected(value)}
                  placeholder="Select Input Field"
                  options={inputOptions}
                  selection
                  icon="chevron down"
                />
              </Conditional>
              <Conditional if={type === 'kyc-verification'}>
                <Dropdown
                  onChange={(e, { value }) => setSelected(value)}
                  placeholder="Select Verification"
                  options={kycOptions}
                  selection
                  icon="chevron down"
                />
              </Conditional>
            </Space>
            <Conditional if={!!blockId ? !blockId : blocksExist}>
              <Text variant="b14" color="bodyLight">
                Choose operator w.r.t to previous block
              </Text>
              <Space gap={2}>
                <RadioButton
                  key="AND"
                  label="AND"
                  name="operator"
                  value="AND"
                  checked={operatorType === 'AND'}
                  onClick={() => setOperatorType('AND')}
                />
                <RadioButton
                  key="OR"
                  label="OR"
                  name="operator"
                  value="OR"
                  checked={operatorType === 'OR'}
                  onClick={() => setOperatorType('OR')}
                />
              </Space>
            </Conditional>
          </Space>
        </Space>
      </ModalContent>
      <Divider className="my-0" contain />
      <BtnContainer className="m-2">
        <Button
          primary
          type="submit"
          disabled={disabled}
          onClick={handleSubmit}
        >
          Add Block
        </Button>
      </BtnContainer>
    </Modal>
  );
};

export default AddNewBlock;
