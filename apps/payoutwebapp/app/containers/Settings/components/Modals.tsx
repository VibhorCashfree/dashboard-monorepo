import React from 'react';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { INTERNAL_SERVER_ERROR } from 'constants/errors';
import { MODAL_TYPE } from '../constants';

// Components
import AddRecipientModal from './AddRecipientModal';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
  selectedAccountId,
  data,
}) => {
  const handleResponse = (modalType: MODAL_TYPE) => {
    setModalType(modalType);
    setFetchCounter((count: number) => count + 1);
  };

  switch (modalType) {
    case MODAL_TYPE.ADD_RECIPIENT:
      return (
        <AddRecipientModal
          data={data}
          selectedAccountId={selectedAccountId}
          onSubmit={handleResponse}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Recipient Added Successfully"
          eventNameOnConfirm="Primary_Recipient_Added_Success"
          eventNameOnClose="Secondary_Recipient_Added_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Notifications will be sent to the recipient.
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.ERROR:
      return (
        <AlertModal
          type="danger"
          title={INTERNAL_SERVER_ERROR}
          eventNameOnConfirm="Primary_Recipient_Added_Failed"
          eventNameOnClose="Secondary_Recipient_Added_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
