import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Text, AlertModal } from '@cashfree-intl/coherent';

// Components
import RetriveModal from './RetrieveModal';
import ValidModal from './ValidModal';

// Constants
import { MODAL_TYPES } from '../constants';

const Modals = ({ modalType, setModalType }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = (
    responseData,
    accountStatus,
    phoneNumber,
    isAdvance = false,
  ) => {
    switch (accountStatus) {
      case 'VALID':
        setModalData({ ...responseData, phoneNumber });
        isAdvance
          ? setModalType(MODAL_TYPES.ADVANCE_VALID)
          : setModalType(MODAL_TYPES.VALID);

        break;

      case 'INVALID':
        setModalData(responseData);
        setModalType(MODAL_TYPES.INVALID);

        break;

      default:
        setModalData(responseData);
        setModalType(MODAL_TYPES.FAILED);
    }
  };

  switch (modalType) {
    case MODAL_TYPES.RETRIEVE:
      return (
        <RetriveModal
          onClose={() => setModalType()}
          onResponse={handleResponse}
        />
      );

    case MODAL_TYPES.ADVANCE_VALID:
      return (
        <ValidModal
          modalData={modalData}
          onClose={() => setModalType('')}
          isAdvance
        />
      );

    case MODAL_TYPES.VALID:
      return (
        <ValidModal modalData={modalData} onClose={() => setModalType('')} />
      );

    case MODAL_TYPES.INVALID:
    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Failed To Validate"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14">
            {modalData?.message}
          </Text>
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
