import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Space, Cross, Image, Button } from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';

// Constants
import { DEFAULT_TEMPLATES } from './constants';
// Styled
import {
  StyledPreviewModal,
  SelectModalHeader,
  SelectModalContent,
  SelectModalFooter,
  StyledNote,
} from './styled';

const SelectTemplate = ({ selected, onClose, submitTemplate }) => {
  return (
    <StyledPreviewModal open $maxWidth="450" className="p-0">
      <Space direction="column" fullHeight>
        <SelectModalHeader alignItems="center" justifyContent="space-between">
          <Text variant="h20">{_startCase(selected.templateName)}</Text>
          <Cross onClick={onClose} />
        </SelectModalHeader>
        <SelectModalContent direction="column" gap={2}>
          <Text variant="b14" color="bodyLight">
            {selected.description}
          </Text>
          {DEFAULT_TEMPLATES[`${selected.templateName}_template`] ? (
            <Image
              src={DEFAULT_TEMPLATES[`${selected.templateName}_template`]}
              width={471}
              height={471}
              style={{ borderRadius: '8px' }}
            />
          ) : (
            ''
          )}
          <StyledNote direction="column" gap={1}>
            <Text variant="b14" color="warning" strong>
              Important Note:
            </Text>
            <Text variant="b14" color="bodyLight">
              Templates are tailored to market demands for specific lines of
              business or use cases.
            </Text>
          </StyledNote>
        </SelectModalContent>
        <SelectModalFooter
          gap={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button as="a" link onClick={onClose}>
            Cancel
          </Button>
          <Button
            primary
            size="small"
            onClick={() => submitTemplate(selected.id)}
          >
            Use This Template
          </Button>
        </SelectModalFooter>
      </Space>
    </StyledPreviewModal>
  );
};

SelectTemplate.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SelectTemplate;
