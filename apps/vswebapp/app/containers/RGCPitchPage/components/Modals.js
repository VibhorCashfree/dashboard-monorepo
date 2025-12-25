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

    case MODAL_TYPES.VALID:
      return (
        <AlertModal
          type="success"
          title="Reverse Geocoding is Valid."
          onClose={() => setModalType()}
        >
          <Table basic="very" compact className="mt-3 px-5">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Latitude</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'latitude', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Longitude</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'longitude', '–')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Address</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'address', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Score</Text>
                </Table.Cell>
                <Table.Cell>
                  {`${Number(_get(details, 'score', '0')) * 100} %`}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </AlertModal>
      );

    default:
      return (
        <AlertModal
          type="danger"
          title="Reverse Geocoding Failed"
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
