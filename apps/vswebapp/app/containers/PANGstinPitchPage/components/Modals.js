import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal, Space } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import StatusLabel from 'components/StatusLabel';

// Styled
import { Divider, ModalRow } from 'styled/common';

const Modals = ({ modalType, setModalType }) => {
  const [modalData, setModalData] = useState({});

  const handleResponse = (status, data) => {
    setModalType(status);
    setModalData(data);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal onClose={() => setModalType()} onVerify={handleResponse} />
      );

    case MODAL_TYPES.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="GSTIN Fetched Successfully"
          maxWidth="400"
          onClose={() => setModalType()}
        >
          <Space direction="column">
            <Text variant="p14" className="my-2" color="bodyLight" as="p">
              {_get(modalData, 'gstin_list', []).length} GSTIN
              {_get(modalData, 'gstin_list', []).length > 1 ? 's' : ''} Found
            </Text>
            <Space fullWidth gap={1}>
              <ModalRow>
                <div>
                  <Text color="bodyLight">PAN</Text>
                </div>
                <div className="text-wrap">{modalData.pan || '–'}</div>
              </ModalRow>
            </Space>

            {_get(modalData, 'gstin_list', []).map((data, index) => (
              <>
                <Divider contain />
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">GSTIN {index + 1}</Text>
                    </div>
                    <div className="text-wrap">{_get(data, 'gstin')}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Status</Text>
                    </div>
                    <div>
                      <StatusLabel filled>{_get(data, 'status')}</StatusLabel>
                    </div>
                  </ModalRow>
                </Space>
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">State</Text>
                    </div>
                    <div>
                      <StatusLabel filled>{_get(data, 'state')}</StatusLabel>
                    </div>
                  </ModalRow>
                </Space>
              </>
            ))}
          </Space>
        </AlertModal>
      );

    case MODAL_TYPES.GSTIN_NOT_FOUND:
      return (
        <AlertModal
          type="danger"
          title="GSTINs Not Found"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14" color="bodyLight">
            GSTIN does not exist
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
