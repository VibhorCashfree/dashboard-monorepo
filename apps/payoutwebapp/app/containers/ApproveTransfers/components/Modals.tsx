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
  count,
  handleAction,
}) => {
  const messages = getApprovalMessages(modalType, count);

  switch (modalType) {
    case MODAL_TYPE.VERIFY:
    case MODAL_TYPE.REJECT:
      return (
        <ConfirmModal
          title={messages.title}
          confirmText={modalType === MODAL_TYPE.VERIFY ? 'Approve' : 'Reject'}
          confirmBtnEvent={`Primary_${messages.title}`}
          closeBtnEvent={`Secondary_${messages.title}`}
          closeCrossEvent={`Close_Icon_${messages.title}`}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
          onConfirm={handleAction}
        >
          <Text variant="p14" color="bodyLight">
            {messages.description}
          </Text>
          <ApprovalsModalInfo count={count} />
        </ConfirmModal>
      );

    case MODAL_TYPE.VERIFIED:
      return (
        <AlertModal
          type="success"
          title={messages.success}
          eventNameOnConfirm={`Primary_${messages.success}`}
          eventNameOnClose={`Secondary_${messages.success}`}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.REJECTED:
      return (
        <AlertModal
          type="success"
          title={messages.danger}
          eventNameOnConfirm={`Primary_${messages.danger}`}
          eventNameOnClose={`Secondary_${messages.danger}`}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
