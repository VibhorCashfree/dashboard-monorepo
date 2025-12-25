import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalContent } from '@cashfree-intl/coherent';

// Constants
import EVENTS from 'constants/analytics';
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Utils
import Analytics from 'utils/analytics';

// Styles
import { StyledEmbed } from './styled';

const VideoEmbedModal = ({ onClose, embedKey }) => {
  const { name, url } = VIDEO_EMBEDS[embedKey];

  useEffect(() => {
    Analytics.track(EVENTS.VIEW_HELP_VIDEO, {
      section: embedKey,
    });
  }, []);

  return (
    <Modal onClose={onClose} open>
      <ModalContent className="p-0">
        <StyledEmbed
          role="video-embed"
          active
          placeholder={name}
          url={url}
          autoplay={false}
          iframe={{
            allowFullScreen: true,
          }}
        />
      </ModalContent>
    </Modal>
  );
};

VideoEmbedModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  embedKey: PropTypes.string.isRequired,
};

export default VideoEmbedModal;
