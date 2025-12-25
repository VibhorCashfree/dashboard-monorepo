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

// Styled
import { Divider, DetailsRow } from 'styled/common';

const Modals = ({ modalType, setModalType, setFetchCounter }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = responseData => {
    setModalData(responseData);
    setFetchCounter(count => count + 1);

    switch (responseData.status) {
      case 'VALID':
        Analytics.track(EVENTS.GSTIN.VERIFY_SUCCESS);
        setModalType(MODAL_TYPES.SUCCESS);
        break;

      case 'INVALID':
        Analytics.track(EVENTS.GSTIN.VERIFY_SUCCESS);
        setModalType(MODAL_TYPES.NOT_EXIST);
        break;

      default:
        Analytics.track(EVENTS.GSTIN.VERIFY_FAILED);
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
          title="GSTIN is Valid"
          maxWidth="680"
          onClose={() => setModalType()}
        >
          <div className="mt-3 text-left">
            <DetailsRow>
              <div>
                <Text color="bodyLight">GSTIN</Text>
              </div>
              <div className="text-wrap">{modalData.GSTIN || '–'}</div>
              <div>
                <Text color="bodyLight">Name of Business</Text>
              </div>
              <div>{modalData.nameOfBusiness || '–'}</div>
            </DetailsRow>
            <Divider contain />
            <DetailsRow>
              <div>
                <Text color="bodyLight">GST Ref. ID</Text>
              </div>
              <div className="text-wrap">{modalData.id || '–'}</div>
              <div>
                <Text color="bodyLight">Legal Name of Buss.</Text>
              </div>
              <div>{modalData.legalNameOfBusiness || '–'}</div>
            </DetailsRow>
            <DetailsRow>
              <div>
                <Text color="bodyLight">Tax Payer Type</Text>
              </div>
              <div className="text-wrap">{modalData.taxPayerType || '–'}</div>
              <div>
                <Text color="bodyLight">GSTIN Status</Text>
              </div>
              <div>{modalData.gstInStatus || '–'}</div>
            </DetailsRow>
            <DetailsRow>
              <div>
                <Text color="bodyLight">Date of Registration</Text>
              </div>
              <div>{modalData.dateOfRegistration || '–'}</div>
              <div />
              <div />
            </DetailsRow>
          </div>
        </AlertModal>
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Failed to Validate"
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
          type="warning"
          title="GSTIN is Invalid"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {modalData.message}
          </Text>
          <div className="mt-3 text-left">
            <DetailsRow>
              <div>
                <Text color="bodyLight">GSTIN</Text>
              </div>
              <div className="text-wrap">{modalData.GSTIN || '–'}</div>
              <div>
                <Text color="bodyLight">Name of Business</Text>
              </div>
              <div>{modalData.nameOfBusiness || '–'}</div>
            </DetailsRow>
            <Divider contain />
            <DetailsRow>
              <div>
                <Text color="bodyLight">GST Ref. ID</Text>
              </div>
              <div className="text-wrap">{modalData.id || '–'}</div>
              <div />
              <div />
            </DetailsRow>
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
