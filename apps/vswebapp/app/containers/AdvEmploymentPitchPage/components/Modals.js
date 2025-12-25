import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import AdvEmployExistsModal from './AdvEmployExistsModal';

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

    case MODAL_TYPES.SUCCESS:
      return (
        <AdvEmployExistsModal
          type="success"
          title="Employment Details Fetched Successfully"
          onClose={() => setModalType()}
          data={modalData}
        />
      );

    case MODAL_TYPES.EMPLOYMENT_DETAILS_NOT_FOUND:
      return (
        <AlertModal
          type="danger"
          title="Employment Details Not Found"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14">
            Unable to find Advance Employment
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
