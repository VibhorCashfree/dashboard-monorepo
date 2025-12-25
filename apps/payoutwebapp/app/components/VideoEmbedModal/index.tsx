import React, { useEffect } from 'react';
import { Modal, ModalContent } from '@cashfree-intl/coherent';

// Constants
import EVENTS from 'constants/events';
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Utils
import Analytics from 'utils/analytics';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styles
import { StyledEmbed } from './styled';

// Types
import type { Props } from './types';

const VideoEmbedModal = ({ embedKey, onClose }: Props) => {
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

export default withErrorBoundary(VideoEmbedModal);
