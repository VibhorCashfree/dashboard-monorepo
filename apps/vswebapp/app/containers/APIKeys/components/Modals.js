import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import NewAPIKeyModal from './NewAPIKeyModal';
import DeleteAPIKeyModal from './DeleteAPIKeyModal';

const Modals = ({
  modalType,
  setModalType,
  setFetchCounter,
  handleDelete,
  selected,
}) => {
  switch (modalType) {
    case MODAL_TYPES.ADD:
      return (
        <NewAPIKeyModal
          onSubmit={() => setFetchCounter(count => count + 1)}
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.DELETE:
      return (
        <DeleteAPIKeyModal
          clientId={selected}
          onDelete={handleDelete}
          onClose={() => setModalType()}
        />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

export default Modals;
