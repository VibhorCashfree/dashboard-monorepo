import React from 'react';
import PropTypes from 'prop-types';
import {
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Image,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import { removeAPIKey } from 'services/developers';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer } from 'styled/common';
import { WarningAlert } from '../styled';

const DeleteAPIKeyModal = ({ clientId, onDelete, onClose }) => {
  const handleDelete = async () => {
    const response = await removeAPIKey(clientId);

    if (_get(response, 'response', '') === 'SUCCESS') {
      onDelete(clientId);
    }

    onClose();
  };

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        Delete API Keys{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_DeleteAPIKeys_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <WarningAlert>
            <Image src={getAlertIcon('warning')} />
            <span>
              You will not be able to perform any action with this API key after
              you delete it.
            </span>
          </WarningAlert>
          <BtnContainer className="mt-4">
            <Button
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_DeleteAPIKeys_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              danger
              className="ml-4"
              onClick={handleDelete}
              data-event-name="Form_DeleteAPIKeys_PrimaryButton"
            >
              Delete Immediately
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

DeleteAPIKeyModal.propTypes = {
  clientId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteAPIKeyModal;
