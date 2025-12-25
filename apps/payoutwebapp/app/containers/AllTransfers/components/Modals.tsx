import React, { useState } from 'react';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import AddBeneficiaryModal from 'containers/AllBeneficiaries/components/AddBeneficiaryModal';
import QuickTransferModal from './QuickTransferModal';

// Constants
import { UTR_LABEL } from 'constants/common';
import { MODAL_TYPE } from '../constants';

// Utils
import Region from 'utils/region';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
}) => {
  const [modalData, setModalData] = useState<string | undefined>();
  const [beneId, setBeneId] = useState<string>('');

  const handleResponse = (data: AnyObject) => {
    setModalType(data.type);
    setModalData(data.result);
    setFetchCounter((count: number) => count + 1);
  };

  switch (modalType) {
    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Transfer Successful"
          eventNameOnConfirm="Primary_Transfer_Success"
          eventNameOnClose="Secondary_Transfer_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {UTR_LABEL[Region.get()]} : <strong>{modalData}</strong>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Transfer Rejected"
          eventNameOnConfirm="Primary_Transfer_Rejected"
          eventNameOnClose="Secondary_Transfer_Rejected"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {modalData}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.PENDING:
      return (
        <AlertModal
          type="warning"
          title="Transfer Pending"
          eventNameOnConfirm="Primary_Transfer_Pending"
          eventNameOnClose="Secondary_Transfer_Pending"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          {modalData}
        </AlertModal>
      );

    case MODAL_TYPE.QUICK_TRANSFER:
      return (
        <QuickTransferModal
          beneId={beneId}
          setBeneId={setBeneId}
          switchAddBeneficiary={() => setModalType(MODAL_TYPE.ADD_BENEFICIARY)}
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.ADD_BENEFICIARY:
      return (
        <AddBeneficiaryModal
          onSubmit={setBeneId}
          onClose={() => setModalType(MODAL_TYPE.QUICK_TRANSFER)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
