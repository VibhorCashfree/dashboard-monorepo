import React, { ReactNode } from 'react';
import {
  ModalHeader,
  Conditional,
  ModalDescription,
  Cross,
  Space,
  Text,
} from '@cashfree-intl/coherent';
import _capitalize from 'lodash/capitalize';
import { StyledModal, StyledLabel, StyledModalContent } from './styled';
import SelectAccount from './SelectAccount';
import SelectPreference from './SelectPreference';

const CommsPrefModal = ({
  type,
  activeStep,
  loading,
  children,
  onClose,
}) => {
  return (
    <StyledModal open data-testid="create-comms-pref-modal">
      <ModalHeader>
        <Space>
          <Text variant="h20" className="mr-2">
            Manage {_capitalize(type)} Notifications
          </Text>
          <StyledLabel size="mini" className="ml-0">
            Step {activeStep}/2
          </StyledLabel>{' '}
        </Space>
        <Conditional if={!loading}>
          <Cross onClick={onClose} />
        </Conditional>
      </ModalHeader>
      <StyledModalContent $activeStep={activeStep}>
        <ModalDescription>{children}</ModalDescription>
      </StyledModalContent>
    </StyledModal>
  );
};

CommsPrefModal.Step1 = SelectAccount;
CommsPrefModal.Step2 = SelectPreference;

export default CommsPrefModal;
