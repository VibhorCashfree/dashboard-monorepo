import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import UpdateWebhookModal from './UpdateWebhookModal';
import DeleteWebhookModal from './DeleteWebhookModal';

const Modals = ({
  modalType,
  setFetchCounter,
  handleDelete,
  handleClose,
  selected,
}) => {
  switch (modalType) {
    case MODAL_TYPES.ADD:
    case MODAL_TYPES.EDIT:
    case MODAL_TYPES.TEST:
      return (
        <UpdateWebhookModal
          url={selected}
          actionType={modalType}
          onSubmit={() => setFetchCounter(count => count + 1)}
          onClose={handleClose}
        />
      );

    case MODAL_TYPES.DELETE:
      return (
        <DeleteWebhookModal onDelete={handleDelete} onClose={handleClose} />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

export default Modals;
