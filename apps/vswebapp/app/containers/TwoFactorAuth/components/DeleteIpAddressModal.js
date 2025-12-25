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

const DeleteIPAddressModal = ({ ipAddress, onClose, onDeleteIP }) => {
  const handleIPDelete = () => {
    onDeleteIP();
    onClose();
  };

  return (
    <StyledDeleteModal $maxWidth="440" open>
      <ModalHeader>
        Delete IP Address{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_DeleteIPAddress_Icon_Close"
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
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_DeleteIPAddress_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              danger
              className="ml-4"
              onClick={handleIPDelete}
              data-event-name="Form_DeleteIPAddress_PrimaryButton"
            >
              Delete
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledDeleteModal>
  );
};

DeleteIPAddressModal.propTypes = {
  ipAddress: PropTypes.string.isRequired,

  onClose: PropTypes.func.isRequired,
  onDeleteIP: PropTypes.func,
};

export default DeleteIPAddressModal;
