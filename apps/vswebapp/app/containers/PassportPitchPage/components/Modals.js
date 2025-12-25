import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal, Table } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';

const Modals = ({ modalType, setModalType }) => {
  const [details, setDetails] = useState({});

  const handleResponse = (status, data) => {
    setDetails(data);
    setModalType(status);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal onClose={() => setModalType()} onVerify={handleResponse} />
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="danger"
          title="Passport is Invalid."
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.VALID:
      return (
        <AlertModal
          type="success"
          title="Passport is Valid."
          onClose={() => setModalType()}
        >
          <Table basic="very" compact className="mt-3 px-5">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">File Number</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'file_number', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Full Name</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'name', '–') || '–'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Date of Birth</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'dob', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Type</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'application_type', '–') || '–'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Application Received Date</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'application_received_date', '–') || '–'}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
