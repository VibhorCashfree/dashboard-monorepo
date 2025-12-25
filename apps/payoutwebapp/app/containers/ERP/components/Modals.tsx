import React from 'react';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import CreateBankAccount from './CreateBankAccount';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  selectedBank,
}) => {
  switch (modalType) {
    case MODAL_TYPE.ADD:
      return (
        <CreateBankAccount
          selectedBank={selectedBank}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
