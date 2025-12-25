import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Image,
} from '@cashfree-intl/coherent';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Services
import { removeWebhook } from 'services/developers';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledDeleteModal } from '../styled';

const DeleteWebhookModal = ({ onClose, onDelete }) => {
  const handleDelete = async () => {
    const response = await removeWebhook();

    if (!response.error) {
      onDelete();
    }

    onClose();
  };

  return (
    <StyledDeleteModal $maxWidth="448" open>
      <ModalHeader>
        Delete Webhook URL{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_DeleteWebhook_Icon_Close"
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
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_DeleteWebhook_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              danger
              className="ml-4"
              onClick={handleDelete}
              data-event-name="Form_DeleteWebhook_PrimaryButton"
            >
              Delete
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledDeleteModal>
  );
};

DeleteWebhookModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteWebhookModal;
