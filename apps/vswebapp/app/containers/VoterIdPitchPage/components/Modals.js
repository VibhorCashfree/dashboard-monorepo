import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import VoterIDExistsModal from './VoterIDExistsModal';

const Modals = ({ modalType, setModalType }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = (status, data) => {
    setModalData(data);
    setModalType(status);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal onClose={() => setModalType()} onVerify={handleResponse} />
      );

    case MODAL_TYPES.VALID:
      return (
        <VoterIDExistsModal
          type="success"
          title="Voter ID Is Valid"
          onClose={() => setModalType()}
          data={modalData}
        />
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="danger"
          title="Voter ID is Invalid"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14">
            Voter ID does not exist
          </Text>
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
};

export default Modals;
