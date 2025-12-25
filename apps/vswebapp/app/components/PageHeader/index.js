import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Space,
  Button,
  Image,
} from '@cashfree-intl/coherent';

// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';
import { STATUS_PAGE } from 'constants/urls';
// Images
import youtubeIcon from 'images/youtube.svg';




// Styled
import { PageHeading } from 'styled/common';

// Components
import VideoEmbedModal from 'components/VideoEmbedModal';

const PageHeader = ({ children, embedKey }) => {
  const [open, setOpen] = useState(false);
  const videoEmbedDetails = VIDEO_EMBEDS[embedKey];


  return (
    <>
      <Space justifyContent="space-between" style={{ marginBottom: '28px' }}>
        <PageHeading className="m-0">{children}</PageHeading>
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
            <>
              <Button
                primary
                data-event-name="Primary_Button"
                size="small"
                onClick={() => window.open(STATUS_PAGE, '_blank')}
              >
                Bank Downtime Status
              </Button>
            </>
          )}
        </Space>
      </Space>
      {open && (
        <VideoEmbedModal embedKey={embedKey} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
  embedKey: PropTypes.string,
};

export default PageHeader;
