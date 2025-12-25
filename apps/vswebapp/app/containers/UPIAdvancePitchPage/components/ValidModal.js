import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertModal, Text, Space } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Styled
import { Divider, ModalRow } from 'styled/common';

const ValidModal = ({ modalData, setModalType }) => (
  <AlertModal
    type="success"
    title="VPA is Valid"
    maxWidth="760"
    onClose={() => setModalType()}
    className="my-3"
  >
    <Space fullWidth gap={1}>
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
    </Space>
    <Divider contain />
    <Text variant="h20" className="mb-2 text-center">
      IFSC Details
    </Text>

    <Space fullWidth gap={1.5} direction="column">
      <ModalRow singleRow>
        <div>
          <Text color="bodyLight">Address</Text>
        </div>
        <div className="text-wrap">
          {modalData?.ifsc_details?.address || '–'}
        </div>
      </ModalRow>
      <ModalRow singleRow>
        <div>
          <Text color="bodyLight">Branch</Text>
        </div>
        <div className="text-wrap">
          {modalData?.ifsc_details?.branch || '–'}
        </div>
      </ModalRow>
    </Space>
    <Space fullWidth gap={1.5}>
      <ModalRow>
        <div>
          <Text color="bodyLight">Bank</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.bank || '–'}</div>
      </ModalRow>
      <ModalRow>
        <div>
          <Text color="bodyLight">City</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.city || '–'}</div>
      </ModalRow>
      <ModalRow>
        <div>
          <Text color="bodyLight">State</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.state || '–'}</div>
      </ModalRow>
    </Space>
    <Space fullWidth gap={1.5}>
      <ModalRow>
        <div>
          <Text color="bodyLight">Swift Code</Text>
        </div>
        <div className="text-wrap">
          {modalData?.ifsc_details?.swift_code || '–'}
        </div>
      </ModalRow>
      <ModalRow>
        <div>
          <Text color="bodyLight">MICR</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.micr || '–'}</div>
      </ModalRow>
      <ModalRow>
        <div>
          <Text color="bodyLight">IMPS</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.imps || '–'}</div>
      </ModalRow>
    </Space>
    <Space fullWidth gap={1.5}>
      <ModalRow>
        <div>
          <Text color="bodyLight">NEFT</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.neft || '–'}</div>
      </ModalRow>
      <ModalRow>
        <div>
          <Text color="bodyLight">RTGS</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.rtgs || '–'}</div>
      </ModalRow>
      <ModalRow>
        <div>
          <Text color="bodyLight">UPI</Text>
        </div>
        <div className="text-wrap">{modalData?.ifsc_details?.upi || '–'}</div>
      </ModalRow>
    </Space>
  </AlertModal>
);

ValidModal.propTypes = {
  modalData: PropTypes.object.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default ValidModal;
