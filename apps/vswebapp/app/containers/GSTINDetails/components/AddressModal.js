import React from 'react';
import PropTypes from 'prop-types';
import {
  Cross,
  Modal,
  ModalHeader,
  ModalContent,
  Text,
} from '@cashfree-intl/coherent';

// Components
import HoverTextCopy from 'components/HoverTextCopy';

// Styled
import { Divider } from 'styled/common';

const AddressModal = ({
  gstIn,
  principalAddress,
  additionalAddresses,
  onClose,
}) => (
  <Modal $maxWidth="353" open>
    <ModalHeader>
      <div>
        <Text variant="h20">List of All GST Addresses</Text>
        <Text color="bodyLight" className="mt-1">
          GSTIN : {gstIn}
        </Text>
      </div>
      <Cross onClick={onClose} />
    </ModalHeader>
    <ModalContent>
      <div className="mb-2">
        <Text strong>Principal Address:</Text>
        <HoverTextCopy text={principalAddress}>
          <Text color="bodyLight" className="mt-1 text-wrap">
            {principalAddress}
          </Text>
        </HoverTextCopy>
      </div>
      {additionalAddresses.map((place, index) => (
        <div className="mb-2">
          <Divider contain />
          <Text strong>Additional Address {index + 1}:</Text>
          <HoverTextCopy text={place.address}>
            <Text color="bodyLight" className="mt-1 text-wrap">
              {place.address}
            </Text>
          </HoverTextCopy>
        </div>
      ))}
    </ModalContent>
  </Modal>
);

AddressModal.propTypes = {
  gstIn: PropTypes.string.isRequired,
  principalAddress: PropTypes.string.isRequired,
  additionalAddresses: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddressModal;
