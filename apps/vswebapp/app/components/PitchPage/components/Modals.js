import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import VideoEmbedModal from 'components/VideoEmbedModal';

const Modals = ({ modalType, setModalType, embedKey }) => {
  switch (modalType) {
    case MODAL_TYPES.EMBED:
      return (
        <VideoEmbedModal embedKey={embedKey} onClose={() => setModalType()} />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  embedKey: PropTypes.string,
};

export default Modals;
