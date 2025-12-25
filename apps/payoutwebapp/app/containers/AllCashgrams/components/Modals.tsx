import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, AlertModal, Space } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import { formatAmount } from 'utils/common';

// Components
import Copy from 'components/Copy';
import SendCashgramModal from './SendCashgramModal';
import DeactivateCashgramModal from './DeactivateCashgramModal';
import CreateCashgramModal from './CreateCashgramModal';

// Constants
import { MENU, PATH_BY_MENU } from 'constants/menuItems';
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalData, ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
  selectedRow,
}) => {
  const [modalData, setModalData] = useState<ModalData>({});

  const navigate = useNavigate();

  const handleResponse = (modalType: MODAL_TYPE, data: ModalData) => {
    setModalData(data);
    setModalType(modalType);
    setFetchCounter((count: number) => count + 1);
  };

  switch (modalType) {
    case MODAL_TYPE.SEND:
      return (
        <SendCashgramModal
          data={selectedRow}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.DEACTIVATE:
      return (
        <DeactivateCashgramModal
          data={selectedRow}
          onSubmit={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.CREATE:
      return (
        <CreateCashgramModal
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.SUCCESS:
      return modalData.vpa ? (
        <AlertModal
          type="success"
          title="The UPI transfer to the beneficiary is initiated."
          confirmText="Close"
          cancelText="View Cashgarm Details"
          eventNameOnConfirm="Primary_UPI_Transfer_To_Beneficiary_Success"
          eventNameOnClose="Secondary_UPI_Transfer_To_Beneficiary_Success"
          onConfirm={() => setModalType(MODAL_TYPE.EMPTY)}
          onClose={() => {
            navigate(
              `/${PATH_BY_MENU[MENU.CASHGRAMS]}/${
                modalData.referenceId
              }/details`,
              {
                state: { rowDetails: { cashgramId: modalData.cashgramId } },
              },
            );
          }}
        >
          <div style={{ width: 250, margin: '1.5rem auto' }}>
            <Space justifyContent="space-between" className="mb-2">
              <Text color="bodyLight">Amount</Text>
              <Text>{formatAmount(modalData.amount)}</Text>
            </Space>
            <Space justifyContent="space-between">
              <Text color="bodyLight">UPI ID</Text>
              <Text>{modalData.vpa}</Text>
            </Space>
          </div>
        </AlertModal>
      ) : (
        <AlertModal
          type="success"
          title={`Cashgram successfully created ${
            modalData.toBeSent ? 'and will be sent to the beneficiary.' : ''
          }`}
          eventNameOnConfirm="Primary_Create_Cashgram_Success"
          eventNameOnClose="Secondary_Create_Cashgram_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight" className="text-wrap">
            {modalData.cashgramLink}
            <Copy value={modalData.cashgramLink} />
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Unable to create Cashgram"
          eventNameOnConfirm="Primary_Create_Cashgram_Failed"
          eventNameOnClose="Secondary_Create_Cashgram_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Try again after some time or write to{' '}
            <a href="mailto:care@cashfree.com">care@cashfree.com</a>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.DEACTIVATE_SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Cashgram successfully Deactivated"
          eventNameOnConfirm="Primary_Deactivate_Cashgram_Success"
          eventNameOnClose="Secondary_Deactivate_Cashgram_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.DEACTIVATE_FAILED:
      return (
        <AlertModal
          type="danger"
          title="Cashgram Deactivation failed"
          eventNameOnConfirm="Primary_Deactivate_Cashgram_Failed"
          eventNameOnClose="Secondary_Deactivate_Cashgram_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {modalData.message ||
              'Try again after some time or write to care@cashfree.com'}
          </Text>
        </AlertModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
