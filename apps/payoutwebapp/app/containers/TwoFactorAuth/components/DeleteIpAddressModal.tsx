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
import type { DeleteIPAddressModalProps } from '../types';

const DeleteIPAddressModal: React.FC<DeleteIPAddressModalProps> = ({
  ipAddress,
  onClose,
  onDeleteIP,
}) => {
  const handleIPDelete = (): void => {
    if (onDeleteIP) {
      onDeleteIP();
    }
    onClose();
  };

  return (
    <StyledDeleteModal $maxWidth="440" open>
      <ModalHeader>
        Delete IP Address{' '}
        <Cross
          data-event-name="Close_Icon_Delete_IP_Address"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline className="mb-3" src={getAlertIcon('warning')} />
            <Text as="p" variant="p14" color="bodyLight">
              Are you sure you want to delete this IP address –{' '}
              <span>{ipAddress}</span>?
            </Text>
          </div>
          <BtnContainer className="mt-4">
            <Button
              data-event-name="Secondary_Button_Delete_IP_Address"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Delete_IP_Address"
              danger
              className="ml-4"
              onClick={handleIPDelete}
            >
              Delete
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledDeleteModal>
  );
};

export default withErrorBoundary(DeleteIPAddressModal);
