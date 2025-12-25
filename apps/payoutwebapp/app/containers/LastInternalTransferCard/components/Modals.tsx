import React, { useState } from 'react';
import { AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import InternalTransferModal from './InternalTransferModal';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  nonConnectedAccounts,
}) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const handleResponse = (data: string, amount: number) => {
    setAmount(amount);

    switch (data) {
      case MODAL_TYPE.SUCCESS:
        setModalType(MODAL_TYPE.SUCCESS);
        break;

      default:
        setModalType(MODAL_TYPE.FAILED);
    }
  };

  switch (modalType) {
    case MODAL_TYPE.TRANSFER:
      return (
        <InternalTransferModal
          nonConnectedAccounts={nonConnectedAccounts}
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="success"
          title={`Internal fund transfer of ₹ ${amount} was successful`}
          eventNameOnConfirm="Primary_Last_Internal_Transfer_Success"
          eventNameOnClose="Secondary_Last_Internal_Transfer_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title={`Internal fund transfer of ₹ ${amount} failed`}
          eventNameOnConfirm="Primary_Last_Internal_Transfer_Failed"
          eventNameOnClose="Secondary_Last_Internal_Transfer_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
