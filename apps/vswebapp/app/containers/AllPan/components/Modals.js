import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Utils
import Analytics from 'utils/analytics';

// Constants
import EVENTS from 'constants/analytics';
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import PANExistsModal from './PANExistsModal';

const Modals = ({ modalType, setModalType, setFetchCounter }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = data => {
    setModalData(data);
    setFetchCounter(count => count + 1);
    setModalType(data.pan_status);

    if (['VALID', 'INVALID'].includes(data.pan_status)) {
      Analytics.track(EVENTS.PAN.ALL.VERIFY_SUCCESS);
    } else {
      Analytics.track(EVENTS.PAN.ALL.VERIFY_FAILED);
    }
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal onClose={() => setModalType()} onVerify={handleResponse} />
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Failed to Validate"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14">
            {modalData.message}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPES.VALID:
      return (
        <PANExistsModal
          type="success"
          title="PAN is Valid"
          onClose={() => setModalType()}
          data={modalData}
        />
      );

    case MODAL_TYPES.INVALID:
      return (
        <PANExistsModal
          type="info"
          title="PAN is Invalid"
          onClose={() => setModalType()}
          data={modalData}
        />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
};

export default Modals;
