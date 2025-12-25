import React, { useState } from 'react';
import { Image, Text, Space } from '@cashfree-intl/coherent';

// Constants
import { REGION } from 'constants/common';
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Images
import youtubeIcon from 'images/youtube.svg';

// Utils
import Region from 'utils/region';

// Components
import VideoEmbedModal from 'components/VideoEmbedModal';

// Styled
import { PageHeading } from 'styled/common';

// Types
import type { Props } from './types';

const PageHeader = ({ children, embedKey }: Props) => {
  const [open, setOpen] = useState(false);

  const videoEmbedDetails =
    Region.get() === REGION.IN && embedKey ? VIDEO_EMBEDS[embedKey] : null;

  return (
    <>
      <Space justifyContent="space-between" className="mb-1">
        <PageHeading>{children}</PageHeading>
        {videoEmbedDetails ? (
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
        ) : null}
      </Space>

      {open && (
        <VideoEmbedModal embedKey={embedKey} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default PageHeader;
