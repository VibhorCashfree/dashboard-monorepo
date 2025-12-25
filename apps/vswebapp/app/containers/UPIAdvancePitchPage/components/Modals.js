import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Text, AlertModal } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import ValidModal from './ValidModal';

// Styled
import { ModalRow } from 'styled/common';

const Modals = ({ modalType, setModalType }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = (responseData, accountStatus) => {
    switch (accountStatus) {
      case 'VALID':
        setModalData(responseData);
        setModalType(MODAL_TYPES.VALID);
        break;

      case 'INVALID':
        setModalData(responseData);
        setModalType(MODAL_TYPES.INVALID);
        break;

      default:
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

    case MODAL_TYPES.VALID:
      return (
        <AlertModal
          type="success"
          title="VPA is Valid"
          onClose={() => setModalType()}
          maxWidth="360"
        >
          <div className="mt-1">
            <ModalRow>
              <div>
                <Text color="bodyLight">VPA</Text>
              </div>
              <div className="text-wrap">{modalData.vpa || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name at Bank</Text>
              </div>
              <div className="text-wrap">{modalData.name_at_bank || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">IFSC</Text>
              </div>
              <div className="text-wrap">{modalData.ifsc || '–'}</div>
            </ModalRow>
          </div>
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="info"
          title="VPA is Invalid"
          onClose={() => setModalType()}
        >
          <Table basic="very" textAlign="center" compact>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={8}>
                  <Text color="bodyLight">VPA</Text>
                </Table.Cell>
                <Table.Cell>{modalData.vpa}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </AlertModal>
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Failed To Validate"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {modalData.message}
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
