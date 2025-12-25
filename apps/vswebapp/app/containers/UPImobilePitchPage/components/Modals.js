import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Table, Text, Space } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';
import Copy from 'components/Copy';

// Styled
import { Action, ModalRow } from 'styled/common';

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
          title="Valid UPI VPA"
          maxWidth="700"
          onClose={() => handleClose()}
        >
          <ModalRow>
            <div>
              <Text color="bodyLight">Phone Number</Text>
            </div>
            <div className="text-wrap">{details.mobile_number || '–'}</div>
          </ModalRow>
          <ModalRow>
            <div>
              <Text color="bodyLight">Name Provided</Text>
            </div>
            <div className="text-wrap">{details.name || '–'}</div>
          </ModalRow>
          <ModalRow>
            <div>
              <Text color="bodyLight">Primary UPI ID</Text>
            </div>
            <Space gap={1} justifyContent="left" alignItems="center">
              <span>{details.vpa || '-'}</span>{' '}
              <Action>
                <Copy value={details.vpa} />
              </Action>
            </Space>
          </ModalRow>
          <ModalRow>
            <div>
              <Text color="bodyLight">Name at Bank</Text>
            </div>
            <div className="text-wrap">{details.name_at_bank || '–'}</div>
          </ModalRow>
          {details?.additional_vpas.length > 0 && (
            <ModalRow>
              <div>
                <Text color="bodyLight">Additional VPA's</Text>
              </div>
              <div className="text-wrap">
                {details.additional_vpas.join(', ')}
              </div>
            </ModalRow>
          )}
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="info"
          title="No UPI ID Found"
          onClose={() => handleClose()}
        >
          <Text color="bodyLight">{details.message}</Text>
        </AlertModal>
      );

    default:
      return (
        <AlertModal
          type="danger"
          title="Unable to Verify UPI VPA"
          onClose={() => handleClose()}
          closeText="Ok, Got It"
        >
          <Text className="mb-4" as="p" variant="p14" color="bodyLight">
            Try again after some time to verify the details.
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
