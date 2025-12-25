import React from 'react';
import { AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import SelfWithdrawalModal from './SelfWithdrawalModal';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  data,
  setData,
}) => {
  const handleResponse = (responseData: AnyObject, amount: number) => {
    setData({
      amount,
      addedOn: responseData.addedOn,
      utr: responseData.utr,
      status: responseData.withdrawalStatus,
    });

    switch (responseData.withdrawalStatus) {
      case 'FAILURE':
        setModalType(MODAL_TYPE.FAILED);
        break;

      default:
        setModalType(MODAL_TYPE.SUCCESS);
    }
  };

  switch (modalType) {
    case MODAL_TYPE.WITHDRAW:
      return (
        <SelfWithdrawalModal
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="success"
          title={`Withdrawal of ₹ ${data.amount} was initiated successfully`}
          eventNameOnConfirm="Primary_Last_Withdrawal_Success"
          eventNameOnClose="Secondary_Last_Withdrawal_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title={`Withdrawal of ₹ ${data.amount} failed`}
          eventNameOnConfirm="Primary_Last_Withdrawal_Failed"
          eventNameOnClose="Secondary_Last_Withdrawal_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );
  }
  return null;
};

export default withErrorBoundary(Modals);
