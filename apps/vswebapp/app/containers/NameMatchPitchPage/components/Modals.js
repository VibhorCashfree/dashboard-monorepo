import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Table, Text } from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';

const Modals = ({ modalType, setModalType }) => {
  const [details, setDetails] = useState({});
  const [matchType, setMatchType] = useState('');
  const handleClose = () => setModalType();

  const handleVerify = (status, response) => {
    setModalType(status[0]);
    setMatchType(status[1]);
    setDetails(response);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

    default:
      return (
        <AlertModal
          type="success"
          title="Name Match Successfull"
          onClose={() => handleClose()}
        >
          <Table basic="very" compact className="mt-3 px-5">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Name 1</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'name_1', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Name 2</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'name_2', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Score</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text color={matchType}>
                    {(Number(_get(details, 'score', 0)) * 100).toFixed(2)} % (
                    {_capitalize(_startCase(modalType))})
                  </Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Verification ID</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'verification_id', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Reference ID</Text>
                </Table.Cell>
                <Table.Cell>{_get(details, 'reference_id', '–')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Status</Text>
                </Table.Cell>
                <Table.Cell>
                <Table.Cell>{_get(details, 'status', '–')}</Table.Cell>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={6}>
                  <Text color="bodyLight">Reason</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'reason')
                    ? _capitalize(_startCase(_get(details, 'reason')))
                    : '–'}
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
