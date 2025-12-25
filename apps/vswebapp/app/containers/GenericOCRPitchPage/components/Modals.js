import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';
import ValidModal from './ValidModal';

const Modals = ({ modalType, setModalType }) => {
  const [details, setDetails] = useState({});
  const handleClose = () => setModalType();

  const handleVerify = (status, response) => {
    setModalType(status);
    setDetails(response);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

    case MODAL_TYPES.VALID:
      return <ValidModal onClose={handleClose} data={details} />;

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="info"
          title="Document is Invalid"
          onClose={() => handleClose()}
        >
          {details?.message}
        </AlertModal>
      );

    case MODAL_TYPES.UNABLE_TO_VALIDATE:
      return (
        <AlertModal
          type="info"
          title="Failed to Validate"
          onClose={() => handleClose()}
        >
          {details?.message}
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
