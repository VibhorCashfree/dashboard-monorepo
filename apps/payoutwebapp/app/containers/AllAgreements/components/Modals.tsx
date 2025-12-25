import React, { useState } from 'react';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import MarkTerminalStatus from './MarkTerminalStatusModal';
import AddAgreementModal from './AddAgreementModal';

// Constants
import { MODAL_TYPE } from '../constants';

// Utils
import { formatAmount } from 'utils/common';

// Types
import type { ModalData, ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
  data,
}) => {
  const [modalData, setModalData] = useState<ModalData>({});

  const handleResponse = (modalType: MODAL_TYPE, data: ModalData) => {
    setModalData(data);
    setModalType(modalType);
    setFetchCounter((count: number) => count + 1);
  };

  switch (modalType) {
    case MODAL_TYPE.CREATE:
      return (
        <AddAgreementModal
          onSubmit={() => setFetchCounter((count) => count + 1)}
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.MARK_TERMINAL_STATUS:
      return (
        <MarkTerminalStatus
          data={data}
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.UPDATE_SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Agreement Status Successfully Updated & Payout Initiated"
          eventNameOnConfirm="Primary_Agreement_Update_Success"
          eventNameOnClose="Secondary_Agreement_Update_Success"
          onClose={() => window.location.reload()}
        >
          <Text color="bodyLight">
            Agreement ID: <strong>{modalData.agreement_id}</strong>
          </Text>
          <Text color="bodyLight">
            No. of Payouts: <strong>{modalData.number_of_payouts}</strong>
          </Text>
          <Text color="bodyLight">
            Total Amount:{' '}
            <Text as="span" strong>
              {formatAmount(modalData.total_amount)}
            </Text>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.UPDATE_FAILED:
      return (
        <AlertModal
          type="danger"
          title="Unable to mark status as failed"
          eventNameOnConfirm="Primary_Agreement_Update_Failed"
          eventNameOnClose="Secondary_Agreement_Update_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text color="bodyLight">{modalData.message}</Text>
        </AlertModal>
      );

    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Agreement Created Successfully"
          eventNameOnConfirm="Primary_Agreement_Create_Success"
          eventNameOnClose="Secondary_Agreement_Create_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text color="bodyLight">
            Agreement ID: <strong>{modalData.agreement_id}</strong>
          </Text>
          <Text color="bodyLight">
            No. of Parties: <strong>{modalData.number_of_parties}</strong>
          </Text>
          <Text color="bodyLight">
            Amount:{' '}
            <Text as="span" strong>
              {formatAmount(modalData.total_amount)}
            </Text>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Agreement Creation Failed"
          eventNameOnConfirm="Primary_Agreement_Create_Failed"
          eventNameOnClose="Secondary_Agreement_Create_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text color="bodyLight">{modalData.message}</Text>
        </AlertModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
