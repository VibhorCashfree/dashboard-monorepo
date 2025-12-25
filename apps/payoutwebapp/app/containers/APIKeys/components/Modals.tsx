import React from 'react';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import NewAPIKeyModal from './NewAPIKeyModal';
import DeleteAPIKeyModal from './DeleteAPIKeyModal';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  isMerchantLevel,
  setFetchCounter,
  handleDelete,
  selected,
}) => {
  switch (modalType) {
    case MODAL_TYPE.ADD:
      return (
        <NewAPIKeyModal
          isMerchantLevel={isMerchantLevel}
          onSubmit={() => setFetchCounter((count) => count + 1)}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.DELETE:
      return (
        <DeleteAPIKeyModal
          isMerchantLevel={isMerchantLevel}
          clientId={selected}
          onDelete={handleDelete}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
