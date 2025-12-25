import React from 'react';
import { toast, Text, AlertModal, ConfirmModal } from '@cashfree-intl/coherent';

// Services
import { remove } from 'services/beneficiaries';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import AddBeneficiaryModal from './AddBeneficiaryModal';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  selectedRow,
  setModalType,
  setFetchCounter,
}) => {
  const handleDelete = async () => {
    const response = await remove(selectedRow.beneId);

    if (!('error' in response)) {
      setFetchCounter((count: number) => count + 1);

      toast.success(response.message);
    }

    setModalType(MODAL_TYPE.EMPTY);
  };

  switch (modalType) {
    case MODAL_TYPE.ADD:
      return (
        <AddBeneficiaryModal
          onSubmit={() => setFetchCounter((count) => count + 1)}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.UPDATE:
      return (
        <AddBeneficiaryModal
          type={modalType}
          selectedRow={selectedRow}
          onSubmit={() => window.location.reload()}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="info"
          title="Beneficiary Verification In-Progress"
          confirmText="Okay, Got it"
          eventNameOnConfirm="Primary_Beneficiary_Verification_InProgress"
          eventNameOnClose="Secondary_Beneficiary_Verification_InProgress"
          onConfirm={() => setModalType(MODAL_TYPE.EMPTY)}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Beneficiary will be successfully added once the verification is
            complete.
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.DELETE:
      return (
        <ConfirmModal
          danger
          title="Delete Beneficiary"
          confirmText="Delete"
          confirmBtnEvent="Primary_Delete_Beneficiary"
          closeBtnEvent="Secondary_Delete_Beneficiary"
          closeCrossEvent="Close_Icon_Delete_Beneficiary"
          onConfirm={handleDelete}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text variant="p14">
            You will not be able to transfer funds to this beneficiary after you
            delete it.
          </Text>
        </ConfirmModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
