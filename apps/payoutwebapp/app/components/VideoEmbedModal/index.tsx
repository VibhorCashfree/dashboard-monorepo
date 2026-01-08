import React, { useEffect } from 'react';
import { VideoEmbedModal } from '@dashboard-monorepo/shared';

// Constants
import EVENTS from 'constants/events';
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Utils
import Analytics from 'utils/analytics';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Types
import type { Props } from './types';

const PayoutVideoEmbedModal = ({ embedKey, onClose }: Props) => {
  const { name, url } = VIDEO_EMBEDS[embedKey];

  useEffect(() => {
    Analytics.track(EVENTS.VIEW_HELP_VIDEO, {
      section: embedKey,
    });
  }, []);

  return (
    <VideoEmbedModal
      name={name}
      url={url}
      onClose={onClose}
    />
  );
};

export default withErrorBoundary(PayoutVideoEmbedModal);
