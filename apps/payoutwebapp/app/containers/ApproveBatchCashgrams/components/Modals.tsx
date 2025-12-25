import React from 'react';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({ modalType, setModalType }) => {
  switch (modalType) {
    case MODAL_TYPE.APPROVED:
      return (
        <AlertModal
          type="success"
          title="Cashgrams Approved Successfully"
          eventNameOnConfirm="Primary_Cashgram_Approved_Success"
          eventNameOnClose="Secondary_Cashgram_Approved_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Check the status in the batch files section.
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.REJECTED:
      return (
        <AlertModal
          type="danger"
          title="Cashgrams Rejected"
          eventNameOnConfirm="Primary_Cashgram_Rejected"
          eventNameOnClose="Secondary_Cashgram_Rejected"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
