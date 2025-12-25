import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Table, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';

const Modals = ({ modalType, setModalType }) => {
  const [details, setDetails] = useState({});
  const handleClose = () => setModalType();

  const handleVerify = response => {
    setModalType('SUCCESS');
    setDetails(response);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

    case MODAL_TYPES.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Face Match Successful"
          onClose={() => handleClose()}
        >
          <Table basic="very" compact className="mt-3 px-5">
            <Table.Body>
            <Table.Row>
                <Table.Cell>
                  <Text color="bodyLight">Reference ID</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'ref_id', '–')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text color="bodyLight">Status</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'status', '–')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text color="bodyLight">Face Match Result</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'face_match_result', '–')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text color="bodyLight">Face Match Score</Text>
                </Table.Cell>
                <Table.Cell>
                  {Number(_get(details, 'face_match_score', 0)) * 100} %
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text color="bodyLight">Verification ID</Text>
                </Table.Cell>
                <Table.Cell>
                  {_get(details, 'verification_id', '–')}
                </Table.Cell>
              </Table.Row>
              {_get(details, 'mask_detected_first_image', false) && (
                <Table.Row>
                  <Table.Cell width={6}>
                    <Text color="bodyLight">
                      First Image Mask Detection Score
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    {Number(
                      _get(details, 'mask_detected_score_first_image', 0),
                    ) * 100}{' '}
                    %
                  </Table.Cell>
                </Table.Row>
              )}
              {_get(details, 'mask_detected_second_image', false) && (
                <Table.Row>
                  <Table.Cell width={6}>
                    <Text color="bodyLight">
                      First Image Mask Detection Score
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    {Number(_get(details, 'mask_detected_second_image', 0)) *
                      100}{' '}
                    %
                  </Table.Cell>
                </Table.Row>
              )}
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
