import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertModal,
  Table,
  Text,
  Space,
  Button,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';
import ValidModal from './ValidModal';

// Services
import { getDocDetails } from 'services/digilocker';

import Regex from 'utils/regex';

const Modals = ({ modalType, setModalType, setFetchCounter }) => {
  const [details, setDetails] = useState({});
  const [modalData, setModalData] = useState({});
  const handleClose = () => setModalType();

  const handleVerify = (status, response) => {
    setModalType(status);
    setDetails(response);
    setFetchCounter(prev => prev + 1);
  };

  const verifyDocument = async () => {
    const consentReceived = details?.document_consent;
    if (!consentReceived.length) {
      setModalType();
    }

    const response = await Promise.all(
      consentReceived.map(document =>
        getDocDetails(document, details.verification_id),
      ),
    );

    if (!response.error) {
      setModalData(response);
      setModalType('VALID');
    } else {
      setModalType();
    }
  };

  const getTitle = data => {
    if (data.uid) {
      return 'Aadhaar Details';
    } else if (data.pan) {
      return 'Pan Details';
    } else if (data.dl_number) {
      return 'Driving Licence Details';
    }
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

    case MODAL_TYPES.ACCESS_ESTABLISHED:
      return (
        <AlertModal
          type="success"
          title="DigiLocker Access Established"
          onClose={verifyDocument}
          closeText="Get Documents"
        >
          <Table basic="very" compact className="mt-3 px-5">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Name</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'user_details.name', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">DOB</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'user_details.dob', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Gender</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'user_details.gender', '–') === 'M'
                    ? 'Male'
                    : 'Female'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">E -Aadhaar</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'user_details.eaadhaar', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Mobile</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'user_details.mobile', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Status</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'status', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Document Requested</Text>
                </Table.Cell>
                <Table.Cell>
                  {Regex.formatDocumentInfo(_get(details, 'document_requested', '–')) || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Document Consent</Text>
                </Table.Cell>
                <Table.Cell>
                  {Regex.formatDocumentInfo(_get(details, 'document_consent', '–')) || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Verification ID</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'verification_id', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Reference ID</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'reference_id', '–') || '–'}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </AlertModal>
      );

    case MODAL_TYPES.VALID: {
      return (
        <ValidModal modalData={modalData} handleClose={() => setModalType()} />
      );
    }

    case MODAL_TYPES.FAILED_ACCESS:
      return (
        <AlertModal
          type="danger"
          title="Failed To Access DigiLocker"
          onClose={() => setModalType('VERIFY')}
          closeText="Try Connecting Again"
        />
      );

    default:
      return (
        <AlertModal
          type="danger"
          title="Unable to Verify"
          onClose={() => handleClose()}
          closeText="Ok, Got It"
        >
          <Text className="mb-4" as="p" variant="p14" color="bodyLight">
            Unable to verify, Please try again later.
          </Text>
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
