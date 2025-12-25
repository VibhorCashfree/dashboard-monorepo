import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Table, Text, Space } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';

// Styled
import { ModalRow } from 'styled/common';

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
      return (
        <AlertModal
          type="success"
          title="Aadhaar is Valid"
          onClose={() => handleClose()}
        >
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">UID</Text>
              </div>
              <div className="text-wrap">{_get(details, 'uid', '–')}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">DOB</Text>
              </div>
              <div className="text-wrap">{details.yob || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">{details.name || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-wrap">{details.address || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Father</Text>
              </div>
              <div className="text-wrap">{details.father || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Reference ID</Text>
              </div>
              <div className="text-wrap">{details.refId || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Verification ID</Text>
              </div>
              <div className="text-wrap">{details.externalRefId || '–'}</div>
            </ModalRow>
          </Space>
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="info"
          title="Aadhaar is Invalid"
          onClose={() => handleClose()}
        >
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Reference ID</Text>
              </div>
              <div className="text-wrap">{details.refId || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth>
            <ModalRow>
              <div>
                <Text color="bodyLight">Verification ID</Text>
              </div>
              <div className="text-wrap">{details.externalRefId || '–'}</div>
            </ModalRow>
          </Space>
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
