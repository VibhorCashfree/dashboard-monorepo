import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal, Space } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _capitalize from 'lodash/capitalize';

// Utils
import Analytics from 'utils/analytics';

// Constants
import EVENTS from 'constants/analytics';
import { MODAL_TYPES, REJECTION_CODES } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import BankAccountExistsModal from './BankAccountExistsModal';

// Styled
import { ModalRow } from 'styled/common';

const Modals = ({ modalType, setModalType, setFetchCounter }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = data => {
    setModalData(data);
    setFetchCounter(count => count + 1);

    switch (data.account_status) {
      case 'VALID':
        Analytics.track(EVENTS.BAV.ALL.VERIFY_SUCCESS);
        setModalType(MODAL_TYPES.VALID);
        break;

      case 'INVALID':
        Analytics.track(EVENTS.BAV.ALL.VERIFY_SUCCESS);
        setModalType(MODAL_TYPES.INVALID);
        break;

      default:
        Analytics.track(EVENTS.BAV.ALL.VERIFY_FAILED);
        setModalType(MODAL_TYPES.FAILED);
    }
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal onVerify={handleResponse} onClose={() => setModalType()} />
      );

    case MODAL_TYPES.VALID:
      return (
        <BankAccountExistsModal
          type="success"
          title="Bank Account is Valid"
          data={modalData}
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.INVALID:
      return (
        <BankAccountExistsModal
          type="info"
          title="Bank Account is Invalid"
          data={modalData}
          onClose={() => setModalType()}
        />
      );

    default:
      return (
        <AlertModal
          type="danger"
          title={
            REJECTION_CODES.includes(modalData.code) ? 'Rejected' : 'Failed'
          }
          onClose={() => setModalType()}
        >
          <Space fullWidth gap={1} direction="column" className="mt-2">
            <ModalRow>
              <div>
                <Text color="bodyLight">Reference ID</Text>
              </div>
              <div className="text-wrap">
                {_get(modalData, 'error.reference_id', '–')}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name Provided</Text>
              </div>
              <div className="text-wrap">{modalData.name || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Bank A/c No.</Text>
              </div>
              <div className="text-wrap">{modalData.bank_account || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Account Status Code</Text>
              </div>
              <div className="text-wrap">{modalData.code || '–'}</div>
            </ModalRow>
          </Space>
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
