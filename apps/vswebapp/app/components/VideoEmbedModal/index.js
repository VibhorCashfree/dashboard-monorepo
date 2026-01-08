import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { VideoEmbedModal } from '@dashboard-monorepo/shared';

// Constants
import EVENTS from 'constants/analytics';
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Utils
import Analytics from 'utils/analytics';

const VSVideoEmbedModal = ({ onClose, embedKey }) => {
  const { name, url } = VIDEO_EMBEDS[embedKey];

  useEffect(() => {
    Analytics.track(EVENTS.VIEW_HELP_VIDEO, {
      section: embedKey,
    });
  }, []);

  return <VideoEmbedModal name={name} url={url} onClose={onClose} />;
};

VSVideoEmbedModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  embedKey: PropTypes.string.isRequired,
};

export default VSVideoEmbedModal;
