import React, { useState } from 'react';
import { Space, Text, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import Region from 'utils/region';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Components
import AddBeneficiaryModal from 'containers/AllBeneficiaries/components/AddBeneficiaryModal';
import QuickTransferModal from 'containers/AllTransfers/components/QuickTransferModal';
import CreateVirtualAccountModal from './CreateVirtualAccountModal';

// Constants
import { REGION } from 'constants/common';
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
}) => {
  const { details } = useEscrowAccount();

  const [modalData, setModalData] = useState<AnyObject>({});
  const [beneId, setBeneId] = useState<string>('');

  const handleResponse = (response: any, formObj: AnyObject) => {
    switch (modalType) {
      case MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT:
        if (response.error) {
          setModalType(MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT_FAILED);
          setModalData({
            message: response.error.message,
          });
        } else {
          setModalType(MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT_SUCCESS);
          setModalData({ ...formObj, ...response });
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
    }

    setFetchCounter((count: number) => count + 1);
  };

  switch (modalType) {
    case MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT:
      return (
        <CreateVirtualAccountModal
          onResponse={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT_SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Virtual Account Created Successfully"
          eventNameOnConfirm="Primary_Virtual_Account_Created_Success"
          eventNameOnClose="Secondary_Virtual_Account_Created_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Space direction="column" gap={1} alignItems="center">
            <Space>
              <Text color="bodyLight">Account Name</Text>
              <Text>
                {' : '} {modalData.displayName}
              </Text>
            </Space>
            {Region.get() === REGION.IN ? (
              <Space>
                <Text color="bodyLight">Virtual Account Number</Text>
                <Text>
                  {' : '} {modalData.virtualAccountNumber}
                </Text>
              </Space>
            ) : (
              <Space>
                <Text color="bodyLight">Virtual IBAN</Text>
                <Text>
                  {' : '} {modalData.virtualIBan}
                </Text>
              </Space>
            )}
            <Space>
              <Text color="bodyLight">IFSC</Text>
              <Text>
                {' : '} {details.ifsc}
              </Text>
            </Space>
          </Space>
        </AlertModal>
      );

    case MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT_FAILED:
      return (
        <AlertModal
          type="danger"
          title="Virtual Account Creation Failed"
          eventNameOnConfirm="Primary_Virtual_Account_Created_Failed"
          eventNameOnClose="Secondary_Virtual_Account_Created_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text color="bodyLight">{modalData.message}</Text>
        </AlertModal>
      );

    case MODAL_TYPE.INITIATE_PAYOUT:
      return (
        <QuickTransferModal
          isOneEscrow
          initialPaymentInstrumentId={details.paymentInstrumentId}
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
            <strong>{typeof modalData === 'object' ? '-' : modalData}</strong>
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
            {typeof modalData === 'object' ? '-' : modalData}
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
          {typeof modalData === 'object' ? '-' : modalData}
        </AlertModal>
      );

    case MODAL_TYPE.ADD_BENEFICIARY:
      return (
        <AddBeneficiaryModal
          onSubmit={setBeneId}
          onClose={() => setModalType(MODAL_TYPE.INITIATE_PAYOUT)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
