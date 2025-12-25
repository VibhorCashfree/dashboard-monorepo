import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import SwitchTwoFactorModal from './SwitchTwoFactorModal';
import AddIPAddressModal from './AddIPAddressModal';
import GenerateTwoFactorModal from './GenerateTwoFactorModal';
import DeleteIpAddressModal from './DeleteIpAddressModal';
import DeletePublicKeyModal from './DeletePublicKeyModal';

const Modals = ({
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
    case MODAL_TYPES.ADD:
      return (
        <AddIPAddressModal
          onSubmit={() => setFetchCounter(count => count + 1)}
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.SWITCH: {
      return (
        <SwitchTwoFactorModal
          method={currentMethod}
          onSwitch={handleSwitchMethod}
          onClose={() => setModalType()}
        />
      );
    }

    case MODAL_TYPES.GENERATE: {
      return (
        <GenerateTwoFactorModal
          email={data.merchantEmail}
          onSubmit={() => setFetchCounter(count => count + 1)}
          onClose={() => setModalType()}
        />
      );
    }

    case MODAL_TYPES.DELETE_IP: {
      return (
        <DeleteIpAddressModal
          ipAddress={selected}
          onDeleteIP={deleteIPAddress}
          onClose={() => setModalType()}
        />
      );
    }

    case MODAL_TYPES.DELETE_PUBLIC_KEY: {
      return (
        <DeletePublicKeyModal
          onDeletePublicKey={deletePublicKey}
          onClose={() => setModalType()}
        />
      );
    }
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  handleSwitchMethod: PropTypes.func.isRequired,
  deletePublicKey: PropTypes.func.isRequired,
  deleteIPAddress: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  currentMethod: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default Modals;
