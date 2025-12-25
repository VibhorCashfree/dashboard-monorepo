import React from 'react';
import {
  Image,
  Text,
  Cross,
  Button,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledDeleteModal } from '../styled';

// Types
import type { DeletePublicKeyModalProps } from '../types';

const DeletePublicKeyModal: React.FC<DeletePublicKeyModalProps> = ({
  onClose,
  onDeletePublicKey,
}) => {
  const handlePublicKeyDelete = (): void => {
    if (onDeletePublicKey) {
      onDeletePublicKey();
    }
    onClose();
  };

  return (
    <StyledDeleteModal $maxWidth="440" open>
      <ModalHeader>
        Delete Public Key{' '}
        <Cross
          data-event-name="Close_Icon_Delete_Public_Key"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline className="mb-3" src={getAlertIcon('warning')} />
            <Text as="p" variant="p14" color="bodyLight">
              Are you sure you want to delete this public key?
            </Text>
          </div>
          <BtnContainer className="mt-4">
            <Button
              data-event-name="Secondary_Button_Delete_Public_Key"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Delete_Public_Key"
              danger
              className="ml-4"
              onClick={handlePublicKeyDelete}
            >
              Delete
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledDeleteModal>
  );
};

export default withErrorBoundary(DeletePublicKeyModal);
