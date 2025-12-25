import React from 'react';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import SwitchTwoFactorModal from './SwitchTwoFactorModal';
import AddIPAddressModal from './AddIPAddressModal';
import GenerateTwoFactorModal from './GenerateTwoFactorModal';
import DeleteIpAddressModal from './DeleteIpAddressModal';
import DeletePublicKeyModal from './DeletePublicKeyModal';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
  handleSwitchMethod,
  deletePublicKey,
  deleteIPAddress,
  selected,
  currentMethod,
  data,
}) => {
  switch (modalType) {
    case MODAL_TYPE.ADD:
      return (
        <AddIPAddressModal
          onSubmit={() => setFetchCounter((count) => count + 1)}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.SWITCH: {
      return (
        <SwitchTwoFactorModal
          method={currentMethod}
          onSwitch={handleSwitchMethod}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );
    }

    case MODAL_TYPE.GENERATE: {
      return (
        <GenerateTwoFactorModal
          email={data.merchantEmail}
          onSubmit={() => setFetchCounter((count) => count + 1)}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );
    }

    case MODAL_TYPE.DELETE_IP: {
      return (
        <DeleteIpAddressModal
          ipAddress={selected}
          onDeleteIP={deleteIPAddress}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );
    }

    case MODAL_TYPE.DELETE_PUBLIC_KEY: {
      return (
        <DeletePublicKeyModal
          onDeletePublicKey={deletePublicKey}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );
    }
    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
