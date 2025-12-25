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

// Styled
import { BtnContainer } from 'styled/common';
import { StyledDeleteModal } from '../styled';

const DeletePublicKeyModal = ({ onClose, onDeletePublicKey }) => {
  const handlePublicKeyDelete = () => {
    onDeletePublicKey();
    onClose();
  };
  return (
    <StyledDeleteModal $maxWidth="440" open>
      <ModalHeader>
        Delete Public Key{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_DeletePublicKey_Icon_Close"
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
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_DeletePublicKey_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              danger
              className="ml-4"
              onClick={handlePublicKeyDelete}
              data-event-name="Form_DeletePublicKey_PrimaryButton"
            >
              Delete
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledDeleteModal>
  );
};

DeletePublicKeyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDeletePublicKey: PropTypes.func,
};

export default DeletePublicKeyModal;
