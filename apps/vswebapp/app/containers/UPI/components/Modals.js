import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal, Space } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';

// Styled
import { ModalRow } from 'styled/common';

const Modals = ({ modalType, setModalType, setFetchCounter }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = (responseData, accountStatus) => {
    setModalData(responseData);
    setFetchCounter(count => count + 1);

    switch (accountStatus) {
      case 'YES':
        setModalType(MODAL_TYPES.SUCCESS);
        break;

      case 'NO':
        setModalType(MODAL_TYPES.NOT_EXIST);
        break;

      default:
        setModalType(MODAL_TYPES.FAILED);
    }
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal
          onResponse={handleResponse}
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="VPA is Valid"
          onClose={() => setModalType()}
          maxWidth="380"
        >
          <div className="my-2">
            <ModalRow>
              <div>
                <Text color="bodyLight">Name Provided</Text>
              </div>
              <div className="text-wrap">{modalData.name || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">VPA</Text>
              </div>
              <div className="text-wrap">{modalData.vpa || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name at Bank</Text>
              </div>
              <div className="text-wrap">{modalData.nameAtBank || '–'}</div>
            </ModalRow>
          </div>
        </AlertModal>
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Failed To Validate"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {modalData.message}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPES.NOT_EXIST:
      return (
        <AlertModal
          type="info"
          title="VPA is Invalid"
          onClose={() => setModalType()}
        >
          <div className="my-2">
            <ModalRow>
              <div>
                <Text color="bodyLight">Name Provided</Text>
              </div>
              <div className="text-wrap">{modalData.name || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">VPA</Text>
              </div>
              <div className="text-wrap">{modalData.vpa || '–'}</div>
            </ModalRow>
          </div>
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
