import React, { useState } from 'react';
import { toast, Text, AlertModal, ConfirmModal } from '@cashfree-intl/coherent';
import _noop from 'lodash/noop';
import _find from 'lodash/find';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { remove } from 'services/fundSources';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Utils
import { formatAmount } from 'utils/common';

// Components
import AddBeneficiaryModal from 'containers/AllBeneficiaries/components/AddBeneficiaryModal';
import QuickTransferModal from 'containers/AllTransfers/components/QuickTransferModal';
import InternalFundTransferModal from './InternalFundTransferModal';
import AllocateFundsModal from './AllocateFundsModal';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter = _noop,
  selectedRow,
}) => {
  const { virtualAccounts } = useEscrowAccount();

  const [modalData, setModalData] = useState<AnyObject>({});
  const [beneId, setBeneId] = useState<string>('');

  const handleResponse = async (response: any, formObj: AnyObject) => {
    switch (modalType) {
      case MODAL_TYPE.DELETE:
        {
          const response = await remove(selectedRow.fundSourceId);

          if (!('error' in response)) {
            toast.success(response.message);
          }

          setModalType(MODAL_TYPE.EMPTY);
        }
        break;

      case MODAL_TYPE.INTERNAL_FUND_TRANSFER:
        if (!('error' in response)) {
          setModalType(MODAL_TYPE.INTERNAL_FUND_TRANSFER_SUCCESS);
          setModalData(formObj);
        }

        break;

      case MODAL_TYPE.INITIATE_PAYOUT:
        {
          const newModalType = 'INITIATE_PAYOUT_' + response.type;
          setModalType(newModalType as MODAL_TYPE);

          setModalData(response.result);
          setFetchCounter((count: number) => count + 1);
        }
        break;

      case MODAL_TYPE.ALLOCATE_FUNDS:
        {
          const newModalType = 'ALLOCATE_FUNDS_' + response.type;
          setModalType(newModalType as MODAL_TYPE);

          setModalData(response.result);
          setFetchCounter((count: number) => count + 1);
        }
        break;
    }

    setFetchCounter((count: number) => count + 1);
  };

  switch (modalType) {
    case MODAL_TYPE.DELETE:
      return (
        <ConfirmModal
          danger
          title="Delete Account"
          confirmText="Delete"
          confirmBtnEvent="Primary_Delete_Virtual_Account"
          closeBtnEvent="Secondary_Delete_Virtual_Account"
          closeCrossEvent="Close_Icon_Delete_Virtual_Account"
          onConfirm={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text color="bodyLight">
            Are you sure you want to delete{' '}
            <Text as="span" strong>
              {selectedRow.displayName} ({selectedRow.virtualAccount})
            </Text>
            ?
          </Text>
        </ConfirmModal>
      );

    case MODAL_TYPE.INTERNAL_FUND_TRANSFER:
      return (
        <InternalFundTransferModal
          selectedRow={selectedRow}
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.INTERNAL_FUND_TRANSFER_SUCCESS: {
      const fromFundSource = _find(virtualAccounts, {
        paymentInstrumentId: modalData.paymentInstrumentId,
      });
      const toFundSource = _find(virtualAccounts, {
        paymentInstrumentId: modalData.toPaymentInstrumentId,
      });

      return (
        <AlertModal
          type="success"
          title="Fund Transfer Successful"
          eventNameOnConfirm="Primary_Internal_Transfer_Success"
          eventNameOnClose="Secondary_Internal_Transfer_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight" className="text-wrap">
            {formatAmount(modalData.amount)} transferred successfully from{' '}
            <b>
              {fromFundSource
                ? `${fromFundSource.displayName} (${fromFundSource.virtualAccount})`
                : '–'}
            </b>{' '}
            to{' '}
            <b>
              {toFundSource
                ? `${toFundSource.displayName} (${toFundSource.virtualAccount})`
                : '–'}
            </b>
          </Text>
        </AlertModal>
      );
    }

    case MODAL_TYPE.INITIATE_PAYOUT:
      return (
        <QuickTransferModal
          isOneEscrow
          initialPaymentInstrumentId={selectedRow.paymentInstrumentId}
          beneId={beneId}
          setBeneId={setBeneId}
          switchAddBeneficiary={() => setModalType(MODAL_TYPE.ADD_BENEFICIARY)}
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.INITIATE_PAYOUT_SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Transfer Successful"
          eventNameOnConfirm="Primary_Initiate_Payout_Success"
          eventNameOnClose="Secondary_Initiate_Payout_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            UTR No.:{' '}
            <strong>{typeof modalData === 'object' ? '–' : modalData}</strong>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.INITIATE_PAYOUT_FAILED:
      return (
        <AlertModal
          type="danger"
          title="Transfer Rejected"
          eventNameOnConfirm="Primary_Initiate_Payout_Failed"
          eventNameOnClose="Secondary_Initiate_Payout_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {typeof modalData === 'object' ? '–' : modalData}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.INITIATE_PAYOUT_PENDING:
      return (
        <AlertModal
          type="warning"
          title="Transfer Pending"
          eventNameOnConfirm="Primary_Initiate_Payout_Pending"
          eventNameOnClose="Secondary_Initiate_Payout_Pending"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          {typeof modalData === 'object' ? '–' : modalData}
        </AlertModal>
      );

    case MODAL_TYPE.ADD_BENEFICIARY:
      return (
        <AddBeneficiaryModal
          onSubmit={setBeneId}
          onClose={() => setModalType(MODAL_TYPE.INITIATE_PAYOUT)}
        />
      );

    case MODAL_TYPE.ALLOCATE_FUNDS:
      return (
        <AllocateFundsModal
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.ALLOCATE_FUNDS_SUCCESS: {
      const toFundSource = _find(virtualAccounts, {
        paymentInstrumentId: modalData.toPaymentInstrumentId,
      });

      return (
        <AlertModal
          type="success"
          title="Funds Allocated Successfully"
          eventNameOnConfirm="Primary_Allocate_Funds_Success"
          eventNameOnClose="Secondary_Allocate_Funds_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight" className="text-wrap">
            {formatAmount(modalData.amount)} were allocated to{' '}
            <b>
              {toFundSource
                ? `${toFundSource.displayName} (${toFundSource.virtualAccount})`
                : '–'}
            </b>
          </Text>
        </AlertModal>
      );
    }

    case MODAL_TYPE.ALLOCATE_FUNDS_FAILED:
      return (
        <AlertModal
          type="danger"
          title="Funds Allocation Failed"
          eventNameOnConfirm="Primary_Allocate_Funds_Failed"
          eventNameOnClose="Secondary_Allocate_Funds_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {typeof modalData === 'object' ? '–' : modalData}
          </Text>
        </AlertModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
