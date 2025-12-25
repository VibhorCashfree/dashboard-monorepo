import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Table, Text } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';

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
          title="Pan is Valid"
          onClose={() => handleClose()}
        >
          <Table basic="very" compact className="mt-3">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Name:</Text>
                </Table.Cell>
                <Table.Cell style={{ wordBreak: 'break-all' }}>
                  {details.name || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Name Match:</Text>
                </Table.Cell>
                <Table.Cell>
                  {details.name_match === 'Y' ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">DOB:</Text>
                </Table.Cell>
                <Table.Cell>{details.dob || '–'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">DOB Match:</Text>
                </Table.Cell>
                <Table.Cell>
                  {details.dob_match === 'Y' ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">PAN:</Text>
                </Table.Cell>
                <Table.Cell>{details.pan || '–'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">PAN Status:</Text>
                </Table.Cell>
                <Table.Cell>{details.pan_status || '–'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Aadhaar Seeding Status:</Text>
                </Table.Cell>
                <Table.Cell>{details.aadhaar_seeding_status || '–'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Aadhaar Seeding Description:</Text>
                </Table.Cell>
                <Table.Cell>
                  {details.aadhaar_seeding_status_desc || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Reference ID:</Text>
                </Table.Cell>
                <Table.Cell>{details.reference_id || '–'}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="info"
          title="Pan is Invalid"
          onClose={() => handleClose()}
        >
          <Table style={{ width: 260 }} basic="very" textAlign="center" compact>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={8}>
                  <Text color="bodyLight">Reference ID:</Text>
                </Table.Cell>
                <Table.Cell>{details.reference_id || '–'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={8}>
                  <Text color="bodyLight">Verification ID:</Text>
                </Table.Cell>
                <Table.Cell>{details.verification_id || '–'}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </AlertModal>
      );

    default:
      return (
        <AlertModal
          type="danger"
          title="Failed to Validate"
          onClose={() => handleClose()}
        >
          <Text className="mb-4" as="p" variant="p14" color="bodyLight">
            Unable to validate, please retry later.
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
