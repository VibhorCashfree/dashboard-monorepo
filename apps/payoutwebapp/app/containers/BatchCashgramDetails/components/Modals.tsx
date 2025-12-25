import React from 'react';
import { Text, ConfirmModal, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import ApprovalsModalInfo from 'components/ApprovalsModalInfo';

// Utils
import { getApprovalMessages } from '../utils';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  hasBatchPreference,
  batchRowDetails,
  count,
  amount,
  handleAction,
}) => {
  const messages = getApprovalMessages(hasBatchPreference, modalType, count);

  const goToApproveBatch = (): void => {
    window.location.href = `${process.env.PUBLIC_PATH}cashgrams/approve-batch`;
  };

  switch (modalType) {
    case MODAL_TYPE.APPROVE:
    case MODAL_TYPE.REJECT:
      return (
        <ConfirmModal
          title={messages.title}
          confirmText={modalType === MODAL_TYPE.APPROVE ? 'Approve' : 'Reject'}
          confirmBtnEvent={`Primary_${messages.title}`}
          closeBtnEvent={`Secondary_${messages.title}`}
          closeCrossEvent={`Close_Icon_${messages.title}`}
          onClose={setModalType}
          onConfirm={handleAction}
        >
          <Text variant="p14" color="bodyLight">
            {messages.description}
          </Text>
          <ApprovalsModalInfo
            fileName={batchRowDetails.fileName}
            count={hasBatchPreference ? batchRowDetails.countCashgrams : count}
            amount={hasBatchPreference ? batchRowDetails.totalAmount : amount}
          />
        </ConfirmModal>
      );

    case MODAL_TYPE.APPROVED:
      return (
        <AlertModal
          type="success"
          title={messages.success}
          eventNameOnConfirm={`Primary_${messages.success}`}
          eventNameOnClose={`Secondary_${messages.success}`}
          onClose={goToApproveBatch}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Check the status in the{' '}
            <a
              href={`${process.env.PUBLIC_PATH}cashgrams/batch`}
              className="link"
            >
              batch files section
            </a>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.REJECTED:
      return (
        <AlertModal
          type="danger"
          title={messages.danger}
          eventNameOnConfirm={`Primary_${messages.danger}`}
          eventNameOnClose={`Secondary_${messages.danger}`}
          onClose={goToApproveBatch}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
