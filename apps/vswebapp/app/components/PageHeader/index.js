import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Space,
  Button,
  Image,
} from '@cashfree-intl/coherent';
import { PageHeader } from '@dashboard-monorepo/shared';

// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';
import { STATUS_PAGE } from 'constants/urls';
// Images
import youtubeIcon from 'images/youtube.svg';


// Components
import VideoEmbedModal from 'components/VideoEmbedModal';

const VSPageHeader = ({ children, embedKey }) => {
  const [open, setOpen] = useState(false);
  const videoEmbedDetails = VIDEO_EMBEDS[embedKey];

  const extra = (
    <Space gap={2}>
      {videoEmbedDetails && (
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
      )}

      {embedKey === 'SUMMARY' && (
        <Button
          primary
          data-event-name="Primary_Button"
          size="small"
          onClick={() => window.open(STATUS_PAGE, '_blank')}
        >
          Bank Downtime Status
        </Button>
      )}
    </Space>
  );

  return (
    <>
      <PageHeader extra={extra}>{children}</PageHeader>
      {open && (
        <VideoEmbedModal embedKey={embedKey} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

VSPageHeader.propTypes = {
  children: PropTypes.any.isRequired,
  embedKey: PropTypes.string,
};

export default VSPageHeader;
