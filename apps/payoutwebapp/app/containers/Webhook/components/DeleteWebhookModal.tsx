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

// Services
import { removeWebhook } from 'services/developers';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledDeleteModal } from '../styled';

// Types
import type { DeleteWebhookModalProps } from '../types';

const DeleteWebhookModal: React.FC<DeleteWebhookModalProps> = ({
  onClose,
  onDelete,
}) => {
  const handleDelete = async () => {
    const response = await removeWebhook();

    if (!('error' in response)) {
      onDelete();
    }

    onClose();
  };

  return (
    <StyledDeleteModal $maxWidth="448" open>
      <ModalHeader>
        Delete Webhook URL{' '}
        <Cross
          data-event-name="Close_Icon_Delete_Webhook_URL"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline className="mb-3" src={getAlertIcon('warning')} />
            <Text as="p" variant="p14" color="bodyLight">
              You will not be able to receive notifications on this URL after
              you delete it.
            </Text>
          </div>
          <BtnContainer className="mt-4">
            <Button
              data-event-name="Secondary_Button_Delete_Webhook"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Delete_Webhook"
              danger
              className="ml-4"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledDeleteModal>
  );
};

export default withErrorBoundary(DeleteWebhookModal);
