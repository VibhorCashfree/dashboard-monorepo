import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Button, Text, Space } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';
import Icon from 'components/Icon';

// Utils
import { triggerDownload } from 'utils/common';

const Modals = ({ modalType, setModalType }) => {
  const [details, setDetails] = useState({});
  const handleClose = () => setModalType();

  const handleVerify = (status, data) => {
    setModalType(status);
    setDetails(data);
  };

  const handleDownload = () => {
    triggerDownload({ type: 'URL', payload: details.image_link });
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

    case MODAL_TYPES.VALID:
      return (
        <AlertModal
          type="success"
          title="Aadhaar Masking Successful"
          onClose={() => handleClose()}
        >
          <Space className="mt-2" alignItems="center" justifyContent="center">
            {details.image_link ? (
              <Button
                secondary
                icon={<Icon name="download" />}
                onClick={handleDownload}
              >
                Download Masked Aadhaar
              </Button>
            ) : (
              '–'
            )}
          </Space>
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="danger"
          title="Aadhaar Masking is Invalid."
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.INVALID_DOCUMENT:
      return (
        <AlertModal
          type="warning"
          title="Invalid Document"
          onClose={() => setModalType()}
        />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
