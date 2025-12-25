import React from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal, Space } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Utils
import Emitter from 'utils/emitter';

// Styled
import { ModalRow } from 'styled/common';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';

const Modals = ({
  modalType,
  setModalType,
  modalData,
  setModalData,
  setFetchCounter,
  handleRedirect,
}) => {
  const handleResponse = response => {
    setModalData(response);

    switch (response.modalType) {
      case MODAL_TYPES.VALID:
        Emitter.emit('VALIDATE_AADHAAR', () => setModalType(MODAL_TYPES.VALID));
        break;

      case MODAL_TYPES.INVALID:
      case MODAL_TYPES.INSUFFICIENT_BALANCE:
        setModalType(response.modalType);
        break;
    }
  };

  const handleClose = () => {
    setModalType();
    setFetchCounter(prev => prev + 1);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal
          onResponse={handleResponse}
          onClose={() => handleClose()}
        />
      );

    case MODAL_TYPES.INSUFFICIENT_BALANCE:
      return (
        <AlertModal
          type="danger"
          title="Aadhaar Verification Failed"
          confirmText="View more details"
          onClose={() => handleClose()}
        >
          <Text className="mb-4" as="p" variant="p14" color="bodyLight">
            Failed to verify aadhaar due to insufficient balance in cashfree
            wallet recharge your account for running verifications
          </Text>
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="danger"
          title="Aadhaar is Invalid"
          onClose={() => handleClose()}
        >
          <Text className="mb-4" as="p" variant="p14" color="bodyLight">
            Please retry using valid Aadhaar Number
          </Text>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Reference ID</Text>
              </div>
              <div className="text-wrap">{modalData.refId || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Aadhaar Number</Text>
              </div>
              <div className="text-wrap">{`XXXX XXXX ${_get(
                modalData,
                'aadhaarNo',
              ).slice(8)}`}</div>
            </ModalRow>
          </Space>
        </AlertModal>
      );

    case MODAL_TYPES.VALID:
      return (
        <AlertModal
          type="success"
          title="Aadhaar is Valid"
          confirmText="View more details"
          onClose={() => handleClose()}
          onConfirm={() => handleRedirect(modalData)}
        >
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Aadhaar Number</Text>
              </div>
              <div className="text-wrap">{`XXXX XXXX ${_get(
                modalData,
                'aadhaarNo',
              ).slice(8)}`}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">{modalData.name}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">{modalData.dob || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-wrap">{modalData.address || '–'}</div>
            </ModalRow>
          </Space>
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default Modals;
