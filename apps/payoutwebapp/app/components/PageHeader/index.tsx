import React, { useState } from 'react';
import { Image, Text, Space } from '@cashfree-intl/coherent';
import { PageHeader } from '@dashboard-monorepo/shared';

// Constants
import { REGION } from 'constants/common';
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Images
import youtubeIcon from 'images/youtube.svg';

// Utils
import Region from 'utils/region';

// Components
import VideoEmbedModal from 'components/VideoEmbedModal';

// Types
import type { Props } from './types';

const PayoutPageHeader = ({ children, embedKey }: Props) => {
  const [open, setOpen] = useState(false);

  const videoEmbedDetails =
    Region.get() === REGION.IN && embedKey ? VIDEO_EMBEDS[embedKey] : null;

  const extra = videoEmbedDetails ? (
    <Space
      className="pointer"
      alignItems="center"
      onClick={() => setOpen(true)}
    >
      <Image
        inline
        className="mr-1"
        style={{ height: 17 }}
        src={youtubeIcon}
      />
      <Text variant="b12" color="primary">
        {videoEmbedDetails.name}
      </Text>
    </Space>
  ) : null;

  return (
    <>
      <PageHeader extra={extra}>{children}</PageHeader>

      {open && (
        <VideoEmbedModal embedKey={embedKey} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default PayoutPageHeader;
