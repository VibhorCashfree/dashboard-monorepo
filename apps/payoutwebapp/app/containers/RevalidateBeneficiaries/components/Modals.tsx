import React from 'react';
import { Text, ConfirmModal, AlertModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import ApprovalsModalInfo from 'components/ApprovalsModalInfo';

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
  switch (modalType) {
    case MODAL_TYPE.REVALIDATE: {
      const title = `Revalidate ${count > 1 ? 'Beneficiaries' : 'Beneficiary'}`;

      return (
        <ConfirmModal
          title={title}
          confirmText="Revalidate"
          confirmBtnEvent={`Primary_${title}`}
          closeBtnEvent={`Secondary_${title}`}
          closeCrossEvent={`Close_Icon_${title}`}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
          onConfirm={handleAction}
        >
          <Text variant="p14" color="bodyLight">
            Are you sure you want to revalidate the selected{' '}
            {count > 1 ? 'beneficiaries' : 'beneficiary'}?
          </Text>
          <ApprovalsModalInfo count={count} />
        </ConfirmModal>
      );
    }

    case MODAL_TYPE.REVALIDATED_SUCCESS:
      return (
        <AlertModal
          type="success"
          title="Beneficiary Revalidated Successfully"
          eventNameOnConfirm="Primary_Beneficiary_Revalidation_Success"
          eventNameOnClose="Secondary_Beneficiary_Revalidation_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Please visit &apos;Revalidate&apos; tab for checking invalid
            Beneficiaries
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.REVALIDATED_FAILED:
      return (
        <AlertModal
          type="danger"
          title="Beneficiary Revalidation Failed"
          eventNameOnConfirm="Primary_Beneficiary_Revalidation_Failed"
          eventNameOnClose="Secondary_Beneficiary_Revalidation_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Please try again later.
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.REVALIDATE_ALL:
      return (
        <ConfirmModal
          title="Revalidate all Beneficiaries"
          confirmText="Revalidate all"
          confirmBtnEvent="Primary_Revalidate_All_Beneficiaries"
          closeBtnEvent="Secondary_Revalidate_All_Beneficiaries"
          closeCrossEvent="Close_Icon_Revalidate_All_Beneficiaries"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
          onConfirm={handleAction}
        >
          <Text variant="p14" color="bodyLight">
            Are you sure you want to revalidate all beneficiaries?
          </Text>
        </ConfirmModal>
      );
  }
  return null;
};

export default withErrorBoundary(Modals);
