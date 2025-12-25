import React from 'react';
import { ConfirmModal } from '@cashfree-intl/coherent';

// Components
import VideoEmbedModal from 'components/VideoEmbedModal';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalProps } from '../types';

const Modals = ({
  modalType,
  setModalType,
  handleActivation,
  embedKey,
  product,
  activationContent,
}: ModalProps) => {
  switch (modalType) {
    case MODAL_TYPE.CONFIRM:
      return (
        <ConfirmModal
          title={`Activate ${product}`}
          confirmText="I agree"
          confirmBtnEvent={`Primary_Activate_${product}`}
          closeBtnEvent={`Secondary_Activate_${product}`}
          closeCrossEvent={`Close_Icon_Activate_${product}`}
          onConfirm={handleActivation}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          {activationContent}
        </ConfirmModal>
      );

    case MODAL_TYPE.EMBED:
      return (
        <VideoEmbedModal
          embedKey={embedKey}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default Modals;
