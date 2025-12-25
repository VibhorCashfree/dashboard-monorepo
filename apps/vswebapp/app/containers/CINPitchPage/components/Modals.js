import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertModal,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Space,
  Conditional,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';
import StatusLabel from 'components/StatusLabel';

// Styled
import { Divider, DetailsRow, ModalRow } from 'styled/common';

const Modals = ({ modalType, setModalType }) => {
  const [modalData, setModalData] = useState({});
  const handleClose = () => setModalType();

  const handleVerify = (status, response) => {
    setModalType(status);
    setModalData(response);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

    case MODAL_TYPES.VALID:
      return (
        <AlertModal
          type="success"
          title="CIN is Valid"
          maxWidth="730"
          onClose={() => setModalType()}
          className="my-3"
        >
          <Space fullWidth gap={1}>
            <ModalRow>
              <div>
                <Text color="bodyLight">CIN</Text>
              </div>
              <div className="text-wrap">{modalData.cin || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name of Business</Text>
              </div>
              <div className="text-wrap">{modalData.company_name || '–'}</div>
            </ModalRow>
          </Space>
          <Divider contain />
          <Space fullWidth gap={1}>
            <ModalRow>
              <div>
                <Text color="bodyLight">Registration No.</Text>
              </div>
              <div className="text-wrap">
                {modalData.registration_number || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Date of Incorporation</Text>
              </div>
              <div className="text-wrap">
                {modalData.incorporation_date || '–'}
              </div>
            </ModalRow>
          </Space>
          <Conditional if={modalData?.director_details}>
            <Divider contain />
            <Text variant="h20" className="pb-1 text-center">
              Director Details
            </Text>
            {modalData?.director_details?.map(data => (
              <>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Name</Text>
                    </div>
                    <div className="text-wrap">{_get(data, 'name', '–')}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Date of Birth</Text>
                    </div>
                    <div className="text-wrap">{_get(data, 'dob', '–')}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Designation</Text>
                    </div>
                    <div className="text-wrap">
                      {_get(data, 'designation', '–')}
                    </div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Address</Text>
                    </div>
                    <div className="text-wrap">
                      {_get(data, 'address', '–')}
                    </div>
                  </ModalRow>
                </Space>
              </>
            ))}
          </Conditional>
        </AlertModal>
      );

    case MODAL_TYPES.INVALID:
      return (
        <AlertModal
          type="danger"
          title="CIN is Invalid"
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
