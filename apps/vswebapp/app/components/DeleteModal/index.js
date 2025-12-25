import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Cross,
  Button,
  Text,
  Conditional,
} from '@cashfree-intl/coherent';
import { BtnContainer } from './styled';

const DeleteModal = ({
  heading,
  description1,
  description2,
  onClose,
  onDelete,
  loading,
}) => (
  <Modal $maxWidth="480" open>
    <ModalHeader>
      {heading}{' '}
      <Conditional if={!loading}>
        <Cross data-testid="delete-modal-close" onClick={onClose} />
      </Conditional>
    </ModalHeader>
    <ModalContent>
      <ModalDescription>
        <Text variant="p14" color="bodyLight">
          {description1}
        </Text>
        <Text variant="p14" color="bodyLight" className="mt-2">
          {description2}
        </Text>

        <BtnContainer className="mt-4">
          <Button disabled={loading} link onClick={onClose}>
            Cancel
          </Button>
          <Button loading={loading} danger onClick={onDelete}>
            Delete
          </Button>
        </BtnContainer>
      </ModalDescription>
    </ModalContent>
  </Modal>
);

DeleteModal.propTypes = {
  heading: PropTypes.string,
  description1: PropTypes.string,
  description2: PropTypes.string,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
};

export default DeleteModal;
