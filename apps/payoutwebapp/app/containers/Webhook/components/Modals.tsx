import React from 'react';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import UpdateWebhookModal from './UpdateWebhookModal';
import DeleteWebhookModal from './DeleteWebhookModal';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setFetchCounter,
  handleDelete,
  handleClose,
  selected,
  versions,
  setSelectedVersion,
}) => {
  switch (modalType) {
    case MODAL_TYPE.ADD:
    case MODAL_TYPE.EDIT:
    case MODAL_TYPE.TEST:
      return (
        <UpdateWebhookModal
          url={selected}
          actionType={modalType}
          versions={versions}
          onSubmit={(newVersion: string) => {
            setSelectedVersion(newVersion);
            setFetchCounter((count) => count + 1);
          }}
          onClose={() => {
            setFetchCounter((count: number) => count + 1);
            handleClose();
          }}
        />
      );

    case MODAL_TYPE.DELETE:
      return (
        <DeleteWebhookModal onDelete={handleDelete} onClose={handleClose} />
      );

    default:
      return null; // Ensure a default case for type safety
  }
};

export default withErrorBoundary(Modals);
